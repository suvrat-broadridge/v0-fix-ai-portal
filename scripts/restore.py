#!/usr/bin/env python3
import subprocess
import os

# Use current directory (scripts run from project root)
cwd = '.'

# Restore app/page.tsx from git HEAD (last commit)
result = subprocess.run(['git', 'checkout', 'HEAD', 'app/page.tsx'], capture_output=True, text=True, cwd=cwd)
print("STDOUT:", result.stdout)
print("STDERR:", result.stderr)
print("Return code:", result.returncode)

if result.returncode == 0:
    print("\n✓ Successfully restored app/page.tsx from git")
else:
    print("\n✗ Failed to restore from git, trying alternative method...")
    # Try pulling from main branch
    result2 = subprocess.run(['git', 'show', 'main:app/page.tsx'], capture_output=True, text=True, cwd=cwd)
    if result2.returncode == 0:
        with open('app/page.tsx', 'w') as f:
            f.write(result2.stdout)
        print("✓ Restored from main branch")
    else:
        print("✗ Could not restore file")



