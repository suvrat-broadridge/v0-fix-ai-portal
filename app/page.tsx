"use client"

// B- COMET Platform - FIX Protocol Testing Suite v2
import React, { useState } from "react"
import { Shield, Building2, Sun, Moon, Users, LayoutDashboard, Settings, HelpCircle, LogOut, ChevronLeft, ChevronRight, FileText, Activity, Zap, CheckCircle, AlertTriangle, AlertCircle, Clock, Upload, Play, ArrowLeft, Bell, GitCompare, FileSearch, TestTube, Award, Cog, X, Plus, ChevronDown, Wrench, Download, Eye, MessageSquare, Send, Copy, Wifi, WifiOff, Mail, Search, RefreshCw, Lock, Unlock, Server, Database, BarChart3, FileCheck, Rocket, Calendar, TrendingUp, Filter, ArrowRight, CheckSquare, Square, Link2, Unlink, Briefcase, Scale, Archive, BookOpen, Brain, Timer, History, ShieldCheck, Target, Gauge, AlertOctagon, ThumbsUp, ThumbsDown, UserCheck, FileWarning, Layers, Hash, Globe, Building, ClipboardCheck, Stamp, Code, ScrollText, Navigation, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function BCometPlatform() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [currentScreen, setCurrentScreen] = useState<"home" | "role-select" | "login" | "dashboard" | "clients" | "client-detail" | "asset-tools" | "spec-compare" | "spec-compare-overview" | "scenario-creation" | "test-case-gen" | "certification-gen" | "settings" | "admin-specs" | "client-specs" | "client-log-files" | "fix-msg-creator" | "atdl-compare" | "fix-atdl-compare" | "fix-to-atdl" | "atdl-validate" | "atdl-ui-repr" | "session-config" | "field-mapping" | "test-results" | "go-live" | "reports" | "onboarding-cases" | "approvals" | "evidence-vault" | "rule-library" | "ai-review-queue" | "sla-analytics" | "run-history" | "admin-governance">("home")
  const [settingsTab, setSettingsTab] = useState<"look-feel" | "general" | "security" | "mail" | "questionnaires" | "license">("general")
  const [selectedRole, setSelectedRole] = useState<"admin" | "client" | null>(null)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [selectedClient, setSelectedClient] = useState<any>(null)
  const [selectedAssetClass, setSelectedAssetClass] = useState<string | null>(null)
  const [selectedFixVersion, setSelectedFixVersion] = useState<string | null>(null)
  const [showSpecResults, setShowSpecResults] = useState(false)
  const [showStandardizedSpecs, setShowStandardizedSpecs] = useState(false)
  const [standardizedMsgTypeTab, setStandardizedMsgTypeTab] = useState<string>("D")
  const [viewingClientSpec, setViewingClientSpec] = useState<{asset: string, protocol: string, specName: string, clientSpecFile?: string, clientName?: string} | null>(null)
  const [clientSpecStandardized, setClientSpecStandardized] = useState(false)
  const [isConverting, setIsConverting] = useState(false)
  const [conversionError, setConversionError] = useState<{message: string, endpoint: string, requestBody: any} | null>(null)
  const [standardizedSpecData, setStandardizedSpecData] = useState<any>(null)

  const handleConvertToStandard = async (spec: {asset: string, protocol: string, clientSpec: string, clientSpecFile?: string}) => {
    setIsConverting(true)
    setConversionError(null)
    
    const endpoint = "http://localhost:5000/api/clients/spec/convert-to-standard"
    const requestBody = {
      inputPath: spec.clientSpecFile || spec.clientSpec,
      outputDir: "output",
      clientName: selectedClient?.name || "Unknown",
      assetClass: spec.asset,
      fixVersion: spec.protocol,
    }
    
    // Always show the modal
    setViewingClientSpec({ 
      asset: spec.asset, 
      protocol: spec.protocol, 
      specName: spec.clientSpec,
      clientSpecFile: spec.clientSpecFile,
      clientName: selectedClient?.name
    })
    setClientSpecStandardized(false)
    
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Runner-Token": "my-secret-token",
        },
        body: JSON.stringify(requestBody),
      })
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }
      
      const data = await response.json()
      setStandardizedSpecData(data)
    } catch (error: any) {
      setConversionError({
        message: error.message || "Unknown error",
        endpoint: endpoint,
        requestBody: requestBody
      })
      // Clear standardizedSpecData so dummy data will be shown
      setStandardizedSpecData(null)
    } finally {
      setIsConverting(false)
    }
  }
  const [showLogResults, setShowLogResults] = useState(false)
  const [comparisonFlags, setComparisonFlags] = useState<Record<string, { status: "ignore" | "customization" | "flag" | null; note: string }>>({})
  const [logAnalysisFlags, setLogAnalysisFlags] = useState<Record<string, { status: "ignore" | "customization" | "flag" | null; note: string }>>({})
  const [showScenarioResults, setShowScenarioResults] = useState(false)
  const [showTestCaseResults, setShowTestCaseResults] = useState(false)
  const [showCertResults, setShowCertResults] = useState(false)
  const [scenarioFilter, setScenarioFilter] = useState<string>("all")
  const [showAddClientModal, setShowAddClientModal] = useState(false)
  const [newClient, setNewClient] = useState({ name: "", legalEntity: "", jira: "", accountManager: "", assetClasses: [] as string[], onboardingTracks: [] as string[], includesAtdl: true, slaDays: 22, onboardingManager: "", technicalLead: "" })
  const [isAdHocMode, setIsAdHocMode] = useState(false)
  const [toolsExpanded, setToolsExpanded] = useState(false)
  const [atdlToolsExpanded, setAtdlToolsExpanded] = useState(false)
  const [adminSpecsExpanded, setAdminSpecsExpanded] = useState(false)
  const [clientSpecsExpanded, setClientSpecsExpanded] = useState(false)
  const [regTestSuiteGenerated, setRegTestSuiteGenerated] = useState(false)
  const [certSuiteGenerated, setCertSuiteGenerated] = useState(false)
  const [regTestSource, setRegTestSource] = useState<"spec" | "log" | "scenario" | null>(null)
  const [certTestSource, setCertTestSource] = useState<"spec" | "log" | "scenario" | null>(null)
  const [regLogTab, setRegLogTab] = useState<"upload" | "existing">("upload")
  const [certLogTab, setCertLogTab] = useState<"upload" | "existing">("upload")
  const [generatingRegTest, setGeneratingRegTest] = useState<string | null>(null)
  const [generatedRegSuites, setGeneratedRegSuites] = useState<Record<string, {suiteName: string, testCount: number, lastGenerated: string}>>({
    "Equities-FIX 4.2": { suiteName: "EQ_FIX42_RegTests_v1.2", testCount: 24, lastGenerated: "Apr 12, 2026" },
    "Options-FIX 4.4": { suiteName: "OPT_FIX44_RegTests_v2.0", testCount: 18, lastGenerated: "Apr 9, 2026" },
  })
  const [generatingCertTest, setGeneratingCertTest] = useState<string | null>(null)
  const [generatedCertSuites, setGeneratedCertSuites] = useState<Record<string, {suiteName: string, testCount: number, lastGenerated: string}>>({
    "Equities-FIX 4.2": { suiteName: "EQ_FIX42_CertTests_v1.2", testCount: 32, lastGenerated: "Apr 12, 2026" },
    "Options-FIX 4.4": { suiteName: "OPT_FIX44_CertTests_v2.0", testCount: 28, lastGenerated: "Apr 9, 2026" },
  })
  const [showContactPanel, setShowContactPanel] = useState(false)
  const [showDemoForm, setShowDemoForm] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  // Session configuration state
  const [sessionConfigs, setSessionConfigs] = useState<Record<string, {host: string, port: string, senderCompId: string, targetCompId: string, protocol: string, ssl: boolean, heartbeat: number, connected: boolean, lastTested: string | null}>>({
    "Equities-FIX 4.2": { host: "fix.nexustrading.com", port: "9876", senderCompId: "NEXUS_EQ", targetCompId: "BROADRIDGE", protocol: "FIX 4.2", ssl: true, heartbeat: 30, connected: true, lastTested: "Apr 13, 2026 10:30 AM" },
  })
  // Test execution results state
  const [testRunHistory, setTestRunHistory] = useState<Array<{id: string, suite: string, asset: string, protocol: string, runDate: string, status: "passed" | "failed" | "running", passed: number, failed: number, total: number}>>([
    { id: "TR001", suite: "EQ_FIX42_RegTests_v1.2", asset: "Equities", protocol: "FIX 4.2", runDate: "Apr 13, 2026 10:45 AM", status: "passed", passed: 24, failed: 0, total: 24 },
    { id: "TR002", suite: "OPT_FIX44_RegTests_v2.0", asset: "Options", protocol: "FIX 4.4", runDate: "Apr 12, 2026 3:20 PM", status: "failed", passed: 15, failed: 3, total: 18 },
    { id: "TR003", suite: "EQ_FIX42_CertTests_v1.2", asset: "Equities", protocol: "FIX 4.2", runDate: "Apr 11, 2026 9:00 AM", status: "passed", passed: 32, failed: 0, total: 32 },
  ])
  // Client workflow stage tracking
  const [clientStages, setClientStages] = useState<Record<string, {stage: number, stageStatus: Record<number, "completed" | "in-progress" | "blocked" | "pending">}>>({
    "Nexus Trading Group": { stage: 5, stageStatus: { 1: "completed", 2: "completed", 3: "completed", 4: "completed", 5: "in-progress", 6: "pending", 7: "pending" } },
    "Apex Capital Partners": { stage: 3, stageStatus: { 1: "completed", 2: "completed", 3: "in-progress", 4: "pending", 5: "pending", 6: "pending", 7: "pending" } },
    "Horizon Investments": { stage: 2, stageStatus: { 1: "completed", 2: "in-progress", 3: "pending", 4: "pending", 5: "pending", 6: "pending", 7: "pending" } },
    "Velocity Securities": { stage: 6, stageStatus: { 1: "completed", 2: "completed", 3: "completed", 4: "completed", 5: "completed", 6: "in-progress", 7: "pending" } },
    "Summit Financial": { stage: 1, stageStatus: { 1: "in-progress", 2: "pending", 3: "pending", 4: "pending", 5: "pending", 6: "pending", 7: "pending" } },
  })
  // Field mapping rules state
  const [fieldMappings, setFieldMappings] = useState<Record<string, Array<{clientTag: string, clientName: string, broaderTag: string, broaderName: string, transform: string | null, status: "mapped" | "custom" | "unmapped"}>>>({})
  // Dashboard view mode
  const [dashboardView, setDashboardView] = useState<"cards" | "kanban">("cards")
  // Go-live checklist
  const [goLiveChecklist, setGoLiveChecklist] = useState<Record<string, boolean>>({
    "spec-approved": true,
    "connectivity-verified": true,
    "regression-passed": true,
    "certification-passed": false,
    "client-signoff": false,
    "broadridge-signoff": false,
    "production-config": false,
  })
  
  // Onboarding Cases data
  const [onboardingCases] = useState([
    { id: "OB-2026-0147", client: "Nexus Trading Group", legalEntity: "Nexus Trading LLC", region: "AMER", assetClass: "Equities", protocol: "FIX 4.2", environment: "UAT", stage: 5, stageLabel: "Testing", priority: "High", riskRating: "Medium", owner: "John Smith", slaDate: "Apr 22, 2026", blockers: 0, status: "on-track", createdDate: "Mar 28, 2026" },
    { id: "OB-2026-0142", client: "Apex Capital Partners", legalEntity: "Apex Capital Inc", region: "EMEA", assetClass: "Options", protocol: "FIX 4.4", environment: "Cert", stage: 3, stageLabel: "Connectivity", priority: "Critical", riskRating: "High", owner: "Sarah Johnson", slaDate: "Apr 12, 2026", blockers: 2, status: "at-risk", createdDate: "Mar 15, 2026" },
    { id: "OB-2026-0151", client: "Horizon Investments", legalEntity: "Horizon Fund Management", region: "APAC", assetClass: "Futures", protocol: "FIX 5.0 SP2", environment: "UAT", stage: 2, stageLabel: "Spec Analysis", priority: "Medium", riskRating: "Low", owner: "Mike Chen", slaDate: "May 2, 2026", blockers: 0, status: "on-track", createdDate: "Apr 8, 2026" },
    { id: "OB-2026-0138", client: "Velocity Securities", legalEntity: "Velocity Trading Ltd", region: "AMER", assetClass: "Equities", protocol: "FIX 4.4", environment: "Prod", stage: 6, stageLabel: "Certification", priority: "High", riskRating: "Low", owner: "Lisa Wang", slaDate: "Apr 18, 2026", blockers: 0, status: "on-track", createdDate: "Feb 20, 2026" },
    { id: "OB-2026-0155", client: "Summit Financial", legalEntity: "Summit Advisory Group", region: "EMEA", assetClass: "Fixed Income", protocol: "FIX 4.2", environment: "UAT", stage: 1, stageLabel: "Setup", priority: "Low", riskRating: "Medium", owner: "Tom Brown", slaDate: "May 9, 2026", blockers: 1, status: "blocked", createdDate: "Apr 10, 2026" },
  ])

  // Approvals data
  const [allApprovals] = useState([
    // Nexus Trading Group
    { id: "APR-001", type: "Stage Gate", caseId: "OB-2026-0147", client: "Nexus Trading Group", description: "Approve progression from Testing to Certification", requiredApprovers: ["Ops", "Technical"], currentApprovers: ["Ops"], submittedBy: "John Smith", submittedDate: "Apr 12, 2026", dueDate: "Apr 16, 2026", status: "pending", notes: "All test cases passed. One minor field mapping discrepancy noted but waived per APR-004." },
    { id: "APR-004", type: "Exception", caseId: "OB-2026-0147", client: "Nexus Trading Group", description: "Waiver for optional field 58 custom usage pattern", requiredApprovers: ["Compliance", "Technical"], currentApprovers: ["Compliance", "Technical"], submittedBy: "John Smith", submittedDate: "Apr 7, 2026", dueDate: "Apr 9, 2026", status: "approved", resolvedDate: "Apr 8, 2026", resolvedBy: "David Park", notes: "Field usage confirmed as non-breaking. Client workflow depends on it. Approved with monitoring clause." },
    { id: "APR-007", type: "Stage Gate", caseId: "OB-2026-0147", client: "Nexus Trading Group", description: "Approve progression from Spec Analysis to Connectivity", requiredApprovers: ["Technical"], currentApprovers: ["Technical"], submittedBy: "John Smith", submittedDate: "Apr 2, 2026", dueDate: "Apr 4, 2026", status: "approved", resolvedDate: "Apr 3, 2026", resolvedBy: "Technical Lead", notes: "Spec comparison completed with 3 minor discrepancies. All documented and accepted." },
    { id: "APR-010", type: "Exception", caseId: "OB-2026-0147", client: "Nexus Trading Group", description: "SLA extension request for UAT phase due to infra migration window", requiredApprovers: ["Management", "Ops"], currentApprovers: [], submittedBy: "John Smith", submittedDate: "Mar 31, 2026", dueDate: "Apr 2, 2026", status: "rejected", resolvedDate: "Apr 1, 2026", resolvedBy: "Karen Mitchell", notes: "Extension not approved. Client advised to use existing buffer in schedule. Alternative timeline provided." },
    // Apex Capital Partners
    { id: "APR-002", type: "Exception", caseId: "OB-2026-0142", client: "Apex Capital Partners", description: "Waiver for custom field 5001 mapping", requiredApprovers: ["Compliance", "Technical"], currentApprovers: [], submittedBy: "Sarah Johnson", submittedDate: "Apr 10, 2026", dueDate: "Apr 13, 2026", status: "overdue", notes: "Field 5001 is proprietary and not part of standard FIX spec. Risk assessment required before approval." },
    { id: "APR-005", type: "Stage Gate", caseId: "OB-2026-0142", client: "Apex Capital Partners", description: "Approve progression from Setup to Spec Analysis", requiredApprovers: ["Ops", "Technical"], currentApprovers: ["Ops", "Technical"], submittedBy: "Sarah Johnson", submittedDate: "Mar 20, 2026", dueDate: "Mar 24, 2026", status: "approved", resolvedDate: "Mar 22, 2026", resolvedBy: "Ops Team", notes: "Environment setup confirmed. FIX engine version validated. Credentials tested." },
    { id: "APR-008", type: "Exception", caseId: "OB-2026-0142", client: "Apex Capital Partners", description: "Protocol downgrade request from FIX 4.4 to FIX 4.2 for legacy system", requiredApprovers: ["Technical", "Compliance", "Management"], currentApprovers: ["Technical"], submittedBy: "Sarah Johnson", submittedDate: "Apr 8, 2026", dueDate: "Apr 11, 2026", status: "pending", notes: "Client legacy OMS cannot support FIX 4.4 features. Requesting temporary downgrade with upgrade plan." },
    { id: "APR-011", type: "Stage Gate", caseId: "OB-2026-0142", client: "Apex Capital Partners", description: "Connectivity sign-off for primary and failover sessions", requiredApprovers: ["Technical", "Ops"], currentApprovers: ["Technical"], submittedBy: "Sarah Johnson", submittedDate: "Apr 9, 2026", dueDate: "Apr 14, 2026", status: "pending", notes: "Primary session stable. Failover testing scheduled for Apr 13." },
    // Velocity Securities
    { id: "APR-003", type: "Go-Live", caseId: "OB-2026-0138", client: "Velocity Securities", description: "Final go-live approval for production cutover", requiredApprovers: ["Ops", "Compliance", "Technical", "Management"], currentApprovers: ["Ops", "Technical"], submittedBy: "Lisa Wang", submittedDate: "Apr 11, 2026", dueDate: "Apr 18, 2026", status: "pending", notes: "All certification tests passed. Production environment configured. Runbook reviewed and approved." },
    { id: "APR-006", type: "Stage Gate", caseId: "OB-2026-0138", client: "Velocity Securities", description: "Certification package sign-off", requiredApprovers: ["Compliance", "Technical", "Management"], currentApprovers: ["Compliance", "Technical", "Management"], submittedBy: "Lisa Wang", submittedDate: "Apr 5, 2026", dueDate: "Apr 8, 2026", status: "approved", resolvedDate: "Apr 7, 2026", resolvedBy: "QA Lead", notes: "All 48 test cases executed with 100% pass rate. Certification package complete." },
    { id: "APR-009", type: "Exception", caseId: "OB-2026-0138", client: "Velocity Securities", description: "Waiver for missing CumQty on cancel acknowledgements", requiredApprovers: ["Technical", "Compliance"], currentApprovers: ["Technical"], submittedBy: "Lisa Wang", submittedDate: "Mar 28, 2026", dueDate: "Apr 1, 2026", status: "approved", resolvedDate: "Mar 30, 2026", resolvedBy: "Compliance Team", notes: "Venue-specific behavior. Documented in onboarding notes. No functional impact confirmed." },
    { id: "APR-012", type: "Exception", caseId: "OB-2026-0138", client: "Velocity Securities", description: "Request to skip regression suite for patch release", requiredApprovers: ["Technical", "Management"], currentApprovers: [], submittedBy: "Lisa Wang", submittedDate: "Apr 13, 2026", dueDate: "Apr 14, 2026", status: "rejected", resolvedDate: "Apr 13, 2026", resolvedBy: "Head of QA", notes: "Regression suite mandatory per policy. Expedited 4-hour regression window offered as alternative." },
    // Horizon Investments
    { id: "APR-013", type: "Stage Gate", caseId: "OB-2026-0151", client: "Horizon Investments", description: "Approve progression from Setup to Spec Analysis", requiredApprovers: ["Technical"], currentApprovers: [], submittedBy: "Mike Chen", submittedDate: "Apr 12, 2026", dueDate: "Apr 17, 2026", status: "pending", notes: "FIX 5.0 SP2 environment configured. Waiting for client spec documents." },
    { id: "APR-014", type: "Exception", caseId: "OB-2026-0151", client: "Horizon Investments", description: "Approval for use of non-standard MsgSeqNum reset on daily reconnect", requiredApprovers: ["Technical", "Ops"], currentApprovers: ["Technical", "Ops"], submittedBy: "Mike Chen", submittedDate: "Apr 10, 2026", dueDate: "Apr 12, 2026", status: "approved", resolvedDate: "Apr 11, 2026", resolvedBy: "Ops Lead", notes: "Sequence reset confirmed safe for this venue. Documented and monitoring alerts configured." },
  ])

  const pendingApprovals = allApprovals.filter(a => a.status === "pending" || a.status === "overdue")

  // Approvals screen state
  const [approvalsTab, setApprovalsTab] = useState<"Pending" | "Approved" | "Rejected" | "All">("Pending")
  const [expandedApprovalClients, setExpandedApprovalClients] = useState<Record<string, boolean>>({})
  const [selectedApproval, setSelectedApproval] = useState<typeof allApprovals[0] | null>(null)

  // Evidence vault data
  const [evidenceItems] = useState([
    { id: "EV-001", caseId: "OB-2026-0147", client: "Nexus Trading Group", type: "Test Report", name: "EQ_FIX42_RegTest_Results_v1.2.pdf", stage: 5, generatedDate: "Apr 13, 2026", generatedBy: "System", signed: true, signedBy: "John Smith", signedDate: "Apr 13, 2026", size: "1.2 MB" },
    { id: "EV-002", caseId: "OB-2026-0147", client: "Nexus Trading Group", type: "Spec Diff", name: "Nexus_SpecComparison_Report.pdf", stage: 2, generatedDate: "Apr 3, 2026", generatedBy: "System", signed: true, signedBy: "John Smith", signedDate: "Apr 4, 2026", size: "890 KB" },
    { id: "EV-003", caseId: "OB-2026-0138", client: "Velocity Securities", type: "Certification Pack", name: "Velocity_Certification_Package.zip", stage: 6, generatedDate: "Apr 11, 2026", generatedBy: "System", signed: false, signedBy: null, signedDate: null, size: "4.5 MB" },
    { id: "EV-004", caseId: "OB-2026-0142", client: "Apex Capital Partners", type: "Approval Record", name: "Apex_ExceptionWaiver_5001.pdf", stage: 3, generatedDate: "Apr 10, 2026", generatedBy: "Sarah Johnson", signed: false, signedBy: null, signedDate: null, size: "156 KB" },
  ])

  // Rule library data
  // Source materials for rule library
  const [ruleSourceMaterials] = useState([
    { id: "SRC-001", name: "FIX 4.2 Protocol Specification", type: "Standard", format: "PDF", version: "4.2", publisher: "FIX Trading Community", date: "Mar 2000", size: "2.4 MB", url: "fixprotocol.org" },
    { id: "SRC-002", name: "FIX 4.4 Protocol Specification", type: "Standard", format: "PDF", version: "4.4", publisher: "FIX Trading Community", date: "Apr 2003", size: "3.1 MB", url: "fixprotocol.org" },
    { id: "SRC-003", name: "FIX 5.0 SP2 Protocol Specification", type: "Standard", format: "PDF", version: "5.0 SP2", publisher: "FIX Trading Community", date: "Oct 2011", size: "4.8 MB", url: "fixprotocol.org" },
    { id: "SRC-004", name: "FIXT 1.1 Transport Specification", type: "Standard", format: "PDF", version: "1.1", publisher: "FIX Trading Community", date: "Mar 2009", size: "1.2 MB", url: "fixprotocol.org" },
    { id: "SRC-005", name: "NYSE Arca Equities FIX Specification", type: "Exchange", format: "PDF", version: "2026.1", publisher: "NYSE", date: "Jan 2026", size: "1.8 MB", url: "nyse.com" },
    { id: "SRC-006", name: "NASDAQ OUCH Protocol Specification", type: "Exchange", format: "PDF", version: "5.2", publisher: "NASDAQ", date: "Nov 2025", size: "890 KB", url: "nasdaq.com" },
    { id: "SRC-007", name: "CME Globex FIX Specification", type: "Exchange", format: "PDF", version: "2026.1", publisher: "CME Group", date: "Feb 2026", size: "2.2 MB", url: "cmegroup.com" },
    { id: "SRC-008", name: "LSE FIX Gateway Specification", type: "Exchange", format: "PDF", version: "13.0", publisher: "London Stock Exchange", date: "Dec 2025", size: "1.5 MB", url: "lseg.com" },
    { id: "SRC-009", name: "Eurex FIX Interface Specification", type: "Exchange", format: "PDF", version: "9.3", publisher: "Deutsche Börse", date: "Oct 2025", size: "2.0 MB", url: "eurex.com" },
    { id: "SRC-010", name: "QuickFIX Engine Data Dictionary", type: "Library", format: "XML", version: "1.16.0", publisher: "QuickFIX/J", date: "Aug 2025", size: "450 KB", url: "quickfixj.org" },
    { id: "SRC-011", name: "FIX Orchestra Repository", type: "Library", format: "XML", version: "1.2", publisher: "FIX Trading Community", date: "Mar 2026", size: "12 MB", url: "fixtrading.org" },
    { id: "SRC-012", name: "Reg NMS Rule 611 Guidelines", type: "Regulatory", format: "PDF", version: "2026", publisher: "SEC", date: "Jan 2026", size: "320 KB", url: "sec.gov" },
    { id: "SRC-013", name: "MiFID II RTS 25 Technical Standards", type: "Regulatory", format: "PDF", version: "2025", publisher: "ESMA", date: "Sep 2025", size: "580 KB", url: "esma.europa.eu" },
  ])

  const [ruleLibrary] = useState([
    // Section A: Session Level Rules
    { id: "S-001", category: "Session", name: "BeginString Must Be FIX.4.2", description: "Tag 8 must equal FIX.4.2", severity: "Error", scope: "All", enabled: true, fixVersions: ["4.0","4.1","4.2","4.3","4.4","5.0","5.0SP2"], market: "All", sourceRef: "SRC-001" },
    { id: "S-002", category: "Session", name: "BodyLength Valid", description: "Tag 9 must match actual body byte length", severity: "Error", scope: "All", enabled: true, fixVersions: ["4.0","4.1","4.2","4.3","4.4","5.0","5.0SP2"], market: "All", sourceRef: "SRC-001" },
    { id: "S-003", category: "Session", name: "CheckSum Valid", description: "Tag 10 must match computed checksum", severity: "Error", scope: "All", enabled: true, fixVersions: ["4.0","4.1","4.2","4.3","4.4","5.0","5.0SP2"], market: "All", sourceRef: "SRC-001" },
    { id: "S-004", category: "Session", name: "Header Required Fields", description: "Tags 8,9,35,49,56,34,52,10 must exist", severity: "Error", scope: "All", enabled: true, fixVersions: ["4.0","4.1","4.2","4.3","4.4","5.0","5.0SP2"], market: "All", sourceRef: "SRC-001" },
    { id: "S-005", category: "Session", name: "Sender/Target Present", description: "Tags 49 and 56 cannot be blank", severity: "Error", scope: "All", enabled: true, fixVersions: ["4.0","4.1","4.2","4.3","4.4","5.0","5.0SP2"], market: "All", sourceRef: "SRC-001" },
    { id: "S-006", category: "Session", name: "MsgSeqNum Positive", description: "Tag 34 must be integer greater than 0", severity: "Error", scope: "All", enabled: true, fixVersions: ["4.0","4.1","4.2","4.3","4.4","5.0","5.0SP2"], market: "All", sourceRef: "SRC-001" },
    { id: "S-007", category: "Session", name: "SendingTime Format", description: "Tag 52 must be valid UTC timestamp", severity: "Error", scope: "All", enabled: true, fixVersions: ["4.0","4.1","4.2","4.3","4.4","5.0","5.0SP2"], market: "All", sourceRef: "SRC-001" },
    { id: "S-008", category: "Session", name: "Duplicate Tag Not Allowed", description: "Same tag cannot appear twice unless in repeating group", severity: "Error", scope: "All", enabled: true, fixVersions: ["4.0","4.1","4.2","4.3","4.4","5.0","5.0SP2"], market: "All", sourceRef: "SRC-001" },
    { id: "S-009", category: "Session", name: "SOH Delimiter Integrity", description: "Message must use valid field delimiter and parse cleanly", severity: "Error", scope: "All", enabled: true, fixVersions: ["4.0","4.1","4.2","4.3","4.4","5.0","5.0SP2"], market: "All", sourceRef: "SRC-001" },
    { id: "S-010", category: "Session", name: "Unknown Admin MsgType", description: "Unknown admin MsgType in session flow", severity: "Error", scope: "All", enabled: true, fixVersions: ["4.0","4.1","4.2","4.3","4.4","5.0","5.0SP2"], market: "All", sourceRef: "SRC-001" },
    { id: "S-011", category: "Session", name: "Invalid Field Type", description: "Field value type mismatch (int/char/price/UTCTimestamp)", severity: "Error", scope: "All", enabled: true, fixVersions: ["4.0","4.1","4.2","4.3","4.4","5.0","5.0SP2"], market: "All", sourceRef: "SRC-010" },
    { id: "S-012", category: "Session", name: "Field Outside Group", description: "Group member appears without group counter", severity: "Error", scope: "All", enabled: true, fixVersions: ["4.0","4.1","4.2","4.3","4.4","5.0","5.0SP2"], market: "All", sourceRef: "SRC-001" },
    { id: "S-013", category: "Session", name: "Group Count Mismatch", description: "NoXXX count differs from actual entries", severity: "Error", scope: "All", enabled: true, fixVersions: ["4.0","4.1","4.2","4.3","4.4","5.0","5.0SP2"], market: "All", sourceRef: "SRC-001" },
    { id: "S-014", category: "Session", name: "PossDup Requires OrigSendingTime", description: "If 43=Y then 122 required", severity: "Error", scope: "All", enabled: true, fixVersions: ["4.0","4.1","4.2","4.3","4.4","5.0","5.0SP2"], market: "All", sourceRef: "SRC-001" },
    { id: "S-015", category: "Session", name: "PossDup Without Gap Context", description: "43=Y but no resend context", severity: "Warning", scope: "All", enabled: true, fixVersions: ["4.0","4.1","4.2","4.3","4.4","5.0","5.0SP2"], market: "All", sourceRef: "SRC-001" },
    { id: "S-016", category: "Session", name: "CompID Direction Validation", description: "Incoming 49/56 must match expected session direction", severity: "Error", scope: "All", enabled: true, fixVersions: ["4.0","4.1","4.2","4.3","4.4","5.0","5.0SP2"], market: "All", sourceRef: "SRC-001" },
    { id: "S-017", category: "Session", name: "EncryptMethod on Logon", description: "Logon must include 98 and supported value", severity: "Error", scope: "All", enabled: true, fixVersions: ["4.0","4.1","4.2","4.3","4.4","5.0","5.0SP2"], market: "All", sourceRef: "SRC-001" },
    { id: "S-018", category: "Session", name: "HeartBtInt on Logon", description: "Logon must include 108 and positive value", severity: "Error", scope: "All", enabled: true, fixVersions: ["4.0","4.1","4.2","4.3","4.4","5.0","5.0SP2"], market: "All", sourceRef: "SRC-001" },
    // Section B: Session State and Sequence Rules
    { id: "SS-001", category: "Session State", name: "Inbound Sequence Too Low", description: "Received 34 less than expected (non-dup path)", severity: "Error", scope: "All", enabled: true, fixVersions: ["4.0","4.1","4.2","4.3","4.4","5.0","5.0SP2"], market: "All", sourceRef: "SRC-001" },
    { id: "SS-002", category: "Session State", name: "Inbound Sequence Gap", description: "Received 34 greater than expected, resend logic required", severity: "Warning", scope: "All", enabled: true, fixVersions: ["4.0","4.1","4.2","4.3","4.4","5.0","5.0SP2"], market: "All", sourceRef: "SRC-001" },
    { id: "SS-003", category: "Session State", name: "Sequence Reset GapFill", description: "SeqReset GapFill must include 123=Y and valid 36", severity: "Error", scope: "All", enabled: true, fixVersions: ["4.0","4.1","4.2","4.3","4.4","5.0","5.0SP2"], market: "All", sourceRef: "SRC-001" },
    { id: "SS-004", category: "Session State", name: "Sequence Reset NewSeqNo Valid", description: "Tag 36 must be greater than current expected inbound", severity: "Error", scope: "All", enabled: true, fixVersions: ["4.0","4.1","4.2","4.3","4.4","5.0","5.0SP2"], market: "All", sourceRef: "SRC-001" },
    { id: "SS-005", category: "Session State", name: "Resend Request Range Valid", description: "Tags 7 and 16 must define valid range", severity: "Error", scope: "All", enabled: true, fixVersions: ["4.0","4.1","4.2","4.3","4.4","5.0","5.0SP2"], market: "All", sourceRef: "SRC-001" },
    { id: "SS-006", category: "Session State", name: "TestRequest Requires TestReqID", description: "MsgType 1 must include 112", severity: "Error", scope: "All", enabled: true, fixVersions: ["4.0","4.1","4.2","4.3","4.4","5.0","5.0SP2"], market: "All", sourceRef: "SRC-001" },
    { id: "SS-007", category: "Session State", name: "Heartbeat Echo TestReqID", description: "Heartbeat responding to TestRequest should include 112", severity: "Warning", scope: "All", enabled: true, fixVersions: ["4.0","4.1","4.2","4.3","4.4","5.0","5.0SP2"], market: "All", sourceRef: "SRC-001" },
    { id: "SS-008", category: "Session State", name: "Logout Flow Integrity", description: "Unexpected Logout reason or abrupt close without Logout", severity: "Warning", scope: "All", enabled: true, fixVersions: ["4.0","4.1","4.2","4.3","4.4","5.0","5.0SP2"], market: "All", sourceRef: "SRC-001" },
    { id: "SS-009", category: "Session State", name: "ResetSeqNumFlag Handling", description: "Logon with 141=Y must follow bilateral reset policy", severity: "Warning", scope: "All", enabled: true, fixVersions: ["4.1","4.2","4.3","4.4","5.0","5.0SP2"], market: "All", sourceRef: "SRC-001" },
    { id: "SS-010", category: "Session State", name: "Admin During Logout Window", description: "New app messages after logout initiated", severity: "Error", scope: "All", enabled: true, fixVersions: ["4.0","4.1","4.2","4.3","4.4","5.0","5.0SP2"], market: "All", sourceRef: "SRC-001" },
    // Section C: Message Dictionary Rules
    { id: "D-001", category: "Dictionary", name: "MsgType Supported", description: "Tag 35 must be known in FIX 4.2 or registered custom", severity: "Error", scope: "All", enabled: true, fixVersions: ["4.0","4.1","4.2","4.3","4.4","5.0","5.0SP2"], market: "All", sourceRef: "SRC-010" },
    { id: "D-002", category: "Dictionary", name: "Required Tags Per MsgType", description: "Enforce FIX 4.2 required fields for each MsgType", severity: "Error", scope: "All", enabled: true, fixVersions: ["4.0","4.1","4.2","4.3","4.4","5.0","5.0SP2"], market: "All", sourceRef: "SRC-010" },
    { id: "D-003", category: "Dictionary", name: "Conditional Required Tags", description: "Enforce if-then rules (e.g., price required for limit)", severity: "Error", scope: "All", enabled: true, fixVersions: ["4.0","4.1","4.2","4.3","4.4","5.0","5.0SP2"], market: "All", sourceRef: "SRC-010" },
    { id: "D-004", category: "Dictionary", name: "Enum Value Validity", description: "Enum tags must be valid FIX 4.2 values", severity: "Error", scope: "All", enabled: true, fixVersions: ["4.0","4.1","4.2","4.3","4.4","5.0","5.0SP2"], market: "All", sourceRef: "SRC-010" },
    { id: "D-005", category: "Dictionary", name: "Data Length Pair Integrity", description: "Length/data paired tags must be consistent", severity: "Error", scope: "All", enabled: true, fixVersions: ["4.0","4.1","4.2","4.3","4.4","5.0","5.0SP2"], market: "All", sourceRef: "SRC-001" },
    { id: "D-006", category: "Dictionary", name: "Unknown Standard Tag", description: "Unknown standard-range tag not in dictionary", severity: "Warning", scope: "All", enabled: true, fixVersions: ["4.0","4.1","4.2","4.3","4.4","5.0","5.0SP2"], market: "All", sourceRef: "SRC-010" },
    { id: "D-007", category: "Dictionary", name: "Custom Tag Policy", description: "Custom tags allowed only in approved ranges/prefixes", severity: "Warning", scope: "All", enabled: true, fixVersions: ["4.0","4.1","4.2","4.3","4.4","5.0","5.0SP2"], market: "All", sourceRef: "SRC-011" },
    { id: "D-008", category: "Dictionary", name: "Tag Ordering Policy", description: "Non-critical ordering deviations for body fields", severity: "Info", scope: "All", enabled: true, fixVersions: ["4.0","4.1","4.2","4.3","4.4","5.0","5.0SP2"], market: "All", sourceRef: "SRC-001" },
    // Section D: Business Rules
    { id: "B-001", category: "Business", name: "ClOrdID Required", description: "New/Cancel/Replace must include tag 11", severity: "Error", scope: "All", enabled: true, fixVersions: ["4.0","4.1","4.2","4.3","4.4","5.0","5.0SP2"], market: "All", sourceRef: "SRC-001" },
    { id: "B-002", category: "Business", name: "ClOrdID Uniqueness", description: "Tag 11 must be unique per client scope/policy window", severity: "Error", scope: "All", enabled: true, fixVersions: ["4.0","4.1","4.2","4.3","4.4","5.0","5.0SP2"], market: "All", sourceRef: "SRC-005" },
    { id: "B-003", category: "Business", name: "Symbol Required", description: "Instrument identifier required for venue policy", severity: "Error", scope: "All", enabled: true, fixVersions: ["4.0","4.1","4.2","4.3","4.4","5.0","5.0SP2"], market: "All", sourceRef: "SRC-001" },
    { id: "B-004", category: "Business", name: "Side Valid", description: "Tag 54 must be valid and allowed", severity: "Error", scope: "All", enabled: true, fixVersions: ["4.0","4.1","4.2","4.3","4.4","5.0","5.0SP2"], market: "All", sourceRef: "SRC-001" },
    { id: "B-005", category: "Business", name: "TransactTime Required", description: "Tag 60 required on order flow messages", severity: "Error", scope: "All", enabled: true, fixVersions: ["4.0","4.1","4.2","4.3","4.4","5.0","5.0SP2"], market: "All", sourceRef: "SRC-001" },
    { id: "B-006", category: "Business", name: "OrderQty Positive", description: "Tag 38 must be greater than 0", severity: "Error", scope: "All", enabled: true, fixVersions: ["4.0","4.1","4.2","4.3","4.4","5.0","5.0SP2"], market: "All", sourceRef: "SRC-001" },
    { id: "B-007", category: "Business", name: "OrdType Required", description: "Tag 40 required and valid", severity: "Error", scope: "All", enabled: true, fixVersions: ["4.0","4.1","4.2","4.3","4.4","5.0","5.0SP2"], market: "All", sourceRef: "SRC-001" },
    { id: "B-008", category: "Business", name: "Limit Price Required", description: "If 40=2 then 44 required and greater than 0", severity: "Error", scope: "All", enabled: true, fixVersions: ["4.0","4.1","4.2","4.3","4.4","5.0","5.0SP2"], market: "All", sourceRef: "SRC-001" },
    { id: "B-009", category: "Business", name: "StopPx Required", description: "If stop/stop-limit then 99 required", severity: "Error", scope: "All", enabled: true, fixVersions: ["4.0","4.1","4.2","4.3","4.4","5.0","5.0SP2"], market: "All", sourceRef: "SRC-001" },
    { id: "B-010", category: "Business", name: "TimeInForce Conditional", description: "Tag 59 must be valid; GTD requires 126", severity: "Error", scope: "All", enabled: true, fixVersions: ["4.0","4.1","4.2","4.3","4.4","5.0","5.0SP2"], market: "All", sourceRef: "SRC-001" },
    { id: "B-011", category: "Business", name: "ExpireTime Logic", description: "Tag 126 should be future relative to 60/52", severity: "Warning", scope: "All", enabled: true, fixVersions: ["4.0","4.1","4.2","4.3","4.4","5.0","5.0SP2"], market: "All", sourceRef: "SRC-001" },
    { id: "B-012", category: "Business", name: "Currency/Instrument Consistency", description: "Currency valid for instrument/venue mapping", severity: "Warning", scope: "All", enabled: true, fixVersions: ["4.0","4.1","4.2","4.3","4.4","5.0","5.0SP2"], market: "All", sourceRef: "SRC-005" },
    { id: "B-013", category: "Business", name: "Account Policy", description: "If account mandatory for client, tag 1 required", severity: "Error", scope: "All", enabled: true, fixVersions: ["4.0","4.1","4.2","4.3","4.4","5.0","5.0SP2"], market: "All", sourceRef: "SRC-005" },
    { id: "B-014", category: "Business", name: "Capacity Rule", description: "Tag 47 must be present/allowed where required", severity: "Warning", scope: "All", enabled: true, fixVersions: ["4.2","4.3","4.4","5.0","5.0SP2"], market: "US Equities", sourceRef: "SRC-012" },
    { id: "B-015", category: "Business", name: "MinQty/DisplayQty Logic", description: "Tags 110/111 constraints and not greater than OrderQty", severity: "Error", scope: "All", enabled: true, fixVersions: ["4.2","4.3","4.4","5.0","5.0SP2"], market: "All", sourceRef: "SRC-001" },
    // Section E: Execution Report and Cancel Flow Rules
    { id: "EX-001", category: "Execution", name: "ExecReport Core Required", description: "MsgType 8 must include key tags (37,17,150,39,54,38) per policy", severity: "Error", scope: "All", enabled: true, fixVersions: ["4.0","4.1","4.2","4.3","4.4","5.0","5.0SP2"], market: "All", sourceRef: "SRC-001" },
    { id: "EX-002", category: "Execution", name: "ExecType OrdStatus Matrix", description: "Tags 150 and 39 combinations must be valid", severity: "Error", scope: "All", enabled: true, fixVersions: ["4.0","4.1","4.2","4.3","4.4","5.0","5.0SP2"], market: "All", sourceRef: "SRC-001" },
    { id: "EX-003", category: "Execution", name: "CumQty LeavesQty Math", description: "Tag 14 + 151 equals 38 for active lifecycle states", severity: "Error", scope: "All", enabled: true, fixVersions: ["4.1","4.2","4.3","4.4","5.0","5.0SP2"], market: "All", sourceRef: "SRC-001" },
    { id: "EX-004", category: "Execution", name: "LastQty/LastPx Pair", description: "If fill reported, tags 32 and 31 must be coherent", severity: "Error", scope: "All", enabled: true, fixVersions: ["4.0","4.1","4.2","4.3","4.4","5.0","5.0SP2"], market: "All", sourceRef: "SRC-001" },
    { id: "EX-005", category: "Execution", name: "AvgPx Consistency", description: "Tag 6 must be coherent with fills/cumqty", severity: "Warning", scope: "All", enabled: true, fixVersions: ["4.0","4.1","4.2","4.3","4.4","5.0","5.0SP2"], market: "All", sourceRef: "SRC-001" },
    { id: "EX-006", category: "Execution", name: "Cancel Request Original ID", description: "MsgType F must include 41 and map to existing live order", severity: "Error", scope: "All", enabled: true, fixVersions: ["4.0","4.1","4.2","4.3","4.4","5.0","5.0SP2"], market: "All", sourceRef: "SRC-001" },
    { id: "EX-007", category: "Execution", name: "Replace Request Original ID", description: "MsgType G must include 41 and valid replace chain", severity: "Error", scope: "All", enabled: true, fixVersions: ["4.0","4.1","4.2","4.3","4.4","5.0","5.0SP2"], market: "All", sourceRef: "SRC-001" },
    { id: "EX-008", category: "Execution", name: "Cancel Reject Integrity", description: "MsgType 9 includes 11,41,39,434 with valid reason", severity: "Error", scope: "All", enabled: true, fixVersions: ["4.0","4.1","4.2","4.3","4.4","5.0","5.0SP2"], market: "All", sourceRef: "SRC-001" },
    { id: "EX-009", category: "Execution", name: "Terminal State Guard", description: "Fills/cancels after terminal status without reopen event", severity: "Error", scope: "All", enabled: true, fixVersions: ["4.0","4.1","4.2","4.3","4.4","5.0","5.0SP2"], market: "All", sourceRef: "SRC-001" },
    { id: "EX-010", category: "Execution", name: "Out-of-Order Lifecycle", description: "Business state transition invalid for order lifecycle", severity: "Error", scope: "All", enabled: true, fixVersions: ["4.0","4.1","4.2","4.3","4.4","5.0","5.0SP2"], market: "All", sourceRef: "SRC-001" },
    // Section F: Market Data Rules
    { id: "MD-001", category: "Market Data", name: "MDReqID Required", description: "MsgType V/W/X rules enforce required request IDs", severity: "Error", scope: "All", enabled: true, fixVersions: ["4.2","4.3","4.4","5.0","5.0SP2"], market: "All", sourceRef: "SRC-001" },
    { id: "MD-002", category: "Market Data", name: "MDEntry Group Integrity", description: "NoMDEntries count and entry fields consistent", severity: "Error", scope: "All", enabled: true, fixVersions: ["4.2","4.3","4.4","5.0","5.0SP2"], market: "All", sourceRef: "SRC-001" },
    { id: "MD-003", category: "Market Data", name: "MD Entry Type Enum", description: "Tag 269 values valid", severity: "Error", scope: "All", enabled: true, fixVersions: ["4.2","4.3","4.4","5.0","5.0SP2"], market: "All", sourceRef: "SRC-010" },
    { id: "MD-004", category: "Market Data", name: "MD Entry Price/Size Coherence", description: "Tags 270/271 fields required as per entry type", severity: "Error", scope: "All", enabled: true, fixVersions: ["4.2","4.3","4.4","5.0","5.0SP2"], market: "All", sourceRef: "SRC-001" },
    { id: "MD-005", category: "Market Data", name: "Subscription Type Valid", description: "Tag 263 enum and behavior valid", severity: "Error", scope: "All", enabled: true, fixVersions: ["4.2","4.3","4.4","5.0","5.0SP2"], market: "All", sourceRef: "SRC-001" },
    { id: "MD-006", category: "Market Data", name: "MarketDepth Valid", description: "Tag 264 positive integer and policy-compliant", severity: "Warning", scope: "All", enabled: true, fixVersions: ["4.2","4.3","4.4","5.0","5.0SP2"], market: "All", sourceRef: "SRC-001" },
    // Section G: Venue Rules
    { id: "V-001", category: "Venue", name: "NYSE Trading Hours", description: "Reject outside NYSE hours (9:30-16:00 ET) unless GTC/GTD", severity: "Error", scope: "Equities", enabled: true, fixVersions: ["4.0","4.1","4.2","4.3","4.4","5.0","5.0SP2"], market: "NYSE", sourceRef: "SRC-005" },
    { id: "V-002", category: "Venue", name: "NASDAQ Tick Size", description: "Price must align to NASDAQ tick table (0.01 for >$1)", severity: "Error", scope: "Equities", enabled: true, fixVersions: ["4.0","4.1","4.2","4.3","4.4","5.0","5.0SP2"], market: "NASDAQ", sourceRef: "SRC-006" },
    { id: "V-003", category: "Venue", name: "CME Max Order Qty", description: "Order size cannot exceed CME position limits", severity: "Error", scope: "Futures", enabled: true, fixVersions: ["4.2","4.4","5.0SP2"], market: "CME", sourceRef: "SRC-007" },
    { id: "V-004", category: "Venue", name: "Reg SHO Short Sale Marking", description: "Locate/marking fields required for short sales", severity: "Error", scope: "Equities", enabled: true, fixVersions: ["4.2","4.3","4.4","5.0","5.0SP2"], market: "US Equities", sourceRef: "SRC-012" },
    { id: "V-005", category: "Venue", name: "LSE Instrument Eligibility", description: "Symbol must be enabled for LSE trading", severity: "Error", scope: "Equities", enabled: true, fixVersions: ["4.2","4.4","5.0SP2"], market: "LSE", sourceRef: "SRC-008" },
    { id: "V-006", category: "Venue", name: "Eurex Throttle Limits", description: "Max 50 messages per second per session", severity: "Warning", scope: "Derivatives", enabled: true, fixVersions: ["4.2","4.4","5.0SP2"], market: "Eurex", sourceRef: "SRC-009" },
    { id: "V-007", category: "Venue", name: "MiFID II Clock Sync", description: "SendingTime must be within 100μs of exchange timestamp", severity: "Warning", scope: "All", enabled: true, fixVersions: ["4.4","5.0","5.0SP2"], market: "EU Markets", sourceRef: "SRC-013" },
    // Section H: Custom Client Rules
    { id: "C-001", category: "Custom", name: "Custom Tag Mandatory by Client", description: "Client-specific required custom tags", severity: "Error", scope: "Per Client", enabled: true, fixVersions: ["4.2","4.4","5.0SP2"], market: "All", sourceRef: "Client Spec" },
    { id: "C-002", category: "Custom", name: "Client Reference Mapping", description: "Client reference field format and mapping rules", severity: "Error", scope: "Per Client", enabled: true, fixVersions: ["4.2","4.4","5.0SP2"], market: "All", sourceRef: "Client Spec" },
    { id: "C-003", category: "Custom", name: "Strategy Parameter Validation", description: "Client algo/strategy parameter cross-field rules", severity: "Warning", scope: "Per Client", enabled: true, fixVersions: ["4.4","5.0","5.0SP2"], market: "All", sourceRef: "Client Spec" },
    { id: "C-004", category: "Custom", name: "Allowed MsgTypes", description: "Restrict MsgTypes per client agreement", severity: "Error", scope: "Per Client", enabled: true, fixVersions: ["4.2","4.4","5.0SP2"], market: "All", sourceRef: "Client Spec" },
    { id: "C-005", category: "Custom", name: "Proprietary OrdType Extensions", description: "Client proprietary order type validation", severity: "Warning", scope: "Per Client", enabled: true, fixVersions: ["4.4","5.0SP2"], market: "All", sourceRef: "Client Spec" },
  ])

  // AI Review queue data - grouped by client and review type
  const [aiReviewItems] = useState([
    // Nexus Trading Group
    { id: "AIR-001", caseId: "OB-2026-0147", client: "Nexus Trading Group", reviewType: "Spec Review", finding: "Field 49 (SenderCompID) format mismatch - client uses alphanumeric, standard expects alpha only", confidence: 0.92, severity: "Medium", aiReason: "Pattern analysis shows 15% of client messages contain numeric characters in SenderCompID", status: "pending", createdDate: "Apr 12, 2026" },
    { id: "AIR-002", caseId: "OB-2026-0147", client: "Nexus Trading Group", reviewType: "Spec Review", finding: "Custom tag 5001 not documented in client spec but present in 78% of messages", confidence: 0.88, severity: "Low", aiReason: "Tag appears consistently but has no corresponding specification entry", status: "pending", createdDate: "Apr 12, 2026" },
    { id: "AIR-003", caseId: "OB-2026-0147", client: "Nexus Trading Group", reviewType: "ATDL Review", finding: "Strategy parameter MinQty has no validation constraint defined", confidence: 0.95, severity: "High", aiReason: "ATDL definition allows any value but venue requires MinQty <= OrderQty", status: "pending", createdDate: "Apr 11, 2026" },
    { id: "AIR-004", caseId: "OB-2026-0147", client: "Nexus Trading Group", reviewType: "ATDL Review", finding: "DisplayQty parameter missing from VWAP strategy definition", confidence: 0.72, severity: "Medium", aiReason: "Similar strategies from other clients include DisplayQty as optional parameter", status: "pending", createdDate: "Apr 11, 2026" },
    { id: "AIR-005", caseId: "OB-2026-0147", client: "Nexus Trading Group", reviewType: "Log Analysis", finding: "Sequence gap detected between messages 1045-1048 with no resend request", confidence: 0.89, severity: "High", aiReason: "Gap occurred during peak trading hours, may indicate connectivity issue", status: "pending", createdDate: "Apr 10, 2026" },
    { id: "AIR-006", caseId: "OB-2026-0147", client: "Nexus Trading Group", reviewType: "Log Analysis", finding: "Heartbeat interval inconsistent - varying between 28-35 seconds", confidence: 0.67, severity: "Low", aiReason: "Agreed interval is 30 seconds, variance may cause false timeout detection", status: "accepted", createdDate: "Apr 9, 2026" },
    // Apex Capital Partners
    { id: "AIR-007", caseId: "OB-2026-0142", client: "Apex Capital Partners", reviewType: "Spec Review", finding: "TimeInForce (59) enum values include unsupported value '7' (AtTheClose)", confidence: 0.94, severity: "High", aiReason: "Venue does not support AtTheClose orders, will result in rejects", status: "pending", createdDate: "Apr 12, 2026" },
    { id: "AIR-008", caseId: "OB-2026-0142", client: "Apex Capital Partners", reviewType: "Spec Review", finding: "SecurityType (167) not included in spec but required for multi-asset trading", confidence: 0.81, severity: "Medium", aiReason: "Client enabled for equities and options, SecurityType needed for routing", status: "pending", createdDate: "Apr 11, 2026" },
    { id: "AIR-009", caseId: "OB-2026-0142", client: "Apex Capital Partners", reviewType: "Log Analysis", finding: "Unusual reject pattern - 23% of NewOrderSingle rejected with reason code 0", confidence: 0.78, severity: "High", aiReason: "Historical baseline shows <5% reject rate for similar clients", status: "pending", createdDate: "Apr 11, 2026" },
    { id: "AIR-010", caseId: "OB-2026-0142", client: "Apex Capital Partners", reviewType: "Log Analysis", finding: "Cancel requests sent before order acknowledgment received", confidence: 0.91, severity: "Medium", aiReason: "Race condition detected in 12 instances, may cause orphaned orders", status: "pending", createdDate: "Apr 10, 2026" },
    { id: "AIR-011", caseId: "OB-2026-0142", client: "Apex Capital Partners", reviewType: "Test Scenario", finding: "No test coverage for order replacement during partial fill state", confidence: 0.86, severity: "Medium", aiReason: "Coverage analysis shows gap in replace scenarios for OrdStatus=1", status: "pending", createdDate: "Apr 9, 2026" },
    // Horizon Investments
    { id: "AIR-012", caseId: "OB-2026-0151", client: "Horizon Investments", reviewType: "Spec Review", finding: "Price precision set to 4 decimals but venue supports only 2 for equities", confidence: 0.97, severity: "High", aiReason: "Mismatch will cause price truncation or rejects on sub-penny orders", status: "pending", createdDate: "Apr 12, 2026" },
    { id: "AIR-013", caseId: "OB-2026-0151", client: "Horizon Investments", reviewType: "ATDL Review", finding: "Iceberg strategy missing required parameter StartTime", confidence: 0.83, severity: "Medium", aiReason: "Comparison with standard Iceberg template shows missing time constraint", status: "pending", createdDate: "Apr 11, 2026" },
    { id: "AIR-014", caseId: "OB-2026-0151", client: "Horizon Investments", reviewType: "ATDL Review", finding: "ParticipationRate parameter allows values >100%", confidence: 0.96, severity: "High", aiReason: "No upper bound constraint defined, invalid values could be submitted", status: "pending", createdDate: "Apr 11, 2026" },
    { id: "AIR-015", caseId: "OB-2026-0151", client: "Horizon Investments", reviewType: "Log Analysis", finding: "ExecType/OrdStatus mismatch in 3 execution reports", confidence: 0.74, severity: "Low", aiReason: "ExecType=F (Trade) paired with OrdStatus=0 (New) instead of 1 or 2", status: "accepted", createdDate: "Apr 10, 2026" },
    { id: "AIR-016", caseId: "OB-2026-0151", client: "Horizon Investments", reviewType: "Test Scenario", finding: "Missing test coverage for partial fill scenarios with multiple execution reports", confidence: 0.85, severity: "Low", aiReason: "Coverage analysis indicates 0 scenarios test multi-leg partial fills", status: "accepted", createdDate: "Apr 10, 2026" },
    // Meridian Securities
    { id: "AIR-017", caseId: "OB-2026-0138", client: "Velocity Securities", reviewType: "Spec Review", finding: "Account field (1) marked optional but required by compliance policy", confidence: 0.89, severity: "High", aiReason: "Regulatory requirement mandates account on all order flow messages", status: "pending", createdDate: "Apr 12, 2026" },
    { id: "AIR-018", caseId: "OB-2026-0138", client: "Velocity Securities", reviewType: "Spec Review", finding: "ClOrdID format allows special characters not permitted by OMS", confidence: 0.77, severity: "Medium", aiReason: "Pattern [A-Za-z0-9-]+ required but spec allows underscores and dots", status: "pending", createdDate: "Apr 11, 2026" },
    { id: "AIR-019", caseId: "OB-2026-0138", client: "Velocity Securities", reviewType: "Log Analysis", finding: "Logout messages missing Text (58) field with disconnect reason", confidence: 0.62, severity: "Info", aiReason: "Best practice to include reason, aids in debugging session issues", status: "rejected", createdDate: "Apr 10, 2026" },
    { id: "AIR-020", caseId: "OB-2026-0138", client: "Velocity Securities", reviewType: "Test Scenario", finding: "Insufficient coverage for market data subscription edge cases", confidence: 0.71, severity: "Low", aiReason: "Only 2 of 8 MDReqRejReason codes tested in scenarios", status: "pending", createdDate: "Apr 9, 2026" },
  ])
  
  // AI Review expanded sections state
  const [expandedReviewClients, setExpandedReviewClients] = useState<Record<string, boolean>>({})
  const [expandedReviewTypes, setExpandedReviewTypes] = useState<Record<string, boolean>>({})

  // SLA Analytics data
  const [slaMetrics] = useState({
    avgTimeToOnboard: 42,
    avgTimeToOnboardTrend: -8,
    onTrackPercentage: 72,
    atRiskPercentage: 20,
    blockedPercentage: 8,
    defectLeakage: 3.2,
    reopenRate: 8.5,
    certReadinessScore: 78,
  })

  // Rule Library filter state
  const [ruleFilter, setRuleFilter] = useState("All")
  const [ruleSearch, setRuleSearch] = useState("")
  const [ruleFixVersionFilter, setRuleFixVersionFilter] = useState("All")
  const [ruleMarketFilter, setRuleMarketFilter] = useState("All")
  const [ruleSeverityFilter, setRuleSeverityFilter] = useState("All")
  const [showSourceMaterials, setShowSourceMaterials] = useState(false)
  const [expandedRuleSections, setExpandedRuleSections] = useState<Record<string, boolean>>({
    "session": true,
    "business": true,
    "execution": true,
    "market-data": true,
    "venue": true,
    "custom": true
  })

  // FIX MSG Creator state
  const [fixMsgSelectedSpec, setFixMsgSelectedSpec] = useState("")
  const [fixMsgSelectedType, setFixMsgSelectedType] = useState("")
  const [fixMsgIsConnected, setFixMsgIsConnected] = useState(false)
  const [fixMsgConnectionConfig, setFixMsgConnectionConfig] = useState({ host: "", port: "", senderCompId: "", targetCompId: "" })
  const [fixMsgFields, setFixMsgFields] = useState<Array<{ tag: string; name: string; value: string; editable: boolean }>>([])
  const [fixMsgLog, setFixMsgLog] = useState<Array<{ direction: "send" | "recv"; msgType: string; msgTypeName: string; seqNum: number; clOrdId: string; ordStatus: string; ordStatusName: string; rawMessage: string; timestamp: string }>>([])
  const [fixMsgLogExpanded, setFixMsgLogExpanded] = useState(false)
  const [fixMsgSeqNum, setFixMsgSeqNum] = useState(1)
  const [fixMsgSelectedRow, setFixMsgSelectedRow] = useState<number | null>(null)
  const [fixMsgCopied, setFixMsgCopied] = useState(false)
  const [fixMsgSent, setFixMsgSent] = useState(false)
  const [selectedAdminSpecForResults, setSelectedAdminSpecForResults] = useState<string | null>(null)
  const [atdlShowResults, setAtdlShowResults] = useState(false)
  const [fixAtdlShowResults, setFixAtdlShowResults] = useState(false)
  const [conversionComplete, setConversionComplete] = useState(false)
  const [atdlValidated, setAtdlValidated] = useState(false)
  const [atdlUiVisible, setAtdlUiVisible] = useState(false)
  const [atdlFixMessageGenerated, setAtdlFixMessageGenerated] = useState(false)
  const [atdlFixValidationResults, setAtdlFixValidationResults] = useState(false)
  const [atdlSelectedStrategy, setAtdlSelectedStrategy] = useState("VWAP")
  const [atdlSelectedFile, setAtdlSelectedFile] = useState("AlgoSuite_Complete_v1.5.atdl")
  const [atdlSelectedFixSpec, setAtdlSelectedFixSpec] = useState("equities-4.4")
  const [atdlWizardStep, setAtdlWizardStep] = useState(0)
  const [atdlWizardWorkOrder, setAtdlWizardWorkOrder] = useState<string | null>(null)
  const [atdlValidationFilter, setAtdlValidationFilter] = useState<"all" | "error" | "warning" | "pass">("all")
  const [atdlDecisions, setAtdlDecisions] = useState<Record<string, string>>({})
  const [atdlRemediationFilter, setAtdlRemediationFilter] = useState<"all" | "open" | "in-progress" | "resolved">("all")
  const [atdlWorkflowType, setAtdlWorkflowType] = useState<"create-from-spec" | "validate-update" | "compare-atdl">("create-from-spec")
  const [atdlValidationActions, setAtdlValidationActions] = useState<Record<string, string>>({})
  const [atdlSimulationErrors, setAtdlSimulationErrors] = useState<Record<string, string>>({})
  const [demoFormData, setDemoFormData] = useState({
    name: "",
    email: "",
    company: "",
    clientType: "",
    functionality: [] as string[],
    hostingPreference: "",
    message: ""
  })

  // Theme colors - B-COMET Design System
  // Theme colors
  const bgPrimary = isDarkMode ? "bg-[#0a1628]" : "bg-[#f8fafc]"
  const bgSecondary = isDarkMode ? "bg-[#0d2137]" : "bg-white"
  const bgCard = isDarkMode ? "bg-[#132f4c]" : "bg-white"
  const textPrimary = isDarkMode ? "text-white" : "text-[#0a1628]"
  const textSecondary = isDarkMode ? "text-[#b0bec5]" : "text-[#64748b]"
  const borderColor = isDarkMode ? "border-[#1e4976]" : "border-[#e2e8f0]"

  const assetClassesList = ["Equities", "Fixed Income", "Options", "Futures", "FX", "Commodities"]

  // Sample clients data with asset class progress
  const [clients, setClients] = useState([
    { 
      id: 1, name: "Nexus Trading Group", jira: "NTG-001", accountManager: "John Smith", 
      assetClasses: [
        { name: "Equities", specCompare: "completed", logAnalysis: "error", scenario: "in-progress", testCase: "completed", certification: "not-started", config: "completed", alerts: 2 },
        { name: "Options", specCompare: "completed", logAnalysis: "completed", scenario: "completed", testCase: "in-progress", certification: "not-started", config: "completed", alerts: 1 },
      ]
    },
    { 
      id: 2, name: "Apex Capital Partners", jira: "ACP-002", accountManager: "Jane Doe", 
      assetClasses: [
        { name: "Fixed Income", specCompare: "completed", logAnalysis: "completed", scenario: "completed", testCase: "in-progress", certification: "not-started", config: "completed", alerts: 0 },
      ]
    },
    { 
      id: 3, name: "Horizon Investments", jira: "HI-003", accountManager: "Bob Wilson", 
      assetClasses: [
        { name: "Futures", specCompare: "in-progress", logAnalysis: "not-started", scenario: "not-started", testCase: "not-started", certification: "not-started", config: "in-progress", alerts: 3 },
        { name: "FX", specCompare: "completed", logAnalysis: "in-progress", scenario: "not-started", testCase: "not-started", certification: "not-started", config: "completed", alerts: 2 },
      ]
    },
    { 
      id: 4, name: "Velocity Securities", jira: "VS-004", accountManager: "Alice Brown", 
      assetClasses: [
        { name: "Equities", specCompare: "completed", logAnalysis: "completed", scenario: "completed", testCase: "completed", certification: "in-progress", config: "completed", alerts: 1 },
      ]
    },
    { 
      id: 5, name: "Quantum Asset Management", jira: "QAM-005", accountManager: "Charlie Davis", 
      assetClasses: [
        { name: "Commodities", specCompare: "error", logAnalysis: "in-progress", scenario: "not-started", testCase: "not-started", certification: "not-started", config: "error", alerts: 5 },
        { name: "Equities", specCompare: "completed", logAnalysis: "completed", scenario: "in-progress", testCase: "not-started", certification: "not-started", config: "completed", alerts: 3 },
      ]
    },
  ])

  // Calculate aggregate status for a client
  const getAggregateStatus = (client: any, field: string) => {
    const statuses = client.assetClasses.map((ac: any) => ac[field])
    if (statuses.includes("error")) return "error"
    if (statuses.includes("in-progress")) return "in-progress"
    if (statuses.every((s: string) => s === "completed")) return "completed"
    if (statuses.every((s: string) => s === "not-started")) return "not-started"
    return "in-progress"
  }

  const getTotalAlerts = (client: any) => {
    return client.assetClasses.reduce((sum: number, ac: any) => sum + ac.alerts, 0)
  }

  // Features for landing page
  const features = [
    { icon: GitCompare, title: "Spec Comparison", desc: "Compare client FIX specs against standard specifications" },
    { icon: FileSearch, title: "Log Analysis", desc: "Analyze FIX logs to identify protocol violations" },
    { icon: Activity, title: "Scenario Creation", desc: "Create and manage test scenarios for validation" },
    { icon: Zap, title: "Test Case Generation", desc: "Convert scenarios to VeriFIX regression test cases" },
    { icon: Award, title: "Certification Test Cases", desc: "Generate certification test cases for Conductor" },
    { icon: Cog, title: "Configuration", desc: "Configure FIX settings and parameters" },
  ]

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      "completed": "bg-[#4caf50]/20 text-[#4caf50]",
      "in-progress": "bg-[#2196f3]/20 text-[#2196f3]",
      "error": "bg-[#f44336]/20 text-[#f44336]",
      "not-started": isDarkMode ? "bg-[#455a64]/20 text-[#90a4ae]" : "bg-[#e2e8f0] text-[#64748b]",
    }
    const labels: Record<string, string> = {
      "completed": "Done",
      "in-progress": "In Progress",
      "error": "Error",
      "not-started": "Not Started",
    }
    return <span className={`px-2 py-1 rounded text-xs font-medium ${styles[status]}`}>{labels[status]}</span>
  }

  // Simulate a task with loading animation
  const simulateTask = async (callback: () => void, duration: number = 2000) => {
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, duration))
    callback()
    setIsLoading(false)
  }

  const handleAddClient = () => {
    if (newClient.name && newClient.legalEntity && newClient.assetClasses.length > 0 && newClient.onboardingManager && newClient.technicalLead) {
      const client = {
        id: clients.length + 1,
        name: newClient.name,
        jira: newClient.jira,
        accountManager: newClient.accountManager,
        assetClasses: newClient.assetClasses.map(ac => ({
          name: ac,
          specCompare: "not-started",
          logAnalysis: "not-started",
          scenario: "not-started",
          testCase: "not-started",
          certification: "not-started",
          config: "not-started",
          alerts: 0,
        }))
      }
      setClients([...clients, client])
      setNewClient({ name: "", legalEntity: "", jira: "", accountManager: "", assetClasses: [], onboardingTracks: [], includesAtdl: true, slaDays: 22, onboardingManager: "", technicalLead: "" })
      setShowAddClientModal(false)
    }
  }


  // Logo Components - Realistic bright comet like reference image
  const CometLogo = ({ size = 40 }: { size?: number }) => (
    <svg viewBox="0 0 120 28" style={{ width: size * 3, height: size * 0.7 }}>
      <defs>
        {/* Main tail gradient - long streaming effect */}
        <linearGradient id="cometTailMain" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00e5ff" stopOpacity="0" />
          <stop offset="20%" stopColor="#00e5ff" stopOpacity="0.1" />
          <stop offset="50%" stopColor="#00e5ff" stopOpacity="0.3" />
          <stop offset="80%" stopColor="#00e5ff" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#00e5ff" stopOpacity="1" />
        </linearGradient>
        {/* Bright white-hot core gradient */}
        <radialGradient id="cometCore" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="50%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#b3f5ff" />
        </radialGradient>
        {/* Outer glow gradient */}
        <radialGradient id="cometGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#00e5ff" stopOpacity="0.8" />
          <stop offset="60%" stopColor="#00e5ff" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#00e5ff" stopOpacity="0" />
        </radialGradient>
        {/* Intense glow filter */}
        <filter id="intenseBrightGlow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="4" result="blur1"/>
          <feGaussianBlur stdDeviation="2" result="blur2"/>
          <feGaussianBlur stdDeviation="1" result="blur3"/>
          <feMerge>
            <feMergeNode in="blur1"/>
            <feMergeNode in="blur2"/>
            <feMergeNode in="blur3"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      {/* Long streaming tail - multiple layers */}
      <path d="M0 14 Q40 13, 95 14" stroke="url(#cometTailMain)" strokeWidth="8" fill="none" opacity="0.2" strokeLinecap="round" />
      <path d="M10 14 Q45 13, 98 14" stroke="url(#cometTailMain)" strokeWidth="5" fill="none" opacity="0.4" strokeLinecap="round" />
      <path d="M20 14 Q50 13, 100 14" stroke="url(#cometTailMain)" strokeWidth="3" fill="none" opacity="0.6" strokeLinecap="round" />
      <path d="M30 14 Q55 13, 102 14" stroke="url(#cometTailMain)" strokeWidth="2" fill="none" opacity="0.8" strokeLinecap="round" />
      {/* Scattered particles along tail */}
      <circle cx="25" cy="11" r="0.8" fill="#00e5ff" opacity="0.3" />
      <circle cx="35" cy="17" r="0.6" fill="#00e5ff" opacity="0.4" />
      <circle cx="45" cy="10" r="0.7" fill="#00e5ff" opacity="0.3" />
      <circle cx="55" cy="18" r="0.5" fill="#00e5ff" opacity="0.5" />
      <circle cx="65" cy="11" r="0.8" fill="#00e5ff" opacity="0.4" />
      <circle cx="75" cy="16" r="0.6" fill="#00e5ff" opacity="0.5" />
      <circle cx="85" cy="12" r="0.7" fill="#00e5ff" opacity="0.6" />
      {/* Outer glow halo */}
      <ellipse cx="108" cy="14" rx="12" ry="10" fill="url(#cometGlow)" />
      {/* Bright comet head with intense glow */}
      <ellipse cx="108" cy="14" rx="7" ry="6" fill="#00e5ff" filter="url(#intenseBrightGlow)" />
      {/* White hot core */}
      <ellipse cx="108" cy="14" rx="4" ry="3.5" fill="url(#cometCore)" filter="url(#intenseBrightGlow)" />
      {/* Brightest center spot */}
      <ellipse cx="107" cy="13" rx="2" ry="1.5" fill="white" />
    </svg>
  )

  // Animated B- COMET Logo with bouncing comet for loading states
  const AnimatedBCometLogo = ({ loading = false }: { loading?: boolean }) => (
    <div className="relative inline-flex items-center">
      <span className={`text-xl font-bold ${textPrimary} relative z-10 ${loading ? "animate-[letterIlluminate_1.5s_ease-in-out_infinite]" : ""}`}>
        B- COMET
      </span>
      {loading && (
        <div 
          className="absolute top-1/2 -translate-y-1/2 z-20 animate-[cometBounce_1.5s_ease-in-out_infinite]"
          style={{ width: '20px', height: '20px' }}
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5">
            <defs>
              <radialGradient id="miniCometCore" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="50%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#b3f5ff" />
              </radialGradient>
              <filter id="miniGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="2" result="blur"/>
                <feMerge>
                  <feMergeNode in="blur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            <ellipse cx="12" cy="12" rx="6" ry="5" fill="#00e5ff" filter="url(#miniGlow)" />
            <ellipse cx="12" cy="12" rx="3" ry="2.5" fill="url(#miniCometCore)" />
            <ellipse cx="11" cy="11" rx="1.5" ry="1" fill="white" />
          </svg>
        </div>
      )}
    </div>
  )

  // VeriFIX Logo (VF in circle - blue and dark green)
  const VerifixLogo = ({ size = 24 }: { size?: number }) => (
    <svg viewBox="0 0 32 32" style={{ width: size, height: size }}>
      <circle cx="16" cy="16" r="14" fill="none" stroke="#0091ea" strokeWidth="2" />
      <text x="10" y="21" fill="#0091ea" fontSize="13" fontWeight="bold" fontFamily="Arial">V</text>
      <text x="17" y="21" fill="#1b5e20" fontSize="13" fontWeight="bold" fontFamily="Arial">F</text>
    </svg>
  )

  // Conductor Logo (CD in circle - green)
  const ConductorLogo = ({ size = 24 }: { size?: number }) => (
    <svg viewBox="0 0 32 32" style={{ width: size, height: size }}>
      <circle cx="16" cy="16" r="14" fill="none" stroke="#4caf50" strokeWidth="2" />
      <text x="8" y="21" fill="#4caf50" fontSize="12" fontWeight="bold" fontFamily="Arial">C</text>
      <text x="17" y="21" fill="#1b5e20" fontSize="12" fontWeight="bold" fontFamily="Arial">D</text>
    </svg>
  )

  // Add Client Modal - rendered inline to prevent focus loss
  const addClientModalJSX = showAddClientModal ? (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-y-auto">
      <Card className={`${bgCard} p-6 w-full max-w-2xl border ${borderColor} my-8`}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className={`text-xl font-bold ${textPrimary}`}>Create Onboarding Case</h2>
            <p className={`text-xs ${textSecondary} mt-1`}>Initiate a new client onboarding from intake through certification</p>
          </div>
          <button onClick={() => setShowAddClientModal(false)} className={`p-1 rounded hover:bg-[#1e4976]/50 ${textSecondary}`}>
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="space-y-5">
          {/* Client Info Section */}
          <div className={`p-4 rounded-lg border ${borderColor} ${isDarkMode ? "bg-[#0a1628]/40" : "bg-gray-50"}`}>
            <p className={`text-xs font-semibold uppercase tracking-wider ${textSecondary} mb-4`}>Client Information</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={`text-sm font-medium ${textPrimary}`}>Client Name</label>
                <Input 
                  placeholder="e.g., Nexus Trading Group" 
                  className={`mt-1 ${isDarkMode ? "bg-[#0a1628] border-[#1e4976] text-white placeholder:text-[#64748b]" : "bg-white border-[#e2e8f0] text-[#0a1628]"}`}
                  value={newClient.name}
                  onChange={(e) => setNewClient(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div>
                <label className={`text-sm font-medium ${textPrimary}`}>Legal Entity</label>
                <Input 
                  placeholder="e.g., Nexus Trading LLC" 
                  className={`mt-1 ${isDarkMode ? "bg-[#0a1628] border-[#1e4976] text-white placeholder:text-[#64748b]" : "bg-white border-[#e2e8f0] text-[#0a1628]"}`}
                  value={newClient.legalEntity}
                  onChange={(e) => setNewClient(prev => ({ ...prev, legalEntity: e.target.value }))}
                />
              </div>
              <div>
                <label className={`text-sm font-medium ${textPrimary}`}>JIRA ID</label>
                <Input 
                  placeholder="e.g., OB-2026-0150" 
                  className={`mt-1 ${isDarkMode ? "bg-[#0a1628] border-[#1e4976] text-white placeholder:text-[#64748b]" : "bg-white border-[#e2e8f0] text-[#0a1628]"}`}
                  value={newClient.jira}
                  onChange={(e) => setNewClient(prev => ({ ...prev, jira: e.target.value }))}
                />
              </div>
              <div>
                <label className={`text-sm font-medium ${textPrimary}`}>Sales/Account Manager</label>
                <Input 
                  placeholder="Enter manager name" 
                  className={`mt-1 ${isDarkMode ? "bg-[#0a1628] border-[#1e4976] text-white placeholder:text-[#64748b]" : "bg-white border-[#e2e8f0] text-[#0a1628]"}`}
                  value={newClient.accountManager}
                  onChange={(e) => setNewClient(prev => ({ ...prev, accountManager: e.target.value }))}
                />
              </div>
            </div>
          </div>

          {/* Asset Classes */}
          <div>
            <label className={`text-sm font-medium ${textPrimary}`}>Asset Classes (select multiple)</label>
            <div className="mt-2 flex flex-wrap gap-2">
              {assetClassesList.map((ac) => (
                <button
                  key={ac}
                  type="button"
                  onClick={() => {
                    const updated = newClient.assetClasses.includes(ac)
                      ? newClient.assetClasses.filter(a => a !== ac)
                      : [...newClient.assetClasses, ac]
                    setNewClient(prev => ({ ...prev, assetClasses: updated }))
                  }}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    newClient.assetClasses.includes(ac)
                      ? "bg-[#00e5ff] text-[#0a1628]"
                      : isDarkMode 
                        ? "bg-[#1e4976]/30 text-[#b0bec5] hover:bg-[#1e4976]/50" 
                        : "bg-[#e2e8f0] text-[#64748b] hover:bg-[#cbd5e1]"
                  }`}
                >
                  {ac}
                </button>
              ))}
            </div>
          </div>

          {/* Onboarding Tracks */}
          <div className={`p-4 rounded-lg border ${borderColor} ${isDarkMode ? "bg-[#0a1628]/40" : "bg-gray-50"}`}>
            <p className={`text-xs font-semibold uppercase tracking-wider ${textSecondary} mb-3`}>Onboarding Tracks</p>
            <div className="space-y-2">
              {[
                { id: "spec", label: "FIX Specification Baseline" },
                { id: "atdl", label: "ATDL Strategy Definition" },
                { id: "connectivity", label: "Integration & Connectivity" },
                { id: "testing", label: "Testing & Certification" },
                { id: "golive", label: "Go-Live & Hypercare" },
              ].map(track => (
                <label key={track.id} className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="accent-[#00e5ff]"
                    defaultChecked={["spec","testing"].includes(track.id)}
                    onChange={(e) => {
                      const updated = e.target.checked
                        ? [...newClient.onboardingTracks, track.id]
                        : newClient.onboardingTracks.filter(t => t !== track.id)
                      setNewClient(prev => ({ ...prev, onboardingTracks: updated }))
                    }}
                  />
                  <span className={`text-sm ${textPrimary}`}>{track.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* ATDL & SLA Section */}
          <div className="grid grid-cols-2 gap-4">
            <div className={`p-4 rounded-lg border ${borderColor} ${isDarkMode ? "bg-[#0a1628]/40" : "bg-gray-50"}`}>
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  className="accent-[#00e5ff]"
                  checked={newClient.includesAtdl}
                  onChange={(e) => setNewClient(prev => ({ ...prev, includesAtdl: e.target.checked }))}
                />
                <div>
                  <p className={`text-sm font-medium ${textPrimary}`}>Include ATDL Analysis</p>
                  <p className={`text-xs ${textSecondary}`}>Algo strategy validation</p>
                </div>
              </label>
            </div>
            <div className={`p-4 rounded-lg border ${borderColor} ${isDarkMode ? "bg-[#0a1628]/40" : "bg-gray-50"}`}>
              <label className={`text-sm font-medium ${textPrimary}`}>Target SLA (days)</label>
              <select 
                className={`w-full mt-2 p-2 rounded border ${borderColor} text-sm ${isDarkMode ? "bg-[#0a1628] text-white" : "bg-white"}`}
                value={newClient.slaDays}
                onChange={(e) => setNewClient(prev => ({ ...prev, slaDays: parseInt(e.target.value) }))}
              >
                <option value={15}>15 days</option>
                <option value={22}>22 days</option>
                <option value={30}>30 days</option>
                <option value={45}>45 days</option>
              </select>
            </div>
          </div>

          {/* Ownership Assignment */}
          <div className={`p-4 rounded-lg border ${borderColor} ${isDarkMode ? "bg-[#0a1628]/40" : "bg-gray-50"}`}>
            <p className={`text-xs font-semibold uppercase tracking-wider ${textSecondary} mb-4`}>Case Ownership</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={`text-sm font-medium ${textPrimary}`}>Onboarding Manager</label>
                <select 
                  className={`w-full mt-1 p-2 rounded border ${borderColor} text-sm ${isDarkMode ? "bg-[#0a1628] text-white" : "bg-white"}`}
                  value={newClient.onboardingManager}
                  onChange={(e) => setNewClient(prev => ({ ...prev, onboardingManager: e.target.value }))}
                >
                  <option value="">Select manager</option>
                  <option value="Sarah Chen">Sarah Chen</option>
                  <option value="Mike Johnson">Mike Johnson</option>
                  <option value="R. Patel">R. Patel</option>
                  <option value="Unassigned">Unassigned</option>
                </select>
              </div>
              <div>
                <label className={`text-sm font-medium ${textPrimary}`}>Technical Lead</label>
                <select 
                  className={`w-full mt-1 p-2 rounded border ${borderColor} text-sm ${isDarkMode ? "bg-[#0a1628] text-white" : "bg-white"}`}
                  value={newClient.technicalLead}
                  onChange={(e) => setNewClient(prev => ({ ...prev, technicalLead: e.target.value }))}
                >
                  <option value="">Select lead</option>
                  <option value="J. Smith">J. Smith</option>
                  <option value="R. Patel">R. Patel</option>
                  <option value="Alex Wong">Alex Wong</option>
                  <option value="Unassigned">Unassigned</option>
                </select>
              </div>
            </div>
          </div>
          
          <div className="flex gap-3 pt-2">
            <Button variant="outline" className="flex-1" onClick={() => setShowAddClientModal(false)}>
              Cancel
            </Button>
            <Button 
              className="flex-1" 
              onClick={handleAddClient}
              disabled={!newClient.name || !newClient.legalEntity || newClient.assetClasses.length === 0 || !newClient.onboardingManager || !newClient.technicalLead}
            >
              Create Onboarding Case
            </Button>
          </div>
        </div>
      </Card>
    </div>
  ) : null

  // Sidebar Component with Tools
  const Sidebar = () => (
    <div className={`${sidebarCollapsed ? "w-16" : "w-64"} h-screen ${bgSecondary} border-r ${borderColor} flex flex-col transition-all duration-300 overflow-y-auto`}>
      <div className={`p-4 border-b ${borderColor} flex items-center ${sidebarCollapsed ? "justify-center" : "justify-between"}`}>
        {!sidebarCollapsed && (
          <div className="flex items-center gap-2">
            <CometLogo size={32} />
            {isLoading ? (
              <AnimatedBCometLogo loading={true} />
            ) : (
              <span className={`font-bold ${textPrimary}`}>B- COMET</span>
            )}
          </div>
        )}
        {sidebarCollapsed && <CometLogo size={32} />}
        <button onClick={() => setSidebarCollapsed(!sidebarCollapsed)} className={`p-1 rounded hover:bg-[#1e4976]/50 ${textSecondary}`}>
          {sidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>
      
  <nav className="p-2 space-y-1">
  {[
  { icon: LayoutDashboard, label: "Dashboard", screen: "dashboard", roles: ["admin", "client"] },
  { icon: Users, label: "Clients", screen: "clients", roles: ["admin"] },
  { icon: Briefcase, label: "Onboarding Cases", screen: "onboarding-cases", roles: ["admin"] },
  { icon: Scale, label: "Approvals", screen: "approvals", roles: ["admin"], badge: 3 },
  { icon: Archive, label: "Evidence Vault", screen: "evidence-vault", roles: ["admin"] },
  { icon: BookOpen, label: "Rule Library", screen: "rule-library", roles: ["admin"] },
  { icon: Brain, label: "AI Review Queue", screen: "ai-review-queue", roles: ["admin"], badge: 2 },
  { icon: Gauge, label: "SLA Analytics", screen: "sla-analytics", roles: ["admin"] },
  ].filter(item => item.roles.includes(selectedRole || "")).map((item: any) => (
  <button
  key={item.label}
  onClick={() => { setCurrentScreen(item.screen as any); setIsAdHocMode(false); }}
  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
  currentScreen === item.screen && !isAdHocMode
  ? "bg-[#00e5ff]/10 text-[#00e5ff]"
  : `${textSecondary} hover:bg-[#1e4976]/30`
  }`}
  >
  <item.icon className="h-5 w-5" />
  {!sidebarCollapsed && (
    <span className="flex-1 flex items-center justify-between">
      {item.label}
      {item.badge && <span className="px-1.5 py-0.5 text-[10px] rounded-full bg-[#f44336] text-white">{item.badge}</span>}
    </span>
  )}
  </button>
  ))}
  </nav>

      {/* Tools Section - Collapsible */}
      <div className={`p-2 border-t ${borderColor}`}>
        <button
          onClick={() => setToolsExpanded(!toolsExpanded)}
          className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${textSecondary} hover:bg-[#1e4976]/30`}
        >
          <div className="flex items-center gap-3">
            <Wrench className="h-5 w-5" />
            {!sidebarCollapsed && <span>Tools</span>}
          </div>
          {!sidebarCollapsed && (
            <ChevronDown className={`h-4 w-4 transition-transform ${toolsExpanded ? "rotate-180" : ""}`} />
          )}
        </button>
        
  {toolsExpanded && !sidebarCollapsed && (
  <div className="ml-4 mt-1 space-y-1 border-l border-[#1e4976]/50 pl-2">
{[
  { icon: GitCompare, label: "Spec Compare", screen: selectedRole === "client" ? "spec-compare-overview" : "spec-compare", roles: ["admin", "client"] },
  { icon: FileSearch, label: "Log Analysis", screen: "log-analysis", roles: ["admin", "client"] },
  { icon: Activity, label: "Scenario Creation", screen: "scenario-creation", roles: ["admin"] },
  { icon: MessageSquare, label: "FIX MSG Creator", screen: "fix-msg-creator", roles: ["admin", "client"] },
  ].filter(item => selectedRole && item.roles.includes(selectedRole)).map((item) => (
  <button
  key={item.label}
  onClick={() => { if (item.screen === "spec-compare" || item.screen === "spec-compare-overview") setShowSpecResults(false); setCurrentScreen(item.screen as any); setIsAdHocMode(true); setSelectedClient(null); setSelectedAssetClass(null); }}
  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-sm ${textSecondary} hover:bg-[#1e4976]/30`}
  >
  <item.icon className="h-4 w-4" />
  <span>{item.label}</span>
  </button>
  ))}
  
  {/* ATDL Validation Sub-section */}
  <button
  onClick={() => setAtdlToolsExpanded(!atdlToolsExpanded)}
  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors text-sm ${textSecondary} hover:bg-[#1e4976]/30`}
  >
  <div className="flex items-center gap-3">
  <Cog className="h-4 w-4" />
  <span>ATDL Validation</span>
  </div>
  <ChevronDown className={`h-3 w-3 transition-transform ${atdlToolsExpanded ? "rotate-180" : ""}`} />
  </button>
  
  {atdlToolsExpanded && (
                    <div className="ml-7 mt-1 space-y-0.5">
                      {[
                        { icon: Briefcase, label: "Onboarding Cases", screen: "atdl-workbench" },
                        { icon: Navigation, label: "Guided Run", screen: "atdl-wizard" },
                        { icon: Wrench, label: "Remediation Queue", screen: "atdl-remediation" },
                        { icon: GitCompare, label: "FIX to ATDL Compare", screen: "fix-atdl-compare" },
                        { icon: GitCompare, label: "ATDL to ATDL Compare", screen: "atdl-compare" },
                        { icon: Zap, label: "FIX to ATDL Convert", screen: "fix-to-atdl" },
                        { icon: CheckCircle, label: "Validate Structure", screen: "atdl-validate" },
                        { icon: Eye, label: "Usage Preview", screen: "atdl-ui-repr" },
                      ].map((item) => (
                        <button
                          key={item.label}
                          onClick={() => { setCurrentScreen(item.screen as any); setIsAdHocMode(true); setSelectedClient(null); setSelectedAssetClass(null); }}
                          className={`w-full flex items-center gap-2 px-2 py-1.5 rounded transition-colors text-xs ${
                            currentScreen === item.screen && isAdHocMode
                              ? "bg-[#00e5ff]/10 text-[#00e5ff]"
                              : `${textSecondary} hover:bg-[#1e4976]/30`
                          }`}
                        >
                          <item.icon className="h-3.5 w-3.5 flex-shrink-0" />
                          <span className="truncate">{item.label}</span>
                        </button>
                      ))}
                    </div>
                  )}
  
  {/* VeriFIX - Admin only */}
  {selectedRole === "admin" && (
  <button
  onClick={() => { setCurrentScreen("test-case-gen"); setIsAdHocMode(true); setSelectedClient(null); setSelectedAssetClass(null); }}
  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-sm ${
  currentScreen === "test-case-gen" && isAdHocMode
  ? "bg-[#00e5ff]/10 text-[#00e5ff]"
  : `${textSecondary} hover:bg-[#1e4976]/30`
  }`}
  >
  <VerifixLogo size={16} />
        <span>Testing</span>
  </button>
  )}
  
  {/* Conductor - Admin only */}
  {selectedRole === "admin" && (
  <button
  onClick={() => { setCurrentScreen("certification-gen"); setIsAdHocMode(true); setSelectedClient(null); setSelectedAssetClass(null); }}
  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-sm ${
  currentScreen === "certification-gen" && isAdHocMode
  ? "bg-[#00e5ff]/10 text-[#00e5ff]"
  : `${textSecondary} hover:bg-[#1e4976]/30`
  }`}
  >
  <ConductorLogo size={16} />
        <span>Certification</span>
  </button>
  )}
  </div>
  )}
      </div>

{/* Admin Specs Navigation */}
  <div className={`p-2 border-t ${borderColor}`}>
  <button
  onClick={() => setCurrentScreen("admin-specs")}
  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
  currentScreen === "admin-specs"
  ? "bg-[#00e5ff]/10 text-[#00e5ff]"
  : `${textSecondary} hover:bg-[#1e4976]/30`
  }`}
  >
  <FileText className="h-5 w-5" />
  {!sidebarCollapsed && <span>Admin Specs</span>}
  </button>
  </div>
  
{/* Client Specs & Log Files Navigation - Only for clients */}
  {selectedRole === "client" && (
  <div className={`p-2 border-t ${borderColor} space-y-1`}>
  <button
    onClick={() => setCurrentScreen("client-specs")}
    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
      currentScreen === "client-specs"
        ? "bg-[#00e5ff]/10 text-[#00e5ff]"
        : `${textSecondary} hover:bg-[#1e4976]/30`
    }`}
  >
    <FileText className="h-5 w-5" />
    {!sidebarCollapsed && <span>My Specs</span>}
  </button>
  <button
    onClick={() => setCurrentScreen("client-log-files")}
    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
      currentScreen === "client-log-files"
        ? "bg-[#00e5ff]/10 text-[#00e5ff]"
        : `${textSecondary} hover:bg-[#1e4976]/30`
    }`}
  >
    <FileSearch className="h-5 w-5" />
    {!sidebarCollapsed && <span>My Log Files</span>}
  </button>
  </div>
  )}

      <div className={`p-2 border-t ${borderColor} space-y-1 mt-auto`}>
        <button
          onClick={() => setCurrentScreen("settings")}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
            currentScreen === "settings"
              ? "bg-[#00e5ff]/10 text-[#00e5ff]" 
              : `${textSecondary} hover:bg-[#1e4976]/30`
          }`}
        >
          <Settings className="h-5 w-5" />
          {!sidebarCollapsed && <span>Settings</span>}
        </button>
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg ${textSecondary} hover:bg-[#1e4976]/30`}
        >
          {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          {!sidebarCollapsed && <span>{isDarkMode ? "Light Mode" : "Dark Mode"}</span>}
        </button>
        <button
          onClick={() => { setCurrentScreen("home"); setSelectedRole(null); }}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-[#f44336] hover:bg-[#f44336]/10`}
        >
          <LogOut className="h-5 w-5" />
          {!sidebarCollapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  )

  // Home Screen
  if (currentScreen === "home") {
    return (
      <div className={`min-h-screen ${bgPrimary} transition-colors overflow-hidden`}>
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className={`absolute top-20 left-10 w-72 h-72 ${isDarkMode ? "bg-[#00e5ff]/5" : "bg-[#00e5ff]/10"} rounded-full blur-3xl animate-pulse`} />
          <div className={`absolute bottom-20 right-10 w-96 h-96 ${isDarkMode ? "bg-[#0091ea]/5" : "bg-[#0091ea]/10"} rounded-full blur-3xl animate-pulse`} style={{ animationDelay: "1s" }} />
        </div>

        <header className={`${bgSecondary}/80 backdrop-blur-md border-b ${borderColor} sticky top-0 z-50`}>
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center overflow-visible">
              {/* Animated Comet that travels across and stops at end of B- COMET text */}
              <div className="relative inline-flex items-center">
                {/* The comet - starts left, travels to end of text, stays there */}
                <div className="absolute top-1/2 -translate-y-1/2 left-[-80px] animate-[cometTravel_2s_ease-out_forwards] z-0">
                  <CometLogo size={24} />
                </div>
                {/* Text on top */}
                <span className={`text-xl font-bold ${textPrimary} relative z-10 animate-[letterGlow_2s_ease-out_forwards]`}>
                  B- COMET
                </span>
              </div>
            </div>
  <div className="flex items-center gap-4">
  <button onClick={() => setIsDarkMode(!isDarkMode)} className={`p-2 rounded-lg transition-colors ${isDarkMode ? "text-[#00e5ff] hover:bg-[#00e5ff]/20" : "text-[#0a1628] hover:bg-[#0a1628]/10"}`}>
  {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
  </button>
  <Button onClick={() => setCurrentScreen("role-select")} className="bg-[#00e5ff] text-[#0a1628] hover:bg-[#00e5ff]/80 font-semibold">Login / Register</Button>
  </div>
          </div>
        </header>

        <section className="relative max-w-7xl mx-auto px-6 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
            <div className="lg:col-span-3">
              <div className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm mb-6 ${isDarkMode ? "bg-[#00e5ff]/10 border border-[#00e5ff]/20" : "bg-[#0a1628]/5 border border-[#0a1628]/10"}`}>
                <span className="flex h-2 w-2 rounded-full bg-[#4caf50] animate-pulse" />
                <span className={`font-medium ${isDarkMode ? "text-[#00e5ff]" : "text-[#0a1628]"}`}>B- COMET FIX AI Platform</span>
              </div>
              
              <h1 className={`text-4xl lg:text-5xl font-bold leading-tight mb-6 ${textPrimary}`}>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00e5ff] to-[#0091ea]">B</span>TCS{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00e5ff] to-[#0091ea]">C</span>onfiguration{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00e5ff] to-[#0091ea]">O</span>nboarding
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00e5ff] to-[#0091ea]">M</span>onitoring{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00e5ff] to-[#0091ea]">E</span>valuation{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00e5ff] to-[#0091ea]">T</span>racking
              </h1>
              
              <p className={`text-lg max-w-xl mb-8 leading-relaxed ${textSecondary}`}>
                AI-powered FIX protocol management for configuration, monitoring, evaluation, and tracking.
              </p>

  <div className="flex gap-4 mb-8">
  <Button size="lg" onClick={() => setShowContactPanel(true)} className="bg-[#00e5ff] text-[#0a1628] hover:bg-[#00e5ff]/80 font-semibold">Start Here</Button>
  <Button size="lg" variant="outline" onClick={() => setCurrentScreen("fix-msg-creator")} className={`font-semibold ${isDarkMode ? "border-[#00e5ff] text-[#00e5ff] hover:bg-[#00e5ff]/10" : "border-[#0091ea] text-[#0091ea] hover:bg-[#0091ea]/10"}`}>
    <MessageSquare className="h-5 w-5 mr-2" /> Try Message Creator Free
  </Button>
  </div>

              <div className="flex gap-8">
                <div><div className={`text-3xl font-bold ${textPrimary}`}>500+</div><div className={`text-sm ${textSecondary}`}>Clients</div></div>
                <div><div className={`text-3xl font-bold ${textPrimary}`}>99.9%</div><div className={`text-sm ${textSecondary}`}>Uptime</div></div>
                <div><div className={`text-3xl font-bold ${textPrimary}`}>50M+</div><div className={`text-sm ${textSecondary}`}>Messages</div></div>
              </div>
            </div>

            <div className="lg:col-span-2">
              {/* Animated Process Grid */}
              <div className={`${bgCard}/80 backdrop-blur-md p-4 border ${borderColor} rounded-xl`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className={`font-semibold ${textPrimary}`}>Live Platform Processes</h3>
                  <span className="flex h-2 w-2 rounded-full bg-[#4caf50] animate-pulse" />
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  {/* Spec Compare Animation */}
                  <div className={`p-3 rounded-lg border ${borderColor} ${isDarkMode ? "bg-[#0a1628]" : "bg-white"} overflow-hidden relative`}>
                    <div className="flex items-center gap-2 mb-2">
                      <GitCompare className="h-4 w-4 text-[#00e5ff]" />
                      <span className={`text-xs font-medium ${textPrimary}`}>Spec Compare</span>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 flex-1 rounded bg-[#1e4976]/30 overflow-hidden">
                          <div className="h-full bg-[#4caf50] rounded animate-[progressBar_3s_ease-in-out_infinite]" style={{ width: '75%' }} />
                        </div>
                        <span className="text-[10px] text-[#4caf50]">75%</span>
                      </div>
                      <p className={`text-[10px] ${textSecondary}`}>Goldman Sachs - Equities</p>
                    </div>
                  </div>

                  {/* Log Analysis Animation */}
                  <div className={`p-3 rounded-lg border ${borderColor} ${isDarkMode ? "bg-[#0a1628]" : "bg-white"} overflow-hidden relative`}>
                    <div className="flex items-center gap-2 mb-2">
                      <FileSearch className="h-4 w-4 text-[#ff9800]" />
                      <span className={`text-xs font-medium ${textPrimary}`}>Log Analysis</span>
                    </div>
                    <div className="flex gap-1 mb-1">
                      {[1,2,3,4,5].map(i => (
                        <div key={i} className={`h-6 w-2 rounded-sm ${isDarkMode ? "bg-[#1e4976]" : "bg-[#e2e8f0]"} overflow-hidden`}>
                          <div 
                            className="w-full bg-[#ff9800] animate-[barGrow_1.5s_ease-in-out_infinite]" 
                            style={{ animationDelay: `${i * 0.2}s`, height: `${20 + i * 15}%` }} 
                          />
                        </div>
                      ))}
                    </div>
                    <p className={`text-[10px] ${textSecondary}`}>Morgan Stanley - Options</p>
                  </div>

                  {/* Test Case Generation */}
                  <div className={`p-3 rounded-lg border ${borderColor} ${isDarkMode ? "bg-[#0a1628]" : "bg-white"} overflow-hidden relative`}>
                    <div className="flex items-center gap-2 mb-2">
                      <VerifixLogo size={16} />
                      <span className={`text-xs font-medium ${textPrimary}`}>Reg Test Gen</span>
                    </div>
                    <div className="space-y-1">
                      {["TC001", "TC002", "TC003"].map((tc, i) => (
                        <div key={tc} className="flex items-center gap-2 animate-[slideIn_0.5s_ease-out_forwards]" style={{ animationDelay: `${i * 0.3}s`, opacity: 0 }}>
                          <CheckCircle className="h-3 w-3 text-[#4caf50]" />
                          <span className={`text-[10px] ${textSecondary}`}>{tc} Created</span>
                        </div>
                      ))}
                    </div>
                    <p className={`text-[10px] ${textSecondary} mt-1`}>JP Morgan - Futures</p>
                  </div>

                  {/* Status Changes */}
                  <div className={`p-3 rounded-lg border ${borderColor} ${isDarkMode ? "bg-[#0a1628]" : "bg-white"} overflow-hidden relative`}>
                    <div className="flex items-center gap-2 mb-2">
                      <Activity className="h-4 w-4 text-[#2196f3]" />
                      <span className={`text-xs font-medium ${textPrimary}`}>Status Updates</span>
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#4caf50] animate-pulse" />
                        <span className={`text-[10px] ${textSecondary}`}>Citadel certified</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#ff9800] animate-[blink_1s_ease-in-out_infinite]" />
                        <span className={`text-[10px] ${textSecondary}`}>Two Sigma testing</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#2196f3] animate-pulse" />
                        <span className={`text-[10px] ${textSecondary}`}>Bridgewater setup</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom ticker */}
                <div className={`mt-3 pt-3 border-t ${borderColor} overflow-hidden`}>
                  <div className="flex animate-[ticker_20s_linear_infinite]">
                    {["Spec uploaded - Blackrock", "Tests passed - Vanguard", "Certification complete - State Street", "Config exported - Fidelity", "Spec uploaded - Blackrock", "Tests passed - Vanguard"].map((msg, i) => (
                      <span key={i} className={`text-[10px] ${textSecondary} whitespace-nowrap mr-8`}>{msg}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

        </section>

        <section className={`${bgSecondary}/80 py-20`}>
          <div className="max-w-7xl mx-auto px-6">
            <h2 className={`text-3xl font-bold text-center mb-12 ${textPrimary}`}>Platform Capabilities</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, i) => (
                <Card key={i} className={`${bgCard} p-6 border ${borderColor} hover:border-[#00e5ff]/50`}>
                  <feature.icon className="h-10 w-10 mb-4 text-[#00e5ff]" />
                  <h3 className={`text-lg font-bold mb-2 ${textPrimary}`}>{feature.title}</h3>
                  <p className={`text-sm ${textSecondary}`}>{feature.desc}</p>
                </Card>
              ))}
            </div>
          </div>
  </section>

  {/* Contact Panel Modal */}
  {showContactPanel && (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <Card className={`${bgCard} p-8 border ${borderColor} w-full max-w-lg mx-4 relative`}>
        <button 
          onClick={() => setShowContactPanel(false)}
          className={`absolute top-4 right-4 p-2 rounded-lg ${textSecondary} hover:bg-[#1e4976]/30`}
        >
          <X className="h-5 w-5" />
        </button>
        
        <h2 className={`text-2xl font-bold mb-2 ${textPrimary}`}>Get Started with B- COMET</h2>
        <p className={`${textSecondary} mb-6`}>Contact our team to learn more about B- COMET platform</p>
        
        <div className="space-y-4">
          {[
            { name: "Suvrat Dandekar", email: "Suvrat.Dandekar@broadridge.com" },
            { name: "Kirk Kvist", email: "Kirk.Kvist@broadridge.com" },
            { name: "Adishree Sane", email: "Adishree.Sane@broadridge.com" },
          ].map((person) => (
            <div 
              key={person.email}
              className={`flex items-center justify-between p-4 rounded-lg border ${borderColor} hover:border-[#00e5ff] hover:bg-[#00e5ff]/5 transition-colors`}
            >
              <div>
                <p className={`font-semibold ${textPrimary}`}>{person.name}</p>
                <a 
                  href={`mailto:${person.email}`}
                  className="text-[#00e5ff] hover:underline text-sm"
                >
                  {person.email}
                </a>
              </div>
              <a 
                href={`mailto:${person.email}?subject=B- COMET Platform Inquiry`}
                className="px-4 py-2 bg-[#00e5ff] text-[#0a1628] rounded-lg hover:bg-[#00e5ff]/80 font-medium text-sm"
              >
                Email
              </a>
            </div>
          ))}
        </div>
        
        <div className={`mt-6 pt-6 border-t ${borderColor}`}>
          <button 
            onClick={() => { setShowContactPanel(false); setShowDemoForm(true); }}
            className={`w-full py-3 rounded-lg border ${borderColor} ${textPrimary} hover:border-[#00e5ff] hover:bg-[#00e5ff]/5 transition-colors font-medium`}
          >
            Or Request a Demo Instead
          </button>
        </div>
      </Card>
    </div>
  )}

  {/* Request Demo Modal */}
  {showDemoForm && (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 overflow-y-auto py-8">
      <Card className={`${bgCard} p-8 border ${borderColor} w-full max-w-2xl mx-4 relative`}>
        <button 
          onClick={() => setShowDemoForm(false)}
          className={`absolute top-4 right-4 p-2 rounded-lg ${textSecondary} hover:bg-[#1e4976]/30`}
        >
          <X className="h-5 w-5" />
        </button>
        
        <h2 className={`text-2xl font-bold mb-2 ${textPrimary}`}>Request a Demo</h2>
        <p className={`${textSecondary} mb-6`}>Tell us about your organization and requirements</p>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={`block text-sm font-medium mb-1 ${textPrimary}`}>Name *</label>
            <Input 
              value={demoFormData.name}
              onChange={(e) => setDemoFormData({ ...demoFormData, name: e.target.value })}
              className={`${isDarkMode ? "bg-[#0a1628] border-[#1e4976] text-white" : ""}`}
              placeholder="Your name"
            />
          </div>
          <div>
            <label className={`block text-sm font-medium mb-1 ${textPrimary}`}>Email *</label>
            <Input 
              type="email"
              value={demoFormData.email}
              onChange={(e) => setDemoFormData({ ...demoFormData, email: e.target.value })}
              className={`${isDarkMode ? "bg-[#0a1628] border-[#1e4976] text-white" : ""}`}
              placeholder="your.email@company.com"
            />
          </div>
          <div className="col-span-2">
            <label className={`block text-sm font-medium mb-1 ${textPrimary}`}>Company *</label>
            <Input 
              value={demoFormData.company}
              onChange={(e) => setDemoFormData({ ...demoFormData, company: e.target.value })}
              className={`${isDarkMode ? "bg-[#0a1628] border-[#1e4976] text-white" : ""}`}
              placeholder="Company name"
            />
          </div>
          
          <div className="col-span-2">
            <label className={`block text-sm font-medium mb-2 ${textPrimary}`}>Client Type *</label>
            <div className="flex gap-4">
              {["Buy Side", "Sell Side", "Exchange"].map((type) => (
                <label 
                  key={type}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border cursor-pointer transition-colors ${
                    demoFormData.clientType === type 
                      ? "border-[#00e5ff] bg-[#00e5ff]/10 text-[#00e5ff]"
                      : `${borderColor} ${textSecondary} hover:border-[#00e5ff]/50`
                  }`}
                >
                  <input 
                    type="radio" 
                    name="clientType" 
                    value={type}
                    checked={demoFormData.clientType === type}
                    onChange={(e) => setDemoFormData({ ...demoFormData, clientType: e.target.value })}
                    className="sr-only"
                  />
                  <span>{type}</span>
                </label>
              ))}
            </div>
          </div>
          
          <div className="col-span-2">
            <label className={`block text-sm font-medium mb-2 ${textPrimary}`}>Interested Functionality</label>
            <div className="flex flex-wrap gap-2">
              {["Spec Comparison", "Log Analysis", "Scenario Creation", "Reg Test Cases (VeriFIX)", "Certification (Conductor)", "All Features"].map((func) => (
                <label 
                  key={func}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border cursor-pointer transition-colors text-sm ${
                    demoFormData.functionality.includes(func) 
                      ? "border-[#00e5ff] bg-[#00e5ff]/10 text-[#00e5ff]"
                      : `${borderColor} ${textSecondary} hover:border-[#00e5ff]/50`
                  }`}
                >
                  <input 
                    type="checkbox" 
                    value={func}
                    checked={demoFormData.functionality.includes(func)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setDemoFormData({ ...demoFormData, functionality: [...demoFormData.functionality, func] })
                      } else {
                        setDemoFormData({ ...demoFormData, functionality: demoFormData.functionality.filter(f => f !== func) })
                      }
                    }}
                    className="sr-only"
                  />
                  <span>{func}</span>
                </label>
              ))}
            </div>
          </div>
          
          <div className="col-span-2">
            <label className={`block text-sm font-medium mb-2 ${textPrimary}`}>Hosting Preference</label>
            <div className="flex gap-4">
              {[
                { value: "hosted", label: "Hosted by Broadridge", desc: "We manage everything" },
                { value: "self", label: "Self-Hosted", desc: "On your infrastructure" },
                { value: "undecided", label: "Not Sure Yet", desc: "Discuss options" },
              ].map((option) => (
                <label 
                  key={option.value}
                  className={`flex-1 p-3 rounded-lg border cursor-pointer transition-colors ${
                    demoFormData.hostingPreference === option.value 
                      ? "border-[#00e5ff] bg-[#00e5ff]/10"
                      : `${borderColor} hover:border-[#00e5ff]/50`
                  }`}
                >
                  <input 
                    type="radio" 
                    name="hosting" 
                    value={option.value}
                    checked={demoFormData.hostingPreference === option.value}
                    onChange={(e) => setDemoFormData({ ...demoFormData, hostingPreference: e.target.value })}
                    className="sr-only"
                  />
                  <p className={`font-medium ${demoFormData.hostingPreference === option.value ? "text-[#00e5ff]" : textPrimary}`}>{option.label}</p>
                  <p className={`text-xs ${textSecondary}`}>{option.desc}</p>
                </label>
              ))}
            </div>
          </div>
          
          <div className="col-span-2">
            <label className={`block text-sm font-medium mb-1 ${textPrimary}`}>Additional Message</label>
            <textarea 
              value={demoFormData.message}
              onChange={(e) => setDemoFormData({ ...demoFormData, message: e.target.value })}
              className={`w-full p-3 rounded-lg border ${isDarkMode ? "bg-[#0a1628] border-[#1e4976] text-white" : "border-[#e2e8f0]"} resize-none`}
              rows={3}
              placeholder="Tell us more about your requirements..."
            />
          </div>
        </div>
        
        <div className="flex gap-4 mt-6">
          <Button 
            variant="outline" 
            onClick={() => setShowDemoForm(false)}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button 
            onClick={() => { alert("Demo request submitted! Our team will contact you shortly."); setShowDemoForm(false); }}
            className="flex-1 bg-[#00e5ff] text-[#0a1628] hover:bg-[#00e5ff]/80"
          >
            Submit Request
          </Button>
        </div>
      </Card>
    </div>
  )}
  </div>
  )
  }
  
  // Role Selection Screen
  if (currentScreen === "role-select") {
    return (
      <div className={`min-h-screen ${bgPrimary} flex items-center justify-center`}>
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-8">
            <CometLogo size={48} />
            <span className={`text-2xl font-bold ${textPrimary}`}>B- COMET</span>
          </div>
          <h2 className={`text-3xl font-bold mb-4 ${textPrimary}`}>Welcome</h2>
          <p className={`mb-8 ${textSecondary}`}>Select your role to continue</p>
          <div className="flex justify-center gap-6">
            <Card 
              className={`${bgCard} p-8 cursor-pointer hover:scale-105 hover:shadow-2xl border-2 ${borderColor} hover:border-[#00e5ff] transition-all w-48`} 
              onClick={() => { setSelectedRole("admin"); setCurrentScreen("login"); }}
            >
              <Shield className="h-12 w-12 mx-auto mb-4 text-[#00e5ff]" />
              <h3 className={`text-xl font-bold text-center ${textPrimary}`}>Admin</h3>
              <p className={`text-sm text-center mt-2 ${textSecondary}`}>Full access to manage clients</p>
            </Card>
            <Card 
              className={`${bgCard} p-8 cursor-pointer hover:scale-105 hover:shadow-2xl border-2 ${borderColor} hover:border-[#00e5ff] transition-all w-48`} 
              onClick={() => { setSelectedRole("client"); setCurrentScreen("login"); }}
            >
              <Building2 className="h-12 w-12 mx-auto mb-4 text-[#00e5ff]" />
              <h3 className={`text-xl font-bold text-center ${textPrimary}`}>Client</h3>
              <p className={`text-sm text-center mt-2 ${textSecondary}`}>View your specifications</p>
            </Card>
          </div>
          <button 
            onClick={() => setCurrentScreen("home")} 
            className={`mt-8 ${textSecondary} hover:text-[#00e5ff]`}
          >
            Back to Home
          </button>
        </div>
      </div>
    )
  }

  // Login Screen
  if (currentScreen === "login") {
    return (
      <div className={`min-h-screen ${bgPrimary} flex items-center justify-center`}>
        <Card className={`${bgCard} p-8 w-full max-w-md border ${borderColor}`}>
          <div className="flex items-center justify-center gap-3 mb-6">
            <CometLogo size={40} />
            <span className={`text-xl font-bold ${textPrimary}`}>B- COMET</span>
          </div>
          <h2 className={`text-2xl font-bold text-center mb-6 ${textPrimary}`}>{selectedRole === "admin" ? "Admin Login" : "Client Login"}</h2>
          <div className="space-y-4">
            <div>
              <label className={`text-sm font-medium ${textPrimary}`}>Email</label>
              <Input type="email" placeholder="Enter your email" className={`mt-1 ${isDarkMode ? "bg-[#0a1628] border-[#1e4976] text-white placeholder:text-[#64748b]" : "bg-white border-[#e2e8f0] text-[#0a1628]"}`} />
            </div>
            <div>
              <label className={`text-sm font-medium ${textPrimary}`}>Password</label>
              <Input type="password" placeholder="Enter your password" className={`mt-1 ${isDarkMode ? "bg-[#0a1628] border-[#1e4976] text-white placeholder:text-[#64748b]" : "bg-white border-[#e2e8f0] text-[#0a1628]"}`} />
            </div>
            <Button className="w-full" onClick={() => setCurrentScreen("dashboard")}>Sign In</Button>
          </div>
          <div className="mt-6 text-center">
            <button onClick={() => setCurrentScreen("home")} className={`text-sm ${textSecondary} hover:text-[#00e5ff]`}>Back to Home</button>
          </div>
        </Card>
      </div>
    )
  }

  // Dashboard
  if (currentScreen === "dashboard" || currentScreen === "clients") {
    // For client role, show "My Progress" with their own asset classes (same for both dashboard and clients)
    if (selectedRole === "client") {
      const myAssetClasses = [
        { name: "Equities", protocol: "FIX 4.4", specCompare: "complete", logAnalysis: "in-progress", scenario: "complete", testCase: "in-progress", certification: "pending", atdlViewer: "complete", fixMsg: "complete", alerts: 2 },
        { name: "Options", protocol: "FIX 4.4", specCompare: "complete", logAnalysis: "complete", scenario: "complete", testCase: "complete", certification: "in-progress", atdlViewer: "in-progress", fixMsg: "complete", alerts: 0 },
        { name: "Futures", protocol: "FIX 5.0 SP2", specCompare: "in-progress", logAnalysis: "pending", scenario: "pending", testCase: "pending", certification: "pending", atdlViewer: "pending", fixMsg: "pending", alerts: 1 },
      ]

      const getProgressWidth = (status: string) => {
        if (status === "complete") return "100%"
        if (status === "in-progress") return "60%"
        return "0%"
      }

      const getProgressColor = (status: string) => {
        if (status === "complete") return "bg-[#4caf50]"
        if (status === "in-progress") return "bg-[#2196f3]"
        return "bg-[#9e9e9e]"
      }
      
      return (
        <div className={`min-h-screen ${bgPrimary} flex`}>
          <Sidebar />
          <div className="flex-1 overflow-auto">
            <header className={`${bgSecondary} border-b ${borderColor} px-6 py-4 flex items-center justify-between`}>
              <div>
                <h1 className={`text-xl font-bold ${textPrimary}`}>My Progress</h1>
                <p className={textSecondary}>Track your certification progress across asset classes</p>
              </div>
              <button className={`p-2 rounded-lg ${textSecondary} hover:bg-[#1e4976]/30 relative`}>
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#f44336] rounded-full text-[10px] text-white flex items-center justify-center">3</span>
              </button>
            </header>

            <div className="p-6">
              <div className="grid gap-6">
                {myAssetClasses.map((asset) => (
                  <Card key={asset.name} className={`${bgCard} border ${borderColor} overflow-hidden`}>
                    <div className={`px-6 py-4 border-b ${borderColor} flex items-center justify-between`}>
                      <div>
                        <h2 className={`text-lg font-bold ${textPrimary}`}>{asset.name}</h2>
                        <p className={`text-sm ${textSecondary}`}>{asset.protocol}</p>
                      </div>
                      {asset.alerts > 0 && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-[#f44336]/20 text-[#f44336] text-xs font-medium">
                          <Bell className="h-3 w-3" /> {asset.alerts} alerts
                        </span>
                      )}
                    </div>
                    <div className="p-6">
                      {/* Tool Progress Grid */}
                      <div className="grid grid-cols-4 gap-4 mb-4">
                        {/* Spec Compare */}
                        <div className={`p-3 rounded-lg border ${borderColor}`}>
                          <div className="flex items-center justify-between mb-2">
                            <span className={`text-xs font-medium ${textPrimary}`}>Spec Compare</span>
                            {getStatusBadge(asset.specCompare)}
                          </div>
                          <div className={`h-1.5 rounded-full ${isDarkMode ? "bg-[#1e4976]" : "bg-[#e2e8f0]"}`}>
                            <div className={`h-full rounded-full ${getProgressColor(asset.specCompare)}`} style={{ width: getProgressWidth(asset.specCompare) }} />
                          </div>
                        </div>
                        {/* Log Analysis */}
                        <div className={`p-3 rounded-lg border ${borderColor}`}>
                          <div className="flex items-center justify-between mb-2">
                            <span className={`text-xs font-medium ${textPrimary}`}>Log Analysis</span>
                            {getStatusBadge(asset.logAnalysis)}
                          </div>
                          <div className={`h-1.5 rounded-full ${isDarkMode ? "bg-[#1e4976]" : "bg-[#e2e8f0]"}`}>
                            <div className={`h-full rounded-full ${getProgressColor(asset.logAnalysis)}`} style={{ width: getProgressWidth(asset.logAnalysis) }} />
                          </div>
                        </div>
                        {/* Scenario Creation */}
                        <div className={`p-3 rounded-lg border ${borderColor}`}>
                          <div className="flex items-center justify-between mb-2">
                            <span className={`text-xs font-medium ${textPrimary}`}>Scenarios</span>
                            {getStatusBadge(asset.scenario)}
                          </div>
                          <div className={`h-1.5 rounded-full ${isDarkMode ? "bg-[#1e4976]" : "bg-[#e2e8f0]"}`}>
                            <div className={`h-full rounded-full ${getProgressColor(asset.scenario)}`} style={{ width: getProgressWidth(asset.scenario) }} />
                          </div>
                        </div>
                        {/* Test Case Gen */}
                        <div className={`p-3 rounded-lg border ${borderColor}`}>
                          <div className="flex items-center justify-between mb-2">
                            <span className={`text-xs font-medium ${textPrimary}`}>Test Cases</span>
                            {getStatusBadge(asset.testCase)}
                          </div>
                          <div className={`h-1.5 rounded-full ${isDarkMode ? "bg-[#1e4976]" : "bg-[#e2e8f0]"}`}>
                            <div className={`h-full rounded-full ${getProgressColor(asset.testCase)}`} style={{ width: getProgressWidth(asset.testCase) }} />
                          </div>
                        </div>
                        {/* Certification */}
                        <div className={`p-3 rounded-lg border ${borderColor}`}>
                          <div className="flex items-center justify-between mb-2">
                            <span className={`text-xs font-medium ${textPrimary}`}>Certification</span>
                            {getStatusBadge(asset.certification)}
                          </div>
                          <div className={`h-1.5 rounded-full ${isDarkMode ? "bg-[#1e4976]" : "bg-[#e2e8f0]"}`}>
                            <div className={`h-full rounded-full ${getProgressColor(asset.certification)}`} style={{ width: getProgressWidth(asset.certification) }} />
                          </div>
                        </div>
                        {/* ATDL Viewer */}
                        <div className={`p-3 rounded-lg border ${borderColor}`}>
                          <div className="flex items-center justify-between mb-2">
                            <span className={`text-xs font-medium ${textPrimary}`}>ATDL Validation</span>
                            {getStatusBadge(asset.atdlViewer)}
                          </div>
                          <div className={`h-1.5 rounded-full ${isDarkMode ? "bg-[#1e4976]" : "bg-[#e2e8f0]"}`}>
                            <div className={`h-full rounded-full ${getProgressColor(asset.atdlViewer)}`} style={{ width: getProgressWidth(asset.atdlViewer) }} />
                          </div>
                        </div>
                        {/* FIX MSG Creator */}
                        <div className={`p-3 rounded-lg border ${borderColor}`}>
                          <div className="flex items-center justify-between mb-2">
                            <span className={`text-xs font-medium ${textPrimary}`}>FIX MSG</span>
                            {getStatusBadge(asset.fixMsg)}
                          </div>
                          <div className={`h-1.5 rounded-full ${isDarkMode ? "bg-[#1e4976]" : "bg-[#e2e8f0]"}`}>
                            <div className={`h-full rounded-full ${getProgressColor(asset.fixMsg)}`} style={{ width: getProgressWidth(asset.fixMsg) }} />
                          </div>
                        </div>
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="flex flex-wrap gap-2">
                        <Button variant="outline" size="sm" onClick={() => setCurrentScreen("spec-compare-overview")}>
                          <GitCompare className="h-4 w-4 mr-1" /> Spec Compare
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => setCurrentScreen("test-case-gen")}>
                          <FileSearch className="h-4 w-4 mr-1" /> Log Analysis
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => setCurrentScreen("scenario-creation")}>
                          <Activity className="h-4 w-4 mr-1" /> Scenarios
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => setCurrentScreen("test-case-gen")}>
                          <FileText className="h-4 w-4 mr-1" /> Test Cases
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => setCurrentScreen("certification-gen")}>
                          <Award className="h-4 w-4 mr-1" /> Certification
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => setCurrentScreen("atdl-validate")}>
                          <Cog className="h-4 w-4 mr-1" /> ATDL Validation
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => setCurrentScreen("fix-msg-creator")}>
                          <MessageSquare className="h-4 w-4 mr-1" /> FIX MSG
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      )
    }
    
    // Admin dashboard - overview with metrics
    if (currentScreen === "dashboard") {
      const totalAlerts = clients.reduce((sum, c) => sum + getTotalAlerts(c), 0)

      // Onboarding case metrics
      const activeCases = 12
      const casesAtRisk = 3
      const approvalsPending = 4
      const evidenceCompleteness = 78
      const readyForGoLive = 2

      // SLA forecast data
      const slaForecast = {
        onTrack: 7,
        atRisk: 3,
        breached: 2,
        projectedThisWeek: 4
      }

      // Stage funnel data
      const stageFunnel = [
        { stage: "Intake", count: 2, color: "#2196f3" },
        { stage: "Spec Analysis", count: 3, color: "#9c27b0" },
        { stage: "Connectivity", count: 2, color: "#00bcd4" },
        { stage: "Testing", count: 3, color: "#ff9800" },
        { stage: "Certification", count: 1, color: "#e91e63" },
        { stage: "Approval", count: 2, color: "#4caf50" },
        { stage: "Go-Live", count: 1, color: "#00e5ff" },
      ]

      // Blockers and Escalations
      const blockers = [
        { id: 1, caseId: "OB-2026-0142", client: "Apex Capital", issue: "Schema validation failure", severity: "critical", owner: "J. Smith", daysOpen: 4, escalated: true },
        { id: 2, caseId: "OB-2026-0147", client: "Nexus Trading", issue: "Missing FIX spec v2.1", severity: "high", owner: "Sarah Chen", daysOpen: 2, escalated: false },
        { id: 3, caseId: "OB-2026-0138", client: "Velocity Securities", issue: "Connectivity test timeout", severity: "medium", owner: "R. Patel", daysOpen: 1, escalated: false },
      ]

      // Enhanced pending tasks with urgency
      const pendingTasks = [
        { caseId: "OB-2026-0142", client: "Apex Capital Partners", task: "Resolve schema errors", owner: "J. Smith", dueDate: "Apr 12", daysToSla: -2, priority: "critical", actions: ["Review", "Escalate"] },
        { caseId: "OB-2026-0147", client: "Nexus Trading Group", task: "Complete mapping review", owner: "Sarah Chen", dueDate: "Apr 18", daysToSla: 4, priority: "high", actions: ["Review", "Approve"] },
        { caseId: "OB-2026-0138", client: "Velocity Securities", task: "Business sign-off pending", owner: "M. Thompson", dueDate: "Apr 22", daysToSla: 8, priority: "medium", actions: ["Approve", "Reassign"] },
        { caseId: "OB-2026-0151", client: "Horizon Investments", task: "Assign case owners", owner: "Unassigned", dueDate: "Apr 25", daysToSla: 11, priority: "low", actions: ["Assign", "Review"] },
      ]

      // Enhanced recent activity with filters
      const recentActivity = [
        { caseId: "OB-2026-0142", client: "Apex Capital", action: "SLA breach - Schema validation overdue", stage: "Spec Analysis", severity: "critical", type: "Failure", time: "2 hours ago" },
        { caseId: "OB-2026-0147", client: "Nexus Trading", action: "Mapping review completed", stage: "Testing", severity: "info", type: "Pass", time: "3 hours ago" },
        { caseId: "OB-2026-0138", client: "Velocity Securities", action: "Certification submitted for approval", stage: "Approval", severity: "info", type: "Approval", time: "5 hours ago" },
        { caseId: "OB-2026-0129", client: "Nexus Trading", action: "Go-live certification complete", stage: "Go-Live", severity: "success", type: "Pass", time: "Yesterday" },
        { caseId: "OB-2026-0151", client: "Horizon Investments", action: "New case created", stage: "Intake", severity: "info", type: "Upload", time: "Yesterday" },
      ]

      // Case health data
      const caseHealth = [
        { caseId: "OB-2026-0142", client: "Apex Capital Partners", stage: "Spec Analysis", blockers: 6, lastUpdate: "2h ago", riskScore: 85, nextAction: "Resolve schema errors", owner: "J. Smith" },
        { caseId: "OB-2026-0147", client: "Nexus Trading Group", stage: "Testing", blockers: 2, lastUpdate: "3h ago", riskScore: 45, nextAction: "Complete mapping review", owner: "Sarah Chen" },
        { caseId: "OB-2026-0138", client: "Velocity Securities", stage: "Approval", blockers: 0, lastUpdate: "5h ago", riskScore: 15, nextAction: "Business sign-off", owner: "M. Thompson" },
        { caseId: "OB-2026-0151", client: "Horizon Investments", stage: "Intake", blockers: 0, lastUpdate: "1d ago", riskScore: 25, nextAction: "Assign owners", owner: "Unassigned" },
      ]

      // Role-based next best action
      const nextBestAction = {
        title: "Resolve Critical Blockers",
        subtitle: "2 cases need immediate attention",
        cta: "View Blockers",
        icon: AlertOctagon,
        color: "#f44336"
      }

      return (
        <div className={`min-h-screen ${bgPrimary} flex`}>
          <Sidebar />
          <div className="flex-1 overflow-auto">
            <header className={`${bgSecondary} border-b ${borderColor} px-6 py-4 flex items-center justify-between`}>
              <div>
                <h1 className={`text-xl font-bold ${textPrimary}`}>Onboarding Control Center</h1>
                <p className={textSecondary}>Operational view of all onboarding cases</p>
              </div>
              <div className="flex items-center gap-3">
                {/* Date Range Selector */}
                <div className={`flex gap-1 p-1 rounded-lg ${isDarkMode ? "bg-[#0a1628]" : "bg-gray-100"}`}>
                  {["Today", "7 Days", "30 Days", "Quarter"].map(range => (
                    <button key={range} className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${range === "7 Days" ? "bg-[#00e5ff] text-[#0a1628]" : textSecondary}`}>
                      {range}
                    </button>
                  ))}
                </div>
                {/* Saved Views */}
                <select className={`px-3 py-1.5 rounded-lg text-xs border ${borderColor} ${isDarkMode ? "bg-[#0a1628] text-white" : "bg-white"}`}>
                  <option>Operations View</option>
                  <option>Leadership View</option>
                  <option>Certification War Room</option>
                </select>
                {/* View Toggle */}
                <div className={`flex gap-1 p-1 rounded-lg ${isDarkMode ? "bg-[#0a1628]" : "bg-gray-100"}`}>
                  <button 
                    onClick={() => setDashboardView("cards")}
                    className={`px-3 py-1.5 rounded text-xs font-medium transition-colors flex items-center gap-1 ${dashboardView === "cards" ? "bg-[#00e5ff] text-[#0a1628]" : textSecondary}`}
                  >
                    <LayoutDashboard className="h-3 w-3" /> Cards
                  </button>
                  <button 
                    onClick={() => setDashboardView("kanban")}
                    className={`px-3 py-1.5 rounded text-xs font-medium transition-colors flex items-center gap-1 ${dashboardView === "kanban" ? "bg-[#00e5ff] text-[#0a1628]" : textSecondary}`}
                  >
                    <TrendingUp className="h-3 w-3" /> Pipeline
                  </button>
                </div>
                <button className={`p-2 rounded-lg ${textSecondary} hover:bg-[#1e4976]/30 relative`}>
                  <Bell className="h-5 w-5" />
                  {totalAlerts > 0 && <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#f44336] rounded-full text-[10px] text-white flex items-center justify-center">{totalAlerts}</span>}
                </button>
              </div>
            </header>

            <div className="p-6 space-y-5">
              {/* Quick Actions Bar */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button size="sm" onClick={() => setShowAddClientModal(true)} className="bg-[#00e5ff] text-[#0a1628] hover:bg-[#00e5ff]/80">
                    <Plus className="h-3.5 w-3.5 mr-1.5" /> Create Case
                  </Button>
                  <Button size="sm" variant="outline">
                    <Upload className="h-3.5 w-3.5 mr-1.5" /> Upload Spec
                  </Button>
                  <Button size="sm" variant="outline">
                    <FileSearch className="h-3.5 w-3.5 mr-1.5" /> Run Analysis
                  </Button>
                  <Button size="sm" variant="outline">
                    <TestTube className="h-3.5 w-3.5 mr-1.5" /> Generate Tests
                  </Button>
                  <Button size="sm" variant="outline">
                    <Award className="h-3.5 w-3.5 mr-1.5" /> Evidence Pack
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs ${textSecondary}`}>Last refreshed: 2 min ago</span>
                  <Button size="sm" variant="ghost"><RefreshCw className="h-3.5 w-3.5" /></Button>
                </div>
              </div>

              {/* SLA Forecast Strip */}
              <div className={`flex items-center gap-4 p-3 rounded-lg border ${borderColor} ${isDarkMode ? "bg-[#0a1628]/60" : "bg-gray-50"}`}>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-[#00e5ff]" />
                  <span className={`text-xs font-semibold uppercase tracking-wider ${textSecondary}`}>SLA Forecast</span>
                </div>
                <div className="flex items-center gap-6 flex-1">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#4caf50]" />
                    <span className={`text-sm ${textPrimary}`}><span className="font-bold">{slaForecast.onTrack}</span> <span className={textSecondary}>On Track</span></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ff9800]" />
                    <span className={`text-sm ${textPrimary}`}><span className="font-bold">{slaForecast.atRisk}</span> <span className={textSecondary}>At Risk (3 days)</span></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#f44336]" />
                    <span className={`text-sm ${textPrimary}`}><span className="font-bold">{slaForecast.breached}</span> <span className={textSecondary}>Breached</span></span>
                  </div>
                  <div className={`h-4 w-px ${isDarkMode ? "bg-[#1e4976]" : "bg-gray-300"}`} />
                  <div className="flex items-center gap-2">
                    <Rocket className="h-4 w-4 text-[#00e5ff]" />
                    <span className={`text-sm ${textPrimary}`}><span className="font-bold">{slaForecast.projectedThisWeek}</span> <span className={textSecondary}>Go-Lives This Week</span></span>
                  </div>
                </div>
              </div>

              {/* Top Metrics - Case and Risk Focused */}
              <div className="grid grid-cols-5 gap-4">
                <Card className={`${bgCard} border ${borderColor} p-4`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`text-xs ${textSecondary}`}>Active Cases</p>
                      <p className={`text-2xl font-bold ${textPrimary}`}>{activeCases}</p>
                    </div>
                    <div className={`p-2.5 rounded-lg ${isDarkMode ? "bg-[#2196f3]/20" : "bg-[#2196f3]/10"}`}>
                      <Briefcase className="h-5 w-5 text-[#2196f3]" />
                    </div>
                  </div>
                </Card>
                <Card className={`${bgCard} border border-[#f44336]/30 p-4`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`text-xs ${textSecondary}`}>Cases At Risk</p>
                      <p className={`text-2xl font-bold text-[#f44336]`}>{casesAtRisk}</p>
                    </div>
                    <div className={`p-2.5 rounded-lg bg-[#f44336]/20`}>
                      <AlertOctagon className="h-5 w-5 text-[#f44336]" />
                    </div>
                  </div>
                </Card>
                <Card className={`${bgCard} border border-[#ff9800]/30 p-4`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`text-xs ${textSecondary}`}>Approvals Pending</p>
                      <p className={`text-2xl font-bold text-[#ff9800]`}>{approvalsPending}</p>
                    </div>
                    <div className={`p-2.5 rounded-lg bg-[#ff9800]/20`}>
                      <ClipboardCheck className="h-5 w-5 text-[#ff9800]" />
                    </div>
                  </div>
                </Card>
                <Card className={`${bgCard} border ${borderColor} p-4`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`text-xs ${textSecondary}`}>Evidence Complete</p>
                      <p className={`text-2xl font-bold ${textPrimary}`}>{evidenceCompleteness}%</p>
                    </div>
                    <div className={`p-2.5 rounded-lg ${isDarkMode ? "bg-[#9c27b0]/20" : "bg-[#9c27b0]/10"}`}>
                      <FileCheck className="h-5 w-5 text-[#9c27b0]" />
                    </div>
                  </div>
                </Card>
                <Card className={`${bgCard} border border-[#4caf50]/30 p-4`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`text-xs ${textSecondary}`}>Ready for Go-Live</p>
                      <p className={`text-2xl font-bold text-[#4caf50]`}>{readyForGoLive}</p>
                    </div>
                    <div className={`p-2.5 rounded-lg bg-[#4caf50]/20`}>
                      <Rocket className="h-5 w-5 text-[#4caf50]" />
                    </div>
                  </div>
                </Card>
              </div>

              {/* Stage Funnel Widget */}
              <Card className={`${bgCard} border ${borderColor} p-4`}>
                <div className="flex items-center justify-between mb-3">
                  <h3 className={`text-sm font-semibold ${textPrimary}`}>Pipeline Funnel</h3>
                  <span className={`text-xs ${textSecondary}`}>{stageFunnel.reduce((a,s) => a + s.count, 0)} total cases</span>
                </div>
                <div className="flex items-end gap-2 h-20">
                  {stageFunnel.map((stage, i) => (
                    <div key={stage.stage} className="flex-1 flex flex-col items-center gap-1">
                      <span className={`text-xs font-bold ${textPrimary}`}>{stage.count}</span>
                      <div 
                        className="w-full rounded-t transition-all hover:opacity-80 cursor-pointer" 
                        style={{ backgroundColor: stage.color, height: `${Math.max(20, stage.count * 20)}px` }}
                        title={`${stage.stage}: ${stage.count} cases`}
                      />
                      <span className={`text-[10px] ${textSecondary} text-center leading-tight`}>{stage.stage}</span>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Kanban View */}
              {dashboardView === "kanban" && (
                <div className="overflow-x-auto pb-4">
                  <div className="flex gap-4 min-w-max">
                    {[
                      { stage: 1, name: "Setup", color: "#2196f3", clients: clients.filter(c => (clientStages[c.name]?.stage || 1) === 1) },
                      { stage: 2, name: "Spec Analysis", color: "#9c27b0", clients: clients.filter(c => (clientStages[c.name]?.stage || 1) === 2) },
                      { stage: 3, name: "Connectivity", color: "#00bcd4", clients: clients.filter(c => (clientStages[c.name]?.stage || 1) === 3) },
                      { stage: 4, name: "Log Analysis", color: "#ff9800", clients: clients.filter(c => (clientStages[c.name]?.stage || 1) === 4) },
                      { stage: 5, name: "Testing", color: "#e91e63", clients: clients.filter(c => (clientStages[c.name]?.stage || 1) === 5) },
                      { stage: 6, name: "Certification", color: "#4caf50", clients: clients.filter(c => (clientStages[c.name]?.stage || 1) === 6) },
                      { stage: 7, name: "Live", color: "#00e5ff", clients: clients.filter(c => (clientStages[c.name]?.stage || 1) === 7) },
                    ].map((column) => (
                      <div key={column.stage} className="w-72 flex-shrink-0">
                        <div className={`rounded-lg ${isDarkMode ? "bg-[#0a1628]" : "bg-gray-100"} p-3`}>
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: column.color }} />
                              <span className={`font-medium ${textPrimary}`}>{column.name}</span>
                            </div>
                            <span className={`text-xs px-2 py-0.5 rounded-full ${isDarkMode ? "bg-[#1e4976]/50" : "bg-gray-200"} ${textSecondary}`}>
                              {column.clients.length}
                            </span>
                          </div>
                          <div className="space-y-2 min-h-[200px]">
                            {column.clients.map((client) => (
                              <Card 
                                key={client.id} 
                                className={`${bgCard} border ${borderColor} p-3 cursor-pointer hover:border-[#00e5ff]/50 transition-colors`}
                                onClick={() => { setSelectedClient(client); setCurrentScreen("client-detail"); }}
                              >
                                <div className="flex items-start justify-between mb-2">
                                  <p className={`font-medium text-sm ${textPrimary}`}>{client.name}</p>
                                  {getTotalAlerts(client) > 0 && (
                                    <span className="w-5 h-5 rounded-full bg-[#f44336]/20 text-[#f44336] text-xs flex items-center justify-center">
                                      {getTotalAlerts(client)}
                                    </span>
                                  )}
                                </div>
                                <p className={`text-xs ${textSecondary} mb-2`}>{client.accountManager}</p>
                                <div className="flex flex-wrap gap-1">
                                  {client.assetClasses.slice(0, 3).map((ac, i) => (
                                    <span key={i} className={`text-[10px] px-1.5 py-0.5 rounded ${isDarkMode ? "bg-[#1e4976]/50" : "bg-gray-200"} ${textSecondary}`}>
                                      {ac.name}
                                    </span>
                                  ))}
                                  {client.assetClasses.length > 3 && (
                                    <span className={`text-[10px] px-1.5 py-0.5 rounded ${isDarkMode ? "bg-[#1e4976]/50" : "bg-gray-200"} ${textSecondary}`}>
                                      +{client.assetClasses.length - 3}
                                    </span>
                                  )}
                                </div>
                              </Card>
                            ))}
                            {column.clients.length === 0 && (
                              <div className={`text-center py-8 ${textSecondary} text-sm`}>
                                No clients
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Cards View - Onboarding Control Content */}
              {dashboardView === "cards" && (
              <>
              <div className="grid grid-cols-3 gap-4">
                {/* Next Best Action Card */}
                <Card className={`${bgCard} border border-[#f44336]/30 p-4`}>
                  <div className="flex items-start gap-3">
                    <div className="p-2.5 rounded-lg bg-[#f44336]/20">
                      <nextBestAction.icon className="h-5 w-5 text-[#f44336]" />
                    </div>
                    <div className="flex-1">
                      <p className={`font-semibold ${textPrimary}`}>{nextBestAction.title}</p>
                      <p className={`text-xs ${textSecondary} mt-0.5`}>{nextBestAction.subtitle}</p>
                      <Button size="sm" className="mt-3 bg-[#f44336] hover:bg-[#f44336]/80 text-white">
                        {nextBestAction.cta}
                      </Button>
                    </div>
                  </div>
                </Card>

                {/* Blockers and Escalations Panel */}
                <Card className={`${bgCard} border ${borderColor} col-span-2`}>
                  <div className={`px-4 py-2.5 border-b ${borderColor} flex items-center justify-between`}>
                    <div className="flex items-center gap-2">
                      <AlertOctagon className="h-4 w-4 text-[#f44336]" />
                      <h3 className={`text-sm font-semibold ${textPrimary}`}>Blockers & Escalations</h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-xs bg-[#f44336]/20 text-[#f44336]">{blockers.filter(b => b.severity === "critical").length} Critical</span>
                      <span className="px-2 py-0.5 rounded text-xs bg-[#ff9800]/20 text-[#ff9800]">{blockers.filter(b => b.escalated).length} Escalated</span>
                    </div>
                  </div>
                  <div className="divide-y divide-[#1e4976]/30 max-h-32 overflow-y-auto">
                    {blockers.map(blocker => (
                      <div key={blocker.id} className="px-4 py-2 flex items-center gap-3 hover:bg-[#1e4976]/10 cursor-pointer">
                        <div className={`w-2 h-2 rounded-full ${blocker.severity === "critical" ? "bg-[#f44336]" : blocker.severity === "high" ? "bg-[#ff9800]" : "bg-[#2196f3]"}`} />
                        <span className={`text-xs font-mono ${textSecondary}`}>{blocker.caseId}</span>
                        <span className={`text-sm ${textPrimary} flex-1`}>{blocker.issue}</span>
                        <span className={`text-xs ${textSecondary}`}>{blocker.owner}</span>
                        <span className={`text-xs px-1.5 py-0.5 rounded ${blocker.daysOpen > 2 ? "bg-[#f44336]/20 text-[#f44336]" : "bg-slate-500/20 text-slate-400"}`}>{blocker.daysOpen}d</span>
                        {blocker.escalated && <span className="text-xs px-1.5 py-0.5 rounded bg-[#9c27b0]/20 text-[#9c27b0]">Escalated</span>}
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Action Queue - Enhanced Pending Tasks */}
                <Card className={`${bgCard} border ${borderColor}`}>
                  <div className={`px-4 py-2.5 border-b ${borderColor} flex items-center justify-between`}>
                    <div className="flex items-center gap-2">
                      <Target className="h-4 w-4 text-[#00e5ff]" />
                      <h3 className={`text-sm font-semibold ${textPrimary}`}>Action Queue</h3>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded ${isDarkMode ? "bg-[#f44336]/20 text-[#f44336]" : "bg-[#f44336]/10 text-[#f44336]"}`}>{pendingTasks.length} pending</span>
                  </div>
                  <div className="divide-y divide-[#1e4976]/30 max-h-56 overflow-y-auto">
                    {pendingTasks.map((task, i) => (
                      <div key={i} className="px-4 py-2.5 hover:bg-[#1e4976]/10">
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <span className={`text-xs font-mono ${textSecondary}`}>{task.caseId}</span>
                            <span className={`text-sm font-medium ${textPrimary}`}>{task.task}</span>
                          </div>
                          <span className={`text-xs px-1.5 py-0.5 rounded ${
                            task.priority === "critical" ? "bg-[#f44336]/20 text-[#f44336]" :
                            task.priority === "high" ? "bg-[#ff9800]/20 text-[#ff9800]" :
                            task.priority === "medium" ? "bg-[#2196f3]/20 text-[#2196f3]" :
                            "bg-slate-500/20 text-slate-400"
                          }`}>{task.priority}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 text-xs">
                            <span className={textSecondary}>{task.client}</span>
                            <span className={textSecondary}>|</span>
                            <span className={textSecondary}>{task.owner}</span>
                            <span className={textSecondary}>|</span>
                            <span className={task.daysToSla < 0 ? "text-[#f44336]" : task.daysToSla < 3 ? "text-[#ff9800]" : textSecondary}>
                              {task.daysToSla < 0 ? `${Math.abs(task.daysToSla)}d overdue` : `${task.daysToSla}d to SLA`}
                            </span>
                          </div>
                          <div className="flex gap-1">
                            {task.actions.map(action => (
                              <button key={action} className={`px-2 py-0.5 rounded text-xs border ${borderColor} ${textSecondary} hover:border-[#00e5ff] hover:text-[#00e5ff]`}>
                                {action}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Recent Activity - Enhanced with Filters */}
                <Card className={`${bgCard} border ${borderColor}`}>
                  <div className={`px-4 py-2.5 border-b ${borderColor} flex items-center justify-between`}>
                    <div className="flex items-center gap-2">
                      <Activity className="h-4 w-4 text-[#00e5ff]" />
                      <h3 className={`text-sm font-semibold ${textPrimary}`}>Recent Activity</h3>
                    </div>
                    <div className="flex gap-1">
                      {["All", "Critical", "Approvals"].map(f => (
                        <button key={f} className={`px-2 py-0.5 rounded text-xs ${f === "All" ? "bg-[#00e5ff]/20 text-[#00e5ff]" : `${textSecondary} hover:bg-[#1e4976]/30`}`}>{f}</button>
                      ))}
                    </div>
                  </div>
                  <div className="divide-y divide-[#1e4976]/30 max-h-56 overflow-y-auto">
                    {recentActivity.map((item, i) => (
                      <div key={i} className={`px-4 py-2.5 flex items-start gap-3 ${item.severity === "critical" ? "bg-[#f44336]/5" : ""}`}>
                        <div className={`w-2 h-2 rounded-full mt-1.5 ${
                          item.severity === "critical" ? "bg-[#f44336]" :
                          item.severity === "success" ? "bg-[#4caf50]" :
                          "bg-[#2196f3]"
                        }`} />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className={`text-xs font-mono ${textSecondary}`}>{item.caseId}</span>
                            <span className={`text-xs px-1.5 py-0.5 rounded ${
                              item.type === "Failure" ? "bg-[#f44336]/20 text-[#f44336]" :
                              item.type === "Pass" ? "bg-[#4caf50]/20 text-[#4caf50]" :
                              item.type === "Approval" ? "bg-[#ff9800]/20 text-[#ff9800]" :
                              "bg-[#2196f3]/20 text-[#2196f3]"
                            }`}>{item.type}</span>
                          </div>
                          <p className={`text-sm ${textPrimary}`}>{item.action}</p>
                          <p className={`text-xs ${textSecondary}`}>{item.client} | {item.stage} | {item.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

              {/* Case Health Table */}
              <Card className={`${bgCard} border ${borderColor}`}>
                <div className={`px-4 py-2.5 border-b ${borderColor} flex items-center justify-between`}>
                  <div className="flex items-center gap-2">
                    <Gauge className="h-4 w-4 text-[#00e5ff]" />
                    <h3 className={`text-sm font-semibold ${textPrimary}`}>Case Health</h3>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => setCurrentScreen("atdl-workbench" as any)}>View All Cases</Button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className={`${isDarkMode ? "bg-[#1e4976]/30" : "bg-[#f1f5f9]"}`}>
                      <tr>
                        <th className={`px-4 py-2 text-left text-xs font-medium ${textSecondary}`}>Case ID</th>
                        <th className={`px-4 py-2 text-left text-xs font-medium ${textSecondary}`}>Client</th>
                        <th className={`px-4 py-2 text-center text-xs font-medium ${textSecondary}`}>Stage</th>
                        <th className={`px-4 py-2 text-center text-xs font-medium ${textSecondary}`}>Blockers</th>
                        <th className={`px-4 py-2 text-center text-xs font-medium ${textSecondary}`}>Last Update</th>
                        <th className={`px-4 py-2 text-center text-xs font-medium ${textSecondary}`}>Risk Score</th>
                        <th className={`px-4 py-2 text-left text-xs font-medium ${textSecondary}`}>Next Action</th>
                        <th className={`px-4 py-2 text-left text-xs font-medium ${textSecondary}`}>Owner</th>
                      </tr>
                    </thead>
                    <tbody>
                      {caseHealth.map((c) => (
                        <tr key={c.caseId} className={`border-t ${borderColor} cursor-pointer hover:bg-[#1e4976]/10`} onClick={() => setCurrentScreen("atdl-workbench" as any)}>
                          <td className={`px-4 py-2.5 font-mono text-xs ${textPrimary}`}>{c.caseId}</td>
                          <td className={`px-4 py-2.5 text-sm ${textPrimary}`}>{c.client}</td>
                          <td className="px-4 py-2.5 text-center">
                            <span className={`text-xs px-2 py-0.5 rounded ${isDarkMode ? "bg-[#1e4976]/50" : "bg-gray-100"} ${textSecondary}`}>{c.stage}</span>
                          </td>
                          <td className="px-4 py-2.5 text-center">
                            {c.blockers > 0 ? (
                              <span className="text-xs px-2 py-0.5 rounded bg-[#f44336]/20 text-[#f44336]">{c.blockers}</span>
                            ) : <span className={textSecondary}>-</span>}
                          </td>
                          <td className={`px-4 py-2.5 text-center text-xs ${textSecondary}`}>{c.lastUpdate}</td>
                          <td className="px-4 py-2.5 text-center">
                            <div className="flex items-center justify-center gap-1.5">
                              <div className={`w-16 h-1.5 rounded-full ${isDarkMode ? "bg-[#1e4976]" : "bg-gray-200"} overflow-hidden`}>
                                <div className={`h-full rounded-full ${c.riskScore > 60 ? "bg-[#f44336]" : c.riskScore > 30 ? "bg-[#ff9800]" : "bg-[#4caf50]"}`} style={{ width: `${c.riskScore}%` }} />
                              </div>
                              <span className={`text-xs ${c.riskScore > 60 ? "text-[#f44336]" : c.riskScore > 30 ? "text-[#ff9800]" : "text-[#4caf50]"}`}>{c.riskScore}</span>
                            </div>
                          </td>
                          <td className={`px-4 py-2.5 text-xs ${textPrimary}`}>{c.nextAction}</td>
                          <td className={`px-4 py-2.5 text-xs ${textSecondary}`}>{c.owner}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
              </>
              )}
            </div>
          </div>
        </div>
      )
    }

    // Admin Clients page - full client list
    return (
      <div className={`min-h-screen ${bgPrimary} flex`}>
        <Sidebar />
        {addClientModalJSX}
        
        <div className="flex-1 overflow-auto">
          <header className={`${bgSecondary} border-b ${borderColor} px-6 py-4 flex items-center justify-between`}>
            <div>
              <h1 className={`text-xl font-bold ${textPrimary}`}>Clients</h1>
              <p className={textSecondary}>Manage and track all client onboarding</p>
            </div>
            <div className="flex items-center gap-4">
              <div className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${borderColor} ${isDarkMode ? "bg-[#0a1628]" : "bg-white"}`}>
                <Search className={`h-4 w-4 ${textSecondary}`} />
                <input type="text" placeholder="Search clients..." className={`bg-transparent border-0 outline-none text-sm ${textPrimary} placeholder:${textSecondary}`} />
              </div>
              <Button onClick={() => setShowAddClientModal(true)}><Plus className="h-4 w-4 mr-2" /> Add Client</Button>
            </div>
          </header>

          <div className="p-6">
            <Card className={`${bgCard} border ${borderColor} overflow-hidden`}>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className={`${isDarkMode ? "bg-[#1e4976]/30" : "bg-[#f1f5f9]"}`}>
                    <tr>
                      <th className={`px-4 py-3 text-left text-sm font-medium ${textPrimary}`}>Client</th>
                      <th className={`px-4 py-3 text-center text-sm font-medium ${textPrimary}`}>Spec Compare</th>
                      <th className={`px-4 py-3 text-center text-sm font-medium ${textPrimary}`}>Log Analysis</th>
                      <th className={`px-4 py-3 text-center text-sm font-medium ${textPrimary}`}>Scenarios</th>
                      <th className={`px-4 py-3 text-center text-sm font-medium ${textPrimary}`}>Reg Tests</th>
                      <th className={`px-4 py-3 text-center text-sm font-medium ${textPrimary}`}>Cert Tests</th>
                      <th className={`px-4 py-3 text-center text-sm font-medium ${textPrimary}`}>Config</th>
                      <th className={`px-4 py-3 text-center text-sm font-medium ${textPrimary}`}>Alerts</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clients.map((client) => (
                      <tr 
                        key={client.id} 
                        className={`border-t ${borderColor} cursor-pointer hover:${isDarkMode ? "bg-[#1e4976]/20" : "bg-[#f1f5f9]"}`}
                        onClick={() => { setSelectedClient(client); setCurrentScreen("client-detail"); }}
                      >
                        <td className={`px-4 py-3 ${textPrimary}`}>
                          <div className="font-medium">{client.name}</div>
                          <div className={`text-xs ${textSecondary}`}>{client.assetClasses.length} asset classes</div>
                        </td>
                        <td className="px-4 py-3 text-center">{getStatusBadge(getAggregateStatus(client, "specCompare"))}</td>
                        <td className="px-4 py-3 text-center">{getStatusBadge(getAggregateStatus(client, "logAnalysis"))}</td>
                        <td className="px-4 py-3 text-center">{getStatusBadge(getAggregateStatus(client, "scenario"))}</td>
                        <td className="px-4 py-3 text-center">{getStatusBadge(getAggregateStatus(client, "testCase"))}</td>
                        <td className="px-4 py-3 text-center">{getStatusBadge(getAggregateStatus(client, "certification"))}</td>
                        <td className="px-4 py-3 text-center">{getStatusBadge(getAggregateStatus(client, "config"))}</td>
                        <td className="px-4 py-3 text-center">
                          {getTotalAlerts(client) > 0 ? (
                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-[#f44336]/20 text-[#f44336] text-xs font-medium">
                              <Bell className="h-3 w-3" /> {getTotalAlerts(client)}
                            </span>
                          ) : <span className={textSecondary}>-</span>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  // Client Detail - Show Asset Classes
  if (currentScreen === "client-detail" && selectedClient) {
    // Client progress data with multiple FIX versions per asset class
const clientProgressData = [
  {
  name: "Equities",
  alerts: 2,
  versions: [
  { protocol: "FIX 4.2", specCompare: "complete", logAnalysis: "complete", atdlValidation: "complete", adminSpec: "EQ_FIX42_v1.2.xml", clientSpec: "client_eq_42.xml" },
  { protocol: "FIX 4.4", specCompare: "in-progress", logAnalysis: "pending", atdlValidation: "in-progress", adminSpec: "EQ_FIX44_v2.1.xml", clientSpec: "client_eq_44.xml" },
  ]
  },
  {
  name: "Options",
  alerts: 0,
  versions: [
  { protocol: "FIX 4.4", specCompare: "complete", logAnalysis: "complete", atdlValidation: "complete", adminSpec: "OPT_FIX44_v2.0.xml", clientSpec: "client_opt_44.xml" },
  ]
  },
  {
  name: "Futures",
  alerts: 1,
  versions: [
  { protocol: "FIX 4.2", specCompare: "pending", logAnalysis: "pending", atdlValidation: "pending", adminSpec: "FUT_FIX42_v1.0.xml", clientSpec: null },
  { protocol: "FIX 5.0 SP2", specCompare: "in-progress", logAnalysis: "in-progress", atdlValidation: "pending", adminSpec: "FUT_FIX50SP2_v2.0.xml", clientSpec: "client_fut_50sp2.xml" },
  ]
  },
  ]
    
    return (
      <div className={`min-h-screen ${bgPrimary} flex`}>
        <Sidebar />
        <div className="flex-1 overflow-auto">
          <header className={`${bgSecondary} border-b ${borderColor} px-6 py-4 flex items-center justify-between`}>
            <div>
              <button onClick={() => setCurrentScreen("dashboard")} className={`flex items-center gap-2 mb-2 ${textSecondary} hover:text-[#00e5ff]`}>
                <ArrowLeft className="h-4 w-4" /> Back to Dashboard
              </button>
              <h1 className={`text-2xl font-bold ${textPrimary}`}>{selectedClient.name} - Progress</h1>
              <p className={textSecondary}>JIRA: {selectedClient.jira} | Manager: {selectedClient.accountManager}</p>
            </div>
            <button className={`p-2 rounded-lg ${textSecondary} hover:bg-[#1e4976]/30 relative`}>
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#f44336] rounded-full text-[10px] text-white flex items-center justify-center">3</span>
            </button>
          </header>

          <div className="p-6">
            {/* Progress Stepper */}
            {(() => {
              const stages = [
                { num: 1, name: "Setup", icon: FileText, description: "Client onboarding & spec upload" },
                { num: 2, name: "Spec Analysis", icon: GitCompare, description: "Comparison & field mapping" },
                { num: 3, name: "Connectivity", icon: Server, description: "Session configuration & testing" },
                { num: 4, name: "Log Analysis", icon: FileSearch, description: "Message pattern extraction" },
                { num: 5, name: "Testing", icon: TestTube, description: "Regression test execution" },
                { num: 6, name: "Certification", icon: Award, description: "Certification & sign-off" },
                { num: 7, name: "Go-Live", icon: Rocket, description: "Production cutover" },
              ]
              const clientStage = clientStages[selectedClient.name] || { stage: 1, stageStatus: { 1: "in-progress", 2: "pending", 3: "pending", 4: "pending", 5: "pending", 6: "pending", 7: "pending" } }
              
              return (
                <Card className={`${bgCard} border ${borderColor} mb-6 p-6`}>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className={`text-lg font-bold ${textPrimary}`}>Onboarding Progress</h2>
                    <span className={`text-sm ${textSecondary}`}>Stage {clientStage.stage} of 7</span>
                  </div>
                  <div className="flex items-center justify-between relative">
                    {/* Progress line */}
                    <div className={`absolute top-6 left-0 right-0 h-1 ${isDarkMode ? "bg-[#1e4976]/50" : "bg-gray-200"}`}>
                      <div 
                        className="h-full bg-gradient-to-r from-[#00e5ff] to-[#4caf50] transition-all duration-500"
                        style={{ width: `${((clientStage.stage - 1) / 6) * 100}%` }}
                      />
                    </div>
                    
                    {stages.map((stage) => {
                      const status = clientStage.stageStatus[stage.num] || "pending"
                      const isActive = stage.num === clientStage.stage
                      const StageIcon = stage.icon
                      
                      return (
                        <div key={stage.num} className="flex flex-col items-center relative z-10" style={{ width: "14%" }}>
                          <div 
                            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                              status === "completed" ? "bg-[#4caf50] text-white" :
                              status === "in-progress" ? "bg-[#00e5ff] text-[#0a1628] ring-4 ring-[#00e5ff]/30" :
                              status === "blocked" ? "bg-[#f44336] text-white" :
                              isDarkMode ? "bg-[#1e4976]/50 text-[#8b9dc3]" : "bg-gray-200 text-gray-500"
                            }`}
                          >
                            {status === "completed" ? <CheckCircle className="h-5 w-5" /> : 
                             status === "blocked" ? <Lock className="h-5 w-5" /> :
                             <StageIcon className="h-5 w-5" />}
                          </div>
                          <span className={`text-xs font-medium mt-2 text-center ${isActive ? "text-[#00e5ff]" : status === "completed" ? "text-[#4caf50]" : textSecondary}`}>
                            {stage.name}
                          </span>
                          <span className={`text-[10px] ${textSecondary} text-center mt-0.5 hidden lg:block`}>{stage.description}</span>
                        </div>
                      )
                    })}
                  </div>
                  
                  {/* Stage action buttons */}
                  <div className="flex gap-3 mt-6 pt-4 border-t border-[#1e4976]/30">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => setCurrentScreen("session-config")}
                    >
                      <Server className="h-4 w-4 mr-2" /> Configure Sessions
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => setCurrentScreen("field-mapping")}
                    >
                      <Link2 className="h-4 w-4 mr-2" /> Field Mappings
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => setCurrentScreen("test-results")}
                    >
                      <BarChart3 className="h-4 w-4 mr-2" /> Test Results
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => setCurrentScreen("go-live")}
                    >
                      <Rocket className="h-4 w-4 mr-2" /> Go-Live Checklist
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => setCurrentScreen("reports")}
                    >
                      <FileCheck className="h-4 w-4 mr-2" /> Reports
                    </Button>
                  </div>
                </Card>
              )
            })()}

            {/* Client Specs Section */}
            <Card className={`${bgCard} border ${borderColor} mb-6`}>
              <div className={`px-6 py-4 border-b ${borderColor} flex items-center justify-between`}>
                <div>
                  <h2 className={`text-lg font-bold ${textPrimary}`}>Client Specifications</h2>
                  <p className={`text-sm ${textSecondary}`}>View and convert client specs to standardized format</p>
                </div>
              </div>
              <div className="p-6">
                <table className="w-full text-sm">
                  <thead>
                    <tr className={`border-b ${borderColor}`}>
                      <th className={`px-4 py-3 text-left font-semibold ${textPrimary}`}>Asset Class</th>
                      <th className={`px-4 py-3 text-left font-semibold ${textPrimary}`}>FIX Version</th>
                      <th className={`px-4 py-3 text-left font-semibold ${textPrimary}`}>Client Spec (Original)</th>
                      <th className={`px-4 py-3 text-left font-semibold ${textPrimary}`}>Standardized Version</th>
                      <th className={`px-4 py-3 text-left font-semibold ${textPrimary}`}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { asset: "Equities", protocol: "FIX 4.2", clientSpec: "client_eq_42.xml", clientSpecFile: "/specs/clients/nexus/equities/fix42/client_eq_42.xml", standardized: true, standardizedName: "client_eq_42_standardized.xlsx" },
                      { asset: "Equities", protocol: "FIX 4.4", clientSpec: "client_eq_44.xml", clientSpecFile: "/specs/clients/nexus/equities/fix44/client_eq_44.xml", standardized: false, standardizedName: null },
                      { asset: "Options", protocol: "FIX 4.4", clientSpec: "client_opt_44.xml", clientSpecFile: "/specs/clients/nexus/options/fix44/client_opt_44.xml", standardized: true, standardizedName: "client_opt_44_standardized.xlsx" },
                      { asset: "Futures", protocol: "FIX 4.2", clientSpec: null, clientSpecFile: null, standardized: false, standardizedName: null },
                      { asset: "Futures", protocol: "FIX 5.0 SP2", clientSpec: "client_fut_50sp2.xml", clientSpecFile: "/specs/clients/nexus/futures/fix50sp2/client_fut_50sp2.xml", standardized: false, standardizedName: null },
                    ].map((spec, i) => (
                      <tr key={i} className={`border-b ${borderColor} hover:bg-[#1e4976]/10`}>
                        <td className={`px-4 py-3 ${textPrimary}`}>{spec.asset}</td>
                        <td className={`px-4 py-3 ${textPrimary}`}>{spec.protocol}</td>
                        <td className={`px-4 py-3`}>
                          {spec.clientSpec ? (
                            <div className="flex items-center gap-2">
                              <FileText className={`h-4 w-4 ${textSecondary}`} />
                              <span className={textPrimary}>{spec.clientSpec}</span>
                            </div>
                          ) : (
                            <span className={`${textSecondary} italic`}>Not uploaded</span>
                          )}
                        </td>
                        <td className={`px-4 py-3`}>
                          {spec.standardized ? (
                            <div className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-[#4caf50]" />
                              <span className="text-[#4caf50]">{spec.standardizedName}</span>
                            </div>
                          ) : spec.clientSpec ? (
                            <span className={`text-[#ff9800] italic`}>Not yet converted</span>
                          ) : (
                            <span className={`${textSecondary} italic`}>-</span>
                          )}
                        </td>
                        <td className={`px-4 py-3`}>
                          {spec.clientSpec && (
                            <div className="flex items-center gap-2">
                              {spec.standardized ? (
                                <>
                                  <Button variant="outline" size="sm" onClick={() => { setViewingClientSpec({ asset: spec.asset, protocol: spec.protocol, specName: spec.standardizedName || "" }); setClientSpecStandardized(true); }}>
                                    <Eye className="h-3 w-3 mr-1" /> View
                                  </Button>
                                  <Button variant="outline" size="sm">
                                    <Download className="h-3 w-3 mr-1" /> Export
                                  </Button>
                                </>
                              ) : (
                                <Button size="sm" className="bg-[#00e5ff] text-[#0a1628] hover:bg-[#00e5ff]/80" disabled={isConverting} onClick={() => handleConvertToStandard(spec)}>
                                  <Zap className="h-3 w-3 mr-1" /> {isConverting ? "Converting..." : "Convert to Standard"}
                                </Button>
                              )}
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>

            {/* Conversion Error Display */}
            {conversionError && (
              <Card className={`${bgCard} border border-red-500/50 mb-6 p-4`}>
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-red-500 font-medium">API Call Failed - Showing Sample Data</p>
                      <Button variant="outline" size="sm" onClick={() => setConversionError(null)}>
                        Dismiss
                      </Button>
                    </div>
                    <div className={`text-sm ${textSecondary} space-y-2`}>
                      <p><span className="font-medium text-red-400">Error:</span> {conversionError.message}</p>
                      <p><span className="font-medium text-[#00e5ff]">Endpoint:</span> <code className="bg-[#1e4976]/30 px-1 rounded text-xs">{conversionError.endpoint}</code></p>
                      <div>
                        <span className="font-medium text-[#00e5ff]">Request Body:</span>
                        <pre className={`mt-1 p-2 rounded text-xs overflow-x-auto ${isDarkMode ? "bg-[#0a1628]" : "bg-gray-100"} border ${borderColor}`}>
{JSON.stringify(conversionError.requestBody, null, 2)}
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {/* Client Spec Conversion/View Modal */}
            {viewingClientSpec && (
              <Card className={`${bgCard} border ${borderColor} mb-6`}>
                <div className={`px-6 py-4 border-b ${borderColor} flex items-center justify-between`}>
                  <div>
                    <h3 className={`text-lg font-bold ${textPrimary}`}>
                      {clientSpecStandardized ? "Standardized Spec" : "Convert to Standard Format"}: {viewingClientSpec.asset} - {viewingClientSpec.protocol}
                    </h3>
                    <p className={`text-xs ${textSecondary}`}>{viewingClientSpec.specName}</p>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => { setViewingClientSpec(null); setStandardizedSpecData(null); }}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                {/* Message Type Tabs */}
                <div className={`px-4 py-2 border-b ${borderColor} flex gap-1 overflow-x-auto`}>
                  {[
                    { id: "D", label: "New Order Single (D)" },
                    { id: "F", label: "Order Cancel Request (F)" },
                    { id: "G", label: "Order Cancel/Replace (G)" },
                    { id: "8", label: "Execution Report (8)" },
                    { id: "9", label: "Order Cancel Reject (9)" },
                    { id: "j", label: "Business Reject (j)" },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setStandardizedMsgTypeTab(tab.id)}
                      className={`px-3 py-1.5 rounded text-xs font-medium whitespace-nowrap transition-colors ${
                        standardizedMsgTypeTab === tab.id
                          ? "bg-[#00e5ff] text-[#0a1628]"
                          : `${textSecondary} hover:bg-[#1e4976]/30`
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                <div className="overflow-auto max-h-[400px]">
                  <table className="w-full text-xs">
                    <thead className={`sticky top-0 ${isDarkMode ? "bg-[#0a1628]" : "bg-[#f8fafc]"}`}>
                      <tr className={`border-b ${borderColor}`}>
                        <th className={`px-3 py-2 text-left font-semibold ${textPrimary}`}>Tag</th>
                        <th className={`px-3 py-2 text-left font-semibold ${textPrimary}`}>GroupTag</th>
                        <th className={`px-3 py-2 text-left font-semibold ${textPrimary}`}>TagName</th>
                        <th className={`px-3 py-2 text-left font-semibold ${textPrimary}`}>Required</th>
                        <th className={`px-3 py-2 text-left font-semibold ${textPrimary}`}>CRCondition</th>
                        <th className={`px-3 py-2 text-left font-semibold ${textPrimary}`}>DataType</th>
                        <th className={`px-3 py-2 text-left font-semibold ${textPrimary}`}>SupportedValues</th>
                        <th className={`px-3 py-2 text-left font-semibold ${textPrimary}`}>Comment</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(standardizedMsgTypeTab === "D" ? [
                        { tag: "11", groupTag: "", name: "ClOrdID", required: "Y", crCondition: "", dataType: "String", values: "", comment: "" },
                        { tag: "21", groupTag: "", name: "HandlInst", required: "Y", crCondition: "", dataType: "Char", values: "1,2,3", comment: "" },
                        { tag: "38", groupTag: "", name: "OrderQty", required: "CR", crCondition: "152=N", dataType: "Qty", values: "", comment: "Required if CashOrderQty not specified" },
                        { tag: "40", groupTag: "", name: "OrdType", required: "Y", crCondition: "", dataType: "Char", values: "1,2,3,4,P", comment: "" },
                        { tag: "44", groupTag: "", name: "Price", required: "CR", crCondition: "40=2", dataType: "Price", values: "", comment: "Required for Limit orders" },
                        { tag: "54", groupTag: "", name: "Side", required: "Y", crCondition: "", dataType: "Char", values: "1,2,5,6", comment: "" },
                        { tag: "55", groupTag: "", name: "Symbol", required: "Y", crCondition: "", dataType: "String", values: "", comment: "" },
                        { tag: "59", groupTag: "", name: "TimeInForce", required: "N", crCondition: "", dataType: "Char", values: "0,1,3,4,6", comment: "" },
                        { tag: "60", groupTag: "", name: "TransactTime", required: "Y", crCondition: "", dataType: "UTCTimestamp", values: "", comment: "" },
                        { tag: "453", groupTag: "", name: "NoPartyIDs", required: "N", crCondition: "", dataType: "NumInGroup", values: "", comment: "Repeating group" },
                        { tag: "448", groupTag: "453", name: "PartyID", required: "N", crCondition: "", dataType: "String", values: "", comment: "" },
                      ] : standardizedMsgTypeTab === "8" ? [
                        { tag: "6", groupTag: "", name: "AvgPx", required: "Y", crCondition: "", dataType: "Price", values: "", comment: "" },
                        { tag: "14", groupTag: "", name: "CumQty", required: "Y", crCondition: "", dataType: "Qty", values: "", comment: "" },
                        { tag: "17", groupTag: "", name: "ExecID", required: "Y", crCondition: "", dataType: "String", values: "", comment: "" },
                        { tag: "37", groupTag: "", name: "OrderID", required: "Y", crCondition: "", dataType: "String", values: "", comment: "" },
                        { tag: "39", groupTag: "", name: "OrdStatus", required: "Y", crCondition: "", dataType: "Char", values: "0,1,2,4,8", comment: "" },
                        { tag: "150", groupTag: "", name: "ExecType", required: "Y", crCondition: "", dataType: "Char", values: "0,F,4,8", comment: "" },
                      ] : [
                        { tag: "11", groupTag: "", name: "ClOrdID", required: "Y", crCondition: "", dataType: "String", values: "", comment: "" },
                        { tag: "37", groupTag: "", name: "OrderID", required: "Y", crCondition: "", dataType: "String", values: "", comment: "" },
                      ]).map((row, i) => (
                        <tr key={i} className={`border-b ${borderColor} hover:bg-[#1e4976]/10`}>
                          <td className={`px-3 py-1`}><input type="text" defaultValue={row.tag} className={`w-12 px-1 py-0.5 rounded border ${borderColor} text-xs ${isDarkMode ? "bg-[#0a1628] text-white" : "bg-white text-[#0a1628]"}`} /></td>
                          <td className={`px-3 py-1`}><input type="text" defaultValue={row.groupTag} className={`w-12 px-1 py-0.5 rounded border ${borderColor} text-xs ${isDarkMode ? "bg-[#0a1628] text-white" : "bg-white text-[#0a1628]"}`} /></td>
                          <td className={`px-3 py-1`}><input type="text" defaultValue={row.name} className={`w-24 px-1 py-0.5 rounded border ${borderColor} text-xs ${isDarkMode ? "bg-[#0a1628] text-white" : "bg-white text-[#0a1628]"}`} /></td>
                          <td className={`px-3 py-1`}>
                            <select defaultValue={row.required} className={`w-12 px-0.5 py-0.5 rounded border ${borderColor} text-xs ${isDarkMode ? "bg-[#0a1628] text-white" : "bg-white text-[#0a1628]"} ${row.required === "Y" ? "text-[#4caf50]" : row.required === "CR" ? "text-[#ff9800]" : ""}`}>
                              <option value="Y">Y</option>
                              <option value="N">N</option>
                              <option value="CR">CR</option>
                            </select>
                          </td>
                          <td className={`px-3 py-1`}><input type="text" defaultValue={row.crCondition} className={`w-16 px-1 py-0.5 rounded border ${borderColor} text-xs ${isDarkMode ? "bg-[#0a1628] text-[#ff9800]" : "bg-white text-[#ff9800]"}`} /></td>
                          <td className={`px-3 py-1`}><input type="text" defaultValue={row.dataType} className={`w-24 px-1 py-0.5 rounded border ${borderColor} text-xs ${isDarkMode ? "bg-[#0a1628] text-white" : "bg-white text-[#0a1628]"}`} /></td>
                          <td className={`px-3 py-1`}><input type="text" defaultValue={row.values} className={`w-20 px-1 py-0.5 rounded border ${borderColor} text-xs ${isDarkMode ? "bg-[#0a1628] text-white" : "bg-white text-[#0a1628]"}`} /></td>
                          <td className={`px-3 py-1`}><input type="text" defaultValue={row.comment} className={`w-full px-1 py-0.5 rounded border ${borderColor} text-xs ${isDarkMode ? "bg-[#0a1628] text-white" : "bg-white text-[#0a1628]"}`} /></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className={`px-6 py-4 border-t ${borderColor} flex justify-between items-center`}>
                  <Button variant="outline" size="sm"><Plus className="h-4 w-4 mr-2" /> Add Row</Button>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => setViewingClientSpec(null)}>Cancel</Button>
                    <Button className="bg-[#00e5ff] text-[#0a1628] hover:bg-[#00e5ff]/80" onClick={() => { alert("Standardized spec saved!"); setViewingClientSpec(null); }}>
                      <Download className="h-4 w-4 mr-2" /> Save Standardized Spec
                    </Button>
                  </div>
                </div>
              </Card>
            )}

            <div className="grid gap-6">
              {clientProgressData.map((asset) => (
                <Card key={asset.name} className={`${bgCard} border ${borderColor} overflow-hidden`}>
                  <div className={`px-6 py-4 border-b ${borderColor} flex items-center justify-between`}>
                    <div className="flex items-center gap-4">
                      <h2 className={`text-lg font-bold ${textPrimary}`}>{asset.name}</h2>
                      <span className={`text-sm ${textSecondary}`}>{asset.versions.length} FIX version(s)</span>
                    </div>
                    {asset.alerts > 0 && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-[#f44336]/20 text-[#f44336] text-xs font-medium">
                        <Bell className="h-3 w-3" /> {asset.alerts} alerts
                      </span>
                    )}
                  </div>
                  <div className="p-6">
                    {/* FIX Versions Grid */}
                    <div className={`grid gap-4 ${asset.versions.length > 1 ? "grid-cols-2" : "grid-cols-1 max-w-md"}`}>
                      {asset.versions.map((version) => (
                        <div key={version.protocol} className={`p-4 rounded-lg border ${borderColor}`}>
                          <div className="flex items-center justify-between mb-4">
                            <span className={`font-semibold ${textPrimary}`}>{version.protocol}</span>
                            {version.clientSpec ? (
                              <span className="text-xs text-[#4caf50] flex items-center gap-1">
                                <CheckCircle className="h-3 w-3" /> Spec uploaded
                              </span>
                            ) : (
                              <span className="text-xs text-[#ff9800] flex items-center gap-1">
                                <AlertCircle className="h-3 w-3" /> No client spec
                              </span>
                            )}
                          </div>
                          
                          {/* Spec Compare Progress */}
                          <div className="mb-3">
                            <div className="flex items-center justify-between mb-1">
                              <span className={`text-sm ${textSecondary}`}>Spec Compare</span>
                              {getStatusBadge(version.specCompare)}
                            </div>
                            <div className={`h-2 rounded-full ${isDarkMode ? "bg-[#1e4976]" : "bg-[#e2e8f0]"}`}>
                              <div 
                                className={`h-full rounded-full transition-all ${version.specCompare === "complete" ? "bg-[#4caf50]" : version.specCompare === "in-progress" ? "bg-[#2196f3]" : "bg-[#9e9e9e]"}`}
                                style={{ width: version.specCompare === "complete" ? "100%" : version.specCompare === "in-progress" ? "60%" : "0%" }}
                              />
                            </div>
                          </div>
                          
{/* Log Analysis Progress */}
  <div className="mb-3">
  <div className="flex items-center justify-between mb-1">
  <span className={`text-sm ${textSecondary}`}>Log Analysis</span>
  {getStatusBadge(version.logAnalysis)}
  </div>
  <div className={`h-2 rounded-full ${isDarkMode ? "bg-[#1e4976]" : "bg-[#e2e8f0]"}`}>
  <div 
  className={`h-full rounded-full transition-all ${version.logAnalysis === "complete" ? "bg-[#4caf50]" : version.logAnalysis === "in-progress" ? "bg-[#2196f3]" : "bg-[#9e9e9e]"}`}
  style={{ width: version.logAnalysis === "complete" ? "100%" : version.logAnalysis === "in-progress" ? "60%" : "0%" }}
  />
  </div>
  </div>
  
  {/* ATDL Validation Progress */}
  <div className="mb-4">
  <div className="flex items-center justify-between mb-1">
  <span className={`text-sm ${textSecondary}`}>ATDL Validation</span>
  {getStatusBadge(version.atdlValidation)}
  </div>
  <div className={`h-2 rounded-full ${isDarkMode ? "bg-[#1e4976]" : "bg-[#e2e8f0]"}`}>
  <div 
  className={`h-full rounded-full transition-all ${version.atdlValidation === "complete" ? "bg-[#4caf50]" : version.atdlValidation === "in-progress" ? "bg-[#2196f3]" : "bg-[#9e9e9e]"}`}
  style={{ width: version.atdlValidation === "complete" ? "100%" : version.atdlValidation === "in-progress" ? "60%" : "0%" }}
  />
  </div>
  </div>
  
{/* Action Buttons */}
  <div className="flex gap-2">
  <Button 
  variant="outline" 
  size="sm" 
  className="flex-1"
  onClick={() => { setSelectedAssetClass(asset.name); setSelectedFixVersion(version.version); setShowSpecResults(false); setCurrentScreen("spec-compare"); setIsAdHocMode(false); }}
  disabled={!version.clientSpec}
  >
  <GitCompare className="h-3 w-3 mr-1" /> Compare
  </Button>
  <Button 
  variant="outline" 
  size="sm" 
  className="flex-1"
                  onClick={() => { setSelectedAssetClass(asset.name); setSelectedFixVersion(version.version); setCurrentScreen("test-case-gen"); setIsAdHocMode(false); }}
  >
  <FileSearch className="h-3 w-3 mr-1" /> Analyze
  </Button>
  <Button 
  variant="outline" 
  size="sm" 
  className="flex-1"
  onClick={() => { setSelectedAssetClass(asset.name); setSelectedFixVersion(version.version); setCurrentScreen("atdl-validate"); setIsAdHocMode(false); }}
  >
  <Cog className="h-3 w-3 mr-1" /> ATDL
  </Button>
  </div>
                        </div>
                      ))}
                    </div>
                    
                    {/* All Tools Button */}
                    <div className="mt-4 pt-4 border-t border-[#1e4976]/30">
                      <Button 
                        variant="outline" 
                        onClick={() => { setSelectedAssetClass(asset.name); setCurrentScreen("asset-tools"); }}
                      >
                        View All Tools for {asset.name}
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Asset Tools Screen
  if (currentScreen === "asset-tools" && selectedClient && selectedAssetClass) {
    const assetData = selectedClient.assetClasses.find((ac: any) => ac.name === selectedAssetClass)
const tools = [
  { key: "specCompare", title: "Spec Comparison", icon: GitCompare, status: assetData?.specCompare, screen: "spec-compare" },
  { key: "logAnalysis", title: "Log Analysis", icon: FileSearch, status: assetData?.logAnalysis, screen: "log-analysis" },
  { key: "scenario", title: "Scenario Creation", icon: Activity, status: assetData?.scenario, screen: "scenario-creation" },
  { key: "testCase", title: "Reg Test Case Generation", icon: VerifixLogo, status: assetData?.testCase, screen: "test-case-gen", isLogo: true },
  { key: "certification", title: "Certification Case Generation", icon: ConductorLogo, status: assetData?.certification, screen: "certification-gen", isLogo: true },
  { key: "fixAtdlCompare", title: "FIX to ATDL Compare", icon: GitCompare, status: "not-started", screen: "fix-atdl-compare" },
  { key: "atdlCompare", title: "ATDL to ATDL Compare", icon: GitCompare, status: "not-started", screen: "atdl-compare" },
  { key: "fixToAtdl", title: "FIX to ATDL Convert", icon: Zap, status: "not-started", screen: "fix-to-atdl" },
  { key: "atdlValidate", title: "ATDL Validate Structure", icon: CheckCircle, status: "not-started", screen: "atdl-validate" },
  { key: "atdlUsage", title: "ATDL Usage", icon: Eye, status: "not-started", screen: "atdl-ui-repr" },
  { key: "config", title: "Configuration", icon: Cog, status: assetData?.config, screen: "asset-tools" },
  ]

    return (
      <div className={`min-h-screen ${bgPrimary} flex`}>
        <Sidebar />
        <div className="flex-1 overflow-auto">
          <header className={`${bgSecondary} border-b ${borderColor} px-6 py-4`}>
            <button onClick={() => setCurrentScreen("client-detail")} className={`flex items-center gap-2 mb-2 ${textSecondary} hover:text-[#00e5ff]`}>
              <ArrowLeft className="h-4 w-4" /> Back to {selectedClient.name}
            </button>
            <h1 className={`text-2xl font-bold ${textPrimary}`}>{selectedClient.name} - {selectedAssetClass}</h1>
          </header>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tools.map((tool) => (
                <Card 
                  key={tool.key}
                  className={`${bgCard} p-6 border ${borderColor} cursor-pointer hover:border-[#00e5ff] transition-colors`}
                  onClick={() => { if (tool.screen === "spec-compare") setShowSpecResults(false); setCurrentScreen(tool.screen as any); setIsAdHocMode(false); }}
                >
                  <div className="flex items-center gap-4 mb-4">
                    {tool.isLogo ? <tool.icon size={32} /> : <tool.icon className="h-8 w-8 text-[#00e5ff]" />}
                    <h3 className={`text-lg font-bold ${textPrimary}`}>{tool.title}</h3>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className={textSecondary}>Status</span>
                    {getStatusBadge(tool.status)}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Spec Compare Screen
  if (currentScreen === "spec-compare") {
const specCompareResults = [
  { id: "diff-1", title: "Undefined Message Types", left: "35=K, 35=H Undefined In Counterparty Spec", right: "35=DF, 35=L Undefined In Counterparty Spec" },
  { id: "diff-2", title: "Unsupported Tags", left: "35=D: tags 375, 943\n35=G: tags 524, 133", right: "35=D: tags 111, 6454\n35=8: tags 5124, 1331" },
  { id: "diff-3", title: "Unsupported Tag Values", left: "123=4, 7, 9\n56=24, 56, gh", right: "123=12, 55, 78\n76=5, 8, 0" },
  { id: "diff-4", title: "Datatype Mismatch", left: "Tag 46 is String", right: "Tag 98 is Char" },
  ]

  // All specs for this client when "Show All Specs" is clicked
  const allClientSpecs = [
    { asset: "Equities", protocol: "FIX 4.2", adminSpec: "EQ_FIX42_v1.2.xml", adminVersion: "v1.2", clientSpec: "client_eq_42_v1.1.xml", clientVersion: "v1.1", status: "complete", differences: 3 },
    { asset: "Equities", protocol: "FIX 4.4", adminSpec: "EQ_FIX44_v2.1.xml", adminVersion: "v2.1", clientSpec: "client_eq_44_v1.2.xml", clientVersion: "v1.2", status: "in-progress", differences: 7 },
    { asset: "Options", protocol: "FIX 4.4", adminSpec: "OPT_FIX44_v2.0.xml", adminVersion: "v2.0", clientSpec: "client_opt_44_v1.0.xml", clientVersion: "v1.0", status: "complete", differences: 2 },
    { asset: "Futures", protocol: "FIX 4.2", adminSpec: "FUT_FIX42_v1.0.xml", adminVersion: "v1.0", clientSpec: null, clientVersion: null, status: "pending", differences: 0 },
    { asset: "Futures", protocol: "FIX 5.0 SP2", adminSpec: "FUT_FIX50SP2_v2.0.xml", adminVersion: "v2.0", clientSpec: "client_fut_50sp2_v1.0.xml", clientVersion: "v1.0", status: "in-progress", differences: 5 },
  ]
  
  const allActionsSelected = specCompareResults.every(section => comparisonFlags[section.id]?.status !== null && comparisonFlags[section.id]?.status !== undefined)
    
    const updateFlag = (id: string, status: "ignore" | "customization" | "flag" | null) => {
      setComparisonFlags(prev => ({ ...prev, [id]: { ...prev[id], status, note: prev[id]?.note || "" } }))
    }
    
    const updateNote = (id: string, note: string) => {
      setComparisonFlags(prev => ({ ...prev, [id]: { ...prev[id], note, status: prev[id]?.status || null } }))
    }

    // Client-specific flow: When coming from Dashboard -> Client -> Compare
    if (!isAdHocMode && selectedClient && selectedAssetClass) {
      return (
        <div className={`min-h-screen ${bgPrimary} flex`}>
          <Sidebar />
          <div className="flex-1 overflow-auto">
            <header className={`${bgSecondary} border-b ${borderColor} px-6 py-4`}>
              <button onClick={() => { setShowSpecResults(false); setShowStandardizedSpecs(false); setSelectedAdminSpecForResults(null); setCurrentScreen("client-detail"); }} className={`flex items-center gap-2 mb-2 ${textSecondary} hover:text-[#00e5ff]`}>
                <ArrowLeft className="h-4 w-4" /> Back to {selectedClient.name}
              </button>
              <div className="flex items-center justify-between">
                <div>
                  <h1 className={`text-2xl font-bold ${textPrimary}`}>Spec Comparison</h1>
                  <p className={`text-sm ${textSecondary}`}>
                    Client: <span className="text-[#00e5ff] font-medium">{selectedClient.name}</span>
                    {selectedAssetClass && <> | Asset Class: <span className="text-[#00e5ff] font-medium">{selectedAssetClass}</span></>}
                    {selectedFixVersion && <> | FIX Version: <span className="text-[#00e5ff] font-medium">{selectedFixVersion}</span></>}
                  </p>
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => setShowSpecResults(!showSpecResults)}
                  className={showSpecResults ? "bg-[#00e5ff]/10 border-[#00e5ff] text-[#00e5ff]" : ""}
                >
                  <Eye className="h-4 w-4 mr-2" /> {showSpecResults ? "Hide All Specs" : "Show All Specs"}
                </Button>
              </div>
            </header>

            <div className="p-6">
              {/* Show All Specs View */}
              {showSpecResults && (
                <Card className={`${bgCard} border ${borderColor} mb-6`}>
                  <div className={`px-6 py-4 border-b ${borderColor}`}>
                    <h2 className={`text-lg font-bold ${textPrimary}`}>All Spec Comparisons for {selectedClient.name}</h2>
                  </div>
                  
                  {/* Table Header */}
                  <div className={`grid grid-cols-12 gap-4 px-6 py-3 ${isDarkMode ? "bg-[#0a1628]" : "bg-[#f1f5f9]"} border-b ${borderColor}`}>
                    <div className={`col-span-2 font-semibold text-sm ${textPrimary}`}>Asset / Protocol</div>
                    <div className={`col-span-3 font-semibold text-sm ${textPrimary}`}>Admin Spec</div>
                    <div className={`col-span-3 font-semibold text-sm ${textPrimary}`}>Client Spec</div>
                    <div className={`col-span-2 font-semibold text-sm ${textPrimary}`}>Status</div>
                    <div className={`col-span-2 font-semibold text-sm ${textPrimary}`}>Actions</div>
                  </div>
                  
                  {/* Spec Rows */}
                  <div className="divide-y divide-[#1e4976]/30">
                    {allClientSpecs.map((spec, i) => (
                      <div key={i} className={`grid grid-cols-12 gap-4 px-6 py-4 hover:bg-[#1e4976]/10 transition-colors items-center ${spec.asset === selectedAssetClass && spec.protocol === selectedFixVersion ? "bg-[#00e5ff]/5 border-l-2 border-[#00e5ff]" : ""}`}>
                        {/* Asset/Protocol */}
                        <div className="col-span-2">
                          <p className={`font-medium ${textPrimary}`}>{spec.asset}</p>
                          <p className={`text-xs ${textSecondary}`}>{spec.protocol}</p>
                        </div>
                        
                        {/* Admin Spec */}
                        <div className="col-span-3">
                          <div className="flex items-center gap-2">
                            <select className={`flex-1 p-1.5 rounded border ${borderColor} text-xs ${isDarkMode ? "bg-[#0a1628] text-white" : "bg-white text-[#0a1628]"}`}>
                              <option value={spec.adminVersion}>{spec.adminSpec}</option>
                              <option value="prev">Previous version</option>
                            </select>
                          </div>
                        </div>
                        
                        {/* Client Spec */}
                        <div className="col-span-3">
                          {spec.clientSpec ? (
                            <div className="flex items-center gap-2">
                              <select className={`flex-1 p-1.5 rounded border ${borderColor} text-xs ${isDarkMode ? "bg-[#0a1628] text-white" : "bg-white text-[#0a1628]"}`}>
                                <option value={spec.clientVersion}>{spec.clientSpec}</option>
                                <option value="prev">Previous version</option>
                              </select>
                            </div>
                          ) : (
                            <span className={`text-xs ${textSecondary}`}>No spec uploaded</span>
                          )}
                        </div>
                        
                        {/* Status */}
                        <div className="col-span-2">
                          <div className="flex items-center gap-2">
                            {getStatusBadge(spec.status)}
                            {spec.differences > 0 && (
                              <span className={`text-xs ${textSecondary}`}>{spec.differences} diff</span>
                            )}
                          </div>
                        </div>
                        
                        {/* Actions */}
                        <div className="col-span-2">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="text-xs"
                            disabled={!spec.clientSpec}
                            onClick={() => { setSelectedAssetClass(spec.asset); setSelectedFixVersion(spec.protocol); setShowSpecResults(false); }}
                          >
                            <GitCompare className="h-3 w-3 mr-1" /> Compare
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              )}

              {/* Current Spec Comparison - Pre-loaded */}
              <Card className={`${bgCard} p-6 border ${borderColor} mb-6`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className={`text-lg font-bold ${textPrimary}`}>Comparing: {selectedAssetClass} - {selectedFixVersion}</h3>
                  <span className={`px-3 py-1 rounded text-xs ${isDarkMode ? "bg-[#2196f3]/20 text-[#2196f3]" : "bg-[#2196f3]/10 text-[#2196f3]"}`}>Pre-loaded</span>
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  {/* Client Spec - Pre-loaded */}
                  <div className={`border-2 ${borderColor} rounded-lg p-4`}>
                    <div className="flex items-center justify-between mb-3">
                      <label className={`text-sm font-medium ${textPrimary}`}>Client Spec</label>
                      <CheckCircle className="h-4 w-4 text-[#4caf50]" />
                    </div>
                    <div className={`flex items-center gap-3 p-3 rounded ${isDarkMode ? "bg-[#4caf50]/10" : "bg-[#4caf50]/5"} border border-[#4caf50]/30 mb-3`}>
                      <FileText className={`h-6 w-6 text-[#4caf50]`} />
                      <div>
                        <p className={`font-medium text-sm ${textPrimary}`}>{selectedClient.name} - {selectedAssetClass}</p>
                        <p className={`text-xs ${textSecondary}`}>{selectedFixVersion}</p>
                      </div>
                    </div>
                    <div>
                      <label className={`text-xs ${textSecondary} mb-1 block`}>Version</label>
                      <select className={`w-full p-2 rounded border ${borderColor} text-sm ${isDarkMode ? "bg-[#0a1628] text-white" : "bg-white text-[#0a1628]"}`}>
                        <option value="v1.2">client_eq_44_v1.2.xml (Current)</option>
<option value="v1.1">client_eq_44_v1.1.xml (Apr 9)</option>
              <option value="v1.0">client_eq_44_v1.0.xml (Apr 2)</option>
                      </select>
                    </div>
                  </div>
                  
                  {/* Admin Spec - Pre-loaded */}
                  <div className={`border-2 ${borderColor} rounded-lg p-4`}>
                    <div className="flex items-center justify-between mb-3">
                      <label className={`text-sm font-medium ${textPrimary}`}>Admin Spec</label>
                      <CheckCircle className="h-4 w-4 text-[#4caf50]" />
                    </div>
                    <div className={`flex items-center gap-3 p-3 rounded ${isDarkMode ? "bg-[#4caf50]/10" : "bg-[#4caf50]/5"} border border-[#4caf50]/30 mb-3`}>
                      <FileText className={`h-6 w-6 text-[#4caf50]`} />
                      <div>
                        <p className={`font-medium text-sm ${textPrimary}`}>{selectedAssetClass} - {selectedFixVersion}</p>
                        <p className={`text-xs ${textSecondary}`}>Admin Reference Spec</p>
                      </div>
                    </div>
                    <div>
                      <label className={`text-xs ${textSecondary} mb-1 block`}>Version</label>
                      <select className={`w-full p-2 rounded border ${borderColor} text-sm ${isDarkMode ? "bg-[#0a1628] text-white" : "bg-white text-[#0a1628]"}`}>
                        <option value="v2.1">{selectedAssetClass} {selectedFixVersion} v2.1 (Current)</option>
                        <option value="v2.0">{selectedAssetClass} {selectedFixVersion} v2.0</option>
                        <option value="v1.9">{selectedAssetClass} {selectedFixVersion} v1.9</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 flex justify-center">
                  <Button onClick={() => simulateTask(() => { setShowStandardizedSpecs(true); setShowSpecResults(false); })} disabled={isLoading} className="bg-[#00e5ff] text-[#0a1628] hover:bg-[#00e5ff]/80">
                    <GitCompare className="h-4 w-4 mr-2" /> {isLoading ? "Loading..." : "Load Standardized Specs"}
                  </Button>
                </div>
              </Card>

              {/* Step 2: Standardized Specs Side by Side */}
              {showStandardizedSpecs && (
              <Card className={`${bgCard} border ${borderColor}`}>
                <div className={`px-6 py-4 border-b ${borderColor} flex items-center justify-between`}>
                  <div>
                    <h3 className={`text-lg font-bold ${textPrimary}`}>Standardized Specifications</h3>
                    <p className={`text-xs ${textSecondary}`}>Both specs converted to standard format - review and edit before comparison</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm"><Download className="h-4 w-4 mr-2" /> Export Client</Button>
                    <Button variant="outline" size="sm"><Download className="h-4 w-4 mr-2" /> Export Admin</Button>
                  </div>
                </div>

                {/* Message Type Tabs */}
                <div className={`px-4 py-2 border-b ${borderColor} flex gap-1 overflow-x-auto`}>
                  {[
                    { id: "D", label: "New Order Single (D)" },
                    { id: "F", label: "Order Cancel Request (F)" },
                    { id: "G", label: "Order Cancel/Replace (G)" },
                    { id: "8", label: "Execution Report (8)" },
                    { id: "9", label: "Order Cancel Reject (9)" },
                    { id: "j", label: "Business Reject (j)" },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setStandardizedMsgTypeTab(tab.id)}
                      className={`px-3 py-1.5 rounded text-xs font-medium whitespace-nowrap transition-colors ${
                        standardizedMsgTypeTab === tab.id
                          ? "bg-[#00e5ff] text-[#0a1628]"
                          : `${textSecondary} hover:bg-[#1e4976]/30`
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
                
                <div className="grid grid-cols-2 gap-0">
                  {/* Client Spec Standardized View */}
                  <div className={`border-r ${borderColor}`}>
                    <div className={`px-4 py-2 ${isDarkMode ? "bg-[#2196f3]/10" : "bg-[#2196f3]/5"} border-b ${borderColor} flex items-center justify-between`}>
                      <h4 className={`font-semibold text-[#2196f3] text-sm`}>Client Spec: {selectedClient?.name}</h4>
                      <Button variant="outline" size="sm" className="text-xs h-6 px-2"><Plus className="h-3 w-3 mr-1" /> Add Row</Button>
                    </div>
                    <div className="overflow-auto max-h-[350px]">
                      <table className="w-full text-xs">
                        <thead className={`sticky top-0 ${isDarkMode ? "bg-[#0a1628]" : "bg-[#f8fafc]"}`}>
                          <tr className={`border-b ${borderColor}`}>
                            <th className={`px-2 py-2 text-left font-semibold ${textPrimary}`}>Tag</th>
                            <th className={`px-2 py-2 text-left font-semibold ${textPrimary}`}>GroupTag</th>
                            <th className={`px-2 py-2 text-left font-semibold ${textPrimary}`}>TagName</th>
                            <th className={`px-2 py-2 text-left font-semibold ${textPrimary}`}>Req</th>
                            <th className={`px-2 py-2 text-left font-semibold ${textPrimary}`}>CRCondition</th>
                            <th className={`px-2 py-2 text-left font-semibold ${textPrimary}`}>DataType</th>
                            <th className={`px-2 py-2 text-left font-semibold ${textPrimary}`}>Values</th>
                            <th className={`px-2 py-2 text-left font-semibold ${textPrimary}`}>Comment</th>
                          </tr>
                        </thead>
                        <tbody>
                          {(standardizedMsgTypeTab === "D" ? [
                            { tag: "11", groupTag: "", name: "ClOrdID", required: "Y", crCondition: "", dataType: "String", values: "", comment: "" },
                            { tag: "21", groupTag: "", name: "HandlInst", required: "Y", crCondition: "", dataType: "Char", values: "1,2,3", comment: "" },
                            { tag: "38", groupTag: "", name: "OrderQty", required: "CR", crCondition: "152=N", dataType: "Qty", values: "", comment: "Required if CashOrderQty not specified" },
                            { tag: "40", groupTag: "", name: "OrdType", required: "Y", crCondition: "", dataType: "Char", values: "1,2,3,4,P", comment: "" },
                            { tag: "44", groupTag: "", name: "Price", required: "CR", crCondition: "40=2", dataType: "Price", values: "", comment: "Required for Limit orders" },
                            { tag: "54", groupTag: "", name: "Side", required: "Y", crCondition: "", dataType: "Char", values: "1,2,5,6", comment: "" },
                            { tag: "55", groupTag: "", name: "Symbol", required: "Y", crCondition: "", dataType: "String", values: "", comment: "" },
                            { tag: "59", groupTag: "", name: "TimeInForce", required: "N", crCondition: "", dataType: "Char", values: "0,1,3,4,6", comment: "" },
                            { tag: "60", groupTag: "", name: "TransactTime", required: "Y", crCondition: "", dataType: "UTCTimestamp", values: "", comment: "" },
                            { tag: "453", groupTag: "", name: "NoPartyIDs", required: "N", crCondition: "", dataType: "NumInGroup", values: "", comment: "Repeating group" },
                            { tag: "448", groupTag: "453", name: "PartyID", required: "N", crCondition: "", dataType: "String", values: "", comment: "" },
                            { tag: "447", groupTag: "453", name: "PartyIDSource", required: "N", crCondition: "", dataType: "Char", values: "B,C,D", comment: "" },
                          ] : standardizedMsgTypeTab === "8" ? [
                            { tag: "6", groupTag: "", name: "AvgPx", required: "Y", crCondition: "", dataType: "Price", values: "", comment: "" },
                            { tag: "14", groupTag: "", name: "CumQty", required: "Y", crCondition: "", dataType: "Qty", values: "", comment: "" },
                            { tag: "17", groupTag: "", name: "ExecID", required: "Y", crCondition: "", dataType: "String", values: "", comment: "" },
                            { tag: "37", groupTag: "", name: "OrderID", required: "Y", crCondition: "", dataType: "String", values: "", comment: "" },
                            { tag: "39", groupTag: "", name: "OrdStatus", required: "Y", crCondition: "", dataType: "Char", values: "0,1,2,4,8", comment: "" },
                            { tag: "150", groupTag: "", name: "ExecType", required: "Y", crCondition: "", dataType: "Char", values: "0,F,4,8", comment: "" },
                            { tag: "151", groupTag: "", name: "LeavesQty", required: "Y", crCondition: "", dataType: "Qty", values: "", comment: "" },
                          ] : [
                            { tag: "11", groupTag: "", name: "ClOrdID", required: "Y", crCondition: "", dataType: "String", values: "", comment: "" },
                            { tag: "37", groupTag: "", name: "OrderID", required: "Y", crCondition: "", dataType: "String", values: "", comment: "" },
                          ]).map((row, i) => (
                            <tr key={i} className={`border-b ${borderColor} hover:${isDarkMode ? "bg-[#1e4976]/20" : "bg-[#f1f5f9]"}`}>
                              <td className={`px-2 py-1`}><input type="text" defaultValue={row.tag} className={`w-12 px-1 py-0.5 rounded border ${borderColor} text-xs ${isDarkMode ? "bg-[#0a1628] text-white" : "bg-white text-[#0a1628]"}`} /></td>
                              <td className={`px-2 py-1`}><input type="text" defaultValue={row.groupTag} className={`w-12 px-1 py-0.5 rounded border ${borderColor} text-xs ${isDarkMode ? "bg-[#0a1628] text-white" : "bg-white text-[#0a1628]"}`} /></td>
                              <td className={`px-2 py-1`}><input type="text" defaultValue={row.name} className={`w-20 px-1 py-0.5 rounded border ${borderColor} text-xs ${isDarkMode ? "bg-[#0a1628] text-white" : "bg-white text-[#0a1628]"}`} /></td>
                              <td className={`px-2 py-1`}>
                                <select defaultValue={row.required} className={`w-10 px-0.5 py-0.5 rounded border ${borderColor} text-xs ${isDarkMode ? "bg-[#0a1628] text-white" : "bg-white text-[#0a1628]"} ${row.required === "Y" ? "text-[#4caf50]" : row.required === "CR" ? "text-[#ff9800]" : ""}`}>
                                  <option value="Y">Y</option>
                                  <option value="N">N</option>
                                  <option value="CR">CR</option>
                                </select>
                              </td>
                              <td className={`px-2 py-1`}><input type="text" defaultValue={row.crCondition} className={`w-14 px-1 py-0.5 rounded border ${borderColor} text-xs ${isDarkMode ? "bg-[#0a1628] text-[#ff9800]" : "bg-white text-[#ff9800]"}`} /></td>
                              <td className={`px-2 py-1`}><input type="text" defaultValue={row.dataType} className={`w-20 px-1 py-0.5 rounded border ${borderColor} text-xs ${isDarkMode ? "bg-[#0a1628] text-white" : "bg-white text-[#0a1628]"}`} /></td>
                              <td className={`px-2 py-1`}><input type="text" defaultValue={row.values} className={`w-16 px-1 py-0.5 rounded border ${borderColor} text-xs ${isDarkMode ? "bg-[#0a1628] text-white" : "bg-white text-[#0a1628]"}`} /></td>
                              <td className={`px-2 py-1`}><input type="text" defaultValue={row.comment} className={`w-full px-1 py-0.5 rounded border ${borderColor} text-xs ${isDarkMode ? "bg-[#0a1628] text-white" : "bg-white text-[#0a1628]"}`} /></td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Admin Spec Standardized View */}
                  <div>
                    <div className={`px-4 py-2 ${isDarkMode ? "bg-[#00e5ff]/10" : "bg-[#00e5ff]/5"} border-b ${borderColor} flex items-center justify-between`}>
                      <h4 className={`font-semibold text-[#00e5ff] text-sm`}>Admin Spec: {selectedAssetClass} - {selectedFixVersion}</h4>
                      {selectedRole === "admin" && (
                        <Button variant="outline" size="sm" className="text-xs h-6 px-2"><Plus className="h-3 w-3 mr-1" /> Add Row</Button>
                      )}
                      {selectedRole === "client" && (
                        <span className={`text-xs ${textSecondary} italic`}>Read-only</span>
                      )}
                    </div>
                    <div className="overflow-auto max-h-[350px]">
                      <table className="w-full text-xs">
                        <thead className={`sticky top-0 ${isDarkMode ? "bg-[#0a1628]" : "bg-[#f8fafc]"}`}>
                          <tr className={`border-b ${borderColor}`}>
                            <th className={`px-2 py-2 text-left font-semibold ${textPrimary}`}>Tag</th>
                            <th className={`px-2 py-2 text-left font-semibold ${textPrimary}`}>GroupTag</th>
                            <th className={`px-2 py-2 text-left font-semibold ${textPrimary}`}>TagName</th>
                            <th className={`px-2 py-2 text-left font-semibold ${textPrimary}`}>Req</th>
                            <th className={`px-2 py-2 text-left font-semibold ${textPrimary}`}>CRCondition</th>
                            <th className={`px-2 py-2 text-left font-semibold ${textPrimary}`}>DataType</th>
                            <th className={`px-2 py-2 text-left font-semibold ${textPrimary}`}>Values</th>
                            <th className={`px-2 py-2 text-left font-semibold ${textPrimary}`}>Comment</th>
                          </tr>
                        </thead>
                        <tbody>
                          {(standardizedMsgTypeTab === "D" ? [
                            { tag: "11", groupTag: "", name: "ClOrdID", required: "Y", crCondition: "", dataType: "String", values: "", comment: "" },
                            { tag: "21", groupTag: "", name: "HandlInst", required: "Y", crCondition: "", dataType: "Char", values: "1,2,3", comment: "" },
                            { tag: "38", groupTag: "", name: "OrderQty", required: "Y", crCondition: "", dataType: "Qty", values: "", comment: "" },
                            { tag: "40", groupTag: "", name: "OrdType", required: "Y", crCondition: "", dataType: "Char", values: "1,2,3,4,K,P", comment: "Includes Pegged" },
                            { tag: "44", groupTag: "", name: "Price", required: "CR", crCondition: "40=2", dataType: "Price", values: "", comment: "Required for Limit orders" },
                            { tag: "54", groupTag: "", name: "Side", required: "Y", crCondition: "", dataType: "Char", values: "1,2", comment: "Buy/Sell only" },
                            { tag: "55", groupTag: "", name: "Symbol", required: "Y", crCondition: "", dataType: "String", values: "", comment: "" },
                            { tag: "59", groupTag: "", name: "TimeInForce", required: "N", crCondition: "", dataType: "Char", values: "0,1,3,4,6,7", comment: "Includes At the Close" },
                            { tag: "60", groupTag: "", name: "TransactTime", required: "Y", crCondition: "", dataType: "UTCTimestamp", values: "", comment: "" },
                            { tag: "111", groupTag: "", name: "MaxFloor", required: "N", crCondition: "", dataType: "Qty", values: "", comment: "Iceberg orders" },
                            { tag: "453", groupTag: "", name: "NoPartyIDs", required: "Y", crCondition: "", dataType: "NumInGroup", values: "", comment: "Required repeating group" },
                            { tag: "448", groupTag: "453", name: "PartyID", required: "Y", crCondition: "", dataType: "String", values: "", comment: "" },
                            { tag: "447", groupTag: "453", name: "PartyIDSource", required: "Y", crCondition: "", dataType: "Char", values: "B,C,D,P", comment: "" },
                          ] : standardizedMsgTypeTab === "8" ? [
                            { tag: "6", groupTag: "", name: "AvgPx", required: "Y", crCondition: "", dataType: "Price", values: "", comment: "" },
                            { tag: "14", groupTag: "", name: "CumQty", required: "Y", crCondition: "", dataType: "Qty", values: "", comment: "" },
                            { tag: "17", groupTag: "", name: "ExecID", required: "Y", crCondition: "", dataType: "String", values: "", comment: "" },
                            { tag: "37", groupTag: "", name: "OrderID", required: "Y", crCondition: "", dataType: "String", values: "", comment: "" },
                            { tag: "39", groupTag: "", name: "OrdStatus", required: "Y", crCondition: "", dataType: "Char", values: "0,1,2,4,8,C", comment: "Includes Expired" },
                            { tag: "150", groupTag: "", name: "ExecType", required: "Y", crCondition: "", dataType: "Char", values: "0,F,4,8,C", comment: "" },
                            { tag: "151", groupTag: "", name: "LeavesQty", required: "Y", crCondition: "", dataType: "Qty", values: "", comment: "" },
                            { tag: "31", groupTag: "", name: "LastPx", required: "CR", crCondition: "150=F", dataType: "Price", values: "", comment: "Required on fills" },
                            { tag: "32", groupTag: "", name: "LastQty", required: "CR", crCondition: "150=F", dataType: "Qty", values: "", comment: "Required on fills" },
                          ] : [
                            { tag: "11", groupTag: "", name: "ClOrdID", required: "Y", crCondition: "", dataType: "String", values: "", comment: "" },
                            { tag: "37", groupTag: "", name: "OrderID", required: "Y", crCondition: "", dataType: "String", values: "", comment: "" },
                          ]).map((row, i) => (
                            <tr key={i} className={`border-b ${borderColor} hover:${isDarkMode ? "bg-[#1e4976]/20" : "bg-[#f1f5f9]"}`}>
                              <td className={`px-2 py-1`}><input type="text" defaultValue={row.tag} readOnly={selectedRole === "client"} className={`w-12 px-1 py-0.5 rounded border ${borderColor} text-xs ${isDarkMode ? "bg-[#0a1628] text-white" : "bg-white text-[#0a1628]"} ${selectedRole === "client" ? "opacity-60 cursor-not-allowed" : ""}`} /></td>
                              <td className={`px-2 py-1`}><input type="text" defaultValue={row.groupTag} readOnly={selectedRole === "client"} className={`w-12 px-1 py-0.5 rounded border ${borderColor} text-xs ${isDarkMode ? "bg-[#0a1628] text-white" : "bg-white text-[#0a1628]"} ${selectedRole === "client" ? "opacity-60 cursor-not-allowed" : ""}`} /></td>
                              <td className={`px-2 py-1`}><input type="text" defaultValue={row.name} readOnly={selectedRole === "client"} className={`w-20 px-1 py-0.5 rounded border ${borderColor} text-xs ${isDarkMode ? "bg-[#0a1628] text-white" : "bg-white text-[#0a1628]"} ${selectedRole === "client" ? "opacity-60 cursor-not-allowed" : ""}`} /></td>
                              <td className={`px-2 py-1`}>
                                <select defaultValue={row.required} disabled={selectedRole === "client"} className={`w-10 px-0.5 py-0.5 rounded border ${borderColor} text-xs ${isDarkMode ? "bg-[#0a1628] text-white" : "bg-white text-[#0a1628]"} ${row.required === "Y" ? "text-[#4caf50]" : row.required === "CR" ? "text-[#ff9800]" : ""} ${selectedRole === "client" ? "opacity-60 cursor-not-allowed" : ""}`}>
                                  <option value="Y">Y</option>
                                  <option value="N">N</option>
                                  <option value="CR">CR</option>
                                </select>
                              </td>
                              <td className={`px-2 py-1`}><input type="text" defaultValue={row.crCondition} readOnly={selectedRole === "client"} className={`w-14 px-1 py-0.5 rounded border ${borderColor} text-xs ${isDarkMode ? "bg-[#0a1628] text-[#ff9800]" : "bg-white text-[#ff9800]"} ${selectedRole === "client" ? "opacity-60 cursor-not-allowed" : ""}`} /></td>
                              <td className={`px-2 py-1`}><input type="text" defaultValue={row.dataType} readOnly={selectedRole === "client"} className={`w-20 px-1 py-0.5 rounded border ${borderColor} text-xs ${isDarkMode ? "bg-[#0a1628] text-white" : "bg-white text-[#0a1628]"} ${selectedRole === "client" ? "opacity-60 cursor-not-allowed" : ""}`} /></td>
                              <td className={`px-2 py-1`}><input type="text" defaultValue={row.values} readOnly={selectedRole === "client"} className={`w-16 px-1 py-0.5 rounded border ${borderColor} text-xs ${isDarkMode ? "bg-[#0a1628] text-white" : "bg-white text-[#0a1628]"} ${selectedRole === "client" ? "opacity-60 cursor-not-allowed" : ""}`} /></td>
                              <td className={`px-2 py-1`}><input type="text" defaultValue={row.comment} readOnly={selectedRole === "client"} className={`w-full px-1 py-0.5 rounded border ${borderColor} text-xs ${isDarkMode ? "bg-[#0a1628] text-white" : "bg-white text-[#0a1628]"} ${selectedRole === "client" ? "opacity-60 cursor-not-allowed" : ""}`} /></td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <div className={`px-6 py-4 border-t ${borderColor} flex justify-between items-center`}>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => alert("Client spec saved as standardized format")}><Download className="h-4 w-4 mr-2" /> Save Client Spec</Button>
                    {selectedRole === "admin" && (
                      <Button variant="outline" size="sm" onClick={() => alert("Admin spec saved as standardized format")}><Download className="h-4 w-4 mr-2" /> Save Admin Spec</Button>
                    )}
                  </div>
                  <Button onClick={() => simulateTask(() => setShowSpecResults(true))} disabled={isLoading} className="bg-[#00e5ff] text-[#0a1628] hover:bg-[#00e5ff]/80">
                    <GitCompare className="h-4 w-4 mr-2" /> {isLoading ? "Comparing..." : "Run Comparison"}
                  </Button>
                </div>
              </Card>
              )}

              {/* Comparison Results */}
              {showSpecResults && (
              <Card className={`${bgCard} border ${borderColor}`}>
                <div className={`px-6 py-4 border-b ${borderColor} flex items-center justify-between`}>
                  <h3 className={`text-lg font-bold ${textPrimary}`}>Comparison Results</h3>
                  <div className="flex gap-2">
                    <span className="px-2 py-1 rounded text-xs bg-[#f44336]/20 text-[#f44336]">4 Differences Found</span>
                  </div>
                </div>
                
                <div className="p-6 space-y-4">
                  {specCompareResults.map((section) => (
                    <div key={section.id} className={`rounded-lg border ${borderColor} overflow-hidden`}>
                      <div className={`${isDarkMode ? "bg-[#1e4976]/30" : "bg-[#f1f5f9]"} px-4 py-3 flex items-center justify-between`}>
                        <h4 className={`font-semibold ${textPrimary}`}>{section.title}</h4>
                        <div className="flex items-center gap-2">
                          {comparisonFlags[section.id]?.status && (
                            <span className={`px-2 py-1 rounded text-xs ${
                              comparisonFlags[section.id]?.status === "ignore" ? "bg-gray-500/20 text-gray-400" :
                              comparisonFlags[section.id]?.status === "customization" ? "bg-[#2196f3]/20 text-[#2196f3]" :
                              "bg-[#f44336]/20 text-[#f44336]"
                            }`}>
                              {comparisonFlags[section.id]?.status === "ignore" ? "Ignored" : comparisonFlags[section.id]?.status === "customization" ? "Customization" : "Flagged"}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 divide-x divide-[#1e4976]/30">
                        <div className={`p-4 ${isDarkMode ? "bg-[#0a1628]" : "bg-white"}`}>
                          <p className={`text-xs font-medium mb-2 ${textSecondary}`}>Client Spec</p>
                          <p className={`text-sm whitespace-pre-line ${textPrimary}`}>{section.left}</p>
                        </div>
                        <div className={`p-4 ${isDarkMode ? "bg-[#0a1628]" : "bg-white"}`}>
                          <p className={`text-xs font-medium mb-2 ${textSecondary}`}>Admin Spec</p>
                          <p className={`text-sm whitespace-pre-line ${textPrimary}`}>{section.right}</p>
                        </div>
                      </div>
                      <div className={`px-4 py-3 border-t ${borderColor} flex items-center justify-between gap-4`}>
                        <div className="flex gap-2">
                          <Button size="sm" variant={comparisonFlags[section.id]?.status === "ignore" ? "default" : "outline"} onClick={() => updateFlag(section.id, "ignore")} className="text-xs">Ignore</Button>
                          <Button size="sm" variant={comparisonFlags[section.id]?.status === "customization" ? "default" : "outline"} onClick={() => updateFlag(section.id, "customization")} className="text-xs">Customization</Button>
                          <Button size="sm" variant={comparisonFlags[section.id]?.status === "flag" ? "default" : "outline"} onClick={() => updateFlag(section.id, "flag")} className="text-xs">Flag</Button>
                        </div>
                        <Input placeholder="Add note..." value={comparisonFlags[section.id]?.note || ""} onChange={(e) => updateNote(section.id, e.target.value)} className={`flex-1 max-w-xs text-sm ${isDarkMode ? "bg-[#0a1628] border-[#1e4976]" : ""}`} />
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className={`px-6 py-4 border-t ${borderColor} flex justify-between items-center`}>
                  <span className={`text-sm ${textSecondary}`}>{Object.keys(comparisonFlags).filter(k => comparisonFlags[k]?.status).length} of {specCompareResults.length} differences resolved</span>
                  <div className="flex gap-3">
                    <Button variant="outline"><Download className="h-4 w-4 mr-2" /> Export Report</Button>
                    <Button disabled={!allActionsSelected} className="bg-[#00e5ff] text-[#0a1628] hover:bg-[#00e5ff]/80"><CheckCircle className="h-4 w-4 mr-2" /> Complete Review</Button>
                  </div>
                </div>
              </Card>
              )}
            </div>
          </div>
        </div>
      )
    }

    // Ad-hoc Mode: Tools -> Spec Compare (select any specs)
    return (
      <div className={`min-h-screen ${bgPrimary} flex`}>
        <Sidebar />
        <div className="flex-1 overflow-auto">
          <header className={`${bgSecondary} border-b ${borderColor} px-6 py-4`}>
<button onClick={() => { setShowSpecResults(false); setShowStandardizedSpecs(false); setSelectedAdminSpecForResults(null); setCurrentScreen("dashboard"); }} className={`flex items-center gap-2 mb-2 ${textSecondary} hover:text-[#00e5ff]`}>
  <ArrowLeft className="h-4 w-4" /> Back
  </button>
  <h1 className={`text-2xl font-bold ${textPrimary}`}>Spec Comparison</h1>
  <p className={textSecondary}>Compare any admin spec with any client spec</p>
          </header>

          <div className="p-6">
            <Card className={`${bgCard} p-6 border ${borderColor} mb-6`}>
              <h3 className={`text-lg font-bold mb-4 ${textPrimary}`}>Select Specifications</h3>
              <div className="grid grid-cols-2 gap-6">
{/* Client Spec */}
  <div>
  <label className={`block text-sm font-medium mb-2 ${textPrimary}`}>Select Client Spec</label>
  {selectedRole === "client" ? (
  <div className={`border-2 ${borderColor} rounded-lg p-4`}>
  <div className="flex items-center gap-3 mb-3">
  <FileText className={`h-8 w-8 ${textSecondary}`} />
  <div>
  <p className={`font-medium ${textPrimary}`}>Select From Client Specs</p>
  <p className={`text-xs ${textSecondary}`}>Choose from uploaded specifications</p>
  </div>
  </div>
  <select className={`w-full p-2 rounded border ${borderColor} ${isDarkMode ? "bg-[#0a1628] text-white" : "bg-white text-[#0a1628]"}`}>
  <option value="">Choose a spec...</option>
  <option value="client_eq_42_v1">Equities - FIX 4.2 (client_eq_42_v1.xml)</option>
  <option value="client_eq_44_v2">Equities - FIX 4.4 (client_eq_44_v2.xml)</option>
  <option value="client_opt_44_v1">Options - FIX 4.4 (client_opt_44_v1.xml)</option>
  <option value="client_fut_50sp2_v1">Futures - FIX 5.0 SP2 (client_fut_50sp2_v1.xml)</option>
  </select>
  </div>
  ) : (
  <div className={`border-2 ${borderColor} rounded-lg p-4`}>
  <div className="flex items-center gap-3 mb-3">
  <FileText className={`h-8 w-8 ${textSecondary}`} />
  <div>
  <p className={`font-medium ${textPrimary}`}>Select Client Spec</p>
  <p className={`text-xs ${textSecondary}`}>Choose from client uploaded specifications</p>
  </div>
  </div>
  <div className="space-y-3">
  <div>
  <label className={`text-xs ${textSecondary} mb-1 block`}>Client</label>
  <select className={`w-full p-2 rounded border ${borderColor} ${isDarkMode ? "bg-[#0a1628] text-white" : "bg-white text-[#0a1628]"}`}>
  <option value="">Select a client...</option>
  <option value="nexus">Nexus Trading Group</option>
  <option value="apex">Apex Capital Partners</option>
  <option value="horizon">Horizon Investments</option>
  <option value="velocity">Velocity Securities</option>
  </select>
  </div>
  <div className="grid grid-cols-2 gap-3">
  <div>
  <label className={`text-xs ${textSecondary} mb-1 block`}>Asset Class</label>
  <select className={`w-full p-2 rounded border ${borderColor} ${isDarkMode ? "bg-[#0a1628] text-white" : "bg-white text-[#0a1628]"}`}>
  <option value="">Select asset...</option>
  <option value="equities">Equities</option>
  <option value="options">Options</option>
  <option value="futures">Futures</option>
  <option value="fixed-income">Fixed Income</option>
  <option value="fx">FX</option>
  </select>
  </div>
  <div>
  <label className={`text-xs ${textSecondary} mb-1 block`}>FIX Version</label>
  <select className={`w-full p-2 rounded border ${borderColor} ${isDarkMode ? "bg-[#0a1628] text-white" : "bg-white text-[#0a1628]"}`}>
  <option value="">Select version...</option>
  <option value="fix42">FIX 4.2</option>
  <option value="fix44">FIX 4.4</option>
  <option value="fix50">FIX 5.0</option>
  <option value="fix50sp2">FIX 5.0 SP2</option>
  </select>
  </div>
  </div>
  <div>
  <label className={`text-xs ${textSecondary} mb-1 block`}>Standardized Spec Version</label>
  <select className={`w-full p-2 rounded border ${borderColor} ${isDarkMode ? "bg-[#0a1628] text-white" : "bg-white text-[#0a1628]"}`}>
  <option value="">Select standardized spec...</option>
<option value="v1.2-std">client_eq_44_v1.2_Standardized.xlsx (Apr 13, 2026)</option>
              <option value="v1.1-std">client_eq_44_v1.1_Standardized.xlsx (Apr 9, 2026)</option>
  </select>
  </div>
  </div>
  </div>
  )}
                </div>
                
                {/* Admin Spec - Always select from dropdown */}
                <div>
<label className={`block text-sm font-medium mb-2 ${textPrimary}`}>Select Admin Spec</label>
  {showSpecResults && selectedAdminSpecForResults ? (
  <div className={`border-2 ${borderColor} rounded-lg p-4`}>
  <div className="flex items-center gap-3">
  <div className={`flex items-center gap-2 px-3 py-2 rounded ${isDarkMode ? "bg-[#4caf50]/20" : "bg-[#4caf50]/10"} border border-[#4caf50]/30`}>
  <CheckCircle className="h-5 w-5 text-[#4caf50]" />
  <span className={`font-medium ${textPrimary}`}>{selectedAdminSpecForResults}</span>
                  </div>
                </div>
              </div>
            ) : null}
            </div>

            {showLogResults && (
              <Card className={`${bgCard} p-6 border ${borderColor}`}>
                <h2 className={`text-xl font-bold mb-6 ${textPrimary}`}>Spec Violations Found in Logs</h2>
                
                <div className="grid grid-cols-12 gap-4 mb-4">
                  <div className="col-span-5"><h3 className={`font-bold text-[#f44336]`}>Log Issues</h3></div>
                  <div className="col-span-5"><h3 className={`font-bold text-[#00e5ff]`}>Spec Requirements</h3></div>
                  <div className="col-span-2"><h3 className={`font-bold text-[#00e5ff]`}>Action</h3></div>
                </div>

                {logAnalysisResults.map((section, i) => (
                  <div key={section.id} className={`border-t ${borderColor} py-4`}>
                    <h4 className={`font-semibold mb-3 ${textPrimary}`}>{i + 1}. {section.title}</h4>
                    <div className="grid grid-cols-12 gap-4">
                      <div className={`col-span-5 p-3 rounded bg-[#f44336]/10 border border-[#f44336]/30`}>
                        <pre className={`text-sm whitespace-pre-wrap text-[#f44336]`}>{section.left}</pre>
                      </div>
                      <div className={`col-span-5 p-3 rounded ${isDarkMode ? "bg-[#0a1628]" : "bg-[#f1f5f9]"}`}>
                        <pre className={`text-sm whitespace-pre-wrap ${textSecondary}`}>{section.right}</pre>
                      </div>
                      <div className="col-span-2 space-y-2">
                        <div className="flex flex-col gap-1">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input 
                              type="checkbox" 
                              checked={logAnalysisFlags[section.id]?.status === "ignore"}
                              onChange={() => updateLogFlag(section.id, logAnalysisFlags[section.id]?.status === "ignore" ? null : "ignore")}
                              className="rounded"
                            />
                            <span className={`text-xs ${textSecondary}`}>Ignore</span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input 
                              type="checkbox" 
                              checked={logAnalysisFlags[section.id]?.status === "customization"}
                              onChange={() => updateLogFlag(section.id, logAnalysisFlags[section.id]?.status === "customization" ? null : "customization")}
                              className="rounded"
                            />
                            <span className={`text-xs ${textSecondary}`}>Customization</span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input 
                              type="checkbox" 
                              checked={logAnalysisFlags[section.id]?.status === "flag"}
                              onChange={() => updateLogFlag(section.id, logAnalysisFlags[section.id]?.status === "flag" ? null : "flag")}
                              className="rounded"
                            />
                            <span className={`text-xs ${textSecondary}`}>Flag</span>
                          </label>
                        </div>
                        <Input
                          placeholder="Add note..."
                          value={logAnalysisFlags[section.id]?.note || ""}
                          onChange={(e) => updateLogNote(section.id, e.target.value)}
                          className={`h-7 text-xs ${isDarkMode ? "bg-[#0a1628] border-[#1e4976]" : ""}`}
                        />
                      </div>
                    </div>
                  </div>
                ))}

                {/* Navigation */}
                <div className={`mt-6 pt-4 border-t ${borderColor} flex justify-between`}>
<Button variant="outline" onClick={() => { setShowSpecResults(false); setCurrentScreen("spec-compare"); }}>
  <ChevronLeft className="h-4 w-4 mr-2" /> Back: Spec Compare
  </Button>
                  <Button onClick={() => setCurrentScreen("scenario-creation")}>
                    Next: Scenario Creation <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    )
  }

  // Scenario Creation Screen
  if (currentScreen === "scenario-creation") {
    const sampleScenarios = [
      { id: 1, name: "New Order Single - Buy", type: "order", source: "log", status: "valid", msgType: "D" },
      { id: 2, name: "Order Cancel Request", type: "cancel", source: "spec", status: "valid", msgType: "F" },
      { id: 3, name: "Execution Report - Fill", type: "execution", source: "both", status: "warning", msgType: "8" },
      { id: 4, name: "Order Cancel Reject", type: "cancel", source: "log", status: "error", msgType: "9" },
    ]

    return (
      <div className={`min-h-screen ${bgPrimary} flex`}>
        <Sidebar />
        <div className="flex-1 overflow-auto">
          <header className={`${bgSecondary} border-b ${borderColor} px-6 py-4`}>
            <button onClick={() => isAdHocMode ? setCurrentScreen("dashboard") : setCurrentScreen("asset-tools")} className={`flex items-center gap-2 mb-2 ${textSecondary} hover:text-[#00e5ff]`}>
              <ArrowLeft className="h-4 w-4" /> Back
            </button>
            <h1 className={`text-2xl font-bold ${textPrimary}`}>Scenario Creation {isAdHocMode && "(Ad-hoc)"}</h1>
          </header>

          <div className="p-6">
            <Card className={`${bgCard} p-6 border ${borderColor} mb-6`}>
              <h3 className={`text-lg font-bold mb-4 ${textPrimary}`}>Select Sources</h3>
              <div className="grid grid-cols-2 gap-6">
                {/* Log File */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${textPrimary}`}>
                    {selectedRole === "client" ? "My Log File" : `${selectedClient?.name || "Client"} Log File`}
                  </label>
                  {selectedRole === "client" ? (
                    <label className={`border-2 border-dashed ${borderColor} rounded-lg p-6 text-center hover:border-[#00e5ff] cursor-pointer transition-colors block`}>
                      <input type="file" className="hidden" accept=".log,.txt" />
                      <FileText className={`h-10 w-10 mx-auto mb-3 ${textSecondary}`} />
                      <p className={`font-medium ${textPrimary}`}>Upload Log File</p>
                      <p className={`text-xs mt-1 ${textSecondary}`}>Click to browse</p>
                    </label>
                  ) : (
                    <div className={`border-2 ${borderColor} rounded-lg p-4`}>
                      <div className="flex items-center gap-3 mb-3">
                        <FileSearch className={`h-8 w-8 ${textSecondary}`} />
                        <div>
                          <p className={`font-medium ${textPrimary}`}>Client Log Files</p>
                          <p className={`text-xs ${textSecondary}`}>Select from uploaded logs</p>
                        </div>
                      </div>
                      <select className={`w-full p-2 rounded border ${borderColor} ${isDarkMode ? "bg-[#0a1628] text-white" : "bg-white text-[#0a1628]"}`}>
                        <option value="">Choose a log file...</option>
              <option value="log1">{selectedClient?.name || "Client"}_session_20260413.log</option>
              <option value="log2">{selectedClient?.name || "Client"}_session_20260409.log</option>
              <option value="log3">{selectedClient?.name || "Client"}_session_20260404.log</option>
                      </select>
                      <div className="mt-3 pt-3 border-t border-dashed border-[#1e4976]/50">
                        <Button variant="outline" size="sm" className="w-full text-xs">
                          <Mail className="h-3 w-3 mr-2" /> Request Log File from Client
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
                {/* FIX Spec */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${textPrimary}`}>Admin Spec</label>
                  <div className={`border-2 ${borderColor} rounded-lg p-4`}>
                    <div className="flex items-center gap-3 mb-3">
                      <FileText className={`h-8 w-8 ${textSecondary}`} />
                      <div>
                        <p className={`font-medium ${textPrimary}`}>Select From Admin Specs</p>
                        <p className={`text-xs ${textSecondary}`}>Choose a specification</p>
                      </div>
                    </div>
<select className={`w-full p-2 rounded border ${borderColor} ${isDarkMode ? "bg-[#0a1628] text-white" : "bg-white text-[#0a1628]"}`}>
  <option value="">Choose a standardized spec...</option>
    <option value="equities-4.2-std">Equities FIX 4.2 v1.2 - Standardized</option>
    <option value="equities-4.4-std">Equities FIX 4.4 v2.1 - Standardized</option>
    <option value="options-4.4-std">Options FIX 4.4 v2.0 - Standardized</option>
    <option value="futures-5.0-std">Futures FIX 5.0 SP2 v2.0 - Standardized</option>
  </select>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex justify-center">
                <Button onClick={() => simulateTask(() => setShowScenarioResults(true))} disabled={isLoading}><Play className="h-4 w-4 mr-2" /> {isLoading ? "Processing..." : "Run Sample"}</Button>
              </div>
            </Card>

            {showScenarioResults && (
              <Card className={`${bgCard} p-6 border ${borderColor}`}>
                <div className="flex justify-between items-center mb-4">
                  <h2 className={`text-xl font-bold ${textPrimary}`}>Generated Scenarios</h2>
                  <div className="flex gap-2">
                    {["all", "valid", "warning", "error"].map((f) => (
                      <button key={f} onClick={() => setScenarioFilter(f)} className={`px-3 py-1 rounded text-sm ${scenarioFilter === f ? "bg-[#00e5ff] text-[#0a1628]" : `${isDarkMode ? "bg-[#1e4976]/30" : "bg-[#e2e8f0]"} ${textSecondary}`}`}>
                        {f.charAt(0).toUpperCase() + f.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  {sampleScenarios.filter(s => scenarioFilter === "all" || s.status === scenarioFilter).map((s) => (
                    <div key={s.id} className={`flex items-center justify-between p-3 rounded border ${borderColor} ${isDarkMode ? "bg-[#0a1628]/50" : "bg-[#f8fafc]"}`}>
                      <div className="flex items-center gap-3">
                        <input type="checkbox" defaultChecked={s.status === "valid"} className="h-4 w-4" />
                        <div>
                          <p className={`font-medium ${textPrimary}`}>{s.name}</p>
                          <p className={`text-xs ${textSecondary}`}>MsgType: {s.msgType} | Source: {s.source}</p>
                        </div>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs ${s.status === "valid" ? "bg-[#4caf50]/20 text-[#4caf50]" : s.status === "warning" ? "bg-[#ff9800]/20 text-[#ff9800]" : "bg-[#f44336]/20 text-[#f44336]"}`}>{s.status}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex justify-end gap-3">
                  <Button variant="outline">Export</Button>
                  <Button>Save Scenarios</Button>
                </div>

                {/* Navigation */}
                <div className={`mt-6 pt-4 border-t ${borderColor}`}>
                  <div className="flex justify-between items-center">
                    <Button variant="outline" onClick={() => setCurrentScreen("test-case-gen")}>
                      <ChevronLeft className="h-4 w-4 mr-2" /> Back: Log Analysis
                    </Button>
                    <div className="flex gap-3">
                      <Button variant="outline" onClick={() => setCurrentScreen("test-case-gen")}>
                        <VerifixLogo size={16} /> Testing <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                      <Button onClick={() => setCurrentScreen("certification-gen")}>
                        <ConductorLogo size={16} /> Certification <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    )
  }

  // Reg Test Case Generation (VeriFIX)
  if (currentScreen === "test-case-gen") {
    // Asset classes with their available specs/logs - suite status comes from state
    const regTestAssetClasses = [
      {
        asset: "Equities",
        versions: [
          { protocol: "FIX 4.2", spec: "client_eq_42_standardized.xlsx", logs: [] },
          { protocol: "FIX 4.4", spec: "client_eq_44_standardized.xlsx", logs: ["eq_fix44_20260412.log"] },
        ]
      },
      {
        asset: "Options",
        versions: [
          { protocol: "FIX 4.4", spec: "client_opt_44_standardized.xlsx", logs: [] },
        ]
      },
      {
        asset: "Futures",
        versions: [
          { protocol: "FIX 4.2", spec: null, logs: [] },
          { protocol: "FIX 5.0 SP2", spec: "client_fut_50sp2_standardized.xlsx", logs: ["fut_fix50_20260404.log"] },
        ]
      },
      {
        asset: "Fixed Income",
        versions: [
          { protocol: "FIX 4.4", spec: null, logs: ["fi_fix44_20260409.log"] },
        ]
      },
      {
        asset: "FX",
        versions: [
          { protocol: "FIX 5.0 SP2", spec: null, logs: [] },
        ]
      },
    ]
    
    // Helper to check if a suite exists
    const getSuiteInfo = (asset: string, protocol: string) => {
      const key = `${asset}-${protocol}`;
      return generatedRegSuites[key] || null;
    }

    // Grouped test cases for viewing existing suites
    const testCaseGroups = [
      {
        group: "Order Entry Tests",
        cases: [
          { id: "TC001", name: "New Order - Market Order", status: "ready" },
          { id: "TC002", name: "New Order - Limit Order", status: "ready" },
          { id: "TC003", name: "New Order - Stop Order", status: "ready" },
          { id: "TC004", name: "New Order - Invalid Symbol", status: "ready" },
        ]
      },
      {
        group: "Order Modification Tests",
        cases: [
          { id: "TC010", name: "Cancel Request - Active Order", status: "ready" },
          { id: "TC011", name: "Cancel Request - Filled Order", status: "ready" },
          { id: "TC012", name: "Cancel/Replace - Qty Change", status: "ready" },
          { id: "TC013", name: "Cancel/Replace - Price Change", status: "ready" },
        ]
      },
      {
        group: "Execution Tests",
        cases: [
          { id: "TC020", name: "Full Fill Execution", status: "ready" },
          { id: "TC021", name: "Partial Fill Execution", status: "ready" },
          { id: "TC022", name: "Multiple Partial Fills", status: "ready" },
        ]
      },
      {
        group: "Reject & Error Handling",
        cases: [
          { id: "TC030", name: "Business Reject - Invalid Value", status: "ready" },
          { id: "TC031", name: "Order Reject - Insufficient Qty", status: "ready" },
          { id: "TC032", name: "Session Reject - Invalid Tag", status: "ready" },
        ]
      },
    ]

    // Ad-hoc mode: Show step-by-step workflow
    if (isAdHocMode) {
      return (
        <div className={`min-h-screen ${bgPrimary} flex`}>
          <Sidebar />
          <div className="flex-1 overflow-auto">
            <header className={`${bgSecondary} border-b ${borderColor} px-6 py-4`}>
              <button onClick={() => setCurrentScreen("dashboard")} className={`flex items-center gap-2 mb-2 ${textSecondary} hover:text-[#00e5ff]`}>
                <ArrowLeft className="h-4 w-4" /> Back to Dashboard
              </button>
              <div className="flex items-center gap-3">
                <VerifixLogo size={32} />
                <h1 className={`text-2xl font-bold ${textPrimary}`}>Testing (Ad-hoc)</h1>
              </div>
              <p className={`text-sm ${textSecondary} mt-1`}>Generate regression test cases from specs, logs, or scenarios</p>
            </header>

            <div className="p-6">
              {/* Step 1: Select Source */}
              <Card className={`${bgCard} p-6 border ${borderColor} mb-6`}>
                <h3 className={`text-lg font-bold mb-4 ${textPrimary}`}>Step 1: Select Test Case Source</h3>
                <p className={`mb-4 ${textSecondary}`}>Choose a source to generate test cases from - a standardized spec, log file, or existing scenarios.</p>
                
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <button 
                    onClick={() => setRegTestSource("spec")}
                    className={`p-4 rounded-lg border-2 transition-all ${regTestSource === "spec" ? "border-[#00e5ff] bg-[#00e5ff]/10" : `border-[#1e4976]/50 hover:border-[#00e5ff]/50`}`}
                  >
                    <FileText className={`h-8 w-8 mx-auto mb-2 ${regTestSource === "spec" ? "text-[#00e5ff]" : textSecondary}`} />
                    <p className={`font-medium ${textPrimary}`}>Standardized Spec</p>
                    <p className={`text-xs ${textSecondary}`}>Generate from FIX spec</p>
                  </button>
                  <button 
                    onClick={() => setRegTestSource("log")}
                    className={`p-4 rounded-lg border-2 transition-all ${regTestSource === "log" ? "border-[#00e5ff] bg-[#00e5ff]/10" : `border-[#1e4976]/50 hover:border-[#00e5ff]/50`}`}
                  >
                    <FileSearch className={`h-8 w-8 mx-auto mb-2 ${regTestSource === "log" ? "text-[#00e5ff]" : textSecondary}`} />
                    <p className={`font-medium ${textPrimary}`}>Log File</p>
                    <p className={`text-xs ${textSecondary}`}>Extract from FIX logs</p>
                  </button>
                  <button 
                    onClick={() => setRegTestSource("scenario")}
                    className={`p-4 rounded-lg border-2 transition-all ${regTestSource === "scenario" ? "border-[#00e5ff] bg-[#00e5ff]/10" : `border-[#1e4976]/50 hover:border-[#00e5ff]/50`}`}
                  >
                    <Activity className={`h-8 w-8 mx-auto mb-2 ${regTestSource === "scenario" ? "text-[#00e5ff]" : textSecondary}`} />
                    <p className={`font-medium ${textPrimary}`}>Scenarios</p>
                    <p className={`text-xs ${textSecondary}`}>Use created scenarios</p>
                  </button>
                </div>

                {/* Spec Upload/Selection */}
                {regTestSource === "spec" && (
                  <div className={`p-4 rounded border ${borderColor} ${isDarkMode ? "bg-[#0a1628]/50" : "bg-[#f8fafc]"}`}>
                    <h4 className={`font-medium mb-3 ${textPrimary}`}>Upload or Select Spec</h4>
                    <label className={`border-2 border-dashed ${borderColor} rounded-lg p-8 text-center hover:border-[#00e5ff] cursor-pointer block transition-colors`}>
                      <input type="file" className="hidden" accept=".xlsx,.xls,.csv" />
                      <Upload className={`h-10 w-10 mx-auto mb-3 ${textSecondary}`} />
                      <p className={textPrimary}>Drop FIX spec file here or click to browse</p>
                      <p className={`text-xs ${textSecondary} mt-1`}>Supports .xlsx, .xls, .csv formats</p>
                    </label>
                  </div>
                )}

                {/* Log File Upload/Selection */}
                {regTestSource === "log" && (
                  <div className={`p-4 rounded border ${borderColor} ${isDarkMode ? "bg-[#0a1628]/50" : "bg-[#f8fafc]"}`}>
                    <h4 className={`font-medium mb-3 ${textPrimary}`}>Upload or Select Log File</h4>
                    <label className={`border-2 border-dashed ${borderColor} rounded-lg p-8 text-center hover:border-[#00e5ff] cursor-pointer block transition-colors`}>
                      <input type="file" className="hidden" accept=".log,.txt,.fix" />
                      <Upload className={`h-10 w-10 mx-auto mb-3 ${textSecondary}`} />
                      <p className={textPrimary}>Drop FIX log file here or click to browse</p>
                      <p className={`text-xs ${textSecondary} mt-1`}>Supports .log, .txt, .fix formats</p>
                    </label>
                  </div>
                )}

                {/* Scenario Selection */}
                {regTestSource === "scenario" && (
                  <div className={`p-4 rounded border ${borderColor} ${isDarkMode ? "bg-[#0a1628]/50" : "bg-[#f8fafc]"}`}>
                    <h4 className={`font-medium mb-3 ${textPrimary}`}>Load Scenarios</h4>
                    <div className="flex gap-4">
                      <Button variant="outline" onClick={() => setCurrentScreen("scenario-creation")}>
                        <Activity className="h-4 w-4 mr-2" /> Go to Scenario Creation
                      </Button>
                      <label className={`border-2 border-dashed ${borderColor} rounded-lg px-6 py-3 hover:border-[#00e5ff] cursor-pointer flex items-center gap-2 transition-colors`}>
                        <input type="file" className="hidden" accept=".json,.xml" />
                        <Upload className={`h-5 w-5 ${textSecondary}`} />
                        <span className={textSecondary}>Upload Scenario File</span>
                      </label>
                    </div>
                  </div>
                )}
              </Card>

              {/* Step 2: Generate Test Cases */}
              {regTestSource && (
                <Card className={`${bgCard} p-6 border ${borderColor} mb-6`}>
                  <h3 className={`text-lg font-bold mb-4 ${textPrimary}`}>Step 2: Generate Regression Test Suite</h3>
                  <p className={`mb-4 ${textSecondary}`}>Analyze the selected source and generate test cases.</p>
                  <Button 
                    onClick={async () => {
                      setGeneratingRegTest("adhoc");
                      await new Promise(resolve => setTimeout(resolve, 2000));
                      setShowTestCaseResults(true);
                      setGeneratingRegTest(null);
                    }} 
                    disabled={generatingRegTest !== null}
                  >
                    {generatingRegTest === "adhoc" ? (
                      <><div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div> Generating...</>
                    ) : (
                      <><Play className="h-4 w-4 mr-2" /> Generate Test Cases</>
                    )}
                  </Button>
                </Card>
              )}

              {/* Step 3: Review & Export Test Cases */}
              {showTestCaseResults && (
                <Card className={`${bgCard} p-6 border ${borderColor} mb-6`}>
                  <h3 className={`text-lg font-bold mb-4 ${textPrimary}`}>Step 3: Review Test Cases</h3>
                  <p className={`mb-4 ${textSecondary}`}>Review generated test cases grouped by category. Select which to include in VeriFIX export.</p>
                  
                  <div className="space-y-4">
                    {testCaseGroups.map((group, gi) => (
                      <div key={gi} className={`border ${borderColor} rounded-lg overflow-hidden`}>
                        <div className={`px-4 py-3 ${isDarkMode ? "bg-[#1e4976]/30" : "bg-[#f1f5f9]"} flex items-center justify-between`}>
                          <div className="flex items-center gap-3">
                            <input type="checkbox" defaultChecked className="h-4 w-4" />
                            <span className={`font-medium ${textPrimary}`}>{group.group}</span>
                            <span className={`text-xs ${textSecondary}`}>({group.cases.length} tests)</span>
                          </div>
                          <ChevronDown className={`h-4 w-4 ${textSecondary}`} />
                        </div>
                        <div className="divide-y divide-[#1e4976]/30">
                          {group.cases.map((tc, ti) => (
                            <div key={ti} className={`flex items-center justify-between px-4 py-2 ${isDarkMode ? "bg-[#0a1628]/50" : "bg-white"}`}>
                              <div className="flex items-center gap-3 pl-6">
                                <input type="checkbox" defaultChecked className="h-4 w-4" />
                                <span className={`text-sm font-mono ${textSecondary}`}>{tc.id}</span>
                                <span className={`text-sm ${textPrimary}`}>{tc.name}</span>
                              </div>
                              <span className="px-2 py-1 rounded text-xs bg-[#4caf50]/20 text-[#4caf50]">Ready</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-4 mt-6">
                    <Button>
                      <VerifixLogo size={16} /> Export to VeriFIX
                    </Button>
                    <Button variant="outline"><Download className="h-4 w-4 mr-2" /> Download Suite</Button>
                  </div>
                </Card>
              )}

              {/* Launch VeriFIX */}
              {showTestCaseResults && (
                <Card className={`${bgCard} p-6 border ${borderColor}`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className={`text-lg font-bold ${textPrimary}`}>Launch VeriFIX</h3>
                      <p className={`${textSecondary}`}>Open VeriFIX to run your regression test cases</p>
                    </div>
                    <Button>
                      <VerifixLogo size={20} /> Launch VeriFIX
                    </Button>
                  </div>
                </Card>
              )}
            </div>
          </div>
        </div>
      )
    }

    // Client mode: Show asset class-based view with pre-generated suites
    return (
      <div className={`min-h-screen ${bgPrimary} flex`}>
        <Sidebar />
        <div className="flex-1 overflow-auto">
          <header className={`${bgSecondary} border-b ${borderColor} px-6 py-4`}>
            <button onClick={() => setCurrentScreen("asset-tools")} className={`flex items-center gap-2 mb-2 ${textSecondary} hover:text-[#00e5ff]`}>
              <ArrowLeft className="h-4 w-4" /> Back
            </button>
            <div className="flex items-center gap-3">
              <VerifixLogo size={32} />
              <h1 className={`text-2xl font-bold ${textPrimary}`}>Testing</h1>
            </div>
            <p className={`text-sm ${textSecondary} mt-1`}>Manage regression test suites for {selectedClient?.name || "client"} by asset class</p>
          </header>

          <div className="p-6">
            {/* Asset Class Test Suites */}
            <div className="space-y-6">
              {regTestAssetClasses.map((assetClass) => (
                <Card key={assetClass.asset} className={`${bgCard} border ${borderColor}`}>
                  <div className={`px-6 py-4 border-b ${borderColor}`}>
                    <h2 className={`text-lg font-bold ${textPrimary}`}>{assetClass.asset}</h2>
                  </div>
                  
                  <div className="divide-y divide-[#1e4976]/30">
                    {assetClass.versions.map((version) => {
                      const suiteInfo = getSuiteInfo(assetClass.asset, version.protocol);
                      const suiteKey = `${assetClass.asset}-${version.protocol}`;
                      
                      return (
                      <div key={suiteKey} className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <span className={`font-medium ${textPrimary}`}>{version.protocol}</span>
                              {suiteInfo ? (
                                <span className="px-2 py-1 rounded text-xs bg-[#4caf50]/20 text-[#4caf50]">Suite Generated</span>
                              ) : (
                                <span className="px-2 py-1 rounded text-xs bg-[#ff9800]/20 text-[#ff9800]">No Suite</span>
                              )}
                            </div>
                            
                            {suiteInfo ? (
                              <div className={`${isDarkMode ? "bg-[#0a1628]/50" : "bg-[#f8fafc]"} rounded-lg p-4 mt-3`}>
                                <div className="flex items-center gap-4 mb-3">
                                  <div className="flex items-center gap-2">
                                    <VerifixLogo size={20} />
                                    <span className={`font-medium ${textPrimary}`}>{suiteInfo.suiteName}</span>
                                  </div>
                                  <span className={`text-xs ${textSecondary}`}>{suiteInfo.testCount} test cases</span>
                                  <span className={`text-xs ${textSecondary}`}>Generated: {suiteInfo.lastGenerated}</span>
                                </div>
                                <div className="flex gap-2">
                                  <Button size="sm" variant="outline" onClick={() => { setShowTestCaseResults(true); }}>
                                    <Eye className="h-3 w-3 mr-1" /> View Tests
                                  </Button>
                                  <Button size="sm" variant="outline">
                                    <Download className="h-3 w-3 mr-1" /> Export
                                  </Button>
                                  <Button size="sm" className="bg-[#00e5ff] text-[#0a1628] hover:bg-[#00e5ff]/80">
                                    <VerifixLogo size={14} /> Run in VeriFIX
                                  </Button>
                                  <Button size="sm" variant="outline" className="text-[#ff9800] border-[#ff9800]/30 hover:bg-[#ff9800]/10">
                                    <RefreshCw className="h-3 w-3 mr-1" /> Regenerate
                                  </Button>
                                </div>
                              </div>
                            ) : (
                              <div className={`${isDarkMode ? "bg-[#0a1628]/50" : "bg-[#f8fafc]"} rounded-lg p-4 mt-3`}>
                                {generatingRegTest === suiteKey ? (
                                  <div className="flex items-center gap-3">
                                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-[#00e5ff] border-t-transparent"></div>
                                    <span className={textPrimary}>Generating regression test suite...</span>
                                  </div>
                                ) : (
                                  <>
                                    <p className={`text-sm ${textSecondary} mb-3`}>Generate a regression test suite from:</p>
                                    <div className="flex flex-wrap gap-2">
                                      {version.spec && (
                                        <Button 
                                          size="sm" 
                                          variant="outline"
                                          disabled={generatingRegTest !== null}
                                          onClick={async () => { 
                                            setGeneratingRegTest(suiteKey);
                                            setRegTestSource("spec"); 
                                            await new Promise(resolve => setTimeout(resolve, 2000));
                                            // Generate suite name based on asset/protocol
                                            const assetCode = assetClass.asset.substring(0, 3).toUpperCase();
                                            const protocolCode = version.protocol.replace(/\s+/g, "").replace(".", "");
                                            const today = new Date();
                                            const dateStr = today.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
                                            setGeneratedRegSuites(prev => ({
                                              ...prev,
                                              [suiteKey]: {
                                                suiteName: `${assetCode}_${protocolCode}_RegTests_v1.0`,
                                                testCount: Math.floor(Math.random() * 15) + 12,
                                                lastGenerated: dateStr
                                              }
                                            }));
                                            setGeneratingRegTest(null);
                                          }}
                                        >
                                          <FileText className="h-3 w-3 mr-1" /> Spec: {version.spec}
                                        </Button>
                                      )}
                                      {version.logs && version.logs.length > 0 && version.logs.map((log, li) => (
                                        <Button 
                                          key={li}
                                          size="sm" 
                                          variant="outline"
                                          disabled={generatingRegTest !== null}
                                          onClick={async () => { 
                                            setGeneratingRegTest(suiteKey);
                                            setRegTestSource("log"); 
                                            await new Promise(resolve => setTimeout(resolve, 2000));
                                            // Generate suite name based on asset/protocol
                                            const assetCode = assetClass.asset.substring(0, 3).toUpperCase();
                                            const protocolCode = version.protocol.replace(/\s+/g, "").replace(".", "");
                                            const today = new Date();
                                            const dateStr = today.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
                                            setGeneratedRegSuites(prev => ({
                                              ...prev,
                                              [suiteKey]: {
                                                suiteName: `${assetCode}_${protocolCode}_RegTests_v1.0`,
                                                testCount: Math.floor(Math.random() * 15) + 12,
                                                lastGenerated: dateStr
                                              }
                                            }));
                                            setGeneratingRegTest(null);
                                          }}
                                        >
                                          <FileSearch className="h-3 w-3 mr-1" /> Log: {log}
                                        </Button>
                                      ))}
                                      <Button 
                                        size="sm" 
                                        variant="outline"
                                        disabled={generatingRegTest !== null}
                                        onClick={() => setCurrentScreen("scenario-creation")}
                                      >
                                        <Activity className="h-3 w-3 mr-1" /> From Scenarios
                                      </Button>
                                      {!version.spec && (!version.logs || version.logs.length === 0) && (
                                        <span className={`text-xs ${textSecondary} italic self-center`}>Upload spec or log files first</span>
                                      )}
                                    </div>
                                  </>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )})}
                  </div>
                </Card>
              ))}
            </div>

            {/* View Test Cases Modal/Expanded Section */}
            {showTestCaseResults && (
              <Card className={`${bgCard} p-6 border ${borderColor} mt-6`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className={`text-lg font-bold ${textPrimary}`}>Test Suite Details</h3>
                  <Button variant="outline" size="sm" onClick={() => setShowTestCaseResults(false)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <p className={`mb-4 ${textSecondary}`}>Review test cases grouped by category. Select which to include in VeriFIX export.</p>
                
                <div className="space-y-4">
                  {testCaseGroups.map((group, gi) => (
                    <div key={gi} className={`border ${borderColor} rounded-lg overflow-hidden`}>
                      <div className={`px-4 py-3 ${isDarkMode ? "bg-[#1e4976]/30" : "bg-[#f1f5f9]"} flex items-center justify-between`}>
                        <div className="flex items-center gap-3">
                          <input type="checkbox" defaultChecked className="h-4 w-4" />
                          <span className={`font-medium ${textPrimary}`}>{group.group}</span>
                          <span className={`text-xs ${textSecondary}`}>({group.cases.length} tests)</span>
                        </div>
                        <ChevronDown className={`h-4 w-4 ${textSecondary}`} />
                      </div>
                      <div className="divide-y divide-[#1e4976]/30">
                        {group.cases.map((tc, ti) => (
                          <div key={ti} className={`flex items-center justify-between px-4 py-2 ${isDarkMode ? "bg-[#0a1628]/50" : "bg-white"}`}>
                            <div className="flex items-center gap-3 pl-6">
                              <input type="checkbox" defaultChecked className="h-4 w-4" />
                              <span className={`text-sm font-mono ${textSecondary}`}>{tc.id}</span>
                              <span className={`text-sm ${textPrimary}`}>{tc.name}</span>
                            </div>
                            <span className="px-2 py-1 rounded text-xs bg-[#4caf50]/20 text-[#4caf50]">Ready</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-4 mt-6">
                  <Button>
                    <VerifixLogo size={16} /> Export to VeriFIX
                  </Button>
                  <Button variant="outline"><Download className="h-4 w-4 mr-2" /> Download Suite</Button>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    )
  }

  // Certification Case Generation (Conductor)
  if (currentScreen === "certification-gen") {
    // Asset classes with their available specs/logs - suite status comes from state
    const certTestAssetClasses = [
      {
        asset: "Equities",
        versions: [
          { protocol: "FIX 4.2", spec: "client_eq_42_standardized.xlsx", logs: [] },
          { protocol: "FIX 4.4", spec: "client_eq_44_standardized.xlsx", logs: ["eq_fix44_20260412.log"] },
        ]
      },
      {
        asset: "Options",
        versions: [
          { protocol: "FIX 4.4", spec: "client_opt_44_standardized.xlsx", logs: [] },
        ]
      },
      {
        asset: "Futures",
        versions: [
          { protocol: "FIX 4.2", spec: null, logs: [] },
          { protocol: "FIX 5.0 SP2", spec: "client_fut_50sp2_standardized.xlsx", logs: ["fut_fix50_20260404.log"] },
        ]
      },
      {
        asset: "Fixed Income",
        versions: [
          { protocol: "FIX 4.4", spec: null, logs: ["fi_fix44_20260409.log"] },
        ]
      },
      {
        asset: "FX",
        versions: [
          { protocol: "FIX 5.0 SP2", spec: null, logs: [] },
        ]
      },
    ]
    
    // Helper to check if a suite exists
    const getCertSuiteInfo = (asset: string, protocol: string) => {
      const key = `${asset}-${protocol}`;
      return generatedCertSuites[key] || null;
    }

    // Grouped certification test cases
    const certTestGroups = [
      {
        group: "Session Level Tests",
        cases: [
          { id: "CERT001", name: "Logon - Valid Credentials", status: "ready" },
          { id: "CERT002", name: "Logon - Invalid Password", status: "ready" },
          { id: "CERT003", name: "Heartbeat Exchange", status: "ready" },
          { id: "CERT004", name: "Test Request/Heartbeat", status: "ready" },
          { id: "CERT005", name: "Logout - Clean Disconnect", status: "ready" },
        ]
      },
      {
        group: "Order Entry Certification",
        cases: [
          { id: "CERT010", name: "New Order Single - All Required Fields", status: "ready" },
          { id: "CERT011", name: "New Order Single - Optional Fields", status: "ready" },
          { id: "CERT012", name: "New Order Single - Repeating Groups", status: "ready" },
          { id: "CERT013", name: "Order Acknowledgement Validation", status: "ready" },
        ]
      },
      {
        group: "Order Modification Certification",
        cases: [
          { id: "CERT020", name: "Order Cancel Request", status: "ready" },
          { id: "CERT021", name: "Order Cancel/Replace Request", status: "ready" },
          { id: "CERT022", name: "Cancel Reject Handling", status: "ready" },
        ]
      },
      {
        group: "Execution Certification",
        cases: [
          { id: "CERT030", name: "Execution Report - New", status: "ready" },
          { id: "CERT031", name: "Execution Report - Partial Fill", status: "ready" },
          { id: "CERT032", name: "Execution Report - Full Fill", status: "ready" },
          { id: "CERT033", name: "Execution Report - Trade Cancel", status: "ready" },
          { id: "CERT034", name: "Execution Report - Trade Correct", status: "ready" },
        ]
      },
      {
        group: "Error Handling Certification",
        cases: [
          { id: "CERT040", name: "Business Message Reject", status: "ready" },
          { id: "CERT041", name: "Session Level Reject", status: "ready" },
          { id: "CERT042", name: "Order Reject Handling", status: "ready" },
        ]
      },
    ]

    // Ad-hoc mode: Show step-by-step workflow
    if (isAdHocMode) {
      return (
        <div className={`min-h-screen ${bgPrimary} flex`}>
          <Sidebar />
          <div className="flex-1 overflow-auto">
            <header className={`${bgSecondary} border-b ${borderColor} px-6 py-4`}>
              <button onClick={() => setCurrentScreen("dashboard")} className={`flex items-center gap-2 mb-2 ${textSecondary} hover:text-[#00e5ff]`}>
                <ArrowLeft className="h-4 w-4" /> Back to Dashboard
              </button>
              <div className="flex items-center gap-3">
                <ConductorLogo size={32} />
                <h1 className={`text-2xl font-bold ${textPrimary}`}>Certification (Ad-hoc)</h1>
              </div>
              <p className={`text-sm ${textSecondary} mt-1`}>Generate certification test cases from specs, logs, or scenarios</p>
            </header>

            <div className="p-6">
              {/* Step 1: Select Source */}
              <Card className={`${bgCard} p-6 border ${borderColor} mb-6`}>
                <h3 className={`text-lg font-bold mb-4 ${textPrimary}`}>Step 1: Select Certification Source</h3>
                <p className={`mb-4 ${textSecondary}`}>Choose a source to generate certification test cases from.</p>
                
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <button 
                    onClick={() => setCertTestSource("spec")}
                    className={`p-4 rounded-lg border-2 transition-all ${certTestSource === "spec" ? "border-[#00e5ff] bg-[#00e5ff]/10" : `border-[#1e4976]/50 hover:border-[#00e5ff]/50`}`}
                  >
                    <FileText className={`h-8 w-8 mx-auto mb-2 ${certTestSource === "spec" ? "text-[#00e5ff]" : textSecondary}`} />
                    <p className={`font-medium ${textPrimary}`}>Standardized Spec</p>
                    <p className={`text-xs ${textSecondary}`}>Generate from FIX spec</p>
                  </button>
                  <button 
                    onClick={() => setCertTestSource("log")}
                    className={`p-4 rounded-lg border-2 transition-all ${certTestSource === "log" ? "border-[#00e5ff] bg-[#00e5ff]/10" : `border-[#1e4976]/50 hover:border-[#00e5ff]/50`}`}
                  >
                    <FileSearch className={`h-8 w-8 mx-auto mb-2 ${certTestSource === "log" ? "text-[#00e5ff]" : textSecondary}`} />
                    <p className={`font-medium ${textPrimary}`}>Log File</p>
                    <p className={`text-xs ${textSecondary}`}>Extract from FIX logs</p>
                  </button>
                  <button 
                    onClick={() => setCertTestSource("scenario")}
                    className={`p-4 rounded-lg border-2 transition-all ${certTestSource === "scenario" ? "border-[#00e5ff] bg-[#00e5ff]/10" : `border-[#1e4976]/50 hover:border-[#00e5ff]/50`}`}
                  >
                    <Activity className={`h-8 w-8 mx-auto mb-2 ${certTestSource === "scenario" ? "text-[#00e5ff]" : textSecondary}`} />
                    <p className={`font-medium ${textPrimary}`}>Scenarios</p>
                    <p className={`text-xs ${textSecondary}`}>Use created scenarios</p>
                  </button>
                </div>

                {/* Spec Upload/Selection */}
                {certTestSource === "spec" && (
                  <div className={`p-4 rounded border ${borderColor} ${isDarkMode ? "bg-[#0a1628]/50" : "bg-[#f8fafc]"}`}>
                    <h4 className={`font-medium mb-3 ${textPrimary}`}>Upload or Select Spec</h4>
                    <label className={`border-2 border-dashed ${borderColor} rounded-lg p-8 text-center hover:border-[#00e5ff] cursor-pointer block transition-colors`}>
                      <input type="file" className="hidden" accept=".xlsx,.xls,.csv" />
                      <Upload className={`h-10 w-10 mx-auto mb-3 ${textSecondary}`} />
                      <p className={textPrimary}>Drop FIX spec file here or click to browse</p>
                      <p className={`text-xs ${textSecondary} mt-1`}>Supports .xlsx, .xls, .csv formats</p>
                    </label>
                  </div>
                )}

                {/* Log File Upload/Selection */}
                {certTestSource === "log" && (
                  <div className={`p-4 rounded border ${borderColor} ${isDarkMode ? "bg-[#0a1628]/50" : "bg-[#f8fafc]"}`}>
                    <h4 className={`font-medium mb-3 ${textPrimary}`}>Upload or Select Log File</h4>
                    <label className={`border-2 border-dashed ${borderColor} rounded-lg p-8 text-center hover:border-[#00e5ff] cursor-pointer block transition-colors`}>
                      <input type="file" className="hidden" accept=".log,.txt,.fix" />
                      <Upload className={`h-10 w-10 mx-auto mb-3 ${textSecondary}`} />
                      <p className={textPrimary}>Drop FIX log file here or click to browse</p>
                      <p className={`text-xs ${textSecondary} mt-1`}>Supports .log, .txt, .fix formats</p>
                    </label>
                  </div>
                )}

                {/* Scenario Selection */}
                {certTestSource === "scenario" && (
                  <div className={`p-4 rounded border ${borderColor} ${isDarkMode ? "bg-[#0a1628]/50" : "bg-[#f8fafc]"}`}>
                    <h4 className={`font-medium mb-3 ${textPrimary}`}>Load Scenarios</h4>
                    <div className="flex gap-4">
                      <Button variant="outline" onClick={() => setCurrentScreen("scenario-creation")}>
                        <Activity className="h-4 w-4 mr-2" /> Go to Scenario Creation
                      </Button>
                      <label className={`border-2 border-dashed ${borderColor} rounded-lg px-6 py-3 hover:border-[#00e5ff] cursor-pointer flex items-center gap-2 transition-colors`}>
                        <input type="file" className="hidden" accept=".json,.xml" />
                        <Upload className={`h-5 w-5 ${textSecondary}`} />
                        <span className={textSecondary}>Upload Scenario File</span>
                      </label>
                    </div>
                  </div>
                )}
              </Card>

              {/* Step 2: Generate Certification Test Cases */}
              {certTestSource && (
                <Card className={`${bgCard} p-6 border ${borderColor} mb-6`}>
                  <h3 className={`text-lg font-bold mb-4 ${textPrimary}`}>Step 2: Generate Certification Test Suite</h3>
                  <p className={`mb-4 ${textSecondary}`}>Analyze the selected source and generate certification test cases.</p>
                  <Button 
                    onClick={async () => {
                      setGeneratingCertTest("adhoc");
                      await new Promise(resolve => setTimeout(resolve, 2000));
                      setShowCertResults(true);
                      setGeneratingCertTest(null);
                    }} 
                    disabled={generatingCertTest !== null}
                  >
                    {generatingCertTest === "adhoc" ? (
                      <><div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div> Generating...</>
                    ) : (
                      <><Play className="h-4 w-4 mr-2" /> Generate Certification Tests</>
                    )}
                  </Button>
                </Card>
              )}

              {/* Step 3: Review & Export Test Cases */}
              {showCertResults && (
                <Card className={`${bgCard} p-6 border ${borderColor} mb-6`}>
                  <h3 className={`text-lg font-bold mb-4 ${textPrimary}`}>Step 3: Review Certification Test Cases</h3>
                  <p className={`mb-4 ${textSecondary}`}>Review generated certification test cases grouped by category. Select which to include in Conductor export.</p>
                  
                  <div className="space-y-4">
                    {certTestGroups.map((group, gi) => (
                      <div key={gi} className={`border ${borderColor} rounded-lg overflow-hidden`}>
                        <div className={`px-4 py-3 ${isDarkMode ? "bg-[#1e4976]/30" : "bg-[#f1f5f9]"} flex items-center justify-between`}>
                          <div className="flex items-center gap-3">
                            <input type="checkbox" defaultChecked className="h-4 w-4" />
                            <span className={`font-medium ${textPrimary}`}>{group.group}</span>
                            <span className={`text-xs ${textSecondary}`}>({group.cases.length} tests)</span>
                          </div>
                          <ChevronDown className={`h-4 w-4 ${textSecondary}`} />
                        </div>
                        <div className="divide-y divide-[#1e4976]/30">
                          {group.cases.map((tc, ti) => (
                            <div key={ti} className={`flex items-center justify-between px-4 py-2 ${isDarkMode ? "bg-[#0a1628]/50" : "bg-white"}`}>
                              <div className="flex items-center gap-3 pl-6">
                                <input type="checkbox" defaultChecked className="h-4 w-4" />
                                <span className={`text-sm font-mono ${textSecondary}`}>{tc.id}</span>
                                <span className={`text-sm ${textPrimary}`}>{tc.name}</span>
                              </div>
                              <span className="px-2 py-1 rounded text-xs bg-[#4caf50]/20 text-[#4caf50]">Ready</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-4 mt-6">
                    <Button>
                      <ConductorLogo size={16} /> Export to Conductor
                    </Button>
                    <Button variant="outline"><Download className="h-4 w-4 mr-2" /> Download Suite</Button>
                  </div>
                </Card>
              )}

              {/* Launch Conductor */}
              {showCertResults && (
                <Card className={`${bgCard} p-6 border ${borderColor}`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className={`text-lg font-bold ${textPrimary}`}>Launch Conductor</h3>
                      <p className={`${textSecondary}`}>Open Conductor to run your certification test cases</p>
                    </div>
                    <Button>
                      <ConductorLogo size={20} /> Launch Conductor
                    </Button>
                  </div>
                </Card>
              )}
            </div>
          </div>
        </div>
      )
    }

    // Client mode: Show asset class-based view with pre-generated suites
    return (
      <div className={`min-h-screen ${bgPrimary} flex`}>
        <Sidebar />
        <div className="flex-1 overflow-auto">
          <header className={`${bgSecondary} border-b ${borderColor} px-6 py-4`}>
            <button onClick={() => setCurrentScreen("asset-tools")} className={`flex items-center gap-2 mb-2 ${textSecondary} hover:text-[#00e5ff]`}>
              <ArrowLeft className="h-4 w-4" /> Back
            </button>
            <div className="flex items-center gap-3">
              <ConductorLogo size={32} />
              <h1 className={`text-2xl font-bold ${textPrimary}`}>Certification</h1>
            </div>
            <p className={`text-sm ${textSecondary} mt-1`}>Manage certification test suites for {selectedClient?.name || "client"} by asset class</p>
          </header>

          <div className="p-6">
            {/* Asset Class Test Suites */}
            <div className="space-y-6">
              {certTestAssetClasses.map((assetClass) => (
                <Card key={assetClass.asset} className={`${bgCard} border ${borderColor}`}>
                  <div className={`px-6 py-4 border-b ${borderColor}`}>
                    <h2 className={`text-lg font-bold ${textPrimary}`}>{assetClass.asset}</h2>
                  </div>
                  
                  <div className="divide-y divide-[#1e4976]/30">
                    {assetClass.versions.map((version) => {
                      const suiteInfo = getCertSuiteInfo(assetClass.asset, version.protocol);
                      const suiteKey = `${assetClass.asset}-${version.protocol}`;
                      
                      return (
                      <div key={suiteKey} className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <span className={`font-medium ${textPrimary}`}>{version.protocol}</span>
                              {suiteInfo ? (
                                <span className="px-2 py-1 rounded text-xs bg-[#4caf50]/20 text-[#4caf50]">Suite Generated</span>
                              ) : (
                                <span className="px-2 py-1 rounded text-xs bg-[#ff9800]/20 text-[#ff9800]">No Suite</span>
                              )}
                            </div>
                            
                            {suiteInfo ? (
                              <div className={`${isDarkMode ? "bg-[#0a1628]/50" : "bg-[#f8fafc]"} rounded-lg p-4 mt-3`}>
                                <div className="flex items-center gap-4 mb-3">
                                  <div className="flex items-center gap-2">
                                    <ConductorLogo size={20} />
                                    <span className={`font-medium ${textPrimary}`}>{suiteInfo.suiteName}</span>
                                  </div>
                                  <span className={`text-xs ${textSecondary}`}>{suiteInfo.testCount} test cases</span>
                                  <span className={`text-xs ${textSecondary}`}>Generated: {suiteInfo.lastGenerated}</span>
                                </div>
                                <div className="flex gap-2">
                                  <Button size="sm" variant="outline" onClick={() => { setShowCertResults(true); }}>
                                    <Eye className="h-3 w-3 mr-1" /> View Tests
                                  </Button>
                                  <Button size="sm" variant="outline">
                                    <Download className="h-3 w-3 mr-1" /> Export
                                  </Button>
                                  <Button size="sm" className="bg-[#00e5ff] text-[#0a1628] hover:bg-[#00e5ff]/80">
                                    <ConductorLogo size={14} /> Run in Conductor
                                  </Button>
                                  <Button size="sm" variant="outline" className="text-[#ff9800] border-[#ff9800]/30 hover:bg-[#ff9800]/10">
                                    <RefreshCw className="h-3 w-3 mr-1" /> Regenerate
                                  </Button>
                                </div>
                              </div>
                            ) : (
                              <div className={`${isDarkMode ? "bg-[#0a1628]/50" : "bg-[#f8fafc]"} rounded-lg p-4 mt-3`}>
                                {generatingCertTest === suiteKey ? (
                                  <div className="flex items-center gap-3">
                                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-[#00e5ff] border-t-transparent"></div>
                                    <span className={textPrimary}>Generating certification test suite...</span>
                                  </div>
                                ) : (
                                  <>
                                    <p className={`text-sm ${textSecondary} mb-3`}>Generate a certification test suite from:</p>
                                    <div className="flex flex-wrap gap-2">
                                      {version.spec && (
                                        <Button 
                                          size="sm" 
                                          variant="outline"
                                          disabled={generatingCertTest !== null}
                                          onClick={async () => { 
                                            setGeneratingCertTest(suiteKey);
                                            setCertTestSource("spec"); 
                                            await new Promise(resolve => setTimeout(resolve, 2000));
                                            // Generate suite name based on asset/protocol
                                            const assetCode = assetClass.asset.substring(0, 3).toUpperCase();
                                            const protocolCode = version.protocol.replace(/\s+/g, "").replace(".", "");
                                            const today = new Date();
                                            const dateStr = today.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
                                            setGeneratedCertSuites(prev => ({
                                              ...prev,
                                              [suiteKey]: {
                                                suiteName: `${assetCode}_${protocolCode}_CertTests_v1.0`,
                                                testCount: Math.floor(Math.random() * 15) + 20,
                                                lastGenerated: dateStr
                                              }
                                            }));
                                            setGeneratingCertTest(null);
                                          }}
                                        >
                                          <FileText className="h-3 w-3 mr-1" /> Spec: {version.spec}
                                        </Button>
                                      )}
                                      {version.logs && version.logs.length > 0 && version.logs.map((log, li) => (
                                        <Button 
                                          key={li}
                                          size="sm" 
                                          variant="outline"
                                          disabled={generatingCertTest !== null}
                                          onClick={async () => { 
                                            setGeneratingCertTest(suiteKey);
                                            setCertTestSource("log"); 
                                            await new Promise(resolve => setTimeout(resolve, 2000));
                                            // Generate suite name based on asset/protocol
                                            const assetCode = assetClass.asset.substring(0, 3).toUpperCase();
                                            const protocolCode = version.protocol.replace(/\s+/g, "").replace(".", "");
                                            const today = new Date();
                                            const dateStr = today.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
                                            setGeneratedCertSuites(prev => ({
                                              ...prev,
                                              [suiteKey]: {
                                                suiteName: `${assetCode}_${protocolCode}_CertTests_v1.0`,
                                                testCount: Math.floor(Math.random() * 15) + 20,
                                                lastGenerated: dateStr
                                              }
                                            }));
                                            setGeneratingCertTest(null);
                                          }}
                                        >
                                          <FileSearch className="h-3 w-3 mr-1" /> Log: {log}
                                        </Button>
                                      ))}
                                      <Button 
                                        size="sm" 
                                        variant="outline"
                                        disabled={generatingCertTest !== null}
                                        onClick={() => setCurrentScreen("scenario-creation")}
                                      >
                                        <Activity className="h-3 w-3 mr-1" /> From Scenarios
                                      </Button>
                                      {!version.spec && (!version.logs || version.logs.length === 0) && (
                                        <span className={`text-xs ${textSecondary} italic self-center`}>Upload spec or log files first</span>
                                      )}
                                    </div>
                                  </>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )})}
                  </div>
                </Card>
              ))}
            </div>

            {/* View Test Cases Modal/Expanded Section */}
            {showCertResults && (
              <Card className={`${bgCard} p-6 border ${borderColor} mt-6`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className={`text-lg font-bold ${textPrimary}`}>Certification Suite Details</h3>
                  <Button variant="outline" size="sm" onClick={() => setShowCertResults(false)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <p className={`mb-4 ${textSecondary}`}>Review certification test cases grouped by category. Select which to include in Conductor export.</p>
                
                <div className="space-y-4">
                  {certTestGroups.map((group, gi) => (
                    <div key={gi} className={`border ${borderColor} rounded-lg overflow-hidden`}>
                      <div className={`px-4 py-3 ${isDarkMode ? "bg-[#1e4976]/30" : "bg-[#f1f5f9]"} flex items-center justify-between`}>
                        <div className="flex items-center gap-3">
                          <input type="checkbox" defaultChecked className="h-4 w-4" />
                          <span className={`font-medium ${textPrimary}`}>{group.group}</span>
                          <span className={`text-xs ${textSecondary}`}>({group.cases.length} tests)</span>
                        </div>
                        <ChevronDown className={`h-4 w-4 ${textSecondary}`} />
                      </div>
                      <div className="divide-y divide-[#1e4976]/30">
                        {group.cases.map((tc, ti) => (
                          <div key={ti} className={`flex items-center justify-between px-4 py-2 ${isDarkMode ? "bg-[#0a1628]/50" : "bg-white"}`}>
                            <div className="flex items-center gap-3 pl-6">
                              <input type="checkbox" defaultChecked className="h-4 w-4" />
                              <span className={`text-sm font-mono ${textSecondary}`}>{tc.id}</span>
                              <span className={`text-sm ${textPrimary}`}>{tc.name}</span>
                            </div>
                            <span className="px-2 py-1 rounded text-xs bg-[#4caf50]/20 text-[#4caf50]">Ready</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-4 mt-6">
                  <Button>
                    <ConductorLogo size={16} /> Export to Conductor
                  </Button>
                  <Button variant="outline"><Download className="h-4 w-4 mr-2" /> Download Suite</Button>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    )
  }

  // ATDL Validate Structure Screen
  // Onboarding Cases Home
  if (currentScreen === "atdl-workbench") {
    const onboardingCases = [
      { id: "OB-2026-0147", client: "Nexus Trading Group", legalEntity: "Nexus Trading LLC", assetClass: "Equities", fixVersion: "FIX 4.4", strategies: ["VWAP","TWAP","POV"], status: "in-progress", gateA: "complete", gateB: "complete", gateC: "in-progress", gateD: "todo", gateE: "todo", gateF: "todo", gateG: "todo", blockers: 2, warnings: 5, readinessScore: 72, riskLevel: "medium", daysToSla: 8, onboardingManager: "Sarah Chen", technicalLead: "J. Smith", nextAction: "Complete Mapping Review", lastRun: "Apr 12, 2026", createdDate: "Mar 28, 2026", includesAtdl: true },
      { id: "OB-2026-0142", client: "Apex Capital Partners", legalEntity: "Apex Capital LLC", assetClass: "Options", fixVersion: "FIX 4.4", strategies: ["VWAP","IS","MOC"], status: "blocked", gateA: "complete", gateB: "failed", gateC: "todo", gateD: "todo", gateE: "todo", gateF: "todo", gateG: "todo", blockers: 6, warnings: 3, readinessScore: 45, riskLevel: "high", daysToSla: -2, onboardingManager: "Mike Johnson", technicalLead: "J. Smith", nextAction: "Resolve Schema Errors", lastRun: "Apr 10, 2026", createdDate: "Mar 15, 2026", includesAtdl: true },
      { id: "OB-2026-0138", client: "Velocity Securities", legalEntity: "Velocity Securities Inc", assetClass: "Equities", fixVersion: "FIX 4.4", strategies: ["TWAP","POV","IS","MOC"], status: "ready-for-approval", gateA: "complete", gateB: "complete", gateC: "complete", gateD: "complete", gateE: "complete", gateF: "in-progress", gateG: "todo", blockers: 0, warnings: 2, readinessScore: 92, riskLevel: "low", daysToSla: 12, onboardingManager: "Sarah Chen", technicalLead: "R. Patel", nextAction: "Business Sign-off", lastRun: "Apr 11, 2026", createdDate: "Feb 20, 2026", includesAtdl: true },
      { id: "OB-2026-0151", client: "Horizon Investments", legalEntity: "Horizon Fund Services", assetClass: "Futures", fixVersion: "FIX 5.0 SP2", strategies: ["VWAP","TWAP"], status: "not-started", gateA: "todo", gateB: "todo", gateC: "todo", gateD: "todo", gateE: "na", gateF: "todo", gateG: "todo", blockers: 0, warnings: 0, readinessScore: 25, riskLevel: "medium", daysToSla: 22, onboardingManager: "Unassigned", technicalLead: "Unassigned", nextAction: "Assign Owners", lastRun: null, createdDate: "Apr 8, 2026", includesAtdl: false },
      { id: "OB-2026-0129", client: "Nexus Trading Group", legalEntity: "Nexus Trading LLC", assetClass: "Options", fixVersion: "FIX 4.4", strategies: ["IS","MOC"], status: "certified", gateA: "complete", gateB: "complete", gateC: "complete", gateD: "complete", gateE: "complete", gateF: "complete", gateG: "complete", blockers: 0, warnings: 0, readinessScore: 100, riskLevel: "low", daysToSla: 0, onboardingManager: "Sarah Chen", technicalLead: "J. Smith", nextAction: "Completed", lastRun: "Apr 5, 2026", createdDate: "Feb 1, 2026", includesAtdl: true },
    ]

    const statusConfig: Record<string, { label: string; color: string; bg: string; border: string }> = {
      "not-started":       { label: "Draft",              color: "text-slate-400",   bg: "bg-slate-400/10",    border: "border-slate-400/30" },
      "in-progress":       { label: "Active",             color: "text-[#2196f3]",   bg: "bg-[#2196f3]/10",    border: "border-[#2196f3]/30" },
      "blocked":           { label: "Blocked",            color: "text-[#f44336]",   bg: "bg-[#f44336]/10",    border: "border-[#f44336]/40" },
      "ready-for-approval":{ label: "Pending Approval",   color: "text-[#ff9800]",   bg: "bg-[#ff9800]/10",    border: "border-[#ff9800]/30" },
      "certified":         { label: "Certified",          color: "text-[#4caf50]",   bg: "bg-[#4caf50]/10",    border: "border-[#4caf50]/30" },
    }

    const riskConfig: Record<string, { label: string; color: string; bg: string }> = {
      "low":    { label: "Low Risk",    color: "text-[#4caf50]", bg: "bg-[#4caf50]/20" },
      "medium": { label: "Medium Risk", color: "text-[#ff9800]", bg: "bg-[#ff9800]/20" },
      "high":   { label: "High Risk",   color: "text-[#f44336]", bg: "bg-[#f44336]/20" },
    }

    const gateConfig = [
      { key: "gateA", label: "A", title: "Case Intake" },
      { key: "gateB", label: "B", title: "Scope Lock" },
      { key: "gateC", label: "C", title: "Spec Analysis" },
      { key: "gateD", label: "D", title: "Connectivity" },
      { key: "gateE", label: "E", title: "ATDL Analysis", optional: true },
      { key: "gateF", label: "F", title: "Certification" },
      { key: "gateG", label: "G", title: "Go-Live" },
    ]

    const pipeline = ["not-started","in-progress","blocked","ready-for-approval","certified"]
    const pipelineCounts = pipeline.reduce((acc, s) => { acc[s] = onboardingCases.filter(w => w.status === s).length; return acc }, {} as Record<string,number>)

    return (
      <div className={`min-h-screen ${bgPrimary} flex`}>
        <Sidebar />
        <div className="flex-1 overflow-auto">
          <header className={`${bgSecondary} border-b ${borderColor} px-6 py-4`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Briefcase className="h-8 w-8 text-[#00e5ff]" />
                <div>
                  <h1 className={`text-2xl font-bold ${textPrimary}`}>Onboarding Cases</h1>
                  <p className={`text-sm ${textSecondary}`}>Client onboarding management from intake to certification</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border ${borderColor} ${isDarkMode ? "bg-[#0a1628]/60" : "bg-gray-50"}`}>
                  <span className={`text-xs ${textSecondary}`}>Total Cases:</span>
                  <span className={`text-sm font-bold ${textPrimary}`}>{onboardingCases.length}</span>
                  <span className={`text-xs ${textSecondary} ml-2`}>Avg Readiness:</span>
                  <span className={`text-sm font-bold text-[#00e5ff]`}>{Math.round(onboardingCases.reduce((a,c) => a + c.readinessScore, 0) / onboardingCases.length)}%</span>
                </div>
                <Button
                  onClick={() => { setAtdlWizardStep(0); setAtdlWizardWorkOrder(null); setCurrentScreen("atdl-wizard" as any); }}
                  className="bg-[#00e5ff] text-[#0a1628] hover:bg-[#00e5ff]/80"
                >
                  <Plus className="h-4 w-4 mr-2" /> Create Onboarding Case
                </Button>
              </div>
            </div>
          </header>

          <div className="p-6 space-y-6">
            {/* Pipeline summary strip */}
            <div className="grid grid-cols-5 gap-3">
              {pipeline.map(s => {
                const cfg = statusConfig[s]
                return (
                  <div key={s} className={`${bgCard} border ${cfg.border} rounded-lg p-4 flex items-center gap-3`}>
                    <div className={`text-2xl font-bold ${cfg.color}`}>{pipelineCounts[s]}</div>
                    <div>
                      <p className={`text-xs font-medium ${cfg.color}`}>{cfg.label}</p>
                      <p className={`text-xs ${textSecondary}`}>case{pipelineCounts[s] !== 1 ? "s" : ""}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Onboarding case cards */}
            <div className="space-y-3">
              {onboardingCases.map(caseItem => {
                const cfg = statusConfig[caseItem.status]
                const risk = riskConfig[caseItem.riskLevel]
                return (
                  <Card key={caseItem.id} className={`${bgCard} border ${borderColor} overflow-hidden`}>
                    <div className="p-5">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-4 flex-1 min-w-0">
                          <div className={`p-2.5 rounded-lg ${cfg.bg} flex-shrink-0`}>
                            <Briefcase className={`h-5 w-5 ${cfg.color}`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                              <span className={`font-mono text-xs ${textSecondary}`}>{caseItem.id}</span>
                              <span className={`px-2 py-0.5 rounded text-xs font-medium border ${cfg.bg} ${cfg.color} ${cfg.border}`}>{cfg.label}</span>
                              <span className={`px-2 py-0.5 rounded text-xs ${risk.bg} ${risk.color}`}>{risk.label}</span>
                              {caseItem.blockers > 0 && (
                                <span className="px-2 py-0.5 rounded text-xs bg-[#f44336]/20 text-[#f44336] flex items-center gap-1">
                                  <AlertCircle className="h-3 w-3" /> {caseItem.blockers} blocker{caseItem.blockers !== 1 ? "s" : ""}
                                </span>
                              )}
                              {caseItem.daysToSla < 0 && (
                                <span className="px-2 py-0.5 rounded text-xs bg-[#f44336]/20 text-[#f44336] flex items-center gap-1">
                                  <Clock className="h-3 w-3" /> SLA Breached
                                </span>
                              )}
                              {caseItem.warnings > 0 && caseItem.blockers === 0 && (
                                <span className="px-2 py-0.5 rounded text-xs bg-[#ff9800]/20 text-[#ff9800]">{caseItem.warnings} warnings</span>
                              )}
                            </div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className={`font-bold ${textPrimary}`}>{caseItem.client}</span>
                              <span className={`text-xs ${textSecondary}`}>·</span>
                              <span className={`text-xs ${textSecondary}`}>{caseItem.legalEntity}</span>
                            </div>
                            <div className="flex items-center gap-3 mb-2">
                              <span className={`text-xs ${textSecondary}`}>{caseItem.assetClass}</span>
                              <span className={`text-xs ${textSecondary}`}>·</span>
                              <span className={`text-xs ${textSecondary}`}>{caseItem.fixVersion}</span>
                              <span className={`text-xs ${textSecondary}`}>·</span>
                              <span className={`text-xs ${textSecondary}`}>{caseItem.strategies.length} strategies</span>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-1.5">
                                <span className={`text-xs ${textSecondary}`}>Readiness:</span>
                                <div className={`w-20 h-1.5 rounded-full ${isDarkMode ? "bg-[#1e4976]" : "bg-gray-200"} overflow-hidden`}>
                                  <div className={`h-full rounded-full ${caseItem.readinessScore >= 70 ? "bg-[#4caf50]" : caseItem.readinessScore >= 40 ? "bg-[#ff9800]" : "bg-[#f44336]"}`} style={{ width: `${caseItem.readinessScore}%` }} />
                                </div>
                                <span className={`text-xs font-medium ${caseItem.readinessScore >= 70 ? "text-[#4caf50]" : caseItem.readinessScore >= 40 ? "text-[#ff9800]" : "text-[#f44336]"}`}>{caseItem.readinessScore}%</span>
                              </div>
                              {caseItem.daysToSla > 0 && (
                                <div className="flex items-center gap-1.5">
                                  <Clock className={`h-3 w-3 ${textSecondary}`} />
                                  <span className={`text-xs ${textSecondary}`}>{caseItem.daysToSla} days to SLA</span>
                                </div>
                              )}
                              <div className="flex items-center gap-1.5">
                                <Users className={`h-3 w-3 ${textSecondary}`} />
                                <span className={`text-xs ${textSecondary}`}>{caseItem.onboardingManager}</span>
                              </div>
                            </div>
                            <div className={`mt-2 px-2 py-1 rounded text-xs inline-flex items-center gap-1.5 ${isDarkMode ? "bg-[#1e4976]/30" : "bg-gray-100"}`}>
                              <ArrowRight className={`h-3 w-3 ${textSecondary}`} />
                              <span className={textSecondary}>Next:</span>
                              <span className={textPrimary}>{caseItem.nextAction}</span>
                            </div>
                          </div>
                        </div>

                        {/* Gate progress */}
                        <div className="flex-shrink-0 flex flex-col items-end gap-3">
                          <div className="flex items-center gap-1">
                            {gateConfig.map(g => {
                              const state = (caseItem as any)[g.key] as string
                              const isOptional = (g as any).optional
                              return (
                                <div key={g.key} title={`${isOptional ? "(Optional) " : ""}Gate ${g.label}: ${g.title}${state === "na" ? " - N/A" : ""}`} className="flex flex-col items-center gap-0.5">
                                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                                    state === "complete" ? "bg-[#4caf50] text-white" :
                                    state === "in-progress" ? "bg-[#2196f3] text-white" :
                                    state === "failed" ? "bg-[#f44336] text-white" :
                                    state === "na" ? "bg-slate-500/30 text-slate-400 line-through" :
                                    isDarkMode ? "bg-[#1e4976]/40 text-slate-500" : "bg-gray-200 text-gray-400"
                                  }`}>{state === "na" ? "—" : g.label}</div>
                                </div>
                              )
                            })}
                          </div>
                          <div className="flex gap-2">
                            {caseItem.status !== "certified" && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => { setAtdlWizardWorkOrder(caseItem.id); setAtdlWizardStep(0); setCurrentScreen("atdl-wizard" as any); }}
                              >
                                <Play className="h-3.5 w-3.5 mr-1" /> {caseItem.status === "not-started" ? "Start Case" : "Continue"}
                              </Button>
                            )}
                            {caseItem.blockers > 0 && (
                              <Button size="sm" variant="outline" className="text-[#f44336] border-[#f44336]/30 hover:bg-[#f44336]/10"
                                onClick={() => setCurrentScreen("atdl-remediation" as any)}>
                                <AlertCircle className="h-3.5 w-3.5 mr-1" /> Resolve Blockers
                              </Button>
                            )}
                            {caseItem.status === "certified" && (
                              <Button size="sm" variant="outline" className="text-[#4caf50] border-[#4caf50]/30">
                                <Download className="h-3.5 w-3.5 mr-1" /> Certification Pack
                              </Button>
                            )}
                            <Button size="sm" variant="ghost" className={textSecondary}>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Progress bar footer */}
                    <div className={`px-5 py-2 border-t ${borderColor} ${isDarkMode ? "bg-[#0a1628]/40" : "bg-gray-50"} flex items-center justify-between`}>
                      <p className={`text-xs ${textSecondary}`}>
                        Created {caseItem.createdDate}
                        {caseItem.lastRun ? ` · Last activity ${caseItem.lastRun}` : " · Awaiting start"}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs ${textSecondary}`}>Stage Progress</span>
                        <div className={`h-1.5 w-32 rounded-full overflow-hidden ${isDarkMode ? "bg-[#1e4976]/40" : "bg-gray-200"}`}>
                          <div
                            className="h-full bg-[#4caf50] rounded-full transition-all"
                            style={{ width: `${gateConfig.filter(g => (caseItem as any)[g.key] === "complete").length / gateConfig.length * 100}%` }}
                          />
                        </div>
                        <span className={`text-xs ${textSecondary}`}>
                          {gateConfig.filter(g => (caseItem as any)[g.key] === "complete").length}/{gateConfig.length} stages
                        </span>
                      </div>
                    </div>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // ATDL Guided Wizard
  if (currentScreen === "atdl-wizard") {
    const steps = [
      { id: 0, label: "Case Setup",      icon: Briefcase,     desc: "Define scope, owners, and SLAs" },
      { id: 1, label: "Source Files",    icon: Upload,        desc: "Lock input files and versions" },
      { id: 2, label: "Spec Analysis",   icon: CheckCircle,   desc: "Structural and semantic validation" },
      { id: 3, label: "Connectivity",    icon: Wifi,          desc: "Integration and connection testing" },
      { id: 4, label: "ATDL Analysis",   icon: Layers,        desc: "Algo trading strategy validation", optional: true },
      { id: 5, label: "Testing",         icon: TestTube,      desc: "UI render and FIX message validation" },
      { id: 6, label: "Remediation",     icon: ClipboardCheck, desc: "Issue triage and resolution" },
      { id: 7, label: "Certification",   icon: Award,         desc: "Approval and evidence pack" },
    ]

    const gateForStep = ["A","B","C","D","E","F","G"]
    const gateLabel = ["Case Intake","Scope Lock","Spec Analysis","Connectivity","ATDL Analysis","Certification","Go-Live"]

    const workflowOptions = [
      {
        id: "create-from-spec" as const,
        title: "New Algo Onboarding",
        desc: "Onboard client to new algorithm strategies. Generate ATDL from FIX Algo spec, validate, and certify.",
        icon: Rocket,
        color: "text-[#4caf50]",
        bg: "bg-[#4caf50]/10",
        border: "border-[#4caf50]/40",
      },
      {
        id: "validate-update" as const,
        title: "Counterparty Spec Update",
        desc: "Counterparty shared updated specs. Validate changes, verify compliance, and recertify if needed.",
        icon: RefreshCw,
        color: "text-[#2196f3]",
        bg: "bg-[#2196f3]/10",
        border: "border-[#2196f3]/40",
      },
      {
        id: "compare-atdl" as const,
        title: "Configuration Alignment Check",
        desc: "Compare client-side and admin-side configurations to identify discrepancies before go-live.",
        icon: GitCompare,
        color: "text-[#ff9800]",
        bg: "bg-[#ff9800]/10",
        border: "border-[#ff9800]/40",
      },
    ]

    const stepContent: Record<number, React.ReactNode> = {
      0: (
        <div className="space-y-5">
          {/* Workflow Type Selection */}
          <div>
            <label className={`block text-sm font-semibold mb-3 ${textPrimary}`}>Select Workflow Type</label>
            <div className="space-y-2">
              {workflowOptions.map(opt => {
                const isSelected = atdlWorkflowType === opt.id
                return (
                  <button
                    key={opt.id}
                    onClick={() => setAtdlWorkflowType(opt.id)}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                      isSelected
                        ? `${opt.border} ${opt.bg}`
                        : `${borderColor} hover:border-[#00e5ff]/50 ${isDarkMode ? "bg-[#0a1628]/40" : "bg-gray-50"}`
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${isSelected ? opt.bg : isDarkMode ? "bg-[#1e4976]/30" : "bg-gray-100"}`}>
                        <opt.icon className={`h-5 w-5 ${isSelected ? opt.color : textSecondary}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className={`font-semibold ${isSelected ? opt.color : textPrimary}`}>{opt.title}</span>
                          {isSelected && <CheckCircle className={`h-4 w-4 ${opt.color}`} />}
                        </div>
                        <p className={`text-xs mt-0.5 ${textSecondary}`}>{opt.desc}</p>
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Common fields */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className={`block text-sm font-medium mb-1.5 ${textPrimary}`}>Client</label>
              <select className={`w-full p-2.5 rounded border ${borderColor} ${isDarkMode ? "bg-[#0a1628] text-white" : "bg-white"}`}>
                <option>Nexus Trading Group</option>
                <option>Apex Capital Partners</option>
                <option>Velocity Securities</option>
                <option>Horizon Investments</option>
              </select>
            </div>
            <div>
              <label className={`block text-sm font-medium mb-1.5 ${textPrimary}`}>Asset Class</label>
              <select className={`w-full p-2.5 rounded border ${borderColor} ${isDarkMode ? "bg-[#0a1628] text-white" : "bg-white"}`}>
                <option>Equities</option><option>Options</option><option>Futures</option><option>FX</option>
              </select>
            </div>
            <div>
              <label className={`block text-sm font-medium mb-1.5 ${textPrimary}`}>FIX Version</label>
              <select className={`w-full p-2.5 rounded border ${borderColor} ${isDarkMode ? "bg-[#0a1628] text-white" : "bg-white"}`}>
                <option>FIX 4.2</option><option>FIX 4.4</option><option>FIX 5.0</option><option>FIX 5.0 SP2</option>
              </select>
            </div>
          </div>

          {/* Onboarding Tracks */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${textPrimary}`}>Onboarding Tracks</label>
            <div className="flex gap-2 flex-wrap">
              {[
                { id: "spec", label: "FIX Specification Baseline" },
                { id: "atdl", label: "ATDL Strategy Definition" },
                { id: "connectivity", label: "Integration & Connectivity" },
                { id: "testing", label: "Testing & Certification" },
                { id: "golive", label: "Go-Live & Hypercare" },
              ].map(track => (
                <label key={track.id} className={`flex items-center gap-2 px-3 py-1.5 rounded border ${borderColor} cursor-pointer hover:border-[#00e5ff] ${isDarkMode ? "bg-[#1e4976]/20" : "bg-gray-50"}`}>
                  <input type="checkbox" defaultChecked={["spec","atdl","testing"].includes(track.id)} className="accent-[#00e5ff]" />
                  <span className={`text-sm ${textPrimary}`}>{track.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Ownership Assignment */}
          <div>
            <label className={`block text-sm font-semibold mb-3 ${textPrimary}`}>Case Ownership</label>
            <div className="grid grid-cols-2 gap-4">
              {[
                { role: "Onboarding Manager", desc: "Owns overall case health and SLA tracking", default: "Sarah Chen" },
                { role: "Technical Lead", desc: "Owns spec, rules, and testing decisions", default: "J. Smith" },
                { role: "QA/Cert Lead", desc: "Owns test strategy and certification readiness", default: "R. Patel" },
                { role: "Business Approver", desc: "Owns business sign-off and go-live decision", default: "M. Thompson" },
              ].map(owner => (
                <div key={owner.role} className={`p-3 rounded-lg border ${borderColor} ${isDarkMode ? "bg-[#1e4976]/10" : "bg-gray-50"}`}>
                  <p className={`text-sm font-medium ${textPrimary}`}>{owner.role}</p>
                  <p className={`text-xs ${textSecondary} mb-2`}>{owner.desc}</p>
                  <select className={`w-full p-1.5 rounded border ${borderColor} text-sm ${isDarkMode ? "bg-[#0a1628] text-white" : "bg-white"}`}>
                    <option>{owner.default}</option>
                    <option>Unassigned</option>
                  </select>
                </div>
              ))}
            </div>
          </div>

          {/* SLA Target */}
          <div className={`p-4 rounded-lg border ${borderColor} ${isDarkMode ? "bg-[#1e4976]/10" : "bg-gray-50"}`}>
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className={`text-sm font-semibold ${textPrimary}`}>Target SLA</p>
                <p className={`text-xs ${textSecondary}`}>Estimated time to certification based on scope</p>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-[#00e5ff]" />
                <span className={`text-lg font-bold text-[#00e5ff]`}>22 days</span>
              </div>
            </div>
            <div className="flex gap-4 text-xs">
              <div><span className={textSecondary}>Spec Analysis:</span> <span className={textPrimary}>5-7 days</span></div>
              <div><span className={textSecondary}>ATDL:</span> <span className={textPrimary}>3-5 days</span></div>
              <div><span className={textSecondary}>Testing:</span> <span className={textPrimary}>7-10 days</span></div>
              <div><span className={textSecondary}>Certification:</span> <span className={textPrimary}>3-5 days</span></div>
            </div>
          </div>
        </div>
      ),
      1: (
        <div className="space-y-4">
          {/* Workflow-specific inputs */}
          {atdlWorkflowType === "create-from-spec" && (
            <>
              <div className={`p-3 rounded-lg border border-[#4caf50]/30 bg-[#4caf50]/5`}>
                <p className={`text-sm font-medium text-[#4caf50]`}>Workflow: Create ATDL from Algo Spec</p>
                <p className={`text-xs ${textSecondary} mt-0.5`}>Provide old and new FIX Algo specs. Old ATDL is optional for reference.</p>
              </div>
              {[
                { label: "Old FIX Algo Spec", tag: "FIX", required: true, options: ["Equities FIX 4.4 v2.0","Equities FIX 4.4 v1.9","Equities FIX 4.2 v1.5"] },
                { label: "New FIX Algo Spec", tag: "FIX", required: true, options: ["Equities FIX 4.4 v2.1","Equities FIX 4.4 v2.0"] },
                { label: "Old ATDL (Optional)", tag: "ATDL", required: false, options: ["(None)","AlgoSuite_v1.4.atdl","AlgoSuite_v1.3.atdl"] },
              ].map(src => (
                <div key={src.label} className={`flex items-center gap-4 p-4 rounded-lg border ${borderColor} ${isDarkMode ? "bg-[#1e4976]/10" : "bg-gray-50"}`}>
                  <div className="p-2 rounded bg-[#00e5ff]/10 flex-shrink-0">
                    <FileText className="h-5 w-5 text-[#00e5ff]" />
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm font-medium ${textPrimary}`}>
                      {src.label}
                      {src.required && <span className="text-[#f44336] ml-1">*</span>}
                    </p>
                    <select className={`mt-1 w-full p-1.5 rounded border ${borderColor} text-sm ${isDarkMode ? "bg-[#0a1628] text-white" : "bg-white"}`}>
                      {src.options.map(o => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded border ${borderColor} ${textSecondary}`}>{src.tag}</span>
                </div>
              ))}
            </>
          )}

          {atdlWorkflowType === "validate-update" && (
            <>
              <div className={`p-3 rounded-lg border border-[#2196f3]/30 bg-[#2196f3]/5`}>
                <p className={`text-sm font-medium text-[#2196f3]`}>Workflow: Validate Counterparty ATDL Update</p>
                <p className={`text-xs ${textSecondary} mt-0.5`}>Provide old and new FIX Algo specs, plus old and new ATDL files from counterparty.</p>
              </div>
              {[
                { label: "Old FIX Algo Spec", tag: "FIX", required: true, options: ["Equities FIX 4.4 v2.0","Equities FIX 4.4 v1.9"] },
                { label: "New FIX Algo Spec", tag: "FIX", required: true, options: ["Equities FIX 4.4 v2.1","Equities FIX 4.4 v2.0"] },
                { label: "Old ATDL (Counterparty)", tag: "ATDL", required: true, options: ["AlgoSuite_v1.4.atdl","AlgoSuite_v1.3.atdl"] },
                { label: "New ATDL (Counterparty)", tag: "ATDL", required: true, options: ["AlgoSuite_v1.5.atdl","AlgoSuite_v1.4.atdl"] },
              ].map(src => (
                <div key={src.label} className={`flex items-center gap-4 p-4 rounded-lg border ${borderColor} ${isDarkMode ? "bg-[#1e4976]/10" : "bg-gray-50"}`}>
                  <div className="p-2 rounded bg-[#00e5ff]/10 flex-shrink-0">
                    <FileText className="h-5 w-5 text-[#00e5ff]" />
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm font-medium ${textPrimary}`}>
                      {src.label}
                      {src.required && <span className="text-[#f44336] ml-1">*</span>}
                    </p>
                    <select className={`mt-1 w-full p-1.5 rounded border ${borderColor} text-sm ${isDarkMode ? "bg-[#0a1628] text-white" : "bg-white"}`}>
                      {src.options.map(o => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded border ${borderColor} ${textSecondary}`}>{src.tag}</span>
                </div>
              ))}
            </>
          )}

          {atdlWorkflowType === "compare-atdl" && (
            <>
              <div className={`p-3 rounded-lg border border-[#ff9800]/30 bg-[#ff9800]/5`}>
                <p className={`text-sm font-medium text-[#ff9800]`}>Workflow: Compare Two ATDLs</p>
                <p className={`text-xs ${textSecondary} mt-0.5`}>Compare client-side ATDL against admin/sell-side ATDL for alignment.</p>
              </div>
              {[
                { label: "Client-Side ATDL", tag: "ATDL", required: true, options: ["AlgoSuite_Client_v2.1.atdl","VWAP_Strategies_v1.0.atdl"] },
                { label: "Admin/Sell-Side ATDL", tag: "ATDL", required: true, options: ["AlgoSuite_Complete_v1.5.atdl","VWAP_Strategies_v2.0.atdl"] },
                { label: "FIX Algo Spec Reference", tag: "FIX", required: false, options: ["(None)","Equities FIX 4.4 v2.1","Equities FIX 4.4 v2.0"] },
              ].map(src => (
                <div key={src.label} className={`flex items-center gap-4 p-4 rounded-lg border ${borderColor} ${isDarkMode ? "bg-[#1e4976]/10" : "bg-gray-50"}`}>
                  <div className="p-2 rounded bg-[#00e5ff]/10 flex-shrink-0">
                    <FileText className="h-5 w-5 text-[#00e5ff]" />
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm font-medium ${textPrimary}`}>
                      {src.label}
                      {src.required && <span className="text-[#f44336] ml-1">*</span>}
                    </p>
                    <select className={`mt-1 w-full p-1.5 rounded border ${borderColor} text-sm ${isDarkMode ? "bg-[#0a1628] text-white" : "bg-white"}`}>
                      {src.options.map(o => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded border ${borderColor} ${textSecondary}`}>{src.tag}</span>
                </div>
              ))}
            </>
          )}

          <div className={`flex items-center gap-3 p-3 rounded-lg border border-[#4caf50]/40 bg-[#4caf50]/10`}>
            <Lock className="h-4 w-4 text-[#4caf50]" />
            <p className="text-sm text-[#4caf50] font-medium">Lock inputs to make this run reproducible</p>
            <input type="checkbox" className="ml-auto accent-[#4caf50]" />
          </div>
        </div>
      ),
      2: (
        <div className="space-y-4">
          {/* Workflow context banner */}
          {atdlWorkflowType === "create-from-spec" && (
            <div className={`p-3 rounded-lg border border-[#4caf50]/30 bg-[#4caf50]/5`}>
              <p className={`text-sm font-medium text-[#4caf50]`}>Step: Identify Spec Changes</p>
              <p className={`text-xs ${textSecondary} mt-0.5`}>Comparing old and new FIX Algo specs to identify changes that need ATDL updates.</p>
            </div>
          )}
          {atdlWorkflowType === "validate-update" && (
            <>
              <div className={`p-3 rounded-lg border border-[#2196f3]/30 bg-[#2196f3]/5`}>
                <p className={`text-sm font-medium text-[#2196f3]`}>Step: Side-by-Side Comparison + Structural Validation</p>
                <p className={`text-xs ${textSecondary} mt-0.5`}>Comparing old vs new FIX specs and ATDLs with changes highlighted, then validating structure.</p>
              </div>

              {/* Side-by-side comparison for validate-update workflow */}
              <div className={`border ${borderColor} rounded-lg overflow-hidden`}>
                <div className={`px-4 py-2.5 ${isDarkMode ? "bg-[#1e4976]/30" : "bg-[#f1f5f9]"} flex items-center gap-2`}>
                  <Eye className="h-4 w-4 text-[#2196f3]" />
                  <span className={`text-sm font-semibold ${textPrimary}`}>FIX Algo Spec Comparison</span>
                  <span className="px-2 py-0.5 rounded text-xs bg-[#4caf50]/20 text-[#4caf50]">2 Added</span>
                  <span className="px-2 py-0.5 rounded text-xs bg-[#ff9800]/20 text-[#ff9800]">1 Modified</span>
                </div>
                <div className="grid grid-cols-2 divide-x divide-[#1e4976]">
                  <div className={`p-3 ${isDarkMode ? "bg-[#0a1628]" : "bg-white"}`}>
                    <p className={`text-xs font-semibold ${textSecondary} mb-2`}>Old FIX Spec (v2.0)</p>
                    <pre className={`text-xs ${textSecondary} font-mono overflow-x-auto whitespace-pre-wrap`}>{`Strategy: VWAP
  - StartTime (7940): Time
  - EndTime (7941): Time
  - ParticipationRate (7942): Percentage

Strategy: TWAP
  - StartTime (7940): Time
  - EndTime (7941): Time`}</pre>
                  </div>
                  <div className={`p-3 ${isDarkMode ? "bg-[#0a1628]/60" : "bg-[#f8fafc]"}`}>
                    <p className={`text-xs font-semibold ${textSecondary} mb-2`}>New FIX Spec (v2.1)</p>
                    <pre className={`text-xs ${textSecondary} font-mono overflow-x-auto whitespace-pre-wrap`}>{`Strategy: VWAP
  - StartTime (7940): Time
  - EndTime (7941): Time
  - `}<span className="bg-[#ff9800]/30 text-[#ff9800]">ParticipationRate (7942): Decimal</span>{`

Strategy: TWAP
  - StartTime (7940): Time
  - EndTime (7941): Time

`}<span className="bg-[#4caf50]/30 text-[#4caf50]">{`Strategy: POV (NEW)
  - ParticipationRate (7942): Decimal
  - MaxFloor (7944): Qty`}</span></pre>
                  </div>
                </div>
              </div>

              <div className={`border ${borderColor} rounded-lg overflow-hidden`}>
                <div className={`px-4 py-2.5 ${isDarkMode ? "bg-[#1e4976]/30" : "bg-[#f1f5f9]"} flex items-center gap-2`}>
                  <FileText className="h-4 w-4 text-[#2196f3]" />
                  <span className={`text-sm font-semibold ${textPrimary}`}>ATDL File Comparison</span>
                  <span className="px-2 py-0.5 rounded text-xs bg-[#4caf50]/20 text-[#4caf50]">1 Added</span>
                  <span className="px-2 py-0.5 rounded text-xs bg-[#f44336]/20 text-[#f44336]">1 Missing</span>
                </div>
                <div className="grid grid-cols-2 divide-x divide-[#1e4976]">
                  <div className={`p-3 ${isDarkMode ? "bg-[#0a1628]" : "bg-white"}`}>
                    <p className={`text-xs font-semibold ${textSecondary} mb-2`}>Old ATDL (v1.4)</p>
                    <pre className={`text-xs ${textSecondary} font-mono overflow-x-auto whitespace-pre-wrap`}>{`<Strategy name="VWAP" wireValue="V">
  <Parameter name="StartTime" .../>
  <Parameter name="EndTime" .../>
  <Parameter name="ParticipationRate"
    xsi:type="Percentage_t"/>
</Strategy>
<Strategy name="TWAP" wireValue="T">
  ...
</Strategy>`}</pre>
                  </div>
                  <div className={`p-3 ${isDarkMode ? "bg-[#0a1628]/60" : "bg-[#f8fafc]"}`}>
                    <p className={`text-xs font-semibold ${textSecondary} mb-2`}>New ATDL (v1.5)</p>
                    <pre className={`text-xs ${textSecondary} font-mono overflow-x-auto whitespace-pre-wrap`}>{`<Strategy name="VWAP" wireValue="V">
  <Parameter name="StartTime" .../>
  <Parameter name="EndTime" .../>
  <Parameter name="ParticipationRate"
    xsi:type="Percentage_t"/> `}<span className="bg-[#f44336]/30 text-[#f44336]">← Should be Decimal</span>{`
</Strategy>
<Strategy name="TWAP" wireValue="T">
  ...
</Strategy>
`}<span className="bg-[#4caf50]/30 text-[#4caf50]">{`<Strategy name="POV">
  <Parameter name="ParticipationRate"
    xsi:type="Decimal_t"/>
</Strategy>`}</span>{` `}<span className="bg-[#f44336]/30 text-[#f44336]">← Missing wireValue</span></pre>
                  </div>
                </div>
              </div>

              <div className={`p-3 rounded-lg border border-[#2196f3]/30 bg-[#2196f3]/5`}>
                <p className={`text-sm font-medium text-[#2196f3]`}>Structural Validation</p>
                <p className={`text-xs ${textSecondary} mt-0.5`}>Validating new ATDL against FIXatdl standard schema.</p>
              </div>
            </>
          )}
          {atdlWorkflowType === "compare-atdl" && (
            <div className={`p-3 rounded-lg border border-[#ff9800]/30 bg-[#ff9800]/5`}>
              <p className={`text-sm font-medium text-[#ff9800]`}>Step: Schema Validation</p>
              <p className={`text-xs ${textSecondary} mt-0.5`}>Validating both ATDLs against FIXatdl schema before comparison.</p>
            </div>
          )}

          {/* Summary counts */}
          <div className="flex items-center gap-3">
            <span className="px-2 py-1 rounded text-xs bg-[#4caf50]/20 text-[#4caf50]">4 Pass</span>
            <span className="px-2 py-1 rounded text-xs bg-[#ff9800]/20 text-[#ff9800]">1 Warning</span>
            <span className="px-2 py-1 rounded text-xs bg-[#f44336]/20 text-[#f44336]">1 Error · 1 Blocker</span>
          </div>

          {/* Validation results */}
          <div className="space-y-2">
            {[
              { rule: "Schema Validation", status: "pass", msg: "Conforms to FIXatdl-1-1 schema", owner: null, blocker: false },
              { rule: "Strategy Definitions", status: "pass", msg: "All 5 strategies have valid structure", owner: null, blocker: false },
              { rule: "Parameter Types", status: "warning", msg: "2 parameters use deprecated types", owner: "J. Smith", blocker: false },
              { rule: "UI Control Mappings", status: "pass", msg: "All parameters mapped to valid controls", owner: null, blocker: false },
              { rule: "Validation Rules", status: "pass", msg: "All validation rules are well-formed", owner: null, blocker: false },
              { rule: "Wire Value Mappings", status: "error", msg: "Strategy 'POV' missing wireValue attribute", owner: "J. Smith", blocker: true },
            ].map((r, i) => (
              <div key={i} className={`flex items-center gap-3 p-3 rounded-lg border ${r.status === "error" ? "border-[#f44336]/40 bg-[#f44336]/5" : r.status === "warning" ? "border-[#ff9800]/30 bg-[#ff9800]/5" : `${borderColor} ${isDarkMode ? "bg-[#0a1628]/40" : "bg-gray-50"}`}`}>
                {r.status === "pass" && <CheckCircle className="h-4 w-4 text-[#4caf50] flex-shrink-0" />}
                {r.status === "warning" && <AlertTriangle className="h-4 w-4 text-[#ff9800] flex-shrink-0" />}
                {r.status === "error" && <AlertCircle className="h-4 w-4 text-[#f44336] flex-shrink-0" />}
                <span className={`text-sm font-medium flex-1 ${textPrimary}`}>{r.rule}</span>
                <span className={`text-xs flex-1 ${textSecondary}`}>{r.msg}</span>
                {r.blocker && <span className="text-xs px-1.5 py-0.5 rounded bg-[#f44336]/20 text-[#f44336]">Blocker</span>}
                {r.owner && <span className={`text-xs ${textSecondary}`}>{r.owner}</span>}
                {r.status !== "pass" && (
                  <div className="flex gap-1">
                    {["Acknowledge","Defer","Escalate"].map(a => {
                      const actionKey = `val-${i}-${a}`
                      const isSelected = atdlValidationActions[`val-${i}`] === a
                      return (
                        <button
                          key={a}
                          onClick={() => setAtdlValidationActions(prev => ({ ...prev, [`val-${i}`]: a }))}
                          className={`px-2 py-0.5 rounded text-xs border transition-colors ${
                            isSelected
                              ? a === "Acknowledge" ? "bg-[#4caf50]/20 border-[#4caf50] text-[#4caf50]"
                              : a === "Defer" ? "bg-[#ff9800]/20 border-[#ff9800] text-[#ff9800]"
                              : "bg-[#f44336]/20 border-[#f44336] text-[#f44336]"
                              : `${borderColor} ${textSecondary} hover:border-[#00e5ff] hover:text-[#00e5ff]`
                          }`}
                        >
                          {a}
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ),
      3: (
        <div className="space-y-4">
          {/* Workflow context banner */}
          {atdlWorkflowType === "create-from-spec" && (
            <div className={`p-3 rounded-lg border border-[#4caf50]/30 bg-[#4caf50]/5`}>
              <p className={`text-sm font-medium text-[#4caf50]`}>Step: Review Spec Changes & Generate ATDL</p>
              <p className={`text-xs ${textSecondary} mt-0.5`}>Review changes between old and new FIX spec. Once acknowledged, new ATDL will be generated.</p>
            </div>
          )}
          {atdlWorkflowType === "validate-update" && (
            <div className={`p-3 rounded-lg border border-[#2196f3]/30 bg-[#2196f3]/5`}>
              <p className={`text-sm font-medium text-[#2196f3]`}>Step: Verify Spec Changes Reflected in ATDL</p>
              <p className={`text-xs ${textSecondary} mt-0.5`}>Checking if FIX spec changes are correctly reflected in the counterparty ATDL update.</p>
            </div>
          )}
          {atdlWorkflowType === "compare-atdl" && (
            <div className={`p-3 rounded-lg border border-[#ff9800]/30 bg-[#ff9800]/5`}>
              <p className={`text-sm font-medium text-[#ff9800]`}>Step: ATDL Comparison</p>
              <p className={`text-xs ${textSecondary} mt-0.5`}>Comparing client-side ATDL against admin/sell-side ATDL for alignment.</p>
            </div>
          )}

          {/* Column headers based on workflow */}
          <div className={`flex items-center gap-3 px-4 py-2 rounded-t-lg ${isDarkMode ? "bg-[#1e4976]/30" : "bg-gray-100"}`}>
            <div className="w-16"></div>
            <div className="flex-1 text-center">
              <span className={`text-xs font-semibold text-[#00e5ff]`}>
                {atdlWorkflowType === "create-from-spec" ? "Old FIX Spec" : atdlWorkflowType === "validate-update" ? "FIX Spec Change" : "Client-Side ATDL"}
              </span>
            </div>
            <div className="w-8"></div>
            <div className="flex-1 text-center">
              <span className={`text-xs font-semibold text-[#00e5ff]`}>
                {atdlWorkflowType === "create-from-spec" ? "New FIX Spec" : atdlWorkflowType === "validate-update" ? "ATDL Reflection" : "Admin/Sell-Side ATDL"}
              </span>
            </div>
            <div className="w-24"></div>
          </div>

          {/* Comparison rows */}
          {[
            { title: atdlWorkflowType === "create-from-spec" ? "New Strategy Added" : "Missing Strategies", severity: "High", left: atdlWorkflowType === "create-from-spec" ? "VWAP, TWAP defined" : "VWAP, TWAP, POV, IS, MOC", right: atdlWorkflowType === "create-from-spec" ? "VWAP, TWAP, POV (POV added)" : "VWAP, TWAP (POV, IS, MOC missing)", decision: null, breaking: atdlWorkflowType !== "create-from-spec" },
            { title: "Parameter Type Change", severity: "High", left: "Tag 7942: Percentage (0-100)", right: atdlWorkflowType === "create-from-spec" ? "Tag 7942: Decimal (0-1) — NEW" : "ParticipationRate: Decimal (0-1)", decision: null, breaking: true },
            { title: atdlWorkflowType === "create-from-spec" ? "New Parameter" : "Missing Parameters", severity: "Medium", left: atdlWorkflowType === "create-from-spec" ? "(not present)" : "Tag 7941 (EndTime) required", right: atdlWorkflowType === "create-from-spec" ? "Tag 7941 (EndTime) — ADDED" : "EndTime not defined", decision: null, breaking: atdlWorkflowType !== "create-from-spec" },
            { title: "Enum Value Update", severity: "Low", left: "Urgency: Low, Medium, High", right: "Urgency: Low, Medium, High, Critical", decision: "accept", breaking: false },
          ].map((row, i) => {
            const dec = atdlDecisions[`wf-${i}`] || row.decision
            return (
              <div key={i} className={`border ${row.breaking ? "border-[#f44336]/40" : borderColor} rounded-lg overflow-hidden`}>
                <div className={`flex items-center gap-3 px-4 py-2 ${isDarkMode ? "bg-[#1e4976]/20" : "bg-gray-50"}`}>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded ${row.severity === "High" ? "bg-[#f44336]/20 text-[#f44336]" : row.severity === "Medium" ? "bg-[#ff9800]/20 text-[#ff9800]" : "bg-[#2196f3]/20 text-[#2196f3]"}`}>{row.severity}</span>
                  <span className={`text-sm font-semibold ${textPrimary}`}>{row.title}</span>
                  {row.breaking && <span className="text-xs px-1.5 py-0.5 rounded bg-[#f44336]/20 text-[#f44336]">Breaking</span>}
                  {dec && <span className={`ml-auto text-xs px-2 py-0.5 rounded ${dec === "accept" ? "bg-[#4caf50]/20 text-[#4caf50]" : dec === "override" ? "bg-[#9c27b0]/20 text-[#9c27b0]" : dec === "defer" ? "bg-[#ff9800]/20 text-[#ff9800]" : "bg-[#f44336]/20 text-[#f44336]"}`}>{dec.charAt(0).toUpperCase() + dec.slice(1)}</span>}
                </div>
                <div className="grid grid-cols-11 gap-0">
                  <div className={`col-span-5 p-3 text-xs ${textSecondary} ${isDarkMode ? "bg-[#0a1628]/60" : "bg-white"}`}>{row.left}</div>
                  <div className={`col-span-1 flex items-center justify-center ${isDarkMode ? "bg-[#0a1628]/60" : "bg-white"} ${textSecondary}`}>
                    <ArrowRight className="h-3 w-3" />
                  </div>
                  <div className={`col-span-5 p-3 text-xs ${textSecondary} ${isDarkMode ? "bg-[#0a1628]/40" : "bg-gray-50"}`}>{row.right}</div>
                </div>
                {!dec && (
                  <div className={`flex gap-1 px-3 py-2 border-t ${borderColor} ${isDarkMode ? "bg-[#0a1628]/40" : "bg-gray-50"}`}>
                    {["accept","override","defer","reject"].map(d => (
                      <button key={d} onClick={() => setAtdlDecisions(prev => ({ ...prev, [`wf-${i}`]: d }))}
                        className={`px-2.5 py-1 rounded text-xs border transition-colors ${isDarkMode ? "border-[#1e4976] text-slate-400 hover:border-[#00e5ff] hover:text-[#00e5ff]" : "border-gray-300 text-gray-500 hover:border-blue-400 hover:text-blue-500"}`}>
                        {d.charAt(0).toUpperCase() + d.slice(1)}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )
          })}

          {/* ATDL side-by-side preview for create-from-spec workflow */}
          {atdlWorkflowType === "create-from-spec" && (
            <div className={`border ${borderColor} rounded-lg overflow-hidden mt-4`}>
              <div className={`px-4 py-2.5 ${isDarkMode ? "bg-[#1e4976]/30" : "bg-[#f1f5f9]"} flex items-center justify-between`}>
                <span className={`text-sm font-semibold ${textPrimary}`}>Generated ATDL Preview (FIXML)</span>
                <Button size="sm" variant="outline" className="h-7 text-xs">
                  <Download className="h-3 w-3 mr-1" /> Export ATDL
                </Button>
              </div>
              <div className="grid grid-cols-2 divide-x ${isDarkMode ? 'divide-[#1e4976]' : 'divide-gray-200'}">
                <div className={`p-3 ${isDarkMode ? "bg-[#0a1628]" : "bg-white"}`}>
                  <p className={`text-xs font-semibold text-[#00e5ff] mb-2`}>Old ATDL (Reference)</p>
                  <pre className={`text-xs ${textSecondary} font-mono overflow-x-auto`}>{`<Strategy name="VWAP">
  <Parameter name="StartTime"/>
  <Parameter name="EndTime"/>
</Strategy>
<Strategy name="TWAP">
  ...
</Strategy>`}</pre>
                </div>
                <div className={`p-3 ${isDarkMode ? "bg-[#0a1628]/60" : "bg-[#f8fafc]"}`}>
                  <p className={`text-xs font-semibold text-[#4caf50] mb-2`}>New ATDL (Generated)</p>
                  <pre className={`text-xs ${textSecondary} font-mono overflow-x-auto`}>{`<Strategy name="VWAP">
  <Parameter name="StartTime"/>
  <Parameter name="EndTime"/>
</Strategy>
<Strategy name="TWAP">
  ...
</Strategy>
`}<span className="text-[#4caf50]">{`<Strategy name="POV">
  <Parameter name="ParticipationRate"
    type="Decimal" minValue="0" maxValue="1"/>
</Strategy>`}</span></pre>
                </div>
              </div>
            </div>
          )}
        </div>
      ),
      4: (
        <div className="space-y-5">
          {/* ATDL Analysis step with N/A option */}
          <div className={`p-4 rounded-lg border ${borderColor} ${isDarkMode ? "bg-[#1e4976]/10" : "bg-gray-50"} flex items-center justify-between`}>
            <div className="flex items-center gap-3">
              <Layers className="h-5 w-5 text-[#00e5ff]" />
              <div>
                <p className={`text-sm font-semibold ${textPrimary}`}>ATDL Analysis Required?</p>
                <p className={`text-xs ${textSecondary}`}>Not all clients require algo trading strategy validation</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant={atdlWorkflowType === "create-from-spec" ? "default" : "outline"}
                onClick={() => setAtdlWorkflowType("create-from-spec")}
                className={atdlWorkflowType === "create-from-spec" ? "bg-[#4caf50] hover:bg-[#4caf50]/80" : ""}
              >
                <CheckCircle className="h-3.5 w-3.5 mr-1.5" /> Yes, Include ATDL
              </Button>
              <Button
                size="sm"
                variant={atdlWorkflowType === "compare-atdl" ? "default" : "outline"}
                onClick={() => setAtdlWorkflowType("compare-atdl")}
                className={atdlWorkflowType === "compare-atdl" ? "bg-slate-500 hover:bg-slate-500/80" : ""}
              >
                <X className="h-3.5 w-3.5 mr-1.5" /> Mark as N/A
              </Button>
            </div>
          </div>

          {atdlWorkflowType !== "compare-atdl" ? (
            <>
              {/* Strategy selector tabs */}
              <div className="flex items-center gap-2">
                <span className={`text-xs font-medium ${textSecondary} mr-1`}>Strategy:</span>
                {["VWAP","TWAP","POV"].map((s, i) => (
                  <button
                    key={s}
                    onClick={() => setAtdlSelectedStrategy(s)}
                    className={`px-3 py-1.5 rounded text-sm font-medium border transition-colors flex items-center gap-1.5 ${
                      atdlSelectedStrategy === s
                        ? "bg-[#00e5ff]/20 text-[#00e5ff] border-[#00e5ff]/40"
                        : `${borderColor} ${textSecondary} hover:border-[#00e5ff]`
                    }`}
                  >
                    {s}
                    {i === 2 ? <AlertCircle className="h-3 w-3 text-[#f44336]" /> : <CheckCircle className="h-3 w-3 text-[#4caf50]" />}
                  </button>
                ))}
              </div>

              {/* ATDL comparison view */}
              <div className={`border ${borderColor} rounded-lg overflow-hidden`}>
                <div className={`px-4 py-2.5 ${isDarkMode ? "bg-[#1e4976]/30" : "bg-[#f1f5f9]"} flex items-center gap-2`}>
                  <GitCompare className="h-4 w-4 text-[#00e5ff]" />
                  <span className={`text-sm font-semibold ${textPrimary}`}>ATDL Side-by-Side Comparison</span>
                  <span className="px-2 py-0.5 rounded text-xs bg-[#4caf50]/20 text-[#4caf50]">2 Added</span>
                  <span className="px-2 py-0.5 rounded text-xs bg-[#ff9800]/20 text-[#ff9800]">1 Modified</span>
                  <span className="px-2 py-0.5 rounded text-xs bg-[#f44336]/20 text-[#f44336]">1 Missing</span>
                </div>
                <div className="grid grid-cols-2 divide-x divide-[#1e4976]">
                  <div className={`p-4 ${isDarkMode ? "bg-[#0a1628]" : "bg-white"}`}>
                    <p className={`text-xs font-semibold ${textSecondary} mb-2`}>Client-Side ATDL</p>
                    <pre className={`text-xs ${textSecondary} font-mono overflow-x-auto whitespace-pre-wrap`}>{`<Strategy name="VWAP" wireValue="V">
  <Parameter name="StartTime" .../>
  <Parameter name="EndTime" .../>
  <Parameter name="ParticipationRate"
    xsi:type="Percentage_t"/>
</Strategy>
<Strategy name="TWAP" wireValue="T">
  ...
</Strategy>`}</pre>
                  </div>
                  <div className={`p-4 ${isDarkMode ? "bg-[#0a1628]/60" : "bg-[#f8fafc]"}`}>
                    <p className={`text-xs font-semibold ${textSecondary} mb-2`}>Admin/Sell-Side ATDL</p>
                    <pre className={`text-xs ${textSecondary} font-mono overflow-x-auto whitespace-pre-wrap`}>{`<Strategy name="VWAP" wireValue="V">
  <Parameter name="StartTime" .../>
  <Parameter name="EndTime" .../>
  <Parameter name="ParticipationRate"
    xsi:type="`}<span className="text-[#ff9800]">Decimal_t</span>{`"/>
</Strategy>
<Strategy name="TWAP" wireValue="T">
  ...
</Strategy>
`}<span className="text-[#4caf50]">{`<Strategy name="POV" wireValue="P">
  <Parameter name="ParticipationRate"/>
  <Parameter name="MaxFloor"/>
</Strategy>`}</span></pre>
                  </div>
                </div>
              </div>

              {/* ATDL validation findings */}
              <div className="space-y-2">
                <p className={`text-xs font-semibold ${textSecondary} uppercase tracking-wider`}>ATDL Validation Findings</p>
                {[
                  { id: "atdl-1", rule: "Parameter Type Mismatch", desc: "ParticipationRate: Percentage_t vs Decimal_t", severity: "error" },
                  { id: "atdl-2", rule: "New Strategy Detected", desc: "POV strategy added in admin ATDL", severity: "warning" },
                  { id: "atdl-3", rule: "Wire Value Consistency", desc: "All strategies have matching wireValue attributes", severity: "pass" },
                ].map(finding => (
                  <div key={finding.id} className={`flex items-center gap-3 p-3 rounded-lg border ${finding.severity === "error" ? "border-[#f44336]/40 bg-[#f44336]/5" : finding.severity === "warning" ? "border-[#ff9800]/30 bg-[#ff9800]/5" : `${borderColor} ${isDarkMode ? "bg-[#0a1628]/40" : "bg-gray-50"}`}`}>
                    {finding.severity === "pass" && <CheckCircle className="h-4 w-4 text-[#4caf50] flex-shrink-0" />}
                    {finding.severity === "warning" && <AlertTriangle className="h-4 w-4 text-[#ff9800] flex-shrink-0" />}
                    {finding.severity === "error" && <AlertCircle className="h-4 w-4 text-[#f44336] flex-shrink-0" />}
                    <span className={`text-sm font-medium ${textPrimary}`}>{finding.rule}</span>
                    <span className={`text-xs flex-1 ${textSecondary}`}>{finding.desc}</span>
                    {finding.severity !== "pass" && (
                      <div className="flex gap-1">
                        {["Acknowledge","Defer","Escalate"].map(a => {
                          const isSelected = atdlValidationActions[`atdl-${finding.id}`] === a
                          return (
                            <button
                              key={a}
                              onClick={() => setAtdlValidationActions(prev => ({ ...prev, [`atdl-${finding.id}`]: a }))}
                              className={`px-2 py-0.5 rounded text-xs border transition-colors ${
                                isSelected
                                  ? a === "Acknowledge" ? "bg-[#4caf50]/20 border-[#4caf50] text-[#4caf50]"
                                  : a === "Defer" ? "bg-[#ff9800]/20 border-[#ff9800] text-[#ff9800]"
                                  : "bg-[#f44336]/20 border-[#f44336] text-[#f44336]"
                                  : `${borderColor} ${textSecondary} hover:border-[#00e5ff] hover:text-[#00e5ff]`
                              }`}
                            >
                              {a}
                            </button>
                          )
                        })}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className={`p-8 rounded-lg border ${borderColor} ${isDarkMode ? "bg-[#0a1628]/40" : "bg-gray-50"} text-center`}>
              <div className="p-3 rounded-full bg-slate-500/20 w-fit mx-auto mb-3">
                <X className="h-6 w-6 text-slate-400" />
              </div>
              <p className={`text-sm font-medium ${textPrimary} mb-1`}>ATDL Analysis Marked as N/A</p>
              <p className={`text-xs ${textSecondary}`}>This onboarding case does not require algo trading strategy validation. Click &quot;Next&quot; to continue to Testing.</p>
            </div>
          )}
        </div>
      ),
      5: (
        <div className="space-y-5">
          {/* Strategy selector tabs */}
          <div className="flex items-center gap-2">
            <span className={`text-xs font-medium ${textSecondary} mr-1`}>Strategy:</span>
            {["VWAP","TWAP","POV"].map((s, i) => (
              <button
                key={s}
                onClick={() => setAtdlSelectedStrategy(s)}
                className={`px-3 py-1.5 rounded text-sm font-medium border transition-colors flex items-center gap-1.5 ${
                  atdlSelectedStrategy === s
                    ? "bg-[#00e5ff]/20 text-[#00e5ff] border-[#00e5ff]/40"
                    : `${borderColor} ${textSecondary} hover:border-[#00e5ff]`
                }`}
              >
                {s}
                {i === 2 ? <AlertCircle className="h-3 w-3 text-[#f44336]" /> : <CheckCircle className="h-3 w-3 text-[#4caf50]" />}
              </button>
            ))}
          </div>

          {/* Visual UI Representation */}
          <div className={`border ${borderColor} rounded-lg overflow-hidden`}>
            <div className={`px-4 py-2.5 ${isDarkMode ? "bg-[#1e4976]/30" : "bg-[#f1f5f9]"} flex items-center justify-between`}>
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4 text-[#00e5ff]" />
                <span className={`text-sm font-semibold ${textPrimary}`}>UI Representation — {atdlSelectedStrategy}</span>
                <span className={`px-2 py-0.5 rounded text-xs ${atdlSelectedStrategy === "POV" ? "bg-[#f44336]/20 text-[#f44336]" : "bg-[#4caf50]/20 text-[#4caf50]"}`}>
                  {atdlSelectedStrategy === "POV" ? "Has Issues" : "Valid"}
                </span>
              </div>
              <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => simulateTask(() => setAtdlUiVisible(true))}>
                <Play className="h-3 w-3 mr-1" /> {isLoading ? "Loading..." : "Load UI"}
              </Button>
            </div>
            <div className={`p-4 ${isDarkMode ? "bg-[#0a1628]" : "bg-[#f8fafc]"}`}>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className={`block text-xs mb-1 ${textSecondary}`}>Start Time</label>
                  <Input type="time" defaultValue="09:30" className={`h-8 text-sm ${isDarkMode ? "bg-[#0a1628] border-[#1e4976] text-white" : "bg-white text-[#0a1628]"}`} />
                </div>
                <div>
                  <label className={`block text-xs mb-1 ${textSecondary}`}>End Time</label>
                  <Input type="time" defaultValue="16:00" className={`h-8 text-sm ${isDarkMode ? "bg-[#0a1628] border-[#1e4976] text-white" : "bg-white text-[#0a1628]"}`} />
                </div>
                <div>
                  <label className={`block text-xs mb-1 ${textSecondary}`}>Participation Rate (%)</label>
                  <Input type="number" defaultValue="15" className={`h-8 text-sm ${isDarkMode ? "bg-[#0a1628] border-[#1e4976] text-white" : "bg-white text-[#0a1628]"}`} />
                </div>
                <div>
                  <label className={`block text-xs mb-1 ${textSecondary}`}>Min Quantity</label>
                  <Input type="number" defaultValue="100" className={`h-8 text-sm ${isDarkMode ? "bg-[#0a1628] border-[#1e4976] text-white" : "bg-white text-[#0a1628]"}`} />
                </div>
                <div>
                  <label className={`block text-xs mb-1 ${textSecondary}`}>Max Floor</label>
                  <Input type="number" defaultValue="500" className={`h-8 text-sm ${isDarkMode ? "bg-[#0a1628] border-[#1e4976] text-white" : "bg-white text-[#0a1628]"}`} />
                </div>
                <div>
                  <label className={`block text-xs mb-1 ${textSecondary}`}>Display Qty</label>
                  <Input type="number" defaultValue="200" className={`h-8 text-sm ${isDarkMode ? "bg-[#0a1628] border-[#1e4976] text-white" : "bg-white text-[#0a1628]"}`} />
                </div>
              </div>
            </div>
          </div>

          {/* Quick Test: FIX Generation + Validation */}
          <div className={`border ${borderColor} rounded-lg overflow-hidden`}>
            <div className={`px-4 py-2.5 ${isDarkMode ? "bg-[#1e4976]/30" : "bg-[#f1f5f9]"} flex items-center justify-between`}>
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-[#00e5ff]" />
                <span className={`text-sm font-semibold ${textPrimary}`}>Quick Test — FIX Generation</span>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => simulateTask(() => setAtdlFixMessageGenerated(true))}>
                  <Zap className="h-3 w-3 mr-1" /> Generate FIX
                </Button>
                <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => simulateTask(() => setAtdlFixValidationResults(true))}>
                  <CheckCircle className="h-3 w-3 mr-1" /> Validate
                </Button>
              </div>
            </div>
            <div className={`p-4 ${isDarkMode ? "bg-[#0a1628]" : "bg-white"}`}>
              <p className={`text-xs font-semibold ${textSecondary} mb-2`}>Generated FIX Message</p>
              {!atdlFixMessageGenerated ? (
                <div className={`p-6 rounded border ${borderColor} ${isDarkMode ? "bg-[#0a1628]/60" : "bg-[#f8fafc]"} text-center`}>
                  <Zap className={`h-8 w-8 mx-auto mb-2 ${textSecondary} opacity-50`} />
                  <p className={`text-sm ${textSecondary}`}>Click &quot;Generate FIX&quot; to create FIX message from UI parameters</p>
                </div>
              ) : (
                <div className={`font-mono text-xs p-3 rounded border ${borderColor} ${isDarkMode ? "bg-[#0a1628]/60" : "bg-[#f8fafc]"} overflow-x-auto`}>
                  <span className={textPrimary}>8=FIX.4.4|9=256|35=D|49=SENDER|56=TARGET|34=1|52=20260413-14:30:00.000|11=ORDER123|21=1|55=AAPL|54=1|60=20260413-14:30:00.000|38=10000|40=2|44=150.00|59=0|</span>
                  <span className="text-[#00e5ff]">847={atdlSelectedStrategy}|7940=09:30:00|7941=16:00:00|7942=15|7943=100|7944=500|7945=200|7946=M|</span>
                  <span className={textPrimary}>10=128|</span>
                </div>
              )}
              {atdlFixValidationResults && (
                <div className="mt-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <p className={`text-xs font-semibold ${textSecondary}`}>Validation Result</p>
                    <div className="flex items-center gap-3">
                      <span className="px-2 py-1 rounded text-xs bg-[#4caf50]/20 text-[#4caf50]">4 Matches</span>
                      <span className="px-2 py-1 rounded text-xs bg-[#f44336]/20 text-[#f44336]">3 Mismatches</span>
                      <span className={`text-xs ${textSecondary}`}>against Equities FIX 4.4 v2.1</span>
                    </div>
                  </div>
                  {/* Validation errors with action buttons */}
                  <div className="space-y-2">
                    {[
                      { id: "sim-1", field: "Tag 7942 (ParticipationRate)", issue: "Value 15 exceeds max 1.0 for Decimal type", severity: "error" },
                      { id: "sim-2", field: "Tag 7944 (MaxFloor)", issue: "Missing required attribute in POV strategy", severity: "error" },
                      { id: "sim-3", field: "Tag 7946 (Urgency)", issue: "Value 'M' not in allowed enum values", severity: "warning" },
                    ].map(err => {
                      const selectedAction = atdlSimulationErrors[err.id]
                      return (
                        <div key={err.id} className={`flex items-center gap-3 p-2.5 rounded border ${err.severity === "error" ? "border-[#f44336]/40 bg-[#f44336]/5" : "border-[#ff9800]/30 bg-[#ff9800]/5"}`}>
                          {err.severity === "error" ? <AlertCircle className="h-3.5 w-3.5 text-[#f44336] flex-shrink-0" /> : <AlertTriangle className="h-3.5 w-3.5 text-[#ff9800] flex-shrink-0" />}
                          <span className={`text-xs font-medium ${textPrimary}`}>{err.field}</span>
                          <span className={`text-xs flex-1 ${textSecondary}`}>{err.issue}</span>
                          <div className="flex gap-1">
                            {["Ignore","Raise","Fix"].map(a => {
                              const isSelected = selectedAction === a
                              return (
                                <button
                                  key={a}
                                  onClick={() => setAtdlSimulationErrors(prev => ({ ...prev, [err.id]: a }))}
                                  className={`px-2 py-0.5 rounded text-xs border transition-colors ${
                                    isSelected
                                      ? a === "Ignore" ? "bg-[#9e9e9e]/20 border-[#9e9e9e] text-[#9e9e9e]"
                                      : a === "Raise" ? "bg-[#f44336]/20 border-[#f44336] text-[#f44336]"
                                      : "bg-[#4caf50]/20 border-[#4caf50] text-[#4caf50]"
                                      : `${borderColor} ${textSecondary} hover:border-[#00e5ff] hover:text-[#00e5ff]`
                                  }`}
                                >
                                  {a}
                                </button>
                              )
                            })}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Strategy Qualification Summary */}
          <div>
            <p className={`text-xs font-semibold ${textSecondary} mb-2 uppercase tracking-wider`}>Strategy Qualification Summary</p>
            <div className="grid grid-cols-3 gap-3">
              {["VWAP","TWAP","POV"].map((s, i) => (
                <div key={s} className={`p-3 rounded-lg border ${i === 2 ? "border-[#f44336]/40 bg-[#f44336]/5" : "border-[#4caf50]/40 bg-[#4caf50]/5"}`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`font-semibold text-sm ${textPrimary}`}>{s}</span>
                    {i === 2 ? <AlertCircle className="h-4 w-4 text-[#f44336]" /> : <CheckCircle className="h-4 w-4 text-[#4caf50]" />}
                  </div>
                  <div className="space-y-1 text-xs">
                    {["UI Render","FIX Generation","Mapping","Boundary Tests"].map((check, j) => (
                      <div key={check} className="flex items-center gap-1.5">
                        {(i === 2 && j === 2) ? <AlertCircle className="h-3 w-3 text-[#f44336]" /> : <CheckCircle className="h-3 w-3 text-[#4caf50]" />}
                        <span className={textSecondary}>{check}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
      6: (
        <div className="space-y-3">
          <p className={`text-sm ${textSecondary} mb-3`}>2 open findings require remediation before approval.</p>
          {[
            { id: "R-001", severity: "High",   finding: "wireValue missing on POV strategy",          owner: "J. Smith",  status: "in-progress" },
            { id: "R-002", severity: "High",   finding: "ParticipationRate type mismatch (Pct vs Dec)", owner: "Unassigned", status: "open" },
            { id: "R-003", severity: "Medium", finding: "EndTime parameter missing from ATDL",         owner: "M. Chen",   status: "resolved" },
          ].map(r => (
            <div key={r.id} className={`flex items-center gap-3 p-3 rounded-lg border ${r.status === "resolved" ? "border-[#4caf50]/30 opacity-60" : r.status === "in-progress" ? "border-[#2196f3]/30" : `border-[#f44336]/30`} ${isDarkMode ? "bg-[#0a1628]/40" : "bg-gray-50"}`}>
              <span className={`text-xs font-mono ${textSecondary} w-14`}>{r.id}</span>
              <span className={`text-xs px-1.5 py-0.5 rounded ${r.severity === "High" ? "bg-[#f44336]/20 text-[#f44336]" : "bg-[#ff9800]/20 text-[#ff9800]"}`}>{r.severity}</span>
              <span className={`text-sm flex-1 ${textPrimary}`}>{r.finding}</span>
              <span className={`text-xs ${textSecondary}`}>{r.owner}</span>
              <span className={`text-xs px-1.5 py-0.5 rounded ${r.status === "resolved" ? "bg-[#4caf50]/20 text-[#4caf50]" : r.status === "in-progress" ? "bg-[#2196f3]/20 text-[#2196f3]" : "bg-[#f44336]/20 text-[#f44336]"}`}>{r.status}</span>
            </div>
          ))}
        </div>
      ),
      7: (
        <div className="space-y-4">
          <div className={`p-4 rounded-lg border border-[#4caf50]/40 bg-[#4caf50]/5 flex items-start gap-3`}>
            <CheckCircle className="h-5 w-5 text-[#4caf50] flex-shrink-0 mt-0.5" />
            <div>
              <p className={`font-semibold text-[#4caf50]`}>All gates cleared — ready for sign-off</p>
              <p className={`text-xs ${textSecondary} mt-0.5`}>Zero blockers remaining. 2 warnings accepted and documented.</p>
            </div>
          </div>
          <div className="space-y-2">
            {[
              { role: "Technical Lead", name: "Sarah Johnson", signed: true, date: "Apr 12, 2026" },
              { role: "Compliance",     name: "David Park",    signed: true, date: "Apr 13, 2026" },
              { role: "Management",     name: "Karen Mitchell", signed: false, date: null },
            ].map(a => (
              <div key={a.role} className={`flex items-center gap-3 p-3 rounded-lg border ${a.signed ? "border-[#4caf50]/40" : borderColor} ${isDarkMode ? "bg-[#0a1628]/40" : "bg-gray-50"}`}>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center ${a.signed ? "bg-[#4caf50]" : isDarkMode ? "bg-[#1e4976]/40" : "bg-gray-200"}`}>
                  {a.signed ? <CheckCircle className="h-4 w-4 text-white" /> : <Clock className="h-3.5 w-3.5 text-slate-400" />}
                </div>
                <div className="flex-1">
                  <p className={`text-sm font-medium ${textPrimary}`}>{a.role}</p>
                  <p className={`text-xs ${textSecondary}`}>{a.name}</p>
                </div>
                {a.signed ? <span className={`text-xs ${textSecondary}`}>{a.date}</span> : <Button size="sm" variant="outline" className="text-xs h-7">Approve</Button>}
              </div>
            ))}
          </div>
          <Button className="w-full bg-[#4caf50] hover:bg-[#4caf50]/80 text-white">
            <Download className="h-4 w-4 mr-2" /> Generate Certification Pack
          </Button>
        </div>
      ),
    }

    return (
      <div className={`min-h-screen ${bgPrimary} flex`}>
        <Sidebar />
        <div className="flex-1 overflow-auto">
          <header className={`${bgSecondary} border-b ${borderColor} px-6 py-4`}>
            <button onClick={() => setCurrentScreen("atdl-workbench" as any)} className={`flex items-center gap-2 mb-2 ${textSecondary} hover:text-[#00e5ff] text-sm`}>
              <ArrowLeft className="h-4 w-4" /> Back to Onboarding Cases
            </button>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-[#00e5ff]/10">
                  <Briefcase className="h-6 w-6 text-[#00e5ff]" />
                </div>
                <div>
                  <h1 className={`text-2xl font-bold ${textPrimary}`}>Onboarding Case Workflow</h1>
                  <p className={`text-sm ${textSecondary}`}>{atdlWizardWorkOrder ? `Case: ${atdlWizardWorkOrder}` : "New Onboarding Case"}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" size="sm">
                  <History className="h-4 w-4 mr-1.5" /> Save Draft
                </Button>
                <Button variant="outline" size="sm">
                  <Users className="h-4 w-4 mr-1.5" /> Assign Owners
                </Button>
              </div>
            </div>
          </header>

          <div className="p-6">
            {/* Stepper */}
            <div className="flex items-start gap-0 mb-8 overflow-x-auto pb-2">
              {steps.map((step, idx) => {
                const isActive = atdlWizardStep === idx
                const isDone = atdlWizardStep > idx
                const isOptional = (step as any).optional
                return (
                  <div key={step.id} className="flex items-start flex-1 min-w-0">
                    <div className="flex flex-col items-center flex-shrink-0 relative">
                      <button
                        onClick={() => setAtdlWizardStep(idx)}
                        className={`w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all ${
                          isDone ? "bg-[#4caf50] border-[#4caf50] text-white" :
                          isActive ? "bg-[#00e5ff] border-[#00e5ff] text-[#0a1628]" :
                          isDarkMode ? "bg-[#1e4976]/30 border-[#1e4976] text-slate-500" : "bg-gray-100 border-gray-300 text-gray-400"
                        }`}
                      >
                        {isDone ? <CheckCircle className="h-4 w-4" /> : <step.icon className="h-4 w-4" />}
                      </button>
                      <span className={`text-xs mt-1.5 font-medium text-center w-20 ${isActive ? "text-[#00e5ff]" : isDone ? "text-[#4caf50]" : textSecondary}`}>
                        {step.label}
                        {isOptional && <span className="block text-[10px] opacity-60">(Optional)</span>}
                      </span>
                    </div>
                    {idx < steps.length - 1 && (
                      <div className={`flex-1 h-0.5 mt-4 mx-1 ${atdlWizardStep > idx ? "bg-[#4caf50]" : isDarkMode ? "bg-[#1e4976]/50" : "bg-gray-200"}`} />
                    )}
                  </div>
                )
              })}
            </div>

            {/* Step content card */}
            <Card className={`${bgCard} border ${borderColor} p-6 mb-4`}>
              <div className="flex items-start gap-3 mb-5">
                {React.createElement(steps[atdlWizardStep].icon, { className: `h-5 w-5 text-[#00e5ff] mt-0.5 flex-shrink-0` })}
                <div>
                  <h2 className={`text-lg font-bold ${textPrimary}`}>{steps[atdlWizardStep].label}</h2>
                  <p className={`text-sm ${textSecondary}`}>{steps[atdlWizardStep].desc}</p>
                  {atdlWizardStep < gateForStep.length && (
                    <p className={`text-xs mt-1 ${textSecondary}`}>Gate <span className="font-bold text-[#00e5ff]">{gateForStep[atdlWizardStep]}</span>: {gateLabel[atdlWizardStep]}</p>
                  )}
                </div>
              </div>
              {stepContent[atdlWizardStep]}
            </Card>

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <Button variant="outline" onClick={() => setAtdlWizardStep(s => Math.max(0, s - 1))} disabled={atdlWizardStep === 0}>
                <ArrowLeft className="h-4 w-4 mr-2" /> Previous
              </Button>
              {atdlWizardStep < steps.length - 1 ? (
                <Button className="bg-[#00e5ff] text-[#0a1628] hover:bg-[#00e5ff]/80" onClick={() => simulateTask(() => setAtdlWizardStep(s => Math.min(steps.length - 1, s + 1)))}>
                  {isLoading ? "Processing..." : "Next"} <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button className="bg-[#4caf50] hover:bg-[#4caf50]/80 text-white" onClick={() => setCurrentScreen("atdl-workbench" as any)}>
                  Complete & Close <CheckCircle className="h-4 w-4 ml-2" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (currentScreen === "atdl-validate") {
    const atdlStrategies = [
      { name: "VWAP", description: "Volume Weighted Average Price" },
      { name: "TWAP", description: "Time Weighted Average Price" },
      { name: "POV", description: "Percentage of Volume" },
      { name: "IS", description: "Implementation Shortfall" },
      { name: "MOC", description: "Market on Close" },
    ]

    const validationResults = [
      { rule: "Schema Validation", status: "pass", message: "ATDL conforms to FIXatdl-1-1 schema" },
      { rule: "Strategy Definitions", status: "pass", message: "All 5 strategies have valid structure" },
      { rule: "Parameter Types", status: "warning", message: "2 parameters use deprecated types" },
      { rule: "UI Control Mappings", status: "pass", message: "All parameters mapped to valid controls" },
      { rule: "Validation Rules", status: "pass", message: "All validation rules are well-formed" },
      { rule: "Wire Value Mappings", status: "error", message: "Strategy 'POV' missing wireValue attribute" },
    ]

    const fixValidationResults = [
      { tag: "847", name: "TargetStrategy", atdlValue: "VWAP", fixSpecValue: "VWAP", status: "match" },
      { tag: "7940", name: "StartTime", atdlValue: "UTCTimestamp", fixSpecValue: "UTCTimestamp", status: "match" },
      { tag: "7941", name: "EndTime", atdlValue: "UTCTimestamp", fixSpecValue: "UTCTimestamp", status: "match" },
      { tag: "7942", name: "ParticipationRate", atdlValue: "Percentage (0-100)", fixSpecValue: "Decimal (0-1)", status: "mismatch" },
      { tag: "7943", name: "MinQty", atdlValue: "Int", fixSpecValue: "Qty", status: "mismatch" },
      { tag: "7944", name: "MaxFloor", atdlValue: "Int", fixSpecValue: "Int", status: "match" },
      { tag: "7945", name: "DisplayQty", atdlValue: "Int", fixSpecValue: "Qty", status: "mismatch" },
    ]

    return (
      <div className={`min-h-screen ${bgPrimary} flex`}>
        {selectedRole && <Sidebar />}
        <div className="flex-1 overflow-auto">
          <header className={`${bgSecondary} border-b ${borderColor} px-6 py-4`}>
            <button onClick={() => setCurrentScreen("dashboard")} className={`flex items-center gap-2 mb-2 ${textSecondary} hover:text-[#00e5ff]`}>
              <ArrowLeft className="h-4 w-4" /> Back to Dashboard
            </button>
<h1 className={`text-2xl font-bold ${textPrimary}`}>ATDL Validate Structure</h1>
  <p className={textSecondary}>Validate ATDL file structure, schema compliance, and standard verification</p>
          </header>

          <div className="p-6 space-y-6">
            {/* Upload and Validate Section */}
            <Card className={`${bgCard} border ${borderColor} p-6`}>
              <h3 className={`text-lg font-bold mb-4 ${textPrimary}`}>1. Upload & Validate ATDL</h3>
              
<div className="grid grid-cols-2 gap-6">
                <div>
                  {selectedRole === "client" ? (
                    <>
                      <label className={`block text-sm font-medium mb-2 ${textPrimary}`}>Select From Client ATDL Files</label>
                      <select className={`w-full p-3 rounded border ${borderColor} ${isDarkMode ? "bg-[#0a1628] text-white" : "bg-white text-[#0a1628]"}`}>
                        <option value="">Choose an ATDL file...</option>
                        <option value="client-vwap">VWAP_Strategies_v1.0.atdl</option>
                        <option value="client-algo">AlgoSuite_Client_v2.1.atdl</option>
                      </select>
                    </>
                  ) : (
                    <>
                      <label className={`block text-sm font-medium mb-2 ${textPrimary}`}>Select From Admin ATDL Files</label>
                      <select className={`w-full p-3 rounded border ${borderColor} ${isDarkMode ? "bg-[#0a1628] text-white" : "bg-white text-[#0a1628]"}`}>
                        <option value="">Choose an ATDL file...</option>
                        <option value="vwap-strategies">VWAP_Strategies_v2.1.atdl</option>
                        <option value="algo-suite">AlgoSuite_Complete_v1.5.atdl</option>
                        <option value="custom-algos">Custom_Algos_v3.0.atdl</option>
                      </select>
                    </>
                  )}
                </div>
                
                <div>
                  <label className={`block text-sm font-medium mb-2 ${textPrimary}`}>Or Upload ATDL File</label>
                  <label className={`border-2 border-dashed ${borderColor} rounded-lg p-6 text-center hover:border-[#00e5ff] cursor-pointer transition-colors block`}>
                    <input type="file" className="hidden" accept=".xml,.atdl" />
                    <Upload className={`h-8 w-8 mx-auto mb-2 ${textSecondary}`} />
                    <p className={`font-medium text-sm ${textPrimary}`}>Upload ATDL File</p>
                    <p className={`text-xs mt-1 ${textSecondary}`}>Click to browse (.xml, .atdl)</p>
                  </label>
                </div>
              </div>
              
              <div className="mt-4 flex justify-center">
                <Button onClick={() => simulateTask(() => setAtdlValidated(true))} disabled={isLoading} className="bg-white text-black hover:bg-gray-100 border border-gray-300">
                  <Play className="h-4 w-4 mr-2" /> {isLoading ? "Validating..." : "Validate ATDL Structure"}
                </Button>
              </div>
            </Card>

            {/* Validation Results */}
            {atdlValidated && (
              <Card className={`${bgCard} border ${borderColor} overflow-hidden`}>
                {/* Blocker banner */}
                <div className="flex items-center gap-3 px-5 py-3 bg-[#f44336]/10 border-b border-[#f44336]/30">
                  <AlertCircle className="h-4 w-4 text-[#f44336]" />
                  <span className="text-sm font-semibold text-[#f44336]">1 blocker must be resolved before advancing to Gate B</span>
                  <Button size="sm" className="ml-auto bg-[#f44336]/20 text-[#f44336] hover:bg-[#f44336]/30 border border-[#f44336]/40 h-7 text-xs"
                    onClick={() => setCurrentScreen("atdl-remediation" as any)}>
                    Open Remediation Queue
                  </Button>
                </div>

                <div className="p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className={`text-lg font-bold ${textPrimary}`}>Validation Results</h3>
                    <div className="flex items-center gap-2">
                      {/* Severity filter */}
                      {(["all","error","warning","pass"] as const).map(f => (
                        <button key={f} onClick={() => setAtdlValidationFilter(f)}
                          className={`px-2.5 py-1 rounded text-xs font-medium transition-colors border ${
                            atdlValidationFilter === f
                              ? f === "error" ? "bg-[#f44336]/20 text-[#f44336] border-[#f44336]/40" :
                                f === "warning" ? "bg-[#ff9800]/20 text-[#ff9800] border-[#ff9800]/40" :
                                f === "pass" ? "bg-[#4caf50]/20 text-[#4caf50] border-[#4caf50]/40" :
                                "bg-[#00e5ff]/20 text-[#00e5ff] border-[#00e5ff]/40"
                              : `${borderColor} ${textSecondary} hover:border-[#00e5ff]`
                          }`}
                        >
                          {f === "all" ? "All (6)" : f === "error" ? "Errors (1)" : f === "warning" ? "Warnings (1)" : "Passed (4)"}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    {validationResults
                      .filter(r => atdlValidationFilter === "all" || r.status === atdlValidationFilter)
                      .map((result, i) => (
                        <div key={i} className={`flex items-start gap-3 p-3.5 rounded-lg border ${
                          result.status === "error" ? "border-[#f44336]/40 bg-[#f44336]/5" :
                          result.status === "warning" ? "border-[#ff9800]/30 bg-[#ff9800]/5" :
                          `${borderColor} ${isDarkMode ? "bg-[#0a1628]/40" : "bg-gray-50"}`
                        }`}>
                          <div className="flex-shrink-0 mt-0.5">
                            {result.status === "pass" && <CheckCircle className="h-4 w-4 text-[#4caf50]" />}
                            {result.status === "warning" && <AlertTriangle className="h-4 w-4 text-[#ff9800]" />}
                            {result.status === "error" && <AlertCircle className="h-4 w-4 text-[#f44336]" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-0.5">
                              <span className={`text-sm font-semibold ${textPrimary}`}>{result.rule}</span>
                              {result.status === "error" && <span className="text-xs px-1.5 py-0.5 rounded bg-[#f44336]/20 text-[#f44336]">Blocker</span>}
                            </div>
                            <span className={`text-xs ${textSecondary}`}>{result.message}</span>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            {result.status !== "pass" && (
                              <select className={`text-xs rounded border ${borderColor} ${isDarkMode ? "bg-[#0a1628] text-white" : "bg-white"} p-1`}>
                                <option>Unassigned</option>
                                <option>J. Smith</option>
                                <option>M. Chen</option>
                                <option>S. Johnson</option>
                              </select>
                            )}
                            {result.status !== "pass" && (
                              <Button size="sm" variant="outline" className="h-7 px-2 text-xs">Re-run</Button>
                            )}
                          </div>
                        </div>
                    ))}
                  </div>

                  <div className="mt-5 flex justify-between items-center">
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm"><Download className="h-4 w-4 mr-1.5" /> Export Report</Button>
                      <Button variant="outline" size="sm" onClick={() => setCurrentScreen("atdl-remediation" as any)}>
                        <Wrench className="h-4 w-4 mr-1.5" /> Remediation Queue
                      </Button>
                    </div>
                    <Button onClick={() => setCurrentScreen("atdl-ui-repr")} className="bg-[#00e5ff] text-[#0a1628] hover:bg-[#00e5ff]/80">
                      <Eye className="h-4 w-4 mr-2" /> Usage Preview
                    </Button>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    )
  }
  
  // ATDL Usage Screen
  if (currentScreen === "atdl-ui-repr") {
    const atdlStrategies = [
      { name: "VWAP", description: "Volume Weighted Average Price" },
      { name: "TWAP", description: "Time Weighted Average Price" },
      { name: "POV", description: "Percentage of Volume" },
      { name: "IS", description: "Implementation Shortfall" },
      { name: "MOC", description: "Market on Close" },
    ]

    const fixValidationResults = [
      { tag: "847", name: "TargetStrategy", atdlValue: "VWAP", fixSpecValue: "VWAP", status: "match" },
      { tag: "7940", name: "StartTime", atdlValue: "UTCTimestamp", fixSpecValue: "UTCTimestamp", status: "match" },
      { tag: "7941", name: "EndTime", atdlValue: "UTCTimestamp", fixSpecValue: "UTCTimestamp", status: "match" },
      { tag: "7942", name: "ParticipationRate", atdlValue: "Percentage (0-100)", fixSpecValue: "Decimal (0-1)", status: "mismatch" },
      { tag: "7943", name: "MinQty", atdlValue: "Int", fixSpecValue: "Qty", status: "mismatch" },
      { tag: "7944", name: "MaxFloor", atdlValue: "Int", fixSpecValue: "Int", status: "match" },
      { tag: "7945", name: "DisplayQty", atdlValue: "Int", fixSpecValue: "Qty", status: "mismatch" },
    ]

    return (
      <div className={`min-h-screen ${bgPrimary} flex`}>
        {selectedRole && <Sidebar />}
        <div className="flex-1 overflow-auto">
          <header className={`${bgSecondary} border-b ${borderColor} px-6 py-4`}>
            <button onClick={() => setCurrentScreen("dashboard")} className={`flex items-center gap-2 mb-2 ${textSecondary} hover:text-[#00e5ff]`}>
              <ArrowLeft className="h-4 w-4" /> Back to Dashboard
            </button>
            <h1 className={`text-2xl font-bold ${textPrimary}`}>ATDL Usage</h1>
            <p className={textSecondary}>Select from uploaded ATDLs, view strategy UI, generate FIX messages, and validate</p>
          </header>

          <div className="p-6 space-y-6">
            {/* Select ATDL File */}
            <Card className={`${bgCard} border ${borderColor} p-6`}>
              <h3 className={`text-lg font-bold mb-4 ${textPrimary}`}>1. Select ATDL File</h3>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  {selectedRole === "client" ? (
                    <>
                      <label className={`block text-sm font-medium mb-2 ${textPrimary}`}>Select From Client ATDL Files</label>
                      <select className={`w-full p-3 rounded border ${borderColor} ${isDarkMode ? "bg-[#0a1628] text-white" : "bg-white text-[#0a1628]"}`}>
                        <option value="">Choose an ATDL file...</option>
                        <option value="client-vwap">VWAP_Strategies_v1.0.atdl</option>
                        <option value="client-algo">AlgoSuite_Client_v2.1.atdl</option>
                      </select>
                    </>
                  ) : (
                    <>
                      <label className={`block text-sm font-medium mb-2 ${textPrimary}`}>Select From Admin ATDL Files</label>
                      <select className={`w-full p-3 rounded border ${borderColor} ${isDarkMode ? "bg-[#0a1628] text-white" : "bg-white text-[#0a1628]"}`}>
                        <option value="">Choose an ATDL file...</option>
                        <option value="complete">AlgoSuite_Complete_v1.5.atdl</option>
                        <option value="vwap">VWAP_Strategies_v2.0.atdl</option>
                        <option value="twap">TWAP_Suite_v1.2.atdl</option>
                      </select>
                    </>
                  )}
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${textPrimary}`}>Select Strategy</label>
                  <select 
                    value={atdlSelectedStrategy}
                    onChange={(e) => setAtdlSelectedStrategy(e.target.value)}
                    className={`w-full p-3 rounded border ${borderColor} ${isDarkMode ? "bg-[#0a1628] text-white" : "bg-white text-[#0a1628]"}`}
                  >
                    {atdlStrategies.map((s) => (
                      <option key={s.name} value={s.name}>{s.name} - {s.description}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-4 flex justify-end">
                <Button onClick={() => simulateTask(() => { setAtdlUiVisible(true); setAtdlFixMessageGenerated(false); setAtdlFixValidationResults(false); })} disabled={isLoading} className="bg-[#00e5ff] text-[#0a1628] hover:bg-[#00e5ff]/80">
                  <Play className="h-4 w-4 mr-2" /> {isLoading ? "Loading..." : "Load Strategy UI"}
                </Button>
              </div>
            </Card>

            {/* ATDL UI Representation */}
            {atdlUiVisible && (
            <Card className={`${bgCard} border ${borderColor} p-6`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className={`text-lg font-bold ${textPrimary}`}>2. ATDL UI Representation</h3>
                <div className="flex items-center gap-3">
                  <div className={`flex items-center gap-2 px-3 py-1.5 rounded border ${borderColor} ${isDarkMode ? "bg-[#1e4976]/30" : "bg-[#f1f5f9]"}`}>
                    <Cog className={`h-4 w-4 ${textSecondary}`} />
                    <div className="text-xs">
                      <span className={textSecondary}>ATDL: </span>
                      <span className={`font-medium ${textPrimary}`}>{atdlSelectedFile}</span>
                    </div>
                  </div>
                  <div className={`flex items-center gap-2 px-2 py-1 rounded border ${borderColor} ${isDarkMode ? "bg-[#1e4976]/30" : "bg-[#f1f5f9]"}`}>
                    <FileText className={`h-4 w-4 ${textSecondary}`} />
                    <select
                      value={atdlSelectedFixSpec}
                      onChange={(e) => setAtdlSelectedFixSpec(e.target.value)}
                      className={`text-xs border-0 rounded px-1 focus:outline-none cursor-pointer ${isDarkMode ? "bg-[#0a1628] text-white" : "bg-white text-[#0a1628]"}`}
                    >
                      <option value="equities-4.2">Equities FIX 4.2 v1.2</option>
                      <option value="equities-4.4">Equities FIX 4.4 v2.1</option>
                      <option value="equities-5.0">Equities FIX 5.0 v1.0</option>
                      <option value="options-4.4">Options FIX 4.4 v2.0</option>
                      <option value="futures-5.0">Futures FIX 5.0 SP2 v2.0</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className={`border ${borderColor} rounded-lg p-4 ${isDarkMode ? "bg-[#0a1628]" : "bg-[#f8fafc]"}`}>
                <div className="flex items-center gap-4 mb-4">
                  <span className={`font-bold text-lg ${textPrimary}`}>{atdlSelectedStrategy}</span>
                  <span className={`px-2 py-1 rounded text-xs ${isDarkMode ? "bg-[#4caf50]/20 text-[#4caf50]" : "bg-[#4caf50]/10 text-[#4caf50]"}`}>Active</span>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className={`block text-xs mb-1 ${textSecondary}`}>Start Time</label>
                    <Input type="time" defaultValue="09:30" className={`${isDarkMode ? "bg-[#0a1628] border-[#1e4976] text-white" : "bg-white text-[#0a1628]"}`} />
                  </div>
                  <div>
                    <label className={`block text-xs mb-1 ${textSecondary}`}>End Time</label>
                    <Input type="time" defaultValue="16:00" className={`${isDarkMode ? "bg-[#0a1628] border-[#1e4976] text-white" : "bg-white text-[#0a1628]"}`} />
                  </div>
                  <div>
                    <label className={`block text-xs mb-1 ${textSecondary}`}>Participation Rate (%)</label>
                    <Input type="number" defaultValue="15" className={`${isDarkMode ? "bg-[#0a1628] border-[#1e4976] text-white" : "bg-white text-[#0a1628]"}`} />
                  </div>
                  <div>
                    <label className={`block text-xs mb-1 ${textSecondary}`}>Min Quantity</label>
                    <Input type="number" defaultValue="100" className={`${isDarkMode ? "bg-[#0a1628] border-[#1e4976] text-white" : "bg-white text-[#0a1628]"}`} />
                  </div>
                  <div>
                    <label className={`block text-xs mb-1 ${textSecondary}`}>Max Floor</label>
                    <Input type="number" defaultValue="500" className={`${isDarkMode ? "bg-[#0a1628] border-[#1e4976] text-white" : "bg-white text-[#0a1628]"}`} />
                  </div>
                  <div>
                    <label className={`block text-xs mb-1 ${textSecondary}`}>Display Qty</label>
                    <Input type="number" defaultValue="200" className={`${isDarkMode ? "bg-[#0a1628] border-[#1e4976] text-white" : "bg-white text-[#0a1628]"}`} />
                  </div>
                </div>
              </div>

              <div className="mt-4 flex justify-end">
                <Button onClick={() => simulateTask(() => setAtdlFixMessageGenerated(true))} disabled={isLoading} className="bg-[#00e5ff] text-[#0a1628] hover:bg-[#00e5ff]/80">
                  <Zap className="h-4 w-4 mr-2" /> {isLoading ? "Generating..." : "Generate FIX Message"}
                </Button>
              </div>
            </Card>
            )}

            {/* Generated FIX Algo Message */}
            {atdlFixMessageGenerated && (
            <Card className={`${bgCard} border ${borderColor} p-6`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className={`text-lg font-bold ${textPrimary}`}>3. Generated FIX Algo Message</h3>
                <div className="flex items-center gap-3">
                  <div className={`flex items-center gap-2 px-3 py-1.5 rounded border ${borderColor} ${isDarkMode ? "bg-[#1e4976]/30" : "bg-[#f1f5f9]"}`}>
                    <Cog className={`h-4 w-4 ${textSecondary}`} />
                    <div className="text-xs">
                      <span className={textSecondary}>ATDL: </span>
                      <span className={`font-medium ${textPrimary}`}>{atdlSelectedFile}</span>
                    </div>
                  </div>
                  <div className={`flex items-center gap-2 px-2 py-1 rounded border ${borderColor} ${isDarkMode ? "bg-[#1e4976]/30" : "bg-[#f1f5f9]"}`}>
                    <FileText className={`h-4 w-4 ${textSecondary}`} />
                    <select
                      value={atdlSelectedFixSpec}
                      onChange={(e) => setAtdlSelectedFixSpec(e.target.value)}
                      className={`text-xs border-0 rounded px-1 focus:outline-none cursor-pointer ${isDarkMode ? "bg-[#0a1628] text-white" : "bg-white text-[#0a1628]"}`}
                    >
                      <option value="equities-4.2">Equities FIX 4.2 v1.2</option>
                      <option value="equities-4.4">Equities FIX 4.4 v2.1</option>
                      <option value="equities-5.0">Equities FIX 5.0 v1.0</option>
                      <option value="options-4.4">Options FIX 4.4 v2.0</option>
                      <option value="futures-5.0">Futures FIX 5.0 SP2 v2.0</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className={`font-mono text-sm p-4 rounded border ${borderColor} ${isDarkMode ? "bg-[#0a1628]" : "bg-[#f8fafc]"} overflow-x-auto`}>
                <span className={textPrimary}>8=FIX.4.4|9=256|35=D|49=SENDER|56=TARGET|34=1|52=20260413-14:30:00.000| 11=ORDER123|21=1|55=AAPL|54=1|60=20260413-14:30:00.000|38=10000|40=2|44=150.00| 59=0|</span>
                <span className="text-[#00e5ff]">847=VWAP|7940=09:30:00|7941=16:00:00|7942=15|7943=100|7944=500|7945=200|7946=M|</span>
                <span className={textPrimary}>10=128|</span>
              </div>

              <div className="flex items-center justify-between mt-4">
                <div className="flex gap-2">
                  <Button variant="outline" size="sm"><Copy className="h-4 w-4 mr-2" /> Copy Message</Button>
                  <Button variant="outline" size="sm"><Download className="h-4 w-4 mr-2" /> Download</Button>
                </div>
                <Button onClick={() => simulateTask(() => setAtdlFixValidationResults(true))} disabled={isLoading} className="bg-[#00e5ff] text-[#0a1628] hover:bg-[#00e5ff]/80">
                  <Zap className="h-4 w-4 mr-2" /> {isLoading ? "Validating..." : "Validate Against FIX Spec"}
                </Button>
              </div>
            </Card>
            )}

            {/* FIX Spec Validation Results */}
            {atdlFixValidationResults && (
            <Card className={`${bgCard} border ${borderColor} p-6`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <h3 className={`text-lg font-bold ${textPrimary}`}>4. FIX Spec Validation Results</h3>
                  <div className="flex items-center gap-2">
                    <div className={`flex items-center gap-2 px-3 py-1.5 rounded border ${borderColor} ${isDarkMode ? "bg-[#1e4976]/30" : "bg-[#f1f5f9]"}`}>
                      <Cog className={`h-4 w-4 ${textSecondary}`} />
                      <div className="text-xs">
                        <span className={textSecondary}>ATDL: </span>
                        <span className={`font-medium ${textPrimary}`}>{atdlSelectedFile}</span>
                      </div>
                    </div>
                    <div className={`flex items-center gap-2 px-2 py-1 rounded border ${borderColor} ${isDarkMode ? "bg-[#1e4976]/30" : "bg-[#f1f5f9]"}`}>
                      <FileText className={`h-4 w-4 ${textSecondary}`} />
                      <span className={`text-xs ${textSecondary}`}>Against:</span>
                      <select
                        value={atdlSelectedFixSpec}
                        onChange={(e) => setAtdlSelectedFixSpec(e.target.value)}
                        className={`text-xs border-0 rounded px-1 focus:outline-none cursor-pointer ${isDarkMode ? "bg-[#0a1628] text-white" : "bg-white text-[#0a1628]"}`}
                      >
                        <option value="equities-4.2">Equities FIX 4.2 v1.2</option>
                        <option value="equities-4.4">Equities FIX 4.4 v2.1</option>
                        <option value="equities-5.0">Equities FIX 5.0 v1.0</option>
                        <option value="options-4.4">Options FIX 4.4 v2.0</option>
                        <option value="futures-5.0">Futures FIX 5.0 SP2 v2.0</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <span className="px-2 py-1 rounded text-xs bg-[#4caf50]/20 text-[#4caf50]">4 Matches</span>
                  <span className="px-2 py-1 rounded text-xs bg-[#f44336]/20 text-[#f44336]">3 Mismatches</span>
                </div>
              </div>

              <div className={`border ${borderColor} rounded-lg overflow-hidden`}>
                <div className={`grid grid-cols-5 gap-4 px-4 py-2 ${isDarkMode ? "bg-[#1e4976]/30" : "bg-[#f1f5f9]"}`}>
                  <span className={`font-semibold text-sm ${textPrimary}`}>FIX Tag</span>
                  <span className={`font-semibold text-sm ${textPrimary}`}>Name</span>
                  <span className={`font-semibold text-sm ${textPrimary}`}>ATDL Value</span>
                  <span className={`font-semibold text-sm ${textPrimary}`}>FIX Spec Value</span>
                  <span className={`font-semibold text-sm ${textPrimary}`}>Status</span>
                </div>
                {fixValidationResults.map((result, i) => (
                  <div key={i} className={`grid grid-cols-5 gap-4 px-4 py-3 border-t ${borderColor} ${result.status === "mismatch" ? (isDarkMode ? "bg-[#f44336]/10" : "bg-[#f44336]/5") : ""}`}>
                    <span className={`font-mono text-sm ${textPrimary}`}>{result.tag}</span>
                    <span className={`text-sm ${textPrimary}`}>{result.name}</span>
                    <span className={`text-sm ${textPrimary}`}>{result.atdlValue}</span>
                    <span className={`text-sm ${textPrimary}`}>{result.fixSpecValue}</span>
                    <span className={`text-sm ${result.status === "match" ? "text-[#4caf50]" : "text-[#f44336]"}`}>
                      {result.status === "match" ? <CheckCircle className="h-4 w-4 inline mr-1" /> : <AlertCircle className="h-4 w-4 inline mr-1" />}
                      {result.status === "match" ? "Match" : "Mismatch"}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
            )}
          </div>
        </div>
      </div>
    )
  }
  
  // ATDL to ATDL Compare Screen
  if (currentScreen === "atdl-compare") {
    
    return (
      <div className={`min-h-screen ${bgPrimary} flex`}>
        {selectedRole && <Sidebar />}
        <div className="flex-1 overflow-auto">
          <header className={`${bgSecondary} border-b ${borderColor} px-6 py-4`}>
            <button onClick={() => setCurrentScreen("dashboard")} className={`flex items-center gap-2 mb-2 ${textSecondary} hover:text-[#00e5ff]`}>
              <ArrowLeft className="h-4 w-4" /> Back to Dashboard
            </button>
            <h1 className={`text-2xl font-bold ${textPrimary}`}>ATDL to ATDL Compare</h1>
            <p className={textSecondary}>Compare two ATDL (Algorithmic Trading Definition Language) files</p>
          </header>

          <div className="p-6">
            <Card className={`${bgCard} border ${borderColor} p-6`}>
              <h3 className={`text-lg font-bold mb-4 ${textPrimary}`}>Choose ATDL Files</h3>
              
              <div className="grid grid-cols-2 gap-6">
                {/* Buy Side ATDL */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${textPrimary}`}>Buy Side ATDL</label>
                  <label className={`border-2 border-dashed ${borderColor} rounded-lg p-6 text-center hover:border-[#00e5ff] cursor-pointer transition-colors block`}>
                    <input type="file" className="hidden" accept=".xml,.atdl" />
                    <Upload className={`h-10 w-10 mx-auto mb-3 ${textSecondary}`} />
                    <p className={`font-medium ${textPrimary}`}>Select A File</p>
                    <p className={`text-xs mt-1 ${textSecondary}`}>Click to browse</p>
                  </label>
                </div>
                
                {/* Sell Side ATDL */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${textPrimary}`}>Sell Side ATDL</label>
                  <label className={`border-2 border-dashed ${borderColor} rounded-lg p-6 text-center hover:border-[#00e5ff] cursor-pointer transition-colors block`}>
                    <input type="file" className="hidden" accept=".xml,.atdl" />
                    <Upload className={`h-10 w-10 mx-auto mb-3 ${textSecondary}`} />
                    <p className={`font-medium ${textPrimary}`}>Select A File</p>
                    <p className={`text-xs mt-1 ${textSecondary}`}>Click to browse</p>
                  </label>
                </div>
              </div>
              
              <div className="mt-6 flex justify-center gap-4">
                <Button onClick={() => simulateTask(() => setAtdlShowResults(true))} disabled={isLoading} className="bg-white text-black hover:bg-gray-100 border border-gray-300">
                  <Play className="h-4 w-4 mr-2" /> {isLoading ? "Processing..." : "Perform Comparison"}
                </Button>
              </div>
            </Card>

{atdlShowResults && (
  <Card className={`${bgCard} border ${borderColor} p-6 mt-6`}>
  <div className="flex items-center justify-between mb-6">
  <h2 className={`text-xl font-bold ${textPrimary}`}>ATDL Comparison Results</h2>
  <div className={`flex items-center gap-2 px-3 py-1.5 rounded border ${borderColor} ${isDarkMode ? "bg-[#1e4976]/30" : "bg-[#f1f5f9]"}`}>
  <FileText className={`h-4 w-4 ${textSecondary}`} />
  <div className="text-xs">
  <span className={textSecondary}>Base Spec: </span>
  <span className={`font-medium ${textPrimary}`}>Equities FIX 4.4 v2.1</span>
  </div>
  </div>
  </div>
                
                {/* Summary counts */}
                <div className="flex items-center gap-3 mb-5">
                  <span className="px-2 py-1 rounded text-xs bg-[#f44336]/20 text-[#f44336]">2 High</span>
                  <span className="px-2 py-1 rounded text-xs bg-[#ff9800]/20 text-[#ff9800]">1 Medium</span>
                  <span className="px-2 py-1 rounded text-xs bg-[#2196f3]/20 text-[#2196f3]">1 Low</span>
                  <span className={`ml-auto text-xs ${textSecondary}`}>1 of 4 decisions made</span>
                </div>
                {[
                  { id: "atdl-1", title: "Strategy Differences",    severity: "High",   left: "VWAP, TWAP, POV defined",                right: "VWAP, TWAP defined (POV missing)",       defaultDec: null },
                  { id: "atdl-2", title: "Parameter Mismatches",    severity: "High",   left: "StartTime: UTCTimestamp",                right: "StartTime: LocalMktTime",                defaultDec: null },
                  { id: "atdl-3", title: "Control Type Differences", severity: "Medium", left: "MinQty: Spinner (min=100)",              right: "MinQty: TextField (no validation)",       defaultDec: null },
                  { id: "atdl-4", title: "Enum Value Differences",  severity: "Low",    left: "Urgency: Low, Medium, High, Critical",   right: "Urgency: 1, 2, 3",                       defaultDec: "accept" },
                ].map((section, i) => {
                  const dec = atdlDecisions[`cmp-${i}`] || section.defaultDec
                  return (
                    <div key={section.id} className={`border ${borderColor} rounded-lg overflow-hidden mb-3`}>
                      {/* Row header */}
                      <div className={`flex items-center gap-3 px-4 py-2.5 ${isDarkMode ? "bg-[#1e4976]/30" : "bg-[#f1f5f9]"}`}>
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded ${section.severity === "High" ? "bg-[#f44336]/20 text-[#f44336]" : section.severity === "Medium" ? "bg-[#ff9800]/20 text-[#ff9800]" : "bg-[#2196f3]/20 text-[#2196f3]"}`}>{section.severity}</span>
                        <h4 className={`text-sm font-semibold ${textPrimary} flex-1`}>{i + 1}. {section.title}</h4>
                        {dec && (
                          <span className={`text-xs px-2 py-0.5 rounded border ${dec === "accept" ? "bg-[#4caf50]/20 text-[#4caf50] border-[#4caf50]/30" : dec === "override" ? "bg-[#9c27b0]/20 text-[#9c27b0] border-[#9c27b0]/30" : dec === "defer" ? "bg-[#ff9800]/20 text-[#ff9800] border-[#ff9800]/30" : "bg-[#f44336]/20 text-[#f44336] border-[#f44336]/30"}`}>
                            {dec.charAt(0).toUpperCase() + dec.slice(1)}
                          </span>
                        )}
                      </div>
                      {/* Diff body */}
                      <div className="grid grid-cols-11">
                        <div className={`col-span-5 p-3 ${isDarkMode ? "bg-[#0a1628]/60" : "bg-white"}`}>
                          <p className={`text-xs font-semibold text-[#00e5ff] mb-1`}>Buy Side ATDL</p>
                          <p className={`text-sm ${textSecondary}`}>{section.left}</p>
                        </div>
                        <div className={`col-span-1 flex items-center justify-center ${isDarkMode ? "bg-[#0a1628]/60" : "bg-white"}`}>
                          <ArrowRight className={`h-4 w-4 ${textSecondary}`} />
                        </div>
                        <div className={`col-span-5 p-3 ${isDarkMode ? "bg-[#0a1628]/40" : "bg-[#f8fafc]"}`}>
                          <p className={`text-xs font-semibold text-[#00e5ff] mb-1`}>Sell Side ATDL</p>
                          <p className={`text-sm ${textSecondary}`}>{section.right}</p>
                        </div>
                      </div>
                      {/* Decision panel */}
                      <div className={`flex items-center gap-2 px-4 py-2.5 border-t ${borderColor} ${isDarkMode ? "bg-[#0a1628]/40" : "bg-gray-50"}`}>
                        <span className={`text-xs ${textSecondary} mr-1`}>Decision:</span>
                        {["accept","override","defer","reject"].map(d => (
                          <button key={d} onClick={() => setAtdlDecisions(prev => ({ ...prev, [`cmp-${i}`]: d }))}
                            className={`px-2.5 py-1 rounded text-xs border transition-all ${
                              dec === d
                                ? d === "accept" ? "bg-[#4caf50]/20 text-[#4caf50] border-[#4caf50]/50" :
                                  d === "override" ? "bg-[#9c27b0]/20 text-[#9c27b0] border-[#9c27b0]/50" :
                                  d === "defer" ? "bg-[#ff9800]/20 text-[#ff9800] border-[#ff9800]/50" :
                                  "bg-[#f44336]/20 text-[#f44336] border-[#f44336]/50"
                                : `${borderColor} ${textSecondary} hover:border-[#00e5ff] hover:text-[#00e5ff]`
                            }`}
                          >{d.charAt(0).toUpperCase() + d.slice(1)}</button>
                        ))}
                        {dec && (
                          <div className="ml-3 flex items-center gap-1.5">
                            <span className={`text-xs ${textSecondary}`}>Rationale:</span>
                            <input className={`text-xs px-2 py-0.5 rounded border ${borderColor} ${isDarkMode ? "bg-[#0a1628] text-white" : "bg-white"} w-48`} placeholder="Add note..." />
                          </div>
                        )}
                        <Button size="sm" variant="outline" className="ml-auto text-xs h-6 px-2">Promote to Rule</Button>
                      </div>
                    </div>
                  )
                })}
                
                <div className={`mt-4 pt-4 border-t ${borderColor} flex justify-between items-center`}>
                  <div className="flex gap-3">
                    <Button variant="outline" size="sm"><Download className="h-4 w-4 mr-1.5" /> Download Report</Button>
                    <Button variant="outline" size="sm"><Mail className="h-4 w-4 mr-1.5" /> Email Results</Button>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => setCurrentScreen("atdl-remediation" as any)}>
                    <Wrench className="h-4 w-4 mr-1.5" /> Remediation Queue
                  </Button>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    )
  }

  // FIX to ATDL Comparison Screen
  if (currentScreen === "fix-atdl-compare") {
    
    return (
      <div className={`min-h-screen ${bgPrimary} flex`}>
        {selectedRole && <Sidebar />}
        <div className="flex-1 overflow-auto">
          <header className={`${bgSecondary} border-b ${borderColor} px-6 py-4`}>
            <button onClick={() => setCurrentScreen("dashboard")} className={`flex items-center gap-2 mb-2 ${textSecondary} hover:text-[#00e5ff]`}>
              <ArrowLeft className="h-4 w-4" /> Back to Dashboard
            </button>
            <h1 className={`text-2xl font-bold ${textPrimary}`}>FIX Spec to ATDL Comparison</h1>
            <p className={textSecondary}>Compare FIX specification algo section with generated ATDL</p>
          </header>

          <div className="p-6">
            <Card className={`${bgCard} border ${borderColor} p-6`}>
              <h3 className={`text-lg font-bold mb-4 ${textPrimary}`}>Choose Files</h3>
              
              <div className="grid grid-cols-2 gap-6">
                {/* FIX Spec */}
<div>
  <label className={`block text-sm font-medium mb-2 ${textPrimary}`}>FIX Specification (Algo Section)</label>
  {selectedRole === "client" ? (
  <div className={`border-2 ${borderColor} rounded-lg p-4`}>
  <div className="flex items-center gap-3 mb-3">
  <FileText className={`h-8 w-8 ${textSecondary}`} />
  <div>
  <p className={`font-medium ${textPrimary}`}>Select From Client Specs</p>
  <p className={`text-xs ${textSecondary}`}>Choose from uploaded specifications</p>
  </div>
  </div>
  <select className={`w-full p-2 rounded border ${borderColor} ${isDarkMode ? "bg-[#0a1628] text-white" : "bg-white text-[#0a1628]"}`}>
  <option value="">Choose a spec...</option>
  <option value="client_eq_42_v1">Equities - FIX 4.2 (client_eq_42_v1.xml)</option>
  <option value="client_eq_44_v2">Equities - FIX 4.4 (client_eq_44_v2.xml)</option>
  <option value="client_opt_44_v1">Options - FIX 4.4 (client_opt_44_v1.xml)</option>
  </select>
  </div>
  ) : (
  <label className={`border-2 border-dashed ${borderColor} rounded-lg p-6 text-center hover:border-[#00e5ff] cursor-pointer transition-colors block`}>
  <input type="file" className="hidden" accept=".xml,.txt,.csv" />
  <Upload className={`h-10 w-10 mx-auto mb-3 ${textSecondary}`} />
  <p className={`font-medium ${textPrimary}`}>Select FIX Spec</p>
  <p className={`text-xs mt-1 ${textSecondary}`}>Click to browse</p>
  </label>
  )}
  </div>
  
  {/* ATDL File */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${textPrimary}`}>ATDL File</label>
                  <label className={`border-2 border-dashed ${borderColor} rounded-lg p-6 text-center hover:border-[#00e5ff] cursor-pointer transition-colors block`}>
                    <input type="file" className="hidden" accept=".xml,.atdl" />
                    <Upload className={`h-10 w-10 mx-auto mb-3 ${textSecondary}`} />
                    <p className={`font-medium ${textPrimary}`}>Select ATDL</p>
                    <p className={`text-xs mt-1 ${textSecondary}`}>Click to browse</p>
                  </label>
                </div>
              </div>
              
              <div className="mt-6 flex justify-center gap-4">
                <Button onClick={() => simulateTask(() => setFixAtdlShowResults(true))} disabled={isLoading} className="bg-white text-black hover:bg-gray-100 border border-gray-300">
                  <Play className="h-4 w-4 mr-2" /> {isLoading ? "Processing..." : "Perform Comparison"}
                </Button>
              </div>
            </Card>

{fixAtdlShowResults && (
  <Card className={`${bgCard} border ${borderColor} p-6 mt-6`}>
  <div className="flex items-center justify-between mb-6">
  <h2 className={`text-xl font-bold ${textPrimary}`}>FIX to ATDL Comparison Results</h2>
  <div className={`flex items-center gap-2 px-3 py-1.5 rounded border ${borderColor} ${isDarkMode ? "bg-[#1e4976]/30" : "bg-[#f1f5f9]"}`}>
  <FileText className={`h-4 w-4 ${textSecondary}`} />
  <div className="text-xs">
  <span className={textSecondary}>FIX Spec: </span>
  <span className={`font-medium ${textPrimary}`}>Equities FIX 4.4 v2.1</span>
  </div>
  </div>
  </div>
                
                {/* Summary counts */}
                <div className="flex items-center gap-3 mb-5">
                  <span className="px-2 py-1 rounded text-xs bg-[#f44336]/20 text-[#f44336]">2 High</span>
                  <span className="px-2 py-1 rounded text-xs bg-[#ff9800]/20 text-[#ff9800]">1 Medium</span>
                  <span className="px-2 py-1 rounded text-xs bg-[#2196f3]/20 text-[#2196f3]">1 Low</span>
                  <span className={`ml-auto text-xs ${textSecondary}`}>0 of 4 decisions made</span>
                </div>
                {[
                  { id: "fix-atdl-1", title: "Missing Strategies in ATDL",  severity: "High",   left: "Strategies: VWAP, TWAP, POV, IS, MOC",        right: "Strategies: VWAP, TWAP (POV, IS, MOC missing)" },
                  { id: "fix-atdl-2", title: "Parameter Mapping Issues",     severity: "Low",    left: "Tag 847 (TargetStrategy) = VWAP",             right: "strategy/@name = 'VWAP' (Correct mapping)" },
                  { id: "fix-atdl-3", title: "Missing Parameters",           severity: "Medium", left: "Tag 7940 (StartTime), Tag 7941 (EndTime)",    right: "StartTime defined, EndTime missing" },
                  { id: "fix-atdl-4", title: "Datatype Inconsistencies",     severity: "High",   left: "Tag 7942 (ParticipationRate): Percentage",    right: "ParticipationRate: Decimal (0-1 range)" },
                ].map((section, i) => {
                  const dec = atdlDecisions[`fa-${i}`]
                  return (
                    <div key={section.id} className={`border ${borderColor} rounded-lg overflow-hidden mb-3`}>
                      <div className={`flex items-center gap-3 px-4 py-2.5 ${isDarkMode ? "bg-[#1e4976]/30" : "bg-[#f1f5f9]"}`}>
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded ${section.severity === "High" ? "bg-[#f44336]/20 text-[#f44336]" : section.severity === "Medium" ? "bg-[#ff9800]/20 text-[#ff9800]" : "bg-[#2196f3]/20 text-[#2196f3]"}`}>{section.severity}</span>
                        <h4 className={`text-sm font-semibold ${textPrimary} flex-1`}>{i + 1}. {section.title}</h4>
                        {dec && (
                          <span className={`text-xs px-2 py-0.5 rounded border ${dec === "accept" ? "bg-[#4caf50]/20 text-[#4caf50] border-[#4caf50]/30" : dec === "override" ? "bg-[#9c27b0]/20 text-[#9c27b0] border-[#9c27b0]/30" : dec === "defer" ? "bg-[#ff9800]/20 text-[#ff9800] border-[#ff9800]/30" : "bg-[#f44336]/20 text-[#f44336] border-[#f44336]/30"}`}>
                            {dec.charAt(0).toUpperCase() + dec.slice(1)}
                          </span>
                        )}
                      </div>
                      <div className="grid grid-cols-11">
                        <div className={`col-span-5 p-3 ${isDarkMode ? "bg-[#0a1628]/60" : "bg-white"}`}>
                          <p className="text-xs font-semibold text-[#00e5ff] mb-1">FIX Specification</p>
                          <p className={`text-sm ${textSecondary}`}>{section.left}</p>
                        </div>
                        <div className={`col-span-1 flex items-center justify-center ${isDarkMode ? "bg-[#0a1628]/60" : "bg-white"}`}>
                          <ArrowRight className={`h-4 w-4 ${textSecondary}`} />
                        </div>
                        <div className={`col-span-5 p-3 ${isDarkMode ? "bg-[#0a1628]/40" : "bg-[#f8fafc]"}`}>
                          <p className="text-xs font-semibold text-[#00e5ff] mb-1">ATDL Definition</p>
                          <p className={`text-sm ${textSecondary}`}>{section.right}</p>
                        </div>
                      </div>
                      <div className={`flex items-center gap-2 px-4 py-2.5 border-t ${borderColor} ${isDarkMode ? "bg-[#0a1628]/40" : "bg-gray-50"}`}>
                        <span className={`text-xs ${textSecondary} mr-1`}>Decision:</span>
                        {["accept","override","defer","reject"].map(d => (
                          <button key={d} onClick={() => setAtdlDecisions(prev => ({ ...prev, [`fa-${i}`]: d }))}
                            className={`px-2.5 py-1 rounded text-xs border transition-all ${
                              dec === d
                                ? d === "accept" ? "bg-[#4caf50]/20 text-[#4caf50] border-[#4caf50]/50" :
                                  d === "override" ? "bg-[#9c27b0]/20 text-[#9c27b0] border-[#9c27b0]/50" :
                                  d === "defer" ? "bg-[#ff9800]/20 text-[#ff9800] border-[#ff9800]/50" :
                                  "bg-[#f44336]/20 text-[#f44336] border-[#f44336]/50"
                                : `${borderColor} ${textSecondary} hover:border-[#00e5ff] hover:text-[#00e5ff]`
                            }`}
                          >{d.charAt(0).toUpperCase() + d.slice(1)}</button>
                        ))}
                        {dec && (
                          <div className="ml-3 flex items-center gap-1.5">
                            <span className={`text-xs ${textSecondary}`}>Rationale:</span>
                            <input className={`text-xs px-2 py-0.5 rounded border ${borderColor} ${isDarkMode ? "bg-[#0a1628] text-white" : "bg-white"} w-48`} placeholder="Add note..." />
                          </div>
                        )}
                        <Button size="sm" variant="outline" className="ml-auto text-xs h-6 px-2">Promote to Rule</Button>
                      </div>
                    </div>
                  )
                })}
                
                <div className={`mt-4 pt-4 border-t ${borderColor} flex justify-between items-center`}>
                  <div className="flex gap-3">
                    <Button variant="outline" size="sm"><Download className="h-4 w-4 mr-1.5" /> Download Report</Button>
                    <Button variant="outline" size="sm"><Mail className="h-4 w-4 mr-1.5" /> Email Results</Button>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => setCurrentScreen("atdl-remediation" as any)}>
                    <Wrench className="h-4 w-4 mr-1.5" /> Remediation Queue
                  </Button>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    )
  }

  // FIX to ATDL Conversion Screen
  if (currentScreen === "fix-to-atdl") {
    
    return (
      <div className={`min-h-screen ${bgPrimary} flex`}>
        {selectedRole && <Sidebar />}
        <div className="flex-1 overflow-auto">
          <header className={`${bgSecondary} border-b ${borderColor} px-6 py-4`}>
            <button onClick={() => setCurrentScreen("dashboard")} className={`flex items-center gap-2 mb-2 ${textSecondary} hover:text-[#00e5ff]`}>
              <ArrowLeft className="h-4 w-4" /> Back to Dashboard
            </button>
            <h1 className={`text-2xl font-bold ${textPrimary}`}>FIX Spec to ATDL Conversion</h1>
            <p className={textSecondary}>Convert FIX specification algo trading section into ATDL format</p>
          </header>

          <div className="p-6">
            <Card className={`${bgCard} border ${borderColor} p-6`}>
<h3 className={`text-lg font-bold mb-4 ${textPrimary}`}>Select FIX Specification</h3>
  
  <div className="max-w-md mx-auto">
  {selectedRole === "client" ? (
  <div className={`border-2 ${borderColor} rounded-lg p-6`}>
  <div className="flex items-center gap-3 mb-4">
  <FileText className={`h-10 w-10 ${textSecondary}`} />
  <div>
  <p className={`font-medium ${textPrimary}`}>Select From Client Specs</p>
  <p className={`text-xs ${textSecondary}`}>Choose from uploaded specifications</p>
  </div>
  </div>
  <select className={`w-full p-3 rounded border ${borderColor} ${isDarkMode ? "bg-[#0a1628] text-white" : "bg-white text-[#0a1628]"}`}>
  <option value="">Choose a spec...</option>
  <option value="client_eq_42_v1">Equities - FIX 4.2 (client_eq_42_v1.xml)</option>
  <option value="client_eq_44_v2">Equities - FIX 4.4 (client_eq_44_v2.xml)</option>
  <option value="client_opt_44_v1">Options - FIX 4.4 (client_opt_44_v1.xml)</option>
  <option value="client_fut_50sp2_v1">Futures - FIX 5.0 SP2 (client_fut_50sp2_v1.xml)</option>
  </select>
  </div>
  ) : (
  <div className={`border-2 ${borderColor} rounded-lg p-6`}>
  <div className="flex items-center gap-3 mb-4">
  <FileText className={`h-10 w-10 ${textSecondary}`} />
  <div>
  <p className={`font-medium ${textPrimary}`}>Select From Admin Specs</p>
  <p className={`text-xs ${textSecondary}`}>Choose a specification to convert</p>
  </div>
  </div>
  <div className="space-y-3">
  <div className="grid grid-cols-2 gap-3">
  <div>
  <label className={`text-xs ${textSecondary} mb-1 block`}>Asset Class</label>
  <select className={`w-full p-2 rounded border ${borderColor} ${isDarkMode ? "bg-[#0a1628] text-white" : "bg-white text-[#0a1628]"}`}>
  <option value="">Select asset...</option>
  <option value="equities">Equities</option>
  <option value="options">Options</option>
  <option value="futures">Futures</option>
  <option value="fixed-income">Fixed Income</option>
  <option value="fx">FX</option>
  </select>
  </div>
  <div>
  <label className={`text-xs ${textSecondary} mb-1 block`}>FIX Version</label>
  <select className={`w-full p-2 rounded border ${borderColor} ${isDarkMode ? "bg-[#0a1628] text-white" : "bg-white text-[#0a1628]"}`}>
  <option value="">Select version...</option>
  <option value="4.2">FIX 4.2</option>
  <option value="4.4">FIX 4.4</option>
  <option value="5.0">FIX 5.0</option>
  <option value="5.0sp2">FIX 5.0 SP2</option>
  </select>
  </div>
  </div>
  <div>
  <label className={`text-xs ${textSecondary} mb-1 block`}>Spec Version</label>
  <select className={`w-full p-3 rounded border ${borderColor} ${isDarkMode ? "bg-[#0a1628] text-white" : "bg-white text-[#0a1628]"}`}>
  <option value="">Select spec version...</option>
  <option value="v2.1">Equities FIX 4.4 v2.1 (Current)</option>
  <option value="v2.0">Equities FIX 4.4 v2.0</option>
  <option value="v1.9">Equities FIX 4.4 v1.9</option>
  </select>
  </div>
  </div>
  </div>
  )}
  </div>
              
              <div className="mt-6">
                <h4 className={`font-medium mb-3 ${textPrimary}`}>Conversion Options</h4>
                <div className="grid grid-cols-2 gap-4 max-w-lg">
                  <div>
                    <label className={`block text-sm mb-1 ${textSecondary}`}>ATDL Version</label>
                    <select className={`w-full p-2 rounded border ${borderColor} ${isDarkMode ? "bg-[#0a1628] text-white" : "bg-white text-[#0a1628]"}`}>
                      <option value="1.1">ATDL 1.1</option>
                      <option value="1.0">ATDL 1.0</option>
                    </select>
                  </div>
                  <div>
                    <label className={`block text-sm mb-1 ${textSecondary}`}>Output Format</label>
                    <select className={`w-full p-2 rounded border ${borderColor} ${isDarkMode ? "bg-[#0a1628] text-white" : "bg-white text-[#0a1628]"}`}>
                      <option value="xml">XML</option>
                      <option value="json">JSON</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-center gap-4">
                <Button onClick={() => simulateTask(() => setConversionComplete(true))} disabled={isLoading} className="bg-white text-black hover:bg-gray-100 border border-gray-300">
                  <Play className="h-4 w-4 mr-2" /> {isLoading ? "Converting..." : "Convert to ATDL"}
                </Button>
              </div>
            </Card>

{conversionComplete && (
  <Card className={`${bgCard} border ${borderColor} p-6 mt-6`}>
  <div className="flex items-center justify-between mb-6">
  <div className="flex items-center gap-3">
  <CheckCircle className="h-8 w-8 text-[#4caf50]" />
  <div>
  <h2 className={`text-xl font-bold ${textPrimary}`}>Conversion Complete</h2>
  <p className={textSecondary}>ATDL file generated successfully</p>
  </div>
  </div>
  <div className={`flex items-center gap-2 px-3 py-1.5 rounded border ${borderColor} ${isDarkMode ? "bg-[#1e4976]/30" : "bg-[#f1f5f9]"}`}>
  <FileText className={`h-4 w-4 ${textSecondary}`} />
  <div className="text-xs">
  <span className={textSecondary}>Source Spec: </span>
  <span className={`font-medium ${textPrimary}`}>Equities FIX 4.4 v2.1</span>
  </div>
  </div>
  </div>
                
                <div className={`border ${borderColor} rounded-lg p-4 mb-6`}>
                  <h4 className={`font-medium mb-3 ${textPrimary}`}>Conversion Summary</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className={`${textSecondary}`}>Strategies Converted:</div>
                    <div className={`${textPrimary} font-medium`}>5 (VWAP, TWAP, POV, IS, MOC)</div>
                    <div className={`${textSecondary}`}>Total Parameters:</div>
                    <div className={`${textPrimary} font-medium`}>23</div>
                    <div className={`${textSecondary}`}>UI Controls Generated:</div>
                    <div className={`${textPrimary} font-medium`}>18 (Spinners, Dropdowns, Checkboxes)</div>
                    <div className={`${textSecondary}`}>Validation Rules:</div>
                    <div className={`${textPrimary} font-medium`}>12</div>
                  </div>
                </div>

                <div className={`${isDarkMode ? "bg-[#0a1628]" : "bg-[#f1f5f9]"} rounded-lg p-4 mb-6 max-h-64 overflow-auto`}>
                  <h4 className={`font-medium mb-2 ${textPrimary}`}>ATDL Preview</h4>
                  <pre className={`text-xs ${textSecondary} font-mono`}>{`<?xml version="1.0" encoding="UTF-8"?>
<Strategies xmlns="http://www.fixprotocol.org/FIXatdl-1-1/Core"
            xmlns:val="http://www.fixprotocol.org/FIXatdl-1-1/Validation"
            xmlns:lay="http://www.fixprotocol.org/FIXatdl-1-1/Layout"
            xmlns:flow="http://www.fixprotocol.org/FIXatdl-1-1/Flow">
  
  <Strategy name="VWAP" uiRep="VWAP" wireValue="VWAP">
    <Description>Volume Weighted Average Price</Description>
    <Parameter name="StartTime" xsi:type="UTCTimestamp_t" 
               fixTag="7940" use="required"/>
    <Parameter name="EndTime" xsi:type="UTCTimestamp_t" 
               fixTag="7941" use="required"/>
    <Parameter name="ParticipationRate" xsi:type="Percentage_t"
               fixTag="7942" minValue="0.01" maxValue="0.50"/>
    ...
  </Strategy>
</Strategies>`}</pre>
                </div>
                
                <div className="flex justify-center gap-4">
                  <Button className="bg-[#00e5ff] text-[#0a1628] hover:bg-[#00e5ff]/80"><Download className="h-4 w-4 mr-2" /> Download ATDL</Button>
                  <Button className="bg-white text-black hover:bg-gray-100 border border-gray-300"><Mail className="h-4 w-4 mr-2" /> Email ATDL</Button>
                  <Button variant="outline"><Eye className="h-4 w-4 mr-2" /> View Full ATDL</Button>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    )
  }
  
  // ATDL Remediation Queue
  if (currentScreen === "atdl-remediation") {
    const findings = [
    { id: "R-001", woId: "WO-ATDL-001", severity: "Error",   source: "Structural Validation", strategy: "POV",   finding: "wireValue attribute missing on POV strategy",            owner: "J. Smith",   status: "in-progress", rootCause: "Missing Attribute", dueDate: "Apr 16, 2026" },
    { id: "R-002", woId: "WO-ATDL-001", severity: "Error",   source: "FIX–ATDL Compare",      strategy: "All",   finding: "ParticipationRate type mismatch: Percentage vs Decimal",  owner: "Unassigned", status: "open",        rootCause: "Type Mismatch",     dueDate: "Apr 17, 2026" },
    { id: "R-003", woId: "WO-ATDL-001", severity: "Warning", source: "Structural Validation", strategy: "VWAP",  finding: "2 parameters use deprecated type annotations",            owner: "M. Chen",    status: "open",        rootCause: "Deprecated Usage",  dueDate: "Apr 18, 2026" },
    { id: "R-004", woId: "WO-ATDL-001", severity: "Warning", source: "FIX–ATDL Compare",      strategy: "IS",    finding: "EndTime parameter missing from ATDL definition",          owner: "M. Chen",    status: "resolved",    rootCause: "Missing Parameter", dueDate: "Apr 14, 2026" },
    { id: "R-005", woId: "WO-ATDL-002", severity: "Error",   source: "Structural Validation", strategy: "TWAP",  finding: "Schema validation failed — unexpected element order",     owner: "J. Smith",   status: "open",        rootCause: "Schema Error",      dueDate: "Apr 16, 2026" },
    { id: "R-006", woId: "WO-ATDL-002", severity: "Error",   source: "ATDL–ATDL Compare",     strategy: "VWAP",  finding: "StartTime type divergence: UTCTimestamp vs LocalMktTime", owner: "Unassigned", status: "open",        rootCause: "Type Mismatch",     dueDate: "Apr 17, 2026" },
    { id: "R-007", woId: "WO-ATDL-002", severity: "Error",   source: "ATDL–ATDL Compare",     strategy: "POV",   finding: "POV strategy absent in sell-side ATDL",                   owner: "S. Johnson", status: "in-progress", rootCause: "Missing Strategy",  dueDate: "Apr 16, 2026" },
    ]

    const filtered = findings.filter(f => atdlRemediationFilter === "all" || f.status === atdlRemediationFilter)
    const openCount = findings.filter(f => f.status === "open").length
    const inProgCount = findings.filter(f => f.status === "in-progress").length
    const resolvedCount = findings.filter(f => f.status === "resolved").length
    const blockerCount = findings.filter(f => f.severity === "Error").length

    return (
      <div className={`min-h-screen ${bgPrimary} flex`}>
        <Sidebar />
        <div className="flex-1 overflow-auto">
          <header className={`${bgSecondary} border-b ${borderColor} px-6 py-4`}>
            <button onClick={() => setCurrentScreen("atdl-workbench" as any)} className={`flex items-center gap-2 mb-2 ${textSecondary} hover:text-[#00e5ff] text-sm`}>
              <ArrowLeft className="h-4 w-4" /> Back to Workbench
            </button>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Wrench className="h-8 w-8 text-[#00e5ff]" />
                <div>
                  <h1 className={`text-2xl font-bold ${textPrimary}`}>Remediation Queue</h1>
                  <p className={`text-sm ${textSecondary}`}>Unified queue of open findings from all ATDL validations and comparisons</p>
                </div>
              </div>
              <Button className="bg-white text-black hover:bg-gray-100 border border-gray-300" size="sm">
                <Download className="h-4 w-4 mr-2" /> Export Queue
              </Button>
            </div>
          </header>

          <div className="p-6 space-y-5">
            {/* Summary stats */}
            <div className="grid grid-cols-4 gap-3">
              {[
                { label: "Blockers",    count: blockerCount,  color: "text-[#f44336]",  bg: "bg-[#f44336]/10",  border: "border-[#f44336]/30" },
                { label: "Open",        count: openCount,     color: "text-[#ff9800]",  bg: "bg-[#ff9800]/10",  border: "border-[#ff9800]/30" },
                { label: "In Progress", count: inProgCount,   color: "text-[#2196f3]",  bg: "bg-[#2196f3]/10",  border: "border-[#2196f3]/30" },
                { label: "Resolved",    count: resolvedCount, color: "text-[#4caf50]",  bg: "bg-[#4caf50]/10",  border: "border-[#4caf50]/30" },
              ].map(s => (
                <div key={s.label} className={`${bgCard} border ${s.border} rounded-lg p-4 flex items-center gap-3`}>
                  <div className={`text-2xl font-bold ${s.color}`}>{s.count}</div>
                  <p className={`text-sm font-medium ${s.color}`}>{s.label}</p>
                </div>
              ))}
            </div>

            {/* Filters */}
            <div className="flex items-center gap-2">
              {(["all","open","in-progress","resolved"] as const).map(f => (
                <button key={f} onClick={() => setAtdlRemediationFilter(f)}
                  className={`px-3 py-1.5 rounded text-xs font-medium border transition-colors ${
                    atdlRemediationFilter === f
                      ? "bg-[#00e5ff]/20 text-[#00e5ff] border-[#00e5ff]/40"
                      : `${borderColor} ${textSecondary} hover:border-[#00e5ff]`
                  }`}
                >
                  {f === "all" ? `All (${findings.length})` : f === "open" ? `Open (${openCount})` : f === "in-progress" ? `In Progress (${inProgCount})` : `Resolved (${resolvedCount})`}
                </button>
              ))}
            </div>

            {/* Queue table */}
            <Card className={`${bgCard} border ${borderColor} overflow-hidden`}>
              <div className={`grid grid-cols-12 gap-3 px-4 py-2.5 ${isDarkMode ? "bg-[#1e4976]/30" : "bg-[#f1f5f9]"} border-b ${borderColor}`}>
                <div className={`col-span-1 text-xs font-semibold ${textSecondary}`}>ID</div>
                <div className={`col-span-1 text-xs font-semibold ${textSecondary}`}>Severity</div>
                <div className={`col-span-1 text-xs font-semibold ${textSecondary}`}>Strategy</div>
                <div className={`col-span-3 text-xs font-semibold ${textSecondary}`}>Finding</div>
                <div className={`col-span-2 text-xs font-semibold ${textSecondary}`}>Source</div>
                <div className={`col-span-1 text-xs font-semibold ${textSecondary}`}>Root Cause</div>
                <div className={`col-span-1 text-xs font-semibold ${textSecondary}`}>Owner</div>
                <div className={`col-span-1 text-xs font-semibold ${textSecondary}`}>Due</div>
                <div className={`col-span-1 text-xs font-semibold ${textSecondary}`}>Status</div>
              </div>

              {filtered.map((f, i) => (
                <div key={f.id} className={`grid grid-cols-12 gap-3 px-4 py-3 border-b ${borderColor} last:border-0 ${f.status === "resolved" ? "opacity-60" : ""} hover:${isDarkMode ? "bg-[#1e4976]/10" : "bg-gray-50"} transition-colors`}>
                  <div className="col-span-1">
                    <span className={`font-mono text-xs ${textSecondary}`}>{f.id}</span>
                  </div>
                  <div className="col-span-1">
                    <span className={`text-xs px-1.5 py-0.5 rounded ${f.severity === "Error" ? "bg-[#f44336]/20 text-[#f44336]" : "bg-[#ff9800]/20 text-[#ff9800]"}`}>{f.severity}</span>
                  </div>
                  <div className={`col-span-1 text-xs ${textPrimary}`}>{f.strategy}</div>
                  <div className={`col-span-3 text-xs ${textPrimary} leading-relaxed`}>{f.finding}</div>
                  <div className={`col-span-2 text-xs ${textSecondary}`}>{f.source}</div>
                  <div className={`col-span-1 text-xs ${textSecondary}`}>{f.rootCause}</div>
                  <div className="col-span-1">
                    <select className={`text-xs rounded border ${borderColor} ${isDarkMode ? "bg-[#0a1628] text-white" : "bg-white"} p-0.5 w-full`}>
                      {["Unassigned","J. Smith","M. Chen","S. Johnson"].map(o => (
                        <option key={o} selected={o === f.owner}>{o}</option>
                      ))}
                    </select>
                  </div>
                  <div className={`col-span-1 text-xs ${textSecondary}`}>{f.dueDate.split(",")[0]}</div>
                  <div className="col-span-1">
                    <select className={`text-xs rounded border ${borderColor} ${isDarkMode ? "bg-[#0a1628] text-white" : "bg-white"} p-0.5 w-full`}>
                      {["open","in-progress","resolved"].map(s => (
                        <option key={s} selected={s === f.status}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>
              ))}
            </Card>
          </div>
        </div>
      </div>
    )
  }

  // Spec Compare Overview Screen - For clients to see all protocols and their comparison status
  if (currentScreen === "spec-compare-overview") {
    const specCompareOverviewData = [
      { 
        asset: "Equities", 
        versions: [
          { protocol: "FIX 4.2", adminSpec: { name: "EQ_FIX42_v1.2.xml", uploaded: true }, clientSpec: { name: "client_eq_42.xml", uploaded: true }, status: "complete" },
          { protocol: "FIX 4.4", adminSpec: { name: "EQ_FIX44_v2.1.xml", uploaded: true }, clientSpec: { name: null, uploaded: false }, status: "not-started" },
          { protocol: "FIX 5.0", adminSpec: { name: "EQ_FIX50_v1.0.xml", uploaded: true }, clientSpec: { name: "client_eq_50.xml", uploaded: true }, status: "not-verified" },
        ]
      },
      { 
        asset: "Options", 
        versions: [
          { protocol: "FIX 4.2", adminSpec: { name: "OPT_FIX42_v1.1.xml", uploaded: true }, clientSpec: { name: null, uploaded: false }, status: "not-started" },
          { protocol: "FIX 4.4", adminSpec: { name: "OPT_FIX44_v2.0.xml", uploaded: true }, clientSpec: { name: "client_opt_44.xml", uploaded: true }, status: "complete" },
        ]
      },
      { 
        asset: "Futures", 
        versions: [
          { protocol: "FIX 4.2", adminSpec: { name: "FUT_FIX42_v1.0.xml", uploaded: true }, clientSpec: { name: null, uploaded: false }, status: "not-started" },
          { protocol: "FIX 4.4", adminSpec: { name: "FUT_FIX44_v1.1.xml", uploaded: true }, clientSpec: { name: null, uploaded: false }, status: "not-started" },
          { protocol: "FIX 5.0 SP2", adminSpec: { name: "FUT_FIX50SP2_v2.0.xml", uploaded: true }, clientSpec: { name: "client_fut_50sp2.xml", uploaded: true }, status: "not-verified" },
        ]
      },
    ]

    const getStatusBadge = (status: string) => {
      switch(status) {
        case "complete":
          return <span className="flex items-center gap-1 text-xs px-2 py-1 rounded bg-[#4caf50]/20 text-[#4caf50] border border-[#4caf50]/30"><CheckCircle className="h-3 w-3" /> Complete</span>
        case "not-verified":
          return <span className="flex items-center gap-1 text-xs px-2 py-1 rounded bg-[#ff9800]/20 text-[#ff9800] border border-[#ff9800]/30"><AlertTriangle className="h-3 w-3" /> Not Verified</span>
        case "not-started":
        default:
          return <span className="flex items-center gap-1 text-xs px-2 py-1 rounded bg-gray-500/20 text-gray-400 border border-gray-500/30"><Clock className="h-3 w-3" /> Not Started</span>
      }
    }

    return (
      <div className={`min-h-screen ${bgPrimary} flex`}>
        <Sidebar />
        <div className="flex-1 overflow-auto">
          <header className={`${bgSecondary} border-b ${borderColor} px-6 py-4`}>
            <button onClick={() => setCurrentScreen("dashboard")} className={`flex items-center gap-2 mb-2 ${textSecondary} hover:text-[#00e5ff]`}>
              <ArrowLeft className="h-4 w-4" /> Back to Dashboard
            </button>
            <h1 className={`text-2xl font-bold ${textPrimary}`}>Spec Comparison Overview</h1>
            <p className={textSecondary}>Compare your specifications with admin specs by asset class</p>
          </header>

          <div className="p-6">
            <div className="grid gap-6">
              {specCompareOverviewData.map((assetClass) => (
                <Card key={assetClass.asset} className={`${bgCard} border ${borderColor}`}>
                  <div className={`px-6 py-4 border-b ${borderColor}`}>
                    <h2 className={`text-lg font-bold ${textPrimary}`}>{assetClass.asset}</h2>
                  </div>
                  
                  {/* Table Header */}
                  <div className={`grid grid-cols-12 gap-4 px-6 py-3 ${isDarkMode ? "bg-[#0a1628]" : "bg-[#f1f5f9]"} border-b ${borderColor}`}>
                    <div className={`col-span-2 font-semibold text-sm ${textPrimary}`}>Status</div>
                    <div className={`col-span-2 font-semibold text-sm ${textPrimary}`}>Protocol</div>
                    <div className={`col-span-3 font-semibold text-sm ${textPrimary}`}>Admin Spec</div>
                    <div className={`col-span-3 font-semibold text-sm ${textPrimary}`}>Client Spec</div>
                    <div className={`col-span-2 font-semibold text-sm ${textPrimary}`}>Action</div>
                  </div>
                  
                  {/* Table Rows */}
                  <div className="divide-y divide-[#1e4976]/30">
                    {assetClass.versions.map((version) => (
                      <div 
                        key={`${assetClass.asset}-${version.protocol}`}
                        className={`grid grid-cols-12 gap-4 px-6 py-4 hover:bg-[#1e4976]/10 transition-colors items-center`}
                      >
                        {/* Status Column */}
                        <div className="col-span-2">
                          {getStatusBadge(version.status)}
                        </div>
                        
                        {/* Protocol Column */}
                        <div className={`col-span-2 font-medium ${textPrimary}`}>
                          {version.protocol}
                        </div>
                        
                        {/* Admin Spec Column */}
                        <div className="col-span-3 flex items-center gap-2">
                          <div className={`flex items-center gap-2 px-3 py-1.5 rounded border ${borderColor}`}>
                            <FileText className={`h-4 w-4 ${textSecondary}`} />
                            <span className={`text-sm ${textPrimary} truncate`}>{version.adminSpec.name}</span>
                          </div>
                        </div>
                        
                        {/* My Spec Column */}
                        <div className="col-span-3 flex items-center gap-2">
                          {version.clientSpec.uploaded ? (
                            <>
                              <div className={`flex items-center gap-2 px-3 py-1.5 rounded ${isDarkMode ? "bg-[#4caf50]/20" : "bg-[#4caf50]/10"} border border-[#4caf50]/30`}>
                                <CheckCircle className="h-4 w-4 text-[#4caf50]" />
                                <span className={`text-sm ${textPrimary} truncate`}>{version.clientSpec.name}</span>
                              </div>
                              <label className={`cursor-pointer p-1.5 rounded hover:bg-[#1e4976]/30 ${textSecondary}`} title="Replace">
                                <input type="file" className="hidden" accept=".xml,.txt,.csv" />
                                <Upload className="h-4 w-4" />
                              </label>
                            </>
                          ) : (
                            <label className={`cursor-pointer flex items-center gap-2 px-3 py-1.5 rounded border-2 border-dashed ${borderColor} hover:border-[#00e5ff] transition-colors`}>
                              <input type="file" className="hidden" accept=".xml,.txt,.csv" />
                              <Upload className={`h-4 w-4 ${textSecondary}`} />
<span className={`text-sm ${textSecondary}`}>Select From Client Specs</span>
  </label>
  )}
  </div>
  
  {/* Action Column */}
  <div className="col-span-2">
  {version.status === "complete" ? (
  <Button
                              size="sm" 
                              variant="outline"
                              onClick={() => { setShowSpecResults(true); setSelectedAdminSpecForResults(version.adminSpec.name); setSelectedAssetClass(assetClass.asset); setCurrentScreen("spec-compare"); setIsAdHocMode(false); }}
                              className="text-xs"
                            >
                              <Eye className="h-3 w-3 mr-1" /> View Results
                            </Button>
                          ) : version.clientSpec.uploaded ? (
                            <Button 
                              size="sm"
                              onClick={() => { setSelectedAssetClass(assetClass.asset); setShowSpecResults(false); setCurrentScreen("spec-compare"); setIsAdHocMode(false); }}
                              className="bg-[#00e5ff] text-[#0a1628] hover:bg-[#00e5ff]/80 text-xs"
                            >
                              <GitCompare className="h-3 w-3 mr-1" /> Compare
                            </Button>
                          ) : (
                            <Button 
                              size="sm" 
                              variant="outline"
                              disabled
                              className="text-xs opacity-50"
                            >
                              <GitCompare className="h-3 w-3 mr-1" /> Compare
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Admin Specs Screen - Two column layout: Admin Specs | My Specs (or Client Specs for admin)
  if (currentScreen === "admin-specs") {
    const specsData = [
      { 
        asset: "Equities", 
        versions: [
          { protocol: "FIX 4.2", adminSpec: { name: "EQ_FIX42_v1.2.xml", uploaded: true }, standardizedSpec: { name: "EQ_FIX42_v1.2_Standardized.xlsx", available: true }, clientSpec: { name: "client_eq_42.xml", uploaded: true } },
          { protocol: "FIX 4.4", adminSpec: { name: "EQ_FIX44_v2.1.xml", uploaded: true }, standardizedSpec: { name: "EQ_FIX44_v2.1_Standardized.xlsx", available: true }, clientSpec: { name: null, uploaded: false } },
          { protocol: "FIX 5.0", adminSpec: { name: "EQ_FIX50_v1.0.xml", uploaded: true }, standardizedSpec: { name: null, available: false }, clientSpec: { name: "client_eq_50.xml", uploaded: true } },
        ]
      },
      { 
        asset: "Options", 
        versions: [
          { protocol: "FIX 4.2", adminSpec: { name: "OPT_FIX42_v1.1.xml", uploaded: true }, standardizedSpec: { name: null, available: false }, clientSpec: { name: null, uploaded: false } },
          { protocol: "FIX 4.4", adminSpec: { name: "OPT_FIX44_v2.0.xml", uploaded: true }, standardizedSpec: { name: "OPT_FIX44_v2.0_Standardized.xlsx", available: true }, clientSpec: { name: "client_opt_44.xml", uploaded: true } },
        ]
      },
      { 
        asset: "Futures", 
        versions: [
          { protocol: "FIX 4.2", adminSpec: { name: "FUT_FIX42_v1.0.xml", uploaded: true }, standardizedSpec: { name: null, available: false }, clientSpec: { name: null, uploaded: false } },
          { protocol: "FIX 4.4", adminSpec: { name: "FUT_FIX44_v1.1.xml", uploaded: true }, standardizedSpec: { name: null, available: false }, clientSpec: { name: null, uploaded: false } },
          { protocol: "FIX 5.0 SP2", adminSpec: { name: "FUT_FIX50SP2_v2.0.xml", uploaded: true }, standardizedSpec: { name: "FUT_FIX50SP2_v2.0_Standardized.xlsx", available: true }, clientSpec: { name: "client_fut_50sp2.xml", uploaded: true } },
        ]
      },
      { 
        asset: "Fixed Income", 
        versions: [
          { protocol: "FIX 4.4", adminSpec: { name: "FI_FIX44_v1.2.xml", uploaded: true }, standardizedSpec: { name: "FI_FIX44_v1.2_Standardized.xlsx", available: true }, clientSpec: { name: "client_fi_44.xml", uploaded: true } },
          { protocol: "FIX 5.0", adminSpec: { name: "FI_FIX50_v1.0.xml", uploaded: true }, standardizedSpec: { name: null, available: false }, clientSpec: { name: null, uploaded: false } },
        ]
      },
      { 
        asset: "FX", 
        versions: [
          { protocol: "FIX 4.4", adminSpec: { name: "FX_FIX44_v1.0.xml", uploaded: true }, standardizedSpec: { name: null, available: false }, clientSpec: { name: null, uploaded: false } },
          { protocol: "FIX 5.0 SP2", adminSpec: { name: "FX_FIX50SP2_v1.1.xml", uploaded: true }, standardizedSpec: { name: "FX_FIX50SP2_v1.1_Standardized.xlsx", available: true }, clientSpec: { name: "client_fx_50sp2.xml", uploaded: true } },
        ]
      },
    ]

    return (
      <div className={`min-h-screen ${bgPrimary} flex`}>
        <Sidebar />
        <div className="flex-1 overflow-auto">
          <header className={`${bgSecondary} border-b ${borderColor} px-6 py-4`}>
            <h1 className={`text-2xl font-bold ${textPrimary}`}>{selectedRole === "admin" ? "Admin Specifications" : "Specifications Management"}</h1>
            <p className={textSecondary}>{selectedRole === "admin" ? "Manage FIX protocol specifications by asset class" : "View admin specs and manage your specs by asset class"}</p>
          </header>

          <div className="p-6">
            <div className="grid gap-6">
              {specsData.map((assetClass) => (
                <Card key={assetClass.asset} className={`${bgCard} border ${borderColor}`}>
                  <div className={`px-6 py-4 border-b ${borderColor}`}>
                    <h2 className={`text-lg font-bold ${textPrimary}`}>{assetClass.asset}</h2>
                  </div>
                  
                  {/* Table Header - 3 columns for admin, 4 for client */}
                  <div className={`grid ${selectedRole === "admin" ? "grid-cols-3" : "grid-cols-4"} gap-4 px-6 py-3 ${isDarkMode ? "bg-[#0a1628]" : "bg-[#f1f5f9]"} border-b ${borderColor}`}>
                    <div className={`font-semibold text-sm ${textPrimary}`}>Protocol</div>
                    <div className={`font-semibold text-sm ${textPrimary}`}>Admin Spec (Original)</div>
                    <div className={`font-semibold text-sm ${textPrimary}`}>Admin Spec (Standardized)</div>
                    {selectedRole === "client" && (
                      <div className={`font-semibold text-sm ${textPrimary}`}>My Specs</div>
                    )}
                  </div>
                  
                  {/* Table Rows */}
                  <div className="divide-y divide-[#1e4976]/30">
                    {assetClass.versions.map((version: any) => (
                      <div 
                        key={`${assetClass.asset}-${version.protocol}`}
                        className={`grid ${selectedRole === "admin" ? "grid-cols-3" : "grid-cols-4"} gap-4 px-6 py-4 hover:bg-[#1e4976]/10 transition-colors items-center`}
                      >
                        {/* Protocol Column */}
                        <div className={`font-medium ${textPrimary}`}>
                          {version.protocol}
                        </div>
                        
{/* Admin Spec (Original) Column */}
  <div className="flex items-center gap-2">
  <div className={`flex items-center gap-2 px-3 py-1.5 rounded border ${borderColor}`}>
  <FileText className={`h-4 w-4 ${textSecondary}`} />
  <span className={`text-sm ${textPrimary}`}>{version.adminSpec.name}</span>
  </div>
  <button
  className={`p-1.5 rounded hover:bg-[#00e5ff]/20 ${textSecondary} hover:text-[#00e5ff] transition-colors`}
  title="View spec"
  >
  <Eye className="h-4 w-4" />
  </button>
  <button
  className={`p-1.5 rounded hover:bg-[#00e5ff]/20 ${textSecondary} hover:text-[#00e5ff] transition-colors`}
  title="Download spec"
  >
  <Download className="h-4 w-4" />
  </button>
  {selectedRole === "admin" && (
  <label className={`cursor-pointer p-1.5 rounded hover:bg-[#1e4976]/30 ${textSecondary} hover:text-[#00e5ff] transition-colors`} title="Replace">
  <input type="file" className="hidden" accept=".xml,.txt,.csv" />
<Upload className="h-4 w-4" />
  </label>
  )}
  </div>

{/* Admin Spec (Standardized) Column */}
  <div className="flex items-center gap-2">
  {version.standardizedSpec?.available ? (
  <>
  <div className={`flex items-center gap-2 px-3 py-1.5 rounded ${isDarkMode ? "bg-[#4caf50]/20" : "bg-[#4caf50]/10"} border border-[#4caf50]/30`}>
  <CheckCircle className="h-4 w-4 text-[#4caf50]" />
  <span className={`text-sm ${textPrimary}`}>{version.standardizedSpec.name}</span>
  </div>
  <button className={`p-1.5 rounded hover:bg-[#00e5ff]/20 ${textSecondary} hover:text-[#00e5ff] transition-colors`} title="View standardized">
  <Eye className="h-4 w-4" />
  </button>
  <button className={`p-1.5 rounded hover:bg-[#00e5ff]/20 ${textSecondary} hover:text-[#00e5ff] transition-colors`} title="Download standardized">
  <Download className="h-4 w-4" />
  </button>
  </>
  ) : (
  <span className={`text-sm ${textSecondary} italic`}>Not yet standardized</span>
  )}
  </div>
  
{/* My Specs Column - Only for client role */}
                        {selectedRole === "client" && (
                          <div className="flex items-center gap-2">
                            {version.clientSpec.uploaded ? (
                              <>
                                <div className={`flex items-center gap-2 px-3 py-1.5 rounded ${isDarkMode ? "bg-[#4caf50]/20" : "bg-[#4caf50]/10"} border border-[#4caf50]/30`}>
                                  <CheckCircle className="h-4 w-4 text-[#4caf50]" />
                                  <span className={`text-sm ${textPrimary}`}>{version.clientSpec.name}</span>
                                </div>
                                <button className={`p-1.5 rounded hover:bg-[#1e4976]/30 ${textSecondary}`} title="Download">
                                  <Download className="h-4 w-4" />
                                </button>
                                <label className={`cursor-pointer p-1.5 rounded hover:bg-[#1e4976]/30 ${textSecondary}`} title="Replace">
                                  <input type="file" className="hidden" accept=".xml,.txt,.csv" />
                                  <Upload className="h-4 w-4" />
                                </label>
                              </>
                            ) : (
                              <label className={`cursor-pointer flex items-center gap-2 px-3 py-1.5 rounded border-2 border-dashed ${borderColor} hover:border-[#00e5ff] hover:bg-[#00e5ff]/5 transition-colors`}>
                                <input type="file" className="hidden" accept=".xml,.txt,.csv" />
                                <Upload className={`h-4 w-4 ${textSecondary}`} />
                                <span className={`text-sm ${textSecondary}`}>Upload spec</span>
                              </label>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  {/* Add new protocol - Admin only */}
                  {selectedRole === "admin" && (
                    <div className={`px-6 py-3 border-t ${borderColor}`}>
                      <button className={`text-sm ${textSecondary} hover:text-[#00e5ff] flex items-center gap-1`}>
                        <Plus className="h-3 w-3" /> Add new protocol version
                      </button>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
)
  }

  // Client Specs Screen - For clients to upload and manage their specs
  if (currentScreen === "client-specs") {
    const clientSpecsData = [
      {
        asset: "Equities",
        versions: [
    { protocol: "FIX 4.2", specs: [{ name: "client_eq_42_v1.xml", uploaded: "2026-04-09", status: "active" }] },
        { protocol: "FIX 4.4", specs: [{ name: "client_eq_44_v2.xml", uploaded: "2026-04-12", status: "active" }] },
          { protocol: "FIX 5.0", specs: [] },
        ]
      },
      {
        asset: "Options",
        versions: [
          { protocol: "FIX 4.2", specs: [] },
          { protocol: "FIX 4.4", specs: [{ name: "client_opt_44_v1.xml", uploaded: "2026-04-09", status: "active" }] },
        ]
      },
      {
        asset: "Futures",
        versions: [
          { protocol: "FIX 4.2", specs: [] },
          { protocol: "FIX 4.4", specs: [] },
          { protocol: "FIX 5.0 SP2", specs: [{ name: "client_fut_50sp2_v1.xml", uploaded: "2026-04-13", status: "active" }] },
        ]
      },
    ]

    return (
      <div className={`min-h-screen ${bgPrimary} flex`}>
        <Sidebar />
        <div className="flex-1 overflow-auto">
          <header className={`${bgSecondary} border-b ${borderColor} px-6 py-4`}>
            <button onClick={() => setCurrentScreen("dashboard")} className={`flex items-center gap-2 mb-2 ${textSecondary} hover:text-[#00e5ff]`}>
              <ArrowLeft className="h-4 w-4" /> Back to Dashboard
            </button>
            <h1 className={`text-2xl font-bold ${textPrimary}`}>My Specifications</h1>
            <p className={textSecondary}>Upload and manage your FIX specifications by asset class</p>
          </header>

          <div className="p-6">
            <div className="grid gap-6">
              {clientSpecsData.map((assetClass) => (
                <Card key={assetClass.asset} className={`${bgCard} border ${borderColor}`}>
                  <div className={`px-6 py-4 border-b ${borderColor}`}>
                    <h2 className={`text-lg font-bold ${textPrimary}`}>{assetClass.asset}</h2>
                  </div>
                  
                  {/* Table Header */}
                  <div className={`grid grid-cols-12 gap-4 px-6 py-3 ${isDarkMode ? "bg-[#0a1628]" : "bg-[#f1f5f9]"} border-b ${borderColor}`}>
                    <div className={`col-span-2 font-semibold text-sm ${textPrimary}`}>Protocol</div>
                    <div className={`col-span-4 font-semibold text-sm ${textPrimary}`}>Specification File</div>
                    <div className={`col-span-2 font-semibold text-sm ${textPrimary}`}>Uploaded</div>
                    <div className={`col-span-2 font-semibold text-sm ${textPrimary}`}>Status</div>
                    <div className={`col-span-2 font-semibold text-sm ${textPrimary}`}>Actions</div>
                  </div>
                  
                  {/* Table Rows */}
                  <div className="divide-y divide-[#1e4976]/30">
                    {assetClass.versions.map((version) => (
                      <div 
                        key={`${assetClass.asset}-${version.protocol}`}
                        className={`grid grid-cols-12 gap-4 px-6 py-4 hover:bg-[#1e4976]/10 transition-colors items-center`}
                      >
                        {/* Protocol Column */}
                        <div className={`col-span-2 font-medium ${textPrimary}`}>
                          {version.protocol}
                        </div>
                        
                        {/* Spec File Column */}
                        <div className="col-span-4">
                          {version.specs.length > 0 ? (
                            <div className={`flex items-center gap-2 px-3 py-1.5 rounded ${isDarkMode ? "bg-[#4caf50]/20" : "bg-[#4caf50]/10"} border border-[#4caf50]/30 w-fit`}>
                              <CheckCircle className="h-4 w-4 text-[#4caf50]" />
                              <span className={`text-sm ${textPrimary}`}>{version.specs[0].name}</span>
                            </div>
                          ) : (
                            <span className={`text-sm ${textSecondary}`}>No spec uploaded</span>
                          )}
                        </div>
                        
                        {/* Uploaded Column */}
                        <div className={`col-span-2 text-sm ${textSecondary}`}>
                          {version.specs.length > 0 ? version.specs[0].uploaded : "-"}
                        </div>
                        
                        {/* Status Column */}
                        <div className="col-span-2">
                          {version.specs.length > 0 ? (
                            <span className="px-2 py-1 rounded text-xs bg-[#4caf50]/20 text-[#4caf50]">Active</span>
                          ) : (
                            <span className="px-2 py-1 rounded text-xs bg-gray-500/20 text-gray-400">Pending</span>
                          )}
                        </div>
                        
                        {/* Actions Column */}
                        <div className="col-span-2 flex gap-2">
                          {version.specs.length > 0 ? (
                            <>
                              <Button size="sm" variant="outline" className="text-xs h-8">
                                <Eye className="h-3 w-3 mr-1" /> View
                              </Button>
                              <label className="cursor-pointer">
                                <input type="file" className="hidden" accept=".xml,.txt,.csv" />
                                <Button size="sm" variant="outline" className="text-xs h-8" asChild>
                                  <span><Upload className="h-3 w-3 mr-1" /> Replace</span>
                                </Button>
                              </label>
                            </>
                          ) : (
                            <label className="cursor-pointer">
                              <input type="file" className="hidden" accept=".xml,.txt,.csv" />
                              <Button size="sm" className="bg-[#00e5ff] text-[#0a1628] hover:bg-[#00e5ff]/80 text-xs h-8" asChild>
                                <span><Upload className="h-3 w-3 mr-1" /> Upload</span>
                              </Button>
                            </label>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Client Log Files Screen - For clients to upload and manage their FIX log files
  if (currentScreen === "client-log-files") {
    const clientLogFilesData = [
      {
        asset: "Equities",
        versions: [
          { protocol: "FIX 4.2", logs: [
{ name: "eq_fix42_20260413.log", uploaded: "2026-04-13", size: "2.4 MB", status: "active" },
        { name: "eq_fix42_20260409.log", uploaded: "2026-04-09", size: "1.8 MB", status: "archived" },
          ]},
          { protocol: "FIX 4.4", logs: [
            { name: "eq_fix44_20260412.log", uploaded: "2026-04-12", size: "3.1 MB", status: "active" },
          ]},
        ]
      },
      {
        asset: "Options",
        versions: [
          { protocol: "FIX 4.4", logs: [
            { name: "opt_fix44_20260409.log", uploaded: "2026-04-09", size: "1.1 MB", status: "active" },
          ]},
        ]
      },
      {
        asset: "Futures",
        versions: [
          { protocol: "FIX 4.2", logs: [] },
          { protocol: "FIX 5.0 SP2", logs: [] },
        ]
      },
      {
        asset: "Fixed Income",
        versions: [
          { protocol: "FIX 4.4", logs: [] },
        ]
      },
      {
        asset: "FX",
        versions: [
          { protocol: "FIX 5.0 SP2", logs: [] },
        ]
      },
    ]

    return (
      <div className={`min-h-screen ${bgPrimary} flex`}>
        <Sidebar />
        <div className="flex-1 overflow-auto">
          <header className={`${bgSecondary} border-b ${borderColor} px-6 py-4`}>
            <button onClick={() => setCurrentScreen("dashboard")} className={`flex items-center gap-2 mb-2 ${textSecondary} hover:text-[#00e5ff]`}>
              <ArrowLeft className="h-4 w-4" /> Back to Dashboard
            </button>
            <h1 className={`text-2xl font-bold ${textPrimary}`}>My Log Files</h1>
            <p className={textSecondary}>Upload and manage your FIX log files by asset class</p>
          </header>

          <div className="p-6">
            <div className="grid gap-6">
              {clientLogFilesData.map((assetClass) => (
                <Card key={assetClass.asset} className={`${bgCard} border ${borderColor}`}>
                  <div className={`px-6 py-4 border-b ${borderColor}`}>
                    <h2 className={`text-lg font-bold ${textPrimary}`}>{assetClass.asset}</h2>
                  </div>
                  
                  {/* Table Header */}
                  <div className={`grid grid-cols-12 gap-4 px-6 py-3 ${isDarkMode ? "bg-[#0a1628]" : "bg-[#f1f5f9]"} border-b ${borderColor}`}>
                    <div className={`col-span-2 font-semibold text-sm ${textPrimary}`}>Protocol</div>
                    <div className={`col-span-4 font-semibold text-sm ${textPrimary}`}>Log File</div>
                    <div className={`col-span-1 font-semibold text-sm ${textPrimary}`}>Size</div>
                    <div className={`col-span-2 font-semibold text-sm ${textPrimary}`}>Uploaded</div>
                    <div className={`col-span-1 font-semibold text-sm ${textPrimary}`}>Status</div>
                    <div className={`col-span-2 font-semibold text-sm ${textPrimary}`}>Actions</div>
                  </div>
                  
                  {/* Table Rows */}
                  <div className="divide-y divide-[#1e4976]/30">
                    {assetClass.versions.map((version) => (
                      <div key={`${assetClass.asset}-${version.protocol}`}>
                        {version.logs.length > 0 ? (
                          version.logs.map((log, logIndex) => (
                            <div 
                              key={`${version.protocol}-${log.name}`}
                              className={`grid grid-cols-12 gap-4 px-6 py-4 hover:bg-[#1e4976]/10 transition-colors items-center`}
                            >
                              {/* Protocol Column - only show on first row */}
                              <div className={`col-span-2 font-medium ${textPrimary}`}>
                                {logIndex === 0 ? version.protocol : ""}
                              </div>
                              
                              {/* Log File Column */}
                              <div className="col-span-4">
                                <div className={`flex items-center gap-2 px-3 py-1.5 rounded ${isDarkMode ? "bg-[#2196f3]/20" : "bg-[#2196f3]/10"} border border-[#2196f3]/30 w-fit`}>
                                  <FileSearch className="h-4 w-4 text-[#2196f3]" />
                                  <span className={`text-sm ${textPrimary}`}>{log.name}</span>
                                </div>
                              </div>
                              
                              {/* Size Column */}
                              <div className={`col-span-1 text-sm ${textSecondary}`}>
                                {log.size}
                              </div>
                              
                              {/* Uploaded Column */}
                              <div className={`col-span-2 text-sm ${textSecondary}`}>
                                {log.uploaded}
                              </div>
                              
                              {/* Status Column */}
                              <div className="col-span-1">
                                <span className={`px-2 py-1 rounded text-xs ${log.status === "active" ? "bg-[#4caf50]/20 text-[#4caf50]" : "bg-gray-500/20 text-gray-400"}`}>
                                  {log.status === "active" ? "Active" : "Archived"}
                                </span>
                              </div>
                              
                              {/* Actions Column */}
                              <div className="col-span-2 flex gap-2">
                                <Button size="sm" variant="outline" className="text-xs h-8">
                                  <Eye className="h-3 w-3 mr-1" /> View
                                </Button>
                                <Button size="sm" variant="outline" className="text-xs h-8 text-red-400 hover:text-red-300">
                                  <X className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className={`grid grid-cols-12 gap-4 px-6 py-4 hover:bg-[#1e4976]/10 transition-colors items-center`}>
                            {/* Protocol Column */}
                            <div className={`col-span-2 font-medium ${textPrimary}`}>
                              {version.protocol}
                            </div>
                            
                            {/* No Logs Message */}
                            <div className="col-span-4">
                              <span className={`text-sm ${textSecondary}`}>No log files uploaded</span>
                            </div>
                            
                            <div className="col-span-1"></div>
                            <div className="col-span-2"></div>
                            <div className="col-span-1"></div>
                            
                            {/* Upload Action */}
                            <div className="col-span-2">
                              <label className="cursor-pointer">
                                <input type="file" className="hidden" accept=".log,.txt,.fix" />
                                <Button size="sm" className="bg-[#00e5ff] text-[#0a1628] hover:bg-[#00e5ff]/80 text-xs h-8" asChild>
                                  <span><Upload className="h-3 w-3 mr-1" /> Upload</span>
                                </Button>
                              </label>
                            </div>
                          </div>
                        )}
                        
                        {/* Add More button for protocols that already have logs */}
                        {version.logs.length > 0 && (
                          <div className={`px-6 py-2 ${isDarkMode ? "bg-[#0a1628]/30" : "bg-[#f8fafc]"}`}>
                            <label className="cursor-pointer inline-block">
                              <input type="file" className="hidden" accept=".log,.txt,.fix" />
                              <Button size="sm" variant="outline" className="text-xs h-7" asChild>
                                <span><Plus className="h-3 w-3 mr-1" /> Add Another Log File for {version.protocol}</span>
                              </Button>
                            </label>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  // Settings Screen
  if (currentScreen === "settings") {
    const settingsTabs = [
      { key: "look-feel", label: "Look and Feel", icon: Sun },
      { key: "general", label: "General", icon: Settings },
      { key: "security", label: "Security", icon: Shield },
      { key: "mail", label: "Mail", icon: Bell },
      { key: "questionnaires", label: "Questionnaires", icon: HelpCircle },
      { key: "license", label: "License", icon: Award },
    ]

    return (
      <div className={`min-h-screen ${bgPrimary} flex`}>
        <Sidebar />
        
        <div className="flex-1 overflow-auto">
          <header className={`${bgSecondary} border-b ${borderColor} px-6 py-4`}>
            <h1 className={`text-2xl font-bold ${textPrimary}`}>Settings</h1>
            <p className={textSecondary}>Configure your B- COMET preferences</p>
          </header>

          <div className="p-6">
            {/* Tabs */}
            <div className={`flex gap-1 border-b ${borderColor} mb-6`}>
              {settingsTabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setSettingsTab(tab.key as any)}
                  className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors ${
                    settingsTab === tab.key
                      ? "border-[#00e5ff] text-[#00e5ff]"
                      : `border-transparent ${textSecondary} hover:text-[#00e5ff]`
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  <span className="text-sm font-medium">{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <Card className={`${bgCard} p-6 border ${borderColor}`}>
              {settingsTab === "look-feel" && (
                <div className="space-y-6">
                  <h3 className={`text-lg font-bold ${textPrimary}`}>Look and Feel Settings</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className={`font-medium ${textPrimary}`}>Theme</p>
                        <p className={`text-sm ${textSecondary}`}>Choose between dark and light mode</p>
                      </div>
                      <Button variant="outline" onClick={() => setIsDarkMode(!isDarkMode)}>
                        {isDarkMode ? <><Sun className="h-4 w-4 mr-2" /> Light Mode</> : <><Moon className="h-4 w-4 mr-2" /> Dark Mode</>}
                      </Button>
                    </div>
                    <div className={`border-t ${borderColor} pt-4`}>
                      <p className={`font-medium ${textPrimary} mb-2`}>Accent Color</p>
                      <div className="flex gap-2">
                        {["#00e5ff", "#4caf50", "#ff9800", "#9c27b0", "#f44336"].map((color) => (
                          <button
                            key={color}
                            className="w-8 h-8 rounded-full border-2 border-white/20"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {settingsTab === "general" && (
                <div className="space-y-6">
                  <h3 className={`text-lg font-bold ${textPrimary}`}>General Settings</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-3 border-b border-dashed border-[#1e4976]/30">
                      <span className={textSecondary}>Refresh Script Enabled:</span>
                      <input type="checkbox" className="h-5 w-5 rounded" />
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-dashed border-[#1e4976]/30">
                      <span className={textSecondary}>Path to Script/Executable:</span>
                      <Input className={`w-96 ${isDarkMode ? "bg-[#0a1628] border-[#1e4976] text-white" : ""}`} placeholder="/path/to/script" />
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-dashed border-[#1e4976]/30">
                      <span className={textSecondary}>Send Conductor Logs to Support Team:</span>
                      <div className="flex gap-2">
                        <Button size="sm">Send Conductor Logs</Button>
                        <Button size="sm" variant="outline">Download Conductor Logs</Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-dashed border-[#1e4976]/30">
                      <div>
                        <span className={textSecondary}>Test Runner Inactivity Timeout (in minutes):</span>
                        <p className={`text-xs ${textSecondary}`}>(Leave blank for no timeout)</p>
                      </div>
                      <Input className={`w-48 ${isDarkMode ? "bg-[#0a1628] border-[#1e4976] text-white" : ""}`} placeholder="" />
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-dashed border-[#1e4976]/30">
                      <div>
                        <span className={textSecondary}>Autonomous Test Timeout (in minutes):</span>
                        <p className={`text-xs ${textSecondary}`}>(Must be greater than 0)</p>
                      </div>
                      <Input className={`w-48 ${isDarkMode ? "bg-[#0a1628] border-[#1e4976] text-white" : ""}`} defaultValue="5" />
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-dashed border-[#1e4976]/30">
                      <div>
                        <span className={textSecondary}>Admin Dashboard Certification Filter (in days):</span>
                        <p className={`text-xs ${textSecondary}`}>(Leave blank for no filter)</p>
                      </div>
                      <Input className={`w-48 ${isDarkMode ? "bg-[#0a1628] border-[#1e4976] text-white" : ""}`} placeholder="" />
                    </div>
                    <div className="flex items-center justify-between py-3">
                      <span className={textSecondary}>Automated Test Case Limit:</span>
                      <Input className={`w-48 ${isDarkMode ? "bg-[#0a1628] border-[#1e4976] text-white" : ""}`} defaultValue="10" />
                    </div>
                  </div>
                  <div className="flex justify-center pt-4">
                    <Button><CheckCircle className="h-4 w-4 mr-2" /> Save</Button>
                  </div>
                </div>
              )}

              {settingsTab === "security" && (
                <div className="space-y-6">
                  <h3 className={`text-lg font-bold ${textPrimary}`}>Security Settings</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-3 border-b border-dashed border-[#1e4976]/30">
                      <span className={textSecondary}>Password Expiry (days):</span>
                      <Input className={`w-48 ${isDarkMode ? "bg-[#0a1628] border-[#1e4976] text-white" : ""}`} defaultValue="90" />
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-dashed border-[#1e4976]/30">
                      <span className={textSecondary}>Session Timeout (minutes):</span>
                      <Input className={`w-48 ${isDarkMode ? "bg-[#0a1628] border-[#1e4976] text-white" : ""}`} defaultValue="30" />
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-dashed border-[#1e4976]/30">
                      <span className={textSecondary}>Two-Factor Authentication:</span>
                      <input type="checkbox" className="h-5 w-5 rounded" />
                    </div>
                    <div className="flex items-center justify-between py-3">
                      <span className={textSecondary}>IP Whitelist Enabled:</span>
                      <input type="checkbox" className="h-5 w-5 rounded" />
                    </div>
                  </div>
                  <div className="flex justify-center pt-4">
                    <Button><CheckCircle className="h-4 w-4 mr-2" /> Save</Button>
                  </div>
                </div>
              )}

              {settingsTab === "mail" && (
                <div className="space-y-6">
                  <h3 className={`text-lg font-bold ${textPrimary}`}>Mail Settings</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-3 border-b border-dashed border-[#1e4976]/30">
                      <span className={textSecondary}>SMTP Server:</span>
                      <Input className={`w-64 ${isDarkMode ? "bg-[#0a1628] border-[#1e4976] text-white" : ""}`} placeholder="smtp.example.com" />
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-dashed border-[#1e4976]/30">
                      <span className={textSecondary}>SMTP Port:</span>
                      <Input className={`w-48 ${isDarkMode ? "bg-[#0a1628] border-[#1e4976] text-white" : ""}`} defaultValue="587" />
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-dashed border-[#1e4976]/30">
                      <span className={textSecondary}>From Email:</span>
                      <Input className={`w-64 ${isDarkMode ? "bg-[#0a1628] border-[#1e4976] text-white" : ""}`} placeholder="noreply@bcomet.com" />
                    </div>
                    <div className="flex items-center justify-between py-3">
                      <span className={textSecondary}>Email Notifications Enabled:</span>
                      <input type="checkbox" defaultChecked className="h-5 w-5 rounded" />
                    </div>
                  </div>
                  <div className="flex justify-center pt-4">
                    <Button><CheckCircle className="h-4 w-4 mr-2" /> Save</Button>
                  </div>
                </div>
              )}

              {settingsTab === "questionnaires" && (
                <div className="space-y-6">
                  <h3 className={`text-lg font-bold ${textPrimary}`}>Questionnaires Settings</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-3 border-b border-dashed border-[#1e4976]/30">
                      <span className={textSecondary}>Enable Client Questionnaires:</span>
                      <input type="checkbox" defaultChecked className="h-5 w-5 rounded" />
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-dashed border-[#1e4976]/30">
                      <span className={textSecondary}>Questionnaire Reminder Interval (days):</span>
                      <Input className={`w-48 ${isDarkMode ? "bg-[#0a1628] border-[#1e4976] text-white" : ""}`} defaultValue="7" />
                    </div>
                    <div className="flex items-center justify-between py-3">
                      <span className={textSecondary}>Auto-Archive Completed (days):</span>
                      <Input className={`w-48 ${isDarkMode ? "bg-[#0a1628] border-[#1e4976] text-white" : ""}`} defaultValue="30" />
                    </div>
                  </div>
                  <div className="flex justify-center pt-4">
                    <Button><CheckCircle className="h-4 w-4 mr-2" /> Save</Button>
                  </div>
                </div>
              )}

              {settingsTab === "license" && (
                <div className="space-y-6">
                  <h3 className={`text-lg font-bold ${textPrimary}`}>License Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-3 border-b border-dashed border-[#1e4976]/30">
                      <span className={textSecondary}>License Type:</span>
                      <span className={`font-medium ${textPrimary}`}>Enterprise</span>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-dashed border-[#1e4976]/30">
                      <span className={textSecondary}>License Key:</span>
                      <span className={`font-mono text-sm ${textPrimary}`}>BCOMET-ENT-2026-XXXX-XXXX</span>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-dashed border-[#1e4976]/30">
                      <span className={textSecondary}>Expiry Date:</span>
                      <span className={`font-medium ${textPrimary}`}>December 31, 2026</span>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-dashed border-[#1e4976]/30">
                      <span className={textSecondary}>Max Users:</span>
                      <span className={`font-medium ${textPrimary}`}>Unlimited</span>
                    </div>
                    <div className="flex items-center justify-between py-3">
                      <span className={textSecondary}>Max Clients:</span>
                      <span className={`font-medium ${textPrimary}`}>Unlimited</span>
                    </div>
                  </div>
                  <div className="flex justify-center gap-3 pt-4">
                    <Button variant="outline">Update License</Button>
                    <Button>Contact Support</Button>
                  </div>
                </div>
              )}
            </Card>
          </div>
  </div>
  </div>
  )
  }
  
  // FIX MSG Creator Screen
  if (currentScreen === "fix-msg-creator") {
    const messageTypes = [
      { value: "D", label: "New Order Single (D)", fields: [
        { tag: "35", name: "MsgType", value: "D", editable: false },
        { tag: "49", name: "SenderCompID", value: "", editable: true },
        { tag: "56", name: "TargetCompID", value: "", editable: true },
        { tag: "34", name: "MsgSeqNum", value: "1", editable: true },
        { tag: "52", name: "SendingTime", value: "", editable: false },
        { tag: "11", name: "ClOrdID", value: "ORDER001", editable: true },
        { tag: "21", name: "HandlInst", value: "1", editable: true },
        { tag: "55", name: "Symbol", value: "AAPL", editable: true },
        { tag: "54", name: "Side", value: "1", editable: true },
        { tag: "60", name: "TransactTime", value: "", editable: true },
        { tag: "38", name: "OrderQty", value: "100", editable: true },
        { tag: "40", name: "OrdType", value: "2", editable: true },
        { tag: "44", name: "Price", value: "150.00", editable: true },
      ]},
      { value: "F", label: "Order Cancel Request (F)", fields: [
        { tag: "35", name: "MsgType", value: "F", editable: false },
        { tag: "49", name: "SenderCompID", value: "", editable: true },
        { tag: "56", name: "TargetCompID", value: "", editable: true },
        { tag: "34", name: "MsgSeqNum", value: "1", editable: true },
        { tag: "52", name: "SendingTime", value: "", editable: false },
        { tag: "11", name: "ClOrdID", value: "CANCEL001", editable: true },
        { tag: "41", name: "OrigClOrdID", value: "ORDER001", editable: true },
        { tag: "55", name: "Symbol", value: "AAPL", editable: true },
        { tag: "54", name: "Side", value: "1", editable: true },
        { tag: "60", name: "TransactTime", value: "", editable: true },
      ]},
      { value: "G", label: "Order Cancel/Replace (G)", fields: [
        { tag: "35", name: "MsgType", value: "G", editable: false },
        { tag: "49", name: "SenderCompID", value: "", editable: true },
        { tag: "56", name: "TargetCompID", value: "", editable: true },
        { tag: "34", name: "MsgSeqNum", value: "1", editable: true },
        { tag: "52", name: "SendingTime", value: "", editable: false },
        { tag: "11", name: "ClOrdID", value: "REPLACE001", editable: true },
        { tag: "41", name: "OrigClOrdID", value: "ORDER001", editable: true },
        { tag: "55", name: "Symbol", value: "AAPL", editable: true },
        { tag: "54", name: "Side", value: "1", editable: true },
        { tag: "60", name: "TransactTime", value: "", editable: true },
        { tag: "38", name: "OrderQty", value: "200", editable: true },
        { tag: "40", name: "OrdType", value: "2", editable: true },
        { tag: "44", name: "Price", value: "155.00", editable: true },
      ]},
      { value: "A", label: "Logon (A)", fields: [
        { tag: "35", name: "MsgType", value: "A", editable: false },
        { tag: "49", name: "SenderCompID", value: "", editable: true },
        { tag: "56", name: "TargetCompID", value: "", editable: true },
        { tag: "34", name: "MsgSeqNum", value: "1", editable: true },
        { tag: "52", name: "SendingTime", value: "", editable: false },
        { tag: "98", name: "EncryptMethod", value: "0", editable: true },
        { tag: "108", name: "HeartBtInt", value: "30", editable: true },
      ]},
      { value: "5", label: "Logout (5)", fields: [
        { tag: "35", name: "MsgType", value: "5", editable: false },
        { tag: "49", name: "SenderCompID", value: "", editable: true },
        { tag: "56", name: "TargetCompID", value: "", editable: true },
        { tag: "34", name: "MsgSeqNum", value: "1", editable: true },
        { tag: "52", name: "SendingTime", value: "", editable: false },
      ]},
      { value: "0", label: "Heartbeat (0)", fields: [
        { tag: "35", name: "MsgType", value: "0", editable: false },
        { tag: "49", name: "SenderCompID", value: "", editable: true },
        { tag: "56", name: "TargetCompID", value: "", editable: true },
        { tag: "34", name: "MsgSeqNum", value: "1", editable: true },
        { tag: "52", name: "SendingTime", value: "", editable: false },
      ]},
    ]
    
    const handleMsgTypeChange = (msgType: string) => {
      setFixMsgSelectedType(msgType)
      const selectedMsg = messageTypes.find(m => m.value === msgType)
      if (selectedMsg) {
        setFixMsgFields(selectedMsg.fields.map(f => ({ ...f })))
      } else {
        setFixMsgFields([])
      }
    }
    
    const handleSpecChange = (spec: string) => {
      setFixMsgSelectedSpec(spec)
      // Clear fields if spec changes
      if (!spec) {
        setFixMsgSelectedType("")
        setFixMsgFields([])
      }
    }
    
    const getMsgTypeName = (msgType: string) => {
      const types: Record<string, string> = {
        "D": "D - New Order", "F": "F - Cancel Req", "G": "G - Cancel/Replace",
        "8": "8 - Exec Report", "0": "0 - Heartbeat", "A": "A - Logon", "5": "5 - Logout"
      }
      return types[msgType] || msgType
    }
    
    const getOrdStatusName = (status: string) => {
      const statuses: Record<string, string> = { "0": "New", "1": "Partially filled", "2": "Filled", "4": "Canceled", "8": "Rejected", "": "-" }
      return statuses[status] || status
    }
    
    const generateFixMessage = () => {
      if (fixMsgFields.length === 0) return ""
      const fields = fixMsgFields.map(f => `${f.tag}=${f.value}`).join("|")
      return `8=FIX.4.4|9=XXX|${fields}|10=XXX|`
    }
    
const copyToClipboard = () => {
  navigator.clipboard.writeText(generateFixMessage().replace(/\|/g, "\x01"))
  setFixMsgCopied(true)
  setTimeout(() => setFixMsgCopied(false), 2000)
  }
    
    const handleConnect = () => {
      if (!fixMsgIsConnected) {
        const timestamp = new Date().toISOString().slice(0, 19).replace("T", " ")
        const sender = fixMsgConnectionConfig.senderCompId || "CLIENT"
        const target = fixMsgConnectionConfig.targetCompId || "SERVER"
        setFixMsgLog([
          { direction: "send", msgType: "A", msgTypeName: "A - Logon", seqNum: 1, clOrdId: "", ordStatus: "", ordStatusName: "-", rawMessage: `8=FIX.4.2|9=67|35=A|49=${sender}|56=${target}|34=1|52=${timestamp.replace(/[-: ]/g, "")}|98=0|108=30|10=193|`, timestamp },
          { direction: "recv", msgType: "A", msgTypeName: "A - Logon", seqNum: 2, clOrdId: "", ordStatus: "", ordStatusName: "-", rawMessage: `8=FIX.4.2|9=67|35=A|49=${target}|56=${sender}|34=2|52=${timestamp.replace(/[-: ]/g, "")}|98=0|108=30|10=193|`, timestamp }
        ])
        setFixMsgSeqNum(3)
        setFixMsgIsConnected(true)
      } else {
        setFixMsgIsConnected(false)
        setFixMsgLog([])
        setFixMsgSeqNum(1)
      }
    }
    
    const handleSendMessage = () => {
      if (!fixMsgIsConnected || fixMsgFields.length === 0) return
      const timestamp = new Date().toISOString().slice(0, 19).replace("T", " ")
      const sender = fixMsgConnectionConfig.senderCompId || "CLIENT"
      const target = fixMsgConnectionConfig.targetCompId || "SERVER"
      const clOrdId = fixMsgFields.find(f => f.tag === "11")?.value || "Order" + fixMsgSeqNum
      const symbol = fixMsgFields.find(f => f.tag === "55")?.value || "AAPL"
      const qty = fixMsgFields.find(f => f.tag === "38")?.value || "100"
      const price = fixMsgFields.find(f => f.tag === "44")?.value || "150.00"
      const msgType = fixMsgFields.find(f => f.tag === "35")?.value || "D"
      
      const sentMsg = { direction: "send" as const, msgType, msgTypeName: getMsgTypeName(msgType), seqNum: fixMsgSeqNum, clOrdId, ordStatus: "", ordStatusName: "-", rawMessage: generateFixMessage(), timestamp }
      
      if (msgType === "D") {
        // Simulate order flow responses
        const newAck = { direction: "recv" as const, msgType: "8", msgTypeName: "8 - Exec Report", seqNum: fixMsgSeqNum + 1, clOrdId, ordStatus: "0", ordStatusName: "New", rawMessage: `8=FIX.4.2|9=215|35=8|49=${target}|56=${sender}|34=${fixMsgSeqNum + 1}|52=${timestamp.replace(/[-: ]/g, "")}|37=OrderID${fixMsgSeqNum}|11=${clOrdId}|17=ExecID${fixMsgSeqNum}|150=0|39=0|55=${symbol}|54=1|38=${qty}|44=${price}|14=0|151=${qty}|6=0|10=XXX|`, timestamp }
        const partialFill = { direction: "recv" as const, msgType: "8", msgTypeName: "8 - Exec Report", seqNum: fixMsgSeqNum + 2, clOrdId, ordStatus: "1", ordStatusName: "Partially filled", rawMessage: `8=FIX.4.2|9=224|35=8|49=${target}|56=${sender}|34=${fixMsgSeqNum + 2}|52=${timestamp.replace(/[-: ]/g, "")}|37=OrderID${fixMsgSeqNum}|11=${clOrdId}|17=ExecID${fixMsgSeqNum + 1}|150=1|39=1|55=${symbol}|54=1|38=${qty}|44=${price}|32=50|31=${price}|14=50|151=50|6=${price}|10=XXX|`, timestamp }
        const fill = { direction: "recv" as const, msgType: "8", msgTypeName: "8 - Exec Report", seqNum: fixMsgSeqNum + 3, clOrdId, ordStatus: "2", ordStatusName: "Filled", rawMessage: `8=FIX.4.2|9=225|35=8|49=${target}|56=${sender}|34=${fixMsgSeqNum + 3}|52=${timestamp.replace(/[-: ]/g, "")}|37=OrderID${fixMsgSeqNum}|11=${clOrdId}|17=ExecID${fixMsgSeqNum + 2}|150=2|39=2|55=${symbol}|54=1|38=${qty}|44=${price}|32=50|31=${price}|14=${qty}|151=0|6=${price}|10=XXX|`, timestamp }
        setFixMsgLog(prev => [...prev, sentMsg, newAck, partialFill, fill])
        setFixMsgSeqNum(prev => prev + 4)
} else {
  setFixMsgLog(prev => [...prev, sentMsg])
  setFixMsgSeqNum(prev => prev + 1)
  }
  setFixMsgSent(true)
  setTimeout(() => setFixMsgSent(false), 2000)
  }
    
    const getRowBgColor = (msg: typeof fixMsgLog[0]) => {
      if (msg.direction === "send") return "bg-cyan-600 text-white"
      if (msg.ordStatus === "2") return "bg-red-600 text-white"
      if (msg.ordStatus === "1") return "bg-yellow-500 text-black"
      if (msg.ordStatus === "0") return "bg-green-600 text-white"
      if (msg.msgType === "A") return "bg-orange-500 text-black"
      return "bg-gray-600 text-white"
    }
    
    return (
      <div className={`min-h-screen ${bgPrimary} flex`}>
        {selectedRole && <Sidebar />}
        <div className="flex-1 overflow-auto flex flex-col">
          <header className={`${bgSecondary} border-b ${borderColor} px-6 py-4`}>
            <div className="flex items-center justify-between">
              <div>
                <button onClick={() => setCurrentScreen(selectedRole ? "dashboard" : "home")} className={`flex items-center gap-2 mb-2 ${textSecondary} hover:text-[#00e5ff]`}>
                  <ArrowLeft className="h-4 w-4" /> {selectedRole ? "Back to Dashboard" : "Back to Home"}
                </button>
                <h1 className={`text-2xl font-bold ${textPrimary}`}>FIX Message Creator</h1>
                <p className={`${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>Create, edit, and send FIX protocol messages</p>
              </div>
              {!selectedRole && (
                <div className="flex items-center gap-3">
                  <span className={`text-sm ${textSecondary}`}>Want full access?</span>
                  <Button onClick={() => setCurrentScreen("role-select")} className="bg-[#00e5ff] text-[#0a1628] hover:bg-[#00e5ff]/80 font-semibold">
                    Login / Register
                  </Button>
                </div>
              )}
            </div>
          </header>

          <div className="p-6 flex-1 flex flex-col">
            <div className="grid grid-cols-3 gap-6 flex-1">
              {/* Left Panel - Message Builder */}
              <div className="col-span-2 space-y-6">
                {/* Spec & Message Type Selection */}
                <Card className={`${bgCard} p-6 border ${borderColor}`}>
                  <h3 className={`text-lg font-bold mb-4 ${textPrimary}`}>Message Configuration</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${textPrimary}`}>Select FIX Specification</label>
                      <select 
                        value={fixMsgSelectedSpec}
                        onChange={(e) => handleSpecChange(e.target.value)}
                        className={`w-full p-2 rounded border ${isDarkMode ? "bg-[#1e3a5f] border-[#3d5a80] text-white" : "bg-white border-gray-300 text-gray-900"}`}
                      >
<option value="">Choose a standardized spec...</option>
  <option value="eq-42-std">Equities FIX 4.2 - Standardized</option>
  <option value="eq-44-std">Equities FIX 4.4 - Standardized</option>
  <option value="opt-44-std">Options FIX 4.4 - Standardized</option>
  <option value="fut-50-std">Futures FIX 5.0 SP2 - Standardized</option>
                      </select>
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${textPrimary}`}>Message Type</label>
                      <select 
                        value={fixMsgSelectedType}
                        onChange={(e) => handleMsgTypeChange(e.target.value)}
                        disabled={!fixMsgSelectedSpec}
                        className={`w-full p-2 rounded border ${isDarkMode ? "bg-[#1e3a5f] border-[#3d5a80] text-white" : "bg-white border-gray-300 text-gray-900"} ${!fixMsgSelectedSpec ? "opacity-50 cursor-not-allowed" : ""}`}
                      >
                        <option value="">Choose message type...</option>
                        {messageTypes.map(mt => (
                          <option key={mt.value} value={mt.value}>{mt.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </Card>
                
                {/* Message Fields Editor */}
                <Card className={`${bgCard} p-6 border ${borderColor}`}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className={`text-lg font-bold ${textPrimary}`}>Message Fields</h3>
                    <Button size="sm" className="bg-[#00e5ff] text-[#0a1628] hover:bg-[#00e5ff]/80 font-medium" disabled={!fixMsgSelectedType}>
                      <Plus className="h-4 w-4 mr-1" /> Add Field
                    </Button>
                  </div>
                  {fixMsgFields.length === 0 ? (
                    <div className={`text-center py-10 ${textSecondary}`}>
                      <MessageSquare className="h-12 w-12 mx-auto mb-3 opacity-50" />
                      <p>Select a FIX Specification and Message Type to populate fields</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className={`${isDarkMode ? "bg-[#1e3a5f]" : "bg-gray-100"}`}>
                          <tr>
                            <th className={`px-3 py-2 text-left text-sm font-medium ${textPrimary}`}>Tag</th>
                            <th className={`px-3 py-2 text-left text-sm font-medium ${textPrimary}`}>Name</th>
                            <th className={`px-3 py-2 text-left text-sm font-medium ${textPrimary}`}>Value</th>
                            <th className={`px-3 py-2 text-center text-sm font-medium ${textPrimary}`}>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {fixMsgFields.map((field, idx) => (
                            <tr key={idx} className={`border-t ${isDarkMode ? "border-[#3d5a80]" : "border-gray-200"}`}>
                              <td className={`px-3 py-2 font-mono text-sm ${isDarkMode ? "text-cyan-400" : "text-blue-600"}`}>{field.tag}</td>
                              <td className={`px-3 py-2 text-sm ${textPrimary}`}>{field.name}</td>
                              <td className="px-3 py-2">
                                <Input 
                                  value={field.value}
                                  onChange={(e) => {
                                    const newFields = [...fixMsgFields]
                                    newFields[idx].value = e.target.value
                                    setFixMsgFields(newFields)
                                  }}
                                  disabled={!field.editable}
                                  className={`h-8 text-sm font-mono ${isDarkMode ? "bg-[#1e3a5f] border-[#3d5a80] text-white" : "bg-white"} ${!field.editable ? "opacity-50" : ""}`}
                                />
                              </td>
                              <td className="px-3 py-2 text-center">
                                <button className={`p-1 rounded ${isDarkMode ? "hover:bg-[#1e3a5f] text-gray-400" : "hover:bg-gray-100 text-gray-500"}`}>
                                  <X className="h-4 w-4" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </Card>
                
                {/* Generated Message Preview */}
                <Card className={`${bgCard} p-6 border ${borderColor}`}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className={`text-lg font-bold ${textPrimary}`}>Generated Message</h3>
<Button size="sm" onClick={copyToClipboard} className={`font-medium ${fixMsgCopied ? "bg-green-500 text-white" : "bg-[#00e5ff] text-[#0a1628] hover:bg-[#00e5ff]/80"}`} disabled={!fixMsgFields.length}>
  {fixMsgCopied ? <><CheckCircle className="h-4 w-4 mr-1" /> Copied!</> : <><Copy className="h-4 w-4 mr-1" /> Copy</>}
  </Button>
                  </div>
                  <div className={`p-4 rounded-lg ${isDarkMode ? "bg-[#1e3a5f] text-cyan-300" : "bg-gray-100 text-gray-800"} font-mono text-sm break-all min-h-[60px]`}>
                    {fixMsgFields.length === 0 ? <span className={textSecondary}>No message generated yet</span> : generateFixMessage()}
                  </div>
                </Card>
              </div>
              
              {/* Right Panel - Connection */}
              <div className="space-y-6">
                {/* Connection Panel */}
                <Card className={`${bgCard} p-6 border ${borderColor}`}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className={`text-lg font-bold ${textPrimary}`}>FIX Connection</h3>
                    <div className={`flex items-center gap-2 px-2 py-1 rounded ${fixMsgIsConnected ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
                      {fixMsgIsConnected ? <Wifi className="h-4 w-4" /> : <WifiOff className="h-4 w-4" />}
                      <span className="text-xs font-medium">{fixMsgIsConnected ? "Connected" : "Disconnected"}</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${textPrimary}`}>Host / IP</label>
                      <Input value={fixMsgConnectionConfig.host} onChange={(e) => setFixMsgConnectionConfig({...fixMsgConnectionConfig, host: e.target.value})} placeholder="e.g., 192.168.1.100" className={`${isDarkMode ? "bg-[#1e3a5f] border-[#3d5a80] text-white placeholder:text-gray-400" : ""}`} />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${textPrimary}`}>Port</label>
                      <Input value={fixMsgConnectionConfig.port} onChange={(e) => setFixMsgConnectionConfig({...fixMsgConnectionConfig, port: e.target.value})} placeholder="e.g., 9876" className={`${isDarkMode ? "bg-[#1e3a5f] border-[#3d5a80] text-white placeholder:text-gray-400" : ""}`} />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${textPrimary}`}>SenderCompID (49)</label>
                      <Input value={fixMsgConnectionConfig.senderCompId} onChange={(e) => setFixMsgConnectionConfig({...fixMsgConnectionConfig, senderCompId: e.target.value})} placeholder="e.g., SENDER" className={`${isDarkMode ? "bg-[#1e3a5f] border-[#3d5a80] text-white placeholder:text-gray-400" : ""}`} />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${textPrimary}`}>TargetCompID (56)</label>
                      <Input value={fixMsgConnectionConfig.targetCompId} onChange={(e) => setFixMsgConnectionConfig({...fixMsgConnectionConfig, targetCompId: e.target.value})} placeholder="e.g., TARGET" className={`${isDarkMode ? "bg-[#1e3a5f] border-[#3d5a80] text-white placeholder:text-gray-400" : ""}`} />
                    </div>
                    <Button className={`w-full font-semibold ${fixMsgIsConnected ? "bg-red-500 hover:bg-red-600 text-white" : "bg-[#00e5ff] hover:bg-[#00e5ff]/80 text-[#0a1628]"}`} onClick={handleConnect}>
                      {fixMsgIsConnected ? "Disconnect" : "Connect"}
                    </Button>
                  </div>
                </Card>
                
                {/* Send Message Panel */}
                <Card className={`${bgCard} p-6 border ${borderColor}`}>
                  <h3 className={`text-lg font-bold mb-4 ${textPrimary}`}>Send Message</h3>
                  <div className="space-y-4">
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${textPrimary}`}>Paste Message (optional)</label>
                      <textarea placeholder="Paste a FIX message here..." className={`w-full p-3 rounded-lg border resize-none font-mono text-sm ${isDarkMode ? "bg-[#1e3a5f] border-[#3d5a80] text-white placeholder:text-gray-400" : "bg-white border-gray-300"}`} rows={4} />
                    </div>
<Button className={`w-full font-semibold ${fixMsgSent ? "bg-green-500 text-white" : "bg-[#00e5ff] text-[#0a1628] hover:bg-[#00e5ff]/80"}`} disabled={!fixMsgIsConnected || !fixMsgFields.length} onClick={handleSendMessage}>
  {fixMsgSent ? <><CheckCircle className="h-4 w-4 mr-2" /> Message Sent!</> : <><Send className="h-4 w-4 mr-2" /> Send Message</>}
  </Button>
                    {!fixMsgIsConnected && <p className={`text-xs text-center ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>Connect to a FIX session to send messages</p>}
                  </div>
                </Card>
              </div>
            </div>
            
            {/* Message Log */}
            {fixMsgLogExpanded ? (
              <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
                <Card className={`${bgCard} border ${borderColor} w-full h-full flex flex-col`}>
                  <div className={`px-6 py-3 border-b ${borderColor} flex items-center justify-between shrink-0`}>
                    <h3 className={`text-lg font-bold ${textPrimary}`}>Message Log</h3>
                    <div className="flex items-center gap-2">
                      <span className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>{fixMsgLog.length} messages</span>
                      <Button size="sm" onClick={() => setFixMsgLogExpanded(false)} className="bg-[#00e5ff] text-[#0a1628] hover:bg-[#00e5ff]/80 font-medium">Exit Fullscreen</Button>
                    </div>
                  </div>
                  <div className="flex-1 overflow-auto">
                    {fixMsgLog.length === 0 ? (
                      <div className={`flex items-center justify-center h-full ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                        <p className="text-sm">No messages yet. Connect and send a message to see the log.</p>
                      </div>
                    ) : (
                      <div className="overflow-x-auto overflow-y-auto h-full">
                        <table className="text-sm min-w-max w-full">
                          <thead className={`sticky top-0 ${isDarkMode ? "bg-[#1e3a5f]" : "bg-gray-100"}`}>
                            <tr>
                              <th className={`px-3 py-2 text-left font-medium ${textPrimary}`}>Direction</th>
                              <th className={`px-3 py-2 text-left font-medium ${textPrimary}`}>Message</th>
                              <th className={`px-3 py-2 text-left font-medium ${textPrimary}`}>34-MsgSeqNum</th>
                              <th className={`px-3 py-2 text-left font-medium ${textPrimary}`}>11-ClOrdID</th>
                              <th className={`px-3 py-2 text-left font-medium ${textPrimary}`}>39-OrdStatus</th>
                              <th className={`px-3 py-2 text-left font-medium ${textPrimary}`}>Messages</th>
                            </tr>
                          </thead>
                          <tbody>
                            {fixMsgLog.map((msg, idx) => (
                              <tr key={idx} className={`${getRowBgColor(msg)} cursor-pointer hover:opacity-80`} onDoubleClick={() => setFixMsgSelectedRow(idx)}>
                                <td className="px-3 py-1.5 font-mono whitespace-nowrap">{msg.direction === "send" ? "<-Send" : "Recv->"}</td>
                                <td className="px-3 py-1.5 font-mono whitespace-nowrap">{msg.msgTypeName}</td>
                                <td className="px-3 py-1.5 font-mono whitespace-nowrap">{msg.seqNum}</td>
                                <td className="px-3 py-1.5 font-mono whitespace-nowrap">{msg.clOrdId || "-"}</td>
                                <td className="px-3 py-1.5 font-mono whitespace-nowrap">{msg.ordStatusName}</td>
                                <td className="px-3 py-1.5 font-mono text-xs whitespace-nowrap">{msg.rawMessage}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </Card>
              </div>
            ) : (
              <Card className={`${bgCard} mt-6 border ${borderColor}`}>
                <div className={`px-6 py-3 border-b ${borderColor} flex items-center justify-between shrink-0`}>
                  <h3 className={`text-lg font-bold ${textPrimary}`}>Message Log</h3>
                  <div className="flex items-center gap-2">
                    <span className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>{fixMsgLog.length} messages</span>
                    <Button size="sm" onClick={() => setFixMsgLogExpanded(true)} className="bg-[#00e5ff] text-[#0a1628] hover:bg-[#00e5ff]/80 font-medium">Fullscreen</Button>
                  </div>
                </div>
                <div className="overflow-x-auto overflow-y-auto h-48">
                  {fixMsgLog.length === 0 ? (
                    <div className={`flex items-center justify-center h-full ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                      <p className="text-sm">No messages yet. Connect and send a message to see the log.</p>
                    </div>
                  ) : (
                    <table className="text-sm min-w-max w-full">
                      <thead className={`sticky top-0 ${isDarkMode ? "bg-[#1e3a5f]" : "bg-gray-100"}`}>
                        <tr>
                          <th className={`px-3 py-2 text-left font-medium ${textPrimary}`}>Direction</th>
                          <th className={`px-3 py-2 text-left font-medium ${textPrimary}`}>Message</th>
                          <th className={`px-3 py-2 text-left font-medium ${textPrimary}`}>34-MsgSeqNum</th>
                          <th className={`px-3 py-2 text-left font-medium ${textPrimary}`}>11-ClOrdID</th>
                          <th className={`px-3 py-2 text-left font-medium ${textPrimary}`}>39-OrdStatus</th>
                          <th className={`px-3 py-2 text-left font-medium ${textPrimary}`}>Messages</th>
                        </tr>
                      </thead>
                      <tbody>
                        {fixMsgLog.map((msg, idx) => (
                          <tr key={idx} className={`${getRowBgColor(msg)} cursor-pointer hover:opacity-80`} onDoubleClick={() => setFixMsgSelectedRow(idx)}>
                            <td className="px-3 py-1.5 font-mono whitespace-nowrap">{msg.direction === "send" ? "<-Send" : "Recv->"}</td>
                            <td className="px-3 py-1.5 font-mono whitespace-nowrap">{msg.msgTypeName}</td>
                            <td className="px-3 py-1.5 font-mono whitespace-nowrap">{msg.seqNum}</td>
                            <td className="px-3 py-1.5 font-mono whitespace-nowrap">{msg.clOrdId || "-"}</td>
                            <td className="px-3 py-1.5 font-mono whitespace-nowrap">{msg.ordStatusName}</td>
                            <td className="px-3 py-1.5 font-mono text-xs whitespace-nowrap">{msg.rawMessage}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </Card>
            )}
            
            {/* Message Detail Panel */}
            {fixMsgSelectedRow !== null && fixMsgLog[fixMsgSelectedRow] && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60]">
                <Card className={`${bgCard} border ${borderColor} w-full max-w-2xl max-h-[80vh] flex flex-col`}>
                  <div className={`px-6 py-4 border-b ${borderColor} flex items-center justify-between shrink-0`}>
                    <div>
                      <h3 className={`text-lg font-bold ${textPrimary}`}>Message Details</h3>
                      <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>{fixMsgLog[fixMsgSelectedRow].direction === "send" ? "Sent" : "Received"} - {fixMsgLog[fixMsgSelectedRow].msgTypeName}</p>
                    </div>
                    <Button size="sm" variant="outline" onClick={() => setFixMsgSelectedRow(null)} className={isDarkMode ? "border-[#3d5a80] text-white hover:bg-[#1e3a5f]" : ""}><X className="h-4 w-4" /></Button>
                  </div>
                  <div className="flex-1 overflow-auto p-4">
                    <table className="w-full text-sm">
                      <thead className={`sticky top-0 ${isDarkMode ? "bg-[#1e3a5f]" : "bg-gray-100"}`}>
                        <tr>
                          <th className={`px-3 py-2 text-left font-medium ${textPrimary} w-20`}>Tag</th>
                          <th className={`px-3 py-2 text-left font-medium ${textPrimary} w-40`}>Name</th>
                          <th className={`px-3 py-2 text-left font-medium ${textPrimary}`}>Value</th>
                        </tr>
                      </thead>
                      <tbody>
                        {fixMsgLog[fixMsgSelectedRow].rawMessage.split("|").filter(Boolean).map((field, i) => {
                          const [tag, value] = field.split("=")
                          const tagNames: Record<string, string> = { "8": "BeginString", "9": "BodyLength", "35": "MsgType", "49": "SenderCompID", "56": "TargetCompID", "34": "MsgSeqNum", "52": "SendingTime", "11": "ClOrdID", "21": "HandlInst", "55": "Symbol", "54": "Side", "60": "TransactTime", "38": "OrderQty", "40": "OrdType", "44": "Price", "10": "CheckSum", "37": "OrderID", "17": "ExecID", "150": "ExecType", "39": "OrdStatus", "14": "CumQty", "151": "LeavesQty", "6": "AvgPx", "32": "LastShares", "31": "LastPx", "98": "EncryptMethod", "108": "HeartBtInt" }
                          return (
                            <tr key={i} className={`border-t ${isDarkMode ? "border-[#3d5a80]" : "border-gray-200"}`}>
                              <td className={`px-3 py-2 font-mono ${isDarkMode ? "text-cyan-400" : "text-blue-600"}`}>{tag}</td>
                              <td className={`px-3 py-2 ${textPrimary}`}>{tagNames[tag] || `Tag${tag}`}</td>
                              <td className={`px-3 py-2 font-mono ${textPrimary}`}>{value}</td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                  <div className={`px-6 py-3 border-t ${borderColor} shrink-0`}>
                    <p className={`text-xs font-mono ${isDarkMode ? "text-gray-400" : "text-gray-500"} break-all`}>{fixMsgLog[fixMsgSelectedRow].rawMessage}</p>
                  </div>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
  
  // Session Configuration Screen
  if (currentScreen === "session-config") {
    const assetVersions = [
      { asset: "Equities", protocol: "FIX 4.2" },
      { asset: "Equities", protocol: "FIX 4.4" },
      { asset: "Options", protocol: "FIX 4.4" },
      { asset: "Futures", protocol: "FIX 4.2" },
      { asset: "Futures", protocol: "FIX 5.0 SP2" },
    ]
    
    return (
      <div className={`min-h-screen ${bgPrimary} flex`}>
        <Sidebar />
        <div className="flex-1 overflow-auto">
          <header className={`${bgSecondary} border-b ${borderColor} px-6 py-4`}>
            <button onClick={() => selectedClient ? setCurrentScreen("client-detail") : setCurrentScreen("dashboard")} className={`flex items-center gap-2 mb-2 ${textSecondary} hover:text-[#00e5ff]`}>
              <ArrowLeft className="h-4 w-4" /> Back
            </button>
            <div className="flex items-center gap-3">
              <Server className="h-8 w-8 text-[#00e5ff]" />
              <div>
                <h1 className={`text-2xl font-bold ${textPrimary}`}>FIX Session Configuration</h1>
                <p className={`text-sm ${textSecondary}`}>{selectedClient ? `Configure connectivity for ${selectedClient.name}` : "Configure FIX session parameters"}</p>
              </div>
            </div>
          </header>

          <div className="p-6">
            {/* Environment Selector */}
            <Card className={`${bgCard} border ${borderColor} mb-6 p-4`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className={`font-medium ${textPrimary}`}>Environment:</span>
                  <div className={`flex gap-1 p-1 rounded-lg ${isDarkMode ? "bg-[#0a1628]" : "bg-gray-100"}`}>
                    {["UAT", "Staging", "Production"].map(env => (
                      <button 
                        key={env}
                        className={`px-4 py-1.5 rounded text-sm font-medium transition-colors ${env === "UAT" ? "bg-[#00e5ff] text-[#0a1628]" : textSecondary}`}
                      >
                        {env}
                      </button>
                    ))}
                  </div>
                </div>
                <Button size="sm" className="bg-[#4caf50] hover:bg-[#4caf50]/80">
                  <Plus className="h-4 w-4 mr-2" /> Add Session
                </Button>
              </div>
            </Card>

            {/* Session Configurations */}
            <div className="space-y-4">
              {assetVersions.map((av, i) => {
                const key = `${av.asset}-${av.protocol}`
                const config = sessionConfigs[key]
                const isConfigured = !!config
                
                return (
                  <Card key={i} className={`${bgCard} border ${borderColor}`}>
                    <div className={`px-6 py-4 border-b ${borderColor} flex items-center justify-between`}>
                      <div className="flex items-center gap-4">
                        <span className={`font-bold ${textPrimary}`}>{av.asset} - {av.protocol}</span>
                        {isConfigured ? (
                          <span className="flex items-center gap-2 px-3 py-1 rounded-full text-xs bg-[#4caf50]/20 text-[#4caf50]">
                            <Wifi className="h-3 w-3" /> Connected
                          </span>
                        ) : (
                          <span className="flex items-center gap-2 px-3 py-1 rounded-full text-xs bg-[#ff9800]/20 text-[#ff9800]">
                            <WifiOff className="h-3 w-3" /> Not Configured
                          </span>
                        )}
                      </div>
                      {isConfigured && config.lastTested && (
                        <span className={`text-xs ${textSecondary}`}>Last tested: {config.lastTested}</span>
                      )}
                    </div>
                    
                    <div className="p-6">
                      <div className="grid grid-cols-4 gap-4 mb-4">
                        <div>
                          <label className={`block text-xs font-medium mb-1 ${textSecondary}`}>Host</label>
                          <Input 
                            placeholder="fix.exchange.com"
                            defaultValue={config?.host || ""}
                            className={`${isDarkMode ? "bg-[#0a1628] border-[#1e4976]" : ""}`}
                          />
                        </div>
                        <div>
                          <label className={`block text-xs font-medium mb-1 ${textSecondary}`}>Port</label>
                          <Input 
                            placeholder="9876"
                            defaultValue={config?.port || ""}
                            className={`${isDarkMode ? "bg-[#0a1628] border-[#1e4976]" : ""}`}
                          />
                        </div>
                        <div>
                          <label className={`block text-xs font-medium mb-1 ${textSecondary}`}>SenderCompID</label>
                          <Input 
                            placeholder="CLIENT_ID"
                            defaultValue={config?.senderCompId || ""}
                            className={`${isDarkMode ? "bg-[#0a1628] border-[#1e4976]" : ""}`}
                          />
                        </div>
                        <div>
                          <label className={`block text-xs font-medium mb-1 ${textSecondary}`}>TargetCompID</label>
                          <Input 
                            placeholder="BROADRIDGE"
                            defaultValue={config?.targetCompId || ""}
                            className={`${isDarkMode ? "bg-[#0a1628] border-[#1e4976]" : ""}`}
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-4 gap-4 mb-4">
                        <div>
                          <label className={`block text-xs font-medium mb-1 ${textSecondary}`}>Heartbeat Interval (sec)</label>
                          <Input 
                            type="number"
                            placeholder="30"
                            defaultValue={config?.heartbeat || 30}
                            className={`${isDarkMode ? "bg-[#0a1628] border-[#1e4976]" : ""}`}
                          />
                        </div>
                        <div className="flex items-end gap-4">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" defaultChecked={config?.ssl || false} className="h-4 w-4" />
                            <span className={`text-sm ${textPrimary}`}>SSL/TLS Enabled</span>
                          </label>
                        </div>
                      </div>
                      
                      <div className="flex gap-3">
                        <Button 
                          size="sm"
                          onClick={() => {
                            setSessionConfigs(prev => ({
                              ...prev,
                              [key]: {
                                host: "fix.client.com",
                                port: "9876",
                                senderCompId: "CLIENT",
                                targetCompId: "BROADRIDGE",
                                protocol: av.protocol,
                                ssl: true,
                                heartbeat: 30,
                                connected: false,
                                lastTested: null
                              }
                            }))
                          }}
                        >
                          <Database className="h-4 w-4 mr-2" /> Save Configuration
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={async () => {
                            // Simulate connection test
                            await new Promise(r => setTimeout(r, 1500))
                            const now = new Date().toLocaleString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit", hour12: true })
                            setSessionConfigs(prev => ({
                              ...prev,
                              [key]: {
                                ...prev[key],
                                connected: true,
                                lastTested: now
                              }
                            }))
                          }}
                        >
                          <Wifi className="h-4 w-4 mr-2" /> Test Connection
                        </Button>
                        <Button size="sm" variant="outline">
                          <Play className="h-4 w-4 mr-2" /> Send Test Logon
                        </Button>
                      </div>
                    </div>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Field Mapping Rules Screen
  if (currentScreen === "field-mapping") {
    const sampleMappings = [
      { clientTag: "1", clientName: "Account", broaderTag: "1", broaderName: "Account", transform: null, status: "mapped" as const },
      { clientTag: "11", clientName: "ClOrdID", broaderTag: "11", broaderName: "ClOrdID", transform: null, status: "mapped" as const },
      { clientTag: "55", clientName: "Symbol", broaderTag: "55", broaderName: "Symbol", transform: null, status: "mapped" as const },
      { clientTag: "5001", clientName: "ClientRef", broaderTag: "20001", broaderName: "BroaderClientRef", transform: "PREFIX:BR_", status: "custom" as const },
      { clientTag: "5002", clientName: "DeskID", broaderTag: null, broaderName: null, transform: null, status: "unmapped" as const },
      { clientTag: "54", clientName: "Side", broaderTag: "54", broaderName: "Side", transform: "MAP:B->1,S->2", status: "custom" as const },
      { clientTag: "38", clientName: "OrderQty", broaderTag: "38", broaderName: "OrderQty", transform: null, status: "mapped" as const },
      { clientTag: "44", clientName: "Price", broaderTag: "44", broaderName: "Price", transform: "SCALE:100", status: "custom" as const },
    ]
    
    return (
      <div className={`min-h-screen ${bgPrimary} flex`}>
        <Sidebar />
        <div className="flex-1 overflow-auto">
          <header className={`${bgSecondary} border-b ${borderColor} px-6 py-4`}>
            <button onClick={() => selectedClient ? setCurrentScreen("client-detail") : setCurrentScreen("dashboard")} className={`flex items-center gap-2 mb-2 ${textSecondary} hover:text-[#00e5ff]`}>
              <ArrowLeft className="h-4 w-4" /> Back
            </button>
            <div className="flex items-center gap-3">
              <Link2 className="h-8 w-8 text-[#00e5ff]" />
              <div>
                <h1 className={`text-2xl font-bold ${textPrimary}`}>Field Mapping Rules</h1>
                <p className={`text-sm ${textSecondary}`}>{selectedClient ? `Define field mappings for ${selectedClient.name}` : "Configure field transformation rules"}</p>
              </div>
            </div>
          </header>

          <div className="p-6">
            {/* Asset/Version Selector */}
            <Card className={`${bgCard} border ${borderColor} mb-6 p-4`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className={`font-medium ${textPrimary}`}>Asset Class:</span>
                  <select className={`px-3 py-1.5 rounded border ${isDarkMode ? "bg-[#0a1628] border-[#1e4976] text-white" : "bg-white border-gray-300"}`}>
                    <option>Equities - FIX 4.2</option>
                    <option>Equities - FIX 4.4</option>
                    <option>Options - FIX 4.4</option>
                  </select>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Upload className="h-4 w-4 mr-2" /> Import Mappings
                  </Button>
                  <Button size="sm" variant="outline">
                    <Download className="h-4 w-4 mr-2" /> Export Mappings
                  </Button>
                  <Button size="sm" className="bg-[#4caf50] hover:bg-[#4caf50]/80">
                    <Plus className="h-4 w-4 mr-2" /> Add Rule
                  </Button>
                </div>
              </div>
            </Card>

            {/* Mapping Stats */}
            <div className="grid grid-cols-4 gap-4 mb-6">
              <Card className={`${bgCard} border ${borderColor} p-4`}>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-[#4caf50]/20">
                    <CheckCircle className="h-5 w-5 text-[#4caf50]" />
                  </div>
                  <div>
                    <p className={`text-2xl font-bold ${textPrimary}`}>5</p>
                    <p className={`text-xs ${textSecondary}`}>Mapped Fields</p>
                  </div>
                </div>
              </Card>
              <Card className={`${bgCard} border ${borderColor} p-4`}>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-[#00e5ff]/20">
                    <Wrench className="h-5 w-5 text-[#00e5ff]" />
                  </div>
                  <div>
                    <p className={`text-2xl font-bold ${textPrimary}`}>3</p>
                    <p className={`text-xs ${textSecondary}`}>Custom Transforms</p>
                  </div>
                </div>
              </Card>
              <Card className={`${bgCard} border ${borderColor} p-4`}>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-[#ff9800]/20">
                    <AlertTriangle className="h-5 w-5 text-[#ff9800]" />
                  </div>
                  <div>
                    <p className={`text-2xl font-bold ${textPrimary}`}>1</p>
                    <p className={`text-xs ${textSecondary}`}>Unmapped Fields</p>
                  </div>
                </div>
              </Card>
              <Card className={`${bgCard} border ${borderColor} p-4`}>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-[#2196f3]/20">
                    <FileText className="h-5 w-5 text-[#2196f3]" />
                  </div>
                  <div>
                    <p className={`text-2xl font-bold ${textPrimary}`}>8</p>
                    <p className={`text-xs ${textSecondary}`}>Total Rules</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Mapping Table */}
            <Card className={`${bgCard} border ${borderColor}`}>
              <div className={`px-6 py-4 border-b ${borderColor}`}>
                <h3 className={`font-bold ${textPrimary}`}>Field Mapping Rules</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className={`border-b ${borderColor} ${isDarkMode ? "bg-[#1e4976]/20" : "bg-gray-50"}`}>
                      <th className={`px-4 py-3 text-left font-semibold ${textPrimary}`}>Client Tag</th>
                      <th className={`px-4 py-3 text-left font-semibold ${textPrimary}`}>Client Name</th>
                      <th className={`px-4 py-3 text-center font-semibold ${textPrimary}`}></th>
                      <th className={`px-4 py-3 text-left font-semibold ${textPrimary}`}>Broadridge Tag</th>
                      <th className={`px-4 py-3 text-left font-semibold ${textPrimary}`}>Broadridge Name</th>
                      <th className={`px-4 py-3 text-left font-semibold ${textPrimary}`}>Transform</th>
                      <th className={`px-4 py-3 text-left font-semibold ${textPrimary}`}>Status</th>
                      <th className={`px-4 py-3 text-left font-semibold ${textPrimary}`}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sampleMappings.map((m, i) => (
                      <tr key={i} className={`border-b ${borderColor} hover:bg-[#1e4976]/10`}>
                        <td className={`px-4 py-3 font-mono ${textPrimary}`}>{m.clientTag}</td>
                        <td className={`px-4 py-3 ${textPrimary}`}>{m.clientName}</td>
                        <td className="px-4 py-3 text-center">
                          {m.status === "mapped" || m.status === "custom" ? (
                            <ArrowRight className="h-4 w-4 text-[#4caf50] mx-auto" />
                          ) : (
                            <Unlink className="h-4 w-4 text-[#ff9800] mx-auto" />
                          )}
                        </td>
                        <td className={`px-4 py-3 font-mono ${m.broaderTag ? textPrimary : textSecondary}`}>{m.broaderTag || "-"}</td>
                        <td className={`px-4 py-3 ${m.broaderName ? textPrimary : textSecondary}`}>{m.broaderName || "-"}</td>
                        <td className={`px-4 py-3`}>
                          {m.transform ? (
                            <code className={`text-xs px-2 py-1 rounded ${isDarkMode ? "bg-[#1e4976]/50 text-[#00e5ff]" : "bg-blue-100 text-blue-700"}`}>{m.transform}</code>
                          ) : (
                            <span className={textSecondary}>-</span>
                          )}
                        </td>
                        <td className={`px-4 py-3`}>
                          <span className={`px-2 py-1 rounded text-xs ${
                            m.status === "mapped" ? "bg-[#4caf50]/20 text-[#4caf50]" :
                            m.status === "custom" ? "bg-[#00e5ff]/20 text-[#00e5ff]" :
                            "bg-[#ff9800]/20 text-[#ff9800]"
                          }`}>
                            {m.status === "mapped" ? "Mapped" : m.status === "custom" ? "Custom" : "Unmapped"}
                          </span>
                        </td>
                        <td className={`px-4 py-3`}>
                          <div className="flex gap-1">
                            <Button size="sm" variant="outline" className="h-7 w-7 p-0">
                              <Eye className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="outline" className="h-7 w-7 p-0">
                              <Wrench className="h-3 w-3" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  // Test Execution Results Dashboard
  if (currentScreen === "test-results") {
    return (
      <div className={`min-h-screen ${bgPrimary} flex`}>
        <Sidebar />
        <div className="flex-1 overflow-auto">
          <header className={`${bgSecondary} border-b ${borderColor} px-6 py-4`}>
            <button onClick={() => selectedClient ? setCurrentScreen("client-detail") : setCurrentScreen("dashboard")} className={`flex items-center gap-2 mb-2 ${textSecondary} hover:text-[#00e5ff]`}>
              <ArrowLeft className="h-4 w-4" /> Back
            </button>
            <div className="flex items-center gap-3">
              <BarChart3 className="h-8 w-8 text-[#00e5ff]" />
              <div>
                <h1 className={`text-2xl font-bold ${textPrimary}`}>Test Execution Results</h1>
                <p className={`text-sm ${textSecondary}`}>{selectedClient ? `Test history for ${selectedClient.name}` : "View all test execution results"}</p>
              </div>
            </div>
          </header>

          <div className="p-6">
            {/* Summary Stats */}
            <div className="grid grid-cols-5 gap-4 mb-6">
              <Card className={`${bgCard} border ${borderColor} p-4`}>
                <p className={`text-3xl font-bold text-[#00e5ff]`}>12</p>
                <p className={`text-xs ${textSecondary}`}>Total Runs</p>
              </Card>
              <Card className={`${bgCard} border ${borderColor} p-4`}>
                <p className={`text-3xl font-bold text-[#4caf50]`}>9</p>
                <p className={`text-xs ${textSecondary}`}>Passed</p>
              </Card>
              <Card className={`${bgCard} border ${borderColor} p-4`}>
                <p className={`text-3xl font-bold text-[#f44336]`}>2</p>
                <p className={`text-xs ${textSecondary}`}>Failed</p>
              </Card>
              <Card className={`${bgCard} border ${borderColor} p-4`}>
                <p className={`text-3xl font-bold text-[#ff9800]`}>1</p>
                <p className={`text-xs ${textSecondary}`}>Running</p>
              </Card>
              <Card className={`${bgCard} border ${borderColor} p-4`}>
                <p className={`text-3xl font-bold ${textPrimary}`}>91%</p>
                <p className={`text-xs ${textSecondary}`}>Pass Rate</p>
              </Card>
            </div>

            {/* Test Run History */}
            <Card className={`${bgCard} border ${borderColor}`}>
              <div className={`px-6 py-4 border-b ${borderColor} flex items-center justify-between`}>
                <h3 className={`font-bold ${textPrimary}`}>Test Run History</h3>
                <div className="flex gap-2">
                  <select className={`px-3 py-1.5 rounded border text-sm ${isDarkMode ? "bg-[#0a1628] border-[#1e4976] text-white" : "bg-white border-gray-300"}`}>
                    <option>All Suites</option>
                    <option>Regression Tests</option>
                    <option>Certification Tests</option>
                  </select>
                  <select className={`px-3 py-1.5 rounded border text-sm ${isDarkMode ? "bg-[#0a1628] border-[#1e4976] text-white" : "bg-white border-gray-300"}`}>
                    <option>All Status</option>
                    <option>Passed</option>
                    <option>Failed</option>
                    <option>Running</option>
                  </select>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className={`border-b ${borderColor} ${isDarkMode ? "bg-[#1e4976]/20" : "bg-gray-50"}`}>
                      <th className={`px-4 py-3 text-left font-semibold ${textPrimary}`}>Run ID</th>
                      <th className={`px-4 py-3 text-left font-semibold ${textPrimary}`}>Suite</th>
                      <th className={`px-4 py-3 text-left font-semibold ${textPrimary}`}>Asset / Protocol</th>
                      <th className={`px-4 py-3 text-left font-semibold ${textPrimary}`}>Run Date</th>
                      <th className={`px-4 py-3 text-left font-semibold ${textPrimary}`}>Status</th>
                      <th className={`px-4 py-3 text-left font-semibold ${textPrimary}`}>Results</th>
                      <th className={`px-4 py-3 text-left font-semibold ${textPrimary}`}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {testRunHistory.map((run) => (
                      <tr key={run.id} className={`border-b ${borderColor} hover:bg-[#1e4976]/10`}>
                        <td className={`px-4 py-3 font-mono ${textPrimary}`}>{run.id}</td>
                        <td className={`px-4 py-3 ${textPrimary}`}>{run.suite}</td>
                        <td className={`px-4 py-3 ${textSecondary}`}>{run.asset} / {run.protocol}</td>
                        <td className={`px-4 py-3 ${textSecondary}`}>{run.runDate}</td>
                        <td className={`px-4 py-3`}>
                          <span className={`px-2 py-1 rounded text-xs flex items-center gap-1 w-fit ${
                            run.status === "passed" ? "bg-[#4caf50]/20 text-[#4caf50]" :
                            run.status === "failed" ? "bg-[#f44336]/20 text-[#f44336]" :
                            "bg-[#ff9800]/20 text-[#ff9800]"
                          }`}>
                            {run.status === "running" && <div className="animate-spin h-3 w-3 border border-current border-t-transparent rounded-full" />}
                            {run.status.charAt(0).toUpperCase() + run.status.slice(1)}
                          </span>
                        </td>
                        <td className={`px-4 py-3`}>
                          <div className="flex items-center gap-2">
                            <span className="text-[#4caf50]">{run.passed}</span>
                            <span className={textSecondary}>/</span>
                            <span className="text-[#f44336]">{run.failed}</span>
                            <span className={textSecondary}>/</span>
                            <span className={textSecondary}>{run.total}</span>
                            {/* Progress bar */}
                            <div className={`w-16 h-2 rounded-full ${isDarkMode ? "bg-[#1e4976]/50" : "bg-gray-200"} overflow-hidden`}>
                              <div 
                                className="h-full bg-[#4caf50]" 
                                style={{ width: `${(run.passed / run.total) * 100}%` }}
                              />
                            </div>
                          </div>
                        </td>
                        <td className={`px-4 py-3`}>
                          <div className="flex gap-1">
                            <Button size="sm" variant="outline" className="h-7">
                              <Eye className="h-3 w-3 mr-1" /> Details
                            </Button>
                            {run.status === "failed" && (
                              <Button size="sm" variant="outline" className="h-7 text-[#ff9800] border-[#ff9800]/30">
                                <RefreshCw className="h-3 w-3 mr-1" /> Re-run
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  // Go-Live Checklist Screen
  if (currentScreen === "go-live") {
    const checklistItems = [
      { key: "spec-approved", label: "Spec Comparison Approved", description: "All spec discrepancies resolved or approved", stage: 2, icon: GitCompare },
      { key: "connectivity-verified", label: "Connectivity Verified", description: "FIX sessions established and tested in all environments", stage: 3, icon: Server },
      { key: "regression-passed", label: "Regression Tests Passed", description: "100% pass rate on all regression test suites", stage: 5, icon: TestTube },
      { key: "certification-passed", label: "Certification Completed", description: "All certification test cases passed", stage: 6, icon: Award },
      { key: "client-signoff", label: "Client Sign-off", description: "Client has reviewed and approved all test results", stage: 6, icon: CheckSquare },
      { key: "broadridge-signoff", label: "Broadridge Sign-off", description: "Internal review and approval completed", stage: 6, icon: Shield },
      { key: "production-config", label: "Production Configuration", description: "Production FIX sessions configured and verified", stage: 7, icon: Rocket },
    ]
    
    const completedCount = Object.values(goLiveChecklist).filter(Boolean).length
    const totalCount = checklistItems.length
    const readyForGoLive = completedCount === totalCount

    return (
      <div className={`min-h-screen ${bgPrimary} flex`}>
        <Sidebar />
        <div className="flex-1 overflow-auto">
          <header className={`${bgSecondary} border-b ${borderColor} px-6 py-4`}>
            <button onClick={() => selectedClient ? setCurrentScreen("client-detail") : setCurrentScreen("dashboard")} className={`flex items-center gap-2 mb-2 ${textSecondary} hover:text-[#00e5ff]`}>
              <ArrowLeft className="h-4 w-4" /> Back
            </button>
            <div className="flex items-center gap-3">
              <Rocket className="h-8 w-8 text-[#00e5ff]" />
              <div>
                <h1 className={`text-2xl font-bold ${textPrimary}`}>Go-Live Checklist</h1>
                <p className={`text-sm ${textSecondary}`}>{selectedClient ? `Production readiness for ${selectedClient.name}` : "Review go-live requirements"}</p>
              </div>
            </div>
          </header>

          <div className="p-6">
            {/* Progress Summary */}
            <Card className={`${bgCard} border ${borderColor} mb-6 p-6`}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className={`text-lg font-bold ${textPrimary}`}>Go-Live Readiness</h2>
                  <p className={textSecondary}>{completedCount} of {totalCount} requirements completed</p>
                </div>
                <div className="text-right">
                  <p className={`text-3xl font-bold ${readyForGoLive ? "text-[#4caf50]" : "text-[#ff9800]"}`}>
                    {Math.round((completedCount / totalCount) * 100)}%
                  </p>
                  <p className={`text-sm ${readyForGoLive ? "text-[#4caf50]" : textSecondary}`}>
                    {readyForGoLive ? "Ready for Go-Live" : "In Progress"}
                  </p>
                </div>
              </div>
              <div className={`w-full h-3 rounded-full ${isDarkMode ? "bg-[#1e4976]/50" : "bg-gray-200"} overflow-hidden`}>
                <div 
                  className={`h-full transition-all duration-500 ${readyForGoLive ? "bg-[#4caf50]" : "bg-[#00e5ff]"}`}
                  style={{ width: `${(completedCount / totalCount) * 100}%` }}
                />
              </div>
            </Card>

            {/* Checklist Items */}
            <Card className={`${bgCard} border ${borderColor}`}>
              <div className={`px-6 py-4 border-b ${borderColor}`}>
                <h3 className={`font-bold ${textPrimary}`}>Requirements Checklist</h3>
              </div>
              <div className="divide-y divide-[#1e4976]/30">
                {checklistItems.map((item) => {
                  const isCompleted = goLiveChecklist[item.key]
                  const ItemIcon = item.icon
                  
                  return (
                    <div key={item.key} className="px-6 py-4 flex items-center gap-4">
                      <button 
                        onClick={() => setGoLiveChecklist(prev => ({ ...prev, [item.key]: !prev[item.key] }))}
                        className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${
                          isCompleted 
                            ? "bg-[#4caf50] border-[#4caf50] text-white" 
                            : `${isDarkMode ? "border-[#1e4976]" : "border-gray-300"}`
                        }`}
                      >
                        {isCompleted && <CheckCircle className="h-4 w-4" />}
                      </button>
                      <div className={`p-2 rounded-lg ${isCompleted ? "bg-[#4caf50]/20" : isDarkMode ? "bg-[#1e4976]/30" : "bg-gray-100"}`}>
                        <ItemIcon className={`h-5 w-5 ${isCompleted ? "text-[#4caf50]" : textSecondary}`} />
                      </div>
                      <div className="flex-1">
                        <p className={`font-medium ${isCompleted ? "text-[#4caf50]" : textPrimary}`}>{item.label}</p>
                        <p className={`text-sm ${textSecondary}`}>{item.description}</p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded ${isDarkMode ? "bg-[#1e4976]/30" : "bg-gray-100"} ${textSecondary}`}>
                        Stage {item.stage}
                      </span>
                    </div>
                  )
                })}
              </div>
            </Card>

            {/* Go-Live Actions */}
            <Card className={`${bgCard} border ${borderColor} mt-6 p-6`}>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className={`text-lg font-bold ${textPrimary}`}>Production Cutover</h3>
                  <p className={textSecondary}>
                    {readyForGoLive 
                      ? "All requirements met. Ready to schedule production cutover."
                      : `Complete ${totalCount - completedCount} remaining item(s) before scheduling cutover.`
                    }
                  </p>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline">
                    <FileCheck className="h-4 w-4 mr-2" /> Generate Certificate
                  </Button>
                  <Button disabled={!readyForGoLive} className={readyForGoLive ? "bg-[#4caf50] hover:bg-[#4caf50]/80" : ""}>
                    <Rocket className="h-4 w-4 mr-2" /> Schedule Go-Live
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  // Reports Screen
  if (currentScreen === "reports") {
    const reportTypes = [
      { id: "onboarding-summary", name: "Onboarding Summary Report", description: "Overall status, timeline, and key findings", icon: FileText, format: "PDF" },
      { id: "spec-comparison", name: "Spec Comparison Report", description: "Detailed comparison of client vs Broadridge specs", icon: GitCompare, format: "PDF/Excel" },
      { id: "test-execution", name: "Test Execution Report", description: "Complete test results with pass/fail details", icon: TestTube, format: "PDF" },
      { id: "certification", name: "Certification Report", description: "Official certification documentation for audit", icon: Award, format: "PDF" },
      { id: "field-mapping", name: "Field Mapping Report", description: "All field mappings and transformation rules", icon: Link2, format: "Excel" },
      { id: "audit-trail", name: "Audit Trail Report", description: "Complete history of all actions and changes", icon: Clock, format: "PDF/Excel" },
    ]

    return (
      <div className={`min-h-screen ${bgPrimary} flex`}>
        <Sidebar />
        <div className="flex-1 overflow-auto">
          <header className={`${bgSecondary} border-b ${borderColor} px-6 py-4`}>
            <button onClick={() => selectedClient ? setCurrentScreen("client-detail") : setCurrentScreen("dashboard")} className={`flex items-center gap-2 mb-2 ${textSecondary} hover:text-[#00e5ff]`}>
              <ArrowLeft className="h-4 w-4" /> Back
            </button>
            <div className="flex items-center gap-3">
              <FileCheck className="h-8 w-8 text-[#00e5ff]" />
              <div>
                <h1 className={`text-2xl font-bold ${textPrimary}`}>Reports & Documentation</h1>
                <p className={`text-sm ${textSecondary}`}>{selectedClient ? `Generate reports for ${selectedClient.name}` : "Generate and download reports"}</p>
              </div>
            </div>
          </header>

          <div className="p-6">
            {/* Report Cards */}
            <div className="grid grid-cols-2 gap-6">
              {reportTypes.map((report) => {
                const ReportIcon = report.icon
                return (
                  <Card key={report.id} className={`${bgCard} border ${borderColor} p-6`}>
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-[#00e5ff]/20">
                        <ReportIcon className="h-6 w-6 text-[#00e5ff]" />
                      </div>
                      <div className="flex-1">
                        <h3 className={`font-bold ${textPrimary} mb-1`}>{report.name}</h3>
                        <p className={`text-sm ${textSecondary} mb-3`}>{report.description}</p>
                        <div className="flex items-center justify-between">
                          <span className={`text-xs px-2 py-1 rounded ${isDarkMode ? "bg-[#1e4976]/30" : "bg-gray-100"} ${textSecondary}`}>
                            Format: {report.format}
                          </span>
                          <Button size="sm">
                            <Download className="h-4 w-4 mr-2" /> Generate
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                )
              })}
            </div>

            {/* Recent Reports */}
            <Card className={`${bgCard} border ${borderColor} mt-6`}>
              <div className={`px-6 py-4 border-b ${borderColor}`}>
                <h3 className={`font-bold ${textPrimary}`}>Recently Generated Reports</h3>
              </div>
              <div className="divide-y divide-[#1e4976]/30">
                {[
{ name: "Nexus_Onboarding_Summary_2026-04-13.pdf", type: "Onboarding Summary", date: "Apr 13, 2026", size: "245 KB" },
          { name: "Nexus_EQ_FIX42_TestResults_2026-04-13.pdf", type: "Test Execution Report", date: "Apr 13, 2026", size: "1.2 MB" },
          { name: "Nexus_SpecComparison_2026-04-09.xlsx", type: "Spec Comparison Report", date: "Apr 9, 2026", size: "890 KB" },
                ].map((report, i) => (
                  <div key={i} className="px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileText className={`h-5 w-5 ${textSecondary}`} />
                      <div>
                        <p className={`font-medium ${textPrimary}`}>{report.name}</p>
                        <p className={`text-xs ${textSecondary}`}>{report.type} - {report.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-xs ${textSecondary}`}>{report.size}</span>
                      <Button size="sm" variant="outline">
                        <Download className="h-3 w-3 mr-1" /> Download
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  // Onboarding Cases Management Screen
  if (currentScreen === "onboarding-cases") {
    const stageColors: Record<number, string> = { 1: "#2196f3", 2: "#9c27b0", 3: "#00bcd4", 4: "#ff9800", 5: "#e91e63", 6: "#4caf50", 7: "#00e5ff" }
    
    return (
      <div className={`min-h-screen ${bgPrimary} flex`}>
        <Sidebar />
        <div className="flex-1 overflow-auto">
          <header className={`${bgSecondary} border-b ${borderColor} px-6 py-4`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Briefcase className="h-8 w-8 text-[#00e5ff]" />
                <div>
                  <h1 className={`text-2xl font-bold ${textPrimary}`}>Onboarding Cases</h1>
                  <p className={`text-sm ${textSecondary}`}>Manage client onboarding lifecycle from setup to go-live</p>
                </div>
              </div>
              <Button className="bg-[#4caf50] hover:bg-[#4caf50]/80">
                <Plus className="h-4 w-4 mr-2" /> New Case
              </Button>
            </div>
          </header>

          <div className="p-6">
            {/* Filters */}
            <Card className={`${bgCard} border ${borderColor} p-4 mb-6`}>
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <span className={`text-sm ${textSecondary}`}>Stage:</span>
                  <select className={`px-3 py-1.5 rounded border text-sm ${isDarkMode ? "bg-[#0a1628] border-[#1e4976] text-white" : "bg-white border-gray-300"}`}>
                    <option>All Stages</option>
                    <option>Setup</option>
                    <option>Spec Analysis</option>
                    <option>Connectivity</option>
                    <option>Testing</option>
                    <option>Certification</option>
                    <option>Go-Live</option>
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-sm ${textSecondary}`}>Region:</span>
                  <select className={`px-3 py-1.5 rounded border text-sm ${isDarkMode ? "bg-[#0a1628] border-[#1e4976] text-white" : "bg-white border-gray-300"}`}>
                    <option>All Regions</option>
                    <option>AMER</option>
                    <option>EMEA</option>
                    <option>APAC</option>
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-sm ${textSecondary}`}>Priority:</span>
                  <select className={`px-3 py-1.5 rounded border text-sm ${isDarkMode ? "bg-[#0a1628] border-[#1e4976] text-white" : "bg-white border-gray-300"}`}>
                    <option>All Priorities</option>
                    <option>Critical</option>
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-sm ${textSecondary}`}>Status:</span>
                  <select className={`px-3 py-1.5 rounded border text-sm ${isDarkMode ? "bg-[#0a1628] border-[#1e4976] text-white" : "bg-white border-gray-300"}`}>
                    <option>All Status</option>
                    <option>On Track</option>
                    <option>At Risk</option>
                    <option>Blocked</option>
                  </select>
                </div>
                <div className="flex-1" />
                <Input placeholder="Search cases..." className={`w-64 ${isDarkMode ? "bg-[#0a1628] border-[#1e4976]" : ""}`} />
              </div>
            </Card>

            {/* Summary Stats */}
            <div className="grid grid-cols-5 gap-4 mb-6">
              <Card className={`${bgCard} border ${borderColor} p-4`}>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-[#2196f3]/20"><Briefcase className="h-5 w-5 text-[#2196f3]" /></div>
                  <div>
                    <p className={`text-2xl font-bold ${textPrimary}`}>{onboardingCases.length}</p>
                    <p className={`text-xs ${textSecondary}`}>Active Cases</p>
                  </div>
                </div>
              </Card>
              <Card className={`${bgCard} border ${borderColor} p-4`}>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-[#4caf50]/20"><CheckCircle className="h-5 w-5 text-[#4caf50]" /></div>
                  <div>
                    <p className={`text-2xl font-bold ${textPrimary}`}>{onboardingCases.filter(c => c.status === "on-track").length}</p>
                    <p className={`text-xs ${textSecondary}`}>On Track</p>
                  </div>
                </div>
              </Card>
              <Card className={`${bgCard} border ${borderColor} p-4`}>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-[#ff9800]/20"><AlertTriangle className="h-5 w-5 text-[#ff9800]" /></div>
                  <div>
                    <p className={`text-2xl font-bold ${textPrimary}`}>{onboardingCases.filter(c => c.status === "at-risk").length}</p>
                    <p className={`text-xs ${textSecondary}`}>At Risk</p>
                  </div>
                </div>
              </Card>
              <Card className={`${bgCard} border ${borderColor} p-4`}>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-[#f44336]/20"><Lock className="h-5 w-5 text-[#f44336]" /></div>
                  <div>
                    <p className={`text-2xl font-bold ${textPrimary}`}>{onboardingCases.filter(c => c.status === "blocked").length}</p>
                    <p className={`text-xs ${textSecondary}`}>Blocked</p>
                  </div>
                </div>
              </Card>
              <Card className={`${bgCard} border ${borderColor} p-4`}>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-[#e91e63]/20"><AlertOctagon className="h-5 w-5 text-[#e91e63]" /></div>
                  <div>
                    <p className={`text-2xl font-bold ${textPrimary}`}>{onboardingCases.reduce((acc, c) => acc + c.blockers, 0)}</p>
                    <p className={`text-xs ${textSecondary}`}>Total Blockers</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Cases Table */}
            <Card className={`${bgCard} border ${borderColor}`}>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className={`border-b ${borderColor} ${isDarkMode ? "bg-[#1e4976]/20" : "bg-gray-50"}`}>
                      <th className={`px-4 py-3 text-left font-semibold ${textPrimary}`}>Case ID</th>
                      <th className={`px-4 py-3 text-left font-semibold ${textPrimary}`}>Client</th>
                      <th className={`px-4 py-3 text-left font-semibold ${textPrimary}`}>Region</th>
                      <th className={`px-4 py-3 text-left font-semibold ${textPrimary}`}>Asset / Protocol</th>
                      <th className={`px-4 py-3 text-left font-semibold ${textPrimary}`}>Stage</th>
                      <th className={`px-4 py-3 text-left font-semibold ${textPrimary}`}>Priority</th>
                      <th className={`px-4 py-3 text-left font-semibold ${textPrimary}`}>Risk</th>
                      <th className={`px-4 py-3 text-left font-semibold ${textPrimary}`}>Owner</th>
                      <th className={`px-4 py-3 text-left font-semibold ${textPrimary}`}>SLA Date</th>
                      <th className={`px-4 py-3 text-left font-semibold ${textPrimary}`}>Status</th>
                      <th className={`px-4 py-3 text-left font-semibold ${textPrimary}`}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {onboardingCases.map((caseItem) => (
                      <tr key={caseItem.id} className={`border-b ${borderColor} hover:bg-[#1e4976]/10 cursor-pointer`}>
                        <td className={`px-4 py-3 font-mono font-medium text-[#00e5ff]`}>{caseItem.id}</td>
                        <td className={`px-4 py-3`}>
                          <div>
                            <p className={`font-medium ${textPrimary}`}>{caseItem.client}</p>
                            <p className={`text-xs ${textSecondary}`}>{caseItem.legalEntity}</p>
                          </div>
                        </td>
                        <td className={`px-4 py-3`}>
                          <span className={`px-2 py-1 rounded text-xs ${isDarkMode ? "bg-[#1e4976]/50" : "bg-gray-100"} ${textSecondary}`}>
                            {caseItem.region}
                          </span>
                        </td>
                        <td className={`px-4 py-3 ${textSecondary}`}>{caseItem.assetClass} / {caseItem.protocol}</td>
                        <td className={`px-4 py-3`}>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: stageColors[caseItem.stage] }} />
                            <span className={textPrimary}>{caseItem.stageLabel}</span>
                          </div>
                        </td>
                        <td className={`px-4 py-3`}>
                          <span className={`px-2 py-1 rounded text-xs ${
                            caseItem.priority === "Critical" ? "bg-[#f44336]/20 text-[#f44336]" :
                            caseItem.priority === "High" ? "bg-[#ff9800]/20 text-[#ff9800]" :
                            caseItem.priority === "Medium" ? "bg-[#2196f3]/20 text-[#2196f3]" :
                            "bg-[#4caf50]/20 text-[#4caf50]"
                          }`}>
                            {caseItem.priority}
                          </span>
                        </td>
                        <td className={`px-4 py-3`}>
                          <span className={`px-2 py-1 rounded text-xs ${
                            caseItem.riskRating === "High" ? "bg-[#f44336]/20 text-[#f44336]" :
                            caseItem.riskRating === "Medium" ? "bg-[#ff9800]/20 text-[#ff9800]" :
                            "bg-[#4caf50]/20 text-[#4caf50]"
                          }`}>
                            {caseItem.riskRating}
                          </span>
                        </td>
                        <td className={`px-4 py-3 ${textSecondary}`}>{caseItem.owner}</td>
                        <td className={`px-4 py-3 ${textSecondary}`}>{caseItem.slaDate}</td>
                        <td className={`px-4 py-3`}>
                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-1 rounded text-xs flex items-center gap-1 ${
                              caseItem.status === "on-track" ? "bg-[#4caf50]/20 text-[#4caf50]" :
                              caseItem.status === "at-risk" ? "bg-[#ff9800]/20 text-[#ff9800]" :
                              "bg-[#f44336]/20 text-[#f44336]"
                            }`}>
                              {caseItem.status === "on-track" && <CheckCircle className="h-3 w-3" />}
                              {caseItem.status === "at-risk" && <AlertTriangle className="h-3 w-3" />}
                              {caseItem.status === "blocked" && <Lock className="h-3 w-3" />}
                              {caseItem.status.replace("-", " ").replace(/\b\w/g, l => l.toUpperCase())}
                            </span>
                            {caseItem.blockers > 0 && (
                              <span className="w-5 h-5 rounded-full bg-[#f44336]/20 text-[#f44336] text-xs flex items-center justify-center">
                                {caseItem.blockers}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className={`px-4 py-3`}>
                          <div className="flex gap-1">
                            <Button size="sm" variant="outline" className="h-7" onClick={() => {
                              const client = clients.find(c => c.name === caseItem.client)
                              if (client) { setSelectedClient(client); setCurrentScreen("client-detail") }
                            }}>
                              <Eye className="h-3 w-3" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  // Approvals & Exceptions Screen
  if (currentScreen === "approvals") {
    const filteredApprovals = allApprovals.filter(a => {
      if (approvalsTab === "Pending") return a.status === "pending" || a.status === "overdue"
      if (approvalsTab === "Approved") return a.status === "approved"
      if (approvalsTab === "Rejected") return a.status === "rejected"
      return true
    })

    const clientGroups = filteredApprovals.reduce((acc, item) => {
      if (!acc[item.client]) acc[item.client] = []
      acc[item.client].push(item)
      return acc
    }, {} as Record<string, typeof allApprovals>)

    const pendingCount = allApprovals.filter(a => a.status === "pending" || a.status === "overdue").length
    const approvedCount = allApprovals.filter(a => a.status === "approved").length
    const rejectedCount = allApprovals.filter(a => a.status === "rejected").length

    const typeStyle = (type: string) => ({
      icon: type === "Stage Gate" ? Layers : type === "Exception" ? FileWarning : Rocket,
      bg: type === "Stage Gate" ? "bg-[#2196f3]/20" : type === "Exception" ? "bg-[#ff9800]/20" : "bg-[#4caf50]/20",
      text: type === "Stage Gate" ? "text-[#2196f3]" : type === "Exception" ? "text-[#ff9800]" : "text-[#4caf50]",
      badge: type === "Stage Gate" ? "bg-[#2196f3]/20 text-[#2196f3]" : type === "Exception" ? "bg-[#ff9800]/20 text-[#ff9800]" : "bg-[#4caf50]/20 text-[#4caf50]",
    })

    return (
      <div className={`min-h-screen ${bgPrimary} flex`}>
        <Sidebar />
        <div className="flex-1 overflow-auto">
          <header className={`${bgSecondary} border-b ${borderColor} px-6 py-4`}>
            <div className="flex items-center gap-3">
              <Scale className="h-8 w-8 text-[#00e5ff]" />
              <div>
                <h1 className={`text-2xl font-bold ${textPrimary}`}>Approvals & Exceptions</h1>
                <p className={`text-sm ${textSecondary}`}>Review and approve stage gates, exceptions, and go-live requests</p>
              </div>
            </div>
          </header>

          <div className="p-6">
            {/* Stats + Tabs row */}
            <div className="flex items-center justify-between mb-6">
              <div className={`flex gap-1 p-1 rounded-lg ${isDarkMode ? "bg-[#0a1628]" : "bg-gray-100"}`}>
                {(["Pending", "Approved", "Rejected", "All"] as const).map(tab => {
                  const count = tab === "Pending" ? pendingCount : tab === "Approved" ? approvedCount : tab === "Rejected" ? rejectedCount : allApprovals.length
                  const isActive = approvalsTab === tab
                  return (
                    <button
                      key={tab}
                      onClick={() => setApprovalsTab(tab)}
                      className={`px-4 py-2 rounded text-sm font-medium transition-colors flex items-center gap-2 ${
                        isActive ? "bg-[#00e5ff] text-[#0a1628]" : `${textSecondary} hover:bg-[#1e4976]/30`
                      }`}
                    >
                      {tab}
                      <span className={`px-1.5 py-0.5 rounded-full text-xs font-bold ${
                        isActive ? "bg-[#0a1628]/20 text-[#0a1628]" :
                        tab === "Pending" && count > 0 ? "bg-[#f44336] text-white" :
                        tab === "Rejected" ? "bg-[#f44336]/20 text-[#f44336]" :
                        tab === "Approved" ? "bg-[#4caf50]/20 text-[#4caf50]" :
                        isDarkMode ? "bg-[#1e4976]/50 text-slate-300" : "bg-gray-200 text-gray-600"
                      }`}>{count}</span>
                    </button>
                  )
                })}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => setExpandedApprovalClients(Object.fromEntries(Object.keys(clientGroups).map(c => [c, true])))}>
                  Expand All
                </Button>
                <Button variant="outline" size="sm" onClick={() => setExpandedApprovalClients({})}>
                  Collapse All
                </Button>
              </div>
            </div>

            {/* Client-grouped approvals */}
            {Object.keys(clientGroups).length === 0 ? (
              <div className={`text-center py-16 ${textSecondary}`}>
                <Scale className="h-12 w-12 mx-auto mb-3 opacity-30" />
                <p className="text-lg font-medium">No {approvalsTab.toLowerCase()} items</p>
              </div>
            ) : (
              <div className="space-y-4">
                {Object.entries(clientGroups).map(([client, items]) => {
                  const isExpanded = expandedApprovalClients[client] !== false
                  const clientPending = items.filter(i => i.status === "pending" || i.status === "overdue").length
                  const clientOverdue = items.filter(i => i.status === "overdue").length
                  const caseId = items[0]?.caseId

                  return (
                    <Card key={client} className={`${bgCard} border ${borderColor} overflow-hidden`}>
                      {/* Client header */}
                      <button
                        onClick={() => setExpandedApprovalClients(prev => ({ ...prev, [client]: !isExpanded }))}
                        className={`w-full px-5 py-4 flex items-center justify-between hover:bg-[#1e4976]/10 transition-colors`}
                      >
                        <div className="flex items-center gap-4">
                          <div className="p-2 rounded-lg bg-[#00e5ff]/20">
                            <Building2 className="h-5 w-5 text-[#00e5ff]" />
                          </div>
                          <div className="text-left">
                            <div className="flex items-center gap-3">
                              <span className={`font-bold ${textPrimary}`}>{client}</span>
                              <span className={`font-mono text-xs ${textSecondary}`}>{caseId}</span>
                              {clientOverdue > 0 && (
                                <span className="px-2 py-0.5 rounded-full text-xs bg-[#f44336]/20 text-[#f44336] flex items-center gap-1">
                                  <Clock className="h-3 w-3" /> {clientOverdue} overdue
                                </span>
                              )}
                              {clientPending > 0 && clientOverdue === 0 && (
                                <span className="px-2 py-0.5 rounded-full text-xs bg-[#ff9800]/20 text-[#ff9800]">
                                  {clientPending} pending
                                </span>
                              )}
                            </div>
                            <p className={`text-xs ${textSecondary}`}>{items.length} item{items.length !== 1 ? "s" : ""}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex gap-2">
                            {Array.from(new Set(items.map(i => i.type))).map(t => {
                              const s = typeStyle(t)
                              return (
                                <span key={t} className={`px-2 py-0.5 rounded text-xs ${s.badge}`}>{t}</span>
                              )
                            })}
                          </div>
                          <ChevronDown className={`h-5 w-5 ${textSecondary} transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                        </div>
                      </button>

                      {/* Items list */}
                      {isExpanded && (
                        <div className={`border-t ${borderColor} ${isDarkMode ? "bg-[#0a1628]" : "bg-white"} divide-y ${isDarkMode ? "divide-[#1e4976]/40" : "divide-gray-100"}`}>
                          {items.map((approval) => {
                            const s = typeStyle(approval.type)
                            const TypeIcon = s.icon
                            const isSelected = selectedApproval?.id === approval.id
                            return (
                              <div key={approval.id}>
                                <button
                                  onClick={() => setSelectedApproval(isSelected ? null : approval)}
                                  className={`w-full px-5 py-4 flex items-start gap-4 text-left transition-colors ${
                                    isSelected
                                      ? isDarkMode ? "bg-[#1e4976]/30" : "bg-blue-50"
                                      : "hover:bg-[#1e4976]/10"
                                  }`}
                                >
                                  <div className={`p-2 rounded-lg flex-shrink-0 ${s.bg}`}>
                                    <TypeIcon className={`h-4 w-4 ${s.text}`} />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                                      <span className={`font-mono text-xs ${textSecondary}`}>{approval.id}</span>
                                      <span className={`px-1.5 py-0.5 rounded text-xs ${s.badge}`}>{approval.type}</span>
                                      {approval.status === "overdue" && (
                                        <span className="px-1.5 py-0.5 rounded text-xs bg-[#f44336]/20 text-[#f44336] flex items-center gap-1">
                                          <Clock className="h-3 w-3" /> Overdue
                                        </span>
                                      )}
                                      {approval.status === "approved" && (
                                        <span className="px-1.5 py-0.5 rounded text-xs bg-[#4caf50]/20 text-[#4caf50] flex items-center gap-1">
                                          <CheckCircle className="h-3 w-3" /> Approved
                                        </span>
                                      )}
                                      {approval.status === "rejected" && (
                                        <span className="px-1.5 py-0.5 rounded text-xs bg-[#f44336]/20 text-[#f44336] flex items-center gap-1">
                                          <X className="h-3 w-3" /> Rejected
                                        </span>
                                      )}
                                      <span className={`text-xs ${textSecondary}`}>{approval.submittedDate}</span>
                                    </div>
                                    <p className={`text-sm font-medium ${textPrimary} truncate`}>{approval.description}</p>
                                    <p className={`text-xs ${textSecondary} mt-0.5`}>
                                      Submitted by {approval.submittedBy}
                                      {(approval.status === "approved" || approval.status === "rejected") && (approval as any).resolvedBy
                                        ? ` · ${approval.status === "approved" ? "Approved" : "Rejected"} by ${(approval as any).resolvedBy} on ${(approval as any).resolvedDate}`
                                        : ` · Due ${approval.dueDate}`}
                                    </p>
                                  </div>
                                  <div className="flex items-center gap-2 flex-shrink-0">
                                    {/* Approver progress dots */}
                                    <div className="flex items-center gap-1">
                                      {approval.requiredApprovers.map((approver, i) => {
                                        const done = approval.currentApprovers.includes(approver)
                                        return (
                                          <div
                                            key={i}
                                            title={approver}
                                            className={`w-2 h-2 rounded-full ${done ? "bg-[#4caf50]" : isDarkMode ? "bg-[#1e4976]/80" : "bg-gray-300"}`}
                                          />
                                        )
                                      })}
                                    </div>
                                    <span className={`text-xs ${textSecondary}`}>
                                      {approval.currentApprovers.length}/{approval.requiredApprovers.length}
                                    </span>
                                    <ChevronDown className={`h-4 w-4 ${textSecondary} transition-transform ${isSelected ? "rotate-180" : ""}`} />
                                  </div>
                                </button>

                                {/* Expanded detail panel */}
                                {isSelected && (
                                  <div className={`mx-5 mb-4 rounded-lg border ${borderColor} overflow-hidden`}>
                                    {/* Approver chain */}
                                    <div className={`px-5 py-4 ${isDarkMode ? "bg-[#1e4976]/20" : "bg-gray-50"} border-b ${borderColor}`}>
                                      <p className={`text-xs font-semibold ${textSecondary} mb-3 uppercase tracking-wider`}>Approval Chain</p>
                                      <div className="flex items-center gap-2 flex-wrap">
                                        {approval.requiredApprovers.map((approver, i) => {
                                          const done = approval.currentApprovers.includes(approver)
                                          return (
                                            <div key={i} className="flex items-center gap-2">
                                              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${
                                                done
                                                  ? "bg-[#4caf50]/15 border-[#4caf50]/40 text-[#4caf50]"
                                                  : isDarkMode ? "bg-[#1e4976]/40 border-[#1e4976] text-slate-400" : "bg-gray-100 border-gray-300 text-gray-500"
                                              }`}>
                                                {done ? <CheckCircle className="h-3.5 w-3.5" /> : <Clock className="h-3.5 w-3.5" />}
                                                <span className="text-sm font-medium">{approver}</span>
                                              </div>
                                              {i < approval.requiredApprovers.length - 1 && (
                                                <ArrowRight className={`h-4 w-4 ${textSecondary}`} />
                                              )}
                                            </div>
                                          )
                                        })}
                                      </div>
                                    </div>
                                    {/* Notes */}
                                    {(approval as any).notes && (
                                      <div className={`px-5 py-4 ${isDarkMode ? "bg-[#0a1628]/40" : "bg-white"} border-b ${borderColor}`}>
                                        <p className={`text-xs font-semibold ${textSecondary} mb-1.5 uppercase tracking-wider`}>Notes</p>
                                        <p className={`text-sm ${textPrimary} leading-relaxed`}>{(approval as any).notes}</p>
                                      </div>
                                    )}
                                    {/* Actions — only for pending/overdue */}
                                    {(approval.status === "pending" || approval.status === "overdue") && (
                                      <div className={`px-5 py-3 flex items-center justify-between ${isDarkMode ? "bg-[#1e4976]/10" : "bg-gray-50"}`}>
                                        <p className={`text-sm ${textSecondary}`}>
                                          Due: <span className={approval.status === "overdue" ? "text-[#f44336] font-medium" : textPrimary}>{approval.dueDate}</span>
                                        </p>
                                        <div className="flex gap-2">
                                          <Button variant="outline" size="sm" className={`text-[#f44336] border-[#f44336]/30 hover:bg-[#f44336]/10`}>
                                            <ThumbsDown className="h-4 w-4 mr-1.5" /> Reject
                                          </Button>
                                          <Button size="sm" className="bg-[#4caf50] hover:bg-[#4caf50]/80 text-white">
                                            <ThumbsUp className="h-4 w-4 mr-1.5" /> Approve
                                          </Button>
                                        </div>
                                      </div>
                                    )}
                                    {(approval.status === "approved" || approval.status === "rejected") && (
                                      <div className={`px-5 py-3 flex items-center justify-between ${isDarkMode ? "bg-[#1e4976]/10" : "bg-gray-50"}`}>
                                        <p className={`text-sm ${textSecondary}`}>
                                          Resolved: <span className={textPrimary}>{(approval as any).resolvedDate}</span> by <span className={textPrimary}>{(approval as any).resolvedBy}</span>
                                        </p>
                                        <Button variant="outline" size="sm">
                                          <Eye className="h-4 w-4 mr-1.5" /> View Full Record
                                        </Button>
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>
                            )
                          })}
                        </div>
                      )}
                    </Card>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  // Evidence Vault Screen
  if (currentScreen === "evidence-vault") {
    return (
      <div className={`min-h-screen ${bgPrimary} flex`}>
        <Sidebar />
        <div className="flex-1 overflow-auto">
          <header className={`${bgSecondary} border-b ${borderColor} px-6 py-4`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Archive className="h-8 w-8 text-[#00e5ff]" />
                <div>
                  <h1 className={`text-2xl font-bold ${textPrimary}`}>Evidence Vault</h1>
                  <p className={`text-sm ${textSecondary}`}>Immutable audit trail and certification evidence packages</p>
                </div>
              </div>
              <Button>
                <Download className="h-4 w-4 mr-2" /> Export Certification Pack
              </Button>
            </div>
          </header>

          <div className="p-6">
            {/* Filters */}
            <Card className={`${bgCard} border ${borderColor} p-4 mb-6`}>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className={`text-sm ${textSecondary}`}>Case:</span>
                  <select className={`px-3 py-1.5 rounded border text-sm ${isDarkMode ? "bg-[#0a1628] border-[#1e4976] text-white" : "bg-white border-gray-300"}`}>
                    <option>All Cases</option>
                    {onboardingCases.map(c => <option key={c.id}>{c.id} - {c.client}</option>)}
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-sm ${textSecondary}`}>Type:</span>
                  <select className={`px-3 py-1.5 rounded border text-sm ${isDarkMode ? "bg-[#0a1628] border-[#1e4976] text-white" : "bg-white border-gray-300"}`}>
                    <option>All Types</option>
                    <option>Test Report</option>
                    <option>Spec Diff</option>
                    <option>Certification Pack</option>
                    <option>Approval Record</option>
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-sm ${textSecondary}`}>Signed:</span>
                  <select className={`px-3 py-1.5 rounded border text-sm ${isDarkMode ? "bg-[#0a1628] border-[#1e4976] text-white" : "bg-white border-gray-300"}`}>
                    <option>All</option>
                    <option>Signed</option>
                    <option>Unsigned</option>
                  </select>
                </div>
                <div className="flex-1" />
                <Input placeholder="Search evidence..." className={`w-64 ${isDarkMode ? "bg-[#0a1628] border-[#1e4976]" : ""}`} />
              </div>
            </Card>

            {/* Evidence Table */}
            <Card className={`${bgCard} border ${borderColor}`}>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className={`border-b ${borderColor} ${isDarkMode ? "bg-[#1e4976]/20" : "bg-gray-50"}`}>
                      <th className={`px-4 py-3 text-left font-semibold ${textPrimary}`}>Evidence ID</th>
                      <th className={`px-4 py-3 text-left font-semibold ${textPrimary}`}>Client</th>
                      <th className={`px-4 py-3 text-left font-semibold ${textPrimary}`}>Type</th>
                      <th className={`px-4 py-3 text-left font-semibold ${textPrimary}`}>Document</th>
                      <th className={`px-4 py-3 text-left font-semibold ${textPrimary}`}>Stage</th>
                      <th className={`px-4 py-3 text-left font-semibold ${textPrimary}`}>Generated</th>
                      <th className={`px-4 py-3 text-left font-semibold ${textPrimary}`}>Signature</th>
                      <th className={`px-4 py-3 text-left font-semibold ${textPrimary}`}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {evidenceItems.map((evidence) => (
                      <tr key={evidence.id} className={`border-b ${borderColor} hover:bg-[#1e4976]/10`}>
                        <td className={`px-4 py-3 font-mono text-[#00e5ff]`}>{evidence.id}</td>
                        <td className={`px-4 py-3`}>
                          <div className="flex items-center gap-2">
                            <Building2 className="h-4 w-4 text-[#00e5ff]" />
                            <div>
                              <p className={`font-medium ${textPrimary}`}>{evidence.client}</p>
                              <p className={`text-xs font-mono ${textSecondary}`}>{evidence.caseId}</p>
                            </div>
                          </div>
                        </td>
                        <td className={`px-4 py-3`}>
                          <span className={`px-2 py-1 rounded text-xs ${
                            evidence.type === "Test Report" ? "bg-[#2196f3]/20 text-[#2196f3]" :
                            evidence.type === "Spec Diff" ? "bg-[#9c27b0]/20 text-[#9c27b0]" :
                            evidence.type === "Certification Pack" ? "bg-[#4caf50]/20 text-[#4caf50]" :
                            "bg-[#ff9800]/20 text-[#ff9800]"
                          }`}>
                            {evidence.type}
                          </span>
                        </td>
                        <td className={`px-4 py-3`}>
                          <div className="flex items-center gap-2">
                            <FileText className={`h-4 w-4 ${textSecondary}`} />
                            <div>
                              <p className={textPrimary}>{evidence.name}</p>
                              <p className={`text-xs ${textSecondary}`}>{evidence.size}</p>
                            </div>
                          </div>
                        </td>
                        <td className={`px-4 py-3 ${textSecondary}`}>Stage {evidence.stage}</td>
                        <td className={`px-4 py-3`}>
                          <div>
                            <p className={textSecondary}>{evidence.generatedDate}</p>
                            <p className={`text-xs ${textSecondary}`}>by {evidence.generatedBy}</p>
                          </div>
                        </td>
                        <td className={`px-4 py-3`}>
                          {evidence.signed ? (
                            <div className="flex items-center gap-2">
                              <Stamp className="h-4 w-4 text-[#4caf50]" />
                              <div>
                                <p className="text-[#4caf50] text-xs">Signed</p>
                                <p className={`text-xs ${textSecondary}`}>{evidence.signedBy} - {evidence.signedDate}</p>
                              </div>
                            </div>
                          ) : (
                            <span className={`text-xs ${textSecondary}`}>Unsigned</span>
                          )}
                        </td>
                        <td className={`px-4 py-3`}>
                          <div className="flex gap-1">
                            <Button size="sm" variant="outline" className="h-7">
                              <Eye className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="outline" className="h-7">
                              <Download className="h-3 w-3" />
                            </Button>
                            {!evidence.signed && (
                              <Button size="sm" variant="outline" className="h-7 text-[#4caf50] border-[#4caf50]/30">
                                <Stamp className="h-3 w-3" />
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  // Rule Library Screen
  if (currentScreen === "rule-library") {
    // Rule sections with hierarchy
    const ruleSections = [
      {
        id: "session",
        title: "Session Level Rules",
        color: "#2196f3",
        icon: Wifi,
        description: "Core FIX session protocol validation",
        source: "FIX 4.2 Protocol Specification, Session Layer",
        subsections: [
          { id: "session-core", title: "Core Message Structure", rules: ruleLibrary.filter(r => r.category === "Session" && r.id.startsWith("S-0")) },
          { id: "session-state", title: "Session State & Sequence", rules: ruleLibrary.filter(r => r.category === "Session State") },
          { id: "session-dict", title: "Message Dictionary", rules: ruleLibrary.filter(r => r.category === "Dictionary") },
        ]
      },
      {
        id: "business",
        title: "Business Level Rules",
        color: "#4caf50",
        icon: Briefcase,
        description: "Order flow and business message validation",
        source: "FIX 4.2 Application Messages, Trading Guidelines",
        subsections: [
          { id: "order-new", title: "New Order Rules", rules: ruleLibrary.filter(r => r.category === "Business" && ["B-001","B-002","B-003","B-004","B-005","B-006","B-007","B-008","B-009","B-010","B-011"].includes(r.id)) },
          { id: "order-modify", title: "Order Modify & Cancel Rules", rules: ruleLibrary.filter(r => r.category === "Business" && ["B-012","B-013","B-014","B-015"].includes(r.id)) },
        ]
      },
      {
        id: "execution",
        title: "Execution Rules",
        color: "#e91e63",
        icon: Zap,
        description: "Execution reports and order lifecycle validation",
        source: "FIX 4.2 Execution Report (35=8), Order State Model",
        subsections: [
          { id: "exec-report", title: "Execution Report Validation", rules: ruleLibrary.filter(r => r.category === "Execution" && r.id.startsWith("EX-00")) },
          { id: "exec-cancel", title: "Cancel/Replace Flow", rules: ruleLibrary.filter(r => r.category === "Execution" && ["EX-006","EX-007","EX-008","EX-009","EX-010"].includes(r.id)) },
        ]
      },
      {
        id: "market-data",
        title: "Market Data Rules",
        color: "#ff5722",
        icon: BarChart3,
        description: "Market data request and snapshot validation",
        source: "FIX 4.2 Market Data Messages (35=V,W,X)",
        subsections: [
          { id: "md-all", title: "Market Data Validation", rules: ruleLibrary.filter(r => r.category === "Market Data") },
        ]
      },
      {
        id: "venue",
        title: "Venue Rules",
        color: "#ff9800",
        icon: Building,
        description: "Exchange and venue-specific constraints",
        source: "Exchange Rule Books, Market Microstructure",
        subsections: [
          { id: "venue-all", title: "Venue Constraints", rules: ruleLibrary.filter(r => r.category === "Venue") },
        ]
      },
      {
        id: "custom",
        title: "Custom Client Rules",
        color: "#795548",
        icon: Users,
        description: "Client-specific custom field and behavior rules",
        source: "Client Onboarding Specifications, Custom Tag Registry",
        subsections: [
          { id: "custom-all", title: "Client-Specific Rules", rules: ruleLibrary.filter(r => r.category === "Custom") },
        ]
      },
    ]

    const toggleSection = (sectionId: string) => {
      setExpandedRuleSections(prev => ({ ...prev, [sectionId]: !prev[sectionId] }))
    }

    // Get unique values for filters
    const allFixVersions = [...new Set(ruleLibrary.flatMap(r => r.fixVersions))].sort()
    const allMarkets = [...new Set(ruleLibrary.map(r => r.market))].sort()

    const filteredSections = ruleSections.map(section => ({
      ...section,
      subsections: section.subsections.map(sub => ({
        ...sub,
        rules: sub.rules.filter(r => {
          const matchesSearch = ruleSearch === "" || 
            r.name.toLowerCase().includes(ruleSearch.toLowerCase()) ||
            r.id.toLowerCase().includes(ruleSearch.toLowerCase()) ||
            r.description.toLowerCase().includes(ruleSearch.toLowerCase())
          const matchesFix = ruleFixVersionFilter === "All" || r.fixVersions.includes(ruleFixVersionFilter)
          const matchesMarket = ruleMarketFilter === "All" || r.market === ruleMarketFilter || r.market === "All"
          const matchesSeverity = ruleSeverityFilter === "All" || r.severity === ruleSeverityFilter
          return matchesSearch && matchesFix && matchesMarket && matchesSeverity
        })
      })).filter(sub => sub.rules.length > 0)
    })).filter(section => section.subsections.length > 0)

    const totalFilteredRules = filteredSections.reduce((acc, s) => acc + s.subsections.reduce((a, sub) => a + sub.rules.length, 0), 0)
    const hasActiveFilters = ruleSearch || ruleFixVersionFilter !== "All" || ruleMarketFilter !== "All" || ruleSeverityFilter !== "All"

    const RuleTable = ({ rules }: { rules: typeof ruleLibrary }) => (
      <table className="w-full text-sm">
        <thead>
          <tr className={`border-b ${borderColor} ${isDarkMode ? "bg-[#0a1628]/50" : "bg-gray-50"}`}>
            <th className={`px-3 py-2 text-left font-medium ${textSecondary} text-xs`}>ID</th>
            <th className={`px-3 py-2 text-left font-medium ${textSecondary} text-xs`}>Name</th>
            <th className={`px-3 py-2 text-left font-medium ${textSecondary} text-xs`}>Description</th>
            <th className={`px-3 py-2 text-left font-medium ${textSecondary} text-xs`}>FIX Versions</th>
            <th className={`px-3 py-2 text-left font-medium ${textSecondary} text-xs`}>Market</th>
            <th className={`px-3 py-2 text-left font-medium ${textSecondary} text-xs`}>Severity</th>
            <th className={`px-3 py-2 text-left font-medium ${textSecondary} text-xs`}>Source</th>
            <th className={`px-3 py-2 text-left font-medium ${textSecondary} text-xs`}>Enabled</th>
          </tr>
        </thead>
        <tbody>
          {rules.map((rule) => {
            const sourceDoc = ruleSourceMaterials.find(s => s.id === rule.sourceRef)
            return (
              <tr key={rule.id} className={`border-b ${borderColor} hover:bg-[#1e4976]/10`}>
                <td className={`px-3 py-2 font-mono text-[#00e5ff] text-xs`}>{rule.id}</td>
                <td className={`px-3 py-2 font-medium ${textPrimary} text-xs whitespace-nowrap`}>{rule.name}</td>
                <td className={`px-3 py-2 ${textSecondary} text-xs max-w-xs`}>{rule.description}</td>
                <td className={`px-3 py-2`}>
                  <div className="flex flex-wrap gap-0.5">
                    {rule.fixVersions.length > 3 ? (
                      <span className={`px-1.5 py-0.5 rounded text-[10px] ${isDarkMode ? "bg-[#1e4976]/50" : "bg-gray-100"} ${textSecondary}`}>
                        {rule.fixVersions.length} versions
                      </span>
                    ) : (
                      rule.fixVersions.slice(0, 3).map(v => (
                        <span key={v} className={`px-1.5 py-0.5 rounded text-[10px] ${isDarkMode ? "bg-[#1e4976]/50" : "bg-gray-100"} ${textSecondary}`}>
                          {v}
                        </span>
                      ))
                    )}
                  </div>
                </td>
                <td className={`px-3 py-2`}>
                  <span className={`px-1.5 py-0.5 rounded text-[10px] ${
                    rule.market === "All" ? "bg-[#4caf50]/20 text-[#4caf50]" :
                    rule.market.includes("NYSE") || rule.market.includes("NASDAQ") ? "bg-[#2196f3]/20 text-[#2196f3]" :
                    rule.market.includes("EU") || rule.market.includes("LSE") ? "bg-[#9c27b0]/20 text-[#9c27b0]" :
                    "bg-[#ff9800]/20 text-[#ff9800]"
                  }`}>
                    {rule.market}
                  </span>
                </td>
                <td className={`px-3 py-2`}>
                  <span className={`px-2 py-0.5 rounded text-xs ${
                    rule.severity === "Error" ? "bg-[#f44336]/20 text-[#f44336]" :
                    rule.severity === "Warning" ? "bg-[#ff9800]/20 text-[#ff9800]" :
                    "bg-[#2196f3]/20 text-[#2196f3]"
                  }`}>
                    {rule.severity}
                  </span>
                </td>
                <td className={`px-3 py-2`}>
                  {sourceDoc ? (
                    <span className={`text-[10px] ${textSecondary} cursor-pointer hover:text-[#00e5ff]`} title={sourceDoc.name}>
                      {rule.sourceRef}
                    </span>
                  ) : (
                    <span className={`text-[10px] ${textSecondary}`}>{rule.sourceRef}</span>
                  )}
                </td>
                <td className={`px-3 py-2`}>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked={rule.enabled} className="sr-only peer" />
                    <div className="w-7 h-4 bg-gray-500 peer-checked:bg-[#4caf50] rounded-full peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all"></div>
                  </label>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    )
    
    return (
      <div className={`min-h-screen ${bgPrimary} flex`}>
        <Sidebar />
        <div className="flex-1 overflow-auto">
          <header className={`${bgSecondary} border-b ${borderColor} px-6 py-4`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <BookOpen className="h-8 w-8 text-[#00e5ff]" />
                <div>
                  <h1 className={`text-2xl font-bold ${textPrimary}`}>Rule Library</h1>
                  <p className={`text-sm ${textSecondary}`}>FIX protocol validation rules for specs, logs, and certification</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button 
                  variant={showSourceMaterials ? "default" : "outline"} 
                  onClick={() => setShowSourceMaterials(!showSourceMaterials)}
                  className={showSourceMaterials ? "bg-[#00e5ff] text-[#0a1628]" : ""}
                >
                  <FileText className="h-4 w-4 mr-2" /> Source Materials
                </Button>
                <Button variant="outline" onClick={() => setExpandedRuleSections(Object.fromEntries(ruleSections.map(s => [s.id, true])))}>
                  Expand All
                </Button>
                <Button variant="outline" onClick={() => setExpandedRuleSections(Object.fromEntries(ruleSections.map(s => [s.id, false])))}>
                  Collapse All
                </Button>
                <Button className="bg-[#4caf50] hover:bg-[#4caf50]/80">
                  <Plus className="h-4 w-4 mr-2" /> Add Rule
                </Button>
              </div>
            </div>
            {/* Filters Row */}
            <div className="flex items-center gap-3 flex-wrap">
              <Input 
                placeholder="Search rules..." 
                value={ruleSearch}
                onChange={(e) => setRuleSearch(e.target.value)}
                className={`w-56 ${isDarkMode ? "bg-[#0a1628] border-[#1e4976]" : ""}`} 
              />
              <div className="flex items-center gap-2">
                <span className={`text-xs ${textSecondary}`}>FIX Version:</span>
                <select 
                  value={ruleFixVersionFilter}
                  onChange={(e) => setRuleFixVersionFilter(e.target.value)}
                  className={`px-2 py-1.5 rounded border text-sm ${isDarkMode ? "bg-[#0a1628] border-[#1e4976] text-white" : "bg-white border-gray-300"}`}
                >
                  <option value="All">All Versions</option>
                  {allFixVersions.map(v => <option key={v} value={v}>{v}</option>)}
                </select>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs ${textSecondary}`}>Market:</span>
                <select 
                  value={ruleMarketFilter}
                  onChange={(e) => setRuleMarketFilter(e.target.value)}
                  className={`px-2 py-1.5 rounded border text-sm ${isDarkMode ? "bg-[#0a1628] border-[#1e4976] text-white" : "bg-white border-gray-300"}`}
                >
                  <option value="All">All Markets</option>
                  {allMarkets.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs ${textSecondary}`}>Severity:</span>
                <select 
                  value={ruleSeverityFilter}
                  onChange={(e) => setRuleSeverityFilter(e.target.value)}
                  className={`px-2 py-1.5 rounded border text-sm ${isDarkMode ? "bg-[#0a1628] border-[#1e4976] text-white" : "bg-white border-gray-300"}`}
                >
                  <option value="All">All Severities</option>
                  <option value="Error">Error</option>
                  <option value="Warning">Warning</option>
                  <option value="Info">Info</option>
                </select>
              </div>
              {hasActiveFilters && (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => { 
                    setRuleSearch(""); 
                    setRuleFixVersionFilter("All"); 
                    setRuleMarketFilter("All"); 
                    setRuleSeverityFilter("All"); 
                  }}
                >
                  Clear Filters
                </Button>
              )}
              <div className="flex-1" />
              <span className={`text-sm ${textSecondary}`}>{totalFilteredRules} of {ruleLibrary.length} rules</span>
            </div>
          </header>

          <div className="p-6">
            {/* Source Materials Panel */}
            {showSourceMaterials && (
              <Card className={`${bgCard} border ${borderColor} mb-6`}>
                <div className={`px-5 py-3 border-b ${borderColor} flex items-center justify-between`}>
                  <div className="flex items-center gap-3">
                    <Archive className="h-5 w-5 text-[#00e5ff]" />
                    <h3 className={`font-bold ${textPrimary}`}>Source Materials Library</h3>
                    <span className={`text-xs ${textSecondary}`}>({ruleSourceMaterials.length} documents)</span>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => setShowSourceMaterials(false)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <div className="p-4">
                  <div className="grid grid-cols-4 gap-3 mb-4">
                    {[
                      { type: "Standard", color: "#2196f3", count: ruleSourceMaterials.filter(s => s.type === "Standard").length },
                      { type: "Exchange", color: "#4caf50", count: ruleSourceMaterials.filter(s => s.type === "Exchange").length },
                      { type: "Library", color: "#9c27b0", count: ruleSourceMaterials.filter(s => s.type === "Library").length },
                      { type: "Regulatory", color: "#ff9800", count: ruleSourceMaterials.filter(s => s.type === "Regulatory").length },
                    ].map(cat => (
                      <div key={cat.type} className={`p-3 rounded-lg ${isDarkMode ? "bg-[#1e4976]/20" : "bg-gray-50"}`}>
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: cat.color }} />
                          <span className={`text-xs font-medium ${textSecondary}`}>{cat.type}</span>
                        </div>
                        <p className={`text-lg font-bold ${textPrimary}`}>{cat.count} docs</p>
                      </div>
                    ))}
                  </div>
                  <div className="overflow-x-auto max-h-64 overflow-y-auto">
                    <table className="w-full text-sm">
                      <thead className="sticky top-0">
                        <tr className={`border-b ${borderColor} ${isDarkMode ? "bg-[#0a1628]" : "bg-gray-50"}`}>
                          <th className={`px-3 py-2 text-left font-medium ${textSecondary} text-xs`}>ID</th>
                          <th className={`px-3 py-2 text-left font-medium ${textSecondary} text-xs`}>Document Name</th>
                          <th className={`px-3 py-2 text-left font-medium ${textSecondary} text-xs`}>Type</th>
                          <th className={`px-3 py-2 text-left font-medium ${textSecondary} text-xs`}>Format</th>
                          <th className={`px-3 py-2 text-left font-medium ${textSecondary} text-xs`}>Version</th>
                          <th className={`px-3 py-2 text-left font-medium ${textSecondary} text-xs`}>Publisher</th>
                          <th className={`px-3 py-2 text-left font-medium ${textSecondary} text-xs`}>Date</th>
                          <th className={`px-3 py-2 text-left font-medium ${textSecondary} text-xs`}>Size</th>
                          <th className={`px-3 py-2 text-left font-medium ${textSecondary} text-xs`}>Rules</th>
                        </tr>
                      </thead>
                      <tbody>
                        {ruleSourceMaterials.map(src => {
                          const ruleCount = ruleLibrary.filter(r => r.sourceRef === src.id).length
                          const typeColor = src.type === "Standard" ? "#2196f3" : src.type === "Exchange" ? "#4caf50" : src.type === "Library" ? "#9c27b0" : "#ff9800"
                          return (
                            <tr key={src.id} className={`border-b ${borderColor} hover:bg-[#1e4976]/10`}>
                              <td className={`px-3 py-2 font-mono text-[#00e5ff] text-xs`}>{src.id}</td>
                              <td className={`px-3 py-2`}>
                                <div className="flex items-center gap-2">
                                  <FileText className={`h-4 w-4 ${textSecondary}`} />
                                  <span className={`font-medium ${textPrimary} text-xs`}>{src.name}</span>
                                </div>
                              </td>
                              <td className={`px-3 py-2`}>
                                <span className="px-2 py-0.5 rounded text-xs" style={{ backgroundColor: `${typeColor}20`, color: typeColor }}>
                                  {src.type}
                                </span>
                              </td>
                              <td className={`px-3 py-2 ${textSecondary} text-xs`}>{src.format}</td>
                              <td className={`px-3 py-2 ${textSecondary} text-xs`}>{src.version}</td>
                              <td className={`px-3 py-2 ${textSecondary} text-xs`}>{src.publisher}</td>
                              <td className={`px-3 py-2 ${textSecondary} text-xs`}>{src.date}</td>
                              <td className={`px-3 py-2 ${textSecondary} text-xs`}>{src.size}</td>
                              <td className={`px-3 py-2`}>
                                <span className={`px-2 py-0.5 rounded text-xs ${isDarkMode ? "bg-[#1e4976]/50" : "bg-gray-100"} ${textSecondary}`}>
                                  {ruleCount} rules
                                </span>
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </Card>
            )}

            {/* Summary Stats */}
            <div className="grid grid-cols-6 gap-3 mb-6">
              {ruleSections.map((section) => {
                const totalRules = section.subsections.reduce((acc, sub) => acc + sub.rules.length, 0)
                const errorCount = section.subsections.reduce((acc, sub) => acc + sub.rules.filter(r => r.severity === "Error").length, 0)
                const SectionIcon = section.icon
                return (
                  <Card 
                    key={section.id} 
                    className={`${bgCard} border ${borderColor} p-3 cursor-pointer transition-all hover:border-[#00e5ff]/50`}
                    onClick={() => toggleSection(section.id)}
                  >
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded" style={{ backgroundColor: `${section.color}20` }}>
                        <SectionIcon className="h-4 w-4" style={{ color: section.color }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-lg font-bold ${textPrimary}`}>{totalRules}</p>
                        <p className={`text-[10px] ${textSecondary} truncate`}>{section.title.replace(" Rules", "")}</p>
                      </div>
                      <span className="text-[10px] text-[#f44336]">{errorCount} err</span>
                    </div>
                  </Card>
                )
              })}
            </div>

            {/* Severity Legend */}
            <Card className={`${bgCard} border ${borderColor} p-3 mb-6`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <span className={`text-sm font-medium ${textPrimary}`}>Severity:</span>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-xs bg-[#f44336]/20 text-[#f44336]">Error</span>
                    <span className={`text-xs ${textSecondary}`}>Reject/Session action</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-xs bg-[#ff9800]/20 text-[#ff9800]">Warning</span>
                    <span className={`text-xs ${textSecondary}`}>Alert only</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-xs bg-[#2196f3]/20 text-[#2196f3]">Info</span>
                    <span className={`text-xs ${textSecondary}`}>Diagnostic</span>
                  </div>
                </div>
                <span className={`text-sm ${textSecondary}`}>{totalFilteredRules} rules {ruleSearch && "matching search"}</span>
              </div>
            </Card>

            {/* Collapsible Rule Sections */}
            <div className="space-y-4">
              {filteredSections.map((section) => {
                const isExpanded = expandedRuleSections[section.id]
                const totalRules = section.subsections.reduce((acc, sub) => acc + sub.rules.length, 0)
                const SectionIcon = section.icon
                
                return (
                  <Card key={section.id} className={`${bgCard} border ${borderColor} overflow-hidden`}>
                    {/* Section Header */}
                    <button
                      onClick={() => toggleSection(section.id)}
                      className={`w-full px-5 py-4 flex items-center justify-between hover:bg-[#1e4976]/10 transition-colors`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-2 rounded-lg" style={{ backgroundColor: `${section.color}20` }}>
                          <SectionIcon className="h-5 w-5" style={{ color: section.color }} />
                        </div>
                        <div className="text-left">
                          <div className="flex items-center gap-3">
                            <h3 className={`font-bold ${textPrimary}`}>{section.title}</h3>
                            <span className={`text-xs px-2 py-0.5 rounded ${isDarkMode ? "bg-[#1e4976]/50" : "bg-gray-100"} ${textSecondary}`}>
                              {totalRules} rules
                            </span>
                          </div>
                          <p className={`text-xs ${textSecondary}`}>{section.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className={`text-xs ${textSecondary}`}>Source:</p>
                          <p className={`text-xs ${textPrimary}`}>{section.source}</p>
                        </div>
                        <ChevronDown className={`h-5 w-5 ${textSecondary} transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                      </div>
                    </button>

                    {/* Section Content */}
                    {isExpanded && (
                      <div className={`border-t ${borderColor}`}>
                        {section.subsections.map((subsection, idx) => (
                          <div key={subsection.id} className={idx > 0 ? `border-t ${borderColor}` : ""}>
                            <div className={`px-5 py-2 ${isDarkMode ? "bg-[#1e4976]/20" : "bg-gray-50"} flex items-center gap-2`}>
                              <ChevronRight className={`h-4 w-4 ${textSecondary}`} />
                              <span className={`text-sm font-medium ${textPrimary}`}>{subsection.title}</span>
                              <span className={`text-xs ${textSecondary}`}>({subsection.rules.length})</span>
                            </div>
                            <div className="overflow-x-auto">
                              <RuleTable rules={subsection.rules} />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </Card>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // AI Review Queue Screen
  if (currentScreen === "ai-review-queue") {
    // Group items by client, then by review type
    const clientGroups = aiReviewItems.reduce((acc, item) => {
      if (!acc[item.client]) acc[item.client] = {}
      if (!acc[item.client][item.reviewType]) acc[item.client][item.reviewType] = []
      acc[item.client][item.reviewType].push(item)
      return acc
    }, {} as Record<string, Record<string, typeof aiReviewItems>>)

    const reviewTypeIcons: Record<string, typeof FileText> = {
      "Spec Review": FileSearch,
      "ATDL Review": Code,
      "Log Analysis": ScrollText,
      "Test Scenario": TestTube,
    }
    
    const reviewTypeColors: Record<string, string> = {
      "Spec Review": "#2196f3",
      "ATDL Review": "#9c27b0",
      "Log Analysis": "#ff9800",
      "Test Scenario": "#4caf50",
    }

    const toggleClient = (client: string) => {
      setExpandedReviewClients(prev => ({ ...prev, [client]: !prev[client] }))
    }
    
    const toggleReviewType = (key: string) => {
      setExpandedReviewTypes(prev => ({ ...prev, [key]: !prev[key] }))
    }

    const pendingCount = aiReviewItems.filter(i => i.status === "pending").length
    const acceptedCount = aiReviewItems.filter(i => i.status === "accepted").length
    const rejectedCount = aiReviewItems.filter(i => i.status === "rejected").length
    const avgConfidence = Math.round(aiReviewItems.reduce((acc, i) => acc + i.confidence, 0) / aiReviewItems.length * 100)

    return (
      <div className={`min-h-screen ${bgPrimary} flex`}>
        <Sidebar />
        <div className="flex-1 overflow-auto">
          <header className={`${bgSecondary} border-b ${borderColor} px-6 py-4`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Brain className="h-8 w-8 text-[#00e5ff]" />
                <div>
                  <h1 className={`text-2xl font-bold ${textPrimary}`}>AI Review Queue</h1>
                  <p className={`text-sm ${textSecondary}`}>Human-in-the-loop review of AI findings grouped by client</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" onClick={() => {
                  const allClients = Object.keys(clientGroups)
                  setExpandedReviewClients(Object.fromEntries(allClients.map(c => [c, true])))
                  const allKeys = Object.entries(clientGroups).flatMap(([client, types]) => 
                    Object.keys(types).map(type => `${client}-${type}`)
                  )
                  setExpandedReviewTypes(Object.fromEntries(allKeys.map(k => [k, true])))
                }}>
                  Expand All
                </Button>
                <Button variant="outline" onClick={() => {
                  setExpandedReviewClients({})
                  setExpandedReviewTypes({})
                }}>
                  Collapse All
                </Button>
              </div>
            </div>
          </header>

          <div className="p-6">
            {/* Stats */}
            <div className="grid grid-cols-5 gap-4 mb-6">
              <Card className={`${bgCard} border ${borderColor} p-4`}>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-[#00e5ff]/20"><Building2 className="h-5 w-5 text-[#00e5ff]" /></div>
                  <div>
                    <p className={`text-2xl font-bold ${textPrimary}`}>{Object.keys(clientGroups).length}</p>
                    <p className={`text-xs ${textSecondary}`}>Clients</p>
                  </div>
                </div>
              </Card>
              <Card className={`${bgCard} border ${borderColor} p-4`}>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-[#ff9800]/20"><Clock className="h-5 w-5 text-[#ff9800]" /></div>
                  <div>
                    <p className={`text-2xl font-bold ${textPrimary}`}>{pendingCount}</p>
                    <p className={`text-xs ${textSecondary}`}>Pending</p>
                  </div>
                </div>
              </Card>
              <Card className={`${bgCard} border ${borderColor} p-4`}>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-[#4caf50]/20"><ThumbsUp className="h-5 w-5 text-[#4caf50]" /></div>
                  <div>
                    <p className={`text-2xl font-bold ${textPrimary}`}>{acceptedCount}</p>
                    <p className={`text-xs ${textSecondary}`}>Accepted</p>
                  </div>
                </div>
              </Card>
              <Card className={`${bgCard} border ${borderColor} p-4`}>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-[#f44336]/20"><ThumbsDown className="h-5 w-5 text-[#f44336]" /></div>
                  <div>
                    <p className={`text-2xl font-bold ${textPrimary}`}>{rejectedCount}</p>
                    <p className={`text-xs ${textSecondary}`}>Rejected</p>
                  </div>
                </div>
              </Card>
              <Card className={`${bgCard} border ${borderColor} p-4`}>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-[#2196f3]/20"><Target className="h-5 w-5 text-[#2196f3]" /></div>
                  <div>
                    <p className={`text-2xl font-bold ${textPrimary}`}>{avgConfidence}%</p>
                    <p className={`text-xs ${textSecondary}`}>Avg Confidence</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Client Sections */}
            <div className="space-y-4">
              {Object.entries(clientGroups).map(([client, reviewTypes]) => {
                const isClientExpanded = expandedReviewClients[client] !== false
                const clientPendingCount = Object.values(reviewTypes).flat().filter(i => i.status === "pending").length
                const totalItems = Object.values(reviewTypes).flat().length
                const clientCaseId = Object.values(reviewTypes).flat()[0]?.caseId
                
                return (
                  <Card key={client} className={`${bgCard} border ${borderColor} overflow-hidden`}>
                    {/* Client Header */}
                    <button
                      onClick={() => toggleClient(client)}
                      className={`w-full px-5 py-4 flex items-center justify-between hover:bg-[#1e4976]/10 transition-colors`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-2 rounded-lg bg-[#00e5ff]/20">
                          <Building2 className="h-5 w-5 text-[#00e5ff]" />
                        </div>
                        <div className="text-left">
                          <div className="flex items-center gap-3">
                            <h3 className={`font-bold ${textPrimary}`}>{client}</h3>
                            <span className={`font-mono text-xs ${textSecondary}`}>{clientCaseId}</span>
                            {clientPendingCount > 0 && (
                              <span className="px-2 py-0.5 rounded-full text-xs bg-[#ff9800]/20 text-[#ff9800]">
                                {clientPendingCount} pending
                              </span>
                            )}
                          </div>
                          <p className={`text-xs ${textSecondary}`}>{totalItems} total findings across {Object.keys(reviewTypes).length} review types</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        {/* Review type badges */}
                        <div className="flex gap-2">
                          {Object.entries(reviewTypes).map(([type, items]) => (
                            <span 
                              key={type} 
                              className="px-2 py-0.5 rounded text-xs"
                              style={{ backgroundColor: `${reviewTypeColors[type] || "#666"}20`, color: reviewTypeColors[type] || "#666" }}
                            >
                              {type.replace(" Review", "")}: {items.filter(i => i.status === "pending").length}
                            </span>
                          ))}
                        </div>
                        <ChevronDown className={`h-5 w-5 ${textSecondary} transition-transform ${isClientExpanded ? "rotate-180" : ""}`} />
                      </div>
                    </button>

                    {/* Client Content - Review Type Sections */}
                    {isClientExpanded && (
                      <div className={`${isDarkMode ? "bg-[#0a1628]" : "bg-white"}`}>
                        {Object.entries(reviewTypes).map(([reviewType, items]) => {
                          const typeKey = `${client}-${reviewType}`
                          const isTypeExpanded = expandedReviewTypes[typeKey] !== false
                          const TypeIcon = reviewTypeIcons[reviewType] || FileText
                          const typeColor = reviewTypeColors[reviewType] || "#666"
                          const typePendingCount = items.filter(i => i.status === "pending").length
                          
                          return (
                            <div key={reviewType} className={`border-t-2 ${borderColor}`}>
                              {/* Review Type Header */}
                              <button
                                onClick={() => toggleReviewType(typeKey)}
                                className={`w-full px-5 py-4 flex items-center justify-between transition-all ${isDarkMode ? "bg-[#1e4976]/50 hover:bg-[#1e4976]/70" : "bg-gray-100 hover:bg-gray-150"}`}
                              >
                                <div className="flex items-center gap-3">
                                  <div className="p-1.5 rounded" style={{ backgroundColor: `${typeColor}20` }}>
                                    <TypeIcon className="h-4 w-4" style={{ color: typeColor }} />
                                  </div>
                                  <span className={`font-semibold text-sm ${textPrimary}`}>{reviewType}</span>
                                  <span className={`text-xs ${textSecondary}`}>({items.length})</span>
                                  {typePendingCount > 0 && (
                                    <span className="px-1.5 py-0.5 rounded text-[10px] bg-[#ff9800]/20 text-[#ff9800] font-medium">
                                      {typePendingCount} pending
                                    </span>
                                  )}
                                </div>
                                <ChevronRight className={`h-5 w-5 ${textSecondary} transition-transform ${isTypeExpanded ? "rotate-90" : ""}`} />
                              </button>

                              {/* Review Items */}
                              {isTypeExpanded && (
                                <div className={`divide-y ${isDarkMode ? "divide-[#1e4976]/40 bg-[#0f1e2e]" : "divide-gray-200 bg-gray-50"}`}>
                                  {items.map((item) => (
                                    <div key={item.id} className={`px-5 py-4 ${item.status !== "pending" ? "opacity-65" : ""}`}>
                                      <div className="flex items-start justify-between gap-4">
                                        <div className="flex items-start gap-3 flex-1 min-w-0">
                                          <div className={`p-2 rounded-lg flex-shrink-0 ${
                                            item.severity === "High" ? "bg-[#f44336]/20" :
                                            item.severity === "Medium" ? "bg-[#ff9800]/20" :
                                            item.severity === "Low" ? "bg-[#2196f3]/20" :
                                            "bg-[#4caf50]/20"
                                          }`}>
                                            <Brain className={`h-4 w-4 ${
                                              item.severity === "High" ? "text-[#f44336]" :
                                              item.severity === "Medium" ? "text-[#ff9800]" :
                                              item.severity === "Low" ? "text-[#2196f3]" :
                                              "text-[#4caf50]"
                                            }`} />
                                          </div>
                                          <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-2 flex-wrap">
                                              <span className={`font-mono text-xs ${textSecondary} flex-shrink-0`}>{item.id}</span>
                                              <span className={`px-2 py-0.5 rounded text-xs font-medium flex-shrink-0 ${
                                                item.severity === "High" ? "bg-[#f44336]/20 text-[#f44336]" :
                                                item.severity === "Medium" ? "bg-[#ff9800]/20 text-[#ff9800]" :
                                                item.severity === "Low" ? "bg-[#2196f3]/20 text-[#2196f3]" :
                                                "bg-[#4caf50]/20 text-[#4caf50]"
                                              }`}>
                                                {item.severity}
                                              </span>
                                              {item.status !== "pending" && (
                                                <span className={`px-2 py-0.5 rounded text-xs font-medium flex-shrink-0 ${
                                                  item.status === "accepted" ? "bg-[#4caf50]/20 text-[#4caf50]" : "bg-[#f44336]/20 text-[#f44336]"
                                                }`}>
                                                  {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                                                </span>
                                              )}
                                              <span className={`text-xs ${textSecondary} flex-shrink-0`}>{item.createdDate}</span>
                                            </div>
                                            <p className={`text-sm ${textPrimary} mb-2.5 font-medium leading-snug`}>{item.finding}</p>
                                            <div className={`p-2.5 rounded-md border ${isDarkMode ? "bg-[#0a1628]/60 border-[#1e4976]/60" : "bg-white border-gray-200"}`}>
                                              <p className={`text-xs ${textSecondary} leading-relaxed`}>
                                                <span className="font-semibold text-[#00e5ff]">Reasoning:</span> {item.aiReason}
                                              </p>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="flex flex-col items-end gap-3 flex-shrink-0">
                                          <div className="text-center">
                                            <span className={`text-xs ${textSecondary} block`}>Confidence</span>
                                            <p className={`text-lg font-bold ${item.confidence >= 0.8 ? "text-[#4caf50]" : item.confidence >= 0.6 ? "text-[#ff9800]" : "text-[#f44336]"}`}>
                                              {Math.round(item.confidence * 100)}%
                                            </p>
                                          </div>
                                          {item.status === "pending" && (
                                            <div className="flex gap-1.5">
                                              <Button variant="outline" size="sm" className="h-8 px-2 text-xs">
                                                <Eye className="h-3.5 w-3.5" />
                                              </Button>
                                              <Button variant="outline" size="sm" className="h-8 px-2 text-[#f44336] border-[#f44336]/40 hover:bg-[#f44336]/10">
                                                <ThumbsDown className="h-3.5 w-3.5" />
                                              </Button>
                                              <Button size="sm" className="h-8 px-2 bg-[#4caf50] hover:bg-[#4caf50]/80 text-white">
                                                <ThumbsUp className="h-3.5 w-3.5" />
                                              </Button>
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          )
                        })}
                      </div>
                    )}
                  </Card>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // SLA Analytics Dashboard
  if (currentScreen === "sla-analytics") {
    return (
      <div className={`min-h-screen ${bgPrimary} flex`}>
        <Sidebar />
        <div className="flex-1 overflow-auto">
          <header className={`${bgSecondary} border-b ${borderColor} px-6 py-4`}>
            <div className="flex items-center gap-3">
              <Gauge className="h-8 w-8 text-[#00e5ff]" />
              <div>
                <h1 className={`text-2xl font-bold ${textPrimary}`}>SLA Analytics</h1>
                <p className={`text-sm ${textSecondary}`}>Operational intelligence and delivery metrics</p>
              </div>
            </div>
          </header>

          <div className="p-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-4 gap-4 mb-6">
              <Card className={`${bgCard} border ${borderColor} p-6`}>
                <div className="flex items-center justify-between mb-2">
                  <p className={`text-sm ${textSecondary}`}>Avg Time to Onboard</p>
                  <Timer className="h-5 w-5 text-[#00e5ff]" />
                </div>
                <p className={`text-3xl font-bold ${textPrimary}`}>{slaMetrics.avgTimeToOnboard} <span className="text-lg font-normal">days</span></p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className={`h-4 w-4 ${slaMetrics.avgTimeToOnboardTrend < 0 ? "text-[#4caf50]" : "text-[#f44336]"}`} />
                  <span className={`text-sm ${slaMetrics.avgTimeToOnboardTrend < 0 ? "text-[#4caf50]" : "text-[#f44336]"}`}>
                    {slaMetrics.avgTimeToOnboardTrend}% vs last quarter
                  </span>
                </div>
              </Card>
              <Card className={`${bgCard} border ${borderColor} p-6`}>
                <div className="flex items-center justify-between mb-2">
                  <p className={`text-sm ${textSecondary}`}>Certification Readiness</p>
                  <Target className="h-5 w-5 text-[#4caf50]" />
                </div>
                <p className={`text-3xl font-bold ${textPrimary}`}>{slaMetrics.certReadinessScore}%</p>
                <div className={`w-full h-2 rounded-full ${isDarkMode ? "bg-[#1e4976]/50" : "bg-gray-200"} overflow-hidden mt-3`}>
                  <div className="h-full bg-[#4caf50]" style={{ width: `${slaMetrics.certReadinessScore}%` }} />
                </div>
              </Card>
              <Card className={`${bgCard} border ${borderColor} p-6`}>
                <div className="flex items-center justify-between mb-2">
                  <p className={`text-sm ${textSecondary}`}>Defect Leakage</p>
                  <AlertOctagon className="h-5 w-5 text-[#ff9800]" />
                </div>
                <p className={`text-3xl font-bold ${textPrimary}`}>{slaMetrics.defectLeakage}%</p>
                <p className={`text-xs ${textSecondary} mt-2`}>Target: &lt;5%</p>
              </Card>
              <Card className={`${bgCard} border ${borderColor} p-6`}>
                <div className="flex items-center justify-between mb-2">
                  <p className={`text-sm ${textSecondary}`}>Reopen Rate</p>
                  <RefreshCw className="h-5 w-5 text-[#f44336]" />
                </div>
                <p className={`text-3xl font-bold ${textPrimary}`}>{slaMetrics.reopenRate}%</p>
                <p className={`text-xs ${textSecondary} mt-2`}>Target: &lt;10%</p>
              </Card>
            </div>

            {/* Status Distribution */}
            <div className="grid grid-cols-2 gap-6 mb-6">
              <Card className={`${bgCard} border ${borderColor} p-6`}>
                <h3 className={`font-bold ${textPrimary} mb-4`}>Case Status Distribution</h3>
                <div className="flex items-center gap-4">
                  <div className="relative w-32 h-32">
                    <svg viewBox="0 0 36 36" className="w-full h-full">
                      <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#4caf50" strokeWidth="3" strokeDasharray={`${slaMetrics.onTrackPercentage}, 100`} />
                      <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#ff9800" strokeWidth="3" strokeDasharray={`${slaMetrics.atRiskPercentage}, 100`} strokeDashoffset={`-${slaMetrics.onTrackPercentage}`} />
                      <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#f44336" strokeWidth="3" strokeDasharray={`${slaMetrics.blockedPercentage}, 100`} strokeDashoffset={`-${slaMetrics.onTrackPercentage + slaMetrics.atRiskPercentage}`} />
                    </svg>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-[#4caf50]" />
                      <span className={textSecondary}>On Track</span>
                      <span className={`font-bold ${textPrimary}`}>{slaMetrics.onTrackPercentage}%</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-[#ff9800]" />
                      <span className={textSecondary}>At Risk</span>
                      <span className={`font-bold ${textPrimary}`}>{slaMetrics.atRiskPercentage}%</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-[#f44336]" />
                      <span className={textSecondary}>Blocked</span>
                      <span className={`font-bold ${textPrimary}`}>{slaMetrics.blockedPercentage}%</span>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className={`${bgCard} border ${borderColor} p-6`}>
                <h3 className={`font-bold ${textPrimary} mb-4`}>Stage Aging (Days)</h3>
                <div className="space-y-3">
                  {[
                    { stage: "Setup", avg: 3, target: 5 },
                    { stage: "Spec Analysis", avg: 8, target: 10 },
                    { stage: "Connectivity", avg: 12, target: 7 },
                    { stage: "Testing", avg: 10, target: 14 },
                    { stage: "Certification", avg: 5, target: 7 },
                  ].map((s, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className={`text-sm ${textSecondary} w-28`}>{s.stage}</span>
                      <div className={`flex-1 h-4 rounded ${isDarkMode ? "bg-[#1e4976]/30" : "bg-gray-200"} overflow-hidden`}>
                        <div 
                          className={`h-full ${s.avg <= s.target ? "bg-[#4caf50]" : "bg-[#f44336]"}`}
                          style={{ width: `${Math.min((s.avg / 20) * 100, 100)}%` }}
                        />
                      </div>
                      <span className={`text-sm font-medium w-16 ${s.avg <= s.target ? "text-[#4caf50]" : "text-[#f44336]"}`}>
                        {s.avg}d / {s.target}d
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* SLA Breach Forecast */}
            <Card className={`${bgCard} border ${borderColor} p-6`}>
              <h3 className={`font-bold ${textPrimary} mb-4`}>Upcoming SLA Deadlines</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className={`border-b ${borderColor}`}>
                      <th className={`px-4 py-2 text-left font-semibold ${textPrimary}`}>Case</th>
                      <th className={`px-4 py-2 text-left font-semibold ${textPrimary}`}>Client</th>
                      <th className={`px-4 py-2 text-left font-semibold ${textPrimary}`}>Current Stage</th>
                      <th className={`px-4 py-2 text-left font-semibold ${textPrimary}`}>SLA Date</th>
                      <th className={`px-4 py-2 text-left font-semibold ${textPrimary}`}>Days Remaining</th>
                      <th className={`px-4 py-2 text-left font-semibold ${textPrimary}`}>Risk</th>
                    </tr>
                  </thead>
                  <tbody>
                    {onboardingCases.slice(0, 4).map((c, i) => {
                      const daysRemaining = [6, 2, 45, 4][i]
                      return (
                        <tr key={c.id} className={`border-b ${borderColor}`}>
                          <td className={`px-4 py-3 font-mono text-[#00e5ff]`}>{c.id}</td>
                          <td className={`px-4 py-3 ${textPrimary}`}>{c.client}</td>
                          <td className={`px-4 py-3 ${textSecondary}`}>{c.stageLabel}</td>
                          <td className={`px-4 py-3 ${textSecondary}`}>{c.slaDate}</td>
                          <td className={`px-4 py-3`}>
                            <span className={`font-bold ${daysRemaining <= 3 ? "text-[#f44336]" : daysRemaining <= 7 ? "text-[#ff9800]" : "text-[#4caf50]"}`}>
                              {daysRemaining} days
                            </span>
                          </td>
                          <td className={`px-4 py-3`}>
                            <span className={`px-2 py-1 rounded text-xs ${
                              daysRemaining <= 3 ? "bg-[#f44336]/20 text-[#f44336]" :
                              daysRemaining <= 7 ? "bg-[#ff9800]/20 text-[#ff9800]" :
                              "bg-[#4caf50]/20 text-[#4caf50]"
                            }`}>
                              {daysRemaining <= 3 ? "Critical" : daysRemaining <= 7 ? "Warning" : "On Track"}
                            </span>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  // Fallback - no matching screen found
  return (
    <div className="min-h-screen bg-[#0a1628] flex items-center justify-center">
      <div className="text-center">
        <p className="text-white text-lg mb-4">Screen not found: {currentScreen}</p>
        <Button onClick={() => setCurrentScreen("dashboard")}>Return to Dashboard</Button>
      </div>
    </div>
  )
}
