module.exports = function (id) {
    return "function(require, exports, module){module.exports={_scopeId:" + JSON.stringify(id) + "};}";
};