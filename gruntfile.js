module.exports = function(grunt) {
    grunt.initConfig({
        jshint {
            MyFiles: ["*.js"]
        }
    });
    
    grunt.loadNpmTasks('grunt-contrib-jshint');
};
