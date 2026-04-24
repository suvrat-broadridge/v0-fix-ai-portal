const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../app/page.tsx');
let content = fs.readFileSync(filePath, 'utf-8');

// Find all screen return patterns and update them
// Pattern: each screen returns early with return (...) or return (<div>...</div>)
// We need to:
// 1. Find each `return (` after screen conditionals
// 2. Wrap the JSX in a fragment <>...</>
// 3. Add {aiAssistantElement} before the closing </>

// Track how many screens we've already handled
let screensFound = 0;
let screensUpdated = 0;

// Find the first screen block line number and structure
const lines = content.split('\n');
const screenBlocks = [];

for (let i = 0; i < lines.length; i++) {
  if (lines[i].match(/^  if \(currentScreen ===/)) {
    // Find the corresponding return statement and closing brace
    let returnIdx = -1;
    let braceDepth = 0;
    for (let j = i; j < lines.length; j++) {
      if (lines[j].includes('return (')) {
        returnIdx = j;
        break;
      }
    }
    if (returnIdx > 0) {
      // Find the closing brace for this screen block
      braceDepth = 1;
      let closeIdx = -1;
      for (let j = returnIdx + 1; j < lines.length; j++) {
        if (lines[j].match(/^  \}$/)) {
          closeIdx = j;
          break;
        }
      }
      if (closeIdx > 0) {
        screenBlocks.push({ screenLine: i, returnLine: returnIdx, closeLine: closeIdx });
      }
    }
  }
}

console.log(`Found ${screenBlocks.length} screen blocks`);

// Process each screen block
for (const block of screenBlocks) {
  // Check if this screen block already has the AI Assistant element
  const blockContent = lines.slice(block.returnLine, block.closeLine + 1).join('\n');
  if (blockContent.includes('{aiAssistantElement}') || blockContent.includes('<AIAssistant')) {
    console.log(`Screen at line ${block.screenLine + 1} already has AI Assistant`);
    continue;
  }

  // The home screen (first one) was already updated manually, skip it
  if (screensUpdated === 0) {
    screensUpdated++;
    continue;
  }

  // Check if return statement starts with `return (` 
  const returnLine = lines[block.returnLine];
  if (!returnLine.includes('return (')) {
    console.log(`Screen at line ${block.screenLine + 1} has different return pattern, skipping`);
    continue;
  }

  // Check if the JSX is wrapped in a fragment already
  const jsxStart = block.returnLine + 1;
  if (lines[jsxStart]?.trim().startsWith('<>')) {
    // Already wrapped, just add aiAssistantElement before closing
    for (let i = jsxStart + 1; i < block.closeLine; i++) {
      if (lines[i].match(/^\s*<\/>\s*$/)) {
        lines[i] = '      {aiAssistantElement}\n    </>';
        screensUpdated++;
        break;
      }
    }
  } else {
    // Need to wrap in fragment
    // Change `return (` to `return (<>`
    lines[block.returnLine] = returnLine.replace('return (', 'return (\n      <>');

    // Find the closing of the return and add fragment close with AI element
    for (let i = block.closeLine - 1; i > block.returnLine; i--) {
      if (lines[i].match(/^\s*\)\s*$/)) {
        lines[i] = '      {aiAssistantElement}\n    </>\n    )';
        screensUpdated++;
        break;
      }
    }
  }
}

// Write the updated content
const updated = lines.join('\n');
fs.writeFileSync(filePath, updated, 'utf-8');

console.log(`Updated ${screensUpdated} screen blocks to include aiAssistantElement`);
