#!/bin/sh
set -e

echo "Running database migrations..."
npx tsx lib/db/migrate.ts

echo "Starting application..."
exec "$@"
