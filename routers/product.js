const express = require('express')
const auth = require('../middleware/auth')
const Product = require('../models/product')
const router = new express.Router()

router.post('/products', auth, async (req, res) => {
    const product = new Product({
        ...req.body,
        owner: req.user._id
    })

    try {
        await product.save()
        res.status(201).send(product)
    } catch (e) {
        res.status(400).send(e)
    }
})
   
router.get('/products/:id', auth, async (req, res) => {
    const _id = req.params.id

    try {
        const product = await Product.findOne({ _id, owner: req.user._id })

        if (!product) {
            return res.status(404).send()
        }

        res.send(product)
    } catch (e) {
        res.status(500).send()
    }
})
module.exports = router