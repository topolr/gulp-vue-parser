var topolr = require("topolr-util");
var parser = require('vue-template-compiler');
var codep = require("./parser/codeparser");
var cssp = require("./parser/cssparser");
var temp = require("./parser/templateparser");
var idp = require("./parser/idparser");
var config = require("./parser/config/config");
var codetemp = topolr.file(require("path").resolve(__dirname, "./template/code")).readSync();

var base = function (content, option) {
    this.option = topolr.extend(true, {}, config, option);
    this._info = parser.parseComponent(content);
};
base.prototype.getCodeStr = function (filepath) {
    var ths = this;
    return cssp.call(this, this._info.styles, filepath).then(function (result) {
        var str = "", r = [];
        r.push(codep.call(ths, ths._info.script, filepath));
        r.push(temp.call(ths, ths._info.template, filepath));
        if (result.id) {
            r.push(idp.call(ths, result.id));
        }
        str += "[" + r.join(",") + "]";
        str = codetemp.replace(/\[\[css\]\]/g, result.content).replace(/\[\[code\]\]/g, str);
        return str;
    });
};
module.exports = function (content,option) {
    return new base(content,option);
};