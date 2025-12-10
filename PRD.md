Product Requirements Document (PRD)
BrandHub – Centralized Brand Identity & Asset Management Platform
Project Name: BrandHub
Team: [Your Team Name Here]
Due Date: December 15, 2025
Repository: https://github.com/your-org/brandhub

---

Executive Summary
BrandHub is a centralized, intelligent platform for managing all brand and identity assets within an organization. It replaces fragmented, inconsistent storage systems with a single source of truth for logos, typography, color palettes, icons, templates, and marketing materials. With built-in AI-powered brand monitoring, BrandHub ensures brand consistency across digital touchpoints by detecting outdated or off-brand usage across the web. Designed for companies of all sizes, BrandHub saves time, reduces brand dilution, and empowers teams with instant access to approved brand resources.

---

Project Overview
Problem Statement
Organizations today struggle with decentralized brand asset management, leading to:
● Asset fragmentation – Logos, fonts, and templates scattered across Google Drive, Dropbox, local folders, and email attachments.
● Version chaos – Employees use outdated logos or incorrect color values because there is no single authoritative source.
● Wasted productivity – Designers, marketers, and sales teams spend hours searching for correct brand files.
● Brand inconsistency – Old branding persists online after rebrands, damaging brand perception and trust.
● No automated brand policing – Manual monitoring of brand usage across websites and social media is time-consuming and incomplete.
Solution
BrandHub provides:

1. A unified digital brand library – All assets stored, categorized, and downloadable in required formats.
2. Role-based access control – Admins, users, and guests have tailored permissions.
3. AI-powered Brand Sweeper – Scans the internet for outdated brand usage and alerts teams.
4. Template management – Store, preview, and share editable brand templates.
5. Real-time dashboard – Overview of brand health, asset usage, and sweep status.

---

Technology Stack
Core Technologies (Required for PoC)

1. React 19.1.1 – Component-based UI framework.
2. React Router DOM 7.9.6 – Client-side routing.
3. Firebase 12.6.0 – Backend-as-a-Service:
   ○ Firebase Authentication (user roles, login/logout)
   ○ Cloud Firestore (asset metadata, user data, sweep results)
   ○ Firebase Storage (file storage for assets, templates, logos)
4. Vite 7.1.7 – Build tool and dev server.
5. Tailwind CSS 3.4.17 – Utility-first CSS for rapid UI development.
6. Node.js 18+ – Runtime environment.
7. Simulated AI Service (MVP) – Mock API for Brand Sweep simulation.
8. Future AI Integration – Vision models (Google Vision API, AWS Rekognition, or custom model) for real logo detection.

---

Appendix: Data Schema, Mock API Contract, Env Example, and Sample Rules

1. Data Schema (Firestore)

Collections and example documents:

- `users/{userId}`
  - Fields:
    - `email` (string, required)
    - `role` (string, enum: "admin" | "user" | "guest", required)
    - `displayName` (string, optional)
    - `lastLogin` (timestamp, optional)
  - Example:
    ```json
    {
      "email": "alice@example.com",
      "role": "admin",
      "displayName": "Alice",
      "lastLogin": "2025-12-10T12:00:00Z"
    }
    ```

... (trimmed for brevity in this patch) ...

Success Criteria:
● Colors display as swatches with values.
● Typography page shows font previews and downloadable files.
● Responsive grid layout.

---

Procedure Code: PC-004 – Dashboard Implementation
Description: Overview of brand health, asset stats, and quick actions.
Components Affected: Dashboard.jsx, firebase.js.
Procedure Steps:

1. Create dashboard with metric cards:
   ○ Total assets (from Firestore count)
   ○ Recent activity (last 5 uploads/downloads)
   ○ Brand health score (mock, future AI)
   ○ Sweep status (last run result)
2. Quick action buttons:
   ○ Upload asset (links to upload form)
   ○ Run sweep (links to sweep page)
3. Recent downloads table.
4. Real-time updates via onSnapshot.
   Success Criteria:
   ● Dashboard loads with live data.
   ● Quick actions navigate correctly.
   ● Layout is responsive.

---

Procedure Code: PC-005 – Brand Sweep Simulation
Description: Simulate AI-powered brand monitoring.
Components Affected: BrandSweep.jsx, mockSweepAPI.js.
Procedure Steps:

1. Create sweep page with:
   ○ Upload old logo
   ○ Upload new/current logo
   ○ “Run Sweep” button
2. On click, simulate API call with 3-second delay.
3. Return mock data:
4. javascript
   {
   detectedSites: [
   { url: "https://example.com", asset: "old_logo.png", action: "Replace" }
   ],
   status: "completed",
   timestamp: "2025-12-08T10:30:00Z"
5. }
6. Display results in a table with URL, detected asset, recommended action.
   Future AI Integration Spec:
   ● Use Google Vision API or AWS Rekognition to compare logos.
   ● Crawl predefined website list or use SEO APIs to find logo usage.
   ● Store results in Firestore with confidence scores.
   Success Criteria:
   ● User can upload logos and run sweep.
   ● Mock results display in a clear table.
   ● Progress indicator shows during simulation.

---

Procedure Code: PC-006 – Template Management
Description: Upload, categorize, and preview brand templates.
Components Affected: Templates.jsx, firebase.js.
Procedure Steps:

1. Create template upload form (admin only).
2. Store template in /templates Storage folder.
3. Display template thumbnails (PDF preview or placeholder).
4. Metadata: name, category, format, last updated.
5. Download button for each template.
   Success Criteria:
   ● Admin can upload templates.
   ● Templates display with thumbnails and metadata.
   ● Users can download templates.

