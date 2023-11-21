import createDot from "../components/dot/dot";
import createMainPage from "../components/mainPage/mainPage";
import createNavBar from "../components/navBar/navBar";
import GameController from "./GameController";

const ScreenController = () => {
    const gameController = GameController();

    const init = () => {
        // Start new game
        gameController.startNewGame();

        // Add nav bar
        document.body.appendChild(createNavBar());

        // Add page wrapper
        const pageWrapper = document.createElement("div");
        pageWrapper.className = "page-wrapper";
        document.body.appendChild(pageWrapper);

        // Load main page
        _loadPage(pageWrapper, "main");
    };

    const _loadPage = (pageWrapper, pageId) => {
        // Remove previous page
        while (pageWrapper.lastChild) {
            pageWrapper.lastChild.remove();
        }

        // Add new page
        if (pageId === "main") {
            _loadMainPage(pageWrapper);
        }
    };

    const _loadMainPage = pageWrapper => {
        pageWrapper.appendChild(createMainPage());     

        // Render the game boards
        _renderBoard(document.querySelector(".main-page .player-section:first-child .board"), gameController.getGameboard1(), "#38BDF8", false);
        _renderBoard(document.querySelector(".main-page .player-section:nth-child(2) .board"), gameController.getGameboard2(), "#A19DB0", true);

        // Disable clicking on player's board
        _disableBoard(document.querySelector(".main-page .player-section:first-child .board"));

        // Detect when user clicks on computer's board
        document.querySelectorAll(".main-page .player-section:nth-child(2) .board .cell").forEach(cell => {
            cell.addEventListener("click", () => {
                // Play the attack and display it on the board
                gameController.getPlayer1().attack(cell.x, cell.y, gameController.getGameboard2());
                _updateCell(cell, gameController.getGameboard2(), true, "#A19DB0");
                if (gameController.findWinner() !== "none") {
                    _endGame();
                }

                // Computer's turn to attack
                const attackPoint = gameController.getPlayer2().attackRandom(gameController.getGameboard1());
                const cellIndex = attackPoint[0] + 1 + gameController.getGameboard1().getLength()*attackPoint[1];
                _updateCell(document.querySelector(`.main-page .player-section:first-child .cell:nth-child(${cellIndex})`), gameController.getGameboard1(), false, "#38BDF8");
                if (gameController.findWinner() !== "none") {
                    _endGame();
                }
            });
        });
    };

    const _disableBoard = board => {
        board.style.pointerEvents = "none";
    };

    const _renderBoard = (board, boardFactory, shipColor, hideShips) => {
        // Display the ships on the board
        if (!hideShips) {
            const ships = boardFactory.getShips();
            let shipPoints = [];
            ships.forEach(ship => {
                shipPoints = shipPoints.concat(ship.getPoints());
            });
            shipPoints.forEach(point => {
                const cellIndex = point[0] + 1 + boardFactory.getLength()*point[1];
                const cell = board.querySelector(`.cell:nth-child(${cellIndex})`);
                cell.style.backgroundColor = shipColor; 
            });
        }
    };

    const _updateCell = (cell, boardFactory, hideShips, shipColor) => {
        // Check if the cell is a missed shot
        const missedShots = boardFactory.getMissedShots();
        
        for (let point of missedShots) {
            if (cell.x === point[0] && cell.y === point[1]) {
                cell.appendChild(createDot("white"));
                cell.style.pointerEvents = "none";
                break;
            }
        }

        // Check if the cell is occupied by a ship
        const ships = boardFactory.getShips();
        let shipPoints = [];
        ships.forEach(ship => {
            shipPoints = shipPoints.concat(ship.getPoints());
        });

        for (let point of shipPoints) {
            if (cell.x === point[0] && cell.y === point[1]) {
                cell.style.pointerEvents = "none";
                cell.appendChild(createDot("red"));
                // Display the ship's point if it is hidden in enemy board
                if (hideShips === true) {
                    setTimeout(() => {
                        cell.style.backgroundColor = shipColor;
                    }, 150);
                }
                break;
            }
        }
    };

    const _endGame = () => {
        // Find the winner
        const winner = gameController.findWinner();

        // Disable 2 game boards
        document.querySelectorAll(".main-page .player-section .board").forEach(board => {
            board.style.pointerEvents = "none";
        });

        // Display the winner
        const messageDiv = document.querySelector(".main-page .message");
        if (winner === "1") {
            messageDiv.textContent = "Winner: Player 1";
        } else {
            messageDiv.textContent = "Winner: Player 2";
        }
    }

    return {
        init,
    };
};

export default ScreenController;