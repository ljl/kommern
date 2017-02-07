<template>
  <div>
    <h1>Alle stopp</h1>
    <ul>
      <li v-for="route in routes">
        {{ route.ID }} - {{ route.Name }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name:'Routes',
  data () {
    return {
      routes: []
    }
  },
  created () {
    fetch('/api/Place/GetStopsByLineID/33').then((response) => {
      return response.json()
    }).then((json) => {
      console.log('stops', json)
      this.routes = json
    })
  }
}
</script>

<style>
</style>
