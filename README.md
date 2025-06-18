# DIY Label (diylabel.com) – Landing Page

Welcome to the landing page for **DIY Label**, a platform that connects creators, local print shops, and Shopify store owners in a sustainable merch ecosystem.

🌍 **Local Print, Global Reach.**  
We empower independent design and reduce textile waste by helping store owners offer locally printed merch — all while supporting nearby businesses.

---

## 🎯 Target Audience

This site is built to engage:
- **Shopify store owners** looking to add eco-conscious merch with a local-first approach
- **Local print shops** interested in receiving on-demand fulfillment orders from nearby customers and stores

---

## 🗺️ Key Feature – Interactive Map

The landing page features an **IP-based interactive map** that:
- Detects visitor location
- Displays nearby verified **local print shops**
- Switches map style between **dark/light modes** based on system or user preference

---

## 🧱 Tech Stack

| Layer                 | Tech                         |
|-----------------------|------------------------------|
| **Framework**         | [Next.js](https://nextjs.org) |
| **Styling**           | [Tailwind CSS](https://tailwindcss.com) |
| **Map Provider**      | [Mapbox GL JS](https://docs.mapbox.com/mapbox-gl-js/) with light/dark mode support |
| **Deployment**        | [Netlify](https://www.netlify.com) (via GitHub integration) |
| **Functions (Serverless)** | Netlify Functions (Node.js)        |
| **Theme Switching**   | [next-themes](https://github.com/pacocoursey/next-themes) |
| **Hosting & CI/CD**   | Netlify via GitHub integration |

---

## 🧪 Local Development

```bash
git clone https://github.com/DIY-Label/landing-page.git
cd landing-page
npm install
npm run dev
```

### Environment Variables

Create a `.env.local` file in the root directory:

```bash
NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=your_mapbox_token_here
```

---

## 🚀 Deployment to Netlify

### Setting Environment Variables

1. Go to your Netlify dashboard
2. Select your site
3. Go to **Site settings** → **Environment variables**
4. Add the following environment variable:
   - **Key**: `NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN`
   - **Value**: Your Mapbox access token

### Getting a Mapbox Token

1. Sign up at [Mapbox](https://www.mapbox.com/)
2. Go to your [Account page](https://account.mapbox.com/)
3. Copy your **Default public token** or create a new one
4. Add this token to both your local `.env.local` file and Netlify environment variables

### Build Settings

Netlify should automatically detect these settings, but verify:
- **Build command**: `npm run build`
- **Publish directory**: `.next`
- **Node version**: 18.x or higher

---

## 📝 Notes

- The map will show a fallback message if no Mapbox token is provided
- All environment variables starting with `NEXT_PUBLIC_` are exposed to the browser
- Make sure to keep your Mapbox token secure and don't commit it to version control