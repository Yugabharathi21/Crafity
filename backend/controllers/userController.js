import asyncHandler from 'express-async-handler';
import { getUserById, updateUserProfile, getUserProfile, createUserProfile } from '../models/userModel.js';
import { supabase } from '../config/supabaseClient.js';
import logger from '../utils/logger.js';

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  logger.auth('Login attempt', { email });

  try {
    const { data: { user }, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      logger.error('Login failed', error);
      res.status(401);
      throw new Error('Invalid email or password');
    }

    logger.auth('User authenticated successfully', { userId: user.id });
    const profile = await getUserProfile(user.id);

    if (profile) {
      logger.success('Profile retrieved for authenticated user', profile);
      res.json({
        id: user.id,
        email: user.email,
        ...profile,
      });
    } else {
      logger.error('Profile not found for authenticated user', { userId: user.id });
      res.status(404);
      throw new Error('User profile not found');
    }
  } catch (error) {
    logger.error('Authentication error', error);
    throw error;
  }
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { email, password, full_name, phone, address, is_artisan } = req.body;
  logger.auth('Registration attempt', { email, full_name });

  try {
    const { data: { user }, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      logger.error('Registration failed', error);
      res.status(400);
      throw new Error(error.message);
    }

    logger.auth('User registered successfully', { userId: user.id });

    const profileData = {
      id: user.id,
      full_name,
      phone,
      address,
      is_artisan: is_artisan || false,
      created_at: new Date().toISOString()
    };

    logger.debug('Creating user profile', profileData);
    const profile = await createUserProfile(profileData);

    if (profile) {
      logger.success('Profile created for new user', profile);
      res.status(201).json({
        id: user.id,
        email: user.email,
        ...profile,
      });
    } else {
      logger.error('Failed to create profile for new user', { userId: user.id });
      res.status(400);
      throw new Error('Failed to create user profile');
    }
  } catch (error) {
    logger.error('Registration error', error);
    throw error;
  }
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfileHandler = asyncHandler(async (req, res) => {
  logger.auth('Fetching user profile', { userId: req.user.id });

  try {
    const profile = await getUserProfile(req.user.id);

    if (profile) {
      logger.success('Profile retrieved successfully', profile);
      res.json({
        id: req.user.id,
        email: req.user.email,
        ...profile,
      });
    } else {
      logger.error('Profile not found', { userId: req.user.id });
      res.status(404);
      throw new Error('User profile not found');
    }
  } catch (error) {
    logger.error('Error fetching profile', error);
    throw error;
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfileHandler = asyncHandler(async (req, res) => {
  const { full_name, phone, address, avatar_url, is_artisan } = req.body;
  logger.auth('Updating user profile', { userId: req.user.id, updates: req.body });

  try {
    const updatedProfile = await updateUserProfile(req.user.id, {
      full_name,
      phone,
      address,
      avatar_url,
      is_artisan,
    });

    if (updatedProfile) {
      logger.success('Profile updated successfully', updatedProfile);
      res.json({
        id: req.user.id,
        email: req.user.email,
        ...updatedProfile,
      });
    } else {
      logger.error('Profile update failed', { userId: req.user.id });
      res.status(404);
      throw new Error('User not found');
    }
  } catch (error) {
    logger.error('Error updating profile', error);
    throw error;
  }
});

export { authUser, registerUser, getUserProfileHandler as getUserProfile, updateUserProfileHandler as updateUserProfile };