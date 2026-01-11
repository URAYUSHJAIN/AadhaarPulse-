# AadhaarPulse Frontend

This is the frontend application for AadhaarPulse - built with [Next.js](https://nextjs.org) 16.1.1.

## Tech Stack

- **Framework**: Next.js 16.1.1 with App Router
- **Language**: TypeScript 5.x
- **Styling**: Tailwind CSS 4.x
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Maps**: React-Leaflet

## Getting Started

First, install dependencies:

```bash
bun install
# or
npm install
```

Then, run the development server:

```bash
bun run dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## Project Structure

```
frontend/
├── app/                    # Next.js App Router
│   ├── dashboard/         # Dashboard pages
│   ├── login/             # Login page
│   └── api/               # API routes
├── components/            # React components
│   └── dashboard/         # Dashboard components
├── lib/                   # Utilities
└── data/                  # Static data files
```

## Demo Credentials

- **Username**: admin
- **Password**: admin123

## Available Scripts

- `bun run dev` - Start development server
- `bun run build` - Build for production
- `bun run start` - Start production server
- `bun run lint` - Run ESLint
