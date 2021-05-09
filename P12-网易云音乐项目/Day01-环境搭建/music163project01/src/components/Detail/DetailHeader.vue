<template>
    <div class="header" @click="changeTheme">
        <div class="header-left" @click.stop="back"></div>   <!--需要阻止事件冒泡-->
        <p class="header-title">{{title}}</p>   <!--标题由外界传递【下面定义props】-->
        <div class="header-right"></div>
    </div>
</template>

<script>
    export default {
        name: "SubHeader",
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
            },
            back(){
                window.history.back();
            }
        },
        props: {
            title: {
                type: String,
                default: '',
                required: true
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../../assets/css/mixin";

    .header{
        width: 100%;
        height: 100px;
        display: flex;
        justify-content: space-between;
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
            @include font_size($font_medium);

            @include no-wrap();
        }

        .header-left{
            @include bg_img("../../assets/images/back")
        }
        .header-right{
            @include bg_img("../../assets/images/more")
        }
    }
</style>