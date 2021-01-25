import Vue from 'vue'
import PageDesktop from '../vue/PageDesktop'
import BootstrapVue from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = true
Vue.use(BootstrapVue)

new Vue({
    el: '#pageDesktop',
    components: {
        PageDesktop
    },
    template: '<PageDesktop/>'
})