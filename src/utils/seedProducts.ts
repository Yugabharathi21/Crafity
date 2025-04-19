import { supabase } from '../lib/supabaseAdmin.js';

export async function seedProducts() {
  const products = [
    {
      id: '550e8400-e29b-41d4-a716-446655440000',
      name: 'Modern Coffee Table',
      description: 'Sleek and minimalist coffee table perfect for contemporary living rooms',
      price: 299.99,
      category: 'furniture',
      image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c'
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440001',
      name: 'Ergonomic Office Chair',
      description: 'High-quality office chair with lumbar support and adjustable features',
      price: 249.99,
      category: 'furniture',
      image: 'https://images.unsplash.com/photo-1505797149-0f7372c1c5c0'
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440002',
      name: 'Wooden Dining Table',
      description: 'Solid wood dining table that seats 6-8 people comfortably',
      price: 599.99,
      category: 'furniture',
      image: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf'
    }
  ];

  // Check if products already exist
  const { data: existingProducts, error: checkError } = await supabase
    .from('products')
    .select('id');

  if (checkError) {
    throw new Error(`Error checking existing products: ${checkError.message}`);
  }

  if (existingProducts && existingProducts.length > 0) {
    console.log('Products already seeded');
    return;
  }

  // Insert products
  const { error: insertError } = await supabase
    .from('products')
    .insert(products);

  if (insertError) {
    throw new Error(`Error inserting products: ${insertError.message}`);
  }

  console.log('Products seeded successfully');
}

// Run the seeding function
seedProducts(); 