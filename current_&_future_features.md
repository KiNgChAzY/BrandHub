# BrandHub: What It Does & What's Coming Next

## 🏠 What is BrandHub?

A simple website where you can store and share your company's brand files (like logos, colors, and fonts).

---

## ✅ WHAT WORKS RIGHT NOW

### 1. **LOGIN & ACCOUNTS**

**Sign Up Page** (`src/screens/SignUp.jsx`)

- Make a new account with your email
- Choose: "User" (can download) or "Admin" (can upload)
- Optional: Add your display name
- Goes to dashboard after signing up

**Login Page** (`src/screens/Login.jsx`)

- Log in with email and password
- Stays logged in when you refresh
- Goes to dashboard after login

### 2. **NAVIGATION & PAGES**

**Top Menu** (`src/components/Navbar.jsx`)

- Shows your name when logged in
- Buttons: Dashboard, Assets, Brand
- Only admins see "Upload" button

**Who Can See What Pages:**

- ✅ Must be logged in for: Dashboard, Assets, Brand
- ✅ Only admins can see: Upload page
- ✅ Anyone can see: Login, Signup pages

### 3. **DASHBOARD** (`src/screens/Dashboard.jsx`)

- Shows total number of files
- Lists 5 newest uploads
- Summary cards for quick info

### 4. **UPLOADING FILES** (Admin Only) (`src/screens/BrandAssets/UploadAsset.jsx`)

- Upload files up to 10MB
- Supported: Images, PDFs, Fonts
- Drag-and-drop files
- Shows progress bar
- Stores in database with:
  - File name and type
  - Category
  - Who uploaded it
  - When it was uploaded
  - Download count (starts at 0)

### 5. **DOWNLOADING FILES** (`src/screens/BrandAssets/AssetLibrary.jsx`)

- Browse all files
- See file details
- Click to download
- Newest files first

### 6. **BACKEND CONNECTION**

**Firebase Setup** (`src/config/firebase.js`)

- Handles user accounts
- Stores file info
- Stores actual files
- Won't crash if not set up

### 7. **DESIGN & LOOK**

- Dark theme (black/dark gray)
- Works on phones & computers
- Consistent buttons/forms

---

## 🔮 WHAT WE'RE BUILDING NEXT

### COMING SOON (Important Stuff)

#### 1. **LOGO CHECKER** (`src/screens/BrandSweep.jsx`)

- Upload old logo + new logo
- Click "Run Sweep" (3-second fake scan)
- Shows where old logo might be used
- Saves results to view later

#### 2. **COLORS PAGE** (`src/screens/BrandAssets/ColorPalette.jsx`)

- Shows uploaded colors
- Color boxes with codes (HEX, RGB)
- Shows how to use each color
- Message if no colors yet

#### 3. **FONTS PAGE** (`src/screens/BrandAssets/TypographyShowcase.jsx`)

- Shows uploaded fonts
- Font samples in different sizes
- Shows how to use each font
- Message if no fonts yet

#### 4. **TEMPLATES PAGE** (`src/screens/BrandAssets/Templates.jsx`)

- Browse design templates
- Download for your projects

#### 5. **SHARE PAGE** (`src/screens/ShareBrandPage.jsx`)

- Create shareable link
- Anyone with link can view
- Only you can create links

---

## 💾 HOW WE STORE DATA

### User Info (in Database)

```
email: "your@email.com"
role: "admin" or "user"
name: "Your Name"
lastLogin: [date]
```

### File Info (in Database)

```
name: "Company Logo"
category: "logo" (or color, font, template)
fileUrl: "link-to-file"
fileType: "image/png"
uploadedBy: "admin@email.com"
uploadedAt: [date]
downloads: 10
```

### Logo Check Results (in Database)

```
oldLogo: "link-to-old-logo"
newLogo: "link-to-new-logo"
results: [
  { website: "example.com", confidence: 95% },
  { website: "blog.com", confidence: 87% }
]
createdAt: [date]
createdBy: "admin@email.com"
```

---

## 🔐 SAFETY FEATURES

### ALREADY WORKING:

- ✅ Need login to use site
- ✅ Different access for Admin vs User
- ✅ Can't access pages without login
- ✅ File size limit: 10MB max
- ✅ No passwords in code

### PLANNED:

- [ ] Extra download protection
- [ ] Upload limits (no flooding)
- [ ] Virus check on uploads
- [ ] Track user activity
- [ ] Extra login protection for admins

---

## 🛠️ TOOLS WE USE

- **Website:** React + Vite (makes pages fast)
- **Design:** Tailwind CSS (makes it look good)
- **Pages:** React Router (moves between pages)
- **Backend:** Firebase (handles users, data, files)
- **Code:** JavaScript/JSX

---

## 🚀 HOW TO START WORKING ON THIS

### FIRST TIME SETUP:

1. Copy code to computer
2. Install software: `npm install`
3. Create `.env.local` file (ask for settings)
4. Start website: `npm run dev`
5. Open: http://localhost:5173

### HOW PEOPLE USE IT:

1. **New User:** Sign up → Choose role → Use site
2. **Admin:** Upload files (Dashboard → Upload)
3. **Regular User:** Browse & download files

### ADD SOMETHING NEW:

1. Create new file in `src/screens/` or `src/components/`
2. Add page link in `src/App.jsx`
3. Add menu button in `src/components/Navbar.jsx`
4. Test at http://localhost:5173
5. Save & share changes

---

## 📚 SIMPLE TERMS GLOSSARY

- **Component** = Building block (button, page, etc.)
- **Route** = Website page / URL
- **Firebase** = Service that handles users/data/files
- **Admin** = Can upload files
- **User** = Regular user (download only)
- **State** = Info website remembers
- **API** = Way programs talk to each other
- **Database** = Where we store info
- **Metadata** = Info about a file (name, size, type)

---

## 📌 QUICK NOTES

- This is the **basic version** - more coming!
- Won't crash even if backend isn't set up
- Dark theme is default (easy to change)
- Each page is independent (easy to test)

---

## ❓ NEED HELP?

**File Locations:**

- All pages: `src/screens/`
- Parts of pages: `src/components/`
- Settings: `src/config/`
- Styles: `src/index.css`

**Common Tasks:**

- Change colors: Edit `src/index.css`
- Add new page: Create file in `src/screens/`
- Change menu: Edit `src/components/Navbar.jsx`
- Change who sees what: Edit `src/App.jsx`

---

**Last Updated:** Today  
**Status:** Working - Adding New Features
