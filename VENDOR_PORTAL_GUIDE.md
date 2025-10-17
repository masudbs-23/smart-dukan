# Vendor Portal Guide 🏪

## Overview

**Vendor Admin Dashboard** তৈরি করা হয়েছে যেখানে vendors তাদের business manage করতে পারবে। এটা customer frontend থেকে সম্পূর্ণ আলাদা।

---

## 🔐 Vendor Portal Access

### Vendor Login URL:
```
http://localhost:5173/vendor/login
```

**Important:** এই route customer দের frontend এ থাকবে না। এটা শুধু vendors এর জন্য।

### Demo Credentials:
```
Email: test@test.com
Password: (any password)
```

---

## 📋 Features

### 1. **Vendor Dashboard** (`/vendor/dashboard`)
- Business overview statistics
- Product count, orders, revenue, customers
- Current business information display
- Quick access to business details

### 2. **Products Management** (`/vendor/products`)
- View all products for selected business
- Product listing with images, prices, stock status
- Search functionality
- Edit/Delete products (UI ready, API pending)
- Add new products (UI ready, API pending)

### 3. **Business Settings** (`/vendor/settings`)
Vendors can customize everything about their business:

#### **General Tab:**
- Business name
- Tagline
- Description

#### **Header & Footer Tab:**
- Header business name
- Header tagline
- Footer description
- Footer copyright text

#### **Theme Colors Tab:**
- Primary color (buttons, links)
- Secondary color (accents)
- Accent color (highlights)
- Live color picker preview

#### **Contact Info Tab:**
- Email
- Phone
- Address
- Social media links (Facebook, Twitter, Instagram, LinkedIn, YouTube)

### 4. **Protected Routes**
- সব vendor routes authentication protected
- Login না করলে automatically `/vendor/login` এ redirect হয়

---

## 🗂️ Vendor Portal Structure

### Sidebar Navigation:
```
┌─────────────────────────┐
│   Vendor Portal Logo    │
├─────────────────────────┤
│  📍 Current Business    │
│     (Click to switch)   │
├─────────────────────────┤
│  📊 Dashboard           │
│  🛍️  Products           │
│  ⚙️  Business Settings  │
│  📋 Orders              │
├─────────────────────────┤
│  👁️  View Customer Site│
└─────────────────────────┘
```

### Top Bar:
- Business name display
- Business tagline chip
- User avatar with dropdown menu
  - Switch Business
  - Logout

---

## 🚀 How to Test

### Step 1: Access Vendor Login
```bash
# Navigate to
http://localhost:5173/vendor/login
```

### Step 2: Login
```
Email: test@test.com
Password: (any password)
```

### Step 3: Select Business (if modal appears)
- TechHub Electronics or GadgetZone
- এটা optional - না থাকলে no problem

### Step 4: Explore Dashboard
- Dashboard overview দেখুন
- Statistics check করুন
- Business info view করুন

### Step 5: Products Management
- Sidebar → Products
- Your business এর products দেখবেন
- Search করে test করুন
- Edit/Delete buttons (alert দেখাবে - demo mode)

### Step 6: Business Settings
- Sidebar → Business Settings
- **4টা tabs explore করুন:**
  
  1. **General:** Name, tagline, description change করুন
  2. **Header & Footer:** Customize করুন
  3. **Theme Colors:** Color codes change করুন
  4. **Contact Info:** Email, phone, social links update করুন

- **Save Changes** button click করুন (demo alert দেখাবে)

### Step 7: View Customer Site
- Sidebar এর bottom এ "View Customer Site" click করুন
- Customer frontend এ navigate করবে
- Vendor portal থেকে customer site easily access করতে পারবেন

### Step 8: Logout & Re-login
- Top bar → Avatar → Logout
- `/vendor/login` এ redirect হবে

---

## 📁 File Structure

### New Files Created:

```
src/
├── pages/
│   └── vendor/
│       ├── vendor-login.tsx          # Vendor login page
│       ├── vendor-dashboard.tsx      # Dashboard overview
│       ├── business-settings.tsx     # Settings with 4 tabs
│       └── products-management.tsx   # Product CRUD
│
├── layouts/
│   └── vendor/
│       └── vendor-layout.tsx         # Vendor dashboard layout
│
├── components/
│   └── protected-vendor-route.tsx    # Auth guard for vendor routes
│
└── routes/
    └── sections.tsx                  # Updated with vendor routes
```

---

## 🔒 Security Features

1. **Protected Routes:** Vendor routes শুধু authenticated users access করতে পারবে
2. **Separate Login:** Customer ও Vendor login আলাদা
3. **Business Isolation:** প্রতিটা vendor শুধু তাদের নিজের business manage করতে পারবে
4. **Automatic Redirect:** Unauthorized access attempt হলে login page এ redirect

---

## 🎨 UI/UX Features

### Responsive Design:
- Desktop optimized (sidebar + main content)
- Clean, modern interface
- Consistent with Material-UI design system

### Visual Feedback:
- Current business highlighted in sidebar
- Color-coded status chips (In Stock, Out of Stock)
- Success messages on save
- Loading states

### Navigation:
- Persistent sidebar
- Breadcrumb-style top bar
- Quick access to customer site
- Easy business switching

---

