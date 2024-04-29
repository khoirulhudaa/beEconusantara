const mongoose = require('mongoose')

const donationModel = new mongoose.Schema({
    donation_id: {
        type: String,
        required: true
    },
    name_donation: {
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

module.exports = mongoose.model('donation', donationModel)
