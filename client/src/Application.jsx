import React from "react";
import axios from "axios";
import { Game } from "./pages";
import { 
    Route, 
    Routes 
} from "react-router-dom";
import "./normalize.css";
import "./global.css";
import { connect } from "react-redux";

class Application extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            solution: null
        }
    }

    componentDidMount() {
        axios({
            method: "GET",
            url: "http://babylon:3001/api/word/random",
        }).then(response => {
            const randomWord = response.data.word
            
            // this.props.addNewSolution(randomWord)
        })
    }

    render() {
        return (
            <React.Fragment>
                <Routes>
                    <Route path="/" element={ <h1>Welcome to landing page of Worditude</h1> } />
                    <Route path="/play" element={ <Game /> } />
                </Routes>
            </React.Fragment>
        )
    }
}

function mapStateToProps(state) {
    return {}
}

function mapDispatchToProps(dispatch) {
    return {
        addNewSolution: (solution) => dispatch({ type: "solution/add", payload: solution })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Application);