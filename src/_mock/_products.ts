// Mock data for mobile gadgets ecommerce

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  rating: number;
  reviewCount: number;
  images: string[];
  colors: ProductColor[];
  variants: ProductVariant[];
  specs: ProductSpec[];
  description: string;
  features: string[];
  inStock: boolean;
  stockCount: number;
  isFeatured?: boolean;
  isBestDeal?: boolean;
  isNew?: boolean;
  // Optional timestamp for sorting by recency
  createdAt?: string;
}

export interface ProductColor {
  name: string;
  code: string;
  image?: string;
}

export interface ProductVariant {
  id: string;
  storage: string;
  ram: string;
  price: number;
  originalPrice?: number;
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  comment: string;
  date: string;
  images?: string[];
  helpful: number;
}

// Product Categories
export const PRODUCT_CATEGORIES = [
  { id: 'smartphones', name: 'Smartphones', icon: '📱' },
  { id: 'tablets', name: 'Tablets', icon: '📲' },
  { id: 'smartwatches', name: 'Smartwatches', icon: '⌚' },
  { id: 'earbuds', name: 'Earbuds & Headphones', icon: '🎧' },
  { id: 'accessories', name: 'Accessories', icon: '🔌' },
];

// Brands
export const BRANDS = ['Apple', 'Samsung', 'Google', 'OnePlus', 'Xiaomi', 'Oppo', 'Realme', 'Vivo'];

