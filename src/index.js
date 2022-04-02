const express = require('express');

const connectDB = require('./configs/db');
const authRouter = require('./controllers/auth.controllers');
const productRouter = require('./controllers/product.controllers');
const passport = require('./configs/oauth-google');

const app = express();
const PORT = 8000;

require('dotenv').config();

app.use(express.json());

app.use('/users', authRouter);
app.use('/products', productRouter);

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login', session: false }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

connectDB();

app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});