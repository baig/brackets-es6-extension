/*global define, window*/

define(function (require) {
    "use strict";

    require("dist/browser-polyfill");
    require("dist/main")();

    if (window.isBracketsTestWindow) {
        // TODO: this needs to be populated automatically somehow
        var extensionInfo = JSON.parse(require("text!package.json"));
        window[extensionInfo.name] = {
            main: require("dist/main"),
            class: {
                Logger: require("dist/class/Logger")
            }
        };
    }

});
