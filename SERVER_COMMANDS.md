# Commands to Run on Server

## Quick Fix (Copy and paste these commands)

```bash
cd ~/qlink
git pull origin main
docker-compose -f docker-compose.prod.yml down frontend
docker volume rm qlink_frontend_node_modules qlink_frontend_next 2>/dev/null || true
docker rmi qlink-frontend 2>/dev/null || true
docker-compose -f docker-compose.prod.yml build --no-cache frontend
docker-compose -f docker-compose.prod.yml up -d frontend
docker-compose -f docker-compose.prod.yml logs -f frontend
```

## Alternative: Quick Restart (if you already rebuilt once)

```bash
cd ~/qlink
git pull origin main
docker-compose -f docker-compose.prod.yml restart frontend
docker-compose -f docker-compose.prod.yml logs -f frontend
```

## What This Does

1. **Pull latest code** - Gets the fixes from GitHub
2. **Stop frontend** - Gracefully stops the container
3. **Remove container** - Deletes the old container
4. **Remove image** - Deletes the old image (forces clean rebuild)
5. **Rebuild** - Creates new image with proper configuration
6. **Start** - Launches the fixed container
7. **Show logs** - Displays logs so you can verify it's working

## Expected Output

You should see:
```
✓ Ready in 3-5s
○ Compiling / ...
✓ Compiled successfully
```

**No more errors about:**
- "Module parse failed: Unexpected character '@'"
- "Installing dependencies" repeatedly
- Container crashing and restarting

## If It Still Fails

Check the logs for specific errors:
```bash
docker-compose -f docker-compose.prod.yml logs --tail=100 frontend
```

And verify the volumes were created:
```bash
docker volume ls | grep frontend
```

You should see:
- `qlink_frontend_node_modules`
- `qlink_frontend_next`
