const indexToCoordinates = (index, boardLength) => {
    // Check if the arguments are integers
    if (Number.isInteger(index) === false || Number.isInteger(boardLength) === false) {
        throw new Error("indexToCoordinates: Arguments must be integers");
    }

    // Check if boardLength is positive
    if (boardLength <= 0) {
        throw new Error("indexToCoordinates: boardLength must be positive");
    }

    // Check if index is within the board
    if (index < 0 || index >= boardLength*boardLength) {
        throw new Error("indexToCoordinates: index must be within the board");
    }

    for (let x = 0; x < boardLength; x++) {
        for (let y = 0; y < boardLength; y++) {
            if (x + boardLength*y === index) {
                return [x, y];
            }
        }
    }
};

export default indexToCoordinates;