## Green Bean Café ☕
A full-stack, multilingual café website built with Next.js 15 App Router

## 📌 Overview
Green Bean Café is a portfolio project I created to demonstrate my full-stack Next.js skills and ability to build production-ready web applications.
It features a fully responsive design, multi-language support, real-time content updates via ISR, and a secure admin panel for managing events and menus, powered by Supabase and NextAuth.

## 🧩 Key Skills Demonstrated

- Full-stack development with Next.js 15 (App Router)

- Authentication & security using NextAuth

- Database integration with Supabase (PostgreSQL)

- CRUD API design with Next.js API routes

- Incremental Static Regeneration (ISR) for real-time updates

- Responsive, multilingual UI with next-intl (English/Italian)

- SEO optimization and metadata management

- Deployment & hosting on Vercel

## ✨ Features
Frontend
- Next.js 15 App Router — Utilizes SSR, SSG, and ISR for performance and SEO.

- Multi-language support — Powered by next-intl with instant English ↔ Italian switching.

- Responsive design — Optimized for mobile, tablet, and desktop.

- SEO & social metadata — Automatically generated for better discoverability.

Backend & Security
- Supabase (PostgreSQL) — Stores bilingual menu and event data.

- Custom CRUD API — Built with Next.js API routes to manage content.

- Authentication via NextAuth — Admin panel access restricted to authorized users.

- Protected API routes — All write operations require server-side authentication checks.

Performance & Monitoring
- Analytics integration — Tracks usage and performance.

- ISR — Updates only the changed pages without a full rebuild.

## 🛠 How It Works
- The admin panel is located at:
https://green-bean-cafe.vercel.app/admin
(Login is required; visitors can view the code in this repository to see how it works.)

- Admins can create, edit, and delete menu items and events in both English and Italian.

- Changes are stored in a Supabase database and automatically reflected on the public site via Incremental Static Regeneration.

- Public pages are pre-rendered for speed, with server updates pushed in the background when data changes.

## 🚀 Tech Stack
- Frontend: Next.js 15 (App Router), React, next-intl

- Backend: Supabase (PostgreSQL), Next.js API Routes

- Authentication: NextAuth

- Deployment: Vercel (automatic builds + ISR)

## 🌐 Live Demo
[https://green-bean-cafe.vercel.app](https://green-bean-cafe.vercel.app)

## 🛠 Getting Started
Clone the repo:

```bash
git clone https://github.com/yourusername/green-bean-cafe.git
cd green-bean-cafe
```

Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.
