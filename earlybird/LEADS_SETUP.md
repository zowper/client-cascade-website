# ⚡ Real-Time Lead Capture Setup Guide

Because Client Cascade is hosted on GitHub Pages as a static website, it has no native backend database. To capture leads in real-time (including partial inputs before they hit submit), we can use a free **Google Sheet** connected via **Google Apps Script** as a lightweight database.

Follow these simple steps to set it up:

---

## 1. Create your Google Sheet
1. Go to [Google Sheets](https://sheets.google.com) and create a new blank spreadsheet.
2. Name your spreadsheet (e.g., `Client Cascade Waitlist Leads`).
3. You do not need to add columns manually; the script below will automatically create the header row on the first lead capture.

## 2. Set up Google Apps Script
1. Inside your new Google Sheet, go to the top menu and select **Extensions** > **Apps Script**.
2. Delete any default code in the editor (`Code.gs`) and paste the following snippet:

```javascript
/**
 * Client Cascade Real-Time Lead Capture Handler
 * Receives partial and completed waitlist form entries and saves them.
 */
function doPost(e) {
  // Setup headers for CORS support
  var headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
  };

  try {
    if (!e || !e.postData || !e.postData.contents) {
      return ContentService.createTextOutput(JSON.stringify({ status: "error", message: "No data received" }))
                           .setMimeType(ContentService.MimeType.JSON)
                           .setHeaders(headers);
    }

    var data = JSON.parse(e.postData.contents);
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Column definitions
    var columns = ["Session ID", "Email", "Name", "Phone", "Company", "Trade", "Status", "Last Updated", "Referrer"];
    
    // Initialize headers if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(columns);
      // Format header row (bold, frozen)
      sheet.getRange("A1:I1").setFontWeight("bold");
      sheet.setFrozenRows(1);
    }
    
    // Check if we already have a record for this Session ID
    var rows = sheet.getDataRange().getValues();
    var sessionIdCol = 0; // Column A (Index 0)
    var foundRowIndex = -1;
    
    for (var i = 1; i < rows.length; i++) {
      if (rows[i][sessionIdCol] === data.sessionId) {
        foundRowIndex = i + 1; // 1-based sheet row index
        break;
      }
    }
    
    var rowData = [
      data.sessionId,
      data.email || "",
      data.name || "",
      data.phone || "",
      data.company || "",
      data.trade || "",
      data.status || "partial",
      data.lastUpdated || new Date().toISOString(),
      data.referrer || ""
    ];
    
    if (foundRowIndex !== -1) {
      // Update existing visitor record in place
      var range = sheet.getRange(foundRowIndex, 1, 1, rowData.length);
      range.setValues([rowData]);
    } else {
      // Append a new visitor record
      sheet.appendRow(rowData);
    }
    
    return ContentService.createTextOutput(JSON.stringify({ status: "success", rowUpdated: foundRowIndex !== -1 }))
                         .setMimeType(ContentService.MimeType.JSON)
                         .setHeaders(headers);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
                         .setMimeType(ContentService.MimeType.JSON)
                         .setHeaders(headers);
  }
}

// Handle preflight OPTIONS requests from the browser
function doOptions(e) {
  var headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400"
  };
  return ContentService.createTextOutput("")
                       .setMimeType(ContentService.MimeType.TEXT)
                       .setHeaders(headers);
}
```

3. Click the **Save** icon (diskette) at the top of the Apps Script interface.

## 3. Deploy the Apps Script as a Web App
1. Click the blue **Deploy** button in the top right and select **New deployment**.
2. Click the gear icon next to "Select type" and choose **Web app**.
3. Fill out the deployment details:
   - **Description:** `Client Cascade Waitlist Webhook`
   - **Execute as:** `Me (your-email@gmail.com)`
   - **Who has access:** `Anyone` *(Crucial: This allows your website's contact form to send data here without requiring authentication)*.
4. Click **Deploy**.
5. Google will ask you to authorize access. Click **Authorize access**, choose your account, click **Advanced** (under safety warning), and select **Go to Untitled project (unsafe)**. Allow the requested permissions.
6. Copy the generated **Web app URL** (it should end in `/exec`).

## 4. Link to Website Script
1. Open the website codebase.
2. In [earlybird/main.js](file:///home/zowper/gemini/client-cascade-website/earlybird/main.js), locate the `LEAD_CAPTURE_ENDPOINT` constant at the very top.
3. Paste the copied URL between the quotes:
   ```javascript
   const LEAD_CAPTURE_ENDPOINT = 'https://script.google.com/macros/s/.../exec';
   ```
4. Save and commit your changes. 

Now, when a user enters their email or starts filling out their details, the sheet will automatically update a single row per user within 1.5 seconds!
