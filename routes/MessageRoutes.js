"use strict";

const {Router} = require("express");
const {BbsMiddleware} = require("../controllers/BbsMiddleware");
const {MessagesController} = require("../controllers/MessagesController");

const router = Router();

router.use("/new/:tid", BbsMiddleware.requireLogin, BbsMiddleware.loadThread);
router.get("/new/:tid", MessagesController.new);
router.post("/new/:tid", MessagesController.create, BbsMiddleware.redirect);

module.exports = {
    MessageRoutes: router,
};
