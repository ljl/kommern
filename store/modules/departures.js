import * as types from '../mutation-types'

let worker
// initial state
const state = {
  all: []
}

// getters
const getters = {
  allDepartures: state => state.all
}

// actions
const actions = {
  getAllDepartures ({ commit }, stopId) {
    if (!stopId) return
    if (!worker)
    worker = new Worker('../worker/worker.js')

    worker.postMessage({
      action: 'init',
      options: {
        stopId: stopId
      }
    })

    worker.addEventListener('message', function(e) {
      console.log('Worker said: ', e.data)
      commit(types.RECEIVE_DEPARTURES, e.data)
    }, false)
  }
}

// mutations
const mutations = {
  [types.RECEIVE_DEPARTURES] (state, departures) {
    state.all = departures
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
