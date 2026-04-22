#!/usr/bin/env node

/**
 * B-COMET Platform - Complete Application Walkthrough
 * Walks through all 60+ screens and major user journeys
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
  const divider = '='.repeat(80);
  log(`\n${divider}`);
  log(`📍 ${title}`);
  log(divider);
}

function browser(cmd) {
  try {
    const result = execSync(`agent-browser ${cmd}`, { 
      encoding: 'utf8',
      stdio: ['pipe', 'pipe', 'pipe'],
      timeout: 30000,
      maxBuffer: 10 * 1024 * 1024
    }).trim();
    return result;
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
    log(`  📸 [${stepCounter}] ${desc}`);
  } catch (e) {
    log(`  ⚠️  Screenshot failed: ${name}`);
  }
}

function findButton(text) {
  try {
    const snapshot = browser('snapshot');
    const lines = snapshot.split('\n');
    
    // First try exact text match
    for (const line of lines) {
      if (line.includes(text) && line.match(/@e\d+/)) {
        const match = line.match(/@e\d+/);
        if (match) return match[0];
      }
    }
    
    // Then try case-insensitive partial match
    const lowerText = text.toLowerCase();
    for (const line of lines) {
      if (line.toLowerCase().includes(lowerText) && line.match(/@e\d+/)) {
        const match = line.match(/@e\d+/);
        if (match) return match[0];
      }
    }
  } catch (e) {
    // Continue silently
  }
  return null;
}

function clickElement(selector) {
  try {
    browser(`click ${selector}`);
    wait(1000);
    return true;
  } catch (e) {
    return false;
  }
}

function runWalkthrough() {
  log('\n' + '='.repeat(80));
  log('🚀 B-COMET PLATFORM - COMPREHENSIVE APPLICATION WALKTHROUGH');
  log('='.repeat(80));
  log(`Started: ${new Date().toLocaleString()}\n`);
  
  try {
    // OPEN APP
    section('1. INITIALIZING APPLICATION');
    log('Opening B-COMET Platform...');
    browser(`open ${BASE_URL}`);
    browser('wait --load networkidle');
    wait(2000);
    screenshot('01_home_page', 'Home page - Initial load');
    
    // SCROLL HOME PAGE
    section('2. EXPLORING HOME PAGE');
    log('Scrolling through home page content...');
    
    browser('scroll down 3');
    wait(1000);
    screenshot('02_hero_section', 'Hero section - Platform overview');
    
    browser('scroll down 3');
    wait(1000);
    screenshot('03_features_overview', 'Features section - Core capabilities');
    
    browser('scroll down 3');
    wait(1000);
    screenshot('04_benefits_section', 'Benefits section - Value proposition');
    
    browser('scroll down 3');
    wait(1000);
    screenshot('05_dashboard_features', 'Dashboard features - Advanced tools');
    
    browser('scroll down 3');
    wait(1000);
    screenshot('06_workflow_features', 'Workflow capabilities - Process automation');
    
    browser('scroll down 3');
    wait(1000);
    screenshot('07_footer_section', 'Footer - Contact information');
    
    // NAVIGATION TO MAIN APP
    section('3. ACCESSING APPLICATION FEATURES');
    log('Looking for navigation to app...');
    browser('scroll to top');
    wait(1000);
    
    // LOOK FOR BUTTONS TO ENTER MAIN APP
    let snapshot = browser('snapshot');
    
    // Try to find and click various entry points
    const entryPoints = ['Dashboard', 'Admin', 'Get Started', 'Start', 'Login', 'Enter', 'Access'];
    let foundEntry = false;
    
    for (const entry of entryPoints) {
      const btn = findButton(entry);
      if (btn) {
        log(`Found entry point: ${entry}`);
        clickElement(btn);
        browser('wait --load networkidle');
        wait(1500);
        screenshot(`08_app_${entry.toLowerCase()}`, `Entering - ${entry}`);
        foundEntry = true;
        break;
      }
    }
    
    // If no entry point, try scrolling to find interactive elements
    if (!foundEntry) {
      log('Exploring page for navigation elements...');
      browser('scroll down 5');
      wait(1000);
      screenshot('08_additional_content', 'Additional content section');
    }
    
    // DASHBOARD TOUR
    section('4. DASHBOARD & OVERVIEW');
    log('Exploring dashboard sections...');
    
    browser('scroll to top');
    wait(1000);
    screenshot('09_dashboard_main', 'Dashboard - Main view');
    
    browser('scroll down 3');
    wait(1000);
    screenshot('10_dashboard_metrics', 'Dashboard - Key metrics & statistics');
    
    browser('scroll down 3');
    wait(1000);
    screenshot('11_dashboard_pipeline', 'Dashboard - Onboarding pipeline');
    
    browser('scroll down 3');
    wait(1000);
    screenshot('12_dashboard_activities', 'Dashboard - Recent activities & events');
    
    // NAVIGATION & MENU EXPLORATION
    section('5. NAVIGATION MENU');
    log('Exploring navigation menu items...');
    
    snapshot = browser('snapshot');
    
    const menuItems = [
      'Dashboard', 'Workflow', 'Clients', 'Cases', 'Onboarding', 'Approvals', 
      'Evidence', 'Config', 'Library', 'Review', 'Analytics'
    ];
    
    let itemNum = 13;
    for (const item of menuItems) {
      const menuBtn = findButton(item);
      if (menuBtn) {
        log(`Clicking: ${item}`);
        clickElement(menuBtn);
        browser('wait --load networkidle');
        wait(1000);
        screenshot(`${String(itemNum).padStart(2, '0')}_menu_${item.toLowerCase().replace(/\s+/g, '_')}`, 
                   `Menu - ${item}`);
        itemNum++;
      }
    }
    
    // TOOLS SECTION
    section('6. TOOLS & UTILITIES');
    log('Exploring tools section...');
    
    const tools = [
      'Spec Compare', 'Log Analysis', 'Scenario', 'FIX Creator',
      'ATDL', 'Workbench', 'Validation', 'Compare'
    ];
    
    for (const tool of tools) {
      const toolBtn = findButton(tool);
      if (toolBtn) {
        log(`Opening tool: ${tool}`);
        clickElement(toolBtn);
        browser('wait --load networkidle');
        wait(1000);
        screenshot(`${String(itemNum).padStart(2, '0')}_tool_${tool.toLowerCase().replace(/\s+/g, '_')}`, 
                   `Tool - ${tool}`);
        itemNum++;
      }
    }
    
    // WORKFLOW STAGES
    section('7. WORKFLOW STAGES');
    log('Navigating through workflow stages...');
    
    const stages = [
      'Design', 'Compliance', 'Testing', 'UAT', 'Certification', 'Go-Live', 'Production'
    ];
    
    for (const stage of stages) {
      const stageBtn = findButton(stage);
      if (stageBtn) {
        log(`Viewing stage: ${stage}`);
        clickElement(stageBtn);
        browser('wait --load networkidle');
        wait(1000);
        screenshot(`${String(itemNum).padStart(2, '0')}_stage_${stage.toLowerCase().replace(/\s+/g, '_')}`, 
                   `Workflow Stage - ${stage}`);
        itemNum++;
      }
    }
    
    // ASSET CLASSES
    section('8. ASSET CLASS CONFIGURATIONS');
    log('Viewing asset class specific content...');
    
    const assetClasses = ['Equities', 'Options', 'Futures', 'Fixed Income', 'Commodities'];
    
    for (const assetClass of assetClasses) {
      const assetBtn = findButton(assetClass);
      if (assetBtn) {
        log(`Viewing asset class: ${assetClass}`);
        clickElement(assetBtn);
        browser('wait --load networkidle');
        wait(1000);
        screenshot(`${String(itemNum).padStart(2, '0')}_asset_${assetClass.toLowerCase().replace(/\s+/g, '_')}`, 
                   `Asset Class - ${assetClass}`);
        itemNum++;
      }
    }
    
    // USER ROLES
    section('9. USER ROLES & VIEWS');
    log('Exploring different user role perspectives...');
    
    const roles = ['Admin', 'Client', 'Analyst', 'Manager', 'Reviewer'];
    
    for (const role of roles) {
      const roleBtn = findButton(role);
      if (roleBtn) {
        log(`Switching to role: ${role}`);
        clickElement(roleBtn);
        browser('wait --load networkidle');
        wait(1000);
        screenshot(`${String(itemNum).padStart(2, '0')}_role_${role.toLowerCase()}`, 
                   `User Role - ${role} perspective`);
        itemNum++;
      }
    }
    
    // SETTINGS & CONFIGURATION
    section('10. SETTINGS & CONFIGURATION');
    log('Exploring settings and configuration options...');
    
    const settingsItems = [
      'Settings', 'Configuration', 'Security', 'Preferences', 'Advanced', 'API', 'Integrations'
    ];
    
    for (const setting of settingsItems) {
      const settingBtn = findButton(setting);
      if (settingBtn) {
        log(`Opening: ${setting}`);
        clickElement(settingBtn);
        browser('wait --load networkidle');
        wait(1000);
        screenshot(`${String(itemNum).padStart(2, '0')}_settings_${setting.toLowerCase().replace(/\s+/g, '_')}`, 
                   `Settings - ${setting}`);
        itemNum++;
      }
    }
    
    // ANALYTICS & REPORTING
    section('11. ANALYTICS & REPORTING');
    log('Viewing analytics and reports...');
    
    const analytics = ['Analytics', 'Reports', 'Performance', 'Metrics', 'SLA', 'Insights'];
    
    for (const item of analytics) {
      const btn = findButton(item);
      if (btn) {
        log(`Viewing: ${item}`);
        clickElement(btn);
        browser('wait --load networkidle');
        wait(1000);
        screenshot(`${String(itemNum).padStart(2, '0')}_analytics_${item.toLowerCase().replace(/\s+/g, '_')}`, 
                   `Analytics - ${item}`);
        itemNum++;
      }
    }
    
    // HELP & SUPPORT
    section('12. HELP & SUPPORT');
    log('Exploring help and support resources...');
    
    const help = ['Help', 'Documentation', 'FAQ', 'Support', 'Contact', 'About'];
    
    for (const item of help) {
      const btn = findButton(item);
      if (btn) {
        log(`Accessing: ${item}`);
        clickElement(btn);
        browser('wait --load networkidle');
        wait(1000);
        screenshot(`${String(itemNum).padStart(2, '0')}_help_${item.toLowerCase().replace(/\s+/g, '_')}`, 
                   `Help - ${item}`);
        itemNum++;
      }
    }
    
    // USER ACCOUNT
    section('13. USER ACCOUNT & PROFILE');
    log('Viewing user account options...');
    
    const account = ['Profile', 'Account', 'Preferences', 'Notifications', 'Logout'];
    
    for (const item of account) {
      const btn = findButton(item);
      if (btn) {
        log(`Accessing: ${item}`);
        if (item !== 'Logout') { // Don't actually logout
          clickElement(btn);
          browser('wait --load networkidle');
          wait(1000);
        }
        screenshot(`${String(itemNum).padStart(2, '0')}_account_${item.toLowerCase().replace(/\s+/g, '_')}`, 
                   `Account - ${item}`);
        itemNum++;
      }
    }
    
    // FINAL SUMMARY
    section('14. COMPLETE WALKTHROUGH SUMMARY');
    log('\n✅ Walkthrough completed successfully!');
    log(`Total screenshots captured: ${stepCounter}`);
    log(`Timestamp: ${new Date().toLocaleString()}`);
    log(`Coverage: ${itemNum - 1} unique screens/sections documented`);
    
    
  } catch (error) {
    log(`\n❌ Error during walkthrough: ${error.message}`);
    log(error.stack);
  }
  
  // Save log
  if (TAKE_SCREENSHOTS) {
    fs.writeFileSync(WALKTHROUGH_LOG, walkthrough.join('\n'));
    log(`\n📝 Log saved to: ${WALKTHROUGH_LOG}`);
  }
  
  log('\n' + '='.repeat(80));
  log('🏁 WALKTHROUGH COMPLETE');
  log('='.repeat(80) + '\n');
}

// Run the walkthrough
runWalkthrough();
