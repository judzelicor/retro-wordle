import React from "react";
import { connect } from "react-redux";
import GridRow from "./GridRow";
import { v4 as uuidv4 } from "uuid";

class GameGrid extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment key={uuidv4()}>
                {
                    [...this.props.guessObjectsHistory, ...Array(7 - this.props.guessObjectsHistory.length)].map((word, index) => {
                        console.log(word)
                        if (word) {

                            const shouldAnimate = (word.word === this.props.guessHistory[this.props.guessHistory.length - 1]) ? true : false;

                            return (
                                <div className={`worditudeWordDisplayRow__94rB ${shouldAnimate ? "animate" : "history"}`} key={uuidv4()}>
                                    <GridRow key={uuidv4()} word={ word.displayArray } />
                                </div>
                            )
                        } else {

                            return (
                                <div className="worditudeWordDisplayRow__94rB" key={uuidv4()}>
                                    <GridRow round={index} key={uuidv4()} />
                                </div>
                            )
                        }
                    })
                }
            </React.Fragment>
        )
    }
}

function mapStateToProps(state) {
    const { guessObjectsHistory, currentGuess, guessRound, guessHistory } = state.guessReducer;
    return {
        guessHistory,
        guessObjectsHistory,
        guessRound,
    }
}

export default connect(mapStateToProps)(GameGrid);