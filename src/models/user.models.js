const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: [{ type: String }],
}, {
  versionKey: false,
  timestamps: true
});

userSchema.pre('save', function (next) {
  const hashPswd = bycrypt.hashSync(this.password, 4);
  this.password = hashPswd;
  next();
});

userSchema.methods.verifyPassword = function (password) {
  return bycrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('user', userSchema);