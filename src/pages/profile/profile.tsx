import { useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

import { useRouter } from 'src/routes/hooks';

// removed unused imports
import { Icon } from '@iconify/react';

// ----------------------------------------------------------------------

export default function ProfileView() {
  const router = useRouter();
  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'personal';

  const [formData, setFormData] = useState({
    firstName: 'Jayvion',
    lastName: 'Simon',
    email: 'nannie.abernathy70@yahoo.com',
    phone: '365-374-4961',
    birthday: '',
    gender: 'Male',
    streetAddress: '',
    zipCode: '',
    city: '',
    country: '',
  });

  const handleInputChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const handleSelectChange = (field: string) => (event: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const handleSubmit = useCallback(() => {
    console.log('Profile data:', formData);
  }, [formData]);

  // Vouchers mock and UI state
  type Voucher = {
    id: string;
    scope: string; // e.g., SHIPPING, ALL CATEGORIES
    title: string; // e.g., 6% off, Up to 50%
    description: string; // e.g., Min. Spend $0
    status: 'expired' | 'days_left' | 'valid_till';
    daysLeft?: number;
    validTill?: string; // e.g., 19 Oct 2025
    icon: string; // lucide icon name
  };

  const VOUCHERS: Voucher[] = [
    {
      id: 'v1',
      scope: 'SHIPPING',
      title: '6% off',
      description: 'Min. Spend $0',
      status: 'expired',
      icon: 'lucide:truck',
    },
    {
      id: 'v2',
      scope: 'SHIPPING',
      title: '6% off',
      description: 'Min. Spend $0',
      status: 'days_left',
      daysLeft: 1,
      icon: 'lucide:truck',
    },
    {
      id: 'v3',
      scope: 'ALL CATEGORIES',
      title: '6% off',
      description: 'Min. Spend $0 Capped at $10',
      status: 'expired',
      icon: 'lucide:star',
    },
    {
      id: 'v4',
      scope: 'SHIPPING',
      title: '6% off',
      description: 'Min. Spend $0 Capped at $10',
      status: 'days_left',
      daysLeft: 1,
      icon: 'lucide:truck',
    },
    {
      id: 'v5',
      scope: 'MEN CLOTHES',
      title: 'Up to 50%',
      description: 'Min. Spend $0 Capped at $10',
      status: 'valid_till',
      validTill: '19 Oct 2025',
      icon: 'lucide:shirt',
    },
    {
      id: 'v6',
      scope: 'SHIPPING',
      title: '6% off',
      description: 'Min. Spend $0',
      status: 'valid_till',
      validTill: '20 Oct 2025',
      icon: 'lucide:truck',
    },
  ];

  const voucherTabs = ['All', 'Latest', 'Popular', 'Expired'] as const;
  type VoucherTab = typeof voucherTabs[number];
  const [voucherTab, setVoucherTab] = useState<VoucherTab>('All');

  const filteredVouchers = VOUCHERS.filter(v => {
    if (voucherTab === 'Expired') return v.status === 'expired';
    return true; // For mock, All/Latest/Popular show all
  });

  const navigationItems = [
    { id: 'personal', label: 'Personal' },
    { id: 'wishlist', label: 'Wishlist' },
    { id: 'vouchers', label: 'Vouchers' },
    { id: 'orders', label: 'Orders' },
    { id: 'payment', label: 'Payment' },
  ];

  const handleTabChange = (tabId: string) => {
    router.push(`/profile?tab=${tabId}`);
  };

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      backgroundColor: '#f8f9fa',
      p: 3 
    }}>
      <Box sx={{ 
        maxWidth: 1200, 
        mx: 'auto',
        mt: 2,
      }}>
        {/* Top Header - plain, no card */}
        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar 
              src="/assets/images/avatar/avatar_1.webp" 
              alt="Profile"
              sx={{ width: 72, height: 72 }}
            />
            <Box>
              <Typography variant="body2" color="text.secondary" sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 1,
                mb: 0.5,
                fontSize: '0.875rem'
              }}>
                Change photo
                <Icon icon="lucide:edit" width={14} height={14} />
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 'bold', lineHeight: 1.2 }}>
                Jayvion
              </Typography>
              <Typography variant="body2" color="text.secondary">
                nannie.abernathy70@yahoo.com
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Tabs Row - plain text with bottom border for active */}
        <Box sx={{ mb: 3, borderBottom: '1px solid #e5e7eb' }}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            {navigationItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <Box
                  key={item.id}
                  role="button"
                  onClick={() => handleTabChange(item.id)}
                  sx={{
                    cursor: 'pointer',
                    color: isActive ? '#111827' : '#6b7280',
                    fontWeight: isActive ? 600 : 500,
                    py: 1.25,
                    borderBottom: isActive ? '2px solid #111827' : '2px solid transparent',
                  }}
                >
                  {item.label}
                </Box>
              );
            })}
          </Box>
        </Box>

        {/* Content */}
        <Box sx={{ 
          backgroundColor: 'white',
          borderRadius: 2,
          p: 4,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <Typography variant="h4" sx={{ 
            mb: 4, 
            fontWeight: 'bold',
            fontSize: '1.5rem',
            color: '#111827'
          }}>
            {navigationItems.find(n => n.id === activeTab)?.label || 'Personal'}
          </Typography>

          {activeTab === 'personal' && (
            <Box sx={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(2, 1fr)', 
              gap: 3, 
              mb: 4 
            }}>
              <TextField
                fullWidth
                label="First name"
                value={formData.firstName}
                onChange={handleInputChange('firstName')}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#f3f4f6',
                    borderRadius: 2,
                    '& fieldset': {
                      border: 'none',
                    },
                    '&:hover fieldset': {
                      border: 'none',
                    },
                    '&.Mui-focused fieldset': {
                      border: '2px solid #3b82f6',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: '#6b7280',
                    fontSize: '0.875rem',
                  },
                }}
              />
              <TextField
                fullWidth
                label="Last name"
                value={formData.lastName}
                onChange={handleInputChange('lastName')}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#f3f4f6',
                    borderRadius: 2,
                    '& fieldset': {
                      border: 'none',
                    },
                    '&:hover fieldset': {
                      border: 'none',
                    },
                    '&.Mui-focused fieldset': {
                      border: '2px solid #3b82f6',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: '#6b7280',
                    fontSize: '0.875rem',
                  },
                }}
              />
              <TextField
                fullWidth
                label="Email address"
                value={formData.email}
                onChange={handleInputChange('email')}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#f3f4f6',
                    borderRadius: 2,
                    '& fieldset': {
                      border: 'none',
                    },
                    '&:hover fieldset': {
                      border: 'none',
                    },
                    '&.Mui-focused fieldset': {
                      border: '2px solid #3b82f6',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: '#6b7280',
                    fontSize: '0.875rem',
                  },
                }}
              />
              <TextField
                fullWidth
                label="Phone number"
                value={formData.phone}
                onChange={handleInputChange('phone')}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#f3f4f6',
                    borderRadius: 2,
                    '& fieldset': {
                      border: 'none',
                    },
                    '&:hover fieldset': {
                      border: 'none',
                    },
                    '&.Mui-focused fieldset': {
                      border: '2px solid #3b82f6',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: '#6b7280',
                    fontSize: '0.875rem',
                  },
                }}
              />
              <TextField
                fullWidth
                label="Birthday"
                value={formData.birthday}
                onChange={handleInputChange('birthday')}
                InputProps={{
                  endAdornment: (
                    <Icon icon="lucide:calendar" width={20} height={20} style={{ color: '#6b7280' }} />
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#f3f4f6',
                    borderRadius: 2,
                    '& fieldset': {
                      border: 'none',
                    },
                    '&:hover fieldset': {
                      border: 'none',
                    },
                    '&.Mui-focused fieldset': {
                      border: '2px solid #3b82f6',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: '#6b7280',
                    fontSize: '0.875rem',
                  },
                }}
              />
              <FormControl fullWidth>
                <InputLabel sx={{ color: '#6b7280', fontSize: '0.875rem' }}>Gender</InputLabel>
                <Select
                  value={formData.gender}
                  onChange={handleSelectChange('gender')}
                  label="Gender"
                  sx={{
                    backgroundColor: '#f3f4f6',
                    borderRadius: 2,
                    '& .MuiOutlinedInput-notchedOutline': {
                      border: 'none',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      border: 'none',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      border: '2px solid #3b82f6',
                    },
                  }}
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
              <TextField
                fullWidth
                label="Street address"
                value={formData.streetAddress}
                onChange={handleInputChange('streetAddress')}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#f3f4f6',
                    borderRadius: 2,
                    '& fieldset': {
                      border: 'none',
                    },
                    '&:hover fieldset': {
                      border: 'none',
                    },
                    '&.Mui-focused fieldset': {
                      border: '2px solid #3b82f6',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: '#6b7280',
                    fontSize: '0.875rem',
                  },
                }}
              />
              <TextField
                fullWidth
                label="Zip/code"
                value={formData.zipCode}
                onChange={handleInputChange('zipCode')}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#f3f4f6',
                    borderRadius: 2,
                    '& fieldset': {
                      border: 'none',
                    },
                    '&:hover fieldset': {
                      border: 'none',
                    },
                    '&.Mui-focused fieldset': {
                      border: '2px solid #3b82f6',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: '#6b7280',
                    fontSize: '0.875rem',
                  },
                }}
              />
              <TextField
                fullWidth
                label="City"
                value={formData.city}
                onChange={handleInputChange('city')}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#f3f4f6',
                    borderRadius: 2,
                    '& fieldset': {
                      border: 'none',
                    },
                    '&:hover fieldset': {
                      border: 'none',
                    },
                    '&.Mui-focused fieldset': {
                      border: '2px solid #3b82f6',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: '#6b7280',
                    fontSize: '0.875rem',
                  },
                }}
              />
              <FormControl fullWidth>
                <InputLabel sx={{ color: '#6b7280', fontSize: '0.875rem' }}>Country</InputLabel>
                <Select
                  value={formData.country}
                  onChange={handleSelectChange('country')}
                  label="Country"
                  sx={{
                    backgroundColor: '#f3f4f6',
                    borderRadius: 2,
                    '& .MuiOutlinedInput-notchedOutline': {
                      border: 'none',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      border: 'none',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      border: '2px solid #3b82f6',
                    },
                  }}
                >
                  <MenuItem value="USA">United States</MenuItem>
                  <MenuItem value="UK">United Kingdom</MenuItem>
                  <MenuItem value="Canada">Canada</MenuItem>
                  <MenuItem value="Australia">Australia</MenuItem>
                </Select>
              </FormControl>
            </Box>
          )}

          {/* Save Button */}
          {activeTab === 'personal' && (
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                variant="contained"
                size="large"
                onClick={handleSubmit}
                sx={{
                  backgroundColor: '#1f2937',
                  color: 'white',
                  px: 6,
                  py: 1.5,
                  borderRadius: 2,
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  textTransform: 'none',
                  '&:hover': {
                    backgroundColor: '#374151',
                  },
                }}
              >
                Save changes
              </Button>
            </Box>
          )}

          {activeTab === 'wishlist' && (
            <Box sx={{ color: '#374151' }}>
              <Typography variant="body1">Your wishlist items will appear here.</Typography>
            </Box>
          )}

          {activeTab === 'vouchers' && (
            <Box>
              {/* Redeem bar */}
              <Box sx={{
                display: 'flex',
                gap: 2,
                alignItems: 'center',
                backgroundColor: '#f9fafb',
                border: '1px solid #e5e7eb',
                borderRadius: 1.5,
                p: 1.25,
                mb: 3,
              }}>
                <TextField
                  fullWidth
                  placeholder="Enter voucher code"
                  variant="outlined"
                  size="small"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: 'white',
                      borderRadius: 1,
                      '& fieldset': { border: '1px solid #e5e7eb' },
                      '&:hover fieldset': { borderColor: '#d1d5db' },
                      '&.Mui-focused fieldset': { borderColor: '#111827' },
                    },
                  }}
                />
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: '#111827',
                    color: 'white',
                    px: 3,
                    py: 1,
                    textTransform: 'none',
                    borderRadius: 1.5,
                    '&:hover': { backgroundColor: '#1f2937' },
                  }}
                >
                  Redeem
                </Button>
              </Box>

              {/* Voucher sub-tabs */}
              <Box sx={{ mb: 2, borderBottom: '1px solid #e5e7eb' }}>
                <Box sx={{ display: 'flex', gap: 3 }}>
                  {voucherTabs.map(tab => {
                    const isActive = voucherTab === tab;
                    return (
                      <Box
                        key={tab}
                        role="button"
                        onClick={() => setVoucherTab(tab)}
                        sx={{
                          cursor: 'pointer',
                          color: isActive ? '#111827' : '#6b7280',
                          fontWeight: isActive ? 600 : 500,
                          py: 1,
                          borderBottom: isActive ? '2px solid #111827' : '2px solid transparent',
                        }}
                      >
                        {tab}
                      </Box>
                    );
                  })}
                </Box>
              </Box>

              {/* Voucher cards grid */}
              <Box sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(1, minmax(0, 1fr))',
                gap: 2,
                '@media (min-width: 900px)': {
                  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                },
              }}>
                {filteredVouchers.map(v => (
                  <Box key={v.id} sx={{
                    display: 'flex',
                    border: '1px dashed #e5e7eb',
                    borderRadius: 1.5,
                    overflow: 'hidden',
                    backgroundColor: 'white',
                  }}>
                    {/* Left icon area */}
                    <Box sx={{
                      width: 120,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'column',
                      backgroundColor: '#fafafa',
                      borderRight: '1px dashed #e5e7eb',
                      p: 2,
                    }}>
                      <Icon icon={v.icon} width={28} height={28} style={{ color: '#111827' }} />
                      <Typography variant="caption" sx={{ mt: 1, color: '#6b7280', textTransform: 'uppercase', fontWeight: 700, letterSpacing: 0.5 }}>
                        {v.scope}
                      </Typography>
                    </Box>
                    {/* Right details */}
                    <Box sx={{ flex: 1, p: 2.5 }}>
                      <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
                        {v.title}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#6b7280', mb: 1.5 }}>
                        {v.description}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: v.status === 'expired' ? '#ef4444' : '#6b7280' }}>
                        <Icon icon={v.status === 'expired' ? 'lucide:alert-circle' : 'lucide:clock-8'} width={16} height={16} />
                        {v.status === 'expired' && (
                          <Typography variant="caption">Expired</Typography>
                        )}
                        {v.status === 'days_left' && (
                          <Typography variant="caption">{v.daysLeft} day left</Typography>
                        )}
                        {v.status === 'valid_till' && (
                          <Typography variant="caption">Valid till: {v.validTill}</Typography>
                        )}
                      </Box>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          )}

          {activeTab === 'orders' && (
            <Box sx={{ color: '#374151' }}>
              <Typography variant="body1">Your orders will appear here.</Typography>
            </Box>
          )}

          {activeTab === 'payment' && (
            <Box sx={{ color: '#374151' }}>
              <Typography variant="body1">Your payment methods will appear here.</Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}
