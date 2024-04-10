const express = require('express')
const router = express.Router()
const spiceController = require('../controllers/spiceController')

router.post('/', spiceController.createSpice)
router.get('/', spiceController.getAllSpice)
router.post('/update/:spice_id', spiceController.updateSpice)
router.post('/remove/:spice_id', spiceController.removeSpice)

module.exports = router