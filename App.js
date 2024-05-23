import React, { useState } from 'react';
import './App.css';

const App = () => {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [xIsNext, setXIsNext] = useState(true);

    const handleClick = (index) => {
        if (board[index] || calculateWinner(board)) return;

        const newBoard = board.slice();
        newBoard[index] = xIsNext ? 'X' : 'O';
        setBoard(newBoard);
        setXIsNext(!xIsNext);
    };

    const handleReset = () => {
        setBoard(Array(9).fill(null));
        setXIsNext(true);
    };

    const renderSquare = (index) => {
        const winner = calculateWinner(board);
        let squareClass = 'square';
        if (winner) {
            const winningSquares = calculateWinningSquares(board);
            if (winningSquares.includes(index)) {
                squareClass += ' winner';
            } else {
                squareClass += ' loser';
            }
        }
        return (
            <button
                className={squareClass}
                onClick={() => handleClick(index)}
            >
                {board[index]}
            </button>
        );
    };

    const calculateWinner = (squares) => {
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

        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }

        return null;
    };

    const calculateWinningSquares = (squares) => {
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

        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return lines[i];
            }
        }

        return [];
    };

    const winner = calculateWinner(board);
    const loser = winner ? (winner === 'X' ? 'O' : 'X') : 'None';
    const status = winner
        ? `Winner: ${winner} - Loser: ${loser}`
        : `Next player: ${xIsNext ? 'X' : 'O'}`;

    return (
        <div className="game">
            <h1>Tic Tac Toe</h1>
            <div className="status">{status}</div>
            <div className="board-row">
                {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)}
            </div>
            <div className="board-row">
                {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)}
            </div>
            <div className="board-row">
                {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)}
            </div>
            <button className="new game" onClick={handleReset}>
                Reset Game
            </button>
        </div>
    );
};

export default App;
