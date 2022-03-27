<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>
<script lang="ts">
import axios from './axios'
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class APP extends Vue {}
</script>
<style>
    @import "./assets/css/main.css";
    @import "./assets/css/color-dark.css";     /*深色主题*/
    /*@import "./assets/css/theme-green/color-green.css";   浅绿色主题*/
</style>