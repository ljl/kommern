import Vue from 'vue'
import App from './components/App.vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import store from './store'
//import Geolocation from 'browser-geolocation'

Vue.use(Vuex)

let swReg = null

document.addEventListener('DOMContentLoaded', () => {
  /*var geo = new Geolocation()
  console.log(geo.isAvailable())
  console.log(geo.start())*/

  navigator.serviceWorker.register('../worker.js', {scope: './'}).then((serviceWorkerRegistration) => {
    console.log('service worker registered', navigator.serviceWorker)
    swReg = serviceWorkerRegistration
    //serviceWorkerRegistration.showNotification('title')
    return navigator.serviceWorker.ready;
  }).then(() => {
    console.log('service worker ready')
  })

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
