import { useState } from 'react';
import { useParams } from 'react-router-dom';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import LinearProgress from '@mui/material/LinearProgress';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { alpha } from '@mui/material/styles';

import { useRouter } from 'src/routes/hooks';

import { getProductById, getProductReviews } from 'src/_mock/_products';
import type { Product } from 'src/_mock/_products';

import { useCart } from 'src/contexts/CartContext';
import { useWishlist } from 'src/contexts/WishlistContext';
import { useCompare } from 'src/contexts/CompareContext';

import { Icon } from '@iconify/react';
import { fCurrency } from 'src/utils/format-number';
import { fDate } from 'src/utils/format-time';

// ----------------------------------------------------------------------

export default function ProductDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const product = getProductById(id || '');

  if (!product) {
    return (
      <Container maxWidth="xl" sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h4">Product not found</Typography>
        <Button onClick={() => router.push('/shop')} sx={{ mt: 2 }}>
          Back to Shop
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Breadcrumbs */}
      <Breadcrumbs sx={{ mb: 3 }}>
        <Link 
          component="button"
          variant="body1" 
          onClick={() => router.push('/')}
          sx={{ 
            textDecoration: 'none',
            '&:hover': { textDecoration: 'underline' },
            cursor: 'pointer',
            border: 'none',
            background: 'none',
            color: 'text.secondary'
          }}
        >
          Home
        </Link>
        <Link 
          component="button"
          variant="body1" 
          onClick={() => router.push('/shop')}
          sx={{ 
            textDecoration: 'none',
            '&:hover': { textDecoration: 'underline' },
            cursor: 'pointer',
            border: 'none',
            background: 'none',
            color: 'text.secondary'
          }}
        >
          Shop
        </Link>
        <Link 
          component="button"
          variant="body1" 
          onClick={() => router.push(`/shop?category=${product.category}`)}
          sx={{ 
            textDecoration: 'none',
            '&:hover': { textDecoration: 'underline' },
            cursor: 'pointer',
            border: 'none',
            background: 'none',
            color: 'text.secondary'
          }}
        >
          {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
        </Link>
        <Typography variant="body1" color="text.primary" sx={{ fontWeight: 500 }}>
          {product.name}
        </Typography>
      </Breadcrumbs>

      <ProductInfo product={product} />
      <ProductDetails product={product} />
    </Container>
  );
}

// ----------------------------------------------------------------------

type ProductInfoProps = {
  product: Product;
};

