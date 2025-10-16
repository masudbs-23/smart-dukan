import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Rating from '@mui/material/Rating';
import Chip from '@mui/material/Chip';
import { alpha } from '@mui/material/styles';

import { useRouter } from 'src/routes/hooks';

import { useCompare } from 'src/contexts/CompareContext';
import { useCart } from 'src/contexts/CartContext';

import { Iconify } from 'src/components/lucide-icons';
import { fCurrency } from 'src/utils/format-number';

// ----------------------------------------------------------------------

export default function ComparePage() {
  const router = useRouter();
  const { items, removeFromCompare, clearCompare } = useCompare();
  const { addToCart } = useCart();

  if (items.length === 0) {
    return (
      <Container maxWidth="xl" sx={{ py: 8 }}>
        <Typography variant="h3" sx={{ mb: 4 }}>
          Compare Products
        </Typography>
        <Box
          sx={{
            textAlign: 'center',
            py: 8,
            bgcolor: (theme) => alpha(theme.palette.grey[500], 0.04),
            borderRadius: 2,
          }}
        >
          <Iconify icon="lucide:git-compare" width={80} sx={{ mb: 3, color: 'text.disabled' }} />
          <Typography variant="h4" sx={{ mb: 2 }}>
            No products to compare
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Add products to compare their features side by side
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
        <Typography variant="h3">Compare Products ({items.length})</Typography>
        <Button color="error" onClick={clearCompare}>
          Clear All
        </Button>
      </Box>

      <Card>
        <TableContainer sx={{ overflowX: 'auto' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ minWidth: 150 }}>Feature</TableCell>
                {items.map((product) => (
                  <TableCell key={product.id} align="center" sx={{ minWidth: 250 }}>
                    <Box sx={{ position: 'relative' }}>
                      <IconButton
                        size="small"
                        onClick={() => removeFromCompare(product.id)}
                        sx={{ position: 'absolute', top: -8, right: -8 }}
                      >
                        <Iconify icon="lucide:x" />
                      </IconButton>
                      <Box
                        component="img"
                        src={product.images[0]}
                        alt={product.name}
                        sx={{
                          width: '100%',
                          height: 200,
                          objectFit: 'contain',
                          mb: 2,
                          bgcolor: (theme) => alpha(theme.palette.grey[500], 0.04),
                          borderRadius: 1,
                        }}
                      />
                      <Typography variant="h6" sx={{ mb: 1 }}>
                        {product.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {product.brand}
                      </Typography>
                    </Box>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {/* Price */}
              <TableRow>
                <TableCell component="th" sx={{ fontWeight: 600 }}>
                  Price
                </TableCell>
                {items.map((product) => (
                  <TableCell key={product.id} align="center">
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
                  </TableCell>
                ))}
              </TableRow>

              {/* Rating */}
              <TableRow>
                <TableCell component="th" sx={{ fontWeight: 600 }}>
                  Rating
                </TableCell>
                {items.map((product) => (
                  <TableCell key={product.id} align="center">
                    <Rating value={product.rating} precision={0.1} readOnly size="small" />
                    <Typography variant="body2" color="text.secondary">
                      {product.rating} ({product.reviewCount} reviews)
                    </Typography>
                  </TableCell>
                ))}
              </TableRow>

              {/* Stock */}
              <TableRow>
                <TableCell component="th" sx={{ fontWeight: 600 }}>
                  Availability
                </TableCell>
                {items.map((product) => (
                  <TableCell key={product.id} align="center">
                    {product.inStock ? (
                      <Chip label="In Stock" color="success" size="small" />
                    ) : (
                      <Chip label="Out of Stock" color="error" size="small" />
                    )}
                  </TableCell>
                ))}
              </TableRow>

              {/* Specifications */}
              {items[0]?.specs.map((spec, index) => (
                <TableRow key={spec.label}>
                  <TableCell component="th" sx={{ fontWeight: 600 }}>
                    {spec.label}
                  </TableCell>
                  {items.map((product) => (
                    <TableCell key={product.id} align="center">
                      {product.specs[index]?.value || '-'}
                    </TableCell>
                  ))}
                </TableRow>
              ))}

              {/* Actions */}
              <TableRow>
                <TableCell component="th" sx={{ fontWeight: 600 }}>
                  Actions
                </TableCell>
                {items.map((product) => (
                  <TableCell key={product.id} align="center">
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => {
                          addToCart(product, product.variants[0].id, product.colors[0].name);
                          router.push('/cart');
                        }}
                        disabled={!product.inStock}
                      >
                        Add to Cart
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => router.push(`/product/${product.id}`)}
                      >
                        View Details
                      </Button>
                    </Box>
                  </TableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Container>
  );
}

