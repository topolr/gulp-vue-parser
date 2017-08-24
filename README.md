# gulp-vue-parser

Parse [Vue.js](https://github.com/vuejs/vue) `*.vue` component file to a single cmd/umd javascript file

You can use [Sea.js](https://github.com/seajs/seajs).not use [Webpack](http://webpack.github.io/) and [vue-loader](https://github.com/vuejs/vue-loader).

### Usage

```shell
$ npm install gulp-vue-parser --save-dev
```

`Gulpfile.js` :

```
var gulp      = require('gulp');
var rename    = require('gulp-rename');
var VueParser = require('gulp-vue-parser');

gulp.task('vue', function() {
    return gulp.src('./vue/**/*.vue')
                .pipe(VueParser({
                    defaultStyleLang:"sass"
                }))
                .pipe(rename({extname : ".js"}))
                .pipe(gulp.dest("./dist"));
});

gulp.task('default', ['vue']);
```

### Any legitimate Vue file can be used

```
<style scoped>
    a{
        color:red;
    }
</style>
<template>
    <div>
        <a-header></a-header>
        <a-footer></a-footer>
    </div>
</template>
<script>
    export default {
        data:function(){
            return{
            }
        },
        components:{
            "a-header":require("./header"),
            "a-footer":require("./footer")
        }
    };
</script>
```

Output :

```javascript
define(function (require, exports, module) {
    !function(){var e=document.createElement("style");e.setAttribute("media","screen"),e.setAttribute("type","text/css"),e.appendChild(document.createTextNode("a[data-v-dstqx4om]{color: red;}")),document.getElementsByTagName("head")[0].appendChild(e)}();
    module.exports=(function(modules){
        var excute=function(index){
            var _result = {exports: {}};
            modules[index](require, _result.exports, _result);
            return _result.exports.__esModule?_result.exports.default:_result.exports;
        };
        var result={};
        for(var m=0;m<modules.length;m++){
            var data=excute(m),keys=Object.keys(data);
            for(var i=0;i<keys.length;i++){
              result[keys[i]]=data[keys[i]];
            }
        }
        return result;
    })([function(require, exports, module){"use strict";
        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        exports.default = {
            data: function data() {
                return {};
            },
            components: {
                "a-header": require("./header"),
                "a-footer": require("./footer")
            }
        };
    },
    function(require, exports, module){module.exports={template:"<div><a-header></a-header><a-footer></a-footer></div>"};},
    function(require, exports, module){module.exports={_scopeId:"data-v-dstqx4om"};}]);
});
```

### Options

```
{
    defaultStyleLang:"sass",  // sass,less,css => <style lang='sass'>
    styleParse:null,          // function(styleCode,currentVueFileFolder,currentVueFilePath){return promise},parse csscode by yourself
    styleOutput:null,         // function(styleCode,currentVueFileFolder,currentVueFilePath){return promise},output css by yourself
    styleImageBase64:512000,//when size(byte) parse image(url('')) to base64,false not parse
    codeType:"cmd",           // cmd,umd
    outputStyleFile:false,    // output css file at current vue file folder
    outputScriptFile:true     // output js file at current vue file folder
};
```
