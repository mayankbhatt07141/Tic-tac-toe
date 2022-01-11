import "./App.css";
import Board from "./Components/Board";
import Square from "./Components/Square";
import { useState, useEffect } from "react";

function App() {
  const [winner, setWinner] = useState(null);
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  const [square, setSquare] = useState(defaultsquare());
  const [toggleTurn, setToggleturn] = useState(true);
  function defaultsquare() {
    return new Array(9).fill(null);
  }
  useEffect(() => {
    const putComputerAt = (index) => {
      let newSquare = square;
      newSquare[index] = "o";
      setSquare([...newSquare]);
    };
    const linesThatare = (a, b, c) => {
      return lines.filter((value) => {
        const squareValues = value.map((val) => {
          return square[val];
        });
        return (
          JSON.stringify(squareValues.sort()) ===
          JSON.stringify([a, b, c].sort())
        );
      });
    };
    const emptyIndexes = square.map((value, index) => {
      return value === null ? index : null;
    });
    const playerWon = linesThatare("x", "x", "x").length > 0;
    const computerWon = linesThatare("o", "o", "o").length > 0;
    if (playerWon) {
      setWinner("x");
    }
    if (computerWon) {
      setWinner("o");
    }

    if (toggleTurn === false) {
      const winingLines = linesThatare("o", "o", null);
      if (winingLines.length > 0) {
        const winIndex = winingLines[0].filter(
          (index) => square[index] === null
        )[0];
        putComputerAt(winIndex);
        setToggleturn(!toggleTurn);
        return;
      }

      const linesToBlock = linesThatare("x", "x", null);
      if (linesToBlock.length > 0) {
        const blockIndex = linesToBlock[0].filter(
          (index) => square[index] === null
        )[0];
        putComputerAt(blockIndex);
        setToggleturn(!toggleTurn);
        return;
      }

      // const linesToContinue = linesThatare("o", null, null);
      // if (linesToContinue.length > 0) {
      //   putComputerAt(
      //     linesToContinue[0].filter((index) => square[index] === null)[0]
      //   );
      //   return;
      // }
      else {
        let x = Math.floor(Math.random() * emptyIndexes.length);
        let randomIndex = emptyIndexes[x];
        while (randomIndex === null && square.includes(null)) {
          let x = Math.floor(Math.random() * emptyIndexes.length);
          randomIndex = emptyIndexes[x];
        }
        putComputerAt(randomIndex);
      }
      setToggleturn(!toggleTurn);
    }
  }, [toggleTurn]);

  function handleSquare(index) {
    if (toggleTurn === true) {
      let newSquares = square;
      newSquares[index] = "x";
      setSquare([...newSquares]);
      setToggleturn(!toggleTurn);
    }
  }

  return (
    <div className='App'>
      <Board>
        {square.map((value, index) => {
          return (
            <Square
              x={value === "x" ? 1 : 0}
              o={value === "o" ? 1 : 0}
              onClick={() => handleSquare(index)}
              key={index}
            />
          );
        })}
      </Board>
      {winner === "x" && <div className='result green'>You WON!</div>}
      {winner === "o" && <div className='result red'>You LOST!</div>}
    </div>
  );
}

export default App;
