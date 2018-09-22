require('dotenv').config();
const express = require('express');
const app = express();
const logger = require('morgan');
const mongoose = require('mongoose');

const checkAuth = require('./api/auth/checkAuth');
const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
const userRoutes = require('./api/routes/user');

mongoose.set('useCreateIndex', true);
mongoose.connect(
  `mongodb+srv://node_shop:${
    process.env.MONGO_ATLAS_PW
  }@node-rest-shop-4ezzq.mongodb.net/test?retryWrites=true`,
  { useNewUrlParser: true }
);
mongoose.Promise = global.Promise;

app.use(logger('dev'));
app.use('/uploads', express.static('uploads'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});

app.use('/products', productRoutes);
app.use('/orders', checkAuth, orderRoutes);
app.use('/user', userRoutes);

app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
