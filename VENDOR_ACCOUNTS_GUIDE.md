# Vendor Accounts & Demo Guide 👥

## 📋 Overview

আমরা **2টা vendor** তৈরি করেছি, প্রতিটার **2টা করে business**। Total **4টা businesses** আছে।

---

## 👨‍💼 Vendor 1: John Doe

### Login Credentials:
```
Email: john@example.com
Password: (any password - demo mode)
```

### Businesses (2):

#### 1️⃣ **TechHub Electronics** (`business-1`)
- **Theme:** Blue (#1976d2)
- **Tagline:** "Innovation at Your Fingertips"
- **Products:** 2টা smartphones
  - iPhone 15 Pro Max - $1,199
  - Samsung Galaxy S24 Ultra - $1,099
- **Contact:**
  - Email: support@techhub.com
  - Phone: +880 1234-567890
  - Address: 123 Tech Street, Dhaka 1215, Bangladesh
- **Social Media:** Facebook, Twitter, Instagram, LinkedIn, YouTube

#### 2️⃣ **SmartHome Store** (`business-2`)
- **Theme:** Green (#2e7d32)
- **Tagline:** "Your Smart Living Starts Here"
- **Products:** 2টা smartphones
  - Google Pixel 8 Pro - $899
  - OnePlus 12 - $799
- **Contact:**
  - Email: info@smarthome.com
  - Phone: +880 1234-111222
  - Address: 789 Smart Avenue, Dhaka 1230, Bangladesh
- **Social Media:** Facebook, Instagram, YouTube

---

## 👩‍💼 Vendor 2: Sarah Ahmed

### Login Credentials:
```
Email: sarah@example.com
Password: (any password - demo mode)
```

### Businesses (2):

#### 3️⃣ **GadgetZone** (`business-3`)
- **Theme:** Purple (#9c27b0)
- **Tagline:** "Where Technology Meets Affordability"
- **Products:** 2টা (tablet + watch)
  - iPad Pro 12.9" M2 - $1,099
  - Apple Watch Series 9 - $399
- **Contact:**
  - Email: hello@gadgetzone.com
  - Phone: +880 1987-654321
  - Address: 456 Gadget Avenue, Chittagong 4100, Bangladesh
- **Social Media:** Facebook, Instagram, YouTube

#### 4️⃣ **AudioWorld** (`business-4`)
- **Theme:** Red (#d32f2f)
- **Tagline:** "Experience Sound Like Never Before"
- **Products:** 2টা earbuds
  - AirPods Pro (2nd Gen) - $249
  - Samsung Galaxy Buds2 Pro - $179
- **Contact:**
  - Email: contact@audioworld.com
  - Phone: +880 1987-999888
  - Address: 101 Sound Street, Chittagong 4200, Bangladesh
- **Social Media:** Facebook, Twitter, Instagram

---

## 🧪 Testing Scenarios

### Scenario 1: John Doe Login (2 Businesses)

```bash
# Step 1: Login
URL: http://localhost:5173/vendor/login
Email: john@example.com
Password: (any)

# Step 2: Business Selection Modal
দেখবেন: 2টা business
✅ TechHub Electronics (Blue)
✅ SmartHome Store (Green)

# Step 3: Select TechHub Electronics
Theme: Blue হবে
Products: 2টা smartphones (iPhone, Samsung)
Header: "TechHub Electronics - Innovation at Your Fingertips"
Footer: TechHub এর contact info

# Step 4: Switch to SmartHome Store
Top Bar → Avatar → Switch Business
Select: SmartHome Store
Theme: Green হবে
Products: 2টা smartphones (Google Pixel, OnePlus)
Header: "SmartHome Store - Your Smart Living Starts Here"
Footer: SmartHome এর contact info

# Step 5: View Customer Site
Sidebar Bottom → "View Customer Site"
Navigate to: / (Customer Frontend)
দেখবেন: SmartHome Store এর theme & products
```

---

### Scenario 2: Sarah Ahmed Login (2 Businesses)

```bash
# Step 1: Login
URL: http://localhost:5173/vendor/login
Email: sarah@example.com
Password: (any)

# Step 2: Business Selection Modal
দেখবেন: 2টা business
✅ GadgetZone (Purple)
✅ AudioWorld (Red)

# Step 3: Select GadgetZone
Theme: Purple হবে
Products: 2টা (iPad + Apple Watch)
Header: "GadgetZone - Where Technology Meets Affordability"
Footer: GadgetZone এর contact info

# Step 4: Switch to AudioWorld
Top Bar → Avatar → Switch Business
Select: AudioWorld
Theme: Red হবে
Products: 2টা earbuds (AirPods, Samsung Buds)
Header: "AudioWorld - Experience Sound Like Never Before"
Footer: AudioWorld এর contact info

# Step 5: View Customer Site
Sidebar Bottom → "View Customer Site"
দেখবেন: AudioWorld এর theme & products
```

---

## 🔄 Complete Flow Diagram

```
┌─────────────────────────────────────────────┐
│         Vendor Portal Login                 │
│      /vendor/login                          │
└─────────────────────────────────────────────┘
                    ↓
        ┌──────────────────────┐
        │  Select Vendor:      │
        │  • John Doe          │
        │  • Sarah Ahmed       │
        └──────────────────────┘
                    ↓
    ┌───────────────────────────────────┐
    │   John Doe's Businesses:          │
    │   1. TechHub Electronics (Blue)   │
    │   2. SmartHome Store (Green)      │
    └───────────────────────────────────┘
                    ↓
    ┌───────────────────────────────────┐
    │   Sarah Ahmed's Businesses:       │
    │   1. GadgetZone (Purple)          │
    │   2. AudioWorld (Red)             │
    └───────────────────────────────────┘
                    ↓
    ┌───────────────────────────────────┐
    │      Vendor Dashboard             │
    │   • View Stats                    │
    │   • Manage Products               │
    │   • Update Settings               │
    │   • Switch Business               │
    │   • View Customer Site            │
    └───────────────────────────────────┘
```

---

## 🎨 Business Themes Summary

| Business | Vendor | Theme Color | Products Count | Type |
|----------|--------|-------------|----------------|------|
| TechHub Electronics | John Doe | Blue (#1976d2) | 2 | Smartphones |
| SmartHome Store | John Doe | Green (#2e7d32) | 2 | Smartphones |
| GadgetZone | Sarah Ahmed | Purple (#9c27b0) | 2 | Tablet + Watch |
| AudioWorld | Sarah Ahmed | Red (#d32f2f) | 2 | Earbuds |

---

## 📝 What Vendors Can Do in Admin Portal

### 1. **Dashboard** (`/vendor/dashboard`)
- ✅ View business statistics
- ✅ See total products, orders, revenue
- ✅ Quick business info overview

### 2. **Products Management** (`/vendor/products`)
- ✅ View all products for selected business
- ✅ Search products
- ✅ Product details (image, price, stock)
- 🔜 Add new products (UI ready)
- 🔜 Edit products (UI ready)
- 🔜 Delete products (UI ready)

### 3. **Business Settings** (`/vendor/settings`)

#### **General Tab:**
- ✅ Business name
- ✅ Tagline
- ✅ Description

#### **Header & Footer Tab:**
- ✅ Header business name
- ✅ Header tagline
- ✅ Footer description
- ✅ Footer copyright text

#### **Theme Colors Tab:**
- ✅ Primary color (with live preview)
- ✅ Secondary color
- ✅ Accent color

#### **Contact Info Tab:**
- ✅ Email
- ✅ Phone
- ✅ Address
- ✅ Social media links (5 platforms)

### 4. **Switch Business**
- ✅ Sidebar → Click current business card
- ✅ Top bar → Avatar → Switch Business
- ✅ Modal with all businesses

### 5. **View Customer Site**
- ✅ Sidebar bottom → "View Customer Site"
- ✅ Opens customer frontend with selected business
- ✅ See exactly what customers see

---

## 🔐 Security & Access Control

### Vendor-Specific Access:
```javascript
// John Doe can ONLY access:
- TechHub Electronics (business-1)
- SmartHome Store (business-2)

// Sarah Ahmed can ONLY access:
- GadgetZone (business-3)
- AudioWorld (business-4)

// Test account (demo) can access ALL:
- All 4 businesses
```

### Protected Routes:
- ✅ `/vendor/login` → Public
- 🔒 `/vendor/dashboard` → Protected
- 🔒 `/vendor/products` → Protected
- 🔒 `/vendor/settings` → Protected
- 🔒 `/vendor/orders` → Protected

---

## 🧪 Step-by-Step Testing Guide

### Test 1: John's First Business (TechHub)
```bash
1. Go to: http://localhost:5173/vendor/login
2. Login: john@example.com
3. Modal appears → Select "TechHub Electronics"
4. Dashboard:
   - See 2 products count
   - Blue theme
5. Products Page:
   - See iPhone 15 Pro Max
   - See Samsung Galaxy S24 Ultra
6. Settings Page:
   - Tab 1: See "TechHub Electronics" name
   - Tab 2: See tagline "Innovation at Your Fingertips"
   - Tab 3: See blue color (#1976d2)
   - Tab 4: See support@techhub.com
7. View Customer Site:
   - Click "View Customer Site" in sidebar
   - Customer frontend opens
   - Blue theme visible
   - Header shows "TechHub Electronics"
   - Shop shows 2 smartphones
```

### Test 2: John's Second Business (SmartHome)
```bash
1. In vendor dashboard (logged in as John)
2. Click business card in sidebar OR
3. Avatar → Switch Business
4. Select "SmartHome Store"
5. Dashboard:
   - See 2 products count
   - Green theme
6. Products Page:
   - See Google Pixel 8 Pro
   - See OnePlus 12
7. Settings Page:
   - See "SmartHome Store" name
   - See tagline "Your Smart Living Starts Here"
   - See green color (#2e7d32)
8. View Customer Site:
   - Green theme
   - Header shows "SmartHome Store"
   - Shop shows different 2 smartphones
```

### Test 3: Sarah's Businesses
```bash
# Similar flow for:
1. GadgetZone (Purple, Tablet + Watch)
2. AudioWorld (Red, Earbuds)
```

---

## 🎬 Video Demo Script

### Part 1: John Doe (5 minutes)
```
1. Show login page
2. Login as john@example.com
3. Business selection modal appears
4. Select TechHub → Blue theme loads
5. Tour dashboard, products, settings
6. Click "View Customer Site" → Show customer view
7. Back to vendor portal
8. Switch to SmartHome → Green theme
9. Show different products
10. View customer site again
```

### Part 2: Sarah Ahmed (5 minutes)
```
1. Logout John
2. Login as sarah@example.com
3. Select GadgetZone → Purple theme
4. Show tablet + watch products
5. View customer site
6. Switch to AudioWorld → Red theme
7. Show earbuds products
8. Demonstrate settings customization
```

---

## 💡 Key Features Demonstrated

✅ **Multi-Vendor Support**
- 2 vendors, each with 2 businesses

✅ **Business Isolation**
- Each vendor sees only their businesses
- Products filtered by business

✅ **Theme Customization**
- 4 different color schemes
- Real-time theme switching

✅ **Content Management**
- Header/Footer customization
- Contact info management
- Social media links

✅ **Customer Preview**
- Live preview of customer site
- See changes immediately

✅ **Protected Access**
- Authentication required
- Business-level access control

---

## 📊 Summary Table

| Vendor | Email | Business 1 | Theme 1 | Business 2 | Theme 2 | Total Products |
|--------|-------|-----------|---------|-----------|---------|----------------|
| John Doe | john@example.com | TechHub Electronics | Blue | SmartHome Store | Green | 4 |
| Sarah Ahmed | sarah@example.com | GadgetZone | Purple | AudioWorld | Red | 4 |

---

## 🚀 Quick Start

```bash
# 1. Start development server
npm run dev

# 2. Open vendor login
http://localhost:5173/vendor/login

# 3. Try both vendors:
john@example.com → 2 businesses (Blue, Green)
sarah@example.com → 2 businesses (Purple, Red)

# 4. Explore features:
- Dashboard
- Products
- Settings
- Switch Business
- View Customer Site
```

---

**All 4 businesses তৈরি হয়েছে!** 🎉

প্রতিটা vendor তাদের businesses select করে manage করতে পারবে এবং customer preview দেখতে পারবে।

