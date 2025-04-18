import { supabase, supabaseAdmin } from '../config/supabaseClient.js';

// Get user by ID
export const getUserById = async (id) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
};

// Update user profile
export const updateUserProfile = async (id, userData) => {
  const { data, error } = await supabase
    .from('profiles')
    .update(userData)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

// Get user profile by auth ID
export const getUserProfile = async (authId) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', authId)
    .single();

  if (error) throw error;
  return data;
};

// Create new user profile
export const createUserProfile = async (profileData) => {
  const { data, error } = await supabaseAdmin
    .from('profiles')
    .insert([profileData])
    .select()
    .single();

  if (error) {
    console.error('Profile creation error details:', error);
    throw error;
  }
  return data;
};

export default {
  getUserById,
  updateUserProfile,
  getUserProfile,
  createUserProfile
}; 