import "./board.css";

const createBoard = (length, color, hoverColor) => {
    const board = document.createElement("div");
    board.className = "board";

    for (let i = 0; i < length*length; i++) {
        board.appendChild(createCell(color, hoverColor));
    }

    return board;
};

const createCell = (color, hoverColor) => {
    const cell = document.createElement("div");
    cell.className = "cell";

    // Set background color
    cell.style.backgroundColor = color;

    // Change color when hovering
    cell.addEventListener("mouseover", () => {
        cell.style.backgroundColor = hoverColor;
    });

    // Change color when not hovering anymore
    cell.addEventListener("mouseout", () => {
        setTimeout(() => {
            cell.style.backgroundColor = color;
        }, 100);
    })

    return cell;
};

export default createBoard;