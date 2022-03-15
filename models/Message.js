"use strict";

const {Schema, model} = require("mongoose");
const dayjs = require("dayjs");
require("dayjs/locale/ja");
const {Thread} = require("./Thread");

const schema = new Schema({
    serial: {
        type: Number,
        default: 0,
    },
    content: {
        type: String,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    thread: {
        type: Schema.Types.ObjectId,
        ref: "Thread",
    },
    deleted: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});

schema.virtual("postedAt").get(function () {
    return dayjs(this.createdAt).locals("ja").format("YYYY/MM/DD(ddd) HH:mm:ss.SSS");
});

schema.pre("save", function (next) {
    const Message = model("Message");
    const preMessage = this;
    Message.count({
        thread: this.thread,
    }).then(value => {
        preMessage.serialNumber = value + 1;
        next();
    }).catch(e => {
        next(e);
    });
});

schema.post("save", function () {
    const postMessage = this;
    Thread.findById(postMessage.thread).exec().then(thread => {
        return thread.updateOne({
            $set: {
                updatedAt: postMessage.createdAt,
            }
        });
    })
});

module.exports = {
    Message: model("Message", schema),
};