import User from "../models/User";
import { Op } from "../databases/database";
import bcrypt from "bcrypt";
const passport = require("passport");
const FacebookStrategy = require("@passport-next/passport-facebook").Strategy;
const GitHubStrategy = require("passport-github2").Strategy;
const TwitterStrategy = require("passport-twitter").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const LinkedInStrategy = require("passport-linkedin-oauth2").Strategy;
const InstagramStrategy = require("passport-instagram").Strategy;
import keyPassport from "../configs/keyPassport";
import * as Config from "../configs/config";
const Init = require("../Utils/Init");
import nodemailer from "../configs/nodemailer";
//LOGIN PASSPORT LOCAL
passport.use(
	new LocalStrategy(
		{
			usernameField: "email",
			passwordField: "password",
			passReqToCallback: true
		},
		async function(req, username, password, done) {
			try {
				const user = await User.findOne({
					where: { email: username }
				});
				if (!user) {
					return done(
						null,
						false,
						req.flash("loginMessage", "User Not Found")
					);
				} else {
					const compare = await bcrypt.compareSync(
						password,
						user.password
					);
					if (compare) {
						const updateSt = await updateStatus(user, "online");
						return done(null, user);
					} else {
						done(
							null,
							false,
							req.flash("loginMessage", "Password is Wrong")
						);
					}
				}
			} catch (error) {
				throw error;
				return done(null, false);
			}
		}
	)
);

export const listAllUsers = async params => {
	const allUsers = await User.findAll({
		order: ["id"]
	});
	try {
		return allUsers; //chi controller moi viet tnay
	} catch (error) {
		throw error;
	}
};

// GET INFO BY USERNAME
export const getInfoByUsername = async params => {
	const { username } = params;
	try {
		const findUsername = await User.findOne({
			where: {
				username: username ? username : params
			}
		});
		return findUsername;
	} catch (error) {
		throw error;
	}
};

//REGISTER
export const newUser = async params => {
	const { email, image, username } = params;
	const password = `${Math.floor(100000 + Math.random() * 900000)}`;
	try {
		const findSameUsername = await User.findOne({
			where: {
				email
			}
		}); // findOne tra ve all data related to username hoac NULL
		if (!findSameUsername) {
			const key = Date.now();
			const hash = await bcrypt.hash(password, Config.saltRounds);
			const newUser = await User.create(
				{
					email,
					username: email,
					password: hash,
					image: image
						? image
						: "https://uphinhnhanh.com/images/2018/09/13/blognode.png",
					isactive: "false",
					key,
					status: "offline"
				},
				{
					fields: [
						"username",
						"password",
						"image",
						"isactive",
						"key",
						"email",
						"status"
					]
				}
			);
			const mail = await nodemailer(email, email, null, null, "welcome");
			return newUser;
		} else {
			const newUser = null;
			return newUser;
		}
	} catch (error) {
		throw error;
	}
};
//Active
export const checkTimeoutLink = async params => {
	const { email } = params;
	try {
		const findUsername = await User.findOne({
			where: {
				email
			}
		});
		const timeActive = Math.round((Date.now() - findUsername.key) / 60000);
		if (parseInt(timeActive) <= 15) {
			return timeActive;
		} else {
			return null;
		}
	} catch (error) {
		throw error;
	}
};
export const sendLinkResetPassword = async params => {
	const { email } = params;
	const key = Date.now();
	try {
		const findUsername = await User.findOne({
			where: {
				email
			}
		});
		const updateKey = await User.update(
			{
				key
			},
			{
				where: {
					email
				}
			}
		);
		if (findUsername) {
			const mail = await nodemailer(email, email, key, null, "reset");
			return true;
		} else {
			return null;
		}
	} catch (error) {
		throw error;
	}
};

export const updatePassword = async params => {
	const { email, password } = params;
	try {
		const findUsername = await User.findOne({
			where: {
				email
			}
		});
		const timeActive = Math.round((Date.now() - findUsername.key) / 60000);
		if (parseInt(timeActive) <= 15) {
			const hash = await bcrypt.hash(password, Config.saltRounds);
			const updatePass = await User.update(
				{
					password: hash,
					key: ""
				},
				{
					where: {
						email
					}
				}
			);

			return updatePass;
		} else {
			return null;
		}
	} catch (error) {
		throw error;
	}
};

//ACTIVE Acount
export const activeAccount = async params => {
	const { email } = params;

	try {
		const findUsername = await User.findOne({
			where: {
				email
			}
		});
		const timeActive = Math.round((Date.now() - findUsername.key) / 60000);
		if (parseInt(timeActive) <= 5) {
			const updateActive = await User.update(
				{
					isactive: "true",
					key: ""
				},
				{
					where: {
						email
					}
				}
			);
			return updateActive;
		} else {
			return null;
		}
	} catch (error) {
		throw error;
	}
};

