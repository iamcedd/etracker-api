const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");

// ROUTES
const todoRoutes = require("./api/v1/routes/todos");

// DATABASE CONNECTION
mongoose.connect(
    "mongodb://etrackeradmin:kuz9ZEefua4odhDN@e-tracker-shard-00-00-oh5ic.mongodb.net:27017,e-tracker-shard-00-01-oh5ic.mongodb.net:27017,e-tracker-shard-00-02-oh5ic.mongodb.net:27017/test?ssl=true&replicaSet=e-tracker-shard-0&authSource=admin&retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
);

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );

    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }

    next();
});

app.use("/api/v1/todos", todoRoutes);

app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message,
        },
    });
});

module.exports = app;
