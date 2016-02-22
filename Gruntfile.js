module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        project: {
            app: './app'
        },
        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                eqnull: true
            },
            build: {
                src: ['<%= project.app %>/**/*.js', '!<%= project.app %>/libs/**/*.js']
            }
        }
    });

    require('load-grunt-tasks')(grunt);

    grunt.registerTask('default', 'jshint');
};
