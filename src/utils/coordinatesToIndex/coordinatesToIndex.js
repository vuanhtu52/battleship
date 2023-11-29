const coordinatesToIndex = (x, y, boardLength) => {
    // Check if the arguments are integers
    if (Number.isInteger(x) === false || Number.isInteger(y) === false || Number.isInteger(boardLength) === false) {
        throw new Error("coordinatesToIndex: Arguments must be integers");
    }

    // Check if boardLength is positive
    if (boardLength <= 0) {
        throw new Error("coordinatesToIndex: boardLength must be positive");
    }

    // Check if x is within the board
    if (x < 0 || x >= boardLength) {
        throw new Error("coordinatesToIndex: x must be within the board");
    }

    // Check if y is within the board
    if (y < 0 || y >= boardLength) {
        throw new Error("coordinatesToIndex: y must be within the board");
    }

    return x + boardLength*y;
};

export default coordinatesToIndex;