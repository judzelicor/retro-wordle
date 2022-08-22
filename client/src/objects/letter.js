class Letter {
    constructor(letter, state) {
        this.character = letter
        this.state = state
        this.hasBeenRevealed = false
    }
}

Letter.prototype.toString = function() {
    return this.character;
}

export default Letter;