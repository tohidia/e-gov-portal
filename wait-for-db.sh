#!/bin/sh
set -e

host="$1"
shift

until nc -z $host; do
  echo "⏳ منتظر دیتابیس هستم در $host ..."
  sleep 2
done

echo "✅ دیتابیس آماده است!"
exec "$@"
