#!/usr/bin/env python3
import re

file_path = "app/page.tsx"

with open(file_path, "r") as f:
    content = f.read()

# Pattern: find each "return renderScreenWithAI(" and the matching ")" that closes it
# The closing pattern is:
#     </div>
#   )
#   }
# We need to change it to:
#     </div>
#   )
#   )
#   }

# This is a bit tricky, so we'll do it line by line
lines = content.split('\n')
in_render_screen = False
paren_depth = 0
result = []

for i, line in enumerate(lines):
    # Check if this line contains "return renderScreenWithAI("
    if "return renderScreenWithAI(" in line:
        in_render_screen = True
        paren_depth = 1  # We opened one paren with "renderScreenWithAI("
        # Count parens in the line
        paren_depth += line.count("(") - line.count(")") - 1  # -1 for the one we already counted
        result.append(line)
        continue
    
    if in_render_screen:
        # Track parentheses
        paren_depth += line.count("(") - line.count(")")
        
        # Check if this is the closing line with pattern "    )"
        if paren_depth == 1 and line.strip() == ")":
            # This closes renderScreenWithAI, we need to add another ) after it
            result.append(line)
            result.append("    )")  # Add the extra closing paren for renderScreenWithAI
            in_render_screen = False
            paren_depth = 0
            continue
        
        result.append(line)
        
        if paren_depth == 0:
            in_render_screen = False
    else:
        result.append(line)

with open(file_path, "w") as f:
    f.write('\n'.join(result))

print("✓ Wrapped all screens with renderScreenWithAI and aiAssistantPortal")
