var colors = require('tracer/node_modules/colors');

// https://github.com/baryon/tracer
var filters = {
	log: colors.grey,
	trace: colors.magenta,
	debug: colors.green,
	info: colors.cyan,
	warn: colors.yellow,
	error: [colors.red, colors.bold]
};
var format = "{{timestamp}} {{title}}/{{file}}:{{line}} {{message}}";

// var logger = require('tracer').colorConsole({
// 	filters: filters
// });
var logger = require('tracer').colorConsole({
	format: [
		format, //default format
		{
			error: format + "\nCall Stack:\n{{stack}}" // error format
		}
	],
	dateformat: "HH:MM:ss.L",
	preprocess: function(data) {
		data.title = data.title[0].toUpperCase();
	},
	filters: filters
});

module.exports = logger;
