var express = require("express");
var router = express.Router();
const passport = require("passport");
import * as Message from "../configs/config";
import * as UserController from "../controllers/UserController";

router.get("/forgotpassword", async function(req, res, next) {
	res.render("forgotpassword");
});

router.get("/login", async function(req, res, next) {
	if (req.user) {
		res.redirect("/");
	} else {
		res.render("login", { Error1: req.flash("loginMessage") });
	}
});

router.get("/register", async function(req, res, next) {
	res.render("register");
});

router.get("/checkup", async function(req, res, next) {
	res.render("password");
});
router.get("/updatePass/:email", async (req, res) => {
	const { email } = req.params;
	try {
		const checkLink = await UserController.checkTimeoutLink(req.params);
		if (checkLink) {
			res.render("password");
		} else {
			res.render("timeout");
		}
	} catch (error) {
		console.log(error);
	}
});
router.get("/resetPassword/:email", async (req, res) => {
	const { email } = req.params;
	try {
		const checkLink = await UserController.checkTimeoutLink(req.params);
		if (checkLink) {
			res.render("password");
		} else {
			res.render("timeout");
		}
	} catch (error) {
		console.log(error);
	}
});

router.get("/activeAccount/:email", async (req, res) => {
	const { email } = req.params;
	try {
		const checkAccount = await UserController.activeAccount(req.params);
		if (checkAccount) {
			res.render("activeAccount", { active: true });
		} else {
			res.render("activeAccount", { active: null, email });
		}
	} catch (error) {
		console.log(error);
	}
});

router.post("/linkForgotpassword", async (req, res) => {
	const { email } = req.body;
	try {
		const forgotpass = await UserController.sendLinkResetPassword(req.body);
		if (forgotpass) {
			res.json({
				result: Message.SUCCESS,
				data: null,
				message: Message.FINDFORGOTPASSSUCCESS
			});
		} else {
			res.json({
				result: Message.FAILED,
				data: null,
				message: Message.FINDFORGOTPASSFAILED
			});
		}
	} catch (error) {
		res.json({
			result: Message.FAILED,
			data: null,
			message: `Error: ${error}`
		});
	}
});

router.post("/updatePassword", async (req, res) => {
	const { email, password, repassword } = req.body;
	try {
		if (password === repassword) {
			const updatePassword = await UserController.updatePassword(
				req.body
			);
			if (updatePassword) {
				res.json({
					result: Message.SUCCESS,
					data: {},
					message: Message.PASSWORDUPDATESUCCESS
				});
			} else {
				res.json({
					result: Message.FAILED,
					data: {},
					message: Message.PASSWORDUPDATEFAILED
				});
			}
		} else {
			res.json({
				result: Message.FAILED,
				data: {},
				message: Message.PASSWORDUPDATEWRONG
			});
		}
	} catch (error) {
		res.json({
			result: Message.FAILED,
			data: {},
			message: `Update password failed: ${error}`
		});
	}
});

//LOG OUT
router.post("/logout", async (req, res) => {
	await req.session.destroy();
	req.logout();
	const { username } = req.body;
	const updateSt = await UserController.updateStatus(req.body, "offline");
	res.json({
		result: Message.SUCCESS,
		data: null,
		message: Message.LOGOUTSUCCESS
	});
});

/* //LOGIN
router.post("/apiLogin", async (req, res) => {
	const { username, password } = req.body;
	// Lay list bai viet theo username do trong PostController
	try {
		const updateSt = await UserController.updateStatus(req.body, "online"); // truyen req.body va status => UserController => Update status
		const loginbody = await UserController.userLogin(req.body); // Lay info dang nhap (username,password)
		if (loginbody) {
			//  Neu da co info dang nhap roi
			req.session.user = loginbody; // thi luu info vao session, session luu vao db - session ghi nho dang nhap
			// console.log(`loginbody: ${JSON.stringify(loginbody)}`);
			req.session.status = "online";
			req.session.save();
			res.redirect("/");
		} else {
			res.render("login", { Error1: Message.LOGINFAILED });
		}
	} catch (error) {
		throw error;
	}
}); */

//LOGIN LOCAL PASSPORT WITH AJAX CUSTOM CALLBACK

router.post("/login", function(req, res, next) {
	passport.authenticate("local", function(err, user, info) {
		if (err) {
			res.json({
				result: Message.FAILED,
				data: null,
				message: `error: ${err}`
			});
		}
		if (!user) {
			res.json({
				result: Message.FAILED,
				data: null,
				message: Message.LOGINFAILED
			});
		} else {
			req.session.status = "online";
			req.session.save();
			req.login(user, function(err) {
				if (err) {
					return next(err);
				}
				return res.json({
					result: Message.SUCCESS,
					data: null,
					message: Message.LOGINSUCCESS
				});
			});
		}
	})(req, res, next);
});

