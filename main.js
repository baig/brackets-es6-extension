/*global define, window*/

define(function (require) {
    "use strict";

    require("dist/browser-polyfill");
    require("dist/main")();

    if (window.isBracketsTestWindow) {
        var extensionInfo = JSON.parse(require("text!package.json"));
        var testObj = window[extensionInfo.name] = {};
        /*jshint sub:true*/
        //-build:from
        testObj["browser-polyfill"] = require("dist/browser-polyfill");
        testObj["class/Logger"] = require("dist/class/Logger");
        testObj["main"] = require("dist/main");
        testObj["thirdparty/co"] = require("dist/thirdparty/co");
        //-build:to
        /*jshint sub:false*/
    }

});
