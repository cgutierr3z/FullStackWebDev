module.exports = function (grunt) {
  require('time-grunt')(grunt);
  require('jit-grunt')(grunt,{
    useminPrepare: 'grunt-usemin'
  });

  grunt.initConfig({
    sass: {
      dist: {
        files: [{
          expand: true,
          cwd: 'css',
          src: ['*.scss'],
          dest: 'css',
          ext: '.css'
        }]
      }
    },

    watch: {
      files: ['css/*.scss'],
      tasks: ['css']
    },

    browserSync: {
      dev: {
        bsFiles: {
          src: [
            'css/*.css',
            '*.html',
            'js/*.js'
          ]
        },
        options: {
          watchTask: true,
          server: {
            baseDir: './'
          }
        }
      }
    },

    copy:{
      html:{
        files:[{
          expand: true,
          dot: true,
          cwd: './',
          src: '*.html',
          dest: 'dist'
        }]
      },
      fonts: {
        files: [{
          expand: true,
          dot: true,
          cwd: 'node_modules/open-iconic/font',
          src: ['fonts/*.*'],
          dest: 'dist'
        }]
      }
    },

    clean:{
      build:{
        src: ['dist/']
      }
    },

    cssmin:{
      dist: {}
    },

    uglify: {
      dist: {}
    },

    filerev: {
      options: {
        encoding: 'uft8',
        algorithm: 'md5',
        lenght: 20
      },

      release: {
        files: [{
          src: [
            'dist/js/*.js',
            'dist/css/*.css'
          ]
        }]
      }
    },

    concat: {
      options: {
        separator: ';'
      },
      dist: {}
    },

    useminPrepare: {
      foo: {
        dest: 'dist',
        src: ['index.html','about.html','pricing.html','terms.html','job.html','contact.html']
      },

      options: {
        flow: {
          steps: {
            css: ['cssmin'],
            js: ['uglify']
          },
          post: {
            css: [{
              name: 'cssmin',
              createConfig: function(context, block){
                var generated = context.options.generated;
                generated.options = {
                  keepSpecialComments: 0,
                  rebase: false
                }
              }
            }]
          }
        }
      }
    },

    usemin: {
      html: ['dist/index.html','dist/about.html','dist/pricing.html','dist/terms.html','dist/job.html','dist/contact.html'],
      options: {
        assetsDir: ['dist', 'dist/css','dist/js']
      }
    }


  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.registerTask('css',['sass']);
  grunt.registerTask('default', ['browserSync', 'watch'])

  grunt.registerTask('build',[
    'clean',
    'copy',
    'useminPrepare',
    'concat',
    'cssmin',
    'uglify',
    'filerev',
    'usemin'
  ])
};
