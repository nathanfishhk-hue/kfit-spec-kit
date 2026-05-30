# KFIT PERSELLO'S FITNESS CENTRE - SPEC-KIT

## Project Overview
Complete fitness center management platform with cinematic 3D landing, Supabase auth, PayFast payments, and immersive UI/UX.

## Technology Stack
- **Framework**: Next.js 14 (App Router)
- **Styling**: TailwindCSS + SHADCN UI
- **Animation**: Framer Motion + GSAP + Lenis
- **3D**: Three.js + React Three Fiber + Drei
- **Auth**: Supabase Auth
- **Database**: Supabase PostgreSQL
- **Payments**: PayFast (South Africa)
- **Deployment**: Vercel

---

## DATABASE SCHEMA (Supabase)

### Users Table
```sql
create table users (
  id uuid references auth.users primary key,
  email text unique,
  full_name text,
  phone text,
  role text check (role in ('member', 'admin', 'trainer')) default 'member',
  membership_type text check (membership_type in ('month_to_month', '3_month', '6_month', '12_month')),
  membership_start timestamp,
  membership_end timestamp,
  created_at timestamp default now()
);
```

### Classes Table
```sql
create table classes (
  id uuid primary key default uuid_generate_v4(),
  name text,
  description text,
  trainer_id uuid references users,
  trainer_name text,
  day_of_week text,
  start_time time,
  duration integer,
  capacity integer,
  created_at timestamp default now()
);
```

### Bookings Table
```sql
create table bookings (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users,
  class_id uuid references classes,
  booking_date date,
  status text check (status in ('booked', 'cancelled', 'completed')) default 'booked',
  created_at timestamp default now()
);
```

### Payments Table
```sql
create table payments (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users,
  amount decimal,
  payment_method text,
  status text check (status in ('pending', 'completed', 'failed')) default 'pending',
  payfast_payment_id text,
  created_at timestamp default now()
);
```

---

## ENVIRONMENT VARIABLES (.env.local)

```
NEXT_PUBLIC_SUPABASE_URL=https://[project].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[anon-key]
SUPABASE_SERVICE_ROLE_KEY=[service-role-key]
PAYFAST_MERCHANT_ID=[merchant-id]
PAYFAST_MERCHANT_KEY=[merchant-key]
PAYFAST_PASSPHRASE=[optional-passphrase]
```

---

## COMPONENT ARCHITECTURE

### Layout Components (`components/layout/`)
- `layout.tsx` - Main layout wrapper with navbar
- `navbar.tsx` - Responsive navigation with GSAP animations

### Three.js Components (`components/three/`)
- `hero-3d.tsx` - Animated 3D hero with distorting spheres
- `gym-scene.tsx` - Interactive 3D gym tour

### UI Components (`components/ui/`)
- Button, Card, Dialog, Modal with micro-interactions

### Page Routes
- `/` - Landing page with 3D hero
- `/auth` - Supabase auth UI
- `/dashboard` - Member dashboard
- `/admin` - Admin control panel
- `/memberships` - Membership plans with PayFast integration
- `/classes` - Class booking system
- `/trainers` - Trainer profiles
- `/facilities` - Gym facilities showcase

---

## FEATURES

### Landing Page
- Video background from Mixkit
- 3D animated hero with Three.js
- GSAP scroll animations
- Cinematic typography
- Responsive design

### Authentication
- Email/password via Supabase Auth
- Role-based access control
- Protected routes

### User Dashboard
- Membership status display
- Upcoming class bookings
- Quick action buttons
- Payment history

### Admin Dashboard
- Member statistics
- Booking management
- Payment reports
- Class scheduling

### Payments
- PayFast integration
- ITN webhook handler
- Multiple membership tiers
- Automatic membership activation

### Classes
- Trainer-led sessions
- Booking system
- Capacity management
- Calendar view

---

## DEPLOYMENT

```bash
# Push to GitHub
git remote add origin https://github.com/[username]/kfit-spec-kit.git
git push -u origin main

# Deploy to Vercel
npm i -g vercel
vercel
```

## DESIGN SYSTEM

### Colors
- Primary: Orange (#f97316)
- Background: Black
- Text: White/Gray scale
- Accent: Orange gradients

### Typography
- Display: Bebas Neue, Oswald (headings)
- Body: Inter (body text)

### Motion
- Page transitions: Framer Motion
- Scroll: Lenis smooth scroll
- 3D: Three.js + GSAP
- Micro-interactions: CSS transitions