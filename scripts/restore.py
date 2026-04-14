#!/usr/bin/env python3
import urllib.request
import ssl
import os

# Fetch from GitHub raw URL
url = "https://raw.githubusercontent.com/suvrat-broadridge/v0-fix-ai-portal/v0/suvratdandekar-2328-2c8b4e70/app/page.tsx"

print(f"Fetching from: {url}")

try:
    # Create SSL context that doesn't verify (for corporate networks)
    ctx = ssl.create_default_context()
    ctx.check_hostname = False
    ctx.verify_mode = ssl.CERT_NONE
    
    with urllib.request.urlopen(url, context=ctx) as response:
        content = response.read().decode('utf-8')
        
    # Write to file with absolute path
    output_path = '/vercel/share/v0-project/app/page.tsx'
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    
    with open(output_path, 'w') as f:
        f.write(content)
    
    print(f"✓ Successfully restored app/page.tsx ({len(content)} bytes)")
    print(f"  Lines: {content.count(chr(10))}")
    print(f"  Written to: {output_path}")
except Exception as e:
    print(f"✗ Error: {e}")
    import traceback
    traceback.print_exc()




