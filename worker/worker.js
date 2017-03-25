let WORKER_ID = 0
const POLL_INTERVAL = 10000

self.addEventListener('message', function(e) {
  switch (e.data.action) {
    case 'init':
      clearInterval(WORKER_ID)
      fetchData(e.data.options.stopId)
      WORKER_ID = setInterval(() => {
        fetchData(e.data.options.stopId)
        console.log(WORKER_ID)
      }, POLL_INTERVAL)
      break
    case 'stop':
      clearInterval(WORKER_ID)
    default:
      self.postMessage('Action not supported')
  }
}, false);


function fetchData(stopId) {
  let fetchUrl = `/api/StopVisit/GetDepartures/${stopId}`
  if (this.lineNumber) {
    fetchUrl += '?linenames=' + this.lineNumber
  }
  fetch(fetchUrl).then((response) => {
    return response.json()
  }).then((json) => {
    self.postMessage(json)
  })
}
