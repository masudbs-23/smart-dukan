import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import { alpha } from '@mui/material/styles';
import { Icon } from '@iconify/react';

import { Logo } from 'src/components/logo';
import { useBusiness } from 'src/contexts/BusinessContext';
import { useAuth } from 'src/contexts/AuthContext';

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;

const MENU_ITEMS = [
  {
    title: 'Dashboard',
    path: '/vendor/dashboard',
    icon: 'solar:widget-bold-duotone',
  },
  {
    title: 'Products',
    path: '/vendor/products',
    icon: 'solar:bag-4-bold-duotone',
  },
  {
    title: 'Business Settings',
    path: '/vendor/settings',
    icon: 'solar:settings-bold-duotone',
  },
  {
    title: 'Orders',
    path: '/vendor/orders',
    icon: 'solar:clipboard-list-bold-duotone',
  },
];

export default function VendorLayout() {
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const { selectedBusiness, openBusinessSelector } = useBusiness();
  const [accountMenuAnchor, setAccountMenuAnchor] = useState<null | HTMLElement>(null);

  const handleAccountMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAccountMenuAnchor(event.currentTarget);
  };

  const handleAccountMenuClose = () => {
    setAccountMenuAnchor(null);
  };

  const handleLogout = () => {
    logout();
    navigate('/vendor/login');
    handleAccountMenuClose();
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
            borderRight: (theme) => `1px dashed ${alpha(theme.palette.grey[500], 0.24)}`,
          },
        }}
      >
        {/* Logo */}
        <Box sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
          <Logo />
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Vendor Portal
          </Typography>
        </Box>

        <Divider />

        {/* Current Business */}
        {selectedBusiness && (
          <Box sx={{ p: 2 }}>
            <Box
              sx={{
                p: 2,
                borderRadius: 1.5,
                bgcolor: (theme) => alpha(selectedBusiness.theme.primaryColor, 0.08),
                border: (theme) => `1px dashed ${alpha(selectedBusiness.theme.primaryColor, 0.24)}`,
                cursor: 'pointer',
                transition: 'all 0.2s',
                '&:hover': {
                  bgcolor: (theme) => alpha(selectedBusiness.theme.primaryColor, 0.12),
                },
              }}
              onClick={openBusinessSelector}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                <Icon
                  icon="solar:shop-2-bold-duotone"
                  width={20}
                  style={{ color: selectedBusiness.theme.primaryColor }}
                />
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                  {selectedBusiness.name}
                </Typography>
              </Box>
              <Typography variant="caption" color="text.secondary">
                Click to switch business
              </Typography>
            </Box>
          </Box>
        )}

        <Divider />

        {/* Menu Items */}
        <List sx={{ px: 2, py: 1 }}>
          {MENU_ITEMS.map((item) => (
            <ListItem key={item.path} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                onClick={() => navigate(item.path)}
                sx={{
                  borderRadius: 1,
                  '&:hover': {
                    bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
                  },
                }}
              >
                <ListItemIcon>
                  <Icon icon={item.icon} width={24} />
                </ListItemIcon>
                <ListItemText primary={item.title} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Box sx={{ flexGrow: 1 }} />

        {/* View Customer Site */}
        <Box sx={{ p: 2 }}>
          <Box
            sx={{
              p: 2,
              borderRadius: 1.5,
              bgcolor: (theme) => alpha(theme.palette.info.main, 0.08),
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s',
              '&:hover': {
                bgcolor: (theme) => alpha(theme.palette.info.main, 0.16),
              },
            }}
            onClick={() => navigate('/')}
          >
            <Icon icon="solar:eye-bold-duotone" width={32} style={{ marginBottom: 8 }} />
            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
              View Customer Site
            </Typography>
            <Typography variant="caption" color="text.secondary">
              See how customers see your store
            </Typography>
          </Box>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Top Bar */}
        <AppBar
          position="sticky"
          elevation={0}
          sx={{
            bgcolor: 'background.paper',
            color: 'text.primary',
            borderBottom: (theme) => `1px solid ${alpha(theme.palette.grey[500], 0.12)}`,
          }}
        >
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              {selectedBusiness?.name || 'Vendor Dashboard'}
            </Typography>

            {selectedBusiness && (
              <Chip
                label={selectedBusiness.settings.tagline}
                size="small"
                sx={{ mr: 2 }}
                icon={<Icon icon="solar:tag-bold" width={16} />}
              />
            )}

            {/* Account Menu */}
            <IconButton onClick={handleAccountMenuOpen}>
              <Avatar sx={{ width: 36, height: 36, bgcolor: 'primary.main' }}>
                {user?.name?.[0] || user?.email?.[0]?.toUpperCase() || 'V'}
              </Avatar>
            </IconButton>

            <Menu
              anchorEl={accountMenuAnchor}
              open={Boolean(accountMenuAnchor)}
              onClose={handleAccountMenuClose}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              PaperProps={{
                sx: {
                  mt: 1.5,
                  minWidth: 200,
                  borderRadius: 2,
                  boxShadow: (theme) => theme.shadows[24],
                },
              }}
            >
              <Box sx={{ px: 2, py: 1.5 }}>
                <Typography variant="subtitle2">{user?.name || 'Vendor'}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {user?.email}
                </Typography>
              </Box>

              <Divider />

              <MenuItem onClick={openBusinessSelector}>
                <ListItemIcon>
                  <Icon icon="solar:shop-2-outline" width={20} />
                </ListItemIcon>
                <ListItemText>Switch Business</ListItemText>
              </MenuItem>

              <Divider />

              <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>
                <ListItemIcon>
                  <Icon icon="solar:logout-3-outline" width={20} />
                </ListItemIcon>
                <ListItemText>Logout</ListItemText>
              </MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>

        {/* Page Content */}
        <Box sx={{ flexGrow: 1, p: 3, bgcolor: 'background.default' }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}