//CHECK ACTIVE ACCOUNT
export const checkActiveAccount = async params => {
	const { email } = params;
	try {
		const findUsername = await User.findOne({
			where: {
				email
			}
		});
		if (!findUsername) {
			return null;
		} else {
			if (findUsername.isactive == "true") {
				return true;
			} else {
				return false;
			}
		}
	} catch (error) {
		throw error;
	}
};

//SEND LINK ACTIVE ACCOUNT
export const sendLinkActiveAccount = async params => {
	const { email } = params;
	const key = Date.now();
	try {
		const updateKey = await User.update(
			{
				key
			},
			{
				where: {
					email
				}
			}
		);
		const timeActive = Math.round((Date.now() - key) / 60000);
		if (timeActive <= 10) {
			const mail = await nodemailer(email, email, key, null, "active");
			return true;
		} else {
			return false;
		}
	} catch (error) {
		throw error;
	}
};

//LOGIN
export const userLogin = async params => {
	const { username, password, email } = params;
	try {
		// Tim username trong database trung voi username vua nhap (params)
		const findUsername = await User.findOne({
			where: {
				email
			}
		});
		if (!findUsername) {
			return;
		} else {
			const compare = await bcrypt.compareSync(
				password,
				findUsername.password
			);
			if (compare) {
				findUsername.password = "leu leu";
				return findUsername;
			} else {
				return;
			}
		}
	} catch (error) {
		throw error;
	}
};

// UPDATE PROFILE
export const userEdit = async params => {
	const { image, password, username, email } = params;

	try {
		const findOldPass = await User.findOne({
			where: {
				email
			}
		});
		if (password != findOldPass.password && password) {
			const hash = await bcrypt.hash(password, Config.saltRounds);
			const updateProfile = await User.update(
				{
					image: image ? image : "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Antu_im-invisible-user.svg/2000px-Antu_im-invisible-user.svg.png" ,
					password: hash
				},
				{
					where: {
						email
					}
				}
			);
			// console.log(`updateProfile: ${updateProfile}`);
			return updateProfile;
		} else if (!password) {
			const updateProfile = await User.update(
				{
					image: image ? image : "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Antu_im-invisible-user.svg/2000px-Antu_im-invisible-user.svg.png" ,
				},
				{
					where: {
						email
					}
				}
			);
			return updateProfile;
		}
	} catch (error) {
		throw error;
	}
};

//UPDATE STATUS
// params, status vi ben login.js truyen vao 2 tham so
export const updateStatus = async (params, status) => {
	const { email } = params;
	// console.log(status.status);
	typeof status == "string" ? status : (status = status.status);
	try {
		const statusUpdate = await User.update(
			{
				status
			},
			{
				where: {
					email
				}
			}
		);
		return statusUpdate;
	} catch (error) {
		throw error;
	}
};

//Connect Facebook

passport.use(
	new FacebookStrategy(
		{
			clientID: keyPassport.facebook.clientID,
			clientSecret: keyPassport.facebook.clientSecret,
			callbackURL: keyPassport.facebook.callbackURLHost,
			profileFields: keyPassport.facebook.profileFields,
			graphApiVersion: keyPassport.facebook.graphApiVersion
		},
		async function(accessToken, refreshToken, profile, done) {
			let username;
			if (profile.username) {
				username = profile.username;
			} else {
				username = profile.id;
			}
			const email = profile.emails ? profile.emails[0].value : "";
			const password = `${profile.id}pass`;
			const image = profile.photos[0]
				? profile.photos[0].value
				: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Antu_im-invisible-user.svg/2000px-Antu_im-invisible-user.svg.png";
			const hash = await bcrypt.hash(password, Config.saltRounds);
			const newUser = await User.findOrCreate({
				where: { email },
				defaults: { username, password: hash, image, email },
				fields: ["username", "password", "image", "email"]
			})
				.then(function(result) {
					return done(null, result[0]);
				})
				.catch(function(err) {
					throw err;
				});
		}
	)
);

