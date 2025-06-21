import express, { Request, Response } from "express";
import { Borrow } from "../models/borrow.model";
import { Books } from "../models/books.model";
import { ObjectId } from "mongodb";

export const borrowRoute = express.Router();

borrowRoute.post("/", async (req: Request, res: Response) => {
    try {
        const body = req.body;
        const bookId = new ObjectId(body.book);

        // Get the book and check
        const bookAggArr = await Books.aggregate([
            { $match: { _id: bookId } },
            { $project: { copies: 1, _id: 1 } }
        ]);
        const bookAgg = bookAggArr[0] || null;

        if (bookAgg && bookAgg.copies > 0 && bookAgg.copies >= body.quantity) {
            const borrowData = await Borrow.create({
                ...body,
                book: bookId
            });

            await Books.updateOne(
                { _id: bookId },
                {
                    $inc: { copies: -body.quantity },
                    ...(bookAgg.copies === body.quantity && { $set: { available: false } })
                }
            );
            res.status(200).json({
                success: true,
                message: "Book borrowed successfully",
                data: borrowData
            });
        } else {
            res.status(400).json({
                success: false,
                message: "Not enough copies available",
                data: null
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Validation failed",
            success: false,
            error
        });
    }
});

borrowRoute.get("/", async (req: Request, res: Response) => {
    try {
        const allBorrowBooks = await Borrow.aggregate([
            {
                $group: {
                    _id: "$book",
                    totalQuantity: { $sum: "$quantity" }
                }
            },
            {
                $lookup: {
                    from: "books",
                    localField: "_id",
                    foreignField: "_id",
                    as: "bookInfo"
                }
            },
            {
                $unwind: "$bookInfo"
            },
            {
                $project: {
                    _id: 0,
                    book: {
                        title: "$bookInfo.title",
                        isbn: "$bookInfo.isbn"
                    },
                    totalQuantity: 1
                }
            }
        ]);

        res.status(200).json({
            success: true,
            message: "Borrowed books summary retrieved successfully",
            data: allBorrowBooks
        });

    } catch (error) {
        console.error(error);
        res.status(404).json({
            success: false,
            message: "Failed to retrieve borrowed books summary",
            error
        });
    }
});

