import { useState } from "react";
import GameBoard from "./components/GameBoard"
import Player from "./components/Player"
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from './winning-combinations';
import GameOver from "./components/GameOver";

const PLAYERS = {
  X: 'Player 1',
  O: 'Player 2',
};

const INITIAL_GAMEBOARD = [
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

function deriveWinner(gameBoard, players) {
  let winner;

  for (const combinations of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combinations[0].row][combinations[0].column];
    const secondSquareSymbol = gameBoard[combinations[1].row][combinations[1].column];
    const thirdSquareSymbol = gameBoard[combinations[2].row][combinations[2].column];

    if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
      winner = players[firstSquareSymbol].toUpperCase();
    }
  }

  return winner;
}

function deriveGameBoard(gameTurns) {
  let gameBoard = [...INITIAL_GAMEBOARD.map(array => [...array])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  return gameBoard;
}

function App() {
  const [players, setPlayers] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]);

  const gameBoard = deriveGameBoard(gameTurns);
  const activePlayer = deriveActivePlayer(gameTurns);
  const winner = deriveWinner(gameBoard, players);
  let isDraw = gameTurns.length === 9 && !winner;

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
          <Player name={players.X} symbol='X' isActive={activePlayer === 'X'} handleSave={handleSavePlayerName}/>
          <Player name={players.O} symbol='O' isActive={activePlayer === 'O'} handleSave={handleSavePlayerName}/>
        </ol>
        {(winner || isDraw) && <GameOver winner={winner} rematch={handleRematch}/>}
        <GameBoard onSelectSquare={handleClickChangePlayer} board={gameBoard} />
      </div>
      <Log turns={gameTurns}/>
    </main>
  )
}

export default App
