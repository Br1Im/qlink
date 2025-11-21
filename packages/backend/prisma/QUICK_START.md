# 🚀 Quick Start - Database Setup

## Prerequisites

- Node.js 20+
- Docker Desktop (for PostgreSQL + Redis)

## Setup in 5 Steps

### 1️⃣ Install Dependencies

```bash
cd packages/backend
npm install
```

### 2️⃣ Start Database

```bash
# From project root
docker-compose up -d postgres redis
```

Verify containers are running:
```bash
docker-compose ps
```

### 3️⃣ Generate Prisma Client

```bash
npm run db:generate
```

### 4️⃣ Run Migrations

```bash
npm run db:migrate
```

### 5️⃣ Seed Test Data

```bash
npm run db:seed
```

## ✅ Verify Setup

### Check Database

```bash
# Open Prisma Studio
npm run db:studio
```

Browse at: http://localhost:5555

### Validate Schema

```bash
npm run db:validate
```

Should show: ✅ 39/39 checks passed

## 📊 Test Data Overview

After seeding, you have:

### Users (Login Credentials)
- Client 1: `+79991234567` / `password123`
- Client 2: `+79997654321` / `password123`
- Owner 1: `+79995551234` / `password123`
- Owner 2: `+79995554321` / `password123`

### Venues
1. **Салон красоты "Красота"** (Beauty Salon)
   - Location: Moscow, Tverskaya St.
   - Category: beauty_salon
   - Rating: 4.8 ⭐

2. **Барбершоп "Стиль"** (Barbershop)
   - Location: Moscow, Arbat St.
   - Category: barbershop
   - Rating: 4.9 ⭐

3. **Медицинский центр "Здоровье"** (Medical Center)
   - Location: Moscow, Leninsky Ave.
   - Category: medical_center
   - Rating: 4.7 ⭐

### Services
- Women's haircut - 1500₽ (60 min)
- Hair coloring - 3000₽ (120 min)
- Manicure - 1200₽ (45 min)
- Men's haircut - 1000₽ (30 min)
- Haircut + beard - 1500₽ (45 min)
- Therapist consultation - 2000₽ (30 min)

## 🔧 Common Commands

```bash
# Validate schema
npm run db:validate

# Generate Prisma Client
npm run db:generate

# Create new migration
npm run db:migrate

# Push schema changes (dev only)
npm run db:push

# Seed database
npm run db:seed

# Open Prisma Studio
npm run db:studio

# Reset database (⚠️ deletes all data)
npm run db:push -- --force-reset
```

## 🐛 Troubleshooting

### "prisma" command not found
```bash
npm install
```

### Connection refused
```bash
# Check if containers are running
docker-compose ps

# View logs
docker-compose logs postgres
```

### PostGIS extension error
```bash
# Connect to database
psql "postgresql://qlink:qlink_dev_password@localhost:5432/qlink_db"

# Enable PostGIS
CREATE EXTENSION IF NOT EXISTS postgis;
```

### File lock issues (Windows)
1. Close all VS Code terminals
2. Stop any running Node processes
3. Restart VS Code
4. Try again

## 📚 Documentation

- **Full Guide**: `README.md`
- **Setup Guide**: `setup-guide.md`
- **Implementation Details**: `IMPLEMENTATION.md`

## ✨ What's Next?

Database is ready! Now you can:

1. ✅ Start implementing Task 3: Authentication Service
2. ✅ Use Prisma Client in your code
3. ✅ Query the database with type safety

Example usage:
```typescript
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Find all venues
const venues = await prisma.venue.findMany({
  where: { isActive: true },
  include: { masters: true, services: true }
});
```

## 🎯 Database Features

- ✅ 10 tables with full relationships
- ✅ 29 optimized indexes
- ✅ PostGIS for geospatial queries
- ✅ JSONB for flexible data
- ✅ UUID primary keys
- ✅ Cascade deletes
- ✅ 152-ФЗ compliance (user consents, audit logs)
- ✅ Type-safe queries with Prisma

---

**Need help?** Check the full documentation in `README.md`
