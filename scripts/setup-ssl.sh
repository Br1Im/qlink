#!/bin/bash

# Script to setup SSL certificates with Let's Encrypt

DOMAIN="q-link.tech"
EMAIL="admin@q-link.tech"  # Замените на ваш email

echo "🔐 Setting up SSL certificates for $DOMAIN"

# Create directories
mkdir -p certbot/conf
mkdir -p certbot/www

# Create temporary nginx config for certbot challenge
cat > nginx/nginx-certbot.conf << 'EOF'
server {
    listen 80;
    listen [::]:80;
    server_name q-link.tech www.q-link.tech;

    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }

    location / {
        return 200 "OK";
        add_header Content-Type text/plain;
    }
}
EOF

echo "📦 Starting temporary nginx for certificate generation..."

# Start nginx with temporary config
docker run -d --name nginx-temp \
  -p 80:80 \
  -v $(pwd)/nginx/nginx-certbot.conf:/etc/nginx/conf.d/default.conf:ro \
  -v $(pwd)/certbot/www:/var/www/certbot:ro \
  nginx:alpine

sleep 5

echo "🎫 Requesting SSL certificate from Let's Encrypt..."

# Request certificate
docker run --rm \
  -v $(pwd)/certbot/conf:/etc/letsencrypt \
  -v $(pwd)/certbot/www:/var/www/certbot \
  certbot/certbot certonly \
  --webroot \
  --webroot-path=/var/www/certbot \
  --email $EMAIL \
  --agree-tos \
  --no-eff-email \
  -d $DOMAIN \
  -d www.$DOMAIN

# Stop temporary nginx
docker stop nginx-temp
docker rm nginx-temp

if [ -d "certbot/conf/live/$DOMAIN" ]; then
    echo "✅ SSL certificates successfully generated!"
    echo "📁 Certificates location: certbot/conf/live/$DOMAIN/"
    echo ""
    echo "🚀 Now you can start the production stack:"
    echo "   docker-compose -f docker-compose.prod.yml up -d"
else
    echo "❌ Failed to generate SSL certificates"
    echo "Please check:"
    echo "  1. Domain $DOMAIN points to this server IP"
    echo "  2. Port 80 is open and accessible"
    echo "  3. No other service is using port 80"
    exit 1
fi
