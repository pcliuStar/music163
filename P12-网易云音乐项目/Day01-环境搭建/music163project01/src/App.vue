<template>
  <div id="app">
    <Header></Header>
    <!--<div class="theme">
      <button @click="myFn('theme')"></button>
      <button @click="myFn('theme1')"></button>
      <button @click="myFn('theme2')"></button>
    </div>-->
    <Tabbar></Tabbar>
    <router-view></router-view>
  </div>
</template>

<script>
  import Header from "./components/Header";
  import Tabbar from './components/Tabbar'

  export default {
    name: 'App',
    components: {
      Header,
      Tabbar
    },
   /*methods: {
      myFn(data){
        console.log(data);
        //设置自定义属性(可以F12在html标签中查看是否有这个属性)
        document.documentElement.setAttribute("data-theme", data);
      }
    }*/
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
