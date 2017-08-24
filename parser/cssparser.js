var less = require("less");
var sass = require('node-sass');
var topolr = require("topolr-util");
var codep = topolr.file(require("path").resolve(__dirname, "./../template/css")).readSync();

var util = {
    getId: function () {
        return "data-v-" + Math.random().toString(36).slice(2, 10);
    },
    parseless: function (content, path, isparseimage) {
        var ps = topolr.promise();
        if (content) {
            less.render(content, function (e, output) {
                if (!e) {
                    ps.resolve(util.imageBase64(output.css, path, isparseimage));
                } else {
                    ps.reject(e);
                }
            });
        } else {
            ps.resolve("");
        }
        return ps;
    },
    parsesass: function (content, path, isparseimage) {
        var ps = topolr.promise();
        if (content) {
            sass.render({
                data: content,
                sourceMap: true,
                includePaths: [require("path").resolve(path, "./../")]
            }, function (err, result) {
                if (!err) {
                    ps.resolve(util.imageBase64(result.css.toString(), path, isparseimage));
                } else {
                    ps.reject(err);
                }
            });
        } else {
            ps.resolve("");
        }
        return ps;
    },
    imageBase64: function (content, path, isparseimage) {
        if (isparseimage) {
            return content.replace(/url\(['"]*.*?["']*\)/gi, function (a) {
                var b = a.substring(4, a.length - 1).trim();
                var result = a;
                var aa = false;
                if (b[0] === "'" || b[0] === "\"") {
                    aa = true;
                    b = b.substring(1, b.length - 1);
                }
                var mt = b.split("?");
                b = mt[0], suffix = mt[1];
                if (/^\S+\.[a-zA-Z]+$/.test(b)) {
                    var _path = require("path").resolve(path, "./../", b);
                    var base64 = "";
                    if (topolr.file(_path).isExists() && topolr.file(_path).infoSync().size <= isparseimage) {
                        base64 = 'data:' + require("mime-types").lookup(_path) + ';base64,' + new Buffer(topolr.file(_path).readSync()).toString('base64');
                    }
                    if (base64) {
                        if (aa) {
                            rr = "url(\"" + base64 + "\")";
                        } else {
                            rr = "url(" + c + base64 + ")";
                        }
                        result = rr;
                    }
                }
                return result;
            });
        }
    },
    editSelector: function (content, id) {
        if (content) {
            var _a = content.split(/\{|\}/), r = [];
            for (var i = 0; i < _a.length; i++) {
                var _b = _a[i].trim();
                if ((i + 1) % 2 !== 0) {
                    if (_b) {
                        var p = [];
                        _b.split(" ").forEach(function (p1, p2, p3) {
                            var t = [];
                            p1.split(",").forEach(function (p4) {
                                var tt = [];
                                p4.split(" ").forEach(function (p5) {
                                    if (p5.trim()) {
                                        if (p5.indexOf(":") === -1) {
                                            tt.push(p5 + "[" + id + "]");
                                        } else {
                                            var et = p5.split(":");
                                            tt.push(et.shift() + "[" + id + "]:" + et.join(":"));
                                        }
                                    }
                                });
                                t.push(tt.join(" "));
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
        } else {
            return "";
        }
    },
    minify: function (result) {
        if (result) {
            var uglifycss = require("uglifycss");
            return uglifycss.processString(result, {
                uglyComments: true,
                cuteComments: true
            });
        } else {
            return "";
        }
    },
    getResult: function (content) {
        if (content) {
            return codep.replace(/\[\[code\]\]/g, JSON.stringify(util.minify(content)));
        } else {
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
                rt = util.parsesass(style.content, path, ths.option.styleImageBase64);
            } else if (style.attrs.lang && style.attrs.lang === "less") {
                rt = util.parseless(style.content, path, ths.option.styleImageBase64);
            } else {
                if (ths.option.styleParse) {
                    rt = ths.option.styleParse(style.content, require("path").resolve(path, "./../"), path);
                } else {
                    if (ths.option.defaultStyleLang === "sass") {
                        rt = util.parsesass(style.content, path, ths.option.styleImageBase64);
                    } else if (ths.option.defaultStyleLang === "less") {
                        rt = util.parseless(style.content, path, ths.option.styleImageBase64);
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
                        id = "";
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
                    id = "";
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
            ths.option.styleOutput(content, require("path").resolve(path, "./../"), path).then(function (_content) {
                ps.resolve({
                    content: _content || "",
                    id: id,
                    raw: util.minify(content)
                });
            }, function (e) {
                console.log(e);
                ps.resolve({
                    content: "",
                    id: id,
                    raw: util.minify(content)
                });
            });
        } else {
            ps.resolve({
                content: util.getResult(content),
                id: id,
                raw: util.minify(content)
            });
        }
    });
    queue.run();
    return ps;
};