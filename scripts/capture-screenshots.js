#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const screenshotDir = '/vercel/share/v0-project/public/screenshots';
const baseUrl = 'http://localhost:3000';

// All screens to capture
const screens = [
  'home',
  'role-select',
  'login',
  'dashboard',
  'clients',
  'client-detail',
  'asset-tools',
  'workflow-overview',
  'intake-portal',
  'case-workflow',
  'spec-compare',
  'spec-compare-overview',
  'log-analysis',
  'scenario-creation',
  'test-case-gen',
  'certification-gen',
  'atdl-workbench',
  'atdl-guided-choices',
  'atdl-flow-select',
  'atdl-wizard',
  'atdl-validate',
  'atdl-ui-repr',
  'atdl-compare',
  'fix-atdl-compare',
  'fix-to-atdl',
  'atdl-remediation',
  'admin-specs',
  'client-specs',
  'client-log-files',
  'client-cert-report',
  'settings',
  'fix-msg-creator',
  'session-config',
  'field-mapping',
  'test-results',
  'go-live',
  'reports',
  'onboarding-cases',
  'create-case',
  'onboarding-case-detail',
  'presentation',
  'approvals',
  'evidence-vault',
  'prod-config',
  'rule-library',
  'ai-review-queue',
  'sla-analytics',
  'document-ingestion',
  'gap-analysis',
  'counterparty-profile',
  'fix-dictionary',
  'connectivity-setup',
  'connectivity-test',
  'cert-planning',
  'test-execution',
  'analysis-remediation',
  'cert-decisioning',
  'signoff-module',
  'go-live-manager',
  'post-go-live'
];

// Ensure directory exists
if (!fs.existsSync(screenshotDir)) {
  fs.mkdirSync(screenshotDir, { recursive: true });
}

