const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const connectDB = require('./config/db')
const passport = require('passport')
const bodyParser = require('body-parser')
const authroutes = require('./routes/auth.route')
const orderRoutes = require('./routes/order.route')
const userRoutes = require('./routes/user.route')

connectDB()

const app = express()

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(authroutes)
app.use(orderRoutes)
app.use(userRoutes)
app.use(passport.initialize())
require('./config/passport')(passport)

app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
