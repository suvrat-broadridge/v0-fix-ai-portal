import fs from 'fs'
import path from 'path'

// Read the page.tsx file
const filePath = path.join(process.cwd(), 'app/page.tsx')
let content = fs.readFileSync(filePath, 'utf-8')

// List of screen starts (from grep output)
const screenStarts = [
  { line: 2361, screen: 'home', pattern: 'if (currentScreen === "home")' },
  { line: 3723, screen: 'role-select', pattern: 'if (currentScreen === "role-select")' },
  { line: 3763, screen: 'login', pattern: 'if (currentScreen === "login")' },
  { line: 3884, screen: 'dashboard', pattern: 'if (currentScreen === "dashboard"' },
  { line: 5040, screen: 'client-detail', pattern: 'if (currentScreen === "client-detail"' },
  { line: 5534, screen: 'asset-tools', pattern: 'if (currentScreen === "asset-tools"' },
  { line: 5587, screen: 'phase-cases', pattern: 'if (currentScreen === "phase-cases"' },
  { line: 5760, screen: 'workflow-overview', pattern: 'if (currentScreen === "workflow-overview")' },
  { line: 5967, screen: 'intake-portal', pattern: 'if (currentScreen === "intake-portal")' },
  { line: 6433, screen: 'case-workflow', pattern: 'if (currentScreen === "case-workflow")' },
  { line: 8417, screen: 'spec-compare', pattern: 'if (currentScreen === "spec-compare")' },
  { line: 9424, screen: 'log-analysis', pattern: 'if (currentScreen === "log-analysis")' },
  { line: 9672, screen: 'scenario-creation', pattern: 'if (currentScreen === "scenario-creation")' },
  { line: 9812, screen: 'test-case-gen', pattern: 'if (currentScreen === "test-case-gen")' },
  { line: 10286, screen: 'certification-gen', pattern: 'if (currentScreen === "certification-gen")' },
  { line: 10773, screen: 'atdl-workbench', pattern: 'if (currentScreen === "atdl-workbench")' },
  { line: 10953, screen: 'atdl-guided-choices', pattern: 'if (currentScreen === "atdl-guided-choices")' },
  { line: 11108, screen: 'atdl-flow-select', pattern: 'if (currentScreen === "atdl-flow-select")' },
  { line: 11242, screen: 'atdl-wizard', pattern: 'if (currentScreen === "atdl-wizard")' },
  { line: 12150, screen: 'atdl-validate', pattern: 'if (currentScreen === "atdl-validate")' },
  { line: 12331, screen: 'atdl-ui-repr', pattern: 'if (currentScreen === "atdl-ui-repr")' },
  { line: 12598, screen: 'atdl-compare', pattern: 'if (currentScreen === "atdl-compare")' },
  { line: 12745, screen: 'fix-atdl-compare', pattern: 'if (currentScreen === "fix-atdl-compare")' },
  { line: 12907, screen: 'fix-to-atdl', pattern: 'if (currentScreen === "fix-to-atdl")' },
  { line: 13085, screen: 'atdl-remediation', pattern: 'if (currentScreen === "atdl-remediation")' },
  { line: 13206, screen: 'spec-compare-overview', pattern: 'if (currentScreen === "spec-compare-overview")' },
  { line: 13364, screen: 'admin-specs', pattern: 'if (currentScreen === "admin-specs")' },
  { line: 13618, screen: 'client-specs', pattern: 'if (currentScreen === "client-specs")' },
  { line: 13748, screen: 'client-log-files', pattern: 'if (currentScreen === "client-log-files")' },
  { line: 13924, screen: 'settings', pattern: 'if (currentScreen === "settings")' },
  { line: 14196, screen: 'fix-msg-creator', pattern: 'if (currentScreen === "fix-msg-creator")' },
  { line: 14685, screen: 'session-config', pattern: 'if (currentScreen === "session-config")' },
  { line: 14872, screen: 'client-cert-report', pattern: 'if (currentScreen === "client-cert-report")' },
  { line: 15538, screen: 'field-mapping', pattern: 'if (currentScreen === "field-mapping")' },
  { line: 15713, screen: 'test-results', pattern: 'if (currentScreen === "test-results")' },
  { line: 15845, screen: 'go-live', pattern: 'if (currentScreen === "go-live")' },
  { line: 15969, screen: 'reports', pattern: 'if (currentScreen === "reports")' },
  { line: 16062, screen: 'onboarding-cases', pattern: 'if (currentScreen === "onboarding-cases")' },
  { line: 16387, screen: 'create-case', pattern: 'if (currentScreen === "create-case")' },
  { line: 17046, screen: 'onboarding-case-detail', pattern: 'if (currentScreen === "onboarding-case-detail")' },
  { line: 17239, screen: 'presentation', pattern: 'if (currentScreen === "presentation")' },
  { line: 17399, screen: 'approvals', pattern: 'if (currentScreen === "approvals")' },
  { line: 17887, screen: 'evidence-vault', pattern: 'if (currentScreen === "evidence-vault")' },
  { line: 18139, screen: 'prod-config', pattern: 'if (currentScreen === "prod-config")' },
  { line: 18295, screen: 'rule-library', pattern: 'if (currentScreen === "rule-library")' },
  { line: 18866, screen: 'ai-review-queue', pattern: 'if (currentScreen === "ai-review-queue")' },
  { line: 19157, screen: 'sla-analytics', pattern: 'if (currentScreen === "sla-analytics")' },
  { line: 19327, screen: 'document-ingestion', pattern: 'if (currentScreen === "document-ingestion")' },
  { line: 19415, screen: 'gap-analysis', pattern: 'if (currentScreen === "gap-analysis")' },
  { line: 19491, screen: 'counterparty-profile', pattern: 'if (currentScreen === "counterparty-profile")' },
  { line: 19537, screen: 'fix-dictionary', pattern: 'if (currentScreen === "fix-dictionary")' },
  { line: 19578, screen: 'connectivity-setup', pattern: 'if (currentScreen === "connectivity-setup")' },
  { line: 19633, screen: 'connectivity-test', pattern: 'if (currentScreen === "connectivity-test")' },
  { line: 19681, screen: 'cert-planning', pattern: 'if (currentScreen === "cert-planning")' },
  { line: 19740, screen: 'test-execution', pattern: 'if (currentScreen === "test-execution")' },
  { line: 19809, screen: 'analysis-remediation', pattern: 'if (currentScreen === "analysis-remediation")' },
  { line: 19866, screen: 'cert-decisioning', pattern: 'if (currentScreen === "cert-decisioning")' },
  { line: 19938, screen: 'signoff-module', pattern: 'if (currentScreen === "signoff-module")' },
  { line: 19983, screen: 'go-live-manager', pattern: 'if (currentScreen === "go-live-manager")' },
  { line: 20043, screen: 'post-go-live', pattern: 'if (currentScreen === "post-go-live")' },
]

