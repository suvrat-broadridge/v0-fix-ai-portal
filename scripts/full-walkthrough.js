#!/usr/bin/env node

/**
 * B-COMET Platform - Full Application Walkthrough
 * Navigates through all major screens and features
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const SCREENSHOT_DIR = path.join(__dirname, '../public/walkthroughs');
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
      timeout: 30000
    });
    return result.trim();
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

function runWalkthrough() {
  log('\n' + '='.repeat(80));
  log('🚀 B-COMET PLATFORM - FULL APPLICATION WALKTHROUGH');
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

    // HOME PAGE TOUR
    section('2. HOME PAGE OVERVIEW');
    log('Exploring home page sections...');
    
    browser('scroll down 3');
    wait(1000);
    screenshot('02_hero_section', 'Hero section with value proposition');
    
    browser('scroll down 3');
    wait(1000);
    screenshot('03_capabilities', 'Platform capabilities overview');
    
    browser('scroll down 3');
    wait(1000);
    screenshot('04_case_onboarding', 'Case-based onboarding feature');
    
    browser('scroll down 3');
    wait(1000);
    screenshot('05_ai_features', 'AI-powered features section');
    
    browser('scroll down 3');
    wait(1000);
    screenshot('06_approval_workflows', 'Approval workflows section');
    
    browser('scroll down 3');
    wait(1000);
    screenshot('07_footer', 'Footer and additional info');

    // TRY DEMO
    section('3. INTERACTIVE DEMO');
    log('Starting interactive demo...');
    browser('scroll to top');
    wait(1000);
    
    const demoBtn = 'e8'; // Start Interactive Demo
    if (demoBtn) {
      log('Clicking "Start Interactive Demo"...');
      browser(`click @${demoBtn}`);
      browser('wait --load networkidle');
      wait(2000);
      screenshot('08_demo_start', 'Demo - Started');
      
      browser('scroll down 2');
      wait(1000);
      screenshot('09_demo_section_1', 'Demo - Section 1');
      
      browser('scroll down 2');
      wait(1000);
      screenshot('10_demo_section_2', 'Demo - Section 2');
    }

    // START HERE BUTTON
    section('4. APPLICATION ENTRY');
    log('Navigating to main application...');
    browser('scroll to top');
    wait(1000);
    
    const startBtn = 'e4'; // Start Here
    if (startBtn) {
      log('Clicking "Start Here"...');
      browser(`click @${startBtn}`);
      browser('wait --load networkidle');
      wait(2000);
      screenshot('11_app_entry', 'Application - Entry point');
      
      browser('scroll down 2');
      wait(1000);
      screenshot('12_app_section_1', 'Application - Getting started');
    }

    // MESSAGE CREATOR
    section('5. MESSAGE CREATOR TOOL');
    log('Exploring Message Creator tool...');
    browser('scroll to top');
    wait(1000);
    
    const creatorBtn = 'e5'; // Try Message Creator Free
    if (creatorBtn) {
      log('Accessing Message Creator...');
      browser(`click @${creatorBtn}`);
      browser('wait --load networkidle');
      wait(2000);
      screenshot('13_message_creator', 'Message Creator - Main interface');
      
      browser('scroll down 2');
      wait(1000);
      screenshot('14_message_creator_tools', 'Message Creator - Tools panel');
      
      browser('scroll down 2');
      wait(1000);
      screenshot('15_message_creator_settings', 'Message Creator - Settings');
    }

    // VIEW DEMO
    section('6. VIEW DEMO SECTION');
    log('Viewing demo content...');
    browser('scroll to top');
    wait(1000);
    
    const viewDemoBtn = 'e6'; // View Demo
    if (viewDemoBtn) {
      log('Clicking "View Demo"...');
      browser(`click @${viewDemoBtn}`);
      browser('wait --load networkidle');
      wait(2000);
      screenshot('16_demo_video', 'Demo - Video player');
      
      browser('scroll down 2');
      wait(1000);
      screenshot('17_demo_description', 'Demo - Description and details');
    }

    // WORKFLOW VISUALIZATION
    section('7. WORKFLOW & PROCESS');
    log('Exploring workflow visualization...');
    browser('scroll to top');
    wait(1000);
    screenshot('18_workflow_diagram', 'Workflow - Process diagram (8 phases)');
    
    browser('scroll down 2');
    wait(1000);
    screenshot('19_workflow_details', 'Workflow - Phase details');
    
    browser('scroll down 2');
    wait(1000);
    screenshot('20_workflow_phases', 'Workflow - All phases displayed');

    // FEATURES DEEP DIVE
    section('8. DETAILED FEATURES');
    log('Exploring individual features...');
    
    const features = [
      'Case-Based Onboarding',
      'AI Spec Compare',
      'FIX Log Analysis',
      'ATDL Viewer',
      'AI Test Generation',
      'Scenario Generator',
      'Evidence Vault',
      'Approval Workflows'
    ];
    
    let screenshotNum = 21;
    for (let i = 0; i < Math.min(features.length, 5); i++) {
      browser('scroll down 2');
      wait(1000);
      screenshot(`${String(screenshotNum).padStart(2, '0')}_feature_${i+1}`, 
                 `Feature - ${features[i]}`);
      screenshotNum++;
    }

    // STATISTICS & METRICS
    section('9. PLATFORM STATISTICS');
    log('Viewing platform metrics...');
    browser('scroll to top');
    wait(500);
    browser('scroll down 1');
    wait(1000);
    screenshot('26_metrics_clients', 'Metrics - Clients and uptime');
    
    browser('scroll down 1');
    wait(1000);
    screenshot('27_metrics_messages', 'Metrics - Message volume');

    // CALL TO ACTION
    section('10. CALL TO ACTION');
    log('Viewing CTAs and contact options...');
    browser('scroll to bottom');
    wait(1000);
    screenshot('28_cta_section', 'Call to action - Get started');
    
    browser('scroll up 2');
    wait(1000);
    screenshot('29_contact_section', 'Contact information');

    // FINAL SNAPSHOT
    section('11. FINAL OVERVIEW');
    log('Taking final screenshots...');
    browser('scroll to top');
    wait(1000);
    screenshot('30_final_home', 'Final - Home page overview');

    // SUMMARY
    section('12. WALKTHROUGH COMPLETE');
    log('\n✅ Full application walkthrough completed successfully!');
    log(`Total screenshots captured: ${stepCounter}`);
    log(`Timestamp: ${new Date().toLocaleString()}`);
    log(`Location: ${SCREENSHOT_DIR}`);
    log('\nScreenshots are ready for review and documentation.');

    // Save log
    if (TAKE_SCREENSHOTS) {
      const logFile = path.join(SCREENSHOT_DIR, 'WALKTHROUGH_LOG.md');
      fs.writeFileSync(logFile, walkthrough.join('\n'));
      log(`Log saved to: ${logFile}`);
    }

  } catch (error) {
    log(`\n❌ Error during walkthrough: ${error.message}`);
    process.exit(1);
  }
}

// Run walkthrough
runWalkthrough();
