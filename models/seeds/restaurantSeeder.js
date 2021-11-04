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
  Restaurant.create(index)
    .then(() => {
      console.log("restaurantSeeder done!")
      db.close()
    })
    .catch(err => console.log(err))
    .finally(() => process.exit())
})