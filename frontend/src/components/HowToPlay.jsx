import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleQuestion } from '@fortawesome/free-regular-svg-icons';
import "./HowToPlay.css";

const HowToPlay = () => {
    const [showHowToPlay, setShowHowToPlay] = useState(false);

    return (
        <div>
            <FontAwesomeIcon  className="how-to-play-button" onClick={() => setShowHowToPlay(true)} icon={faCircleQuestion} />
            {showHowToPlay && (
                <div className="overlay" onClick={() => setShowHowToPlay(false)}>
                    <div className="how-to-play-content" onClick={(e) => e.stopPropagation()}>
                        <h2>How to Play</h2>
                        <ul>
                            <li>Each Kanji belongs to one of four categories.</li>
                            <li>Selecting four Kanji in a category and submitting completes the category.</li>
                            <li>Complete all four categoies to win.</li>
                        </ul>
                        <h3>Note</h3>
                        <ul>
                            <li>Some Kanji may belong to multiple categories, so be careful.</li>
                            <li>Some readings of Kanji can be obscure.</li>
                            <li>Since the puzzles are generated, it is possible for a puzzle to be unfair.</li>
                        </ul>
                    </div>
                </div>
            )}
        </div>
    )
};

export default HowToPlay;