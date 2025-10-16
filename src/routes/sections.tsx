import type { RouteObject } from 'react-router';

import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { varAlpha } from 'minimal-shared/utils';

import Box from '@mui/material/Box';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

import { EcommerceLayout } from 'src/layouts/ecommerce';

// ----------------------------------------------------------------------

// Ecommerce Pages
export const HomePage = lazy(() => import('src/pages/ecommerce/home'));
export const ShopPage = lazy(() => import('src/pages/ecommerce/shop'));
export const ProductDetailsPage = lazy(() => import('src/pages/ecommerce/product-details'));
export const CartPage = lazy(() => import('src/pages/ecommerce/cart'));
export const CheckoutPage = lazy(() => import('src/pages/ecommerce/checkout'));
export const WishlistPage = lazy(() => import('src/pages/ecommerce/wishlist'));
export const ComparePage = lazy(() => import('src/pages/ecommerce/compare'));
export const AccountPage = lazy(() => import('src/pages/ecommerce/account'));
export const OrdersPage = lazy(() => import('src/pages/ecommerce/orders'));
export const OrderDetailsPage = lazy(() => import('src/pages/ecommerce/order-details'));

// Profile Page
export const ProfilePage = lazy(() => import('src/pages/profile/profile'));
export const Page404 = lazy(() => import('src/pages/error/page-not-found'));

const renderFallback = () => (
  <Box
    sx={{
      display: 'flex',
      flex: '1 1 auto',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <LinearProgress
      sx={{
        width: 1,
        maxWidth: 320,
        bgcolor: (theme) => varAlpha(theme.vars.palette.text.primaryChannel, 0.16),
        [`& .${linearProgressClasses.bar}`]: { bgcolor: 'text.primary' },
      }}
    />
  </Box>
);

export const routesSection: RouteObject[] = [
  {
    path: '/',
    element: (
      <EcommerceLayout>
        <Suspense fallback={renderFallback()}>
          <Outlet />
        </Suspense>
      </EcommerceLayout>
    ),
    children: [
      { index: true, element: <HomePage /> },
      { path: 'shop', element: <ShopPage /> },
      { path: 'product/:id', element: <ProductDetailsPage /> },
      { path: 'cart', element: <CartPage /> },
      { path: 'checkout', element: <CheckoutPage /> },
      { path: 'wishlist', element: <WishlistPage /> },
      { path: 'compare', element: <ComparePage /> },
      { path: 'account', element: <AccountPage /> },
      { path: 'account/orders', element: <OrdersPage /> },
      { path: 'account/orders/:id', element: <OrderDetailsPage /> },
      { path: 'profile', element: <ProfilePage /> },
    ],
  },
  {
    path: '404',
    element: <Page404 />,
  },
  { path: '*', element: <Page404 /> },
];
