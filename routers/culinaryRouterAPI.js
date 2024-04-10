const express = require('express')
const router = express.Router()
const culinaryController = require('../controllers/culinaryController')

router.get('/', culinaryController.getAllCulinary)

module.exports = router