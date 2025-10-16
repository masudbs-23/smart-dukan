import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Rating from '@mui/material/Rating';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { alpha } from '@mui/material/styles';

import { useRouter } from 'src/routes/hooks';

import { useWishlist } from 'src/contexts/WishlistContext';
import { useCart } from 'src/contexts/CartContext';

import { Iconify } from 'src/components/lucide-icons';
import { fCurrency } from 'src/utils/format-number';
import type { Product } from 'src/_mock/_products';

// ----------------------------------------------------------------------

export default function WishlistPage() {
  const router = useRouter();
  const { items, removeFromWishlist } = useWishlist();

  if (items.length === 0) {
    return (
      <Container maxWidth="xl" sx={{ py: 8 }}>
        <Typography variant="h3" sx={{ mb: 4 }}>
          My Wishlist
        </Typography>
        <Box
          sx={{
            textAlign: 'center',
            py: 8,
            bgcolor: (theme) => alpha(theme.palette.grey[500], 0.04),
            borderRadius: 2,
          }}
        >
          <Iconify icon="lucide:heart" width={80} sx={{ mb: 3, color: 'text.disabled' }} />
          <Typography variant="h4" sx={{ mb: 2 }}>
            Your wishlist is empty
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Save items you love for later
          </Typography>
          <Button variant="contained" onClick={() => router.push('/shop')}>
            Browse Products
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h3">My Wishlist ({items.length})</Typography>
      </Box>

      <Grid container spacing={3}>
        {items.map((product) => (
          <Grid key={product.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <WishlistProductCard product={product} onRemove={() => removeFromWishlist(product.id)} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

// ----------------------------------------------------------------------

type WishlistProductCardProps = {
  product: Product;
  onRemove: () => void;
};

function WishlistProductCard({ product, onRemove }: WishlistProductCardProps) {
  const router = useRouter();
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, product.variants[0].id, product.colors[0].name);
    router.push('/cart');
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
          {product.discount && <Chip label={`-${product.discount}%`} color="error" size="small" />}
        </Stack>
      </Box>

      {/* Remove Button */}
      <IconButton
        onClick={onRemove}
        sx={{
          position: 'absolute',
          top: 8,
          right: 8,
          zIndex: 1,
          bgcolor: 'background.paper',
          '&:hover': { bgcolor: 'background.paper' },
        }}
      >
        <Iconify icon="lucide:x" sx={{ color: 'error.main' }} />
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
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="h6" color="primary">
              {fCurrency(product.price)}
            </Typography>
            {product.originalPrice && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ textDecoration: 'line-through' }}
              >
                {fCurrency(product.originalPrice)}
              </Typography>
            )}
          </Box>
        </CardContent>
      </CardActionArea>
      <Box sx={{ p: 2, pt: 0 }}>
        <Button
          fullWidth
          variant="contained"
          startIcon={<Iconify icon="solar:bag-5-outline" />}
          onClick={handleAddToCart}
          disabled={!product.inStock}
        >
          {product.inStock ? 'Add to Cart' : 'Out of Stock'}
        </Button>
      </Box>
    </Card>
  );
}

