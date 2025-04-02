import { db } from '../lib/db';

export async function addToCart(userId: string, productId: string) {
  const { data } = await db.cart.addItem({
    user_id: userId,
    product_id: productId,
    quantity: 1
  });

  return data;
}