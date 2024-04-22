import { useState } from 'react';

export default function Player({ name, symbol, isActive }) {
  const [isEditing, setIsEditing] = useState(false);
  const [playerName, setPlayerName] = useState(name);

  const handleClick = () => {
    setIsEditing((editing) => !editing);
  };

  const handleChange = (event) => {
    setPlayerName(event.target.value);
  };

  let playerNameField = <span className="player-name">{playerName}</span>;

  if (isEditing) {
    playerNameField = <input type="text" className="player-name" value={playerName} onChange={handleChange} required />;
  }

  return (
    <li className={isActive ? 'active' : undefined}>
      <span className="player">
        {playerNameField}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleClick}>{isEditing ? 'Save' : 'Edit'}</button>
    </li>
  );
}
