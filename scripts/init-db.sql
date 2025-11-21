-- Enable PostGIS extension for geospatial data
CREATE EXTENSION IF NOT EXISTS postgis;

-- Create initial database schema will be handled by Prisma migrations
-- This file is for any initial setup that needs to happen before migrations

-- Set timezone
SET timezone = 'UTC';

-- Create custom types if needed
-- (Will be created by Prisma, but can be defined here for reference)
