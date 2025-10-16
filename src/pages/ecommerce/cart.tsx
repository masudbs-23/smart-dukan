import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import { alpha } from '@mui/material/styles';

import { useRouter } from 'src/routes/hooks';

import { useCart } from 'src/contexts/CartContext';

import { Icon } from '@iconify/react';
import { fCurrency } from 'src/utils/format-number';

// ----------------------------------------------------------------------

export default function CartPage() {
  const router = useRouter();
  const { items, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();

  const subtotal = getCartTotal();
  const shipping = subtotal > 100 ? 0 : 15;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  if (items.length === 0) {
    return (
      <Container maxWidth="xl" sx={{ py: 8 }}>
        <Card
          sx={{
            textAlign: 'center',
            py: 12,
            px: 6,
            bgcolor: 'background.paper',
            border: '1px solid',
            borderColor: 'grey.200',
            borderRadius: 3,
            boxShadow: 'none'
          }}
        >
          <CardContent>
            {/* Empty Cart Icon */}
            <Box sx={{ mb: 4 }}>
              <Icon 
                icon="solar:bag-5-outline" 
                width={120} 
                style={{ 
                  color: '#bdbdbd',
                  filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))'
                }} 
              />
            </Box>

            {/* Title */}
            <Typography variant="h3" sx={{ mb: 2, fontWeight: 700, color: 'text.primary' }}>
              Your cart is empty
            </Typography>

            {/* Subtitle */}
            <Typography variant="h6" color="text.secondary" sx={{ mb: 4, fontWeight: 400 }}>
              Looks like you haven&apos;t added any items to your cart yet
            </Typography>

            {/* Description */}
            <Typography variant="body1" color="text.secondary" sx={{ mb: 6, maxWidth: 400, mx: 'auto' }}>
              Start shopping to add products to your cart. You&apos;ll find amazing deals and quality products waiting for you!
            </Typography>

            {/* Action Buttons */}
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
              <Button 
                variant="contained" 
                size="large"
                onClick={() => router.push('/shop')}
                startIcon={<Icon icon="solar:shop-bold" width={20} />}
                sx={{
                  px: 4,
                  py: 1.5,
                  fontWeight: 600,
                  borderRadius: 2,
                  textTransform: 'none'
                }}
              >
                Start Shopping
              </Button>
              <Button 
                variant="outlined" 
                size="large"
                onClick={() => router.push('/')}
                startIcon={<Icon icon="solar:home-bold" width={20} />}
                sx={{
                  px: 4,
                  py: 1.5,
                  fontWeight: 600,
                  borderRadius: 2,
                  textTransform: 'none',
                  borderColor: 'grey.300',
                  color: 'text.primary',
                  '&:hover': {
                    borderColor: 'grey.400',
                    bgcolor: 'grey.50'
                  }
                }}
              >
                Go to Home
              </Button>
            </Stack>

            {/* Quick Links */}
            <Box sx={{ mt: 6, pt: 4, borderTop: '1px solid', borderColor: 'grey.100' }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Or check out these popular categories:
              </Typography>
              <Stack direction="row" spacing={2} justifyContent="center" flexWrap="wrap">
                {[
                  { label: 'Electronics', icon: 'solar:cpu-bold' },
                  { label: 'Fashion', icon: 'solar:shirt-bold' },
                  { label: 'Home & Garden', icon: 'solar:home-2-bold' },
                  { label: 'Sports', icon: 'solar:gamepad-bold' }
                ].map((category, index) => (
                  <Button
                    key={index}
                    variant="text"
                    size="small"
                    startIcon={<Icon icon={category.icon} width={16} />}
                    onClick={() => router.push(`/shop?category=${category.label.toLowerCase().replace(' & ', '-').replace(' ', '-')}`)}
                    sx={{
                      color: 'text.secondary',
                      fontWeight: 500,
                      textTransform: 'none',
                      '&:hover': {
                        bgcolor: 'grey.50',
                        color: 'text.primary'
                      }
                    }}
                  >
                    {category.label}
                  </Button>
                ))}
              </Stack>
            </Box>
          </CardContent>
        </Card>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h3" sx={{ mb: 4 }}>
        Shopping Cart
      </Typography>

      <Grid container spacing={3}>
        {/* Cart Items */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Card>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Product</TableCell>
                    <TableCell align="center">Price</TableCell>
                    <TableCell align="center">Quantity</TableCell>
                    <TableCell align="center">Total</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {items.map((item) => {
                    const variant = item.product.variants.find((v) => v.id === item.variantId);
                    const price = variant?.price || item.product.price;
                    const itemTotal = price * item.quantity;

                    return (
                      <TableRow key={`${item.product.id}-${item.variantId}-${item.colorName}`}>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Box
                              component="img"
                              src={item.product.images[0]}
                              alt={item.product.name}
                              sx={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 1 }}
                            />
                            <Box>
                              <Typography variant="subtitle1">{item.product.name}</Typography>
                              <Typography variant="body2" color="text.secondary">
                                {item.product.brand}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {variant?.storage} {variant?.ram && `/ ${variant?.ram}`} • {item.colorName}
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell align="center">
                          <Typography variant="body1">{fCurrency(price)}</Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                            <IconButton
                              size="small"
                              onClick={() =>
                                updateQuantity(
                                  item.product.id,
                                  item.variantId,
                                  item.colorName,
                                  item.quantity - 1
                                )
                              }
                              disabled={item.quantity <= 1}
                            >
                              <Icon icon="solar:minus-circle-bold" />
                            </IconButton>
                            <Typography variant="body1" sx={{ minWidth: 30, textAlign: 'center' }}>
                              {item.quantity}
                            </Typography>
                            <IconButton
                              size="small"
                              onClick={() =>
                                updateQuantity(
                                  item.product.id,
                                  item.variantId,
                                  item.colorName,
                                  item.quantity + 1
                                )
                              }
                            >
                              <Icon icon="solar:add-circle-bold" />
                            </IconButton>
                          </Box>
                        </TableCell>
                        <TableCell align="center">
                          <Typography variant="subtitle1">{fCurrency(itemTotal)}</Typography>
                        </TableCell>
                        <TableCell align="center">
                          <IconButton
                            color="error"
                            onClick={() =>
                              removeFromCart(item.product.id, item.variantId, item.colorName)
                            }
                          >
                            <Icon icon="solar:trash-bin-trash-bold" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
              <Button startIcon={<Icon icon="solar:arrow-left-linear" />} onClick={() => router.push('/shop')}>
                Continue Shopping
              </Button>
              <Button color="error" onClick={clearCart}>
                Clear Cart
              </Button>
            </Box>
          </Card>
        </Grid>

        {/* Order Summary */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h5" sx={{ mb: 3 }}>
                Order Summary
              </Typography>

              <Stack spacing={2}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body1">Subtotal</Typography>
                  <Typography variant="body1">{fCurrency(subtotal)}</Typography>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body1">Shipping</Typography>
                  <Typography variant="body1">
                    {shipping === 0 ? 'FREE' : fCurrency(shipping)}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body1">Tax (8%)</Typography>
                  <Typography variant="body1">{fCurrency(tax)}</Typography>
                </Box>

                <Divider />

                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="h6">Total</Typography>
                  <Typography variant="h6" color="primary">
                    {fCurrency(total)}
                  </Typography>
                </Box>

                {shipping > 0 && (
                  <Box
                    sx={{
                      p: 2,
                      bgcolor: (theme) => alpha(theme.palette.info.main, 0.08),
                      borderRadius: 1,
                    }}
                  >
                    <Typography variant="body2" color="info.main">
                      Add {fCurrency(100 - subtotal)} more to get FREE shipping!
                    </Typography>
                  </Box>
                )}

                <Button
                  fullWidth
                  size="large"
                  variant="contained"
                  onClick={() => router.push('/checkout')}
                >
                  Proceed to Checkout
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

