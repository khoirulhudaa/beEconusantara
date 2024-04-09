const express = require('express')
const router = express.Router()
const articleController = require('../controllers/articleController')

router.post('/', articleController.createArticle)
router.get('/', articleController.getAllArticle)
router.post('/update/:article_id', articleController.updateArticle)
router.post('/remove/:article_id', articleController.removeArticle)

module.exports = router