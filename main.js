import Vue from 'vue'
import App from './components/App.vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import store from './store'
//import Geolocation from 'browser-geolocation'

Vue.use(Vuex)

document.addEventListener('DOMContentLoaded', () => {
  /*var geo = new Geolocation()
  console.log(geo.isAvailable())
  console.log(geo.start())*/
  Vue.use(VueRouter)

  const router = new VueRouter({
    routes: [
      {
        name: 'App',
        path: '/:stopId',
        component: App
      }
    ]
  })

  new Vue({
    render: h => h(App),
    router,
    store
  }).$mount('#app')
})
