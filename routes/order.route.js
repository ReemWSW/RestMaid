const express = require('express')
const orderRouter = express.Router()
const orderControler = require('../controllers/order.controller')

orderRouter.post('/order', orderControler.order)

module.exports = orderRouter;