// Mock Products
export const PRODUCTS: Product[] = [
  {
    id: 'prod-001',
    name: 'iPhone 15 Pro Max',
    brand: 'Apple',
    category: 'smartphones',
    price: 1199,
    originalPrice: 1299,
    discount: 8,
    rating: 4.8,
    reviewCount: 2847,
    images: [
      '/assets/images/product/product-1.webp',
      '/assets/images/product/product-2.webp',
      '/assets/images/product/product-3.webp',
      '/assets/images/product/product-4.webp',
    ],
    colors: [
      { name: 'Natural Titanium', code: '#8B8589' },
      { name: 'Blue Titanium', code: '#1E3A5F' },
      { name: 'White Titanium', code: '#E8E8E8' },
      { name: 'Black Titanium', code: '#3C3C3C' },
    ],
    variants: [
      { id: 'var-001-1', storage: '256GB', ram: '8GB', price: 1199, originalPrice: 1299 },
      { id: 'var-001-2', storage: '512GB', ram: '8GB', price: 1399 },
      { id: 'var-001-3', storage: '1TB', ram: '8GB', price: 1599 },
    ],
    specs: [
      { label: 'Display', value: '6.7" Super Retina XDR' },
      { label: 'Processor', value: 'A17 Pro chip' },
      { label: 'Camera', value: '48MP Main + 12MP Ultra Wide + 12MP Telephoto' },
      { label: 'Battery', value: 'Up to 29 hours video playback' },
      { label: 'OS', value: 'iOS 17' },
    ],
    description: 'iPhone 15 Pro Max. Forged in titanium and featuring the groundbreaking A17 Pro chip, a customizable Action button, and the most powerful iPhone camera system ever.',
    features: [
      'Titanium design with textured matte glass back',
      'A17 Pro chip delivers unprecedented performance',
      'Pro camera system with 5x Telephoto camera',
      'Customizable Action button',
      'USB-C connector with USB 3 speeds',
    ],
    inStock: true,
    stockCount: 45,
    isFeatured: true,
    isBestDeal: false,
    isNew: true,
  },
  {
    id: 'prod-002',
    name: 'Samsung Galaxy S24 Ultra',
    brand: 'Samsung',
    category: 'smartphones',
    price: 1099,
    originalPrice: 1199,
    discount: 8,
    rating: 4.7,
    reviewCount: 1923,
    images: [
      '/assets/images/product/product-5.webp',
      '/assets/images/product/product-6.webp',
      '/assets/images/product/product-7.webp',
      '/assets/images/product/product-8.webp',
    ],
    colors: [
      { name: 'Titanium Gray', code: '#4A4A4A' },
      { name: 'Titanium Black', code: '#1C1C1C' },
      { name: 'Titanium Violet', code: '#6B4C7A' },
      { name: 'Titanium Yellow', code: '#F4D03F' },
    ],
    variants: [
      { id: 'var-002-1', storage: '256GB', ram: '12GB', price: 1099, originalPrice: 1199 },
      { id: 'var-002-2', storage: '512GB', ram: '12GB', price: 1299 },
      { id: 'var-002-3', storage: '1TB', ram: '12GB', price: 1499 },
    ],
    specs: [
      { label: 'Display', value: '6.8" Dynamic AMOLED 2X' },
      { label: 'Processor', value: 'Snapdragon 8 Gen 3' },
      { label: 'Camera', value: '200MP Main + 50MP Periscope + 12MP Ultra Wide + 10MP Telephoto' },
      { label: 'Battery', value: '5000mAh with 45W fast charging' },
      { label: 'OS', value: 'Android 14 with One UI 6.1' },
    ],
    description: 'Meet Galaxy S24 Ultra, the ultimate form of Galaxy Ultra with a new titanium exterior and a 17.25cm flat display. It\'s an absolute marvel of design.',
    features: [
      'Titanium frame for enhanced durability',
      '200MP camera with AI-powered zoom',
      'Built-in S Pen for productivity',
      'Galaxy AI for real-time translation',
      'Ray tracing for mobile gaming',
    ],
    inStock: true,
    stockCount: 38,
    isFeatured: true,
    isBestDeal: true,
    isNew: true,
  },
  {
    id: 'prod-003',
    name: 'Google Pixel 8 Pro',
    brand: 'Google',
    category: 'smartphones',
    price: 899,
    originalPrice: 999,
    discount: 10,
    rating: 4.6,
    reviewCount: 1456,
    images: [
      '/assets/images/product/product-9.webp',
      '/assets/images/product/product-10.webp',
      '/assets/images/product/product-11.webp',
      '/assets/images/product/product-12.webp',
    ],
    colors: [
      { name: 'Obsidian', code: '#2D2D2D' },
      { name: 'Porcelain', code: '#F5F5F0' },
      { name: 'Bay', code: '#A4C8E1' },
    ],
    variants: [
      { id: 'var-003-1', storage: '128GB', ram: '12GB', price: 899, originalPrice: 999 },
      { id: 'var-003-2', storage: '256GB', ram: '12GB', price: 999 },
      { id: 'var-003-3', storage: '512GB', ram: '12GB', price: 1099 },
    ],
    specs: [
      { label: 'Display', value: '6.7" LTPO OLED 120Hz' },
      { label: 'Processor', value: 'Google Tensor G3' },
      { label: 'Camera', value: '50MP Main + 48MP Telephoto + 48MP Ultra Wide' },
      { label: 'Battery', value: '5050mAh with 30W fast charging' },
      { label: 'OS', value: 'Android 14' },
    ],
    description: 'Google Pixel 8 Pro is a fully upgraded phone, engineered by Google. It has AI-powered cameras and editing tools that help you create amazing photos.',
    features: [
      'Google Tensor G3 for advanced AI',
      'Best Take for perfect group photos',
      'Magic Eraser and Audio Magic Eraser',
      '7 years of OS and security updates',
      'Temperature sensor',
    ],
    inStock: true,
    stockCount: 52,
    isFeatured: true,
    isBestDeal: false,
    isNew: false,
  },
  {
    id: 'prod-004',
    name: 'OnePlus 12',
    brand: 'OnePlus',
    category: 'smartphones',
    price: 799,
    rating: 4.5,
    reviewCount: 987,
    images: [
      '/assets/images/product/product-13.webp',
      '/assets/images/product/product-14.webp',
      '/assets/images/product/product-15.webp',
      '/assets/images/product/product-16.webp',
    ],
    colors: [
      { name: 'Flowy Emerald', code: '#1B5E4F' },
      { name: 'Silky Black', code: '#1A1A1A' },
    ],
    variants: [
      { id: 'var-004-1', storage: '256GB', ram: '12GB', price: 799 },
      { id: 'var-004-2', storage: '512GB', ram: '16GB', price: 899 },
    ],
    specs: [
      { label: 'Display', value: '6.82" AMOLED 120Hz' },
      { label: 'Processor', value: 'Snapdragon 8 Gen 3' },
      { label: 'Camera', value: '50MP Main + 64MP Periscope + 48MP Ultra Wide' },
      { label: 'Battery', value: '5400mAh with 100W SUPERVOOC' },
      { label: 'OS', value: 'OxygenOS 14' },
    ],
    description: 'OnePlus 12 brings together flagship performance, stunning display, and incredibly fast charging in a premium package.',
    features: [
      'Hasselblad Camera for Mobile',
      '100W SUPERVOOC fast charging',
      '50W wireless charging',
      'ProXDR Display with Dolby Vision',
      'Premium alert slider',
    ],
    inStock: true,
    stockCount: 28,
    isFeatured: false,
    isBestDeal: true,
    isNew: false,
  },
  {
    id: 'prod-005',
    name: 'iPad Pro 12.9" M2',
    brand: 'Apple',
    category: 'tablets',
    price: 1099,
    rating: 4.9,
    reviewCount: 1234,
    images: [
      '/assets/images/product/product-17.webp',
      '/assets/images/product/product-18.webp',
      '/assets/images/product/product-19.webp',
      '/assets/images/product/product-20.webp',
    ],
    colors: [
      { name: 'Space Gray', code: '#535150' },
      { name: 'Silver', code: '#E3E4E5' },
    ],
    variants: [
      { id: 'var-005-1', storage: '128GB', ram: '8GB', price: 1099 },
      { id: 'var-005-2', storage: '256GB', ram: '8GB', price: 1199 },
      { id: 'var-005-3', storage: '512GB', ram: '8GB', price: 1399 },
      { id: 'var-005-4', storage: '1TB', ram: '16GB', price: 1799 },
    ],
    specs: [
      { label: 'Display', value: '12.9" Liquid Retina XDR' },
      { label: 'Processor', value: 'Apple M2 chip' },
      { label: 'Camera', value: '12MP Wide + 10MP Ultra Wide' },
      { label: 'Battery', value: 'Up to 10 hours' },
      { label: 'OS', value: 'iPadOS 17' },
    ],
    description: 'iPad Pro with M2 chip. The ultimate iPad experience with the most advanced technology.',
    features: [
      'M2 chip for incredible performance',
      'Liquid Retina XDR display',
      'ProRes video capture',
      'Works with Apple Pencil (2nd gen)',
      'Thunderbolt / USB 4 support',
    ],
    inStock: true,
    stockCount: 19,
    isFeatured: true,
    isBestDeal: false,
    isNew: false,
  },
  {
    id: 'prod-006',
    name: 'Apple Watch Series 9',
    brand: 'Apple',
    category: 'smartwatches',
    price: 399,
    rating: 4.7,
    reviewCount: 2156,
    images: [
      '/assets/images/product/product-21.webp',
      '/assets/images/product/product-22.webp',
      '/assets/images/product/product-23.webp',
      '/assets/images/product/product-24.webp',
    ],
    colors: [
      { name: 'Midnight', code: '#1D1F2E' },
      { name: 'Starlight', code: '#F0E9DF' },
      { name: 'Silver', code: '#E3E4E5' },
      { name: 'Pink', code: '#FAD4D8' },
      { name: 'Red', code: '#C1272D' },
    ],
    variants: [
      { id: 'var-006-1', storage: '41mm GPS', ram: '', price: 399 },
      { id: 'var-006-2', storage: '41mm GPS + Cellular', ram: '', price: 499 },
      { id: 'var-006-3', storage: '45mm GPS', ram: '', price: 429 },
      { id: 'var-006-4', storage: '45mm GPS + Cellular', ram: '', price: 529 },
    ],
    specs: [
      { label: 'Display', value: 'Always-On Retina LTPO OLED' },
      { label: 'Processor', value: 'S9 SiP with 64-bit dual-core' },
      { label: 'Sensors', value: 'Heart rate, ECG, Blood Oxygen, Temperature' },
      { label: 'Battery', value: 'Up to 18 hours' },
      { label: 'OS', value: 'watchOS 10' },
    ],
    description: 'Apple Watch Series 9. Smarter. Brighter. Mightier. With the new S9 chip and a magical new way to use your watch.',
    features: [
      'Double tap gesture control',
      'Brighter always-on display',
      'Advanced health sensors',
      'Crash Detection and Fall Detection',
      'Carbon neutral options available',
    ],
    inStock: true,
    stockCount: 67,
    isFeatured: false,
    isBestDeal: false,
    isNew: true,
  },
  {
    id: 'prod-007',
    name: 'AirPods Pro (2nd Gen)',
    brand: 'Apple',
    category: 'earbuds',
    price: 249,
    originalPrice: 279,
    discount: 11,
    rating: 4.8,
    reviewCount: 3421,
    images: [
      '/assets/images/product/product-1.webp',
      '/assets/images/product/product-2.webp',
      '/assets/images/product/product-3.webp',
    ],
    colors: [
      { name: 'White', code: '#FFFFFF' },
    ],
    variants: [
      { id: 'var-007-1', storage: 'Standard', ram: '', price: 249, originalPrice: 279 },
    ],
    specs: [
      { label: 'Chip', value: 'Apple H2 chip' },
      { label: 'ANC', value: 'Active Noise Cancellation 2x better' },
      { label: 'Battery', value: 'Up to 6 hours listening time' },
      { label: 'Case', value: 'MagSafe Charging Case with speaker' },
      { label: 'Audio', value: 'Adaptive Audio, Personalized Spatial Audio' },
    ],
    description: 'AirPods Pro with MagSafe Charging Case. Up to 2x more Active Noise Cancellation. Adaptive Transparency. Personalized Spatial Audio.',
    features: [
      'Up to 2x more Active Noise Cancellation',
      'Adaptive Audio blends ANC and Transparency',
      'Personalized Spatial Audio with dynamic head tracking',
      'Touch control for volume',
      'Extra small ear tip size',
    ],
    inStock: true,
    stockCount: 125,
    isFeatured: false,
    isBestDeal: true,
    isNew: false,
  },
  {
    id: 'prod-008',
    name: 'Samsung Galaxy Buds2 Pro',
    brand: 'Samsung',
    category: 'earbuds',
    price: 179,
    originalPrice: 229,
    discount: 22,
    rating: 4.5,
    reviewCount: 1876,
    images: [
      '/assets/images/product/product-4.webp',
      '/assets/images/product/product-5.webp',
      '/assets/images/product/product-6.webp',
    ],
    colors: [
      { name: 'Graphite', code: '#4A4A4A' },
      { name: 'White', code: '#FFFFFF' },
      { name: 'Bora Purple', code: '#A78BC1' },
    ],
    variants: [
      { id: 'var-008-1', storage: 'Standard', ram: '', price: 179, originalPrice: 229 },
    ],
    specs: [
      { label: 'Drivers', value: '10mm + 5.3mm dual drivers' },
      { label: 'ANC', value: 'Intelligent Active Noise Cancellation' },
      { label: 'Battery', value: 'Up to 8 hours (5 hours with ANC)' },
      { label: 'Codec', value: 'Samsung Seamless Codec Hi-Fi 24bit' },
      { label: 'Water Resistance', value: 'IPX7' },
    ],
    description: 'Galaxy Buds2 Pro bring you amazing sound quality and comfort with intelligent ANC and seamless connectivity.',
    features: [
      'Intelligent Active Noise Cancellation',
      '360 Audio for immersive sound',
      'Hi-Fi sound quality',
      'Voice Detect for seamless conversations',
      'IPX7 water resistance',
    ],
    inStock: true,
    stockCount: 89,
    isFeatured: false,
    isBestDeal: true,
    isNew: false,
  },
];

