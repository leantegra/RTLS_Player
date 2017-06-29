const PORT = process.env.PORT || 3000

const {createServer} = require('http')
const next = require('next')
const routes = require('./routes')

const dev = process.env.NODE_ENV !== 'production'
console.log(`Server dev=${dev}`)
const app = next({dev})
const handler = routes.getRequestHandler(app)

app.prepare()
.then(() => {
  createServer(handler)
  .listen(PORT, (err) => {
    if (err) throw err
    console.log(`> Custom server ready on http://localhost:${PORT}`)
  })
})
