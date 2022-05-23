import Vue from "vue";
import Router from "vue-router"

// import MyDashboard from "@/views/MyDashboard";
import CostsForm from "@/components/CostsForm";
import DashboardView from "@/views/DashboardView";

Vue.use(Router)

const routes = [
    {
        path: "/",
        // name: "Home",
        name: "DashboardView",
        // component: MyDashboard
        component: DashboardView
    },
    {
        path: "/dashboard/:page",
        name: "Dashboard",
        component: () => import(/*webpackChunkName: "PageDashboard" */ "@/views/MyDashboard")
    },
    {
        path: "/settings*",
        name: "MySettings",
        component: () => import(/*webpackChunkName: "MySettings" */ "@/views/MySettings")
    },
    {
        path: "/notfound",
        name: "NotFound",
        component: () => import(/*webpackChunkName: "NotFound" */ "@/views/NotFound")
    },
    {
        path: "/add/:section/:category",
        name: "AddPaymentForm",
        component: CostsForm
    },
    {
        path: "*",
        redirect: {name: "NotFound"}
    }
]

const router = new Router({
    mode: "history",
    routes
})


const isAuth = true

router.beforeEach((to, from, next) => {
    if(to.name !== "NotFound" && !isAuth) {
        next({name: "NotFound"})
    } else {
        next()
    }
})

router.beforeResolve((to, from, next) => {
    console.log(`Route from ${from.name} to ${to.name}`)
    next()
})

const getTitleByRouteName = (routeName) => {
    return {
        'Dashboard' : 'DASHBOARD PAGE',
        'MySettings' : 'SETTINGS PAGE',
        'NotFound' : '404 PAGE'
    }[routeName]
}

router.afterEach((to) => {
    // document.title = to.name
    document.title = getTitleByRouteName(to.name)
})

export default router