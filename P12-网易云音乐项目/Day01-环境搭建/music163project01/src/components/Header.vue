<template>
    <div class="header" @click="changeTheme">
        <div class="header-left"></div>
        <p class="header-title">云音乐</p>
        <div class="header-right"></div>
    </div>
</template>

<script>
    export default {
        name: "Header",
        data(){
            return{
                themes: ['theme', 'theme1', 'theme2'],
                index: 0
            }
        },
        methods: {
            changeTheme(){
                this.index++;
                if (this.index >= this.themes.length){
                    this.index = 0
                }
                document.documentElement.setAttribute("data-theme", this.themes[this.index]);
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../assets/css/mixin";

    .header{
        width: 100%;
        height: 100px;
        display: flex;
        justify-content: space-between;

        /*position: relative;
        z-index: 999;*/

        /*background-color: #ff0000;*/
        @include bg_color();
        .header-left,.header-right{
            width: 84px;
            height: 84px;
            /*background-color: salmon;*/
            margin-top: 8px;
        }
        .header-title{
            text-align: center;
            line-height: 100px;

            color: #FFFFFF;
            font-weight: bold;
            @include font_size($font_medium)
        }

        .header-left{
            @include bg_img("../assets/images/logo")
        }
        .header-right{
            @include bg_img("../assets/images/account")
        }
    }
</style>