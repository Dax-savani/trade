const mongoose = require("mongoose");

const tradeSchema = new mongoose.Schema({
    buyDate: { type: Date, required: true },
    strategy: { type: String, required: true },
    entryPrice: { type: Number, required: true },
    stopLoss: { type: Number, required: true },
    target: { type: Number, required: true },
    targetRatio: { type: Number, required: true },
    quantity: { type: Number, required: true },
    exitPrice: { type: Number },
    pyramiding: { type: String, default: "0 times" },
    profitOrLoss: { type: String, enum: ["profit", "loss"], required: true },
    profitLossPrice: { type: Number, required: true },
    emotionWhenBuying: { type: String },
    emotionDuringTrade: { type: String },
    emotionWhenExiting: { type: String },
    learningFromThis: { type: String },
    mistake: { type: String },
    rating: { type: Number, min: 0, max: 10 }
}, { timestamps: true });

module.exports = mongoose.model("Trade", tradeSchema);
