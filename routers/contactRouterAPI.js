const express = require('express')
const router = express.Router()
const contactdController = require('../controllers/contactdController')

router.get('/', contactdController.getAllContact)

module.exports = router