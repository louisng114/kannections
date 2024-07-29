import Game from "./Game";
import HowToPlay from "./HowToPlay";
import "./GamePage.css"

const GamePage = ({ jlpt }) => {
    console.log("Rendering GamePage"); // Debugging
    return (
        <div>
            <div className="buttons-container">
                <HowToPlay />
            </div>
            <Game jlpt={jlpt} />
        </div>
    )
};

export default GamePage;