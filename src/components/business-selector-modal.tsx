import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import { alpha } from '@mui/material/styles';
import { Icon } from '@iconify/react';

import { useBusiness } from '../contexts/BusinessContext';

// ----------------------------------------------------------------------

export function BusinessSelectorModal() {
  const { 
    isBusinessSelectorOpen, 
    closeBusinessSelector, 
    userBusinesses, 
    selectBusiness,
    selectedBusiness 
  } = useBusiness();

  const handleSelectBusiness = (businessId: string) => {
    selectBusiness(businessId);
  };

  return (
    <Dialog
      open={isBusinessSelectorOpen}
      onClose={closeBusinessSelector}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          boxShadow: (theme) => theme.shadows[24],
        },
      }}
    >
      <DialogTitle sx={{ pb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Icon icon="solar:shop-bold-duotone" width={32} height={32} />
          <Box>
            <Typography variant="h5">Select Your Business</Typography>
            <Typography variant="body2" color="text.secondary">
              Choose which business you want to manage
            </Typography>
          </Box>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ px: 3, pb: 3 }}>
        <Stack spacing={2}>
          {userBusinesses.map((business) => (
            <Card
              key={business.id}
              sx={{
                border: (theme) =>
                  selectedBusiness?.id === business.id
                    ? `2px solid ${theme.palette.primary.main}`
                    : `1px solid ${alpha(theme.palette.grey[500], 0.24)}`,
                transition: 'all 0.2s',
                '&:hover': {
                  boxShadow: (theme) => theme.shadows[8],
                  transform: 'translateY(-2px)',
                },
              }}
            >
              <CardActionArea onClick={() => handleSelectBusiness(business.id)}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                    {/* Business Icon/Logo */}
                    <Box
                      sx={{
                        width: 56,
                        height: 56,
                        borderRadius: 1.5,
                        bgcolor: alpha(business.theme.primaryColor, 0.12),
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <Icon
                        icon="solar:shop-2-bold-duotone"
                        width={32}
                        height={32}
                        style={{ color: business.theme.primaryColor }}
                      />
                    </Box>

                    {/* Business Info */}
                    <Box sx={{ flex: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                        <Typography variant="h6">{business.name}</Typography>
                        {selectedBusiness?.id === business.id && (
                          <Chip
                            label="Current"
                            size="small"
                            color="primary"
                            sx={{ height: 20 }}
                          />
                        )}
                      </Box>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          mb: 1,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                        }}
                      >
                        {business.description}
                      </Typography>

                      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 1 }}>
                        <Chip
                          icon={<Icon icon="solar:tag-bold" width={16} />}
                          label={business.settings.tagline}
                          size="small"
                          variant="outlined"
                          sx={{ fontSize: '0.7rem' }}
                        />
                      </Box>
                    </Box>

                    {/* Selected Indicator */}
                    {selectedBusiness?.id === business.id && (
                      <Box
                        sx={{
                          width: 24,
                          height: 24,
                          borderRadius: '50%',
                          bgcolor: 'primary.main',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        <Icon icon="solar:check-circle-bold" width={20} style={{ color: 'white' }} />
                      </Box>
                    )}
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Stack>

        {userBusinesses.length === 0 && (
          <Box
            sx={{
              textAlign: 'center',
              py: 8,
              bgcolor: (theme) => alpha(theme.palette.grey[500], 0.04),
              borderRadius: 2,
            }}
          >
            <Icon
              icon="solar:box-minimalistic-bold-duotone"
              width={64}
              height={64}
              style={{ marginBottom: 16, color: '#9e9e9e' }}
            />
            <Typography variant="h6" color="text.secondary">
              No businesses found
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Contact support to set up your business
            </Typography>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
}

