const https = require('https');
const fs = require('fs');
const { execSync } = require('child_process');

// Get the latest commit hash
const commitHash = execSync('git rev-parse HEAD', { encoding: 'utf8' }).trim();

// Get the file content
const filePath = './src/app/estado/[slug]/[citySlug]/page.tsx';
const fileContent = fs.readFileSync(filePath, 'utf8');

// Base64 encode the content
const contentBase64 = Buffer.from(fileContent).toString('base64');

// Prepare the API request
const data = JSON.stringify({
  message: 'Remove duplicate navbar from city pages',
  content: contentBase64,
  branch: 'master'
});

const options = {
  hostname: 'api.github.com',
  port: 443,
  path: '/repos/sidneysantossp/meuddd/contents/src/app/estado/%5Bslug%5D/%5BcitySlug%5D/page.tsx',
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length,
    'User-Agent': 'Node.js'
  }
};

console.log('Attempting to push to GitHub API...');
console.log('File:', filePath);
console.log('Commit:', commitHash);

const req = https.request(options, (res) => {
  console.log('Status:', res.statusCode);
  console.log('Headers:', res.headers);
  
  let responseData = '';
  res.on('data', (chunk) => {
    responseData += chunk;
  });
  
  res.on('end', () => {
    try {
      const response = JSON.parse(responseData);
      console.log('Response:', response);
      
      if (res.statusCode === 200 || res.statusCode === 201) {
        console.log('✅ Success! File pushed to GitHub');
      } else {
        console.log('❌ Failed to push file');
        console.log('Error:', response.message);
      }
    } catch (e) {
      console.log('Response:', responseData);
    }
  });
});

req.on('error', (error) => {
  console.error('Error:', error);
});

req.write(data);
req.end();
