#!/bin/bash

echo "=== GitHub Push with curl API ==="
echo ""

# Check if token is provided
if [ -z "$GITHUB_TOKEN" ]; then
    echo "❌ GITHUB_TOKEN not provided"
    echo ""
    echo "Please set your GitHub token:"
    echo "export GITHUB_TOKEN=your_token_here"
    echo ""
    echo "Or run with:"
    echo "GITHUB_TOKEN=your_token ./push_with_curl.sh"
    exit 1
fi

echo "✅ GitHub token found"
echo ""

# Get current commit
CURRENT_COMMIT=$(git rev-parse HEAD)
echo "✅ Current commit: $CURRENT_COMMIT"

# Get repository info
echo "📋 Checking repository..."
REPO_RESPONSE=$(curl -s -H "Authorization: token $GITHUB_TOKEN" \
    -H "Accept: application/vnd.github.v3+json" \
    https://api.github.com/repos/sidneysantossp/meuddd)

if echo "$REPO_RESPONSE" | grep -q "full_name"; then
    echo "✅ Repository accessible"
else
    echo "❌ Repository not accessible"
    echo "Response: $REPO_RESPONSE"
    exit 1
fi

# Get current branch
CURRENT_BRANCH=$(git branch --show-current)
echo "✅ Current branch: $CURRENT_BRANCH"

# Get the latest commit on remote
echo "📋 Checking remote branch..."
REMOTE_RESPONSE=$(curl -s -H "Authorization: token $GITHUB_TOKEN" \
    -H "Accept: application/vnd.github.v3+json" \
    https://api.github.com/repos/sidneysantossp/meuddd/git/refs/heads/$CURRENT_BRANCH)

if echo "$REMOTE_RESPONSE" | grep -q "object"; then
    REMOTE_COMMIT=$(echo "$REMOTE_RESPONSE" | grep -o '"object": *"[^"]*"' | cut -d'"' -f4)
    echo "✅ Remote commit: $REMOTE_COMMIT"
else
    echo "⚠️  Branch not found on remote, will create new branch"
    REMOTE_COMMIT=""
fi

# Check if we have commits to push
if [ "$REMOTE_COMMIT" = "$CURRENT_COMMIT" ]; then
    echo "✅ No commits to push - everything is up to date!"
    exit 0
fi

echo "📋 Commits to push:"
git log --oneline $REMOTE_COMMIT..$CURRENT_COMMIT

echo ""
echo "🚀 Pushing to GitHub..."

# Create a reference update request
if [ -n "$REMOTE_COMMIT" ]; then
    # Update existing reference
    PUSH_RESPONSE=$(curl -s -X PATCH \
        -H "Authorization: token $GITHUB_TOKEN" \
        -H "Accept: application/vnd.github.v3+json" \
        -H "Content-Type: application/json" \
        -d "{\"sha\":\"$CURRENT_COMMIT\",\"force\":false}" \
        https://api.github.com/repos/sidneysantossp/meuddd/git/refs/heads/$CURRENT_BRANCH)
else
    # Create new reference
    PUSH_RESPONSE=$(curl -s -X POST \
        -H "Authorization: token $GITHUB_TOKEN" \
        -H "Accept: application/vnd.github.v3+json" \
        -H "Content-Type: application/json" \
        -d "{\"ref\":\"refs/heads/$CURRENT_BRANCH\",\"sha\":\"$CURRENT_COMMIT\"}" \
        https://api.github.com/repos/sidneysantossp/meuddd/git/refs)
fi

if echo "$PUSH_RESPONSE" | grep -q "object"; then
    echo "✅ Successfully pushed to GitHub!"
    echo ""
    echo "🌐 Repository: https://github.com/sidneysantossp/meuddd"
    echo "🚀 Vercel will auto-deploy in 2-3 minutes"
    echo "📱 Site: https://meuddd.vercel.app"
    echo ""
    echo "🔍 Test the changes:"
    echo "1. Visit: https://meuddd.vercel.app/estado/acre/rio-branco"
    echo "2. Click on 'Sobre Rio Branco' tab"
    echo "3. Verify content is loading correctly"
else
    echo "❌ Failed to push to GitHub"
    echo "Response: $PUSH_RESPONSE"
    exit 1
fi