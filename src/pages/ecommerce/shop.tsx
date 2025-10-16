import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Slider from '@mui/material/Slider';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Pagination from '@mui/material/Pagination';
import { alpha } from '@mui/material/styles';

import { useRouter } from 'src/routes/hooks';

import { PRODUCTS, PRODUCT_CATEGORIES, BRANDS } from 'src/_mock/_products';
import type { Product } from 'src/_mock/_products';

import { useCart } from 'src/contexts/CartContext';
import { useWishlist } from 'src/contexts/WishlistContext';

import { Icon } from '@iconify/react';
import { fCurrency } from 'src/utils/format-number';

// ----------------------------------------------------------------------

export default function ShopPage() {
  const [searchParams] = useSearchParams();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  
  // View mode state
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  // Sort state
  const [sortBy, setSortBy] = useState<'latest' | 'oldest' | 'popular'>('latest');
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8); // Reduced to 8 to ensure pagination shows
  
  // Filter states
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    searchParams.get('category') ? [searchParams.get('category')!] : []
  );
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<number[]>([0, 2000]);
  const [inStockOnly, setInStockOnly] = useState(false);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = PRODUCTS.filter((product) => {
      // Search filter
      if (search) {
        const searchLower = search.toLowerCase();
        if (
          !product.name.toLowerCase().includes(searchLower) &&
          !product.brand.toLowerCase().includes(searchLower) &&
          !product.description.toLowerCase().includes(searchLower)
        ) {
          return false;
        }
      }

      // Category filter
      if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) {
        return false;
      }

      // Brand filter
      if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) {
        return false;
      }

      // Price filter
      if (product.price < priceRange[0] || product.price > priceRange[1]) {
        return false;
      }

      // Stock filter
      if (inStockOnly && !product.inStock) {
        return false;
      }

      return true;
    });

    // Sort products
    switch (sortBy) {
      case 'latest':
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        break;
      case 'popular':
        filtered.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      default:
        break;
    }

    return filtered;
  }, [search, selectedCategories, selectedBrands, priceRange, inStockOnly, sortBy]);

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, selectedCategories, selectedBrands, priceRange, inStockOnly, sortBy]);

  const handleCategoryToggle = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((c) => c !== categoryId) : [...prev, categoryId]
    );
  };

  const handleBrandToggle = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const handleClearFilters = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setPriceRange([0, 2000]);
    setInStockOnly(false);
    setSearch('');
  };

  const filterContent = (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ mb: 3 }}>
        Filters
      </Typography>

      {/* Search */}
      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: <Icon icon="lucide:search" width={20} height={20} style={{ marginRight: 8 }} />,
          }}
        />
      </Box>

      {/* Categories */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" sx={{ mb: 1 }}>
          Categories
        </Typography>
        <FormGroup>
          {PRODUCT_CATEGORIES.map((category) => (
            <FormControlLabel
              key={category.id}
              control={
                <Checkbox
                  checked={selectedCategories.includes(category.id)}
                  onChange={() => handleCategoryToggle(category.id)}
                />
              }
              label={category.name}
            />
          ))}
        </FormGroup>
      </Box>

      {/* Brands */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" sx={{ mb: 1 }}>
          Brands
        </Typography>
        <FormGroup>
          {BRANDS.map((brand) => (
            <FormControlLabel
              key={brand}
              control={
                <Checkbox
                  checked={selectedBrands.includes(brand)}
                  onChange={() => handleBrandToggle(brand)}
                />
              }
              label={brand}
            />
          ))}
        </FormGroup>
      </Box>

      {/* Price Range */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" sx={{ mb: 2 }}>
          Price Range
        </Typography>
        <Slider
          value={priceRange}
          onChange={(_, newValue) => setPriceRange(newValue as number[])}
          valueLabelDisplay="auto"
          min={0}
          max={2000}
          step={50}
          marks={[
            { value: 0, label: '$0' },
            { value: 2000, label: '$2000' },
          ]}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
          <Typography variant="body2">{fCurrency(priceRange[0])}</Typography>
          <Typography variant="body2">{fCurrency(priceRange[1])}</Typography>
        </Box>
      </Box>

      {/* Stock */}
      <Box sx={{ mb: 3 }}>
        <FormControlLabel
          control={<Checkbox checked={inStockOnly} onChange={(e) => setInStockOnly(e.target.checked)} />}
          label="In Stock Only"
        />
      </Box>

      {/* Clear Filters */}
      <Button fullWidth variant="outlined" onClick={handleClearFilters}>
        Clear Filters
      </Button>
    </Box>
  );

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h3" sx={{ mb: 4 }}>
        Shop
      </Typography>

      <Grid container spacing={3}>
        {/* Desktop Filters */}
        <Grid size={{ xs: 12, md: 3 }} sx={{ display: { xs: 'none', md: 'block' } }}>
          <Card>{filterContent}</Card>
        </Grid>

        {/* Products */}
        <Grid size={{ xs: 12, md: 9 }}>
          {/* Toolbar */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            {/* View Toggle Icons */}
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton
                onClick={() => setViewMode('grid')}
                sx={{
                  bgcolor: viewMode === 'grid' ? 'action.selected' : 'transparent',
                  '&:hover': { bgcolor: 'action.hover' }
                }}
              >
                <Icon icon="lucide:layout-grid" width={20} height={20} />
              </IconButton>
              <IconButton
                onClick={() => setViewMode('list')}
                sx={{
                  bgcolor: viewMode === 'list' ? 'action.selected' : 'transparent',
                  '&:hover': { bgcolor: 'action.hover' }
                }}
              >
                <Icon icon="lucide:list" width={20} height={20} />
              </IconButton>
            </Box>

            {/* Sort Dropdown */}
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <Select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'latest' | 'oldest' | 'popular')}
                sx={{
                  bgcolor: 'action.selected',
                  '& .MuiOutlinedInput-notchedOutline': {
                    border: 'none',
                  },
                  '& .MuiSelect-select': {
                    py: 1,
                  },
                }}
              >
                <MenuItem value="latest">Latest</MenuItem>
                <MenuItem value="oldest">Oldest</MenuItem>
                <MenuItem value="popular">Popular</MenuItem>
              </Select>
            </FormControl>
            
            <IconButton
              sx={{ display: { md: 'none' } }}
              onClick={() => setMobileFiltersOpen(true)}
            >
              <Icon icon="lucide:filter" width={20} height={20} />
            </IconButton>
          </Box>

          {/* Active Filters */}
          {(selectedCategories.length > 0 || selectedBrands.length > 0 || search) && (
            <Box sx={{ mb: 3 }}>
              <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                {selectedCategories.map((categoryId) => {
                  const category = PRODUCT_CATEGORIES.find((c) => c.id === categoryId);
                  return (
                    <Chip
                      key={categoryId}
                      label={category?.name}
                      onDelete={() => handleCategoryToggle(categoryId)}
                    />
                  );
                })}
                {selectedBrands.map((brand) => (
                  <Chip key={brand} label={brand} onDelete={() => handleBrandToggle(brand)} />
                ))}
                {search && <Chip label={`Search: ${search}`} onDelete={() => setSearch('')} />}
              </Stack>
            </Box>
          )}

          {/* Products Grid */}
          {currentProducts.length > 0 ? (
            <>
              <Grid container spacing={3}>
                {currentProducts.map((product) => (
                  <Grid 
                    key={product.id} 
                    size={viewMode === 'grid' ? { xs: 12, sm: 6, lg: 3 } : { xs: 12 }}
                  >
                    <ProductCard product={product} viewMode={viewMode} />
                  </Grid>
                ))}
              </Grid>
              
              {/* Pagination */}
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <Pagination
                  count={totalPages}
                  page={currentPage}
                  onChange={(event, page) => setCurrentPage(page)}
                  size="large"
                  showFirstButton
                  showLastButton
                  siblingCount={1}
                  boundaryCount={1}
                  sx={{
                    '& .MuiPaginationItem-root': {
                      fontSize: '1rem',
                      minWidth: 40,
                      height: 40,
                      borderRadius: '50%',
                      border: 'none',
                      fontWeight: 500,
                      color: '#666666',
                      backgroundColor: 'transparent',
                      '&.Mui-selected': {
                        backgroundColor: '#333333',
                        color: 'white',
                        '&:hover': {
                          backgroundColor: '#333333',
                        },
                      },
                      '&:hover': {
                        backgroundColor: 'transparent',
                        color: '#333333',
                      },
                    },
                    '& .MuiPaginationItem-previousNext': {
                      borderRadius: '50%',
                      border: 'none',
                      color: '#666666',
                      backgroundColor: 'transparent',
                      '&:hover': {
                        backgroundColor: 'transparent',
                        color: '#333333',
                      },
                    },
                    '& .MuiPaginationItem-ellipsis': {
                      color: '#666666',
                    },
                  }}
                />
              </Box>
            </>
          ) : (
            <Box
              sx={{
                textAlign: 'center',
                py: 8,
                bgcolor: (theme) => alpha(theme.palette.grey[500], 0.04),
                borderRadius: 2,
              }}
            >
              <Icon icon="lucide:package-x" width={64} height={64} style={{ marginBottom: 16, color: '#9e9e9e' }} />
              <Typography variant="h6" color="text.secondary">
                No products found
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Try adjusting your filters
              </Typography>
            </Box>
          )}
        </Grid>
      </Grid>

      {/* Mobile Filters Drawer */}
      <Drawer
        anchor="right"
        open={mobileFiltersOpen}
        onClose={() => setMobileFiltersOpen(false)}
      >
        <Box sx={{ width: 300 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
            <Typography variant="h6">Filters</Typography>
            <IconButton onClick={() => setMobileFiltersOpen(false)}>
              <Icon icon="lucide:x" width={20} height={20} />
            </IconButton>
          </Box>
          {filterContent}
        </Box>
      </Drawer>
    </Container>
  );
}

// ----------------------------------------------------------------------

type ProductCardProps = {
  product: Product;
  viewMode: 'grid' | 'list';
};

function ProductCard({ product, viewMode }: ProductCardProps) {
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

  if (viewMode === 'list') {
    return (
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'row',
          position: 'relative',
          transition: 'transform 0.2s, box-shadow 0.2s',
          '&:hover': {
            transform: 'translateY(-2px)',
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
          icon={isInWishlist(product.id) ? 'lucide:heart' : 'lucide:heart'}
          width={20}
          height={20}
          style={{ color: isInWishlist(product.id) ? '#f44336' : '#9e9e9e' }}
        />
        </IconButton>

        <CardActionArea 
          onClick={() => router.push(`/product/${product.id}`)}
          sx={{ display: 'flex', flexDirection: 'row', alignItems: 'stretch' }}
        >
          <CardMedia
            component="img"
            sx={{ 
              width: 200, 
              height: 200, 
              objectFit: 'cover',
              flexShrink: 0
            }}
            image={product.images[0]}
            alt={product.name}
          />
          <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <Box>
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
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {product.description.substring(0, 100)}...
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Rating value={product.rating} precision={0.1} readOnly size="small" />
                <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                  ({product.reviewCount})
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'space-between' }}>
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
              
              <IconButton
                onClick={handleAddToCart}
                sx={{
                  bgcolor: 'error.main',
                  color: 'white',
                  '&:hover': {
                    bgcolor: 'error.dark',
                  },
                  width: 40,
                  height: 40,
                }}
              >
                <Icon icon="solar:bag-5-outline" width={20} height={20} />
              </IconButton>
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  }

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
          icon={isInWishlist(product.id) ? 'lucide:heart' : 'lucide:heart'}
          width={20}
          height={20}
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
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'space-between' }}>
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
            
            <IconButton
              onClick={handleAddToCart}
              sx={{
                bgcolor: 'error.main',
                color: 'white',
                '&:hover': {
                  bgcolor: 'error.dark',
                },
                width: 40,
                height: 40,
              }}
            >
              <Icon icon="solar:bag-5-outline" width={20} height={20} />
            </IconButton>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

