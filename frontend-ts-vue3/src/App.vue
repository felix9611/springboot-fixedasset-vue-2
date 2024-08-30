<template>
    <el-config-provider namespace="ep">
        <div>
            <router-link to="home"></router-link>
            <router-view></router-view>
        </div>
</el-config-provider>
</template>
<script lang="ts">
export default {
    name: 'App'
}
</script>
<style>
    @import "./assets/css/main.css";
    @import "./assets/css/color-dark.css";     /*深色主题*/
    /*@import "./assets/css/theme-green/color-green.css";   浅绿色主题*/
</style>