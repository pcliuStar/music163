###第一节：安装网易云音乐Node服务器
#####下载网易云音乐API：https://github.com/Binaryify/NeteaseCloudMusicApi
#####将安装包进行解压后打开目录中打开cmd命令行：npm install   node app.js(直接执行此命令会报错)
######只要看到控制台出现server running @ http://localhost:3000代表安装成功
######打开浏览器访问：http://localhost:3000查看是否出现页面


###第二节：初始化配置上
#####创建vue项目：vue create music163project01
#####选择需要的配置：Babel  Router  VueX  CSS预处理器
#####删除不需要的默认文件：assets/logo.png  components/HelloWorld.vue  views/vue
#####删除router/index.js和App.vue和public/index.html文件当中的一些默认代码
#####第一步：初始化index.html当中的代码（将需要的图标文件添加到public文件夹）
 ~~~~
<!--可以让部分国产浏览器默认采用高速模式渲染页面-->
<meta name="renderer" content="webkit">
<!--为了让 IE 浏览器运行最新的渲染模式下-->
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<!--SEO三大标签-->
<title>知渔音乐</title>
<meta name="keywords" content="网易云音乐，音乐，播放器，网易，下载，播放，DJ，免费，明星，精选，歌单，识别音乐，收藏，分享音乐，音乐互动，高音质，320K，音乐社交，官网，移动站，music.163.com">
<meta name="description" content="网易云音乐是一款专注于发现与分享的音乐产品，依托专业音乐人、DJ、好友推荐及社交功能，为用户打造全新的音乐生活。">
<!--apple-touch-icon: 是苹果私有的属性（用来指定将网页保存到主屏幕上的时候的图标）-->
<link rel="apple-touch-icon"  href="./apple-touch-icon.png">
<link rel="apple-touch-icon" sizes="114x114" href="./apple-touch-icon114.png">
<link rel="apple-touch-icon" sizes="152x152" href="./apple-touch-icon152.png">
<link rel="apple-touch-icon" sizes="180x180" href="./apple-touch-icon180.png">
<!--网页快捷图标-->
<link rel="icon" href="./favicon.ico">
~~~~
#####第二步：利用rem+视口释放的方式来适配移动端
~~~~
#在index.html当中引入下面的代码
<script>
  let scale = 1.0 / window.devicePixelRatio;
  let text = `<meta name="viewport" content="width=device-width, initial-scale=${scale}, maximum-scale=${scale}, minimum-scale=${scale}, user-scalable=no">`;
  document.write(text);
  document.documentElement.style.fontSize = window.innerWidth / 7.5 + "px";
  document.documentElement.setAttribute('data-dpr', window.devicePixelRatio + '');
  document.documentElement.setAttribute('data-theme', 'theme');
</script>
控制台执行npm run serve打包命令会直接报错
报错原因：如果在HTML文件中用到了字符串模板并且字符串模板中用到了变量, 那么html-plugin是无法处理的
         第22行使用了模板字符串
解决办法：如果想解决这个问题, 那么我们需要再借助一个loader（html-loader）
~~~~
#####第三步：控制台下载html-loader（npm i -D html-loader@0.5.5）
~~~~
#新建vue.config.js文件（配置html文件信息cli.vuejs.org/zh/config/）
module.exports = {
    configureWebpack: {
        module: {
            rules: [
                {
                    test: /\.(html)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'html-loader',
                        options: {
                            minimize: true
                        }
                    }
                }
            ]
        }
    },
}
#重新执行打包命令：npm run serve（点击打开浏览器）
~~~~
#####第四步：借助postcss-pxtorem实现自动将px转换成rem
~~~~
#先在App.vue当中模拟查看是否自动转为rem单位
<template>
  <div id="app">
    <div class="test"></div>
  </div>
</template>

<style lang="scss">
  .test{
    width: 100px;
    height: 100px;
    background-color: red;
  }
</style>
#浏览器F12发现没有主动转换

#控制台执行下载命令：npm i -D postcss-pxtorem@4.0.1
#项目根目录创建postcss.config.js文件
module.exports = {
  plugins: {
    autoprefixer: {},
    'postcss-pxtorem': {
      rootValue: 100, // 根元素字体大小
      // propList: ['width', 'height']
      propList: ['*']
    }
  }
}
#控制台再次执行服务命令：npm run serve查看是否自动转换rem
~~~~
#####第五步：借助webpack实现CSS3/ES678语法的兼容（已经自动实现）
~~~~
#修改App.vue当中的样式文件
<style lang="scss">
  .test{
    width: 100px;
    height: 100px;
    background-color: red;
    #用来测试webpack实现CSS
    transform: translate(100px, 100px);
  }
