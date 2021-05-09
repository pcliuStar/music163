<template>
    <div class="detail">
        <SubHeader :title="playlist.name"></SubHeader>
        <!--<SubHeader></SubHeader>-->
        <DetailTop :path="playlist.coverImgUrl" ref="top"></DetailTop>
        <div class="bottom">
            <ScrollView ref="scrollview">
                <DetailBottom :playlist="playlist.tracks"></DetailBottom>
            </ScrollView>
        </div>
    </div>
</template>

<script>
    import SubHeader from "../components/Detail/DetailHeader";
    import {getPlayList, getAlbum} from '../api/index'
    import DetailTop from "../components/Detail/DetailTop";
    import DetailBottom from "../components/Detail/DetailBottom";
    import ScrollView from "../components/ScrollView";

    export default {
        name: "Detail",
        components: {
            SubHeader,
            DetailTop,
            DetailBottom,
            ScrollView
        },
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
        data: function () {
            return{
                /*第三步：保存获取的数据*/
                playlist: {}
            }
        },
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
                    //this.$refs.top.changeMask(scale)
                    /*注意点: 高斯模糊效果是非常消耗性能的, 不推荐在移动端中使用(如果非要在移动端中使用那么建议只设置一次)*/
                } else {
                    console.log('向下滚动');
                    let scale = 1 + offsetY / defaultHeight;
                    console.log(scale);
                    this.$refs.top.$el.style.transform = `scale(${scale})`
                }
            })
        }
    }
</script>

<style scoped lang="scss">
    @import "src/assets/css/mixin";
    .detail{
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        /*background-color: red;*/

        @include bg_sub_color();

        .bottom{
            position: fixed;
            top: 500px;
            left: 0;
            right: 0;
            bottom: 0;
        }
    }
</style>