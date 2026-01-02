# Deployment Guide - Manjula Ayurveda (KVM 1 VPS)

This guide will help you deploy your Next.js + Hono.js application on a fresh KVM 1 VPS.

**VPS Specs:**
- 1 vCPU Core
- 4 GB RAM
- 50 GB NVMe Disk
- Ubuntu 22.04 LTS (recommended)

---

## 📋 Table of Contents

1. [Initial Server Setup](#1-initial-server-setup)
2. [Install Dependencies](#2-install-dependencies)
3. [Setup PostgreSQL](#3-setup-postgresql)
4. [Setup Project Files](#4-setup-project-files)
5. [Configure Environment Variables](#5-configure-environment-variables)
6. [Build Applications](#6-build-applications)
7. [Setup Process Manager (PM2)](#7-setup-process-manager-pm2)
8. [Setup Nginx Reverse Proxy](#8-setup-nginx-reverse-proxy)
9. [SSL Certificate (Let's Encrypt)](#9-ssl-certificate-lets-encrypt)
10. [Optimization for 4GB RAM](#10-optimization-for-4gb-ram)
11. [Monitoring & Maintenance](#11-monitoring--maintenance)

---

## 1. Initial Server Setup

### Connect to VPS
```bash
ssh root@YOUR_VPS_IP
```

### Update System
```bash
apt update && apt upgrade -y
```

### Create Non-Root User
```bash
adduser manjula
usermod -aG sudo manjula
```

### Setup Firewall
```bash
ufw allow OpenSSH
ufw allow 80/tcp
ufw allow 443/tcp
ufw enable
```

### Switch to New User
```bash
su - manjula
```

---

## 2. Install Dependencies

### Install Node.js (v20 LTS)
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
node --version  # Should show v20.x.x
```

### Install Bun
```bash
curl -fsSL https://bun.sh/install | bash
source ~/.bashrc
bun --version
```

### Install pnpm
```bash
sudo npm install -g pnpm
pnpm --version
```

### Install PM2 (Process Manager)
```bash
sudo npm install -g pm2
pm2 --version
```

### Install Git
```bash
sudo apt install -y git
```

### Install Nginx
```bash
sudo apt install -y nginx
sudo systemctl enable nginx
sudo systemctl start nginx
```

---

## 3. Setup PostgreSQL

### Install PostgreSQL
```bash
sudo apt install -y postgresql postgresql-contrib
sudo systemctl enable postgresql
sudo systemctl start postgresql
```

### Optimize PostgreSQL for 4GB RAM
```bash
sudo nano /etc/postgresql/14/main/postgresql.conf
```

Add/modify these settings:
```conf
# Memory Configuration (Optimized for 4GB RAM)
shared_buffers = 256MB
effective_cache_size = 1GB
maintenance_work_mem = 64MB
work_mem = 4MB
max_connections = 50

# Performance
random_page_cost = 1.1
effective_io_concurrency = 200
```

### Restart PostgreSQL
```bash
sudo systemctl restart postgresql
```

### Create Database
```bash
sudo -u postgres psql

-- In PostgreSQL prompt:
CREATE DATABASE manjula;
CREATE USER manjulauser WITH ENCRYPTED PASSWORD 'YourSecurePassword123!';
GRANT ALL PRIVILEGES ON DATABASE manjula TO manjulauser;
\q
```

---

## 4. Setup Project Files

### Clone Repository
```bash
cd ~
git clone YOUR_REPO_URL manjula
cd manjula
```

**OR Upload via SFTP/SCP:**
```bash
# From your local machine:
scp -r "C:\Disc D\My projects\manjula" manjula@YOUR_VPS_IP:~/
```

### Install Dependencies
```bash
cd ~/manjula
pnpm install
```

---

## 5. Configure Environment Variables

### API Environment (.env)
```bash
nano ~/manjula/apps/api/.env
```

```env
# Database
DATABASE_URL="postgresql://manjulauser:YourSecurePassword123!@localhost:5432/manjula?schema=public"

# Server
PORT=3001
NODE_ENV=production

# Auth (generate new secret)
BETTER_AUTH_SECRET="your-generated-secret-here"
BETTER_AUTH_URL="https://yourdomain.com"

# CORS
ALLOWED_ORIGINS="https://yourdomain.com,https://www.yourdomain.com"
```

**Generate BETTER_AUTH_SECRET:**
```bash
openssl rand -base64 32
```

### Web Environment (.env)
```bash
nano ~/manjula/apps/web/.env
```

```env
# API
NEXT_PUBLIC_API_URL=https://yourdomain.com/api
NEXT_PUBLIC_CLIENT_APP_URL=https://yourdomain.com

# Auth
BETTER_AUTH_SECRET="same-as-api-secret"
BETTER_AUTH_URL="https://yourdomain.com"

# Database (same as API)
DATABASE_URL="postgresql://manjulauser:YourSecurePassword123!@localhost:5432/manjula?schema=public"

# Email (Resend)
RESEND_API_KEY=re_your_resend_api_key
RESEND_FROM_EMAIL=noreply@yourdomain.com
RESEND_FROM_NAME="Manjula Ayurveda"

# AWS S3 (for media storage)
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=eu-central-1
AWS_S3_BUCKET=manjula-media
```

---

## 6. Build Applications

### Run Database Migrations
```bash
cd ~/manjula
pnpm db:generate
pnpm db:migrate
```

### Build API
```bash
cd ~/manjula/apps/api
bun run build
```

### Build Web (Next.js)
```bash
cd ~/manjula/apps/web
pnpm build
```

---

## 7. Setup Process Manager (PM2)

### Create PM2 Ecosystem File
```bash
nano ~/manjula/ecosystem.config.js
```

```javascript
module.exports = {
  apps: [
    {
      name: 'manjula-api',
      script: 'bun',
      args: 'run ./build/index.js',
      cwd: '/home/manjula/manjula/apps/api',
      env: {
        NODE_ENV: 'production',
        PORT: 3001,
      },
      max_memory_restart: '500M',
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      watch: false,
      error_file: '/home/manjula/logs/api-error.log',
      out_file: '/home/manjula/logs/api-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    },
    {
      name: 'manjula-web',
      script: 'node',
      args: 'server.js',
      cwd: '/home/manjula/manjula/apps/web',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
      max_memory_restart: '800M',
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      watch: false,
      error_file: '/home/manjula/logs/web-error.log',
      out_file: '/home/manjula/logs/web-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    },
  ],
};
```

### Create Logs Directory
```bash
mkdir -p ~/logs
```

### Start Applications
```bash
cd ~/manjula
pm2 start ecosystem.config.js
pm2 save
pm2 startup
# Follow the instructions shown
```

### Check Status
```bash
pm2 status
pm2 logs
```

---

## 8. Setup Nginx Reverse Proxy

### Create Nginx Configuration
```bash
sudo nano /etc/nginx/sites-available/manjula
```

```nginx
# Redirect HTTP to HTTPS
server {
    listen 80;
    listen [::]:80;
    server_name yourdomain.com www.yourdomain.com;

    return 301 https://$server_name$request_uri;
}

# Main HTTPS Server
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name yourdomain.com www.yourdomain.com;

    # SSL certificates (will be added by Certbot)
    # ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    # ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;

    # SSL Configuration
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    # Gzip Compression
    gzip on;
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types text/plain text/css text/xml text/javascript application/json application/javascript application/xml+rss application/rss+xml font/truetype font/opentype application/vnd.ms-fontobject image/svg+xml;

    # Security Headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;

    # Client Body Size (for file uploads)
    client_max_body_size 100M;

    # API Proxy
    location /api/ {
        proxy_pass http://localhost:3001/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 300s;
        proxy_connect_timeout 300s;
    }

    # Next.js App
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 300s;
        proxy_connect_timeout 300s;
    }

    # Static Files Caching
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
        proxy_pass http://localhost:3000;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

### Enable Site
```bash
sudo ln -s /etc/nginx/sites-available/manjula /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

---

## 9. SSL Certificate (Let's Encrypt)

### Install Certbot
```bash
sudo apt install -y certbot python3-certbot-nginx
```

### Get SSL Certificate
```bash
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

Follow the prompts. Certbot will automatically:
- Obtain the certificate
- Update Nginx configuration
- Setup auto-renewal

### Test Auto-Renewal
```bash
sudo certbot renew --dry-run
```

---

## 10. Optimization for 4GB RAM

### Add Swap Space (Important!)
```bash
sudo fallocate -l 4G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
```

### Verify Swap
```bash
free -h
```

### Configure Swap Usage
```bash
sudo nano /etc/sysctl.conf
```

Add:
```conf
vm.swappiness=10
vm.vfs_cache_pressure=50
```

Apply:
```bash
sudo sysctl -p
```

### Optimize Next.js Build
Edit `apps/web/next.config.ts`:
```typescript
export default {
  output: 'standalone',
  compress: true,
  poweredByHeader: false,

  // Reduce memory during build
  experimental: {
    workerThreads: false,
    cpus: 1,
  },
}
```

---

## 11. Monitoring & Maintenance

### Monitor System Resources
```bash
# Real-time monitoring
htop

# Memory usage
free -h

# Disk usage
df -h

# PM2 monitoring
pm2 monit
```

### View Logs
```bash
# PM2 logs
pm2 logs
pm2 logs manjula-web
pm2 logs manjula-api

# Nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log

# PostgreSQL logs
sudo tail -f /var/log/postgresql/postgresql-14-main.log
```

### Regular Maintenance Commands
```bash
# Restart applications
pm2 restart all

# Restart Nginx
sudo systemctl restart nginx

# Restart PostgreSQL
sudo systemctl restart postgresql

# Check PM2 status
pm2 status

# Clear PM2 logs
pm2 flush

# Update system
sudo apt update && sudo apt upgrade -y
```

### Backup Database
```bash
# Create backup script
nano ~/backup-db.sh
```

```bash
#!/bin/bash
BACKUP_DIR="/home/manjula/backups"
DATE=$(date +%Y%m%d_%H%M%S)
mkdir -p $BACKUP_DIR
pg_dump -U manjulauser -h localhost manjula > $BACKUP_DIR/manjula_$DATE.sql
# Keep only last 7 days
find $BACKUP_DIR -name "manjula_*.sql" -mtime +7 -delete
echo "Backup completed: manjula_$DATE.sql"
```

```bash
chmod +x ~/backup-db.sh
```

### Setup Cron for Auto Backup
```bash
crontab -e
```

Add:
```cron
# Backup database daily at 2 AM
0 2 * * * /home/manjula/backup-db.sh >> /home/manjula/logs/backup.log 2>&1

# Restart PM2 apps weekly (Sunday 3 AM)
0 3 * * 0 /usr/bin/pm2 restart all
```

---

## 🚀 Deployment Checklist

- [ ] Server setup complete
- [ ] Dependencies installed (Node.js, Bun, pnpm, PM2, PostgreSQL, Nginx)
- [ ] PostgreSQL configured and optimized
- [ ] Database created and migrations run
- [ ] Environment variables configured
- [ ] Applications built successfully
- [ ] PM2 processes running
- [ ] Nginx reverse proxy configured
- [ ] SSL certificate installed
- [ ] Swap space configured
- [ ] Domain DNS pointing to VPS IP
- [ ] Firewall configured
- [ ] Backups scheduled
- [ ] Monitoring setup

---

## 🔧 Troubleshooting

### Application won't start
```bash
pm2 logs
# Check error logs for specific issues
```

### Out of Memory
```bash
free -h
pm2 status
# Check memory usage, restart apps if needed
pm2 restart all
```

### Database Connection Issues
```bash
sudo systemctl status postgresql
sudo -u postgres psql -c "SELECT version();"
```

### Nginx Issues
```bash
sudo nginx -t
sudo systemctl status nginx
```

### High CPU Usage
```bash
top
# Identify process using high CPU
# Consider upgrading to KVM 2 if consistently high
```

---

## 📞 Quick Reference

**Restart All Services:**
```bash
pm2 restart all && sudo systemctl restart nginx
```

**View All Logs:**
```bash
pm2 logs --lines 50
```

**Check System Health:**
```bash
htop
df -h
free -h
pm2 status
```

---

## 🔄 Updating Your Application

```bash
cd ~/manjula
git pull origin main
pnpm install
pnpm db:migrate
cd apps/api && bun run build
cd ../web && pnpm build
pm2 restart all
```

---

## 📝 Notes

1. **Always backup before major changes**
2. **Monitor memory usage regularly** (4GB is limited)
3. **Consider external database** (Neon, Supabase) if memory is tight
4. **Use S3 for all media** - never store on VPS
5. **Set up monitoring** - UptimeRobot, Better Uptime, etc.
6. **Plan for scaling** - Be ready to upgrade to KVM 2 if needed

---

## 🎯 Performance Tips

1. **Enable Next.js Image Optimization** with external service (Cloudinary, imgix)
2. **Use CDN** (CloudFlare) for static assets
3. **Enable Redis caching** if you add it later
4. **Minimize API calls** - use SWR/React Query properly
5. **Lazy load components** - especially admin dashboard
6. **Database indexing** - ensure proper indexes on frequently queried columns

Good luck with your deployment! 🚀
