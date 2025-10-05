// Test ZAI import
try {
  const ZAI = require('z-ai-web-dev-sdk');
  console.log('ZAI imported successfully');
  console.log('ZAI type:', typeof ZAI);
  console.log('ZAI keys:', Object.keys(ZAI));
} catch (error) {
  console.error('Error importing ZAI:', error.message);
}