//Github connect
passport.use(
	new GitHubStrategy(
		{
			clientID: keyPassport.github.clientID,
			clientSecret: keyPassport.github.clientSecret,
			callbackURL: keyPassport.github.callbackURLHost,
			profileFields: keyPassport.github.profileFields
		},
		async function(accessToken, refreshToken, profile, done) {
			// console.log(profile);
			let username;
			if (profile.username) {
				username = profile.username;
			} else {
				username = profile.id;
			}
			const email = profile.emails ? profile.emails[0].value : "";
			const password = `${profile.id}pass`;
			const image = profile.photos[0]
				? profile.photos[0].value
				: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Antu_im-invisible-user.svg/2000px-Antu_im-invisible-user.svg.png";

			const hash = await bcrypt.hash(password, Config.saltRounds);
			const newUser = await User.findOrCreate({
				where: { email },
				defaults: { username, password: hash, image, email },
				fields: ["username", "password", "image", "email"]
			})
				.then(function(result) {
					return done(null, result[0]);
				})
				.catch(function(err) {
					throw err;
				});
		}
	)
);
//Twitter connect
/* passport.use(
	new TwitterStrategy(
		{
				clientID: keyPassport.twitter.clientID,
			clientSecret: keyPassport.twitter.clientSecret,
			callbackURL:keyPassport.twitter.callbackURLHost,
			profileFields:keyPassport.twitter.profileFields,
		},
		async function(accessToken, refreshToken, profile, done) {
			console.log(profile);
			let username;
			if (profile.username) {
				username = profile.username;
			} else {
				username = profile.id;
			}
			const email = profile.emails?profile.emails[0].value :""
			const password = `${profile.id}pass`;
			const image = profile.photos[0]
				? profile.photos[0].value
				: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Antu_im-invisible-user.svg/2000px-Antu_im-invisible-user.svg.png";

			const hash = await bcrypt.hash(password, Config.saltRounds);
			const newUser = await User.findOrCreate({
				where: { email },
				defaults: { username, password:hash, image ,email},
				fields: ["username", "password", "image","email"]
			})
				.then(function(result) {
					return done(null,result[0]);
				})
				.catch(function(err) {
				throw err
				});
		}
	)
); */

//Google connect
passport.use(
	new GoogleStrategy(
		{
			clientID: keyPassport.google.clientID,
			clientSecret: keyPassport.google.clientSecret,
			callbackURL: keyPassport.google.callbackURLHost,
			profileFields: keyPassport.google.profileFieldss
		},
		async function(accessToken, refreshToken, profile, done) {
			// console.log(profile);
			let username;
			if (profile.username) {
				username = profile.username;
			} else {
				username = profile.id;
			}
			const email = profile.emails ? profile.emails[0].value : "";
			const password = `${profile.id}pass`;
			const image = profile.photos[0]
				? profile.photos[0].value
				: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Antu_im-invisible-user.svg/2000px-Antu_im-invisible-user.svg.png";

			const hash = await bcrypt.hash(password, Config.saltRounds);
			const newUser = await User.findOrCreate({
				where: { email },
				defaults: { username, password: hash, image, email },
				fields: ["username", "password", "image", "email"]
			})
				.then(function(result) {
					return done(null, result[0]);
				})
				.catch(function(err) {
					console.log(err);
					throw err;
				});
		}
	)
);

passport.use(
	new LinkedInStrategy(
		{
			clientID: keyPassport.linkedin.clientID,
			clientSecret: keyPassport.linkedin.clientSecret,
			callbackURL: keyPassport.linkedin.callbackURLHost,
			scope: keyPassport.linkedin.scope
		},
		async function(accessToken, refreshToken, profile, done) {
			// console.log(profile);
			let username;
			if (profile.username) {
				username = profile.username;
			} else {
				username = profile.id;
			}
			const email = profile.emails ? profile.emails[0].value : "";
			const password = `${profile.id}pass`;
			const image = profile.photos[0]
				? profile.photos[0].value
				: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Antu_im-invisible-user.svg/2000px-Antu_im-invisible-user.svg.png";

			const hash = await bcrypt.hash(password, Config.saltRounds);
			const newUser = await User.findOrCreate({
				where: { email },
				defaults: { username, password: hash, image, email },
				fields: ["username", "password", "image", "email"]
			})
				.then(function(result) {
					return done(null, result[0]);
				})
				.catch(function(err) {
					throw err;
				});
		}
	)
);
passport.use(
	new InstagramStrategy(
		{
			clientID: keyPassport.instagram.clientID,
			clientSecret: keyPassport.instagram.clientSecret,
			callbackURL: keyPassport.instagram.callbackURLHost,
			profileFields: keyPassport.instagram.profileFieldss
		},
		async function(accessToken, refreshToken, profile, done) {
			let username;
			if (profile.username) {
				username = profile.username;
			} else {
				username = profile.id;
			}
			const email = profile.emails ? profile.emails[0].value : "";
			const password = `${profile.id}pass`;
			const image = profile.photos
				? profile.photos[0].value
				: profile._json
					? profile._json.data.profile_picture
					: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Antu_im-invisible-user.svg/2000px-Antu_im-invisible-user.svg.png";

			const hash = await bcrypt.hash(password, Config.saltRounds);
			const newUser = await User.findOrCreate({
				where: { email },
				defaults: { username, password: hash, image, email },
				fields: ["username", "password", "image", "email"]
			})
				.then(function(result) {
					return done(null, result[0]);
				})
				.catch(function(err) {
					throw err;
				});
		}
	)
);

Init();
