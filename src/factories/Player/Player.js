const Player = () => {
    const attack = (x, y, enemyBoard) => {
        // Check if x and y are integers
        if (Number.isInteger(x) === false || Number.isInteger(y) === false) {
            throw new Error("attack: Coordinates must be integers");
        }

        // Check if x and y are within the board
        if (x < 0 || x >= enemyBoard.getLength() || y < 0 || y >= enemyBoard.getLength()) {
            throw new Error("attack: Coordinates must be inside board");
        }

        // x and y must be in an unattacked point on the board
        for (let point of enemyBoard.getAttackedPoints()) {
            if (x === point[0] && y === point[1]) {
                throw new Error("attack: This point is already attacked");
            }
        }

        enemyBoard.receiveAttack(x, y);
    };

    return {
        attack,
    };
};

export default Player;