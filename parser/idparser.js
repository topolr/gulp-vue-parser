module.exports = function (id) {
    if(id) {
        return "function(require, exports, module){module.exports={_scopeId:" + JSON.stringify(id) + "};}";
    }else{
        return "function(require, exports, module){module.exports={_scopeId:''};}";
    }
};