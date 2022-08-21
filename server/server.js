import express from "express";
import {
    word
} from "./routes/index.js";

let app;
let port;

app = express();
port = 3001;

app.use("/api/word", word)

app.listen(port, () => {
    console.log(`Worditude server is running on port: ${ port }`);
})