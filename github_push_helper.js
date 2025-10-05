const fs = require('fs');
const { exec } = require('child_process');

console.log('=== GitHub Push Helper ===');
console.log('');

// Check if we have the necessary files
const filePath = './src/app/estado/[slug]/[citySlug]/page.tsx';
if (fs.existsSync(filePath)) {
    console.log('✅ File exists:', filePath);
    
    // Check file content
    const content = fs.readFileSync(filePath, 'utf8');
    const hasNavbar = content.includes('Meu DDD</span>');
    const hasDuplicateNav = content.includes('Gerador</Link>');
    
    console.log('📋 File analysis:');
    console.log('   - Contains "Meu DDD":', hasNavbar);
    console.log('   - Contains duplicate navigation:', hasDuplicateNav);
    console.log('   - File size:', content.length, 'characters');
    
    // Check git status
    exec('git status', (error, stdout) => {
        console.log('');
        console.log('📊 Git Status:');
        console.log(stdout);
        
        if (stdout.includes('nothing to commit')) {
            console.log('✅ No changes to commit - everything is up to date');
        } else {
            console.log('📝 There are changes to commit');
        }
        
        console.log('');
        console.log('🚀 To push to GitHub, run one of these commands:');
        console.log('');
        console.log('Option 1 (Recommended):');
        console.log('  ./push_now.sh');
        console.log('');
        console.log('Option 2 (Direct):');
        console.log('  git push origin master');
        console.log('');
        console.log('Option 3 (With API):');
        console.log('  ./github_push_with_api.sh');
        console.log('');
        console.log('📝 Note: You will need to provide GitHub credentials');
    });
    
} else {
    console.log('❌ File not found:', filePath);
}
