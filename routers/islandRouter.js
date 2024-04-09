const express = require('express')
const router = express.Router()
const islandController = require('../controllers/islandController')

router.post('/', islandController.createIsland)
router.get('/', islandController.getAllIsland)
router.post('/update/:island_id', islandController.updateIsland)
router.post('/remove/:island_id', islandController.removeCoordinate)

module.exports = router