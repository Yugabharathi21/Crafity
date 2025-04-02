import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Calculate total before saving
cartSchema.pre('save', async function(next) {
  const populatedCart = await this.populate('items.product');
  this.total = populatedCart.items.reduce((sum, item) => {
    return sum + (item.product.price * item.quantity);
  }, 0);
  next();
});

const Cart = mongoose.model('Cart', cartSchema);
export default Cart; 