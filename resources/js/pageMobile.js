import Vue from 'vue'
import ThePageMobile from '../vue/page/ThePageMobile'
import BootstrapVue from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = true
Vue.use(BootstrapVue)

new Vue({
    el: '#pageMobile',
    components: {
        ThePageMobile
    },
    template: '<ThePageMobile/>'
})