// Screens that ALREADY have AIAssistant (don't modify)
const alreadyHas = [
  'dashboard', // or clients
  'client-detail',
  'asset-tools',
  'phase-cases',
  'workflow-overview',
  'intake-portal',
  'case-workflow',
  'spec-compare',
  'atdl-workbench',
  'session-config',
  'reports',
]

// Split by lines to process
const lines = content.split('\n')

// For each screen, find its closing return and inject AIAssistant if missing
let modified = false
let added = 0

for (const screen of screenStarts) {
  if (alreadyHas.includes(screen.screen)) {
    console.log(`✓ ${screen.screen} - already has AIAssistant`)
    continue
  }

  // Find the line with this screen's if statement
  const screenLineIdx = lines.findIndex(l => l.includes(screen.pattern))
  if (screenLineIdx === -1) {
    console.warn(`✗ Could not find line for ${screen.screen}`)
    continue
  }

  // Find the next screen's start to know the boundary
  const nextScreenIdx = screenStarts.indexOf(screen) + 1
  const boundary = nextScreenIdx < screenStarts.length 
    ? screenStarts[nextScreenIdx].line - 1 
    : lines.length

  // Search within this screen for the closing `      </>` pattern
  let foundClosing = false
  for (let i = screenLineIdx; i < Math.min(screenLineIdx + 1000, boundary); i++) {
    if (lines[i]?.match(/^\s{6}<\/>$/) && !lines[i].includes('AIAssistant')) {
      // Found the closing tag, check if previous line has AIAssistant
      if (!lines[i - 1]?.includes('AIAssistant')) {
        // Insert AIAssistant before the closing tag
        lines.splice(i, 0, '      <AIAssistant />')
        modified = true
        added++
        foundClosing = true
        console.log(`✓ Added AIAssistant to ${screen.screen}`)
      }
      break
    }
  }

  if (!foundClosing) {
    console.warn(`✗ Could not find closing tag for ${screen.screen}`)
  }
}

if (modified) {
  fs.writeFileSync(filePath, lines.join('\n'), 'utf-8')
  console.log(`\n✅ Added AIAssistant to ${added} screens`)
} else {
  console.log('\n✅ All screens already have AIAssistant')
}
