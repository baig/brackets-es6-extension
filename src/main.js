import Logger from "./class/Logger";

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

function runGenerator(g) {
    var it = g(), ret;
    // asynchronously iterate over generator
    (function iterate(val){
        ret = it.next(val);
        if (!ret.done) {
            // poor man's "is it a promise?" test
            if ("then" in ret.value) {
                // wait on the promise
                ret.value.then(iterate);
            }
            // immediate value: just send right back in
            else {
                // avoid synchronous recursion
                setTimeout(function(){
                    iterate(ret.value);
                }, 0);
            }
        }
    }());
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
    runGenerator(tryGenerators);
};