---

Procedure Code: PC-007 – Guest Shared Brand Page
Description: Public page for sharing brand one-sheet.
Components Affected: ShareBrandPage.jsx.
Procedure Steps:

1. Create a shareable route /share/:id.
2. Display read-only brand overview:
   ○ Primary logo
   ○ Color palette
   ○ Typography samples
   ○ Brand guidelines summary
3. No login required.
4. Download buttons for key assets.
   Success Criteria:
   ● Page is publicly accessible.
   ● Displays key brand assets.
   ● Download links work.

---

Procedure Code: PC-008 – Responsive UI & Styling
Description: Professional, responsive design with Tailwind.
Components Affected: All .jsx files.
Procedure Steps:

1. Apply dark theme (bg-gray-900, text-gray-100).
2. Use Tailwind responsive classes (sm:, md:, lg:).
3. Ensure touch-friendly buttons (min-h-11).
4. Test on mobile (320px), tablet (768px), desktop (1024px+).
5. Ensure no horizontal scrolling.
   Success Criteria:
   ● Fully responsive on all screen sizes.
   ● Consistent dark theme.
   ● Accessible contrast ratios.

---

Procedure Code: PC-009 – Deployment to Production
Description: Deploy to Firebase Hosting.
Procedure Steps:

1. Run npm run build.
2. Install Firebase CLI: npm install -g firebase-tools.
3. Login: firebase login.
4. Initialize: firebase init hosting.
5. Deploy: firebase deploy --only hosting.
6. Verify all features work on live URL.
   Success Criteria:
   ● App deployed and publicly accessible.
   ● All Firebase operations work in production.

---

Procedure Code: PC-010 – Git Release v0.1 & Demo Video
Description: Tag release and create demo video.
Procedure Steps:

1. Commit all code, tag: git tag v0.1.
2. Push tags: git push --tags.
3. Create GitHub Release with:
   ○ Title: “BrandHub Proof of Concept v0.1”
   ○ Deployed URL
   ○ Features list
   ○ Test account info
   ○ Demo video link
4. Record 5-minute demo video:
   ○ Intro & problem (1 min)
   ○ Tech stack (1 min)
   ○ Live demo: signup, upload asset, browse library, run sweep, dashboard (3 min)
   ○ Roadmap (1 min)
   Success Criteria:
   ● v0.1 tag created.
   ● Release page includes all required info.
   ● Video is clear, under 5 minutes, covers core features.

---

Phase Breakdown: Tasks & Subtasks
Phase 1: Planning & Setup (Due Dec 8)
Task 1.1: Firebase Project Configuration ❌ CRITICAL
● Create Firebase project
● Enable Auth, Firestore, Storage
● Set up .env.local with Firebase config
● Status: Not Started
● Dependencies: None
● Estimated Time: 30 min
Task 1.2: Project Structure
● Create src/{components, screens, contexts, config}
● npm install all dependencies
● Status: Not Started
● Dependencies: None
● Estimated Time: 15 min
Task 1.3: Local Dev Setup
● npm run dev, verify hot reload
● Check Tailwind is working
● Status: Not Started
● Dependencies: Task 1.2
● Estimated Time: 20 min

---

Phase 2: Authentication & Roles (Due Dec 8)
Task 2.1: SignUp Screen with Role Selection
● Form with email, password, role dropdown (admin/user)
● Firebase createUserWithEmailAndPassword()
● Store role in Firestore users
● Status: Not Started
● Dependencies: Task 1.1
● Estimated Time: 1.5 hr
Task 2.2: Login Screen
● Email/password form
● Fetch user role on login
● Status: Not Started
● Dependencies: Task 2.1
● Estimated Time: 1 hr
Task 2.3: Auth Context & Global State
● Create AuthContext
● Provide user and role to app
● Status: Not Started
● Dependencies: Task 2.1
● Estimated Time: 1 hr
Task 2.4: Protected Routes
● Create ProtectedRoute component
● Redirect guests/non-admins
● Status: Not Started
● Dependencies: Task 2.3
● Estimated Time: 45 min

---

Phase 3: Brand Asset Management (Due Dec 9)
Task 3.1: Upload Asset Form (Admin)
● Form with category, file input, metadata fields
● Upload to Storage, save to Firestore
● Status: Not Started
● Dependencies: Task 2.3
● Estimated Time: 2 hr
Task 3.2: Asset Library Page
● Display assets by category
● Download functionality
● Admin delete button
● Status: Not Started
● Dependencies: Task 3.1
● Estimated Time: 2 hr
Task 3.3: Color & Typography Pages
● Color swatch component
● Font preview component
● Status: Not Started
● Dependencies: Task 3.2
● Estimated Time: 1.5 hr

---

Phase 4: Dashboard (Due Dec 9)
Task 4.1: Dashboard Layout
● Metric cards (total assets, recent activity, sweep status)
● Quick action buttons
● Status: Not Started
● Dependencies: Task 3.1
● Estimated Time: 1.5 hr
Task 4.2: Real-Time Data
● Firestore onSnapshot for metrics
● Status: Not Started
● Dependencies: Task 4.1
● Estimated Time: 1 hr

---

Phase 5: Brand Sweep Simulation (Due Dec 10)
Task 5.1: Sweep UI
● Logo upload (old/new)
● Run button with progress indicator
● Status: Not Started
● Dependencies: Task 3.1
● Estimated Time: 1.5 hr
Task 5.2: Mock API & Results Table
● Simulate API delay
● Display mock detection results
● Status: Not Started
● Dependencies: Task 5.1
● Estimated Time: 1.5 hr

