import { supabaseAdmin } from '../config/supabaseClient.js';

const createTables = async () => {
  try {
    // Create profiles table
    const { error: profilesError } = await supabaseAdmin.rpc('create_profiles_table', {
      sql: `
        CREATE TABLE IF NOT EXISTS profiles (
          id UUID PRIMARY KEY REFERENCES auth.users(id),
          full_name TEXT,
          avatar_url TEXT,
          phone TEXT,
          address TEXT,
          is_artisan BOOLEAN DEFAULT FALSE,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now()),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now())
        );

        -- Set up Row Level Security (RLS)
        ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

        -- Create policies
        CREATE POLICY "Public profiles are viewable by everyone"
          ON profiles FOR SELECT
          USING ( true );

        CREATE POLICY "Users can insert their own profile"
          ON profiles FOR INSERT
          WITH CHECK ( auth.uid() = id );

        CREATE POLICY "Users can update own profile"
          ON profiles FOR UPDATE
          USING ( auth.uid() = id );

        -- Create trigger for updated_at
        CREATE OR REPLACE FUNCTION handle_updated_at()
        RETURNS TRIGGER AS $$
        BEGIN
          NEW.updated_at = now();
          RETURN NEW;
        END;
        $$ language 'plpgsql';

        CREATE OR REPLACE TRIGGER handle_profiles_updated_at
          BEFORE UPDATE ON profiles
          FOR EACH ROW
          EXECUTE PROCEDURE handle_updated_at();
      `
    });

    if (profilesError) {
      console.error('Error creating profiles table:', profilesError);
      throw profilesError;
    }

    console.log('Tables created successfully');
  } catch (error) {
    console.error('Error creating tables:', error);
    throw error;
  }
};

createTables()
  .then(() => {
    console.log('Database setup completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Database setup failed:', error);
    process.exit(1);
  }); 