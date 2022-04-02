const router = require('express').Router();

const Product = require('../models/product.models');
const authenticate = require('../middlewares/authenticate');

router.post('/', authenticate, async (req, res) => {
  try {
    const product = await Product.create(req.body);
    return res.status(201).send({ product });
  } catch (err) {
    return res.status(500).send({ err: err.message });
  }
});

router.patch('/:id', authenticate, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    return res.status(201).send({ product });
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