---

Phase 6: Templates & Guest Page (Due Dec 10)
Task 6.1: Template Management
● Upload template form
● Thumbnail preview
● Status: Not Started
● Dependencies: Task 3.1
● Estimated Time: 1.5 hr
Task 6.2: Guest Shared Page
● Public route /share/:id
● Read-only brand one-sheet
● Status: Not Started
● Dependencies: Task 3.3
● Estimated Time: 1 hr

---

Phase 7: UI/UX Polish (Due Dec 11)
Task 7.1: Responsive Design
● Test on mobile/tablet/desktop
● Fix layout issues
● Status: Not Started
● Dependencies: All UI tasks
● Estimated Time: 1.5 hr
Task 7.2: Dark Theme & Consistency
● Apply consistent colors, spacing
● Add loading spinners, error states
● Status: Not Started
● Dependencies: Task 7.1
● Estimated Time: 1 hr

---

Phase 8: Testing & Validation (Due Dec 11)
Task 8.1: Functional Testing
● Test auth flows
● Test upload/download
● Test sweep simulation
● Status: Not Started
● Dependencies: All dev tasks
● Estimated Time: 2 hr
Task 8.2: Performance & Build
● npm run build success
● Check console errors
● Status: Not Started
● Dependencies: Task 8.1
● Estimated Time: 1 hr

---

Phase 9: Deployment & Release (Due Dec 12)
Task 9.1: Deploy to Firebase Hosting
● Build, initialize, deploy
● Verify live URL
● Status: Not Started
● Dependencies: Task 8.2
● Estimated Time: 45 min
Task 9.2: Create Git Release v0.1
● Tag, push, create GitHub Release
● Status: Not Started
● Dependencies: Task 9.1
● Estimated Time: 30 min
Task 9.3: Record Demo Video
● Script, record, edit, upload
● Status: Not Started
● Dependencies: Task 9.1
● Estimated Time: 2-3 hr

---

Testing & Validation Checklist
● User can sign up as admin/user
● Admin can upload asset
● Asset appears in library
● User can download asset
● Color/Typography pages display correctly
● Dashboard shows real-time metrics
● Brand sweep returns mock results
● Templates can be uploaded/downloaded
● Guest page is publicly accessible
● Responsive on all screen sizes
● No console errors in production
● Deployed URL works

---

Grading Rubric Alignment
Target: A-Level
● ✅ All required libraries used meaningfully (React, React Router, Firebase Auth/Firestore/Storage, Tailwind)
● ✅ Core 10% functionality implemented (asset management, sweep simulation, dashboard, roles)
● ✅ Application deployed and publicly accessible
● ✅ Clean, structured code with error handling
● ✅ Professional, responsive UI
Demo Video Target: 90+
● Clear speaking, good pacing
● Covers problem, solution, live demo, roadmap
● Shows enthusiasm and domain knowledge

---

Risk Mitigation
● Firebase config errors – Use .env.local, verify with logs.
● Storage permissions – Set security rules for authenticated users only.
● Sweep simulation feels fake – Use realistic mock data and progress indicators.
● Deployment fails – Test build locally, check Firebase logs.
● Scope creep – Stick to 10% MVP; defer advanced AI to future.

---

Success Metrics
● All required technologies integrated
● Core brand asset workflow functional
● App deployed and accessible
● Demo video created and linked
● GitHub release v0.1 tagged

---

Timeline Summary
Total Estimated Hours: 20–22 hours
Critical Path:

1. Firebase setup (Task 1.1)
2. Auth & roles (Tasks 2.1–2.4)
3. Asset upload/library (Tasks 3.1–3.3)
4. Dashboard (Task 4.1)
5. Sweep simulation (Tasks 5.1–5.2)
6. Deployment (Task 9.1)
   Recommended Schedule:
   ● Dec 8: Phases 1–2 (Planning, Auth) – 4 hours
   ● Dec 9: Phases 3–4 (Asset Mgmt, Dashboard) – 6 hours
   ● Dec 10: Phases 5–6 (Sweep, Templates) – 5 hours
   ● Dec 11: Phases 7–8 (UI, Testing) – 4 hours
   ● Dec 12: Phase 9 (Deploy, Release, Video) – 4 hours

---

Appendix: Component Structure
text
src/
├── App.jsx
├── main.jsx
├── contexts/
│ └── AuthContext.jsx
├── components/
│ ├── Navbar.jsx
│ ├── ProtectedRoute.jsx
│ ├── AssetCard.jsx
│ └── MetricCard.jsx
├── screens/
│ ├── Login.jsx
│ ├── SignUp.jsx
│ ├── Dashboard.jsx
│ ├── BrandAssets/
│ │ ├── AssetLibrary.jsx
│ │ ├── ColorPalette.jsx
│ │ └── TypographyShowcase.jsx
│ ├── Templates.jsx
│ ├── BrandSweep.jsx
│ ├── Settings.jsx
│ └── ShareBrandPage.jsx
├── config/
│ └── firebase.js
├── utils/
│ └── mockSweepAPI.js
├── App.css
└── index.css

---

Appendix B: Data Schema, Mock API Contract, Env Example, and Sample Rules

1. Data Schema (Firestore)

Collections and example documents:

- `users/{userId}`

  - Fields:
    - `email` (string, required)
    - `role` (string, enum: "admin" | "user" | "guest", required)
    - `displayName` (string, optional)
    - `lastLogin` (timestamp, optional)
  - Example:
    ```json
    {
      "email": "alice@example.com",
      "role": "admin",
      "displayName": "Alice",
      "lastLogin": "2025-12-10T12:00:00Z"
    }
    ```

