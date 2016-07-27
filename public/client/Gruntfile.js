module.exports = function(grunt) {

    grunt.initConfig({
        paths: grunt.file.readJSON('paths.json'),
        pkg: grunt.file.readJSON('package.json'),

        ngtemplates: {
            S3A_App: {
                src: '<%= paths.templates %>',
                dest: 'dist/js/templates.js',
                options: {
                    prefix: 'client/',
                    htmlmin: {
                        collapseWhitespace: true
                    }
                }
            }
        },
        ngAnnotate: {
            options: {
                singleQuotes: true
            },
            app: {
                files: {
                    'dist/js/main.safe.js': ['<%= paths.app %>']
                }
            }
        },
        concat: {
            dist: {
                src: ['<%= paths.vendor %>', 'dist/js/main.safe.js', 'dist/js/templates.js'],
                dest: 'dist/js/main.js'
            }
        },

        uglify: {
            dist: {
                files: {
                    'dist/js/main.min.js': ['<%= concat.dist.dest %>']
                }
            }
        },

        jshint: {
            files: [
                'dist/js/main.safe.js'
            ]
        },

        sass: {
            dev: {
                files: {
                    'dist/css/main.css': 'src/sass/main.scss'
                }
            },
            dist: {
                options: {
                    style: 'compressed'
                },
                files: {
                    'dist/css/main.min.css': 'dist/css/main.css'
                }
            }
        },

        watch: {
            files: ['<%= paths.app %>', '<%= paths.templates %>', 'src/sass/**/*.scss'],
            tasks: ['ngAnnotate', 'ngtemplates', 'concat', 'uglify', 'jshint', 'sass']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-ng-annotate');
    grunt.loadNpmTasks('grunt-angular-templates');

    grunt.registerTask('default', ['ngAnnotate', 'ngtemplates', 'concat', 'uglify', 'jshint', 'sass', 'watch']);
};
