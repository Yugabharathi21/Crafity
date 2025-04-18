import { supabase } from '../config/supabaseClient.js';

// Get all products
export const getProducts = async (category = null) => {
  let query = supabase.from('products').select('*, artisans(*)');
  
  if (category && category !== 'all') {
    query = query.eq('category', category);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data;
};

// Get product by ID
export const getProductById = async (id) => {
  const { data, error } = await supabase
    .from('products')
    .select('*, artisans(*)')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
};

// Create new product
export const createProduct = async (productData) => {
  const { data, error } = await supabase
    .from('products')
    .insert([productData])
    .select()
    .single();

  if (error) throw error;
  return data;
};

// Update product
export const updateProduct = async (id, productData) => {
  const { data, error } = await supabase
    .from('products')
    .update(productData)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

// Delete product
export const deleteProduct = async (id) => {
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id);

  if (error) throw error;
  return true;
};

// Get products by artisan ID
export const getProductsByArtisan = async (artisanId) => {
  const { data, error } = await supabase
    .from('products')
    .select('*, artisans(*)')
    .eq('artisan_id', artisanId);

  if (error) throw error;
  return data;
};

export default {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsByArtisan
}; 