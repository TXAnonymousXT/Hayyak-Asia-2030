# Hayyak Asia 2030 - Project Prompt

## Project Overview

Build **Hayyak Asia 2030** - a smart, multilingual web platform for the 2030 Asian Games in Qatar. The platform assists visitors, fans, and participants from all Asian countries in navigating and enjoying the games.

## Core Objectives

1. **Cultural Exploration** - Enable users to explore Asian countries' cultures and relevant information
2. **Venue & Event Guide** - Guide users to event venues, ticketing systems, and real-time maps
3. **Smart Recommendations** - AI-powered suggestions for matches, events, and cultural sites
4. **Emergency System** - Persistent emergency button for direct contact with authorities
5. **Seat Intelligence** - Smart seat guide with accessibility options and view quality
6. **Eco Transport** - Sustainable transportation options with carbon footprint tracking
7. **Live Updates** - Centralized real-time notifications for each user
8. **Sustainability Education** - Display eco efforts and educational popups

## Technical Requirements

### Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS (with RTL support)
- **Database**: PostgreSQL with Prisma ORM
- **i18n**: next-intl (Arabic, English, Chinese, Japanese, Korean, Hindi)
- **Maps**: Leaflet or Mapbox
- **Real-time**: Server-Sent Events (SSE)
- **PWA**: next-pwa for offline support

### Design Constraints
- **Multilingual**: Full RTL support for Arabic
- **Low-bandwidth**: Optimized for mobile networks, target < 100KB initial JS
- **Performance**: Fast data delivery, aggressive caching
- **Accessibility**: WCAG 2.1 AA compliant
- **Responsive**: Mobile-first, works on all devices

## Key Features to Implement

### Homepage
- Hero section with search and quick actions
- Live event stats bar (live now, trending, upcoming)
- Personalized recommendations carousel
- Asian countries explorer grid (45+ countries)
- Venues list with interactive map
- Eco-transport section
- Floating emergency SOS button

### User Dashboard
- Personal event schedule
- My tickets with QR codes
- Notification center
- Quick navigation to next venue
- Seat guide for purchased tickets

### Events System
- Browse/filter events by sport, country, date, venue
- Event detail with live updates
- Ticket purchasing flow
- Add to personal schedule

### Venues
- All venue listings with details
- Interactive seat maps
- Accessibility information
- Real-time crowd levels

### Countries
- 45+ Asian countries profiles
- Cultural information and etiquette
- Athletes from each country
- Country-specific events

### Transport
- Multi-modal route planning
- Real-time transit data
- Eco-rating for each option
- Walking/cycling routes

### Emergency
- Always-visible SOS button
- One-tap emergency calls
- Nearby hospital/police locations
- Embassy contacts by country

## Database Models

```
User, Country, Venue, Sport, Event, Ticket, SeatMap, 
Transport, Notification, LiveUpdate, Emergency, 
UserPreference, Athlete
```

## API Endpoints Required

```
/api/auth/*          - Authentication
/api/users/*         - User management
/api/events/*        - Events CRUD & live updates
/api/venues/*        - Venues & seat maps
/api/countries/*     - Countries & athletes
/api/tickets/*       - Ticket management
/api/transport/*     - Route planning
/api/recommendations/* - AI suggestions
/api/emergency/*     - Emergency contacts
/api/notifications/* - Real-time notifications
```

## Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run lint         # Run ESLint
npm run test         # Run tests
npx prisma studio    # Open database GUI
npx prisma migrate   # Run migrations
```

## Project Structure

```
src/
├── app/[locale]/    # Localized pages
├── components/      # React components
├── lib/             # Utilities & database
├── hooks/           # Custom React hooks
├── stores/          # Zustand state stores
├── types/           # TypeScript definitions
└── i18n/            # Translation files
```

## Implementation Priority

1. Foundation: Project setup, i18n, base UI components
2. Core Pages: Homepage, events, venues, countries
3. User System: Auth, dashboard, tickets, notifications
4. Smart Features: Recommendations, maps, transport, emergency
5. Polish: PWA, performance, accessibility audit

## Quality Standards

- TypeScript strict mode
- ESLint + Prettier formatting
- Component testing with Jest
- E2E testing with Playwright
- Lighthouse score > 90 for all metrics
- Full keyboard navigation support
- Screen reader compatible
