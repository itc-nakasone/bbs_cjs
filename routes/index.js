"use strict";

const {Router} = require("express");
const {HomeRoutes} = require("./HomeRoutes");

const router = Router();

router.use("/", HomeRoutes);

module.exports = {
    Router: router,
};