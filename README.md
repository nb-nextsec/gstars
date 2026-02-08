# Geelong Stars Website 🌟

A modern, inclusive website for **Geelong All-Abilities Sports Club** with admin capabilities, built entirely on Cloudflare infrastructure.

## About Geelong Stars

Geelong All-Abilities Sports Club offers a range of programs to meet the needs of all members, no matter your age or ability. Everyone is encouraged to get active, have fun, and build community through sports!

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: TailwindCSS v4 (Geelong Cats colors)
- **State Management**: TanStack Query (React Query)
- **Forms**: React Hook Form
- **Backend**: Cloudflare Pages Functions (in `/functions` directory)
- **Database**: Cloudflare D1 (SQLite)
- **File Storage**: Cloudflare R2
- **Authentication**: Custom JWT implementation

## Deployment Architecture

This project uses **Cloudflare Pages** for hosting:
- The React frontend builds to `/dist` and is served by Pages
- API endpoints in `/functions` are automatically deployed as Pages Functions
- **No separate Worker deployment needed** - everything is handled by Cloudflare Pages!

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Cloudflare account (for deployment)
- Wrangler CLI (`npm install -g wrangler`)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd geelong-stars
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open http://localhost:3000 in your browser.

### Cloudflare Setup

1. Login to Cloudflare:
   ```bash
   npx wrangler login
   ```

2. Create D1 database:
   ```bash
   npx wrangler d1 create geelong-stars-db
   ```

3. Update `wrangler.toml` with your database ID.

4. Initialize the database:
   ```bash
   npx wrangler d1 execute geelong-stars-db --local --file=./schema.sql
   ```

5. Create R2 bucket:
   ```bash
   npx wrangler r2 bucket create geelong-stars-images
   ```

6. Deploy:
   ```bash
   npm run deploy
   ```

## Project Structure

```
geelong-stars/
├── src/
│   ├── components/     # React components
│   ├── pages/          # Page components
│   ├── hooks/          # Custom hooks
│   ├── api/            # API client
│   ├── context/        # React contexts
│   ├── types/          # TypeScript types
│   └── styles/         # CSS styles
├── functions/          # Cloudflare Workers API
├── public/             # Static assets
├── schema.sql          # Database schema
└── wrangler.toml       # Cloudflare configuration
```

## Features

### Public Pages
- Home with hero, programs, events, and sponsors
- Our Club (about, history, committee)
- Programs (junior, senior, development, social)
- Social (events, gallery, news)
- Sponsors listing
- Contact form

### Admin Panel
- Event management
- Sponsor management
- Image uploads
- Site settings

## Default Admin Credentials

- Username: `admin`
- Password: `admin123`

**Important**: Change these credentials in production!

## Environment Variables

Create a `.dev.vars` file for local development:

```
JWT_SECRET=your-secret-key-here
```

## License

All rights reserved. Geelong Stars Sporting Club.
