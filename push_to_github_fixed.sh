#!/bin/bash

# Script to push to GitHub using token-based authentication
# This script assumes you have a GitHub personal access token

echo "Attempting to push to GitHub..."

# Try to push (this will likely fail without proper authentication)
git push origin master

# If push fails, provide instructions
if [ $? -ne 0 ]; then
    echo ""
    echo "Push failed. This is expected without proper SSH key configuration."
    echo ""
    echo "To fix this, you have several options:"
    echo ""
    echo "1. Configure SSH keys for GitHub:"
    echo "   - Run: ssh-keygen -t rsa -b 4096 -C \"your_email@example.com\""
    echo "   - Add the public key to your GitHub account"
    echo "   - Test with: ssh -T git@github.com"
    echo ""
    echo "2. Use HTTPS with personal access token:"
    echo "   - Create a personal access token at GitHub Settings > Developer settings"
    echo "   - Run: git remote set-url origin https://your_token@github.com/sidneysantossp/meuddd.git"
    echo "   - Then: git push origin master"
    echo ""
    echo "3. Or simply trigger a rebuild from Vercel dashboard:"
    echo "   - Go to your Vercel project dashboard"
    echo "   - Click on the 'Redeploy' button"
    echo ""
    echo "Your changes are committed and ready to be pushed."
    echo "Once pushed, Vercel will automatically trigger a new deployment."
fi