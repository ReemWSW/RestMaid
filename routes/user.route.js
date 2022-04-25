const express = require('express')
const userRouter = express.Router()
const userControler = require('../controllers/user.controller')

userRouter.post('/setmaid', userControler.setMaid)

module.exports = userRouter;
