"use strict";

const {Router} = require("express");
const {HomeRoutes} = require("./HomeRoutes");
const {ThreadRoutes} = require("./ThreadRoutes");

const router = Router();

router.use("/threads", ThreadRoutes);
router.use("/", HomeRoutes);

module.exports = {
    Router: router,
};