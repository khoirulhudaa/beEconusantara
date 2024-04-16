const mongoose = require('mongoose')

const eventModel = new mongoose.Schema({
    event_id: {
        type: String,
        required: true
    },
    name_event: {
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

module.exports = mongoose.model('event', eventModel)
