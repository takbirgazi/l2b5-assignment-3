import express, { Request, Response } from "express";
import { Books } from "../models/books.model";

export const booksRoute = express.Router();

booksRoute.post("/", async (req: Request, res: Response) => {
    try {
        const body = req.body;
        const createBook = await Books.create(body);
        res.status(200).json({
            success: true,
            message: "Book created successfully",
            data: createBook
        })
    } catch (error) {
        res.status(404).json({
            message: "Validation failed",
            success: false,
            error: error
        });
    }
});

booksRoute.get("/", async (req: Request, res: Response) => {
    try {
        const allBooks = await Books.find();
        res.status(200).json({
            success: true,
            message: "Books retrieved successfully",
            data: allBooks
        })
    } catch (error) {
        res.status(404).json({
            message: "Validation failed",
            success: false,
            error: error
        });
    }
});

booksRoute.get("/:bookId", async (req: Request, res: Response) => {
    try {
        const bookId = req.params.bookId;
        const book = await Books.findById(bookId);
        res.status(200).json({
            success: true,
            message: "Books retrieved successfully",
            data: book
        })
    } catch (error) {
        res.status(404).json({
            message: "Validation failed",
            success: false,
            error: error
        });
    }
});

booksRoute.put("/:bookId", async (req: Request, res: Response) => {
    try {
        const bookId = req.params.bookId;
        const body = req.body;
        const updatedBook = await Books.findByIdAndUpdate(bookId, body, { new: true });
        res.status(200).json({
            success: true,
            message: "Book updated successfully",
            data: updatedBook
        })
    } catch (error) {
        res.status(404).json({
            message: "Validation failed",
            success: false,
            error: error
        });
    }
});

booksRoute.delete("/:bookId", async (req: Request, res: Response) => {
    try {
        const bookId = req.params.bookId;
        await Books.findByIdAndDelete(bookId);
        res.status(200).json({
            success: true,
            message: "Book deleted successfully",
            data: null
        })
    } catch (error) {
        res.status(404).json({
            message: "Validation failed",
            success: false,
            error: error
        });
    }
})