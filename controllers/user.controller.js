UserModel = require('../models/User')

var functions = {
    setMaid: function (req, res) {
        if (!req.body) {
          res.json({ success: false, message: 'เกิดข้อผิดพลาด' })
        } else {
          var id = req.body.id
          UserModel.updateOne({ _id: id }, { $set: { maid: true } }, function (
            err,
            user,
          ) {
            if (err) {
              res.status(404).json({ success: false, message: 'เกิดข้อผิดพลาด' })
            } else {
              res.status(200).json({
                success: true,
                message: 'อัพเดทสำเร็จแล้ว',
                data: user,
              })
            }
          })
        }
      },
}

module.exports = functions