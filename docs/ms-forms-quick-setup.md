# Microsoft Forms Quick Setup Guide for DIY Label Partnership Form

This guide provides the fastest way to recreate the DIY Label print shop partnership form using Microsoft Forms import functionality.

## 🚀 Quick Setup (15 minutes total)

### Step 1: Download the Template (1 minute)
1. Download the CSV template file: `DIY_Label_Partnership_Form_Template.csv`
2. Save it to your computer

### Step 2: Import to Microsoft Forms (5 minutes)
1. Go to [Microsoft Forms](https://forms.microsoft.com)
2. Click **"New Form"**
3. Click **"Import from Excel"** (or look for import option)
4. Upload the `DIY_Label_Partnership_Form_Template.csv` file
5. Microsoft Forms will automatically create all 25+ fields

### Step 3: Customize the Generated Form (5 minutes)
After import, make these quick adjustments:

1. **Set Form Title:** "DIY Label Print Shop Partnership Application"
2. **Set Description:** "Join our network of local print shops and start receiving orders from nearby Shopify stores. We'll contact you within 24 hours to discuss partnership opportunities."
3. **Add conditional logic:** Make "Your Role" field only show when Business Type = "Franchise" or "Chain Store"
4. **Set theme colors** to match DIY Label brand:
   - Primary: `#0ea5e9`
   - Accent: `#f37316`

### Step 4: Get Embed Code (2 minutes)
1. Click **"Share"** in Microsoft Forms
2. Click **"Embed"**
3. Copy the iframe embed code
4. Note down the direct form URL

### Step 5: Replace HTML Form (2 minutes)
Replace the current form in your website with one of these options:

#### Option A: Direct Embed (Recommended)
```tsx
// In app/join/components/JoinPage.tsx, replace the form section with:
<div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 shadow-lg">
  <iframe 
    width="100%" 
    height="1400px" 
    frameBorder="0" 
    marginHeight="0" 
    marginWidth="0"
    src="YOUR_MS_FORMS_EMBED_URL_HERE"
    className="rounded-lg"
    title="DIY Label Partnership Application"
  >
    Loading form...
  </iframe>
</div>
```

#### Option B: Button Redirect
```tsx
// Replace the submit button with:
<a 
  href="YOUR_MS_FORMS_DIRECT_URL" 
  target="_blank"
  className="bg-primary-600 hover:bg-primary-700 text-white px-12 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center gap-2 mx-auto"
>
  Complete Application Form
  <ArrowRight size={20} />
</a>
```

---

## 📋 Form Fields Included in Template

The CSV template includes all these fields ready for import:

### Business Information (4 fields)
- Business Name (Text, Required)
- Contact Person (Text, Required)  
- Business Type (Choice, Required)
- Your Role (Choice, Conditional)

### Contact Information (3 fields)
- Email Address (Text, Required)
- Phone Number (Text, Required)
- Website (Text, Optional)

### Location Information (6 fields)
- Street Address - Number & Name (Text, Required)
- Unit/Suite Number (Text, Optional)
- City (Text, Required)
- Country (Choice, Required)
- Province/State (Choice, Required) - All Canadian provinces and US states included
- Postal/ZIP Code (Text, Required)

### Business Hours (7 fields)
- Monday through Sunday Hours (Choice fields with common time ranges)

### Products You Can Print (3 categories)
- **Apparel Products** (Multiple Choice) - 10 options including T-Shirts, Hoodies, etc.
- **Drinkware Products** (Multiple Choice) - 6 options including Mugs, Water Bottles, etc.
- **Home Decor Products** (Multiple Choice) - 9 options including Canvas Prints, Posters, etc.

### Business Details (4 fields)
- Current Daily Capacity (Choice)
- Years in Business (Choice)
- Equipment & Technology (Multiple Choice) - 12 equipment options
- Additional Information (Long Text)

---

## 🎯 Import Tips

### If Import Doesn't Work Perfectly:
1. **Open CSV in Excel first** - Sometimes Excel formatting helps
2. **Save as .xlsx** - Try Excel format instead of CSV
3. **Manual backup** - Use the detailed guide in `ms-forms-integration.md` if import fails

### Common Import Issues:
- **Multiple Choice fields** might import as single choice - easily fixed by changing field type
- **Conditional logic** needs to be added manually after import
- **Field validation** (like email format) needs to be set after import

---

## 📞 Support

If you encounter issues:
1. **Check the detailed guide** in `docs/ms-forms-integration.md`
2. **Microsoft Forms Help** - Built-in help system in Microsoft Forms
3. **Template issues** - The CSV structure follows Microsoft's import format

---

**Estimated Total Time: 15 minutes to have a fully functional Microsoft Form**

This is significantly faster than the 2-3 hours it would take to create manually!