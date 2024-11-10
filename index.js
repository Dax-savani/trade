const express = require("express");
const mongoose = require("mongoose");
const app = express();
const Trade = require('./tradeModel')
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 4000;

//connection to database
const connectionDB = async (database) => {
    await mongoose
        .connect(database)
        .then(() =>
            console.log(`Successfully connected to : ${mongoose.connection.host}`)
        )
        .catch((err) => console.log(`Err : ${err}`));
};

connectionDB(process.env.DB_CONNECTION_STRING);

//Middlewares


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Routes

app.get("/", (req, res) => {
    res.send("Hello From Server");
});
// CRUD Routes for Trade
// Create a new trade
app.post("/api/trade", async (req, res) => {
    try {
        const trade = await Trade.create(req.body); // Using create method
        res.status(201).json(trade);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


app.get("/api/trade", async (req, res) => {
    try {
        const trades = await Trade.find();
        res.status(200).json(trades);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


app.get("/api/trade/:id", async (req, res) => {
    try {
        const trade = await Trade.findById(req.params.id);
        if (!trade) return res.status(404).json({ message: "Trade not found" });
        res.status(200).json(trade);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put("/api/trade/:id", async (req, res) => {
    try {
        const updatedTrade = await Trade.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedTrade) return res.status(404).json({ message: "Trade not found" });
        res.status(200).json(updatedTrade);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});


app.delete("/api/trade/:id", async (req, res) => {
    try {
        const deletedTrade = await Trade.findByIdAndDelete(req.params.id);
        if (!deletedTrade) return res.status(404).json({ message: "Trade not found" });
        res.status(200).json({ message: "Trade deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Error handling for undefined routes
app.use((req, res, next) => {
    const error = new Error(`Not Found: ${req.originalUrl}`);
    res.status(404);
    next(error);
});

// General error handler
app.use((err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode).json({
        status: "error",
        statusCode,
        message: err.message,
        stack: err.stack
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Your Server is running at PORT ${PORT}`);
});