import Gameboard from "./Gameboard";

test("The parameter length passed to Gameboard must be a positive integer", () => {
    expect(() =>  Gameboard("4").getLength()).toThrow("Board length must be a positive integer");
    expect(() =>  Gameboard({4: 4}).getLength()).toThrow("Board length must be a positive integer");
    expect(() =>  Gameboard(-1).getLength()).toThrow("Board length must be a positive integer");
    expect(() =>  Gameboard(0).getLength()).toThrow("Board length must be a positive integer");
    expect(Gameboard(4).getLength()).toBe(4);
});

test("Test placeShip function: Check if the coordinates parameters are non-negative integers", () => {
    const board = Gameboard(5);
    expect(() => board.placeShip("1", 2)).toThrow("placeShip: Coordinates must be non-negative integers");
    expect(() => board.placeShip(1, "2")).toThrow("placeShip: Coordinates must be non-negative integers");
    expect(() => board.placeShip(-1, 2)).toThrow("placeShip: Coordinates must be non-negative integers");
    expect(() => board.placeShip(1.5, 2)).toThrow("placeShip: Coordinates must be non-negative integers");
    expect(() => board.placeShip(1, 2.5)).toThrow("placeShip: Coordinates must be non-negative integers");
    expect(() => board.placeShip(1)).toThrow("placeShip: Coordinates must be non-negative integers");
    expect(() => board.placeShip()).toThrow("placeShip: Coordinates must be non-negative integers");
});

test("Test placeShip function: Check if the shipLength param is a positive integer", () => {
    const board = Gameboard(5);
    expect(() => board.placeShip(1, 2)).toThrow("placeShip: shipLength must be a positive integer");
    expect(() => board.placeShip(1, 2, "0")).toThrow("placeShip: shipLength must be a positive integer");
    expect(() => board.placeShip(1, 2, -5)).toThrow("placeShip: shipLength must be a positive integer");
    expect(() => board.placeShip(1, 2, 1.5)).toThrow("placeShip: shipLength must be a positive integer");
    expect(() => board.placeShip(1, 2, "hello", "horizontal")).toThrow("placeShip: shipLength must be a positive integer");
});

test("Test placeShip function: Check if direction is either horizontal or vertical", () => {
    const board = Gameboard(5);
    expect(() => board.placeShip(1, 2, 3)).toThrow("placeShip: direction must be horizontal or vertical");
    expect(() => board.placeShip(1, 2, 3, 4)).toThrow("placeShip: direction must be horizontal or vertical");
    expect(() => board.placeShip(1, 2, 3, "hello")).toThrow("placeShip: direction must be horizontal or vertical");
    expect(() => board.placeShip(1, 2, 3, "horizontal")).not.toThrow("placeShip: direction must be horizontal or vertical");
    expect(() => board.placeShip(1, 2, 3, "vertical")).not.toThrow("placeShip: direction must be horizontal or vertical");
});

test("Test placeShip function: Check if the coordinates are within the board length", () => {
    const board = Gameboard(5);
    expect(() => board.placeShip(5, 1, 3, "horizontal")).toThrow("placeShip: Coordinates are not within the board");
    expect(() => board.placeShip(1, 5, 3, "horizontal")).toThrow("placeShip: Coordinates are not within the board");
    expect(() => board.placeShip(4, 4, 3, "horizontal")).not.toThrow("placeShip: Coordinates are not within the board");
    expect(() => board.placeShip(0, 0, 3, "vertical")).not.toThrow("placeShip: Coordinates are not within the board");
});

test("Test placeShip function: Check if the ship's end-point is outside the board", () => {
    const board = Gameboard(5);
    expect(() => board.placeShip(0, 2, 6, "horizontal")).toThrow("placeShip: Ship's end-point exceeds the board's area");
    expect(() => board.placeShip(0, 2, 5, "horizontal")).not.toThrow("placeShip: Ship's end-point exceeds the board's area");
    expect(() => board.placeShip(1, 2, 5, "horizontal")).toThrow("placeShip: Ship's end-point exceeds the board's area");
    expect(() => board.placeShip(1, 2, 4, "horizontal")).not.toThrow("placeShip: Ship's end-point exceeds the board's area");
    expect(() => board.placeShip(1, 0, 6, "vertical")).toThrow("placeShip: Ship's end-point exceeds the board's area");
    expect(() => board.placeShip(1, 0, 5, "vertical")).not.toThrow("placeShip: Ship's end-point exceeds the board's area");
    expect(() => board.placeShip(0, 1, 5, "vertical")).toThrow("placeShip: Ship's end-point exceeds the board's area");
    expect(() => board.placeShip(1, 1, 4, "vertical")).not.toThrow("placeShip: Ship's end-point exceeds the board's area");
});

test("Test placeShip function: Check if the ship's position overlaps with other ships", () => {
    const board = Gameboard(5);
    board.placeShip(0, 0, 4, "horizontal");

    expect(() => board.placeShip(0, 0, 2, "vertical")).toThrow("placeShip: Ship overlaps with others");
    expect(() => board.placeShip(0, 5, 2, "horizontal")).not.toThrow("placeShip: Ship overlaps with others");
    expect(() => board.placeShip(1, 1, 2, "vertical")).not.toThrow("placeShip: Ship overlaps with others");
});
