import Ship from "./Ship";

test("The parameter passed to Ship must be a positive integer", () => {
    expect(() =>  Ship("4").getLength()).toThrow("getLength: Ship length must be a positive integer");
    expect(() =>  Ship({4: 4}).getLength()).toThrow("getLength: Ship length must be a positive integer");
    expect(() =>  Ship(-1).getLength()).toThrow("getLength: Ship length must be a positive integer");
    expect(() =>  Ship(0).getLength()).toThrow("getLength: Ship length must be a positive integer");
    expect(Ship(4).getLength()).toBe(4);
});

test("When setting length for ship, the new length must be a positive integer", () => {
    const ship = Ship(4);
    expect(() => ship.setLength("4")).toThrow("setLength: Ship length must be a positive integer");
    expect(() => ship.setLength({"hi": 1})).toThrow("setLength: Ship length must be a positive integer");
    expect(() => ship.setLength(-1)).toThrow("setLength: Ship length must be a positive integer");
    expect(() => ship.setLength(0)).toThrow("setLength: Ship length must be a positive integer");
    expect(ship.setLength(4)).toBe(undefined);
});

test("Hit count must be a non-negative integer", () => {
    expect(typeof(Ship(3).getHitCount())).toBe("number");
    expect(Ship(3).getHitCount()).toBeGreaterThanOrEqual(0);
    expect(Number.isFinite(Ship(3).getHitCount())).toBe(true);
    expect(Math.floor(Ship(3).getHitCount())).toBe(Ship(3).getHitCount());
});

test("Function hit should increase the hit count by 1 when called", () => {
    const ship = Ship(4);
    expect(ship.getHitCount()).toBe(0);
    ship.hit();
    expect(ship.getHitCount()).toBe(1);
});

test("Function isSunk returns the correct state of the ship based on its length and number of hits received", () => {
    const ship = Ship(1);
    expect(ship.isSunk()).toBe(false);
    ship.hit();
    expect(ship.isSunk()).toBe(true);
    ship.hit();
    expect(ship.isSunk()).toBe(true);
});

test("Function getPosition should return the correct start and end points of the ship", () => {
    const ship = Ship(4);
    expect(Array.isArray(ship.getPosition())).toBe(true);
    expect(ship.getPosition().length).toBe(0);

    ship.setPosition([0, 0], [0, 4]);
    expect(ship.getPosition()[0][0]).toBe(0);
    expect(ship.getPosition()[0][1]).toBe(0);
    expect(ship.getPosition()[1][0]).toBe(0);
    expect(ship.getPosition()[1][1]).toBe(4);
});

test("Function setPosition should have correct parameters", () => {
    const ship = Ship(4);
    expect(() => ship.setPosition(["0", 0], [4, 0])).toThrow("setPosition: Coordinates must be non-negative integers");
    expect(() => ship.setPosition([-1, 0], [4, 0])).toThrow("setPosition: Coordinates must be non-negative integers");
    expect(() => ship.setPosition([0, 0], [4.5, 0])).toThrow("setPosition: Coordinates must be non-negative integers");
    expect(() => ship.setPosition([0, 0], [1, 1])).toThrow("setPosition: Position does not match ship's length");

    ship.setPosition([1, 0], [5, 0]);
    expect(ship.getPosition()).toStrictEqual([[1, 0], [5, 0]]);

    ship.setLength(5);
    expect(() => ship.setPosition([0, 0], [4, 3])).toThrow("setPosition: Ship can only be horizontal or vertical");
});

test("Function getPoints should return the points occupied by the ship", () => {
    const ship = Ship(4);
    expect(ship.getPoints()).toStrictEqual([]);

    ship.setPosition([0, 0], [0, 4]);
    expect(ship.getPoints()).toStrictEqual([[0, 0], [0, 1], [0, 2], [0, 3], [0, 4]]);
    
    ship.setPosition([1, 2], [1, 6]);
    expect(ship.getPoints()).toStrictEqual([[1, 2], [1, 3], [1, 4], [1, 5], [1, 6]]);
});