</style>

#修改根目录下的.browserslistrc当中的内容（兼容哪些浏览器）
ie >= 8
Firefox >= 3.5
chrome  >= 35
opera >= 11.5

#控制台重新执行运行命令
~~~~


###第三节：初始化配置下
#####第一步：借助fastclick解决移动端100~300ms的点击事件延迟问题
~~~~
#控制台执行下载命令：npm install fastclick@1.0.6

#在main.js文件当中初始化
import fastclick from './fastclick'
fastclick.attach(document.body)
~~~~
#####第二步：初始化默认的全局样式
~~~~
#在src/assets目录下创建css文件夹--->直接引入base.scss  mixin.scss  reset.scss  variable.scss

#在main.js文件中引入创建的css
import './assets/css/base.scss'  
#原因是因为在base.css当中已经引入了其它的css文件
~~~~


###第四节：PX2Rem使用技巧（将单位换成Px就代表不需要转换为rem单位）
#####第一步：修改App.vue当中的样式文件（如果不想转换px为rem单位，可以设置单位为Px）
~~~~
<style lang="scss">
  .test{
    width: 100Px;
    height: 100Px;
    background-color: red;
    transform: translate(100Px, 100Px);
  }
</style>
~~~~
#####第二步：将项目纳入版本控制
~~~~
#顶部菜单VCS--->enable auto controal
#点击右上角顶部的
~~~~


###第五节：颜色换肤
#####第一步：创建Header.vue组件
~~~~
<template>
    <div class="header">
        <div class="header-left"></div>
        <p class="header-title">云音乐</p>
        <div class="header-right"></div>
    </div>
</template>

<style scoped lang="scss">
    .header{
        width: 100%;
        height: 100px;
        background-color: #ff0000;
        display: flex;
        justify-content: space-between;
        .header-left,.header-right{
            width: 84px;  #图片尺寸大小
            height: 84px;
            background-color: salmon;
            margin-top: 8px;
        }
        .header-title{  #设置文字水平垂直居中
            text-align: center;
            line-height: 100px;
        }
    }
</style>
~~~~
#####第二步：在App.vue当中修改并使用Header.vue
~~~~
<template>
  <div id="app">
    <Header></Header>                         #第三步
  </div>
</template>

<script>
  import Header from "./components/Header";   #第一步

  export default {
    name: 'App',
    components: {
      Header                                  #第二步
    }
  }
</script>

#控制台执行npm run serve查看效果
~~~~
#####第三步：在src/assets/css/variable.css定义背景颜色（定义变量）
~~~~
// 背景颜色规范(主要)
$background-color-theme: #d43c33;            //背景主题颜色默认(网易红)
$background-color-theme1: rgba(34,213,156,1);//背景主题颜色1(QQ绿)
$background-color-theme2: #333;              //背景主题颜色2(夜间模式)
~~~~
#####第四步：在App.vue当中定义三个按钮(监听背景颜色的变化情况)
~~~~
<template>
  <div id="app">
    <Header></Header>
    <div class="theme">
      <button @click="myFn('theme')"></button>
      <button @click="myFn('theme1')"></button>
      <button @click="myFn('theme2')"></button>
    </div>
  </div>
</template>

