#!/bin/bash

# 2phi Website Deployment Script
# Uses LFTP with optimized configuration

set -e  # Exit on any error

echo "🚀 Starting deployment to FTP server..."

# Load LFTP configuration
if [ -f lftp.config ]; then
    source lftp.config
    echo "✅ Loaded LFTP configuration from lftp.config"
else
    echo "❌ Error: lftp.config file not found."
    echo "Please copy lftp.config.example to lftp.config and fill in your credentials."
    exit 1
fi

# Validate required configuration variables
if [ -z "$FTP_HOST" ] || [ -z "$FTP_USERNAME" ] || [ -z "$FTP_PASSWORD" ]; then
    echo "❌ Error: Missing required FTP configuration variables."
    echo "Please ensure FTP_HOST, FTP_USERNAME, and FTP_PASSWORD are set in lftp.config"
    exit 1
fi

# Set LFTP_PASSWORD for secure authentication
export LFTP_PASSWORD="$FTP_PASSWORD"

echo "📡 Connecting to $FTP_HOST..."

# LFTP deployment with optimized settings
lftp << EOF
set ftp:ssl-allow yes
set ftp:ssl-force no
set ftp:ssl-protect-data no
set ftp:use-feat yes
set ftp:passive-mode yes
set net:connection-limit 2
set net:max-retries 10
set net:timeout 60
set mirror:use-pget-n 1
set mirror:parallel-transfer-count 2
set mirror:no-empty-dirs true

# Connect using environment variables
open --env-password -u $FTP_USERNAME $FTP_HOST

# Upload the public directory with optimized settings for changed files
echo "📁 Uploading website files (detecting changed files)..."
# Mirror options explained:
# -R (reverse): Upload from local to remote
# --delete: Remove remote files that don't exist locally  
# --verbose: Show progress and file names
# --only-newer: Only transfer files newer than remote versions (perfect for images!)
# --continue: Resume interrupted transfers (great for large images)
# --use-cache: Cache directory listings for better performance
# --skip-noaccess: Skip files without read permission to avoid errors
# Note: Add --ignore-time if your server doesn't preserve timestamps well
mirror -R --delete --verbose --only-newer --continue --use-cache --skip-noaccess public/ /

# Disconnect
quit
EOF

if [ $? -eq 0 ]; then
    echo "✅ Deployment completed successfully!"
    echo "🌐 Website is now live at your configured domain"
else
    echo "❌ Deployment failed. Please check your FTP configuration and network connection."
    exit 1
fi 