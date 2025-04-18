import { supabase } from '../config/supabase.js';

async function dropTables() {
  try {
    // First, delete all records from products table
    console.log('Deleting all products...');
    const { error: deleteProductsError } = await supabase
      .from('products')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all records

    if (deleteProductsError) {
      console.error('Error deleting products:', deleteProductsError);
    } else {
      console.log('Products deleted successfully');
    }

    // Then, delete all records from artisans table
    console.log('Deleting all artisans...');
    const { error: deleteArtisansError } = await supabase
      .from('artisans')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all records

    if (deleteArtisansError) {
      console.error('Error deleting artisans:', deleteArtisansError);
    } else {
      console.log('Artisans deleted successfully');
    }

    console.log('All records deleted successfully');
  } catch (error) {
    console.error('Error:', error);
  }
}

dropTables(); 