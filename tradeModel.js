const mongoose = require("mongoose");

const tradeSchema = new mongoose.Schema({
    buyDate: { type: Date },
    strategy: { type: String },
    entryPrice: { type: Number },
    stopLoss: { type: Number },
    target: { type: Number },
    targetRatio: { type: String },
    quantity: { type: Number },
    exitPrice: { type: Number },
    pyramiding: { type: String, default: "0 times" },
    profitOrLoss: { type: String, enum: ["profit", "loss"] },
    profitLossPrice: { type: Number },
    emotionWhenBuying: { type: String },
    emotionDuringTrade: { type: String },
    emotionWhenExiting: { type: String },
    learningFromThis: { type: String },
    mistake: { type: String },
    rating: { type: Number, min: 0, max: 10 }
}, { timestamps: true });

module.exports = mongoose.model("Trade", tradeSchema);
