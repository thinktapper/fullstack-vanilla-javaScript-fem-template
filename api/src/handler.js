import { parse, fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { routes } from './routes/userRoutes.js'
import { DEFAULT_HEADERS } from './util/util.js'
import { generateInstance } from './factory/userFactory.js'

const currDir = dirname(fileURLToPath(import.meta.url))
const filePath = join(currDir, '../', 'database', 'data.json')
const userFactory = generateInstance({ filePath })

const userRoutes = routes({ userFactory })

const allRoutes = {
  ...userRoutes,
  default(req, res) {
    res.writeHead(404, DEFAULT_HEADERS)
    res.write(JSON.stringify({ message: 'uhhhh not found!' }))

    res.end()
  },
}

function handler(req, res) {
  const { method, url } = req
  const { pathname } = parse(url, true)

  const key = `${pathname}:${method.toLowerCase()}`
  const chosen = allRoutes[key] ?? allRoutes.default

  return Promise.resolve(chosen(req, res)).catch(handleError(res))
}

function handleError(res) {
  return (error) => {
    console.log('Something bad has happened', error.stack)
    res.writeHead(500, DEFAULT_HEADERS)
    res.write(JSON.stringify({ error: 'internal server error' }))
    return res.end()
  }
}

export default handler
