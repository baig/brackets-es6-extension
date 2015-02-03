/*global brackets, define*/

define(function (require) {
    "use strict";

    // register es6 as javascript file extension in Brackets
    var LanguageManager = brackets.getModule("language/LanguageManager");
    if (LanguageManager.getLanguageForExtension("es6") == null) {
        LanguageManager.getLanguageForExtension("js").addFileExtension("es6");
    }

    require("dist/browser-polyfill");
    require("dist/main")();
});
