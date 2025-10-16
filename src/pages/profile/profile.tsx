import { useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

import { useRouter } from 'src/routes/hooks';

import { _myAccount } from 'src/_mock';
import { DashboardContent } from 'src/layouts/dashboard';

import { Breadcrumb } from 'src/components/breadcrumb';
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

  const navigationItems = [
    { id: 'personal', label: 'Personal', icon: 'lucide:user' },
    { id: 'wishlist', label: 'Wishlist', icon: 'lucide:heart' },
    { id: 'vouchers', label: 'Vouchers', icon: 'lucide:tag' },
    { id: 'orders', label: 'Orders', icon: 'lucide:shopping-cart' },
    { id: 'payment', label: 'Payment', icon: 'lucide:credit-card' },
    { id: 'logout', label: 'Logout', icon: 'lucide:log-out' },
  ];

  const handleTabChange = (tabId: string) => {
    if (tabId === 'logout') {
      // Handle logout
      router.push('/auth/sign-in');
    } else {
      router.push(`/profile?tab=${tabId}`);
    }
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
        display: 'flex', 
        gap: 3, 
        minHeight: 'calc(100vh - 48px)' 
      }}>
        {/* Left Sidebar */}
        <Box sx={{ 
          width: 320, 
          height: 'fit-content',
          backgroundColor: 'white',
          borderRadius: 2,
          p: 3,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          {/* Profile Header */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
            <Avatar 
              src="/assets/images/avatar/avatar_1.webp" 
              alt="Profile"
              sx={{ width: 60, height: 60 }}
            />
            <Box>
              <Typography variant="body2" color="text.secondary" sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 1,
                fontSize: '0.75rem'
              }}>
                Change photo
                <Icon icon="lucide:edit" width={12} height={12} />
              </Typography>
            </Box>
          </Box>
          
          <Typography variant="h6" sx={{ mb: 0.5, fontWeight: 'bold' }}>
            Jayvion
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3, fontSize: '0.875rem' }}>
            nannie.abernathy70@yahoo.com
          </Typography>

          <Divider sx={{ mb: 2 }} />

          {/* Navigation Menu */}
          <List sx={{ p: 0 }}>
            {navigationItems.map((item) => (
              <ListItem key={item.id} sx={{ p: 0, mb: 0.5 }}>
                <ListItemButton
                  onClick={() => handleTabChange(item.id)}
                  sx={{
                    borderRadius: 1,
                    backgroundColor: activeTab === item.id ? '#dc2626' : 'transparent',
                    color: activeTab === item.id ? 'white' : '#374151',
                    py: 1.5,
                    px: 2,
                    '&:hover': {
                      backgroundColor: activeTab === item.id ? '#b91c1c' : '#f3f4f6',
                    },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 36, color: 'inherit' }}>
                    <Icon icon={item.icon} width={18} height={18} />
                  </ListItemIcon>
                  <ListItemText 
                    primary={item.label}
                    primaryTypographyProps={{
                      fontSize: '0.875rem',
                      fontWeight: activeTab === item.id ? 600 : 400,
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Right Content Area */}
        <Box sx={{ 
          flex: 1,
          backgroundColor: 'white',
          borderRadius: 2,
          p: 4,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <Typography variant="h4" sx={{ 
            mb: 4, 
            fontWeight: 'bold',
            fontSize: '1.875rem',
            color: '#111827'
          }}>
            Personal
          </Typography>

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

          {/* Save Button */}
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
        </Box>
      </Box>
    </Box>
  );
}
