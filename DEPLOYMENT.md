# Deployment Guide

Production deployment guide for Sweet Shop application.

## Prerequisites

- Ubuntu 20.04+ or similar Linux distribution
- Docker and Docker Compose installed
- Node.js 18+ (if running without Docker)
- MongoDB 5.0+ (or use Atlas)
- Nginx for reverse proxy
- SSL certificate (Let's Encrypt recommended)

## Deployment Steps

### 1. Server Setup

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Install Nginx
sudo apt install -y nginx

# Install Certbot (SSL)
sudo apt install -y certbot python3-certbot-nginx
```

### 2. Clone Repository

```bash
cd /var/www
git clone <repository-url> sweet-shop
cd sweet-shop
```

### 3. Environment Configuration

```bash
# Copy and edit environment files
cp .env.example .env
cp Backend/.env.example Backend/.env
cp Frontend/.env.example Frontend/.env

# Edit with production values
nano .env
nano Backend/.env
```

### 4. Database Setup

#### Option A: Docker MongoDB
```bash
# Included in docker-compose.yml
# Data persists in named volume: mongodb_data
```

#### Option B: MongoDB Atlas (Cloud)
```bash
# Update MONGODB_URI in Backend/.env with Atlas connection string
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/sweet-shop
```

### 5. SSL Certificate

```bash
# Using Let's Encrypt with Certbot
sudo certbot certonly --nginx -d your-domain.com

# Auto-renew configuration
sudo systemctl enable certbot.timer
sudo systemctl start certbot.timer
```

### 6. Nginx Configuration

```bash
# Copy nginx configuration
sudo cp nginx.conf /etc/nginx/sites-available/sweet-shop

# Enable site
sudo ln -s /etc/nginx/sites-available/sweet-shop /etc/nginx/sites-enabled/

# Test configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
```

### 7. Deploy with Docker

```bash
# Build and start services
sudo docker-compose up -d --build

# Verify services are running
sudo docker-compose ps

# View logs
sudo docker-compose logs -f backend
sudo docker-compose logs -f frontend
```

### 8. Database Seeding (if needed)

```bash
# Run seed script
sudo docker-compose exec backend npm run seed
```

## Health Checks

### Check Services Status
```bash
# Docker containers
docker ps

# Backend API
curl http://localhost:3000/api/v1/health

# Nginx
sudo systemctl status nginx

# SSL Certificate
sudo certbot certificates
```

## Monitoring

### Log Files
```bash
# Docker logs
docker-compose logs backend
docker-compose logs frontend

# Nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log

# Application logs
docker-compose exec backend tail -f logs/app-*.log
```

### Performance Monitoring
```bash
# Monitor resource usage
docker stats

# Check disk space
df -h

# Check memory usage
free -h
```

## Maintenance

### Backup Database

```bash
# Backup MongoDB (if using Docker)
docker-compose exec mongodb mongodump --out=/backup

# Copy from container
docker cp sweet-shop-db:/backup ./backup
```

### Update Application

```bash
# Pull latest code
git pull origin main

# Rebuild and restart
docker-compose down
docker-compose up -d --build

# Run migrations if needed
docker-compose exec backend npm run migrate
```

### Scale Application

```bash
# Update docker-compose.yml to add more backend instances
# Use load balancing in Nginx
```

## Security Best Practices

1. **Environment Variables**: Never commit `.env` files
2. **HTTPS**: Always use SSL/TLS in production
3. **Firewalls**: Restrict access to necessary ports only
4. **Updates**: Keep system and dependencies updated
5. **Backups**: Regular database and file backups
6. **Monitoring**: Set up alerts for errors
7. **Rate Limiting**: Enabled in production config
8. **CORS**: Restrict to known domains

## Troubleshooting

### Services won't start
```bash
# Check logs
docker-compose logs

# Verify configuration
docker-compose config

# Restart services
docker-compose restart
```

### Database connection fails
```bash
# Verify MongoDB is running
docker-compose ps mongodb

# Check connection string
echo $MONGODB_URI

# Test connection
docker-compose exec backend node -e "require('mongoose').connect(process.env.MONGODB_URI)"
```

### SSL certificate issues
```bash
# Verify certificate
sudo certbot certificates

# Renew certificate
sudo certbot renew --force-renewal

# Check Nginx SSL config
sudo nginx -t
```

## Production Checklist

- [ ] SSL certificate installed and renewed
- [ ] Environment variables configured
- [ ] Database backup strategy in place
- [ ] Monitoring and logging set up
- [ ] Firewall rules configured
- [ ] Email notifications enabled
- [ ] Load balancer configured (if needed)
- [ ] Database replication set up (if needed)
- [ ] CDN configured for static files (optional)
- [ ] Performance optimized
- [ ] Security audit completed
- [ ] Disaster recovery plan documented

## Support

For issues or questions, refer to documentation or open an issue on GitHub.

---

Last Updated: 2026-06-18
