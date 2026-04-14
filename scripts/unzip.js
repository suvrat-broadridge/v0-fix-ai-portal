const { execSync } = require('child_process');
const path = require('path');

const zipPath = path.join(__dirname, '..', 'b_WixtMLFN7gp.zip');
const extractPath = path.join(__dirname, '..', 'extracted');

try {
  execSync(`unzip -o "${zipPath}" -d "${extractPath}"`, { stdio: 'inherit' });
  console.log('Successfully extracted zip file to:', extractPath);
} catch (error) {
  console.error('Error extracting zip:', error.message);
}
