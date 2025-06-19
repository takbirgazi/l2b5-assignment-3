import express, { Application, Request, Response } from "express";
import { booksRoute } from "./app/controllers/books.controller";

const app: Application = express();
app.use(express.json());

app.use("/api", booksRoute)

app.get('/', (req: Request, res: Response) => {
    try {
        res.status(200).json({
            success: true,
            message: "Welcome to library management system"
        })
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error
        })
    }
});

export default app;