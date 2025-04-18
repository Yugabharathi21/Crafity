import { supabase } from '../config/supabase.js';

const mockArtisans = [
  {
    name: "Maria Gonzalez",
    specialty: "Pottery",
    location: "Santa Fe, NM",
    bio: "Maria has been creating pottery for over 20 years, drawing inspiration from her cultural heritage and natural surroundings.",
    image_url: "https://images.unsplash.com/photo-1556760544-74068565f05c"
  },
  {
    name: "James Wilson",
    specialty: "Woodworking",
    location: "Portland, OR",
    bio: "James creates sustainable wooden furniture and home goods using traditional techniques passed down through generations.",
    image_url: "https://images.unsplash.com/photo-1572863141204-83031c77e65a"
  },
  {
    name: "Amara Okafor",
    specialty: "Textile Art",
    location: "Chicago, IL",
    bio: "Amara weaves contemporary designs with traditional African patterns to create unique textiles and wearable art.",
    image_url: "https://images.unsplash.com/photo-1594026112284-02bb6f3352fe"
  },
  {
    name: "Yuki Tanaka",
    specialty: "Glass Blowing",
    location: "Seattle, WA",
    bio: "Yuki combines traditional Japanese glass-blowing techniques with modern design to create stunning decorative pieces.",
    image_url: "https://images.unsplash.com/photo-1577083552431-6e5fd01988d8"
  },
  {
    name: "Carlos Rodriguez",
    specialty: "Leather Crafting",
    location: "Austin, TX",
    bio: "Carlos handcrafts premium leather goods using traditional methods and sustainable materials.",
    image_url: "https://images.unsplash.com/photo-1584917865442-de89df76afd3"
  },
  {
    name: "Sarah Chen",
    specialty: "Jewelry Making",
    location: "San Francisco, CA",
    bio: "Sarah creates unique jewelry pieces that blend contemporary design with traditional Asian motifs.",
    image_url: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae"
  }
];

const mockProducts = [
  {
    name: "Handcrafted Wooden Bowl",
    description: "Beautiful hand-carved wooden bowl made from sustainable oak",
    price: 89.99,
    category: "Home Decor",
    image_url: "https://images.unsplash.com/photo-1565849904461-04a58ad377e0",
    stock: 10
  },
  {
    name: "Ceramic Vase Set",
    description: "Set of 3 ceramic vases with traditional patterns",
    price: 129.99,
    category: "Home Decor",
    image_url: "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae",
    stock: 5
  },
  {
    name: "Handwoven Basket",
    description: "Traditional handwoven basket made from natural materials",
    price: 49.99,
    category: "Home Decor",
    image_url: "https://images.unsplash.com/photo-1616628188859-7b11b0d5d6eb",
    stock: 8
  },
  {
    name: "Blown Glass Vase",
    description: "Elegant hand-blown glass vase with unique patterns",
    price: 159.99,
    category: "Home Decor",
    image_url: "https://images.unsplash.com/photo-1577083552431-6e5fd01988d8",
    stock: 3
  },
  {
    name: "Leather Tote Bag",
    description: "Handcrafted leather tote bag with brass hardware",
    price: 199.99,
    category: "Accessories",
    image_url: "https://images.unsplash.com/photo-1584917865442-de89df76afd3",
    stock: 7
  },
  {
    name: "Silver Statement Necklace",
    description: "Handcrafted silver necklace with contemporary design",
    price: 149.99,
    category: "Jewelry",
    image_url: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae",
    stock: 4
  },
  {
    name: "Wooden Serving Board",
    description: "Handcrafted wooden serving board with live edge",
    price: 79.99,
    category: "Kitchen",
    image_url: "https://images.unsplash.com/photo-1572863141204-83031c77e65a",
    stock: 12
  },
  {
    name: "Ceramic Tea Set",
    description: "Traditional ceramic tea set with modern twist",
    price: 169.99,
    category: "Kitchen",
    image_url: "https://images.unsplash.com/photo-1556760544-74068565f05c",
    stock: 6
  },
  {
    name: "Woven Wall Hanging",
    description: "Contemporary woven wall art with geometric patterns",
    price: 199.99,
    category: "Wall Art",
    image_url: "https://images.unsplash.com/photo-1594026112284-02bb6f3352fe",
    stock: 2
  }
];

async function seedData() {
  try {
    // Insert artisans
    console.log('Inserting artisans...');
    const { data: artisans, error: artisansError } = await supabase
      .from('artisans')
      .insert(mockArtisans)
      .select();

    if (artisansError) {
      console.error('Error inserting artisans:', artisansError);
      return;
    }
    console.log('Artisans inserted successfully');

    // Insert products with artisan references
    console.log('Inserting products...');
    const productsWithArtisans = mockProducts.map((product, index) => ({
      ...product,
      artisan_id: artisans[index % artisans.length].id // Distribute products among artisans
    }));

    const { error: productsError } = await supabase
      .from('products')
      .insert(productsWithArtisans);

    if (productsError) {
      console.error('Error inserting products:', productsError);
      return;
    }
    console.log('Products inserted successfully');

    console.log('Data seeding completed successfully');
  } catch (error) {
    console.error('Error seeding data:', error);
  }
}

seedData(); 