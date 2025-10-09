const fs = require('fs');
const { exec } = require('child_process');
const https = require('https');

console.log('=== GitHub API Push ===');
console.log('');

// Function to make GitHub API requests
function githubAPIRequest(path, method = 'GET', data = null, token = null) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'api.github.com',
            port: 443,
            path: path,
            method: method,
            headers: {
                'User-Agent': 'Node.js GitHub Client',
                'Accept': 'application/vnd.github.v3+json'
            }
        };

        if (token) {
            options.headers['Authorization'] = `token ${token}`;
        }

        if (data) {
            options.headers['Content-Type'] = 'application/json';
        }

        const req = https.request(options, (res) => {
            let body = '';
            res.on('data', (chunk) => {
                body += chunk;
            });
            res.on('end', () => {
                try {
                    const result = JSON.parse(body);
                    resolve({ statusCode: res.statusCode, data: result });
                } catch (e) {
                    resolve({ statusCode: res.statusCode, data: body });
                }
            });
        });

        req.on('error', (error) => {
            reject(error);
        });

        if (data) {
            req.write(JSON.stringify(data));
        }
        req.end();
    });
}

// Function to get the current commit hash
function getCurrentCommit() {
    return new Promise((resolve, reject) => {
        exec('git rev-parse HEAD', (error, stdout) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(stdout.trim());
        });
    });
}

// Function to get the tree of the current commit
function getTree(commitHash) {
    return new Promise((resolve, reject) => {
        exec(`git ls-tree -r ${commitHash}`, (error, stdout) => {
            if (error) {
                reject(error);
                return;
            }
            
            const files = stdout.trim().split('\n').filter(line => line).map(line => {
                const parts = line.split(/\s+/);
                return {
                    mode: parts[0],
                    type: parts[1],
                    object: parts[2],
                    path: parts[3]
                };
            });
            
            resolve(files);
        });
    });
}

// Function to create a blob
async function createBlob(content, token) {
    const response = await githubAPIRequest('/repos/sidneysantossp/meuddd/git/blobs', 'POST', {
        content: content,
        encoding: 'utf-8'
    }, token);
    
    if (response.statusCode !== 201) {
        throw new Error(`Failed to create blob: ${response.statusCode}`);
    }
    
    return response.data.sha;
}

// Function to create a tree
async function createTree(baseTree, files, token) {
    const tree = [];
    
    for (const file of files) {
        if (file.path === '.git') continue; // Skip .git directory
        
        try {
            const content = fs.readFileSync(file.path, 'utf8');
            const blobSha = await createBlob(content, token);
            
            tree.push({
                path: file.path,
                mode: '100644',
                type: 'blob',
                sha: blobSha
            });
        } catch (error) {
            console.log(`Skipping ${file.path}: ${error.message}`);
        }
    }
    
    const response = await githubAPIRequest('/repos/sidneysantossp/meuddd/git/trees', 'POST', {
        base_tree: baseTree,
        tree: tree
    }, token);
    
    if (response.statusCode !== 201) {
        throw new Error(`Failed to create tree: ${response.statusCode}`);
    }
    
    return response.data.sha;
}

// Function to create a commit
async function createCommit(parent, tree, message, token) {
    const response = await githubAPIRequest('/repos/sidneysantossp/meuddd/git/commits', 'POST', {
        message: message,
        parents: [parent],
        tree: tree
    }, token);
    
    if (response.statusCode !== 201) {
        throw new Error(`Failed to create commit: ${response.statusCode}`);
    }
    
    return response.data.sha;
}

// Function to update reference
async function updateReference(commitSha, token) {
    const response = await githubAPIRequest('/repos/sidneysantossp/meuddd/git/refs/heads/master', 'PATCH', {
        sha: commitSha,
        force: false
    }, token);
    
    if (response.statusCode !== 200) {
        throw new Error(`Failed to update reference: ${response.statusCode}`);
    }
    
    return response.data;
}

// Main function
async function main() {
    try {
        console.log('📋 Checking current status...');
        
        // Get current commit
        const currentCommit = await getCurrentCommit();
        console.log(`✅ Current commit: ${currentCommit}`);
        
        // Get repository info
        const repoResponse = await githubAPIRequest('/repos/sidneysantossp/meuddd');
        if (repoResponse.statusCode !== 200) {
            throw new Error(`Repository not found: ${repoResponse.statusCode}`);
        }
        
        console.log(`✅ Repository found: ${repoResponse.data.full_name}`);
        console.log(`✅ Default branch: ${repoResponse.data.default_branch}`);
        
        // Get current tree
        const files = await getTree(currentCommit);
        console.log(`✅ Found ${files.length} files`);
        
        console.log('');
        console.log('🔑 To continue, we need a GitHub Personal Access Token');
        console.log('');
        console.log('Please create a token at: https://github.com/settings/tokens');
        console.log('Required permissions: ✅ repo');
        console.log('');
        console.log('Then run this script with:');
        console.log('GITHUB_TOKEN=your_token node github_api_push.js');
        console.log('');
        
    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

main();