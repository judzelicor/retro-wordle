import React from "react";
import { connect } from "react-redux";
import { Word } from "../../objects";
import {
    GameGrid,
    Keyboard,
    PlayerStatusModal
} from "../../components";
import axios from "axios";

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
        window.addEventListener("keydown", this.handlePlayerInput)
    }

    componentDidUpdate() {
        const successSFX = new Audio("/assets/sfx/success.mp3")
        
        if (this.props.guessHistory[this.props.guessHistory.length - 1] === this.props.solution.uppercase) {
            
            this.acceptPlayerGuess(this.props.currentGuess);
            
            setTimeout(() => {
                this.setState({ playerStatusModalIsVisible: true, playerStatus: "win" })
            }, 2300)
        }
    }

    handlePlayerInput(event) {

        const playerAction = event.key;
        const letterRegex = /^[A-Za-z]$/;
        const playerGuessIsValid = playerAction.match(letterRegex) ? true : false;

        const type = new Audio("/assets/sfx/type.mp3")
        const success = new Audio("/assets/sfx/submit.mp3")
        const error = new Audio("/assets/sfx/error.mp3")
        const undo = new Audio("/assets/sfx/delete.mp3")

        if (playerGuessIsValid && this.props.currentGuess.length < 5 && !event.metaKey) {
            this.props.makeLetterGuess(playerAction.toLowerCase());
            type.play()
        }
        
        else if (playerAction === "Backspace") {
            if (this.props.currentGuess.length > 0) {
                undo.play()
                this.props.undoLetterGuess();
            }
        }
        
        else if (playerAction === "Enter") {
            
            if (this.props.currentGuess.length === 5) {
                axios({
                    method: "GET",
                    url: `/api/word/${ this.props.currentGuess }`
                }).then(response => {
                    window.removeEventListener("keydown", this.handlePlayerInput)

                    const add = setTimeout(() => {
                        window.addEventListener("keydown", this.handlePlayerInput)

                    }, 1500)

                    if (response.data.success) {
                        if (this.props.guessHistory.length + 1 === 7 && !this.props.guessHistory.includes(this.props.currentGuess.toUpperCase())) {
                            this.acceptPlayerGuess(this.props.currentGuess);
                            success.play()
                            setTimeout(() => {
                                this.setState({ playerStatusModalIsVisible: true, playerStatus: "defeat" })
                            }, 2300)
                        } else if (this.props.guessHistory.includes(this.props.currentGuess.toUpperCase())) {
                            clearTimeout(add)
                            window.addEventListener("keydown", this.handlePlayerInput)

                            error.play()
                            this.props.toggleIncompleteWordInputAlert(true)
                        } else {
                            this.acceptPlayerGuess(this.props.currentGuess);
                            success.play()
                        }
                    } else {
                        error.play()
                        this.props.toggleIncompleteWordInputAlert(true)
                        clearTimeout(add)
                        window.addEventListener("keydown", this.handlePlayerInput)
                    }
                })
            } else {
                error.play()
                this.props.toggleIncompleteWordInputAlert(true)
            }

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
            const word = new Word(this.props.currentGuess.toUpperCase(), this.props.solution);
            word.create();
            this.props.makeWordGuess(word);
            this.props.resetCurrentGuess();
        }
    }

    render() {
        console.log(this.props)
        return (
            <main className="appViewport">
                <div className="grid">
                    <div className="flex items-center justify-center flex-col">
                        <h1>WORDITUDE</h1>
                        <div className="worditudeWordDisplay__94rB">
                            <GameGrid />
                        </div>
                    </div>
                    <Keyboard />
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
        guessObjectsHistory,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        makeLetterGuess: (letter) =>  dispatch({ type: "guessed/letter", payload: letter }),
        undoLetterGuess: () => dispatch({ type: "undo/letter" }),
        makeWordGuess: (word) => dispatch({ type: "guessed/word", payload: word }),
        resetCurrentGuess: () => dispatch({ type: "RESET/GUESS_WORD" }),
        makeWrongWordGuess: (word) => dispatch({type: "guessed/incorrect@word", payload: word}),
        toggleIncompleteWordInputAlert: (status) => dispatch({ type: "ALERT/INCOMPLETE_INPUT", payload: status })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);