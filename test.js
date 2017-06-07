var topolr=require("topolr-util");
var content=topolr.file("./test/boot.vue").readSync();

var base=require("./main");
var a=base(content);
a.getCodeStr("G:/spark/vue/modules/tesst/vue/boot.vue").then(function (code) {
    console.log(code)
    console.log("done");
},function (a) {
    console.log(a)
});
