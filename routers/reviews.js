const express = require('express')
const router = express.Router()
const helper = require('../helpers/review')

router.get('/getreviews', (req, res) => {
  res.send({ status: 'success' })
})

router.post('/addreview', (req, res) => {
  helper.addreview(req.body, (response) => {
    res.send(response)
  })
})

module.exports = router
