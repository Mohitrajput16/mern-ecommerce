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
    // 2. Send Confirmation Email (Wrap in try-catch so it doesn't crash the order if email fails)
    try {
      await sendEmail({
        email: req.user.email, // User's email from the auth middleware
        subject: `Order Confirmation #${createdOrder._id}`,
        message: `
          <h1>Thank you for your order, ${req.user.name}!</h1>
          <p>We have received your order and are processing it.</p>
          <hr/>
          <h3>Order ID: ${createdOrder._id}</h3>
          <p><strong>Total Amount:</strong> $${totalPrice}</p>
          <p>You can view your order status in your profile.</p>
        `,
      });
      console.log(`Email sent to ${req.user.email}`);
    } catch (error) {
      console.error('Email could not be sent:', error);
      // We do NOT throw an error here, because the order WAS created successfully. 
      // We just log it so we know the email failed.
    }
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

const getOrders = async (req, res) => {
  // Populate user ID and name associated with the order
  const orders = await Order.find({}).populate('user', 'id name');
  res.json(orders);
};

// @desc    Update order to delivered
// @route   PUT /api/orders/:id/deliver
// @access  Private/Admin
const updateOrderToDelivered = async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
};
const updateOrderToCancelled = async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    // Check if it's already delivered
    if (order.isDelivered) {
      res.status(400);
      throw new Error('Cannot cancel an order that has explicitly been delivered');
    }

    order.isCancelled = true;
    order.cancelledAt = Date.now();

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
};
const getMyOrders = async (req, res) => {
  // Find orders where 'user' field matches the logged-in user's ID
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
};

// Export them
export { 
  createOrder, 
  getOrderById,
  getMyOrders, 
  updateOrderToCancelled,
  getOrders, // <-- Add
  updateOrderToDelivered // <-- Add
};