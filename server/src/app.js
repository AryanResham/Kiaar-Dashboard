import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'
import cookieParser from 'cookie-parser';

const app = express();
app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: true,
}));

// General Setups
app.use(express.json({limit:"16kb"})) // allow JSON requests with a limit of 16kb
app.use(express.urlencoded({extended:true, limit:"16kb"})) // allow URL-encoded requests with a limit of 16kb (allows app to interpret urls)
app.use(express.static('public')); // used to store and serve static files from the public folder
app.use(cookieParser()); // used to parse cookies from the request (CRUD Operations on browser cookies of user)


export {app};