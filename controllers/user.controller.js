UserModel = require('../models/User')

var functions = {
  setMaid: function (req, res) {
    if (!req.body) {
      res.json({ success: false, message: 'เกิดข้อผิดพลาด' })
    } else {
      var id = req.body.id
      var maid = req.body.maid
      UserModel.updateOne({ _id: id }, { $set: { maid: maid } }, function (
        err,
        user,
      ) {
        if (err) {
          res.status(404).json({ success: false, message: 'เกิดข้อผิดพลาด' })
        } else {
          console.log(user)
          res.status(200).json({
            success: true,
            message: 'อัพเดทสำเร็จแล้ว',
          })
        }
      })
    }
  },
}

module.exports = functions
