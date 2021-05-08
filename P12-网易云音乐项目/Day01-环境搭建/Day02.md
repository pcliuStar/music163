###第一节：组件按需加载
######第一步：在router/index.js文件当中重新导入其它组件
~~~~~
/*原来方式：通过import xxx from 'xxx'的方式加载组件（无论是否使用组件都会被加载）*/
import Recommend from "../views/Recommend";
import Singer from "../views/Singer";
import Rank from "../views/Rank";
import Search from "../views/Search";
#上面的写法可以直接注释


/*按需加载的方式导入组件*/
const Recommend = (resolve) => {
  import("../views/Recommend").then((module) => {
    resolve(module)
  })
};
const Singer = (resolve) => {
  import("../views/Singer").then((module) => {
    resolve(module)
  })
};
const Rank = (resolve) => {
  import("../views/Rank").then((module) => {
    resolve(module)
  })
};
const Search = (resolve) => {
  import("../views/Search").then((module) => {
    resolve(module)
  })
};
#控制台重新打开浏览器查看效果npm run serve
~~~~~


###第二节：封装网络工具类
#####第一步：控制台执行下载命令axios
~~~~
npm install axios@0.19.0
~~~~
#####第二步：在scr目录下新建api/network.js
~~~~
import axios from 'axios'

/*进行全局配置*/
axios.defaults.baseURL = 'http://127.0.0.1:3000/';
axios.defaults.timeout = 5000;
/*封装自己的get/post方法*/
export default {
    get: function (path = '', data = {}) {
        return new Promise((resolve, reject) => {
            axios.get(path, {
                params: data      //传递参数
            }).then(function (response) {
                resolve(response);
            }).catch(function (error) {
                reject(error);
            })
        })
    },
    //传递的参数不同
    post: function (path = '', data = {}) {
        return new Promise((resolve, reject) => {
            axios.post(path, data).then(function (response) 
            {
                resolve(response);
            }).catch(function (error) {
                reject(error);
            })
        })
    }
}
~~~~
#####第三步：在scr目录下新建api/index.js
~~~~
// 这个JS文件就是专门用于管理请求各种接口地址的
import Network from './network'

// 封装各种接口请求（可以在网易云api当中进行查看类型）
export const getBanner = () => Network.get('banner?type=2'); 
~~~~
#####第四步：在Recommend组件当中发送上面的请求
~~~~
<script>
    import {getBanner} from '../api/index'
    export default {
        name: "Recommend",
        created() {
            /*发送Promise请求*/
            getBanner().then(function (data) {
                console.log(data);
            }).catch(function (err) {
                console.log(err);
            })
        }
    }
</script>
~~~~


###第三节：封装Banner图（http://github.com/surmon-china/vue-awesome-swiper）
#####第一步：控制台执行下载命令swiper
~~~~
npm install vue-awesome-swiper@3.1.3 --save
~~~~
#####第二步：在component文件夹创建Banner组件（使用局部导入的方式）
~~~~
<template>
    <!--搭建基本结构-->
    <swiper :options="swiperOption">
        <!-- slides -->
        <swiper-slide>1111111111111111111111</swiper-slide>
        <!-- Optional controls -->
        <div class="swiper-pagination"  slot="pagination"></div>
    </swiper>
</template>

