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
    content: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: '-'
    },
    year: {
        type: Number,
        default: new Date().getFullYear()    
    },
    created_at: {
        type: Date,
        default: new Date()
    },
})

module.exports = mongoose.model('article', articleModel)
