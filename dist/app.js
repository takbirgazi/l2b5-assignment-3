"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const books_controller_1 = require("./app/controllers/books.controller");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api", books_controller_1.booksRoute);
app.get('/api', (req, res) => {
    try {
        res.status(200).json({
            success: true,
            message: "Welcome to library management system"
        });
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: error
        });
    }
});
exports.default = app;
