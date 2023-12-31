import Gameboard from "../Gameboard/Gameboard";
import Player from "./Player";

test("Test attack function: Check if the parameters are valid", () => {
    const player = Player();
    const enemyBoard = Gameboard(5);

    expect(() => player.attack("0", 1, enemyBoard)).toThrow("attack: Coordinates must be integers");
    expect(() => player.attack(0, "1", enemyBoard)).toThrow("attack: Coordinates must be integers");
    expect(() => player.attack(-1, 0, enemyBoard)).toThrow("attack: Coordinates must be inside board");
    expect(() => player.attack(0, 5, enemyBoard)).toThrow("attack: Coordinates must be inside board");
    
    player.attack(1, 1, enemyBoard);
    expect(() => player.attack(1, 1, enemyBoard)).toThrow("attack: This point is already attacked");
    expect(() => player.attack(0, 1, enemyBoard)).not.toThrow("attack: This point is already attacked");
});

test("Test attackRandom function: Must throw error when out of moves", () => {
    const player = Player();
    const enemyBoard = Gameboard(1);

    player.attack(0, 0, enemyBoard);
    expect(() => player.attackRandom(enemyBoard)).toThrow("attackRandom: Out of moves");
});

test("Test attackRandom function: Should not throw any error", () => {
    const player = Player();
    const enemyBoard = Gameboard(2);
    player.attack(0, 0, enemyBoard);
    player.attack(0, 1, enemyBoard);
    player.attack(1, 0, enemyBoard);

    expect(() => player.attackRandom(enemyBoard)).not.toThrow("attackRandom: OUt of moves");
    expect(() => player.attackRandom(enemyBoard)).toThrow("attackRandom: Out of moves");
});

test("Test getActive function", () => {
    const player = Player();
    expect(typeof(player.getActive())).toBe("boolean");
});

test("Test setActive function", () => {
    const player = Player();
    expect(() => player.setActive(1)).toThrow("Argument must be a boolean value");
    
    player.setActive(true);
    expect(player.getActive()).toBe(true);

    player.setActive(false);
    expect(player.getActive()).toBe(false);
});

test("Test attackSmart function", () => {
    const player = Player();
    const enemyBoard = Gameboard(3);
    enemyBoard.placeShip(0, 0, 3, "vertical");

    player.attack(0, 0, enemyBoard);
    player.attack(0, 1, enemyBoard);
    // expect(player.attackSmart(enemyBoard)).toStrictEqual([0, 2]);
});

