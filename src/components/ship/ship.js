import "./ship.css";

const createShip = (length, color) => {
    const ship = document.createElement("div");
    ship.className = "ship";

    for (let i = 0; i < length; i++) {
        ship.appendChild(createCell(color));
    }

    return ship;
};

const createCell = color => {
    const cell = document.createElement("div");
    cell.className = "cell";

    cell.style.backgroundColor = color;

    return cell;
}

export default createShip;