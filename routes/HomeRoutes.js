"use strict";

const {Router} = require("express");
const {BbsMiddleware} = require("../controllers/BbsMiddleware");
const {HomeController} = require("../controllers/HomeController");

const router = Router();

router.get("/", BbsMiddleware.loadCategories, HomeController.index);
router.get("/category/:cid", BbsMiddleware.loadCategory, BbsMiddleware.loadThreads, HomeController.threads);

module.exports = {
    HomeRoutes: router,
};