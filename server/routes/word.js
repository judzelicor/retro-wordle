import express from "express";
import fs from "fs";

let router;
let words;

router = express.Router()

router.get("/random", (request, response) => {
    fs.readFile("word_bank/words_list.json", (error, words) => {

        if (error) throw error;

        words = JSON.parse(words);

        const words_list_length = words.length;
        
        const randomWord = words[Math.floor(Math.random() * words_list_length)];

        response.json({ word: randomWord});

    })

})

export default router;