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
    @import "./assets/css/color-dark.css";     /*Deep Color*/
</style>