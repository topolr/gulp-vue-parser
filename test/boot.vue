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