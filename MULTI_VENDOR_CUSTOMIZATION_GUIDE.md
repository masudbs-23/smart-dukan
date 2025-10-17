# Multi-Vendor Business Customization Guide

## 🎯 Overview

এই system এ প্রতিটি vendor তাদের business এর design customize করতে পারবে এবং changes publish করতে পারবে। **Default design সবসময় same থাকবে** যতক্ষণ না vendor তাদের changes publish করে।

---

## 📋 Key Features

### 1. **Default Design (Always Same)**
- Main route: `http://localhost:3000/`
- সব vendor এর জন্য initially একটা **default design** show হবে
- এটা কখনো change হবে না যতক্ষণ না vendor publish করে

### 2. **Individual Business Storefronts**
- প্রতিটি business এর জন্য আলাদা route:
  - `http://localhost:3000/techhub` - TechHub Electronics
  - `http://localhost:3000/smarthome` - SmartHome Store
  - `http://localhost:3000/gadgetzone` - GadgetZone
  - `http://localhost:3000/audioworld` - AudioWorld

- Published design দেখাবে যদি vendor publish করে থাকে
- Otherwise default design দেখাবে

### 3. **Vendor Dashboard - Customize Design**
- **Route:** `/vendor/customizer`
- **Features:**
  - ✅ Left side: Customization controls
  - ✅ Right side: Live preview (toggle করতে পারবেন)
  - ✅ Real-time changes দেখতে পারবেন
  - ✅ Save as Draft - changes save করবে কিন্তু publish হবে না
  - ✅ Publish - changes customer এর জন্য visible হবে
  - ✅ Discard Draft - সব unsaved changes remove করবে

### 4. **Customizable Elements**
Vendor যেসব জিনিস customize করতে পারবে:
- ✅ Business Name
- ✅ Description
- ✅ Tagline
- ✅ Theme Colors (Primary, Secondary)
- ✅ Contact Information (Email, Phone, Address)
- ✅ Social Links
- ✅ Header & Footer content

---

## 🚀 How It Works

### Draft & Published Versions

```
┌─────────────────────────────────────────────────────┐
│                   Business Data                      │
├─────────────────────────────────────────────────────┤
│  Default Settings (Always present)                   │
│    ├── name, description, theme, contact...         │
│                                                      │
│  Draft Settings (Vendor working copy)               │
│    ├── Temporary changes not visible to customers   │
│    ├── Can be saved multiple times                  │
│    └── Auto-saved when you click "Save as Draft"    │
│                                                      │
│  Published Settings (Live on customer site)         │
│    ├── Only visible after "Publish" is clicked      │
│    ├── Overrides default settings                   │
│    └── Customers see this on /:businessSlug         │
└─────────────────────────────────────────────────────┘
```

### Customer View Logic

```javascript
// Main route (/) - Always shows DEFAULT
localhost:3000/ → Default Design

// Business routes - Shows PUBLISHED or DEFAULT
localhost:3000/techhub → 
  if (published exists) → Show Published Design
  else → Show Default Design
```

---

## 🎨 Using the Customizer

### Step 1: Login as Vendor
```
Email: john@example.com (or sarah@example.com, test@test.com)
Password: any password (mock auth)
```

### Step 2: Select Your Business
- Business selector modal automatically opens
- Choose which business to customize

### Step 3: Navigate to Customizer
- Click **"Customize Design"** from dashboard
- Or go to `/vendor/customizer`

### Step 4: Make Changes
1. **Edit Settings** (Left Panel):
   - Change business name, description
   - Update theme colors using color picker
   - Modify contact information
   
2. **Preview Changes** (Right Panel - Optional):
   - Click eye icon to toggle preview
   - See real-time changes in iframe
   - Preview shows how it will look to customers

3. **Save Options:**
   - **Save as Draft** - Saves your work, not visible to customers yet
   - **Publish Changes** - Makes changes live on `/:businessSlug`
   - **Discard Draft** - Removes all unsaved changes

### Step 5: View Customer Preview
- Click **"Open Customer Preview in New Tab"**
- Opens `localhost:3000/:businessSlug` in new window
- Shows exactly what customers will see

---

## 🔄 Workflow Example

### Scenario: Vendor wants to change their theme color

```
1. Login → john@example.com
2. Select Business → TechHub Electronics
3. Go to Customizer → /vendor/customizer
4. Change Primary Color → #1976d2 to #ff5722
5. Toggle Preview → See changes in right panel
6. Save as Draft → Changes saved but not published
   
   At this point:
   - localhost:3000/techhub → Still shows DEFAULT (blue)
   - Vendor dashboard preview → Shows DRAFT (orange)

7. Click "Publish Changes" → Changes go live!
   
   Now:
   - localhost:3000/techhub → Shows PUBLISHED (orange)
   - localhost:3000/ → Still shows DEFAULT (unchanged)
```

---

## 📦 Demo Vendors & Businesses

### Vendor 1: John Doe
- **Email:** john@example.com
- **Businesses:**
  1. TechHub Electronics (`/techhub`) - Blue theme
  2. SmartHome Store (`/smarthome`) - Green theme

### Vendor 2: Sarah Ahmed
- **Email:** sarah@example.com
- **Businesses:**
  1. GadgetZone (`/gadgetzone`) - Purple theme
  2. AudioWorld (`/audioworld`) - Red theme

### Demo Account
- **Email:** test@test.com
- **Access:** All 4 businesses

---

## 🎯 Key Points to Remember

1. ✅ **Default route (`/`)** সবসময় default design দেখাবে
2. ✅ **Business routes (`/:slug`)** published design দেখাবে (or default if not published)
3. ✅ **Draft changes** শুধুমাত্র vendor dashboard এ visible
4. ✅ **Published changes** customer site এ visible
5. ✅ **Each business** এর জন্য separate draft ও published version
6. ✅ **Real-time preview** vendor dashboard এ available

---

## 🛠️ Technical Architecture

### File Structure
```
src/
├── _mock/
│   └── _businesses.ts          # Business data with draft/published
├── pages/
│   ├── ecommerce/
│   │   └── business-storefront.tsx  # Dynamic /:slug route
│   └── vendor/
│       └── business-customizer.tsx  # Customization interface
├── contexts/
│   └── BusinessContext.tsx     # Business state management
└── routes/
    └── sections.tsx            # Route configuration
```

### Key Functions
- `getEffectiveBusinessSettings()` - Returns published or default
- `getDraftBusinessSettings()` - Returns draft or default
- `updateBusinessDraft()` - Saves draft changes
- `publishBusinessChanges()` - Publishes draft to live
- `discardDraftChanges()` - Removes draft

---

## 🎉 Result

✅ Default design always same at `/`  
✅ Each vendor can customize their business  
✅ Changes saved as draft before publishing  
✅ Live preview in vendor dashboard  
✅ Customer sees published design at `/:businessSlug`  
✅ Easy to manage multiple businesses  

---

## 📞 Support

For questions or issues, contact the development team.

**Happy Customizing! 🎨**

