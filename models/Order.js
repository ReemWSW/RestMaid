const mongoose = require('mongoose')
const Enum = require('./Enum')
var Schema = mongoose.Schema

var user = new Schema({
  _id: String,
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
  status: { type: Enum, enum: ['WAIT', 'ACCEPT', 'SUCCESS'] },
  score: { type: Number, default: 0 },
})

module.exports = mongoose.model('Order', orderSchema)
