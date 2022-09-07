import React from "react";
import { connect } from "react-redux";
import GridRow from "./GridRow";
import { v4 as uuidv4 } from "uuid";

class GameGrid extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            rowShouldShake: false,
            shouldShouldAnimate: false
        }
    }

    componentDidUpdate() {
        if (this.props.incompleteWordInputAlertIsVisible) {
            this.setState({rowShouldShake: true})

            setTimeout(() => {
                this.props.toggleIncompleteWordInputAlert(false)
                this.setState({rowShouldShake: false})
            }, 300)
        }


    }

    render() {
        return (
            <React.Fragment key={uuidv4()}>
                {
                    [...this.props.guessObjectsHistory, ...Array(7 - this.props.guessObjectsHistory.length)].map((word, index) => {
                        if (word) {
                            // const shouldAnimate = (word.word === this.props.guessHistory[this.props.guessHistory.length - 1]) ? true : false;
                            const shouldAnimate = word.hasBeenRevelead
                            word.hasBeenRevelead = true
                            
                            return (
                                <div className={`worditudeWordDisplayRow__94rB ${shouldAnimate ? "history" : "animate"}`} key={uuidv4()}>
                                    <GridRow key={uuidv4()} word={ word.displayArray } />
                                </div>
                            )
                        } else if (this.props.guessHistory.length === index) {
                            const rowShouldShake = this.state.rowShouldShake && (this.props.guessHistory.length === index ? "shake" : "");

                            return (
                                <div key={ uuidv4() } className={`worditudeWordDisplayRow__94rB ${rowShouldShake}`}>
                                    <GridRow round={index} key={uuidv4()} />
                                </div>
                            )
                        } else {
                            return (
                                <div key={ uuidv4() } className={`worditudeWordDisplayRow__94rB`}>
                                    <GridRow round={index} key={uuidv4()} />
                                </div>
                            )
                        }
                    })
                }
                {/* {
                    [...this.props.guessObjectsHistory].map((word, index) => {
                        // const shouldAnimate = (word.word === this.props.guessHistory[this.props.guessHistory.length - 1]) ? true : false;
                        return (
                            <div className={`worditudeWordDisplayRow__94rB ${word.hasBeenRevealed ? "animate" : "history"}`} key={uuidv4()}>
                                <GridRow key={uuidv4()} word={ word.displayArray } />
                            </div>
                        )
                    })
                }
                {
                    this.currentGuess.length < 5 && <GridRow currentGuess={this.props.currentGuess} />
                }
                {
                    [...Array(7 - this.props.guessObjectsHistory.length)].map((word, index) => {
                        const shouldAnimate = (word.word === this.props.guessHistory[this.props.guessHistory.length - 1]) ? true : false;
                        return (
                            <div className={`worditudeWordDisplayRow__94rB ${shouldAnimate ? "animate" : "history"}`} key={uuidv4()}>
                                <GridRow key={uuidv4()} word={ word.displayArray } />
                            </div>
                        )
                    })
                } */}
            </React.Fragment>
        )
    }
}

function mapStateToProps(state) {
    const { guessObjectsHistory, currentGuess, wrongGuesses, guessHistory } = state.guessReducer;
    const { incompleteWordInputAlertIsVisible } = state.alertReducer;
    return {
        guessHistory,
        guessObjectsHistory,
        wrongGuesses,
        incompleteWordInputAlertIsVisible
    }
}

function mapDispatchToProps(dispatch) {
    return {
        toggleIncompleteWordInputAlert: (status) => dispatch({ type: "ALERT/INCOMPLETE_INPUT", payload: status })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameGrid);