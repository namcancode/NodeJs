const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session");

// const FacebookStrategy = require("@passport-next/passport-facebook")
const passport = require("passport");
// const passportConfig = require('./secure/passport');
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
// const postsRouter = require('./routes/posts');
const detailsRouter = require("./routes/details");
const flash = require("connect-flash");
const adminRouter = require("./routes/admin");
// const loginRouter = require('./routes/login');
// const registerRouter = require('./routes/register');
const { sequelize } = require("./databases/database");
const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.set("trust proxy", 1);

const SequelizeStore = require("connect-session-sequelize")(session.Store);

app.use(flash());
const myStore = new SequelizeStore({
	db: sequelize
});

app.set("trust proxy", 1);
app.use(
	session({
		secret: "keyboard cat",
		// store: myStore,
		resave: false,
		saveUninitialized: true,
		cookie: { secure: false },
		proxy: true
	})
);
// myStore.sync();
app.use(passport.initialize());
app.use(passport.session());





// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
// app.use('/posts',postsRouter);
app.use("/details", detailsRouter);
app.use("/admin", adminRouter);
// app.use('/login',loginRouter);
// app.use('/register',registerRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	if (req.originalUrl && req.originalUrl.split("/").pop() === "favicon.ico") {
		return res.sendStatus(204);
	}
	next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render("error");
});

module.exports = app;
