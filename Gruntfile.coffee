# Generated on 2015-03-21 using generator-reveal 0.4.0
module.exports = (grunt) ->

    grunt.loadNpmTasks "grunt-contrib-clean"

    grunt.initConfig
        clean: [
            "dist"
        ]
    	

        inline:
            dist:
                src: '_index.template.html',
                dest: 'index.html'

        watch:

            livereload:
                options:
                    livereload: true
                files: [
                    '_index.template.html'
                    'css/**'
                    'plugin/**'
                    'modules/**'
                    'js/**'
                    'lib/**'
                ]
                tasks: ['buildIndex']

            index:
                files: [
                    '_index.template.html'
                    'css/**'
                    'plugin/**'
                    'modules/**'
                    'js/**'
                    'lib/**'
                    '_index.template.html'
                ]
                tasks: ['buildIndex']

            coffeelint:
                files: ['Gruntfile.coffee']
                tasks: ['coffeelint']

        connect:

            livereload:
                options:
                    port: 9000
                    # Change hostname to '0.0.0.0' to access
                    # the server from outside.
                    hostname: 'localhost'
                    base: '.'
                    open: true
                    livereload: true

        coffeelint:

            options:
                indentation:
                    value: 4
                max_line_length:
                    level: 'ignore'

            all: ['Gruntfile.coffee']




        copy:

            dist:
                files: [{
                    expand: true
                    src: [
                        'css/**'
                        'plugin/**'
                        'modules/*/img/**'
                        'modules/*/js/**'
                        'modules/*/css/**'
                        'js/**'
                        'lib/**'
                    ]
                    dest: 'dist/'
                },{
                    expand: true
                    src: ['index.html']
                    dest: 'dist/'
                    filter: 'isFile'
                }]

        


    # Load all grunt tasks.
    require('load-grunt-tasks')(grunt)

    grunt.loadNpmTasks('grunt-inline')
    

    grunt.registerTask 'buildIndex',
        'Build index.html.',[
            'inline'
        ]

    grunt.registerTask 'test',
        '*Lint* javascript and coffee files.', [
            'coffeelint'
        ]

    grunt.registerTask 'serve',
        'Run presentation locally and start watch process (living document).', [
            'buildIndex'
            'connect:livereload'
            'watch'
        ]

    grunt.registerTask 'dist',
        'Save presentation files to *dist* directory.', [
            'test'
            'buildIndex'
            'copy'
        ]

    

    # Define default task.
    grunt.registerTask 'default', [
        'test'
        'serve'
    ]
