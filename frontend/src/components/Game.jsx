import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import fetchKanji from "../helpers/fetchKanji";
import win from "../helpers/win";
import KanjiPanel from "./KanjiPanel.jsx";
import { Spinner, Container, Row, Col, Button, Table } from "react-bootstrap";
import "./Game.css";

const Game = ({ jlpt }) => {
    const [categories, setCategories] = useState([]);
    const [shuffledKanji, setShuffledKanji] = useState([]);
    const [selectedKanji, setSelectedKanji] = useState([]);
    const [completedCategories, setCompletedCategories] = useState([]);
    const [perfect, setPerfect] = useState(true);
    const [message, setMessage] = useState("");
    const [showMessage, setShowMessage] = useState(false);

    const { user } = useContext(AuthContext);

    // get categories on page load with useEffect
    const getCategories = async () => {
        const categories = await fetchKanji(jlpt);
        setCategories(categories);
    }

    useEffect(() => {
        getCategories();
    }, []);

    // get shuffled Kanji using categories with useEffect
    const shuffleKanji = (categories) => {
        let kanjiArray = categories.flatMap(category => category.kanji);
        for (let i = 15; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [kanjiArray[i], kanjiArray[j]] = [kanjiArray[j], kanjiArray[i]];
        }
        return kanjiArray;
    };

    useEffect(() => {
        setShuffledKanji(shuffleKanji(categories));
    }, [categories]);

    const handleKanjiClick = (kanji) => {
        if (selectedKanji.indexOf(kanji) === -1 && selectedKanji.length <= 3) {
            setSelectedKanji([...selectedKanji, kanji]);
        } else {
            setSelectedKanji((currentKanji) => currentKanji.filter((ele) => ele !== kanji));
        }
    };

    // check if selected kanji match any category
    const checkGroup = () => {
        // Display message if less than 4 Kanji are selected
        if (selectedKanji.length < 4) {
            displayMessage("Must select four Kanji");
        } else {
            const category = categories.find(cat => 
                cat.kanji.every(item => selectedKanji.includes(item))
            );
            if (category) {
                setCompletedCategories((categories) => [...categories, category.category]);
                setShuffledKanji(shuffledKanji.filter(kanji => !selectedKanji.includes(kanji)));
                if (user && completedCategories.length === 3) {
                    win(user.username, jlpt, perfect);
                }
            } else {
                // Display message if the selected group is incorrect
                setPerfect(false);
                displayMessage('Incorrect group; try again.');
            }
        }
    };

    // Display message for 1 second
    const displayMessage = (text) => {
        setMessage(text);
        setShowMessage(true);
        setTimeout(() => {
            setShowMessage(false);
        }, 1500);
    };

    if (categories.length !== 4) {
        return (
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        )
    }
    
    return (
        <>
            <Container className="board">
                {Array.from({ length: shuffledKanji.length / 4 }).map((_, rowIndex) => (
                    <Row key={rowIndex}>
                        {shuffledKanji.slice(4 * rowIndex, 4 * rowIndex + 4).map((kanji, colIndex) => (
                            <Col
                                key={colIndex}
                                className={`p-3 m-1 border rounded-4 kanji ${selectedKanji.includes(kanji) ? 'selected' : ''}`}
                                onClick={() => handleKanjiClick(kanji)}
                                >
                                <KanjiPanel
                                    kanji={kanji}
                                    selectedKanji={selectedKanji} />
                            </Col>
                        ))}
                    </Row>
                ))}
                {completedCategories.length < 4 &&
                    <Button className="m-3" variant="dark" onClick={() => checkGroup()}>Submit</Button>}
                {/* Display message */}
                {showMessage && <div className="message">{message}</div>}
                {/* display message and restart button upon winning */}
                {completedCategories.length === 4 &&
                    <>
                        <p className="yatta">やった！</p>
                        <Button className="m-3" variant="dark" onClick={() => window.location.reload()}>Start Over!</Button>
                    </>}
            </Container>
            {/* show categories */}
            <Table bordered hover className="m-3">
                <thead>
                    <tr>
                        <th className="title">Categories</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((category, index) => (
                        <tr key={index}>
                            <td className={`${completedCategories.includes(category.category) ? `completed-${index}` : ''}`}>{category.category}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
};

export default Game;
