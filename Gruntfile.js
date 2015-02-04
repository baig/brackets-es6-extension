/*global module,require*/

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
        }
    });

    grunt.registerTask("build", ["copy:browserpolyfill", "6to5"]);
    grunt.registerTask("default", ["build", "watch"]);
};
