"use strict";

const {Category} = require("../models/Category");
const {Thread} = require("../models/Thread");
const {Message} = require("../models/Message");

const middleware = {
    redirect: (req, res, next) => {
        if (res.locals.redirect !== undefined) {
            const path = res.locals.redirect;
            delete res.locals.redirect;
            res.redirect(path);
        } else {
            next();
        }
    },

    loadCategories: (req, res, next) => {
        Category.find().sort({serial: 1}).exec().then(categories => {
            res.locals.categoryList = categories;
            next();
        }).catch(e => {
            console.warn("error occurred in Model<Category>", e);
            res.locals.categoryList = [];
            next();
        })
    },

    loadCategory: (req, res, next) => {
        const cid = req.params.cid;
        Category.findById(cid).exec().then(cat => {
            if (cat == null) {
                next(new Error("Category ID is invalid!!"));
                return;
            }
            res.locals.category = cat;
            next();
        }).catch(e => {
            console.error("error occurred in Model<Category>", e);
            next(e);
        });
    },

    loadThreads: (req, res, next) => {
        Thread.find({category: res.locals.category}).sort({updatedAt: -1}).exec().then(threads => {
            res.locals.threadList = threads;
            next();
        }).catch(e => {
            console.warn("error occurred in Model<Thread>", e);
            res.locals.threadList = [];
            next();
        });
    },

    loadThread: (req, res, next) => {
        Thread.findById(req.params.tid).exec().then(thr => {
            if (thr == null) {
                console.error(`thread id: ${req.params.tid}`);
                next(new Error("Thread Id is invalid!!"));
                return;
            }
            res.locals.thread = thr;
            next();
        }).catch(e => {
            console.error("error occurred in Model<Thread>", e);
            next(e);
        });
    },

    loadMessages: (req, res, next) => {
        if (res.locals.thread == null) {
            next(new Error("Thread is null"));
            return;
        }

        const query = Message.find({thread: res.locals.thread})
            .sort({createdAt: -1})
            .populate("user");
        if (req.path.match(/\/latest$/)) {
            query.limit(50);
        }
        query.exec().then(messages => {
            res.locals.messageList = messages;
            res.locals.messageList.reverse();
            next();
        }).catch(e => {
            console.warn("error occurred in Model<Message>", e);
            res.locals.messageList = [];
            next();
        });
    },

    requireLogin: (req, res, next) => {
        if (!res.locals.loggedIn) {
            if (req.session.refUrl == null) {
                req.session.refUrl = req.originalUrl;
            }
            res.redirect("/users/login");
            return;
        }
        next();
    },
}

module.exports = {
    BbsMiddleware: middleware,
};