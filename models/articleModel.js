const mongoose = require('mongoose')

const articleModel = new mongoose.Schema({
    article_id: {
        type: String,
        required: true
    },
    name_article: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        default: 'Default.jpg'
    },
    content: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: new Date()
    },
})

module.exports = mongoose.model('article', articleModel)
