import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/userModel.js';
import Product from './models/productModel.js';

dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const importData = async () => {
  try {
    // Clear existing data
    await User.deleteMany();
    await Product.deleteMany();

    // Create sample users
    const artisan1 = await User.create({
      name: 'Maria Gonzalez',
      email: 'maria@example.com',
      password: 'password123',
      isArtisan: true,
      specialty: 'Pottery',
      location: 'Santa Fe, NM',
      bio: 'Maria has been creating pottery for over 20 years, drawing inspiration from her cultural heritage and natural surroundings.',
      profileImage: 'https://images.unsplash.com/photo-1556760544-74068565f05c'
    });

    const artisan2 = await User.create({
      name: 'James Wilson',
      email: 'james@example.com',
      password: 'password123',
      isArtisan: true,
      specialty: 'Woodworking',
      location: 'Portland, OR',
      bio: 'James creates sustainable wooden furniture and home goods using traditional techniques passed down through generations.',
      profileImage: 'https://images.unsplash.com/photo-1572863141204-83031c77e65a'
    });

    // Create sample products
    const products = [
      {
        name: 'Hand-carved Wooden Bowl',
        price: 89.99,
        image: 'https://images.unsplash.com/photo-1635983495219-8256f1e4a663',
        category: 'Woodwork',
        description: 'Beautiful hand-carved wooden bowl made from sustainable hardwood.',
        countInStock: 10,
        artisan: artisan2._id,
        rating: 4.8,
        numReviews: 12,
        featured: true
      },
      {
        name: 'Ceramic Vase Set',
        price: 129.99,
        image: 'https://images.unsplash.com/photo-1612196808214-b7e239e5f5a5',
        category: 'Pottery',
        description: 'Set of three handcrafted ceramic vases with unique glazing.',
        countInStock: 8,
        artisan: artisan1._id,
        rating: 4.9,
        numReviews: 8,
        featured: true
      },
      {
        name: 'Handcrafted Ceramic Planter',
        price: 45.99,
        image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411',
        category: 'Pottery',
        description: 'Modern ceramic planter perfect for indoor plants.',
        countInStock: 15,
        artisan: artisan1._id,
        rating: 4.7,
        numReviews: 6,
        featured: false
      }
    ];

    await Product.insertMany(products);

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

connectDB().then(() => {
  importData();
});