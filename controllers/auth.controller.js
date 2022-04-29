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
          image: req.body.image,
          email: req.body.email,
          name: req.body.name,
          password: req.body.password,
          phone: req.body.phone,
          maid: false,
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

  authenticate: function (req, res) {
    UserModel.findOne({
      email: req.body.email,
    }).then((user) => {
      if (!user) {
        res.status(403).json({
          success: false,
          message: 'ไม่พบบัญชีผู้ใช้งาน',
        })
      } else {
        console.log(user);
        user.comparePassword(req.body.password, function (err, isMatch) {
          if (isMatch && !err) {
            var token = jwt.encode(user, config.secret)
            res.status(200).json({
              success: true,
              data: {
                id: user._id,
                image: user.image,
                name: user.name,
                email: user.email,
                phone: user.phone,
                token: token,
                maid: user.maid,
                datetime: user.datetime,
                category: user.category,
                address: {
                  tombon: user.address.tombon,
                  amphure: user.address.amphure,
                  province: user.address.province,
                },
              },
            })
          } else {
            return res.status(403).json({
              success: false,
              message: 'รหัสผ่านผิดพลาด',
            })
          }
        })
      }
    })
  },
}

module.exports = functions
