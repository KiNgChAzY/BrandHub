# BrandHub PRD Fix & PoC Todo Plan

Overview

- Purpose: produce a concise, reviewed, and developer-ready PoC scope from `PRD.md`.
- Workflow: I will not make code edits or PRD changes until you verify this plan.
- Scope Constraint: 10% MVP BASELINE ONLY — every feature must work, but no extras or stretch goals. This is a demo/prototype to prove core functionality.

Key Scope Rule

- Build only what is in the "Core 10% Functionality" section (auth, asset upload/download, colors, dashboard, mock sweep, responsive UI).
- No optional features, no "nice-to-haves", no advanced integrations.
- Finish what you start; every feature must be production-ready and working, not half-baked.

Instructions for you

- Please review the todo items below and reply with "approve" or any requested edits.

Detailed Todo Items (order of execution)

1. Prepare & Verify Plan — COMPLETED

   - Outcome: initial plan created and you approved in-place edits.
   - Acceptance: proceed to step 2 after user verification.

2. Consolidate `PRD.md` (Canonicalize document) — IN PROGRESS

   - Goal: Remove duplicated content and produce a single canonical PRD in place.
   - Substeps:
     a. Scan `PRD.md` for repeated sections and identify canonical blocks to keep.
     b. Remove the duplicate repeated content (keep the first full copy and any unique additions).
     c. Ensure headings, procedure codes, and phase breakdown remain intact and ordered.
     d. Run a quick markdown render check locally (manual visual scan) to confirm formatting.
   - Acceptance criteria: `PRD.md` contains one non-duplicated canonical document; headings and anchors render correctly.

3. Add Data Schema section to `PRD.md` — NOT STARTED

   - Goal: Give developers precise Firestore schema to implement and test PoC.
   - Substeps:
     a. Create a `Data Schema` section describing collections: `users`, `assets`, `sweeps`.
     b. For each collection, list field names, types, required/optional, and example documents.
     c. Add recommended Firestore indexes (compound or single-field) for common queries.
     d. Add a short note about data retention, quotas, and size limits for PoC.
   - Acceptance criteria: Schema is copy-paste ready and addresses query/index needs.

4. Add `mockSweepAPI` contract to `PRD.md` — NOT STARTED

   - Goal: Provide a clear mock API contract for the Brand Sweep simulation.
   - Substeps:
     a. Define POST `/api/sweep` request payload and required fields.
     b. Define response payloads for `progress`, `success`, and `error` cases.
     c. Describe how mock results are persisted in Firestore (`sweeps/{id}`) and example doc.
     d. Add example cURL request and sample response JSON.
   - Acceptance criteria: Devs can implement the mock API and frontend integration without further questions.

5. Add `.env.local.example` and Firebase setup checklist — NOT STARTED

   - Goal: Make local setup frictionless and avoid committing secrets.
   - Substeps:
     a. Add `.env.local.example` content with all required placeholders (FIREBASE_API_KEY, etc.).
     b. Add a short `Firebase Setup` checklist with steps to create a project, enable Auth/Firestore/Storage, and copy credentials.
     c. Add guidance for using Firebase Emulator for offline testing.
   - Acceptance criteria: Developer can set up local environment using only the README and `.env.local.example`.

6. Add sample `firebase.rules` snippet for PoC — NOT STARTED

   - Goal: Provide safe-by-default security rules for Storage and Firestore.
   - Substeps:
     a. Provide minimal Firestore rules that restrict writes to admin role and allow authenticated reads.
     b. Provide Storage rules to allow uploads only to `/assets/*` by admin and downloads to authenticated users.
     c. Document how to test rules with Firebase emulator or `firebase deploy --only firestore:rules`.
   - Acceptance criteria: Rules provided and documented; clearly labeled as example for PoC.

7. Sanity checks: syntax, formatting, and small fixes — NOT STARTED

   - Goal: Ensure no broken Markdown, JSON, or code fences after edits.
   - Substeps:
     a. Lint or visually scan `PRD.md` for unclosed fences and invalid JSON examples.
     b. Fix minor typos or heading inconsistencies introduced during consolidation.
   - Acceptance criteria: Clean Markdown rendering in VS Code preview.

8. Security review & leak check — NOT STARTED

   - Goal: Ensure no secrets are added and that rules/assumptions follow least privilege.
   - Substeps:
     a. Search repository for `.env`, API keys, or embedded private keys; ensure none are present in changes.
     b. Review the new `firebase.rules` and `Data Schema` for over-permissive defaults.
     c. Document any residual security caveats in the `Review` section.
   - Acceptance criteria: No secrets committed, and PoC rules are least-privilege by default.

