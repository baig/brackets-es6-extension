/*global define*/

define(function (require) {
    "use strict";
    // TODO: make sure latest browser-polyfill is copied on build
    require("browser-polyfill");
    require("dist/main")();
});
