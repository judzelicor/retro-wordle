import React from "react";
import Key from "./Key";
import "./styles.css";

class Keyboard extends React.PureComponent {
    render() {
        return (
            <div className="keyboard__KGt5">
                <div className="keyboardRow__KGt5">
                    {
                        ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"].map((character, index) => {
                            return (
                                <Key value={character}  />
                            )
                        })
                    }
                </div>
                <div className="keyboardRow__KGt5">
                    {
                        ["A", "S", "D", "F", "G", "H", "J", "K", "L"].map((character, index) => {
                            return (
                                <Key value={character}  />
                            )
                        })
                    }
                </div>
                <div className="keyboardRow__KGt5">
                    {
                        ["Enter", "Z", "X", "C", "V", "B", "N", "M", "Del"].map((character, index) => {
                            return (
                                <Key value={character}  />
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

export default Keyboard;