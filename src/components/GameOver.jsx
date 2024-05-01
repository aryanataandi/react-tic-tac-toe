function GameOver({ winner, rematch }) {
  return (
    <div id="game-over">
      <p>Game Over</p>
      {winner && <p>{winner} won!</p>}
      {!winner && <p>I'ts a draw!</p>}
      <p>
        <button onClick={rematch}>Rematch</button>
      </p>
    </div>
  );
}

export default GameOver;
