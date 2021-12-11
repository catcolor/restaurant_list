const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const Restaurant = require('../restaurant')
const User = require('../user')
const restaurantSeed = require('../../restaurant.json').results
const db = require('../../config/mongoose')
const SEED_USER = [
  {
    name: 'user1',
    email: 'user1@example.com',
    password: '12345678',
    seed_indexes: [0, 1, 2]
  },
  {
    name: 'user2',
    email: 'user2@example.com',
    password: '12345678',
    seed_indexes: [3, 4, 5]
  }
]

db.once('open', () => {
  Promise.all(
    Array.from(SEED_USER, seedUser => {
      return bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(seedUser.password, salt))
        .then(hash => User.create({
          name: seedUser.name,
          email: seedUser.email,
          password: hash
        }))
        .then(user => {
          const userId = user._id
          const restaurant = []
          seedUser.seed_indexes.forEach(index => {
            restaurantSeed[index].userId = userId
            restaurant.push(restaurantSeed[index])
          })
          return Restaurant.create(restaurant)
        })
    })
  )
    .then(() => {
      console.log("restaurantSeeder done!")
      process.exit()
    })
})