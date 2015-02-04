/*global brackets, define, window*/

define(function (require) {
    "use strict";

    // register es6 as javascript file extension in Brackets
    var LanguageManager = brackets.getModule("language/LanguageManager");
    if (LanguageManager.getLanguageForExtension("es6") == null) {
        LanguageManager.getLanguageForExtension("js").addFileExtension("es6");
    }

    require("dist/browser-polyfill");
    require("dist/main")();

    if (window.isBracketsTestWindow) {
        // TODO: this needs to be populated automatically somehow
        var extensionInfo = JSON.parse(require("text!package.json"));
        window[extensionInfo.name] = {
            main:   require("dist/main"),
            class: {
                Logger: require("dist/class/Logger")
            }
        };
    }

});
