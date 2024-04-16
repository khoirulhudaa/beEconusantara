const express = require('express')
const router = express.Router()
const eventController = require('../controllers/eventController')
const multer = require('multer')
const upload = multer()

router.post('/', upload.single('thumbnail'), eventController.createEvent)
router.get('/', eventController.getAllEvent)
router.post('/update/:event_id', eventController.updateEvent)
router.post('/remove/:event_id', eventController.removeEvent)

module.exports = router