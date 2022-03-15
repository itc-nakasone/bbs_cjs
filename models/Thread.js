"use strict";

const {Schema, model} = require("mongoose");

const schema = new Schema({
    title: {
        type: String,
        required: true,
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category",
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
}, {
    timestamps: true,
});

module.exports = {
    Thread: model("Thread", schema),
};