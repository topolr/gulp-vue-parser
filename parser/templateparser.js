module.exports=function (info) {
    var content=info.content;
    var minify = require('html-minifier').minify;
    try {
        content=minify(content, {
            removeComments: true,
            collapseWhitespace: true,
            minifyJS: true,
            minifyCSS: true
        });
    } catch (e) {
        console.log(e)
    }
    return "function(require, exports, module){module.exports={template:"+JSON.stringify(content)+"};}";
};