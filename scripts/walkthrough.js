#!/usr/bin/env node

/**
 * B-COMET Platform - Comprehensive Application Walkthrough
 * Demonstrates all screens, features, and user journeys
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const SCREENSHOT_DIR = path.join(__dirname, '../public/walkthroughs');
const WALKTHROUGH_LOG = path.join(SCREENSHOT_DIR, 'WALKTHROUGH_LOG.md');
const BASE_URL = 'http://localhost:3000';
const TAKE_SCREENSHOTS = process.argv.includes('--screenshots');

if (TAKE_SCREENSHOTS && !fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

let stepCounter = 0;
const walkthrough = [];

function log(msg) {
  console.log(msg);
  walkthrough.push(msg);
}

function section(title) {
  const divider = '='.repeat(70);
  log(`\n${divider}`);
  log(`📍 ${title}`);
  log(divider);
}

function browser(cmd) {
  try {
    return execSync(`agent-browser ${cmd}`, { 
      encoding: 'utf8',
      stdio: ['pipe', 'pipe', 'pipe'],
      timeout: 30000
    }).trim();
  } catch (e) {
    return '';
  }
}

function wait(ms = 1500) {
  execSync(`sleep ${ms / 1000}`);
}

function screenshot(name, desc) {
  if (!TAKE_SCREENSHOTS) return;
  stepCounter++;
  const filename = `${String(stepCounter).padStart(3, '0')}_${name}.png`;
  try {
    browser(`screenshot "${path.join(SCREENSHOT_DIR, filename)}"`);
    log(`  📸 ${desc}`);
  } catch (e) {
    log(`  ⚠️  Screenshot failed: ${name}`);
  }
}

function runWalkthrough() {
  log('\n' + '='.repeat(70));
  log('🚀 B-COMET PLATFORM - COMPREHENSIVE APPLICATION WALKTHROUGH');
  log('='.repeat(70));
  log('Started: ' + new Date().toLocaleString());
  
  try {
    // SECTION 1: HOME PAGE
    section('HOME PAGE & INITIAL NAVIGATION');
    log('▶️ Opening application...');
    browser(`open ${BASE_URL}`);
    browser('wait --load networkidle');
    wait(2000);
    screenshot('home_page', 'Home page loaded');
    
    // SECTION 2: HOME PAGE EXPLORATION
    section('HOME PAGE FEATURES');
    log('▶️ Exploring hero section and features');
    browser('scroll down 400');
    wait(1000);
    screenshot('hero_section', 'Hero and value propositions');
    
    browser('scroll down 400');
    wait(1000);
    screenshot('features_section', 'Key features overview');
    
    browser('scroll down 400');
    wait(1000);
    screenshot('benefits_section', 'Benefits and capabilities');
    
    browser('scroll to top');
    wait(1000);
    
    // SECTION 3: AUTHENTICATION
    section('AUTHENTICATION & ROLE SELECTION');
    log('▶️ Accessing authentication');
    const snapshot = browser('snapshot -q');
    const loginRef = findElementByText(snapshot, 'login');
    
    if (loginRef) {
      browser(`click ${loginRef}`);
      wait(1500);
      screenshot('role_selection', 'Role selection screen');
      
      // SECTION 4: ADMIN LOGIN
      section('ADMIN USER JOURNEY');
      log('▶️ Selecting Admin role...');
      const adminRef = findElementByText(browser('snapshot -q'), 'admin');
      if (adminRef) {
        browser(`click ${adminRef}`);
        wait(1500);
        screenshot('admin_login_form', 'Admin login form');
        
        // Fill credentials
        log('Entering credentials...');
        const emailInputs = browser('snapshot -q').match(/input.*email|email.*input/gi);
        if (emailInputs && emailInputs.length > 0) {
          browser('fill input[type="email"] "admin@broadridge.com"');
          browser('fill input[type="password"] "admin123"');
          wait(1000);
          screenshot('admin_credentials_filled', 'Login form filled');
          
          // Submit login
          log('Submitting login...');
          const signInRef = findElementByText(browser('snapshot -q'), 'sign in');
          if (signInRef) {
            browser(`click ${signInRef}`);
            browser('wait --load networkidle');
            wait(2000);
            screenshot('admin_dashboard', 'Admin Dashboard loaded');
            
            // SECTION 5: DASHBOARD EXPLORATION
            section('ADMIN DASHBOARD EXPLORATION');
            log('✓ Dashboard features:');
            log('  • Key metrics and statistics');
            log('  • Client pipeline status');
            log('  • Recent activities');
            log('  • Quick action buttons');
            
            browser('scroll down 300');
            wait(1000);
            screenshot('dashboard_metrics', 'Dashboard metrics section');
            
            browser('scroll down 300');
            wait(1000);
            screenshot('dashboard_pipeline', 'Onboarding pipeline status');
            
            browser('scroll down 300');
            wait(1000);
            screenshot('dashboard_clients', 'Client information section');
            
            // SECTION 6: MAIN NAVIGATION ITEMS
            section('NAVIGATING MAIN FEATURES');
            const navItems = [
              { label: 'Clients', screen: 'clients_list' },
              { label: 'Onboarding', screen: 'onboarding_cases' },
              { label: 'Case Workflow', screen: 'case_workflow' },
              { label: 'ATDL', screen: 'atdl_workbench' },
              { label: 'Testing', screen: 'testing_suite' },
              { label: 'Go-Live', screen: 'golive_management' },
              { label: 'Reports', screen: 'reports_analytics' },
              { label: 'Settings', screen: 'settings' }
            ];
            
            for (const item of navItems) {
              log(`\n▶️ Navigating to: ${item.label}`);
              const itemRef = findElementByText(browser('snapshot -q'), item.label);
              if (itemRef) {
                browser(`click ${itemRef}`);
                browser('wait --load networkidle');
                wait(1500);
                screenshot(item.screen, `${item.label} section`);
                
                // Go back to dashboard
                browser('scroll to top');
                wait(500);
              } else {
                log(`  ⚠️ Could not find: ${item.label}`);
              }
            }
            
            // SECTION 7: 8-PHASE WORKFLOW
            section('CASE WORKFLOW - 8-PHASE LIFECYCLE');
            log('▶️ Exploring workflow phases...');
            
            const phaseNames = [
              'Phase 1: Intake & Discovery',
              'Phase 2: Solution Design',
              'Phase 3: Connectivity Setup',
              'Phase 4: Certification Planning',
              'Phase 5: Test Execution',
              'Phase 6: Analysis & Remediation',
              'Phase 7: Certification Decisioning',
              'Phase 8: Production Enablement'
            ];
            
            for (let i = 1; i <= 8; i++) {
              log(`  📌 ${phaseNames[i-1]}`);
              const phaseRef = findElementByText(browser('snapshot -q'), `phase ${i}` + '' || `${i}`);
              if (phaseRef) {
                browser(`click ${phaseRef}`);
                wait(1000);
                screenshot(`workflow_phase_${i}`, phaseNames[i-1]);
              }
            }
            
            // SECTION 8: LOGOUT
            section('LOGOUT & CLIENT JOURNEY');
            log('▶️ Logging out as admin...');
            const logoutRef = findElementByText(browser('snapshot -q'), 'logout');
            if (logoutRef) {
              browser(`click ${logoutRef}`);
              wait(1500);
              screenshot('logged_out', 'Logged out - back to home');
              
              // SECTION 9: CLIENT LOGIN
              section('CLIENT USER JOURNEY');
              log('▶️ Starting client login flow...');
              
              const clientLoginRef = findElementByText(browser('snapshot -q'), 'login');
              if (clientLoginRef) {
                browser(`click ${clientLoginRef}`);
                wait(1500);
                screenshot('client_role_selection', 'Role selection for client');
                
                const clientRoleRef = findElementByText(browser('snapshot -q'), 'client');
                if (clientRoleRef) {
                  browser(`click ${clientRoleRef}`);
                  wait(1500);
                  screenshot('client_login_form', 'Client login form');
                  
                  log('Entering client credentials...');
                  browser('fill input[type="email"] "client@fidelity.com"');
                  browser('fill input[type="password"] "client123"');
                  screenshot('client_credentials_filled', 'Client credentials entered');
                  
                  const clientSignInRef = findElementByText(browser('snapshot -q'), 'sign in');
                  if (clientSignInRef) {
                    browser(`click ${clientSignInRef}`);
                    browser('wait --load networkidle');
                    wait(2000);
                    screenshot('client_dashboard', 'Client Dashboard');
                    
                    log('✓ Client dashboard features:');
                    log('  • My Cases');
                    log('  • Case Status');
                    log('  • Task List');
                    log('  • Documents');
                    log('  • Communications');
                    
                    browser('scroll down 300');
                    wait(1000);
                    screenshot('client_cases', 'Client cases list');
                    
                    browser('scroll down 300');
                    wait(1000);
                    screenshot('client_documents', 'Client documents section');
                  }
                }
              }
            }
          }
        }
      }
    }
    
  } catch (error) {
    log('\n❌ Error during walkthrough:');
    log(error.message);
  }
  
  // SUMMARY
  log('\n' + '='.repeat(70));
  log('✅ WALKTHROUGH COMPLETE');
  log('='.repeat(70));
  log(`Ended: ${new Date().toLocaleString()}`);
  log(`Total screenshots: ${stepCounter}`);
  
  // Write log
  fs.writeFileSync(WALKTHROUGH_LOG, walkthrough.join('\n'));
  log(`\n📄 Log saved to: ${path.relative(process.cwd(), WALKTHROUGH_LOG)}`);
  
  generateWalkthroughIndex();
}

function findElementByText(snapshot, text) {
  if (!snapshot) return null;
  const lines = snapshot.split('\n');
  for (const line of lines) {
    if (line.toLowerCase().includes(text.toLowerCase())) {
      const match = line.match(/@e\d+/);
      if (match) return match[0];
    }
  }
  return null;
}

function generateWalkthroughIndex() {
  if (!TAKE_SCREENSHOTS) return;
  
  const screenshots = fs.readdirSync(SCREENSHOT_DIR)
    .filter(f => f.endsWith('.png'))
    .sort();

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>B-COMET Platform - Complete Walkthrough</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: linear-gradient(135deg, #1e1e2e 0%, #2d2d44 100%);
      color: #e0e0e0;
    }
    .container { max-width: 1400px; margin: 0 auto; padding: 40px 20px; }
    h1 {
      font-size: 2.5em;
      margin-bottom: 10px;
      background: linear-gradient(135deg, #00d4ff, #7c3aed);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .gallery {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 20px;
      margin-top: 40px;
    }
    .screenshot {
      position: relative;
      overflow: hidden;
      border-radius: 8px;
      background: rgba(0, 0, 0, 0.3);
      border: 1px solid rgba(255, 255, 255, 0.1);
      cursor: pointer;
      transition: all 0.3s;
    }
    .screenshot:hover {
      transform: translateY(-5px);
      border-color: rgba(0, 212, 255, 0.5);
      box-shadow: 0 10px 30px rgba(0, 212, 255, 0.2);
    }
    .screenshot img {
      width: 100%;
      height: 200px;
      object-fit: cover;
    }
    .screenshot-name {
      padding: 15px;
      background: rgba(0, 0, 0, 0.5);
      font-size: 0.9em;
      color: #00d4ff;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>🚀 B-COMET Platform - Complete Walkthrough</h1>
    <p style="color: #888; margin-bottom: 30px;">
      ${screenshots.length} screenshots demonstrating all application features and user journeys
    </p>
    
    <div class="gallery">
      ${screenshots.map((file, idx) => `
        <div class="screenshot">
          <img src="${file}" alt="${file}" loading="lazy">
          <div class="screenshot-name">${file.replace(/\\.png$/, '')}</div>
        </div>
      `).join('')}
    </div>

    <div style="margin-top: 40px; text-align: center;">
      <a href="WALKTHROUGH_LOG.md" style="color: #00d4ff; text-decoration: none;">📄 View Walkthrough Log</a>
      &nbsp;|&nbsp;
      <a href="../screenshots/index.html" style="color: #00d4ff; text-decoration: none;">🖼️ Back to Screenshot Gallery</a>
    </div>
  </div>
</body>
</html>`;

  fs.writeFileSync(path.join(SCREENSHOT_DIR, 'walkthrough.html'), html);
  log('✓ Walkthrough index generated: walkthrough.html');
}

runWalkthrough();
