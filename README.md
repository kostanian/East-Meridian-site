# East Meridian

**Business services in China, delivered end-to-end.**

[![Live Site](https://img.shields.io/badge/Live-east--meridian.com-dc2626?style=for-the-badge)](https://east-meridian.com)
[![Blog](https://img.shields.io/badge/Blog-blog.east--meridian.com-f59e0b?style=for-the-badge)](https://blog.east-meridian.com)

![React](https://img.shields.io/badge/React-18-61dafb?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178c6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646cff?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06b6d4?logo=tailwindcss&logoColor=white)
![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000?logo=vercel&logoColor=white)

East Meridian is a B2B service company providing procurement, logistics, warehousing, finance, legal support, and interpreter services in China for businesses across Russia and CIS countries. This repository contains the main marketing website.

## Features

- **Lead Form with Telegram Integration** — Contact form sends submissions directly to Telegram via Bot API (Vercel Serverless Function), including file attachments up to 4 MB (max 10 files)
- **Smart Form Validation** — Required fields with a confirmation dialog for optional contact methods; blocks dangerous file extensions (.exe, .bat, etc.)
- **Rate Limiting** — Server-side IP-based rate limiting (5 requests/min) to prevent spam
- **SEO Optimized** — Open Graph image (1200x630), canonical URL, robots meta, structured meta tags, sitemap reference in robots.txt
- **Security Headers** — X-Frame-Options, X-Content-Type-Options, X-XSS-Protection, Referrer-Policy, Permissions-Policy via vercel.json
- **Blog on Subdomain** — WordPress + Blocksy theme at blog.east-meridian.com (Hostinger), linked from main navigation
- **Performance Optimized** — All images in WebP, unused dependencies and components removed, CSS bundle reduced from 66 KB to 35 KB
- **Smooth Animations** — Scroll-triggered animations via Framer Motion
- **Responsive Design** — Mobile-first with collapsible navigation

## Architecture

```
                    ┌─────────────┐
                    │  Namecheap  │
                    │     DNS     │
                    └──────┬──────┘
                           │
              ┌────────────┼────────────┐
              │                         │
     east-meridian.com        blog.east-meridian.com
              │                         │
      ┌───────┴───────┐        ┌───────┴───────┐
      │    Vercel     │        │   Hostinger   │
      │               │        │               │
      │  React SPA    │        │  WordPress    │
      │  + Serverless │        │  + Blocksy    │
      │    Function   │        │    Theme      │
      └───────┬───────┘        └───────────────┘
              │
              │  POST /api/send-lead
              │
      ┌───────┴───────┐
      │  Telegram     │
      │  Bot API      │
      │               │
      │  sendMessage  │
      │  sendDocument │
      └───────────────┘
```

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 + TypeScript 5.8 |
| Build Tool | Vite 5 (SWC) |
| Styling | Tailwind CSS 3.4 + shadcn/ui |
| Animations | Framer Motion |
| Backend | Vercel Serverless Functions (Node.js) |
| Messaging | Telegram Bot API |
| Blog | WordPress + Blocksy (Hostinger) |
| Hosting | Vercel |
| DNS | Namecheap |
| CI/CD | GitHub → Vercel (auto-deploy on push) |

## Development Workflow

```
Lovable.dev ──► GitHub repo ──► VS Code + Claude Code / GPT ──► git push ──► Vercel auto-deploy
(scaffold)      (source)        (development)                    (CI/CD)      (production)
```

The project was initially scaffolded with [Lovable.dev](https://lovable.dev) (AI-powered app builder), exported to GitHub, then extensively refactored and optimized in VS Code using Claude Code and GPT.

**Optimizations performed:**
- Removed 20 unused npm packages and 34 unused shadcn/ui components
- Converted all images from JPG to WebP (total image payload: ~4.7 MB → ~434 KB)
- CSS bundle: 66 KB → 35 KB (gzip: 12 KB → 7.3 KB)
- Fixed all TypeScript and ESLint errors
- Added CORS restrictions, rate limiting, and input sanitization

## Getting Started

```bash
# Install dependencies
npm install

# Create .env from template
cp .env.example .env
# Edit .env with your Telegram bot token and chat ID

# Start dev server (port 8080)
npm run dev

# Production build
npm run build
```

### Environment Variables

| Variable | Description |
|----------|------------|
| `TELEGRAM_BOT_TOKEN` | Telegram Bot API token (from [@BotFather](https://t.me/BotFather)) |
| `TELEGRAM_CHAT_ID` | Target chat/group ID for lead notifications |

Set these in Vercel Dashboard → Settings → Environment Variables for production.

## Project Structure

```
├── api/
│   ├── send-lead.ts          # Serverless function: form → Telegram
│   └── _dev-handler.ts       # Dev adapter for Vite
├── public/                    # Static assets (favicons, og-image, robots.txt)
├── src/
│   ├── assets/                # Images (WebP)
│   ├── components/
│   │   ├── ui/                # shadcn/ui primitives (15 components)
│   │   ├── icons/             # Custom SVG icons
│   │   ├── Navbar.tsx
│   │   ├── HeroSection.tsx
│   │   ├── AdvantagesSection.tsx
│   │   ├── FAQSection.tsx
│   │   ├── CTASection.tsx
│   │   ├── LeadForm.tsx       # Form with file upload + validation
│   │   └── Footer.tsx
│   ├── pages/
│   │   └── Index.tsx          # Main landing page
│   ├── data/
│   │   └── services.ts        # Service categories data
│   └── App.tsx
├── vercel.json                # Security headers
├── index.html                 # Entry point with SEO meta tags
└── vite.config.ts             # Vite + dev API proxy
```

## License

All rights reserved. This is a proprietary project for East Meridian.
