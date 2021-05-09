###第一节：歌单详情头部
#####第一步：在ScrollView组件中取消滚动条
~~~~
mounted() {
     this.iscroll = new IScroll(this.$refs.wrapper, {
        /*scrollbars: true,*/
        scrollbars: false,   //不需要显示滚动条
    });
}
~~~~
#####第二步：创建SubHeader.vue组件中设置头部样式（直接复制Header组件）
~~~~
#只需要在css样式更换左右两边的图片
<template>
    <div class="header" @click="changeTheme">
        <!--需要在css样式更换左右两边的图片-->
        <div class="header-left"></div>
        <!--标题由外界传递【下面定义props】-->
        <p class="header-title">{{title}}</p>   
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
            @include bg_img("../assets/images/back")
        }
        .header-right{
            @include bg_img("../assets/images/more")
        }
    }
</style>
~~~~
#####第三步：在Detail.vue组件当中使用SubHeader.vue组件
~~~~
import SubHeader from "../components/SubHeader";

<SubHeader></SubHeader>
~~~~
#####第四步：在SubHeader.vue组件中设置数据(主要是用来设置标题)
~~~~
#重点是添加下面的内容
props: { #在子组件使用父组件当中的数据
    title: {
        type: String,
        default: '',
        required: true
    }
}

#在Detail.vue当中设置数据可以供给子组件传递
<SubHeader :title="playlist.name"></SubHeader>
~~~~
#####第五步：在api/index.js当中发送新的网络请求（需要传递参数）
~~~~
export const getPlayList = (data) => Network.get('playlist/detail', data);
~~~~
#####第六步：在Detail.vue组件当中使用请求获取数据
~~~~
import {getPlayList} from '../api/index'

export default {
    name: "Detail",
    components: {
        SubHeader
    },
    created() {
        getPlayList({id: this.$route.params.id}).then((data) => {
            console.log(data);
            this.playlist = data.playlist;
        }).catch((err) => {
            console.log(err);
        });
    },
    data: function () {
        return{
            /*第三步：保存获取的数据*/
            playlist: []
        }
    },
}

<SubHeader :title="playlist.name"></SubHeader>
~~~~
#####第七步：修改SubHeader组件中样式（不换行）
~~~~
.header-title{
    @include no-wrap();
}
~~~~
#####第八步：监听SubHeader组件中左边图标点击返回
~~~~
<!--需要阻止事件冒泡-->
<div class="header-left" @click.stop="back"></div>   

back(){
    window.history.back();
}
~~~~


###第二节：歌单详情中部
#####第一步：创建新组件DetailTop.vue（用来显示中间图片）
~~~~
#也是在父组件使用子组件时定义数据（子组件通过props获取再使用）
<template>
    <div class="detail-top">
        <div class="img-container">
            <img :src="path" alt="">
        </div>
    </div>
</template>

<script>
    export default {
        name: "DetailTop",
        props: {
            path: {
                type: String,
                default: '',
                required: true
            }
        }
    }
</script>
~~~~
#####第二步：在Detail组件当中使用DetailTop.vue
~~~~
import DetailTop from "../components/DetailTop";

<DetailTop :path="playlist.coverImgUrl"></DetailTop>
~~~~
#####第三步：在DetailTop.vue组件当中设置图片样式
~~~~
<style scoped lang="scss">
    .detail-top{
        width: 100%;
        height: 500px;
        overflow: hidden;
        img{
            width: 100%;
        }
    }
</style>
~~~~


###第三节：歌单详情底部
#####第一步：创建新组件DetailBottom.vue（用来显示歌曲列表）
~~~~
<template>
    <ul class="detail-bottom">
        <!--第一个li主要用来设置播放按钮和图片-->
        <li class="bottom-top">
            <div class="bottom-icon"></div>
            <div class="bottom-title">播放全部</div>
        </li>
    </ul>
</template>

<style scoped lang="scss">
    @import "src/assets/css/mixin";
    @import "src/assets/css/variable";

    .detail-bottom{
        width: 100%;
        //所有的li设置统一的样式
        li{
            width: 100%;
            height: 100px;
            padding: 20px;
            box-sizing: border-box;
            //设置背景的次要颜色
            @include bg_sub_color();
        }
        .bottom-top{
            display: flex;
            align-items: center;
            //设置第一个li的左右圆角
            border-top-left-radius: 50px;
            border-top-right-radius: 50px;
            .bottom-icon{
                width: 60px;
                height: 60px;
                //设置换肤背景图片
                @include bg_img('../assets/images/small_play');  
                //设置图标和文字之间的间隔
                margin-right: 20px;
            }
            .bottom-title{
                @include font_color();
                @include font_size($font_large);
            }
        }
    }
