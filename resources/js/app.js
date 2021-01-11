import Vue from 'vue'
import Main from '../vue/Main'
import BootstrapVue from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = true
Vue.use(BootstrapVue)

new Vue({
    el: '#app',
    components: {
        Main
    },
    template: '<Main/>'
})