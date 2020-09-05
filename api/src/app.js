import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import routes from "./routes.js";

import "./config/database.js";
import "express-async-error";

dotenv.config();
const { PORT } = process.env;

const app = express();
app.use(cors());
app.use(routes);

app.use((err, request, response, _) => {
    if (err instanceof Error) {
        return response.status(err.statusCode).json({
            status: "error",
            message: err.message,
        });
    }
});

app.listen(PORT || 3333, () =>
    console.log("Api is running at port " + PORT || 3333)
);
