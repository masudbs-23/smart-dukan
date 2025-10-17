import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import { alpha } from '@mui/material/styles';
import { Icon } from '@iconify/react';

import { Logo } from 'src/components/logo';
import { useBusiness } from 'src/contexts/BusinessContext';

// ----------------------------------------------------------------------

export function Footer() {
  const { selectedBusiness } = useBusiness();

  return (
    <Box
      component="footer"
      sx={{
        py: 5,
        mt: 'auto',
        bgcolor: 'background.paper',
        borderTop: (theme) => `solid 1px ${alpha(theme.palette.grey[500], 0.12)}`,
      }}
    >
      <Container maxWidth="xl">
        <Box
          sx={{
            display: 'grid',
            gap: 3,
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(4, 1fr)',
            },
          }}
        >
          {/* Company Info */}
          <Box>
            <Logo sx={{ mb: 2 }} />
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              {selectedBusiness?.description || 'Your trusted source for the latest mobile gadgets and electronics.'}
            </Typography>
            
            {/* Get in Touch Section */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Get in Touch
              </Typography>
              <TextField
                fullWidth
                placeholder="Enter your email"
                size="small"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    pr: 0,
                    height: '40px',
                  },
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Button
                        variant="contained"
                        sx={{
                          minWidth: 'auto',
                          px: 2,
                          height: '40px',
                          borderRadius: '0 4px 4px 0',
                          textTransform: 'none',
                          margin: 0,
                        }}
                      >
                        Subscribe
                      </Button>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            {/* Social Icons */}
            <Box sx={{ mb: 3 }}>
              <Stack direction="row" spacing={1}>
                {selectedBusiness?.social.facebook && (
                  <Link href={selectedBusiness.social.facebook} sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}>
                    <Icon icon="mdi:facebook" width={24} height={24} />
                  </Link>
                )}
                {selectedBusiness?.social.twitter && (
                  <Link href={selectedBusiness.social.twitter} sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}>
                    <Icon icon="mdi:twitter" width={24} height={24} />
                  </Link>
                )}
                {selectedBusiness?.social.instagram && (
                  <Link href={selectedBusiness.social.instagram} sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}>
                    <Icon icon="mdi:instagram" width={24} height={24} />
                  </Link>
                )}
                {selectedBusiness?.social.linkedin && (
                  <Link href={selectedBusiness.social.linkedin} sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}>
                    <Icon icon="mdi:linkedin" width={24} height={24} />
                  </Link>
                )}
                {selectedBusiness?.social.youtube && (
                  <Link href={selectedBusiness.social.youtube} sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}>
                    <Icon icon="mdi:youtube" width={24} height={24} />
                  </Link>
                )}
              </Stack>
            </Box>

            {/* App Store Icons */}
            <Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Download from
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                <Link href="#" sx={{ display: 'flex', alignItems: 'center' }}>
                  <Icon icon="logos:google-play-icon" width={120} height={40} />
                </Link>
                <Link href="#" sx={{ display: 'flex', alignItems: 'center' }}>
                  <Icon icon="logos:app-store" width={120} height={40} />
                </Link>
              </Box>
            </Box>
          </Box>

          {/* Shop */}
          <Box>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Shop
            </Typography>
            <Stack spacing={1}>
              <Link href="/shop?category=smartphones" color="text.secondary" underline="hover">
                Smartphones
              </Link>
              <Link href="/shop?category=tablets" color="text.secondary" underline="hover">
                Tablets
              </Link>
              <Link href="/shop?category=smartwatches" color="text.secondary" underline="hover">
                Smartwatches
              </Link>
              <Link href="/shop?category=earbuds" color="text.secondary" underline="hover">
                Earbuds
              </Link>
              <Link href="/shop?category=accessories" color="text.secondary" underline="hover">
                Accessories
              </Link>
            </Stack>
          </Box>

          {/* Customer Service */}
          <Box>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Customer Service
            </Typography>
            <Stack spacing={1}>
              <Link href="/account" color="text.secondary" underline="hover">
                My Account
              </Link>
              <Link href="/account/orders" color="text.secondary" underline="hover">
                Order Tracking
              </Link>
              <Link href="/wishlist" color="text.secondary" underline="hover">
                Wishlist
              </Link>
              <Link href="#" color="text.secondary" underline="hover">
                Help & FAQs
              </Link>
            </Stack>
          </Box>

          {/* Contact Info */}
          <Box>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Contact Us
            </Typography>
            <Stack spacing={1}>
              {selectedBusiness?.contact.email && (
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    {selectedBusiness.contact.email}
                  </Typography>
                </Box>
              )}
              {selectedBusiness?.contact.phone && (
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    {selectedBusiness.contact.phone}
                  </Typography>
                </Box>
              )}
              {selectedBusiness?.contact.address && (
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    {selectedBusiness.contact.address}
                  </Typography>
                </Box>
              )}
            </Stack>
          </Box>
        </Box>

        <Box sx={{ mt: 5, pt: 3, borderTop: (theme) => `solid 1px ${alpha(theme.palette.grey[500], 0.12)}` }}>
          <Typography variant="body2" color="text.secondary" textAlign="center">
            {selectedBusiness?.settings.footerText || '© 2024 Mobile Gadgets Store. All rights reserved.'}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

