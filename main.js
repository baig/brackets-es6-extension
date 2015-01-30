/*global brackets,define*/

define(function (require, exports, module) {
    "use strict";

    var ExtensionUtils  = brackets.getModule("utils/ExtensionUtils"),
        modulePath      = ExtensionUtils.getModulePath(module);

    require([modulePath + "dist/main.js"], function (main) {
        main.initExtension();
    });

});
