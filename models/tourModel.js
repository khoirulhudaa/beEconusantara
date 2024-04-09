const mongoose = require('mongoose')

const tourModel = new mongoose.Schema({
    tour_id: {
        type: String,
        required: true
    },
    name_location: {
        type: String,
        required: true
    },
    island: {
        type: String,
        required: true
    },
    lat: {
        type: Number,
        required: true
    },
    long: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: new Date()
    },
})

module.exports = mongoose.model('tour', tourModel)
