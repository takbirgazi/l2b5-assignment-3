import express, { Request, Response } from "express";
import { Borrow } from "../models/borrow.model";

export const borrowRoute = express.Router();

borrowRoute.post("/", async (req: Request, res: Response) => {
    try {
        const body = req.body;

        const borrowData = await Borrow.create(body)
        res.status(200).json({
            success: true,
            message: "Book borrowed successfully",
            data: borrowData
        })

    } catch (error) {
        res.status(404).json({
            message: "Validation failed",
            success: false,
            error: error
        });
    }
});

borrowRoute.get("/", async (req: Request, res: Response) => {
    try {
        const allBorrow = await Borrow.find();
        res.status(200).json({
            success: true,
            message: "Borrowed books summary retrieved successfully",
            data: allBorrow
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to retrieve borrowed books",
            success: false,
            error
        });
    }
});