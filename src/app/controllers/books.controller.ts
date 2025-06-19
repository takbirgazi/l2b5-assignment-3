import express, { Request, Response } from "express";
import { Books } from "../models/books.model";

export const booksRoute = express.Router();

booksRoute.post("/books", async (req: Request, res: Response) => {
    try {
        const body = req.body;
        const createBook = await Books.create(body);
        res.status(200).json({
            success: true,
            message: "Book created successfully",
            data: createBook
        })
    } catch (error) {
        res.status(400).json({
            message: "Validation failed",
            success: false,
            error: error
        });
    }
});

booksRoute.get("/books", async (req: Request, res: Response) => {
    try {
        const allBooks = await Books.find();
        res.status(200).json({
            success: true,
            message: "Books retrieved successfully",
            data: allBooks
        })
    } catch (error) {
        res.status(400).json({
            message: "Validation failed",
            success: false,
            error: error
        });
    }

})