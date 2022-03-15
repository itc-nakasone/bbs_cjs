"use strict";

const controller = {
    index: (req, res) => {
        res.render("home/index");
    },

    threads: (req, res) => {
        res.render("home/threads");
    }
}

module.exports = {
    HomeController: controller,
};