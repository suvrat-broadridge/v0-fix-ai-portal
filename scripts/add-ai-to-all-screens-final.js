const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../app/page.tsx');
let content = fs.readFileSync(filePath, 'utf-8');

// Split file into lines for easier processing
const lines = content.split('\n');
const newLines = [];

let i = 0;
let screensProcessed = 0;
let screensWithAI = 0;

while (i < lines.length) {
  const line = lines[i];
  
  // Check if this is a screen block start
  if (line.match(/^  if \(currentScreen === "[^"]+"\) \{/)) {
    const screenName = line.match(/currentScreen === "([^"]+)"/)[1];
    newLines.push(line);
    screensProcessed++;
    
    // Scan forward to find the end of this screen block
    let blockStartLine = i + 1;
    let depth = 1;
    let blockEndLine = -1;
    
    for (let j = i + 1; j < lines.length; j++) {
      if (lines[j].match(/^  if \(currentScreen === "[^"]*"\) \{/) || lines[j] === '  }') {
        if (lines[j] === '  }') {
          blockEndLine = j;
          break;
        }
      }
    }
    
    if (blockEndLine > 0) {
      // Extract the block content
      const blockLines = lines.slice(blockStartLine, blockEndLine);
      
      // Check if block already has <AIAssistant />
      const hasAI = blockLines.some(l => l.includes('<AIAssistant'));
      
      if (hasAI) {
        screensWithAI++;
        // Add lines as-is
        for (let j = blockStartLine; j < blockEndLine; j++) {
          newLines.push(lines[j]);
        }
      } else {
        // Add <AIAssistant /> before the closing )
        // Find the line with just ")"
        let closingLineIdx = -1;
        for (let j = blockEndLine - 1; j >= blockStartLine; j--) {
          if (lines[j].trim() === ')') {
            closingLineIdx = j;
            break;
          }
        }
        
        if (closingLineIdx > 0) {
          // Add all lines up to closing
          for (let j = blockStartLine; j < closingLineIdx; j++) {
            newLines.push(lines[j]);
          }
          // Add <AIAssistant /> with proper indentation
          newLines.push('      <AIAssistant />');
          // Add closing
          newLines.push(lines[closingLineIdx]);
        } else {
          // Fallback: just add all lines
          for (let j = blockStartLine; j < blockEndLine; j++) {
            newLines.push(lines[j]);
          }
        }
      }
      
      // Add closing brace
      newLines.push(lines[blockEndLine]);
      i = blockEndLine + 1;
      continue;
    }
  }
  
  newLines.push(line);
  i++;
}

const newContent = newLines.join('\n');
fs.writeFileSync(filePath, newContent, 'utf-8');
console.log(`✓ Processed ${screensProcessed} screens`);
console.log(`✓ ${screensWithAI} screens already had <AIAssistant />`);
console.log(`✓ Added <AIAssistant /> to ${screensProcessed - screensWithAI} screens`);

