const express = require('express')
const router = express.Router()
const spiceController = require('../controllers/spiceController')

router.get('/', spiceController.getAllSpice)

module.exports = router