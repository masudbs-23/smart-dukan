import { useState, useMemo } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { alpha } from '@mui/material/styles';
import { Icon } from '@iconify/react';

import { useBusiness } from 'src/contexts/BusinessContext';
import { PRODUCTS } from 'src/_mock/_products';
import { fCurrency } from 'src/utils/format-number';

// ----------------------------------------------------------------------

export default function ProductsManagementPage() {
  const { selectedBusiness } = useBusiness();
  const [searchQuery, setSearchQuery] = useState('');

  const businessProducts = useMemo(() => {
    const filtered = PRODUCTS.filter((product) => product.businessId === selectedBusiness?.id);

    if (searchQuery) {
      return filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.brand.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  }, [selectedBusiness, searchQuery]);

  const handleAddProduct = () => {
    // In real app, this would open a dialog or navigate to add product page
    alert('Add Product functionality - Coming soon!');
  };

  const handleEditProduct = (productId: string) => {
    alert(`Edit Product: ${productId} - Coming soon!`);
  };

  const handleDeleteProduct = (productId: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      alert(`Delete Product: ${productId} - Coming soon!`);
    }
  };

  if (!selectedBusiness) {
    return (
      <Card>
        <Box sx={{ p: 8, textAlign: 'center' }}>
          <Typography variant="h6" color="text.secondary">
            No Business Selected
          </Typography>
        </Box>
      </Card>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Products Management</Typography>
        <Button
          variant="contained"
          size="large"
          startIcon={<Icon icon="solar:add-circle-bold" />}
          onClick={handleAddProduct}
        >
          Add Product
        </Button>
      </Box>

      <Card>
        {/* Search Bar */}
        <Box sx={{ p: 2, borderBottom: (theme) => `1px solid ${alpha(theme.palette.grey[500], 0.12)}` }}>
          <TextField
            fullWidth
            placeholder="Search products by name or brand..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Icon icon="solar:magnifer-linear" width={24} />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {/* Products Table */}
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell>Brand</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Stock</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {businessProducts.length > 0 ? (
                businessProducts.map((product) => (
                  <TableRow key={product.id} hover>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Box
                          component="img"
                          src={product.images[0]}
                          alt={product.name}
                          sx={{
                            width: 48,
                            height: 48,
                            borderRadius: 1,
                            objectFit: 'cover',
                            border: '1px solid rgba(0,0,0,0.08)',
                          }}
                        />
                        <Box>
                          <Typography variant="subtitle2">{product.name}</Typography>
                          <Typography variant="caption" color="text.secondary">
                            {product.id}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>{product.brand}</TableCell>
                    <TableCell>
                      <Chip label={product.category} size="small" variant="outlined" />
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2">{fCurrency(product.price)}</Typography>
                      {product.originalPrice && (
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{ textDecoration: 'line-through' }}
                        >
                          {fCurrency(product.originalPrice)}
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell>{product.stockCount}</TableCell>
                    <TableCell>
                      {product.inStock ? (
                        <Chip label="In Stock" size="small" color="success" />
                      ) : (
                        <Chip label="Out of Stock" size="small" color="error" />
                      )}
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        size="small"
                        onClick={() => handleEditProduct(product.id)}
                        sx={{ mr: 0.5 }}
                      >
                        <Icon icon="solar:pen-bold" width={20} />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleDeleteProduct(product.id)}
                      >
                        <Icon icon="solar:trash-bin-trash-bold" width={20} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7}>
                    <Box sx={{ textAlign: 'center', py: 8 }}>
                      <Icon
                        icon="solar:box-minimalistic-bold-duotone"
                        width={64}
                        style={{ marginBottom: 16, color: '#9e9e9e' }}
                      />
                      <Typography variant="h6" color="text.secondary">
                        No Products Found
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        {searchQuery
                          ? 'Try different search terms'
                          : 'Start by adding your first product'}
                      </Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Summary Footer */}
        {businessProducts.length > 0 && (
          <Box
            sx={{
              p: 2,
              borderTop: (theme) => `1px solid ${alpha(theme.palette.grey[500], 0.12)}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography variant="body2" color="text.secondary">
              Total {businessProducts.length} product{businessProducts.length !== 1 ? 's' : ''}
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Chip
                label={`${businessProducts.filter((p) => p.inStock).length} In Stock`}
                size="small"
                color="success"
                variant="outlined"
              />
              <Chip
                label={`${businessProducts.filter((p) => !p.inStock).length} Out of Stock`}
                size="small"
                color="error"
                variant="outlined"
              />
            </Box>
          </Box>
        )}
      </Card>
    </Box>
  );
}

