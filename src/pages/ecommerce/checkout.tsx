import { useState } from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { alpha } from '@mui/material/styles';

import { useRouter } from 'src/routes/hooks';

import { useCart } from 'src/contexts/CartContext';

import { Icon } from '@iconify/react';
import { fCurrency } from 'src/utils/format-number';

// ----------------------------------------------------------------------

const steps = ['Shipping Address', 'Payment Method', 'Review Order'];

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getCartTotal, clearCart } = useCart();
  const [activeStep, setActiveStep] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('card');

  const subtotal = getCartTotal();
  const shipping = subtotal > 100 ? 0 : 15;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  if (items.length === 0) {
    return (
      <Container maxWidth="xl" sx={{ py: 8 }}>
        <Box
          sx={{
            textAlign: 'center',
            py: 8,
            bgcolor: (theme) => alpha(theme.palette.grey[500], 0.04),
            borderRadius: 2,
          }}
        >
          <Typography variant="h4" sx={{ mb: 2 }}>
            Your cart is empty
          </Typography>
          <Button variant="contained" onClick={() => router.push('/shop')}>
            Continue Shopping
          </Button>
        </Box>
      </Container>
    );
  }

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      // Complete order
      clearCart();
      router.push('/account/orders');
    } else {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h3" sx={{ mb: 4 }}>
        Checkout
      </Typography>

      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Grid container spacing={3}>
        {/* Checkout Form */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Card>
            <CardContent>
              {activeStep === 0 && <ShippingAddressForm />}
              {activeStep === 1 && (
                <PaymentMethodForm
                  paymentMethod={paymentMethod}
                  setPaymentMethod={setPaymentMethod}
                />
              )}
              {activeStep === 2 && <OrderReview items={items} paymentMethod={paymentMethod} />}

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                <Button disabled={activeStep === 0} onClick={handleBack}>
                  Back
                </Button>
                <Button variant="contained" onClick={handleNext}>
                  {activeStep === steps.length - 1 ? 'Place Order' : 'Next'}
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Order Summary */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h5" sx={{ mb: 3 }}>
                Order Summary
              </Typography>

              <Stack spacing={2}>
                {items.map((item) => {
                  const variant = item.product.variants.find((v) => v.id === item.variantId);
                  const price = variant?.price || item.product.price;

                  return (
                    <Box
                      key={`${item.product.id}-${item.variantId}-${item.colorName}`}
                      sx={{ display: 'flex', gap: 2 }}
                    >
                      <Box
                        component="img"
                        src={item.product.images[0]}
                        alt={item.product.name}
                        sx={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 1 }}
                      />
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {item.product.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Qty: {item.quantity}
                        </Typography>
                        <Typography variant="body2">{fCurrency(price * item.quantity)}</Typography>
                      </Box>
                    </Box>
                  );
                })}

                <Divider />

                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body1">Subtotal</Typography>
                  <Typography variant="body1">{fCurrency(subtotal)}</Typography>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body1">Shipping</Typography>
                  <Typography variant="body1">
                    {shipping === 0 ? 'FREE' : fCurrency(shipping)}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body1">Tax</Typography>
                  <Typography variant="body1">{fCurrency(tax)}</Typography>
                </Box>

                <Divider />

                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="h6">Total</Typography>
                  <Typography variant="h6" color="primary">
                    {fCurrency(total)}
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

// ----------------------------------------------------------------------

function ShippingAddressForm() {
  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 3 }}>
        Shipping Address
      </Typography>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField fullWidth label="First Name" required />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField fullWidth label="Last Name" required />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <TextField fullWidth label="Email" type="email" required />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <TextField fullWidth label="Phone" required />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <TextField fullWidth label="Address Line 1" required />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <TextField fullWidth label="Address Line 2" />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField fullWidth label="City" required />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField fullWidth label="State / Province" required />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField fullWidth label="ZIP / Postal Code" required />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField fullWidth label="Country" required />
        </Grid>
      </Grid>
    </Box>
  );
}

