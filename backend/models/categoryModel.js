import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String
  },
  active: {
    type: Boolean,
    default: true
  }
});

const Category = mongoose.model('Category', categorySchema);
export default Category; 