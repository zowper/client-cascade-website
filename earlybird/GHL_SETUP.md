# ⚡ GoHighLevel (GHL) Lead Integration Setup Guide

This guide explains how to connect the Client Cascade earlybird landing page form to your GoHighLevel account (`my.clientcascade.com`) for the location **"Client Cascade"**. 

By using GHL's native Workflows and a Custom Webhook trigger, we can securely capture fresh leads as **Contacts** and **Opportunities** in real-time, including partial lead data before they hit submit.

---

## Step 1: Create a Custom Webhook Workflow in GoHighLevel

1. Log in to your GoHighLevel portal at [my.clientcascade.com](https://my.clientcascade.com).
2. Select the **"Client Cascade"** sub-account/location.
3. In the left-hand sidebar, navigate to **Automation** (or **Workflows**).
4. Click **Create Workflow** in the top right.
5. Select **Start from Scratch** to create a blank workflow.
6. Click **Add New Trigger** at the top of the workflow builder.
7. Search for and select **Inbound Webhook** (or **Custom Webhook** depending on your GHL version).
8. Copy the generated **Webhook URL** (it usually looks like `https://services.leadconnectorhq.com/hooks/...` or similar).
9. Click **Save Trigger**. Do not close the window yet; we need to map the fields next.

---

## Step 2: Link the Webhook in the Landing Page Codebase

To route your leads from the landing page to GoHighLevel:

1. Open the file [earlybird/main.js](file:///c:/Users/zowpe/Documents/GitHub/client-cascade-website/earlybird/main.js).
2. Locate the `LEAD_CAPTURE_ENDPOINT` constant at the very top (Line 9):
   ```javascript
   const LEAD_CAPTURE_ENDPOINT = 'https://services.leadconnectorhq.com/hooks/HlaondNJjL3ylk6sc6pM/webhook-trigger/b1fef980-c2e1-49c4-af12-96f93f067e43';
   ```
3. The codebase has already been updated with this URL and deployed.

---

## Step 3: Run a Test Submission to Map Fields

GoHighLevel needs to see the structure of your payload to let you map incoming fields.

1. Open your live or local landing page.
2. Fill out the waitlist form with test data (e.g., Email, Name, Phone, Company, and Trade).
3. Submit the form to trigger the webhook call.
4. Back in the GoHighLevel Workflow builder, open the **Inbound Webhook** trigger setup.
5. Go to the **Test Trigger** tab and select the received payload. Verify you see the incoming keys:
   - `email`
   - `name`
   - `phone`
   - `company`
   - `trade`
   - `status`
   - `sessionId`

---

## Step 4: Map Webhook Data to GHL Contacts & Opportunities

Now, add the workflow actions in GHL to process the webhook payload.

### A. Create/Update Contact
1. Click the **`+`** icon directly below the webhook trigger.
2. Choose **Create or Update Contact**.
3. Map the fields by clicking the tag icon on the right side of each input box and selecting variables from the Webhook trigger:
   - **First Name / Full Name** ➔ `{{trigger.name}}`
   - **Email** ➔ `{{trigger.email}}`
   - **Phone** ➔ `{{trigger.phone}}`
   - **Company Name** ➔ `{{trigger.company}}`
   - *(Optional)* Map custom fields (like **Trade**) ➔ `{{trigger.trade}}`.
4. Click **Save Action**.

### B. Create/Update Opportunity
1. Click the **`+`** icon below the contact action.
2. Choose **Create or Update Opportunity**.
3. Configure the details:
   - **Pipeline**: Select your leads pipeline (e.g., `Client Cascade Pipeline`).
   - **Stage**: Select your fresh lead stage (e.g., `New Lead` or `Waitlist Signup`).
   - **Opportunity Name**: Use a dynamic contact variable, e.g., `{{contact.name}} - Waitlist Lead`.
   - **Opportunity Source**: Set to `Client Cascade Earlybird Page`.
   - **Status**: Set to `Open`.
4. Click **Save Action**.

---

## Step 5: Publish and Activate

1. In the top right corner of the Workflow Builder, change the toggle from **Draft** to **Publish**.
2. Click the blue **Save** button in the top right.
3. Your integration is now live! Every time a user types their email or fills out the form, their info will flow directly into GoHighLevel.
