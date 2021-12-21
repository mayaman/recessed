import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Hello from '../views/Hello.vue'
import Info from '../views/Info.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/info',
        name: 'Info',
        component: Info
    },
    {
        path: '/hello',
        name: 'Hello',
        component: Hello
    },
    {
        path: '/:name/:viewIndex/:windowIndex',
        name: 'world',
        component: () =>
            import ('../views/Popup.vue'),
        props: true
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
});

export default router