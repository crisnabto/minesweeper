/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Cell from './Cell';
import '../css/Board.css';

function Board({ props }) {
  const { difficulty, handleCellClick, renderContent, gameOver } = props;
  const [board, setBoard] = useState([]);
  const [level] = useState(difficulty);

  const countBombs = (newBoardLine, newBoard) => {
    newBoardLine.forEach((cell) => {
      let bombsCount = 0;

      for (let row = -1; row <= 1; row++) {
        for (let col = -1; col <= 1; col++) {
          // finds current cell
          const isCurrentCell = row === 0 && col === 0;

          // checks if its inside the board
          const isInsideBoard = cell.row + row >= 0 && cell.col + col >= 0 &&
            cell.row + row < newBoard.length && cell.col + col < newBoard[0].length;

          // if its not the current cell and it is inside the board, counts bombs around
          if (!isCurrentCell && isInsideBoard) {
            const neighborCell = newBoard[cell.row + row][cell.col + col];
            if (neighborCell.isBomb) {
              bombsCount++;
            }
          }
        }
      }
      cell.neighborBombCount = bombsCount;
      // console.log(cell);
    })
  }

  useEffect(() => {
    // creates board based on level
    const getBoardSettings = (level) => {
      const settings = {
        easy: { rows: 8, cols: 8, bombs: 10 },
        medium: { rows: 12, cols: 12, bombs: 30 },
        hard: { rows: 16, cols: 16, bombs: 50 }
      };
      return settings[level];
    };
    const { rows, cols, bombs } = getBoardSettings(level);

    const newBoard = [];

    // creates x rows with x cells inside
    for (let i = 0; i < rows; i++) {
      const row = [];

      for (let j = 0; j < cols; j++) {
        row.push({
          row: i,
          col: j,
          isBomb: false,
          isRevealed: false,
          isFlagged: false,
          neighborBombCount: 0
        });
      }

      newBoard.push(row);
    }

    // creates random bombs based on level 
    let bombCount = 0;

    while (bombCount < bombs) {
      const randomRow = Math.floor(Math.random() * rows);
      const randomCol = Math.floor(Math.random() * cols);

      if (!newBoard[randomRow][randomCol].isBomb) {
        newBoard[randomRow][randomCol].isBomb = true;
        bombCount++;
      }
    }

    // checks if each cell of the board has bombs around
    newBoard.forEach((line) => countBombs(line, newBoard))

    setBoard(newBoard);
  }, [])

  // console.table(board);

  return (
    <div>
      {board.map((line, rowIndex) => (
        <div key={rowIndex} className="rowContainer">
          {line.map((cell, columnIndex) => (
            <div key={`${rowIndex}-${columnIndex}`} className="cellContainer">
              <Cell props={{ cell, handleCellClick, renderContent, gameOver }} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Board;

