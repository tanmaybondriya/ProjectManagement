import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import errHandler from "./src/middlewares/error.middleware.js";
import connectDB from "./src/config/db.js";
import { generalLimitter } from "./src/utils/rateLimitter.js";
import v1Router from "./src/routes/index.js";
dotenv.config();

connectDB();

const app = express();
const port = process.env.PORT || 3000;

app.use(generalLimitter);
app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
app.use(express.json()); //so we can read json bodies
app.use("/api/v1", v1Router);
app.use(errHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
