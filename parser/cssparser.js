var less = require("less");
var sass = require('node-sass');
var topolr = require("topolr-util");
var codep = topolr.file(require("path").resolve(__dirname, "./../template/css")).readSync();

var util = {
    getId: function () {
        return "data-v-" + Math.random().toString(36).slice(2, 10);
    },
    parseless: function (content) {
        var ps = topolr.promise();
        less.render(content, function (e, output) {
            if (!e) {
                ps.resolve(output.css);
            } else {
                ps.reject(e);
            }
        });
        return ps;
    },
    parsesass: function (content, path) {
        var ps = topolr.promise();
        sass.render({
            data: content,
            sourceMap: true,
            includePaths: [require("path").resolve(path, "./../")]
        }, function (err, result) {
            if (!err) {
                ps.resolve(result.css.toString());
            } else {
                ps.reject(err);
            }
        });
        return ps;
    },
    editSelector: function (content, id) {
        var _a = content.split(/\{|\}/), r = [];
        for (var i = 0; i < _a.length; i++) {
            var _b = _a[i].trim();
            if ((i + 1) % 2 !== 0) {
                if (_b) {
                    var p = [];
                    _b.split(" ").forEach(function (p1, p2, p3) {
                        var t = [];
                        p1.split(",").forEach(function (p4, p4, p4) {
                            t.push(p4 + "[" + id + "]");
                        });
                        p.push(t.join(","));
                    });
                    r.push(p.join(" "));
                }
            } else {
                _b && r.push("{" + _b + "}");
            }
        }
        return r.join("");
    },
    getResult: function (content, path) {
        if(content) {
            var uglifycss = require("uglifycss");
            content = uglifycss.processString(content, {
                uglyComments: true,
                cuteComments: true
            });
            var a = path.split(".")[0].replace(/\\/g, "/").replace(/\//g, ".");
            a = "\""+a.split(".").reverse().splice(0, 4).reverse().join(".")+"\"";
            return codep.replace(/\[\[code\]\]/g, JSON.stringify(content)).replace(/\[\[path\]\]/g, a);
        }else{
            return "";
        }
    }
};
module.exports = function (info, path) {
    var id = util.getId(), content = "", ps = topolr.promise();
    var queue = topolr.queue(), ths = this;
    for (var i = 0; i < info.length; i++) {
        queue.add(function (a, style) {
            var rt = "";
            if (style.attrs.lang && style.attrs.lang === "css") {
                rt = style.content;
            } else if (style.attrs.lang && style.attrs.lang === "sass") {
                rt = util.parsesass(style.content, path);
            } else if (style.attrs.lang && style.attrs.lang === "less") {
                rt = util.parseless(style.content, path);
            } else {
                if (ths.option.styleParse) {
                    rt = ths.option.styleParse(style.content, require("path").resolve(path, "./../"), path);
                } else {
                    if (ths.option.defaultStyleLang === "sass") {
                        rt = util.parsesass(style.content, path);
                    } else if (ths.option.defaultStyleLang === "less") {
                        rt = util.parseless(style.content, path);
                    } else if (ths.option.defaultStyleLang === "css") {
                        rt = style.content;
                    } else {
                        rt = util.parsesass(style.content, path);
                    }
                }
            }
            if (rt.then) {
                rt.then(function (code) {
                    if (style.scoped) {
                        content += util.editSelector(code, id);
                    } else {
                        id="";
                        content += code;
                    }
                    queue.next();
                }, function (a) {
                    console.log(a)
                    queue.next();
                })
            } else {
                if (style.scoped) {
                    content += util.editSelector(style.content, id);
                } else {
                    id="";
                    content += style.content;
                }
                queue.next();
            }
        }, function (e) {
            console.log(e)
            this.next();
        }, info[i]);
    }
    queue.complete(function () {
        if (ths.option.styleOutput) {
            content = ths.option.styleOutput(content, require("path").resolve(path, "./../"), path)||"";
            ps.resolve({
                content: content,
                id: id
            });
        } else {
            ps.resolve({
                content: util.getResult(content,path),
                id: id
            });
        }
    });
    queue.run();
    return ps;
};