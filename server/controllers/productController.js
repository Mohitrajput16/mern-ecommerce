// server/controllers/productController.js
import Product from '../models/productModel.js';

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
// server/controllers/productController.js

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getAllProducts = async (req, res) => {
  const pageSize = 6;
  const page = Number(req.query.pageNumber) || 1;

  // 1. Keyword Search
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {};

  // 2. Category Filter (exact match)
  const category = req.query.category 
    ? { category: req.query.category } 
    : {};

  // 3. Price Filter (range)
  const priceFilter = {};
  if (req.query.minPrice || req.query.maxPrice) {
    priceFilter.price = {
      $gte: Number(req.query.minPrice) || 0, // Greater than or equal
      $lte: Number(req.query.maxPrice) || 1000000, // Less than or equal
    };
  }

  // Combine all filters into one object
  const finalQuery = { ...keyword, ...category, ...priceFilter };

  const count = await Product.countDocuments(finalQuery);
  const products = await Product.find(finalQuery)
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ products, page, pages: Math.ceil(count / pageSize) });
};

// @desc    Fetch a single product by ID
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    // This catches invalid ObjectId errors as well
    res.status(404).json({ message: 'Product not found' });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      await product.deleteOne();
      res.json({ message: 'Product removed' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const createProduct = async (req, res) => {
  const product = new Product({
    name: 'Sample name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    brand: 'Sample brand',
    category: 'Sample category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample description',
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = async (req, res) => {
  const {
    name,
    price,
    description,
    image,
    brand,
    category,
    countInStock,
  } = req.body;

  console.log('1. Received Data:', req.body); // You already saw this

  const product = await Product.findById(req.params.id);

  if (product) {
    // Assign values
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    console.log('2. Product before save:', product); // Is the name changed here?

    try {
      const updatedProduct = await product.save();
      console.log('3. Save Successful:', updatedProduct); // Did Mongo confirm the save?
      res.json(updatedProduct);
    } catch (error) {
      console.error('4. Save FAILED:', error.message); // Did validation fail?
      res.status(400); // Bad request
      throw new Error(error.message);
    }
    
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
};

const getCategories = async (req, res) => {
  // .distinct() finds all unique values for the 'category' field
  const categories = await Product.find({}).distinct('category');
  res.json(categories);
};

// Export them at the bottom
export { 
  getAllProducts, 
  getProductById, 
  deleteProduct, 
  createProduct, // <-- Add
  updateProduct,
  getCategories  // <-- Add
};