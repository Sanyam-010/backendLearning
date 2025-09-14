import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
); //app.use for the middlewares

app.use(express.json({ limit: "16kb" })); //to setting limit of json data
app.use(express.urlencoded({ extended: true, limit: "16kb" })); //to parse url encoded data
app.use(express.static("public")); //to serve static files like images ,css
app.use(cookieParser()); //to parse cookies from the request

export { app };
