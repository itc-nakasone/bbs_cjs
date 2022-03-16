"use strict";

const {Router} = require("express");
const {BbsMiddleware} = require("../controllers/BbsMiddleware");
const {ThreadController} = require("../controllers/ThreadsController");

const router = Router();

router.get("/new/:cid", BbsMiddleware.requireLogin, BbsMiddleware.loadCategory, ThreadController.new);
router.post("/new/:cid", BbsMiddleware.requireLogin, BbsMiddleware.loadCategory, ThreadController.create, BbsMiddleware.redirect);
router.use("/:tid", BbsMiddleware.loadThread);
router.get("/:tid/latest", BbsMiddleware.loadMessages, ThreadController.index);
router.get("/:tid/all", BbsMiddleware.loadMessages, ThreadController.index);
router.get("/:tid", BbsMiddleware.loadMessages, ThreadController.index);

module.exports = {
    ThreadRoutes: router,
};