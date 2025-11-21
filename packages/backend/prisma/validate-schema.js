/**
 * Schema Validation Script
 * 
 * This script validates that the Prisma schema is correctly configured
 * and all required features are present.
 */

const fs = require('fs');
const path = require('path');

const results = [];

function validate(condition, message) {
  results.push({ passed: condition, message });
}

function readSchema() {
  const schemaPath = path.join(__dirname, 'schema.prisma');
  return fs.readFileSync(schemaPath, 'utf-8');
}

function validateSchema() {
  console.log('🔍 Validating Prisma schema...\n');

  const schema = readSchema();

  // Check PostGIS extension
  validate(
    schema.includes('extensions = [postgis]'),
    'PostGIS extension configured'
  );

  // Check required models
  const requiredModels = [
    'User',
    'Venue',
    'Master',
    'Service',
    'MasterService',
    'Booking',
    'Notification',
    'NotificationPreferences',
    'UserConsent',
    'AuditLog',
  ];

  requiredModels.forEach((model) => {
    validate(
      schema.includes(`model ${model}`),
      `Model ${model} exists`
    );
  });

  // Check required enums
  const requiredEnums = [
    'UserRole',
    'BookingStatus',
    'NotificationStatus',
    'NotificationChannel',
    'NotificationType',
  ];

  requiredEnums.forEach((enumName) => {
    validate(
      schema.includes(`enum ${enumName}`),
      `Enum ${enumName} exists`
    );
  });

  // Check indexes
  const requiredIndexes = [
    'idx_venues_owner',
    'idx_venues_category',
    'idx_venues_location',
    'idx_masters_venue',
    'idx_services_venue',
    'idx_bookings_client',
    'idx_bookings_venue',
    'idx_bookings_master',
    'idx_bookings_time',
    'idx_bookings_status',
    'idx_notifications_user',
    'idx_notifications_status',
    'idx_notifications_scheduled',
  ];

  requiredIndexes.forEach((index) => {
    validate(
      schema.includes(index),
      `Index ${index} configured`
    );
  });

  // Check geospatial fields
  validate(
    schema.includes('latitude') && schema.includes('longitude'),
    'Geospatial fields (latitude, longitude) present'
  );

  // Check JSONB fields
  validate(
    schema.includes('@db.JsonB'),
    'JSONB fields configured for flexible data'
  );

  // Check cascade deletes
  validate(
    schema.includes('onDelete: Cascade'),
    'Cascade deletes configured'
  );

  // Check UUID generation
  validate(
    schema.includes('gen_random_uuid()'),
    'UUID generation configured'
  );

  // Check timestamp precision
  validate(
    schema.includes('@db.Timestamp(6)'),
    'Timestamp precision configured'
  );

  // Check relations
  const requiredRelations = [
    'venues',
    'masters',
    'services',
    'bookings',
    'notifications',
  ];

  requiredRelations.forEach((relation) => {
    validate(
      schema.includes(relation),
      `Relation ${relation} exists`
    );
  });

  // Print results
  console.log('Validation Results:\n');
  
  let passedCount = 0;
  let failedCount = 0;

  results.forEach((result) => {
    const icon = result.passed ? '✅' : '❌';
    console.log(`${icon} ${result.message}`);
    
    if (result.passed) {
      passedCount++;
    } else {
      failedCount++;
    }
  });

  console.log(`\n📊 Summary: ${passedCount} passed, ${failedCount} failed\n`);

  if (failedCount > 0) {
    console.error('❌ Schema validation failed!');
    process.exit(1);
  } else {
    console.log('✅ Schema validation passed!');
    console.log('\n📋 Next steps:');
    console.log('  1. Run: npm install (if not done yet)');
    console.log('  2. Run: npm run db:generate');
    console.log('  3. Start database: docker-compose up -d postgres');
    console.log('  4. Run: npm run db:migrate');
    console.log('  5. Run: npm run db:seed');
  }
}

// Run validation
try {
  validateSchema();
} catch (error) {
  console.error('❌ Error during validation:', error);
  process.exit(1);
}
