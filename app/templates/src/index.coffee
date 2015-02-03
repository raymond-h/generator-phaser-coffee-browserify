global.PIXI = require 'phaser/dist/pixi'
global.Phaser = require 'phaser/dist/phaser'

window.onload = ->
	game = new Phaser.Game 640, 480, Phaser.AUTO

	# Add states and whatnot...