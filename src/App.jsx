import { useState } from "react";
import GameBoard from "./components/GameBoard"
import Player from "./components/Player"
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from './winning-combinations';
import GameOver from "./components/GameOver";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurns) {
  let currentPlayer = 'X';
  if (gameTurns.length > 0 && gameTurns[0].player == 'X') {
    currentPlayer = 'O';
  }
  return currentPlayer;
}

function App() {
  const [players, setPlayers] = useState({
    X: 'Player 1',
    O: 'Player 2',
  });
  const [gameTurns, setGameTurns] = useState([]);

  let gameBoard = [...initialGameBoard.map(array => [...array])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  let winner;

  for (const combinations of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combinations[0].row][combinations[0].column];
    const secondSquareSymbol = gameBoard[combinations[1].row][combinations[1].column];
    const thirdSquareSymbol = gameBoard[combinations[2].row][combinations[2].column];

    if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
      winner = players[firstSquareSymbol].toUpperCase();
    }
  }

  let isDraw = gameTurns.length === 9 && !winner;

  const activePlayer = deriveActivePlayer(gameTurns);

  const handleClickChangePlayer = (rowIndex, colIndex) => {
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);
      
      const updatedTurns = [{ square: { row: rowIndex, col: colIndex }, player: currentPlayer }, ...prevTurns];
      
      return updatedTurns;
    });
  }

  const handleRematch = () => {
    setGameTurns([]);
  }

  const handleSavePlayerName = (symbol, newName) => {
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol]: newName
      };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name='Player 1' symbol='X' isActive={activePlayer === 'X'} handleSave={handleSavePlayerName}/>
          <Player name='Player 2' symbol='O' isActive={activePlayer === 'O'} handleSave={handleSavePlayerName}/>
        </ol>
        {(winner || isDraw) && <GameOver winner={winner} rematch={handleRematch}/>}
        <GameBoard onSelectSquare={handleClickChangePlayer} board={gameBoard} />
      </div>
      <Log turns={gameTurns}/>
    </main>
  )
}

export default App
