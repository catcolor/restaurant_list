const mongoose = require('mongoose')
const Schema = mongoose.Schema

const restaurantSchema = new Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String },
  rating: { type: Number },
  location: { type: String, required: true },
  phone: { type: String, required: true },
  google_map: { type: String },
  description: { type: String, required: true }
})

module.exports = mongoose.model('Restaurant', restaurantSchema)