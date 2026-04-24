const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../app/page.tsx');
let content = fs.readFileSync(filePath, 'utf-8');
const lines = content.split('\n');

let injected = 0;
let skipped = 0;

for (let i = 0; i < lines.length; i++) {
  // Find screen blocks
  if (lines[i].match(/^  if \(currentScreen === "[^"]+"\) \{/)) {
    const screenName = lines[i].match(/currentScreen === "([^"]+)"/)[1];
    
    // Find the return statement
    let returnStart = -1;
    for (let j = i + 1; j < Math.min(i + 10, lines.length); j++) {
      if (lines[j].includes('return (')) {
        returnStart = j;
        break;
      }
    }
    
    if (returnStart === -1) continue;
    
    // Find the end of this screen block (next if statement or end)
    let blockEnd = -1;
    for (let j = i + 1; j < lines.length; j++) {
      if (lines[j] === '  }' && (j === lines.length - 1 || lines[j + 1].match(/^  if \(currentScreen/))) {
        blockEnd = j;
        break;
      }
    }
    
    if (blockEnd === -1) continue;
    
    // Check if this screen already has <AIAssistant />
    const screenContent = lines.slice(returnStart, blockEnd).join('\n');
    if (screenContent.includes('<AIAssistant')) {
      skipped++;
      continue;
    }
    
    // Find the closing ) of the return statement
    let closingParen = -1;
    for (let j = blockEnd - 1; j >= returnStart; j--) {
      if (lines[j].trim() === ')') {
        closingParen = j;
        break;
      }
    }
    
    if (closingParen === -1) continue;
    
    // Find the last closing tag before the )
    let lastTagLine = -1;
    for (let j = closingParen - 1; j >= returnStart; j--) {
      if (lines[j].includes('</div>') || lines[j].includes('</>')) {
        lastTagLine = j;
        break;
      }
    }
    
    if (lastTagLine === -1) continue;
    
    // Add <AIAssistant /> on new line after the last tag
    // But we need to maintain indentation - it should be at the same level as the closing tag
    const lastTagIndent = lines[lastTagLine].match(/^\s*/)[0].length;
    const insertIndent = ' '.repeat(lastTagIndent);
    
    lines.splice(lastTagLine + 1, 0, insertIndent + '<AIAssistant />');
    injected++;
    
    // Skip ahead since we modified the array
    i = blockEnd + 1;
  }
}

fs.writeFileSync(filePath, lines.join('\n'), 'utf-8');
console.log(`✓ Added <AIAssistant /> to ${injected} screens`);
console.log(`✓ Skipped ${skipped} screens that already have it`);
