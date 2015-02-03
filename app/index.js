'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');


var PhaserCoffeeBrowserifyGenerator = yeoman.generators.Base.extend({
	init: function () {
		this.pkg = require('../package.json');

		this.on('end', function () {
			if (!this.options['skip-install']) {
				this.installDependencies();
			}
		});
	},

	askFor: function () {
		var done = this.async();

		// have Yeoman greet the user
		this.log(this.yeoman);

		// replace it with a short and sweet description of your generator
		this.log(chalk.magenta('Phasing some browserified coffee into existence...'));

		var prompts = [{
			type: 'input',
			name: 'name',
			message: 'What is it called?',
			default: path.basename(process.cwd())
		}];

		this.prompt(prompts, function (props) {
			this.name = props.name;

			done();
		}.bind(this));
	},

	app: function () {
		this.mkdir('src');
		this.mkdir('public/lib');
		this.mkdir('public/res');

		this.template('_package.json', 'package.json');

		this.copy('.gitignore', '.gitignore');
		this.copy('.npmignore', '.npmignore');
		this.copy('Gruntfile.coffee', 'Gruntfile.coffee');
		this.copy('public/index.html', 'public/index.html');
		this.copy('src/index.coffee', 'src/index.coffee');
	}
});

module.exports = PhaserCoffeeBrowserifyGenerator;