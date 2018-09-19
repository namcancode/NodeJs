var express = require("express");
var router = express.Router();
import * as Message from "../configs/config";
import * as PostController from "../controllers/PostController";
import * as UserController from "../controllers/UserController";
// import * as UserController from "../controllers/UserController";

/* GET home page. */
router.get("/", async function(req, res, next) {
	const { offset } = req.query;
	try {
		const allPostsInDb = await PostController.listAllPosts(req.query); //Lay tat ca post trong db
		if (req.user) {
			res.render("index", {
				user: req.session.user ? req.session.user : req.user,
				postss: allPostsInDb,
				status: req.session.status
			});
		} else {
			res.render("index", {
				user: "",
				postss: allPostsInDb,
				status: ""
			});
		}
	} catch (error) {
		// console.log(`error: ${error}`);
		throw error;
	}
});
router.post("/apiMorePost", async (req, res) => {
	const { offset } = req.body;
	try {
		const allPostsInDb = await PostController.listAllPosts(req.body);
		if (allPostsInDb.length > 0) {
			res.json({
				result: Message.SUCCESS,
				data: allPostsInDb,
				message: Message.POSTSHOWSUCCESS
			});
		} else
			res.json({
				result: Message.FAILED,
				data: allPostsInDb,
				message: Message.POSTSHOWFAILED
			});
	} catch (error) {
		res.json({
			result: Message.FAILED,
			data: error,
			message: `Faild error: ${error}`
		});
	}
});
router.post("/checkActiveAccount", async (req, res) => {
	const { email } = req.body;
	try {
		const checkAccount = await UserController.checkActiveAccount(req.body);
		if (checkAccount) {
			res.json({
				result: Message.SUCCESS,
				data: checkAccount,
				message: Message.ACCTIVESUCCESS
			});
		} else {
			res.json({
				result: Message.FAILED,
				data: checkAccount,
				message: Message.ACCTIVEFAILED
			});
		}
	} catch (error) {
		res.json({
			result: Message.FAILED,
			data: error,
			message: `Faild error: ${error}`
		});
	}
});

router.post("/sendLinkActiveAccount", async (req, res) => {
	const { email } = req.body;
	try {
		const checkAccount = await UserController.sendLinkActiveAccount(req.body);
		if (checkAccount) {
			res.json({
				result: Message.SENDLINKACTIVESUCCESS,
				data: checkAccount,
				message: Message.ACTIVESUCCESS
			});
		} else {
			res.json({
				result: Message.FAILED,
				data: checkAccount,
				message: Message.SENDLINKACTIVETIMEOUT
			});
		}
	} catch (error) {
		res.json({
			result: Message.FAILED,
			data: error,
			message: `Faild error: ${error}`
		});
	}
});
module.exports = router;
