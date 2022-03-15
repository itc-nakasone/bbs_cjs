"use strict";

const passport = require("passport");

const controller = {
    login: (req, res) => {
        if (!req.session.refUrl) {
            req.session.refUrl = req.get("referer");
        }
        res.render("users/login");
    },

    authenticate: passport.authenticate("local", {
        successRedirect: "/users/success",
        failureRedirect: "/users/login",
        failureFlash: "IDかパスワードがちがいます。"
    }, null),

    success: (req, res, next) => {
        if (req.session.refUrl != null) {
            res.locals.redirect = req.session.refUrl;
            delete req.session.refUrl;
        }
        next();
    },

    logout: (req, res, next) => {
        req.logout();
        res.locals.redirect = req.get("referer");
        next();
    },
}

module.exports = {
    UsersController: controller,
};
