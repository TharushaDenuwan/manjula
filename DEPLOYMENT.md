# Deployment Guide for Vercel

This guide will help you deploy your fullstack application to Vercel.

## Architecture Overview

- **Frontend**: Next.js app (`apps/web`) → Deploy to Vercel ✅
- **Backend API**: Hono API with Bun runtime (`apps/api`) → Deploy separately (Railway/Render/Fly.io)
- **Database**: PostgreSQL → Use Vercel Postgres, Neon, or Supabase

## Prerequisites

1. Vercel account
2. PostgreSQL database (Vercel Postgres, Neon, Supabase, or Railway)
3. Separate hosting for API (Railway, Render, Fly.io, or DigitalOcean)

## Step 1: Set Up Database

### Option A: Vercel Postgres (Recommended)
1. Go to your Vercel project → Storage → Create Database → Postgres
2. Copy the connection string

### Option B: Neon (Free tier available)
1. Sign up at [neon.tech](https://neon.tech)
2. Create a new project
3. Copy the connection string

### Option C: Supabase
1. Sign up at [supabase.com](https://supabase.com)
2. Create a new project
3. Copy the connection string from Settings → Database

## Step 2: Deploy API Server

Since your API uses Bun runtime, deploy it separately:

### Option A: Railway (Recommended for Bun)
1. Sign up at [railway.app](https://railway.app)
2. Create a new project
3. Connect your GitHub repository
4. Select `apps/api` as the root directory
5. Set environment variables:
   ```
   DATABASE_URL=your_postgres_connection_string
   PORT=8000
   NODE_ENV=production
   LOG_LEVEL=info
   CLIENT_APP_URL=https://your-vercel-app.vercel.app
   BETTER_AUTH_URL=https://your-api.railway.app
   ```
6. Railway will auto-detect Bun and deploy

### Option B: Render
1. Sign up at [render.com](https://render.com)
2. Create a new Web Service
3. Connect your GitHub repository
4. Settings:
   - Root Directory: `apps/api`
   - Build Command: `bun install && bun run build`
   - Start Command: `bun ./build/index.js`
   - Environment: Bun (if available) or Docker
5. Add environment variables (same as Railway)

### Option C: Fly.io
1. Install Fly CLI: `curl -L https://fly.io/install.sh | sh`
2. In `apps/api`, create `fly.toml`:
   ```toml
   app = "your-api-name"
   primary_region = "iad"

   [build]
     builder = "paketobuildpacks/builder:base"

   [[services]]
     internal_port = 8000
     protocol = "tcp"
   ```
3. Deploy: `fly deploy`

## Step 3: Deploy Next.js App to Vercel

### Via Vercel Dashboard:
1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: Next.js
   - **Root Directory**: `apps/web`
   - **Build Command**: `cd ../.. && pnpm install && pnpm build --filter=@nextplate/web`
   - **Output Directory**: `.next` (default)
   - **Install Command**: `pnpm install`

### Via Vercel CLI:
```bash
npm i -g vercel
cd apps/web
vercel
```

## Step 4: Environment Variables

### In Vercel (Next.js App):
Go to Project Settings → Environment Variables and add:

```
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
NEXT_PUBLIC_BACKEND_URL=https://your-api.railway.app
NEXT_PUBLIC_AWS_REGION=your-aws-region
NEXT_PUBLIC_AWS_ACCESS_KEY_ID=your-aws-key
NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY=your-aws-secret
NEXT_PUBLIC_AWS_S3_BUCKET=your-bucket-name
```

### In API Server (Railway/Render/etc):
```
DATABASE_URL=your_postgres_connection_string
PORT=8000
NODE_ENV=production
LOG_LEVEL=info
CLIENT_APP_URL=https://your-app.vercel.app
BETTER_AUTH_URL=https://your-api.railway.app
```

## Step 5: Run Database Migrations

After deploying, run migrations on your production database:

```bash
# Set DATABASE_URL to production
export DATABASE_URL="your_production_database_url"

# Run migrations
cd apps/api
bun run db:migrate
```

Or use Drizzle Studio:
```bash
bun run db:studio
```

## Step 6: Update CORS Settings

Make sure your API allows requests from your Vercel domain:

In `apps/api/src/lib/create-app.ts`, ensure CORS is configured:
```typescript
app.use(
  "*",
  cors({
    origin: [env.CLIENT_APP_URL, "https://your-app.vercel.app"],
    // ... rest of config
  })
);
```

## Troubleshooting

### Build Errors
- Ensure all workspace dependencies are properly linked
- Check that `transpilePackages` in `next.config.ts` includes all packages

### API Connection Issues
- Verify `NEXT_PUBLIC_BACKEND_URL` is set correctly
- Check CORS settings in API
- Ensure API is accessible (not behind firewall)

### Database Connection
- Verify `DATABASE_URL` is correct
- Check SSL settings (some providers require SSL)
- Ensure database allows connections from your API server's IP

## Alternative: Convert API to Next.js Routes

If you want everything on Vercel, you can convert your Hono API to Next.js API routes:

1. Move routes from `apps/api/src/routes` to `apps/web/src/app/api`
2. Convert Hono handlers to Next.js Route Handlers
3. Update imports and dependencies
4. This requires more refactoring but keeps everything in one place

## Monitoring

- **Vercel**: Built-in analytics and monitoring
- **Railway**: Built-in logs and metrics
- **Database**: Use your provider's dashboard (Neon, Supabase, etc.)

## Cost Estimate

- **Vercel**: Free tier (Hobby) or $20/month (Pro)
- **Railway**: ~$5-10/month for API
- **Database**:
  - Vercel Postgres: $20/month
  - Neon: Free tier available
  - Supabase: Free tier available

Total: ~$5-30/month depending on usage and provider choices.
