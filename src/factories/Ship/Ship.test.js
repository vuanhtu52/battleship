import Ship from "./Ship";

test("The parameter passed to Ship must be a positive integer", () => {
    expect(() =>  Ship("4").getLength()).toThrow("Ship length must be a positive integer");
    expect(() =>  Ship({4: 4}).getLength()).toThrow("Ship length must be a positive integer");
    expect(() =>  Ship(-1).getLength()).toThrow("Ship length must be a positive integer");
    expect(() =>  Ship(0).getLength()).toThrow("Ship length must be a positive integer");
    expect(Ship(4).getLength()).toBe(4);
});

test("When setting length for ship, the new length must be a positive integer", () => {
    const ship = Ship(4);
    expect(() => ship.setLength("4")).toThrow("Ship length must be a positive integer");
    expect(() => ship.setLength({"hi": 1})).toThrow("Ship length must be a positive integer");
    expect(() => ship.setLength(-1)).toThrow("Ship length must be a positive integer");
    expect(() => ship.setLength(0)).toThrow("Ship length must be a positive integer");
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




