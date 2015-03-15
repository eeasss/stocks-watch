module.exports = function(grunt) {
  grunt.initConfig({
    jshint {
      myFiles ["*.js"]
    }
  });
  grunt.loadNpmTasks('grunt-contrib-jshint');
};