/*global module,require*/

module.exports = function (grunt) {
    require("load-grunt-tasks")(grunt);

    grunt.initConfig({
        watch: {
            js: {
                files: ["src/**/*.{jsx,js}"],
                tasks: ["build"]
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
            dist: {
                files: [{
                    expand: true,
                    cwd   : "src/",
                    dest  : "dist/",
                    src   : [ "**/*.{jsx,js}" ]
                }]
            }
        }
    });

    grunt.registerTask("build", ["copy:browserpolyfill", "6to5"]);
    grunt.registerTask("default", ["build", "watch"]);
};
