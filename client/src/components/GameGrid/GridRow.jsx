import React from "react";
import { connect } from "react-redux";

import "./styles.css";

class GridRow extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props.currentGuess)
        if (this.props.word) {
            return (
                <React.Fragment>
                    {
                        this.props.word.map((letter, index) => {
                            return (
                                <div className={`worditudeLetterFence__94rB`} key={ index } data-state={ letter.state }>
                                    <div className="worditutdeLetter__94rB">{ letter.character }</div>
                                </div>
                            )
                        })
                    }
                </React.Fragment>
            )
        } else if (this.props.currentGuess) {
            if (this.props.guessObjectsHistory.length === this.props.round) {
                return (
                    [...this.props.currentGuess.split(""), ...Array(5 - this.props.currentGuess.length)].map((letter, index) => {

                        const shouldAnimate = (this.props.currentGuess.charAt(index) === letter) ? true : false;

                        return (
                            <div className={`worditudeLetterFence__94rB ${ shouldAnimate ? "pop" : ""} ${letter === "" ? "filled" : "empty"}`} key={ index } >
                                <span className="worditutdeLetter__94rB" >{ letter }</span>
                            </div>
                        )
                    })
                )
            } else {
                return (
                    <React.Fragment>
                        <div className="worditudeLetterFence__94rB empty">
                            <div className="worditutdeLetter__94rB "></div>
                        </div>
                        <div className="worditudeLetterFence__94rB empty">
                            <div className="worditutdeLetter__94rB"></div>
                        </div>
                        <div className="worditudeLetterFence__94rB empty">
                            <div className="worditutdeLetter__94rB"></div>
                        </div>
                        <div className="worditudeLetterFence__94rB empty">
                            <div className="worditutdeLetter__94rB"></div>
                        </div>
                        <div className="worditudeLetterFence__94rB empty">
                            <div className="worditutdeLetter__94rB"></div>
                        </div>
                    </React.Fragment>
                )
            }
        }
        
        else {
            return (
                <React.Fragment>
                    <div className="worditudeLetterFence__94rB empty">
                        <div className="worditutdeLetter__94rB"></div>
                    </div>
                    <div className="worditudeLetterFence__94rB empty">
                        <div className="worditutdeLetter__94rB"></div>
                    </div>
                    <div className="worditudeLetterFence__94rB empty">
                        <div className="worditutdeLetter__94rB"></div>
                    </div>
                    <div className="worditudeLetterFence__94rB empty">
                        <div className="worditutdeLetter__94rB"></div>
                    </div>
                    <div className="worditudeLetterFence__94rB empty">
                        <div className="worditutdeLetter__94rB"></div>
                    </div>
                </React.Fragment>
            )
        }
    }
}

function mapStateToProps(state) {
    const { guessHistory, currentGuess, guessObjectsHistory } = state.guessReducer;

    return {
        guessHistory,
        currentGuess,
        guessObjectsHistory
    }
}
export default connect(mapStateToProps)(GridRow);