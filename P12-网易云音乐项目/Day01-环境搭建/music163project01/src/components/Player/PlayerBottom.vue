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

<script>
    export default {
        name: "PlayerBottom"
    }
</script>

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