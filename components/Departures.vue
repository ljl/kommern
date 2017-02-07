<template>
  <div>
    <input type="text" v-model="lineNumber" @input="fetchData" placeholder="Linje" />
    <ul v-if="departures.length > 0">
      <li v-for="departure in departures">
        {{ departure.MonitoredVehicleJourney.LineRef }} til {{ departure.MonitoredVehicleJourney.DestinationName }} kommer
        {{ departure.MonitoredVehicleJourney.MonitoredCall.ExpectedArrivalTime | dateTime }}
      <div v-if="departure.Extensions.Deviations.length > 0" class="deviation">
        <span v-for="deviation in departure.Extensions.Deviations">PS: {{ deviation.Header }}</span>
      </div>
    </li>
  </ul>
  <p v-else>
    Gåkke no buss i dag
  </p>
</div>
</template>

<script>
import persistence from '../assets/js/persistence'
import moment from 'moment'

export default {
  name: 'Departures',
  data () {
    return {
      lineNumber: persistence.get('lineNumber'),
      departures: []
    }
  },
  computed: {

  },
  filters: {
    dateTime (dt) {
      return moment(dt).fromNow()
    }
  },
  methods: {
    fetchData () {
      if (this.$route.params.stopId) {
        let fetchUrl = `/api/StopVisit/GetDepartures/${this.$route.params.stopId}`
        if (this.lineNumber) {
          fetchUrl += '?linenames=' + this.lineNumber
        }
        fetch(fetchUrl).then((response) => {
          return response.json()
        }).then((json) => {
          console.log('departures', json)
          this.departures = json
        })
      }
    }
  },
  watch: {
    '$route.params.stopId': 'fetchData',
    'lineNumber': (val) => {
      console.log('dingding', val)
      persistence.set('lineNumber', val)
    }
  },
  created () {
    moment.locale('nb')
    this.fetchData()
  }
}
</script>

<style scoped lang="scss">
ul {
  list-style: none;
  padding:0;
  margin:0;
}
li {
  margin-bottom: 1rem;
}
input {
  border:0;
  border-bottom: 1px solid white;
  background-color: transparent;
  font-size: 1rem;
  width: 3rem;
  padding: 0.5rem;
  margin-bottom: 2rem;
  color: white;
}

::-webkit-input-placeholder {
   color: white;
}

:-moz-placeholder {
   color: white;
}

::-moz-placeholder {
   color: white;
}

:-ms-input-placeholder {
   color: white;
}

.deviation {
  font-size: 0.7rem;
  span {
    display: block;
  }
}
</style>
