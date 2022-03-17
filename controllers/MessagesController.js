"use strict";

const {Message} = require("../models/Message");

const controller = {
    new: (req, res) => {
        res.render("messages/new");
    },

    create: (req, res, next) => {
        if (req.skip || res.locals.thread == null || res.locals.currentUser == null) return next();

        Message.create({
            content: req.body.message,
            thread: res.locals.thread,
            user: res.locals.currentUser
        }).then(() => {
            res.locals.redirect = `/threads/read/${res.locals.thread._id}/latest`;
            next();
        }).catch(e => {
            console.error("New Message failed to create.", e);
            next(e);
        });
    },

    delete: (req, res, next) => {
        Message.findByIdAndUpdate(req.params.mid, {
            $set: {
                deleted: true
            }
        }).then(() => {
            res.locals.redirect = `/threads/read/${req.params.tid}`
            next();
        }).catch(e => {
            console.error(e);
            next(e);
        })
    },
};

module.exports = {
    MessagesController: controller,
};