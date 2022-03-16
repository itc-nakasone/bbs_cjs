"use strict";

const express = require("express");
const layouts = require("express-ejs-layouts");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
const flash = require("connect-flash")
const passport = require("passport");
const mongoose = require("mongoose");
const {User} = require("./models/User");
const {Router} = require("./routes/index");

const app = express();

app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(layouts);
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cookieParser("rzlqkCnvkNQnjguMvHuCfut6"));
app.use(expressSession({
    secret: "rzlqkCnvkNQnjguMvHuCfut6",
    cookie: {maxAge: 4000000},
    resave: false,
    saveUninitialized: false
}));
app.use(flash());
app.use(passport.initialize({}));
app.use(passport.session({}));
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.loggedIn = req.isAuthenticated();
    res.locals.currentUser = req.user;
    next();
});

app.use(Router);

mongoose.connect("mongodb://localhost:27017/bbs").then(() => {
    console.info("Successfully connected to MongoDB using Mongoose");

    app.listen(app.get("port"), () => {
        console.info(`Server running at http://localhost:${app.get("port")}`);
    })
}).catch((e) => {
    console.error("Failed to start server.", e);
    process.exit(-1);
});