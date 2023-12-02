const Ship = length => {
    let _length = length;
    let _hitCount = 0;
    let _position = []; // Contains start and end points on the boards
    let _id = "";

    const getLength = () => {
        if (Number.isInteger(_length) === false) {
            throw new Error("getLength: Ship length must be a positive integer");
        }

        if (_length <= 0) {
            throw new Error("getLength: Ship length must be a positive integer");
        }
        
        return _length;
    }

    const setLength = newLength => {
        if (Number.isInteger(newLength) === false) {
            throw new Error("setLength: Ship length must be a positive integer");
        }

        if (newLength <= 0) {
            throw new Error("setLength: Ship length must be a positive integer");
        }

        _length = newLength;
    };

    const getId = () => _id;

    const setId = id => _id = id;

    const getHitCount = () => {
        if (Number.isInteger(_hitCount) === false) {
            throw new Error("hitCount: Hit count must be a non-negative integer");
        }

        if (_hitCount < 0) {
            throw new Error("hitCount: Hit count must be a non-negative integer");
        }
        
        return _hitCount;
    }

    const hit = () => {
        _hitCount += 1;
    }

    const isSunk = () => {
        if (_hitCount >= _length) {
            return true;
        }

        return false;
    };

    const getPosition = () => {
        return _position;
    };

    const setPosition = (startPoint, endPoint) => {
        // Check if coordinates are non-negative integers
        for (let val of [...startPoint, ...endPoint]) {
            if (typeof val !== "number") {
                throw new Error("setPosition: Coordinates must be non-negative integers");
            }
            if (Math.floor(val) !== val) {
                throw new Error("setPosition: Coordinates must be non-negative integers");
            }
            if (val < 0) {
                throw new Error("setPosition: Coordinates must be non-negative integers");
            }
        }

        // Check if the distance between start and end points match ship's length
        if (startPoint[0] === endPoint[0]) {
            if (endPoint[1] - startPoint[1] + 1 !== _length) {
                throw new Error("setPosition: Position does not match ship's length");
            }
        } else if (startPoint[1] === endPoint[1]) {
            if (endPoint[0] - startPoint[0] + 1 !== _length) {
                throw new Error("setPosition: Position does not match ship's length");
            }
        }

        // Check if the coordinates form a horizontal or vertical line
        if (startPoint[0] !== endPoint[0] && startPoint[1] !== endPoint[1]) {
            throw new Error("setPosition: Ship can only be horizontal or vertical");
        }

        _position = [startPoint, endPoint];
    };

    // Get the points occupied by the ship
    const getPoints = () => {
        // Check if the ship has not been placed on the board
        if (_position.length === 0) {
            return [];
        }

        const [startPoint, endPoint] = _position;
        const points = [];

        if (startPoint[0] < endPoint[0]) {
            // If the ship is horizontal
            for (let x = startPoint[0]; x <= endPoint[0]; x++) {
                points.push([x, startPoint[1]]);
            }
        } else if (startPoint[1] < endPoint[1]) {
            // If the ship is vertical
            for (let y = startPoint[1]; y <= endPoint[1]; y++) {
                points.push([startPoint[0], y]);
            }
        } else if (startPoint[0] === endPoint[0] && startPoint[1] === endPoint[1]) {
            // If the ship is only 1 point
            points.push(startPoint);
        }
        
        return points;
    };

    return {
        getLength,
        setLength,
        getId,
        setId,
        getHitCount,
        hit,
        isSunk,
        getPosition,
        setPosition,
        getPoints,
    };
};

export default Ship;