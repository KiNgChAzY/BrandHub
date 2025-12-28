# Firebase Free Storage Setup

## Important: Firebase Storage IS Free (With Limits)

Firebase offers a **free tier (Spark plan)** that includes:
- **5 GB storage** free
- **1 GB/day downloads** free  
- **20,000 uploads/day** free
- **50,000 downloads/day** free

However, Firebase **requires a billing account** to be attached to your project to enable Storage, even though you won't be charged if you stay within the free limits.

## How to Enable Storage (Free Tier)

### Step 1: Enable Billing on Your Project

1. Go to Firebase Console: https://console.firebase.google.com/
2. Select your project: `brandhub-ff726`
3. Click the **⚙️ Settings** icon (gear) in the top left
4. Click **"Project settings"**
5. Click the **"Usage and billing"** tab
6. Click **"Modify plan"** or **"Upgrade plan"**
7. You'll see the option to select a plan:
   - **Spark Plan (Free)** - This is what you want
   - **Blaze Plan (Pay as you go)** - Only pay if you exceed free tier

8. Click **"Continue"** on the Spark plan (or if Blaze is shown, select it - you won't pay unless you exceed free tier)

### Step 2: Add Payment Method (Required, but won't be charged)

Even for the free tier, Firebase requires a payment method:

1. You'll be prompted to add a payment method
2. Enter your credit card information
3. **Important:** You will NOT be charged unless you exceed the free tier limits
4. For development/testing, you'll almost certainly stay within free limits

### Step 3: Enable Storage

After billing is set up:

1. Go to **Storage** in the left menu
2. Click **"Get started"**
3. Choose **"Start in test mode"** (for development)
4. Select a storage location (choose closest to you)
5. Click **"Done"**

### Step 4: Set Storage Rules

1. In Storage, click the **Rules** tab
2. Use these rules (for development):
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```
3. Click **"Publish"**

## Understanding the Free Tier Limits

### Free Tier (Spark Plan) Includes:
- **Storage:** 5 GB total
- **Downloads:** 1 GB per day
- **Uploads:** 20,000 per day
- **Operations:** 50,000 per day

### For Your MVP/Testing:
- Even with hundreds of assets, you'll likely stay well under 5 GB
- Daily download/upload limits are generous for development
- You can monitor usage in Firebase Console

## Cost Monitoring

1. Go to Firebase Console
2. Click **"Usage and billing"** in Project settings
3. View your current usage
4. Set up billing alerts if you want (optional)

**Note:** For development/testing, it's very unlikely you'll exceed free limits.

## Alternative: Use Blaze Plan (Pay-as-you-go)

If you prefer Blaze plan:
- Still includes the same free tier
- Only charges if you exceed limits
- Better for production apps
- You can still stay 100% free if within limits

## Summary

**What you need to do:**
1. ✅ Enable billing (add payment method)
2. ✅ Select Spark or Blaze plan
3. ✅ Enable Storage
4. ✅ Set Storage rules
5. ✅ Start using Storage (for free, within limits)

**Will you be charged?**
- ❌ NO, as long as you stay within free tier limits
- ✅ For MVP/testing, you'll almost certainly stay free
- ✅ Monitor usage in Firebase Console if concerned

This is a Firebase requirement - they need billing enabled to track usage, but the free tier is generous enough for development and small projects.

