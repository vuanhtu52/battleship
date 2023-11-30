import createBoard from "../board/board";
import createShip from "../ship/ship";
import "./placeShipPage.css";

const createPlaceShipPage = () => {
    // Add page
    const page = document.createElement("div");
    page.className = "place-ship-page";

    // Add guide
    const guideDiv = document.createElement("div");
    guideDiv.className = "guide";

    const guide1 = document.createElement("div");
    guide1.textContent = "1. Drag and drop the ships on the board.";
    guideDiv.appendChild(guide1);

    const guide2 = document.createElement("div");
    guide2.textContent = "2. Click on a ship to change direction."
    guideDiv.appendChild(guide2);

    page.appendChild(guideDiv);

    // Add main section
    const mainSection = document.createElement("div");
    mainSection.className = "main-section";

    // Add board
    const boardWrapper = document.createElement("div");
    boardWrapper.className = "board-wrapper";

    const board = createBoard(10, "#bae6fd", null);
    board.className = "board";
    boardWrapper.appendChild(board);


    mainSection.appendChild(boardWrapper);

    // Add ship yard
    const shipYard = document.createElement("div");
    shipYard.className = "ship-yard";

    shipYard.appendChild(createShip(5, "#38bdf8"));
    shipYard.appendChild(createShip(4, "#38bdf8"));
    shipYard.appendChild(createShip(3, "#38bdf8"));
    shipYard.appendChild(createShip(3, "#38bdf8"));
    shipYard.appendChild(createShip(2, "#38bdf8"));

    shipYard.querySelectorAll(".ship").forEach(ship => {
        const shipIndex = Array.from(shipYard.children).indexOf(ship);
        ship.id = `ship-${shipIndex}`;
    });

    mainSection.appendChild(shipYard);

    page.appendChild(mainSection);

    // Buttons
    const buttons = document.createElement("div");
    buttons.className = "buttons";

    // Add reset button
    const resetButton = document.createElement("button");
    resetButton.className = "reset-button";
    resetButton.textContent = "Reset";
    resetButton.disabled = true;
    resetButton.style.pointerEvents = "none";
    buttons.appendChild(resetButton);

    // Add start button
    const startButton = document.createElement("button");
    startButton.className = "start-button";
    startButton.textContent = "Start";
    startButton.disabled = true;
    startButton.style.pointerEvents = "none";
    buttons.appendChild(startButton);

    page.appendChild(buttons);

    return page;
};

export default createPlaceShipPage;