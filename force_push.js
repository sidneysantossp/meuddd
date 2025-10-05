const https = require('https');
const fs = require('fs');
const { execSync } = require('child_process');

console.log('=== Force Push to GitHub ===');
console.log('');

// Get current branch and commit info
const branch = 'master';
const commitHash = execSync('git rev-parse HEAD', { encoding: 'utf8' }).trim();
const commitMessage = execSync('git log -1 --pretty=format:"%s"', { encoding: 'utf8' }).trim();

console.log('Branch:', branch);
console.log('Commit:', commitHash);
console.log('Message:', commitMessage);
console.log('');

// Create a GitHub API request to update the branch reference
const data = JSON.stringify({
  ref: 'refs/heads/master',
  sha: commitHash
});

const options = {
  hostname: 'api.github.com',
  port: 443,
  path: '/repos/sidneysantossp/meuddd/git/refs/heads/master',
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length,
    'User-Agent': 'Node.js Push Script'
  }
};

console.log('Attempting to update branch reference...');
console.log('');

const req = https.request(options, (res) => {
  console.log('Status:', res.statusCode);
  console.log('');
  
  let responseData = '';
  res.on('data', (chunk) => {
    responseData += chunk;
  });
  
  res.on('end', () => {
    try {
      const response = JSON.parse(responseData);
      console.log('Response:', JSON.stringify(response, null, 2));
      
      if (res.statusCode === 200) {
        console.log('✅ Success! Branch updated');
      } else {
        console.log('❌ Failed to update branch');
        console.log('Error:', response.message);
      }
    } catch (e) {
      console.log('Raw response:', responseData);
    }
  });
});

req.on('error', (error) => {
  console.error('Error:', error.message);
});

req.write(data);
req.end();
