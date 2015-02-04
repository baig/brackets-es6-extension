/*global module,require*/

var fs = require("fs");

module.exports = function (grunt) {
    require("load-grunt-tasks")(grunt);

    grunt.initConfig({
        watch: {
            src: {
                files: ["src/**/*.{jsx,es6}"],
                tasks: ["build:src"]
            },
            testSpec: {
                files: ["test/spec/**/*.{jsx,es6}"],
                tasks: ["build:testSpec"]
            }
        },
        copy: {
            browserpolyfill: {
                files: [
                    {
                        expand: false,
                        flatten: true,
                        src: "node_modules/6to5/browser-polyfill.js",
                        dest: "dist/browser-polyfill.js",
                        filter: "isFile"
                    },
                ],
            },
        },
        "6to5": {
            options: {
                sourceMap: "inline",
                modules: "amd",
                experimental: true
            },
            src: {
                files: [{
                    expand: true,
                    cwd   : "src/",
                    src   : [ "**/*.{jsx,es6}" ],
                    dest  : "dist/",
                    ext   : ".js"
                }]
            },
            testSpec: {
                files: [{
                    expand: true,
                    cwd   : "test/spec/",
                    src   : [ "**/*.{jsx,es6}" ],
                    dest  : "test/dist/",
                    ext   : ".js"
                }]
            }
        },
        "string-replace": {
            unittests: {
                files: {
                    "unittests.js": "unittests.js"
                },
                options: {
                    replacements: [{
                        pattern: /\/\/-build:from[\s\S]*\/\/-build:to/,
                        replacement: function () {
                            var files = fs.readdirSync("test/dist/");

                            // ignore non .js files
                            files = files.filter(function (f) { return f.match(/.js$/); });

                            // construct the require string
                            files = files.map(function (f) {
                                f = f.match(/^([\s\S]*).js$/);
                                return "require(\"test/dist/" + f[1] + "\")";
                            });
                            files = files.join(",\n");

                            // add build marks
                            files = [files];
                            files.unshift("//-build:from");
                            files.push("//-build:to");
                            files = files.join("\n");

                            // fix indentation
                            files = files.split("\n").map(function (l, i) {
                                return i !== 0 ? "            " + l : l;
                            }).join("\n");

                            return files;
                        }
                    }]
                }
            }
        }
    });

    grunt.registerTask("build", ["copy:browserpolyfill", "6to5", "string-replace"]);
    grunt.registerTask("default", ["build", "watch"]);
};
