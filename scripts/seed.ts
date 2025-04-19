import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from the root .env file using absolute path
const envPath = join(__dirname, '../.env');
console.log('Loading .env from:', envPath);
dotenv.config({ path: envPath });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE;

// Debug environment variables (without exposing the full key)
console.log('Environment variables loaded:', {
  url: supabaseUrl,
  hasServiceKey: !!supabaseServiceKey,
  serviceKeyPrefix: supabaseServiceKey?.slice(0, 10) + '...',
  fullKey: supabaseServiceKey // Temporarily log the full key for debugging
});

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing environment variables:', {
    url: supabaseUrl,
    hasServiceKey: !!supabaseServiceKey
  });
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

// First, let's check the table structure
async function checkTableStructure() {
  try {
    console.log('Checking table structure...');
    
    // Check artisans table
    const { data: artisansColumns, error: artisansError } = await supabase
      .from('artisans')
      .select('*')
      .limit(1);
      
    if (artisansError) {
      console.error('Error checking artisans table:', artisansError);
      return;
    }
    
    console.log('Artisans table structure:', artisansColumns);
    
    // Check products table
    const { data: productsColumns, error: productsError } = await supabase
      .from('products')
      .select('*')
      .limit(1);
      
    if (productsError) {
      console.error('Error checking products table:', productsError);
      return;
    }
    
    console.log('Products table structure:', productsColumns);
    
  } catch (error) {
    console.error('Error checking table structure:', error);
  }
}

// Updated artisan data to match the actual table structure
const artisans = [
  {
    id: 'a1b2c3d4-e5f6-4a5b-9c8d-7e6f5a4b3c2d',
    name: "Thomas Woodcraft",
    specialty: "Woodwork",
    location: "Portland, OR",
    bio: "Master woodworker with 20 years of experience",
    image_url: "https://images.unsplash.com/photo-1565849904461-04a58ad377e0"
  },
  {
    id: 'b2c3d4e5-f6a7-4b5c-8d9e-7f6a5b4c3d2e',
    name: "Elena Pottery",
    specialty: "Pottery",
    location: "Santa Fe, NM",
    bio: "Ceramic artist specializing in contemporary designs",
    image_url: "https://images.unsplash.com/photo-1556760544-74068565f05c"
  },
  {
    id: 'c3d4e5f6-a7b8-4c5d-9e0f-8a7b6c5d4e3f',
    name: "Mountain Textiles",
    specialty: "Textiles",
    location: "Asheville, NC",
    bio: "Family-owned textile workshop in the mountains",
    image_url: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8"
  },
  {
    id: 'd4e5f6a7-b8c9-4d5e-0f1a-9b8c7d6e5f4a',
    name: "Craft & Stitch",
    specialty: "Leatherwork",
    location: "Austin, TX",
    bio: "Artisanal leather goods made with traditional techniques",
    image_url: "https://images.unsplash.com/photo-1544816155-12df9643f363"
  }
];

// Updated product data to match the actual table structure
const products = [
  {
    id: 'c9f0f895-f912-4c92-a289-7ec6cdb8d956',
    name: "Hand-carved Wooden Bowl",
    artisan_id: 'a1b2c3d4-e5f6-4a5b-9c8d-7e6f5a4b3c2d',
    price: 89.99,
    image_url: "https://images.unsplash.com/photo-1635983495219-8256f1e4a663?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    category: "Home Decor",
    stock: 10,
    description: "Beautiful hand-carved wooden bowl made from sustainable materials"
  },
  {
    id: '356a192b-7913-504c-9457-4d18c28d46e6',
    name: "Ceramic Vase Set",
    artisan_id: 'b2c3d4e5-f6a7-4b5c-8d9e-7f6a5b4c3d2e',
    price: 129.99,
    image_url: "https://images.unsplash.com/photo-1612196808214-b7e239e5f5a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    category: "Home Decor",
    stock: 5,
    description: "Set of three handmade ceramic vases in complementary colors"
  },
  {
    id: 'da4b9237-bacb-4a4d-ac32-d43b9ae1ab4a',
    name: "Handwoven Wool Blanket",
    artisan_id: 'c3d4e5f6-a7b8-4c5d-9e0f-8a7b6c5d4e3f',
    price: 159.99,
    image_url: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    category: "Home Decor",
    stock: 8,
    description: "Cozy handwoven blanket made from 100% natural wool"
  },
  {
    id: '77de68da-ecd8-4b4c-b3d9-8294b7c0b4da',
    name: "Handmade Leather Journal",
    artisan_id: 'd4e5f6a7-b8c9-4d5e-0f1a-9b8c7d6e5f4a',
    price: 49.99,
    image_url: "https://images.unsplash.com/photo-1544816155-12df9643f363?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    category: "Accessories",
    stock: 0,
    description: "Handcrafted leather journal with premium paper"
  }
];

async function seed() {
  try {
    // Check table structure first
    await checkTableStructure();
    
    // Insert artisans
    console.log('Seeding artisans...');
    const { data: artisansData, error: artisansError } = await supabase
      .from('artisans')
      .upsert(artisans, { onConflict: 'id' })
      .select();

    if (artisansError) {
      throw artisansError;
    }
    console.log('Successfully seeded artisans:', artisansData);

    // Insert products
    console.log('Seeding products...');
    const { data: productsData, error: productsError } = await supabase
      .from('products')
      .upsert(products, { onConflict: 'id' })
      .select();

    if (productsError) {
      throw productsError;
    }
    console.log('Successfully seeded products:', productsData);

  } catch (error) {
    console.error('Error seeding data:', error);
  }
}

seed(); 