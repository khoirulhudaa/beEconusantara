const EventModel = require('../models/eventModel')
const crypto = require('crypto')
const cloudinary = require('cloudinary').v2

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const createEvent = async (req, res) => {
    try {
        const { name_event, description, content } = req.body

        const tokenRandom = crypto.randomBytes(5).toString('hex')
        
        let thumbnailNameCloud = null
        let thumbnail = null 

        if (req.file) {
            const originalName = req.file.originalname;
            const randomChars = crypto.randomBytes(4).toString('hex');
            thumbnailNameCloud = `${randomChars}_${originalName}`;
         
            // Menggunakan Promise untuk menunggu selesainya upload ke Cloudinary
            await new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream({ public_id: thumbnailNameCloud }, (error, result) => {
                    if (error) {
                        console.error('Cloudinary upload error:', error);
                        reject(error);
                    } else {
                        console.log('cloud result:', result);
                        thumbnail = result.secure_url;
                        resolve();
                    }
                }).end(req.file.buffer);
            });
        } else {
            return res.json({ status: 403, message: 'Harus ada thumbnail!' })
        }

        const newEvent = new EventModel({
            event_id: tokenRandom,
            name_event,
            content,
            description,
            thumbnail,
        })

        await newEvent.save()
        return res.json({ status: 200, message: 'Berhasil Tambah Wisata!' })

    } catch (error) {
        return res.json({ status: 500, message: 'Proses gagal!', error: error });
    }
}

const getAllEvent = async (req, res) => {
    try {

        const existEvent = await EventModel.find()
        
        if(!EventModel) return res.json({ status: 404, message: 'Data belum ada!' })

        return res.json({ status: 200, message: 'Berhasil ambil data', data: existEvent })

    } catch (error) {
        return res.json({ status: 500, message: 'Proses gagal!', error: error });
    }
}

const updateEvent = async (req, res) => {
    try {
        const { event_id } = req.params
        const { name_event, content, description } = req.body

        console.log(req.body)

        const existEvent = await EventModel.findOne({ event_id })
        if(!existEvent) return res.json({ status: 404, message: 'Data tidak ada!' })

        let thumbnail = null;

        if (req.file) {
            const originalName = req.file.originalname;
            const randomChars = crypto.randomBytes(4).toString('hex');
            thumbnail = `${randomChars}_${originalName}`;

            try {
                if(existEvent.thumbnail !== 'default.jpg') {
                    await cloudinary.uploader.destroy(existEvent.thumbnail);
                }
                await new Promise((resolve, reject) => {
                    cloudinary.uploader.upload_stream({ public_id: thumbnail }, (error, result) => {
                        if (error) {
                            console.error('Cloudinary upload error:', error);
                            reject(error);
                        } else {
                            console.log('cloud result:', result);
                            thumbnail = result.secure_url;
                            resolve();
                        }
                    }).end(req.file.buffer);
                });
            } catch (cloudinaryError) {
                console.error('Cloudinary upload error:', cloudinaryError);
                return res.json({ status: 500, message: 'Failed to update Group due to Cloudinary error!' });
            }
        }

        const updateFields = { name_event, description, content };
        if (thumbnail !== null) {
            updateFields.thumbnail = thumbnail;
        }

        const updateEvent = await EventModel.findOneAndUpdate(
            { event_id },
            { $set: updateFields },
            { new: true }
        );

        if (!updateEvent) {
            return res.json({ status: 500, message: 'Gagal perbarui acara!!' });
        }
    
        return res.json({ status: 200, message: 'Berhasil perbarui data!' });
   
    } catch (error) {
        return res.json({ status: 500, message: 'Proses gagal!', error: error });
    }
}

const removeEvent = async (req, res) => {
    try {
        
        const { event_id } = req.params

        const existEvent = await EventModel.findOneAndDelete({ event_id })
        if(!existEvent) return res.json({ status: 404, message: 'Data tidak ada!' })
        
        return res.json({ status: 200, message: 'Berhasil hapus data!', data: existEvent })

    } catch (error) {
        return res.json({ status: 500, message: 'Proses gagal!', error: error });
    }
}

module.exports = {
    createEvent,
    updateEvent,
    removeEvent,
    getAllEvent,
}