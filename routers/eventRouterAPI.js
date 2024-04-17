const express = require('express')
const router = express.Router()
const eventController = require('../controllers/eventController')

router.get('/', eventController.getAllEvent)

module.exports = router