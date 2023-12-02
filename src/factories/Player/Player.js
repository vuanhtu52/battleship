import getRandomInteger from "../../utils/getRandomInteger/getRandomInteger";

const Player = () => {
    let _active = false; // Keep track of the player's turn
    let _detectedPoints = [];   // Keep track of a detected enemy's ship

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

    const attackRandom = enemyBoard => {
        // Check if out of moves
        const availablePoints = enemyBoard.getAvailablePoints();
        if (availablePoints.length === 0) {
            throw new Error("attackRandom: Out of moves");
        }

        // Get random point
        const randomIndex = getRandomInteger(0, availablePoints.length - 1);
        const attackPoint = availablePoints[randomIndex];

        enemyBoard.receiveAttack(attackPoint[0], attackPoint[1]);

        return attackPoint;
    };

    const getActive = () => _active;

    const setActive = val => {
        // Check if val is boolean
        if (typeof val !== "boolean") {
            throw new Error("Argument must be a boolean value");
        }

        _active = val;
    };

    const attackSmart = enemyBoard => {
        let attackPoint = null;
        if (_detectedPoints.length === 0) {
            attackPoint = attackRandom(enemyBoard);
            const attackedShip = enemyBoard.getShipByCoordinates(attackPoint[0], attackPoint[1]);
            if (attackedShip !== null) {
                _detectedPoints.push(attackPoint);
                if (attackedShip.isSunk() === true) {
                    _detectedPoints = [];
                }
            }
        } else if (_detectedPoints.length === 1) {
            // Get the adjacent points of the detected point
            let adjacentPoints = [];
            adjacentPoints.push([_detectedPoints[0][0] - 1, _detectedPoints[0][1] - 1]);
            adjacentPoints.push([_detectedPoints[0][0], _detectedPoints[0][1] - 1]);
            adjacentPoints.push([_detectedPoints[0][0] + 1, _detectedPoints[0][1] - 1]);
            adjacentPoints.push([_detectedPoints[0][0] - 1, _detectedPoints[0][1]]);
            adjacentPoints.push([_detectedPoints[0][0] + 1, _detectedPoints[0][1]]);
            adjacentPoints.push([_detectedPoints[0][0] - 1, _detectedPoints[0][1] + 1]);
            adjacentPoints.push([_detectedPoints[0][0], _detectedPoints[0][1] + 1]);
            adjacentPoints.push([_detectedPoints[0][0] + 1, _detectedPoints[0][1] + 1]);

            // Remove points outside the board
            adjacentPoints = adjacentPoints.filter(point => {
                if (point[0] >= 0 && point[0] < enemyBoard.getLength() && point[1] >= 0 && point[1] < enemyBoard.getLength()) {
                    return point;
                }
            });

            // Remove points already attacked
            let availabledAdjacentPoints = [];
            for (let adjacentPoint of adjacentPoints) {
                for (let availablePoint of enemyBoard.getAvailablePoints()) {
                    if (adjacentPoint[0] === availablePoint[0] && adjacentPoint[1] === availablePoint[1]) {
                        availabledAdjacentPoints.push(adjacentPoint);
                        break;
                    }
                }
            }

            attackPoint = availabledAdjacentPoints[0];
            attack(attackPoint[0], attackPoint[1], enemyBoard);
            const attackedShip = enemyBoard.getShipByCoordinates(attackPoint[0], attackPoint[1]);
            if (attackedShip !== null) {
                _detectedPoints.push(attackPoint);
                if (attackedShip.isSunk() === true) {
                    _detectedPoints = [];
                }
            }
        } else if (_detectedPoints.length > 1) {
            let attackPoints = [];
            
            // Get available points to attack
            if (_detectedPoints[0][1] === _detectedPoints[1][1]) {
                // If the ship is horizontal
                const xCoordinates = _detectedPoints.map(point => point[0]).sort();
                if (xCoordinates[0] - 1 >= 0) {
                    attackPoints.push([xCoordinates[0] - 1, _detectedPoints[0][1]]);
                }
                if (xCoordinates[xCoordinates.length - 1] + 1 < enemyBoard.getLength()) {
                    attackPoints.push([xCoordinates[xCoordinates.length - 1] + 1, _detectedPoints[0][1]]);
                }
            } else if (_detectedPoints[0][0] === _detectedPoints[1][0]) {
                // If the ship is vertical
                const yCoordinates = _detectedPoints.map(point => point[1]).sort();
                if (yCoordinates[0] - 1 >= 0) {
                    attackPoints.push([_detectedPoints[0][0], yCoordinates[0] - 1]);
                }
                if (yCoordinates[yCoordinates.length - 1] + 1 < enemyBoard.getLength()) {
                    attackPoints.push([_detectedPoints[0][0], yCoordinates[yCoordinates.length - 1] + 1]);
                }
            }

            // Remove points already attacked
            let attackPointsAvailable = [];
            for (let point of attackPoints) {
                for (let availablePoint of enemyBoard.getAvailablePoints()) {
                    if (point[0] === availablePoint[0] && point[1] === availablePoint[1]) {
                        attackPointsAvailable.push(point);
                        break;
                    }
                }
            }

            // Attack
            attackPoint = attackPointsAvailable[0];
            attack(attackPoint[0], attackPoint[1], enemyBoard);
            const attackedShip = enemyBoard.getShipByCoordinates(attackPoint[0], attackPoint[1]);
            if (attackedShip !== null) {
                _detectedPoints.push(attackPoint);
                if (attackedShip.isSunk() === true) {
                    _detectedPoints = [];
                }
            }
        }

        return attackPoint;
    };

    return {
        attack,
        attackRandom,
        getActive,
        setActive,
        attackSmart,
    };
};

export default Player;