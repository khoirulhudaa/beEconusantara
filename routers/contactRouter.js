const express = require('express')
const router = express.Router()
const contactController = require('../controllers/contactController')

router.post('/', contactController.createContact)
router.get('/', contactController.getAllContact)
router.post('/update/:contact_id', contactController.updateContact)
router.post('/remove/:contact_id', contactController.removeContact)

module.exports = router