import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';
import { Icon } from '@iconify/react';

import { useBusiness } from 'src/contexts/BusinessContext';
import { PRODUCTS } from 'src/_mock/_products';

// ----------------------------------------------------------------------

export default function VendorDashboardPage() {
  const { selectedBusiness } = useBusiness();

  const businessProducts = PRODUCTS.filter(
    (product) => product.businessId === selectedBusiness?.id
  );

  const stats = [
    {
      title: 'Total Products',
      value: businessProducts.length,
      icon: 'solar:bag-4-bold-duotone',
      color: '#1976d2',
    },
    {
      title: 'Active Orders',
      value: '12',
      icon: 'solar:clipboard-list-bold-duotone',
      color: '#2e7d32',
    },
    {
      title: 'Revenue',
      value: '$24,500',
      icon: 'solar:dollar-bold-duotone',
      color: '#ed6c02',
    },
    {
      title: 'Customers',
      value: '156',
      icon: 'solar:users-group-rounded-bold-duotone',
      color: '#9c27b0',
    },
  ];

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Dashboard Overview
      </Typography>

      {selectedBusiness ? (
        <>
          {/* Stats Grid */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            {stats.map((stat) => (
              <Grid key={stat.title} size={{ xs: 12, sm: 6, md: 3 }}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Box
                        sx={{
                          width: 56,
                          height: 56,
                          borderRadius: 2,
                          bgcolor: alpha(stat.color, 0.12),
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Icon icon={stat.icon} width={32} style={{ color: stat.color }} />
                      </Box>
                      <Box>
                        <Typography variant="h4">{stat.value}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {stat.title}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Business Info Card */}
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Current Business
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                <Box
                  sx={{
                    width: 64,
                    height: 64,
                    borderRadius: 2,
                    bgcolor: alpha(selectedBusiness.theme.primaryColor, 0.12),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Icon
                    icon="solar:shop-2-bold-duotone"
                    width={40}
                    style={{ color: selectedBusiness.theme.primaryColor }}
                  />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h5" sx={{ mb: 1 }}>
                    {selectedBusiness.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {selectedBusiness.description}
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <Typography variant="caption" color="text.secondary">
                        Tagline
                      </Typography>
                      <Typography variant="body2">{selectedBusiness.settings.tagline}</Typography>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <Typography variant="caption" color="text.secondary">
                        Primary Color
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box
                          sx={{
                            width: 24,
                            height: 24,
                            borderRadius: 0.5,
                            bgcolor: selectedBusiness.theme.primaryColor,
                            border: '1px solid rgba(0,0,0,0.12)',
                          }}
                        />
                        <Typography variant="body2">
                          {selectedBusiness.theme.primaryColor}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <Typography variant="caption" color="text.secondary">
                        Email
                      </Typography>
                      <Typography variant="body2">{selectedBusiness.contact.email}</Typography>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <Typography variant="caption" color="text.secondary">
                        Phone
                      </Typography>
                      <Typography variant="body2">{selectedBusiness.contact.phone}</Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </>
      ) : (
        <Card>
          <CardContent sx={{ textAlign: 'center', py: 8 }}>
            <Icon
              icon="solar:box-minimalistic-bold-duotone"
              width={80}
              style={{ marginBottom: 16, color: '#9e9e9e' }}
            />
            <Typography variant="h6" color="text.secondary">
              No Business Selected
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Please select a business to manage
            </Typography>
          </CardContent>
        </Card>
      )}
    </Box>
  );
}

