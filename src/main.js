import Logger from "Logger";

var initExtension = () => {
    Logger.log("Hello World from ES6 extension!");
};

export default {
    initExtension: initExtension
};
