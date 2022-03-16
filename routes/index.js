"use strict";

const {Router} = require("express");
const {HomeRoutes} = require("./HomeRoutes");
const {ThreadRoutes} = require("./ThreadRoutes");
const {UserRoutes} = require("./UserRoutes");
const {MessageRoutes} = require("./MessageRoutes");

const router = Router();

router.use("/messages", MessageRoutes);
router.use("/threads", ThreadRoutes);
router.use("/users", UserRoutes);
router.use("/", HomeRoutes);

module.exports = {
    Router: router,
};