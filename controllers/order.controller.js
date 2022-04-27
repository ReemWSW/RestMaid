OrderModel = require('../models/Order')

var functions = {
  order: function (req, res) {
    if (req.body) {
      var newOrder = OrderModel({
        customer: {
          _id: req.body.customer.id,
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
      if (req.body.customer) {
        OrderModel.find({
          'customer._id': req.body.id,
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
            })
          })
          .catch((err) => {
            console.log(err)
          })
      } else {
        OrderModel.find({
          'address.tombon': req.body.tombon,
          categoty: req.body.categoty,
        })
          .then((orders) => {
            for (var index in orders) {
              if (orders[index]['customer']['_id'] != req.body.id) {
                if (orders[index]['status'] === 'EnumOrder.WAIT')
                  waitOrder.push(orders[index])
                if (orders[index]['status'] === 'EnumOrder.ACCEPT')
                  acceptOrder.push(orders[index])
                if (orders[index]['status'] === 'EnumOrder.SUCCESS')
                  successOrder.push(orders[index])
              }
            }

            res.status(200).json({
              success: true,
              message: 'พบข้อมูลแล้ว',
              data: { waitOrder, acceptOrder, successOrder },
            })
          })
          .catch((err) => {
            console.log(err)
          })
      }
    }
  },

  setStatusOrder: function (req, res) {
    if (!req.body) {
      res.json({ success: false, message: 'ไม่สามรถส่งงานได้' })
    } else {
      OrderModel.findByIdAndUpdate(
        { _id: req.body.order },
        { $set: { status: req.body.status } },
      )
        .then((order) => {
          res.status(200).json({
            success: true,
            message: 'บันทึกงานสำเร็จแล้ว',
            data: order,
          })
        })
        .catch((e) => {
          res
            .status(404)
            .json({ success: false, message: 'ไม่สามารถบันทึกงานได้' })
        })
    }
  },

  scoreOrder: function (req, res) {
    if (!req.body) {
      res.json({ success: false, message: 'ไม่สามรถส่งงานได้' })
    } else {
      OrderModel.findByIdAndUpdate(
        { _id: req.body.order },
        { $set: { score: req.body.score } },
      )
        .then((order) =>
          res.status(200).json({
            success: true,
            message: 'ให้คะแนนงานสำเร็จแล้ว',
            data: order,
          }),
        )
        .catch(() =>
          res
            .status(404)
            .json({ success: false, message: 'ไม่สามารถบันทึกงานได้' }),
        )
    }
  },
}
module.exports = functions
