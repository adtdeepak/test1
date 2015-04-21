module.exports = function (grunt) {
	console.log("Inside grunt config");
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
 
        clean: ["dist", '.tmp'],
 
        copy: {
            main: {
                expand: true,
                cwd: '',
                src: ['**', '!js/**', '!lib/**', '!**/*.css'],
                dest: 'dist/'
            },
            shims: {
                expand: true,
                cwd: 'src/main/webapp/js/polyfills/shims',
                src: ['**'],
                dest: 'src/main/webapp/dist/js/polyfills/shims'
            }
        },
 
        rev: {
            files: {
                src: ['dist/**/*.{js,css}', '!dist/js/shims/**']
            }
        },
 
        useminPrepare: {
           foo: {
			src: ['src/main/webapp/login.htm']
		  },
		  options: {
			    flow: {
			      // i'm using this config for all targets, not only 'html'
			      steps: {
			        // Here you define your flow for your custom block - only concat
			    	  asyncjs: ['concat'],
			        // Note that you NEED to redefine flow for default blocks... 
			        // These below is default flow.
			        js: ['concat', 'uglifyjs'],
			        css: ['concat', 'cssmin']
			      },
			      // also you MUST define 'post' field to something not null
			      post: {}
			    }
			  }
        },
 
        usemin: {
            html: ['dist/src/main/webapp/login.htm','dist/src/main/webapp/home.htm','dist/src/main/webapp/change-password.htm','dist/src/main/webapp/settings.htm','dist/src/main/webapp/forgot-password.htm','dist/src/main/webapp/decision-workbench.htm','dist/src/main/webapp/tracking.htm'],
            options: {
                blockReplacements: {
                  asyncjs: function (block) {
                      return '<script async src="' +block.dest+ '"></script>';
                  }
                }
              }
        },
 
        uglify: {
            options: {
                report: 'min',
                mangle: false,
            	compress: {
            		sequences: true,
            		dead_code: true,
            		conditionals: true,
            		booleans: true,
            		unused: true,
            		if_return: true,
            		join_vars: true,
            		drop_console: true
            	}
            }
        }
    });
 
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-rev');
    grunt.loadNpmTasks('grunt-usemin');
	
 
    // Tell Grunt what to do when we type "grunt" into the terminal
    grunt.registerTask('default', [
        'copy', 'useminPrepare', 'concat', 'uglify', 'cssmin', 'rev', 'usemin'
    ]);
};