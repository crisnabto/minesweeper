import React, { useState } from 'react';
import { useEffect } from 'react';
import Board from './Board';

const Game = () => {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [showBoard, setShowBoard] = useState(false);
  const [difficulty, setDifficulty] = useState('easy');
  const [mainBoard, setMainBoard] = useState([]);

  const handleStartGame = () => {
    setIsGameStarted(true);
  };

  const handleLevelChange = (e) => {
    setDifficulty(e.target.value);
  };

  const revealEmptyCells = (cell, board) => {
    const { row, col } = cell;
  
    for (let r = row - 1; r <= row + 1; r++) {
      for (let c = col - 1; c <= col + 1; c++) {
        if (
          r >= 0 &&
          r < board.length &&
          c >= 0 &&
          c < board[0].length &&
          !board[r][c].isRevealed &&
          !board[r][c].isBomb
        ) {
          if (board[r][c].neighborBombCount > 0) {
            board[r][c].isRevealed = true;
          } else {
            board[r][c].isRevealed = true;
            revealEmptyCells(board[r][c], board);
          }
        }
      }
    }
  };

  const handleCellClick = (cell, board) => {
    const newBoard = [...board];
    const { row, col } = cell;
  
    newBoard[row][col].isRevealed = true;
    
    // if cell is empty, checks for cells around
    // if cells around are empty, check for cells around the empties...
    if (newBoard[row][col].isBomb) {
      setGameOver(true);
    } else if (newBoard[row][col].neighborBombCount === 0) {
      revealEmptyCells(newBoard[row][col], newBoard);
    }
    setMainBoard(newBoard);
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
        <Board props={{ difficulty, handleCellClick, gameOver, mainBoard }} />
      ) : null}
    </div>
  );
};

export default Game;