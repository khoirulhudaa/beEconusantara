const islandModel = require('../models/islandModel')
const crypto = require('crypto')

const createIsland = async (req, res) => {
    try {
        const { name_island } = req.body

        const tokenRandom = crypto.randomBytes(5).toString('hex')

        const newIsland = new islandModel({
            island_id: tokenRandom,
            name_island,
        })

        await newIsland.save()
        return res.json({ status: 200, message: 'Berhasil tambah data!' })

    } catch (error) {
        return res.json({ status: 500, message: 'Proses gagal!', error: error });
    }
}

const getAllIsland = async (req, res) => {
    try {

        const existIsland = await islandModel.find()
        
        if(!islandModel) return res.json({ status: 404, message: 'Data belum ada!' })

        return res.json({ status: 200, message: 'Berhasil ambil data', data: existIsland })

    } catch (error) {
        return res.json({ status: 500, message: 'Proses gagal!', error: error });
    }
}

const updateIsland = async (req, res) => {
    try {
        const { island_id } = req.params; 
        const newData = req.body; 
    
        const updatedData = await islandModel.findByIdAndUpdate(island_id, newData, { new: true });
    
        if (!updatedData) {
          return res.status(404).json({ message: 'Data tidakada!' });
        }
    
        return res.json({ status: 200, message: 'Berhasil perbarui data!' });
   
    } catch (error) {
        return res.json({ status: 500, message: 'Proses gagal!', error: error });
    }
}

const removeIsland = async (req, res) => {
    try {
        
        const { island_id } = req.params

        const existIsland = await islandModel.findOneAndDelete({ island_id })
        if(!existIsland) return res.json({ status: 404, message: 'Data tidak ada!' })
        
        return res.json({ status: 200, message: 'Berhasil hapus data!', data: existIsland })

    } catch (error) {
        return res.json({ status: 500, message: 'Proses gagal!', error: error });
    }
}

module.exports = {
    createIsland,
    updateIsland,
    removeIsland,
    getAllIsland,
}