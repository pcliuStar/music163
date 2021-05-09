<template>
    <!--搭建三层结构-->
    <swiper :options="swiperOption" class="banner">
        <!-- slides: 变量显示所有获取的图片（然后设置图片的样式） -->
        <swiper-slide class="cd">
            <div class="cd-warpper">
                <img src="https://y.gtimg.cn/music/photo_new/T002R300x300M000003y8dsH2wBHlo.jpg" alt="">
            </div>
            <p>刘文明刘文明刘文明刘文明</p>
        </swiper-slide>
        <swiper-slide class="lyric">
            <ScrollView>
                <ul>
                    <li>我是第1个li</li>
                    <li>我是第2个li</li>
                    <li>我是第3个li</li>
                    <li>我是第4个li</li>
                    <li>我是第5个li</li>
                    <li>我是第6个li</li>
                    <li>我是第7个li</li>
                    <li>我是第8个li</li>
                    <li>我是第9个li</li>
                    <li>我是第10个li</li>
                    <li>我是第11个li</li>
                    <li>我是第12个li</li>
                    <li>我是第13个li</li>
                    <li>我是第14个li</li>
                    <li>我是第15个li</li>
                    <li>我是第16个li</li>
                    <li>我是第17个li</li>
                    <li>我是第18个li</li>
                    <li>我是第19个li</li>
                    <li>我是第20个li</li>
                    <li>我是第21个li</li>
                    <li>我是第22个li</li>
                    <li>我是第23个li</li>
                    <li>我是第24个li</li>
                    <li>我是第25个li</li>
                    <li>我是第26个li</li>
                    <li>我是第27个li</li>
                    <li>我是第28个li</li>
                    <li>我是第29个li</li>
                    <li>我是第30个li</li>
                    <li>我是第31个li</li>
                    <li>我是第32个li</li>
                    <li>我是第33个li</li>
                    <li>我是第34个li</li>
                    <li>我是第35个li</li>
                    <li>我是第36个li</li>
                    <li>我是第37个li</li>
                    <li>我是第38个li</li>
                    <li>我是第39个li</li>
                    <li>我是第40个li</li>
                    <li>我是第41个li</li>
                    <li>我是第42个li</li>
                    <li>我是第43个li</li>
                    <li>我是第44个li</li>
                    <li>我是第45个li</li>
                    <li>我是第46个li</li>
                    <li>我是第47个li</li>
                    <li>我是第48个li</li>
                    <li>我是第49个li</li>
                    <li>我是第50个li</li>
                </ul>
            </ScrollView>
        </swiper-slide>
        <!-- Optional controls -->
        <div class="swiper-pagination"  slot="pagination"></div>
    </swiper>
</template>

<script>
    /*第一步：使用swiper局部导入方式*/
    import 'swiper/dist/css/swiper.css'
    import {swiper, swiperSlide} from 'vue-awesome-swiper'
    import ScrollView from "../ScrollView";
    
    export default {
        name: "PlayerMiddle",
        components: {
            swiper,
            swiperSlide,
            ScrollView
        },
        data () {
            return {
                /*第四步：添加默认的swiper样式(然后在Recommend组件使用Banner组件)*/
                swiperOption: {
                    // 如果需要分页器
                    pagination: {
                        el: '.swiper-pagination',
                        // 需要自定义分页器类名
                        bulletClass: 'my-bullet',
                        bulletActiveClass: 'my-bullet-active'
                    },
                    observer: true,
                    observeParents: true,
                    observeSlideChildren: true,

                }
            }
        },
    }
</script>

<style scoped lang="scss">
    @import "src/assets/css/variable";
    @import "src/assets/css/mixin";

    .banner{
        position: fixed;
        top: 150px;
        bottom: 250px;
        left: 0;
        right: 0;
        background-color: #f2e5ff;
        /*第一个页面当中的样式*/
        .cd{
            .cd-warpper{
                width: 500px;
                height: 500px;
                border-radius: 50%;
                border: 30px solid #ffffff;
                //居中显示
                margin: 0 auto;
                img{
                    width: 100%;
                    height: 100%;
                }
                overflow: hidden;
            }
            p{
                text-align: center;
                @include font_size($font_medium);
                @include font_color();
                margin-top: 50px;
            }
        }
        /*第二个页面当中的样式*/
        .lyric{
            li{
                text-align: center;
                @include font_size($font_medium);
                @include font_color();
                margin: 10px 0;
                &:last-of-type{
                    padding-bottom: 100px;
                }
            }
        }
    }
</style>
<style lang="scss">
    @import "src/assets/css/variable";
    @import "src/assets/css/mixin";

    .my-bullet{
        display: inline-block;
        width: 20px;
        height: 15px;
        border-radius: 10px;
        background: #FFFFFF;
        margin: 0 20px;
    }
    .my-bullet-active{
        @include bg_color();
        width: 60px;
    }
</style>