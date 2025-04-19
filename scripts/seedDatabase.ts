import { seedProducts } from '../src/utils/seedProducts.js';

const seedDatabase = async () => {
  try {
    console.log('Starting database seeding...');
    
    // Seed products
    await seedProducts();
    
    console.log('Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase(); 