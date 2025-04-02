export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(price);
};

export const calculateSubtotal = (price: number, quantity: number): number => {
  return price * quantity;
}; 