import { Server } from "http";
import app from "./app";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const PORT = 3000;
let server: Server;


async function main() {
    try {
        // const dbConn = process.env.DATABASE_CONN;
        // if (!dbConn) {
        //     throw new Error("Database Connection Failed");
        // }
        await mongoose.connect(`mongodb+srv://takbirgazi:NoteApp@cluster0.eklml.mongodb.net/library-management?retryWrites=true&w=majority&appName=Cluster0`);
        server = app.listen(PORT, () => {
            console.log(`Server is running at localhost:${PORT}`);
        });
    } catch (error) {
        console.log("There is an error!", error);
    }
};
main();