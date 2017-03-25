import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import departures from './modules/departures'

Vue.use(Vuex)

export default new Vuex.Store({
  actions,
  getters,
  modules: {
    departures
  },
})
