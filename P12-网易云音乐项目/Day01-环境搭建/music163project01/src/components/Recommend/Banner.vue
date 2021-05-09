<template>
    <!--注意点：swiper存在的bug是如果数据从网络获取的, 那么自动轮播到最后一页之后就不轮播了-->
           <!--只需要在swiper组件上面加上v-if="数据.length > 0"-->
    <!--第三步：搭建基本结构-->
    <swiper :options="swiperOption" class="banner" v-if="banners.length > 0">
        <!-- slides: 变量显示所有获取的图片（然后设置图片的样式） -->
        <swiper-slide v-for="value in banners" :key="value.bannerId" class="item">
            <a :href="value.url">
                <img :src="value.pic" alt="">
            </a>
        </swiper-slide>
        <!-- Optional controls -->
        <div class="swiper-pagination"  slot="pagination"></div>
    </swiper>
</template>

<script>
    /*第一步：使用局部导入方式*/
    import 'swiper/dist/css/swiper.css'
    import {swiper, swiperSlide} from 'vue-awesome-swiper'
    export default {
        name: "Banner",
        /*第二步：注册组件*/
        components: {
            swiper,
            swiperSlide
        },
        data () {
            return {
                /*第四步：添加默认的swiper样式(然后在Recommend组件使用Banner组件)*/
                swiperOption: {
                    loop: true, // 循环模式选项
                    autoplay: {
                        delay: 1000, // 自动切换的时间间隔，单位ms
                        stopOnLastSlide: false, // 当切换到最后一个slide时停止自动切换
                        disableOnInteraction: false // 用户操作swiper之后，是否禁止autoplay。
                    },
                    // 如果需要分页器
                    pagination: {
                        el: '.swiper-pagination'
                    },
                    observer: true,
                    observeParents: true,
                    observeSlideChildren: true
                }
            }
        },
        /*父组件使用子组件数据*/
        props: {
            banners: {
                type: Array,
                default: () => [],
                required: true
            }
        }
    }
</script>

<style scoped lang="scss">
    .banner{
        .item{
            img{
                width: 100%;
                height: 300px;
            }
        }
    }
</style>
<!--不可以直接设置在上面的style内部，因为范围为scoped（不是全局的）-->
<style lang="scss">
    @import "../../assets/css/mixin";
    .banner{
        /*设置底部轮播的小圆点默认样式*/
        .swiper-pagination-bullet{
            width: 16px;
            height: 16px;
            background-color: #fff;
            opacity: 1;
        }
        /*设置底部轮播的小圆点激活样式*/
        .swiper-pagination-bullet-active{
            @include bg_color()
        }
    }
</style>