</style>

#在Detail.vue父组件当中设置数据
<DetailBottom :playlist="playlist.tracks"></DetailBottom>

#在子组件当中获取父组件当中的数据
<script>
    export default {
        name: "DetailBottom",
        props: {
            playlist: {
                type: Array,
                default: () => [],
                required: true
            }
        }
    }
</script>

<!--统一设置其他的歌单标签内容（通过上面遍历获取的数据一一设置）-->
<li v-for="value in playlist" :key="value.id">
    <h3>{{value.name}}</h3>
    <p>{{value.al.name}}-{{value.ar[0].name}}</p>
</li>
~~~~
#####第二步：在Detail组件当中引入注册并且使用
~~~~
import DetailBottom from "../components/DetailBottom";

<DetailBottom :playlist="playlist.tracks"></DetailBottom>
~~~~
#####第三步：修改DetailBottom.vue组件当中的样式
~~~~
<li class="item"></li><!--给除第一个li的其它内容设置一个类名-->

.item{
    h3{
        @include font_color();
        @include font_size($font_medium);
    }
    p{
        @include font_color();
        @include font_size($font_samll);
        margin-top: 10px;
        opacity: 0.8;
    }
}
~~~~
#####第四步：取消Detail.vue组件当中的背景样式
~~~~
/*background-color: red;*/
~~~~


###第四节：歌单详情动效上（上下拉歌单列表设置图片的变化）
#####第一步：设置列表盖住图片一点内容（Detail.vue组件）
~~~~
#原因是并没有设置底部列表组件的高度
<div class="bottom">
    <DetailBottom :playlist="playlist.tracks"></DetailBottom>
</div>

#设置样式
.bottom{
    position: fixed;
    top: 500px;
    left: 0;
    right: 0;
    bottom: 0;
}
~~~~
#####第二步：设置歌曲列表可以滚动（Detail.vue组件中使用ScrollView.vue）
~~~~
import ScrollView from "../components/ScrollView";

#将需要滚动的内容放在组件当中（使用重点）
<div class="bottom">
    <ScrollView>
        <DetailBottom :playlist="playlist.tracks"></DetailBottom>
    </ScrollView>
</div>
~~~~
#####第三步：设置歌单详情次要背景颜色（Detail.vue组件）
~~~~
@import "src/assets/css/mixin";

@include bg_sub_color();
~~~~
#####第四步：修改ScrollView.vue组件当中内容
~~~~
/*设置滚动监听类型为像素级别*/
probeType: 3,

methods: {
    // 提供一个监听滚动距离的方法给外界使用
    scrolling (fn) { //注册scroll事件
      this.iscroll.on('scroll', function () {
        fn(this.y)   //滚动的偏移位
      })
    }
  }
}
~~~~
#####第五步：修改Detail.vue组件当中内容
~~~~
#设置ref属性：必须在使用子组件的地方添加ref="xxx"内容（主要）
<DetailTop :path="playlist.coverImgUrl" ref="top"></DetailTop>
<div class="bottom">
    <ScrollView ref="scrollview">
        <DetailBottom :playlist="playlist.tracks"></DetailBottom>
    </ScrollView>
</div>
#就可以通过$refs获取定义ref组件当中的属性或者方法



mounted () {
    /*通过$el获取组件元素的高度*/
    let defaultHeight = this.$refs.top.$el.offsetHeight;
    console.log(defaultHeight);  //828
    this.$refs.scrollview.scrolling((offsetY) => {
        //console.log(offsetY);/*用来查看上下滚动的正负值*/
        if (offsetY < 0) {
            console.log('向上滚动');
            let scale = 20 * Math.abs(offsetY) / defaultHeight;
            console.log(scale);
            this.$refs.top.$el.style.filter = `blur(${scale}px)`
        } else {
            console.log('向下滚动');【通过transform放大图片】
            let scale = 1 + offsetY / defaultHeight;
            console.log(scale);
            this.$refs.top.$el.style.transform = `scale(${scale})`
        }
    })
}
~~~~


###第五节：歌单详情动效下
#####第一步：添加从歌单到详情页的过渡动画(Recommend.vue组件)
~~~~
<!--添加动画-->
<transition>
    <router-view></router-view>
