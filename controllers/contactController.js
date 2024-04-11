const contactModel = require('../models/contactModel')
const crypto = require('crypto')
const cloudinary = require('cloudinary').v2

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const createContact = async (req, res) => {
    try {
        const { name_contact, number } = req.body

        const tokenRandom = crypto.randomBytes(5).toString('hex')

        let photoNameCloud = null
        let photo = null 

        if (req.file) {
            const originalName = req.file.originalname;
            const randomChars = crypto.randomBytes(4).toString('hex');
            photoNameCloud = `${randomChars}_${originalName}`;
         
            // Menggunakan Promise untuk menunggu selesainya upload ke Cloudinary
            await new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream({ public_id: photoNameCloud }, (error, result) => {
                    if (error) {
                        console.error('Cloudinary upload error:', error);
                        reject(error);
                    } else {
                        console.log('cloud result:', result);
                        photo = result.secure_url;
                        resolve();
                    }
                }).end(req.file.buffer);
            });
        } else {
            photo = 'default.jpg'
        }

        const dataGroup = {
            contact_id: tokenRandom,
            name_contact,
            photo,
            number
        }

        const contact = new contactModel(dataGroup)
        const result = await contact.save()
        
        if(result) {
            return res.json({ status: 200, message: 'Berhasil tambah data!', data: dataGroup })
        }

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

        let photo = 'default.jpg';

        if (req.file) {
            const originalName = req.file.originalname;
            const randomChars = crypto.randomBytes(4).toString('hex');
            photo = `${randomChars}_${originalName}`;

            try {
                if(existContact.photo !== 'default.jpg') {
                    await cloudinary.uploader.destroy(existContact.photo);
                }
                await new Promise((resolve, reject) => {
                    cloudinary.uploader.upload_stream({ public_id: photo }, (error, result) => {
                        if (error) {
                            console.error('Cloudinary upload error:', error);
                            reject(error);
                        } else {
                            console.log('cloud result:', result);
                            photo = result.secure_url;
                            resolve();
                        }
                    }).end(req.file.buffer);
                });
            } catch (cloudinaryError) {
                console.error('Cloudinary upload error:', cloudinaryError);
                return res.json({ status: 500, message: 'Failed to update Group due to Cloudinary error!' });
            }
        }

        const updateFields = { name_contact, number };
        if (photo) {
            updateFields.photo = photo;
        }

        const updateGroup = await contactModel.findOneAndUpdate(
            { contact_id },
            { $set: updateFields },
            { new: true }
        );

        if (!updateGroup) {
            return res.json({ status: 500, message: 'Failed to update Group in the database!' });
        }

        const resultNew = await contactModel.findOne({ contact_id })

        return res.json({ status: 200, message: 'Berhasil perbarui data!', data: resultNew });
   
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