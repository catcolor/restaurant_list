const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

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

router.get('/new', (req, res) => {
  return res.render('new')
})

router.post('/', (req, res) => {
  const {
    name,
    category,
    location,
    phone,
    description,
    image,
    rating,
    google_map
  } = req.body
  return Restaurant.create({
    name,
    category,
    location,
    phone,
    description,
    image,
    rating,
    google_map
  })
    .then(() => res.redirect('/'))
    .catch(error => {
      console.error(error)
      res.render(
        'errorPage',
        { status: 500, error: err.message }
      )
    })
})

router.get('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => {
      console.error(error)
      res.render(
        'errorPage',
        { status: 500, error: err.message }
      )
    })
})

router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => {
      console.error(error)
      res.render(
        'errorPage',
        { status: 500, error: err.message }
      )
    })
})

router.put('/:id', (req, res) => {
  const id = req.params.id
  const {
    name,
    category,
    location,
    phone,
    description,
    image,
    rating,
    google_map
  } = req.body

  return Restaurant.findById(id)
    .then(restaurant => {
      restaurant.name = name
      restaurant.category = category
      restaurant.location = location
      restaurant.phone = phone
      restaurant.description = description
      restaurant.image = image
      restaurant.rating = rating
      restaurant.google_map = google_map
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => {
      console.error(error)
      res.render(
        'errorPage',
        { status: 500, error: err.message }
      )
    })
})

router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => {
      console.error(error)
      res.render(
        'errorPage',
        { status: 500, error: err.message }
      )
    })
})

module.exports = router