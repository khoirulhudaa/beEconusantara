const express = require('express')
const router = express.Router()
const contactdController = require('../controllers/contactdController')

router.post('/', contactdController.createContact)
router.get('/', contactdController.getAllContact)
router.post('/update/:contact_id', contactdController.updateContact)
router.post('/remove/:contact_id', contactdController.removeContact)

module.exports = router