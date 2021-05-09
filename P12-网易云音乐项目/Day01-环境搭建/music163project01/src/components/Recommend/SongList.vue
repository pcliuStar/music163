<template>
    <div class="song">
        <div class="song-top">
            <h3>最新音乐</h3>
        </div>
        <ul class="song-list">
           <li v-for="vaule in songs" :key="vaule.id" class="item">
               <!--<img :src="vaule.song.album.picUrl" alt="">-->
               <img v-lazy="vaule.song.album.picUrl" alt="">
               <div>
                   <h3>{{vaule.name}}</h3>
                   <p>{{vaule.song.artists[0].name}}</p>
               </div>
           </li>
        </ul>
    </div>
</template>

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
    @import "../../assets/css/mixin";
    @import "../../assets/css/variable";
    .song{
        width: 100%;
        @include bg_sub_color();
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