import axios from "axios";
import React from "react";
import { connect } from "react-redux";
import { Word } from "../../objects";

class Key extends React.PureComponent {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
        this.handleAction = this.handleAction.bind(this);
        this.state = {
            keyIsResponsive: true
        }
    }

    handleClick(event) {
        event.preventDefault();
        const typingSFX = new Audio("/assets/sfx/type.mp3")
        console.log(this.state.keyIsResponsive)
        const { value, makeLetterGuess, currentGuess } = this.props;
        if (currentGuess.length < 5 && this.state.keyIsResponsive) {
            typingSFX.play()
            makeLetterGuess(value.toLowerCase())
        }
    }

    handleAction(event) {
        event.preventDefault();
        const submitted = new Audio("/assets/sfx/submit.mp3")
        const error = new Audio("/assets/sfx/error.mp3")
        const {undoLetterGuess, value, currentGuess, guessHistory, toggleIncompleteWordInputAlert} = this.props;

        
        switch(value) {
            case "Enter":
                axios({
                    method: "GET",
                    url: `/api/word/${ currentGuess }`
                }).then(response => {
                    if (response.data.success && !guessHistory.includes(response.data.word.word.toUpperCase())) {
                        if (guessHistory.length >= 7) return;


                        if (currentGuess.length < 5) {
                            // TODO
                            error.play()
                            toggleIncompleteWordInputAlert(true)
                            console.log("Guess must be 5 letters long.")
                        }
                
                        else if (guessHistory.includes(currentGuess)) {
                            // TODO
                            
                        }
                
                        else {
                            // TODO
                            submitted.play()
                            const word = new Word(currentGuess.toUpperCase(), this.props.solution);
                            word.create();
                            this.props.makeWordGuess(word);
                            this.props.resetCurrentGuess();
                        }
                    } else {
                        error.play()
                            toggleIncompleteWordInputAlert(true)
                    }
                })

                return
            case "Del":
                undoLetterGuess()
                return
        }
    }

    render() {
        const { value } = this.props;

        if (value == "Enter" || value == "Del") {
            return (
                <div className="keyboardAction__KGt5">
                    <div className="keyboardKeyButton__KGt5" onClick={this.handleAction}>{ value }</div>
                </div>
            )
        } else {
            return (
                <div className="keyboardKey__KGt5">
                    <div className="keyboardKeyButton__KGt5" onClick={this.handleClick}>{ value }</div>
                </div>
            )
        }
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

export default connect(mapStateToProps, mapDispatchToProps)(Key);