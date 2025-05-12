import bcrypt from 'bcryptjs';
import User from './models/userModel.js';
import connectDB from './config/db.js';
import dotenv from 'dotenv';

dotenv.config();

const seedUser = async () => {
  try {
    await connectDB();

    // Clear existing users
    await User.deleteMany({});

    // Create sample user
    const hashedPassword = await bcrypt.hash('Craftify123!', 10);
    const user = await User.create({
      name: 'Craftify Demo',
      email: 'demo@craftify.com',
      password: hashedPassword,
      isAdmin: false,
    });

    console.log('Sample user created:', user.email);
    process.exit();
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

seedUser();