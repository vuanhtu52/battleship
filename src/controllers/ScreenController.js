import createMainPage from "../components/mainPage/mainPage";
import createNavBar from "../components/navBar/navBar";

const ScreenController = () => {
    const init = () => {
        // Add nav bar
        document.body.appendChild(createNavBar());

        // Add page wrapper
        const pageWraper = document.createElement("div");
        pageWraper.className = "page-wrapper";
        document.body.appendChild(pageWraper);

        // Load main page
        _loadPage(pageWraper, "main");
    };

    const _loadPage = (pageWrapper, pageId) => {
        // Remove previous page
        while (pageWrapper.lastChild) {
            pageWrapper.lastChild.remove();
        }

        // Add new page
        if (pageId === "main") {
            pageWrapper.appendChild(createMainPage());
        }
    };

    return {
        init,
    };
};

export default ScreenController;