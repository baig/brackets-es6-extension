/*global module,require*/

var fs = require("fs");

module.exports = function (grunt) {
    require("load-grunt-tasks")(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        watch: {
            files: ["Gruntfile.js", "src/**/*.{jsx,es6}", "test/spec/**/*.{jsx,es6}"],
            tasks: ["build"]
        },
        jshint: {
            files: ["Gruntfile.js", "src/**/*.{js,jsx,es6}", "test/spec/**/*.{js,jsx,es6}"],
            options: {
                jshintrc: true,
                ignores: ["src/thirdparty/**/*.{js,jsx,es6}"]
            }
        },
        wrap: {
            browserpolyfill: {
                src: "node_modules/6to5/browser-polyfill.js",
                dest: "dist/browser-polyfill.js",
                options: {
                    wrapper: ["(function () { if (window.regeneratorRuntime) { return; }", "}());\n"]
                }
            },
            co: {
                src: "node_modules/co/index.js",
                dest: "src/thirdparty/co.es6",
                options: {
                    wrapper: ["// https://www.npmjs.com/package/co", "export default module.exports;\n"]
                }
            }
        },
        "6to5": {
            options: {
                sourceMap: true,
                modules: "amd"
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
        },
        zip: {
            main: {
                dest: "<%= pkg.name %>.zip",
                src: [
                    "dist/**",
                    "LICENSE",
                    "*.js",
                    "*.json",
                    "*.md"
                ]
            }
        }
    });

    grunt.registerTask("test", ["jshint"]);
    grunt.registerTask("prebuild", ["wrap"]);
    grunt.registerTask("build", ["6to5", "string-replace"]);
    grunt.registerTask("package", ["test", "prebuild", "build", "zip"]);
    grunt.registerTask("default", ["prebuild", "build", "watch"]);

};
