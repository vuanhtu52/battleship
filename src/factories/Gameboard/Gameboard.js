import Ship from "../Ship/Ship";

const Gameboard = length => {
    let _length = length;
    let _ships = []; // Store the ships on the gameboard

    const getLength = () => {
        if (Number.isInteger(_length) === false) {
            throw new Error("Board length must be a positive integer");
        }

        if (_length <= 0) {
            throw new Error("Board length must be a positive integer");
        }
        
        return _length;
    };

    const placeShip = (x, y, shipLength, direction) => {
        const ship = Ship(shipLength);
        let endPoint = [x, y];

        // x must be a non-negative integer
        if (Number.isInteger(x) === false || x < 0) {
            throw new Error("placeShip: Coordinates must be non-negative integers");
        }

        // y must be a non-negative integer
        if (Number.isInteger(y) === false || y < 0) {
            throw new Error("placeShip: Coordinates must be non-negative integers");
        }

        // shipLength must be a positive integer
        if (Number.isInteger(shipLength) === false || shipLength <= 0) {
            throw new Error("placeShip: shipLength must be a positive integer");
        }

        // direction can only be "horizontal" or "vertical"
        if (direction !== "horizontal" && direction !== "vertical") {
            throw new Error("placeShip: direction must be horizontal or vertical");
        }

        // x and y must be within board's length
        if (x > _length || y > _length) {
            throw new Error("placeShip: Coordinates are not within the board");
        }

        if (direction === "horizontal") {
            endPoint[0] += shipLength;
        } else if (direction === "vertical") {
            endPoint[1] += shipLength;
        }

        // Check if the ship's end-point exceeds the board's area
        if (endPoint[0] > _length || endPoint[1] > _length) {
            throw new Error("placeShip: Ship's end-point exceeds the board's area")
        }

        // Check if the ship overlaps with other ships
        const occupiedPoints = _getOccupiedPoints();
        const shipPoints = [];

        if (direction === "horizontal") {
            for (let i = x; i <= endPoint[0]; i++) {
                shipPoints.push([i, y]);
            }
        } else if (direction === "vertical") {
            for (let i = y; i <= endPoint[1]; i++) {
                shipPoints.push([x, i]);
            }
        }

        for (let shipPoint of shipPoints) {
            for (let occupiedPoint of occupiedPoints) {
                if (shipPoint[0] === occupiedPoint[0] && shipPoint[1] === occupiedPoint[1]) {
                    throw new Error("placeShip: Ship overlaps with others");
                }
            }
        }

        ship.setPosition([x, y], endPoint);
        _ships.push(ship);
    };

    // Get all the points occupied by the current ships
    const _getOccupiedPoints = () => {
        let points = []

        _ships.forEach(ship => {
            points = points.concat(ship.getPoints());
        });

        return points;
    };

    return {
        getLength,
        placeShip,
    };
};

export default Gameboard;