</transition>
~~~~
#####第二步：设置过渡动画的样式
~~~~
<style scoped lang="scss">
    .v-enter{
      transform: translateX(100%);
    }
    .v-enter-to{
      transform: translateX(0%);
    }
    .v-enter-active{
      transition: transform 1s;
    }
    .v-leave{
      transform: translateX(0%);
    }
    .v-leave-to{
      transform: translateX(100%);
    }
    .v-leave-active{
      transition: transform 1s;
    }
</style>
~~~~


###第六节：最新专辑详情页面
#####第一步：修改Recommend.vue组件当中点击事件
~~~~
<Personalized :personalized="albums" :title="'最新专辑'" @select="fatherSelectItem"></Personalized>
~~~~
#####第二步：在api/index.js当中发送请求
~~~~
/*获取专辑内容*/
export const getAlbum = (data) => Network.get('album', data);
~~~~
#####第三步：设置Recommend组件设置请求类型(通过type设置)
~~~~
<Personalized :personalized="personalized" :title="'推荐歌单'" @select="fatherSelectItem" :type="'personalized'"></Personalized>
<Personalized :personalized="albums" :title="'最新专辑'" @select="fatherSelectItem" :type="'albums'"></Personalized>                
~~~~
#####第四步：在Personalized.vue当中接收定义的类型
~~~~
type: {
    type: String,
    default: '',
    required: true
}

#将type类型参数传递给父组件
methods: {
    selectItem(id){
        console.log(id);
        //调用Recomend父组件的方法
        this.$emit('select', id, this.type);
    }
}
~~~~
#####第五步：在Recommend组件获取请求
~~~~
methods: {
    fatherSelectItem(id, type){
        this.$router.push({
            path: `/recommend/detail/${id}/${type}`
        });
    }
}
~~~~
#####第六步：在router/index.js当中设置路由请求路径
~~~~
/*设置二级路由*/
children: [
  {
    path: 'detail/:id/:type',
    component: Detail
  }
]
~~~~
#####第六步：
~~~~
created() {
    if(this.$route.params.type === 'personalized'){
        getPlayList({id: this.$route.params.id}).then((data) => {
            console.log(data);
            this.playlist = data.playlist;
        }).catch((err) => {
            console.log(err);
        });
    }else if (this.$route.params.type === 'album'){
        getAlbum({id: this.$route.params.id}).then((data) => {
            console.log(data);
            this.playlist = {
                name: data.album.name,
                coverImgUrl: data.album.picUrl,
                tracks: data.songs
            }
        }).catch((err) => {
            console.log(err);
        });
    }
},
~~~~


###第七节：真机调式
#####第一步
~~~~

~~~~


###第八节：播放界面头部
#####第一步：创建新的组件Player.vue
~~~~
<template>
    <div class="player">
        
    </div>
</template>

<script>
    export default {
        name: "Player"
    }
</script>

<style scoped lang="css">
    .player{
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: pink;
    }
</style>
~~~~
#####第二步：在App.vue当中进行使用
~~~~
import Player from "./views/Player";

<template>
  <div id="app">
    <Player></Player>
  </div>
</template>
~~~~
#####第三步：将components文件夹当中的所有组件进行分包
~~~~
Recommend: Banner.vue  Personalized.vue  SongList.vue
Detail: SubHeader.vue  DetailTop.vue  DetailBottom.vue
~~~~
#####第四步：修改SubHeader组件当中的加载图片地址
~~~~
.header-left{
    @include bg_img("../../assets/images/back")
}
.header-right{
    @include bg_img("../../assets/images/more")
}
~~~~
#####第五步：创建Player/PlayerHeader.vue组件（复制Detail.vue当中内容）
~~~~
<template>
    <div class="header">
        <div class="header-left"></div>
        <div class="header-title">
            <h3>演员</h3>
            <p>薛之谦</p>
        </div>
        <div class="header-right"></div>
    </div>
</template>

<script>
    export default {
        name: "PlayerHeader",
    }
</script>

<style scoped lang="scss">
    @import "../../assets/css/mixin";

    .header{
        width: 100%;
        height: 100px;
        display: flex;
        justify-content: space-between;
        .header-left,.header-right{
            width: 84px;
            height: 84px;
            margin-top: 8px;
        }
        .header-title{
            display: flex;
            justify-content: center;
            flex-direction: column;
            align-items: center;
            text-align: center;
            color: #FFFFFF;
            @include font_size($font_medium);
            @include no-wrap();
        }

        .header-left{
            @include bg_img("../../assets/images/down")
        }
        .header-right{

        }
    }
