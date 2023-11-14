import getRandomInteger from "./getRandomInteger";

test("Test getRandomInteger function: Should return an integer", () => {
    expect(Number.isInteger(getRandomInteger(1, 10))).toBe(true);
});

test("Test getRandomInteger function: Should return integer within range", () => {
    expect(getRandomInteger(1, 10)).toBeGreaterThanOrEqual(1);
    expect(getRandomInteger(1, 10)).toBeLessThanOrEqual(10);
});