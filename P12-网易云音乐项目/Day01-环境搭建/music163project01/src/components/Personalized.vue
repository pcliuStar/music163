<template>
    <div class="personalized">
        <div class="personalized-top">
            <h3>{{title}}</h3>
        </div>
        <div class="personalized-list">
            <div class="item" v-for="value in personalized" :key="value.id" @click="selectItem(value.id)">
                <!--<img :src="value.picUrl" alt="">-->
                <img v-lazy="value.picUrl" alt="">
                <p>{{value.name}}</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Personalized",
        props: {
            personalized: {
                type: Array,
                default: () => [],
                required: true
            },
            title: {
                type: String,
                default: '',
                required: true
            }
        },
        methods: {
            selectItem(id){
                console.log(id);
                //调用Recomend父组件的方法
                this.$emit('select', id);
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "src/assets/css/mixin";
    @import "src/assets/css/variable";
    .personalized{
        /*设置换肤颜色*/
        @include bg_sub_color();

        .personalized-top{
            width: 100%;
            height: 84px;
            line-height: 84px;
            @include bg_sub_color();
            padding: 0 20px;
            .h3{
                @include font_size($font_large);
                font-weight: bolder;
                @include font_color();
            }
            /*添加文字底部横线*/
            border-bottom: 2px solid #cccccc;
        }
        .personalized-list{
            width: 100%;
            display: flex;
            justify-content: space-around;
            flex-wrap: wrap;
            padding: 20px 0;
            .item{
                width: 200px;
                padding-bottom: 20px;
                img{
                    width: 200px;
                    height: 200px;
                    border-radius: 20px;
                }
                p{
                    @include clamp(2);
                    /*设置文字字体颜色*/
                    @include font_color();
                    /*设置文字字体大小*/
                    @include font_size($font_medium_s);
                    /*设置文字居中*/
                    text-align: center;
                }
            }
        }
    }
</style>