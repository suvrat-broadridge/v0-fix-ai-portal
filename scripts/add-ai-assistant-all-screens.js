#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../app/page.tsx');
let content = fs.readFileSync(filePath, 'utf-8');
const lines = content.split('\n');

// Track screen blocks
let screenStarts = [];
let inScreen = false;
let screenStartLine = -1;
let braceCount = 0;

// Find all screen blocks: if (currentScreen === "...")
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  
  // Screen start pattern: "  if (currentScreen === ..."
  if (line.match(/^  if \(currentScreen === /)) {
    screenStarts.push({
      name: line.match(/currentScreen === "([^"]+)"/)?.[1] || 'unknown',
      startLine: i,
      endLine: -1,
      hasAIAssistant: false
    });
    inScreen = true;
    braceCount = 0;
  }
  
  if (inScreen && screenStarts.length > 0) {
    braceCount += (line.match(/{/g) || []).length;
    braceCount -= (line.match(/}/g) || []).length;
    
    // Screen ends when brace count returns to 0
    if (braceCount === 0 && line.trim() === '}') {
      screenStarts[screenStarts.length - 1].endLine = i;
      inScreen = false;
    }
  }
}

console.log(`Found ${screenStarts.length} screen blocks`);

// Check which screens have AIAssistant
for (const screen of screenStarts) {
  let hasAI = false;
  for (let i = screen.startLine; i <= screen.endLine; i++) {
    if (lines[i].includes('<AIAssistant />')) {
      hasAI = true;
      break;
    }
  }
  screen.hasAIAssistant = hasAI;
  if (hasAI) console.log(`✓ ${screen.name} (lines ${screen.startLine + 1}-${screen.endLine + 1}) - already has AIAssistant`);
  else console.log(`✗ ${screen.name} (lines ${screen.startLine + 1}-${screen.endLine + 1}) - needs AIAssistant`);
}

// Add AIAssistant to screens that don't have it
let modified = 0;
for (const screen of screenStarts) {
  if (screen.hasAIAssistant) continue;
  
  // Find the last closing </div> before the final ) }
  // Pattern: we want to add <AIAssistant /> as a sibling to the main div
  let insertLine = -1;
  
  // Look backwards from screen end to find where to insert
  for (let i = screen.endLine - 1; i >= screen.startLine; i--) {
    const line = lines[i];
    
    // Look for closing div pattern and closing paren
    if (line.match(/^\s+<\/div>\s*$/) || line.match(/^\s+<\/>\s*$/)) {
      insertLine = i;
      break;
    }
  }
  
  if (insertLine > 0) {
    // Check if line before insertLine is a proper closing
    if (lines[insertLine - 1].match(/^\s+<\/div>\s*$/) || lines[insertLine - 1].match(/^\s+<\/>\s*$/)) {
      // Insert after the inner div but before outer structure closes
      lines.splice(insertLine + 1, 0, '          <AIAssistant />');
      modified++;
      console.log(`  + Added AIAssistant to ${screen.name} at line ${insertLine + 1}`);
    }
  }
}

if (modified > 0) {
  const newContent = lines.join('\n');
  fs.writeFileSync(filePath, newContent, 'utf-8');
  console.log(`\nModified ${modified} screens. File saved.`);
} else {
  console.log('\nNo changes needed.');
}
