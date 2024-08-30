import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default{
    state: {
        menuList: [],
        permList: [],

        hasRoutes: false,
        routers: []
    },
    mutations: {
        setMenuList(state: any, menus: any) {
            state.menuList = menus
        },
        setPermList(state: any, perms: any) {
            state.permList = perms
        },
        changeRouteStatus(state: any, hasRoutes: any) {
            state.hasRoutes = hasRoutes
            localStorage.setItem('hasRouters', hasRoutes)
        },
        setRouters(state: any, routers: any) {
            state.routers = routers
            localStorage.setItem('routers', routers)
        },
        resetHasRoutes(state: any) {
            state.hasRoutes = false
        }


    },
    actions: {
    },
    modules: {
    }
}
