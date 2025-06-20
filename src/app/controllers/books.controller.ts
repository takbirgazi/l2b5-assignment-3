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
        const { filter, sortBy = "createdAt", sort = "asc", limit = "10" } = req.query;

        // Build filter object
        const query: any = {};
        if (filter) {
            query.genre = filter;
        }

        // Build sort object
        const sortOrder = sort === "desc" ? -1 : 1;
        const sortObj: any = {};
        sortObj[sortBy as string] = sortOrder;

        // Limit
        const limitNum = parseInt(limit as string, 10) || 10;

        const allBooks = await Books.find(query)
            .sort(sortObj)
            .limit(limitNum);

        res.status(200).json({
            success: true,
            message: "Books retrieved successfully",
            data: allBooks
        });
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