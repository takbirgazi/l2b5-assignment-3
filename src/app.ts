import express, { Application, Request, Response } from "express";
import { booksRoute } from "./app/controllers/books.controller";
import { borrowRoute } from "./app/controllers/borrow.controller";
import cors from "cors"

const app: Application = express();
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:5173", "https://library-management-system-nu-eight.vercel.app"]
}))

app.use("/api/books", booksRoute);
app.use('/api/borrow', borrowRoute);

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