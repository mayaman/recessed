import Vue from 'vue'
import App from './App.vue'
import router from './router'
import draggable from "vuedraggable";
import VueResizable from "vue-resizable";
import VueDraggableResizable from 'vue-draggable-resizable'
import movable from "v-movable";
// optionally import default styles
// import 'vue-draggable-resizable/dist/VueDraggableResizable.css'




Vue.config.productionTip = false
Vue.component('draggable', draggable);
Vue.component('VueResizable', VueResizable);
Vue.component('vue-draggable-resizable', VueDraggableResizable);
Vue.use(movable);




new Vue({
    router,
    render: h => h(App)
}).$mount('#app')