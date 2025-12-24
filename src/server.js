import express from "express";
import { config } from "dotenv";

//import routes

import movieRoutes from './routes/MovieRoutes.js';
import authRoutes from './routes/authRoutes.js';
import { connectDB, disconnectDB } from "./config/db.js";

config()
connectDB()

const app = express();

//Body parsing middlewares
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//Api Routes
app.use("/movies",movieRoutes);
app.use("/auth",authRoutes);


const PORT = 5001;

const server = app.listen(PORT , ()=>{
    console.log(`Server running on port ${PORT}`);
})


// Handle unhandled promise rejections (e.g database connection errors)
process.on("unhandledRejection",(err)=>{
    console.error("unhandled Rejection", err);
    server.close(async ()=>{
        await disconnectDB();
        process.exit(1);
    });
});


// Handle unhandled exception
process.on("uncaughtException", async(err)=>{
    console.error("Uncaught Exception", err);
    await disconnectDB();
    process.exit(1);
});


// Graceful shutdown
process.on("SIGTERM",(err)=>{
    console.error("SIGTERM received , shutting down gracefully");
    server.close(async ()=>{
        await disconnectDB();
        process.exit(0);
    });
});



