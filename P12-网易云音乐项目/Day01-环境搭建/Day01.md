###第一步：安装网易云音乐Node服务器
#####下载网易云音乐API：https://github.com/Binaryify/NeteaseCloudMusicApi
#####将安装包进行解压后打开目录中打开cmd命令行：npm install   node app.js(直接执行此命令会报错)
######只要看到控制台出现server running @ http://localhost:3000代表安装成功
######打开浏览器访问：http://localhost:3000查看是否出现页面


###第二步：初始化配置上
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
解决办法：如果想解决这个问题, 那么我们需要再借助一个loader（html-loader）
~~~~
#####第三步：控制台下载html-loader（npm i -D html-loader@0.5.5）
~~~~
#新建vue.config.js文件
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
#先在App.vue当中模拟查看是否自动转为ren单位
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
第五步：借助webpack实现CSS3/ES678语法的兼容（已经自动实现）
~~~~
#修改App.vue当中的样式文件
<style lang="scss">
  .test{
    width: 100px;
    height: 100px;
    background-color: red;
    transform: translate(100px, 100px);
  }
</style>

#修改根目录下的.browserslistrc当中的内容
ie >= 8
Firefox >= 3.5
chrome  >= 35
opera >= 11.5

#控制台重新执行运行命令
~~~~


###第三步：初始化配置下
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
~~~~
#####第三步：PX2Rem使用技巧（将单位换成Px就代表不需要转换为rem单位）
~~~~
#修改App.vue当中的样式文件
<style lang="scss">
  .test{
    width: 100Px;
    height: 100Px;
    background-color: red;
    transform: translate(100Px, 100Px);
  }
</style>
~~~~
#####第四步：将项目纳入版本控制
~~~~
#顶部菜单VCS--->enable auto controal
#点击右上角顶部的
~~~~
