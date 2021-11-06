const Restaurant = require('../restaurant')
const restaurantSeed = require('../../restaurant.json')
const db = require('../../config/mongoose')

db.once('open', () => {

  const index = restaurantSeed.results
  Restaurant.create(index)
    .then(() => {
      console.log("restaurantSeeder done!")
      db.close()
    })
    .catch(err => console.log(err))
    .finally(() => process.exit())
})