const Product = require('../models/ProductModel.js');
const User = require('../models/UserModel.js');
const { Op } = require('sequelize');

const getProducts = async (req, res) => {
    try {
        const response = await Product.findAll({
            attributes: ['uuid', 'name', 'price', 'satuan', 'createdAt'],
            where: {
                userId: req.userId
            },
            include: [{
                model: User,
                attributes: ['name', 'email']
            }],
            order: [['id', 'DESC']]
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

const getProductById = async (req, res) => {
    try {
        const product = await Product.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!product) return res.status(404).json({ msg: "Data tidak ditemukan" });

        const response = await Product.findOne({
            attributes: ['uuid', 'name', 'price', 'satuan', 'createdAt'],
            where: {
                [Op.and]: [{ id: product.id }, { userId: req.userId }]
            },
            include: [{
                model: User,
                attributes: ['name', 'email']
            }],
            order: [['id', 'DESC']]
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

const createProduct = async (req, res) => {
    const { name, price, satuan } = req.body;
    try {
        await Product.create({
            name,
            price,
            satuan,
            userId: req.userId
        });
        res.status(201).json({ msg: "Product Created Successfully" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

const updateProduct = async (req, res) => {
    try {
        const product = await Product.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!product) return res.status(404).json({ msg: "Data tidak ditemukan" });
        const { name, price, satuan } = req.body;
        if (req.userId !== product.userId) return res.status(401).json({ msg: "Unauthorized access" });
        await Product.update({ name, price, satuan }, {
            where: {
                [Op.and]: [{ id: product.id }, { userId: req.userId }]
            }
        });
        res.status(200).json({ msg: "Product updated successfully" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if (!product) return res.status(404).json({ msg: "Data tidak ditemukan" });
        if (req.userId !== product.userId) return res.status(401).json({ msg: "Unauthorized access" });
        await Product.destroy({
            where: {
                [Op.and]: [{ id: product.id }, { userId: req.userId }]
            }
        });
        res.status(200).json({ msg: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};
