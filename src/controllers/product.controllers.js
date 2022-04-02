const router = require('express').Router();

const Product = require('../models/product.models');
const authenticate = require('../middlewares/authenticate');
const authorize = require('../middlewares/authorize');

router.post('/', authenticate, async (req, res) => {
  try {
    const product = await Product.create(req.body);
    return res.status(201).send({ product });
  } catch (err) {
    return res.status(500).send({ err: err.message });
  }
});

router.patch('/:id', authenticate, authorize(['admin', 'seller']), async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);
    // checking to avoid other seller to edit the product of anothe seller
    if (req.user.id !== product.userId) {
      return res.status(401).send({ err: "unauthorised access" });
    }
    const productToUpd = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    return res.status(201).send({ productToUpd });
  } catch (err) {
    return res.status(500).send({ err: err.message });
  }
});

router.delete('/:id', authenticate, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    return res.status(201).send({ product });
  } catch (err) {
    return res.status(500).send({ err: err.message });
  }
});

module.exports = router;