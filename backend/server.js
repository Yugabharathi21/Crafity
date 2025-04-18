import dotenv from 'dotenv';
dotenv.config({ path: './backend/.env' });

console.log('Environment Variables:', {
  SUPABASE_URL: process.env.VITE_SUPABASE_URL,
  SUPABASE_ANON_KEY: process.env.VITE_SUPABASE_ANON_KEY ? 'exists' : 'missing',
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT
});

import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { supabase, supabaseAdmin } from './config/supabaseClient.js';
import userRoutes from './routes/userRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';

const app = express();

// CORS configuration
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Create uploads directory if it doesn't exist
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDir = path.join(__dirname, '../uploads');

import fs from 'fs';
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Auth routes
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { email, password, full_name } = req.body;
    
    console.log('Signup attempt for:', email);
    
    if (!email || !password || !full_name) {
      console.log('Missing required fields:', { email: !!email, password: !!password, full_name: !!full_name });
      return res.status(400).json({ error: 'Please provide all required fields' });
    }

    // First, try to sign up the user with Supabase auth
    console.log('Attempting Supabase auth signup...');
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name,
        },
      },
    });

    if (authError) {
      console.error('Supabase auth signup error:', authError);
      throw authError;
    }

    console.log('Auth signup successful, user:', authData.user?.id);

    // If auth signup was successful, create the profile
    if (authData.user) {
      const profileData = {
        id: authData.user.id,
        full_name,
        is_artisan: false,
        created_at: new Date().toISOString(),
      };

      console.log('Creating user profile with data:', profileData);

      // First check if profile already exists
      const { data: existingProfile } = await supabaseAdmin
        .from('profiles')
        .select('*')
        .eq('id', authData.user.id)
        .single();

      if (existingProfile) {
        console.log('Profile already exists:', existingProfile);
        return res.json({
          message: 'Please check your email for verification link',
          user: authData.user,
          profile: existingProfile
        });
      }

      const { data: newProfile, error: profileError } = await supabaseAdmin
        .from('profiles')
        .insert([profileData])
        .select('*')
        .single();

      if (profileError) {
        console.error('Profile creation error details:', {
          message: profileError.message,
          details: profileError.details,
          hint: profileError.hint,
          code: profileError.code
        });
        throw profileError;
      }
      
      console.log('Profile created successfully:', newProfile);

      return res.json({
        message: 'Please check your email for verification link',
        user: authData.user,
        profile: newProfile
      });
    }

    res.json({
      message: 'Please check your email for verification link',
      user: authData.user,
    });
  } catch (error) {
    console.error('Signup process error details:', {
      message: error.message,
      details: error.details,
      hint: error.hint,
      code: error.code
    });
    res.status(500).json({ 
      error: error.message,
      details: error.details || error.hint || 'No additional details available'
    });
  }
});

app.post('/api/auth/signin', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/auth/signout', async (req, res) => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    res.json({ message: 'Signed out successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Routes
app.use('/api/users', userRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Error Middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});