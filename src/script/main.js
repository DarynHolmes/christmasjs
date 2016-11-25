

// Any live cell with fewer than two live neighbours dies, as if caused by under-population.
// Any live cell with two or three live neighbours lives on to the next generation.
// Any live cell with more than three live neighbours dies, as if by over-population.
// Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

// Math.floor((Math.random() * 10) + 1);

document.addEventListener("DOMContentLoaded", function(){
    const c = document.getElementById("myCanvas");
    const ctx = c.getContext("2d");
    const boardSize = 20;
    const cellHeight = 500 / boardSize;
    const cellWidth = 500 / boardSize;

    const drawCell = (x, y, isAlive) => {
        if (isAlive) {
            ctx.fillStyle = '#ff0000';
        } else {
            ctx.fillStyle = '#ffffff';
        }

        ctx.fillStroke = '#000000';
        ctx.fillRect(x,y,cellWidth,cellHeight);
        ctx.rect(x,y,cellWidth,cellHeight);
        ctx.stroke();
    }

    const randomLifeState = () => {
        return 9 < Math.floor((Math.random() * 10) + 1);
    }


    const initBoard = (boardSize) => {
        const board = [];
        for(let x = 0; x < boardSize; x++) {
            for(let y = 0; y < boardSize; y++) {
                board[x] = board[x] || [];
                board[x][y] = randomLifeState();
            }
        }
        return board;
    }

    // Any live cell with fewer than two live neighbours dies, as if caused by under-population.
    // Any live cell with two or three live neighbours lives on to the next generation.
    // Any live cell with more than three live neighbours dies, as if by over-population.
    // Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

    const ageCell = (x, y, board) => {
        const neighbourCount = liveNeighbourCount(x,y, board);

        if (board[x,y]) {
            if (neighbourCount < 2) return false;
            if (neighbourCount === 2 || neighbourCount === 3) return true;
            return false;
        } else {
            if (neighbourCount === 3) return true;
            return board[x,y];
        }
    }

    const liveNeighbourCount = (x, y, board) => {
        let count = 0;

        if (board[x-1] && board[x-1][y]) count++;
        if (board[x+1] && board[x+1][y]) count++;
        if (board[x][y-1]) count++;
        if (board[x][y+1]) count++;

        if (board[x-1] && board[x-1][y-1]) count++;
        if (board[x+1] && board[x+1][y+1]) count++;
        if (board[x-1] && board[x-1][y-1]) count++;
        if (board[x+1] && board[x+1][y+1]) count++;
        console.log('count', count);
        return count;
    }

    const age = (board) => {
        const newBoard = [];
        for(let x = 0; x < board.length; x++) {
            for(let y = 0; y < board[0].length; y++) {
                newBoard[x] = newBoard[x] || [];
                newBoard[x][y] = ageCell(x, y, board);
            }
        }
        return newBoard;
    }

    const drawBoard = (board, cellWidth, cellHeight) => {
        for(let x = 0; x < board.length; x++) {
            for(let y = 0; y < board[0].length; y++) {
                drawCell(x * cellWidth, y * cellHeight, board[x][y]);
            }
        }
    }

    const ageAndDrawBoard = (board, cellWidth, cellHeight) => {
        const nextBoard = age(board);
        console.table( nextBoard);
        drawBoard(nextBoard, cellWidth, cellHeight);
        setTimeout(() => ageAndDrawBoard(nextBoard, cellWidth, cellHeight), 1000);
    }

    const board = initBoard(boardSize);
    drawBoard(board, cellWidth, cellHeight);
    ageAndDrawBoard(board, cellWidth, cellHeight);
    console.log('Done!');

});
