const fs = require('fs');

let content = fs.readFileSync('app/page.tsx', 'utf-8');
const lines = content.split('\n');

// Find all screen blocks and add <AIAssistant /> before the closing )
let modified = 0;
let i = 0;

while (i < lines.length) {
  // Look for screen blocks
  if (lines[i].match(/^\s{2}if\s*\(\s*currentScreen\s*===\s*"[^"]+"\s*\)\s*\{/)) {
    // Found a screen block, scan to find its return and closing
    let screenStart = i;
    let returnFound = false;
    let closingParen = -1;
    
    for (let j = i + 1; j < lines.length; j++) {
      if (lines[j].includes('return (')) {
        returnFound = true;
      }
      
      // Look for the closing ) of this screen block
      if (returnFound && lines[j].match(/^\s{2}\}/)) {
        closingParen = j - 1;
        break;
      }
    }
    
    if (closingParen > 0 && returnFound) {
      // Check if this screen already has <AIAssistant />
      let hasAI = false;
      for (let j = i + 1; j < closingParen; j++) {
        if (lines[j].includes('<AIAssistant')) {
          hasAI = true;
          break;
        }
      }
      
      if (!hasAI) {
        // Find the line with just ")" and add <AIAssistant /> before it
        if (closingParen >= 0 && lines[closingParen].trim() === ')') {
          lines.splice(closingParen, 0, '      <AIAssistant />');
          modified++;
        }
      }
    }
  }
  
  i++;
}

fs.writeFileSync('app/page.tsx', lines.join('\n'), 'utf-8');
console.log(`Added <AIAssistant /> to ${modified} screens`);
