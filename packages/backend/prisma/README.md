# Prisma Database Setup

This directory contains the Prisma ORM configuration for the Qlink booking system.

## Prerequisites

- PostgreSQL 15+ with PostGIS extension
- Node.js 20+
- Docker (optional, for local development)

## Database Schema

The schema includes the following tables:

- **users** - User accounts (clients, venue owners, admins)
- **venues** - Business locations with geospatial data
- **masters** - Service providers at venues
- **services** - Services offered by venues
- **master_services** - Many-to-many relationship between masters and services
- **bookings** - Client appointments
- **notifications** - Notification queue
- **notification_preferences** - User notification settings
- **user_consents** - GDPR/152-ФЗ compliance tracking
- **audit_logs** - Security audit trail

## Setup Instructions

### 1. Install Dependencies

```bash
cd packages/backend
npm install
```

### 2. Configure Environment

Copy `.env.example` to `.env` and update the database connection string:

```bash
cp .env.example .env
```

Edit `.env`:
```
DATABASE_URL=postgresql://username:password@localhost:5432/qlink_db
```

### 3. Start PostgreSQL with PostGIS

#### Using Docker (Recommended for Development)

The project includes a docker-compose.yml file in the root directory:

```bash
# From project root
docker-compose up -d postgres
```

#### Manual Installation

If you prefer to install PostgreSQL manually:

1. Install PostgreSQL 15+
2. Install PostGIS extension:
   ```sql
   CREATE EXTENSION IF NOT EXISTS postgis;
   ```

### 4. Run Migrations

Generate Prisma Client and apply migrations:

```bash
npm run db:generate
npm run db:migrate
```

This will:
- Create all database tables
- Set up indexes for performance
- Enable PostGIS extension
- Generate TypeScript types

### 5. Seed Database (Optional)

Populate the database with test data:

```bash
npm run db:seed
```

This creates:
- 4 test users (2 clients, 2 venue owners)
- 3 venues with different categories
- 4 masters with schedules
- 6 services
- Sample bookings
- Notification preferences

## Available Scripts

- `npm run db:generate` - Generate Prisma Client
- `npm run db:migrate` - Run database migrations
- `npm run db:push` - Push schema changes without migrations (dev only)
- `npm run db:seed` - Seed database with test data
- `npm run db:studio` - Open Prisma Studio (GUI for database)

## Prisma Studio

To explore and edit your database visually:

```bash
npm run db:studio
```

This opens a web interface at http://localhost:5555

## Schema Updates

When you modify `schema.prisma`:

1. Generate a new migration:
   ```bash
   npm run db:migrate
   ```

2. Prisma will prompt you to name the migration

3. The migration is automatically applied

## PostGIS Support

The schema uses PostGIS for geospatial queries on venues. The `latitude` and `longitude` fields are indexed for efficient nearby searches.

Example query for finding venues within a radius:

```typescript
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Find venues within 5km of coordinates
const nearbyVenues = await prisma.$queryRaw`
  SELECT *
  FROM venues
  WHERE ST_DWithin(
    ST_MakePoint(longitude, latitude)::geography,
    ST_MakePoint(${lng}, ${lat})::geography,
    5000
  )
  AND is_active = true
  ORDER BY ST_Distance(
    ST_MakePoint(longitude, latitude)::geography,
    ST_MakePoint(${lng}, ${lat})::geography
  )
  LIMIT 20
`;
```

## Performance Optimization

The schema includes several indexes for optimal query performance:

- **Venues**: owner_id, category, location (lat/lng), is_active
- **Masters**: venue_id, is_active
- **Services**: venue_id, is_active
- **Bookings**: client_id, venue_id, master_id, time range, status
- **Notifications**: user_id, status, scheduled_at
- **Audit Logs**: user_id, action, entity, created_at

## Security & Compliance

### 152-ФЗ Compliance

The schema includes tables for Russian personal data law compliance:

- **user_consents** - Tracks user consent for data processing
- **audit_logs** - Logs all access to personal data

### Data Encryption

Sensitive fields should be encrypted at the application level:
- User passwords (bcrypt with cost factor 12)
- Personal data in database (AES-256)

## Troubleshooting

### PostGIS Extension Error

If you get an error about PostGIS not being available:

```sql
-- Connect to your database and run:
CREATE EXTENSION IF NOT EXISTS postgis;
```

### Migration Conflicts

If migrations fail due to conflicts:

```bash
# Reset database (WARNING: deletes all data)
npm run db:push -- --force-reset

# Then re-run migrations
npm run db:migrate
```

### Connection Issues

Verify your DATABASE_URL is correct:

```bash
# Test connection
psql "postgresql://username:password@localhost:5432/qlink_db"
```

## Additional Resources

- [Prisma Documentation](https://www.prisma.io/docs)
- [PostGIS Documentation](https://postgis.net/documentation/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
