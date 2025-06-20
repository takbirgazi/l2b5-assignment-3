"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Borrow = void 0;
const mongoose_1 = require("mongoose");
const borrow = new mongoose_1.Schema({
    book: {
        type: String,
        ref: "Books",
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    dueDate: {
        type: String,
        required: true
    }
}, {
    versionKey: false,
    timestamps: true
});
exports.Borrow = (0, mongoose_1.model)('Borrow', borrow);
