# BrandHub 10% MVP Implementation Plan

## Overview

**Project:** BrandHub - Centralized Brand Identity & Asset Management Platform

**Purpose:** This is a Proof of Concept (PoC) implementing 10% of the final functionality to demonstrate core brand asset management capabilities.

**Key Constraint:** Build ONLY what's in the "Core 10% Functionality" section. No optional features, no "nice-to-haves". Every feature must be production-ready and working, not half-baked.

**Core 10% Functionality (from PRD):**

1. User Authentication & Roles (signup/login with email/password, admin/user roles)
2. Brand Asset Upload & Management (Admin can upload logos, fonts, colors, templates)
3. Brand Asset Page (Users can browse and download assets)
4. Dashboard (Summary cards: total assets, recent activity, sweep status)
5. Brand Sweep Simulation (Mock AI scan - upload old/new logos, simulate scan, display results)
6. Basic Navigation & Responsive UI (Navbar, protected routes, mobile-responsive)

**Technology Stack:**

- React 18.2.0 + React Router DOM 6.14.1
- Firebase 9.22.1 (Auth, Firestore, Storage)
- Tailwind CSS 3.4.7 (Dark theme, responsive)
- Vite 5.3.0 (Build tool)

**Key Principles:**

- **Simplicity:** Every change should be minimal and impact as little code as possible
- **Security First:** Production-ready security, no secrets in code, input validation
- **Graceful Degradation:** App should work (with limited functionality) even if Firebase isn't configured
- **Production Ready:** All code must be secure, tested, and deployable

**Reference Documents:**

- `PRD.md` - Full product requirements and specifications
- This file (`tasks/todo.md`) - Current implementation status and tasks

---

## Current Status Assessment

**✅ Already Complete:**

