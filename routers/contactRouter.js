const express = require('express')
const router = express.Router()
const contactController = require('../controllers/contactController')
const multer = require('multer')
const upload = multer()

router.post('/', upload.single('photo'), contactController.createContact)
router.get('/', contactController.getAllContact)
router.post('/update/:contact_id', upload.single('photo'), contactController.updateContact)
router.post('/remove/:contact_id', contactController.removeContact)

module.exports = router