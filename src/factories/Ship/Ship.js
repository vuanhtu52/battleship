const Ship = length => {
    let _length = length;
    let _hitCount = 0;

    const getLength = () => {
        if (Number.isInteger(_length) === false) {
            throw new Error("Ship length must be a positive integer");
        }

        if (_length <= 0) {
            throw new Error("Ship length must be a positive integer");
        }
        
        return _length;
    }

    const setLength = newLength => {
        if (Number.isInteger(newLength) === false) {
            throw new Error("Ship length must be a positive integer");
        }

        if (newLength <= 0) {
            throw new Error("Ship length must be a positive integer");
        }

        _length = newLength;
    };

    const getHitCount = () => {
        if (Number.isInteger(_hitCount) === false) {
            throw new Error("Hit count must be a non-negative integer");
        }

        if (_hitCount < 0) {
            throw new Error("Hit count must be a non-negative integer");
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

    return {
        getLength,
        setLength,
        getHitCount,
        hit,
        isSunk,
    };
};

export default Ship;