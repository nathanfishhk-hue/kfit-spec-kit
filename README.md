# KFIT PERSELLO'S FITNESS CENTRE - Spec Kit

A premium fitness center platform with immersive 3D experience, Supabase authentication, and PayFast payments.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## 🏗️ Architecture

### Tech Stack
- **Next.js 14** - App Router, Server Actions
- **Three.js** - 3D hero with animated spheres
- **Framer Motion + GSAP** - Cinematic animations
- **Lenis** - Smooth scrolling
- **@react-three/fiber + drei** - 3D integration
- **Supabase** - Auth & PostgreSQL DB
- **PayFast** - South African payments

### Project Structure
```
/app          - Next.js pages
/components   - React components
  /layout     - Layout components
  /three      - Three.js scenes
/lib          - Utilities & integrations
/public       - Static assets
/styles       - Global styles
```

## 🔧 Setup

### 1. Supabase
Create a project at supabase.com and run the SQL from SPEC-KIT.md to create tables.

### 2. Environment Variables
```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
PAYFAST_MERCHANT_ID=
PAYFAST_MERCHANT_KEY=
PAYFAST_PASSPHRASE=
```

### 3. Deploy to Vercel
```bash
npm i -g vercel
vercel
```

## 🎨 Design
- Cinematic bold typography
- Orange/black color scheme
- Micro-interactions on all elements
- 3D animated hero section
- Video background support

## 📱 Features
- Landing page with 3D hero
- Supabase email/password auth
- Member dashboard (bookings, payments, profile)
- Admin dashboard (stats, member management)
- PayFast payment integration with ITN
- Class booking system
- 4 membership tier options