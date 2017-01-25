var path        = require('path')
var express     = require('express')
var http        = require('http')
var webpack     = require('webpack')
var jsonServer  = require('json-server')
var config      = require('./webpack.config')

var app       = express()
var compiler  = webpack(config)
var host      = 'localhost'
var port      = 4002

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
}))

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'public/index.html'))
})

var apiRouter = jsonServer.router('db.json')
app.use(apiRouter)

var server = http.createServer(app)

server.listen(port, function(err) {
  if (err) {
    console.log(err)
    return
  }

  var addr = server.address()

  console.log('Listening at http://%s:%d', addr.address, addr.port)
})
