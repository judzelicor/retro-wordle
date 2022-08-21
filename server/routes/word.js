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

router.get("/:word", (request, response) => {
    let word = request.params.word;

    fs.readFile("word_bank/words_dictionary.json", (error, words) => {

        if (error) throw error;

        words = JSON.parse(words);

        word = words[word];

        if (word){
            response.json({ word: word, success: true});
        } else {
            response.json({word: request.params.word, success: false})
        }

    })

})

export default router;