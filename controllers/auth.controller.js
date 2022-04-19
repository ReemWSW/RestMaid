var UserModel = require('../models/User')
var jwt = require('jwt-simple')
var config = require('../config/dbconfig')

var functions = {
  registration: function (req, res) {
    UserModel.findOne({ email: req.body.email }).then((user) => {
      if (user != null) {
        res
          .status(300)
          .json({ success: false, message: 'อีเมลล์นี้มีอยู่แล้ว' })
      } else {
        var newUser = UserModel({
          email: req.body.email,
          name: req.body.name,
          password: req.body.password,
          phone: req.body.phone,
        })

        newUser.save(function (err, newUser) {
          if (err) {
            console.log(err)
            res
              .status(404)
              .json({ success: false, message: 'ไม่สามารถลงทะเบลียนได้' })
          } else {
            console.log(newUser)
            res.status(200).json({
              success: true,
              message: 'ลงทะเบียนสำเร็จแล้ว',
              data: newUser,
            })
          }
        })
      }
    })
  },
}

module.exports = functions
