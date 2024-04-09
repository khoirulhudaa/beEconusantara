const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')

router.post('/masuk', authController.signin)
router.post('/daftar', authController.signup)

module.exports = router