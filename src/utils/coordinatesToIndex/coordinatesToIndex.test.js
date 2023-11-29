import coordinatesToIndex from "./coordinatesToIndex";

test("Test coordinatesToIndex function: Arguments must be integers", () => {
    expect(() => coordinatesToIndex("1", 2, 3)).toThrow("coordinatesToIndex: Arguments must be integers");
    expect(() => coordinatesToIndex(1, "2", 3)).toThrow("coordinatesToIndex: Arguments must be integers");
    expect(() => coordinatesToIndex(1, 2, "3")).toThrow("coordinatesToIndex: Arguments must be integers");
    expect(() => coordinatesToIndex(1, 2, 3)).not.toThrow("coordinatesToIndex: Arguments must be integers");
});

test("Test coordinatesToIndex function: board length must be positive", () => {
    expect(() => coordinatesToIndex(1, 2, -1)).toThrow("coordinatesToIndex: boardLength must be positive");
    expect(() => coordinatesToIndex(1, 2, 0)).toThrow("coordinatesToIndex: boardLength must be positive");
    expect(() => coordinatesToIndex(1, 2, -2)).toThrow("coordinatesToIndex: boardLength must be positive");
    expect(() => coordinatesToIndex(1, 2, 1)).not.toThrow("coordinatesToIndex: boardLength must be positive");
});

test("Test coordinatesToIndex function: x and y must be within the board", () => {
    expect(() => coordinatesToIndex(-1, 2, 5)).toThrow("coordinatesToIndex: x must be within the board");
    expect(() => coordinatesToIndex(5, 2, 5)).toThrow("coordinatesToIndex: x must be within the board");
    expect(() => coordinatesToIndex(0, 2, 5)).not.toThrow("coordinatesToIndex: x must be within the board");
    expect(() => coordinatesToIndex(4, 2, 5)).not.toThrow("coordinatesToIndex: x must be within the board");
    expect(() => coordinatesToIndex(1, -1, 5)).toThrow("coordinatesToIndex: y must be within the board");
    expect(() => coordinatesToIndex(1, 5, 5)).toThrow("coordinatesToIndex: y must be within the board");
    expect(() => coordinatesToIndex(1, 0, 5)).not.toThrow("coordinatesToIndex: y must be within the board");
    expect(() => coordinatesToIndex(1, 4, 5)).not.toThrow("coordinatesToIndex: y must be within the board");
});

test("Test coordinatesToIndex function: Function must return correct index", () => {
    expect(coordinatesToIndex(0, 0, 10)).toBe(0);
    expect(coordinatesToIndex(9, 0, 10)).toBe(9);
    expect(coordinatesToIndex(0, 9, 10)).toBe(90);
    expect(coordinatesToIndex(9, 9, 10)).toBe(99);
    expect(coordinatesToIndex(2, 1, 10)).toBe(12);
});