const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

router.get('/', (req, res) => {
  const { name, sort } = req.query

  let sortOrder = { _id: 'asc' }

  if (name === 'name') {
    sortOrder = { name: `${sort}` }
  } else if (name === 'category') {
    sortOrder = { category: `${sort}` }
  } else if (name === 'location') {
    sortOrder = { location: `${sort}` }
  }

  Restaurant.find()
    .lean()
    .sort(sortOrder)
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

  const keyword = req.query.keyword.trim().toLowerCase()
  const keywords = req.query.keyword
  const { name, sort } = req.query

  let sortOrder = { _id: 'asc' }

  if (name === 'name') {
    sortOrder = { name: `${sort}` }
  } else if (name === 'category') {
    sortOrder = { category: `${sort}` }
  } else if (name === 'location') {
    sortOrder = { location: `${sort}` }
  }

  return Restaurant.find()
    .lean()
    .sort(sortOrder)
    .then(restaurants => {
      const filterrestaurants = restaurants.filter(data => data.name.toLowerCase().includes(keyword) ||
        data.category.toLowerCase().includes(keyword))
      res.render('index', { restaurants: filterrestaurants, keyword })
    })
    .catch(err => {
      console.log(err)
      res.render(
        'errorPage',
        { status: 500, error: err.message }
      )
    })
})

module.exports = router