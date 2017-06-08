var topolr = require("topolr-util");
var parser = require('vue-template-compiler');
var codep = require("./parser/codeparser");
var cssp = require("./parser/cssparser");
var temp = require("./parser/templateparser");
var idp = require("./parser/idparser");
var config = require("./parser/config/config");
var codetemp = topolr.file(require("path").resolve(__dirname, "./template/umd")).readSync();

var base = function (content, option) {
    this._info = parser.parseComponent(content);
    this.option = topolr.extend(true, {}, config, option);
};
base.getPath = function (path, suffix) {
    var _a = path.replace(/\\/g, "/").split("/");
    var _b = _a.pop().split(".");
    _b.pop();
    _a.push(_b.join(".") + "." + suffix);
    return _a.join("/");
};
base.prototype.getParseInfo = function (filepath) {
    var ths = this;
    return cssp.call(this, this._info.styles, filepath).then(function (result) {
        var str = "", r = [];
        r.push(codep.call(ths, ths._info.script, filepath));
        r.push(temp.call(ths, ths._info.template, filepath));
        if (result.id) {
            r.push(idp.call(ths, result.id));
        }
        str += "[" + r.join(",") + "]";
        var codetemp = "";
        if (ths.option.codeType === "cmd") {
            codetemp = topolr.file(require("path").resolve(__dirname, "./template/cmd")).readSync();
        } else {
            codetemp = topolr.file(require("path").resolve(__dirname, "./template/umd")).readSync();
            var name = filepath.replace(/\\/g, "/").split("/").pop().split(".")[0];
            codetemp = codetemp.replace(/\[\[name\]\]/g, name);
        }
        if (ths.option.outputStyleFile) {
            codetemp = codetemp.replace(/\[\[css\]\]/g, "");
        } else {
            codetemp = codetemp.replace(/\[\[css\]\]/g, result.content);
        }
        str = codetemp.replace(/\[\[code\]\]/g, str);
        return {
            script: str,
            style: result.content,
            styleRaw: result.raw,
            styleId: result.id
        };
    });
};
base.prototype.getCodeStr = function (filepath) {
    return this.getParseInfo(filepath).then(function (info) {
        return info.script;
    });
};
base.prototype.outputFile = function (path) {
    var ths = this, info = null;
    return this.getParseInfo(path).then(function (_info) {
        info = _info;
        if (ths.option.outputScriptFile) {
            return topolr.file(base.getPath(path, "js")).write(info.script);
        }
    }).then(function () {
        if (ths.option.outputStyleFile) {
            return topolr.file(base.getPath(path, "css")).write(info.styleRaw);
        }
    }).then(function () {
        return info.script;
    });
};
module.exports = function (content, option) {
    return new base(content, option);
};