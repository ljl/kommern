<template>
  <div class="app">
    <h1>Når kommer bussen a?!?</h1>
      <select v-model="stopId">
        <option v-for="option in options" :value="option.ID" :selected="option.ID === selectedRoute">
          {{ option.Name }}
        </option>
      </select>
    <departures></departures>
    <!--routes></routes-->
  </div>
</template>

<script>
import Departures from './Departures.vue'
import Routes from './Routes.vue'
import persistence from '../assets/js/persistence'

export default {
  name:'App',
  components: {
    Departures,
    Routes
  },
  data () {
    return {
      stopId: persistence.get('stopId'),
      options: []
    }
  },
  methods: {
    displayRoute({Name, ID }) {
      return `${Name} (${ID})`
    },
    setSelected() {
      persistence.set('stopId', this.stopId)
      this.$router.replace({name: 'App', params: { stopId: this.stopId }})
    }
  },
  watch: {
    'stopId': 'setSelected'
  },
  created () {
    fetch('/api/Place/GetStopsRuter').then((response) => {
      return response.json()
    }).then((json) => {
      var arr = []
      json.forEach((stop) => {
        arr.push(stop.Name)
      })
      this.options = json
      if (persistence.get('stopId')) {
        this.selectedRoute = persistence.get('stopId')
      }
    })
  }
}
</script>

<style lang="scss">
body {
  margin:0;
  padding:0;
  background-color: #EF5350;
  color: white;
  font-family: 'Roboto Slab', serif;
}
.app {
  overflow: hidden;
  max-width: 480px;
  margin: 0 auto;
  padding: 1rem;
  height: 100vh;
}
</style>
