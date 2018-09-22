const express = require('express');
const router = express.Router();

const OrdersController = require('../controllers/orders');

router.get('/', OrdersController.getAllOrders);

router.post('/', OrdersController.createOrder);

router.get('/:orderId', OrdersController.getSingleOrder);

router.delete('/:orderId', OrdersController.deleteOrder);

module.exports = router;
