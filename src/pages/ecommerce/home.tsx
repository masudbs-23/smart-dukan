import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import LinearProgress from '@mui/material/LinearProgress';
import { alpha } from '@mui/material/styles';
import { useState, useEffect, useRef } from 'react';

import { useRouter } from 'src/routes/hooks';

import { getFeaturedProducts, getBestDeals, getNewProducts, PRODUCT_CATEGORIES } from 'src/_mock/_products';
import type { Product } from 'src/_mock/_products';

import { useCart } from 'src/contexts/CartContext';
import { useWishlist } from 'src/contexts/WishlistContext';

import { Icon } from '@iconify/react';
import { fCurrency } from 'src/utils/format-number';

// ----------------------------------------------------------------------

export default function HomePage() {
  const router = useRouter();
  const featuredProducts = getFeaturedProducts();
  const bestDeals = getBestDeals();
  const newProducts = getNewProducts();

  return (
    <>
      {/* Hero Section */}
      <HeroSection />

      {/* Special Offer Section */}
      <SpecialOfferSection />

      {/* Hot Deal Today Section */}
      <HotDealSection />

      {/* Featured Brands Section */}
      <FeaturedBrandsSection />

      {/* Categories */}
      <Container maxWidth="xl" sx={{ py: 8 }}>
        <Typography variant="h3" sx={{ mb: 4, textAlign: 'center' }}>
          Shop by Category
        </Typography>
        <Grid container spacing={3}>
          {PRODUCT_CATEGORIES.map((category) => (
            <Grid key={category.id} size={{ xs: 12, sm: 6, md: 4, lg: 2.4 }}>
              <Card
                sx={{
                  cursor: 'pointer',
                  transition: 'transform 0.2s',
                  bgcolor: (theme) => alpha(theme.palette.grey[500], 0.08),
                  '&:hover': { transform: 'translateY(-4px)' },
                }}
                onClick={() => router.push(`/shop?category=${category.id}`)}
              >
                <CardActionArea>
                  <CardContent sx={{ textAlign: 'center', py: 4 }}>
                    <Typography variant="h2" sx={{ mb: 1 }}>
                      {category.icon}
                    </Typography>
                    <Typography variant="h6">{category.name}</Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Featured Products */}
      <Box sx={{ bgcolor: 'background.paper', py: 8 }}>
        <Container maxWidth="xl">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
            <Typography variant="h3">Featured Products</Typography>
            <Button variant="outlined" onClick={() => router.push('/shop')}>
              View All
            </Button>
          </Box>
          <Grid container spacing={3}>
            {featuredProducts.map((product) => (
              <Grid key={product.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Best Deals */}
      <Container maxWidth="xl" sx={{ py: 8 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h3">Best Deals</Typography>
          <Button variant="outlined" onClick={() => router.push('/shop')}>
            View All
          </Button>
        </Box>
        <Grid container spacing={3}>
          {bestDeals.map((product) => (
            <Grid key={product.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* New Arrivals */}
      <Box sx={{ bgcolor: 'background.paper', py: 8 }}>
        <Container maxWidth="xl">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
            <Typography variant="h3">New Arrivals</Typography>
            <Button variant="outlined" onClick={() => router.push('/shop')}>
              View All
            </Button>
          </Box>
          <Grid container spacing={3}>
            {newProducts.map((product) => (
              <Grid key={product.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Features */}
      <Container maxWidth="xl" sx={{ py: 8 }}>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 3 }}>
            <Card sx={{ bgcolor: (theme) => alpha(theme.palette.grey[500], 0.08), p: 3 }}>
              <Box sx={{ textAlign: 'center' }}>
                <Icon icon="solar:delivery-bold" width={48} style={{ marginBottom: 16, color: 'primary.main' }} />
                <Typography variant="h6" sx={{ mb: 1 }}>
                  Free Shipping
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  On orders over $100
                </Typography>
              </Box>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <Card sx={{ bgcolor: (theme) => alpha(theme.palette.grey[500], 0.08), p: 3 }}>
              <Box sx={{ textAlign: 'center' }}>
                <Icon icon="solar:shield-check-bold" width={48} style={{ marginBottom: 16, color: 'primary.main' }} />
                <Typography variant="h6" sx={{ mb: 1 }}>
                  Secure Payment
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  100% secure payment
                </Typography>
              </Box>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <Card sx={{ bgcolor: (theme) => alpha(theme.palette.grey[500], 0.08), p: 3 }}>
              <Box sx={{ textAlign: 'center' }}>
                <Icon icon="solar:refresh-bold" width={48} style={{ marginBottom: 16, color: 'primary.main' }} />
                <Typography variant="h6" sx={{ mb: 1 }}>
                  30 Days Return
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Easy return policy
                </Typography>
              </Box>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <Card sx={{ bgcolor: (theme) => alpha(theme.palette.grey[500], 0.08), p: 3 }}>
              <Box sx={{ textAlign: 'center' }}>
                <Icon icon="solar:headphones-round-bold" width={48} style={{ marginBottom: 16, color: 'primary.main' }} />
                <Typography variant="h6" sx={{ mb: 1 }}>
                  24/7 Support
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Dedicated support team
                </Typography>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

// ----------------------------------------------------------------------

function HeroSection() {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      id: 1,
      discountTag: "Opening Sale Discount 50%",
      title: "Urban Explorer Sneakers",
      description: "Occaecati est et illo quibusdam accusamus qui. Incidunt aut et molestiae ut facere aut. Est quidem iusto praesentium excepturi...",
      productImage: "/assets/images/product/product-1.webp",
      buttonText: "Shop now"
    },
    {
      id: 2,
      discountTag: "New Collection 40% Off",
      title: "Smart Watch Series",
      description: "Experience the latest in wearable technology with our premium smart watch collection featuring advanced health monitoring.",
      productImage: "/assets/images/product/product-2.webp",
      buttonText: "Explore Now"
    },
    {
      id: 3,
      discountTag: "Limited Time Offer 30%",
      title: "Wireless Headphones",
      description: "Immerse yourself in crystal clear audio with our premium wireless headphones designed for the modern lifestyle.",
      productImage: "/assets/images/product/product-3.webp",
      buttonText: "Buy Now"
    },
    {
      id: 4,
      discountTag: "Flash Sale 60% Off",
      title: "Gaming Console",
      description: "Take your gaming experience to the next level with our latest gaming console featuring cutting-edge technology.",
      productImage: "/assets/images/product/product-4.webp",
      buttonText: "Get Started"
    },
    {
      id: 5,
      discountTag: "Premium Collection",
      title: "Laptop Pro Series",
      description: "Powerful performance meets sleek design in our premium laptop collection built for professionals and creators.",
      productImage: "/assets/images/product/product-5.webp",
      buttonText: "Learn More"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000); // Auto change every 5 seconds

    return () => clearInterval(interval);
  }, [heroSlides.length]);

  const handleSlideChange = (index: number) => {
    setCurrentSlide(index);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const currentHero = heroSlides[currentSlide];

  return (
    <Box
      sx={{
        position: 'relative',
        height: { xs: '100vh', sm: 700, md: 800 },
        minHeight: { xs: 600, sm: 700 },
        background: 'linear-gradient(135deg, #8B0000 0%, #000000 50%, #2C2C2C 100%)',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        px: { xs: 2, sm: 3 }
      }}
    >
      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1, py: { xs: 2, md: 0 } }}>
        <Grid container spacing={{ xs: 2, md: 4 }} alignItems="center">
          {/* Left Section - Content */}
          <Grid size={{ xs: 12, md: 6 }} sx={{ order: { xs: 2, md: 1 } }}>
            <Box sx={{ maxWidth: { xs: '100%', md: 500 }, textAlign: { xs: 'center', md: 'left' } }}>
              {/* Discount Tag */}
              <Chip 
                label={currentHero.discountTag}
                sx={{
                  bgcolor: '#FF6B35',
                  color: 'white',
                  fontWeight: 600,
                  mb: { xs: 2, md: 3 },
                  px: { xs: 1.5, md: 2 },
                  py: 1,
                  fontSize: { xs: '0.8rem', sm: '0.9rem' },
                  width: { xs: 'fit-content', md: 'auto' },
                  mx: { xs: 'auto', md: 0 }
                }}
              />

              {/* Main Title */}
              <Typography 
                variant="h1" 
                sx={{ 
                  mb: { xs: 2, md: 3 }, 
                  fontSize: { xs: '1.8rem', sm: '2.2rem', md: '3rem', lg: '3.5rem' },
                  fontWeight: 700,
                  color: 'white',
                  lineHeight: { xs: 1.1, md: 1.2 },
                  textAlign: { xs: 'center', md: 'left' }
                }}
              >
                {currentHero.title}
              </Typography>

              {/* Description */}
              <Typography 
                variant="h6" 
                sx={{ 
                  mb: { xs: 3, md: 4 }, 
                  color: '#B0B0B0',
                  lineHeight: 1.6,
                  fontSize: { xs: '0.95rem', sm: '1rem', md: '1.1rem' },
                  textAlign: { xs: 'center', md: 'left' },
                  px: { xs: 1, md: 0 }
                }}
              >
                {currentHero.description}
              </Typography>

              {/* Shop Now Button */}
              <Button
                variant="contained"
                size="large"
                onClick={() => router.push('/shop')}
                sx={{
                  bgcolor: '#FF6B35',
                  color: 'white',
                  fontWeight: 600,
                  px: { xs: 3, md: 4 },
                  py: { xs: 1.2, md: 1.5 },
                  borderRadius: 2,
                  fontSize: { xs: '1rem', md: '1.1rem' },
                  width: { xs: '100%', sm: 'auto' },
                  maxWidth: { xs: 280, sm: 'none' },
                  mx: { xs: 'auto', md: 0 },
                  mb: { xs: 1, md: 0 },
                  '&:hover': {
                    bgcolor: '#E55A2B'
                  }
                }}
                endIcon={<Icon icon="solar:arrow-right-linear" width={20} />}
              >
                {currentHero.buttonText}
              </Button>
            </Box>
          </Grid>

          {/* Right Section - Product Image */}
          <Grid size={{ xs: 12, md: 6 }} sx={{ order: { xs: 1, md: 2 } }}>
            <Box sx={{ textAlign: 'center', mb: { xs: 1, md: 0 } }}>
              <Box
                component="img"
                src={currentHero.productImage}
                alt={currentHero.title}
                sx={{
                  width: '100%',
                  maxWidth: { xs: 280, sm: 350, md: 400 },
                  height: { xs: 250, sm: 320, md: 400 },
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.3))',
                  mx: 'auto'
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Carousel Indicators - Bottom Center */}
      <Box
        sx={{
          position: 'absolute',
          bottom: { xs: 15, md: 20 },
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: 1,
          zIndex: 2
        }}
      >
        {heroSlides.map((_, index) => (
          <Box
            key={index}
            onClick={() => handleSlideChange(index)}
            sx={{
              width: { xs: 10, md: 12 },
              height: { xs: 10, md: 12 },
              borderRadius: '50%',
              bgcolor: index === currentSlide ? '#FF6B35' : '#404040',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              '&:hover': {
                bgcolor: index === currentSlide ? '#E55A2B' : '#606060'
              }
            }}
          />
        ))}
      </Box>

      {/* Navigation Arrows - Bottom Right */}
      <Box
        sx={{
          position: 'absolute',
          bottom: { xs: 15, md: 20 },
          right: { xs: 20, md: 40 },
          display: { xs: 'none', sm: 'flex' },
          gap: 1,
          zIndex: 2
        }}
      >
        <IconButton
          onClick={handlePrevSlide}
          sx={{
            bgcolor: 'rgba(255, 107, 53, 0.2)',
            color: '#FF6B35',
            '&:hover': {
              bgcolor: 'rgba(255, 107, 53, 0.3)'
            }
          }}
        >
          <Icon icon="solar:alt-arrow-left-linear" width={20} />
        </IconButton>
        <IconButton
          onClick={handleNextSlide}
          sx={{
            bgcolor: 'rgba(255, 107, 53, 0.2)',
            color: '#FF6B35',
            '&:hover': {
              bgcolor: 'rgba(255, 107, 53, 0.3)'
            }
          }}
        >
          <Icon icon="solar:alt-arrow-right-linear" width={20} />
        </IconButton>
      </Box>
    </Box>
  );
}

// ----------------------------------------------------------------------

type ProductCardProps = {
  product: Product;
};

function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, product.variants[0].id, product.colors[0].name);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: (theme) => theme.shadows[8],
        },
      }}
    >
      {/* Badges */}
      <Box sx={{ position: 'absolute', top: 12, left: 12, zIndex: 1 }}>
        <Stack spacing={1}>
          {product.isNew && <Chip label="NEW" color="info" size="small" />}
          {product.discount && (
            <Chip label={`-${product.discount}%`} color="error" size="small" />
          )}
        </Stack>
      </Box>

      {/* Wishlist Button */}
      <IconButton
        onClick={handleToggleWishlist}
        sx={{
          position: 'absolute',
          top: 8,
          right: 8,
          zIndex: 1,
          bgcolor: 'background.paper',
          '&:hover': { bgcolor: 'background.paper' },
        }}
      >
        <Icon
          icon={isInWishlist(product.id) ? 'solar:heart-bold' : 'solar:heart-linear'}
          width={20}
          style={{ color: isInWishlist(product.id) ? '#f44336' : '#9e9e9e' }}
        />
      </IconButton>

      <CardActionArea onClick={() => router.push(`/product/${product.id}`)}>
        <CardMedia
          component="img"
          height="240"
          image={product.images[0]}
          alt={product.name}
          sx={{ objectFit: 'cover' }}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography variant="caption" color="text.secondary" gutterBottom>
            {product.brand}
          </Typography>
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {product.name}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Rating value={product.rating} precision={0.1} readOnly size="small" />
            <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
              ({product.reviewCount})
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
      <Box sx={{ p: 2, pt: 0 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="h6" color="primary">
              {fCurrency(product.price)}
            </Typography>
            {product.originalPrice && (
              <Typography variant="body2" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
                {fCurrency(product.originalPrice)}
              </Typography>
            )}
          </Box>
          <Button
            size="small"
            variant="outlined"
            startIcon={<Icon icon="solar:bag-5-outline" width={18} />}
            onClick={handleAddToCart}
            sx={{
              bgcolor: 'background.paper',
              borderColor: 'grey.300',
              color: 'text.primary',
              '&:hover': {
                bgcolor: 'grey.50',
                borderColor: 'grey.400',
              },
            }}
          >
            Add to Cart
          </Button>
        </Box>
      </Box>
    </Card>
  );
}

// ----------------------------------------------------------------------

function SpecialOfferSection() {
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState({
    days: 1,
    hours: 7,
    minutes: 59,
    seconds: 3
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { days, hours, minutes, seconds } = prev;
        
        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else if (days > 0) {
          days--;
          hours = 23;
          minutes = 59;
          seconds = 59;
        }
        
        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const [selectedColor, setSelectedColor] = useState('orange');
  const [selectedMemory, setSelectedMemory] = useState('128GB');

  const colors = [
    { name: 'orange', color: '#FF6B35', selected: true },
    { name: 'purple', color: '#8E44AD' },
    { name: 'cyan', color: '#00BCD4' },
    { name: 'green', color: '#4CAF50' }
  ];

  const memories = ['128GB', '256GB', '512GB', '1TB'];

  return (
    <Container maxWidth="xl" sx={{ py: 8, bgcolor: 'background.paper' }}>
      <Typography variant="h3" sx={{ mb: 6, fontWeight: 600 }}>
        Special offer
      </Typography>

      <Grid container spacing={4} alignItems="center">
        {/* Left Section - Offer Details & Countdown */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ p: 3, height: 'fit-content', bgcolor: (theme) => alpha(theme.palette.grey[500], 0.08) }}>
            <Stack spacing={2}>
              <Chip 
                label="NEW 2022" 
                sx={{ 
                  bgcolor: '#FF6B35', 
                  color: 'white', 
                  fontWeight: 600,
                  width: 'fit-content'
                }} 
              />
              
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                Apple iPhone 14
              </Typography>
              
              <Box sx={{ 
                bgcolor: (theme) => alpha(theme.palette.grey[500], 0.1),
                borderRadius: 2,
                p: 2,
                textAlign: 'center'
              }}>
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  From $999
                </Typography>
              </Box>

              <Divider sx={{ borderStyle: 'dashed' }} />

              <Typography variant="body2" sx={{ textAlign: 'center', mb: 2 }}>
                Deal ends in:
              </Typography>

              <Grid container spacing={1}>
                {[
                  { value: timeLeft.days, label: 'days' },
                  { value: timeLeft.hours, label: 'hours' },
                  { value: timeLeft.minutes, label: 'minutes' },
                  { value: timeLeft.seconds, label: 'seconds' }
                ].map((item, index) => (
                  <Grid key={index} size={{ xs: 3 }}>
                    <Box sx={{
                      bgcolor: (theme) => alpha(theme.palette.grey[500], 0.1),
                      borderRadius: 2,
                      p: 1,
                      textAlign: 'center'
                    }}>
                      <Typography variant="h6" sx={{ fontWeight: 700 }}>
                        {String(item.value).padStart(2, '0')}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {item.label}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Stack>
          </Card>
        </Grid>

        {/* Middle Section - Product Image */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ p: 3, textAlign: 'center', bgcolor: (theme) => alpha(theme.palette.grey[500], 0.08) }}>
            <Box
              component="img"
              src="/assets/images/product/product-1.webp"
              alt="Apple iPhone 14"
              sx={{
                width: '100%',
                maxWidth: 300,
                height: 400,
                objectFit: 'contain',
                bgcolor: (theme) => alpha(theme.palette.grey[500], 0.04),
                borderRadius: 2
              }}
            />
          </Card>
        </Grid>

        {/* Right Section - Product Info & Options */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Stack spacing={3}>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              Apple iPhone 14
            </Typography>

            <Typography variant="body1" color="text.secondary">
              While most people enjoy casino gambling, sports betting, lottery and bingo playing for the fun.
            </Typography>

            {/* Color Selection */}
            <Box>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 600 }}>
                Color
              </Typography>
              <Stack direction="row" spacing={1}>
                {colors.map((color) => (
                  <Box
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    sx={{
                      width: 32,
                      height: 32,
                      borderRadius: 1,
                      bgcolor: color.color,
                      cursor: 'pointer',
                      border: selectedColor === color.name ? '2px solid #000' : '2px solid transparent',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      '&:hover': {
                        border: '2px solid #000'
                      }
                    }}
                  >
                    {selectedColor === color.name && (
                      <Icon icon="solar:check-circle-bold" width={16} style={{ color: 'white' }} />
                    )}
                  </Box>
                ))}
              </Stack>
            </Box>

            {/* Memory Selection */}
            <Box>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 600 }}>
                Memory
              </Typography>
              <Stack direction="row" spacing={1}>
                {memories.map((memory) => (
                  <Button
                    key={memory}
                    variant="outlined"
                    size="small"
                    onClick={() => setSelectedMemory(memory)}
                    sx={{
                      borderColor: selectedMemory === memory ? '#000' : 'grey.300',
                      color: selectedMemory === memory ? '#000' : 'text.secondary',
                      fontWeight: selectedMemory === memory ? 600 : 400,
                      '&:hover': {
                        borderColor: '#000',
                        color: '#000'
                      }
                    }}
                  >
                    {memory}
                  </Button>
                ))}
              </Stack>
            </Box>

            {/* Buy Now Button */}
            <Button
              variant="contained"
              size="medium"
              onClick={() => router.push('/product-details/1')}
              sx={{
                bgcolor: '#424242',
                color: 'white',
                fontWeight: 600,
                py: 1,
                px: 3,
                width: 'fit-content',
                '&:hover': {
                  bgcolor: '#303030'
                }
              }}
            >
              Buy now
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}

// ----------------------------------------------------------------------

function HotDealSection() {
  const router = useRouter();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [timeLeft, setTimeLeft] = useState({
    hours: 1,
    minutes: 22,
    seconds: 8
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev;
        
        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        }
        
        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const hotDealProducts = [
    {
      id: 1,
      name: "Apple iPhone",
      price: 83.74,
      originalPrice: 120.00,
      image: "/assets/images/product/product-1.webp",
      sold: 100,
      total: 120,
      progress: 83
    },
    {
      id: 2,
      name: "Samsung Galaxy",
      price: 97.14,
      originalPrice: 150.00,
      image: "/assets/images/product/product-2.webp",
      sold: 50,
      total: 100,
      progress: 50
    },
    {
      id: 3,
      name: "Nike Air Max",
      price: 68.71,
      originalPrice: 120.00,
      image: "/assets/images/product/product-3.webp",
      sold: 33,
      total: 100,
      progress: 33
    },
    {
      id: 4,
      name: "Adidas Ultraboost",
      price: 85.21,
      originalPrice: 140.00,
      image: "/assets/images/product/product-4.webp",
      sold: 25,
      total: 100,
      progress: 25
    },
    {
      id: 5,
      name: "Sony PlayStation",
      price: 52.17,
      originalPrice: 80.00,
      image: "/assets/images/product/product-5.webp",
      sold: 20,
      total: 100,
      progress: 20
    },
    {
      id: 6,
      name: "Microsoft Surface",
      price: 25.18,
      originalPrice: 50.00,
      image: "/assets/images/product/product-6.webp",
      sold: 17,
      total: 100,
      progress: 17
    }
  ];

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -300,
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 300,
        behavior: 'smooth'
      });
    }
  };

  return (
    <Container maxWidth="xl" sx={{ py: 8, bgcolor: 'background.paper' }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 4 }}>
        {/* Title with flame icon */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Icon icon="solar:fire-bold" width={24} style={{ color: '#FF6B35' }} />
          <Typography variant="h3" sx={{ fontWeight: 700, color: 'text.primary' }}>
            Hot deal today
          </Typography>
        </Box>

        {/* Countdown Timer */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box sx={{
            bgcolor: '#424242',
            color: 'white',
            borderRadius: 2,
            px: 2,
            py: 1,
            textAlign: 'center',
            minWidth: 50
          }}>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {String(timeLeft.hours).padStart(2, '0')}h
            </Typography>
          </Box>
          <Typography variant="h6" sx={{ color: '#424242' }}>:</Typography>
          <Box sx={{
            bgcolor: '#424242',
            color: 'white',
            borderRadius: 2,
            px: 2,
            py: 1,
            textAlign: 'center',
            minWidth: 50
          }}>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {String(timeLeft.minutes).padStart(2, '0')}m
            </Typography>
          </Box>
          <Typography variant="h6" sx={{ color: '#424242' }}>:</Typography>
          <Box sx={{
            bgcolor: '#424242',
            color: 'white',
            borderRadius: 2,
            px: 2,
            py: 1,
            textAlign: 'center',
            minWidth: 50
          }}>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {String(timeLeft.seconds).padStart(2, '0')}s
            </Typography>
          </Box>
        </Box>

        {/* Navigation Arrows */}
        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton
            onClick={scrollLeft}
            sx={{
              bgcolor: (theme) => alpha(theme.palette.grey[500], 0.1),
              '&:hover': {
                bgcolor: (theme) => alpha(theme.palette.grey[500], 0.2)
              }
            }}
          >
            <Icon icon="solar:alt-arrow-left-linear" width={20} />
          </IconButton>
          <IconButton
            onClick={scrollRight}
            sx={{
              bgcolor: (theme) => alpha(theme.palette.grey[500], 0.1),
              '&:hover': {
                bgcolor: (theme) => alpha(theme.palette.grey[500], 0.2)
              }
            }}
          >
            <Icon icon="solar:alt-arrow-right-linear" width={20} />
          </IconButton>
        </Box>
      </Box>

      {/* Product Cards - Horizontal Scrollable */}
      <Box
        ref={scrollContainerRef}
        sx={{
          display: 'flex',
          gap: 3,
          overflowX: 'auto',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          '&::-webkit-scrollbar': {
            display: 'none'
          },
          pb: 2
        }}
      >
        {hotDealProducts.map((product) => (
          <Card
            key={product.id}
            sx={{
              minWidth: 280,
              maxWidth: 280,
              cursor: 'pointer',
              '&:hover': {
                transform: 'translateY(-4px)',
                transition: 'transform 0.3s ease'
              }
            }}
            onClick={() => router.push(`/product-details/${product.id}`)}
          >
            <CardContent sx={{ p: 3 }}>
              {/* Product Image */}
              <Box
                component="img"
                src={product.image}
                alt={product.name}
                sx={{
                  width: '100%',
                  height: 200,
                  objectFit: 'contain',
                  bgcolor: (theme) => alpha(theme.palette.grey[500], 0.04),
                  borderRadius: 2,
                  mb: 2
                }}
              />

              {/* Product Name */}
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                {product.name}
              </Typography>

              {/* Price */}
              <Typography variant="h5" sx={{ color: '#d32f2f', fontWeight: 700, mb: 2 }}>
                ${product.price}
              </Typography>

              {/* Progress Bar & Sold Info */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ flex: 1 }}>
                  <LinearProgress
                    variant="determinate"
                    value={product.progress}
                    sx={{
                      height: 6,
                      borderRadius: 3,
                      bgcolor: (theme) => alpha(theme.palette.grey[500], 0.2),
                      '& .MuiLinearProgress-bar': {
                        bgcolor: '#424242',
                        borderRadius: 3
                      }
                    }}
                  />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, minWidth: 'fit-content' }}>
                  <Icon icon="solar:fire-bold" width={16} style={{ color: '#FF6B35' }} />
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {product.sold} sold
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Container>
  );
}

// ----------------------------------------------------------------------

function FeaturedBrandsSection() {
  const router = useRouter();

  const featuredBrands = [
    {
      id: 2,
      name: "Microsoft Surface",
      category: "Toys and games",
      currentPrice: 25.18,
      originalPrice: null,
      image: "/assets/images/product/product-2.webp",
      hasDiscount: false
    },
    {
      id: 3,
      name: "Tesla Model S",
      category: "Sports and outdoors",
      currentPrice: 43.84,
      originalPrice: null,
      image: "/assets/images/product/product-3.webp",
      hasDiscount: false
    },
    {
      id: 4,
      name: "Amazon Echo",
      category: "Baby and kids",
      currentPrice: 60.98,
      originalPrice: null,
      image: "/assets/images/product/product-4.webp",
      hasDiscount: false
    },
    {
      id: 5,
      name: "Apple iPhone",
      category: "Electronics",
      currentPrice: 83.74,
      originalPrice: 120.00,
      image: "/assets/images/product/product-5.webp",
      hasDiscount: true
    }
  ];

  return (
    <Container maxWidth="xl" sx={{ py: 8, bgcolor: 'background.paper' }}>
      <Typography variant="h3" sx={{ mb: 6, fontWeight: 700, color: 'text.primary' }}>
        Featured brands
      </Typography>

      <Grid container spacing={3}>
        {/* Sony PlayStation Product Card - Large Left Card */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card 
            sx={{ 
              height: '100%',
              cursor: 'pointer',
              border: '1px solid',
              borderColor: 'grey.200',
              '&:hover': {
                transform: 'translateY(-2px)',
                transition: 'transform 0.3s ease',
                boxShadow: 2
              }
            }}
            onClick={() => router.push('/product-details/1')}
          >
            <CardContent sx={{ p: 4, textAlign: 'center', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              {/* Product Image */}
              <Box
                component="img"
                src="/assets/images/product/product-1.webp"
                alt="Sony PlayStation"
                sx={{
                  width: '100%',
                  maxWidth: 200,
                  height: 200,
                  objectFit: 'contain',
                  bgcolor: (theme) => alpha(theme.palette.grey[500], 0.04),
                  borderRadius: 2,
                  mb: 3
                }}
              />

              {/* Product Name */}
              <Typography variant="h4" sx={{ fontWeight: 700, color: 'text.primary', mb: 2 }}>
                Sony PlayStation
              </Typography>

              {/* Category */}
              <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                Health and wellness
              </Typography>

              {/* Price */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="h5" sx={{ fontWeight: 700, color: 'text.primary', display: 'inline' }}>
                  $52.17
                </Typography>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    textDecoration: 'line-through', 
                    color: 'text.secondary', 
                    ml: 1,
                    display: 'inline'
                  }}
                >
                  $25.18
                </Typography>
              </Box>

              {/* Buy Now Button */}
              <Button
                variant="outlined"
                size="medium"
                sx={{
                  borderColor: 'grey.300',
                  color: 'text.primary',
                  fontWeight: 600,
                  py: 1,
                  px: 3,
                  width: 'fit-content',
                  alignSelf: 'center',
                  '&:hover': {
                    borderColor: 'grey.400',
                    bgcolor: 'grey.50'
                  }
                }}
              >
                Buy now
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Product Cards - Right Side Grid */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Grid container spacing={3}>
            {featuredBrands.map((brand) => (
              <Grid key={brand.id} size={{ xs: 12, sm: 6 }}>
                <Card 
                  sx={{ 
                    height: '100%',
                    cursor: 'pointer',
                    border: '1px solid',
                    borderColor: 'grey.200',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      transition: 'transform 0.3s ease',
                      boxShadow: 2
                    }
                  }}
                  onClick={() => router.push(`/product-details/${brand.id}`)}
                >
                  <CardContent sx={{ p: 3 }}>
                    {/* Product Image */}
                    <Box
                      component="img"
                      src={brand.image}
                      alt={brand.name}
                      sx={{
                        width: '100%',
                        height: 150,
                        objectFit: 'contain',
                        bgcolor: (theme) => alpha(theme.palette.grey[500], 0.04),
                        borderRadius: 2,
                        mb: 2
                      }}
                    />

                    {/* Product Name */}
                    <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary', mb: 1 }}>
                      {brand.name}
                    </Typography>

                    {/* Category */}
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {brand.category}
                    </Typography>

                    {/* Price */}
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary', display: 'inline' }}>
                        ${brand.currentPrice}
                      </Typography>
                      {brand.hasDiscount && brand.originalPrice && (
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            textDecoration: 'line-through', 
                            color: 'text.secondary', 
                            ml: 1,
                            display: 'inline'
                          }}
                        >
                          ${brand.originalPrice}
                        </Typography>
                      )}
                    </Box>

                    {/* Buy Now Button */}
                    <Button
                      variant="outlined"
                      size="small"
                      sx={{
                        borderColor: 'grey.300',
                        color: 'text.primary',
                        fontWeight: 600,
                        py: 0.5,
                        px: 2,
                        width: 'fit-content',
                        '&:hover': {
                          borderColor: 'grey.400',
                          bgcolor: 'grey.50'
                        }
                      }}
                    >
                      Buy now
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

