import type { RouteObject } from 'react-router';

import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { varAlpha } from 'minimal-shared/utils';

import Box from '@mui/material/Box';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

import { EcommerceLayout } from 'src/layouts/ecommerce';
import VendorLayout from 'src/layouts/vendor/vendor-layout';
import { ProtectedVendorRoute } from 'src/components/protected-vendor-route';

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
export const BusinessStorefrontPage = lazy(() => import('src/pages/ecommerce/business-storefront'));

// Profile Page
export const ProfilePage = lazy(() => import('src/pages/profile/profile'));

// Vendor Pages
export const VendorLoginPage = lazy(() => import('src/pages/vendor/vendor-login'));
export const VendorDashboardPage = lazy(() => import('src/pages/vendor/vendor-dashboard'));
export const BusinessSettingsPage = lazy(() => import('src/pages/vendor/business-settings'));
export const BusinessCustomizerPage = lazy(() => import('src/pages/vendor/business-customizer'));
export const ProductsManagementPage = lazy(() => import('src/pages/vendor/products-management'));

// Auth Pages
export const SignInPage = lazy(() => import('src/pages/auth/sign-in'));
export const SignUpPage = lazy(() => import('src/pages/auth/sign-up'));
export const VerifyOtpPage = lazy(() => import('src/pages/auth/verify-otp'));

// Error Page
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
  // Default Customer Frontend Routes (No business selected - shows default design)
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
  
  // Auth Routes
  {
    path: '/sign-in',
    element: (
      <Suspense fallback={renderFallback()}>
        <SignInPage />
      </Suspense>
    ),
  },
  {
    path: '/sign-up',
    element: (
      <Suspense fallback={renderFallback()}>
        <SignUpPage />
      </Suspense>
    ),
  },
  {
    path: '/verify-otp',
    element: (
      <Suspense fallback={renderFallback()}>
        <VerifyOtpPage />
      </Suspense>
    ),
  },

  // Vendor Portal Routes
  {
    path: '/vendor/login',
    element: (
      <Suspense fallback={renderFallback()}>
        <VendorLoginPage />
      </Suspense>
    ),
  },
  {
    path: '/vendor',
    element: (
      <ProtectedVendorRoute>
        <VendorLayout />
      </ProtectedVendorRoute>
    ),
    children: [
      { path: 'dashboard', element: <VendorDashboardPage /> },
      { path: 'customizer', element: <BusinessCustomizerPage /> },
      { path: 'products', element: <ProductsManagementPage /> },
      { path: 'settings', element: <BusinessSettingsPage /> },
      { path: 'orders', element: <VendorDashboardPage /> }, // Placeholder
    ],
  },
  
  // Dynamic Business Storefront Routes (/:businessSlug)
  // This should be before the 404 route to catch business slugs
  {
    path: ':businessSlug',
    element: (
      <EcommerceLayout>
        <Suspense fallback={renderFallback()}>
          <Outlet />
        </Suspense>
      </EcommerceLayout>
    ),
    children: [
      { index: true, element: <BusinessStorefrontPage /> },
      { path: 'shop', element: <ShopPage /> },
      { path: 'product/:id', element: <ProductDetailsPage /> },
      { path: 'cart', element: <CartPage /> },
      { path: 'checkout', element: <CheckoutPage /> },
      { path: 'wishlist', element: <WishlistPage /> },
      { path: 'compare', element: <ComparePage /> },
      { path: 'account', element: <AccountPage /> },
      { path: 'account/orders', element: <OrdersPage /> },
      { path: 'account/orders/:id', element: <OrderDetailsPage /> },
    ],
  },
  
  // Error Routes
  {
    path: '404',
    element: <Page404 />,
  },
  { path: '*', element: <Page404 /> },
];
