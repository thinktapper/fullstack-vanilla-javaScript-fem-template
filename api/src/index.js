import http from 'node:http'
import handler from './handler.js'

http
  .createServer(handler)
  .listen(3000)
  .on('listening', () => console.log('api is running at 3000'))
