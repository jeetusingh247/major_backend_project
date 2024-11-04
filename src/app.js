import express from "express"; // import express
import cors from "cors"; // import cors
import cookieParser from "cookie-parser"; // import cookie-parser


const app = express(); // create an express app

app.use(cors({
    origin: process.env.CORS_ORIGIN, // allow to server to accept request from different origin
    credentials: true
}));

app.use(express.json({limit: "16kb"})); // for parsing application/json
app.use(express.urlencoded({extended: true, limit: "16kb"})); // for parsing application/x-www-form-urlencoded
app.use(express.static("public")); // serve static files
app.use(cookieParser()); // parse cookies


// Routes
import  userRouter from "./routes/user.routes.js";


// routes declaration
app.use("/api/v1/users", userRouter);

export { app };