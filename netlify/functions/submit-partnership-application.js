const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client using environment variables
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables');
}

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

exports.handler = async (event, context) => {
  // CORS headers for cross-origin requests
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
    'Access-Control-Max-Age': '86400',
  };

  console.log('Partnership application submission started:', {
    method: event.httpMethod,
    headers: event.headers
  });

  // Handle OPTIONS preflight request
  if (event.httpMethod === 'OPTIONS') {
    console.log('Handling OPTIONS preflight request');
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: ''
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    console.log('Method not allowed:', event.httpMethod);
    return {
      statusCode: 405,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const body = JSON.parse(event.body);
    console.log('Partnership application data received:', {
      businessName: body.businessName,
      email: body.email,
      city: body.city,
      province: body.province
    });

    const {
      businessName,
      contactName,
      businessType,
      ownershipRole,
      email,
      phone,
      website,
      address,
      unitNumber,
      city,
      country,
      province,
      postalCode,
      businessHours,
      clothingTypes,
      currentCapacity,
      experience,
      equipment,
      additionalInfo
    } = body;

    // Validate required fields
    const requiredFields = {
      businessName,
      contactName,
      businessType,
      email,
      phone,
      address,
      city,
      country,
      province,
      postalCode
    };

    const missingFields = Object.entries(requiredFields)
      .filter(([key, value]) => !value || value.trim() === '')
      .map(([key]) => key);

    if (missingFields.length > 0) {
      console.log('Missing required fields:', missingFields);
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ 
          error: 'Missing required fields',
          missingFields: missingFields
        })
      };
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'Invalid email format' })
      };
    }

    // Check if email already exists
    const { data: existingApplication } = await supabaseAdmin
      .from('partnership_applications')
      .select('id, email')
      .eq('email', email)
      .single();

    if (existingApplication) {
      console.log('Duplicate email found:', email);
      return {
        statusCode: 409,
        headers: corsHeaders,
        body: JSON.stringify({ 
          error: 'An application with this email already exists',
          existingApplicationId: existingApplication.id
        })
      };
    }

    // Prepare data for database insertion
    const applicationData = {
      business_name: businessName.trim(),
      contact_name: contactName.trim(),
      business_type: businessType,
      ownership_role: ownershipRole || null,
      email: email.toLowerCase().trim(),
      phone: phone.trim(),
      website: website?.trim() || null,
      street_address: address.trim(),
      unit_number: unitNumber?.trim() || null,
      city: city.trim(),
      country: country,
      province: province,
      postal_code: postalCode.trim().toUpperCase(),
      business_hours: businessHours || {},
      products_offered: clothingTypes || [],
      daily_capacity: currentCapacity || null,
      years_experience: experience || null,
      equipment: equipment || [],
      additional_info: additionalInfo?.trim() || null,
      application_status: 'pending'
    };

    console.log('Inserting partnership application into database...');

    // Insert the application into the database
    const { data: application, error: insertError } = await supabaseAdmin
      .from('partnership_applications')
      .insert(applicationData)
      .select()
      .single();

    if (insertError) {
      console.error('Database insertion error:', insertError);
      return {
        statusCode: 500,
        headers: corsHeaders,
        body: JSON.stringify({ 
          error: 'Failed to save application',
          details: insertError.message
        })
      };
    }

    console.log('Partnership application created successfully:', application.id);

    // TODO: Send confirmation email to applicant
    // TODO: Send notification email to DIY Label team
    // TODO: Add to CRM or notification system

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders
      },
      body: JSON.stringify({
        success: true,
        application: {
          id: application.id,
          businessName: application.business_name,
          email: application.email,
          status: application.application_status,
          submittedAt: application.created_at
        },
        message: 'Partnership application submitted successfully! We\'ll contact you within 24 hours.'
      })
    };

  } catch (error) {
    console.error('Error processing partnership application:', error);
    
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      })
    };
  }
};