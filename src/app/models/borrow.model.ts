import { model, Schema } from "mongoose";
import { IBorrow } from "../interfaces/borrow.interface";

const borrow = new Schema<IBorrow>({
    book: {
        type: Schema.Types.ObjectId,
        ref: "books",
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    dueDate: {
        type: String,
        required: true
    }
}, {
    versionKey: false,
    timestamps: true
});

export const Borrow = model<IBorrow>('Borrow', borrow);