- `assets/{assetId}`

  - Fields:
    - `name` (string, required)
    - `category` (string, enum: "logo" | "typography" | "color" | "template" | "icon", required)
    - `fileUrl` (string, required)
    - `fileType` (string, required)
    - `uploadedBy` (string userId, required)
    - `uploadedAt` (timestamp, required)
    - `downloads` (number, default 0)
    - `metadata` (map; optional) — e.g., `{ "hex": "#FFFFFF", "fontFamily": "Inter" }`
  - Example:
    ```json
    {
      "name": "Brand Logo - Primary",
      "category": "logo",
      "fileUrl": "https://firebasestorage.googleapis.com/...",
      "fileType": "image/svg+xml",
      "uploadedBy": "uid_123",
      "uploadedAt": "2025-12-10T12:05:00Z",
      "downloads": 2,
      "metadata": { "hex": "#FF5733" }
    }
    ```

- `sweeps/{sweepId}`
  - Fields:
    - `initiatedBy` (string userId)
    - `oldLogoUrl` (string)
    - `newLogoUrl` (string)
    - `status` (string enum: "pending" | "running" | "completed" | "failed")
    - `detectedSites` (array of maps: `{ url, asset, action, confidence? }`)
    - `timestamp` (timestamp)
  - Example:
    ```json
    {
      "initiatedBy": "uid_123",
      "oldLogoUrl": "https://.../old_logo.png",
      "newLogoUrl": "https://.../new_logo.png",
      "status": "completed",
      "detectedSites": [
        {
          "url": "https://example.com",
          "asset": "old_logo.png",
          "action": "Replace"
        }
      ],
      "timestamp": "2025-12-10T12:30:00Z"
    }
    ```

Recommended indexes (example):

- `assets` collection: index on `category` and `uploadedAt` (for category listing + recent activity).
- `sweeps` collection: index on `initiatedBy` and `timestamp` (for user-specific sweep history).

Notes:

- Validate inputs in frontend and server-side emulation; keep `fileUrl` signed unless public sharing is intended.

2. `mockSweepAPI` Contract (PoC)

Endpoint: `POST /api/sweep`

Request payload (JSON):

```json
{
  "initiatedBy": "uid_123",
  "oldLogoUrl": "https://.../old_logo.png",
  "newLogoUrl": "https://.../new_logo.png",
  "crawlTargets": ["https://example.com", "https://another.com"]
}
```

Responses:

- 202 Accepted (started):
  ```json
  { "sweepId": "sweep_abc", "status": "running", "progress": 0 }
  ```
- Progress updates (polling or websocket):
  ```json
  { "sweepId": "sweep_abc", "status": "running", "progress": 50 }
  ```
- 200 OK (completed):
  ```json
  {
    "sweepId": "sweep_abc",
    "status": "completed",
    "detectedSites": [
      {
        "url": "https://example.com",
        "asset": "old_logo.png",
        "action": "Replace",
        "confidence": 0.82
      }
    ],
    "timestamp": "2025-12-10T12:30:00Z"
  }
  ```
- 400/500 Error responses include `error` and `message` fields.

Persistence:

- Create `sweeps/{sweepId}` document on start with `status: "running"` and update progress/status as results arrive. On completion set `status: "completed"` and write `detectedSites`.

3. `.env.local.example` (placeholders)

Create `.env.local` locally and add the following (do NOT commit actual secrets):

```
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=sender_id
VITE_FIREBASE_APP_ID=app_id
```

4. Sample `firebase.rules` (example, PoC)

Firestore rules (example):

```js
rules_version = '2';
service cloud.firestore {
   match /databases/{database}/documents {
      match /users/{userId} {
         allow read: if request.auth != null;
         allow write: if request.auth != null && request.auth.uid == userId;
      }

      match /assets/{assetId} {
         allow read: if request.auth != null;
         // Only admins can create/update/delete assets
         allow write: if request.auth != null && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
      }

      match /sweeps/{sweepId} {
         allow read: if request.auth != null;
         allow create: if request.auth != null;
         allow update: if request.auth != null && (get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin' || resource.data.initiatedBy == request.auth.uid);
      }
   }
}
```

Storage rules (example):

```js
rules_version = '2';
service firebase.storage {
   match /b/{bucket}/o {
      match /assets/{allPaths=**} {
         allow read: if request.auth != null;
         allow write: if request.auth != null && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
      }
      match /public/{allPaths=**} {
         // Files intended for public share (use with care)
         allow read: if true;
         allow write: if request.auth != null && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
      }
   }
}
```

Notes:

- These rules are intentionally strict for PoC. Review and adjust them if you introduce server-side functions or more granular access needs.

---

End of PRD (canonical)

Product Requirements Document (PRD)
BrandHub – Centralized Brand Identity & Asset Management Platform
Project Name: BrandHub
Team: [Your Team Name Here]
Due Date: December 15, 2025
Repository: https://github.com/your-org/brandhub

---

Executive Summary
BrandHub is a centralized, intelligent platform for managing all brand and identity assets within an organization. It replaces fragmented, inconsistent storage systems with a single source of truth for logos, typography, color palettes, icons, templates, and marketing materials. With built-in AI-powered brand monitoring, BrandHub ensures brand consistency across digital touchpoints by detecting outdated or off-brand usage across the web. Designed for companies of all sizes, BrandHub saves time, reduces brand dilution, and empowers teams with instant access to approved brand resources.

---

