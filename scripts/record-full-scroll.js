#!/usr/bin/env node

/**
 * Complete Application Recording - Full Scroll & Content Walkthrough
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'http://localhost:3000';
const OUTPUT_DIR = path.join(__dirname, '../public/recordings');
const FRAME_DIR = path.join(OUTPUT_DIR, 'frames');

fs.mkdirSync(FRAME_DIR, { recursive: true });

let frameNum = 0;

function log(msg) {
  console.log(`[${new Date().toISOString().slice(11, 19)}] ${msg}`);
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

function wait(ms = 600) {
  execSync(`sleep ${ms / 1000}`);
}

function captureFrame(name) {
  frameNum++;
  const filename = `frame_${String(frameNum).padStart(4, '0')}_${name}.png`;
  browser(`screenshot "${path.join(FRAME_DIR, filename)}"`);
  log(`  Frame ${frameNum}: ${name}`);
}

function scrollDown(amount = 3) {
  browser(`scroll down ${amount}`);
  wait(400);
}

function scrollToTop() {
  browser('scroll to top');
  wait(300);
}

log('\n' + '='.repeat(70));
log('RECORDING FULL APPLICATION WALKTHROUGH');
log('='.repeat(70));
log(`Started: ${new Date().toLocaleString()}`);
log('');

try {
  // OPEN APP
  log('\n--- LOADING APPLICATION ---');
  browser(`open ${BASE_URL}`);
  browser('wait --load networkidle');
  wait(1500);
  captureFrame('01_initial_load');
  
  // SECTION 1: FULL PAGE SCROLL
  log('\n--- SCROLLING THROUGH ENTIRE PAGE ---');
  
  // Start at top
  scrollToTop();
  captureFrame('02_hero_top');
  
  // Scroll down slowly capturing each section
  scrollDown(2);
  captureFrame('03_hero_section_1');
  
  scrollDown(2);
  captureFrame('04_hero_section_2');
  
  scrollDown(2);
  captureFrame('05_value_props_1');
  
  scrollDown(2);
  captureFrame('06_value_props_2');
  
  scrollDown(2);
  captureFrame('07_features_section');
  
  scrollDown(2);
  captureFrame('08_features_highlight_1');
  
  scrollDown(2);
  captureFrame('09_features_highlight_2');
  
  scrollDown(2);
  captureFrame('10_features_highlight_3');
  
  scrollDown(2);
  captureFrame('11_dashboard_features');
  
  scrollDown(2);
  captureFrame('12_workflow_features');
  
  scrollDown(2);
  captureFrame('13_tools_section');
  
  scrollDown(2);
  captureFrame('14_benefits_section');
  
  scrollDown(2);
  captureFrame('15_analytics_metrics');
  
  scrollDown(2);
  captureFrame('16_use_cases');
  
  scrollDown(2);
  captureFrame('17_integration_section');
  
  scrollDown(2);
  captureFrame('18_testimonials');
  
  scrollDown(2);
  captureFrame('19_cta_section');
  
  scrollDown(2);
  captureFrame('20_contact_info');
  
  scrollDown(2);
  captureFrame('21_footer_section');
  
  scrollDown(2);
  captureFrame('22_bottom_of_page');
  
  // SECTION 2: BACK TO TOP & INTERACTIVE ELEMENTS
  log('\n--- EXPLORING INTERACTIVE ELEMENTS ---');
  
  scrollToTop();
  wait(800);
  captureFrame('23_back_at_top');
  
  // Get snapshot to find buttons
  const snapshot = browser('snapshot');
  const hasGetStarted = snapshot.includes('Start') || snapshot.includes('Get Started') || snapshot.includes('Try');
  
  if (hasGetStarted) {
    log('  Found interactive buttons');
    captureFrame('24_buttons_visible');
  }
  
  // SECTION 3: FULL SCROLL AGAIN SLOWLY
  log('\n--- DETAILED SECOND PASS ---');
  
  for (let i = 0; i < 5; i++) {
    scrollDown(3);
    captureFrame(`25_scroll_pass2_${i + 1}`);
  }
  
  scrollToTop();
  wait(500);
  captureFrame('26_final_return_top');
  
  log('\n' + '='.repeat(70));
  log(`✅ Recording Complete!`);
  log(`Total frames captured: ${frameNum}`);
  log(`Saved to: ${FRAME_DIR}`);
  log('='.repeat(70));
  
} catch (e) {
  console.error('❌ Error:', e.message);
  process.exit(1);
}
