var express = require("express")
const authcontroller = require("../controllers/auth.js")
var router = express.Router()

router.post('/register', authcontroller.register)
router.post('/login', authcontroller.login)
router.post('/history', authcontroller.history)
router.post('/favourite', authcontroller.favourite)
router.post('/edit_sample_data', authcontroller.edit_sample_data)
router.post('/add_sample_data', authcontroller.add_sample_data)
router.post('/edit_sample_data_cal', authcontroller.edit_sample_data_cal)
router.post('/add_sample_data_cal', authcontroller.add_sample_data_cal)
router.post('/travellinghistory', authcontroller.travellinghistory)
router.post('/travellinghistorycal', authcontroller.travellinghistorycal)
router.post('/travellinghistorycar', authcontroller.travellinghistorycar)
router.post('/travellinghistorycarcal', authcontroller.travellinghistorycarcal)

module.exports = router