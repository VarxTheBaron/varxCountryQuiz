#!/bin/sh
set -eu

# Fungerar oavsett vilken mapp kommandot körs från.
cd "$(dirname "$0")"

echo "Hämtar senaste koden..."
git pull --ff-only

echo "Kontrollerar konfigurationen..."
docker compose config --quiet
docker compose run --rm --no-deps caddy caddy validate --config /etc/caddy/Caddyfile --adapter caddyfile

echo "Bygger och uppdaterar containrarna..."
docker compose up -d --build
docker compose exec -T caddy caddy reload --config /etc/caddy/Caddyfile --adapter caddyfile

docker compose ps
echo "Uppdateringen är klar."
