const contactModel = require('../models/contactModel')
const crypto = require('crypto')

const createContact = async (req, res) => {
    try {
        const { name_contact, number } = req.body

        const tokenRandom = crypto.randomBytes(5).toString('hex')

        const newContact = new contactModel({
            contact_id: tokenRandom,
            name_contact,
            number
        })

        await newContact.save()
        return res.json({ status: 200, message: 'Berhasil tambah data!' })

    } catch (error) {
        return res.json({ status: 500, message: 'Proses gagal!', error: error });
    }
}

const getAllContact = async (req, res) => {
    try {

        const existContact = await contactModel.find()
        
        if(!contactModel) return res.json({ status: 404, message: 'Data belum ada!' })

        return res.json({ status: 200, message: 'Berhasil ambil data', data: existContact })

    } catch (error) {
        return res.json({ status: 500, message: 'Proses gagal!', error: error });
    }
}

const updateContact = async (req, res) => {
    try {
        const { contact_id } = req.params
        const { name_contact, number } = req.body

        const existContact = await contactModel.findOne({ contact_id })
        if(!existContact) return res.json({ status: 404, message: 'Data tidak ada!' })

        existContact.name_contact = name_contact
        existContact.number = number
        existContact.save()
    
        return res.json({ status: 200, message: 'Berhasil perbarui data!' });
   
    } catch (error) {
        return res.json({ status: 500, message: 'Proses gagal!', error: error });
    }
}

const removeContact = async (req, res) => {
    try {
        
        const { contact_id } = req.params

        const existContact = await contactModel.findOneAndDelete({ contact_id })
        if(!existContact) return res.json({ status: 404, message: 'Data tidak ada!' })
        
        return res.json({ status: 200, message: 'Berhasil hapus data!', data: existContact })

    } catch (error) {
        return res.json({ status: 500, message: 'Proses gagal!', error: error });
    }
}

module.exports = {
    createContact,
    updateContact,
    removeContact,
    getAllContact,
}