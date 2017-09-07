module.exports=function (info) {
    if(info) {
        var content = info.content;
        if (content) {
            var minify = require('html-minifier').minify;
            try {
                content = minify(content, {
                    removeComments: true,
                    collapseWhitespace: true,
                    minifyJS: true,
                    minifyCSS: true
                });
            } catch (e) {
                console.log(e)
            }
        } else {
            content = "";
        }
        return "function(require, exports, module){module.exports={template:" + (JSON.stringify(content) || '\"\"') + "};}";
    }else{
        return "function(require, exports, module){module.exports={template:''};}";
    }
};