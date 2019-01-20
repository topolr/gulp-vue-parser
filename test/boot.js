define(function (require, exports, module) {
    !function(){var e=document.createElement("style");e.setAttribute("media","screen"),e.setAttribute("type","text/css"),e.appendChild(document.createTextNode(".a[data-v-2iyzneed]{color:red}.a[data-v-2iyzneed] .b[data-v-2iyzneed],.a[data-v-2iyzneed] .c[data-v-2iyzneed]{color:yellow}.a[data-v-2iyzneed] .b[data-v-2iyzneed]:after,.a[data-v-2iyzneed] .c[data-v-2iyzneed]:after{color:blue}.a[data-v-2iyzneed] .d[data-v-2iyzneed]{background:url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAdCAYAAACwuqxLAAAAAXNSR0IArs4c6QAAAslJREFUSA2tlbFuE0EQhscGR5aCkHFBgSJhSir8AkhGCImSls4SL5AHoKMnTZ4hbZB4AKejoHBQikikCAhkJIhJFCABHfLxf+fbY259lk3ESL93duaff/Z29841W2CpWVeUR8IdoZXTTzS+EV7UzHbz2L8NEu4Lh0K6AHD6S6uL3BGGC0SrmlLTiRvpCf+aCF3NBkLYCpI/hY/C79zXYE3hsrCW+xoyY+vuVW4b3YVjIawukX8gsAXnLh7yxMjBgRviaHSm/dyvggNH+iZ/T6gSDkJhhLMvUBNiAyet6PRAQ5LVUOBXFXLzxqqaftFEYv5QDzQvrTyp1dLTlZV03GxmwCcmngc11IbYMGugAHsfgjEpPavX06/tdvprayudjEYZ8ImRc7X48eI6bM+6I32QX+wlq0RoMh6nsREjFz0JtWiExut1PYa/klyzK2HvzhsNW93ctFq7HULFSIwcHGfUohGsRYObYaaRu15YUq9bo9cr5rFDDk5kJQ2y7yPCf53G7XlDC2tMJpbs7BTz2CEHJ7KSRvwOfNIBfQmHdIFDphaNcMh9GrRcgBfG3+WLXFM0QoPpBVJg2wUP5ftvUnYVl3jRqKE2iG8XW6dgzyUg8B0q3ocoFwT8CJfPi4/1igY4Sm44Ao85FIrzcDkvgg8Hrt+ajZJ43oCzgBgEKHidxzg4/33CJwYfjhcnVry88R8OiYHQzVfAS7MrfM/n8cCbC5c/Hwwufzgn2Uw/pQYE8+7LNFkojt5MgyWbLCWO1lzjSYT4TLhdYO6ezxWsSjw1u3Vq9laC4eBLIzk4VbWLYtdEuC88vm325MjsXdyEGDk4OZeaGYs/doGwJuc6k32zs7tmz8buq4tPjFxeAJeaGbs0E5kGEg1XhVWmWm3y0uzVQ7Mbx2ajB2bPnTiUz8KeQF3JKm+RY/DYrI4xa+ZyP+SrXybOWGl/AF1x1pBHzQQ2AAAAAElFTkSuQmCC\")}")),document.getElementsByTagName("head")[0].appendChild(e)}();
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
    props: {
        txt: {
            default: 'button'
        }
    },
    components: {
        "a-header": require("./header"),
        "a-footer": require("./footer")
    },
    methods: {
        test: function test() {
            return console.info("test");
        }
    },
    render: function render() {
        var h = arguments[0];

        return h(
            "center",
            { "class": "center" },
            [h(
                "button",
                { "class": "button", on: {
                        "click": this.test
                    }
                },
                [this.txt]
            )]
        );
    }
};},function(require, exports, module){module.exports={template:"<div><a-header></a-header><a-footer></a-footer></div>"};},function(require, exports, module){module.exports={_scopeId:"data-v-2iyzneed"};}]);
});