import dotenv from 'dotenv';
import connectDB from './db/dbConnect.js';
import {app} from './app.js'

dotenv.config({
    path: './.env'
});

connectDB()
    .then(() => {
        app.listen(process.env.PORT || 8000, ()=>{
            console.log(`Server is running on port ${process.env.PORT || 8000}`);
        })
        console.log("Database connected successfully");
    })
    .catch((error) => {
        console.error("Database connection failed:", error);
    });
app.on('error', (err) => {
    console.error("Server error:", err);
});