# Supabase Partnership Application Setup

This guide explains how the Supabase-based partnership application system works and how to manage applications.

## 🗄️ Database Structure

### Partnership Applications Table

The `partnership_applications` table stores all print shop partnership applications with these fields:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | uuid | Auto | Primary key |
| `business_name` | text | Yes | Name of the print shop |
| `contact_name` | text | Yes | Main contact person |
| `business_type` | text | Yes | independent/franchise/chain |
| `ownership_role` | text | No | Role in business (conditional) |
| `email` | text | Yes | Contact email (unique) |
| `phone` | text | Yes | Contact phone number |
| `website` | text | No | Business website URL |
| `street_address` | text | Yes | Street address |
| `unit_number` | text | No | Unit/suite number |
| `city` | text | Yes | City name |
| `country` | text | Yes | CA or US |
| `province` | text | Yes | Province/state code |
| `postal_code` | text | Yes | Postal/ZIP code |
| `business_hours` | jsonb | No | Weekly schedule object |
| `products_offered` | text[] | No | Array of product types |
| `daily_capacity` | text | No | Production capacity range |
| `years_experience` | text | No | Years in business |
| `equipment` | text[] | No | Array of equipment types |
| `additional_info` | text | No | Free-form additional details |
| `application_status` | text | Auto | pending/under_review/approved/rejected |
| `reviewed_at` | timestamptz | No | When application was reviewed |
| `reviewed_by` | text | No | Who reviewed the application |
| `notes` | text | No | Internal review notes |
| `created_at` | timestamptz | Auto | Application submission time |
| `updated_at` | timestamptz | Auto | Last update time |

## 🔐 Security & Permissions

### Row Level Security (RLS)
- **Public Insert**: Anyone can submit a partnership application
- **Authenticated Read**: Only authenticated users can view applications
- **Authenticated Update**: Only authenticated users can update application status

### Data Validation
- Email format validation
- Duplicate email prevention
- Required field validation
- Enum constraints for business_type, ownership_role, etc.

## 📡 API Endpoint

### Submit Partnership Application
```
POST /.netlify/functions/submit-partnership-application
```

**Request Body:**
```json
{
  "businessName": "Capital Print Co.",
  "contactName": "John Smith",
  "businessType": "independent",
  "email": "john@capitalprint.com",
  "phone": "(613) 555-0123",
  "website": "https://capitalprint.com",
  "address": "123 Bank St",
  "unitNumber": "Suite 200",
  "city": "Ottawa",
  "country": "CA",
  "province": "ON",
  "postalCode": "K1P 1A1",
  "businessHours": {
    "monday": { "open": "09:00", "close": "17:00", "closed": false },
    "tuesday": { "open": "09:00", "close": "17:00", "closed": false }
  },
  "clothingTypes": ["T-Shirts", "Hoodies", "Business Cards"],
  "currentCapacity": "26-50",
  "experience": "8-15",
  "equipment": ["Screen Printing Press", "DTG Printer"],
  "additionalInfo": "Specializing in eco-friendly materials..."
}
```

**Success Response:**
```json
{
  "success": true,
  "application": {
    "id": "uuid-here",
    "businessName": "Capital Print Co.",
    "email": "john@capitalprint.com",
    "status": "pending",
    "submittedAt": "2025-01-18T15:30:00Z"
  },
  "message": "Partnership application submitted successfully! We'll contact you within 24 hours."
}
```

## 🔍 Viewing Applications

### Option 1: Supabase Dashboard
1. Go to your Supabase project dashboard
2. Navigate to **Table Editor**
3. Select **partnership_applications** table
4. View, filter, and export applications

### Option 2: Custom Admin Dashboard
Create a simple admin page to view applications:

```tsx
// Example admin component
const PartnershipApplications = () => {
  const [applications, setApplications] = useState([])
  
  useEffect(() => {
    // Fetch applications from Supabase
    const fetchApplications = async () => {
      const { data } = await supabase
        .from('partnership_applications')
        .select('*')
        .order('created_at', { ascending: false })
      
      setApplications(data || [])
    }
    
    fetchApplications()
  }, [])
  
  return (
    <div className="space-y-4">
      {applications.map(app => (
        <div key={app.id} className="bg-white p-6 rounded-lg shadow">
          <h3 className="font-semibold">{app.business_name}</h3>
          <p>{app.contact_name} - {app.email}</p>
          <p>{app.city}, {app.province}</p>
          <span className={`px-2 py-1 rounded text-sm ${
            app.application_status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
            app.application_status === 'approved' ? 'bg-green-100 text-green-800' :
            'bg-red-100 text-red-800'
          }`}>
            {app.application_status}
          </span>
        </div>
      ))}
    </div>
  )
}
```

## 📧 Email Notifications (Future Enhancement)

You can add email notifications by:

1. **Using Supabase Edge Functions** to send emails
2. **Integrating with email services** like SendGrid, Mailgun, or Resend
3. **Setting up webhooks** to external notification systems

Example email notification function:
```sql
-- Database trigger to send email on new application
CREATE OR REPLACE FUNCTION notify_new_partnership_application()
RETURNS TRIGGER AS $$
BEGIN
  -- Call edge function to send notification email
  PERFORM net.http_post(
    url := 'https://your-project.supabase.co/functions/v1/send-partnership-notification',
    headers := '{"Content-Type": "application/json", "Authorization": "Bearer ' || current_setting('app.service_role_key') || '"}'::jsonb,
    body := json_build_object(
      'application_id', NEW.id,
      'business_name', NEW.business_name,
      'contact_name', NEW.contact_name,
      'email', NEW.email,
      'city', NEW.city,
      'province', NEW.province
    )::text
  );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger
CREATE TRIGGER on_partnership_application_created
  AFTER INSERT ON partnership_applications
  FOR EACH ROW
  EXECUTE FUNCTION notify_new_partnership_application();
```

## 🔄 Application Workflow

1. **Submission** - Form data saved to `partnership_applications` table
2. **Auto-confirmation** - Success message shown to applicant
3. **Internal notification** - Team notified of new application
4. **Review process** - Admin updates `application_status` and adds `notes`
5. **Follow-up** - Contact applicant based on review outcome

## 📊 Reporting & Analytics

Query examples for common reports:

```sql
-- Applications by status
SELECT application_status, COUNT(*) 
FROM partnership_applications 
GROUP BY application_status;

-- Applications by location
SELECT province, city, COUNT(*) 
FROM partnership_applications 
GROUP BY province, city 
ORDER BY COUNT(*) DESC;

-- Recent applications (last 30 days)
SELECT business_name, contact_name, city, province, created_at
FROM partnership_applications 
WHERE created_at >= NOW() - INTERVAL '30 days'
ORDER BY created_at DESC;

-- Equipment analysis
SELECT unnest(equipment) as equipment_type, COUNT(*)
FROM partnership_applications
WHERE equipment IS NOT NULL
GROUP BY equipment_type
ORDER BY COUNT(*) DESC;
```

## 🛠️ Maintenance

### Regular Tasks
- **Review pending applications** weekly
- **Update application status** as you process them
- **Export data** for external CRM systems if needed
- **Monitor for duplicate emails** or suspicious submissions

### Data Cleanup
```sql
-- Remove old rejected applications (optional)
DELETE FROM partnership_applications 
WHERE application_status = 'rejected' 
AND created_at < NOW() - INTERVAL '1 year';
```

This Supabase-based system gives you complete control over the partnership application process while maintaining all the functionality of the original form.