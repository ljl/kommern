var express = require('express')
var app = express()
var request = require('request')

app.use(express.static('public'))


app.get('/', function (req, res) {
  res.render('public/index.html')
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
