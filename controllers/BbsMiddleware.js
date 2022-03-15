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
    }
}

module.exports = {
    BbsMiddleware: middleware,
};