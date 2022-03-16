"use strict";

const {Router} = require("express");
const {BbsMiddleware} = require("../controllers/BbsMiddleware");
const {ThreadController} = require("../controllers/ThreadsController");

const router = Router();

router.get("/new/:cid", BbsMiddleware.requireLogin, BbsMiddleware.loadCategory, ThreadController.new);
router.post("/new/:cid", BbsMiddleware.requireLogin, BbsMiddleware.loadCategory, ThreadController.create, BbsMiddleware.redirect);
router.use("/read/:tid", BbsMiddleware.loadThread);
router.get("/read/:tid/latest", BbsMiddleware.loadMessages, ThreadController.index);
router.get("/read/:tid/all", BbsMiddleware.loadMessages, ThreadController.index);
router.get("/read/:tid", BbsMiddleware.loadMessages, ThreadController.index);
router.get("/delete/:tid", BbsMiddleware.requireLogin, BbsMiddleware.loadThread, ThreadController.delete, BbsMiddleware.redirect);

module.exports = {
    ThreadRoutes: router,
};