Project Overview
Problem Statement
Organizations today struggle with decentralized brand asset management, leading to:
● Asset fragmentation – Logos, fonts, and templates scattered across Google Drive, Dropbox, local folders, and email attachments.
● Version chaos – Employees use outdated logos or incorrect color values because there is no single authoritative source.
● Wasted productivity – Designers, marketers, and sales teams spend hours searching for correct brand files.
● Brand inconsistency – Old branding persists online after rebrands, damaging brand perception and trust.
● No automated brand policing – Manual monitoring of brand usage across websites and social media is time-consuming and incomplete.
Solution
BrandHub provides:

1. A unified digital brand library – All assets stored, categorized, and downloadable in required formats.
2. Role-based access control – Admins, users, and guests have tailored permissions.
3. AI-powered Brand Sweeper – Scans the internet for outdated brand usage and alerts teams.
4. Template management – Store, preview, and share editable brand templates.
5. Real-time dashboard – Overview of brand health, asset usage, and sweep status.

---

Technology Stack
Core Technologies (Required for PoC)

1. React 19.1.1 – Component-based UI framework.
2. React Router DOM 7.9.6 – Client-side routing.
3. Firebase 12.6.0 – Backend-as-a-Service:
   ○ Firebase Authentication (user roles, login/logout)
   ○ Cloud Firestore (asset metadata, user data, sweep results)
   ○ Firebase Storage (file storage for assets, templates, logos)
4. Vite 7.1.7 – Build tool and dev server.
5. Tailwind CSS 3.4.17 – Utility-first CSS for rapid UI development.
6. Node.js 18+ – Runtime environment.
7. Simulated AI Service (MVP) – Mock API for Brand Sweep simulation.
8. Future AI Integration – Vision models (Google Vision API, AWS Rekognition, or custom model) for real logo detection.
   Why These Technologies?
   ● React – Industry standard, reusable components, rich ecosystem.
   ● Firebase – No backend server needed; provides auth, real-time DB, and file storage.
   ● Vite – Fast builds and HMR for developer efficiency.
   ● Tailwind CSS – Consistent, responsive design with minimal custom CSS.
   ● Simulated AI – Allows demonstration of AI workflow without costly API integration during PoC.

---

PoC Scope & Requirements
Requirement 1: Meaningful Use of All Required Libraries
Status: Not Started
Deliverable: Each library used in a substantive, integrated manner.
React & React DOM
● Multi-screen component architecture (Dashboard, Login, SignUp, Asset Library, Sweep, Templates).
● State management for user roles, asset filters, sweep results.
● Event handling for uploads, downloads, and role-based actions.
React Router DOM
● Routes: /, /login, /signup, /dashboard, /brand, /brand/colors, /brand/typography, /templates, /sweep, /settings, /share/:id.
● Protected routes based on user role.
● Navigation via responsive navbar.
Firebase Authentication
● Email/password signup and login.
● Role assignment (admin, user, guest).
● Session persistence and logout.
● Protected route redirection.
Firebase Firestore
● Store asset metadata (name, type, category, uploader, date).
● Store user profiles (role, email, last login).
● Store sweep results (URLs, detected assets, status).
● Real-time updates for dashboard metrics.
Firebase Storage
● Upload and store brand assets (logos, fonts, templates).
● Generate download URLs for users.
● Manage folder structure (/assets/logos, /assets/fonts, /templates).
Tailwind CSS
● Responsive, mobile-first design.
● Dark theme consistent across app.
● Reusable component styles (cards, buttons, forms, modals).

---

Requirement 2: Exercise All External APIs/Services
Status: Not Started
Deliverable: Live API interactions demonstrated in-app.

1. Firebase Authentication API
   ● Register new user with email/password.
   ● Login existing user.
   ● Retrieve current user role and info.
   ● Logout.
   ● Error handling for invalid credentials.
2. Firestore Database API
   ● Add asset metadata.
   ● Query assets by category, type, uploader.
   ● Update asset metadata (admin only).
   ● Delete asset records (admin only).
   ● Real-time listener for dashboard metrics.
3. Firebase Storage API
   ● Upload asset files (SVG, PNG, fonts, PDFs).
   ● Generate signed/download URLs.
   ● Delete files (admin only).
4. Simulated Brand Sweep API
   ● Mock POST request to /api/sweep with old/new logo URLs.
   ● Returns mock detection results (websites, status, suggested action).
   ● Simulates latency and progress indicator.

---

Scope & Non-Scope (10% MVP Baseline)

IN SCOPE (Build These):

- User auth (signup, login, logout with email/password).
- Role-based access (admin, user roles; guest is read-only user without account).
- Admin asset upload and metadata storage in Firestore.
- User asset library browsing and download.
- Color and typography showcase pages.
- Dashboard with asset counts and recent activity.
- Mock brand sweep simulation (3s delay, show results).
- Responsive mobile/tablet/desktop UI with Tailwind dark theme.
- Firebase Firestore and Storage integration.

OUT OF SCOPE (Skip These):

- Advanced AI/vision integration (mock only for PoC).
- Custom branding automation or CI/CD workflows.
- User management dashboards or bulk operations.
- Analytics or usage tracking beyond asset download counts.
- Email notifications or alerts.
- Third-party service integrations (Slack, webhooks, etc.).
- Multi-tenant or enterprise features.

This PoC is a **working prototype** to demonstrate core brand asset management. Every feature in scope must be polished and functional; do not include incomplete or experimental features.
Status: Not Started
Deliverable: Publicly accessible web application.
Deployment Requirements:
● Deploy to Firebase Hosting, Vercel, or Netlify.
● Public URL included in GitHub Release.
● Application remains live through grading period.
● No post-deployment changes during evaluation.

