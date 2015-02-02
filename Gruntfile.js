/*global module,require*/

module.exports = function (grunt) {
    require("load-grunt-tasks")(grunt);

    grunt.initConfig({
        watch: {
            js: {
                files: ["src/**/*.{jsx,js}"],
                tasks: ["6to5"]
            }
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

    grunt.registerTask("default", ["6to5", "watch"]);
};