## 🔄 Customer vs Vendor Routes

### Customer Routes (Public Frontend):
```
/                      → Home
/shop                  → Shop
/product/:id           → Product Details
/cart                  → Cart
/checkout              → Checkout
/wishlist              → Wishlist
/compare               → Compare
/account               → Account
/profile               → Profile
```

### Vendor Routes (Admin Portal):
```
/vendor/login          → Vendor Login (Public)
/vendor/dashboard      → Dashboard (Protected)
/vendor/products       → Products Management (Protected)
/vendor/settings       → Business Settings (Protected)
/vendor/orders         → Orders (Protected)
```

---

## 💾 Data Persistence

### Current Implementation (Demo):
- Uses mock data from `src/_mock/_businesses.ts`
- Changes are NOT persisted (localStorage only for selection)
- "Save Changes" shows success message but doesn't actually save

### For Production:
Backend APIs needed:
```typescript
// Business Settings
PUT /api/vendor/business/:id/settings
{
  name: string;
  description: string;
  tagline: string;
  theme: { primaryColor, secondaryColor, accentColor };
  contact: { email, phone, address };
  social: { facebook, twitter, instagram, linkedin, youtube };
  settings: { footerText };
}

// Products
GET /api/vendor/business/:id/products
POST /api/vendor/products
PUT /api/vendor/products/:id
DELETE /api/vendor/products/:id

// Dashboard Stats
GET /api/vendor/business/:id/stats
```

---

## 🎯 Key Differences: Customer vs Vendor

| Feature | Customer Frontend | Vendor Portal |
|---------|------------------|---------------|
| **Purpose** | Browse & Buy Products | Manage Business |
| **Layout** | Header + Footer + Content | Sidebar + Top Bar + Content |
| **Access** | Public (some pages protected) | Fully Protected |
| **Navigation** | Top horizontal menu | Left sidebar menu |
| **Business Display** | Selected business content | Management interface |
| **Products** | View & Purchase | Create, Edit, Delete |
| **Settings** | Personal preferences | Business customization |

---

## 🧪 Testing Scenarios

### Scenario 1: Fresh Vendor Login
```
1. Go to /vendor/login
2. Login with credentials
3. Business modal may appear → Select business
4. Redirects to /vendor/dashboard
5. See stats and business info
```

### Scenario 2: Products Management
```
1. Navigate to /vendor/products
2. See products filtered by selected business
   - TechHub: 4 smartphones
   - GadgetZone: 4 tablets/watches/earbuds
3. Search for specific product
4. Try Edit/Delete (shows alert)
```

### Scenario 3: Settings Customization
```
1. Navigate to /vendor/settings
2. Tab 1 (General): Change business name
3. Tab 2 (Header & Footer): Update tagline
4. Tab 3 (Theme): Change primary color
5. Tab 4 (Contact): Update email
6. Click "Save Changes"
7. See success message
8. Note: Changes are demo only (not persisted)
```

### Scenario 4: Business Switching
```
1. In vendor dashboard
2. Click business card in sidebar OR
3. Top bar → Avatar → Switch Business
4. Select different business
5. Products and stats update accordingly
```

### Scenario 5: View Customer Site
```
1. In vendor dashboard
2. Sidebar bottom → "View Customer Site"
3. Navigate to customer frontend (/)
4. See how customers see your store
5. Can go back to vendor portal via /vendor/dashboard
```

---

## 📝 Notes

### Current Limitations (Demo Mode):
1. ❌ Settings changes না save হয় (mock data)
2. ❌ Product Create/Edit/Delete UI only (no API)
3. ❌ Orders page placeholder (dashboard repeat করছে)
4. ❌ Image upload feature নেই

### What's Working:
1. ✅ Complete UI/UX for all pages
2. ✅ Authentication & Protected Routes
3. ✅ Business switching
4. ✅ Product filtering by business
5. ✅ All navigation & layout
6. ✅ Responsive design
7. ✅ Theme customization form
8. ✅ Contact info management form

---

## 🚀 Next Steps for Production

### Backend Integration:
1. Create vendor APIs for settings CRUD
2. Implement product management APIs
3. Add image upload functionality
4. Build orders management system
5. Add analytics & reporting

### Feature Enhancements:
1. Bulk product import/export
2. Inventory management
3. Sales reports & analytics
4. Customer reviews management
5. Promotional campaigns
6. Staff/Team member management
7. Logo upload for business
8. Custom domain support

---

## 🎬 Demo Flow Summary

```
Vendor Login
    ↓
Select Business (if multiple)
    ↓
Vendor Dashboard
    ├─→ View Stats
    ├─→ Manage Products
    │   ├─→ View List
    │   ├─→ Search
    │   └─→ Edit/Delete (UI ready)
    │
    ├─→ Business Settings
    │   ├─→ General Info
    │   ├─→ Header & Footer
    │   ├─→ Theme Colors
    │   └─→ Contact & Social
    │
    ├─→ Switch Business
    │
    └─→ View Customer Site
```

---

**Vendor Portal সম্পূর্ণ হয়েছে!** 🎉

Test করার জন্য এই URL ব্যবহার করুন:
```
http://localhost:5173/vendor/login
```

কোন প্রশ্ন থাকলে বলুন!

