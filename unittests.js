/*global brackets, define, describe, beforeEach, afterEach, runs*/

define(function (require, exports, module) {
    "use strict";

    var SpecRunnerUtils = brackets.getModule("spec/SpecRunnerUtils"),
        FileUtils       = brackets.getModule("file/FileUtils");

    var extensionInfo   = JSON.parse(require("text!package.json")),
        // TODO: populate testSuites automatically from test/spec folder
        testSuites = [
            require("test/spec/Logger-test")
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

        testSuites.forEach(function (testSuite) {

            testSuite(testWindow);

        });

    });
});
