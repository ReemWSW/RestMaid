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
          image: '',
          name: '',
          phone: '',
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
        status: req.body.status,
      })

      console.log(newOrder)

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

  getOrder: function (req, res, next) {
    var waitOrder = []
    var acceptOrder = []
    var successOrder = []
    if (!req.body) {
      res.status(404).json({ success: false, message: 'ไม่สามรถทำรายการได้' })
    } else {
      OrderModel.find({
        'address.province': req.body.province,
        'address.amphure': req.body.amphure,
      })
        .then((orders) => {
          for (var index in orders) {
            if (orders[index]['status'] === 'EnumOrder.WAIT')
              waitOrder.push(orders[index])
            if (orders[index]['status'] === 'EnumOrder.ACCEPT')
              acceptOrder.push(orders[index])
            if (orders[index]['status'] === 'EnumOrder.SUCCESS')
              successOrder.push(orders[index])
          }

          res.status(200).json({
            success: true,
            message: 'พบข้อมูลแล้ว',
            data: { waitOrder, acceptOrder, successOrder },
            // data: orders,
          })
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
}
module.exports = functions
