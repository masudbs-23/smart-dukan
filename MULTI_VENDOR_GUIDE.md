# Multi-Vendor E-commerce System 🏪

## Overview

এই প্রজেক্টে **Multi-Vendor System** successfully implement করা হয়েছে। এখন একজন user multiple businesses manage করতে পারবে এবং প্রতিটা business এর জন্য আলাদা look & feel থাকবে।

## Features ✨

### 1. **Multiple Business Support**
- একজন user এর একাধিক business থাকতে পারে
- Login করার পর user তার সব businesses দেখতে পাবে
- যেকোনো business select করতে পারবে

### 2. **Business-Specific Customization**
প্রতিটা vendor/business এর জন্য customize করা যায়:

#### Theme & Colors 🎨
- Primary Color
- Secondary Color  
- Accent Color
- পুরো website এর color scheme change হয়

#### Header 📱
- Business name & tagline display
- Custom navigation links
- "Switch Business" option account menu তে

#### Footer 🏢
- Business description
- Contact information (email, phone, address)
- Social media links (Facebook, Twitter, Instagram, LinkedIn, YouTube)
- Custom footer text

#### Products 📦
- শুধু selected business এর products দেখায়
- Business অনুযায়ী automatic filtering

## System Architecture

### Mock Data Structure

#### **2 Sample Vendors:**

**1. TechHub Electronics** (vendor-1)
- Theme: Blue (#1976d2)
- Products: iPhone 15 Pro Max, Samsung Galaxy S24 Ultra, Google Pixel 8 Pro, OnePlus 12
- Tagline: "Innovation at Your Fingertips"

**2. GadgetZone** (vendor-2)
- Theme: Purple (#9c27b0)  
- Products: iPad Pro, Apple Watch, AirPods Pro, Samsung Galaxy Buds2 Pro
- Tagline: "Where Technology Meets Affordability"

### Key Files Created/Modified

#### New Files:
1. `src/_mock/_businesses.ts` - Business mock data
2. `src/contexts/BusinessContext.tsx` - Business state management
3. `src/components/business-selector-modal.tsx` - Business selection UI

#### Modified Files:
1. `src/app.tsx` - Added BusinessProvider
2. `src/layouts/ecommerce/header.tsx` - Dynamic header based on business
3. `src/layouts/ecommerce/footer.tsx` - Dynamic footer based on business
4. `src/pages/ecommerce/shop.tsx` - Filter products by business
5. `src/theme/theme-provider.tsx` - Dynamic theme colors
6. `src/_mock/_products.ts` - Added businessId to products

## How to Test 🧪

### Step 1: Login
```
Email: test@test.com
Password: (your password)
```

### Step 2: Business Selection
Login করার পর একটা **modal** দেখাবে যেখানে 2টা business আছে:
- TechHub Electronics
- GadgetZone

### Step 3: Select Business
যেকোনো একটা business select করুন।

### Step 4: Explore
- **Header**: Business name ও tagline দেখুন
- **Navigation**: Business-specific nav links
- **Shop Page**: শুধু সেই business এর products দেখবে
- **Footer**: Business এর contact info ও social links
- **Colors**: পুরো theme business এর color এ change হবে

### Step 5: Switch Business
Header এর account icon → "Switch Business" click করে অন্য business এ switch করুন।

## Data Flow 🔄

```
User Login
    ↓
BusinessContext loads user's businesses
    ↓
Business Selector Modal shows
    ↓
User selects business
    ↓
Selected business saved in localStorage
    ↓
All components reactively update:
    - Theme colors change
    - Header updates
    - Footer updates
    - Products filtered
```

## LocalStorage Keys

1. `authToken` - User authentication token
2. `userData` - User information
3. `selectedBusinessId` - Currently selected business ID

## Adding New Business

`src/_mock/_businesses.ts` file এ নতুন business object add করুন:

```typescript
{
  id: 'vendor-3',
  name: 'Your Business Name',
  slug: 'yourbusiness',
  theme: {
    primaryColor: '#your-color',
    secondaryColor: '#your-color',
    accentColor: '#your-color',
  },
  // ... other properties
}
```

এবং `USER_BUSINESSES` object এ user এর সাথে link করুন:

```typescript
export const USER_BUSINESSES: Record<string, string[]> = {
  'test@test.com': ['vendor-1', 'vendor-2', 'vendor-3'],
};
```

## Assigning Products to Business

`src/_mock/_products.ts` এ product create করার সময় `businessId` field add করুন:

```typescript
{
  id: 'prod-009',
  name: 'Product Name',
  businessId: 'vendor-1', // or 'vendor-2'
  // ... other properties
}
```

## Features Implemented ✅

- ✅ Business Context for state management
- ✅ Business Selector Modal
- ✅ Dynamic Header with business info
- ✅ Dynamic Footer with contact & social links
- ✅ Products filtered by selected business
- ✅ Theme customization per vendor (colors)
- ✅ Switch business functionality
- ✅ LocalStorage persistence
- ✅ Mock data for 2 vendors

## Next Steps (Optional Enhancements) 🚀

### Backend Integration:
যখন backend তৈরি হবে, তখন এই API endpoints লাগবে:

1. `GET /api/user/businesses` - Get user's businesses
2. `GET /api/business/:id` - Get business details
3. `GET /api/business/:id/products` - Get business products
4. `PUT /api/business/:id/settings` - Update business settings

### Additional Features:
- Business dashboard for analytics
- Product management per business
- Order management per business
- Business settings page
- Logo upload for each business
- Custom domain support

## Troubleshooting 🔧

**Q: Business selector না দেখালে?**
A: Browser console check করুন, localStorage clear করে refresh দিন।

**Q: Products show করছে না?**
A: Selected business এর products আছে কিনা `_products.ts` এ check করুন।

**Q: Theme colors change হচ্ছে না?**
A: Business object এ সঠিক color codes আছে কিনা verify করুন।

---

## Demo Video Scenario 📹

1. Login করুন → Business selector modal দেখুন
2. "TechHub Electronics" select করুন
3. Notice: Blue theme, TechHub branding, 4টা smartphone products
4. Account menu → "Switch Business" click করুন
5. "GadgetZone" select করুন  
6. Notice: Purple theme, GadgetZone branding, 4টা different products (tablets/watches/earbuds)

---

**Created by AI Assistant** 🤖
**Date:** October 17, 2024