// ----------------------------------------------------------------------

type PaymentMethodFormProps = {
  paymentMethod: string;
  setPaymentMethod: (value: string) => void;
};

function PaymentMethodForm({ paymentMethod, setPaymentMethod }: PaymentMethodFormProps) {
  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 3 }}>
        Payment Method
      </Typography>

      <FormControl component="fieldset" fullWidth>
        <RadioGroup value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
          <Card sx={{ mb: 2, border: (theme) => `1px solid ${alpha(theme.palette.grey[500], 0.12)}` }}>
            <CardContent>
              <FormControlLabel
                value="card"
                control={<Radio />}
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Icon icon="lucide:credit-card" />
                    <Typography>Credit / Debit Card</Typography>
                  </Box>
                }
              />
              {paymentMethod === 'card' && (
                <Box sx={{ mt: 2, pl: 4 }}>
                    <Grid container spacing={2}>
                      <Grid size={{ xs: 12 }}>
                        <TextField fullWidth label="Card Number" required />
                      </Grid>
                      <Grid size={{ xs: 12 }}>
                        <TextField fullWidth label="Cardholder Name" required />
                      </Grid>
                      <Grid size={{ xs: 6 }}>
                        <TextField fullWidth label="Expiry Date" placeholder="MM/YY" required />
                      </Grid>
                      <Grid size={{ xs: 6 }}>
                        <TextField fullWidth label="CVV" required />
                      </Grid>
                    </Grid>
                </Box>
              )}
            </CardContent>
          </Card>

          <Card sx={{ mb: 2, border: (theme) => `1px solid ${alpha(theme.palette.grey[500], 0.12)}` }}>
            <CardContent>
              <FormControlLabel
                value="paypal"
                control={<Radio />}
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Icon icon="lucide:wallet" />
                    <Typography>PayPal</Typography>
                  </Box>
                }
              />
            </CardContent>
          </Card>

          <Card sx={{ border: (theme) => `1px solid ${alpha(theme.palette.grey[500], 0.12)}` }}>
            <CardContent>
              <FormControlLabel
                value="cod"
                control={<Radio />}
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Icon icon="lucide:banknote" />
                    <Typography>Cash on Delivery</Typography>
                  </Box>
                }
              />
            </CardContent>
          </Card>
        </RadioGroup>
      </FormControl>
    </Box>
  );
}

// ----------------------------------------------------------------------

type OrderReviewProps = {
  items: any[];
  paymentMethod: string;
};

function OrderReview({ items, paymentMethod }: OrderReviewProps) {
  const paymentLabels: Record<string, string> = {
    card: 'Credit / Debit Card',
    paypal: 'PayPal',
    cod: 'Cash on Delivery',
  };

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 3 }}>
        Review Your Order
      </Typography>

      <Stack spacing={3}>
        <Box>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            Order Items
          </Typography>
          <Stack spacing={1}>
            {items.map((item) => {
              const variant = item.product.variants.find((v: any) => v.id === item.variantId);
              return (
                <Box
                  key={`${item.product.id}-${item.variantId}-${item.colorName}`}
                  sx={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <Typography variant="body2">
                    {item.product.name} × {item.quantity}
                  </Typography>
                  <Typography variant="body2">
                    {fCurrency((variant?.price || item.product.price) * item.quantity)}
                  </Typography>
                </Box>
              );
            })}
          </Stack>
        </Box>

        <Divider />

        <Box>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            Payment Method
          </Typography>
          <Typography variant="body2">{paymentLabels[paymentMethod]}</Typography>
        </Box>

        <Divider />

        <Box
          sx={{
            p: 2,
            bgcolor: (theme) => alpha(theme.palette.info.main, 0.08),
            borderRadius: 1,
          }}
        >
          <Typography variant="body2" color="info.main">
            By placing this order, you agree to our terms and conditions.
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
}

