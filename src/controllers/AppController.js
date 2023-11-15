import ScreenController from "./ScreenController";

const AppController = () => {
    const screenController = ScreenController();

    const init = () => {
        screenController.init();
    };
    
    return {
        init,
    };
};

export default AppController;