<script>
    import 'swiper/dist/css/swiper.css'
    import {swiper, swiperSlide} from 'vue-awesome-swiper'
    export default {
        name: "Banner",
        components: {
            swiper,
            swiperSlide
        },
        data () {
            return {
                /*以下的内容是直接复制的*/
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
    }
</script>
~~~~
#####第三步：在Recommend组件当中注册并且使用Banner
~~~~
<template>
    <div class="recommend">
        <Banner></Banner>
    </div>
</template>

<script>   /*父组件*/
    import {getBanner} from '../api/index'
    /*第一步：导入Banner组件*/
    import Banner from "../components/Banner";

    export default {
        name: "Recommend",
        created() {
            /*发送Promise请求*/
            getBanner().then(function (data) {
                console.log(data);
            }).catch(function (err) {
                console.log(err);
            })
        },
        components: {
            /*第二步：注册Banner组件*/
            Banner
        },
        data(){
            return{
                /*第三步：保存获取的数据*/
                banners: []
            }
        }
    }
</script>
~~~~
#####第四步：修改网络工具类network.js(为了直接获取Banner数据)
~~~~
axios.get(path, {
    params: data  //传递参数
}).then(function (response) {
    resolve(response.data);
}).catch(function (error) {
    reject(error);
})

axios.post(path, data).then(function (response){
    resolve(response.data);
}).catch(function (error) {
    reject(error);
})
~~~~
#####第五步：在Recommend组件当中父组件使用子组件数据
~~~~
<template>
    <div class="recommend">
        <!--将data中获取的数据传递给子组件（使用props进行传递）-->
        <Banner :banners="banners"></Banner>
    </div>
</template>

<script>
    import {getBanner} from '../api/index'
    /*第一步：导入Banner组件*/
    import Banner from "../components/Banner";

    export default {
        name: "Recommend",
        created() {
            /*发送Promise请求*/
            getBanner().then((data) => {
                console.log(data);
                // 注意点：将网络获取的数据封装到定义的数组当中
                this.banners = data.banners;
            }).catch(function (err) {
                console.log(err);
            })
        },
        components: {
            /*第二步：注册Banner组件*/
            Banner
        },
        data(){
            return{
                /*第三步：保存获取的数据*/
                banners: []
            }
        }
    }
</script>
~~~~
#####第六步：在Banner组件遍历显示所有的轮播图
~~~~
<template>
    <!--注意点：swiper存在的bug是如果数据从网络获取的,那么自动轮播到最后一页之后就不轮播了-->
           <!--只需要在swiper组件上面加上v-if="数据.length > 0"-->
    <!--第三步：搭建基本结构-->
    <swiper :options="swiperOption" class="banner" v-if="banners.length > 0">
        <!-- slides: 变量显示所有获取的图片（然后设置图片的样式） -->
        <swiper-slide v-for="value in banners" :key="value.bannerId" class="item">
            <a :href="value.url">
                <img :src="value.pic" alt="">
            </a>
        </swiper-slide>
    </swiper>
</template>

<script>
    export default {
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
~~~~
#####第七步：设置底部轮播的小圆点样式
~~~~
<!--不可以直接设置在上面的style内部，因为范围为scoped（不是全局的）-->
<style lang="scss">
    @import "src/assets/css/mixin";
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
~~~~


###第四节：推荐歌单
######第一步：在network.js封装各种接口请求
~~~~
export const getPersonalized = () => Network.get('personalized');
~~~~
######第二步：在Recommecnd组件当中发送请求
~~~~
import {getBanner, getPersonalized, getNewAlbum, getNewSong} from '../api/index'

getPersonalized().then((data) => {
    console.log(data);
    // 注意点：将网络获取的数据封装到定义的数组当中
    this.personalized = data.result;//data.result中的result是获取的请求当中的名字
}).catch(function (err) {
    console.log(err);
});

data(){
    return{
        /*第三步：保存获取的数据*/
        banners: [],
        personalized: [],  /*保存推荐歌单数据*/
    }
}
~~~~
######第二步：创建Personalized组件
~~~~
<template>
    <div class="personalized">
        <div class="personalized-top">
            <h3>{{title}}</h3>
        </div>
        <div class="personalized-list">
            <div class="item" v-for="value in personalized" :key="value.id">
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
~~~~


###第五节：最新专辑
#####第一步：调整推荐歌单当中的代码（Personalized.vue）
~~~~
p{
    @include clamp(2);
    /*设置文字字体颜色*/
    @include font_color();
    /*设置文字字体大小*/
    @include font_size($font_medium_s)
}

.personalized{
    /*设置换肤颜色*/
    @include bg_sub_color();
}

/*添加文字底部横线*/
border-bottom: 2px solid #cccccc;
~~~~
######第二步：默认不可以滚动（修改base.css当中的内容）
~~~~
html, body{
  width: 100%;
  //解决页面不可以拖动的问题
  /*height: 100%;
  overflow: hidden;*/
}
~~~~
#####第三步：默认显示内容太多（修改index.js当中内容）
~~~~
/*一次只显示6条数据*/
export const getPersonalized = () => Network.get('personalized?limit=3');
~~~~
#####第四步：获取最新专辑数据（在index.js发送请求）
~~~~
export const getNewAlbum = () => Network.get('album/newest');
~~~~
#####第五步：在Recomend.vue文件当中使用获取的数据
~~~~
import {getBanner, getPersonalized, getNewAlbum} from '../api/index'

/*获取最新专辑数据*/
getNewAlbum().then((data) => {
    console.log("最新专辑" + data);
    console.log("最新专辑" + data.albums.splice(0, 6));
    this.albums = data.albums.splice(0, 6);
}).catch(function (err) {
    console.log(err);
});

data(){
    return{
        /*第三步：保存获取的数据*/
        albums: [], /*保存最新专辑数据*/
    }
}

<Personalized :personalized="albums"></Personalized>
~~~~
#####第六步：修改推荐歌单和最新专辑的名称
~~~~
#这是在Recommend组件当中编写
<Personalized :personalized="personalized" :title="'推荐歌单'"></Personalized>
<Personalized :personalized="albums" :title="'最新专辑'"></Personalized>

#这是在Personalized组件当中编写
props: {
    title: {
        type: String,
        default: '',
        required: true
    }
}

<div class="personalized-top">
    <h3>{{title}}</h3>
</div>
~~~~
#####第七步：设置文字居中
~~~~
/*设置文字居中*/
text-align: center;
~~~~


###第六节：最新音乐
#####第一步：获取最新音乐数据（在index.js发送请求）
~~~~
export const getNewSong = () => Network.get('personalized/newsong');
~~~~
#####第二步：在Recomend.vue文件当中使用获取的数据
~~~~
import {getBanner, getPersonalized, getNewAlbum, getNewSong} from '../api/index'

/*获取最新音乐数据*/
getNewSong().then((data) => {
    console.log(data);
    this.songs = data.result;
}).catch(function (err) {
    console.log(err);
});

data(){
    return{
        /*第三步：保存获取的数据*/
        songs: [], /*保存最新音乐数据*/
    }
}
~~~~
#####第三步：创建最新音乐组件SongList.vue
~~~~
<template>
    <div class="song">
        <div class="song-top">
            <h3>最新音乐</h3>
        </div>
        <ul class="song-list">
           <li v-for="vaule in songs" :key="vaule.id" class="item">
               <img :src="vaule.song.album.picUrl" alt="">
               <div>
                   <h3>{{vaule.name}}</h3>
                   <p>{{vaule.song.artists[0].name}}</p>
               </div>
           </li>
        </ul>
    </div>
</template>

<SongList :songs="songs"></SongList>

<script>
    export default {
        name: "SongList",
        props: {
            songs: {
                type: Array,
                default: () => [],
                required: true
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "src/assets/css/mixin";
    @import "src/assets/css/variable";
    .song{
        width: 100%;
        /*其余内容和之前设置一样*/
        .song-top{
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
        .song-list{
            width: 100%;
            overflow: hidden;
            .item{
                width: 100%;
                height: 200px;
                display: flex;
                align-items: center;
                padding: 0 20px;
                margin-bottom: 20px;
                border-bottom: 1px solid #cccccc;
                img{
                    width: 150px;
                    height: 150px;
                    border-radius: 20px;
                    margin-right: 20px;
                }
                div{
                    h3{
                        @include font_size($font_large);
                        @include font_color();
                    }
                    p{
                        @include font_size($font_samll);
                        margin-top: 20px;
                        @include font_color();
                        opacity: 0.6;
                    }
                }
            }
        }
    }
</style>
~~~~
#####第四步：在Recomend.vue文件当中使用组件
~~~~
import SongList from "../components/SongList";

<SongList :songs="songs"></SongList>
~~~~


###第七节：图片懒加载
#####第一步：默认情况下在发送请求时所有的内容都被加载，即使屏幕下面还没看到的内容
~~~~
#控制台执行安装命令：npm i vue-lazyload@1.3.3 -S
~~~~
#####第二步：在main.js当中导入
~~~~
import VueLazyload from 'vue-lazyload'
/*注册*/
Vue.use(VueLazyload, {
  /*配置*/
  loading: require('./assets/images/loading.png') //设置占位图片
});
~~~~
#####第三步：修改所有组件当中的图片加载模式
~~~~
<!--<img :src="value.picUrl" alt="">-->
<img v-lazy="value.picUrl" alt="">
~~~~


###第八节：滚动组件封装上
#####第一步：下载IScroll插件
~~~~
npm install iscroll@5.2.0
~~~~
#####第二步：修改base.scss的样式
~~~~
//使用IScroll插件
height: 100%;
overflow: hidden;
~~~~
#####第三步：创建ScrollView组件
~~~~
<template>
    <!--搭建三层结构-->
    <div id="wrapper" ref="wrapper">
        <slot></slot><!--内容不确定-->
    </div>
</template>

<script>
    import IScroll from 'iscroll/build/iscroll-probe'  //专业版本
    export default {
        name: "ScrollView",
        mounted() {
            this.iscroll = new IScroll(this.$refs.wrapper, {
                mouseWheel: true,
                scrollbars: true,
            })
        }
    }
</script>
~~~~
#####第四步：在Recommend当中使用ScrllView组件（并修改使用方式）
~~~~
import ScrollView from "../components/ScrollView"

<div class="recommend">
    <ScrollView>
        <div>

            <Banner :banners="banners"></Banner>
            <Personalized :personalized="personalized" :title="'推荐歌单'"></Personalized>
            <Personalized :personalized="albums" :title="'最新专辑'"></Personalized>
            <SongList :songs="songs"></SongList>

        </div>
    </ScrollView>
</div>
~~~~
#####第五步：此时页面无法拖动，修改Recommend组件
~~~~
<style scoped lang="scss">
    .recommend{
        position: fixed;
        top: 184px;
        left: 0;
        right: 0;
        bottom: 0;
    }
</style>
~~~~
#####第六步：修改ScrollView组件
~~~~
<style scoped lang="scss">
    #wrapper{
        width: 100%;
        height: 100%;
    }
</style>

mounted() {
    this.iscroll = new IScroll(this.$refs.wrapper, {
        mouseWheel: true,
        scrollbars: true,
    });
    setTimeout(() => {
        console.log(this.iscroll.maxScrollY);
        this.iscroll.refresh();
        console.log(this.iscroll.maxScrollY);
    }, 2000);
}
~~~~
#####第七步：修改base.css的样式
~~~~
// 解决IScroll拖拽卡顿问题
touch-action: none;
~~~~
#####第八步：修改ScrollView组件
~~~~
 mounted() {
    this.iscroll = new IScroll(this.$refs.wrapper, {
        mouseWheel: true,
        scrollbars: true,
        //解决IScroll拖拽卡顿问题
        scrollX: false,
        scrollY: true,
        disablePointer: true,
        disableTouch: false,
        disableMouse: true
    });
},
~~~~


###第八节：滚动组件封装下
#####第一步：修改ScrollView组件当中的内容
~~~~
/*setTimeout(() => {
        console.log(this.iscroll.maxScrollY);
        this.iscroll.refresh();
        console.log(this.iscroll.maxScrollY);
    }, 2000);*/

    // 1.创建一个观察者对象
    /*MutationObserver构造函数只要监听到了指定内容发生了变化, 就会执行传入的回调函数
      mutationList: 发生变化的数组
      observer: 观察者对象 */
    let observer = new MutationObserver((mutationList, observer) => {
        // console.log(mutationList)
        // console.log(this.iscroll.maxScrollY)
        this.iscroll.refresh()
        // console.log(this.iscroll.maxScrollY)
    });
    // 2.告诉观察者对象我们需要观察什么内容
    let config = {
        childList: true, // 观察目标子节点的变化，添加或者删除
        subtree: true, // 默认为 false，设置为 true 可以观察后代节点
        attributeFilter: ['height', 'offsetHeight'] // 观察特定属性
    };
    // 3.告诉观察者对象, 我们需要观察谁, 需要观察什么内容
    /* 第一个参数: 告诉观察者对象我们需要观察谁
       第二个参数: 告诉观察者对象我们需要观察什么内容*/
    observer.observe(this.$refs.wrapper, config)
},
~~~~


###第九节：跳转到歌单详情页
#####第一步：监听Personalized.vue组件每个歌曲的点击
~~~~
<div class="item" v-for="value in personalized" :key="value.id" @click="selectItem(value.id)">
    <!--<img :src="value.picUrl" alt="">-->
    <img v-lazy="value.picUrl" alt="">
    <p>{{value.name}}</p>
</div>


methods: {
    selectItem(id){
        console.log(id);
    }
}
~~~~
#####第二步：创建views/Detail组件
~~~~
<template>
    <div class="detail">

    </div>
</template>

<script>
    export default {
        name: "Detail"
    }
</script>

<style scoped>

</style>
~~~~
#####第三步：在router/index.js中设置二级路由
~~~~
const Detail = (resolve) => {
  import("../views/Detail").then((module) => {
    resolve(module)
  })
};


{
    path: '/recommend',
    component: Recommend,
    /*设置二级路由*/
    children: [
      {
        path: 'detail/:id',
        component: Detail
      }
    ]
}
~~~~
#####第四步：在Recomend.vue组件使用二级路由
~~~~
<router-view></router-view>

methods: {
    fatherSelectItem(id){
        this.$router.push({
            path: '/recommend/detail/${id}'
        });
    }
}

<Personalized :personalized="personalized" :title="'推荐歌单'" @select="fatherSelectItem"></Personalized>
~~~~
#####第五步：在Personalized.vue组件调用父组件的方法
~~~~
methods: {
    selectItem(id){
        console.log(id);
        //调用Recomend父组件的方法
        this.$emit('select', id);
    }
}
~~~~
#####第六步：在Detail.vue组件设置歌单详情的内容
~~~~
<style scoped lang="scss">
    .detail{
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        background-color: red;
    }
</style>
~~~~