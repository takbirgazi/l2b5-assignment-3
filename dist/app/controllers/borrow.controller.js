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
exports.borrowRoute = void 0;
const express_1 = __importDefault(require("express"));
const borrow_model_1 = require("../models/borrow.model");
const books_model_1 = require("../models/books.model");
const mongodb_1 = require("mongodb");
exports.borrowRoute = express_1.default.Router();
exports.borrowRoute.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        // Get the book and check
        const bookAggArr = yield books_model_1.Books.aggregate([
            { $match: { _id: new mongodb_1.ObjectId(body.book) } },
            { $project: { copies: 1, _id: 1 } }
        ]);
        const bookAgg = bookAggArr[0] || null;
        if (bookAgg.copies > 0 && bookAgg.copies >= body.quantity) {
            const borrowData = yield borrow_model_1.Borrow.create(body);
            // Update the books copies after borrowing
            yield books_model_1.Books.updateOne({ _id: new mongodb_1.ObjectId(body.book) }, Object.assign({ $inc: { copies: -body.quantity } }, (bookAgg.copies === body.quantity && { $set: { available: false } })));
            res.status(200).json({
                success: true,
                message: "Book borrowed successfully",
                data: borrowData
            });
        }
        else {
            res.status(400).json({
                success: false,
                message: "Not enough copies available",
                data: null
            });
        }
    }
    catch (error) {
        res.status(500).json({
            message: "Validation failed",
            success: false,
            error
        });
    }
}));
exports.borrowRoute.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allBorrow = yield borrow_model_1.Borrow.find();
        res.status(200).json({
            success: true,
            message: "Borrowed books summary retrieved successfully",
            data: allBorrow
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Failed to retrieve borrowed books",
            success: false,
            error
        });
    }
}));
// borrowRoute.get("/", async (req: Request, res: Response) => {
//     try {
//         const summary = await Borrow.aggregate([
//             {
//                 // Group borrow records by book and sum the quantity
//                 $group: {
//                     _id: "$book", // this is the book's ObjectId
//                     totalQuantity: { $sum: "$quantity" }
//                 }
//             },
//             {
//                 // Join with books collection
//                 $lookup: {
//                     from: "books",
//                     localField: "book",       // book ID from group
//                     foreignField: "_id",     // book ID in books collection
//                     as: "bookInfo"
//                 }
//             },
//             {
//                 // Flatten bookInfo array
//                 $unwind: "$bookInfo"
//             },
//             {
//                 // Final structure
//                 $project: {
//                     _id: 0,
//                     totalQuantity: 1,
//                     book: {
//                         title: "$bookInfo.title",
//                         isbn: "$bookInfo.isbn"
//                     }
//                 }
//             }
//         ]);
//         res.status(200).json({
//             success: true,
//             message: "Borrowed books summary retrieved successfully",
//             data: summary
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({
//             success: false,
//             message: "Failed to retrieve borrowed books summary",
//             error
//         });
//     }
// });
