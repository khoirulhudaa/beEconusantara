const mongoose = require('mongoose')

const islandModel = new mongoose.Schema({
    island_id: {
        type: String,
        required: true
    },
    name_island: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: new Date()
    },
})

module.exports = mongoose.model('island', islandModel)
