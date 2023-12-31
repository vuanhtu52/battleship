import createDot from "../components/dot/dot";
import createMainPage from "../components/mainPage/mainPage";
import createNavBar from "../components/navBar/navBar";
import createPlaceShipPage from "../components/placeShipPage/placeShipPage";
import coordinatesToIndex from "../utils/coordinatesToIndex/coordinatesToIndex";
import indexToCoordinates from "../utils/indexToCoordinates/indexToCoordinates";
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

        // Load main pages
        // _loadPage(pageWrapper, "main");

        // Load place ship page
        _loadPage(pageWrapper, "placeShip");
    };

    const _loadPage = (pageWrapper, pageId) => {
        // Remove previous page
        while (pageWrapper.lastChild) {
            pageWrapper.lastChild.remove();
        }

        // Add new page
        if (pageId === "main") {
            _loadMainPage(pageWrapper);
        } else if (pageId === "placeShip") {
            _loadPlaceShipPage(pageWrapper);
        }
    };

    const _loadMainPage = pageWrapper => {
        pageWrapper.appendChild(createMainPage(gameController));

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
                _updateAdjacentCells(cell.x, cell.y, gameController.getGameboard2(), gameController.getPlayer1(), document.querySelector(".main-page .player-section:nth-child(2) .board"));
                // Check if there is a winner
                if (gameController.findWinner() !== "none") {
                    _endGame();
                }
                // Check if the ship is sunk and blur its display
                const attackedShipPlayer2 = gameController.getGameboard2().getShipByCoordinates(cell.x, cell.y);
                if (attackedShipPlayer2 !== null) {
                    if (attackedShipPlayer2.isSunk() === true) {
                        const shipElement = Array.from(document.querySelectorAll(".main-page .player-section:nth-child(2) .ship-yard .ship")).filter(shipElement => shipElement.shipId === attackedShipPlayer2.getId())[0];
                        shipElement.style.opacity = "0.2";
                    }
                }

                // Computer's turn to attack
                // const attackPoint = gameController.getPlayer2().attackRandom(gameController.getGameboard1());
                const attackPoint = gameController.getPlayer2().attackSmart(gameController.getGameboard1());
                const cellIndex = coordinatesToIndex(attackPoint[0], attackPoint[1], gameController.getGameboard1().getLength());
                _updateCell(document.querySelector(`.main-page .player-section:first-child .cell:nth-child(${cellIndex + 1})`), gameController.getGameboard1(), false, "#38BDF8");
                _updateAdjacentCells(attackPoint[0], attackPoint[1], gameController.getGameboard1(), gameController.getPlayer2(), document.querySelector(".main-page .player-section:first-child .board"));
                // Check if there is a winner
                if (gameController.findWinner() !== "none") {
                    _endGame();
                }
                // Check if the ship is sunk and blur its display
                let attackedShipPlayer1 = gameController.getGameboard1().getShipByCoordinates(attackPoint[0], attackPoint[1]);
                if (attackedShipPlayer1 !== null) {
                    if (attackedShipPlayer1.isSunk() === true) {
                        const shipElement = Array.from(document.querySelectorAll(".main-page .player-section:first-child .ship-yard .ship")).filter(shipElement => shipElement.shipId === attackedShipPlayer1.getId())[0];
                        shipElement.style.opacity = "0.2";
                    }
                }
            });
        });

        // Reset the game when user clicks new game button
        const newGameButton = document.querySelector(".main-page .new-game-button");
        newGameButton.addEventListener("click", () => {
            gameController.startNewGame();
            _loadPage(pageWrapper, "placeShip");
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
                const cellIndex = coordinatesToIndex(point[0], point[1], boardFactory.getLength());
                const cell = board.querySelector(`.cell:nth-child(${cellIndex + 1})`);
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

    // Uncover the adjacent cells if the ship is sunk
    const _updateAdjacentCells = (x, y, boardFactory, player, board) => {
        // Check if the ship at the coordinates has been sunk
        const ship = boardFactory.getShipByCoordinates(x, y);
        if (ship !== null && ship.isSunk() === true) {
            const points = boardFactory.getPointsAroundShip(x, y);
            for (let point of points) {
                try {
                    player.attack(point[0], point[1], boardFactory);
                } catch (error) {
                    continue;
                }
                const cellIndex = coordinatesToIndex(point[0], point[1], boardFactory.getLength());
                const cell = board.querySelector(`.cell:nth-child(${cellIndex + 1})`);
                _updateCell(cell, boardFactory);
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
    };

    // Used to transfer data between drag and drop events
    let _shipLength = null;
    let _shipCellIndex = null;
    const _loadPlaceShipPage = pageWrapper => {
        pageWrapper.appendChild(createPlaceShipPage());

        // Handle dragging ships
        document.querySelectorAll(".place-ship-page .ship-yard .ship").forEach(ship => {
            ship.draggable = true;
            ship.addEventListener("dragstart", event => {
                event.dataTransfer.effectAllowed = "move";
                // Transfer ship's length and position of clicked cell
                _shipLength = ship.querySelectorAll(".cell").length;
                _shipCellIndex = Array.from(ship.children).indexOf(ship.querySelector(".cell:hover"));
                // Transfer the ship element to delete later
                event.dataTransfer.setData("text/shipId", ship.id);
            });
        });

        // Handle dropping ships
        document.querySelectorAll(".place-ship-page .board .cell").forEach(cell => {
            cell.addEventListener("dragover", event => {
                event.preventDefault();
                event.dataTransfer.dropEffect = "move";
            });

            cell.addEventListener("drop", event => {
                event.preventDefault();
                try {
                    // Find the start point of the ship
                    const cellCoordinates = indexToCoordinates(Array.from(cell.parentElement.children).indexOf(cell), gameController.getGameboard1().getLength());
                    const startPoint = [cellCoordinates[0] - _shipCellIndex, cellCoordinates[1]];
                    // Add the ship to gameboard
                    gameController.getGameboard1().placeShip(startPoint[0], startPoint[1], _shipLength, "horizontal");
                    // Set id for the ship
                    const ship = gameController.getGameboard1().getShips()[gameController.getGameboard1().getShips().length - 1];
                    if (ship.getLength() === 5) {
                        ship.setId("carrier");
                    } else if (ship.getLength() === 4) {
                        ship.setId("battleship");
                    } else if (ship.getLength() === 3) {
                        const existingIds = gameController.getGameboard1().getShips().map(ship => ship.getId());
                        if (existingIds.includes("cruiser") === false) {
                            ship.setId("cruiser");
                        } else {
                            ship.setId("submarine");
                        }
                    } else if (ship.getLength() === 2) {
                        ship.setId("destroyer");
                    }
                    // Change colors of the cells occupied by the ship
                    const shipPoints = gameController.getGameboard1().getShipByCoordinates(startPoint[0], startPoint[1]).getPoints();
                    shipPoints.forEach(shipPoint => {
                        const cellIndex = coordinatesToIndex(shipPoint[0], shipPoint[1], gameController.getGameboard1().getLength());
                        const cell = document.querySelector(`.place-ship-page .board .cell:nth-child(${cellIndex + 1})`);
                        cell.style.backgroundColor = "#38BDF8";
                    });
                    // Remove the ship element from the display
                    const shipElement = document.getElementById(event.dataTransfer.getData("text/shipId"));
                    shipElement.style.visibility = "hidden";
                } catch (error) {
                    console.log(error);
                }

                // Enable reset button if there is at least 1 ship on the board
                const resetButton = document.querySelector(".place-ship-page .reset-button");
                if (gameController.getGameboard1().getShips().length > 0) {
                    resetButton.disabled = false;
                    resetButton.style.pointerEvents = "auto";
                }

                // Enable start button if all 5 ships are on the board
                const startButton = document.querySelector(".place-ship-page .start-button");
                if (gameController.getGameboard1().getShips().length === 5) {
                    startButton.disabled = false;
                    startButton.style.pointerEvents = "auto";
                }
            });

            cell.addEventListener("dragenter", () => {
                // Find the start point of the ship
                const cellCoordinates = indexToCoordinates(Array.from(cell.parentElement.children).indexOf(cell), gameController.getGameboard1().getLength());
                const startPoint = [cellCoordinates[0] - _shipCellIndex, cellCoordinates[1]];
                try {
                    // Get the points to be occupied by the ship when user drags the ship over the board
                    const shipPoints = gameController.getGameboard1().getShipPlacingPoints(startPoint[0], startPoint[1], _shipLength, "horizontal");
                    // Change the color of the cells corrensponding to the points
                    shipPoints.forEach(shipPoint => {
                        const cellIndex = coordinatesToIndex(shipPoint[0], shipPoint[1], gameController.getGameboard1().getLength());
                        const cell = document.querySelector(`.place-ship-page .board .cell:nth-child(${cellIndex + 1})`);
                        cell.style.backgroundColor = "grey";
                    });
                } catch (error) {
                    // console.log(error);
                }
            });

            cell.addEventListener("dragleave", () => {
                // cell.style.backgroundColor = "#bae6fd";
                // Find the start point of the ship
                const cellCoordinates = indexToCoordinates(Array.from(cell.parentElement.children).indexOf(cell), gameController.getGameboard1().getLength());
                const startPoint = [cellCoordinates[0] - _shipCellIndex, cellCoordinates[1]];
                try {
                    // Get the points to be occupied by the ship when user drags the ship over the board
                    const shipPoints = gameController.getGameboard1().getShipPlacingPoints(startPoint[0], startPoint[1], _shipLength, "horizontal");
                    // Change the color of the cells corrensponding to the points
                    shipPoints.forEach(shipPoint => {
                        const cellIndex = coordinatesToIndex(shipPoint[0], shipPoint[1], gameController.getGameboard1().getLength());
                        const cell = document.querySelector(`.place-ship-page .board .cell:nth-child(${cellIndex + 1})`);
                        cell.style.backgroundColor = "#bae6fd";
                    });
                } catch (error) {
                    // console.log(error);
                }
            });
        });

        // Rotate the ship when user clicks on it
        document.querySelectorAll(".place-ship-page .board .cell").forEach(cell => {
            cell.addEventListener("click", () => {
                const cellIndex = Array.from(cell.parentElement.children).indexOf(cell);
                const [x, y] = indexToCoordinates(cellIndex, gameController.getGameboard1().getLength());
                try {
                    const startPoint = gameController.getGameboard1().getShipByCoordinates(x, y).getPoints()[0];
                    const oldShipPoints = gameController.getGameboard1().getShipByCoordinates(x, y).getPoints();
                    // Rotate the ship
                    gameController.getGameboard1().rotateShip(x, y);
                    // Change color for old points
                    oldShipPoints.forEach(point => {
                        const cellIndex = coordinatesToIndex(point[0], point[1], gameController.getGameboard1().getLength());
                        const cell = document.querySelector(`.place-ship-page .board .cell:nth-child(${cellIndex + 1})`);
                        cell.style.backgroundColor = "#BAE6FD";
                    });
                    // Update color for new ship points
                    const newShipPoints = gameController.getGameboard1().getShipByCoordinates(startPoint[0], startPoint[1]).getPoints();
                    newShipPoints.forEach(point => {
                        const cellIndex = coordinatesToIndex(point[0], point[1], gameController.getGameboard1().getLength());
                        const cell = document.querySelector(`.place-ship-page .board .cell:nth-child(${cellIndex + 1})`);
                        cell.style.backgroundColor = "#38BDF8";
                    });
                } catch (error) {
                    console.log(error);
                }
            });
        });

        // Reset the page when user clicks on reset button
        const resetButton = document.querySelector(".place-ship-page .reset-button");
        resetButton.addEventListener("click", () => {
            // Reset gameboard
            gameController.getGameboard1().reset();
            // Reset colors for the board
            document.querySelectorAll(".place-ship-page .board .cell").forEach(cell => {
                cell.style.backgroundColor = "#BAE6FD";
            })
            // Display the ships again
            document.querySelectorAll(".place-ship-page .ship-yard .ship").forEach(ship => {
                ship.style.visibility = "visible";
            });
            // Disable reset button
            resetButton.disabled = true;
            resetButton.style.pointerEvents = "none";
            // Disable start button
            const startButton = document.querySelector(".place-ship-page .start-button");
            startButton.disabled = true;
            startButton.pointerEvents = "none";
        });

        // Arrange the ships on enemy's board and go to main page when user clicks start
        const startButton = document.querySelector(".place-ship-page .start-button");
        startButton.addEventListener("click", () => {
            // Place random ships on enemy's board
            gameController.getGameboard2().placeShipRandom(5);
            gameController.getGameboard2().placeShipRandom(4);
            gameController.getGameboard2().placeShipRandom(3);
            gameController.getGameboard2().placeShipRandom(3);
            gameController.getGameboard2().placeShipRandom(2);

            // Set id for the ships
            // const ship = gameController.getGameboard2().getShips()[gameController.getGameboard2().getShips() - 1];
            const ships = gameController.getGameboard2().getShips();
            for (let ship of ships) {
                if (ship.getLength() === 5) {
                    ship.setId("carrier");
                } else if (ship.getLength() === 4) {
                    ship.setId("battleship");
                } else if (ship.getLength() === 3) {
                    const existingIds = gameController.getGameboard1().getShips().map(ship => ship.getId());
                    if (existingIds.includes("cruiser") === false) {
                        ship.setId("cruiser");
                    } else {
                        ship.setId("submarine");
                    }
                } else if (ship.getLength() === 2) {
                    ship.setId("destroyer");
                }
            }

            // Load main page
            _loadPage(pageWrapper, "main");
        });
    };

    return {
        init,
    };
};

export default ScreenController;