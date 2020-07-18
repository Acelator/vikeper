import App from "./app";
import express from "express"

// Create a new App instance
const app = new App({
    port: process.env.PORT || 3000,
    mongoUri: process.env.mongoURI || 'mongodb://localhost:27017/vikeper',
    middlewares: [
        express.json()
    ]
})

// Starts the server
app.listen();
