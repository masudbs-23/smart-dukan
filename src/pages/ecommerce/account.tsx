import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { alpha } from '@mui/material/styles';

import { useRouter } from 'src/routes/hooks';

import { getUserOrders } from 'src/_mock/_orders';

import { Icon } from '@iconify/react';

// ----------------------------------------------------------------------

export default function AccountPage() {
  const router = useRouter();
  const orders = getUserOrders('user-001'); // In a real app, get the current user ID

  const accountMenuItems = [
    {
      title: 'My Orders',
      description: 'View and track your orders',
      icon: 'lucide:package',
      path: '/account/orders',
      count: orders.length,
    },
    {
      title: 'Wishlist',
      description: 'Your saved items',
      icon: 'lucide:heart',
      path: '/wishlist',
    },
    {
      title: 'Compare Products',
      description: 'Products you are comparing',
      icon: 'lucide:git-compare',
      path: '/compare',
    },
    {
      title: 'Profile Settings',
      description: 'Update your personal information',
      icon: 'lucide:user',
      path: '#',
    },
    {
      title: 'Addresses',
      description: 'Manage your shipping addresses',
      icon: 'lucide:map-pin',
      path: '#',
    },
    {
      title: 'Payment Methods',
      description: 'Manage your payment methods',
      icon: 'lucide:credit-card',
      path: '#',
    },
  ];

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Profile Header */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <Avatar
              src="/assets/images/avatar/avatar-1.webp"
              alt="User"
              sx={{ width: 80, height: 80 }}
            />
            <Box>
              <Typography variant="h4">John Smith</Typography>
              <Typography variant="body1" color="text.secondary">
                john.smith@example.com
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Member since September 2024
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Box
                sx={{
                  width: 56,
                  height: 56,
                  borderRadius: '50%',
                  bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mx: 'auto',
                  mb: 2,
                }}
              >
                <Box sx={{ color: 'primary.main', display: 'flex' }}>
                  <Icon icon="lucide:package" width={28} />
                </Box>
              </Box>
              <Typography variant="h4">{orders.length}</Typography>
              <Typography variant="body2" color="text.secondary">
                Total Orders
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Box
                sx={{
                  width: 56,
                  height: 56,
                  borderRadius: '50%',
                  bgcolor: (theme) => alpha(theme.palette.success.main, 0.08),
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mx: 'auto',
                  mb: 2,
                }}
              >
                <Box sx={{ color: 'success.main', display: 'flex' }}>
                  <Icon icon="lucide:check-circle" width={28} />
                </Box>
              </Box>
              <Typography variant="h4">
                {orders.filter((o) => o.status === 'delivered').length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Delivered
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Box
                sx={{
                  width: 56,
                  height: 56,
                  borderRadius: '50%',
                  bgcolor: (theme) => alpha(theme.palette.warning.main, 0.08),
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mx: 'auto',
                  mb: 2,
                }}
              >
                <Box sx={{ color: 'warning.main', display: 'flex' }}>
                  <Icon icon="lucide:truck" width={28} />
                </Box>
              </Box>
              <Typography variant="h4">
                {orders.filter((o) => ['processing', 'shipped'].includes(o.status)).length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                In Progress
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Box
                sx={{
                  width: 56,
                  height: 56,
                  borderRadius: '50%',
                  bgcolor: (theme) => alpha(theme.palette.error.main, 0.08),
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mx: 'auto',
                  mb: 2,
                }}
              >
                <Box sx={{ color: 'error.main', display: 'flex' }}>
                  <Icon icon="lucide:heart" width={28} />
                </Box>
              </Box>
              <Typography variant="h4">0</Typography>
              <Typography variant="body2" color="text.secondary">
                Wishlist Items
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Account Menu */}
      <Typography variant="h5" sx={{ mb: 3 }}>
        Account Settings
      </Typography>
      <Grid container spacing={3}>
        {accountMenuItems.map((item) => (
          <Grid key={item.title} size={{ xs: 12, sm: 6, md: 4 }}>
            <Card
              sx={{
                height: '100%',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: (theme) => theme.shadows[8],
                },
              }}
            >
              <CardActionArea onClick={() => router.push(item.path)} sx={{ height: '100%' }}>
                <CardContent>
                  <Stack direction="row" spacing={2} alignItems="flex-start">
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: 1.5,
                        bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Box sx={{ color: 'primary.main', display: 'flex' }}>
                        <Icon icon={item.icon} width={24} />
                      </Box>
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="h6">{item.title}</Typography>
                        {item.count !== undefined && item.count > 0 && (
                          <Box
                            sx={{
                              bgcolor: 'error.main',
                              color: 'white',
                              px: 1,
                              py: 0.25,
                              borderRadius: 1,
                              fontSize: 12,
                              fontWeight: 600,
                            }}
                          >
                            {item.count}
                          </Box>
                        )}
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        {item.description}
                      </Typography>
                    </Box>
                    <Box sx={{ color: 'text.disabled', display: 'flex' }}>
                      <Icon icon="lucide:chevron-right" width={20} />
                    </Box>
                  </Stack>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

