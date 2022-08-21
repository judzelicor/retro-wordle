import React from "react";
import ReactDOM from "react-dom";
import Confetti from "react-confetti";
import "./styles.css"

class PlayerStatusModal extends React.PureComponent {
    componentDidMount() {
        const success = new Audio("assets/sfx/success.mp3")
        const defeat = new Audio("assets/sfx/defeat.mp3")
        if (this.props.playerStatus === "win") {
            success.play();
        } else {
            defeat.play()
        }
    }

    render() {
        if (this.props.playerStatus === "win") {
            return ReactDOM.createPortal(
                <div className="playerStatusModal">
                    <Confetti
                        numberOfPieces={100}
                        colors={["#8EA25D", "#1F1F20", "#ADBA89", "#FBF8EF"]}
                        width={window.innerWidth}
                        height={window.innerHeight}
                    />
                    <div className="modalMessage">
                        <div className="tophyIcon">
                            <svg xmlns="http://www.w3.org/2000/svg"viewBox="0 0 512 512">
                                <path xmlns="http://www.w3.org/2000/svg" fill="#1f1f20" d="M411.826 77.913V0H100.174v77.913H0v133.565h33.391v33.391h33.391v33.391h33.391v33.391h33.391v33.391h33.391v33.391h33.391v33.391h-66.783v33.391h-33.391V512h311.652v-66.783h-33.391v-33.391H311.65v-33.391h33.391v-33.391h33.391v-33.391h33.391v-33.391h33.391V244.87h33.391v-33.391H512V77.913H411.826zM100.174 211.478H66.783v-33.391H33.391v-55.652h66.782v89.043zm378.435-33.391h-33.391v33.391h-33.391v-89.043h66.782v55.652z" data-original="#000000" />
                            </svg>
                        </div>
                        <p>Great job. The word is indeed "{this.props.word}"!</p>
                    </div>
                </div>,
                document.body
            )
        } else {
            return ReactDOM.createPortal(
                <div className="playerStatusModal">
                    <div className="modalMessage">
                        <p>Too bad. The word was "{this.props.word}" Better luck next time.</p>
                    </div>
                </div>,
                document.body
            )
        }
    }
}

export default PlayerStatusModal;