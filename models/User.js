"use strict";

const {Schema, model} = require("mongoose");
const passport = require("passport-local-mongoose");

const schema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        match: /^[a-zA-Z][a-zA-Z0-9]*$/,
    },
    view_name: {
        type: String,
        required: true,
        unique: true,
    },
});

schema.plugin(passport);

module.exports = {
    User: model("User", schema),
};