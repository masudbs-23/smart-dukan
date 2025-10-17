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
import { useAuth } from 'src/contexts/AuthContext';

// ----------------------------------------------------------------------

export default function SignUpPage() {
  const navigate = useNavigate();
  const { register, error, clearError } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    clearError();

    try {
      await register(email, password);
      // Register redirects to OTP verification automatically
    } catch (err) {
      console.error('Registration failed:', err);
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
            Create Account
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Start your journey with us
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
            Sign Up
          </LoadingButton>
        </Stack>

        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Already have an account?{' '}
            <Box
              component="span"
              sx={{ color: 'primary.main', cursor: 'pointer', fontWeight: 600 }}
              onClick={() => navigate('/sign-in')}
            >
              Sign In
            </Box>
          </Typography>
        </Box>
      </Card>
    </Box>
  );
}
