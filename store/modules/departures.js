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
  getAllDepartures ({ commit }, options) {
    if (!options || !options.stopId) return
    //if (!worker)
    //worker = new Worker('../worker/worker.js')
    navigator.serviceWorker.controller.postMessage({
      action: 'init',
      options: options
    })

    navigator.serviceWorker.addEventListener('message', function(e) {
      commit(types.RECEIVE_DEPARTURES, e.data)
    });
    /*
    worker.addEventListener('message', function(e) {
      commit(types.RECEIVE_DEPARTURES, e.data)
    }, false)*/
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
