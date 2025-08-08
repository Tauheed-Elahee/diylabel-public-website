# Microsoft Forms Integration Guide for DIY Label Print Shop Partnership Form

This guide provides step-by-step instructions for recreating the DIY Label print shop partnership form in Microsoft Forms and integrating it with your website.

## 📋 Form Structure Overview

The form contains 6 main sections with 25+ fields total:

1. **Business Information** (4 fields)
2. **Contact Information** (3 fields)
3. **Location Information** (6 fields)
4. **Business Hours** (7 days with open/close times)
5. **Products You Can Print** (30+ checkboxes across 3 categories)
6. **Business Details** (4 fields including equipment checkboxes)

---

## 🔧 Creating the Form in Microsoft Forms

### Step 1: Create New Form

1. Go to [Microsoft Forms](https://forms.microsoft.com)
2. Click **"New Form"**
3. Set title: **"DIY Label Print Shop Partnership Application"**
4. Set description: **"Join our network of local print shops and start receiving orders from nearby Shopify stores. We'll contact you within 24 hours to discuss partnership opportunities."**

### Step 2: Section 1 - Business Information

**Add Section Header:** "Business Information"

1. **Business Name** (Text - Required)
   - Question: "What is your business name?"
   - Placeholder: "Your Print Shop Name"
   - Required: Yes

2. **Contact Person** (Text - Required)
   - Question: "Who is the main contact person?"
   - Placeholder: "Your Name"
   - Required: Yes

3. **Business Type** (Choice - Required)
   - Question: "What type of business is this?"
   - Options:
     - Independent Business
     - Franchise
     - Chain Store
   - Required: Yes

4. **Your Role** (Choice - Conditional)
   - Question: "What is your role in the business?"
   - Show this question when: Business Type = "Franchise" OR "Chain Store"
   - Options:
     - Owner/Corporate Representative
     - Franchisee/Local Owner
     - Store Manager
     - Authorized Representative
   - Required: Yes (when shown)

### Step 3: Section 2 - Contact Information

**Add Section Header:** "Contact Information"

1. **Email Address** (Text - Required)
   - Question: "What is your email address?"
   - Placeholder: "your@email.com"
   - Required: Yes
   - Validation: Email format

2. **Phone Number** (Text - Required)
   - Question: "What is your phone number?"
   - Placeholder: "(555) 123-4567"
   - Required: Yes

3. **Website** (Text - Optional)
   - Question: "What is your website URL?"
   - Placeholder: "https://yourprintshop.com"
   - Required: No

### Step 4: Section 3 - Location Information

**Add Section Header:** "Location Information"

1. **Street Address** (Text - Required)
   - Question: "Street address (number and name only)"
   - Placeholder: "275 Rue Notre-Dame Ouest"
   - Required: Yes

2. **Unit/Suite Number** (Text - Optional)
   - Question: "Unit or suite number (if applicable)"
   - Placeholder: "Unit 101, Suite A, etc."
   - Required: No

3. **City** (Text - Required)
   - Question: "City"
   - Placeholder: "Toronto"
   - Required: Yes

4. **Country** (Choice - Required)
   - Question: "Country"
   - Options:
     - Canada
     - United States
   - Required: Yes

5. **Province/State** (Choice - Required)
   - Question: "Province/State"
   - **For Canada:**
     - Alberta
     - British Columbia
     - Manitoba
     - New Brunswick
     - Newfoundland and Labrador
     - Nova Scotia
     - Ontario
     - Prince Edward Island
     - Quebec
     - Saskatchewan
     - Northwest Territories
     - Nunavut
     - Yukon
   - **For United States:** (Add all 50 states + DC)
   - Required: Yes

6. **Postal/ZIP Code** (Text - Required)
   - Question: "Postal code (Canada) or ZIP code (US)"
   - Placeholder: "K1A 0A6 or 12345"
   - Required: Yes

### Step 5: Section 4 - Business Hours

**Add Section Header:** "Business Hours"

For each day, create a **Choice** question with these options:
- Closed
- 6:00 AM - 2:00 PM
- 7:00 AM - 3:00 PM
- 8:00 AM - 4:00 PM
- 9:00 AM - 5:00 PM
- 10:00 AM - 6:00 PM
- 11:00 AM - 7:00 PM
- 12:00 PM - 8:00 PM
- Custom hours (please specify in Additional Information)

1. **Monday Hours** (Choice - Required)
2. **Tuesday Hours** (Choice - Required)
3. **Wednesday Hours** (Choice - Required)
4. **Thursday Hours** (Choice - Required)
5. **Friday Hours** (Choice - Required)
6. **Saturday Hours** (Choice - Required)
7. **Sunday Hours** (Choice - Required)

### Step 6: Section 5 - Products You Can Print

**Add Section Header:** "Products You Can Print"

Create **Multiple Choice** questions (allow multiple selections):

1. **Apparel** (Multiple Choice)
   - Question: "What apparel items can you print?"
   - Options:
     - T-Shirts
     - Hoodies
     - Sweatshirts
     - Tank Tops
     - Long Sleeves
     - Polo Shirts
     - Jackets
     - Hats/Caps
     - Tote Bags
     - Other Apparel

2. **Drinkware** (Multiple Choice)
   - Question: "What drinkware items can you print?"
   - Options:
     - Mugs
     - Water Bottles
     - Tumblers
     - Coffee Cups
     - Wine Glasses
     - Other Drinkware

3. **Home Decor** (Multiple Choice)
   - Question: "What home decor items can you print?"
   - Options:
     - Canvas Prints
     - Posters
     - Wall Art
     - Throw Pillows
     - Blankets
     - Phone Cases
     - Keychains
     - Stickers
     - Other Home Decor

### Step 7: Section 6 - Business Details

**Add Section Header:** "Business Details"

1. **Current Daily Capacity** (Choice - Optional)
   - Question: "What is your current daily printing capacity?"
   - Options:
     - 1-10 items per day
     - 11-25 items per day
     - 26-50 items per day
     - 51-100 items per day
     - 100+ items per day

2. **Years in Business** (Choice - Optional)
   - Question: "How many years have you been in business?"
   - Options:
     - Less than 1 year
     - 1-3 years
     - 4-7 years
     - 8-15 years
     - 15+ years

3. **Equipment & Technology** (Multiple Choice)
   - Question: "What equipment do you have?"
   - Options:
     - Screen Printing Press
     - DTG Printer
     - Heat Press
     - Embroidery Machine
     - Vinyl Cutter
     - Sublimation Printer
     - Large Format Printer
     - Laser Engraver
     - Automatic Press
     - Manual Press
     - Conveyor Dryer
     - Other Equipment

4. **Additional Information** (Long Text - Optional)
   - Question: "Tell us about your business goals, any questions you have, or anything else you'd like us to know"
   - Allow long answer: Yes

---

## 🔗 Embedding Microsoft Forms in Your Website

### Option 1: Direct Embed (Recommended)

1. **Get Embed Code from Microsoft Forms:**
   - Open your completed form in Microsoft Forms
   - Click **"Share"** button
   - Click **"Embed"**
   - Copy the iframe embed code

2. **Replace the HTML Form:**
   ```html
   <!-- Replace the entire form section with this iframe -->
   <div class="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 shadow-lg">
     <iframe 
       width="100%" 
       height="1200px" 
       frameborder="0" 
       marginheight="0" 
       marginwidth="0"
       src="YOUR_MS_FORMS_EMBED_URL_HERE"
       style="border-radius: 12px;">
       Loading…
     </iframe>
   </div>
   ```

3. **Responsive Styling:**
   ```css
   .ms-forms-container {
     position: relative;
     width: 100%;
     height: 0;
     padding-bottom: 75%; /* Adjust based on form height */
   }
   
   .ms-forms-container iframe {
     position: absolute;
     top: 0;
     left: 0;
     width: 100%;
     height: 100%;
     border-radius: 12px;
   }
   ```

### Option 2: Modal/Popup Integration

1. **Keep Current Design as Preview**
2. **Add "Fill Out Form" Button:**
   ```html
   <button 
     onclick="openMSForm()" 
     class="bg-primary-600 hover:bg-primary-700 text-white px-12 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center gap-2 mx-auto"
   >
     Complete Application Form
     <ArrowRight size={20} />
   </button>
   ```

3. **JavaScript to Open Form:**
   ```javascript
   function openMSForm() {
     window.open('YOUR_MS_FORMS_DIRECT_URL', '_blank', 'width=800,height=900,scrollbars=yes,resizable=yes');
   }
   ```

### Option 3: Redirect Integration

1. **Replace Form Submit Button:**
   ```html
   <a 
     href="YOUR_MS_FORMS_DIRECT_URL" 
     target="_blank"
     class="bg-primary-600 hover:bg-primary-700 text-white px-12 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center gap-2 mx-auto"
   >
     Complete Application
     <ArrowRight size={20} />
   </a>
   ```

---

## 📊 Microsoft Forms Response Management

### Setting Up Notifications

1. **Email Notifications:**
   - In Microsoft Forms, go to **"Responses"** tab
   - Click **"Get email notification of each response"**
   - Enable notifications for immediate response alerts

2. **Excel Integration:**
   - Click **"Open in Excel"** to create a connected spreadsheet
   - Responses will automatically populate in Excel Online
   - Set up Excel notifications for new rows

### Response Processing Workflow

1. **Immediate Response:**
   - Set up auto-reply email in Microsoft Forms
   - Message: "Thank you for your interest in joining the DIY Label network! We've received your application and will contact you within 24 hours to discuss partnership opportunities."

2. **Internal Processing:**
   - Export responses to Excel for review
   - Use Excel filters to prioritize by location, capacity, experience
   - Track follow-up status in additional columns

---

## 🔄 Advanced Integration Options

### Option A: Microsoft Power Automate Integration

1. **Create Flow in Power Automate:**
   - Trigger: "When a new response is submitted" (Microsoft Forms)
   - Actions:
     - Send email notification to your team
     - Add response to SharePoint list
     - Create task in Microsoft Planner
     - Send follow-up email to applicant

2. **Data Processing:**
   - Parse form responses
   - Geocode addresses using Mapbox API
   - Calculate distance from existing print shops
   - Assign priority scores based on location/capacity

### Option B: Webhook Integration

1. **Set up Power Automate webhook:**
   - Create HTTP trigger in Power Automate
   - Configure to send form data to your Netlify function

2. **Create Netlify Function:**
   ```javascript
   // netlify/functions/ms-forms-webhook.js
   exports.handler = async (event, context) => {
     const formData = JSON.parse(event.body);
     
     // Process form submission
     // Add to Supabase database
     // Send notifications
     // Trigger follow-up workflows
     
     return {
       statusCode: 200,
       body: JSON.stringify({ success: true })
     };
   };
   ```

---

## 🎨 Styling Microsoft Forms to Match Your Brand

### Custom Themes

1. **In Microsoft Forms:**
   - Click **"Theme"** button
   - Choose **"Custom"**
   - Upload your brand colors:
     - Primary: `#0ea5e9` (your primary-500)
     - Secondary: `#f37316` (your accent-500)

2. **Header Image:**
   - Upload DIY Label logo or branded header
   - Recommended size: 1200x300px

### CSS Customization (Limited)

Microsoft Forms has limited CSS customization, but you can:
- Choose colors that match your brand
- Add a custom header image
- Select fonts that complement your website

---

## 📧 Email Templates for Follow-up

### Auto-Reply Template
```
Subject: Welcome to DIY Label - Application Received

Hi [Contact Person],

Thank you for your interest in joining the DIY Label network!

We've received your application for [Business Name] and are excited about the possibility of partnering with you.

What happens next:
✅ Our team will review your application within 24 hours
✅ We'll contact you to discuss partnership details
✅ If approved, we'll help you get set up in our system

Questions? Reply to this email or call us at (613) 555-0123.

Best regards,
The DIY Label Team
```

### Internal Notification Template
```
Subject: New Print Shop Application - [Business Name] in [City]

New partnership application received:

Business: [Business Name]
Contact: [Contact Person] ([Email])
Location: [City], [Province]
Capacity: [Daily Capacity]
Experience: [Years in Business]
Specialties: [Selected Product Types]

Review application: [Link to Excel/SharePoint]
```

---

## 🔗 Implementation Steps

### Quick Implementation (Recommended)

1. **Create the Microsoft Form** using the structure above
2. **Get the embed code** from Microsoft Forms
3. **Replace the current form** in `/app/join/components/JoinPage.tsx`:

```tsx
// Replace the entire form section with:
<div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 shadow-lg">
  <iframe 
    width="100%" 
    height="1200px" 
    frameBorder="0" 
    marginHeight="0" 
    marginWidth="0"
    src="YOUR_MS_FORMS_EMBED_URL_HERE"
    className="rounded-lg"
  >
    Loading form...
  </iframe>
</div>
```

### Advanced Implementation

1. **Create the Microsoft Form**
2. **Set up Power Automate workflow**
3. **Create webhook endpoint** in your Netlify functions
4. **Add form data to Supabase** for internal tracking
5. **Integrate with your existing notification system**

---

## 📱 Mobile Optimization

Microsoft Forms is automatically mobile-responsive, but ensure:

1. **Test on mobile devices** after embedding
2. **Adjust iframe height** if needed for mobile
3. **Consider using modal popup** on mobile for better UX

---

## 🔒 Security & Privacy

### Data Protection

1. **Microsoft Forms Security:**
   - Data stored in Microsoft 365 tenant
   - GDPR compliant
   - Enterprise-grade security

2. **Privacy Settings:**
   - Set form to **"Only people in my organization"** if you want restricted access
   - Or keep **"Anyone can respond"** for public applications

### Data Retention

1. **Export responses regularly** to your own systems
2. **Set up automated backups** via Power Automate
3. **Comply with local privacy laws** (PIPEDA in Canada, etc.)

---

## 🧪 Testing Checklist

Before going live:

- [ ] Test form submission end-to-end
- [ ] Verify all conditional logic works
- [ ] Test email notifications
- [ ] Check mobile responsiveness
- [ ] Verify data exports to Excel
- [ ] Test webhook integration (if using)
- [ ] Confirm auto-reply emails work
- [ ] Test form on different browsers

---

## 📞 Support & Troubleshooting

### Common Issues

1. **Form not loading:** Check iframe src URL and permissions
2. **Conditional logic not working:** Verify question dependencies in MS Forms
3. **Notifications not sending:** Check Power Automate flow status
4. **Mobile display issues:** Adjust iframe height and CSS

### Getting Help

- **Microsoft Forms Support:** [Microsoft Support](https://support.microsoft.com/forms)
- **Power Automate Documentation:** [Power Platform Documentation](https://docs.microsoft.com/power-automate/)

---

## 🚀 Next Steps

1. **Create the Microsoft Form** using this guide
2. **Test thoroughly** with sample data
3. **Replace the current HTML form** with the embed code
4. **Set up response processing** workflow
5. **Monitor submissions** and optimize as needed

**Estimated Setup Time:** 2-3 hours for basic implementation, 4-6 hours for advanced integration with Power Automate.