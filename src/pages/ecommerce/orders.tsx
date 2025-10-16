import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import { alpha } from '@mui/material/styles';

import { useRouter } from 'src/routes/hooks';

import { getUserOrders, ORDER_STATUS_LABELS } from 'src/_mock/_orders';
import type { OrderStatus } from 'src/_mock/_orders';

import { Iconify } from 'src/components/lucide-icons';
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

export default function OrdersPage() {
  const router = useRouter();
  // In a real app, get the current user ID
  const orders = getUserOrders('user-001');

  if (orders.length === 0) {
    return (
      <Container maxWidth="xl" sx={{ py: 8 }}>
        <Typography variant="h3" sx={{ mb: 4 }}>
          My Orders
        </Typography>
        <Box
          sx={{
            textAlign: 'center',
            py: 8,
            bgcolor: (theme) => alpha(theme.palette.grey[500], 0.04),
            borderRadius: 2,
          }}
        >
          <Iconify icon="lucide:package" width={80} sx={{ mb: 3, color: 'text.disabled' }} />
          <Typography variant="h4" sx={{ mb: 2 }}>
            No orders yet
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Start shopping to see your orders here
          </Typography>
          <Button variant="contained" onClick={() => router.push('/shop')}>
            Start Shopping
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h3">My Orders</Typography>
        <Button startIcon={<Iconify icon="lucide:arrow-left" />} onClick={() => router.push('/account')}>
          Back to Account
        </Button>
      </Box>

      <Stack spacing={3}>
        {orders.map((order) => (
          <Card key={order.id}>
            <CardContent>
              {/* Order Header */}
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 2,
                  flexWrap: 'wrap',
                  gap: 2,
                }}
              >
                <Box>
                  <Typography variant="h6">{order.orderNumber}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Placed on {fDate(order.createdAt)}
                  </Typography>
                </Box>
                <Chip label={ORDER_STATUS_LABELS[order.status]} color={STATUS_COLORS[order.status]} />
              </Box>

              <Divider sx={{ my: 2 }} />

              {/* Order Items */}
              <Stack spacing={2}>
                {order.items.map((item) => (
                  <Box key={item.id} sx={{ display: 'flex', gap: 2 }}>
                    <Box
                      component="img"
                      src={item.productImage}
                      alt={item.productName}
                      sx={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 1 }}
                    />
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle1">{item.productName}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.variantName} • {item.color}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Qty: {item.quantity} × {fCurrency(item.price)}
                      </Typography>
                    </Box>
                    <Typography variant="subtitle1">{fCurrency(item.total)}</Typography>
                  </Box>
                ))}
              </Stack>

              <Divider sx={{ my: 2 }} />

              {/* Order Summary */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="body1">Total Amount</Typography>
                <Typography variant="h6" color="primary">
                  {fCurrency(order.total)}
                </Typography>
              </Box>

              {/* Tracking Info */}
              {order.trackingNumber && (
                <Box
                  sx={{
                    p: 2,
                    bgcolor: (theme) => alpha(theme.palette.info.main, 0.08),
                    borderRadius: 1,
                    mb: 2,
                  }}
                >
                  <Typography variant="body2" color="info.main">
                    <strong>Tracking Number:</strong> {order.trackingNumber}
                  </Typography>
                </Box>
              )}

              {/* Actions */}
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button
                  variant="contained"
                  onClick={() => router.push(`/account/orders/${order.id}`)}
                >
                  View Details
                </Button>
                {order.status === 'delivered' && (
                  <Button variant="outlined">Write Review</Button>
                )}
                {['pending', 'confirmed'].includes(order.status) && (
                  <Button variant="outlined" color="error">
                    Cancel Order
                  </Button>
                )}
              </Box>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Container>
  );
}

