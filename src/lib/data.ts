import { Product, Category } from './types';

export const CATEGORIES: Category[] = [
  {
    id: '1',
    name: 'Pottery',
    slug: 'pottery',
    image: 'https://images.pexels.com/photos/2162938/pexels-photo-2162938.jpeg',
    description: 'Handcrafted pottery items including vases, plates, and decorative pieces'
  },
  {
    id: '2',
    name: 'Textiles',
    slug: 'textiles',
    image: 'https://images.pexels.com/photos/4946975/pexels-photo-4946975.jpeg',
    description: 'Handwoven textiles including rugs, tapestries, and fabric art'
  },
  {
    id: '3',
    name: 'Woodwork',
    slug: 'woodwork',
    image: 'https://images.pexels.com/photos/3637786/pexels-photo-3637786.jpeg',
    description: 'Hand-carved wooden items including furniture, utensils, and decorative objects'
  },
  {
    id: '4',
    name: 'Jewelry',
    slug: 'jewelry',
    image: 'https://images.pexels.com/photos/965981/pexels-photo-965981.jpeg',
    description: 'Handmade jewelry including necklaces, earrings, and bracelets'
  },
  {
    id: '5',
    name: 'Paper Crafts',
    slug: 'paper-crafts',
    image: 'https://images.pexels.com/photos/6663365/pexels-photo-6663365.jpeg',
    description: 'Handmade paper crafts including cards, journals, and origami'
  },
  {
    id: '6',
    name: 'Home Decor',
    slug: 'home-decor',
    image: 'https://images.pexels.com/photos/5490778/pexels-photo-5490778.jpeg',
    description: 'Handmade home decor items including candles, wall hangings, and cushions'
  }
];

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Handcrafted Ceramic Vase',
    description: 'A beautiful handcrafted ceramic vase perfect for displaying fresh or dried flowers. Each piece is uniquely made with natural clay and finished with non-toxic glazes.',
    price: 45.99,
    stock: 15,
    category: 'Pottery',
    tags: ['vase', 'ceramic', 'handmade', 'home decor'],
    images: [
      'https://images.pexels.com/photos/4207790/pexels-photo-4207790.jpeg',
      'https://images.pexels.com/photos/4207805/pexels-photo-4207805.jpeg'
    ],
    rating: 4.7,
    numReviews: 12,
    reviews: [
      {
        userId: 'user1',
        name: 'Sarah Johnson',
        rating: 5,
        comment: 'Absolutely beautiful! The craftsmanship is outstanding.',
        createdAt: new Date('2023-11-15')
      },
      {
        userId: 'user2',
        name: 'Michael Chen',
        rating: 4,
        comment: 'Love the design. Slightly smaller than I expected but still gorgeous.',
        createdAt: new Date('2024-01-10')
      }
    ],
    createdAt: new Date('2023-10-01')
  },
  {
    id: '2',
    name: 'Hand-Woven Wall Hanging',
    description: 'A stunning hand-woven wall hanging made with natural fibers and dyes. Each piece is uniquely crafted and adds warmth and texture to any space.',
    price: 89.99,
    stock: 8,
    category: 'Textiles',
    tags: ['wall hanging', 'macrame', 'boho', 'handwoven'],
    images: [
      'https://images.pexels.com/photos/6438398/pexels-photo-6438398.jpeg',
      'https://images.pexels.com/photos/6438752/pexels-photo-6438752.jpeg'
    ],
    rating: 4.9,
    numReviews: 18,
    reviews: [
      {
        userId: 'user3',
        name: 'Emily Wilson',
        rating: 5,
        comment: 'Absolutely stunning! Made my living room feel so much cozier.',
        createdAt: new Date('2024-02-20')
      }
    ],
    createdAt: new Date('2023-09-15')
  },
  {
    id: '3',
    name: 'Wooden Serving Bowl',
    description: 'A handcrafted wooden serving bowl made from sustainable hardwood. Perfect for salads, fruits, or as a decorative piece.',
    price: 59.99,
    stock: 20,
    category: 'Woodwork',
    tags: ['bowl', 'wooden', 'kitchen', 'serving'],
    images: [
      'https://images.pexels.com/photos/7676309/pexels-photo-7676309.jpeg',
      'https://images.pexels.com/photos/5824877/pexels-photo-5824877.jpeg'
    ],
    rating: 4.6,
    numReviews: 10,
    reviews: [
      {
        userId: 'user4',
        name: 'James Peterson',
        rating: 5,
        comment: 'Beautiful craftsmanship. I use it every day!',
        createdAt: new Date('2024-01-05')
      },
      {
        userId: 'user5',
        name: 'Amara Okafor',
        rating: 4,
        comment: 'Lovely bowl, great size for family salads.',
        createdAt: new Date('2024-03-12')
      }
    ],
    createdAt: new Date('2023-11-20')
  },
  {
    id: '4',
    name: 'Handmade Silver Necklace',
    description: 'A delicate handmade silver necklace with a nature-inspired pendant. Each piece is carefully crafted by our skilled artisans.',
    price: 79.99,
    stock: 12,
    category: 'Jewelry',
    tags: ['necklace', 'silver', 'pendant', 'handmade jewelry'],
    images: [
      'https://images.pexels.com/photos/1457801/pexels-photo-1457801.jpeg',
      'https://images.pexels.com/photos/10984824/pexels-photo-10984824.jpeg'
    ],
    rating: 4.8,
    numReviews: 15,
    reviews: [
      {
        userId: 'user6',
        name: 'Isabella Martinez',
        rating: 5,
        comment: 'So beautiful and delicate. Receives many compliments!',
        createdAt: new Date('2024-02-10')
      }
    ],
    createdAt: new Date('2023-12-05')
  },
  {
    id: '5',
    name: 'Handbound Leather Journal',
    description: 'A beautiful handbound leather journal with handmade paper pages. Perfect for writing, sketching, or as a thoughtful gift.',
    price: 34.99,
    stock: 25,
    category: 'Paper Crafts',
    tags: ['journal', 'leather', 'notebook', 'handbound'],
    images: [
      'https://images.pexels.com/photos/6501751/pexels-photo-6501751.jpeg',
      'https://images.pexels.com/photos/6501738/pexels-photo-6501738.jpeg'
    ],
    rating: 4.5,
    numReviews: 8,
    reviews: [
      {
        userId: 'user7',
        name: 'Robert Thompson',
        rating: 4,
        comment: 'Beautiful quality, love the paper texture!',
        createdAt: new Date('2024-03-01')
      }
    ],
    createdAt: new Date('2023-12-15')
  },
  {
    id: '6',
    name: 'Handmade Scented Candles Set',
    description: 'A set of three handmade scented candles made with natural soy wax and essential oils. Long-burning and perfect for creating a cozy atmosphere.',
    price: 29.99,
    stock: 30,
    category: 'Home Decor',
    tags: ['candles', 'scented', 'soy wax', 'home decor'],
    images: [
      'https://images.pexels.com/photos/4202325/pexels-photo-4202325.jpeg',
      'https://images.pexels.com/photos/6957869/pexels-photo-6957869.jpeg'
    ],
    rating: 4.4,
    numReviews: 20,
    reviews: [
      {
        userId: 'user8',
        name: 'Olivia Wong',
        rating: 5,
        comment: 'Amazing scents! Not too overpowering, just perfect.',
        createdAt: new Date('2024-01-20')
      },
      {
        userId: 'user9',
        name: 'Noah Garcia',
        rating: 4,
        comment: 'Great quality candles, burn nicely and evenly.',
        createdAt: new Date('2024-02-28')
      }
    ],
    createdAt: new Date('2023-11-10')
  },
  {
    id: '7',
    name: 'Hand-Painted Ceramic Mugs Set',
    description: 'A set of four hand-painted ceramic mugs, each with a unique design. Microwave and dishwasher safe.',
    price: 49.99,
    stock: 10,
    category: 'Pottery',
    tags: ['mugs', 'ceramic', 'hand-painted', 'kitchen'],
    images: [
      'https://images.pexels.com/photos/1566308/pexels-photo-1566308.jpeg',
      'https://images.pexels.com/photos/6306243/pexels-photo-6306243.jpeg'
    ],
    rating: 4.7,
    numReviews: 14,
    reviews: [
      {
        userId: 'user10',
        name: 'Emma Davis',
        rating: 5,
        comment: 'These mugs are absolutely gorgeous! Even prettier in person.',
        createdAt: new Date('2024-01-15')
      }
    ],
    createdAt: new Date('2023-10-20')
  },
  {
    id: '8',
    name: 'Handmade Wool Throw Blanket',
    description: 'A cozy handmade wool throw blanket made with 100% natural wool. Perfect for snuggling on the couch or as a decorative piece on your bed.',
    price: 119.99,
    stock: 7,
    category: 'Textiles',
    tags: ['blanket', 'wool', 'throw', 'home decor'],
    images: [
      'https://images.pexels.com/photos/6463585/pexels-photo-6463585.jpeg',
      'https://images.pexels.com/photos/6444260/pexels-photo-6444260.jpeg'
    ],
    rating: 4.9,
    numReviews: 16,
    reviews: [
      {
        userId: 'user11',
        name: 'William Brown',
        rating: 5,
        comment: 'Incredibly soft and warm. Worth every penny!',
        createdAt: new Date('2024-02-05')
      },
      {
        userId: 'user12',
        name: 'Sofia Patel',
        rating: 5,
        comment: 'Exceptional quality, so cozy for winter nights.',
        createdAt: new Date('2024-03-10')
      }
    ],
    createdAt: new Date('2023-09-25')
  }
];

// Helper functions to simulate backend functionality
export const getProducts = () => {
  return PRODUCTS;
};

export const getProduct = (id: string) => {
  return PRODUCTS.find(p => p.id === id);
};

export const getCategories = () => {
  return CATEGORIES;
};

export const getProductsByCategory = (categorySlug: string) => {
  const category = CATEGORIES.find(c => c.slug === categorySlug);
  if (!category) return [];
  return PRODUCTS.filter(p => p.category.toLowerCase() === category.name.toLowerCase());
};