import { Server } from "http";
import app from "./app";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const PORT = 5000;
let server: Server;


async function main() {
    try {
        const dbConn = process.env.DATABASE_CONN;
        if (!dbConn) {
            throw new Error("Database Connection Failed");
        }
        await mongoose.connect(dbConn);
        server = app.listen(PORT, () => {
            console.log(`Server is running at localhost:${PORT}`);
        });
    } catch (error) {
        console.log("There is an error!", error);
    }
};
main();