module.exports=function (info) {
    var content=info.content;
    return "function(require, exports, module){module.exports={template:"+JSON.stringify(content)+"};}";
};