import React, { useState } from 'react';
import { useEffect } from 'react';
import Board from './Board';

const Game = () => {
    const [isGameStarted, setIsGameStarted] = useState(false);
    const [showBoard, setShowBoard] = useState(false);
    const [difficulty, setDifficulty] = useState('easy');

    const handleStartGame = () => {
        setIsGameStarted(true);
    };

    const handleLevelChange = (e) => {
        setDifficulty(e.target.value);
    };

    useEffect(() => {
        setShowBoard(true);
    }, [isGameStarted])

    if (isGameStarted === false) {
        return (
            <div>
                <h1>Minesweeper</h1>
                <select value={difficulty} onChange={handleLevelChange}>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
                <button onClick={handleStartGame}>Start game</button>
            </div>
        );
    }

    if (showBoard === true) {
        return (
            <div>
                <h1>Minesweeper</h1>
                <Board props={ {rows: 10, columns: 10, bombs: 10, flags: 10} } />
            </div>
        );

    }
};

export default Game;