const express = require('express')
const orderRouter = express.Router()
const orderControler = require('../controllers/order.controller')

orderRouter.post('/order', orderControler.order)
orderRouter.post('/getorder', orderControler.getOrder)
orderRouter.post('/setstatusorder', orderControler.setStatusOrder)

module.exports = orderRouter;
