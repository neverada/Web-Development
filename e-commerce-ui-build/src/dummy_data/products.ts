export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "Velvet Matte Lipstick",
    price: 24.99,
    category: "Lips",
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&h=400&fit=crop",
    description: "Long-lasting matte finish in a rich, creamy formula that glides on effortlessly.",
  },
  {
    id: 2,
    name: "Radiant Glow Foundation",
    price: 38.99,
    category: "Face",
    image: "https://images.unsplash.com/photo-1631214524020-7e18db9a8f92?w=400&h=400&fit=crop",
    description: "Lightweight, buildable coverage with a luminous, skin-like finish.",
  },
  {
    id: 3,
    name: "Smoky Eye Shadow Palette",
    price: 42.99,
    category: "Eyes",
    image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400&h=400&fit=crop",
    description: "12 richly pigmented shades from shimmer to matte for every mood.",
  },
  {
    id: 4,
    name: "Silk Petal Blush Duo",
    price: 28.99,
    category: "Face",
    image: "https://images.unsplash.com/photo-1596704017254-9b121068fb31?w=400&h=400&fit=crop",
    description: "Two complementary shades that blend seamlessly for a natural flush.",
  },
  {
    id: 5,
    name: "Volume Boost Mascara",
    price: 19.99,
    category: "Eyes",
    image: "https://images.unsplash.com/photo-1631214500115-598fc2cb8ada?w=400&h=400&fit=crop",
    description: "Dramatic volume and length without clumping. Smudge-proof all day.",
  },
];

export default products;
