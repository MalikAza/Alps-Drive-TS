import http from 'http'
import fs from 'fs'
import app from "./app"
import drivePath from './utils/conf'

if (!fs.existsSync(drivePath)) fs.mkdirSync(drivePath)

function normalizePort(val: string): string | number | false {
  const port: number = parseInt(val, 10)

  if (isNaN(port)) {
    return val
  }
  if (port >= 0) {
    return port
  }
  return false
}

const port: string | number | false = normalizePort(process.env.PORT || '3000')
app.set('port', port)

function errorHandler(error): void {
  if (error.syscall !== 'listen') {
    throw error
  }
  const address = server.address()
  const bind: string = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port
  switch (error.code) {
    case 'EACCESS':
      console.error(bind + ' requires elevated privileges.')
      process.exit(1)
      break
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.')
      process.exit(1)
      break
    default:
      throw error
  }
}

const server = http.createServer(app)

server.on('error', errorHandler)
server.on('listen', () => {
  const address = server.address()
  const bind: string = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port
  console.log('Listening on ' + bind)
})

server.listen(port)