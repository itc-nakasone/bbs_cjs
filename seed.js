"use strict";

const mongoose = require("mongoose");
const {Category} = require("./models/Category");
const {User} = require("./models/User");
const {Thread} = require("./models/Thread");
const {Message} = require("./models/Message");

const categories = [
    "ニュース", "学問", "食べ物", "趣味", "その他雑談",
];

let admin = null;
let thread = null;
let category = null;

const messageLoop = (current, end, admin, thread) => {
    return new Promise(resolve => {
        if (current > end) {
            return resolve(false);
        }

        Message.create({
            serial: current,
            content: `コメント ${current}コメ目`,
            user: admin,
            thread: thread,
        }).then(() => {
            return resolve(true);
        });
    }).then(result => {
        if (result) {
            return messageLoop(current + 1, end, admin, thread);
        }
    });
};

mongoose.connect("mongodb://localhost:27017/bbs").then(() => {
    console.info("initialize database...");
    return Message.deleteMany().exec();
}).then(() => {
    console.info("All message deleted.");
    return Thread.deleteMany().exec();
}).then(() => {
    console.info("All thread deleted.");
    return User.deleteMany().exec();
}).then(() => {
    console.info("All user deleted.");
    return Category.deleteMany().exec();
}).then(() => {
    console.info("All category deleted.");
    return Promise.all(categories.map((value, index) => {
        return Category.create({
            serial: index + 1,
            name: value
        });
    }));
}).then(() => {
    console.info("category registered.");
    return Category.findOne({name: "ニュース"}).exec();
}).then(cat => {
    category = cat;
    const temp = new User({username: "admin", view_name: "名無しの管理者"});
    return User.register(temp, "foobarhogepiyo");
}).then(user => {
    admin = user;
    console.info("Default admin user registered.");
    return Thread.create({
        title: "ニュース テストスレ",
        category: category,
        owner: admin,
    });
}).then(t => {
    thread = t;
    console.info("Test thread registered.");
    return messageLoop(1, 100, admin, thread);
}).then(() => {
    console.info("Test messages registered.");
}).then(() => {
    console.info("seed.js completed!!!");
}).catch(e => {
    console.error(e.message, e);
}).finally(() => {
    mongoose.connection.close().then();
    process.exit(0);
});

