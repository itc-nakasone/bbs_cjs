"use strict";

const {Thread} = require("../models/Thread");
const {Message} = require("../models/Message");

const controller = {
    index: (req, res) => {
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
            res.locals.redirect = `/threads/${thread._id}/latest`;
            res.locals.thread = thread;
            return Message.create({
                content: req.body.message,
                thread: thread,
                user: res.locals.currentUser,
            });
        }).then(() => {
            next();
        }).catch(error => {
            console.error(`Error saving thread: ${error.message}`);
            res.locals.thread.remove().then();
            next(error);
        });
    }
};

module.exports = {
    ThreadController: controller,
};
