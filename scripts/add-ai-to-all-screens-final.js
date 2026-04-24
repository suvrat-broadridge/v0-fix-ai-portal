const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../app/page.tsx');
let content = fs.readFileSync(filePath, 'utf-8');

// Find all screen block patterns - each screen is:
// if (currentScreen === "screen-name") {
//   return (
//     <div>...</div>
//   )
// }

// Strategy: Find each closing pattern of ")\n  }" that follows a screen return
// and inject <AIAssistant /> before the closing div

// Pattern: find lines that look like:
//      </div>
//    )
//  }
// And replace with:
//      </div>
//      <AIAssistant />
//    )
//  }

// But we need to be careful about nesting. Let's use a more targeted approach:
// 1. Split by "if (currentScreen ===" to find all screen blocks
// 2. For each block, find its return JSX and add <AIAssistant /> to it

const screenRegex = /if\s*\(\s*currentScreen\s*===\s*"([^"]+)"\s*\)\s*\{[\s\S]*?return\s*\(([\s\S]*?)\n\s{2}\}\s/g;

let match;
let replacements = 0;

while ((match = screenRegex.exec(content)) !== null) {
  const screenName = match[1];
  const returnContent = match[2];
  
  // Check if this screen already has <AIAssistant />
  if (returnContent.includes('<AIAssistant')) {
    console.log(`✓ Screen "${screenName}" already has <AIAssistant />`);
    continue;
  }
  
  // Find the last closing </div> or </> before the return ends
  // We need to insert <AIAssistant /> as a sibling to the main return element
  const lastDivMatch = returnContent.lastIndexOf('</div>');
  const lastFragmentMatch = returnContent.lastIndexOf('</>');
  
  const insertPos = Math.max(lastDivMatch + 6, lastFragmentMatch);
  
  if (insertPos > 0) {
    const newReturnContent = 
      returnContent.substring(0, insertPos) + 
      '\n      <AIAssistant />' + 
      returnContent.substring(insertPos);
    
    const oldBlock = match[0];
    const newBlock = oldBlock.replace(returnContent, newReturnContent);
    
    content = content.replace(oldBlock, newBlock);
    replacements++;
    console.log(`✓ Added <AIAssistant /> to screen "${screenName}"`);
  }
}

fs.writeFileSync(filePath, content, 'utf-8');
console.log(`\n✓ Successfully added <AIAssistant /> to ${replacements} screens`);
