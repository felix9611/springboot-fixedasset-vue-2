<template>
    <div class="wrapper">
        <v-head></v-head>
        <v-sidebar></v-sidebar>
        <div class="content-box" :class="{'content-collapse':collapse}">
            <v-tags></v-tags>
            <div class="content">
                <transition name="move" mode="out-in">
                    <keep-alive :include="tagsList">
                        <router-view></router-view>
                    </keep-alive>
                </transition>
                <el-backtop target=".content"></el-backtop>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import vHead from './Header.vue';
import vSidebar from './Sidebar.vue';
import vTags from './Tags.vue';
import bus from './bus'

@Component({
    components: {
        vHead,
        vSidebar,
        vTags
    }
})
export default class Home extends Vue {
    tagsList: any = []
    collapse: any = false


    created() {
        bus.$on('collapse-content', (msg: any) => {
            this.collapse = msg;
        })

        // Only pages in the tab list use keep-alive, that is, they will not be saved to memory after closing the tab.
        bus.$on('tags', (msg: any) => {
            let arr: any = []
            for (let i = 0, len = msg.length; i < len; i++) {
                msg[i].name && arr.push(msg[i].name)
            }
            this.tagsList = arr
        })
    }
}
</script>
