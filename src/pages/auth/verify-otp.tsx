import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha } from '@mui/material/styles';

import { Logo } from 'src/components/logo';
import { useAuth } from 'src/contexts/AuthContext';

// ----------------------------------------------------------------------

export default function VerifyOtpPage() {
  const navigate = useNavigate();
  const { verifyOtp, error, clearError } = useAuth();
  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const pendingEmail = localStorage.getItem('pendingEmail');
    if (!pendingEmail) {
      navigate('/sign-up');
      return;
    }
    setEmail(pendingEmail);
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    clearError();

    try {
      await verifyOtp(email, otp);
      navigate('/');
    } catch (err) {
      console.error('OTP verification failed:', err);
    } finally {
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
            Verify OTP
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Enter the code sent to {email}
          </Typography>
        </Box>

        <Stack spacing={3} component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            name="otp"
            label="OTP Code"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter 6-digit code"
            inputProps={{ maxLength: 6 }}
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
            Verify
          </LoadingButton>
        </Stack>

        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Didn&apos;t receive code?{' '}
            <Box
              component="span"
              sx={{ color: 'primary.main', cursor: 'pointer', fontWeight: 600 }}
            >
              Resend
            </Box>
          </Typography>
        </Box>
      </Card>
    </Box>
  );
}
