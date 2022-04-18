var UserModel = require('../models/User')
var jwt = require('jwt-simple')
var config = require('../config/dbconfig')
const User = require('../models/User')

var functions = {
  registration: function (req, res) {
    UserModel.findOne({ email: req.body.email }).then((user) => {
      if (user.email != null) {
        res.status(300).json({ success: false, message: 'อีเมลล์มีอยู๋แล้ว' })
      } else {

        if(!req.body.password){
            res.json({success: false, message:'กรุณากรอกรหัสผ่าน'})
        }else if(!req.body.name){
            res.json({success:false, message:'กรุณาใส่ชื่อ'})
        }else{
            var newUser = User({
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
    }
    })

    var check = User.findOne({ email: req.body.email })
    if (check.email != null) {
      res.status(300).json({ success: false, message: 'อีเมลล์นี้มีอยู่แล้ว' })
    } else {
      if (!req.body.password) {
        res.json({ success: false, message: 'Enter password fields' })
      } else if (!req.body.name) {
        res.json({ success: false, message: 'Enter name fields' })
      } else {
        var newUser = User({
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
    }
  },
}

module.exports = functions
