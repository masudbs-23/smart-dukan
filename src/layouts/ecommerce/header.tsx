import type { Theme, SxProps, Breakpoint } from '@mui/material/styles';

import { useState } from 'react';

import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Slide from '@mui/material/Slide';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

import { useRouter } from 'src/routes/hooks';

import { useCart } from 'src/contexts/CartContext';
import { useWishlist } from 'src/contexts/WishlistContext';
import { useCompare } from 'src/contexts/CompareContext';
import { useBusiness } from 'src/contexts/BusinessContext';

import { Logo } from 'src/components/logo';
import { Icon } from '@iconify/react';

// ----------------------------------------------------------------------

type HeaderProps = {
  sx?: SxProps<Theme>;
  layoutQuery: Breakpoint;
};

export function Header({ sx, layoutQuery }: HeaderProps) {
  const theme = useTheme();
  const router = useRouter();
  const { getCartCount } = useCart();
  const { items: wishlistItems } = useWishlist();
  const { items: compareItems } = useCompare();
  const { selectedBusiness, openBusinessSelector } = useBusiness();
  const [searchQuery, setSearchQuery] = useState('');
  const [accountMenuAnchor, setAccountMenuAnchor] = useState<null | HTMLElement>(null);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleAccountMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAccountMenuAnchor(event.currentTarget);
  };

  const handleAccountMenuClose = () => {
    setAccountMenuAnchor(null);
  };

  const handleMobileSearchToggle = () => {
    setMobileSearchOpen(!mobileSearchOpen);
  };

  const handleMobileSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchQuery)}`);
      setMobileSearchOpen(false);
    }
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        bgcolor: 'transparent',
        color: 'text.primary',
        boxShadow: 'none',
        borderBottom: 'none',
        backdropFilter: 'blur(8px)',
        ...sx,
      }}
    >
      <Toolbar sx={{ minHeight: { xs: 64, md: 70 } }}>
        <Container maxWidth="xl">
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 2,
            }}
          >
            {/* Logo & Business Name */}
            <Box
              onClick={() => router.push('/')}
              sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 2 }}
            >
              <Logo />
              {selectedBusiness && (
                <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                  <Typography 
                    variant="subtitle2" 
                    sx={{ 
                      fontWeight: 700,
                      color: selectedBusiness.theme.primaryColor 
                    }}
                  >
                    {selectedBusiness.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.65rem' }}>
                    {selectedBusiness.settings.tagline}
                  </Typography>
                </Box>
              )}
            </Box>

            {/* Navigation - Desktop */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
              <Button color="inherit" onClick={() => router.push('/')}>
                Home
              </Button>
              <Button color="inherit" onClick={() => router.push('/shop')}>
                Shop
              </Button>
              <Button
                color="inherit"
                onClick={() => router.push('/compare')}
                endIcon={
                  compareItems.length > 0 ? (
                    <Badge badgeContent={compareItems.length} color="error" />
                  ) : null
                }
              >
                Compare
              </Button>
            </Box>

            {/* Search Bar */}
            <Box
              component="form"
              onSubmit={handleSearch}
              sx={{
                display: { xs: 'none', md: 'flex' },
                flex: 1,
                maxWidth: 400,
                bgcolor: 'action.hover',
                borderRadius: 1,
                px: 2,
                py: 0.5,
              }}
            >
              <InputBase
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                sx={{ flex: 1 }}
                startAdornment={
                  <Box sx={{ mr: 1, color: 'text.disabled', display: 'flex', alignItems: 'center' }}>
                    <Icon icon="solar:magnifer-linear" width={20} />
                  </Box>
                }
              />
            </Box>

            {/* Actions */}
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              {/* Mobile Search */}
              <IconButton sx={{ display: { md: 'none' } }} onClick={handleMobileSearchToggle}>
                <Icon icon="solar:magnifer-linear" width={24} />
              </IconButton>

              {/* Notifications */}
              <IconButton>
                <Badge badgeContent={3} color="error">
                  <Icon icon="solar:bell-bing-bold-duotone" width={24} />
                </Badge>
              </IconButton>

              {/* Wishlist */}
              <IconButton onClick={() => router.push('/wishlist')}>
                <Badge badgeContent={wishlistItems.length} color="error">
                  <Icon icon="solar:heart-linear" width={24} />
                </Badge>
              </IconButton>

              {/* Cart */}
              <IconButton onClick={() => router.push('/cart')}>
                <Badge badgeContent={getCartCount()} color="error">
                  <Icon icon="solar:bag-5-outline" width={24} />
                </Badge>
              </IconButton>

              {/* Account */}
              <IconButton onClick={handleAccountMenuOpen}>
                <Icon icon="solar:user-bold" width={24} />
              </IconButton>
            </Box>
          </Box>
        </Container>
      </Toolbar>

      {/* Mobile Search Dropdown */}
      <Slide direction="down" in={mobileSearchOpen} mountOnEnter unmountOnExit>
        <Paper
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1300,
            p: 2,
            bgcolor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(8px)',
            borderBottom: 'none',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Container maxWidth="xl">
            <Box
              component="form"
              onSubmit={handleMobileSearch}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <Box
                sx={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  bgcolor: 'action.hover',
                  borderRadius: 1,
                  px: 2,
                  py: 0.5,
                }}
              >
                <InputBase
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  sx={{ flex: 1 }}
                  autoFocus
                  startAdornment={
                    <Box sx={{ mr: 1, color: '#666', display: 'flex', alignItems: 'center' }}>
                      <Icon icon="solar:magnifer-linear" width={20} />
                    </Box>
                  }
                />
              </Box>
              <IconButton 
                onClick={handleMobileSearchToggle}
                
              >
                <Icon icon="solar:close-square-bold-duotone" width={34} />
              </IconButton>
            </Box>
          </Container>
        </Paper>
      </Slide>

      {/* Account Dropdown Menu */}
      <Menu
        anchorEl={accountMenuAnchor}
        open={Boolean(accountMenuAnchor)}
        onClose={handleAccountMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          sx: {
            mt: 1,
            minWidth: 200,
            borderRadius: 2,
            boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
            border: '1px solid',
            borderColor: 'grey.200',
          },
        }}
      >
        <MenuItem onClick={() => { router.push('/profile'); handleAccountMenuClose(); }}>
          <ListItemIcon>
            <Icon icon="solar:user-bold" width={20} />
          </ListItemIcon>
          <ListItemText>Personal</ListItemText>
        </MenuItem>

        <MenuItem onClick={() => { router.push('/profile?tab=wishlist'); handleAccountMenuClose(); }}>
          <ListItemIcon>
            <Icon icon="solar:heart-outline" width={20} />
          </ListItemIcon>
          <ListItemText>Wishlist</ListItemText>
        </MenuItem>

        <MenuItem onClick={() => { router.push('/profile?tab=vouchers'); handleAccountMenuClose(); }}>
          <ListItemIcon>
            <Icon icon="solar:ticket-outline" width={20} />
          </ListItemIcon>
          <ListItemText>Vouchers</ListItemText>
        </MenuItem>

        <MenuItem onClick={() => { router.push('/profile?tab=orders'); handleAccountMenuClose(); }}>
          <ListItemIcon>
            <Icon icon="solar:bag-4-outline" width={20} />
          </ListItemIcon>
          <ListItemText>Orders</ListItemText>
        </MenuItem>

        <MenuItem onClick={() => { router.push('/profile?tab=payment'); handleAccountMenuClose(); }}>
          <ListItemIcon>
            <Icon icon="solar:card-outline" width={20} />
          </ListItemIcon>
          <ListItemText>Payment</ListItemText>
        </MenuItem>

        <Divider />

        <MenuItem onClick={() => { openBusinessSelector(); handleAccountMenuClose(); }}>
          <ListItemIcon>
            <Icon icon="solar:shop-2-outline" width={20} />
          </ListItemIcon>
          <ListItemText>Switch Business</ListItemText>
        </MenuItem>

        <Divider />

        <MenuItem onClick={() => { router.push('/sign-in'); handleAccountMenuClose(); }}>
          <ListItemIcon>
            <Icon icon="solar:logout-3-outline" width={20} />
          </ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </MenuItem>
      </Menu>
    </AppBar>
  );
}

