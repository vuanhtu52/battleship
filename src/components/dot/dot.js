import "./dot.css";

const createDot = color => {
    const dot = document.createElement("div");
    dot.className = "dot";
    dot.style.backgroundColor = color;

    return dot;
};

export default createDot;