const express = require('express')
const authRouter = express.Router()
const authControler = require('../controllers/auth.controller')

authRouter.get('/', (req, res) => {
    res.send('Hello World')
})

authRouter.post('/register', authControler.registration)

module.exports = authRouter;