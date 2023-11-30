import Ship from "../Ship/Ship";

const Gameboard = length => {
    let _length = length;
    let _ships = []; // Store the ships on the gameboard
    let _missedShots = [];
    let _attackedPoints = [];

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
        if (x >= _length || y >= _length) {
            throw new Error("placeShip: Coordinates are not within the board");
        }

        if (direction === "horizontal") {
            endPoint[0] += shipLength - 1;
        } else if (direction === "vertical") {
            endPoint[1] += shipLength - 1;
        }

        // Check if the ship's end-point exceeds the board's area
        if (endPoint[0] >= _length || endPoint[1] >= _length) {
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

        // Check if the ship occupies a cell surrounding another ship
        // Loop over each point on the ship, get the surrounding points and check if they are occupied by other ships
        for (let shipPoint of shipPoints) {
            let surroundingPoints = [];
            surroundingPoints.push([shipPoint[0] - 1, shipPoint[1] - 1]);
            surroundingPoints.push([shipPoint[0], shipPoint[1] - 1]);
            surroundingPoints.push([shipPoint[0] + 1, shipPoint[1] - 1]);
            surroundingPoints.push([shipPoint[0] - 1, shipPoint[1]]);
            surroundingPoints.push([shipPoint[0] + 1, shipPoint[1]]);
            surroundingPoints.push([shipPoint[0] - 1, shipPoint[1] + 1]);
            surroundingPoints.push([shipPoint[0], shipPoint[1] + 1]);
            surroundingPoints.push([shipPoint[0] + 1, shipPoint[1] + 1]);

            for (let surroundingPoint of surroundingPoints) {
                for (let occupiedPoint of occupiedPoints) {
                    if (surroundingPoint[0] === occupiedPoint[0] && surroundingPoint[1] === occupiedPoint[1]) {
                        throw new Error("placeShip: A ship cannot occupy a cell surrounding another ship");
                    }
                }
            }
        }

        ship.setPosition([x, y], endPoint);
        _ships.push(ship);
    };

    // Return the points if they can be occupied by a ship
    const getShipPlacingPoints = (x, y, shipLength, direction) => {
        // Check if x is integer
        if (Number.isInteger(x) === false) {
            throw new Error("getShipPlacingPoints: x must be integer");
        }

        // Check if y is integer
        if (Number.isInteger(y) === false) {
            throw new Error("getShipPlacingPoints: y must be integer");
        }

        // Check if x is within the board
        if (x < 0 || x >= _length) {
            throw new Error("getShipPlacingPoints: x must be within the board");
        }

        // Check if y is within the board
        if (y < 0 || y >= _length) {
            throw new Error("getShipPlacingPoints: y must be within the board");
        }

        // Check if shipLength is integer
        if (Number.isInteger(shipLength) === false) {
            throw new Error("getShipPlacingPoints: shipLength must be integer");
        }

        // Check if shipLength is positive
        if (shipLength <= 0) {
            throw new Error("getShipPlacingPoints: shipLength must be positive");
        }

        // direction can only be "horizontal" or "vertical"
        if (direction !== "horizontal" && direction !== "vertical") {
            throw new Error("getShipPlacingPoints: direction must be horizontal or vertical");
        }

        // Check if the ship's end point is outside the board
        let endPoint = [x, y];
        if (direction === "horizontal") {
            endPoint[0] += shipLength - 1;
        } else if (direction === "vertical") {
            endPoint[1] += shipLength - 1;
        }
        if (endPoint[0] >= _length || endPoint[1] >= _length) {
            throw new Error("getShipPlacingPoints: Ship's end-point exceeds the board's area")
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
                    throw new Error("getShipPlacingPoints: Ship overlaps with others");
                }
            }
        }

        // Check if the ship occupies a cell surrounding another ship
        // Loop over each point on the ship, get the surrounding points and check if they are occupied by other ships
        for (let shipPoint of shipPoints) {
            let surroundingPoints = [];
            surroundingPoints.push([shipPoint[0] - 1, shipPoint[1] - 1]);
            surroundingPoints.push([shipPoint[0], shipPoint[1] - 1]);
            surroundingPoints.push([shipPoint[0] + 1, shipPoint[1] - 1]);
            surroundingPoints.push([shipPoint[0] - 1, shipPoint[1]]);
            surroundingPoints.push([shipPoint[0] + 1, shipPoint[1]]);
            surroundingPoints.push([shipPoint[0] - 1, shipPoint[1] + 1]);
            surroundingPoints.push([shipPoint[0], shipPoint[1] + 1]);
            surroundingPoints.push([shipPoint[0] + 1, shipPoint[1] + 1]);

            for (let surroundingPoint of surroundingPoints) {
                for (let occupiedPoint of occupiedPoints) {
                    if (surroundingPoint[0] === occupiedPoint[0] && surroundingPoint[1] === occupiedPoint[1]) {
                        throw new Error("getShipPlacingPoints: A ship cannot occupy a cell surrounding another ship");
                    }
                }
            }
        }

        const ship = Ship(shipLength);
        ship.setPosition([x, y], endPoint);
        return ship.getPoints();
    };

    const getShips = () => _ships;

    // Get all the points occupied by the current ships
    const _getOccupiedPoints = () => {
        let points = [];

        _ships.forEach(ship => {
            points = points.concat(ship.getPoints());
        });

        return points;
    };

    const receiveAttack = (x, y) => {
        let isHit = false;

        // Check if the coordinates are integers
        if (Number.isInteger(x) === false || Number.isInteger(y) === false) {
            throw new Error("receiveAttack: Coordinates must be integers");
        }

        // Check if the coordinates are inside the board
        if (x < 0 || x >= _length || y < 0 || y >= _length) {
            throw new Error("receiveAttack: Coordinates must be inside board");
        }

        // Check if the spot as already been attacked
        for (let point of getAttackedPoints()) {
            if (x === point[0] && y === point[1]) {
                throw new Error("receiveAttack: Cannot attack the same spot twice");
            }
        }

        // Check if the shot hits a ship
        _ships.forEach(ship => {
            for (let point of ship.getPoints()) {
                if (x === point[0] && y === point[1]) {
                    ship.hit();
                    isHit = true;
                    break;
                }
            }
        });

        // Record the missed shot
        if (isHit === false) {
            _missedShots.push([x, y]);
        }

        // Record the attack
        _attackedPoints.push([x, y]);
    };

    const getMissedShots = () => _missedShots;

    const allShipsSunk = () => {  
        if (_ships.length === 0) {
            throw new Error("allShipsSunk: No ships on the board");
        }
        
        for (let ship of _ships) {
            if (ship.isSunk() === false) {
                return false;
            }
        }

        return true;
    };

    const getAttackedPoints = () => _attackedPoints;

    const _isPointAvailable = point => {
        for (let attackedPoint of _attackedPoints) {
            if (point[0] === attackedPoint[0] && point[1] === attackedPoint[1]) {
                return false;
            }
        }
        return true;
    };

    const getAvailablePoints = () => {
        let allPoints = [];
        let availablePoints = [];

        // Get all the points on the board
        for (let x = 0; x < _length; x++) {
            for (let y = 0; y < _length; y++) {
                allPoints.push([x, y]);
            }
        } 

        // Get the available points
        for (let point of allPoints) {
            if (_isPointAvailable(point) === true) {
                availablePoints.push(point);
            }
        }

        return availablePoints;
    };

    // Get the coordinates of a point, find the ship occupying the point and return the points around the ship
    const getPointsAroundShip = (x, y) => {
        // Check if x and y are integers
        if (Number.isInteger(x) === false || Number.isInteger(y) === false) {
            throw new Error("getPointsAroundShip: Arguments must be non-negative integers");
        }

        // Check if x and y are negative
        if (x < 0 || y < 0) {
            throw new Error("getPointsAroundShip: Arguments must be non-negative integers");
        }

        // Check if x and y are outside the board
        if (x >= _length || y >= _length) {
            throw new Error("getPointsAroundShip: Point outside board");
        }

        // Find the ship
        let ship = null;
        outerLoop: for (let currentShip of _ships) {
            const shipPoints = currentShip.getPoints();
            for (let point of shipPoints) {
                if (x === point[0] && y === point[1]) {
                    ship = currentShip;
                    break outerLoop;
                }
            }
        }

        // Throw error if the point is not occupied by any ship
        if (ship === null) {
            throw new Error("getPointsAroundShip: No ship at this point");
        }

        // Get the points around the ship
        const points = [];
        for (let point of ship.getPoints()) {
            // Get all adjacent points of each ship's point
            let adjacentPoints = [];
            adjacentPoints.push([point[0] - 1, point[1] - 1]);
            adjacentPoints.push([point[0], point[1] - 1]);
            adjacentPoints.push([point[0] + 1, point[1] - 1]);
            adjacentPoints.push([point[0] - 1, point[1]]);
            adjacentPoints.push([point[0] + 1, point[1]]);
            adjacentPoints.push([point[0] - 1, point[1] + 1]);
            adjacentPoints.push([point[0], point[1] + 1]);
            adjacentPoints.push([point[0] + 1, point[1] + 1]);

            // Filter out only the points around the ship
            outerLoop: for (let adjacentPoint of adjacentPoints)  {
                // Check if the point is inside the board
                if (adjacentPoint[0] < 0 || adjacentPoint[0] >= _length || adjacentPoint[1] < 0 || adjacentPoint[1] >= _length) {
                    continue;
                }
                // Check if the point is inside the ship
                for (let shipPoint of ship.getPoints()) {
                    if (adjacentPoint[0] === shipPoint[0] && adjacentPoint[1] === shipPoint[1]) {
                        continue outerLoop;
                    }
                }
                // Check if the point is already added to the list
                for (let finalPoint of points) {
                    if (adjacentPoint[0] === finalPoint[0] && adjacentPoint[1] === finalPoint[1]) {
                        continue outerLoop;
                    }
                }
                // Add the point to the final list if it is valid  
                points.push(adjacentPoint);
            }
        }

        // Sort the points: ascending y then ascencding x
        points.sort((arr1, arr2) => arr1[1] - arr2[1]);

        return points;
    };

    // Get the ship occupying the given coordinates
    const getShipByCoordinates = (x, y) => {
        // Check if x and y are integers
        if (Number.isInteger(x) === false || Number.isInteger(y) === false) {
            throw new Error("getShipByCoordinates: Arguments must be non-negative integers");
        }

        // Check if x and y are non-negative
        if (x < 0 || y < 0) {
            throw new Error("getShipByCoordinates: Arguments must be non-negative integers");
        }

        // Check if x and y are within the board
        if (x >= _length || y >= _length) {
            throw new Error("getShipByCoordinates: Arguments must be inside board");
        }

        // Find the ship
        for (let ship of _ships) {
            for (let point of ship.getPoints()) {
                if (x === point[0] && y === point[1]) {
                    return ship;
                }
            }
        }

        return null;
    };

    // Given the coordinates of a ship, rotate it from horizontal to verical or vice versa
    const rotateShip = (x, y) => {
        // Check if x and y are integers
        if (Number.isInteger(x) === false || Number.isInteger(y) === false) {
            throw new Error("rotateShip: x and y must be integers");
        }

        // Check if x is within the board
        if (x < 0 || x >= _length) {
            throw new Error("rotateShip: x and y must be within the board");
        }

        // Check if y is within the board
        if (y < 0 || y >= _length) {
            throw new Error("rotateShip: x and y must be within the board");
        }

        // Check if the point is occupied by a ship
        let isOccupied = false;
        const occupiedPoints = _getOccupiedPoints();
        occupiedPoints.forEach(point => {
            if (point[0] === x && point[1] === y) {
                isOccupied = true;
            }
        });
        if (isOccupied === false) {
            throw new Error("rotateShip: Point is not occupied by any ship");
        }

        // Get the new ship points after rotating
        const ship = getShipByCoordinates(x, y);
        let newShipPoints = [];
        if (ship.getLength() === 1) {
            newShipPoints = ship.getPoints();
        } else {
            // Get direction of the ship
            let direction = "";
            if (ship.getPoints()[0][1] === ship.getPoints()[1][1]) {
                direction = "horizontal";
            } else {
                direction = "vertical";
            }

            // Get the new ship points
            for (let i = 0; i < ship.getLength(); i++) {
                 if (direction === "horizontal") {
                    newShipPoints.push([ship.getPoints()[0][0], ship.getPoints()[0][1] + i]);
                 } else {
                    newShipPoints.push([ship.getPoints()[0][0] + i, ship.getPoints()[0][1]]);
                 }  
            }            
        }

        // Check if the new ship's end point exceeds the board
        if (newShipPoints[newShipPoints.length - 1][0] < 0 || newShipPoints[newShipPoints.length - 1][0] >= length || newShipPoints[newShipPoints.length - 1][1] < 0 || newShipPoints[newShipPoints.length - 1][1] >= _length) {
            throw new Error("rotateShip: New ship's end point must be within the board");
        }

        // // Get the new available points
        // const availablePoints = getAvailablePoints();
        // availablePoints = availablePoints.concat(ship.getPoints());

        // Get the new occupied points
        let newOccupiedPoints = _getOccupiedPoints();
        for (let shipPoint of ship.getPoints()) {
            newOccupiedPoints = newOccupiedPoints.filter(point => {
                if (point[0] !== shipPoint[0] || point[1] !== shipPoint[1]) {
                    return point;
                } 
            });
        }

        // Check if the new ship points overlap with others
        newShipPoints.forEach(newShipPoint => {
            for (let newOccupiedPoint of newOccupiedPoints) {
                if (newShipPoint[0] === newOccupiedPoint[0] && newShipPoint[1] === newOccupiedPoint[1]) {
                    throw new Error("rotateShip: Ship overlaps with others");
                }
            }
        });

        // Check if the new ship is adjacent to others
        for (let newShipPoint of newShipPoints) {
            let surroundingPoints = [];
            surroundingPoints.push([newShipPoint[0] - 1, newShipPoint[1] - 1]);
            surroundingPoints.push([newShipPoint[0], newShipPoint[1] - 1]);
            surroundingPoints.push([newShipPoint[0] + 1, newShipPoint[1] - 1]);
            surroundingPoints.push([newShipPoint[0] - 1, newShipPoint[1]]);
            surroundingPoints.push([newShipPoint[0] + 1, newShipPoint[1]]);
            surroundingPoints.push([newShipPoint[0] - 1, newShipPoint[1] + 1]);
            surroundingPoints.push([newShipPoint[0], newShipPoint[1] + 1]);
            surroundingPoints.push([newShipPoint[0] + 1, newShipPoint[1] + 1]);

            for (let surroundingPoint of surroundingPoints) {
                for (let occupiedPoint of newOccupiedPoints) {
                    if (surroundingPoint[0] === occupiedPoint[0] && surroundingPoint[1] === occupiedPoint[1]) {
                        throw new Error("rotateShip: Ship is adjacent to others");
                    }
                }
            }
        }

        // Rotate the ship
        ship.setPosition(newShipPoints[0], newShipPoints[newShipPoints.length - 1]);
    };

    const reset = () => {
        _ships = []; 
        _missedShots = [];
        _attackedPoints = [];
    };

    return {
        getLength,
        placeShip,
        getShipPlacingPoints,
        getShips,
        receiveAttack,
        getMissedShots,
        allShipsSunk,
        getAttackedPoints,
        getAvailablePoints,
        getPointsAroundShip,
        getShipByCoordinates,
        rotateShip,
        reset,
    };
};

export default Gameboard;