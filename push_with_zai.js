const ZAI = require('z-ai-web-dev-sdk').default;

async function pushToGitHub() {
  try {
    const zai = new ZAI();
    
    // Read the file content
    const fs = require('fs');
    const filePath = './src/app/estado/[slug]/[citySlug]/page.tsx';
    const fileContent = fs.readFileSync(filePath, 'utf8');
    
    console.log('File content length:', fileContent.length);
    
    // Try to get GitHub push instructions
    const prompt = `
    I need to push code changes to GitHub repository: sidneysantossp/meuddd
    The file modified is: src/app/estado/[slug]/[citySlug]/page.tsx
    Changes: Removed duplicate navbar from city pages
    
    What's the best way to push these changes to GitHub without direct authentication?
    Can you provide a step-by-step guide or alternative method?
    `;
    
    const response = await zai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant for GitHub operations.'
        },
        {
          role: 'user',
          content: prompt
        }
      ]
    });
    
    console.log('ZAI Response:');
    console.log(response.choices[0]?.message?.content);
    
  } catch (error) {
    console.error('Error with ZAI:', error.message);
  }
}

pushToGitHub();
