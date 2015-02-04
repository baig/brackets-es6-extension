/*global brackets, define, describe, beforeEach, afterEach, runs*/

define(function (require, exports, module) {
    "use strict";

    var SpecRunnerUtils = brackets.getModule("spec/SpecRunnerUtils"),
        FileUtils       = brackets.getModule("file/FileUtils");

    var extensionInfo   = JSON.parse(require("text!package.json")),
        // TODO: populate testSuites automatically from test/spec folder
        testSuites = [
            require("test/dist/Base-test"),
            require("test/dist/Logger-test")
        ];

    describe(extensionInfo.title, function () {
        var testFolder = FileUtils.getNativeModuleDirectoryPath(module) + "/test/unittest-files/",
            testWindow;

        beforeEach(function () {

            runs(function () {
                SpecRunnerUtils.createTestWindowAndRun(this, function (w) {
                    testWindow = w;
                });
            });

            runs(function () {
                SpecRunnerUtils.loadProjectInTestWindow(testFolder);
            });

        });

        afterEach(function () {

            testWindow = null;
            SpecRunnerUtils.closeTestWindow();

        });

        function getTestWindow() {
            return testWindow;
        }

        function getModule(moduleName) {
            var path = moduleName.split("/"),
                ret  = testWindow[extensionInfo.name];
            while (path.length > 0) {
                ret = ret[path.shift()];
            }
            return ret;
        }

        testSuites.forEach(function (testSuite) {
            testSuite(getTestWindow, getModule);
        });

    });
});