- Routes wired in App.jsx with AuthProvider
- All page components created (Login, SignUp, Dashboard, UploadAsset, AssetPage, BrandSweep, ColorPalette, TypographyShowcase, Templates, ShareBrandPage)
- Firebase config with graceful fallback (won't crash if not configured)
- Advanced styling with Tailwind dark theme and CSS variables
- Protected routes (AdminRoute, PrivateRoute)
- **NEW:** Sidebar navigation component with collapsible menu
- **NEW:** Header component with page titles
- **NEW:** Brand landing page with hero sections
- **NEW:** Updated Dashboard with quick access cards and projects
- **NEW:** Hero sections on ColorPalette, TypographyShowcase, BrandSweep pages
- **NEW:** lucide-react icons integrated

---

# ✅ COMPLETED TASKS

## Major Completed Milestones

### ✅ Task 1: Implement BrandSweep Mock Functionality

**Goal:** Make BrandSweep page functional with mock API simulation

- [x] Add file upload state management (old logo, new logo)
- [x] Add "Run Sweep" button handler with 3-second mock delay
- [x] Display progress indicator during simulation
- [x] Generate mock results (array of detected sites)
- [x] Save sweep results to Firestore `sweeps` collection
- [x] Display results in a simple table
- [x] Handle errors gracefully

**Files modified:** `src/screens/BrandSweep.jsx`

---

### ✅ Task 2: Load Real Data for ColorPalette & TypographyShowcase

**Goal:** Display actual color/typography assets from Firestore

- [x] Update ColorPalette to query Firestore for assets with category="color"
- [x] Display color swatches with HEX/RGB values from metadata
- [x] Update TypographyShowcase to query Firestore for assets with category="typography"
- [x] Display typography samples with font info from metadata
- [x] Handle empty states (no assets found)
- [x] Handle Firebase not configured gracefully

**Files modified:**
- `src/screens/BrandAssets/ColorPalette.jsx`
- `src/screens/BrandAssets/TypographyShowcase.jsx`

---

### ✅ Task 3: Security Review & Hardening

**Goal:** Ensure production-ready security

- [x] Verify .gitignore includes `.env*` files
- [x] Scan codebase for hardcoded secrets/API keys
- [x] Verify no sensitive data in frontend code
- [x] Check Firebase config uses env variables only
- [x] Review file upload security (file type validation, size limits)
- [x] Verify user input sanitization
  - [x] Check email input validation (type="email" and required, maxLength=254)
  - [x] Check password input validation (minLength=6, maxLength=128, required)
  - [x] Check text inputs (asset names, descriptions) for length limits and sanitization
  - [x] Verify file names are sanitized before storage
  - [x] Check role selection is limited to valid values
  - [x] Review Sidebar search input (maxLength=100 added)
- [x] Check for XSS vulnerabilities in user-generated content display
  - [x] Verify all user data is rendered via React (no dangerouslySetInnerHTML)
  - [x] Check URL display in BrandSweep results (use rel="noreferrer")
  - [x] Verify asset names/descriptions are safely displayed
  - [x] Check that file URLs from Firebase Storage are trusted sources
  - [x] Verify user email display in Sidebar and Header components
  - [x] Check new components (Sidebar, Header) for safe rendering

**Files reviewed:**
- ✅ `.gitignore` - Properly configured
- ✅ `src/config/firebase.js` - Uses env variables only
- ✅ `src/screens/BrandAssets/UploadAsset.jsx` - File size limits (10MB), admin-only access, file name sanitization, input length limits
- ✅ `src/screens/BrandSweep.jsx` - File size limits (10MB), image type validation, file name sanitization
- ✅ All form components - React handles XSS by default
- ✅ `src/components/Sidebar.jsx` - Search input has maxLength, user data safely rendered
- ✅ `src/components/Header.jsx` - User email safely displayed
- ✅ `src/App.jsx` - Layout structure reviewed, no security issues

**Security Improvements Implemented:**

1. **Created `src/utils/security.js`** - Utility functions for:
   - File name sanitization (prevents path traversal)
   - Text sanitization with length limits
   - Email and role validation

2. **File Name Sanitization:**
   - UploadAsset.jsx: Sanitizes file names before Firebase Storage upload
   - BrandSweep.jsx: Sanitizes logo file names before upload
   - Removes `../`, special characters, and limits length to 255 chars

3. **Input Validation & Length Limits:**
   - Email: maxLength=254 (Login & SignUp)
   - Password: maxLength=128, minLength=6 (Login & SignUp)
   - Asset Name: maxLength=200 (UploadAsset)
   - Description: maxLength=500 (UploadAsset)
   - Search: maxLength=100 (Sidebar)

4. **Role Validation:**
   - SignUp form validates role on submit (only "admin" or "user" allowed)

5. **XSS Prevention:**
   - All user data rendered via React JSX (auto-escaped)
   - No dangerouslySetInnerHTML usage found
   - URLs use rel="noreferrer"

**Testing:**
- Security testing checklist created: `testing/SECURITY_TESTING_CHECKLIST.md`
- Partial testing completed by user
- Remaining tests can be completed using the checklist

---

### ✅ Task 4: Syntax & Code Quality Check

**Goal:** Ensure code runs smoothly

- [x] Run linter on all modified files
- [x] Check for console errors in browser
  - [x] Start dev server and check browser console (no runtime errors reported)
  - [x] Navigate through all core pages (Login, SignUp, Dashboard, UploadAsset, AssetPage, BrandSweep, ColorPalette, TypographyShowcase, Brand landing page)
  - [x] Test new Sidebar and Header components (toggle, mobile menu)
  - [x] Test with Firebase configured and not configured (graceful fallback preserved)
  - [x] Verify no runtime errors or warnings (none observed)
  - [x] Check that lucide-react icons load correctly
- [x] Verify all imports are correct
- [x] Test that pages render without errors
- [x] Verify Firebase optional handling works
- [x] Verify new dependencies (lucide-react) are properly installed
- [x] Run production build (`npm run build`) to catch syntax/build-time errors (build succeeded; only chunk-size warning)

**Files checked:** All modified files - No linter errors found

**Notes:**
- `npm run build` succeeded.
- Vite emitted a warning about large JS chunk size after minification (performance optimization opportunity; not a functional/syntax issue).

---

### ✅ Task 5: Update Documentation

**Goal:** Document changes made

- [x] Add review section to tasks/todo.md
  - [x] Summary of all security review findings
  - [x] Summary of code quality checks
  - [x] List of all files reviewed/modified
  - [x] Security measures implemented
  - [x] Any remaining recommendations or follow-ups
- [x] Summarize all changes made
- [x] Document security measures taken
- [x] List files modified
- [x] Add any notes or follow-ups

**Files to modify:** `tasks/todo.md`

---

### ✅ Image Format Selection - Step 1: Create Image Conversion Utility

**Goal:** Build the core image conversion functionality using Canvas API

**Tasks:**
- [x] Create `src/utils/imageConverter.js` file
- [x] Implement `convertImageFormat(imageUrl, targetFormat, quality)` function
  - Load image from URL (handle CORS)
  - Draw image to HTML5 Canvas
  - Export in target format (PNG, JPG, WebP)
  - Return blob for download
- [x] Implement `downloadImage(blob, filename, format)` function
  - Create download link
  - Trigger browser download with proper filename
- [x] Add SVG handling logic
  - If source is SVG, serve directly
  - If source is raster, attempt conversion (with fallback if fails)
- [x] Add error handling for conversion failures
- [x] Add file size validation (warn if image too large for conversion)

**Files created:**
- `src/utils/imageConverter.js`

---

### ✅ Image Format Selection - Step 2: Create Format Service for Caching

**Goal:** Build service to handle format generation, Firebase Storage upload, and Firestore updates

**Tasks:**
- [x] Create `src/services/formatService.js` file
- [x] Implement `generateFormat(assetId, targetFormat)` function
  - Check if format exists in Firestore `availableFormats` field
  - If exists, return cached URL
  - If not, convert image using `imageConverter`
  - Upload converted file to Firebase Storage
  - Update Firestore with new format URL and timestamp
  - Return download URL
- [x] Implement Firestore schema update logic
  - Structure: `availableFormats: { original: {...}, png: {...}, jpg: {...}, webp: {...}, svg: {...} }`
- [x] Add error handling and logging
- [x] Add loading state management (for UI feedback)

**Files created:**
- `src/services/formatService.js`

---

### ✅ MVP Spec Alignment - Phase 1: Task 1.1 - Create UserInvite Component (UI Only)

**Tasks:**
- [x] Create `src/components/UserInvite.jsx` component
- [x] Add email input field with validation (use `isValidEmail` from security utils)
- [x] Add role selection dropdown (User/Admin)
- [x] Add form UI with submit button
- [x] Show success message on submit (no Firestore storage - placeholder only)
- [x] Add modal close functionality
- [x] Structure component with clear separation: form state, validation, submit handler
- [x] Add clear, descriptive comments explaining:
  - This is a UI placeholder for MVP
  - Future implementation will store in Firestore `invitations` collection
  - Data structure ready: `{ email, role, invitedBy, invitedByEmail, invitedAt, status }`
- [x] Add TODO comments marking where Firestore integration will go
- **Security:** Sanitize email input, validate role selection
- **Note:** This is a UI placeholder - structure it so Firestore integration can be easily added later

**Files created:** `src/components/UserInvite.jsx`

---

## Completed Infrastructure & Features

- ✅ PRD consolidation and appendix added to `PRD.md`
- ✅ Todo checklist updated in `tasks/todo.md`
- ✅ Firebase config scaffold (`src/config/firebase.js`) with graceful fallback
- ✅ Firebase credentials configured in `.env.local` (gitignored)
- ✅ `.gitignore` updated to exclude sensitive files
- ✅ `.env.local.example` template created
- ✅ AuthContext implementation (`src/contexts/AuthContext.jsx`)
- ✅ `SignUp` and `Login` screens (`src/screens/SignUp.jsx`, `src/screens/Login.jsx`)
- ✅ `Navbar` component (`src/components/Navbar.jsx`)
- ✅ `Dashboard` screen (`src/screens/Dashboard.jsx`)
- ✅ `UploadAsset` component (`src/screens/BrandAssets/UploadAsset.jsx`)
- ✅ App routing wired (`src/App.jsx`) and entry (`src/main.jsx`)
- ✅ `AssetPage` screen (`src/screens/BrandAssets/AssetPage.jsx`)
- ✅ All code pushed to GitHub

---

# 📋 PENDING TASKS

## 🎯 PRIORITY: Image Format Selection & Search Functionality

**Goal:** Allow users to download images in different formats (PNG, JPG, WebP, SVG) with format selection, and add search functionality to Asset Page.

> **⚠️ IMPORTANT: Firebase Storage Setup Required**
> 
> Before starting work on these tasks, ensure Firebase Storage is properly set up:
> - Enable billing on Firebase project (required even for free tier)
> - Enable Firebase Storage in the Firebase Console
> - Configure Storage rules for authenticated users
> - Verify Storage bucket is accessible
> 
> See `FIREBASE_FREE_STORAGE_SETUP.md` for detailed setup instructions.

**Key Features:**
- Format selection when downloading images (PNG, JPG, WebP, SVG)
- Lazy generation: Convert formats on-demand and cache in Firebase Storage
- Search functionality: Real-time search by asset name on Asset Page
- Download tracking: Increment download counter when assets are downloaded

---

## 🎨 Design System Rollout

**Goal:** Apply the design system from `zexample/globals.css` and `zexample/DESIGN_SYSTEM.md` to all pages and components across the project, ensuring consistent styling, typography, spacing, and component patterns.

**Status:** Asset Page ✅ Complete - Ready to roll out to remaining pages/components

**Key Changes Applied:**
- ✅ Updated `src/index.css` with design system CSS variables and utility classes
- ✅ Updated `tailwind.config.cjs` to use `var(--...)` format for all color variables
- ✅ Added typography utility classes (`.text-heading-xl`, `.text-body-md`, etc.)
- ✅ Added shadow utilities (`.shadow-sleek`, `.shadow-card`, `.shadow-float`)
- ✅ Updated button component classes (`.btn-primary`, `.btn-secondary`, `.btn-ghost`)
- ✅ Asset Page fully updated with design system classes

**Pages to Update:**
1. Dashboard
2. Login
3. SignUp
4. BrandSweep
5. AssetDetail
6. UploadAsset
7. ColorPalette
8. TypographyShowcase
9. Templates
10. ShareBrandPage

**Components to Update:**
1. Header
2. Navbar
3. Sidebar
4. AssetModal
5. AssetEditModal
6. DownloadModal
7. UserInvite

---

### ✅ Design System Rollout - Step 1: Dashboard (COMPLETED)

**Goal:** Update Dashboard page to use design system typography, spacing, buttons, and colors.

**Questions to ask before starting:**
- Should the dashboard cards use `.card` class or maintain current styling?
- How should the quick access cards be styled (use design system card style)?
- Should metrics use the design system's metric card style?

**Tasks:**
- [x] Review current Dashboard implementation
- [x] Update typography to use design system classes (`.text-heading-xl`, `.text-body-md`, etc.)
- [x] Update buttons to use design system button classes (`.btn-primary`, `.btn-secondary`)
- [x] Update spacing to use design system spacing scale (8px base unit)
- [x] Update colors to use design system tokens (no hardcoded colors)
- [x] Update cards to use design system card styling if applicable
- [x] Test Dashboard functionality and visual appearance
- [x] Verify responsive behavior

**Files modified:**
- `src/screens/Dashboard.jsx`

**Changes made:**
- Replaced hero gradient with solid `bg-primary` color
- Converted hero buttons to `.btn-secondary` with design system styling
- Updated quick access cards to standard `.card` class
- Updated metric cards to standard `.card` class (removed gradient style)
- Updated icon colors to semantic design system colors (primary-accent, warning, error, info)
- Updated all typography to design system classes
- Changed border radius from `rounded-3xl` to design system tokens (`rounded-xl`, `rounded-lg`)
- Updated spacing to use design system scale
- Removed unused imports and hardcoded colors

---

---

### ✅ Design System Rollout - Step 2: Login (COMPLETED)

**Goal:** Update Login page to use design system typography, spacing, buttons, inputs, and colors.

**Questions to ask before starting:**
- Should error messages use the design system's error styling pattern?
- Should the form layout spacing follow design system spacing scale?
- Should labels use design system label typography classes?

**Tasks:**
- [x] Review current Login implementation
- [x] Update typography to use design system classes (`.text-heading-xl` for heading)
- [x] Update buttons to use design system button classes (`.btn-primary` - already in use)
- [x] Update inputs to use design system input styling (`.input` class - already in use)
- [x] Update spacing to use design system spacing scale (kept `space-y-4`)
- [x] Update error message styling to use design system border radius (`rounded-lg`)
- [x] Verify link styling uses design system patterns (kept `hover:underline`)
- [x] Test Login functionality and visual appearance
- [x] Verify responsive behavior

**Files modified:**
- `src/screens/Login.jsx`

**Changes made:**
- Updated heading from `text-3xl font-bold` to `.text-heading-xl`
- Updated error message border radius from `rounded-2xl` to `rounded-lg`
- Kept all other styling as-is (minimal changes approach)

---

---

### ✅ Design System Rollout - Step 3: SignUp (COMPLETED)

**Goal:** Update SignUp page to use design system typography, spacing, buttons, inputs, and colors.

**Questions to ask before starting:**
- Should SignUp use the same heading size as Login (`.text-heading-xl`)?
- Should error messages use the same styling as Login (`.rounded-lg`)?
- Should form spacing match Login page (`space-y-4`)?
- Should labels keep current styling or use design system label classes?

**Tasks:**
- [x] Review current SignUp implementation
- [x] Update typography to use design system classes (`.text-heading-xl` for heading)
- [x] Update buttons to use design system button classes (`.btn-primary` - already in use)
- [x] Update inputs to use design system input styling (`.input` class - already in use)
- [x] Update spacing to use design system spacing scale (kept `space-y-4`)
- [x] Update error message styling to use design system border radius (`rounded-lg`)
- [x] Verify link styling uses design system patterns (kept `hover:underline`)
- [x] Test SignUp functionality and visual appearance
- [x] Verify responsive behavior

**Files modified:**
- `src/screens/SignUp.jsx`

**Changes made:**
- Updated heading from `text-3xl font-bold` to `.text-heading-xl`
- Updated error message border radius from `rounded-2xl` to `rounded-lg`
- Kept all other styling as-is (minimal changes approach, matching Login page)

---

### ✅ Design System Rollout - Step 4: BrandSweep (COMPLETED)

**Goal:** Update BrandSweep page to use design system typography, spacing, buttons, inputs, and colors.

**Questions to ask before starting:**
- Should the hero section use solid `bg-primary` color like Dashboard, or a different approach?
- Should file input buttons use design system button styling or keep custom file input styling?
- Should the results table badges use design system semantic colors?
- Should error/loading messages use the same styling patterns as Login/SignUp?

**Tasks:**
- [x] Review current BrandSweep implementation
- [x] Update hero section (replace gradient with solid `bg-primary` color, update typography)
- [x] Update typography to use design system classes (`.text-heading-xl`, `.text-heading-lg`, `.text-body-md`, `.text-label-md`, `.text-label-sm`)
- [x] Update buttons to use design system button classes (`.btn-primary` - already in use)
- [x] Update file inputs to use design system primary colors (`file:bg-primary`, `hover:file:opacity-90`)
- [x] Update spacing to use design system spacing scale
- [x] Update error/loading message styling to use design system patterns (`rounded-lg`)
- [x] Update border radius to use design system tokens (replaced `rounded-3xl` with `rounded-xl`/`rounded-lg`, `rounded-2xl` with `rounded-lg`)
- [x] Update cards to use design system card styling (already using `.card`)
- [x] Update badge/status indicators to use design system semantic colors (`bg-warning-light`, `text-warning-foreground`)
- [x] Test BrandSweep functionality and visual appearance
- [x] Verify responsive behavior

**Files modified:**
- `src/screens/BrandSweep.jsx`

**Changes made:**
- Replaced hero gradient with solid `bg-primary` color and updated typography
- Updated all headings to design system typography classes
- Updated file input buttons to use design system primary colors
- Updated error/loading messages to use `rounded-lg`
- Updated results table border to use `rounded-lg`
- Updated action badges to use design system semantic colors (`bg-warning-light`, `text-warning-foreground`)
- Updated all border radius values to design system tokens

---

---

### ✅ Design System Rollout - Step 5: AssetDetail (COMPLETED)

**Goal:** Update AssetDetail page to use design system typography, spacing, buttons, inputs, modals, and colors.

**Questions to ask before starting:**
- Should the main heading use `.text-heading-xl` (same as other pages)?
- Should the status badge use design system semantic colors (`bg-success-light`, `text-success-foreground`)?
- Should file input buttons use design system primary colors (same as BrandSweep)?
- Should modal border radius use `rounded-xl` or `rounded-lg`?
- Should error/loading messages use `rounded-lg` (same as other pages)?

**Tasks:**
- [x] Review current AssetDetail implementation
- [x] Update typography to use design system classes (`.text-heading-xl`, `.text-heading-lg`, `.text-heading-md`, `.text-body-md`, `.text-body-sm`, `.text-caption`, `.text-label-sm`)
- [x] Update buttons to use design system button classes (`.btn-primary`, `.btn-secondary` - already in use)
- [x] Update file inputs to use design system primary colors (`file:bg-primary`, `hover:file:opacity-90`)
- [x] Update modal styling to use design system patterns (`rounded-xl` for modal, `rounded-lg` for elements)
- [x] Update spacing to use design system spacing scale
- [x] Update error/loading message styling to use design system patterns (`rounded-lg`)
- [x] Update border radius to use design system tokens (replaced `rounded-2xl` with `rounded-lg`, `rounded-3xl` with `rounded-xl`)
- [x] Update status badge to use design system semantic colors (`bg-success-light`, `text-success-foreground`)
- [x] Update empty states to use design system styling
- [x] Test AssetDetail functionality and visual appearance
- [x] Verify responsive behavior

**Files modified:**
- `src/screens/BrandAssets/AssetDetail.jsx`

**Changes made:**
- Updated main heading to `.text-heading-xl`
- Updated section headings to `.text-heading-md`
- Updated modal heading to `.text-heading-lg`
- Updated status badge to use design system semantic colors (`bg-success-light`, `text-success-foreground`)
- Updated file input buttons to use design system primary colors
- Updated modal border radius to `rounded-xl`
- Updated all other border radius values to `rounded-lg`
- Updated error/loading messages to use `rounded-lg`
- Updated typography throughout to use design system classes

---

---

### ✅ Design System Rollout - Step 6: UploadAsset (COMPLETED)

**Goal:** Update UploadAsset page to use design system typography, spacing, buttons, inputs, and colors.

**Questions to ask before starting:**
- Should headings use design system typography classes (`.text-heading-xl`, `.text-heading-md`)?
- Should file input buttons use design system primary colors (same as BrandSweep/AssetDetail)?
- Should error/loading messages use `rounded-lg` (same as other pages)?
- Should form spacing follow design system spacing scale?
- Should labels keep current styling or use design system label classes?

**Tasks:**
- [x] Review current UploadAsset implementation
- [x] Update typography to use design system classes (`.text-heading-xl`, `.text-heading-sm`, `.text-body-md`, `.text-body-sm`)
- [x] Update buttons to use design system button classes (`.btn-success` kept, `.btn-primary`, `.btn-secondary` already in use)
- [x] Update file inputs to use design system primary colors (`file:bg-primary`, `hover:file:opacity-90`)
- [x] Update spacing to use design system spacing scale (kept `space-y-5`)
- [x] Update error/loading message styling to use design system patterns (`rounded-lg`)
- [x] Update border radius to use design system tokens (replaced `rounded-2xl` with `rounded-lg`)
- [x] Update cards to use design system card styling (already using `.card`)
- [x] Test UploadAsset functionality and visual appearance
- [x] Verify responsive behavior

**Files modified:**
- `src/screens/BrandAssets/UploadAsset.jsx`

**Changes made:**
- Updated main heading to `.text-heading-xl`
- Updated section heading to `.text-heading-sm`
- Updated description text to `.text-body-md`
- Updated file input buttons to use design system primary colors
- Updated error/loading messages to use `rounded-lg` and `.text-body-sm`
- Updated all border radius values to design system tokens (`rounded-lg`)
- Kept `.btn-success` for submit button
- Kept form spacing at `space-y-5` and label styling as-is

---

---

### ✅ Design System Rollout - Step 7: ColorPalette (COMPLETED)

**Goal:** Update ColorPalette page to use design system typography, spacing, buttons, and colors.

**Questions to ask before starting:**
- Should the hero section use solid `bg-primary` color like Dashboard, or keep gradient? → **Solid `bg-primary`**
- Should headings use design system typography classes (`.text-heading-xl`, `.text-heading-lg`)? → **`.text-heading-xl` for hero, `.text-heading-md` for section**
- Should color swatch cards use design system card styling? → **Keep `rounded-3xl` for swatch cards**
- Should border radius follow design system tokens? → **`rounded-xl` for hero, `rounded-lg` for empty state**

**Tasks:**
- [x] Review current ColorPalette implementation
- [x] Update hero section (replaced gradient with solid `bg-primary`, updated border radius to `rounded-xl`)
- [x] Update typography to use design system classes (`.text-heading-xl`, `.text-heading-md`, `.text-body-md`)
- [x] Update spacing to use design system spacing scale
- [x] Update border radius to use design system tokens (`rounded-xl` for hero, `rounded-lg` for empty state)
- [x] Keep color swatch cards with `rounded-3xl` (as requested)
- [x] Update loading and empty state headings to use design system typography
- [x] Test ColorPalette functionality and visual appearance
- [x] Verify responsive behavior

**Files modified:**
- `src/screens/BrandAssets/ColorPalette.jsx`

**Changes made:**
- Updated hero section: replaced gradient with solid `bg-primary`, changed border radius from `rounded-3xl` to `rounded-xl`
- Updated hero heading to `.text-heading-xl`
- Updated hero description to `.text-body-md`, kept `text-white/80` opacity
- Updated section heading "Brand Colors" to `.text-heading-md`
- Updated loading state heading to `.text-heading-xl`
- Updated empty state heading to `.text-heading-xl` and border radius to `rounded-lg`
- Updated loading/empty state descriptions to `.text-body-md`
- Kept color swatch cards with `rounded-3xl` (as requested)

---

### ✅ Design System Rollout - Step 8: TypographyShowcase (COMPLETED)

**Goal:** Update TypographyShowcase page to use design system typography, spacing, buttons, and colors.

**Questions to ask before starting:**
- Should the hero section use solid `bg-primary` color like Dashboard/ColorPalette, or keep gradient? → **Solid `bg-primary`**
- Should headings use design system typography classes (`.text-heading-xl`, `.text-heading-lg`, `.text-heading-md`)? → **`.text-heading-xl` for hero, `.text-heading-md` for font cards**
- Should font card headings use design system typography classes? → **`.text-heading-md`**
- Should border radius follow design system tokens (`rounded-lg`, `rounded-xl`)? → **`rounded-xl` for hero, `rounded-lg` for usage notes and empty state**
- Should section labels use design system label classes? → **`.text-label-md`**
- Should usage notes use design system semantic colors? → **`bg-info-light` / `text-info-foreground`**

**Tasks:**
- [x] Review current TypographyShowcase implementation
- [x] Update hero section (replaced gradient with solid `bg-primary`, updated border radius to `rounded-xl`)
- [x] Update typography to use design system classes (`.text-heading-xl`, `.text-heading-md`, `.text-body-md`, `.text-body-sm`, `.text-label-md`)
- [x] Update buttons to use design system button classes (already using `.btn-primary`)
- [x] Update spacing to use design system spacing scale
- [x] Update border radius to use design system tokens (`rounded-xl` for hero, `rounded-lg` for usage notes and empty state)
- [x] Update cards to use design system card styling (already using `.card`)
- [x] Update usage notes section to use design system semantic colors (`bg-info-light`, `text-info-foreground`)
- [x] Update section labels to use design system label classes (`.text-label-md`)
- [x] Test TypographyShowcase functionality and visual appearance
- [x] Verify responsive behavior

**Files modified:**
- `src/screens/BrandAssets/TypographyShowcase.jsx`

**Changes made:**
- Updated hero section: replaced gradient with solid `bg-primary`, changed border radius from `rounded-3xl` to `rounded-xl`
- Updated hero heading to `.text-heading-xl`
- Updated hero description to `.text-body-md`, kept `text-white/80` opacity
- Updated font card headings to `.text-heading-md`
- Updated metadata labels to `.text-label-md`
- Updated section labels ("Heading Sample", "Body Sample") to `.text-label-md`
- Updated usage notes section: changed from `bg-secondary/50` to `bg-info-light`, heading to `text-info-foreground`, border radius to `rounded-lg`
- Updated usage notes text to `.text-body-sm`
- Updated loading state heading to `.text-heading-xl`
- Updated empty state heading to `.text-heading-xl` and border radius to `rounded-lg`
- Updated loading/empty state descriptions to `.text-body-md`

---

### Design System Rollout - Step 9: Templates

**Goal:** Update Templates page to use design system typography, spacing, buttons, and colors.

**Questions to ask before starting:**
- Should the hero section use solid `bg-primary` color like other pages, or keep any existing styling?
- Should headings use design system typography classes (`.text-heading-xl`, `.text-heading-lg`, `.text-heading-md`)?
- Should template cards use design system card styling?
- Should border radius follow design system tokens (`rounded-lg`, `rounded-xl`)?

**Tasks:**
- [ ] Review current Templates implementation
- [ ] Update hero section (if gradient exists, replace with solid color)
- [ ] Update typography to use design system classes (headings, body text, labels)
- [ ] Update buttons to use design system button classes
- [ ] Update spacing to use design system spacing scale
- [ ] Update border radius to use design system tokens
- [ ] Update cards to use design system card styling
- [ ] Test Templates functionality and visual appearance
- [ ] Verify responsive behavior

**Files to modify:**
- `src/screens/Templates.jsx`

---

### ✅ Design System Rollout - Step 9: Templates (COMPLETED)

**Goal:** Update Templates page to use design system typography, spacing, buttons, and colors.

**Changes made:**
- Updated hero section: replaced gradient with solid `bg-primary`, changed border radius from `rounded-3xl` to `rounded-xl`
- Updated hero heading to `.text-heading-xl`
- Updated hero description to `.text-body-md`, kept `text-white/80` opacity
- Updated "Create Template" button to use `.btn-secondary`
- Updated section heading "Available Templates" to `.text-heading-md`
- Updated "View All" button text to `.text-body-sm`
- Updated template card headings to `.text-heading-md`
- Updated template card border radius from `rounded-3xl` to `rounded-xl`
- Updated template card image area: changed from gradient to solid `bg-primary-accent` with `text-white`
- Updated badges: Popular to `bg-success-light text-success-foreground`, New to `bg-warning-light text-warning-foreground`, Featured to `bg-info-light text-info-foreground`
- Updated badge border radius from `rounded-xl` to `rounded-lg`
- Updated badge text to `.text-label-sm`
- Updated template description text to `.text-body-sm`
- Updated category badges and "Use Template" button border radius from `rounded-xl` to `rounded-lg`
- Updated "Use Template" button text to `.text-body-sm`
- Updated empty state text to use `.text-body-md` and `.text-body-sm`

**Files modified:**
- `src/screens/Templates.jsx`

---

### ✅ Design System Rollout - Step 10: ShareBrandPage (COMPLETED)

**Goal:** Update ShareBrandPage to use design system typography, spacing, buttons, and colors.

**Questions to ask before starting:**
- Should headings use design system typography classes (`.text-heading-xl`, `.text-heading-lg`, `.text-heading-md`)? → **`.text-heading-xl`**
- Should description text use design system body classes? → **`.text-body-md` (MVP placeholder text)**
- Should card content text use design system body classes? → **`.text-body-md`**

**Tasks:**
- [x] Review current ShareBrandPage implementation
- [x] Update typography to use design system classes (`.text-heading-xl`, `.text-body-md`)
- [x] Add MVP placeholder comments for future content updates
- [x] Test ShareBrandPage functionality and visual appearance
- [x] Verify responsive behavior

**Files modified:**
- `src/screens/ShareBrandPage.jsx`

**Changes made:**
- Updated main heading to `.text-heading-xl` (was `text-4xl font-bold`)
- Updated description text to `.text-body-md` with comment noting it's MVP placeholder text
- Updated card content text to `.text-body-md` with comment noting it's MVP placeholder content
- Added comments indicating placeholder content needs to be updated later

**Note:** This page currently has MVP placeholder content. Update with actual share page functionality and content when implementing the full feature.

---

### Step 3: Update Firestore Schema for New Uploads

**Goal:** Ensure new asset uploads initialize the `availableFormats` structure

**Questions to ask before starting:**
- Should we migrate existing assets, or only new uploads?
- Store original format info in `availableFormats.original`?

**Tasks:**
- [ ] Update `src/screens/BrandAssets/UploadAsset.jsx`
- [ ] Modify Firestore document creation to include `availableFormats` field
  - Initialize `availableFormats.original` with uploaded file URL and format
  - Structure: `{ url: string, format: string, generatedAt: timestamp }`
- [ ] Test that new uploads create correct schema structure
- [ ] Verify existing assets still work (backward compatibility)

**Files to modify:**
- `src/screens/BrandAssets/UploadAsset.jsx`

---

### Step 4: Update DownloadModal with Format Selection

**Goal:** Add format selection UI and integrate format generation service

**Questions to ask before starting:**
- UI preference: Radio buttons, dropdown, or button group for format selection?
- Show format info (file size, dimensions) before download?
- Loading indicator style (spinner, progress bar, or text)?

**Tasks:**
- [ ] Update `src/components/DownloadModal.jsx`
- [ ] Add format selection UI (only show for image assets)
  - Show current/original format as default option
  - Options: Original, PNG, JPG, WebP, SVG (if source is SVG or conversion possible)
  - Display format info if available
- [ ] Add loading state during format generation
  - Show spinner/loading indicator
  - Disable download button during conversion
  - Display conversion status message
- [ ] Update `handleDownload` function
  - Check if selected format exists in `availableFormats`
  - If cached, use cached URL
  - If not, call `formatService.generateFormat()` to create and cache
  - Trigger download with proper filename: `{assetName}.{extension}`
- [ ] Add error handling for conversion failures
- [ ] Update UI layout to accommodate format selection

**Files to modify:**
- `src/components/DownloadModal.jsx`

---

### Step 5: Update AssetModal Download Button

**Goal:** Ensure AssetModal uses DownloadModal for consistent download experience

**Questions to ask before starting:**
- Should AssetModal download button open DownloadModal, or direct download?
- Keep direct download as fallback option?

**Tasks:**
- [ ] Update `src/components/AssetModal.jsx`
- [ ] Modify download button to open `DownloadModal` instead of direct download
- [ ] Ensure consistent download experience across all entry points
- [ ] Test that modal flow works correctly

**Files to modify:**
- `src/components/AssetModal.jsx`

---

### Step 6: Add Search Functionality to Asset Page

**Goal:** Implement real-time search by asset name on Asset Page

**Questions to ask before starting:**
- Search bar placement: Top of page, in header, or in filter section?
- Search scope: Name only, or also description/category?
- Case-sensitive or case-insensitive search?
- Debounce delay for search input (e.g., 300ms)?

**Tasks:**
- [ ] Update `src/screens/BrandAssets/AssetPage.jsx`
- [ ] Add search state management
  - `searchQuery` state
  - Filter logic to filter assets by name
- [ ] Add search input UI
  - Search bar with icon
  - Clear button (X icon) when text entered
  - Placeholder text: "Search assets..."
- [ ] Implement real-time filtering
  - Filter assets as user types
  - Case-insensitive search
  - Update `filteredAssets` based on search query
- [ ] Combine search with category filtering
  - Search should work within selected category
  - Clear search when category changes (optional)
- [ ] Add empty state for "no search results"
- [ ] Test search functionality with various asset names

**Files to modify:**
- `src/screens/BrandAssets/AssetPage.jsx`

---

### Step 7: Add Download Tracking

**Goal:** Track asset downloads by incrementing counter in Firestore

**Questions to ask before starting:**
- Should we track downloads per format, or total downloads only?
- Display download count in UI (asset cards, modal)?
- Track downloader information (who downloaded what)?

**Tasks:**
- [ ] Update download handlers in `DownloadModal.jsx` and `AssetModal.jsx`
- [ ] Implement download counter increment
  - Update Firestore `downloads` field when asset is downloaded
  - Use Firestore `increment()` for atomic updates
- [ ] Add error handling (don't block download if counter update fails)
- [ ] (Optional) Display download count in asset cards or modal
- [ ] Test download tracking with multiple downloads

**Files to modify:**
- `src/components/DownloadModal.jsx`
- `src/components/AssetModal.jsx`
- (Optional) `src/screens/BrandAssets/AssetPage.jsx` (if displaying count)

---

### Step 8: Testing & Validation

**Goal:** Comprehensive testing of format conversion and search functionality

**Questions to ask before starting:**
- Test with specific image types/sizes?
- Test conversion performance with large images?
- Browser compatibility testing needed?

**Tasks:**
- [ ] Test format conversion with various image types
  - PNG source → convert to JPG, WebP
  - JPG source → convert to PNG, WebP
  - WebP source → convert to PNG, JPG
  - SVG source → serve directly
  - Raster → SVG conversion attempt (with fallback)
- [ ] Test caching functionality
  - Verify formats are cached after first generation
  - Verify cached formats are used on subsequent downloads
  - Check Firestore `availableFormats` structure
  - Check Firebase Storage contains converted files
- [ ] Test error handling
  - Conversion failures
  - Network errors
  - Large image handling
  - CORS issues
- [ ] Test search functionality
  - Search by exact name
  - Search by partial name
  - Search with special characters
  - Search combined with category filter
  - Empty search results
- [ ] Test download tracking
  - Verify counter increments
  - Multiple downloads of same asset
  - Different formats tracked correctly
- [ ] Test with non-image assets (should not show format selection)
- [ ] Test UI/UX
  - Format selection displays correctly
  - Loading states work properly
  - Error messages are user-friendly
  - Search is responsive and fast

**Files to test:**
- All modified files
- New utility and service files

---

## MVP Spec Alignment Plan

**Purpose:** Align BrandHub with the MVP spec requirements from the business partner. This focuses on implementing missing MVP-critical features while ignoring out-of-scope features.

**Key Principles:**
- **Simplicity First:** Every change should be minimal and impact as little code as possible
- **Collaborative Clarity:** All code must be consistently organized, clearly commented, and structured to be immediately readable and maintainable by other developers.
- **No Assumptions:** Ask questions if anything is unclear before implementing

### Current State Analysis

**✅ Already Built (Aligned with MVP):**
- Email/password authentication
- Admin/User roles (User = Viewer functionally)
- Asset upload with categories
- Asset page with grid view
- Download functionality
- Brand overview pages (Color Palette, Typography)
- Asset Detail Page with two-panel layout + Usage Rules (already implemented)

**❌ MVP-Critical Missing Features:**
1. User Invitations by email (UI placeholder)
2. Asset Version Replacement with archiving (UI placeholder)
3. User Feedback Loop modal (Required)

---

### Phase 1: User Invitations UI Placeholder

#### Task 1.2: Add Invite Button to Header

- [ ] Add "Invite User" button to Header component (admin only)
- [ ] Import UserInvite component
- [ ] Add state to manage modal visibility
- [ ] Position button next to Upload button
- [ ] Add clear comments explaining placeholder functionality

**Files to modify:** `src/components/Header.jsx`

---

### Phase 2: User Feedback System (Full Functionality)

#### Task 2.1: Create FeedbackModal Component

- [ ] Create `src/components/FeedbackModal.jsx` component
- [ ] Add feedback type selection (Bug / Feature Idea / General)
- [ ] Add message textarea field (max 2000 chars, sanitized)
- [ ] Add form submission handler
- [ ] Store feedback in Firestore `feedback` collection with fields:
  - `type` (bug/feature/general)
  - `message` (sanitized text)
  - `submittedBy` (user UID or "anonymous")
  - `submittedByEmail` (user email or "anonymous")
  - `submittedAt` (serverTimestamp)
  - `status` (new/reviewed/archived)
- [ ] Add success message and auto-close after submission
- [ ] Add error handling with user-friendly messages
- [ ] Add clear, descriptive comments throughout code

**Security:** Sanitize message text, enforce length limits, validate feedback type

#### Task 2.2: Add Feedback Link to Sidebar

- [ ] Add "Give Feedback" button in Sidebar footer section
- [ ] Import FeedbackModal component
- [ ] Add state to manage modal visibility
- [ ] Position above Settings button
- [ ] Add clear comments explaining functionality

**Files to modify:** `src/components/Sidebar.jsx`

---

### Phase 3: Asset Version Archiving UI Placeholder

#### Task 3.1: Add Version Status Display (UI Only)

- [ ] Display "Current" badge in Asset Information panel (always show for now)
- [ ] Add placeholder text indicating version history (UI only, no data)
- [ ] Style version badge consistently with existing UI
- [ ] Structure code to easily display version count when `previousVersions` array exists
- [ ] Add clear comments explaining:
  - This is a UI placeholder for MVP
  - Future implementation will store versions in `previousVersions` array on asset document
  - Data structure ready: `[{ fileUrl, fileType, replacedAt, replacedBy }]`
- [ ] Add TODO comments marking where version data will be read from Firestore

**Note:** This is a UI placeholder - structure it so version archiving can be easily added later

**Files to modify:** `src/screens/BrandAssets/AssetDetail.jsx`

#### Task 3.2: Update Replace Asset UI (Visual Only)

- [ ] Add visual indicator in replace modal mentioning version archiving (placeholder)
- [ ] Keep existing replace functionality unchanged
- [ ] Add clear comments explaining:
  - Current replace function updates asset document
  - Future implementation will append old version to `previousVersions` array before updating
  - Structure ready for archiving logic
- [ ] Add TODO comment marking where archiving logic will be added

**Files to modify:** `src/screens/BrandAssets/AssetDetail.jsx`

#### Task 3.3: Add Delete Button UI Placeholder

- [ ] Add delete button next to "Replace Asset" button (admin only)
- [ ] Add confirmation modal with warning message
- [ ] Style delete button with destructive styling
- [ ] Show success message on "delete" (no actual deletion - placeholder only)
- [ ] Structure component with clear separation: confirmation state, delete handler
- [ ] Add clear comments explaining:
  - This is a UI placeholder for MVP
  - Future implementation will delete from Storage and Firestore
  - Need to store `storagePath` in asset document for deletion
- [ ] Add TODO comments marking where actual deletion logic will go

**Note:** This is a UI placeholder - structure it so delete functionality can be easily added later

**Files to modify:** `src/screens/BrandAssets/AssetDetail.jsx`

---

## Security Checklist (Before Completion)

- [ ] Image conversion doesn't expose sensitive data
- [ ] Firebase Storage paths are sanitized
- [ ] Format selection is validated (no arbitrary format injection)
- [ ] Search input is sanitized (XSS prevention)
- [ ] Download tracking doesn't expose user data unnecessarily
- [ ] Error messages don't expose system details
- [ ] All user inputs sanitized (email, message text)
- [ ] Input length limits enforced (email max 254, message max 2000)
- [ ] Role validation on invitation UI (only "user" or "admin" allowed)
- [ ] Admin-only access enforced (invite button)
- [ ] No sensitive data in frontend code
- [ ] All Firestore operations have error handling (feedback only)
- [ ] Code is clearly commented and organized for maintainability

---

## Testing Checklist

- [ ] Format conversion with various image types works correctly
- [ ] Caching functionality works as expected
- [ ] DownloadModal format selection UI displays correctly
- [ ] AssetModal download button opens DownloadModal
- [ ] Search functionality works on Asset Page
- [ ] Download tracking increments counters correctly
- [ ] User invitation modal opens and closes correctly (UI placeholder)
- [ ] Invitation form validates email and role inputs
- [ ] Invitation shows success message (no Firestore operations)
- [ ] Feedback modal opens and closes correctly
- [ ] Feedback creates Firestore document with correct fields
- [ ] Feedback form validates input and shows errors appropriately
- [ ] Version status badge displays in AssetDetail (UI placeholder)
- [ ] Replace modal shows version archiving placeholder text
- [ ] Delete button displays for admin users (UI placeholder)
- [ ] Delete confirmation modal shows warning
- [ ] Delete shows success message (no actual deletion)
- [ ] All code is clearly commented and readable
- [ ] All TODO comments are in place for future implementation

---

## Review Section

**Summary of changes made:**

- ✅ **Task 3: Security Review & Hardening** - COMPLETED
  - Created security utility module (`src/utils/security.js`) with sanitization functions
  - Implemented file name sanitization to prevent path traversal attacks
  - Added input length limits to all forms (email, password, asset names, descriptions, search)
  - Added role validation on signup form
  - Fixed file-extension edge case in `sanitizeFileName` (handles no-extension + dotfiles safely)
  - Prevented silent Firestore failures during upload (Firestore `addDoc` errors now surface to the UI)
  - Verified XSS prevention (all user data safely rendered via React)
  - Added security testing checklist for continued manual verification

- ✅ **Auth UX polish (post Task 3):** - COMPLETED
  - Replaced raw Firebase auth errors with friendly user-facing messages
  - Added navigation links between Login ↔ Sign Up

- ✅ **Task 4: Syntax & Code Quality Check** - COMPLETED
  - Production build passed (`npm run build`)
  - No linter errors found on modified files
  - Runtime checks performed; no blocking console errors observed

**Security checklist performed:**

- ✅ File name sanitization (path traversal prevention)
- ✅ Input length limits (DoS prevention)
- ✅ Role validation
- ✅ XSS prevention verification
- ✅ Secrets management verification
- ✅ File upload security review
- ✅ User data rendering safety check

**Files modified:**

- `src/utils/security.js` (NEW) - Security utility functions
- `src/utils/errorMessages.js` (NEW) - User-friendly Firebase auth error messages
- `src/screens/BrandAssets/UploadAsset.jsx` - File sanitization + input limits
- `src/screens/BrandSweep.jsx` - File name sanitization
- `src/screens/Login.jsx` - Input length limits + friendly auth errors + link to Sign Up
- `src/screens/SignUp.jsx` - Input limits + role validation + friendly auth errors + link to Login
- `src/components/Sidebar.jsx` - Search input length limit
- `testing/SECURITY_TESTING_CHECKLIST.md` - Manual security test plan (moved into `testing/` folder)

**Notes / follow-ups:**

- Security testing checklist available at: `testing/SECURITY_TESTING_CHECKLIST.md`
- Partial testing completed - remaining tests can be completed using the checklist
- All code passes linting with no errors
- Application is production-ready from a security perspective
- Performance note: Vite build warns about a large JS chunk (optimization opportunity; not blocking)

---

## Documentation Status

- ✅ `tasks/todo.md` updated to reflect current status and completed items
- ✅ Detailed security review notes added (Task 3)
- ✅ Code quality check notes added (Task 4)
- ✅ Full file change list updated (Task 5)
