const mongoose = require('mongoose')

const contactModel = new mongoose.Schema({
    contact_id: {
        type: String,
        required: true
    },
    name_contact: {
        type: String,
        required: true
    },
    number: {
        type: Number,
        required: true
    },
    created_at: {
        type: Date,
        default: new Date()
    },
})

module.exports = mongoose.model('contact', contactModel)
