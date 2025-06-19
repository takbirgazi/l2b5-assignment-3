import { model, Schema } from "mongoose";
import { IBooks } from "../interfaces/books.interface";


const books = new Schema<IBooks>({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    author: {
        type: String,
        required: true,
        trim: true,
    },
    genre: {
        type: String,
        required: true,
        uppercase: true,
        trim: true,
    },
    isbn: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    copies: {
        type: Number,
        required: true
    },
    available: {
        type: Boolean,
        required: true
    }
}, {
    versionKey: false,
    timestamps: true
});

export const Books = model<IBooks>("Books", books);