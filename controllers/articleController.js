const articleModel = require('../models/articleModel')
const crypto = require('crypto')

const createArticle = async (req, res) => {
    try {
        const { name_article, description, content } = req.body

        const tokenRandom = crypto.randomBytes(5).toString('hex')

        const newArticle = new articleModel({
            article_id: tokenRandom,
            name_article,
            content,
            description,
        })

        await newArticle.save()
        return res.json({ status: 200, message: 'Berhasil Tambah Wisata!' })

    } catch (error) {
        return res.json({ status: 500, message: 'Proses gagal!', error: error });
    }
}

const getAllArticle = async (req, res) => {
    try {

        const existArticle = await articleModel.find()
        
        if(!articleModel) return res.json({ status: 404, message: 'Data belum ada!' })

        return res.json({ status: 200, message: 'Berhasil ambil data', data: existArticle })

    } catch (error) {
        return res.json({ status: 500, message: 'Proses gagal!', error: error });
    }
}

const updateArticle = async (req, res) => {
    try {
        const { article_id } = req.params
        const { name_article, content, description } = req.body

        const existArticle = await articleModel.findOne({ article_id })
        if(!existArticle) return res.json({ status: 404, message: 'Data tidak ada!' })

        existArticle.name_article = name_article
        existArticle.content = content
        existArticle.description = description
        existArticle.save()
    
        return res.json({ status: 200, message: 'Berhasil perbarui data!' });
   
    } catch (error) {
        return res.json({ status: 500, message: 'Proses gagal!', error: error });
    }
}

const removeArticle = async (req, res) => {
    try {
        
        const { article_id } = req.params

        const existArticle = await articleModel.findOneAndDelete({ article_id })
        if(!existArticle) return res.json({ status: 404, message: 'Data tidak ada!' })
        
        return res.json({ status: 200, message: 'Berhasil hapus data!', data: existArticle })

    } catch (error) {
        return res.json({ status: 500, message: 'Proses gagal!', error: error });
    }
}

module.exports = {
    createArticle,
    updateArticle,
    removeArticle,
    getAllArticle,
}