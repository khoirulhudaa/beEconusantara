const express = require('express')
const router = express.Router()
const donationController = require('../controllers/donationController')
const multer = require('multer')
const upload = multer()

router.post('/', upload.single('thumbnail'), donationController.createDonation)
router.get('/', donationController.getAllDonation)
router.post('/update/:donation_id', upload.single('thumbnail'), donationController.updateDonation)
router.post('/remove/:donation_id', donationController.removeDonation)

module.exports = router