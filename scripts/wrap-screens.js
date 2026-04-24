const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../app/page.tsx');
let content = fs.readFileSync(filePath, 'utf-8');

// Find all patterns like:
//   if (currentScreen === "...") {
//     return renderScreenWithAI(
//       <div>...</div>
//     )
//   }
//
// And convert to properly closed renderScreenWithAI calls

// Pattern: close the function call by changing "    )" to "    )\n  )"
// But only for sections that start with "return renderScreenWithAI("

const lines = content.split('\n');
let result = [];
let inRenderScreenWithAI = false;
let braceDepth = 0;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  
  // Check if this line starts a renderScreenWithAI
  if (line.includes('return renderScreenWithAI(')) {
    inRenderScreenWithAI = true;
    braceDepth = 0;
    result.push(line);
    continue;
  }
  
  // If we're in a renderScreenWithAI block, track JSX braces
  if (inRenderScreenWithAI) {
    // Count opening < and closing >
    const openBrackets = (line.match(/</g) || []).length;
    const closeBrackets = (line.match(/>/g) || []).length;
    braceDepth += openBrackets - closeBrackets;
    
    // Check if this is the closing line of renderScreenWithAI
    // Pattern: "    )" on a line by itself after the JSX closes
    if (line.match(/^\s{4}\)$/) && braceDepth === 0) {
      // This closes the JSX passed to renderScreenWithAI
      // Replace "    )" with "    )\n  )" to close the function call
      result.push('    )');
      result.push('  )');
      inRenderScreenWithAI = false;
      continue;
    }
  }
  
  result.push(line);
}

const output = result.join('\n');
fs.writeFileSync(filePath, output, 'utf-8');

console.log('✓ Successfully wrapped all screen returns with renderScreenWithAI');
console.log('  All screens now include AIAssistant portal in their returns');
