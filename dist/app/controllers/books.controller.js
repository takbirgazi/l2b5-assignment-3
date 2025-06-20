"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.booksRoute = void 0;
const express_1 = __importDefault(require("express"));
const books_model_1 = require("../models/books.model");
exports.booksRoute = express_1.default.Router();
exports.booksRoute.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const createBook = yield books_model_1.Books.create(body);
        res.status(200).json({
            success: true,
            message: "Book created successfully",
            data: createBook
        });
    }
    catch (error) {
        res.status(404).json({
            message: "Validation failed",
            success: false,
            error: error
        });
    }
}));
exports.booksRoute.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { filter, sortBy = "createdAt", sort = "asc", limit = "10" } = req.query;
        // Build filter object
        const query = {};
        if (filter) {
            query.genre = filter;
        }
        // Build sort object
        const sortOrder = sort === "desc" ? -1 : 1;
        const sortObj = {};
        sortObj[sortBy] = sortOrder;
        // Limit
        const limitNum = parseInt(limit, 10) || 10;
        const allBooks = yield books_model_1.Books.find(query)
            .sort(sortObj)
            .limit(limitNum);
        res.status(200).json({
            success: true,
            message: "Books retrieved successfully",
            data: allBooks
        });
    }
    catch (error) {
        res.status(404).json({
            message: "Validation failed",
            success: false,
            error: error
        });
    }
}));
exports.booksRoute.get("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const book = yield books_model_1.Books.findById(bookId);
        res.status(200).json({
            success: true,
            message: "Books retrieved successfully",
            data: book
        });
    }
    catch (error) {
        res.status(404).json({
            message: "Validation failed",
            success: false,
            error: error
        });
    }
}));
exports.booksRoute.put("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const body = req.body;
        const updatedBook = yield books_model_1.Books.findByIdAndUpdate(bookId, body, { new: true });
        res.status(200).json({
            success: true,
            message: "Book updated successfully",
            data: updatedBook
        });
    }
    catch (error) {
        res.status(404).json({
            message: "Validation failed",
            success: false,
            error: error
        });
    }
}));
exports.booksRoute.delete("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        yield books_model_1.Books.findByIdAndDelete(bookId);
        res.status(200).json({
            success: true,
            message: "Book deleted successfully",
            data: null
        });
    }
    catch (error) {
        res.status(404).json({
            message: "Validation failed",
            success: false,
            error: error
        });
    }
}));
