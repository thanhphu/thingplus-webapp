const app = require('./app');
const http = require('http');

const server = http.createServer(app)

server.listen(app.get('port'), function () {
  console.log('Web server listening on port ' + app.get('port'))
})
