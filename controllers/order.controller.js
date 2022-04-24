OrderModel = require('../models/Order')

var functions = {
  order: function (req, res) {
    if (req.body) {
        var newOrder = OrderModel({
          customer: {
            image: req.body.customer.image,
            name: req.body.customer.name,
            phone: req.body.customer.phone,
          },
          maid: {
            image: req.body.maid.image,
            name: req.body.maid.name,
            phone: req.body.maid.phone,
          },
          address: {
            detail: req.body.address.detail,
            tombon: req.body.address.tombon,
            amphure: req.body.address.amphure,
            province: req.body.address.province,
          },
          categoty: req.body.categoty,
          type: req.body.type,
          detail: req.body.detail,
          datetime: req.body.datetime,
        })

        console.log(newOrder);

        newOrder.save(function (err, newOrder) {
          if (err) {
            console.log(err)
            res
              .status(404)
              .json({ success: false, message: 'ไม่สามารถลงทะเบลียนได้' })
          } else {
            res.status(200).json({
              success: true,
              message: 'ลงทะเบียนสำเร็จแล้ว',
              data: newOrder,
            })
          }
        })
    }
  },
}
module.exports = functions
