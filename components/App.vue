<template>
  <div class="app">
    <h1>Når kommer bussen a?!?</h1>
      <dropdown
        :options="options"
        @select="setSelected">
      </dropdown>
    <departures></departures>
  </div>
</template>

<script>
import Departures from './Departures.vue'
import Dropdown from './Dropdown.vue'
import persistence from '../assets/js/persistence'

export default {
  name:'App',
  components: {
    Departures,
    Dropdown
  },
  data () {
    return {
      stopId: persistence.get('stopId'),
      options: [],
      worker: null
    }
  },
  methods: {
    displayRoute({Name, ID }) {
      return `${Name} (${ID})`
    },
    setSelected (item) {
      persistence.set('stopId', item.ID)
      this.$router.replace({name: 'App', params: { stopId: item.ID }})
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
