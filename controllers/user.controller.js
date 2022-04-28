UserModel = require('../models/User')

var functions = {
  setMaid: function (req, res) {
    if (!req.body) {
      res.json({ success: false, message: 'เกิดข้อผิดพลาด' })
    } else {
      var id = req.body.id
      var maid = req.body.maid
      var tombon = req.body.tombon
      var amphure = req.body.amphure
      var province = req.body.province
      var category = req.body.category
      var datetime = req.body.datetime
      UserModel.updateOne(
        { _id: id },
        {
          $set: {
            maid: maid,
            address: {
              tombon: tombon,
              amphure: amphure,
              province: province,
            },
            category: category,
            datetime: datetime,
          },
        },
      )
        .then((value) => {
          res.status(200).json({
            success: true,
            message: 'อัพเดทสำเร็จแล้ว',
          })
        })
        .catch(() =>
          res.status(404).json({ success: false, message: 'เกิดข้อผิดพลาด' }),
        )
    }
  },
}

module.exports = functions
