const { execSync } = require('child_process');
const path = require('path');

const zipPath = path.join('/vercel/share/v0-project', 'b_WixtMLFN7gp.zip');
const extractPath = path.join('/vercel/share/v0-project', 'extracted');

try {
  execSync(`unzip -o "${zipPath}" -d "${extractPath}"`, { stdio: 'inherit' });
  console.log('Successfully extracted zip file to:', extractPath);
} catch (error) {
  console.error('Error extracting zip:', error.message);
}
