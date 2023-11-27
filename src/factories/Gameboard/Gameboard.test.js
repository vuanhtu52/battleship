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

test("Test placeShip function: A ship cannot occupy a cell surrounding another ship", () => {
    const board = Gameboard(10);
    board.placeShip(2, 1, 4, "horizontal");

    expect(() => board.placeShip(0, 0, 2, "horizontal")).toThrow("placeShip: A ship cannot occupy a cell surrounding another ship");
    expect(() => board.placeShip(1, 1, 2, "vertical")).toThrow("placeShip: A ship cannot occupy a cell surrounding another ship");
    expect(() => board.placeShip(6, 0, 5, "vertical")).toThrow("placeShip: A ship cannot occupy a cell surrounding another ship");
    expect(() => board.placeShip(6, 2, 2, "horizontal")).toThrow("placeShip: A ship cannot occupy a cell surrounding another ship");
    expect(() => board.placeShip(0, 2, 2, "vertical")).not.toThrow("placeShip: A ship cannot occupy a cell surrounding another ship");
});

test("Test getShips function", () => {
    const board = Gameboard(5);
    expect(board.getShips().length).toBe(0);

    board.placeShip(0, 0, 4, "horizontal");
    expect(board.getShips().length).toBe(1);

    board.placeShip(1, 2, 2, "vertical");
    expect(board.getShips().length).toBe(2);
});

test("Test receiveAttack function: Check if the parameters are integers and within the board", () => {
    const board = Gameboard(5);

    expect(() => board.receiveAttack("0", 0)).toThrow("receiveAttack: Coordinates must be integers");
    expect(() => board.receiveAttack(1, "1")).toThrow("receiveAttack: Coordinates must be integers");
    expect(() => board.receiveAttack(-1, 0)).toThrow("receiveAttack: Coordinates must be inside board");
    expect(() => board.receiveAttack(4, 5)).toThrow("receiveAttack: Coordinates must be inside board");
    expect(() => board.receiveAttack(5, 4)).toThrow("receiveAttack: Coordinates must be inside board");
    expect(() => board.receiveAttack(0, 0)).not.toThrow("receiveAttack: Coordinates must be inside board");
    expect(() => board.receiveAttack(4, 4)).not.toThrow("receiveAttack: Coordinates must be inside board");
});

test("Test receiveAttack function: Check if the function detects when a ship is hit", () => {
    const board = Gameboard(5);
    board.placeShip(0, 0, 4, "horizontal");
    board.placeShip(4, 2, 2, "vertical");
    board.receiveAttack(0, 0);
    board.receiveAttack(3, 0);
    board.receiveAttack(4, 0);
    board.receiveAttack(4, 2);
    board.receiveAttack(4, 4);

    expect(board.getShips()[0].getHitCount()).toBe(2);
    expect(board.getShips()[1].getHitCount()).toBe(1);
});

test("Test receiveAttack function: Check if the function records the correct missed shots", () => {
    const board = Gameboard(5);
    board.placeShip(0, 0, 4, "horizontal");
    board.placeShip(4, 2, 2, "vertical");

    expect(board.getMissedShots()).toStrictEqual([]);

    board.receiveAttack(0, 0);
    board.receiveAttack(3, 0);
    board.receiveAttack(4, 0);
    board.receiveAttack(4, 2);
    board.receiveAttack(4, 4);
    
    expect(board.getMissedShots()).toStrictEqual([[4, 0], [4, 4]]);
});

test("Test receiveAttack function: The board cannot receive the same attack twice", () => {
    const board = Gameboard(5);
    board.receiveAttack(0, 0);

    expect(() => board.receiveAttack(0, 0)).toThrow("receiveAttack: Cannot attack the same spot twice");
    expect(() => board.receiveAttack(0, 1)).not.toThrow("receiveAttack: Cannot attack the same spot twice");
});

test("Test allShipsSunk function", () => {
    const board = Gameboard(5);

    expect(() => board.allShipsSunk()).toThrow("allShipsSunk: No ships on the board");

    board.placeShip(0, 0, 2, "horizontal");
    board.placeShip(3, 1, 3, "vertical");

    expect(board.allShipsSunk()).toBe(false);
    board.receiveAttack(0, 0);
    expect(board.allShipsSunk()).toBe(false);
    board.receiveAttack(1, 0);
    expect(board.allShipsSunk()).toBe(false);
    board.receiveAttack(2, 0);
    expect(board.allShipsSunk()).toBe(false);
    board.receiveAttack(3, 1);
    expect(board.allShipsSunk()).toBe(false);
    board.receiveAttack(3, 2);
    expect(board.allShipsSunk()).toBe(false);
    board.receiveAttack(3, 3);
    expect(board.allShipsSunk()).toBe(true);
    board.receiveAttack(3, 4);
    expect(board.allShipsSunk()).toBe(true);
});

test("Test getAttackPoints function", () => {
    const board = Gameboard(5);
    board.receiveAttack(0, 1);
    expect(board.getAttackedPoints()).toStrictEqual([[0, 1]]);
    board.receiveAttack(1, 2);
    expect(board.getAttackedPoints()).toStrictEqual([[0, 1], [1, 2]]);
    board.receiveAttack(4, 4);
    expect(board.getAttackedPoints()).toStrictEqual([[0, 1], [1, 2], [4, 4]]);
});