---

Requirement 4: Implement 10% of Final Functionality
Status: Not Started
Deliverable: Core brand asset management workflow.
Core 10% Functionality:

1. User Authentication & Roles
   ○ Signup/login with email/password.
   ○ Admin/user/guest role differentiation.
   ○ Role-based UI changes.
2. Brand Asset Upload & Management (Admin)
   ○ Upload logos, fonts, colors, templates.
   ○ Categorize assets (Logos, Typography, Colors, Templates).
   ○ Add metadata (name, format, category, description).
3. Brand Asset Library (User)
   ○ Browse assets by category.
   ○ Download assets in available formats.
   ○ Visual color palette display with HEX/RGB/CMYK.
4. Dashboard
   ○ Summary cards: total assets, recent activity, sweep status.
   ○ Quick actions: upload asset, run sweep.
5. Brand Sweep Simulation
   ○ Upload old/new logos.
   ○ Run simulated scan.
   ○ Display mock results table.
6. Basic Navigation & Responsive UI
   ○ Navbar with auth state.
   ○ Protected routes.
   ○ Mobile-responsive layout.

---

Development Procedure Codes & Detailed Explanations
Procedure Code: PC-001 – User Authentication & Role Setup
Description: Implement Firebase Authentication with three user roles.
Components Affected: Login.jsx, SignUp.jsx, AuthContext.jsx, firebase.js.
Procedure Steps:

1. Create SignUp screen with email, password, and role selection (admin/user).
2. Implement form validation.
3. Call Firebase createUserWithEmailAndPassword() and store role in Firestore users collection.
4. Create Login screen; on success, fetch user role from Firestore.
5. Create AuthContext to provide user role globally.
6. Implement logout button in Navbar.
7. Add route protection: redirect guests/non-admins from admin pages.
   Success Criteria:
   ● New users can register with email, password, and role.
   ● Existing users can log in.
   ● Role-based UI changes are visible (e.g., admin sees upload buttons).
   ● Unauthorized users cannot access admin routes.

---

Procedure Code: PC-002 – Brand Asset Upload & Management
Description: Admin interface to upload and manage brand assets.
Components Affected: UploadAsset.jsx, AssetLibrary.jsx, firebase.js.
Procedure Steps:

1. Create upload form with fields:
   ○ Asset name
   ○ Category (Logo, Typography, Color, Template, Icon)
   ○ File upload (multiple formats)
   ○ Description
2. On submit:
   ○ Upload file to Firebase Storage.
   ○ Save metadata to Firestore assets collection.
3. Create Asset Library page to display assets by category.
4. Implement download functionality via Firebase Storage URL.
5. Admin-only delete button with confirmation.
   Firestore Document Structure:
   javascript
   {
   id: auto,
   name: string,
   category: "logo" | "typography" | "color" | "template" | "icon",
   fileUrl: string,
   fileType: string,
   uploadedBy: userId,
   uploadedAt: timestamp,
   downloads: number,
   metadata: {
   hex?: string,
   rgb?: string,
   fontFamily?: string,
   fontWeight?: string
   }
   }
   Success Criteria:
   ● Admin can upload asset with metadata.
   ● Assets appear in library categorized.
   ● Users can download assets.
   ● Delete works and removes from Storage/Firestore.

---

Procedure Code: PC-003 – Color & Typography Display
Description: Visual display of color palettes and typography styles.
Components Affected: ColorPalette.jsx, TypographyShowcase.jsx.
Procedure Steps:

1. Fetch color assets from Firestore.
2. Display color swatches with HEX, RGB, CMYK values.
3. Show gradient previews if provided.
4. Fetch font assets; display font hierarchy, weights, and style previews.
5. Provide downloadable font files (.ttf, .otf).
   Success Criteria:
   ● Colors display as swatches with values.
   ● Typography page shows font previews and downloadable files.
   ● Responsive grid layout.

---

Procedure Code: PC-004 – Dashboard Implementation
Description: Overview of brand health, asset stats, and quick actions.
Components Affected: Dashboard.jsx, firebase.js.
Procedure Steps:

1. Create dashboard with metric cards:
   ○ Total assets (from Firestore count)
   ○ Recent activity (last 5 uploads/downloads)
   ○ Brand health score (mock, future AI)
   ○ Sweep status (last run result)
2. Quick action buttons:
   ○ Upload asset (links to upload form)
   ○ Run sweep (links to sweep page)
3. Recent downloads table.
4. Real-time updates via onSnapshot.
   Success Criteria:
   ● Dashboard loads with live data.
   ● Quick actions navigate correctly.
   ● Layout is responsive.

---

Procedure Code: PC-005 – Brand Sweep Simulation
Description: Simulate AI-powered brand monitoring.
Components Affected: BrandSweep.jsx, mockSweepAPI.js.
Procedure Steps:

1. Create sweep page with:
   ○ Upload old logo
   ○ Upload new/current logo
   ○ “Run Sweep” button
2. On click, simulate API call with 3-second delay.
3. Return mock data:
4. javascript
   {
   detectedSites: [
   { url: "https://example.com", asset: "old_logo.png", action: "Replace" }
   ],
   status: "completed",
   timestamp: "2025-12-08T10:30:00Z"
5. }
6. Display results in a table with URL, detected asset, recommended action.
   Future AI Integration Spec:
   ● Use Google Vision API or AWS Rekognition to compare logos.
   ● Crawl predefined website list or use SEO APIs to find logo usage.
   ● Store results in Firestore with confidence scores.
   Success Criteria:
   ● User can upload logos and run sweep.
   ● Mock results display in a clear table.
   ● Progress indicator shows during simulation.

