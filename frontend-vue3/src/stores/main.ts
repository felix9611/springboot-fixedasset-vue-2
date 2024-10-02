import { defineStore } from "pinia";
import { ref } from 'vue'

export const mainStore = defineStore('main', () => {
    const activeToken = ref('')
    const menuList: any = ref([])
    const permList: any = ref([])
    const hasRoutes = ref(false)
    const routers: any = ref([])
    const userProfile: any = ref({})

    const state = ref({
        token: '',
        menuList: [],
        permList: [],
        hasRoutes: false,
        routers: [],
        userProfile: {}
    })

    function SET_TOKEN(state: any, token: any) {
        state.token = token
        localStorage.setItem('token', token)
    }

    function resetState(state: any) {
        state.token = ''
        localStorage.removeItem('token')
    }

    function setMenuList(state: any, menus: any) {
        state.menuList = menus
    }

    function setPermList(state: any, perms: any) {
        state.permList = perms
    }

    function changeRouteStatus(state: any, hasRoutes: any) {
        state.hasRoutes = hasRoutes
        localStorage.setItem('hasRouters', hasRoutes)
    }
    function setRouters(state: any, routers: any) {
        state.routers = routers
        localStorage.setItem('routers', routers)
    }

    function resetHasRoutes(state: any) {
        state.hasRoutes = false
    }
    function setUserProfile(state: any, userProfile: any) {
        state.userProfile = userProfile
    }

    function resetUserProfile(state: any) {
        state.userProfile = {}
        localStorage.removeItem('userProfile')
    }


    return {
        state,
        SET_TOKEN,
        resetState,
        setMenuList,
        setPermList,
        changeRouteStatus,
        setRouters,
        resetHasRoutes,
        setUserProfile,
        resetUserProfile
    }
})