//LOGIN LOCAL PASSPORT WITH FORM
/* router.post(
	"/login",
	passport.authenticate("local", { failureRedirect: '/users/login'}),
	async function(req, res, next) {
		req.session.status = "online";
		req.session.save();
		res.json({
			result: Message.SUCCESS,
			data: null,
			message: Message.LOGINSUCCESS
		});
	}
); */

//REGISTER
router.post("/apiRegister", async (req, res) => {
	const { email, image, username } = req.body;
	try {
		const newbie = await UserController.newUser(req.body);
		if (!newbie) {
			// if newbie tra ve null ---> truong hop da co username
			res.json({
				result: Message.FAILED,
				data: {},
				message: Message.REGISFAILED
			});
		} else {
			const updateSt = await UserController.updateStatus(
				req.body,
				"online"
			); // register xong, status = offlline
			req.login(newbie, function(err) {
				if (err) return;
			});
			res.json({
				result: Message.SUCCESS,
				data: {},
				message: Message.REGISSUCCESS
			});
		}
	} catch (error) {
		res.json({
			result: Message.FAILED,
			data: {},
			message: `Register failed! Error: ${error}.`
		});
	}
});

//UPDATE STATUS
router.put("/apiUpdateStatus", async (req, res) => {
	const { email, status } = req.body;
	try {
		if (req.user) {
			const updateSt = await UserController.updateStatus(
				req.body,
				req.body
			); // UController nhan 2 info req.body va status => viet them req.body de nhan đủ tham so
			req.session.status = `${status}`;
			req.session.save();
			res.json({
				result: Message.SUCCESS,
				data: { status },
				message: Message.STATUSSUCCESS
			});
		} else {
			res.json({
				result: Message.FAILED,
				data: { status },
				message: Message.STATUSFAILED
			});
		}
	} catch (error) {
		res.json({
			result: Message.SUCCESS,
			data: {},
			message: `Update status failed! Error: ${error}.`
		});
	}
});

//find status users

router.post("/apiFindStatusUsers", async (req, res) => {
	const { username } = req.body;
	try {
		const info = await UserController.getInfoByUsername(req.body);
		if (info) {
			res.json({
				result: Message.SUCCESS,
				data: { info },
				message: Message.STATUSSUCCESS
			});
		} else if (password != repassword) {
			res.json({
				result: Message.FAILED,
				data: { status },
				message: Message.STATUSFAILED
			});
		}
	} catch (error) {
		res.json({
			result: Message.FAILED,
			data: {},
			message: `Find failed! Error: ${error}.`
		});
	}
});
router.get("/login/facebook", passport.authenticate("facebook"));
router.get(
	"/login/facebook/callback",
	passport.authenticate("facebook", {
		// successRedirect: "/",
		failureRedirect: "/users/login",
		scope: ["email"],
		session: true
	}),
	function(req, res) {
		// req.session.user =req.user
		req.session.status = "online";
		req.session.save();
		res.redirect("/");
	}
);
router.get("/login/github", passport.authenticate("github"));
router.get(
	"/login/github/callback",
	passport.authenticate("github", {
		// successRedirect: "/",
		failureRedirect: "/users/login",
		scope: ["email"],
		session: true
	}),
	function(req, res) {
		// req.session.user =req.user
		req.session.status = "online";
		req.session.save();
		res.redirect("/");
	}
);
router.get("/login/twitter", passport.authenticate("twitter"));
router.get(
	"/login/twitter/callback",
	passport.authenticate("twitter", {
		// successRedirect: "/",
		failureRedirect: "/users/login",
		scope: ["email"],
		session: true
	}),
	function(req, res) {
		// req.session.user =req.user
		req.session.status = "online";
		req.session.save();
		res.redirect("/");
	}
);
router.get(
	"/login/google",
	passport.authenticate("google", {
		scope: ["profile", "email"]
	})
);
router.get(
	"/login/google/callback",
	passport.authenticate("google", {
		// successRedirect: "/",
		failureRedirect: "/users/login",
		session: true
	}),
	function(req, res) {
		// req.session.user =req.user
		req.session.status = "online";
		req.session.save();
		res.redirect("/");
	}
);

router.get(
	"/login/linkedin",
	passport.authenticate("linkedin", { state: "SOME STATE" }),
	function(req, res) {}
);

router.get(
	"/login/linkedin/callback",
	passport.authenticate("linkedin", {
		// successRedirect: '/',
		failureRedirect: "/users/login",
		session: true
	}),
	function(req, res) {
		// req.session.user =req.user
		req.session.status = "online";
		req.session.save();
		res.redirect("/");
	}
);

router.get("/login/instagram", passport.authenticate("instagram"), function(
	req,
	res
) {});

router.get(
	"/login/instagram/callback",
	passport.authenticate("instagram", {
		// successRedirect: '/',
		failureRedirect: "/users/login",
		session: true,
		scope: ["public_content", "basic"]
	}),
	function(req, res) {
		// req.session.user =req.user
		req.session.status = "online";
		req.session.save();
		res.redirect("/");
	}
);

module.exports = router;
