const express = require('express')
const router = express.Router()
const eventController = require('../controllers/eventController')

router.post('/', eventController.getAllEvent)

module.exports = router