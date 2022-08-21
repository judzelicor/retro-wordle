import React from "react";
import { connect } from "react-redux";
import { Word } from "../../objects";
import {
    GameGrid,
    PlayerStatusModal
} from "../../components";

class Game extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            playerStatusModalIsVisible: false,
            playerStatus: ""
        }

        this.handlePlayerInput = this.handlePlayerInput.bind(this);
        this.acceptPlayerGuess = this.acceptPlayerGuess.bind(this);
    }

    componentDidMount() {
        window.addEventListener("keyup", this.handlePlayerInput)
    }

    handlePlayerInput(event) {

        const playerAction = event.key;
        const letterRegex = /^[A-Za-z]$/;
        const playerGuessIsValid = playerAction.match(letterRegex) ? true : false;

        const type = new Audio("/assets/sfx/type.mp3")
        const success = new Audio("/assets/sfx/submit.mp3")

        if (playerGuessIsValid && this.props.currentGuess.length < 5) {
            this.props.makeLetterGuess(playerAction.toLowerCase());
            type.play()
        }
        
        else if (playerAction === "Backspace") {
            this.props.undoLetterGuess();
        }
        
        else if (playerAction === "Enter") {
            success.play()

            if (this.props.currentGuess === this.props.solution.word) {                
                window.removeEventListener("keyup", this.handlePlayerInput)
                setTimeout(() => {
                    this.setState({ playerStatusModalIsVisible: true, playerStatus: "win" })
                }, 1500)
            }
            
            else if (this.props.guessHistory.length + 1 === 7) {
                setTimeout(() => {
                    this.setState({ playerStatusModalIsVisible: true, playerStatus: "defeat" })
                }, 1500)
            }

            this.acceptPlayerGuess(this.props.currentGuess);

        }


    }

    acceptPlayerGuess(playerGues) {
        if (this.props.guessHistory.length >= 7) return;

        if (playerGues.length < 5) {
            // TODO
            console.log("Guess must be 5 letters long.")
        }

        else if (this.props.guessHistory.includes(playerGues)) {
            // TODO
            
        }

        else {
            // TODO
            const word = new Word(this.props.currentGuess, this.props.solution);
            word.create();
            this.props.makeWordGuess(word);
            this.props.resetCurrentGuess();
        }
    }

    render() {
        console.log(this.props)
        return (
            <main className="appViewport">
                <h1>WORDITUDE</h1>
                <div className="worditudeWordDisplay__94rB">
                    <GameGrid />
                </div>
                { this.state.playerStatusModalIsVisible && <PlayerStatusModal word={this.props.solution.word} playerStatus={this.state.playerStatus} /> }
            </main>
        )
    }
}

function mapStateToProps(state) {
    const { solution } = state.solutionReducer;
    const { guessHistory, currentGuess, guessObjectsHistory } = state.guessReducer;

    return {
        solution,
        guessHistory,
        currentGuess,
        guessObjectsHistory
    }
}

function mapDispatchToProps(dispatch) {
    return {
        makeLetterGuess: (letter) =>  dispatch({ type: "guessed/letter", payload: letter }),
        undoLetterGuess: () => dispatch({ type: "undo/letter" }),
        makeWordGuess: (word) => dispatch({ type: "guessed/word", payload: word }),
        resetCurrentGuess: () => dispatch({ type: "RESET/GUESS_WORD" })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);