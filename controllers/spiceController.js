const spiceModel = require('../models/spiceModel')
const crypto = require('crypto')

const createSpice = async (req, res) => {
    try {
        const { name_spice, island, icon, thumbnail, lat, long, address, link } = req.body

        const tokenRandom = crypto.randomBytes(5).toString('hex')
        const newSpice = new spiceModel({
            spice_id: tokenRandom,
            name_spice,
            island,
            icon,
            lat: parseFloat(lat),
            long: parseFloat(long),
            address,
            link,
            thumbnail,
        })

        await newSpice.save()
        return res.json({ status: 200, message: 'Berhasil Tambah Wisata!' })

    } catch (error) {
        return res.json({ status: 500, message: 'Proses gagal!', error: error });
    }
}

const getAllSpice = async (req, res) => {
    try {

        const existSpice = await spiceModel.find()
        
        if(!spiceModel) return res.json({ status: 404, message: 'Data belum ada!' })

        return res.json({ status: 200, message: 'Berhasil ambil data', data: existSpice })

    } catch (error) {
        return res.json({ status: 500, message: 'Proses gagal!', error: error });
    }
}

const updateSpice = async (req, res) => {
    try {
        const { spice_id } = req.params
        const { name_spice, lat, island, icon, long, address, link, thumbnail } = req.body

        const existSpice = await spiceModel.findOne({ spice_id })
        if(!existSpice) return res.json({ status: 404, message: 'Data tidak ada!' })

        existSpice.name_spice = name_spice
        existSpice.lat = lat
        existSpice.long = long
        existSpice.island = island
        existSpice.icon = icon
        existSpice.address = address
        existSpice.link = link
        existSpice.thumbnail = thumbnail
        existSpice.save()
    
        return res.json({ status: 200, message: 'Berhasil perbarui data!' });
    } catch (error) {
        return res.json({ status: 500, message: 'Proses gagal!', error: error });
    }
}

const removeSpice = async (req, res) => {
    try {
        
        const { spice_id } = req.params

        const existSpice = await spiceModel.findOneAndDelete({ spice_id })
        if(!existSpice) return res.json({ status: 404, message: 'Data tidak ada!' })
        
        return res.json({ status: 200, message: 'Berhasil hapus data!', data: existSpice })

    } catch (error) {
        return res.json({ status: 500, message: 'Proses gagal!', error: error });
    }
}

module.exports = {
    createSpice,
    updateSpice,
    removeSpice,
    getAllSpice,
}