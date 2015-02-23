var browserify = require('browserify');
var grunt = require('grunt');
var _ = require('lodash');

module.exports = function() {
  var config = this.data;
  var done = this.async();
  var bundle = browserify(config.browserifyOptions);

  _.forEach(config.transform, function(transform){
    bundle.transform(require(transform));
  });

  bundle.bundle(function(err, buf) {
    if (err) {
      grunt.log.error(err);
      return done(false);
    }

    var src = buf.toString();

    grunt.file.write(config.dest, src);
    done();
  });
};
