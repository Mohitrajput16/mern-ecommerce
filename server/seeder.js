// server/seeder.js (Corrected Version)
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import users from './data/users.js';
import products from './data/products.js';
import User from './models/userModel.js';
import Product from './models/productModel.js';
import Order from './models/orderModel.js'; // We will add this later
import connectDB from './config/db.js';

dotenv.config();
connectDB();

const importData = async () => {
  try {
    // Clear collections first
    await Product.deleteMany();
    await User.deleteMany();
    await Order.deleteMany();
    // Insert users
    const createdUsers = await User.insertMany(users);

    // Get the admin user's ID
    const adminUser = createdUsers[0]._id;

    // Add the admin user's ID to all products
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    // Insert products
    await Product.insertMany(sampleProducts);

    console.log('Data Imported! 👍');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    // Clear collections
    await Product.deleteMany();
    await User.deleteMany();
    await Order.deleteMany();

    console.log('Data Destroyed! 💀');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Check command line arguments
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}