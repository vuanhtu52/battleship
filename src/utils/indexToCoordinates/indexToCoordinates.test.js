import indexToCoordinates from "./indexToCoordinates";

test("Test indexToCoordinates function: Arguments must be integers", () => {
    expect(() => indexToCoordinates("1", 10)).toThrow("indexToCoordinates: Arguments must be integers");
    expect(() => indexToCoordinates(1, "10")).toThrow("indexToCoordinates: Arguments must be integers");
    expect(() => indexToCoordinates(1.5, 10)).toThrow("indexToCoordinates: Arguments must be integers");
    expect(() => indexToCoordinates(2, 10.3)).toThrow("indexToCoordinates: Arguments must be integers");
    expect(() => indexToCoordinates(1, 10)).not.toThrow("indexToCoordinates: Arguments must be integers");
});

test("Test indexToCoordinates function: boardLength must be positive", () => {
    expect(() => indexToCoordinates(1, 0)).toThrow("indexToCoordinates: boardLength must be positive");
    expect(() => indexToCoordinates(1, -1)).toThrow("indexToCoordinates: boardLength must be positive");
    expect(() => indexToCoordinates(1, 1)).not.toThrow("indexToCoordinates: boardLength must be positive");
});

test("Test indexToCoordinates function: index must be within the board", () => {
    expect(() => indexToCoordinates(-1, 10)).toThrow("indexToCoordinates: index must be within the board");
    expect(() => indexToCoordinates(100, 10)).toThrow("indexToCoordinates: index must be within the board");
    expect(() => indexToCoordinates(0, 10)).not.toThrow("indexToCoordinates: index must be within the board");
    expect(() => indexToCoordinates(99, 10)).not.toThrow("indexToCoordinates: index must be within the board");

    expect(() => indexToCoordinates(-1, 5)).toThrow("indexToCoordinates: index must be within the board");
    expect(() => indexToCoordinates(25, 5)).toThrow("indexToCoordinates: index must be within the board");
    expect(() => indexToCoordinates(0, 5)).not.toThrow("indexToCoordinates: index must be within the board");
    expect(() => indexToCoordinates(24, 5)).not.toThrow("indexToCoordinates: index must be within the board");
});

test("Test indexToCoordinates function: Function must return correct x and y", () => {
    expect(indexToCoordinates(0, 10)).toStrictEqual([0, 0]);
    expect(indexToCoordinates(99, 10)).toStrictEqual([9, 9]);
    expect(indexToCoordinates(9, 10)).toStrictEqual([9, 0]);
    expect(indexToCoordinates(90, 10)).toStrictEqual([0, 9]);
    expect(indexToCoordinates(33, 10)).toStrictEqual([3, 3]);
    expect(indexToCoordinates(23, 5)).toStrictEqual([3, 4]);
});