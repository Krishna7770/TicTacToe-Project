//Hi, I am Krishna, and this tutorial i found on react official website : https://react.dev/learn/tutorial-tic-tac-toe
//I tried to implement and understand as much as i can instead of just copy and paste to look same output.


import { useState } from "react";

/*
function Square() {
  const [value, setvalue] = useState(null);
  //making an interactive component
  function handleClick() {
    setvalue('X');
  }

  return <button className="square" onClick={handleClick}>{value}</button>;
}
*/

/*
export default function Board() {
  return (
    <>
    <div className="board-row">
      <button className="square">1</button>
      <button className="square">2</button>
      <button className="square">3</button>
    </div >
    <div className="board-row">
      <button className="square">4</button>
      <button className="square">5</button>
      <button className="square">6</button>
    </div>
    <div className="board-row">
      <button className="square">7</button>
      <button className="square">8</button>
      <button className="square">9</button>
    </div>
    
    </>
  );
}
*/

//here the  Board component is rendering that Square component using JSX syntax:
/*
export default function Board() {
  return (
    <>
    <div className="board-row">
      <Square />
      <Square />
      <Square />
    </div >
    <div className="board-row">
      <Square />
      <Square />
      <Square />
    </div>
    <div className="board-row">
      <Square />
      <Square />
      <Square />
    </div>
    
    </>
  );
}
*/



//now adding value prop to each Square component rendered by Board component.
/*
export default function Board() {
  return (
    <>
      <div className="board-row">
        <Square value="1" />
        <Square value="2" />
        <Square value="3" />
      </div>
      <div className="board-row">
        <Square value="4" />
        <Square value="5" />
        <Square value="6" />
      </div>
      <div className="board-row">
        <Square value="7" />
        <Square value="8" />
        <Square value="9" />
      </div>
    </>
  );
}
*/

//child - (Square) component

function Square({value, onSquareClick}) {
  return <button className="square" onClick={onSquareClick}>
    {value}
  </button>
}


//parent -(Board) component
function Board() {
  const[xIsNext, setXIsNext] = useState(true);  //to determine which player goes next
  const [squares, setSquares] =useState(Array(9).fill(null));

  function handleClick(i){

    //if there is already written 'x' or 'O' then do nothing -- avoid overwrite
    if(squares[i] || checkWinner(squares)) {
      return;
    }

    const nextSquares = squares.slice(); //here i call .slice() to create a copy of the squares array instead of modifying the existing array.
    
    if(xIsNext){
      nextSquares[i] = "x";
    }
    else{
      nextSquares[i] = "O";
    }    
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  //function which reset the game to inital position!
  function handleRestart() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }

  const winner = checkWinner(squares);
  let status;
  if(winner){
    status = "Winner: "+winner;
  }
  else{
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <div className="gameTitle"><h2>TicTacToe - React Based Game</h2></div>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
      <div>
        <button onClick={handleRestart}>Play Again</button>
      </div>
    </>
  );
}

//this function will check the winner
function checkWinner(squares){
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if(squares[a] !== null && squares[a] === squares[b] && squares[a] === squares[c]){
      return squares[a];
    }
  }
  return null;
}

export default Board;