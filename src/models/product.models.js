const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: String, required: true },
  userId: {
    type: mongoose.Types.ObjectId,
    ref: 'user'
  }
}, {
  versionKey: false,
  timestamps: true
});

module.exports = mongoose.model('product', productSchema);