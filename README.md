# Hayyak Asia 2030

A multilingual, accessible Progressive Web Application (PWA) for the 2030 Asian Games in Qatar.

## Project Overview

Hayyak Asia 2030 is a comprehensive web platform designed to serve millions of visitors, fans, and participants during the 2030 Asian Games. The platform provides:

- **Event Discovery**: Browse and search sporting events, schedules, and results
- **Venue Navigation**: Interactive maps, seating guides, and directions
- **Ticketing System**: Seat selection, QR code tickets, and purchase flow
- **Smart Recommendations**: AI-powered personalized event suggestions
- **Emergency Access**: Quick access to emergency services and contacts
- **Eco-Transport**: Sustainable transportation options with carbon tracking
- **Cultural Explorer**: Discover cultures from 45+ Asian countries
- **Real-time Updates**: Live scores, notifications, and alerts

## Tech Stack

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS (with RTL support)
- **State Management**: Zustand + React Query
- **i18n**: next-intl (20+ languages)

### Backend
- **Framework**: Fastify
- **Database**: PostgreSQL with Prisma ORM
- **Cache**: Redis
- **Real-time**: Server-Sent Events (SSE)

### Infrastructure
- **Monorepo**: Turborepo
- **Package Manager**: npm workspaces

## Project Structure

```
hayyak-asia-2030/
├── apps/
│   ├── web/                    # Next.js frontend application
│   │   ├── app/[locale]/       # Internationalized routes
│   │   ├── components/         # React components
│   │   ├── lib/                # Utilities and hooks
│   │   └── messages/           # Translation files
│   └── api/                    # Fastify backend API
│       ├── src/                # API source code
│       └── prisma/             # Database schema
├── packages/
│   ├── ui/                     # Shared UI component library
│   ├── types/                  # Shared TypeScript types
│   └── config/                 # Shared configurations
└── turbo.json                  # Turborepo configuration
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm 10+
- PostgreSQL 16+ (with PostGIS extension)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-org/hayyak-asia-2030.git
   cd hayyak-asia-2030
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp apps/web/.env.example apps/web/.env.local
   cp apps/api/.env.example apps/api/.env
   ```

4. Start the development servers:
   ```bash
   npm run dev
   ```

The web app will be available at `http://localhost:3000` and the API at `http://localhost:3001`.

## Available Scripts

```bash
# Development
npm run dev          # Start all apps in development mode
npm run build        # Build all apps for production
npm run lint         # Run ESLint across all packages
npm run test         # Run tests

# Database (from apps/api)
npm run db:generate  # Generate Prisma client
npm run db:push      # Push schema to database
npm run db:migrate   # Run migrations
npm run db:studio    # Open Prisma Studio
```

## Internationalization

The platform supports 20+ languages including:

- **LTR**: English, Chinese, Japanese, Korean, Hindi, Thai, Vietnamese, etc.
- **RTL**: Arabic, Farsi, Urdu

To add a new language:
1. Create a translation file in `apps/web/messages/{locale}.json`
2. Add the locale to `apps/web/lib/i18n/config.ts`

## Accessibility

The platform follows WCAG 2.1 AA guidelines:

- Keyboard navigation support
- Screen reader compatibility
- Minimum 44x44px touch targets
- Color contrast ratios (4.5:1)
- Focus visible indicators
- RTL layout support

## Performance Targets

- First Contentful Paint (FCP): < 1.5s on 3G
- Largest Contentful Paint (LCP): < 2.5s
- Time to Interactive (TTI): < 3.5s
- Cumulative Layout Shift (CLS): < 0.1

## License

Copyright © 2030 Asian Games Qatar. All rights reserved.
