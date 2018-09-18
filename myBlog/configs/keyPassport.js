
module.exports = {
	facebook: {
		clientID: "283032682299855",
		clientSecret: "bd82b34690d71a1514db45cc1e0e3ddd",
		callbackURLLocal:
			"https://localhost:3000/users/login/facebook/callback",
		callbackURLHost: "https://nguyennam.ooo/users/login/facebook/callback",
		profileFields: ["id", "name", "picture.type(large)", "email"],
		graphApiVersion: "v3.1"
	},
	github: {
		clientID: "a7e0f355ad398d6e24d9",
		clientSecret: "c45101d260c4758a25f25219518fb9f691792f02",
		callbackURLLocal: "http://localhost:3000/users/login/github/callback",
		callbackURLHost: "https://nguyennam.ooo/users/login/github/callback",
		profileFields: ["id", "name", "picture.type(large)", "email"]
	},
	twitter: {
		clientID: "a7e0f355ad398d6e24d9",
		clientSecret: "c45101d260c4758a25f25219518fb9f691792f02",
		callbackURLLocal: "https://localhost:3000/users/login/twitter/callback",
		callbackURLHost: "https://nguyennam.ooo/users/login/twitter/callback",
		profileFields: ["id", "name", "picture.type(large)", "email"]
	},
	google: {
		clientID:
			"646454292770-1lhfre1gt23ig56g60fpdnuhg37k7cjj.apps.googleusercontent.com",
		clientSecret: "JZSnps73g3GomuslNEX8YxHq",
		callbackURLLocal: "http://localhost:3000/users/login/google/callback",
		callbackURLHost: "https://nguyennam.ooo/users/login/google/callback",
		profileFields: ["id", "name", "picture.type(large)", "email"]
	},
	linkedin: {
		clientID: "81fo1x5u0ppdvp",
		clientSecret: "ouZOzp0EEJlvWXhP",
		callbackURLLocal: "http://localhost:3000/users/login/linkedin/callback",
		callbackURLHost: "https://nguyennam.ooo/users/login/linkedin/callback",
		scope: ["r_emailaddress", "r_basicprofile"]
	},
	instagram: {
		clientID: "40c7c1e54b6e4ca580a95ebcaec44cf9",
		clientSecret: "2ac471c1c81c49b3a830b3f1f0e8c801",
		callbackURLLocal:
			"http://localhost:3000/users/login/instagram/callback",
		callbackURLHost: "https://nguyennam.ooo/users/login/instagram/callback",
		profileFields: ["id", "name", "picture.type(large)", "email"]
	}
};
