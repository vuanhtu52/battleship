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
    };

    const getPlayer1 = () => _player1;

    const getPlayer2 = () => _player2;

    const getGameboard1 = () => _gameboard1;

    const getGameboard2 = () => _gameboard2;

    const switchPlayer = () => {
        _player1.setActive(!_player1.getActive());
        _player2.setActive(!_player2.getActive());
    };

    // Either return "1", "2", or "none"
    const findWinner = () => {
        // Check if player 1's ships are all sunk
        if (_gameboard1.allShipsSunk() === true) {
            return "2";
        }

        // Check if player 2's ships are all sunk
        if (_gameboard2.allShipsSunk() === true) {
            return "1";
        }

        return "none";
    };
    
    return {
        startNewGame,
        getPlayer1,
        getPlayer2,
        getGameboard1,
        getGameboard2,
        switchPlayer,
        findWinner,
    };
};

export default GameController;