<script>
  import Header from "./components/Header";

  export default {
    name: 'App',
    components: {
      Header
    },
    methods: {
      myFn(data){
        //查看自定义的参数（点击哪个按钮传入哪一个参数theme/theme1/theme2）
        console.log(data);
        //设置自定义属性(可以F12在html标签中查看是否有这个属性[保存在html标签上面])
        document.documentElement.setAttribute("data-theme", data);
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "assets/css/variable";
  .theme {
    position: fixed;
    left: 0;
    bottom: 0;

    button {
      width: 100px;
      height: 100px;
      &:nth-of-type(1){
        background-color: $background-color-theme;
      }
      &:nth-of-type(2){
        background-color: $background-color-theme1;
      }
      &:nth-of-type(3){
        background-color: $background-color-theme2;
      }
    }
  }
</style>
~~~~
#####第五步：在src/assets/css/mixin.scss当中设置背景颜色混合函数
~~~~
// 根据属性选择器来设置背景颜色
@mixin bg_color($color){
  background: $color;
  [data-theme=theme1] & {
    background: $background-color-theme1;
  }
  [data-theme=theme2] & {
    background: $background-color-theme2;
  }
}
~~~~
#####第六步：在Header.vue当中设置背景颜色(调用混合函数设置)
~~~~
<style scoped lang="scss">
    @import "../assets/css/variable";
    @import "../assets/css/mixin";

    .header{
        /*background-color: #ff0000;*/
        @include bg_color($background-color-theme);
    }
</style>
~~~~


###第六步：头部代码优化
#####第一步：在Header.vue当中设置头部背景颜色
~~~~
// 根据属性选择器来设置背景颜色
@mixin bg_color(){
  background: $background-color-theme;
  [data-theme=theme1] & {
    background: $background-color-theme1;
  }
  [data-theme=theme2] & {
    background: $background-color-theme2;
  }
}

<style scoped lang="scss">
    .header{
        /*@include bg_color($background-color-theme);*/
        @include bg_color();
    }
</style>
~~~~
#####第二步：在Header.vue当中设置文字颜色和文字大小
~~~~
.header-title{
    color: #FFFFFF;
    font-weight: bold;
    @include font_size($font_medium)
}
~~~~


###第七节：图片换肤
#####第一步：在assets文件夹当中引入所有的图片文件到images
#####第二步：在mixin.scss文件当中编写背景图片混合函数判断引入哪张图片
~~~~
@mixin bg_img($url){
  [data-theme=theme] & {
    background-image: url($url + '_163.png');
  }
  [data-theme=theme1] & {
    background-image: url($url + '_qq.png');
  }
  [data-theme=theme2] & {
    background-image: url($url + '_it666.png');
  }
  background-size: cover;
  background-repeat: no-repeat;
}
~~~~
#####第三步：在index.html文件当中设置默认的主题
~~~~
document.documentElement.setAttribute('data-theme', 'theme');
~~~~
#####第四步：在Header.vue当中设置左边的Logo
~~~~
.header-left{
    @include bg_img("../assets/images/logo")
}
~~~~
#####第五步：在mixin.scss文件当中判断当前在那种屏幕上显示哪种图片
~~~~
[data-theme=theme][data-dpr='2'] & {
    background-image: url($url + '_163@2x.png');
}
[data-theme=theme][data-dpr='3'] & {
    background-image: url($url + '_163@3x.png');
}
[data-theme=theme1][data-dpr='2'] & {
    background-image: url($url + '_qq@2x.png');
}
[data-theme=theme1][data-dpr='3'] & {
    background-image: url($url + '_qq@3x.png');
}
[data-theme=theme2][data-dpr='2'] & {
    background-image: url($url + '_it666@2x.png');
}
[data-theme=theme2][data-dpr='3'] & {
    background-image: url($url + '_it666@3x.png');
}
~~~~
#####第六步：在Header.vue当中设置右边的Logo
~~~~
.header-right{
    @include bg_img("../assets/images/account")
}
~~~~
#####第七步：在Header.vue当中设置点击事件
~~~~
<div class="header" @click="changeTheme">
    <div class="header-left"></div>
    <p class="header-title">云音乐</p>
    <div class="header-right"></div>
</div>

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
~~~~
#####第八步：在App.vue当中注释之前的按钮和事件
~~~~
<!--<div class="theme">
      <button @click="myFn('theme')"></button>
      <button @click="myFn('theme1')"></button>
      <button @click="myFn('theme2')"></button>
    </div>-->

/*methods: {
      myFn(data){
        console.log(data);
        //设置自定义属性(可以F12在html标签中查看是否有这个属性)
        document.documentElement.setAttribute("data-theme", data);
      }
    }*/
~~~~


###第八节：文字换肤
#####第一步：新建Tabbar组件
~~~~
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

<style scoped lang="scss">
    .tabbar{
        width: 100%;
        height: 84px;
    }
</style>
~~~~
#####第二步：在variable.scss当中设置tabbar的背景颜色
~~~~
// 背景颜色规范(次要)
$background-color-sub-theme: #f5f5f5; //背景主题颜色默认(网易红)
$background-color-sub-theme1: #f5f5f5;//背景主题颜色1(QQ绿)
$background-color-sub-theme2: #444;   //背景主题颜色2(夜间模式)
~~~~
#####第三步：在mixin.scss当中设置文字背景函数
~~~~
@mixin bg_sub_color(){
  background: $background-color-sub-theme;
  [data-theme=theme1] & {
    background: $background-color-sub-theme1;
  }
  [data-theme=theme2] & {
    background: $background-color-sub-theme2;
  }
}
~~~~
#####第四步：在Tabbar组件当中设置样式
~~~~
<style scoped lang="scss">
    @import "../assets/css/mixin";
    @import "../assets/css/variable";

    .tabbar{
        width: 100%;
        height: 84px;
        @include bg_sub_color();
        display: flex;
        justify-content: space-around;
        .item{
            span{
                line-height: 84px;
                @include font_size($font_medium)
            }
        }
    }
</style>
~~~~
#####第五步：在variable.scss当中设置文字背景颜色
~~~~
// 字体颜色规范(默认)
$font-color-theme : #666; //字体主题颜色默认(网易)
$font-color-theme1 : #666;//字体主题颜色1(QQ)
$font-color-theme2 : #ddd;//字体主题颜色2(夜间模式)

// 字体颜色规范(激活)
$font-active-color-theme : #d43c33;            //字体主题颜色默认(网易红)
$font-active-color-theme1 : rgba(34,213,156,1);//字体主题颜色1(QQ绿)
$font-active-color-theme2 : #ffcc33;           //字体主题颜色2(夜间模式)
~~~~
#####第六步：在mixin.scss当中设置文字背景颜色混合函数
~~~~
@mixin font_color(){
  color: $font-color-theme;
  [data-theme=theme1] & {
    color: $font-color-theme1;
  }
  [data-theme=theme2] & {
    color: $font-color-theme2;
  }
}
@mixin font_active_color(){
  color: $font-active-color-theme;
  [data-theme=theme1] & {
    color: $font-active-color-theme1;
  }
  [data-theme=theme2] & {
    color: $font-active-color-theme2;
  }
}
~~~~
#####第七步：在Tabbar组件当中设置文字背景颜色
~~~~
<style scoped lang="scss">
    .tabbar{
        .item{
            span{
                /*设置文字默认状态颜色*/
                @include font_color();
            }
            &.router-link-active{
                /*点击路由激活状态*/
                span{
                    @include font_active_color();
                }
            }
        }
    }
</style>
~~~~
#####第八步：在variable.scss当中设置下拉框背景颜色
~~~~
$border-color-theme : #d43c33;            //边框主题颜色默认(网易)
$border-color-theme1 : rgba(34,213,156,1);//边框主题颜色1(QQ)
$border-color-theme2 : #ffcc33;           //边框主题颜色2(夜间模式)
~~~~
#####第九步：在mixin.scss当中设置下拉框背景颜色混合函数
~~~~
@mixin border_color(){
  border-color: $border-color-theme;
  [data-theme=theme1] & {
    border-color: $border-color-theme1;
  }
  [data-theme=theme2] & {
    border-color: $border-color-theme2;
  }
}
~~~~
#####第十步：在Tabbar组件当中设置下拉框背景颜色
~~~~
/*下拉框背景颜色*/
border-bottom: 5px solid #000;
@include border_color();
~~~~


###第九节：路由切换
#####第一步：在views文件夹当中新建Recomand | Singer | Rank | Search组件
#####第二步：在router/index.js当中设置路由信息
~~~~
import Vue from 'vue'
import VueRouter from 'vue-router'
import Recommend from "../views/Recommend";
import Singer from "../views/Singer";
import Rank from "../views/Rank";
import Search from "../views/Search";

Vue.use(VueRouter);

const routes = [
  {
    /*设置默认路由地址*/
    path: '/',
    redirect: '/recommend'
  },
  {
    path: '/recommend',
    component: Recommend
  },
  {
    path: '/singer',
    component: Singer
  },
  {
    path: '/rank',
    component: Rank
  },
  {
    path: '/search',
    component: Search
  }
];
~~~~
#####第三步：在每一个组件当中设置一点内容
~~~~
<template>
    <div class="search">搜索</div>
</template>

<template>
    <div class="rank">排行榜</div>
</template>

<template>
    <div class="recommend">热门推荐</div>
</template>

<template>
    <div class="singer">歌手</div>
</template>
~~~~
#####第四步：在App.vue当中显示界面
~~~~
<router-view></router-view>
~~~~