const express = require('express');

const connectDB = require('./configs/db');
const authRouter = require('./controllers/auth.controllers');
const productRouter = require('./controllers/product.controllers');

const app = express();
const PORT = 8000;

require('dotenv').config();

app.use(express.json());

app.use('/users', authRouter);
app.use('/products', productRouter);

connectDB();

app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});