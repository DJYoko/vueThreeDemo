import Vue from 'vue'
import PageMobile from '../vue/PageMobile'
import BootstrapVue from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = true
Vue.use(BootstrapVue)

new Vue({
    el: '#pageMobile',
    components: {
        PageMobile
    },
    template: '<PageMobile/>'
})