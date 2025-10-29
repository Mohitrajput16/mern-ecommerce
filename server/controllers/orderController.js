// server/controllers/orderController.js
import Order from '../models/orderModel.js';


// @desc    Create a new order
// @route   POST /api/orders
// @access  Private
const createOrder = async (req, res) => {
  // Get the data from the request body
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    totalPrice,
  } = req.body;

  if (!orderItems || orderItems.length === 0) {
    res.status(400).json({ message: 'No order items' });
    return;
  }

  try {
    const order = new Order({
      orderItems: orderItems.map(item => ({
        ...item,
        product: item._id, // Map frontend _id to product field
        _id: undefined // Remove _id from orderItems
      })),
      user: req.user._id, // Get user ID from the 'protect' middleware
      shippingAddress,
      paymentMethod,
      totalPrice,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
const getOrderById = async (req, res) => {
  try {
    // Find the order by its ID from the URL params
    // 'populate' will replace the 'user' ID with the user's 'name' and 'email'
    const order = await Order.findById(req.params.id).populate(
      'user',
      'name email'
    );

    if (order) {
      // Optional: Check if the user is an admin OR if the order belongs to them
      // For now, we'll just return it if found
      // (A more secure check would be: if (order.user._id.toString() !== req.user._id.toString() && !req.user.isAdmin))
      res.json(order);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export { createOrder, getOrderById };