test("Test getAvailablePoints function", () => {
    const board = Gameboard(3);

    board.receiveAttack(2, 2);
    expect(board.getAvailablePoints()).toStrictEqual([[0, 0], [0, 1], [0, 2], [1, 0], [1, 1], [1, 2], [2, 0], [2, 1]]);

    board.receiveAttack(0, 1);
    expect(board.getAvailablePoints()).toStrictEqual([[0, 0], [0, 2], [1, 0], [1, 1], [1, 2], [2, 0], [2, 1]]);
});

test("Test getPointsAroundShip function: Params must be non-negative integers", () => {
    const board = Gameboard(5);
    board.placeShip(0, 0, 2, "horizontal");

    expect(() => board.getPointsAroundShip(-1, 0)).toThrow("getPointsAroundShip: Arguments must be non-negative integers");
    expect(() => board.getPointsAroundShip("0", 0)).toThrow("getPointsAroundShip: Arguments must be non-negative integers");
});

test("Test getPointsAroundShip function: Coordinates must be inside board and is occupied by a ship", () => {
    const board = Gameboard(5);
    board.placeShip(0, 0, 2, "horizontal");

    expect(() => board.getPointsAroundShip(5, 0)).toThrow("getPointsAroundShip: Point outside board");
    expect(() => board.getPointsAroundShip(1, 1)).toThrow("getPointsAroundShip: No ship at this point");
});

test("Test getPointsAroundShip function: Ship at top left corner", () => {
    const board = Gameboard(5);
    board.placeShip(0, 0, 2, "horizontal");

    expect(board.getPointsAroundShip(0, 0)).toStrictEqual([[2, 0], [0, 1], [1, 1], [2, 1]]);
    expect(board.getPointsAroundShip(1, 0)).toStrictEqual([[2, 0], [0, 1], [1, 1], [2, 1]]);
});

test("Test getPointsAroundShip function: Ship at top right corner", () => {
    const board = Gameboard(5);
    board.placeShip(3, 0, 2, "horizontal");

    expect(board.getPointsAroundShip(3, 0)).toStrictEqual([[2, 0], [2, 1], [3, 1], [4, 1]]);
    expect(board.getPointsAroundShip(4, 0)).toStrictEqual([[2, 0], [2, 1], [3, 1], [4, 1]]);
});

test("Test getPointsAroundShip function: Ship at bottom left corner", () => {
    const board = Gameboard(5);
    board.placeShip(0, 4, 2, "horizontal");

    expect(board.getPointsAroundShip(0, 4)).toStrictEqual([[0, 3], [1, 3], [2, 3], [2, 4]]);
    expect(board.getPointsAroundShip(1, 4)).toStrictEqual([[0, 3], [1, 3], [2, 3], [2, 4]]);
});

test("Test getPointsAroundShip function: Ship at bottom right corner", () => {
    const board = Gameboard(5);
    board.placeShip(3, 4, 2, "horizontal");

    expect(board.getPointsAroundShip(3, 4)).toStrictEqual([[2, 3], [3, 3], [4, 3], [2, 4]]);
    expect(board.getPointsAroundShip(4, 4)).toStrictEqual([[2, 3], [3, 3], [4, 3], [2, 4]]);
});

test("Test getPointsAroundShip function: Ship in the middle horizontally", () => {
    const board = Gameboard(5);
    board.placeShip(2, 2, 2, "horizontal");

    expect(board.getPointsAroundShip(2, 2)).toStrictEqual([[1, 1], [2, 1], [3, 1], [4, 1], [1, 2], [4, 2], [1, 3], [2, 3], [3, 3], [4, 3]]);
    expect(board.getPointsAroundShip(3, 2)).toStrictEqual([[1, 1], [2, 1], [3, 1], [4, 1], [1, 2], [4, 2], [1, 3], [2, 3], [3, 3], [4, 3]]);
});

test("Test getPointsAroundShip function: Ship in the middle vertically", () => {
    const board = Gameboard(5);
    board.placeShip(3, 2, 2, "vertical");

    expect(board.getPointsAroundShip(3, 2)).toStrictEqual([[2, 1], [3, 1], [4, 1], [2, 2], [4, 2], [2, 3], [4, 3], [2, 4], [3, 4], [4, 4]]);
    expect(board.getPointsAroundShip(3, 3)).toStrictEqual([[2, 1], [3, 1], [4, 1], [2, 2], [4, 2], [2, 3], [4, 3], [2, 4], [3, 4], [4, 4]]);
});

test("Test getShipByCoordinates function: Coordinates must be integers within the board", () => {
    const board = Gameboard(5);

    expect(() => board.getShipByCoordinates("0", 0)).toThrow("getShipByCoordinates: Arguments must be non-negative integers");
    expect(() => board.getShipByCoordinates(0, -1)).toThrow("getShipByCoordinates: Arguments must be non-negative integers");
    expect(() => board.getShipByCoordinates(0, 5)).toThrow("getShipByCoordinates: Arguments must be inside board");
});

test("Test getShipByCoordinates function: Should return the correct ship", () => {
    const board = Gameboard(5);
    board.placeShip(0, 0, 2, "horizontal");

    expect(board.getShipByCoordinates(1, 1)).toBeNull();
    expect(board.getShipByCoordinates(0, 0)).not.toBeNull();
    expect(board.getShipByCoordinates(1, 0)).not.toBeNull();
});