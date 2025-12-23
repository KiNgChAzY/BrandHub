# Security Features Testing Checklist

## 🚀 Quick Start
The dev server should be running at `http://localhost:5173` (or the port shown in terminal)

---

## ✅ Testing Checklist

### 1. **File Name Sanitization (Path Traversal Prevention)**

**Test Case 1.1: Malicious File Name with Path Traversal**
- [ ] Go to `/upload` (as admin)
- [ ] Try uploading a file with name: `../../../etc/passwd.png`
- [ ] **Expected:** File should upload successfully, but the stored name should be sanitized (no `../` characters)
- [ ] Check browser console - should see sanitized file name in storage path

**Test Case 1.2: File Name with Special Characters**
- [ ] Upload file with name: `file<>:"|?*.png`
- [ ] **Expected:** Special characters should be replaced with underscores
- [ ] File should upload successfully

**Test Case 1.3: Very Long File Name**
- [ ] Upload file with name over 255 characters
- [ ] **Expected:** File name should be truncated to 255 characters while preserving extension

**Test Case 1.4: Brand Sweep File Names**
- [ ] Go to `/sweep`
- [ ] Upload old logo with name: `../../malicious.png`
- [ ] Upload new logo with name: `test<script>alert('xss')</script>.png`
- [ ] **Expected:** Both files should upload, names should be sanitized

---

### 2. **Input Length Limits (DoS Prevention)**

**Test Case 2.1: Email Length Limit**
- [ ] Go to `/signup`
- [ ] Try entering email longer than 254 characters
- [ ] **Expected:** Browser should prevent typing beyond 254 characters
- [ ] Try same on `/login` page

**Test Case 2.2: Password Length Limit**
- [ ] Go to `/signup`
- [ ] Try entering password longer than 128 characters
- [ ] **Expected:** Browser should prevent typing beyond 128 characters
- [ ] Verify minimum 6 characters still works

**Test Case 2.3: Asset Name Length Limit**
- [ ] Go to `/upload` (as admin)
- [ ] Try entering asset name longer than 200 characters
- [ ] **Expected:** Browser should prevent typing beyond 200 characters
- [ ] Check that form shows helper text: "Maximum 200 characters"

**Test Case 2.4: Description Length Limit**
- [ ] In upload form, try entering description longer than 500 characters
- [ ] **Expected:** Browser should prevent typing beyond 500 characters
- [ ] Check that form shows helper text: "Maximum 500 characters"

**Test Case 2.5: Sidebar Search Limit**
- [ ] Go to any page with sidebar visible
- [ ] Try typing in search box more than 100 characters
- [ ] **Expected:** Browser should prevent typing beyond 100 characters

---

### 3. **Role Validation**

**Test Case 3.1: Valid Role Selection**
- [ ] Go to `/signup`
- [ ] Select "user" from dropdown
- [ ] Submit form
- [ ] **Expected:** Should create account successfully

**Test Case 3.2: Admin Role Selection**
- [ ] Go to `/signup`
- [ ] Select "admin" from dropdown
- [ ] Submit form
- [ ] **Expected:** Should create admin account successfully

**Test Case 3.3: Role Manipulation Attempt (if possible)**
- [ ] Try to modify the select element value using browser dev tools
- [ ] Set value to something like "superadmin" or "hacker"
- [ ] Submit form
- [ ] **Expected:** Should show error: "Invalid role selected."

---

### 4. **XSS Prevention (Safe Rendering)**

**Test Case 4.1: Asset Name with HTML/JavaScript**
- [ ] As admin, upload an asset with name: `<script>alert('XSS')</script>Test`
- [ ] Go to `/assets` page
- [ ] **Expected:** Should display as plain text, NOT execute script
- [ ] Check that `<script>` tags are visible as text, not executed

**Test Case 4.2: Description with HTML**
- [ ] Upload asset with description: `<img src="x" onerror="alert('XSS')">`
- [ ] View asset in library
- [ ] **Expected:** Should display as plain text, no alert should appear

**Test Case 4.3: User Email Display**
- [ ] Create account with email: `test<script>alert('xss')</script>@example.com`
- [ ] Check sidebar and header where email is displayed
- [ ] **Expected:** Email should display as plain text, no script execution

**Test Case 4.4: Brand Sweep Results URLs**
- [ ] Run a brand sweep
- [ ] Check results table
- [ ] **Expected:** URLs should have `rel="noreferrer"` attribute
- [ ] Inspect element on URL links to verify

---

### 5. **Input Sanitization**

**Test Case 5.1: Asset Name Sanitization**
- [ ] Upload asset with name containing only whitespace
- [ ] **Expected:** Should show error: "Asset name is required."

**Test Case 5.2: Category Validation**
- [ ] Try to manipulate category select to invalid value using dev tools
- [ ] Submit form
- [ ] **Expected:** Should show error: "Invalid category selected."

---

### 6. **General Security Checks**

**Test Case 6.1: Console Errors**
- [ ] Open browser DevTools Console
- [ ] Navigate through all pages
- [ ] **Expected:** No security-related errors or warnings

**Test Case 6.2: Network Tab - No Secrets**
- [ ] Open DevTools Network tab
- [ ] Perform various actions (login, upload, etc.)
- [ ] **Expected:** No API keys or secrets visible in requests/responses
- [ ] Check that Firebase config uses environment variables only

**Test Case 6.3: File Upload Size Limits**
- [ ] Try uploading file larger than 10MB
- [ ] **Expected:** Should show error: "File too large (max 10MB)"

**Test Case 6.4: Empty File Upload**
- [ ] Try submitting upload form without selecting file
- [ ] **Expected:** Should show error: "Please select a file."

---

## 🐛 What to Look For

### ✅ **Good Signs:**
- File names are sanitized (no `../` or special chars in storage paths)
- Input fields respect maxLength limits
- HTML/scripts in user input display as plain text
- Error messages appear for invalid inputs
- No console errors related to security

### ⚠️ **Red Flags:**
- Scripts executing from user input
- File names with `../` appearing in storage paths
- Inputs accepting more characters than maxLength
- Secrets visible in network requests
- Console errors about security

---

## 📝 Test Results Template

```
Date: ___________
Tester: ___________

File Name Sanitization: [ ] Pass [ ] Fail
Input Length Limits: [ ] Pass [ ] Fail
Role Validation: [ ] Pass [ ] Fail
XSS Prevention: [ ] Pass [ ] Fail
Input Sanitization: [ ] Pass [ ] Fail
General Security: [ ] Pass [ ] Fail

Notes:
_______________________________________
_______________________________________
_______________________________________
```

---

## 🎯 Quick Test (5 minutes)

If you're short on time, test these critical items:

1. Upload file with name `../../../test.png` → Check it's sanitized
2. Try typing 300 characters in asset name → Should stop at 200
3. Upload asset with name `<script>alert('xss')</script>` → Should display as text
4. Try invalid role in signup → Should show error
5. Check console for errors → Should be clean

---

Happy Testing! 🚀