</style>
~~~~
#####第六步：在Player.vue组件当中使用PlayerHeader.vue组件
~~~~
<template>
    <div class="player">
        <PlayerHeader></PlayerHeader>
    </div>
</template>

<script>
    import PlayerHeader from "../components/Player/PlayerHeader";
    export default {
        name: "Player",
        components: {
            PlayerHeader
        }
    }
</script>
~~~~


###第九节：播放界面中部
#####第一步：创建PlayerMiddle.vue组件（需要使用swiper）
~~~~
<script>
    /*第一步：使用swiper局部导入方式*/
    import 'swiper/dist/css/swiper.css'
    import {swiper, swiperSlide} from 'vue-awesome-swiper'
    
    export default {
        name: "PlayerMiddle",
        components: {
            swiper,
            swiperSlide
        },
        data () {
            return {
                /*第四步：添加默认的swiper样式(然后在Recommend组件使用Banner组件)*/
                swiperOption: {
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
    }
</script>


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

        </swiper-slide>
        <!-- Optional controls -->
        <div class="swiper-pagination"  slot="pagination"></div>
    </swiper>
</template>


<style scoped lang="scss">
    @import "src/assets/css/variable";
    @import "src/assets/css/mixin";

    .banner{
        position: fixed;
        top: 150px;
        bottom: 250px;
        left: 0;
        right: 0;
        background-color: #eeffe4;
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

    }
</style>
~~~~
#####第二步：在Player.vue组件当中使用PlayerMiddle.vue组件
~~~~
import PlayerMiddle from "../components/Player/PlayerMiddle";
export default {
    name: "Player",
    components: {
        PlayerHeader,
        PlayerMiddle
    }
}

<PlayerMiddle></PlayerMiddle>
~~~~
#####第三步：设置轮播小圆点的样式
~~~~
#需要自定义分页器类名
pagination: {
    el: '.swiper-pagination',
    // 需要自定义分页器类名
    bulletClass: 'my-bullet',
    bulletActiveClass: 'my-bullet-active'
}


#自定义分页器的样式（PlayerMiddle.vue）
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
~~~~
#####第四步：设置第二个分页当中的内容和样式
~~~~
import ScrollView from "../ScrollView";

<swiper-slide class="lyric">
    <ScrollView>
        <ul>
            <li>我是第1个li</li>
            ...................
            <li>我是第50个li</li>
        </ul>
    </ScrollView>
</swiper-slide>

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
~~~~


###第十节：播放界面底部
#####第一步：创建PlayerBottom.vue组件
~~~~
<template>
    <div class="playerBottom">
        <div class="bottom-progress">
            <span>00:00</span>
            <div class="progress-bar">
                <div class="progress-line">
                    <div class="progress-dot">

                    </div>
                </div>
            </div>
            <span>00:00</span>
        </div>
        <div class="bottom-controll">
            <div class="mode"></div>
            <div class="pre"></div>
            <div class="play"></div>
            <div class="next"></div>
            <div class="favoriite"></div>
        </div>
    </div>
</template>


<style scoped lang="scss">
    @import "src/assets/css/variable";
    @import "src/assets/css/mixin";

    .playerBottom{
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        .bottom-progress{
            width: 80%;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            align-items: center;
            span{
                @include font_size($font_samll);
                @include font_color();
            }
            .progress-bar{
                margin: 0 10px;
                height: 10px;
                background-color: #fff;
                width: 100%;
                position: relative;
                .progress-line{
                    width: 50%;
                    height: 100%;
                    background-color: #cccccc;
                    .progress-dot{
                        width: 20px;
                        height: 20px;
                        border-radius: 50%;
                        background-color: #fff;
                        position: absolute;
                        left: 0;
                        top: 50%;
                        transform: translateY(-50%);
                        left: 50%;
                    }
                }
            }
        }
        .bottom-controll{
            width: 80%;
            margin: 0 auto;
            padding: 50px 100px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            div{
                width: 84px;
                height: 84px;
            }
            .mode{
                @include bg_img("../../assets/images/loop");
            }
            .pre{
                @include bg_img("../../assets/images/prev");
            }
            .play{
                @include bg_img("../../assets/images/pause");
            }
            .next{
                @include bg_img("../../assets/images/next");
            }
            .favoriite{
                @include bg_img("../../assets/images/un_favorite");
            }
        }
    }
</style>
~~~~
#####第二步：在Player当中使用PlayerBottom.vue组件
~~~~
import PlayerBottom from "../components/Player/PlayerBottom";

<PlayerBottom></PlayerBottom>
~~~~