---

Procedure Code: PC-006 – Template Management
Description: Upload, categorize, and preview brand templates.
Components Affected: Templates.jsx, firebase.js.
Procedure Steps:

1. Create template upload form (admin only).
2. Store template in /templates Storage folder.
3. Display template thumbnails (PDF preview or placeholder).
4. Metadata: name, category, format, last updated.
5. Download button for each template.
   Success Criteria:
   ● Admin can upload templates.
   ● Templates display with thumbnails and metadata.
   ● Users can download templates.

---

Procedure Code: PC-007 – Guest Shared Brand Page
Description: Public page for sharing brand one-sheet.
Components Affected: ShareBrandPage.jsx.
Procedure Steps:

1. Create a shareable route /share/:id.
2. Display read-only brand overview:
   ○ Primary logo
   ○ Color palette
   ○ Typography samples
   ○ Brand guidelines summary
3. No login required.
4. Download buttons for key assets.
   Success Criteria:
   ● Page is publicly accessible.
   ● Displays key brand assets.
   ● Download links work.

---

Procedure Code: PC-008 – Responsive UI & Styling
Description: Professional, responsive design with Tailwind.
Components Affected: All .jsx files.
Procedure Steps:

1. Apply dark theme (bg-gray-900, text-gray-100).
2. Use Tailwind responsive classes (sm:, md:, lg:).
3. Ensure touch-friendly buttons (min-h-11).
4. Test on mobile (320px), tablet (768px), desktop (1024px+).
5. Ensure no horizontal scrolling.
   Success Criteria:
   ● Fully responsive on all screen sizes.
   ● Consistent dark theme.
   ● Accessible contrast ratios.

---

Procedure Code: PC-009 – Deployment to Production
Description: Deploy to Firebase Hosting.
Procedure Steps:

1. Run npm run build.
2. Install Firebase CLI: npm install -g firebase-tools.
3. Login: firebase login.
4. Initialize: firebase init hosting.
5. Deploy: firebase deploy --only hosting.
6. Verify all features work on live URL.
   Success Criteria:
   ● App deployed and publicly accessible.
   ● All Firebase operations work in production.

---

Procedure Code: PC-010 – Git Release v0.1 & Demo Video
Description: Tag release and create demo video.
Procedure Steps:

1. Commit all code, tag: git tag v0.1.
2. Push tags: git push --tags.
3. Create GitHub Release with:
   ○ Title: “BrandHub Proof of Concept v0.1”
   ○ Deployed URL
   ○ Features list
   ○ Test account info
   ○ Demo video link
4. Record 5-minute demo video:
   ○ Intro & problem (1 min)
   ○ Tech stack (1 min)
   ○ Live demo: signup, upload asset, browse library, run sweep, dashboard (3 min)
   ○ Roadmap (1 min)
   Success Criteria:
   ● v0.1 tag created.
   ● Release page includes all required info.
   ● Video is clear, under 5 minutes, covers core features.

---

Phase Breakdown: Tasks & Subtasks
Phase 1: Planning & Setup (Due Dec 8)
Task 1.1: Firebase Project Configuration ❌ CRITICAL
● Create Firebase project
● Enable Auth, Firestore, Storage
● Set up .env.local with Firebase config
● Status: Not Started
● Dependencies: None
● Estimated Time: 30 min
Task 1.2: Project Structure
● Create src/{components, screens, contexts, config}
● npm install all dependencies
● Status: Not Started
● Dependencies: None
● Estimated Time: 15 min
Task 1.3: Local Dev Setup
● npm run dev, verify hot reload
● Check Tailwind is working
● Status: Not Started
● Dependencies: Task 1.2
● Estimated Time: 20 min

---

Phase 2: Authentication & Roles (Due Dec 8)
Task 2.1: SignUp Screen with Role Selection
● Form with email, password, role dropdown (admin/user)
● Firebase createUserWithEmailAndPassword()
● Store role in Firestore users
● Status: Not Started
● Dependencies: Task 1.1
● Estimated Time: 1.5 hr
Task 2.2: Login Screen
● Email/password form
● Fetch user role on login
● Status: Not Started
● Dependencies: Task 2.1
● Estimated Time: 1 hr
Task 2.3: Auth Context & Global State
● Create AuthContext
● Provide user and role to app
● Status: Not Started
● Dependencies: Task 2.1
● Estimated Time: 1 hr
Task 2.4: Protected Routes
● Create ProtectedRoute component
● Redirect guests/non-admins
● Status: Not Started
● Dependencies: Task 2.3
● Estimated Time: 45 min

---

Phase 3: Brand Asset Management (Due Dec 9)
Task 3.1: Upload Asset Form (Admin)
● Form with category, file input, metadata fields
● Upload to Storage, save to Firestore
● Status: Not Started
● Dependencies: Task 2.3
● Estimated Time: 2 hr
Task 3.2: Asset Library Page
● Display assets by category
● Download functionality
● Admin delete button
● Status: Not Started
● Dependencies: Task 3.1
● Estimated Time: 2 hr
Task 3.3: Color & Typography Pages
● Color swatch component
● Font preview component
● Status: Not Started
● Dependencies: Task 3.2
● Estimated Time: 1.5 hr

---

Phase 4: Dashboard (Due Dec 9)
Task 4.1: Dashboard Layout
● Metric cards (total assets, recent activity, sweep status)
● Quick action buttons
● Status: Not Started
● Dependencies: Task 3.1
● Estimated Time: 1.5 hr
Task 4.2: Real-Time Data
● Firestore onSnapshot for metrics
● Status: Not Started
● Dependencies: Task 4.1
● Estimated Time: 1 hr

