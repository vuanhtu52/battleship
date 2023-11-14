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

