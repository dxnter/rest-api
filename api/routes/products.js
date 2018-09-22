const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/checkAuth');
const upload = require('../utils/multer.config');

const Product = require('../models/product');
const ProductController = require('../controllers/products');

router.get('/', ProductController.getAllProducts);

router.post(
  '/',
  checkAuth,
  upload.single('productImage'),
  ProductController.createProduct
);

router.get('/:productId', ProductController.getSingleProduct);

router.patch('/:productId', checkAuth, ProductController.updateProduct);

router.delete('/:productId', checkAuth, ProductController.deleteProduct);

module.exports = router;
