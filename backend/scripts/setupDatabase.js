import { supabase } from '../config/supabase.js';

async function setupDatabase() {
  try {
    // Create artisans table
    console.log('Creating artisans table...');
    const { error: artisansError } = await supabase
      .from('artisans')
      .insert({
        name: 'Test Artisan',
        specialty: 'Test Specialty',
        location: 'Test Location',
        bio: 'Test Bio',
        image_url: 'https://example.com/test.jpg'
      });

    if (artisansError) {
      console.error('Error creating artisans table:', artisansError);
      return;
    }

    // Get the created artisan's ID
    const { data: artisan, error: artisanError } = await supabase
      .from('artisans')
      .select('id')
      .eq('name', 'Test Artisan')
      .single();

    if (artisanError) {
      console.error('Error getting artisan ID:', artisanError);
      return;
    }

    // Create products table with a test product
    console.log('Creating products table...');
    const { error: productsError } = await supabase
      .from('products')
      .insert({
        name: 'Test Product',
        description: 'Test Description',
        price: 99.99,
        category: 'Test Category',
        artisan_id: artisan.id,
        image_url: 'https://example.com/test-product.jpg',
        stock: 10
      });

    if (productsError) {
      console.error('Error creating products table:', productsError);
      return;
    }

    // Clean up test data
    console.log('Cleaning up test data...');
    const { error: deleteProductsError } = await supabase
      .from('products')
      .delete()
      .eq('name', 'Test Product');

    if (deleteProductsError) {
      console.error('Error deleting test product:', deleteProductsError);
    }

    const { error: deleteArtisanError } = await supabase
      .from('artisans')
      .delete()
      .eq('name', 'Test Artisan');

    if (deleteArtisanError) {
      console.error('Error deleting test artisan:', deleteArtisanError);
    }

    console.log('Database setup completed successfully');
  } catch (error) {
    console.error('Error setting up database:', error);
  }
}

setupDatabase(); 