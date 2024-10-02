import Vue from 'vue'
import Router from 'vue-router'

import axios from '../axios'
import store from '../store'
Vue.use(Router)

const routes = [

    {
        path: '/',
        redirect: '/dashboard/new'
    },
    {
        path: '/',
        component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
        meta: { title: 'Index' },
        children: [
            {
                path: '/dashboard',
                component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/Dashboard.vue'),
                meta: { title: 'Index' }
            },
            {
                path: '/404',
                component: () => import(/* webpackChunkName: "404" */ '../components/page/404.vue'),
                meta: { title: '404' }
            },
            {
                path: '/userindex',
                component: () => import(/* webpackChunkName: "dashboard" */ '../views/userindex/index.vue'),
                meta: { title: 'My Account' }
            }
        ]
    },
    {
        path: '/login',
        component: () => import(/* webpackChunkName: "dashboard" */ '../views/Login.vue'),
        meta: { title: 'Login' }
    }
]
const router = new Router({
    mode: 'history',
    base: '/fixedasset-vue/',
    routes
})

router.beforeEach((to, from, next) => {

    // let hasRoute = localStorage.getItem("hasRouters") === undefined ? false : localStorage.getItem("hasRouters")

    let hasRoute = store.state.hasRoutes
    let token = localStorage.getItem("token")

    if (to.path == '/login') {
        next()

    } else if (!token) {
        next({path: '/login'})
    } else if(token && !hasRoute) {
        axios.get("/sys/menu/nav", {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        }).then((res: { data: { data: { nav: any[]; authoritys: any; } } }) => {


            console.log(res.data.data)
            // Get menuList
            store.commit("setMenuList", res.data.data.nav)

            // Get user permission
            store.commit("setPermList", res.data.data.authoritys)

            // Dynamic binding route
            let newRoutes = router.options.routes

            console.log(res.data.data.nav)
            res.data.data.nav.forEach((menu: any) => {
                if (menu.children.length > 0) {
                    menu.children.forEach((e: any) => {
                        if(e.children.length == 0) {
                            delete e.children
                        }
                        // To route
                        let route = menuToRoute(e)

                        // Add routes to route management
                        if (route) {
                            routes[1].children?.push(route)
                        }

                    })
                } else {

                    // To route
                    let route = menuToRoute(menu)

                    // Add the route to route management
                    if (route) {
                        routes[1].children?.push(route)
                    }
                }
            })
            routes.push({ path: '*', redirect: '/404' })
            router.addRoutes(routes)
            hasRoute = true
            store.commit("changeRouteStatus", hasRoute)
        })
    }

    next()
})


// Navigation into routing
const menuToRoute = (menu: any) => {

    if (!menu.component) {
        return null
    }

    let route: any = {
        path: menu.path,
        meta: {
            title: menu.title
        }

    }
    route.component = loadView(menu.component)
    // route.component = () => import(`@/views/${menu.component}.vue`)

    return route
}
export const loadView = (view: any) => { // Lazy loading of routes
                           
    return (resolve: (...modules: any[]) => void) => require([`@/views/${view}`], resolve)
}

export default router

