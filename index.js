/*
 * index.js
 */

module.exports = {
  modules: {},

  require: function(options) {
    options = options || {};
    options.package = options.package || 'package.json';
    options.global = (options.global !== undefined) ? options.global: true;

    var pkg = require(process.cwd() + '/' + options.package);
    Object.keys(pkg.devDependencies).forEach(function(key) {
      // check
      if (/^gulp\-/.test(key) == false || key == 'gulp-helper') return ;

      // gulp-hoge-foo -> hogeFoo
      var name = key
        .replace("gulp-", '')
        .replace(/\-(\w)/g, function(m, ch) { return ch.toUpperCase(); });

      // required key as name
      var module = require(key);
      this.modules[name] = module;
      if (options.global) {
        global[name] = module;
      }

      // log
      var color = function(str, colorcode) { return colorcode + str + '\u001b[0m'; };
      console.log("[gulp-helper] Required '"+color(key, '\u001b[36m')+"' as '" + color(name, '\u001b[35m') + "'");

    }, this);
    
    return this.modules;
  },
};
