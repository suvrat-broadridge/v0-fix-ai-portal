const fs = require('fs')
const path = require('path')

const filePath = path.join(__dirname, '../app/page.tsx')
let content = fs.readFileSync(filePath, 'utf-8')

// Pattern: find each screen block's closing pattern:
//     </>
//     )
//   }
// And insert {aiAssistantPortal} before the </>

// Find all screen blocks using regex
const screenPattern = /^(\s+)if \(currentScreen === "[^"]+"\) \{/gm
const matches = []
let match

while ((match = screenPattern.exec(content)) !== null) {
  matches.push(match.index)
}

console.log(`Found ${matches.length} screen blocks`)

// For each screen block, find its closing pattern and inject the portal
let offset = 0
let modifications = 0

for (let i = 0; i < matches.length; i++) {
  const startIdx = matches[i] + offset
  const nextIdx = i + 1 < matches.length ? matches[i + 1] + offset : content.length

  // Look for the pattern within this screen block:
  //     </>
  //     )
  //   }
  const screenContent = content.substring(startIdx, nextIdx)
  
  // Find the closing </> of this screen
  const closingPattern = /\n(\s+)<\/>\n(\s+)\)\n(\s+)\}/
  const closingMatch = screenContent.match(closingPattern)
  
  if (closingMatch) {
    const matchPos = screenContent.indexOf(closingMatch[0])
    const insertPos = startIdx + matchPos + 1 // After the newline, before </>
    const indentation = closingMatch[1]
    
    // Check if this screen already has {aiAssistantPortal}
    const screenWithPortal = content.substring(startIdx, nextIdx)
    if (!screenWithPortal.includes('{aiAssistantPortal}')) {
      const insertText = `${indentation}{aiAssistantPortal}\n`
      content = content.substring(0, insertPos) + insertText + content.substring(insertPos)
      offset += insertText.length
      modifications++
      console.log(`Modified screen ${i + 1}`)
    } else {
      console.log(`Screen ${i + 1} already has portal, skipping`)
    }
  }
}

fs.writeFileSync(filePath, content, 'utf-8')
console.log(`\nDone! Modified ${modifications} screen blocks`)
