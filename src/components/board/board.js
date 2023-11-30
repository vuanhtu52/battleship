import "./board.css";

const createBoard = (length, color, hoverColor) => {
    const board = document.createElement("div");
    board.className = "board";

    for (let y = 0; y < length; y++) {
        for (let x = 0; x < length; x++) {
            board.appendChild(createCell(color, hoverColor, x, y));
        }
    }

    return board;
};

const createCell = (color, hoverColor, x, y) => {
    const cell = document.createElement("div");
    cell.className = "cell";

    // Set background color
    cell.style.backgroundColor = color;

    if (hoverColor !== null) {
        // Change color when hovering
        cell.addEventListener("mouseover", () => {
            cell.style.backgroundColor = hoverColor;
        });

        // Change color when not hovering anymore
        cell.addEventListener("mouseout", () => {
            setTimeout(() => {
                cell.style.backgroundColor = color;
            }, 100);
        });
    }

    // Save coordinates
    cell.x = x;
    cell.y = y;

    return cell;
};

export default createBoard;