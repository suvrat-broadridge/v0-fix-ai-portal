#!/usr/bin/env python3
import subprocess
import os

os.chdir('/vercel/share/v0-project')
result = subprocess.run(['git', 'checkout', 'app/page.tsx'], capture_output=True, text=True)
print(result.stdout)
print(result.stderr)
