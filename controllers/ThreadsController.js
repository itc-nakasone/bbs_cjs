"use strict";

const controller = {
    index: (req, res) => {
        res.render("threads/index");
    },
};

module.exports = {
    ThreadController: controller,
};
