module.exports = (grunt) ->

	require('load-grunt-tasks')(grunt)

	grunt.initConfig
		pkg: grunt.file.readJSON 'package.json'

		browserify:
			build:
				options:
					transform: ['coffeeify']

					browserifyOptions:
						extensions: ['.coffee', '.js', '.json']
						noParse: [require.resolve 'phaser/dist/phaser']

				files:
					'public/lib/index.js': ['src/index.coffee']

		coffeelint:
			build:
				files: src: ['src/**/*.coffee']
			options:
				no_tabs: level: 'ignore' # this is tab land, boy
				indentation: value: 1 # single tabs

		connect:
			dev:
				options:
					port: 3000
					base: 'public'
					livereload: yes

		watch:
			dev:
				files: ['src/**/*.{js,coffee}']
				tasks: ['lint', 'build']

				options:
					livereload: yes

	grunt.registerTask 'default', ['lint', 'build']

	grunt.registerTask 'build', [
		'browserify:build'
	]

	grunt.registerTask 'lint', [
		'coffeelint:build'
	]

	grunt.registerTask 'dev', [
		'connect:dev'
		'watch:dev'
	]