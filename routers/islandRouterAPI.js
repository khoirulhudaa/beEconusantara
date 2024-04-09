const express = require('express')
const router = express.Router()
const islandController = require('../controllers/islandController')

router.get('/', islandController.getAllIsland)

module.exports = router