// Mock data for multi-vendor businesses

export interface Business {
  id: string;
  name: string;
  slug: string;
  logo: string;
  description: string;
  owner: {
    name: string;
    email: string;
  };
  theme: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
  };
  contact: {
    email: string;
    phone: string;
    address: string;
  };
  social: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
    youtube?: string;
  };
  settings: {
    tagline: string;
    footerText: string;
    navLinks: Array<{
      label: string;
      path: string;
    }>;
  };
}

export const BUSINESSES: Business[] = [
  // Vendor 1 - John Doe's Businesses
  {
    id: 'business-1',
    name: 'TechHub Electronics',
    slug: 'techhub',
    logo: '/logo.png',
    description: 'Your premium destination for cutting-edge electronics and mobile devices',
    owner: {
      name: 'John Doe',
      email: 'john@example.com',
    },
    theme: {
      primaryColor: '#1976d2', // Blue
      secondaryColor: '#dc004e',
      accentColor: '#f50057',
    },
    contact: {
      email: 'support@techhub.com',
      phone: '+880 1234-567890',
      address: '123 Tech Street, Dhaka 1215, Bangladesh',
    },
    social: {
      facebook: 'https://facebook.com/techhub',
      twitter: 'https://twitter.com/techhub',
      instagram: 'https://instagram.com/techhub',
      linkedin: 'https://linkedin.com/company/techhub',
      youtube: 'https://youtube.com/techhub',
    },
    settings: {
      tagline: 'Innovation at Your Fingertips',
      footerText: '© 2024 TechHub Electronics. All rights reserved.',
      navLinks: [
        { label: 'Home', path: '/' },
        { label: 'Shop', path: '/shop' },
        { label: 'Compare', path: '/compare' },
        { label: 'About Us', path: '/about' },
        { label: 'Contact', path: '/contact' },
      ],
    },
  },
  {
    id: 'business-2',
    name: 'SmartHome Store',
    slug: 'smarthome',
    logo: '/logo.png',
    description: 'Transform your home with smart devices and IoT solutions',
    owner: {
      name: 'John Doe',
      email: 'john@example.com',
    },
    theme: {
      primaryColor: '#2e7d32', // Green
      secondaryColor: '#ffa726',
      accentColor: '#42a5f5',
    },
    contact: {
      email: 'info@smarthome.com',
      phone: '+880 1234-111222',
      address: '789 Smart Avenue, Dhaka 1230, Bangladesh',
    },
    social: {
      facebook: 'https://facebook.com/smarthome',
      instagram: 'https://instagram.com/smarthome',
      youtube: 'https://youtube.com/smarthome',
    },
    settings: {
      tagline: 'Your Smart Living Starts Here',
      footerText: '© 2024 SmartHome Store. Making homes intelligent.',
      navLinks: [
        { label: 'Home', path: '/' },
        { label: 'Shop', path: '/shop' },
        { label: 'Compare', path: '/compare' },
      ],
    },
  },
  
  // Vendor 2 - Sarah Ahmed's Businesses
  {
    id: 'business-3',
    name: 'GadgetZone',
    slug: 'gadgetzone',
    logo: '/logo.png',
    description: 'Best deals on smartphones, tablets, and accessories',
    owner: {
      name: 'Sarah Ahmed',
      email: 'sarah@example.com',
    },
    theme: {
      primaryColor: '#9c27b0', // Purple
      secondaryColor: '#ff5722',
      accentColor: '#ff9800',
    },
    contact: {
      email: 'hello@gadgetzone.com',
      phone: '+880 1987-654321',
      address: '456 Gadget Avenue, Chittagong 4100, Bangladesh',
    },
    social: {
      facebook: 'https://facebook.com/gadgetzone',
      instagram: 'https://instagram.com/gadgetzone',
      youtube: 'https://youtube.com/gadgetzone',
    },
    settings: {
      tagline: 'Where Technology Meets Affordability',
      footerText: '© 2024 GadgetZone. Your trusted tech partner.',
      navLinks: [
        { label: 'Home', path: '/' },
        { label: 'Products', path: '/shop' },
        { label: 'Deals', path: '/shop?deals=true' },
        { label: 'Support', path: '/support' },
      ],
    },
  },
  {
    id: 'business-4',
    name: 'AudioWorld',
    slug: 'audioworld',
    logo: '/logo.png',
    description: 'Premium audio equipment and accessories for audiophiles',
    owner: {
      name: 'Sarah Ahmed',
      email: 'sarah@example.com',
    },
    theme: {
      primaryColor: '#d32f2f', // Red
      secondaryColor: '#512da8',
      accentColor: '#fdd835',
    },
    contact: {
      email: 'contact@audioworld.com',
      phone: '+880 1987-999888',
      address: '101 Sound Street, Chittagong 4200, Bangladesh',
    },
    social: {
      facebook: 'https://facebook.com/audioworld',
      twitter: 'https://twitter.com/audioworld',
      instagram: 'https://instagram.com/audioworld',
    },
    settings: {
      tagline: 'Experience Sound Like Never Before',
      footerText: '© 2024 AudioWorld. Pure audio excellence.',
      navLinks: [
        { label: 'Home', path: '/' },
        { label: 'Shop', path: '/shop' },
        { label: 'Compare', path: '/compare' },
      ],
    },
  },
];

// Mock vendor/user to businesses mapping
export const USER_BUSINESSES: Record<string, string[]> = {
  // Vendor 1: John Doe - Has 2 businesses
  'john@example.com': ['business-1', 'business-2'],
  
  // Vendor 2: Sarah Ahmed - Has 2 businesses
  'sarah@example.com': ['business-3', 'business-4'],
  
  // Demo/Test account - Has access to all businesses
  'test@test.com': ['business-1', 'business-2', 'business-3', 'business-4'],
};

// Helper function to get businesses for a user
export const getUserBusinesses = (userEmail: string): Business[] => {
  const businessIds = USER_BUSINESSES[userEmail] || [];
  return BUSINESSES.filter((business) => businessIds.includes(business.id));
};

// Helper function to get a business by id
export const getBusinessById = (businessId: string): Business | undefined => 
  BUSINESSES.find((business) => business.id === businessId);