function ProductInfo({ product }: ProductInfoProps) {
  const router = useRouter();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { isInCompare, toggleCompare, items: compareItems, maxItems } = useCompare();

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState(1);

  const currentPrice = selectedVariant.price || product.price;
  const originalPrice = selectedVariant.originalPrice || product.originalPrice;

  const handleAddToCart = () => {
    addToCart(product, selectedVariant.id, selectedColor.name, quantity);
    router.push('/cart');
  };

  const handleToggleCompare = () => {
    if (!isInCompare(product.id) && compareItems.length >= maxItems) {
      alert(`You can only compare up to ${maxItems} products`);
      return;
    }
    toggleCompare(product);
  };

  return (
    <Grid container spacing={4} sx={{ mb: 6 }}>
      {/* Images */}
      <Grid size={{ xs: 12, md: 6 }}>
        {/* Main Image */}
        <Card sx={{ mb: 2 }}>
          <Box
            component="img"
            src={product.images[selectedImage]}
            alt={product.name}
            sx={{
              width: '100%',
              height: 500,
              objectFit: 'contain',
              bgcolor: (theme) => alpha(theme.palette.grey[500], 0.04),
            }}
          />
        </Card>

        {/* Thumbnail Images */}
        <Grid container spacing={1}>
          {product.images.map((image, index) => (
            <Grid key={index} size={{ xs: 3 }}>
              <Card
                onClick={() => setSelectedImage(index)}
                sx={{
                  cursor: 'pointer',
                  border: (theme) =>
                    selectedImage === index ? `2px solid ${theme.palette.primary.main}` : 'none',
                  transition: 'all 0.2s',
                  '&:hover': { transform: 'scale(1.05)' },
                }}
              >
                <Box
                  component="img"
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  sx={{ width: '100%', height: 100, objectFit: 'contain', p: 1 }}
                />
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>

      {/* Product Info */}
      <Grid size={{ xs: 12, md: 6 }}>
        <Stack spacing={3}>
          {/* Brand */}
          <Box>
            <Chip label={product.brand} color="primary" variant="outlined" />
            {product.isNew && <Chip label="NEW" color="info" sx={{ ml: 1 }} />}
            {product.discount && <Chip label={`-${product.discount}%`} color="error" sx={{ ml: 1 }} />}
          </Box>

          {/* Title */}
          <Typography variant="h3">{product.name}</Typography>

          {/* Rating */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Rating value={product.rating} precision={0.1} readOnly />
            <Typography variant="body1">
              {product.rating} ({product.reviewCount} reviews)
            </Typography>
          </Box>

          {/* Price */}
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
              <Typography variant="h3" color="primary">
                {fCurrency(currentPrice)}
              </Typography>
              {originalPrice && (
                <Typography variant="h5" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
                  {fCurrency(originalPrice)}
                </Typography>
              )}
            </Box>
            {product.inStock ? (
              <Chip label={`${product.stockCount} in stock`} color="success" size="small" />
            ) : (
              <Chip label="Out of stock" color="error" size="small" />
            )}
          </Box>

          <Divider />

          {/* Variant Selection */}
          {product.variants.length > 1 && (
            <Box>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                Storage & RAM
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                {product.variants.map((variant) => (
                  <Button
                    key={variant.id}
                    variant="outlined"
                    onClick={() => setSelectedVariant(variant)}
                    sx={{
                      bgcolor: 'background.paper',
                      borderColor: selectedVariant.id === variant.id ? 'grey.900' : 'grey.300',
                      color: selectedVariant.id === variant.id ? 'grey.900' : 'text.primary',
                      '&:hover': {
                        bgcolor: 'grey.50',
                        borderColor: selectedVariant.id === variant.id ? 'grey.900' : 'grey.400',
                      },
                    }}
                  >
                    {variant.storage} {variant.ram && `/ ${variant.ram}`}
                  </Button>
                ))}
              </Stack>
            </Box>
          )}

          {/* Color Selection */}
          {product.colors.length > 0 && (
            <Box>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                Color: {selectedColor.name}
              </Typography>
              <Stack direction="row" spacing={1}>
                {product.colors.map((color) => (
                  <IconButton
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    sx={{
                      width: 48,
                      height: 48,
                      border: (theme) =>
                        selectedColor.name === color.name
                          ? `3px solid ${theme.palette.primary.main}`
                          : `2px solid ${alpha(theme.palette.grey[500], 0.32)}`,
                      bgcolor: color.code,
                      '&:hover': { bgcolor: color.code },
                    }}
                  />
                ))}
              </Stack>
            </Box>
          )}

          {/* Quantity & Buy Now */}
          <Box>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              Quantity
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <IconButton
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                  sx={{
                    border: '1px solid',
                    borderColor: 'grey.300',
                    '&:hover': {
                      borderColor: 'grey.400',
                      bgcolor: 'grey.50',
                    },
                    '&:disabled': {
                      borderColor: 'grey.200',
                    },
                  }}
                >
                  <Icon 
                    icon="solar:minus-circle-bold" 
                    width={24} 
                    style={{ color: quantity <= 1 ? '#bdbdbd' : '#000000' }} 
                  />
                </IconButton>
                <Typography variant="h6" sx={{ minWidth: 40, textAlign: 'center' }}>
                  {quantity}
                </Typography>
                <IconButton
                  onClick={() => setQuantity(Math.min(product.stockCount, quantity + 1))}
                  disabled={quantity >= product.stockCount}
                  sx={{
                    border: '1px solid',
                    borderColor: 'grey.300',
                    '&:hover': {
                      borderColor: 'grey.400',
                      bgcolor: 'grey.50',
                    },
                    '&:disabled': {
                      borderColor: 'grey.200',
                    },
                  }}
                >
                  <Icon 
                    icon="solar:add-circle-bold" 
                    width={24} 
                    style={{ color: quantity >= product.stockCount ? '#bdbdbd' : '#000000' }} 
                  />
                </IconButton>
              </Box>
              <Button
                size="large"
                variant="contained"
                sx={{ 
                  bgcolor: '#d62828 !important', 
                  '&:hover': { 
                    bgcolor: '#b71c1c !important' 
                  },
                  '&.MuiButton-contained': {
                    backgroundColor: '#d62828',
                  },
                  '&.MuiButton-contained:hover': {
                    backgroundColor: '#b71c1c',
                  },
                  ml: 2
                }}
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                Buy Now
              </Button>
            </Box>
          </Box>

          {/* Actions */}
          <Stack spacing={2}>
            {/* All buttons in same row for lg devices */}
            <Stack 
              direction={{ xs: 'column', lg: 'row' }} 
              spacing={2}
              sx={{ 
                '& .MuiButton-root': { 
                  flex: { lg: 1 } 
                } 
              }}
            >
              <Button
                size="large"
                variant="contained"
                startIcon={<Icon icon="solar:bag-5-outline" width={20} style={{ color: 'white' }} />}
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                Add to Cart
              </Button>
              <Button
                variant="outlined"
                startIcon={
                  <Icon
                    icon={isInWishlist(product.id) ? "solar:heart-bold" : "solar:heart-outline"}
                    width={18}
                    style={{ color: isInWishlist(product.id) ? '#f44336' : 'inherit' }}
                  />
                }
                onClick={() => toggleWishlist(product)}
                sx={{
                  borderColor: 'grey.300',
                  color: 'text.primary',
                  '&:hover': {
                    borderColor: 'grey.400',
                    bgcolor: 'grey.50',
                  },
                }}
              >
                {isInWishlist(product.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
              </Button>
              <Button
                variant="outlined"
                startIcon={<Icon icon="solar:scale-outline" width={18} />}
                onClick={handleToggleCompare}
                sx={{
                  borderColor: 'grey.300',
                  color: 'text.primary',
                  '&:hover': {
                    borderColor: 'grey.400',
                    bgcolor: 'grey.50',
                  },
                }}
              >
                {isInCompare(product.id) ? 'Remove from Compare' : 'Compare'}
              </Button>
            </Stack>
          </Stack>

          {/* Features */}
          <Box>
            <Typography variant="subtitle1" sx={{ mb: 2 }}>
              Key Features
            </Typography>
            <Stack spacing={1}>
              {product.features.map((feature, index) => (
                <Box key={index} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                  <Icon icon="solar:check-circle-bold" width={16} style={{ color: '#2e7d32', marginTop: 4 }} />
                  <Typography variant="body2">{feature}</Typography>
                </Box>
              ))}
            </Stack>
          </Box>
        </Stack>
      </Grid>
    </Grid>
  );
}

// ----------------------------------------------------------------------

type ProductDetailsProps = {
  product: Product;
};

function ProductDetails({ product }: ProductDetailsProps) {
  const [currentTab, setCurrentTab] = useState(0);
  const reviews = getProductReviews(product.id);

  const ratingStats = reviews.reduce(
    (acc, review) => {
      acc[review.rating] = (acc[review.rating] || 0) + 1;
      return acc;
    },
    {} as Record<number, number>
  );

  return (
    <Card>
      <Tabs value={currentTab} onChange={(_, value) => setCurrentTab(value)} sx={{ px: 3, pt: 2 }}>
        <Tab label="Description" />
        <Tab label={`Reviews (${reviews.length})`} />
        <Tab label="Specifications" />
      </Tabs>

      <Box sx={{ p: 3 }}>
        {/* Description Tab */}
        {currentTab === 0 && (
          <Box>
            <Typography variant="body1" paragraph>
              {product.description}
            </Typography>
            <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
              Features
            </Typography>
            <Stack spacing={1}>
              {product.features.map((feature, index) => (
                <Box key={index} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                  <Icon icon="solar:check-circle-bold" width={16} style={{ color: '#2e7d32', marginTop: 4 }} />
                  <Typography variant="body1">{feature}</Typography>
                </Box>
              ))}
            </Stack>
          </Box>
        )}

        {/* Reviews Tab */}
        {currentTab === 1 && (
          <Box>
            <Grid container spacing={4}>
              {/* Rating Summary */}
              <Grid size={{ xs: 12, md: 4 }}>
                <Box sx={{ textAlign: 'center', mb: 3 }}>
                  <Typography variant="h2" sx={{ mb: 1 }}>
                    {product.rating}
                  </Typography>
                  <Rating value={product.rating} precision={0.1} readOnly size="large" />
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    Based on {product.reviewCount} reviews
                  </Typography>
                </Box>

                {/* Rating Distribution */}
                <Stack spacing={1}>
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <Box key={rating} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="body2" sx={{ minWidth: 20 }}>
                        {rating}
                      </Typography>
                      <Icon icon="solar:star-bold" width={16} style={{ color: '#ff9800' }} />
                      <LinearProgress
                        variant="determinate"
                        value={((ratingStats[rating] || 0) / reviews.length) * 100}
                        sx={{ flex: 1, height: 8, borderRadius: 1 }}
                      />
                      <Typography variant="body2" color="text.secondary" sx={{ minWidth: 30 }}>
                        {ratingStats[rating] || 0}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </Grid>

              {/* Write Review Form */}
              <Grid size={{ xs: 12 }}>
                <WriteReviewForm />
              </Grid>

              {/* Reviews List */}
              <Grid size={{ xs: 12, md: 8 }}>
                <Stack spacing={3} divider={<Divider />}>
                  {reviews.map((review) => (
                    <Box key={review.id}>
                      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 2 }}>
                        <Avatar src={review.userAvatar} alt={review.userName} />
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="subtitle1">{review.userName}</Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 0.5 }}>
                            <Rating value={review.rating} readOnly size="small" />
                            <Typography variant="caption" color="text.secondary">
                              {fDate(review.date)}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                      <Typography variant="body2" paragraph>
                        {review.comment}
                      </Typography>
                      <Button
                        size="small"
                        startIcon={<Icon icon="solar:like-outline" width={18} />}
                        variant="outlined"
                      >
                        Helpful ({review.helpful})
                      </Button>
                    </Box>
                  ))}
                </Stack>
              </Grid>
            </Grid>
          </Box>
        )}

        {/* Specifications Tab */}
        {currentTab === 2 && (
          <Table>
            <TableBody>
              {product.specs.map((spec) => (
                <TableRow key={spec.label}>
                  <TableCell component="th" sx={{ fontWeight: 600, width: '30%' }}>
                    {spec.label}
                  </TableCell>
                  <TableCell>{spec.value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Box>
    </Card>
  );
}

// ----------------------------------------------------------------------

function WriteReviewForm() {
  const [rating, setRating] = useState<number | null>(0);
  const [reviewText, setReviewText] = useState('');
  const [userName, setUserName] = useState('');

  const handleSubmitReview = () => {
    if (!rating || !reviewText.trim() || !userName.trim()) {
      alert('Please fill all fields and provide a rating');
      return;
    }

    // Here you would typically submit to your backend
    console.log('Review submitted:', {
      rating,
      reviewText,
      userName,
      date: new Date(),
    });

    // Reset form
    setRating(0);
    setReviewText('');
    setUserName('');
    alert('Review submitted successfully!');
  };

  return (
    <Card sx={{ mb: 4, border: '1px solid', borderColor: 'divider' }}>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 3 }}>
          Write a Review
        </Typography>
        
        <Stack spacing={3}>
          {/* Name Field */}
          <TextField
            fullWidth
            label="Your Name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />

          {/* Rating */}
          <Box>
            <Typography component="legend" sx={{ mb: 1 }}>
              Your Rating *
            </Typography>
            <Rating
              value={rating}
              onChange={(event, newValue) => {
                setRating(newValue);
              }}
              size="large"
            />
          </Box>

          {/* Review Text */}
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Write your review"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Share your thoughts about this product..."
            required
          />

          {/* Submit Button */}
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              onClick={handleSubmitReview}
              startIcon={<Icon icon="solar:pen-new-square-outline" width={18} />}
              disabled={!rating || !reviewText.trim() || !userName.trim()}
            >
              Submit Review
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                setRating(0);
                setReviewText('');
                setUserName('');
              }}
            >
              Reset
            </Button>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}

