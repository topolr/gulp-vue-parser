var babel = require("babel-core");
var _path = require("path").resolve(process.cwd(), "./node_modules/");
module.exports=function (info) {
    if(info) {
        var content = info.content;
        var code = "";
        if (content) {
            code = babel.transform(content, {
                presets: [_path + "/babel-preset-es2015", _path + "/babel-preset-stage-2"]
            }).code;
        }
        return "function(require, exports, module){" + code + "}";
    }else{
        return "function(require, exports, module){}";
    }
};