let htmlIndex = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>B-COMET Platform - Screen Capture Index</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
      background: linear-gradient(135deg, #0a1628 0%, #1a2a3a 100%);
      color: #e0e0e0;
      padding: 40px 20px;
      min-height: 100vh;
    }
    
    .container {
      max-width: 1400px;
      margin: 0 auto;
    }
    
    header {
      text-align: center;
      margin-bottom: 50px;
      border-bottom: 2px solid #00e5ff;
      padding-bottom: 30px;
    }
    
    header h1 {
      font-size: 3em;
      background: linear-gradient(135deg, #00e5ff, #2196f3);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-bottom: 10px;
    }
    
    header p {
      font-size: 1.1em;
      color: #b0b0b0;
    }
    
    .stats {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
      margin-bottom: 40px;
      padding: 20px;
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid #00e5ff;
      border-radius: 8px;
    }
    
    .stat {
      text-align: center;
    }
    
    .stat-number {
      font-size: 2em;
      color: #00e5ff;
      font-weight: bold;
    }
    
    .stat-label {
      color: #b0b0b0;
      margin-top: 5px;
    }
    
    .screen-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 30px;
      margin-bottom: 40px;
    }
    
    .screen-card {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(0, 229, 255, 0.3);
      border-radius: 12px;
      overflow: hidden;
      transition: all 0.3s ease;
      display: flex;
      flex-direction: column;
    }
    
    .screen-card:hover {
      border-color: #00e5ff;
      transform: translateY(-5px);
      box-shadow: 0 10px 30px rgba(0, 229, 255, 0.2);
    }
    
    .screen-name {
      padding: 15px;
      background: rgba(0, 229, 255, 0.1);
      border-bottom: 1px solid rgba(0, 229, 255, 0.3);
      font-weight: 600;
      font-size: 0.95em;
      color: #00e5ff;
    }
    
    .screen-image {
      width: 100%;
      aspect-ratio: 16 / 9;
      background: #0a1628;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.9em;
      color: #666;
      position: relative;
      overflow: hidden;
    }
    
    .screen-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    
    .screen-image.placeholder {
      background: linear-gradient(135deg, rgba(0, 229, 255, 0.1) 0%, rgba(33, 150, 243, 0.1) 100%);
    }
    
    .screen-info {
      padding: 15px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      flex-grow: 1;
    }
    
    .screen-status {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      width: fit-content;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 0.85em;
      font-weight: 500;
    }
    
    .screen-status.captured {
      background: rgba(76, 175, 80, 0.2);
      color: #4caf50;
    }
    
    .screen-status.pending {
      background: rgba(255, 152, 0, 0.2);
      color: #ff9800;
    }
    
    .footer {
      text-align: center;
      padding: 30px;
      border-top: 1px solid rgba(0, 229, 255, 0.3);
      color: #888;
      margin-top: 50px;
    }
    
    .transition-section {
      margin-top: 50px;
      padding: 30px;
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(0, 229, 255, 0.3);
      border-radius: 12px;
    }
    
    .transition-section h2 {
      color: #00e5ff;
      margin-bottom: 20px;
      font-size: 1.5em;
    }
    
    .transition-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 20px;
    }
    
    .transition-item {
      padding: 15px;
      background: rgba(0, 229, 255, 0.05);
      border: 1px solid rgba(0, 229, 255, 0.2);
      border-radius: 8px;
    }
    
    .transition-item strong {
      color: #00e5ff;
    }
    
    @media (max-width: 768px) {
      header h1 {
        font-size: 1.8em;
      }
      
      .screen-grid {
        grid-template-columns: 1fr;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <h1>B-COMET Platform</h1>
      <p>Complete Screen Capture & Transition Guide</p>
    </header>
    
    <div class="stats">
      <div class="stat">
        <div class="stat-number">${screens.length}</div>
        <div class="stat-label">Total Screens</div>
      </div>
      <div class="stat">
        <div class="stat-number">2</div>
        <div class="stat-label">Roles (Admin/Client)</div>
      </div>
      <div class="stat">
        <div class="stat-number">5</div>
        <div class="stat-label">Asset Classes</div>
      </div>
    </div>
    
    <h2 style="color: #00e5ff; margin-bottom: 30px; font-size: 1.5em;">Screen Captures</h2>
    <div class="screen-grid">
`;

console.log('🎬 Starting screenshot capture...');
console.log(`📊 Total screens to capture: ${screens.length}`);

let capturedCount = 0;
let failedScreens = [];

// Try to open the app first
console.log('🌐 Opening application...');
try {
  execSync(`agent-browser open ${baseUrl}`, { 
    stdio: 'pipe',
    timeout: 10000 
  });
  console.log('✅ Application opened');
} catch (err) {
  console.warn('⚠️ Could not open application - app may not be running');
}

// Capture each screen
for (let i = 0; i < screens.length; i++) {
  const screen = screens[i];
  const screenshotFile = path.join(screenshotDir, `${screen}.png`);
  const relativePath = `screenshots/${screen}.png`;
  
  try {
    console.log(`📸 [${i + 1}/${screens.length}] Capturing ${screen}...`);
    
    // Navigate to screen using localStorage
    const commands = [
      `open ${baseUrl}`,
      `storage local set currentScreen "${screen}"`,
      `wait 2000`,
      `screenshot ${screenshotFile}`,
    ];
    
    execSync(`agent-browser batch "${commands.join('" "')}"`, {
      stdio: 'pipe',
      timeout: 30000
    });
    
    if (fs.existsSync(screenshotFile)) {
      console.log(`✅ Captured: ${screen}`);
      capturedCount++;
      
      htmlIndex += `
      <div class="screen-card">
        <div class="screen-name">${screen}</div>
        <div class="screen-image">
          <img src="${relativePath}" alt="${screen} screenshot" loading="lazy">
        </div>
        <div class="screen-info">
          <span class="screen-status captured">✓ Captured</span>
        </div>
      </div>
`;
    } else {
      console.warn(`⚠️ Screenshot file not created for ${screen}`);
      failedScreens.push(screen);
      
      htmlIndex += `
      <div class="screen-card">
        <div class="screen-name">${screen}</div>
        <div class="screen-image placeholder">
          Screenshot pending
        </div>
        <div class="screen-info">
          <span class="screen-status pending">⏳ Pending</span>
        </div>
      </div>
`;
    }
  } catch (err) {
    console.error(`❌ Error capturing ${screen}:`, err.message.slice(0, 100));
    failedScreens.push(screen);
    
    htmlIndex += `
    <div class="screen-card">
      <div class="screen-name">${screen}</div>
      <div class="screen-image placeholder">
        Capture failed
      </div>
      <div class="screen-info">
        <span class="screen-status pending">⚠️ Failed</span>
      </div>
    </div>
`;
  }
}

// Add transitions section
htmlIndex += `
    </div>
    
    <div class="transition-section">
      <h2>📍 Screen Transitions & Navigation Flow</h2>
      <div class="transition-grid">
        <div class="transition-item">
          <strong>Role Selection:</strong> role-select → login (Admin/Client)
        </div>
        <div class="transition-item">
          <strong>Login Flow:</strong> login → dashboard (for admins) or clients (for clients)
        </div>
        <div class="transition-item">
          <strong>Dashboard:</strong> dashboard → client-detail, workflow-overview, case-workflow
        </div>
        <div class="transition-item">
          <strong>Asset Tools:</strong> client-detail → asset-tools (per asset class)
        </div>
        <div class="transition-item">
          <strong>Workflow:</strong> workflow-overview → case-workflow, intake-portal, spec-compare
        </div>
        <div class="transition-item">
          <strong>ATDL Tools:</strong> Multiple screens (atdl-workbench, atdl-wizard, atdl-validate, etc.)
        </div>
        <div class="transition-item">
          <strong>Testing:</strong> test-case-gen → test-results → certification-gen
        </div>
        <div class="transition-item">
          <strong>Onboarding:</strong> onboarding-cases → onboarding-case-detail → create-case
        </div>
        <div class="transition-item">
          <strong>Go-Live:</strong> approvals → go-live → go-live-manager → post-go-live
        </div>
        <div class="transition-item">
          <strong>Comparison Tools:</strong> spec-compare, log-analysis, atdl-compare, fix-atdl-compare
        </div>
        <div class="transition-item">
          <strong>Configuration:</strong> session-config, fix-msg-creator, field-mapping, prod-config
        </div>
        <div class="transition-item">
          <strong>Analytics:</strong> sla-analytics, reports, ai-review-queue, gap-analysis
        </div>
      </div>
    </div>
    
    <footer>
      <p>Generated on ${new Date().toLocaleString()}</p>
      <p>Screens captured: <strong>${capturedCount}/${screens.length}</strong></p>
      ${failedScreens.length > 0 ? `<p style="color: #ff9800;">Failed captures: ${failedScreens.join(', ')}</p>` : ''}
    </footer>
  </div>
</body>
</html>`;

// Write HTML index
const indexPath = path.join(screenshotDir, 'index.html');
fs.writeFileSync(indexPath, htmlIndex);
console.log(`\n✅ Index file created: ${indexPath}`);

// Create a JSON manifest
const manifest = {
  platform: 'B-COMET Platform',
  generatedAt: new Date().toISOString(),
  totalScreens: screens.length,
  capturedScreens: capturedCount,
  failedScreens: failedScreens,
  screens: screens.map(screen => ({
    name: screen,
    path: `screenshots/${screen}.png`,
    captured: !failedScreens.includes(screen)
  }))
};

fs.writeFileSync(
  path.join(screenshotDir, 'manifest.json'),
  JSON.stringify(manifest, null, 2)
);
console.log(`✅ Manifest file created: ${path.join(screenshotDir, 'manifest.json')}`);

console.log(`\n📊 Summary:`);
console.log(`   Total screens: ${screens.length}`);
console.log(`   Captured: ${capturedCount}`);
console.log(`   Failed: ${failedScreens.length}`);
console.log(`\n📁 Files created in: ${screenshotDir}`);
console.log(`   - index.html (view in browser)`);
console.log(`   - manifest.json (data reference)`);
console.log(`   - *.png (individual screenshots)`);

process.exit(failedScreens.length > 0 ? 1 : 0);
