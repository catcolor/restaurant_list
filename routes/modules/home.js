const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

router.get('/', (req, res) => {
  const userId = req.user._id
  Restaurant.find({ userId })
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(err => {
      console.log(err)
      res.render(
        'errorPage',
        { status: 500, error: err.message }
      )
    })
})

router.get('/search', (req, res) => {
  const userId = req.user._id
  const keyword = req.query.keyword ? req.query.keyword : ''

  const { name, sort } = req.query

  let sortOrder = { _id: 'asc' }

  if (name === 'name') {
    sortOrder = { name: `${sort}` }
  } else if (name === 'category') {
    sortOrder = { category: `${sort}` }
  } else if (name === 'location') {
    sortOrder = { location: `${sort}` }
  }

  Restaurant.find({ $or: [{ name: new RegExp(keyword, 'i') }, { category: new RegExp(keyword, 'i') }], userId })
    .lean()
    .sort(sortOrder)
    .then(restaurants =>
      res.render('index', { restaurants, keyword })
    )
    .catch(err => {
      console.log(err)
      res.render(
        'errorPage',
        { status: 500, error: err.message }
      )
    })
})

module.exports = router