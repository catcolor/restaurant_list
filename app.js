const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const methodOverride = require("method-override")

const Restaurant = require('./models/restaurant')

const app = express()
const port = 3000

mongoose.connect('mongodb://localhost/restaurant-list')

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected')
})

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(methodOverride('_method'))

app.get('/', (req, res) => {
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

app.get('/restaurants/new', (req, res) => {
  return res.render('new')
})

app.post('/restaurants', (req, res) => {
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

app.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim().toLowerCase()

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

app.get('/restaurants/:id', (req, res) => {
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

app.get('/restaurants/:id/edit', (req, res) => {
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

app.post('/restaurants/:id/edit', (req, res) => {
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

app.post('/restaurants/:id/delete', (req, res) => {
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

app.listen(port, () => {
  console.log(`express is running http://localhost:${port}`)
})

