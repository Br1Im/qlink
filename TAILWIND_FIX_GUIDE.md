# Tailwind CSS Fix Guide

## Problem
The frontend container was experiencing a crash loop with Tailwind CSS compilation errors:
- `Module parse failed: Unexpected character '@'` 
- Container kept reinstalling TypeScript dependencies on every restart
- `node_modules` was not persisting between restarts

## Root Causes
1. **Missing Volumes**: The `node_modules` and `.next` directories weren't persisted as Docker volumes
2. **Environment Mismatch**: `NODE_ENV=production` was set but the container was running in dev mode
3. **PostCSS Configuration**: Minor syntax issue in postcss.config.js

## Solution Applied

### 1. Updated docker-compose.prod.yml
- Added persistent volumes for `node_modules` and `.next` directories
- Changed `NODE_ENV` from `production` to `development` to match the Dockerfile
- This prevents the container from losing dependencies on restart

### 2. Fixed postcss.config.js
- Updated plugin names to use quoted strings for better compatibility

### 3. Proper Rebuild Process
Run these commands on your server to apply the fix:

```bash
cd ~/qlink

# Pull the latest changes
git pull origin main

# Stop and remove the frontend container
docker-compose -f docker-compose.prod.yml stop frontend
docker-compose -f docker-compose.prod.yml rm -f frontend

# Remove the old image to force a clean rebuild
docker rmi qlink-frontend 2>/dev/null || true

# Rebuild the frontend image from scratch
docker-compose -f docker-compose.prod.yml build --no-cache frontend

# Start the frontend container
docker-compose -f docker-compose.prod.yml up -d frontend

# Watch the logs to verify it's working
docker-compose -f docker-compose.prod.yml logs -f frontend
```

## Expected Result
After applying this fix, you should see:
- ✓ Next.js starts successfully
- ✓ No more "Module parse failed" errors
- ✓ No more repeated TypeScript dependency installations
- ✓ The container stays running without crashing

## Verification
Check that the site is accessible:
```bash
curl -I https://q-link.tech
```

You should see a 200 OK response.

## Alternative: Production Build (Future Improvement)
For better performance in production, consider creating a proper production Dockerfile that:
1. Builds the Next.js app (`next build`)
2. Runs with `next start` instead of `next dev`
3. Uses a multi-stage build to reduce image size

This would require creating a new `Dockerfile.frontend.prod` file.
