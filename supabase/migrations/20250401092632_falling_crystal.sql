/*
  # Initial Schema Setup

  1. Tables
    - profiles
      - User profiles with additional information
    - products
      - Product catalog
    - cart_items
      - Shopping cart items
    - orders
      - User orders

  2. Security
    - Enable RLS on all tables
    - Set up access policies
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  is_artisan BOOLEAN DEFAULT false,
  bio TEXT,
  location TEXT,
  specialty TEXT,
  profile_image TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  image TEXT,
  category TEXT NOT NULL,
  artisan_id UUID REFERENCES profiles(id),
  count_in_stock INTEGER DEFAULT 0,
  rating DECIMAL(2,1) DEFAULT 0,
  num_reviews INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create cart_items table
CREATE TABLE IF NOT EXISTS cart_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  product_id UUID REFERENCES products(id),
  quantity INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, product_id)
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  total_amount DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'pending',
  shipping_address JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create order_items table
CREATE TABLE IF NOT EXISTS order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id),
  product_id UUID REFERENCES products(id),
  quantity INTEGER NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Products policies
CREATE POLICY "Products are viewable by everyone"
  ON products FOR SELECT
  USING (true);

CREATE POLICY "Artisans can insert their own products"
  ON products FOR INSERT
  WITH CHECK (auth.uid() = artisan_id);

CREATE POLICY "Artisans can update their own products"
  ON products FOR UPDATE
  USING (auth.uid() = artisan_id);

-- Cart policies
CREATE POLICY "Users can view own cart items"
  ON cart_items FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert into own cart"
  ON cart_items FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own cart items"
  ON cart_items FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own cart items"
  ON cart_items FOR DELETE
  USING (auth.uid() = user_id);

-- Orders policies
CREATE POLICY "Users can view own orders"
  ON orders FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own orders"
  ON orders FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Order items policies
CREATE POLICY "Users can view own order items"
  ON order_items FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = order_items.order_id
      AND orders.user_id = auth.uid()
    )
  );

-- Insert sample products
INSERT INTO products (name, description, price, image, category, count_in_stock, rating, num_reviews)
VALUES
  (
    'Hand-carved Wooden Bowl',
    'Beautiful hand-carved wooden bowl made from sustainable hardwood.',
    89.99,
    'https://images.unsplash.com/photo-1635983495219-8256f1e4a663',
    'Woodwork',
    10,
    4.8,
    124
  ),
  (
    'Ceramic Vase Set',
    'Set of three handcrafted ceramic vases with unique glazing.',
    129.99,
    'https://images.unsplash.com/photo-1612196808214-b7e239e5f5a5',
    'Pottery',
    5,
    4.9,
    89
  ),
  (
    'Handwoven Wool Blanket',
    'Cozy handwoven blanket made from 100% natural wool.',
    159.99,
    'https://images.unsplash.com/photo-1580480055273-228ff5388ef8',
    'Textiles',
    8,
    4.7,
    156
  ),
  (
    'Handmade Leather Journal',
    'Premium leather journal with handstitched binding.',
    49.99,
    'https://images.unsplash.com/photo-1544816155-12df9643f363',
    'Leatherwork',
    15,
    4.6,
    78
  );