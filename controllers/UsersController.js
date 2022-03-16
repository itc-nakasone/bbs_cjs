"use strict";

const passport = require("passport");
const {User} = require("../models/User");

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

    new: (req, res) => {
        res.render("users/new");
    },

    create: (req, res, next) => {
        if (req.skip) return next();

        const tempUser = new User({
            username: req.body.username,
            view_name: req.body.view_name,
        });
        User.register(tempUser, req.body.password, (e, user) => {
            if (user != null) {
                if (res.locals.preUrl != null) {
                    res.locals.redirect = res.locals.preUrl;
                    delete res.locals.preUrl;
                } else {
                    res.locals.redirect = "/";
                }
                next();
            } else {
                res.locals.redirect = "/users/new";
                res.locals.error = e;
                next();
            }
        });
    },
}

module.exports = {
    UsersController: controller,
};
