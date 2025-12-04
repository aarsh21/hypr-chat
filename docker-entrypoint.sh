#!/bin/sh
set -e

echo "Running database migrations..."
bun run lib/db/migrate.ts

echo "Starting application..."
exec "$@"
