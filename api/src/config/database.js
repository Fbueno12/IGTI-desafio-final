import mongoose from "mongoose";
import dotenv from "dotenv";
import Error from "../shared/Error.js";

dotenv.config();

const { DB_CONNECTION } = process.env;

console.log("Iniciando conexão ao mongoDB");

mongoose.connect(
    DB_CONNECTION,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    (error) => {
        if (error) {
            throw new Error(500, `mongoose connection error \n ${error}`);
        }
    }
);
