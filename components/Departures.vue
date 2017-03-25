<template>
  <div>
    <input type="text" v-model="lineNumber" placeholder="Linje" />
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
import { mapGetters } from 'vuex'

export default {
  name: 'Departures',
  data () {
    return {
      lineNumber: persistence.get('lineNumber')
    }
  },
  computed: {
    ...mapGetters({
       departures: 'allDepartures'
    })
  },
  filters: {
    dateTime (dt) {
      return moment(dt).fromNow()
    }
  },
  methods: {
  },
  watch: {
    '$route.params.stopId': function () {
      console.log('stopId changed')
      console.log(this.$route.params.stopId)
      this.$store.dispatch('getAllDepartures', this.$route.params.stopId)
    },
    'lineNumber': (val) => {
      persistence.set('lineNumber', val)
    }
  },
  created () {
    moment.locale('nb')
    console.log(this.$route.params.stopId)
    if (this.$route.params.stopId) {
      this.$store.dispatch('getAllDepartures', this.$route.params.stopId)
    }
    //this.fetchData()
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
