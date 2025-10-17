import { useParams } from 'react-router-dom';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { alpha } from '@mui/material/styles';

import { useRouter } from 'src/routes/hooks';

import { getOrderById, ORDER_STATUS_LABELS } from 'src/_mock/_orders';
import type { OrderStatus } from 'src/_mock/_orders';

import { Icon } from '@iconify/react';
import { fCurrency } from 'src/utils/format-number';
import { fDate } from 'src/utils/format-time';

// ----------------------------------------------------------------------

const STATUS_COLORS: Record<OrderStatus, 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'> = {
  pending: 'warning',
  confirmed: 'info',
  processing: 'info',
  shipped: 'primary',
  delivered: 'success',
  cancelled: 'error',
  refunded: 'error',
};

const ORDER_STEPS = ['Confirmed', 'Processing', 'Shipped', 'Delivered'];

export default function OrderDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const order = getOrderById(id || '');

  if (!order) {
    return (
      <Container maxWidth="xl" sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h4">Order not found</Typography>
        <Button onClick={() => router.push('/account/orders')} sx={{ mt: 2 }}>
          Back to Orders
        </Button>
      </Container>
    );
  }

  const getActiveStep = (status: OrderStatus): number => {
    const stepMap: Record<OrderStatus, number> = {
      pending: 0,
      confirmed: 0,
      processing: 1,
      shipped: 2,
      delivered: 3,
      cancelled: 0,
      refunded: 0,
    };
    return stepMap[status];
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h3">Order Details</Typography>
        <Button
          startIcon={<Icon icon="lucide:arrow-left" />}
          onClick={() => router.push('/account/orders')}
        >
          Back to Orders
        </Button>
      </Box>

      <Grid container spacing={3}>
        {/* Order Info */}
        <Grid size={{ xs: 12 }}>
          <Card>
            <CardContent>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 3,
                  flexWrap: 'wrap',
                  gap: 2,
                }}
              >
                <Box>
                  <Typography variant="h5">{order.orderNumber}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Placed on {fDate(order.createdAt)}
                  </Typography>
                </Box>
                <Chip
                  label={ORDER_STATUS_LABELS[order.status]}
                  color={STATUS_COLORS[order.status]}
                  size="medium"
                />
              </Box>

              {/* Order Tracking */}
              {!['cancelled', 'refunded'].includes(order.status) && (
                <Box sx={{ mb: 4 }}>
                  <Stepper activeStep={getActiveStep(order.status)} alternativeLabel>
                    {ORDER_STEPS.map((label) => (
                      <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                </Box>
              )}

              {/* Tracking Number */}
              {order.trackingNumber && (
                <Box
                  sx={{
                    p: 2,
                    bgcolor: (theme) => alpha(theme.palette.info.main, 0.08),
                    borderRadius: 1,
                  }}
                >
                  <Typography variant="body2" color="info.main">
                    <strong>Tracking Number:</strong> {order.trackingNumber}
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Order Items */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3 }}>
                Order Items
              </Typography>
              <Stack spacing={2}>
                {order.items.map((item) => (
                  <Box key={item.id}>
                    <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                      <Box
                        component="img"
                        src={item.productImage}
                        alt={item.productName}
                        sx={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 1 }}
                      />
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="subtitle1">{item.productName}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {item.variantName} • {item.color}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                          Qty: {item.quantity} × {fCurrency(item.price)}
                        </Typography>
                      </Box>
                      <Typography variant="h6">{fCurrency(item.total)}</Typography>
                    </Box>
                    <Divider />
                  </Box>
                ))}
              </Stack>

              {/* Order Summary */}
              <Box sx={{ mt: 3 }}>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell>Subtotal</TableCell>
                      <TableCell align="right">{fCurrency(order.subtotal)}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Shipping</TableCell>
                      <TableCell align="right">
                        {order.shipping === 0 ? 'FREE' : fCurrency(order.shipping)}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Tax</TableCell>
                      <TableCell align="right">{fCurrency(order.tax)}</TableCell>
                    </TableRow>
                    {order.discount > 0 && (
                      <TableRow>
                        <TableCell>Discount</TableCell>
                        <TableCell align="right" sx={{ color: 'success.main' }}>
                          -{fCurrency(order.discount)}
                        </TableCell>
                      </TableRow>
                    )}
                    <TableRow>
                      <TableCell>
                        <Typography variant="h6">Total</Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="h6" color="primary">
                          {fCurrency(order.total)}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Shipping & Payment Info */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Stack spacing={3}>
            {/* Shipping Address */}
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Shipping Address
                </Typography>
                <Typography variant="body2">{order.shippingAddress.fullName}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {order.shippingAddress.addressLine1}
                </Typography>
                {order.shippingAddress.addressLine2 && (
                  <Typography variant="body2" color="text.secondary">
                    {order.shippingAddress.addressLine2}
                  </Typography>
                )}
                <Typography variant="body2" color="text.secondary">
                  {order.shippingAddress.city}, {order.shippingAddress.state}{' '}
                  {order.shippingAddress.zipCode}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {order.shippingAddress.country}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  Phone: {order.shippingAddress.phone}
                </Typography>
              </CardContent>
            </Card>

            {/* Payment Info */}
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Payment Method
                </Typography>
                <Typography variant="body2">{order.paymentMethod}</Typography>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card>
              <CardContent>
                <Stack spacing={2}>
                  {order.status === 'delivered' && (
                    <Button variant="contained" fullWidth>
                      Write Review
                    </Button>
                  )}
                  {['pending', 'confirmed'].includes(order.status) && (
                    <Button variant="outlined" color="error" fullWidth>
                      Cancel Order
                    </Button>
                  )}
                  <Button variant="outlined" fullWidth>
                    Download Invoice
                  </Button>
                  <Button variant="outlined" fullWidth>
                    Contact Support
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}

