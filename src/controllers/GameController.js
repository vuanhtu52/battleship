import ScreenController from "./ScreenController";
import Player from "../factories/Player/Player";
import Gameboard from "../factories/Gameboard/Gameboard";

const GameController = () => {
    let _player1;
    let _gameboard1;
    let _player2;
    let _gameboard2;

    const startNewGame = () => {
        // Initialize the players and gameboards
        _player1 = Player();
        _player1.setActive(true);
        _gameboard1 = Gameboard(10);
        _player2 = Player();
        _gameboard2 = Gameboard(10);

        // Hard-code the ships for now
        _gameboard1.placeShip(1, 8, 5, "horizontal");
        _gameboard1.placeShip(2, 1, 4, "horizontal");
        _gameboard1.placeShip(0, 2, 3, "vertical");
        _gameboard1.placeShip(9, 6, 3, "vertical");
        _gameboard1.placeShip(6, 3, 2, "vertical");

        _gameboard2.placeShip(1, 8, 5, "horizontal");
        _gameboard2.placeShip(2, 1, 4, "horizontal");
        _gameboard2.placeShip(0, 2, 3, "vertical");
        _gameboard2.placeShip(9, 6, 3, "vertical");
        _gameboard2.placeShip(6, 3, 2, "vertical");
    };

    const getPlayer1 = () => _player1;

    const getPlayer2 = () => _player2;

    const getGameboard1 = () => _gameboard1;

    const getGameboard2 = () => _gameboard2;

    const switchPlayer = () => {
        _player1.setActive(!_player1.getActive());
        _player2.setActive(!_player2.getActive());
    };
    
    return {
        startNewGame,
        getPlayer1,
        getPlayer2,
        getGameboard1,
        getGameboard2,
        switchPlayer,
    };
};

export default GameController;