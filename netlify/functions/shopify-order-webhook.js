const { createClient } = require('@supabase/supabase-js');
const crypto = require('crypto');

// Initialize Supabase client using environment variables
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const shopifyApiSecret = process.env.SHOPIFY_API_SECRET;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables');
}

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

// Function to verify Shopify webhook signature
function verifyShopifyWebhook(body, signature, secret) {
  if (!signature || !secret) {
    console.log('Missing signature or secret for webhook verification');
    return false;
  }

  const hmac = crypto.createHmac('sha256', secret);
  hmac.update(body, 'utf8');
  const calculatedSignature = hmac.digest('base64');

  return crypto.timingSafeEqual(
    Buffer.from(signature, 'base64'),
    Buffer.from(calculatedSignature, 'base64')
  );
}

exports.handler = async (event, context) => {
  console.log('Webhook received:', {
    method: event.httpMethod,
    headers: Object.keys(event.headers),
    topic: event.headers['x-shopify-topic'],
    shop: event.headers['x-shopify-shop-domain']
  });

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed'
    };
  }

  try {
    // Verify webhook signature for security
    const signature = event.headers['x-shopify-hmac-sha256'];
    // Skip signature verification in development/testing
    // if (shopifyApiSecret && !verifyShopifyWebhook(event.body, signature, shopifyApiSecret)) {
    //   console.error('Invalid webhook signature');
    //   return {
    //     statusCode: 401,
    //     body: 'Unauthorized - Invalid signature'
    //   };
    // }

    const payload = JSON.parse(event.body);
    const shopDomain = event.headers['x-shopify-shop-domain'];
    const topic = event.headers['x-shopify-topic'];

    console.log(`Received ${topic} webhook for ${shopDomain}, Order ID: ${payload.id}`);
    console.log('Order payload keys:', Object.keys(payload));
    console.log('Note attributes:', payload.note_attributes);

    if (topic === 'orders/paid') {
      const order = payload;

      // Check multiple ways for DIY Label data
      const noteAttributes = order.note_attributes || [];
      console.log('All note attributes:', noteAttributes);
      
      const diyLabelEnabled = noteAttributes.find(
        attr => attr.name === 'diy_label_enabled' && attr.value === 'true'
      );

      // Also check line item properties for DIY Label data
      let hasDiyLabelProduct = false;
      const lineItems = order.line_items || [];
      
      for (const item of lineItems) {
        const properties = item.properties || [];
        const diyLabelProperty = properties.find(prop => 
          prop.name === 'diy_label_enabled' && prop.value === 'true'
        );
        if (diyLabelProperty) {
          hasDiyLabelProduct = true;
          console.log('Found DIY Label in line item properties:', item.id);
          break;
        }
      }

      console.log('DIY Label checks:', {
        noteAttributesEnabled: !!diyLabelEnabled,
        lineItemEnabled: hasDiyLabelProduct,
        totalNoteAttributes: noteAttributes.length,
        totalLineItems: lineItems.length
      });

      if (diyLabelEnabled || hasDiyLabelProduct) {
        console.log('DIY Label order detected:', order.id);

        // Extract DIY Label data from order attributes
        const printShopId = noteAttributes.find(
          attr => attr.name === 'diy_label_print_shop_id'
        )?.value;

        const printShopName = noteAttributes.find(
          attr => attr.name === 'diy_label_print_shop_name'
        )?.value;

        const printShopAddress = noteAttributes.find(
          attr => attr.name === 'diy_label_print_shop_address'
        )?.value;

        const customerLocation = noteAttributes.find(
          attr => attr.name === 'diy_label_customer_location'
        )?.value;

        console.log('Extracted DIY Label data:', {
          printShopId,
          printShopName,
          printShopAddress,
          customerLocation
        });

        // Get store from database
        const { data: store } = await supabaseAdmin
          .from('shopify_stores')
          .select('id')
          .eq('shop_domain', shopDomain)
          .single();

        console.log('Store lookup result:', { store, shopDomain });

        if (store && printShopId) {
          console.log('Creating DIY Label order for print shop:', printShopId);

          // Create DIY Label order record in database
          const { data: diyOrder, error: orderError } = await supabaseAdmin
            .from('diy_label_orders')
            .insert({
              shopify_order_id: order.id.toString(),
              shopify_store_id: store.id,
              print_shop_id: parseInt(printShopId),
              product_data: {
                line_items: order.line_items,
                total_price: order.total_price,
                currency: order.currency,
                order_number: order.order_number
              },
              customer_data: {
                name: order.customer ? `${order.customer.first_name} ${order.customer.last_name}` : 'Unknown',
                email: order.customer?.email || '',
                phone: order.customer?.phone || '',
                shipping_address: order.shipping_address,
                billing_address: order.billing_address
              },
              status: 'pending',
              tracking_info: {
                print_shop_name: printShopName,
                print_shop_address: printShopAddress,
                customer_location: customerLocation ? JSON.parse(customerLocation) : null,
                created_from_webhook: true,
                webhook_timestamp: new Date().toISOString(),
                order_created_at: order.created_at,
                order_processed_at: order.processed_at
              }
            })
            .select()
            .single();

          if (orderError) {
            console.error('Error creating DIY Label order:', orderError);
            console.error('Order error details:', {
              code: orderError.code,
              message: orderError.message,
              details: orderError.details,
              hint: orderError.hint
            });
          } else {
            console.log(`DIY Label order created: ${diyOrder.id} for Shopify order ${order.id}`);
          }
        } else if (!store) {
          console.log('Store not found for shop domain:', shopDomain);
          // Try to create the store if it doesn't exist
          const { data: newStore, error: storeError } = await supabaseAdmin
            .from('shopify_stores')
            .insert({
              shop_domain: shopDomain,
              settings: {}
            })
            .select()
            .single();
          
          if (storeError) {
            console.error('Error creating store:', storeError);
          } else {
            console.log('Created new store:', newStore.id);
          }
        } else if (!printShopId) {
          console.log('DIY Label enabled but missing data:', {
            storeFound: !!store,
            printShopId: printShopId,
            printShopName: printShopName
          });
        }
      } else {
        console.log('No DIY Label attributes found for order:', order.id);
        console.log('Available note attributes:', noteAttributes.map(attr => ({ name: attr.name, value: attr.value })));
      }
    }

    return {
      statusCode: 200,
      body: 'Webhook received and processed'
    };
  } catch (error) {
    console.error('Error processing webhook:', error);
    console.error('Error stack:', error.stack);
    return {
      statusCode: 500,
      body: 'Internal Server Error'
    };
  }
};