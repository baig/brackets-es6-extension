/*global define, describe, it, expect */

define(function (require, exports, module) {
    "use strict";

    var Logger = require("dist/class/Logger");

    module.exports = function (/* testWindow */) {

        describe("Logger", function () {

            it("should have log and error methods", function () {
                expect(Logger.log).toBeDefined();
                expect(Logger.error).toBeDefined();
            });

        });

    };

});
