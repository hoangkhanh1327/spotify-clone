Spotify Clone

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Technologies

-   Nextjs 13
-   supabase for storing data.
-   stripe for faking payment

## Environments

Create a .env file to settings environment variables
NEXT_PUBLIC_SUPABASE_URL: your subpabase project url
NEXT_PUBLIC_SUPABASE_ANON_KEY: your subpabase key
SUPABASE_SERVICE_ROLE_KEY: your subpabase secret key

NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: your stripe publish key
STRIPE_SECRET_KEY: your stripe secret key
STRIPE_WEBHOOK_SECRET: webhook secretkey
