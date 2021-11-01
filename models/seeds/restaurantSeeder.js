const mongoose = require('mongoose')
const Restaurant = require('../restaurant')
const restaurantSeed = require('../../restaurant.json')

mongoose.connect('mongodb://localhost/restaurant-list')

const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected')
  const index = restaurantSeed.results
  for (let i = 0; i < 8; i++) {
    Restaurant.create({
      name: index[i].name,
      category: index[i].category,
      image: index[i].image,
      rating: index[i].rating,
    })
  }
  console.log('done')
})