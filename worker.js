let WORKER_ID = 0
const POLL_INTERVAL = 10000

self.addEventListener('message', function(e) {

  console.log('message received', e, self)
  switch (e.data.action) {
    case 'init':
      clearInterval(WORKER_ID)
      fetchData(e.data.options, e.source)
      WORKER_ID = setInterval(() => {
        fetchData(e.data.options, e.source)
      }, POLL_INTERVAL)
      break
    case 'stop':
      clearInterval(WORKER_ID)
    default:
      e.source.postMessage('Action not supported')
  }
}, false);


function fetchData(options, client) {
  let fetchUrl = `/api/StopVisit/GetDepartures/${options.stopId}`
  if (options.lineNumber) {
    fetchUrl += '?linenames=' + options.lineNumber
  }
  fetch(fetchUrl).then((response) => {
    return response.json()
  }).then((json) => {
    client.postMessage(json)
  })
}
