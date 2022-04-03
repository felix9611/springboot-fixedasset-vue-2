import Vue from 'vue'
import Vuex from 'vuex'
import menus from './modules/menus'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    menuList: [],
    permList: [],
    hasRoutes: false,
    routers: [],
    userProfile: {}
  },
  mutations: {

    SET_TOKEN: (state: any, token: any) => {
      state.token = token
      localStorage.setItem('token', token)
    },
    resetState: (state: any) => {
      state.token = ''
      localStorage.removeItem('token')
    },
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
    },
    setUserProfile(state: any, userProfile: any) {
      state.userProfile = userProfile
    },
    resetUserProfile(state: any) {
      state.userProfile = {}
      localStorage.removeItem('userProfile')
    },
  },
  actions: {
  },
  modules: {
  }
})
