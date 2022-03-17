"use strict";

const {Thread} = require("../models/Thread");
const {Message} = require("../models/Message");

const controller = {
    index: (req, res) => {
        // ログイン後のリダイレクト先がおかしくなるのでリセット
        delete req.session.refUrl;
        res.render("threads/index");
    },

    new: (req, res) => {
        res.render("threads/new");
    },

    create: (req, res, next) => {
        if (req.skip) return next();

        Thread.create({
            title: req.body.title,
            category: res.locals.category,
            owner: res.locals.currentUser,
        }).then(thread => {
            res.locals.redirect = `/threads/read/${thread._id}/latest`;
            res.locals.thread = thread;
            return Message.create({
                content: req.body.message,
                thread: thread,
                user: res.locals.currentUser,
            });
        }).then(() => {
            next();
        }).catch(e => {
            console.error(`Error saving thread: ${e.message}`);
            res.locals.thread.remove().then();
            next(e);
        });
    },

    delete: (req, res, next) => {
        Message.deleteMany({
            thread: res.locals.thread,
        }).exec().then(() => {
            return Thread.findByIdAndDelete(res.locals.thread).exec();
        }).then(() => {
            res.locals.redirect = "/";
            next();
        }).catch(e => {
            console.log(e.message, e);
            next(e);
        });
    }
};

module.exports = {
    ThreadController: controller,
};
