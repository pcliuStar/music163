<template>
    <div class="recommend">
        <ScrollView>
            <div>
                <Banner :banners="banners"></Banner>
                <Personalized :personalized="personalized" :title="'推荐歌单'" @select="fatherSelectItem" :type="'personalized'"></Personalized>
                <Personalized :personalized="albums" :title="'最新专辑'" @select="fatherSelectItem" :type="'album'"></Personalized>
                <SongList :songs="songs"></SongList>
            </div>
        </ScrollView>

        <!--添加动画-->
        <transition>
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    import {getBanner, getPersonalized, getNewAlbum, getNewSong} from '../api/index'
    /*第一步：导入Banner组件*/
    import Banner from "../components/Recommend/Banner";
    import Personalized from "../components/Recommend/Personalized";
    import SongList from "../components/Recommend/SongList";
    import ScrollView from "../components/ScrollView"

    export default {
        name: "Recommend",
        created() {
            /*发送Promise请求*/
            getBanner().then((data) => {
                console.log(data);
                // 注意点：将网络获取的数据封装到定义的数组当中
                this.banners = data.banners;//data.banners中的banners是获取的请求当中的名字
            }).catch(function (err) {
                console.log(err);
            });
            getPersonalized().then((data) => {
                console.log(data);
                // 注意点：将网络获取的数据封装到定义的数组当中
                this.personalized = data.result;//data.result中的result是获取的请求当中的名字
            }).catch(function (err) {
                console.log(err);
            });
            /*获取最新专辑数据*/
            getNewAlbum().then((data) => {
                console.log(data);
                console.log(data.albums.splice(0, 6));
                this.albums = data.albums.splice(0, 6);
            }).catch(function (err) {
                console.log(err);
            });
            /*获取最新音乐数据*/
            getNewSong().then((data) => {
                console.log(data);
                this.songs = data.result;
            }).catch(function (err) {
                console.log(err);
            });
        },
        components: {
            /*第二步：注册Banner组件*/
            Banner,
            Personalized,
            SongList,
            ScrollView
        },
        data(){
            return{
                /*第三步：保存获取的数据*/
                banners: [],
                personalized: [],  /*保存推荐歌单数据*/
                albums: [], /*保存最新专辑数据*/
                songs: [], /*保存最新音乐数据*/
            }
        },
        methods: {
            fatherSelectItem(id, type){
                this.$router.push({
                    path: `/recommend/detail/${id}/${type}`
                });
            }
        }
    }
</script>

<style scoped lang="scss">
    .recommend{
        position: fixed;
        top: 184px;
        left: 0;
        right: 0;
        bottom: 0;

        overflow: hidden;
    }


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