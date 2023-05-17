import React from 'react';
import Cell from './Cell';

function Board({props}) {
  let board = [];

  for (let i = 0; i < props.rows; i++) {
    let line = [];
    board.push(line);
    for (let j = 0; j < props.columns; j++) {
      let cell = {
        x: j,
        y: i,
        nearbyMines: 0,
        isOpen: false,
        isBomb: false,
        hasFlag: false
      };
      line.push(cell);
    }
  }

  // create bombs
  let i = 0;
  while (i < props.bombs) {
    let x = Math.floor(Math.random() * props.rows);
    let y = Math.floor(Math.random() * props.columns);
    let randomCell = board[x][y];

    if (randomCell.isBomb === false) {
      randomCell.isBomb = true;
      i++;
    }
  }
  // console.table(board);

  return (
    <div>
      {board.map((line, rowIndex) => (
        <div key={rowIndex} className="row" style={ {display: 'flex'}}>
          {line.map((cell, columnIndex) => (
            <div key={`${rowIndex}-${columnIndex}`} className="cell" style={ {border: '1px solid black', padding: '10px', display: 'flex'}}>
              <Cell props={cell}/>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Board;

