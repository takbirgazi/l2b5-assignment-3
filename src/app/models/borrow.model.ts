import { model, Schema } from "mongoose";
import { IBorrow } from "../interfaces/borrow.interface";


const borrow = new Schema<IBorrow>({
    book: String,
    quantity: Number,
    dueDate: String
}, {
    versionKey: false,
    timestamps: true
});

export const Borrow = model<IBorrow>('Borrow', borrow);