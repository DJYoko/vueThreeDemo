import Vue from 'vue'
import Main from '../vue/Main'

Vue.config.productionTip = true

new Vue({
    el: '#app',
    components: {
        Main
    },
    template: '<Main/>'
})