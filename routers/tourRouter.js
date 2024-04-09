const express = require('express')
const router = express.Router()
const tourController = require('../controllers/tourController')

router.post('/', tourController.createTour)
router.get('/', tourController.getAllTour)
router.post('/update/:island_id', tourController.updateTour)
router.post('/remove/:island_id', tourController.removeCoordinate)

module.exports = router