9. Update `tasks/todo.md` review section with summary of changes — NOT STARTED

   - Goal: Add final summary of changes, files modified, and security checklist results.

10. Present changes and request final approval before pushing — NOT STARTED
    - Goal: Provide a concise summary and ask for approval to commit/push.

Safety & Security Notes

- I will not add any real secret values to files (I will add an `.env.local.example` only).
- I will keep `firebase.rules` minimal and safe-by-default. I will explain any loosening of rules.

Questions you already answered

1. Edit in-place: YES — proceed with in-place edits to `PRD.md`.
2. Owners/assignees: leave unassigned unless you ask otherwise.

---

# Review (to be filled at completion)

Summary of changes made:

-

Security checklist performed:

-

Files modified:

-

Notes / follow-ups:

- Summary of changes made:
- Consolidated duplicate content in `PRD.md` (removed second copy and retained canonical document).
- Appended implementation-ready appendix to `PRD.md` including:
  - Data Schema (collections: `users`, `assets`, `sweeps`) with example documents and recommended indexes.
  - `mockSweepAPI` contract (POST `/api/sweep`) with request/response examples and persistence guidance.
  - `.env.local.example` placeholders for Firebase config.
  - Sample `firebase.rules` snippets for Firestore and Storage (strict-by-default for PoC).

Security checklist performed:

- Confirmed no `.env` or actual keys were added to the repo; only an example template inside `PRD.md`.
- Ensured Storage and Firestore rules are conservative (writes require `admin` role in examples).
- Noted remaining action: run a thorough repo scan for secrets before pushing to remote.

Files modified:

- `PRD.md` (consolidated + appendix added)
- `tasks/todo.md` (expanded plan and review entries)

Notes / follow-ups:

- Next: complete security review by searching for secrets and verifying there are no config files with credentials. I will also run a final markdown syntax check and ask for your approval before committing.
- If you'd like, I can extract the appended appendix into a separate `PRD_Addendum.md` instead; you previously asked for in-place edits so I applied them there.

---

## Consolidated Checklist (current status)

**What I'm Building:**

- ✅ `src/screens/SignUp.jsx` - User registration form
- ✅ `src/screens/Login.jsx` - User login form
- ✅ `src/contexts/AuthContext.jsx` - Global auth state management
- ✅ `src/config/firebase.js` - Firebase configuration (uses `import.meta.env` placeholders)
- ✅ `src/components/Navbar.jsx` - Smart navbar with auth display
- ✅ `src/screens/Dashboard.jsx` - Bare-bones dashboard with metrics and recent uploads
- ✅ `src/screens/BrandAssets/UploadAsset.jsx` - Admin upload form (storage + metadata)
- ✅ `PRD.md` - Consolidated canonical PRD with Appendix (Data Schema, mock API contract, env example, firebase.rules)

**Remaining (priority for 10% MVP):**

### Task 1.1: Firebase Project Configuration ⭐ CRITICAL
- [ ] Create/verify Firebase project on Firebase Console
- [ ] Obtain Firebase configuration credentials and set local `.env.local` (do NOT commit)

### Task 1.2: Wire App & Routes
- [ ] Add `src/App.jsx` minimal router and wrap app with `AuthProvider`
- [ ] Register routes: `/`, `/login`, `/signup`, `/dashboard`, `/brand`, `/templates`, `/upload`, `/share/:id`

### Task 1.3: Asset Library (Core PoC)
- [ ] Implement `src/screens/BrandAssets/AssetLibrary.jsx` to list assets by category
- [ ] Add download links that use Storage `fileUrl` (signed URLs if available)

### Task 1.4: Integrations & UX
- [ ] Integrate `Upload` into Navbar (route `/upload`) and protect admin access
- [ ] Add minimal page shells for `Brand` (colors, typography) and `Templates`

### Task 1.5: Brand Sweep (Mock)
- [ ] Implement `src/screens/BrandSweep.jsx` to upload old/new logos and call `/api/sweep` mock (simulate progress)
- [ ] Persist sweep results in Firestore `sweeps/{id}` per the PRD schema

### Task 1.6: Styling + Polish (Minimal)
- [ ] Apply consistent Tailwind classes across pages (dark theme)
- [ ] Ensure mobile/responsive layout for each page

### Task 1.7: Final Review & Security
- [ ] Run repo secret scan and confirm no secrets committed
- [ ] Verify `firebase.rules` are applied in staging/testing
- [ ] Run basic functional smoke tests (signup, login, upload, download, sweep mock)

---

I will start with Task 1.2: wire `App.jsx` with routes and `AuthProvider`, then scaffold `AssetLibrary.jsx`. I will mark each task done as I finish it.
