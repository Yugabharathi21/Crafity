
import { CraftItem } from "@/components/CraftCard";

export const products: CraftItem[] = [
  {
    id: 1,
    title: "Handwoven Basket",
    image: "https://images.unsplash.com/photo-1631125915902-d8eda6c8f95a?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3",
    price: 29.99,
    category: "Home Decor",
    rating: 4.5,
    isFavorite: false
  },
  {
    id: 2,
    title: "Ceramic Coffee Mug",
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3",
    price: 19.99,
    category: "Kitchen",
    rating: 4.8,
    isFavorite: true
  },
  {
    id: 3,
    title: "Hand-knitted Scarf",
    image: "https://images.unsplash.com/photo-1520903920241-fc0fe5cb282a?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3",
    price: 34.99,
    category: "Clothing",
    rating: 4.2,
    isFavorite: false
  },
  {
    id: 4,
    title: "Wooden Serving Board",
    image: "https://images.unsplash.com/photo-1644415975228-4a6fbe590ead?q=80&w=2860&auto=format&fit=crop&ixlib=rb-4.0.3",
    price: 39.99,
    category: "Kitchen",
    rating: 4.7,
    isFavorite: false
  },
  {
    id: 5,
    title: "Macrame Wall Hanging",
    image: "https://images.unsplash.com/photo-1522758971460-1d21eed7dc1d?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3",
    price: 49.99,
    category: "Home Decor",
    rating: 4.9,
    isFavorite: true
  },
  {
    id: 6,
    title: "Hand-poured Candle",
    image: "https://images.unsplash.com/photo-1608831540955-35094d48694a?q=80&w=2876&auto=format&fit=crop&ixlib=rb-4.0.3",
    price: 24.99,
    category: "Home Decor",
    rating: 4.3,
    isFavorite: false
  },
  {
    id: 7,
    title: "Embroidered Pillow Cover",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.0.3",
    price: 32.99,
    category: "Home Decor",
    rating: 4.5,
    isFavorite: false
  },
  {
    id: 8,
    title: "Leather Journal",
    image: "https://images.unsplash.com/photo-1518893883800-45cd0954574b?q=80&w=2864&auto=format&fit=crop&ixlib=rb-4.0.3",
    price: 28.99,
    category: "Stationery",
    rating: 4.7,
    isFavorite: true
  },
  {
    id: 9,
    title: "Clay Planter",
    image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?q=80&w=2944&auto=format&fit=crop&ixlib=rb-4.0.3",
    price: 45.99,
    category: "Garden",
    rating: 4.4,
    isFavorite: false
  },
  {
    id: 10,
    title: "Handmade Soap Set",
    image: "https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3",
    price: 18.99,
    category: "Bath",
    rating: 4.9,
    isFavorite: false
  },
  {
    id: 11,
    title: "Beaded Necklace",
    image: "https://images.unsplash.com/photo-1635767798638-3665c302a99c?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3",
    price: 42.99,
    category: "Jewelry",
    rating: 4.6,
    isFavorite: true
  },
  {
    id: 12,
    title: "Woven Wall Art",
    image: "https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3",
    price: 89.99,
    category: "Home Decor",
    rating: 4.8,
    isFavorite: false
  },
];

// Function to get a product by its ID
export const getProductById = (id: number): CraftItem | undefined => {
  return products.find(product => product.id === id);
};
