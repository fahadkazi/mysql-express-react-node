const express = require('express')
const app = express()
const http = require('http')
const bodyParser = require('body-parser')
const { sha512 } = require('./utility/index')

app.use(bodyParser.json())
app.use(bodyParser.raw())

// Load env from file for dev. Set NODE_ENV in your bashrc or zshrc.
if (process.env.NODE_ENV === 'development') {
  require('env2')('./devenv.json')
}

const reviewsRouter = require('./routers/reviews')

app.use('/api/reviews', reviewsRouter)

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))

  // Return the main index.html, so react-router render the route in the client
  app.get('/', (req, res) => {
    res.sendFile(path.resolve('client/build', 'index.html'))
  })
}

const port = process.env.SERVICE_PORT || 3000
const server = http.createServer(app)
server.listen(port, () => {
  console.log(`REST serving on port ${port}`)
})
