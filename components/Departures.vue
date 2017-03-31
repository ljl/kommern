<template>
  <div>
    <input type="text" v-model="lineNumber" placeholder="Linje" />
    <ul v-if="departures.length > 0">
      <li v-for="departure in departures">
        {{ displayDeparture(departure) }}
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
      lineNumber: persistence.get('lineNumber'),
      lastNotification: ''
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
    displayDeparture (departure) {
      if (!departure.MonitoredVehicleJourney) return 'Æsj, det er skjedd en feil'
      return `${departure.MonitoredVehicleJourney.LineRef} til ${departure.MonitoredVehicleJourney.DestinationName} kommer
      ${moment(departure.MonitoredVehicleJourney.MonitoredCall.ExpectedArrivalTime).fromNow() }`
    },
    notify (message, options) {
      if (message === this.lastNotification) return
      this.lastNotification = message
      if (!('Notification' in window)) {
        console.error('This browser does not support desktop notification')
      }

      else if (Notification.permission === 'granted') {
        var notification = new Notification(message, options)
      }

      else if (Notification.permission !== 'denied') {
        Notification.requestPermission(function (permission) {
          if (permission === 'granted') {
            var notification = new Notification(message, options)
          }
        });
      }
    }
  },
  watch: {
    '$route.params.stopId': function () {
      console.log('route changed')
      const params = {}
      params.stopId = this.$route.params.stopId
      if (this.lineNumber) {
        params.lineNumber = this.lineNumber
      }
      this.$store.dispatch('getAllDepartures', params)
    },
    'lineNumber': function (val) {
      persistence.set('lineNumber', val)
      if (this.$route.params.stopId) {
        const params = {}
        params.stopId = this.$route.params.stopId
        params.lineNumber = this.lineNumber
        this.$store.dispatch('getAllDepartures', params)
      }
    },
    'departures': function (deps) {
      const departure = deps[0]
      const title = `Kommern? Ja ${moment(departure.MonitoredVehicleJourney.MonitoredCall.ExpectedArrivalTime).fromNow()}`
      const body = `#${departure.MonitoredVehicleJourney.LineRef} til ${departure.MonitoredVehicleJourney.DestinationName}`
      this.notify(title, {body:body});
    }
  },
  created () {
    moment.locale('nb')
    if (this.$route.params.stopId) {
      console.log('dispatching action')
      this.$store.dispatch('getAllDepartures', this.$route.params.stopId)
    }
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
