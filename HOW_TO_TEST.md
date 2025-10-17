# Multi-Vendor System - Test করার Step-by-Step Guide 🎯

## Prerequisites
```bash
# Development server চালু করুন
npm run dev
# অথবা
yarn dev
```

Browser এ `http://localhost:5173` open করুন

---

## 📝 Step 1: Login করুন

1. **Sign In page** এ যান: `http://localhost:5173/sign-in`

2. **Login credentials:**
   ```
   Email: test@test.com
   Password: (যেকোনো password - mock data তে authentication check করা হয় না)
   ```

3. **Login button** click করুন

---

## 🏪 Step 2: Business Selection Modal

Login successful হওয়ার **2-3 সেকেন্ড** পরে automatically একটা **modal** open হবে যেখানে দেখবেন:

### Business Option 1: **TechHub Electronics**
- **Icon:** Blue shop icon
- **Description:** "Your premium destination for cutting-edge electronics and mobile devices"
- **Tagline:** "Innovation at Your Fingertips"
- **Theme:** Blue color scheme

### Business Option 2: **GadgetZone**
- **Icon:** Purple shop icon
- **Description:** "Best deals on smartphones, tablets, and accessories"
- **Tagline:** "Where Technology Meets Affordability"
- **Theme:** Purple color scheme

**যেকোনো একটা business এ click করুন।**

---

## ✅ Step 3: Verify TechHub Electronics (Business 1)

### TechHub select করলে দেখবেন:

#### 🎨 Theme Colors
- Primary color: **Blue (#1976d2)**
- Website এর buttons, links সব blue হবে

#### 📱 Header Changes
- **Business Name:** "TechHub Electronics" দেখাবে
- **Tagline:** "Innovation at Your Fingertips"
- Navigation: Home, Shop, Compare (standard links)

#### 📦 Products (Shop Page - `/shop`)
**4টা products দেখবে - সব smartphones:**
1. iPhone 15 Pro Max - $1,199
2. Samsung Galaxy S24 Ultra - $1,099
3. Google Pixel 8 Pro - $899
4. OnePlus 12 - $799

#### 🏢 Footer
- **Description:** "Your premium destination for cutting-edge electronics and mobile devices"
- **Contact:**
  - Email: support@techhub.com
  - Phone: +880 1234-567890
  - Address: 123 Tech Street, Dhaka 1215, Bangladesh
- **Social Media:** 5টা icons (Facebook, Twitter, Instagram, LinkedIn, YouTube)
- **Footer Text:** "© 2024 TechHub Electronics. All rights reserved."

---

## 🔄 Step 4: Switch to GadgetZone (Business 2)

### Business Switch করার পদ্ধতি:

1. **Header এ** top-right corner এ **user icon** (👤) click করুন
2. Dropdown menu open হবে
3. **"Switch Business"** option click করুন
4. Business selector modal আবার open হবে
5. এবার **"GadgetZone"** select করুন

---

## ✅ Step 5: Verify GadgetZone (Business 2)

### GadgetZone select করলে দেখবেন:

#### 🎨 Theme Colors
- Primary color: **Purple (#9c27b0)**
- পুরো website এর color scheme purple এ change হয়ে যাবে

#### 📱 Header Changes
- **Business Name:** "GadgetZone" দেখাবে
- **Tagline:** "Where Technology Meets Affordability"
- Navigation: Home, Shop, Compare

#### 📦 Products (Shop Page - `/shop`)
**4টা different products দেখবে - tablets/watches/earbuds:**
1. iPad Pro 12.9" M2 - $1,099
2. Apple Watch Series 9 - $399
3. AirPods Pro (2nd Gen) - $249
4. Samsung Galaxy Buds2 Pro - $179

#### 🏢 Footer
- **Description:** "Best deals on smartphones, tablets, and accessories"
- **Contact:**
  - Email: hello@gadgetzone.com
  - Phone: +880 1987-654321
  - Address: 456 Gadget Avenue, Chittagong 4100, Bangladesh
- **Social Media:** 3টা icons (Facebook, Instagram, YouTube - Twitter/LinkedIn নেই)
- **Footer Text:** "© 2024 GadgetZone. Your trusted tech partner."

---

## 🔍 Key Features to Test

### 1. **Product Filtering**
- TechHub: শুধু smartphones (4টা)
- GadgetZone: tablets, watches, earbuds (4টা)
- দুই business এর products **completely different**

### 2. **Theme Switching**
- TechHub → Blue buttons/links
- GadgetZone → Purple buttons/links
- **Real-time** change হয়

### 3. **Header/Footer Content**
- Business name dynamically change হয়
- Contact info আলাদা
- Social links আলাদা

### 4. **Persistence**
- Browser refresh দিলেও selected business থাকবে
- LocalStorage এ save হয়

### 5. **Account Menu Option**
Account dropdown এ নতুন option পাবেন:
```
Personal
Wishlist
Vouchers
Orders
Payment
─────────
Switch Business  ← নতুন
─────────
Logout
```

---

## 🧪 Testing Checklist

- [ ] Login successful হলো
- [ ] Business selector modal দেখালো
- [ ] TechHub select করলাম
- [ ] Blue theme দেখছি
- [ ] TechHub এর 4টা smartphone products দেখছি
- [ ] Footer এ TechHub contact info দেখছি
- [ ] "Switch Business" option পাচ্ছি
- [ ] GadgetZone এ switch করলাম
- [ ] Purple theme এ change হলো
- [ ] GadgetZone এর 4টা different products দেখছি
- [ ] Footer এ GadgetZone contact info দেখছি
- [ ] Browser refresh করলাম - business selected থাকলো

---

## 🐛 Troubleshooting

### Modal দেখাচ্ছে না?
```bash
# Browser console খুলুন (F12)
# localStorage check করুন:
localStorage.getItem('authToken')
localStorage.getItem('userData')
localStorage.getItem('selectedBusinessId')

# Clear করতে চাইলে:
localStorage.clear()
# তারপর page refresh করুন
```

### Products দেখাচ্ছে না?
- Shop page এ যান: `/shop`
- Console এ error আছে কিনা check করুন
- Selected business আছে কিনা verify করুন

### Theme change হচ্ছে না?
- Hard refresh করুন: `Ctrl + Shift + R` (Windows) or `Cmd + Shift + R` (Mac)
- Browser cache clear করুন

---

## 📹 Expected Flow (Video Demo Scenario)

```
1. Open browser → Login page
   ↓
2. Enter credentials → Click Login
   ↓
3. Wait 2-3 seconds → Business Modal appears
   ↓
4. Select "TechHub Electronics"
   ↓
5. See: Blue theme, TechHub branding, 4 smartphones
   ↓
6. Click user icon → Select "Switch Business"
   ↓
7. Select "GadgetZone"
   ↓
8. See: Purple theme, GadgetZone branding, 4 different products
   ↓
9. Refresh browser → Business selection persists
```

---

## 💡 Notes

- **Mock authentication:** Password verification নেই, যেকোনো password দিলেই login হবে
- **Test user:** `test@test.com` - এই user এর 2টা business আছে
- **LocalStorage:** Selected business save হয় browser এ
- **Real-time updates:** Business switch করলে instant সব content update হয়

---

**Happy Testing!** 🎉

