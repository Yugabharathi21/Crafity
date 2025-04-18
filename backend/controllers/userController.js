import asyncHandler from 'express-async-handler';
import { getUserById, updateUserProfile, getUserProfile, createUserProfile } from '../models/userModel.js';
import { supabase } from '../config/supabaseClient.js';

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const { data: { user }, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    res.status(401);
    throw new Error('Invalid email or password');
  }

  const profile = await getUserProfile(user.id);

  if (profile) {
    res.json({
      id: user.id,
      email: user.email,
      ...profile,
    });
  } else {
    res.status(404);
    throw new Error('User profile not found');
  }
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { email, password, full_name, phone, address, is_artisan } = req.body;

  const { data: { user }, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    res.status(400);
    throw new Error(error.message);
  }

  const profile = await createUserProfile({
    id: user.id,
    full_name,
    phone,
    address,
    is_artisan: is_artisan || false,
  });

  if (profile) {
    res.status(201).json({
      id: user.id,
      email: user.email,
      ...profile,
    });
  } else {
    res.status(400);
    throw new Error('Failed to create user profile');
  }
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfileHandler = asyncHandler(async (req, res) => {
  const profile = await getUserProfile(req.user.id);

  if (profile) {
    res.json({
      id: req.user.id,
      email: req.user.email,
      ...profile,
    });
  } else {
    res.status(404);
    throw new Error('User profile not found');
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfileHandler = asyncHandler(async (req, res) => {
  const { full_name, phone, address, avatar_url, is_artisan } = req.body;

  const updatedProfile = await updateUserProfile(req.user.id, {
    full_name,
    phone,
    address,
    avatar_url,
    is_artisan,
  });

  if (updatedProfile) {
    res.json({
      id: req.user.id,
      email: req.user.email,
      ...updatedProfile,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

export { authUser, registerUser, getUserProfileHandler as getUserProfile, updateUserProfileHandler as updateUserProfile };