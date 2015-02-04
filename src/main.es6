import Logger from "./class/Logger";
import co from "./thirdparty/co";

var initExtension = () => {
    Logger.log("Hello World from ES6 extension!");
};

var SUCCESS = Symbol();

function promiseResponse() {
    return new Promise(function(resolve, reject) {
        setTimeout(function () {
            resolve(SUCCESS);
        }, 1);
    });
}

async function tryAsync() {
    var response = await promiseResponse();
    if (response === SUCCESS) {
        Logger.log("ES7 async works!");
    } else {
        Logger.error("ES7 async failed...");
    }
}

function* tryGenerators() {
    var response = yield promiseResponse();
    if (response === SUCCESS) {
        Logger.log("ES6 generators work!");
    } else {
        Logger.error("ES6 generators failed...");
    }
}

export default () => {
    initExtension();
    tryAsync();
    co(tryGenerators);
};
