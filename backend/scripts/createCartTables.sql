-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;

-- Create cart table
CREATE TABLE IF NOT EXISTS carts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now())
);

-- Create cart items table
CREATE TABLE IF NOT EXISTS cart_items (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    cart_id UUID REFERENCES carts(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now()),
    UNIQUE(cart_id, product_id)
);

-- Enable RLS
ALTER TABLE carts ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;

-- Create policies for carts
CREATE POLICY "Users can view own cart"
    ON carts FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own cart"
    ON carts FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own cart"
    ON carts FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own cart"
    ON carts FOR DELETE
    USING (auth.uid() = user_id);

-- Create policies for cart items
CREATE POLICY "Users can view own cart items"
    ON cart_items FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM carts
        WHERE carts.id = cart_items.cart_id
        AND carts.user_id = auth.uid()
    ));

CREATE POLICY "Users can insert own cart items"
    ON cart_items FOR INSERT
    WITH CHECK (EXISTS (
        SELECT 1 FROM carts
        WHERE carts.id = cart_items.cart_id
        AND carts.user_id = auth.uid()
    ));

CREATE POLICY "Users can update own cart items"
    ON cart_items FOR UPDATE
    USING (EXISTS (
        SELECT 1 FROM carts
        WHERE carts.id = cart_items.cart_id
        AND carts.user_id = auth.uid()
    ));

CREATE POLICY "Users can delete own cart items"
    ON cart_items FOR DELETE
    USING (EXISTS (
        SELECT 1 FROM carts
        WHERE carts.id = cart_items.cart_id
        AND carts.user_id = auth.uid()
    ));

-- Create function to update cart updated_at
CREATE OR REPLACE FUNCTION update_cart_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE carts
    SET updated_at = now()
    WHERE id = NEW.cart_id;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for cart_items
CREATE TRIGGER update_cart_timestamp
    AFTER INSERT OR UPDATE OR DELETE ON cart_items
    FOR EACH ROW
    EXECUTE FUNCTION update_cart_timestamp();

-- Create function to check product stock before adding to cart
CREATE OR REPLACE FUNCTION check_product_stock()
RETURNS TRIGGER AS $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM products
        WHERE id = NEW.product_id
        AND stock < NEW.quantity
    ) THEN
        RAISE EXCEPTION 'Not enough stock available';
    END IF;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for checking stock
CREATE TRIGGER check_product_stock
    BEFORE INSERT OR UPDATE ON cart_items
    FOR EACH ROW
    EXECUTE FUNCTION check_product_stock();

-- Drop the view if it exists
DROP VIEW IF EXISTS cart_details;
DROP VIEW IF EXISTS user_cart_details;
DROP MATERIALIZED VIEW IF EXISTS cart_details;

-- Create materialized view for cart details
CREATE MATERIALIZED VIEW cart_details AS
SELECT 
    ci.id as cart_item_id,
    c.id as cart_id,
    c.user_id,
    p.id as product_id,
    p.name as product_name,
    p.price as unit_price,
    ci.quantity,
    (p.price * ci.quantity) as total_price,
    p.image_url as product_image,
    p.stock as available_stock,
    ci.created_at,
    ci.updated_at
FROM cart_items ci
JOIN carts c ON ci.cart_id = c.id
JOIN products p ON ci.product_id = p.id;

-- Grant permissions for the materialized view
GRANT SELECT ON cart_details TO authenticated;

-- Create a function to refresh the materialized view
CREATE OR REPLACE FUNCTION refresh_cart_details()
RETURNS TRIGGER AS $$
BEGIN
    REFRESH MATERIALIZED VIEW cart_details;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create triggers to refresh the materialized view
CREATE TRIGGER refresh_cart_details_insert
    AFTER INSERT ON cart_items
    FOR EACH STATEMENT
    EXECUTE FUNCTION refresh_cart_details();

CREATE TRIGGER refresh_cart_details_update
    AFTER UPDATE ON cart_items
    FOR EACH STATEMENT
    EXECUTE FUNCTION refresh_cart_details();

CREATE TRIGGER refresh_cart_details_delete
    AFTER DELETE ON cart_items
    FOR EACH STATEMENT
    EXECUTE FUNCTION refresh_cart_details();

-- Create a secure view for accessing cart details
CREATE OR REPLACE VIEW user_cart_details AS
SELECT *
FROM cart_details
WHERE user_id = auth.uid();

-- Grant permissions for the secure view
GRANT SELECT ON user_cart_details TO authenticated;

-- Grant execute permissions on functions
GRANT EXECUTE ON FUNCTION update_cart_timestamp() TO authenticated;
GRANT EXECUTE ON FUNCTION check_product_stock() TO authenticated;
GRANT EXECUTE ON FUNCTION refresh_cart_details() TO authenticated; 