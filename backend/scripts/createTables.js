import { supabase } from '../config/supabase.js';

const createTables = async () => {
  try {
    // Create profiles table
    const { error: profilesError } = await supabase.rpc('create_profiles_table', {
      sql: `
        CREATE TABLE IF NOT EXISTS profiles (
          id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
          full_name TEXT,
          avatar_url TEXT,
          phone TEXT,
          address TEXT,
          is_artisan BOOLEAN DEFAULT false,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
        );

        -- Enable Row Level Security
        ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

        -- Create policies
        CREATE POLICY "Public profiles are viewable by everyone"
          ON profiles FOR SELECT
          USING (true);

        CREATE POLICY "Users can insert their own profile"
          ON profiles FOR INSERT
          WITH CHECK (auth.uid() = id);

        CREATE POLICY "Users can update their own profile"
          ON profiles FOR UPDATE
          USING (auth.uid() = id);

        -- Create function to handle user creation
        CREATE OR REPLACE FUNCTION public.handle_new_user()
        RETURNS TRIGGER AS $$
        BEGIN
          INSERT INTO public.profiles (id, full_name, avatar_url)
          VALUES (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
          RETURN new;
        END;
        $$ LANGUAGE plpgsql SECURITY DEFINER;

        -- Create trigger for new user creation
        CREATE OR REPLACE TRIGGER on_auth_user_created
          AFTER INSERT ON auth.users
          FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
      `
    });

    if (profilesError) throw profilesError;

    console.log('Tables and policies created successfully');
  } catch (error) {
    console.error('Error creating tables:', error.message);
  }
};

createTables(); 