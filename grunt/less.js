
module.exports = {

    options: {
        // sourceMap: true,
        compress: true,
    },

    default: {
        expand: true,
        cwd: 'less/',
        src: '*.less',
        dest: 'css/',
        ext: '.css',
    },

};