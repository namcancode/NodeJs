import User from "../models/User";
import { Op } from "../databases/database";
const passport = require("passport");

module.exports = function() {
	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
		User.findById(id)
			.then(user => {
				done(null, user);
			})
			.catch(err => {
				console.log(err);
				throw err
			});
	});
};
