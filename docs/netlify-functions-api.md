# DIY Label Netlify Functions API

This document describes the Netlify Functions that provide API endpoints for the DIY Label Shopify integration.

## 📡 Available Endpoints

### **Nearby Print Shops**
```
GET https://YOUR_SITE_NAME.netlify.app/.netlify/functions/nearby-shops
```
**Query Parameters:**
- `lat` (required): Latitude
- `lng` (required): Longitude  
- `radius` (optional): Search radius in km (default: 25)

**Example:**
```
https://YOUR_SITE_NAME.netlify.app/.netlify/functions/nearby-shops?lat=37.7749&lng=-122.4194&radius=25
```

### **Create DIY Label Order**
```
POST https://YOUR_SITE_NAME.netlify.app/.netlify/functions/diy-label-order
```
**Body:**
```json
{
  "shopifyOrderId": "order-123",
  "shopDomain": "store.myshopify.com",
  "printShopId": 1,
  "productData": { "title": "T-Shirt", "total": 25.00 },
  "customerData": { "name": "John Doe", "email": "john@example.com" }
}
```

### **Shopify Order Webhook**
```
POST https://YOUR_SITE_NAME.netlify.app/.netlify/functions/shopify-order-webhook
```
Configure this URL in your Shopify Partners Dashboard for the `orders/paid` webhook.

### **Widget Data**
```
GET https://YOUR_SITE_NAME.netlify.app/.netlify/functions/widget-data
```
**Query Parameters:**
- `shop` (required): Shop domain
- `product` (optional): Product ID
- `lat` (optional): Latitude
- `lng` (optional): Longitude
- `radius` (optional): Search radius

## 🔗 Clean URLs

You can also use these cleaner URLs thanks to redirects:

- `/api/print-shops/nearby` → `/.netlify/functions/nearby-shops`
- `/api/orders/diy-label` → `/.netlify/functions/diy-label-order`
- `/webhooks/orders/paid` → `/.netlify/functions/shopify-order-webhook`
- `/api/widget-data` → `/.netlify/functions/widget-data`

## 🔧 Environment Variables

Set these in your Netlify dashboard under Site settings → Environment variables:

| Variable | Description |
|----------|-------------|
| `VITE_SUPABASE_URL` | Your Supabase project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (keep secret!) |
| `VITE_MAPBOX_TOKEN` | Mapbox access token for maps |
| `SHOPIFY_API_SECRET` | For webhook signature verification |

## 🧪 Testing

### Test Nearby Shops
```bash
curl "https://YOUR_SITE_NAME.netlify.app/.netlify/functions/nearby-shops?lat=37.7749&lng=-122.4194&radius=25"
```

### Test Order Creation
```bash
curl -X POST "https://YOUR_SITE_NAME.netlify.app/.netlify/functions/diy-label-order" \
  -H "Content-Type: application/json" \
  -d '{
    "shopifyOrderId": "test-123",
    "shopDomain": "test-store.myshopify.com",
    "printShopId": 1,
    "productData": {"title": "Test Product", "total": 25.00},
    "customerData": {"name": "Test User", "email": "test@example.com"}
  }'
```

## 🔒 Security Notes

1. **Environment Variables**: Never commit secrets. All sensitive data should be set in Netlify's dashboard.
2. **Webhook Verification**: The webhook function includes HMAC signature verification for security.
3. **CORS**: All functions include proper CORS headers for cross-origin requests.

---

**Replace `YOUR_SITE_NAME` with your actual Netlify site name throughout this documentation.**