---

Phase 5: Brand Sweep Simulation (Due Dec 10)
Task 5.1: Sweep UI
● Logo upload (old/new)
● Run button with progress indicator
● Status: Not Started
● Dependencies: Task 3.1
● Estimated Time: 1.5 hr
Task 5.2: Mock API & Results Table
● Simulate API delay
● Display mock detection results
● Status: Not Started
● Dependencies: Task 5.1
● Estimated Time: 1.5 hr

---

Phase 6: Templates & Guest Page (Due Dec 10)
Task 6.1: Template Management
● Upload template form
● Thumbnail preview
● Status: Not Started
● Dependencies: Task 3.1
● Estimated Time: 1.5 hr
Task 6.2: Guest Shared Page
● Public route /share/:id
● Read-only brand one-sheet
● Status: Not Started
● Dependencies: Task 3.3
● Estimated Time: 1 hr

---

Phase 7: UI/UX Polish (Due Dec 11)
Task 7.1: Responsive Design
● Test on mobile/tablet/desktop
● Fix layout issues
● Status: Not Started
● Dependencies: All UI tasks
● Estimated Time: 1.5 hr
Task 7.2: Dark Theme & Consistency
● Apply consistent colors, spacing
● Add loading spinners, error states
● Status: Not Started
● Dependencies: Task 7.1
● Estimated Time: 1 hr

---

Phase 8: Testing & Validation (Due Dec 11)
Task 8.1: Functional Testing
● Test auth flows
● Test upload/download
● Test sweep simulation
● Status: Not Started
● Dependencies: All dev tasks
● Estimated Time: 2 hr
Task 8.2: Performance & Build
● npm run build success
● Check console errors
● Status: Not Started
● Dependencies: Task 8.1
● Estimated Time: 1 hr

---

Phase 9: Deployment & Release (Due Dec 12)
Task 9.1: Deploy to Firebase Hosting
● Build, initialize, deploy
● Verify live URL
● Status: Not Started
● Dependencies: Task 8.2
● Estimated Time: 45 min
Task 9.2: Create Git Release v0.1
● Tag, push, create GitHub Release
● Status: Not Started
● Dependencies: Task 9.1
● Estimated Time: 30 min
Task 9.3: Record Demo Video
● Script, record, edit, upload
● Status: Not Started
● Dependencies: Task 9.1
● Estimated Time: 2-3 hr

---

Testing & Validation Checklist
● User can sign up as admin/user
● Admin can upload asset
● Asset appears in library
● User can download asset
● Color/Typography pages display correctly
● Dashboard shows real-time metrics
● Brand sweep returns mock results
● Templates can be uploaded/downloaded
● Guest page is publicly accessible
● Responsive on all screen sizes
● No console errors in production
● Deployed URL works

---

Grading Rubric Alignment
Target: A-Level
● ✅ All required libraries used meaningfully (React, React Router, Firebase Auth/Firestore/Storage, Tailwind)
● ✅ Core 10% functionality implemented (asset management, sweep simulation, dashboard, roles)
● ✅ Application deployed and publicly accessible
● ✅ Clean, structured code with error handling
● ✅ Professional, responsive UI
Demo Video Target: 90+
● Clear speaking, good pacing
● Covers problem, solution, live demo, roadmap
● Shows enthusiasm and domain knowledge

---

Risk Mitigation
● Firebase config errors – Use .env.local, verify with logs.
● Storage permissions – Set security rules for authenticated users only.
● Sweep simulation feels fake – Use realistic mock data and progress indicators.
● Deployment fails – Test build locally, check Firebase logs.
● Scope creep – Stick to 10% MVP; defer advanced AI to future.

---

Success Metrics
● All required technologies integrated
● Core brand asset workflow functional
● App deployed and accessible
● Demo video created and linked
● GitHub release v0.1 tagged

---

Timeline Summary
Total Estimated Hours: 20–22 hours
Critical Path:

1. Firebase setup (Task 1.1)
2. Auth & roles (Tasks 2.1–2.4)
3. Asset upload/library (Tasks 3.1–3.3)
4. Dashboard (Task 4.1)
5. Sweep simulation (Tasks 5.1–5.2)
6. Deployment (Task 9.1)
   Recommended Schedule:
   ● Dec 8: Phases 1–2 (Planning, Auth) – 4 hours
   ● Dec 9: Phases 3–4 (Asset Mgmt, Dashboard) – 6 hours
   ● Dec 10: Phases 5–6 (Sweep, Templates) – 5 hours
   ● Dec 11: Phases 7–8 (UI, Testing) – 4 hours
   ● Dec 12: Phase 9 (Deploy, Release, Video) – 4 hours

---

Appendix: Component Structure
text
src/
├── App.jsx
├── main.jsx
├── contexts/
│ └── AuthContext.jsx
├── components/
│ ├── Navbar.jsx
│ ├── ProtectedRoute.jsx
│ ├── AssetCard.jsx
│ └── MetricCard.jsx
├── screens/
│ ├── Login.jsx
│ ├── SignUp.jsx
│ ├── Dashboard.jsx
│ ├── BrandAssets/
│ │ ├── AssetLibrary.jsx
│ │ ├── ColorPalette.jsx
│ │ └── TypographyShowcase.jsx
│ ├── Templates.jsx
│ ├── BrandSweep.jsx
│ ├── Settings.jsx
│ └── ShareBrandPage.jsx
├── config/
│ └── firebase.js
├── utils/
│ └── mockSweepAPI.js
├── App.css
└── index.css
