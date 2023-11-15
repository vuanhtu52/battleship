import "./navBar.css";

const createNavBar = () => {
    // Create nav bar
    const navBar = document.createElement("div");
    navBar.className = "nav-bar";

    // Add the header
    const header = document.createElement("div");
    header.textContent = "BATTLESHIP";
    header.className = "header";
    navBar.appendChild(header);

    return navBar;
};

export default createNavBar;