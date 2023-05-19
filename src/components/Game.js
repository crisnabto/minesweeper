import React, { useState } from 'react';
import { useEffect } from 'react';
import Board from './Board';
import 'bootstrap/dist/css/bootstrap.css';
import bomb from '../images/bomb.png';
import '../css/Game.css';

const Game = () => {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [showBoard, setShowBoard] = useState(false);
  const [difficulty, setDifficulty] = useState('easy');
  const [mainBoard, setMainBoard] = useState([]);
  const [seconds, setSeconds] = useState(0);
  const [timer, setTimer] = useState(null);
  const [startReset, setStartReset] = useState('Start');
  const [victory, setVictory] = useState(false)

  const startTimer = () => {
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds + 1);
    }, 1000);
    setTimer(interval);
  };

  useEffect(() => {
    if (gameOver) {
      clearInterval(timer);
    }
  }, [gameOver, timer]);


  const handleStartGame = () => {
    clearInterval(timer);
    setSeconds(0);
    setMainBoard([]);
    setDifficulty(difficulty);
    setStartReset('Reset');
    setGameOver(false);
    setIsGameStarted(true);
    startTimer();
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

  const checkCell = (board, level) => {
    const levels = {
      easy: 90,
      medium: 114,
      hard: 206
    };

    const expectedCellsRevealed = levels[level];

    const areAllCellsRevealed = board.flatMap(row => row).filter(cell => cell.isRevealed === true);

    if (areAllCellsRevealed.length === expectedCellsRevealed) {
      setVictory(true);
      setGameOver(true);
    }
  };

  // if cell is empty, checks for cells around
  // if cells around are empty, check for cells around the empties...
  const handleCellClick = (cell, board) => {
    if (gameOver) {
      return;
    }
    const newBoard = [...board];
    const { row, col } = cell;

    newBoard[row][col].isRevealed = true;

    if (newBoard[row][col].isBomb) {
      setGameOver(true);
    } else if (newBoard[row][col].neighborBombCount === 0) {
      revealEmptyCells(newBoard[row][col], newBoard);
    }

    setMainBoard(newBoard);
  };

  useEffect(() => {
    setShowBoard(isGameStarted);
  }, [isGameStarted, difficulty])

  return (
    <div  className="card minesweeper-container" >
      <div className="title-container">
        <h1 className="h1">Minesweeper</h1>
        <img src={bomb} alt="bomb" />
      </div>

      <div className='header-container'>
        <div className="level-container">
          <select id="level" className="form-select form-select-sm" value={difficulty} onChange={handleLevelChange}>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        <button onClick={handleStartGame} className="btn btn-primary">{startReset}</button>
        </div>
      </div>

      {showBoard ? (
        <Board props={{ difficulty, handleCellClick, gameOver, mainBoard, seconds, checkCell, victory }} />
      ) : null}
    </div>
  );
};

export default Game;
