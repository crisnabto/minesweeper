import React, { useCallback, useEffect, useState } from "react";
import '../css/Cell.css';

const Cell = ({ props }) => {
  const { handleCellClick, cell, gameOver, board } = props;
  const [localCell, setLocalCell] = useState(cell);

  const handleClick = () => {
    let newCell = { ...cell };
    newCell.isRevealed = true;
    setLocalCell(newCell);
    handleCellClick(localCell, board)
  };

  const handleContextMenu = (e) => {
    e.preventDefault()
    let newCell = { ...localCell };
    newCell.isFlagged = !newCell.isFlagged;
    setLocalCell(newCell);
  };

  const renderContent = useCallback(() => {
    if (localCell.isRevealed) {
      return localCell.isBomb ? (
        <div className="isBomb">💣</div>
      ) : localCell.neighborBombCount > 0 ? (
        <div className="hasBombsAround">{localCell.neighborBombCount}</div>
      ) : (
        <div className="emptyCell">&nbsp;</div>
      );
    } else if (localCell.isFlagged) {
      return <div className="isFlagged">🚩</div>;
    } else {
      return <div className="initialCell"></div>;
    }
  }, [localCell.isBomb, localCell.isFlagged, localCell.isRevealed, localCell.neighborBombCount])

  useEffect(() => {
    if (gameOver && localCell.isBomb) {
      setLocalCell((prevCell) => ({
        ...prevCell,
        isRevealed: true,
        isFlagged: false
      }));
    } else if (!localCell.isFlagged){
      setLocalCell(cell);
    }
    renderContent();
  }, [renderContent, gameOver, localCell.isFlagged, cell, localCell.isBomb]);

  return (
    <div
    className={`cell ${cell.isRevealed ? 'revealed' : ''}`}
    onClick={handleClick}
    onContextMenu={handleContextMenu}
  >
    {renderContent()}
  </div>
  );
};

export default Cell;
