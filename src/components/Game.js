import React, { useState } from 'react';
import { useEffect } from 'react';
import Board from './Board';

const Game = () => {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [showBoard, setShowBoard] = useState(false);
  const [difficulty, setDifficulty] = useState('easy');

  const handleStartGame = () => {
    setIsGameStarted(true);
  };

  const handleLevelChange = (e) => {
    setDifficulty(e.target.value);
  };

  const handleCellClick = (cell) => {
    cell.isRevealed = true;
    if (cell.isBomb) {
      setGameOver(true);
    }
  };

  useEffect(() => {
    setShowBoard(true);
  }, [isGameStarted])

  return (
    <div>
      <h1>Minesweeper</h1>
      {!isGameStarted ? (
        <>
          <select value={difficulty} onChange={handleLevelChange}>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
          <button onClick={handleStartGame}>Start game</button>
        </>
      ) : showBoard ? (
        <Board props={{ difficulty, handleCellClick, gameOver }} />
      ) : null}
    </div>
  );
  
};

export default Game;