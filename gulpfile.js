/*
 *
 */

var gulp = require('gulp');
var ghelper = require('./index.js');
var modules = ghelper.require();

gulp.task('default', function() {
	console.log(concat);
	console.log(concat == modules.concat);
	console.log(concat == ghelper.modules.concat);
	console.log("default");
});
