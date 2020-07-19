import express from "express";
import bodyParser from "body-parser";

import App from "./app";

// Create a new App instance
const app = new App({
    port: process.env.PORT || 3000,
    mongoUri: process.env.mongoURI || 'mongodb://localhost:27017/vikeper',
    middlewares: [
        express.json(),
        bodyParser.json(),
        bodyParser.urlencoded({
            extended: true
        })
    ]
})

// Starts the server
app.listen();
