const fs = require('fs');

const content = fs.readFileSync('/vercel/share/v0-project/app/page.tsx', 'utf-8');
const lines = content.split('\n');
let result = [];
let i = 0;
let screensProcessed = 0;

while (i < lines.length) {
  result.push(lines[i]);
  
  // Detect screen blocks
  if (lines[i].match(/^\s{2}if\s*\(\s*currentScreen\s*===\s*"[^"]*"\s*\)\s*\{/)) {
    const screenName = lines[i].match(/"([^"]*)"/)[1];
    let depth = 1;
    let blockEnd = -1;
    let returnIdx = -1;
    
    // Find the matching closing brace
    for (let j = i + 1; j < lines.length && depth > 0; j++) {
      if (lines[j].match(/^\s{2}if\s*\(\s*currentScreen/)) {
        blockEnd = j;
        break;
      }
      if (lines[j].match(/^\s{2}\}$/)) {
        blockEnd = j;
        break;
      }
    }
    
    if (blockEnd > 0) {
      // Check if this block already has <AIAssistant />
      let hasAI = false;
      for (let j = i + 1; j < blockEnd; j++) {
        if (lines[j].includes('<AIAssistant')) {
          hasAI = true;
          break;
        }
      }
      
      // Add lines until just before the closing brace
      i++;
      while (i < blockEnd) {
        result.push(lines[i]);
        i++;
      }
      
      // If no AIAssistant, add it before the final closing brace
      if (!hasAI) {
        // Find the return closing - look for line with just ")"
        let lastReturnClose = -1;
        for (let j = result.length - 1; j >= Math.max(0, result.length - 30); j--) {
          if (result[j].trim() === ')') {
            lastReturnClose = j;
            break;
          }
        }
        
        if (lastReturnClose > 0) {
          result.splice(lastReturnClose, 0, '      <AIAssistant />');
          screensProcessed++;
        }
      }
      
      // Add closing brace
      result.push(lines[blockEnd]);
      i = blockEnd + 1;
      continue;
    }
  }
  
  i++;
}

fs.writeFileSync('/vercel/share/v0-project/app/page.tsx', result.join('\n'));
console.log(`✓ Added <AIAssistant /> to ${screensProcessed} screens`);
