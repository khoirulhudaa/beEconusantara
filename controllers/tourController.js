const tourModel = require('../models/tourModel')
const crypto = require('crypto')

const createTour = async (req, res) => {
    try {
        const { name_location, island, thumbnail, lat, long, address, link } = req.body

        const tokenRandom = crypto.randomBytes(5).toString('hex')
        const newTour = new tourModel({
            tour_id: tokenRandom,
            name_location,
            island,
            lat: parseFloat(lat),
            long: parseFloat(long),
            address,
            link,
            thumbnail,
        })

        await newTour.save()
        return res.json({ status: 200, message: 'Berhasil Tambah Wisata!' })

    } catch (error) {
        return res.json({ status: 500, message: 'Proses gagal!', error: error });
    }
}

const getAllTour = async (req, res) => {
    try {

        const existTour = await tourModel.find()
        
        if(!tourModel) return res.json({ status: 404, message: 'Data belum ada!' })

        return res.json({ status: 200, message: 'Berhasil ambil data', data: existTour })

    } catch (error) {
        return res.json({ status: 500, message: 'Proses gagal!', error: error });
    }
}

const updateTour = async (req, res) => {
    try {
        const { tour_id } = req.params
        const { name_location, island, lat, long, address, link, thumbnail } = req.body

        const existTour = await tourModel.findOne({ tour_id })
        if(!existTour) return res.json({ status: 404, message: 'Data tidak ada!' })

        existTour.name_location = name_location
        existTour.lat = lat
        existTour.long = long
        existTour.island = island
        existTour.address = address
        existTour.link = link
        existTour.thumbnail = thumbnail
        existTour.save()
    
        return res.json({ status: 200, message: 'Berhasil perbarui data!' });
    } catch (error) {
        return res.json({ status: 500, message: 'Proses gagal!', error: error });
    }
}

const removeTour = async (req, res) => {
    try {
        
        const { tour_id } = req.params

        const existTour = await tourModel.findOneAndDelete({ tour_id })
        if(!existTour) return res.json({ status: 404, message: 'Data tidak ada!' })
        
        return res.json({ status: 200, message: 'Berhasil hapus data!', data: existTour })

    } catch (error) {
        return res.json({ status: 500, message: 'Proses gagal!', error: error });
    }
}

module.exports = {
    createTour,
    updateTour,
    removeTour,
    getAllTour,
}