// Mock Reviews
export const REVIEWS: Review[] = [
  {
    id: 'rev-001',
    productId: 'prod-001',
    userId: 'user-001',
    userName: 'John Smith',
    userAvatar: '/assets/images/avatar/avatar-1.webp',
    rating: 5,
    comment: 'The iPhone 15 Pro Max is absolutely amazing! The titanium design feels premium and the camera quality is outstanding. Battery life is excellent too.',
    date: '2024-10-10',
    helpful: 45,
  },
  {
    id: 'rev-002',
    productId: 'prod-001',
    userId: 'user-002',
    userName: 'Sarah Johnson',
    userAvatar: '/assets/images/avatar/avatar-2.webp',
    rating: 5,
    comment: 'Best iPhone ever! The A17 Pro chip is incredibly fast. Love the new Action button and USB-C. Totally worth the upgrade.',
    date: '2024-10-08',
    helpful: 32,
  },
  {
    id: 'rev-003',
    productId: 'prod-001',
    userId: 'user-003',
    userName: 'Mike Chen',
    userAvatar: '/assets/images/avatar/avatar-3.webp',
    rating: 4,
    comment: 'Great phone overall. Camera is fantastic but it\'s quite expensive. If you\'re upgrading from iPhone 14 Pro, maybe wait.',
    date: '2024-10-05',
    helpful: 28,
  },
  {
    id: 'rev-004',
    productId: 'prod-002',
    userId: 'user-004',
    userName: 'Emily Davis',
    userAvatar: '/assets/images/avatar/avatar-4.webp',
    rating: 5,
    comment: 'Samsung really outdid themselves! The S Pen integration is perfect and the camera zoom is mind-blowing. Best Android phone!',
    date: '2024-10-12',
    helpful: 52,
  },
  {
    id: 'rev-005',
    productId: 'prod-002',
    userId: 'user-005',
    userName: 'David Wilson',
    userAvatar: '/assets/images/avatar/avatar-5.webp',
    rating: 5,
    comment: 'The 200MP camera is insane! Pictures are crystal clear. Battery lasts all day even with heavy use. Highly recommend!',
    date: '2024-10-09',
    helpful: 38,
  },
  {
    id: 'rev-006',
    productId: 'prod-003',
    userId: 'user-006',
    userName: 'Lisa Anderson',
    userAvatar: '/assets/images/avatar/avatar-6.webp',
    rating: 5,
    comment: 'Pixel 8 Pro has the best camera software! Magic Eraser and Best Take are game changers. Clean Android experience.',
    date: '2024-10-11',
    helpful: 41,
  },
  {
    id: 'rev-007',
    productId: 'prod-007',
    userId: 'user-007',
    userName: 'James Brown',
    userAvatar: '/assets/images/avatar/avatar-7.webp',
    rating: 5,
    comment: 'AirPods Pro 2nd gen are incredible! Noise cancellation is 2x better than the first gen. Sound quality is amazing.',
    date: '2024-10-07',
    helpful: 67,
  },
];

// Get reviews for a product
export function getProductReviews(productId: string): Review[] {
  return REVIEWS.filter((review) => review.productId === productId);
}

// Get product by ID
export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((product) => product.id === id);
}

// Get featured products
export function getFeaturedProducts(): Product[] {
  return PRODUCTS.filter((product) => product.isFeatured);
}

// Get best deals
export function getBestDeals(): Product[] {
  return PRODUCTS.filter((product) => product.isBestDeal);
}

// Get new products
export function getNewProducts(): Product[] {
  return PRODUCTS.filter((product) => product.isNew);
}

// Filter products
export function filterProducts(filters: {
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  search?: string;
}): Product[] {
  return PRODUCTS.filter((product) => {
    if (filters.category && product.category !== filters.category) return false;
    if (filters.brand && product.brand !== filters.brand) return false;
    if (filters.minPrice && product.price < filters.minPrice) return false;
    if (filters.maxPrice && product.price > filters.maxPrice) return false;
    if (filters.inStock !== undefined && product.inStock !== filters.inStock) return false;
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      return (
        product.name.toLowerCase().includes(searchLower) ||
        product.brand.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower)
      );
    }
    return true;
  });
}

