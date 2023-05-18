import React, { useCallback, useEffect, useState } from "react";
import '../css/Cell.css';

const Cell = ({ props }) => {
  const { handleCellClick, cell, gameOver } = props;
  const [localCell, setLocalCell] = useState(cell);

  const handleClick = () => {
    let newCell = { ...cell };
    newCell.isRevealed = true;
    setLocalCell(newCell);
    handleCellClick(cell)
  };

  const handleContextMenu = () => {
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
        <div className="emptyCell"></div>
      );
    } else if (localCell.isFlagged) {
      return <div className="isFlagged">🚩</div>;
    } else {
      return <div className="initialCell"></div>;
    }
  }, [localCell.isBomb, localCell.isFlagged, localCell.isRevealed, localCell.neighborBombCount])

  useEffect(() => {
    if (gameOver) {
      setLocalCell((prevCell) => ({
        ...prevCell,
        isRevealed: true
      }));
    } else if (!localCell.isFlagged){
      setLocalCell(cell)
    }
    renderContent();
  }, [renderContent, cell, gameOver, localCell.isFlagged]);

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
