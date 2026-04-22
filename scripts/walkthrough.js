#!/usr/bin/env node
/**
 * B-COMET Platform - Complete Application Walkthrough Script
 * 
 * This script automates a full walkthrough of the B-COMET Platform,
 * demonstrating all screens, features, and user journeys.
 * 
 * Usage: node scripts/walkthrough.js [--screenshots] [--video] [--fast]
 */

const { execSync, spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

// Configuration
const BASE_URL = 'http://localhost:3000';
const SCREENSHOT_DIR = path.join(__dirname, '..', 'public', 'walkthrough');
const DELAY_NORMAL = 1500;
const DELAY_FAST = 500;
const DELAY_LONG = 3000;

// Parse arguments
const args = process.argv.slice(2);
const TAKE_SCREENSHOTS = args.includes('--screenshots');
const FAST_MODE = args.includes('--fast');
const DELAY = FAST_MODE ? DELAY_FAST : DELAY_NORMAL;

// Ensure screenshot directory exists
if (TAKE_SCREENSHOTS) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

// Helper function to run agent-browser commands
function browser(cmd) {
  try {
    const result = execSync(`agent-browser ${cmd}`, { 
      encoding: 'utf8',
      timeout: 30000,
      stdio: ['pipe', 'pipe', 'pipe']
    });
    return result.trim();
  } catch (error) {
    console.error(`Browser command failed: ${cmd}`);
    console.error(error.message);
    return null;
  }
}

// Wait helper
function wait(ms = DELAY) {
  execSync(`sleep ${ms / 1000}`);
}

// Screenshot helper with step counter
let stepNumber = 0;
function screenshot(name) {
  if (TAKE_SCREENSHOTS) {
    stepNumber++;
    const filename = `${String(stepNumber).padStart(3, '0')}_${name}.png`;
    browser(`screenshot "${path.join(SCREENSHOT_DIR, filename)}"`);
    console.log(`  📸 Screenshot: ${filename}`);
  }
}

// Log helper
function log(message, type = 'info') {
  const icons = {
    info: 'ℹ️',
    step: '▶️',
    action: '🔹',
    success: '✅',
    section: '📍',
    wait: '⏳'
  };
  console.log(`${icons[type] || '•'} ${message}`);
}

// Click element by finding it in snapshot
async function clickByText(text) {
  const snapshot = browser('snapshot -i');
  if (!snapshot) return false;
  
  // Find element containing the text
  const lines = snapshot.split('\n');
  for (const line of lines) {
    if (line.toLowerCase().includes(text.toLowerCase())) {
      const match = line.match(/@e\d+/);
      if (match) {
        browser(`click ${match[0]}`);
        return true;
      }
    }
  }
  return false;
}

// Main walkthrough function
async function runWalkthrough() {
  console.log('\n' + '='.repeat(60));
  console.log('🚀 B-COMET Platform - Complete Application Walkthrough');
  console.log('='.repeat(60) + '\n');
  
  // =====================================================
  // SECTION 1: HOME PAGE & INITIAL NAVIGATION
  // =====================================================
  log('SECTION 1: Home Page & Initial Navigation', 'section');
  
  log('Opening application...', 'step');
  browser(`open ${BASE_URL}`);
  wait(DELAY_LONG);
  screenshot('01_home_page');
  
  log('Exploring home page hero section', 'action');
  browser('snapshot -i');
  wait(DELAY);
  
  // Test the FIX Message Creator demo button
  log('Testing FIX Message Creator demo access', 'step');
  browser('click "Try Message Creator"');
  wait(DELAY);
  screenshot('02_fix_message_creator_demo');
  
  // Go back to home
  browser(`open ${BASE_URL}`);
  wait(DELAY);
  
  // View presentation/demo
  log('Viewing platform presentation', 'step');
  browser('click "View Demo"');
  wait(DELAY);
  screenshot('03_presentation_slide1');
  
  // Navigate through a few slides
  for (let i = 0; i < 3; i++) {
    browser('click "Next"');
    wait(DELAY_FAST);
  }
  screenshot('04_presentation_slides');
  
  // Return to home
  browser(`open ${BASE_URL}`);
  wait(DELAY);
  
  // =====================================================
  // SECTION 2: ROLE SELECTION & LOGIN
  // =====================================================
  log('\nSECTION 2: Role Selection & Login', 'section');
  
  log('Clicking Login/Register button', 'step');
  browser('click "Login / Register"');
  wait(DELAY);
  screenshot('05_role_selection');
  
  // =====================================================
  // SECTION 3: ADMIN USER JOURNEY
  // =====================================================
  log('\nSECTION 3: Admin User Journey', 'section');
  
  log('Selecting Admin role', 'step');
  browser('snapshot -i');
  browser('click "Admin"');
  wait(DELAY);
  screenshot('06_admin_login');
  
  log('Entering admin credentials', 'action');
  browser('fill "Email" "admin@broadridge.com"');
  browser('fill "Password" "admin123"');
  screenshot('07_admin_login_filled');
  
  log('Submitting login', 'action');
  browser('click "Sign In"');
  wait(DELAY_LONG);
  screenshot('08_admin_dashboard');
  
  // =====================================================
  // SECTION 4: ADMIN DASHBOARD EXPLORATION
  // =====================================================
  log('\nSECTION 4: Admin Dashboard Exploration', 'section');
  
  log('Exploring dashboard metrics', 'step');
  browser('snapshot -i');
  wait(DELAY);
  
  log('Viewing onboarding pipeline', 'action');
  browser('scroll down 300');
  wait(DELAY);
  screenshot('09_dashboard_pipeline');
  
  log('Checking client list section', 'action');
  browser('scroll down 300');
  wait(DELAY);
  screenshot('10_dashboard_clients');
  
  // =====================================================
  // SECTION 5: CLIENT MANAGEMENT
  // =====================================================
  log('\nSECTION 5: Client Management', 'section');
  
  log('Navigating to Clients list', 'step');
  browser('click "Clients"');
  wait(DELAY);
  screenshot('11_clients_list');
  
  log('Selecting a client (Fidelity)', 'action');
  browser('snapshot -i');
  browser('click "Fidelity Investments"');
  wait(DELAY);
  screenshot('12_client_detail');
  
  log('Exploring client asset classes', 'action');
  browser('scroll down 200');
  wait(DELAY);
  screenshot('13_client_assets');
  
  // =====================================================
  // SECTION 6: ONBOARDING CASES
  // =====================================================
  log('\nSECTION 6: Onboarding Cases Management', 'section');
  
  log('Navigating to Onboarding Cases', 'step');
  browser('click "Onboarding Cases"');
  wait(DELAY);
  screenshot('14_onboarding_cases');
  
  log('Viewing case details', 'action');
  browser('snapshot -i');
  // Click on first case
  browser('click "View Details"');
  wait(DELAY);
  screenshot('15_case_detail');
  
  log('Exploring case workflow phases', 'action');
  browser('scroll down 200');
  wait(DELAY);
  screenshot('16_case_phases');
  
  // =====================================================
  // SECTION 7: CASE WORKFLOW (8-PHASE LIFECYCLE)
  // =====================================================
  log('\nSECTION 7: Case Workflow - 8-Phase Lifecycle', 'section');
  
  log('Opening Case Workflow view', 'step');
  browser('click "Open Workflow"');
  wait(DELAY);
  screenshot('17_case_workflow');
  
  log('Phase 1: Intake & Discovery', 'action');
  browser('snapshot -i');
  screenshot('18_phase1_intake');
  
  log('Phase 2: Solution Design & Configuration', 'action');
  browser('click "2"');
  wait(DELAY);
  screenshot('19_phase2_design');
  
  log('Phase 3: Connectivity Setup', 'action');
  browser('click "3"');
  wait(DELAY);
  screenshot('20_phase3_connectivity');
  
  log('Phase 4: Certification Planning', 'action');
  browser('click "4"');
  wait(DELAY);
  screenshot('21_phase4_cert_planning');
  
  log('Phase 5: Test Execution', 'action');
  browser('click "5"');
  wait(DELAY);
  screenshot('22_phase5_test_execution');
  
  log('Phase 6: Analysis & Remediation', 'action');
  browser('click "6"');
  wait(DELAY);
  screenshot('23_phase6_remediation');
  
  log('Phase 7: Certification Decisioning', 'action');
  browser('click "7"');
  wait(DELAY);
  screenshot('24_phase7_certification');
  
  log('Phase 8: Production Enablement', 'action');
  browser('click "8"');
  wait(DELAY);
  screenshot('25_phase8_production');
  
  // =====================================================
  // SECTION 8: ATDL WORKBENCH TOOLS
  // =====================================================
  log('\nSECTION 8: ATDL Workbench Tools', 'section');
  
  log('Opening ATDL Workbench', 'step');
  browser('click "ATDL Workbench"');
  wait(DELAY);
  screenshot('26_atdl_workbench');
  
  log('ATDL Compare tool', 'action');
  browser('click "ATDL Compare"');
  wait(DELAY);
  screenshot('27_atdl_compare');
  
  browser('click "ATDL Workbench"');
  wait(DELAY);
  
  log('ATDL Validate tool', 'action');
  browser('click "Validate ATDL"');
  wait(DELAY);
  screenshot('28_atdl_validate');
  
  browser('click "ATDL Workbench"');
  wait(DELAY);
  
  log('FIX to ATDL Converter', 'action');
  browser('click "FIX→ATDL"');
  wait(DELAY);
  screenshot('29_fix_to_atdl');
  
  browser('click "ATDL Workbench"');
  wait(DELAY);
  
  log('ATDL UI Preview', 'action');
  browser('click "Usage Preview"');
  wait(DELAY);
  screenshot('30_atdl_ui_preview');
  
  // =====================================================
  // SECTION 9: SPEC COMPARE TOOL
  // =====================================================
  log('\nSECTION 9: Spec Compare Tool', 'section');
  
  log('Opening Spec Compare', 'step');
  browser('click "Spec Compare"');
  wait(DELAY);
  screenshot('31_spec_compare');
  
  log('Selecting asset class for comparison', 'action');
  browser('snapshot -i');
  browser('click "Equities"');
  wait(DELAY);
  screenshot('32_spec_compare_equities');
  
  log('Running spec comparison', 'action');
  browser('click "Compare Specifications"');
  wait(DELAY_LONG);
  screenshot('33_spec_compare_results');
  
  // =====================================================
  // SECTION 10: LOG ANALYSIS TOOL
  // =====================================================
  log('\nSECTION 10: Log Analysis Tool', 'section');
  
  log('Opening Log Analysis', 'step');
  browser('click "Log Analysis"');
  wait(DELAY);
  screenshot('34_log_analysis');
  
  log('Exploring log parsing options', 'action');
  browser('snapshot -i');
  wait(DELAY);
  screenshot('35_log_analysis_options');
  
  // =====================================================
  // SECTION 11: VERIFIX TESTING SUITE
  // =====================================================
  log('\nSECTION 11: VeriFIX Testing Suite', 'section');
  
  log('Opening VeriFIX Testing', 'step');
  browser('click "Testing"');
  wait(DELAY);
  screenshot('36_verifix_testing');
  
  log('Viewing test scenario creation', 'action');
  browser('snapshot -i');
  wait(DELAY);
  screenshot('37_test_scenarios');
  
  log('Exploring test case generation', 'action');
  browser('scroll down 300');
  wait(DELAY);
  screenshot('38_test_case_gen');
  
  // =====================================================
  // SECTION 12: CONDUCTOR CERTIFICATION
  // =====================================================
  log('\nSECTION 12: Conductor Certification', 'section');
  
  log('Opening Conductor Certification', 'step');
  browser('click "Certification"');
  wait(DELAY);
  screenshot('39_conductor_certification');
  
  log('Viewing certification workflow', 'action');
  browser('snapshot -i');
  wait(DELAY);
  screenshot('40_certification_workflow');
  
  // =====================================================
  // SECTION 13: CLIENT CERT REPORT
  // =====================================================
  log('\nSECTION 13: Client Certification Report', 'section');
  
  log('Opening Client Cert Report', 'step');
  browser('click "Client Cert Report"');
  wait(DELAY);
  screenshot('41_client_cert_report');
  
  log('Exploring report sections', 'action');
  browser('scroll down 200');
  wait(DELAY);
  screenshot('42_cert_report_details');
  
  // =====================================================
  // SECTION 14: FIX MESSAGE CREATOR
  // =====================================================
  log('\nSECTION 14: FIX Message Creator', 'section');
  
  log('Opening FIX Message Creator', 'step');
  browser('click "FIX Message Creator"');
  wait(DELAY);
  screenshot('43_fix_message_creator');
  
  log('Creating a sample FIX message', 'action');
  browser('snapshot -i');
  wait(DELAY);
  screenshot('44_fix_message_form');
  
  // =====================================================
  // SECTION 15: ADMIN SPECS
  // =====================================================
  log('\nSECTION 15: Admin Specs Management', 'section');
  
  log('Opening Admin Specs', 'step');
  browser('click "Admin Specs"');
  wait(DELAY);
  screenshot('45_admin_specs');
  
  log('Viewing specification library', 'action');
  browser('snapshot -i');
  wait(DELAY);
  screenshot('46_specs_library');
  
  // =====================================================
  // SECTION 16: APPROVALS
  // =====================================================
  log('\nSECTION 16: Approvals Management', 'section');
  
  log('Opening Approvals', 'step');
  browser('click "Approvals"');
  wait(DELAY);
  screenshot('47_approvals');
  
  log('Viewing pending approvals', 'action');
  browser('snapshot -i');
  wait(DELAY);
  screenshot('48_approvals_pending');
  
  // =====================================================
  // SECTION 17: EVIDENCE VAULT
  // =====================================================
  log('\nSECTION 17: Evidence Vault', 'section');
  
  log('Opening Evidence Vault', 'step');
  browser('click "Evidence Vault"');
  wait(DELAY);
  screenshot('49_evidence_vault');
  
  log('Exploring evidence categories', 'action');
  browser('snapshot -i');
  wait(DELAY);
  screenshot('50_evidence_categories');
  
  // =====================================================
  // SECTION 18: GO-LIVE MANAGEMENT
  // =====================================================
  log('\nSECTION 18: Go-Live Management', 'section');
  
  log('Opening Go-Live screen', 'step');
  browser('click "Go-Live"');
  wait(DELAY);
  screenshot('51_go_live');
  
  log('Viewing go-live checklist', 'action');
  browser('snapshot -i');
  wait(DELAY);
  screenshot('52_go_live_checklist');
  
  // =====================================================
  // SECTION 19: REPORTS & ANALYTICS
  // =====================================================
  log('\nSECTION 19: Reports & Analytics', 'section');
  
  log('Opening Reports', 'step');
  browser('click "Reports"');
  wait(DELAY);
  screenshot('53_reports');
  
  log('Exploring analytics dashboard', 'action');
  browser('scroll down 200');
  wait(DELAY);
  screenshot('54_analytics');
  
  // =====================================================
  // SECTION 20: SETTINGS
  // =====================================================
  log('\nSECTION 20: Settings & Configuration', 'section');
  
  log('Opening Settings', 'step');
  browser('click "Settings"');
  wait(DELAY);
  screenshot('55_settings_profile');
  
  log('Viewing Profile settings', 'action');
  browser('snapshot -i');
  screenshot('56_settings_profile_form');
  
  log('Notifications settings', 'action');
  browser('click "Notifications"');
  wait(DELAY);
  screenshot('57_settings_notifications');
  
  log('Security settings', 'action');
  browser('click "Security"');
  wait(DELAY);
  screenshot('58_settings_security');
  
  log('Integrations settings', 'action');
  browser('click "Integrations"');
  wait(DELAY);
  screenshot('59_settings_integrations');
  
  log('Appearance settings', 'action');
  browser('click "Appearance"');
  wait(DELAY);
  screenshot('60_settings_appearance');
  
  log('API Keys settings', 'action');
  browser('click "API Keys"');
  wait(DELAY);
  screenshot('61_settings_api_keys');
  
  // =====================================================
  // SECTION 21: THEME TOGGLE
  // =====================================================
  log('\nSECTION 21: Theme Toggle (Dark/Light)', 'section');
  
  log('Switching to Light Mode', 'step');
  browser('click "Light Mode"');
  wait(DELAY);
  screenshot('62_light_mode');
  
  log('Switching back to Dark Mode', 'step');
  browser('click "Dark Mode"');
  wait(DELAY);
  screenshot('63_dark_mode');
  
  // =====================================================
  // SECTION 22: AI ASSISTANT
  // =====================================================
  log('\nSECTION 22: AI Assistant', 'section');
  
  log('Opening AI Assistant panel', 'step');
  browser('snapshot -i');
  // Look for AI assistant toggle button
  browser('click "AI"');
  wait(DELAY);
  screenshot('64_ai_assistant');
  
  log('Interacting with AI Assistant', 'action');
  browser('fill "How can I help" "Show me at-risk cases"');
  browser('press Enter');
  wait(DELAY_LONG);
  screenshot('65_ai_assistant_response');
  
  // =====================================================
  // SECTION 23: SIDEBAR COLLAPSE
  // =====================================================
  log('\nSECTION 23: Sidebar Navigation', 'section');
  
  log('Collapsing sidebar', 'step');
  browser('snapshot -i');
  browser('click "Collapse"');
  wait(DELAY);
  screenshot('66_sidebar_collapsed');
  
  log('Expanding sidebar', 'step');
  browser('click "Expand"');
  wait(DELAY);
  screenshot('67_sidebar_expanded');
  
  // =====================================================
  // SECTION 24: LOGOUT & CLIENT JOURNEY
  // =====================================================
  log('\nSECTION 24: Logout & Client User Journey', 'section');
  
  log('Logging out', 'step');
  browser('click "Logout"');
  wait(DELAY);
  screenshot('68_logged_out');
  
  // =====================================================
  // SECTION 25: CLIENT USER JOURNEY
  // =====================================================
  log('\nSECTION 25: Client User Journey', 'section');
  
  log('Starting client login flow', 'step');
  browser('click "Login / Register"');
  wait(DELAY);
  screenshot('69_role_select_client');
  
  log('Selecting Client role', 'action');
  browser('click "Client"');
  wait(DELAY);
  screenshot('70_client_login');
  
  log('Entering client credentials', 'action');
  browser('fill "Email" "client@fidelity.com"');
  browser('fill "Password" "client123"');
  screenshot('71_client_login_filled');
  
  log('Submitting client login', 'action');
  browser('click "Sign In"');
  wait(DELAY_LONG);
  screenshot('72_client_dashboard');
  
  // =====================================================
  // SECTION 26: CLIENT-SPECIFIC SCREENS
  // =====================================================
  log('\nSECTION 26: Client-Specific Screens', 'section');
  
  log('Opening My Specs', 'step');
  browser('click "My Specs"');
  wait(DELAY);
  screenshot('73_client_specs');
  
  log('Opening My Log Files', 'step');
  browser('click "My Log Files"');
  wait(DELAY);
  screenshot('74_client_log_files');
  
  // =====================================================
  // SECTION 27: CREATE NEW CASE
  // =====================================================
  log('\nSECTION 27: Create New Case', 'section');
  
  log('Opening Create Case form', 'step');
  browser('click "Create Case"');
  wait(DELAY);
  screenshot('75_create_case');
  
  log('Filling case details', 'action');
  browser('snapshot -i');
  browser('scroll down 200');
  wait(DELAY);
  screenshot('76_create_case_form');
  
  // =====================================================
  // SECTION 28: FINAL LOGOUT
  // =====================================================
  log('\nSECTION 28: Final Logout', 'section');
  
  log('Logging out client', 'step');
  browser('click "Logout"');
  wait(DELAY);
  screenshot('77_final_home');
  
  // =====================================================
  // WALKTHROUGH COMPLETE
  // =====================================================
  console.log('\n' + '='.repeat(60));
  console.log('✅ WALKTHROUGH COMPLETE');
  console.log('='.repeat(60));
  
  if (TAKE_SCREENSHOTS) {
    const files = fs.readdirSync(SCREENSHOT_DIR).filter(f => f.endsWith('.png'));
    console.log(`\n📸 Total screenshots captured: ${files.length}`);
    console.log(`📁 Location: ${SCREENSHOT_DIR}`);
  }
  
  console.log('\n📊 Sections Covered:');
  console.log('  1.  Home Page & Initial Navigation');
  console.log('  2.  Role Selection & Login');
  console.log('  3.  Admin User Journey');
  console.log('  4.  Admin Dashboard Exploration');
  console.log('  5.  Client Management');
  console.log('  6.  Onboarding Cases Management');
  console.log('  7.  Case Workflow - 8-Phase Lifecycle');
  console.log('  8.  ATDL Workbench Tools');
  console.log('  9.  Spec Compare Tool');
  console.log('  10. Log Analysis Tool');
  console.log('  11. VeriFIX Testing Suite');
  console.log('  12. Conductor Certification');
  console.log('  13. Client Certification Report');
  console.log('  14. FIX Message Creator');
  console.log('  15. Admin Specs Management');
  console.log('  16. Approvals Management');
  console.log('  17. Evidence Vault');
  console.log('  18. Go-Live Management');
  console.log('  19. Reports & Analytics');
  console.log('  20. Settings & Configuration');
  console.log('  21. Theme Toggle (Dark/Light)');
  console.log('  22. AI Assistant');
  console.log('  23. Sidebar Navigation');
  console.log('  24. Logout Flow');
  console.log('  25. Client User Journey');
  console.log('  26. Client-Specific Screens');
  console.log('  27. Create New Case');
  console.log('  28. Final Logout');
  
  console.log('\n');
  
  // Close browser
  browser('close');
}

// Generate HTML gallery from screenshots
function generateGallery() {
  if (!TAKE_SCREENSHOTS) return;
  
  const files = fs.readdirSync(SCREENSHOT_DIR)
    .filter(f => f.endsWith('.png'))
    .sort();
  
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>B-COMET Platform - Application Walkthrough</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { 
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: linear-gradient(135deg, #0a1628 0%, #1a2744 100%);
      min-height: 100vh;
      color: #e0e0e0;
      padding: 2rem;
    }
    .header {
      text-align: center;
      margin-bottom: 3rem;
    }
    .header h1 {
      font-size: 2.5rem;
      background: linear-gradient(90deg, #00e5ff, #4caf50);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-bottom: 0.5rem;
    }
    .header p { color: #a0a0a0; }
    .stats {
      display: flex;
      justify-content: center;
      gap: 2rem;
      margin: 2rem 0;
    }
    .stat {
      background: rgba(30, 73, 118, 0.3);
      padding: 1rem 2rem;
      border-radius: 12px;
      text-align: center;
    }
    .stat-value {
      font-size: 2rem;
      font-weight: bold;
      color: #00e5ff;
    }
    .stat-label { color: #a0a0a0; font-size: 0.9rem; }
    .gallery {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
      gap: 1.5rem;
      max-width: 1600px;
      margin: 0 auto;
    }
    .card {
      background: rgba(30, 73, 118, 0.2);
      border: 1px solid rgba(0, 229, 255, 0.2);
      border-radius: 12px;
      overflow: hidden;
      transition: all 0.3s ease;
    }
    .card:hover {
      transform: translateY(-4px);
      border-color: #00e5ff;
      box-shadow: 0 8px 32px rgba(0, 229, 255, 0.2);
    }
    .card img {
      width: 100%;
      height: 250px;
      object-fit: cover;
      object-position: top;
      border-bottom: 1px solid rgba(0, 229, 255, 0.2);
      cursor: pointer;
    }
    .card-content {
      padding: 1rem;
    }
    .card-number {
      display: inline-block;
      background: #00e5ff;
      color: #0a1628;
      font-weight: bold;
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      font-size: 0.8rem;
      margin-right: 0.5rem;
    }
    .card-title {
      color: #fff;
      font-weight: 500;
    }
    .lightbox {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.95);
      z-index: 1000;
      justify-content: center;
      align-items: center;
      padding: 2rem;
    }
    .lightbox.active { display: flex; }
    .lightbox img {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
    }
    .lightbox-close {
      position: absolute;
      top: 1rem;
      right: 1rem;
      color: #fff;
      font-size: 2rem;
      cursor: pointer;
      background: none;
      border: none;
    }
    .lightbox-nav {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      background: rgba(0, 229, 255, 0.2);
      border: none;
      color: #fff;
      font-size: 2rem;
      padding: 1rem;
      cursor: pointer;
      border-radius: 8px;
    }
    .lightbox-nav:hover { background: rgba(0, 229, 255, 0.4); }
    .lightbox-prev { left: 1rem; }
    .lightbox-next { right: 1rem; }
    .lightbox-info {
      position: absolute;
      bottom: 1rem;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(30, 73, 118, 0.8);
      padding: 0.5rem 1rem;
      border-radius: 8px;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>B-COMET Platform Walkthrough</h1>
    <p>Complete Application Functionality Demonstration</p>
  </div>
  
  <div class="stats">
    <div class="stat">
      <div class="stat-value">${files.length}</div>
      <div class="stat-label">Screenshots</div>
    </div>
    <div class="stat">
      <div class="stat-value">28</div>
      <div class="stat-label">Sections</div>
    </div>
    <div class="stat">
      <div class="stat-value">2</div>
      <div class="stat-label">User Roles</div>
    </div>
  </div>
  
  <div class="gallery">
    ${files.map((file, i) => {
      const name = file.replace(/^\d+_/, '').replace(/_/g, ' ').replace('.png', '');
      return `
    <div class="card" onclick="openLightbox(${i})">
      <img src="${file}" alt="${name}" loading="lazy">
      <div class="card-content">
        <span class="card-number">${i + 1}</span>
        <span class="card-title">${name.charAt(0).toUpperCase() + name.slice(1)}</span>
      </div>
    </div>`;
    }).join('')}
  </div>
  
  <div class="lightbox" id="lightbox">
    <button class="lightbox-close" onclick="closeLightbox()">&times;</button>
    <button class="lightbox-nav lightbox-prev" onclick="navLightbox(-1)">&#10094;</button>
    <img src="" alt="" id="lightbox-img">
    <button class="lightbox-nav lightbox-next" onclick="navLightbox(1)">&#10095;</button>
    <div class="lightbox-info" id="lightbox-info"></div>
  </div>
  
  <script>
    const files = ${JSON.stringify(files)};
    let currentIndex = 0;
    
    function openLightbox(index) {
      currentIndex = index;
      updateLightbox();
      document.getElementById('lightbox').classList.add('active');
    }
    
    function closeLightbox() {
      document.getElementById('lightbox').classList.remove('active');
    }
    
    function navLightbox(dir) {
      currentIndex = (currentIndex + dir + files.length) % files.length;
      updateLightbox();
    }
    
    function updateLightbox() {
      document.getElementById('lightbox-img').src = files[currentIndex];
      document.getElementById('lightbox-info').textContent = 
        \`\${currentIndex + 1} / \${files.length}: \${files[currentIndex].replace(/^\\d+_/, '').replace(/_/g, ' ').replace('.png', '')}\`;
    }
    
    document.addEventListener('keydown', (e) => {
      if (!document.getElementById('lightbox').classList.contains('active')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') navLightbox(-1);
      if (e.key === 'ArrowRight') navLightbox(1);
    });
  </script>
</body>
</html>`;

  fs.writeFileSync(path.join(SCREENSHOT_DIR, 'index.html'), html);
  console.log(`\n📄 Gallery generated: ${path.join(SCREENSHOT_DIR, 'index.html')}`);
}

// Run the walkthrough
runWalkthrough()
  .then(() => {
    generateGallery();
    process.exit(0);
  })
  .catch((error) => {
    console.error('Walkthrough failed:', error);
    browser('close');
    process.exit(1);
  });
