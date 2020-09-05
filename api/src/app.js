import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import "express-async-errors";

import "./config/database.js";
import routes from "./routes.js";
import AppError from "./shared/AppError.js";

dotenv.config();
const { PORT } = process.env;

const app = express();
app.use(cors());
app.use(routes);

app.use((err, request, response, _) => {
    if (err instanceof AppError) {
        return response.status(err.statusCode).json({
            status: "error",
            message: err.message,
        });
    }
});

app.listen(PORT || 3333, () =>
    console.log("Api is running at port " + PORT || 3333)
);
