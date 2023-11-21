import "./mainPage.css";
import createBoard from "../board/board";
import createShip from "../ship/ship";

const createMainPage = () => {
    // Add page
    const page = document.createElement("div");
    page.className = "main-page";

    // Add game section
    const gameSection = document.createElement("div");
    gameSection.className = "game-section";

    // Add player 1's section
    const player1Section = createPlayerSection("Player 1", "#bae6fd", "#38bdf8"); 
    page.appendChild(player1Section);
    gameSection.appendChild(player1Section);

    // Add player 2's section
    const player2Section = createPlayerSection("Player 2", "#EEEFF0", "#A19DB0");
    page.appendChild(player2Section);
    gameSection.appendChild(player2Section);

    page.appendChild(gameSection);

    // Add winner message
    const messageDiv = document.createElement("div");
    messageDiv.className = "message";
    page.appendChild(messageDiv);

    // Add new game button
    const newGameButton = document.createElement("button");
    newGameButton.className = "new-game-button";
    newGameButton.textContent = "New Game";
    page.appendChild(newGameButton);

    return page;
};

const createPlayerSection = (playerId, color, hoverColor) => {
    // Add section
    const section = document.createElement("div");
    section.className = "player-section";

    // Add header
    const header = document.createElement("div");
    header.className = "header";
    header.textContent = playerId;
    section.appendChild(header);

    // Add board
    const board = createBoard(10, color, hoverColor);
    section.appendChild(board);

    // Add ship yard
    const yard = createShipYard();
    yard.className = "ship-yard";
    yard.appendChild(createShip(5, hoverColor));
    yard.appendChild(createShip(4, hoverColor));
    yard.appendChild(createShip(3, hoverColor));
    yard.appendChild(createShip(3, hoverColor));
    yard.appendChild(createShip(2, hoverColor));
    section.appendChild(yard);

    return section;
};
 
const createShipYard = () => {
    const yard = document.createElement("div");

    return yard;
}

export default createMainPage;