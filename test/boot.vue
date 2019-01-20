<style scoped>
    .a{
        color:red;
        .b,.c{
            color:yellow;
        }
        .b:after,.c:after{
            color:blue;
        }
        .d{
            background:url("images/a.png");
        }
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
        }
        ,props: {
            txt: {
                default: 'button'
            }
        }
        ,components:{
            "a-header":require("./header"),
            "a-footer":require("./footer")
        }
        ,methods: {
            test(){
                return console.info(`test`)
            }
        }
        ,render(){
            return <center class='center'>
                <button class='button' onClick={this.test}>{this.txt}</button>
            </center>
        }
    };
</script>