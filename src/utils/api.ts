import { supabase } from '../lib/supabase';

// Products
export const getProducts = async () => {
  const { data, error } = await supabase
    .from('products')
    .select('*, artisan:profiles(id, name)');
  
  if (error) throw error;
  return data;
};

export const getProductById = async (id: string) => {
  const { data, error } = await supabase
    .from('products')
    .select('*, artisan:profiles(id, name)')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
};

// Profile
export const updateProfile = async (profile: any) => {
  const { data, error } = await supabase
    .from('profiles')
    .update(profile)
    .eq('id', supabase.auth.getUser().then(({ data }) => data.user?.id))
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

// Orders
export const createOrder = async (orderData: any) => {
  const { data, error } = await supabase
    .from('orders')
    .insert([orderData])
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const getOrders = async () => {
  const { data, error } = await supabase
    .from('orders')
    .select('*, order_items(*, product:products(*))')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
};

// Storage
export const uploadImage = async (file: File) => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random()}.${fileExt}`;
  const filePath = `${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from('product-images')
    .upload(filePath, file);

  if (uploadError) throw uploadError;

  const { data } = supabase.storage
    .from('product-images')
    .getPublicUrl(filePath);

  return data.publicUrl;
};

export default {
  getProducts,
  getProductById,
  updateProfile,
  createOrder,
  getOrders,
  uploadImage,
};