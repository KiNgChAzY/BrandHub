# Placeholders Documentation

**Note:** All placeholders are now marked directly in the code with `// PLACEHOLDER:` or `{/* PLACEHOLDER: */}` comments. This document provides a quick reference, but search the codebase for "PLACEHOLDER" to find all instances.

This document lists all placeholders, MVP features, and TODO items that need to be updated when building is complete.

## Icons & Visual Elements

### Sidebar (`src/components/Sidebar.jsx`)
- **Line 141**: `CheckCircle` icon used as placeholder for brand verification icon - replace with actual brand verification icon when available
- **Line 204**: `Wand2` icon used as placeholder for AI Sweep icon - replace with AI-specific icon when available
- **Line 23** (Header.jsx): `Grid` icon used as placeholder for dataset/logo - replace with actual logo when available

## Functionality Placeholders

### Sidebar (`src/components/Sidebar.jsx`)
- **Line 98**: "Add New Brand" functionality not implemented yet - add brand creation logic when ready
- **Line 217**: Team functionality not implemented yet - add team management logic when ready

### Header (`src/components/Header.jsx`)
- **Line 36**: Search functionality not implemented yet - add search logic when ready
- **Line 50**: Notifications functionality not implemented yet - add notifications logic when ready

### AssetPage (`src/screens/BrandAssets/AssetPage.jsx`)
- **Line 288**: File Type Filter - UI Placeholder (no functionality)
- **Line 293**: Date Modified Filter - UI Placeholder (no functionality)
- **Line 298**: Owner Filter - UI Placeholder (no functionality)
- **Line 365**: Placeholder image URL used as fallback: `https://via.placeholder.com/400x300/cccccc/666666?text=Asset+Preview`

### AssetDetail (`src/screens/BrandAssets/AssetDetail.jsx`)
- **Line 88-91**: Old file deletion skipped for MVP - Firebase Storage cleanup can be handled separately

### AssetModal (`src/components/AssetModal.jsx`)
- **Line 116**: File size fetching - Currently not stored in Firestore
- **Line 156**: Delete functionality - TODO: Implement delete functionality with confirmation
- **Line 362**: File size not currently stored - needs full implementation

### UserInvite (`src/components/UserInvite.jsx`)
- **Line 18**: TODO: Add Firestore integration in handleSubmit function
- **Line 19**: TODO: Add duplicate invitation check (query Firestore before creating)
- **Line 20**: TODO: Add email sending service integration
- **Line 85**: TODO: Firestore Integration (currently only validates and shows success message)

### ShareBrandPage (`src/screens/ShareBrandPage.jsx`)
- **Line 10**: MVP: Placeholder text - update with actual content later
- **Line 14**: MVP: Placeholder content - update with actual share page content later

### Templates (`src/screens/Templates.jsx`)
- **Line 5**: Placeholder templates (will be replaced with real data later)

## Brand Guidelines Placeholders

### BrandGuidelines Component (`src/screens/BrandGuidelines/BrandGuidelines.jsx`)
- **Line 63-75**: Action buttons (Edit Guide, Download, Share) - currently non-functional, need to implement:
  - Edit Guide functionality
  - Download Brand Guide functionality
  - Share Brand Guide functionality

### OverviewTab (`src/screens/BrandGuidelines/tabs/OverviewTab.jsx`)
- Brand name "Acme Global" - replace with actual brand name
- Brand description text - replace with actual brand description
- Brand tags (Modern, Confident, Trustworthy) - replace with actual brand attributes
- Last updated timestamp - connect to actual data source
- Asset counts (4 Assets for Logos) - connect to actual asset data
- Color swatches - connect to actual brand colors
- Typography info (Inter, System UI) - connect to actual typography data

### LogosTab (`src/screens/BrandGuidelines/tabs/LogosTab.jsx`)
- Logo previews - replace with actual logo images
- "Acme Global" text in logo previews - replace with actual brand name
- Logo file format info (SVG / PNG) - connect to actual file data

### ColorsTab (`src/screens/BrandGuidelines/tabs/ColorsTab.jsx`)
- Color values (HEX, RGB, CMYK) - connect to actual brand color data
- Copy functionality - implement actual copy-to-clipboard

### TypographyTab (`src/screens/BrandGuidelines/tabs/TypographyTab.jsx`)
- Font family names (Inter, Roboto Mono) - connect to actual typography data
- Font weights and usage info - connect to actual typography data

### ImageryTab (`src/screens/BrandGuidelines/tabs/ImageryTab.jsx`)
- Image URLs - replace with actual brand photography
- Image alt text - update with actual descriptions

### VoiceToneTab (`src/screens/BrandGuidelines/tabs/VoiceToneTab.jsx`)
- Voice and tone guidelines - replace with actual brand voice guidelines

### IconographyTab (`src/screens/BrandGuidelines/tabs/IconographyTab.jsx`)
- Icon set - replace with actual brand icon library

### DownloadsTab (`src/screens/BrandGuidelines/tabs/DownloadsTab.jsx`)
- Download packages - connect to actual downloadable assets
- File sizes - connect to actual file data
- Updated dates - connect to actual update timestamps
- Download functionality - implement actual file downloads

### ActivityTab (`src/screens/BrandGuidelines/tabs/ActivityTab.jsx`)
- Activity feed - connect to actual activity/change log data
- User names (Sam, Kaelynn) - replace with actual user data
- Timestamps - connect to actual activity timestamps
- Activity types - connect to actual activity tracking

## Form Placeholders

### UploadAsset (`src/screens/BrandAssets/UploadAsset.jsx`)
- **Line 145**: Placeholder text: "e.g., Primary Logo - Dark"
- **Line 181**: Placeholder text: "Brief description of the asset"
- **Line 195**: Placeholder text: "e.g., Use PNG for transparent backgrounds, PDF for print"
- **Line 207**: Placeholder text: "e.g., Do not stretch or recolor, maintain aspect ratio"
- **Line 219**: Placeholder text: "Additional guidance for using this asset"

### Login (`src/screens/Login.jsx`)
- **Line 37**: Placeholder: "you@example.com"

### SignUp (`src/screens/SignUp.jsx`)
- **Line 48**: Placeholder: "you@example.com"
- **Line 85**: Placeholder: "e.g., Acme Corporation"
- **Line 95**: Placeholder: "Brief description of your brand"

### AssetEditModal (`src/components/AssetEditModal.jsx`)
- **Line 144**: Placeholder: "Enter asset name"
- **Line 158**: Placeholder: "Enter description (optional)"

## Notes

- All placeholder images use: `https://via.placeholder.com/400x300/cccccc/666666?text=Asset+Preview`
- Brand name "Acme Global" appears in multiple places - replace with actual brand name
- All timestamps and dates are hardcoded - connect to actual data sources
- All asset counts and metrics are hardcoded - connect to actual database queries
