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
    const snapshot = browser('snapshot -q');
    const lines = snapshot.split('\n');
    for (const line of lines) {
      if (line.toLowerCase().includes(text.toLowerCase()) && line.includes('@e')) {
        const match = line.match(/@e\d+/);
        if (match) return match[0];
      }
    }
  } catch (e) {}
  return null;
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
    
    browser('scroll down 500');
    wait(1000);
    screenshot('02_hero_section', 'Hero section - Platform overview');
    
    browser('scroll down 500');
    wait(1000);
    screenshot('03_features_overview', 'Features section - Core capabilities');
    
    browser('scroll down 500');
    wait(1000);
    screenshot('04_benefits_section', 'Benefits section - Value proposition');
    
    browser('scroll down 500');
    wait(1000);
    screenshot('05_footer_section', 'Footer - Contact information');
    
    // NAVIGATION TO LOGIN
    section('3. NAVIGATION & AUTHENTICATION');
    log('Returning to top and accessing login...');
    browser('scroll to top');
    wait(1000);
    
    // Look for login button or link
    let snapshot = browser('snapshot -q');
    let loginBtn = findButton('login') || findButton('sign in') || findButton('get started');
    
    if (loginBtn) {
      log(`Found login button: ${loginBtn}`);
      browser(`click ${loginBtn}`);
      browser('wait --load networkidle');
      wait(1500);
      screenshot('06_role_selection', 'Role selection screen');
    }
    
    // ADMIN JOURNEY
    section('4. ADMIN USER JOURNEY');
    snapshot = browser('snapshot -q');
    let adminBtn = findButton('admin');
    
    if (adminBtn) {
      log('Selecting Admin role...');
      browser(`click ${adminBtn}`);
      browser('wait --load networkidle');
      wait(1500);
      screenshot('07_admin_dashboard', 'Admin Dashboard - Main view');
      
      // Explore dashboard sections
      log('Exploring dashboard sections...');
      
      browser('scroll down 400');
      wait(1000);
      screenshot('08_dashboard_metrics', 'Dashboard - Key metrics');
      
      browser('scroll down 400');
      wait(1000);
      screenshot('09_dashboard_pipeline', 'Dashboard - Onboarding pipeline');
      
      browser('scroll down 400');
      wait(1000);
      screenshot('10_dashboard_activities', 'Dashboard - Recent activities');
      
      browser('scroll to top');
      wait(1000);
      
      // Navigation menu exploration
      section('5. ADMIN MENU NAVIGATION');
      log('Navigating through admin menu options...');
      
      snapshot = browser('snapshot -q');
      let clientsBtn = findButton('clients') || findButton('client management');
      if (clientsBtn) {
        browser(`click ${clientsBtn}`);
        browser('wait --load networkidle');
        wait(1500);
        screenshot('11_clients_list', 'Admin - Clients management');
        
        browser('scroll down 400');
        wait(1000);
        screenshot('12_clients_table', 'Admin - Clients table view');
      }
      
      snapshot = browser('snapshot -q');
      let casesBtn = findButton('cases') || findButton('case management');
      if (casesBtn) {
        browser(`click ${casesBtn}`);
        browser('wait --load networkidle');
        wait(1500);
        screenshot('13_cases_list', 'Admin - Cases overview');
        
        browser('scroll down 400');
        wait(1000);
        screenshot('14_cases_details', 'Admin - Case details');
      }
      
      // ATDL Tools section
      section('6. ATDL TOOLS & CONFIGURATION');
      snapshot = browser('snapshot -q');
      let atdlBtn = findButton('atdl') || findButton('algorithmic');
      if (atdlBtn) {
        browser(`click ${atdlBtn}`);
        browser('wait --load networkidle');
        wait(1500);
        screenshot('15_atdl_workbench', 'ATDL Workbench - Main interface');
        
        browser('scroll down 400');
        wait(1000);
        screenshot('16_atdl_strategies', 'ATDL - Strategy configurations');
        
        browser('scroll down 400');
        wait(1000);
        screenshot('17_atdl_parameters', 'ATDL - Algorithm parameters');
      }
      
      // Testing & Certification
      section('7. TESTING & CERTIFICATION');
      snapshot = browser('snapshot -q');
      let testBtn = findButton('test') || findButton('certification') || findButton('testing');
      if (testBtn) {
        browser(`click ${testBtn}`);
        browser('wait --load networkidle');
        wait(1500);
        screenshot('18_testing_dashboard', 'Testing Suite - Dashboard');
        
        browser('scroll down 400');
        wait(1000);
        screenshot('19_test_scenarios', 'Testing - Test scenarios');
        
        browser('scroll down 400');
        wait(1000);
        screenshot('20_test_results', 'Testing - Results analysis');
      }
      
      // Go-Live & Deployment
      section('8. GO-LIVE & DEPLOYMENT');
      snapshot = browser('snapshot -q');
      let goLiveBtn = findButton('go-live') || findButton('deployment') || findButton('launch');
      if (goLiveBtn) {
        browser(`click ${goLiveBtn}`);
        browser('wait --load networkidle');
        wait(1500);
        screenshot('21_golive_planning', 'Go-Live - Planning phase');
        
        browser('scroll down 400');
        wait(1000);
        screenshot('22_golive_readiness', 'Go-Live - Readiness checklist');
        
        browser('scroll down 400');
        wait(1000);
        screenshot('23_golive_execution', 'Go-Live - Execution timeline');
      }
      
      // Analytics & Reporting
      section('9. ANALYTICS & REPORTING');
      snapshot = browser('snapshot -q');
      let analyticsBtn = findButton('analytics') || findButton('reports') || findButton('reporting');
      if (analyticsBtn) {
        browser(`click ${analyticsBtn}`);
        browser('wait --load networkidle');
        wait(1500);
        screenshot('24_analytics_dashboard', 'Analytics - Dashboard view');
        
        browser('scroll down 400');
        wait(1000);
        screenshot('25_analytics_charts', 'Analytics - Performance charts');
        
        browser('scroll down 400');
        wait(1000);
        screenshot('26_analytics_reports', 'Analytics - Generated reports');
      }
      
      // Settings & Configuration
      section('10. SETTINGS & CONFIGURATION');
      snapshot = browser('snapshot -q');
      let settingsBtn = findButton('settings') || findButton('configuration');
      if (settingsBtn) {
        browser(`click ${settingsBtn}`);
        browser('wait --load networkidle');
        wait(1500);
        screenshot('27_settings_general', 'Settings - General configuration');
        
        browser('scroll down 400');
        wait(1000);
        screenshot('28_settings_security', 'Settings - Security options');
        
        browser('scroll down 400');
        wait(1000);
        screenshot('29_settings_advanced', 'Settings - Advanced options');
      }
    }
    
    // CLIENT JOURNEY
    section('11. CLIENT USER JOURNEY');
    log('Navigating to client dashboard...');
    browser('scroll to top');
    wait(1000);
    
    snapshot = browser('snapshot -q');
    let backBtn = findButton('back') || findButton('home');
    if (backBtn) {
      browser(`click ${backBtn}`);
      browser('wait --load networkidle');
      wait(1500);
    }
    
    snapshot = browser('snapshot -q');
    let clientBtn = findButton('client');
    if (clientBtn) {
      browser(`click ${clientBtn}`);
      browser('wait --load networkidle');
      wait(1500);
      screenshot('30_client_dashboard', 'Client Dashboard - Overview');
      
      browser('scroll down 400');
      wait(1000);
      screenshot('31_client_onboarding', 'Client - Onboarding status');
      
      browser('scroll down 400');
      wait(1000);
      screenshot('32_client_cases', 'Client - Active cases');
      
      browser('scroll down 400');
      wait(1000);
      screenshot('33_client_submissions', 'Client - Case submissions');
    }
    
    // WORKFLOWS & PROCESSES
    section('12. WORKFLOWS & PROCESSES');
    snapshot = browser('snapshot -q');
    let workflowBtn = findButton('workflow') || findButton('process');
    if (workflowBtn) {
      browser(`click ${workflowBtn}`);
      browser('wait --load networkidle');
      wait(1500);
      screenshot('34_workflow_builder', 'Workflow Builder - Canvas');
      
      browser('scroll down 400');
      wait(1000);
      screenshot('35_workflow_stages', 'Workflow - Process stages');
      
      browser('scroll down 400');
      wait(1000);
      screenshot('36_workflow_automation', 'Workflow - Automation rules');
    }
    
    // MONITORING & COMPLIANCE
    section('13. MONITORING & COMPLIANCE');
    snapshot = browser('snapshot -q');
    let monitorBtn = findButton('monitor') || findButton('compliance') || findButton('audit');
    if (monitorBtn) {
      browser(`click ${monitorBtn}`);
      browser('wait --load networkidle');
      wait(1500);
      screenshot('37_monitoring_console', 'Monitoring - Live console');
      
      browser('scroll down 400');
      wait(1000);
      screenshot('38_compliance_audit', 'Compliance - Audit logs');
      
      browser('scroll down 400');
      wait(1000);
      screenshot('39_compliance_reports', 'Compliance - Compliance reports');
    }
    
    // USER MANAGEMENT
    section('14. USER MANAGEMENT');
    snapshot = browser('snapshot -q');
    let usersBtn = findButton('users') || findButton('user management') || findButton('team');
    if (usersBtn) {
      browser(`click ${usersBtn}`);
      browser('wait --load networkidle');
      wait(1500);
      screenshot('40_users_list', 'User Management - Users list');
      
      browser('scroll down 400');
      wait(1000);
      screenshot('41_users_roles', 'User Management - Roles configuration');
      
      browser('scroll down 400');
      wait(1000);
      screenshot('42_users_permissions', 'User Management - Permissions matrix');
    }
    
    // DOCUMENTATION & HELP
    section('15. DOCUMENTATION & HELP');
    snapshot = browser('snapshot -q');
    let helpBtn = findButton('help') || findButton('documentation') || findButton('support');
    if (helpBtn) {
      browser(`click ${helpBtn}`);
      browser('wait --load networkidle');
      wait(1500);
      screenshot('43_help_center', 'Help Center - Documentation');
      
      browser('scroll down 400');
      wait(1000);
      screenshot('44_help_faq', 'Help Center - FAQ section');
      
      browser('scroll down 400');
      wait(1000);
      screenshot('45_help_support', 'Help Center - Support contact');
    }
    
    // PROFILE & PREFERENCES
    section('16. PROFILE & ACCOUNT');
    snapshot = browser('snapshot -q');
    let profileBtn = findButton('profile') || findButton('account') || findButton('preferences');
    if (profileBtn) {
      browser(`click ${profileBtn}`);
      browser('wait --load networkidle');
      wait(1500);
      screenshot('46_profile_settings', 'Profile - Account settings');
      
      browser('scroll down 300');
      wait(1000);
      screenshot('47_profile_preferences', 'Profile - User preferences');
      
      browser('scroll down 300');
      wait(1000);
      screenshot('48_profile_notifications', 'Profile - Notification settings');
    }
    
    // FINAL TOUR
    section('17. COMPLETE TOUR SUMMARY');
    browser('scroll to top');
    wait(1000);
    screenshot('49_final_home', 'Final view - Application home');
    
    log('\n✅ Walkthrough completed successfully!');
    log(`Total screenshots captured: ${stepCounter}`);
    log(`Timestamp: ${new Date().toLocaleString()}`);
    
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
