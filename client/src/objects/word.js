import Letter from "./letter";

class Word {
    constructor(word, solution) {
        this.word = word
        this.solution = solution
        this.check = this.word.split("")
        this.solutionArray = this.solution.uppercase.split("")
        this.displayArray = new Array(5)
        this.letters = this.word.split("")
    }

    create() {
        let character;

        // Tag green letters
        for (let i = 0; i < this.letters.length; i++) {

            const letter = this.letters[i].toUpperCase(); 
       
            if (letter === this.solutionArray[i]) {
                const statex = "correct"
                character = new Letter(letter.toUpperCase(), statex)
                this.solutionArray[i] = null
                this.displayArray[i] = character
                this.check[i] = null
            }
            
        }
        // Tag orange letters
        for (let j = 0; j < this.word.length; j++) {
            const letter = this.word[j].toUpperCase();
            
            if (!letter) continue;
            
            
            if (this.solutionArray.includes(letter)) {
                const state = "present";
                character = new Letter(letter.toUpperCase(), state);
                this.displayArray[this.check.indexOf(letter.toLowerCase())] = character
                this.solutionArray[this.solutionArray.indexOf(letter)] = null
                this.check[this.word.indexOf(letter.toLowerCase())] = null
            } else {
                const state = "incorrect";
                character = new Letter(letter.toUpperCase(), state);
                this.displayArray[this.check.indexOf(letter.toLowerCase())] = character
                this.solutionArray[this.solutionArray.indexOf(letter)] = null
                this.check[this.check.indexOf(letter.toLowerCase())] = null
            }
        
        }
    

    }
}

Word.prototype.toString = function() {
    return this.word;
}

export default Word;