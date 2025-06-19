"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Books = void 0;
const mongoose_1 = require("mongoose");
const books = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    author: {
        type: String,
        required: true,
        trim: true,
    },
    genre: {
        type: String,
        required: true,
        uppercase: true,
        trim: true,
    },
    isbn: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    copies: {
        type: Number,
        required: true
    },
    available: {
        type: Boolean,
        required: true
    }
}, {
    versionKey: false,
    timestamps: true
});
exports.Books = (0, mongoose_1.model)("Books", books);
