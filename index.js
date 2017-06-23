var base = require("./main");
var gutil = require('gulp-util');
var through = require("through2");
module.exports = function (option) {
    return through.obj(function (file, encoding, callback) {
        if (file.isNull()) {
            return callback(null, file);
        }
        if (file.isStream()) {
            this.emit('error', new gutil.PluginError(PLUGIN_NAME, 'Cannot use streamed files'));
            return callback();
        }
        if (file.isBuffer()) {
            var content = file.contents.toString("utf8");
            base(content,option).outputFile(file.path).then(function (str) {
                file.contents = new Buffer(str);
                callback(null, file);
            },function (err) {
                console.log(err);
            });
        }else{
            callback(null, file);
        }
    });
};