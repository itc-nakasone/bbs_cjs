"use strict";

const {Schema, model} = require("mongoose");

const schema = new Schema({
    serial: {
        type: Number,
        default: 0,
    },
    name: {
        type: String,
        required: true,
        unique: true,
    }
});

module.exports = {
    Category: model("Category", schema),
}