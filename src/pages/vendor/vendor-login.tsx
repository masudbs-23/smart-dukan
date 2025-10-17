import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';
import { alpha } from '@mui/material/styles';
import { Icon } from '@iconify/react';

import { Logo } from 'src/components/logo';

// ----------------------------------------------------------------------

export default function VendorLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Demo/Mock authentication for vendor portal
      // Accept any vendor email without password check
      const vendorEmails = ['john@example.com', 'sarah@example.com', 'test@test.com'];
      
      if (vendorEmails.includes(email.toLowerCase())) {
        // Mock login - store vendor credentials
        const mockUser = {
          id: email,
          email: email,
          name: email === 'john@example.com' ? 'John Doe' : 
                email === 'sarah@example.com' ? 'Sarah Ahmed' : 'Demo Vendor',
          role: 'vendor',
        };
        
        const mockToken = `mock-token-${Date.now()}`;
        
        // Store in localStorage (same as AuthContext)
        localStorage.setItem('authToken', mockToken);
        localStorage.setItem('userData', JSON.stringify(mockUser));
        
        // Wait a bit to simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Redirect to vendor dashboard
        navigate('/vendor/dashboard');
        window.location.reload(); // Reload to trigger context updates
      } else {
        setError('Invalid vendor email. Please use john@example.com, sarah@example.com, or test@test.com');
        setLoading(false);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: (theme) =>
          `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(
            theme.palette.secondary.main,
            0.1
          )} 100%)`,
        px: 2,
      }}
    >
      <Card
        sx={{
          p: 5,
          width: 1,
          maxWidth: 420,
          boxShadow: (theme) => theme.shadows[24],
        }}
      >
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Logo sx={{ mb: 2 }} />
          <Typography variant="h4" sx={{ mb: 1 }}>
            Vendor Portal
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Sign in to manage your business
          </Typography>
        </Box>

        <Stack spacing={3} component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            name="email"
            label="Email address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Icon icon="solar:user-bold" width={24} />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Icon icon="solar:lock-password-bold" width={24} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    <Icon icon={showPassword ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {error && (
            <Box
              sx={{
                p: 2,
                borderRadius: 1,
                bgcolor: (theme) => alpha(theme.palette.error.main, 0.08),
                border: (theme) => `1px solid ${alpha(theme.palette.error.main, 0.24)}`,
              }}
            >
              <Typography variant="body2" color="error">
                {error}
              </Typography>
            </Box>
          )}

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={loading}
          >
            Sign In as Vendor
          </LoadingButton>
        </Stack>

        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Not a vendor?{' '}
            <Box
              component="span"
              sx={{ color: 'primary.main', cursor: 'pointer', fontWeight: 600 }}
              onClick={() => navigate('/sign-in')}
            >
              Customer Login
            </Box>
          </Typography>
        </Box>

        <Box
          sx={{
            mt: 2,
            pt: 2,
            borderTop: (theme) => `1px dashed ${alpha(theme.palette.grey[500], 0.24)}`,
          }}
        >
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5, fontWeight: 600 }}>
            Demo Vendor Accounts:
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
            • john@example.com (2 businesses)
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
            • sarah@example.com (2 businesses)
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
            • test@test.com (all access)
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>
            Password: (any password)
          </Typography>
        </Box>
      </Card>
    </Box>
  );
}

