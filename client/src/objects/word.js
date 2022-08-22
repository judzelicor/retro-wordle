import Letter from "./letter";

class Word {
    constructor(word, solution) {
        this.word = word
        this.guess = this.word.split("")
        this.solution = solution
        this.check = this.solution.uppercase.split("")
        this.solutionArray = this.solution.uppercase.split("")
        this.displayArray = new Array(5)
        this.letters = this.word.split("")
    }

    create() {

        // Tag green letters
        for (let i = 0; i < this.letters.length; i++) {

            const letter = this.letters[i].toUpperCase(); 
       
            if (letter === this.solutionArray[i]) {
                const statex = "correct"
                const character = new Letter(letter.toUpperCase(), statex)
                this.solutionArray[i] = null
                this.displayArray[i] = character
                this.guess[i] = null
            }
        }

        // Tag orange and incorrect letters
        for (let j = 0; j < this.word.length; j++) {
            const letter = this.guess[j];

            if (!letter) continue;

            if (this.solutionArray.includes(letter)) {
                const state = "present"
                const character = new Letter(letter, state)
                this.displayArray[this.guess.indexOf(letter)] = character
                this.solutionArray[this.solutionArray.indexOf(letter)] = null
            } else {
                console.log("incorrect letter", letter)
                const state = "incorrect"
                const character = new Letter(letter, state)
                this.displayArray[this.guess.indexOf(letter)] = character
            }

            this.guess[this.guess.indexOf(letter)] = null
        
        }

    }
}

Word.prototype.toString = function() {
    return this.word;
}

export default Word;