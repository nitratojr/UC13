import { error } from "console";
import { AppDataSource } from "./config/data-source";
import express, { Application } from "express";

const app: Application = express();

app.use(express.json());

AppDataSource.initialize().then(() => {
    app.listen(3000, () => {
        console.log("Server is running on http://localhost:3000");
    })
}).catch((error) => {
    console.error("Error during Data Source initialization:", error);
})
    