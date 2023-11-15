import createNavBar from "../components/navBar/navBar";

const ScreenController = () => {
    const init = () => {
        // Add nav bar
        document.body.appendChild(createNavBar());
    };

    return {
        init,
    };
};

export default ScreenController;