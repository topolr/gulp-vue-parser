module.exports={
    defaultStyleLang:"sass",//sass,less,css => <style lang='sass'>
    styleParse:null,//function(styleCode,currentVueFileFolder,currentVueFilePath){return promise},parse csscode by yourself
    styleOutput:null,//function(styleCode,currentVueFileFolder,currentVueFilePath){return promise},output css by yourself
    styleImageBase64:512000,//when size parse image(url('')) to base64,false not parse
    codeType:"cmd",//cmd,umd
    outputStyleFile:false,//output css file at current vue file folder
    outputScriptFile:true//output js file at current vue file folder
};