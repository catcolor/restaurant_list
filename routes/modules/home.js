const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

router.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => {
      console.error(error)
      res.render(
        'errorPage',
        { status: 500, error: err.message }
      )
    })
})

router.get('/search', (req, res) => {

  const keyword = req.query.keyword.trim().toLowerCase()
  const keywords = req.query.keyword

  if (!keywords) {
    res.redirect('/')
  }

  return Restaurant.find()
    .lean()
    .then(restaurants => {
      const filterrestaurants = restaurants.filter(data => data.name.toLowerCase().includes(keyword) ||
        data.category.toLowerCase().includes(keyword))
      res.render('index', { restaurants: filterrestaurants, keyword })
    })
    .catch(error => {
      console.error(error)
      res.render(
        'errorPage',
        { status: 500, error: err.message }
      )
    })
})

module.exports = router