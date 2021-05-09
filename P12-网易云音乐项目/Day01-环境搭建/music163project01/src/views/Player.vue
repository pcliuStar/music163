<template>
    <div class="player">
        <PlayerHeader></PlayerHeader>
        <PlayerMiddle></PlayerMiddle>
        <PlayerBottom></PlayerBottom>
    </div>
</template>

<script>
    import PlayerHeader from "../components/Player/PlayerHeader";
    import PlayerMiddle from "../components/Player/PlayerMiddle";
    import PlayerBottom from "../components/Player/PlayerBottom";

    export default {
        name: "Player",
        components: {
            PlayerHeader,
            PlayerMiddle,
            PlayerBottom
        }
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