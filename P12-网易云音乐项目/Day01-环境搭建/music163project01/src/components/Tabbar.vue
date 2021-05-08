<template>
    <div class="tabbar">
        <router-link tag="div" class="item" to="/recommend">
            <span>推荐</span>
        </router-link>
        <router-link tag="div" class="item" to="/singer">
            <span>歌手</span>
        </router-link>
        <router-link tag="div" class="item" to="/rank">
            <span>排行</span>
        </router-link>
        <router-link tag="div" class="item" to="/search">
            <span>搜索</span>
        </router-link>
    </div>
</template>

<script>
    export default {
        name: "Tabbar"
    }
</script>

<style scoped lang="scss">
    @import "../assets/css/mixin";
    @import "../assets/css/variable";
    .tabbar{
        width: 100%;
        height: 84px;
        @include bg_sub_color();
        display: flex;
        justify-content: space-around;
        /*position: relative;
        z-index: 999;*/
        .item{
            span{
                line-height: 84px;
                @include font_size($font_medium);
                /*设置文字默认状态颜色*/
                @include font_color();
            }
            &.router-link-active{
                /*点击路由激活状态*/
                span{
                    @include font_active_color();
                }
                /*下拉框背景颜色*/
                border-bottom: 5px solid #000;
                @include border_color();
            }
        }
    }
</style>