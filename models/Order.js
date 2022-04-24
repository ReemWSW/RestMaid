const mongoose = require('mongoose')
var Schema = mongoose.Schema

var user = new Schema({
  image: String,
  name: String,
  phone: String,
})
var orderSchema = new Schema({
  customer: user,
  maid: user,
  address: {
    detail: String,
    tombon: String,
    amphure: String,
    province: String,
  },
  categoty: String,
  type: String,
  detail: String,
  datetime: Date,
})

module.exports = mongoose.model('Order', orderSchema)
