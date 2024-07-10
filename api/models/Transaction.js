import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    userId: { 
        type: String,
        required: true,
    },
    amount: { 
        type: Number,
        required: true,
    },
    transactionTime: {
        type: String,
    },
    itemName: { 
        type: String,
        required: true,
    },
    description: { 
        type: String,
        required: true
    },
    isRevenue: {
        type: Boolean,
        required: true,
    },
}, { timestamps: true})

export default mongoose.model("Transaction", transactionSchema)