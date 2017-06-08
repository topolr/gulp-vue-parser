var topolr=require("topolr-util");
var path=require("path").resolve(__dirname,"./test/boot.vue");
var content=topolr.file(path).readSync();

var base=require("./main");
var a=base(content);
a.outputFile(path).then(function (code) {
    console.log(code)
    console.log("done");
},function (a) {
    console.log(a)
});
