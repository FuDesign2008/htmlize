/*jshint node: true*/

module.exports = function(grunt) {

    var buildConfig = {
        compressJS: true
    };

    grunt.initConfig({
        clean: {
            dist: ['dist/'],
            htmlizeEnd: ['dist/htmlize']
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js']
        },
        combo: {
            htmlize: {
                options: {
                    exportsAsLib: {
                        initModule: 'htmlize/htmlize',
                        exportsName: 'htmlize'
                    }
                },
                expand: true,
                cwd: 'src/',
                src: 'htmlize/htmlize.js',
                dest: './dist/',
                ext: '.combo.js'
            }
        },
        concat: {
            htmlizeFakeUglify: {
                files: {
                    'dist/htmlize.js': [
                        'dist/htmlize/htmlize.combo.js'
                    ]
                }
            }
        },
        uglify: {
            htmlize: {
                files: {
                    'dist/htmlize.js': [
                        'dist/htmlize/htmlize.combo.js'
                    ]
                }
            },

        }
    });


    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-cmd-combo2');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('hint', ['jshint']);

    grunt.registerTask('default', [
            'hint',
            'clean:dist',
            'combo:htmlize',
            buildConfig.compressJS ?
                'uglify:htmlize' : 'concat:htmlizeFakeUglify',
            'clean:htmlizeEnd'
        ]);

};
