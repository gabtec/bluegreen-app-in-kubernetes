#!/bin/sh

SECRET_NAME="app-secret"

# bypass user input
DB_USER=admin
DB_PASSWORD=admin
DB_NAME=deno_db
DB_HOST="gt-db"
DB_PORT="5432"

DB_URL="postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?sslmode=disable"

# Build atlas.hcl file
echo "Building atlas.hcl file..."

cat << EOF > ./backend/database/atlas.hcl
env "k8s" {
  url = "${DB_URL}"
}
EOF

# re-hash migrations folder
echo "Building atlas.sum file..."
atlas migrate hash --dir "file://backend/database/migrations"

# Build secret.yaml file
echo "Building app-secret.yaml file..."

cat << EOF > ./vault/${SECRET_NAME}.yaml
apiVersion: v1
kind: Secret
metadata:
  name: ${SECRET_NAME}
type: Opaque
data:
  # e.g. ${DB_URL}
  DB_URL: $(echo $DB_URL | base64)
  DB_USER: $(echo $DB_USER | base64)
  DB_NAME: $(echo $DB_NAME | base64)
  DB_PASSWORD: $(echo $DB_PASSWORD | base64)
  DB_PORT: $(echo $DB_PORT | base64)
  DB_HOST: $(echo $DB_HOST | base64)
  atlas.hcl: $(cat ./backend/database/atlas.hcl | base64)
EOF

echo "[   OK:] Done."