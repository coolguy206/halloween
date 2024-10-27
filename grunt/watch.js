
module.exports = {

  options: {
    livereload: true
  },

  hp: {
    files: ['less/**/*.less', 'html/**/*.html', 'js/*.js'],
    tasks: ['less', 'babel', 'browserify', 'uglify', 'includes'],
  },

};