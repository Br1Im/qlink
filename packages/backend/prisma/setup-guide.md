# Database Setup Guide

## Quick Start

Follow these steps to set up the database for the Qlink booking system:

### Step 1: Install Dependencies

```bash
# From the backend directory
cd packages/backend
npm install
```

If you encounter file lock issues on Windows, close any running processes (VS Code terminals, Node processes) and try again.

### Step 2: Start Database Services

Using Docker (recommended):

```bash
# From project root
docker-compose up -d postgres redis
```

Wait for services to be healthy:

```bash
docker-compose ps
```

### Step 3: Generate Prisma Client

```bash
npm run db:generate
```

This generates TypeScript types from the schema.

### Step 4: Run Migrations

```bash
npm run db:migrate
```

This will:
- Create all database tables
- Set up indexes
- Enable PostGIS extension
- Apply all schema changes

### Step 5: Seed Database (Optional)

```bash
npm run db:seed
```

This populates the database with test data for development.

## Verification

### Check Database Connection

```bash
# Using psql
psql "postgresql://qlink:qlink_dev_password@localhost:5432/qlink_db"

# List tables
\dt

# Check PostGIS
SELECT PostGIS_version();
```

### Open Prisma Studio

```bash
npm run db:studio
```

Browse your database at http://localhost:5555

## Test Data

After seeding, you'll have:

### Users
- **Client 1**: +79991234567 / password123
- **Client 2**: +79997654321 / password123
- **Owner 1**: +79995551234 / password123
- **Owner 2**: +79995554321 / password123

### Venues
1. Салон красоты "Красота" (Beauty Salon)
2. Барбершоп "Стиль" (Barbershop)
3. Медицинский центр "Здоровье" (Medical Center)

### Services
- Стрижка женская (Women's haircut) - 1500₽, 60 min
- Окрашивание волос (Hair coloring) - 3000₽, 120 min
- Маникюр (Manicure) - 1200₽, 45 min
- Мужская стрижка (Men's haircut) - 1000₽, 30 min
- Стрижка + борода (Haircut + beard) - 1500₽, 45 min
- Прием терапевта (Therapist consultation) - 2000₽, 30 min

## Troubleshooting

### "prisma" command not found

Make sure dependencies are installed:
```bash
npm install
```

### PostGIS extension error

Connect to the database and enable PostGIS:
```bash
psql "postgresql://qlink:qlink_dev_password@localhost:5432/qlink_db"
CREATE EXTENSION IF NOT EXISTS postgis;
```

### Connection refused

Make sure Docker containers are running:
```bash
docker-compose ps
docker-compose logs postgres
```

### File lock issues (Windows)

1. Close all VS Code terminals
2. Stop any running Node processes
3. Restart VS Code
4. Try again

### Migration conflicts

Reset the database (WARNING: deletes all data):
```bash
npm run db:push -- --force-reset
```

## Next Steps

After successful setup:

1. ✅ Database schema is ready
2. ✅ Test data is loaded
3. ✅ Prisma Client is generated
4. 🚀 Ready to implement Task 3: Authentication Service

## Schema Overview

```
users (clients, owners, admins)
  ├── venues (business locations)
  │   ├── masters (service providers)
  │   ├── services (offered services)
  │   └── bookings (appointments)
  ├── bookings (user appointments)
  ├── notifications (notification queue)
  ├── notification_preferences (user settings)
  ├── user_consents (GDPR compliance)
  └── audit_logs (security audit)

master_services (many-to-many relationship)
```

## Performance Features

- ✅ PostGIS for geospatial queries
- ✅ Optimized indexes on all foreign keys
- ✅ Composite indexes for common queries
- ✅ JSONB for flexible data (schedules, working hours)
- ✅ UUID primary keys for distributed systems
- ✅ Timestamp precision for accurate booking times

## Security Features

- ✅ Cascade deletes for data integrity
- ✅ User consent tracking (152-ФЗ compliance)
- ✅ Audit log for all operations
- ✅ Password hashing with bcrypt
- ✅ Prepared statements (SQL injection prevention)
