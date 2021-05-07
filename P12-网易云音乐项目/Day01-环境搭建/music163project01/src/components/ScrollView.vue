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
                //解决IScroll拖拽卡顿问题
                scrollX: false,
                scrollY: true,
                disablePointer: true,
                disableTouch: false,
                disableMouse: true
            });
            setTimeout(() => {
                console.log(this.iscroll.maxScrollY);
                this.iscroll.refresh();
                console.log(this.iscroll.maxScrollY);
            }, 2000);
        },
    }
</script>

<style scoped lang="scss">
    #wrapper{
        width: 100%;
        height: 100%;
    }
</style>