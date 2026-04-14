#!/usr/bin/env python3
import subprocess
import os

# Change to project directory
os.chdir('/vercel/share/v0-project') if os.path.exists('/vercel/share/v0-project') else os.chdir('.')

# Restore app/page.tsx from git
result = subprocess.run(['git', 'checkout', 'app/page.tsx'], capture_output=True, text=True, cwd='.')
print("STDOUT:", result.stdout)
print("STDERR:", result.stderr)
print("Return code:", result.returncode)

