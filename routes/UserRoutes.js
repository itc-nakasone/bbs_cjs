"use strict";

const {Router} = require("express");
const {BbsMiddleware} = require("../controllers/BbsMiddleware");
const {UsersController} = require("../controllers/UsersController");

const router = Router();

router.get("/login", UsersController.login);
router.post("/login", UsersController.authenticate);
router.get("/success", UsersController.success, BbsMiddleware.redirect);
router.get("/logout", UsersController.logout, BbsMiddleware.redirect);

module.exports = {
    UserRoutes: router,
};