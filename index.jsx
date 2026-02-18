const { useState } = React;

export function Board() {
  const [player, setPlayer] = useState("X");
  const [isGameOver, setIsGameOver] = useState(false);
  const [isDraw, setIsDraw] = useState(false);
  const [squares, setSquares] = useState(["", "", "", "", "", "", "", "", ""]);

  function togglePlayer() {
    if (player === "X") {
      setPlayer("O");
    } else {
      setPlayer("X");
    }
}

  function fillSquare(id) {
    if (!isGameOver && !squares[id]) {
      setSquares(prev => prev.map((square, index) => {
        if (id === index) {
          return player;
        }
        return square;
      }));
      if (checkWin(id) || checkDraw(id)) {
        setIsGameOver(true);
      } else {
        togglePlayer();
      }
    }
  }

  function checkSquare(id) {
    return squares[id] === player;
  }

  function checkRow(id) {
    const row = Math.floor(id / 3);
    if (checkSquare(row * 3 + ((id + 1) % 3)) && checkSquare(row * 3 + ((id + 2)  % 3))) {
      return true;
    }
    return false;
  }

  function checkColumn(id) {
    if (checkSquare((id + 3) % 9) && checkSquare((id + 6) % 9)) {
    return true;
    }
    return false;
  }

  function checkDiagonals(id) {
    if (id % 4 === 0 && checkSquare((id + 4) > 9 ? (id + 1) % 9 : id +  4) && checkSquare((id + 8) > 9 ? (id + 5) % 9 : id + 8)) {
      return true;
    } else if (0 <= id - 2 && id - 2 <= 4 && id % 2 === 0 && checkSquare( (id % 6) + 2) && checkSquare((id + 2) % 6 + 2)) {
      return true;
    }
    return false;
  }

  function checkWin(id) {
    if (checkRow(id) || checkColumn(id) || checkDiagonals(id)) {
      return true;
    }
    return false;
  }

  function checkDraw(id) {
    let count = 0;
    for (let i = 0; i < 9; i++) {
      if (squares[i] || i === id) {
        count++;
      }
    }
    if (count === 9) {
      setIsDraw(true);
      return true;
    }
    return false;
  }

  function resetGame() {
    setPlayer("X");
    setIsGameOver(false);
    setIsDraw(false);
    setSquares(["", "", "", "", "", "", "", "", ""]);
  }

  return (
    <div>
      <h1>Tic-Tac-Toe</h1>
      <p>{!isGameOver ? `Next Player: ${player}` : isDraw ? "It's a Draw!" : `Winner: ${player}`}</p>
      <div id="grid">
        <button className="square" id="0" onClick={()=>fillSquare(0)}>{squares[0]}</button>
        <button className="square" id="1" onClick={()=>fillSquare(1)}>{squares[1]}</button>
        <button className="square" id="2" onClick={()=>fillSquare(2)}>{squares[2]}</button>
        <button className="square" id="3" onClick={()=>fillSquare(3)}>{squares[3]}</button>
        <button className="square" id="4" onClick={()=>fillSquare(4)}>{squares[4]}</button>
        <button className="square" id="5" onClick={()=>fillSquare(5)}>{squares[5]}</button>
        <button className="square" id="6" onClick={()=>fillSquare(6)}>{squares[6]}</button>
        <button className="square" id="7" onClick={()=>fillSquare(7)}>{squares[7]}</button>
        <button className="square" id="8" onClick={()=>fillSquare(8)}>{squares[8]}</button>
      </div>
      <button id="reset" onClick={resetGame}>Reset</button>
    </div>
  );
}