#!/usr/bin/env node

/**
 * B-COMET Platform - Full Application Video Recording Walkthrough
 * Records a complete tour of the application from landing to all screens
 */

const { execSync, spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'http://localhost:3000';
const OUTPUT_DIR = path.join(__dirname, '../public/recordings');
const FRAME_DIR = path.join(OUTPUT_DIR, 'frames');

// Ensure directories exist
fs.mkdirSync(OUTPUT_DIR, { recursive: true });
fs.mkdirSync(FRAME_DIR, { recursive: true });

let frameNum = 0;

function log(msg) {
  console.log(`[${new Date().toISOString().slice(11, 19)}] ${msg}`);
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

function wait(ms = 800) {
  execSync(`sleep ${ms / 1000}`);
}

function captureFrame(name) {
  frameNum++;
  const filename = `frame_${String(frameNum).padStart(4, '0')}_${name}.png`;
  browser(`screenshot "${path.join(FRAME_DIR, filename)}"`);
  log(`  Frame ${frameNum}: ${name}`);
}

function captureMultipleFrames(name, count = 3, delayMs = 300) {
  for (let i = 0; i < count; i++) {
    captureFrame(`${name}_${i + 1}`);
    wait(delayMs);
  }
}

function findAndClick(text) {
  const snapshot = browser('snapshot');
  const lines = snapshot.split('\n');
  
  for (const line of lines) {
    if (line.toLowerCase().includes(text.toLowerCase()) && line.match(/@e\d+/)) {
      const match = line.match(/@e\d+/);
      if (match) {
        browser(`click ${match[0]}`);
        wait(500);
        return true;
      }
    }
  }
  return false;
}

function scrollAndCapture(name, scrollAmount = 3, frames = 5) {
  for (let i = 0; i < frames; i++) {
    captureFrame(`${name}_scroll_${i + 1}`);
    browser(`scroll down ${scrollAmount}`);
    wait(400);
  }
}

// ============================================================================
// MAIN WALKTHROUGH
// ============================================================================

function runWalkthrough() {
  log('');
  log('='.repeat(70));
  log('B-COMET PLATFORM - FULL APPLICATION VIDEO RECORDING');
  log('='.repeat(70));
  log(`Started: ${new Date().toLocaleString()}`);
  log('');

  try {
    // ========================================================================
    // SECTION 1: LANDING PAGE
    // ========================================================================
    log('\n--- SECTION 1: LANDING PAGE ---');
    
    browser(`open ${BASE_URL}`);
    browser('wait --load networkidle');
    wait(1500);
    
    captureMultipleFrames('landing_hero', 5, 200);
    
    // Scroll through landing page
    scrollAndCapture('landing', 2, 8);
    
    browser('scroll to top');
    wait(500);
    captureFrame('landing_top');

    // ========================================================================
    // SECTION 2: LOGIN / REGISTER - ROLE SELECTION
    // ========================================================================
    log('\n--- SECTION 2: ROLE SELECTION ---');
    
    if (findAndClick('Login / Register') || findAndClick('Login') || findAndClick('Sign In')) {
      browser('wait --load networkidle');
      wait(1000);
      captureMultipleFrames('role_selection', 5, 300);
    }

    // ========================================================================
    // SECTION 3: ADMIN LOGIN & DASHBOARD
    // ========================================================================
    log('\n--- SECTION 3: ADMIN LOGIN ---');
    
    if (findAndClick('Admin')) {
      browser('wait --load networkidle');
      wait(800);
      captureMultipleFrames('admin_login_form', 3, 300);
      
      // Fill login form
      const snapshot = browser('snapshot');
      const emailMatch = snapshot.match(/textbox.*email.*(@e\d+)/i) || snapshot.match(/Email.*(@e\d+)/i);
      if (emailMatch) {
        browser(`fill ${emailMatch[1]} "admin@broadridge.com"`);
        wait(300);
        captureFrame('admin_email_filled');
      }
      
      const passMatch = snapshot.match(/textbox.*password.*(@e\d+)/i) || snapshot.match(/Password.*(@e\d+)/i);
      if (passMatch) {
        browser(`fill ${passMatch[1]} "password123"`);
        wait(300);
        captureFrame('admin_password_filled');
      }
      
      captureFrame('admin_login_ready');
      
      // Click login button
      if (findAndClick('Sign In') || findAndClick('Login') || findAndClick('Submit')) {
        browser('wait --load networkidle');
        wait(1500);
      }
    }

    // ========================================================================
    // SECTION 4: ADMIN DASHBOARD
    // ========================================================================
    log('\n--- SECTION 4: ADMIN DASHBOARD ---');
    
    captureMultipleFrames('admin_dashboard', 5, 400);
    scrollAndCapture('admin_dashboard', 2, 6);
    browser('scroll to top');
    wait(500);

    // ========================================================================
    // SECTION 5: ADMIN NAVIGATION - ALL SCREENS
    // ========================================================================
    log('\n--- SECTION 5: ADMIN SCREENS ---');
    
    const adminScreens = [
      { name: 'Onboarding Cases', clicks: ['Cases', 'Onboarding'] },
      { name: 'Clients', clicks: ['Clients'] },
      { name: 'Approvals', clicks: ['Approvals'] },
      { name: 'Evidence Vault', clicks: ['Evidence', 'Vault'] },
      { name: 'Analytics', clicks: ['Analytics', 'SLA'] },
      { name: 'AI Review', clicks: ['AI Review', 'Review Queue'] },
      { name: 'Rule Library', clicks: ['Rule Library', 'Rules'] },
      { name: 'Settings', clicks: ['Settings'] },
    ];
    
    for (const screen of adminScreens) {
      log(`  Navigating to: ${screen.name}`);
      let clicked = false;
      for (const clickTarget of screen.clicks) {
        if (findAndClick(clickTarget)) {
          clicked = true;
          break;
        }
      }
      if (clicked) {
        browser('wait --load networkidle');
        wait(1000);
        captureMultipleFrames(`admin_${screen.name.toLowerCase().replace(/\s+/g, '_')}`, 3, 400);
        scrollAndCapture(`admin_${screen.name.toLowerCase().replace(/\s+/g, '_')}`, 2, 3);
      }
    }

    // ========================================================================
    // SECTION 6: ADMIN TOOLS
    // ========================================================================
    log('\n--- SECTION 6: ADMIN TOOLS ---');
    
    const tools = [
      'Spec Compare',
      'Log Analysis',
      'Scenario Creation',
      'Test Case',
      'Certification',
      'ATDL',
      'FIX Message',
    ];
    
    for (const tool of tools) {
      log(`  Opening tool: ${tool}`);
      if (findAndClick(tool)) {
        browser('wait --load networkidle');
        wait(1000);
        captureMultipleFrames(`tool_${tool.toLowerCase().replace(/\s+/g, '_')}`, 4, 400);
        scrollAndCapture(`tool_${tool.toLowerCase().replace(/\s+/g, '_')}`, 2, 3);
        
        // Go back to dashboard
        if (findAndClick('Back') || findAndClick('Dashboard')) {
          browser('wait --load networkidle');
          wait(800);
        }
      }
    }

    // ========================================================================
    // SECTION 7: LOGOUT & CLIENT LOGIN
    // ========================================================================
    log('\n--- SECTION 7: CLIENT LOGIN ---');
    
    // Go back to home
    if (findAndClick('Logout') || findAndClick('Back to Home') || findAndClick('Home')) {
      browser('wait --load networkidle');
      wait(1000);
    }
    
    // Navigate to role selection again
    browser(`open ${BASE_URL}`);
    browser('wait --load networkidle');
    wait(1000);
    
    if (findAndClick('Login / Register') || findAndClick('Login')) {
      browser('wait --load networkidle');
      wait(800);
      captureFrame('role_select_for_client');
    }
    
    // Select Client role
    if (findAndClick('Client')) {
      browser('wait --load networkidle');
      wait(800);
      captureMultipleFrames('client_login_form', 3, 300);
      
      // Fill login
      const snapshot = browser('snapshot');
      const emailMatch = snapshot.match(/textbox.*email.*(@e\d+)/i) || snapshot.match(/Email.*(@e\d+)/i);
      if (emailMatch) {
        browser(`fill ${emailMatch[1]} "client@acme.com"`);
        wait(300);
      }
      
      const passMatch = snapshot.match(/textbox.*password.*(@e\d+)/i) || snapshot.match(/Password.*(@e\d+)/i);
      if (passMatch) {
        browser(`fill ${passMatch[1]} "password123"`);
        wait(300);
      }
      
      captureFrame('client_login_ready');
      
      if (findAndClick('Sign In') || findAndClick('Login')) {
        browser('wait --load networkidle');
        wait(1500);
      }
    }

    // ========================================================================
    // SECTION 8: CLIENT DASHBOARD
    // ========================================================================
    log('\n--- SECTION 8: CLIENT DASHBOARD ---');
    
    captureMultipleFrames('client_dashboard', 5, 400);
    scrollAndCapture('client_dashboard', 2, 5);
    browser('scroll to top');
    wait(500);

    // ========================================================================
    // SECTION 9: CLIENT SCREENS
    // ========================================================================
    log('\n--- SECTION 9: CLIENT SCREENS ---');
    
    const clientScreens = [
      'My Cases',
      'Submissions',
      'Documents',
      'Reports',
      'Settings',
    ];
    
    for (const screen of clientScreens) {
      log(`  Navigating to: ${screen}`);
      if (findAndClick(screen)) {
        browser('wait --load networkidle');
        wait(1000);
        captureMultipleFrames(`client_${screen.toLowerCase().replace(/\s+/g, '_')}`, 3, 400);
        scrollAndCapture(`client_${screen.toLowerCase().replace(/\s+/g, '_')}`, 2, 3);
      }
    }

    // ========================================================================
    // SECTION 10: DEMO / PRESENTATION MODE
    // ========================================================================
    log('\n--- SECTION 10: DEMO MODE ---');
    
    browser(`open ${BASE_URL}`);
    browser('wait --load networkidle');
    wait(1000);
    
    if (findAndClick('View Demo') || findAndClick('Demo') || findAndClick('Presentation')) {
      browser('wait --load networkidle');
      wait(1000);
      
      // Capture multiple slides
      for (let i = 0; i < 10; i++) {
        captureFrame(`demo_slide_${i + 1}`);
        if (findAndClick('Next') || findAndClick('ArrowRight')) {
          wait(800);
        } else {
          browser('press ArrowRight');
          wait(800);
        }
      }
    }

    // ========================================================================
    // SECTION 11: FIX MESSAGE CREATOR
    // ========================================================================
    log('\n--- SECTION 11: FIX MESSAGE CREATOR ---');
    
    browser(`open ${BASE_URL}`);
    browser('wait --load networkidle');
    wait(1000);
    
    if (findAndClick('Message Creator') || findAndClick('Try Message Creator')) {
      browser('wait --load networkidle');
      wait(1000);
      captureMultipleFrames('fix_creator', 5, 400);
      scrollAndCapture('fix_creator', 2, 4);
    }

    // ========================================================================
    // FINAL
    // ========================================================================
    log('\n--- WALKTHROUGH COMPLETE ---');
    
    // Return to home
    browser(`open ${BASE_URL}`);
    browser('wait --load networkidle');
    wait(1000);
    captureMultipleFrames('final_home', 3, 300);
    
    browser('close');

    // ========================================================================
    // CREATE VIDEO
    // ========================================================================
    log('\n--- CREATING VIDEO ---');
    
    const frameCount = frameNum;
    log(`Total frames captured: ${frameCount}`);
    
    // Create video using ffmpeg
    try {
      const videoPath = path.join(OUTPUT_DIR, 'full-walkthrough.mp4');
      execSync(`ffmpeg -y -framerate 4 -pattern_type glob -i "${FRAME_DIR}/frame_*.png" -c:v libx264 -pix_fmt yuv420p -vf "scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2" "${videoPath}" 2>/dev/null`, {
        encoding: 'utf8',
        timeout: 120000
      });
      log(`Video created: ${videoPath}`);
    } catch (e) {
      log('Video creation skipped (ffmpeg not available or failed)');
      log('Frames are available in: ' + FRAME_DIR);
    }

    // Create index HTML for frames
    const frames = fs.readdirSync(FRAME_DIR).filter(f => f.endsWith('.png')).sort();
    const indexHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>B-COMET Platform - Full Walkthrough Recording</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: system-ui, -apple-system, sans-serif; background: #0a1628; color: white; }
    .container { max-width: 1400px; margin: 0 auto; padding: 20px; }
    h1 { text-align: center; padding: 30px 0; color: #00e5ff; }
    .stats { display: flex; justify-content: center; gap: 40px; margin-bottom: 30px; }
    .stat { text-align: center; padding: 20px; background: #1a2744; border-radius: 12px; }
    .stat-value { font-size: 2.5rem; font-weight: bold; color: #00e5ff; }
    .stat-label { color: #8899a6; margin-top: 5px; }
    .player { background: #1a2744; border-radius: 16px; padding: 20px; margin-bottom: 30px; }
    .frame-display { width: 100%; aspect-ratio: 16/9; background: #0a1628; border-radius: 12px; overflow: hidden; display: flex; align-items: center; justify-content: center; }
    .frame-display img { max-width: 100%; max-height: 100%; object-fit: contain; }
    .controls { display: flex; align-items: center; justify-content: center; gap: 20px; margin-top: 20px; }
    .controls button { padding: 12px 24px; border: none; border-radius: 8px; cursor: pointer; font-size: 16px; transition: all 0.2s; }
    .controls button:hover { transform: scale(1.05); }
    .play-btn { background: #00e5ff; color: #0a1628; font-weight: bold; }
    .nav-btn { background: #2a3f5f; color: white; }
    .progress { width: 100%; height: 8px; background: #2a3f5f; border-radius: 4px; margin-top: 20px; cursor: pointer; }
    .progress-bar { height: 100%; background: #00e5ff; border-radius: 4px; transition: width 0.1s; }
    .frame-info { text-align: center; margin-top: 15px; color: #8899a6; }
    .frame-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 15px; }
    .frame-thumb { cursor: pointer; border-radius: 8px; overflow: hidden; transition: transform 0.2s; }
    .frame-thumb:hover { transform: scale(1.03); }
    .frame-thumb img { width: 100%; display: block; }
    .frame-thumb-label { padding: 8px; background: #1a2744; font-size: 12px; color: #8899a6; }
    .section-title { color: #00e5ff; margin: 30px 0 15px; font-size: 1.2rem; }
  </style>
</head>
<body>
  <div class="container">
    <h1>B-COMET Platform - Full Application Walkthrough</h1>
    
    <div class="stats">
      <div class="stat">
        <div class="stat-value">${frames.length}</div>
        <div class="stat-label">Total Frames</div>
      </div>
      <div class="stat">
        <div class="stat-value">${Math.ceil(frames.length / 4)}</div>
        <div class="stat-label">Duration (sec)</div>
      </div>
      <div class="stat">
        <div class="stat-value">11</div>
        <div class="stat-label">Sections</div>
      </div>
    </div>
    
    <div class="player">
      <div class="frame-display">
        <img id="currentFrame" src="frames/${frames[0]}" alt="Frame">
      </div>
      <div class="controls">
        <button class="nav-btn" onclick="prevFrame()">Previous</button>
        <button class="play-btn" id="playBtn" onclick="togglePlay()">Play</button>
        <button class="nav-btn" onclick="nextFrame()">Next</button>
      </div>
      <div class="progress" onclick="seekTo(event)">
        <div class="progress-bar" id="progressBar" style="width: 0%"></div>
      </div>
      <div class="frame-info" id="frameInfo">Frame 1 of ${frames.length}</div>
    </div>
    
    <h2 class="section-title">All Frames</h2>
    <div class="frame-grid">
      ${frames.map((f, i) => `
        <div class="frame-thumb" onclick="goToFrame(${i})">
          <img src="frames/${f}" alt="Frame ${i + 1}" loading="lazy">
          <div class="frame-thumb-label">${i + 1}. ${f.replace(/frame_\d+_/, '').replace('.png', '').replace(/_/g, ' ')}</div>
        </div>
      `).join('')}
    </div>
  </div>
  
  <script>
    const frames = ${JSON.stringify(frames)};
    let currentIndex = 0;
    let isPlaying = false;
    let playInterval;
    
    function updateDisplay() {
      document.getElementById('currentFrame').src = 'frames/' + frames[currentIndex];
      document.getElementById('frameInfo').textContent = 'Frame ' + (currentIndex + 1) + ' of ' + frames.length;
      document.getElementById('progressBar').style.width = ((currentIndex + 1) / frames.length * 100) + '%';
    }
    
    function nextFrame() {
      currentIndex = (currentIndex + 1) % frames.length;
      updateDisplay();
    }
    
    function prevFrame() {
      currentIndex = (currentIndex - 1 + frames.length) % frames.length;
      updateDisplay();
    }
    
    function goToFrame(index) {
      currentIndex = index;
      updateDisplay();
    }
    
    function seekTo(e) {
      const rect = e.target.getBoundingClientRect();
      const percent = (e.clientX - rect.left) / rect.width;
      currentIndex = Math.floor(percent * frames.length);
      updateDisplay();
    }
    
    function togglePlay() {
      isPlaying = !isPlaying;
      document.getElementById('playBtn').textContent = isPlaying ? 'Pause' : 'Play';
      if (isPlaying) {
        playInterval = setInterval(nextFrame, 250);
      } else {
        clearInterval(playInterval);
      }
    }
    
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') nextFrame();
      if (e.key === 'ArrowLeft') prevFrame();
      if (e.key === ' ') { e.preventDefault(); togglePlay(); }
    });
  </script>
</body>
</html>`;

    fs.writeFileSync(path.join(OUTPUT_DIR, 'index.html'), indexHtml);
    log(`Frame viewer created: ${path.join(OUTPUT_DIR, 'index.html')}`);

    // Summary
    log('\n' + '='.repeat(70));
    log('WALKTHROUGH RECORDING COMPLETE');
    log('='.repeat(70));
    log(`Total frames: ${frameCount}`);
    log(`Output directory: ${OUTPUT_DIR}`);
    log(`Frame viewer: ${path.join(OUTPUT_DIR, 'index.html')}`);
    log('');

  } catch (error) {
    log('Error during walkthrough: ' + error.message);
    browser('close');
  }
}

// Run the walkthrough
runWalkthrough();
