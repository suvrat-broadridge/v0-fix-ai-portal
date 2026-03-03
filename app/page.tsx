"use client"

import { useState } from "react"
import { Shield, Building2, Sun, Moon, Users, LayoutDashboard, Settings, HelpCircle, LogOut, ChevronLeft, ChevronRight, FileText, Activity, Zap, CheckCircle, AlertTriangle, Clock, Upload, Play, ArrowLeft, Bell, GitCompare, FileSearch, TestTube, Award, Cog, X, Plus, ChevronDown, Wrench, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function BCometPlatform() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [currentScreen, setCurrentScreen] = useState<"home" | "role-select" | "login" | "dashboard" | "clients" | "client-detail" | "asset-tools" | "spec-compare" | "log-analysis" | "scenario-creation" | "test-case-gen" | "certification-gen" | "settings" | "admin-specs">("home")
  const [settingsTab, setSettingsTab] = useState<"look-feel" | "general" | "security" | "mail" | "questionnaires" | "license">("general")
  const [selectedRole, setSelectedRole] = useState<"admin" | "client" | null>(null)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [selectedClient, setSelectedClient] = useState<any>(null)
  const [selectedAssetClass, setSelectedAssetClass] = useState<string | null>(null)
  const [showSpecResults, setShowSpecResults] = useState(false)
  const [showLogResults, setShowLogResults] = useState(false)
  const [showScenarioResults, setShowScenarioResults] = useState(false)
  const [showTestCaseResults, setShowTestCaseResults] = useState(false)
  const [showCertResults, setShowCertResults] = useState(false)
  const [scenarioFilter, setScenarioFilter] = useState<string>("all")
  const [showAddClientModal, setShowAddClientModal] = useState(false)
  const [newClient, setNewClient] = useState({ name: "", jira: "", accountManager: "", assetClasses: [] as string[] })
  const [isAdHocMode, setIsAdHocMode] = useState(false)
  const [toolsExpanded, setToolsExpanded] = useState(false)
  const [adminSpecsExpanded, setAdminSpecsExpanded] = useState(false)
  const [regTestSuiteGenerated, setRegTestSuiteGenerated] = useState(false)
  const [certSuiteGenerated, setCertSuiteGenerated] = useState(false)
  const [showContactPanel, setShowContactPanel] = useState(false)
  const [showDemoForm, setShowDemoForm] = useState(false)
  const [demoFormData, setDemoFormData] = useState({
    name: "",
    email: "",
    company: "",
    clientType: "",
    functionality: [] as string[],
    hostingPreference: "",
    message: ""
  })

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
      id: 1, name: "Goldman Sachs", jira: "GS-001", accountManager: "John Smith", 
      assetClasses: [
        { name: "Equities", specCompare: "completed", logAnalysis: "error", scenario: "in-progress", testCase: "completed", certification: "not-started", config: "completed", alerts: 2 },
        { name: "Options", specCompare: "completed", logAnalysis: "completed", scenario: "completed", testCase: "in-progress", certification: "not-started", config: "completed", alerts: 1 },
      ]
    },
    { 
      id: 2, name: "Morgan Stanley", jira: "MS-002", accountManager: "Jane Doe", 
      assetClasses: [
        { name: "Fixed Income", specCompare: "completed", logAnalysis: "completed", scenario: "completed", testCase: "in-progress", certification: "not-started", config: "completed", alerts: 0 },
      ]
    },
    { 
      id: 3, name: "JP Morgan", jira: "JPM-003", accountManager: "Bob Wilson", 
      assetClasses: [
        { name: "Futures", specCompare: "in-progress", logAnalysis: "not-started", scenario: "not-started", testCase: "not-started", certification: "not-started", config: "in-progress", alerts: 3 },
        { name: "FX", specCompare: "completed", logAnalysis: "in-progress", scenario: "not-started", testCase: "not-started", certification: "not-started", config: "completed", alerts: 2 },
      ]
    },
    { 
      id: 4, name: "Citadel", jira: "CIT-004", accountManager: "Alice Brown", 
      assetClasses: [
        { name: "Equities", specCompare: "completed", logAnalysis: "completed", scenario: "completed", testCase: "completed", certification: "in-progress", config: "completed", alerts: 1 },
      ]
    },
    { 
      id: 5, name: "Two Sigma", jira: "TS-005", accountManager: "Charlie Davis", 
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

  const handleAddClient = () => {
    if (newClient.name && newClient.jira && newClient.accountManager && newClient.assetClasses.length > 0) {
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
      setNewClient({ name: "", jira: "", accountManager: "", assetClasses: [] })
      setShowAddClientModal(false)
    }
  }

  const toggleAssetClass = (assetClass: string) => {
    setNewClient(prev => ({
      ...prev,
      assetClasses: prev.assetClasses.includes(assetClass)
        ? prev.assetClasses.filter(ac => ac !== assetClass)
        : [...prev.assetClasses, assetClass]
    }))
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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className={`${bgCard} p-6 w-full max-w-md border ${borderColor}`}>
        <div className="flex items-center justify-between mb-6">
          <h2 className={`text-xl font-bold ${textPrimary}`}>Add New Client</h2>
          <button onClick={() => setShowAddClientModal(false)} className={`p-1 rounded hover:bg-[#1e4976]/50 ${textSecondary}`}>
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className={`text-sm font-medium ${textPrimary}`}>Client Name</label>
            <Input 
              placeholder="Enter client name" 
              className={`mt-1 ${isDarkMode ? "bg-[#0a1628] border-[#1e4976] text-white placeholder:text-[#64748b]" : "bg-white border-[#e2e8f0] text-[#0a1628]"}`}
              value={newClient.name}
              onChange={(e) => setNewClient(prev => ({ ...prev, name: e.target.value }))}
            />
          </div>
          <div>
            <label className={`text-sm font-medium ${textPrimary}`}>JIRA ID</label>
            <Input 
              placeholder="e.g., CLIENT-001" 
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
          <div>
            <label className={`text-sm font-medium ${textPrimary}`}>Asset Classes (select multiple)</label>
            <div className="mt-2 flex flex-wrap gap-2">
              {assetClassesList.map((ac) => (
                <button
                  key={ac}
                  type="button"
                  onClick={() => toggleAssetClass(ac)}
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
            {newClient.assetClasses.length > 0 && (
              <p className={`mt-2 text-xs ${textSecondary}`}>
                Selected: {newClient.assetClasses.join(", ")}
              </p>
            )}
          </div>
          
          <div className="flex gap-3 pt-4">
            <Button variant="outline" className="flex-1" onClick={() => setShowAddClientModal(false)}>
              Cancel
            </Button>
            <Button className="flex-1" onClick={handleAddClient}>
              Add Client
            </Button>
          </div>
        </div>
      </Card>
    </div>
  ) : null

  // Sidebar Component with Tools
  const Sidebar = () => (
    <div className={`${sidebarCollapsed ? "w-16" : "w-64"} h-screen ${bgSecondary} border-r ${borderColor} flex flex-col transition-all duration-300`}>
      <div className={`p-4 border-b ${borderColor} flex items-center ${sidebarCollapsed ? "justify-center" : "justify-between"}`}>
        {!sidebarCollapsed && (
          <div className="flex items-center gap-2">
            <CometLogo size={32} />
            <span className={`font-bold ${textPrimary}`}>B-COMET</span>
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
  ].filter(item => item.roles.includes(selectedRole || "")).map((item) => (
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
  {!sidebarCollapsed && <span>{item.label}</span>}
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
  { icon: GitCompare, label: "Spec Compare", screen: "spec-compare", roles: ["admin", "client"] },
  { icon: FileSearch, label: "Log Analysis", screen: "log-analysis", roles: ["admin", "client"] },
  { icon: Activity, label: "Scenario Creation", screen: "scenario-creation", roles: ["admin"] },
  ].filter(item => item.roles.includes(selectedRole || "")).map((item) => (
  <button
  key={item.label}
  onClick={() => { setCurrentScreen(item.screen as any); setIsAdHocMode(true); setSelectedClient(null); setSelectedAssetClass(null); }}
  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-sm ${
  currentScreen === item.screen && isAdHocMode
  ? "bg-[#00e5ff]/10 text-[#00e5ff]"
  : `${textSecondary} hover:bg-[#1e4976]/30`
  }`}
  >
  <item.icon className="h-4 w-4" />
  <span>{item.label}</span>
  </button>
  ))}
  
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
  <span>Reg Test Cases</span>
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
  <span>Cert Test Cases</span>
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
              {/* Animated Comet that travels across and stops at end of B-COMET text */}
              <div className="relative inline-flex items-center">
                {/* The comet - starts left, travels to end of text, stays there */}
                <div className="absolute top-1/2 -translate-y-1/2 left-[-80px] animate-[cometTravel_2s_ease-out_forwards] z-0">
                  <CometLogo size={24} />
                </div>
                {/* Text on top */}
                <span className={`text-xl font-bold ${textPrimary} relative z-10 animate-[letterGlow_2s_ease-out_forwards]`}>
                  B-COMET
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
                <span className={`font-medium ${isDarkMode ? "text-[#00e5ff]" : "text-[#0a1628]"}`}>B-COMET FIX AI Platform</span>
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
        
        <h2 className={`text-2xl font-bold mb-2 ${textPrimary}`}>Get Started with B-COMET</h2>
        <p className={`${textSecondary} mb-6`}>Contact our team to learn more about B-COMET platform</p>
        
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
                href={`mailto:${person.email}?subject=B-COMET Platform Inquiry`}
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
            <span className={`text-2xl font-bold ${textPrimary}`}>B-COMET</span>
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
            <span className={`text-xl font-bold ${textPrimary}`}>B-COMET</span>
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
    // For client role, show "My Progress" with their own asset classes
    if (selectedRole === "client") {
      const myAssetClasses = [
        { name: "Equities", protocol: "FIX 4.4", specCompare: "complete", logAnalysis: "in-progress", alerts: 2 },
        { name: "Options", protocol: "FIX 4.4", specCompare: "complete", logAnalysis: "complete", alerts: 0 },
        { name: "Futures", protocol: "FIX 5.0 SP2", specCompare: "in-progress", logAnalysis: "pending", alerts: 1 },
      ]
      
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
                      <div className="grid grid-cols-2 gap-4">
                        <div className={`p-4 rounded-lg border ${borderColor}`}>
                          <div className="flex items-center justify-between mb-2">
                            <span className={`text-sm font-medium ${textPrimary}`}>Spec Compare</span>
                            {getStatusBadge(asset.specCompare)}
                          </div>
                          <div className={`h-2 rounded-full ${isDarkMode ? "bg-[#1e4976]" : "bg-[#e2e8f0]"}`}>
                            <div 
                              className={`h-full rounded-full ${asset.specCompare === "complete" ? "bg-[#4caf50]" : asset.specCompare === "in-progress" ? "bg-[#2196f3]" : "bg-[#9e9e9e]"}`}
                              style={{ width: asset.specCompare === "complete" ? "100%" : asset.specCompare === "in-progress" ? "60%" : "0%" }}
                            />
                          </div>
                        </div>
                        <div className={`p-4 rounded-lg border ${borderColor}`}>
                          <div className="flex items-center justify-between mb-2">
                            <span className={`text-sm font-medium ${textPrimary}`}>Log Analysis</span>
                            {getStatusBadge(asset.logAnalysis)}
                          </div>
                          <div className={`h-2 rounded-full ${isDarkMode ? "bg-[#1e4976]" : "bg-[#e2e8f0]"}`}>
                            <div 
                              className={`h-full rounded-full ${asset.logAnalysis === "complete" ? "bg-[#4caf50]" : asset.logAnalysis === "in-progress" ? "bg-[#2196f3]" : "bg-[#9e9e9e]"}`}
                              style={{ width: asset.logAnalysis === "complete" ? "100%" : asset.logAnalysis === "in-progress" ? "60%" : "0%" }}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 flex gap-3">
                        <Button variant="outline" size="sm" onClick={() => setCurrentScreen("spec-compare")}>
                          <GitCompare className="h-4 w-4 mr-2" /> Run Spec Compare
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => setCurrentScreen("log-analysis")}>
                          <FileSearch className="h-4 w-4 mr-2" /> Run Log Analysis
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
    
    // Admin dashboard - show all clients
    return (
      <div className={`min-h-screen ${bgPrimary} flex`}>
        <Sidebar />
        {addClientModalJSX}
        
        <div className="flex-1 overflow-auto">
          <header className={`${bgSecondary} border-b ${borderColor} px-6 py-4 flex items-center justify-between`}>
            <h1 className={`text-xl font-bold ${textPrimary}`}>Dashboard</h1>
            <div className="flex items-center gap-4">
              <Button onClick={() => setShowAddClientModal(true)}><Plus className="h-4 w-4 mr-2" /> Add Client</Button>
              <button className={`p-2 rounded-lg ${textSecondary} hover:bg-[#1e4976]/30 relative`}>
                <Bell className="h-5 w-5" />
              </button>
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
                      <th className={`px-4 py-3 text-center text-sm font-medium ${textPrimary}`}>VeriFIX</th>
                      <th className={`px-4 py-3 text-center text-sm font-medium ${textPrimary}`}>Conductor</th>
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
    return (
      <div className={`min-h-screen ${bgPrimary} flex`}>
        <Sidebar />
        <div className="flex-1 overflow-auto">
          <header className={`${bgSecondary} border-b ${borderColor} px-6 py-4`}>
            <button onClick={() => setCurrentScreen("dashboard")} className={`flex items-center gap-2 mb-2 ${textSecondary} hover:text-[#00e5ff]`}>
              <ArrowLeft className="h-4 w-4" /> Back to Dashboard
            </button>
            <h1 className={`text-2xl font-bold ${textPrimary}`}>{selectedClient.name}</h1>
            <p className={textSecondary}>JIRA: {selectedClient.jira} | Manager: {selectedClient.accountManager}</p>
          </header>

          <div className="p-6">
            <h2 className={`text-lg font-bold mb-4 ${textPrimary}`}>Asset Classes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {selectedClient.assetClasses.map((ac: any, i: number) => (
                <Card 
                  key={i} 
                  className={`${bgCard} p-6 border ${borderColor} cursor-pointer hover:border-[#00e5ff] transition-colors`}
                  onClick={() => { setSelectedAssetClass(ac.name); setCurrentScreen("asset-tools"); }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className={`text-lg font-bold ${textPrimary}`}>{ac.name}</h3>
                    {ac.alerts > 0 && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-[#f44336]/20 text-[#f44336] text-xs">
                        <Bell className="h-3 w-3" /> {ac.alerts}
                      </span>
                    )}
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between"><span className={textSecondary}>Spec Compare</span>{getStatusBadge(ac.specCompare)}</div>
                    <div className="flex justify-between"><span className={textSecondary}>Log Analysis</span>{getStatusBadge(ac.logAnalysis)}</div>
                    <div className="flex justify-between"><span className={textSecondary}>Scenarios</span>{getStatusBadge(ac.scenario)}</div>
                    <div className="flex justify-between"><span className={textSecondary}>Reg Test Cases</span>{getStatusBadge(ac.testCase)}</div>
                    <div className="flex justify-between"><span className={textSecondary}>Cert Test Cases</span>{getStatusBadge(ac.certification)}</div>
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
                  onClick={() => { setCurrentScreen(tool.screen as any); setIsAdHocMode(false); }}
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
    return (
      <div className={`min-h-screen ${bgPrimary} flex`}>
        <Sidebar />
        <div className="flex-1 overflow-auto">
          <header className={`${bgSecondary} border-b ${borderColor} px-6 py-4`}>
            <button onClick={() => isAdHocMode ? setCurrentScreen("dashboard") : setCurrentScreen("asset-tools")} className={`flex items-center gap-2 mb-2 ${textSecondary} hover:text-[#00e5ff]`}>
              <ArrowLeft className="h-4 w-4" /> Back
            </button>
            <h1 className={`text-2xl font-bold ${textPrimary}`}>Spec Comparison {isAdHocMode && "(Ad-hoc)"}</h1>
          </header>

          <div className="p-6">
  <Card className={`${bgCard} p-6 border ${borderColor} mb-6`}>
  <h3 className={`text-lg font-bold mb-4 ${textPrimary}`}>Upload Specifications</h3>
  <div className="grid grid-cols-2 gap-6">
  <label className={`border-2 border-dashed ${borderColor} rounded-lg p-6 text-center hover:border-[#00e5ff] cursor-pointer transition-colors`}>
  <input type="file" className="hidden" accept=".xml,.txt,.csv" onChange={(e) => console.log("Client spec:", e.target.files?.[0]?.name)} />
  <Upload className={`h-10 w-10 mx-auto mb-3 ${textSecondary}`} />
  <p className={`font-medium ${textPrimary}`}>Client Spec</p>
  <p className={`text-xs mt-1 ${textSecondary}`}>Click to browse</p>
  </label>
  
  {/* Admin can upload, Client selects from existing */}
  {selectedRole === "admin" ? (
  <label className={`border-2 border-dashed ${borderColor} rounded-lg p-6 text-center hover:border-[#00e5ff] cursor-pointer transition-colors`}>
  <input type="file" className="hidden" accept=".xml,.txt,.csv" onChange={(e) => console.log("Admin spec:", e.target.files?.[0]?.name)} />
  <Upload className={`h-10 w-10 mx-auto mb-3 ${textSecondary}`} />
  <p className={`font-medium ${textPrimary}`}>Admin Spec</p>
  <p className={`text-xs mt-1 ${textSecondary}`}>Click to browse</p>
  </label>
  ) : (
  <div className={`border-2 ${borderColor} rounded-lg p-6`}>
  <FileText className={`h-10 w-10 mx-auto mb-3 ${textSecondary}`} />
  <p className={`font-medium ${textPrimary} text-center mb-3`}>Select Admin Spec</p>
  <select className={`w-full p-2 rounded border ${borderColor} ${isDarkMode ? "bg-[#0a1628] text-white" : "bg-white text-[#0a1628]"}`}>
  <option value="">Choose a spec...</option>
  <option value="eq-42">Equities - FIX 4.2 v1.2</option>
  <option value="eq-44">Equities - FIX 4.4 v2.1</option>
  <option value="opt-44">Options - FIX 4.4 v2.0</option>
  <option value="fut-50">Futures - FIX 5.0 SP2 v2.0</option>
  <option value="fi-44">Fixed Income - FIX 4.4 v1.2</option>
  <option value="fx-50">FX - FIX 5.0 SP2 v1.1</option>
  </select>
  </div>
  )}
  </div>
  <div className="mt-6 flex justify-center gap-4">
  <Button variant="outline"><Download className="h-4 w-4 mr-2" /> Download Sample Spec</Button>
  <Button onClick={() => setShowSpecResults(true)}><Play className="h-4 w-4 mr-2" /> Run Sample Comparison</Button>
  </div>
  </Card>

            {showSpecResults && (
              <Card className={`${bgCard} p-6 border ${borderColor}`}>
                <h2 className={`text-xl font-bold mb-6 ${textPrimary}`}>Comparison Results</h2>
                
                <div className="grid grid-cols-2 gap-6">
                  <div><h3 className={`font-bold text-[#00e5ff] mb-2`}>Client Spec</h3></div>
                  <div><h3 className={`font-bold text-[#00e5ff] mb-2`}>Admin Spec</h3></div>
                </div>

                {[
                  { title: "Undefined Message Types", left: "35=K, 35=H undefined", right: "35=DF, 35=L undefined" },
                  { title: "Unsupported Tags", left: "35=D: tags 375, 943\n35=G: tags 524, 133", right: "35=D: tags 111, 6454\n35=8: tags 5124, 1331" },
                  { title: "Unsupported Tag Values", left: "123=4, 7, 9\n56=24, 56, gh", right: "123=12, 55, 78\n76=5, 8, 0" },
                  { title: "Datatype Mismatch", left: "Tag 46 is String", right: "Tag 98 is Char" },
                ].map((section, i) => (
                  <div key={i} className={`border-t ${borderColor} py-4`}>
                    <h4 className={`font-semibold mb-3 ${textPrimary}`}>{i + 1}. {section.title}</h4>
                    <div className="grid grid-cols-2 gap-6">
                      <div className={`p-3 rounded ${isDarkMode ? "bg-[#0a1628]" : "bg-[#f1f5f9]"}`}>
                        <pre className={`text-sm whitespace-pre-wrap ${textSecondary}`}>{section.left}</pre>
                      </div>
                      <div className={`p-3 rounded ${isDarkMode ? "bg-[#0a1628]" : "bg-[#f1f5f9]"}`}>
                        <pre className={`text-sm whitespace-pre-wrap ${textSecondary}`}>{section.right}</pre>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Navigation */}
                <div className={`mt-6 pt-4 border-t ${borderColor} flex justify-end`}>
                  <Button onClick={() => setCurrentScreen("log-analysis")}>
                    Next: Log Analysis <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    )
  }

  // Log Analysis Screen
  if (currentScreen === "log-analysis") {
    return (
      <div className={`min-h-screen ${bgPrimary} flex`}>
        <Sidebar />
        <div className="flex-1 overflow-auto">
          <header className={`${bgSecondary} border-b ${borderColor} px-6 py-4`}>
            <button onClick={() => isAdHocMode ? setCurrentScreen("dashboard") : setCurrentScreen("asset-tools")} className={`flex items-center gap-2 mb-2 ${textSecondary} hover:text-[#00e5ff]`}>
              <ArrowLeft className="h-4 w-4" /> Back
            </button>
            <h1 className={`text-2xl font-bold ${textPrimary}`}>Log Analysis {isAdHocMode && "(Ad-hoc)"}</h1>
          </header>

          <div className="p-6">
  <Card className={`${bgCard} p-6 border ${borderColor} mb-6`}>
  <h3 className={`text-lg font-bold mb-4 ${textPrimary}`}>Upload Files</h3>
  <div className="grid grid-cols-2 gap-6">
  <label className={`border-2 border-dashed ${borderColor} rounded-lg p-6 text-center hover:border-[#00e5ff] cursor-pointer transition-colors`}>
  <input type="file" className="hidden" accept=".log,.txt" onChange={(e) => console.log("Log file:", e.target.files?.[0]?.name)} />
  <FileText className={`h-10 w-10 mx-auto mb-3 ${textSecondary}`} />
  <p className={`font-medium ${textPrimary}`}>Log File</p>
  <p className={`text-xs mt-1 ${textSecondary}`}>Click to browse</p>
  </label>
  
  {/* Admin can upload, Client selects from existing */}
  {selectedRole === "admin" ? (
  <label className={`border-2 border-dashed ${borderColor} rounded-lg p-6 text-center hover:border-[#00e5ff] cursor-pointer transition-colors`}>
  <input type="file" className="hidden" accept=".xml,.txt,.csv" onChange={(e) => console.log("FIX spec:", e.target.files?.[0]?.name)} />
  <Upload className={`h-10 w-10 mx-auto mb-3 ${textSecondary}`} />
  <p className={`font-medium ${textPrimary}`}>FIX Specification</p>
  <p className={`text-xs mt-1 ${textSecondary}`}>Click to browse</p>
  </label>
  ) : (
  <div className={`border-2 ${borderColor} rounded-lg p-6`}>
  <FileText className={`h-10 w-10 mx-auto mb-3 ${textSecondary}`} />
  <p className={`font-medium ${textPrimary} text-center mb-3`}>Select FIX Specification</p>
  <select className={`w-full p-2 rounded border ${borderColor} ${isDarkMode ? "bg-[#0a1628] text-white" : "bg-white text-[#0a1628]"}`}>
  <option value="">Choose a spec...</option>
  <option value="eq-42">Equities - FIX 4.2 v1.2</option>
  <option value="eq-44">Equities - FIX 4.4 v2.1</option>
  <option value="opt-44">Options - FIX 4.4 v2.0</option>
  <option value="fut-50">Futures - FIX 5.0 SP2 v2.0</option>
  <option value="fi-44">Fixed Income - FIX 4.4 v1.2</option>
  <option value="fx-50">FX - FIX 5.0 SP2 v1.1</option>
  </select>
  </div>
  )}
  </div>
  <div className="mt-6 flex justify-center gap-4">
  <Button variant="outline"><Download className="h-4 w-4 mr-2" /> Download Sample Spec</Button>
  <Button onClick={() => setShowLogResults(true)}><Play className="h-4 w-4 mr-2" /> Run Sample Analysis</Button>
  </div>
  </Card>

            {showLogResults && (
              <Card className={`${bgCard} p-6 border ${borderColor}`}>
                <h2 className={`text-xl font-bold mb-6 ${textPrimary}`}>Spec Violations Found in Logs</h2>
                
                <div className="grid grid-cols-2 gap-6 mb-4">
                  <div><h3 className={`font-bold text-[#f44336]`}>Log Issues</h3></div>
                  <div><h3 className={`font-bold text-[#00e5ff]`}>Spec Requirements</h3></div>
                </div>

                {[
                  { title: "Unknown Message Types", left: "35=ZZ found 45 times\n35=XX found 12 times", right: "Only 35=D, 35=8, 35=F allowed" },
                  { title: "Invalid Tags", left: "Tag 9999 in msg 35=D (23 occurrences)\nTag 8888 in msg 35=8 (15 occurrences)", right: "35=D allows: 1-50, 100-150\n35=8 allows: 1-50, 200-250" },
                  { title: "Missing Required Tags", left: "35=D missing tag 11 (5 times)\n35=8 missing tag 17 (8 times)", right: "35=D requires: 11, 21, 55\n35=8 requires: 17, 20, 39" },
                ].map((section, i) => (
                  <div key={i} className={`border-t ${borderColor} py-4`}>
                    <h4 className={`font-semibold mb-3 ${textPrimary}`}>{section.title}</h4>
                    <div className="grid grid-cols-2 gap-6">
                      <div className={`p-3 rounded bg-[#f44336]/10 border border-[#f44336]/30`}>
                        <pre className={`text-sm whitespace-pre-wrap text-[#f44336]`}>{section.left}</pre>
                      </div>
                      <div className={`p-3 rounded ${isDarkMode ? "bg-[#0a1628]" : "bg-[#f1f5f9]"}`}>
                        <pre className={`text-sm whitespace-pre-wrap ${textSecondary}`}>{section.right}</pre>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Navigation */}
                <div className={`mt-6 pt-4 border-t ${borderColor} flex justify-between`}>
                  <Button variant="outline" onClick={() => setCurrentScreen("spec-compare")}>
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
              <h3 className={`text-lg font-bold mb-4 ${textPrimary}`}>Upload Sources</h3>
              <div className="grid grid-cols-3 gap-6">
                <label className={`border-2 border-dashed ${borderColor} rounded-lg p-6 text-center hover:border-[#00e5ff] cursor-pointer transition-colors`}>
                  <input type="file" className="hidden" accept=".log,.txt" onChange={(e) => console.log("Log file:", e.target.files?.[0]?.name)} />
                  <FileText className={`h-10 w-10 mx-auto mb-3 ${textSecondary}`} />
                  <p className={`font-medium ${textPrimary}`}>Log File</p>
                  <p className={`text-xs mt-1 ${textSecondary}`}>Click to browse</p>
                </label>
                <label className={`border-2 border-dashed ${borderColor} rounded-lg p-6 text-center hover:border-[#00e5ff] cursor-pointer transition-colors`}>
                  <input type="file" className="hidden" accept=".xml,.txt,.csv" onChange={(e) => console.log("FIX spec:", e.target.files?.[0]?.name)} />
                  <Upload className={`h-10 w-10 mx-auto mb-3 ${textSecondary}`} />
                  <p className={`font-medium ${textPrimary}`}>FIX Spec</p>
                  <p className={`text-xs mt-1 ${textSecondary}`}>Click to browse</p>
                </label>
                <label className={`border-2 border-dashed ${borderColor} rounded-lg p-6 text-center hover:border-[#00e5ff] cursor-pointer transition-colors`}>
                  <input type="file" className="hidden" accept=".log,.txt,.xml,.csv" multiple onChange={(e) => console.log("Both files:", Array.from(e.target.files || []).map(f => f.name))} />
                  <GitCompare className={`h-10 w-10 mx-auto mb-3 ${textSecondary}`} />
                  <p className={`font-medium ${textPrimary}`}>Both</p>
                  <p className={`text-xs mt-1 ${textSecondary}`}>Click to browse</p>
                </label>
              </div>
              <div className="mt-6 flex justify-center">
                <Button onClick={() => setShowScenarioResults(true)}><Play className="h-4 w-4 mr-2" /> Run Sample</Button>
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
                    <Button variant="outline" onClick={() => setCurrentScreen("log-analysis")}>
                      <ChevronLeft className="h-4 w-4 mr-2" /> Back: Log Analysis
                    </Button>
                    <div className="flex gap-3">
                      <Button variant="outline" onClick={() => setCurrentScreen("test-case-gen")}>
                        <VerifixLogo size={16} /> Reg Test Cases <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                      <Button onClick={() => setCurrentScreen("certification-gen")}>
                        <ConductorLogo size={16} /> Cert Test Cases <ChevronRight className="h-4 w-4 ml-1" />
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
    return (
      <div className={`min-h-screen ${bgPrimary} flex`}>
        <Sidebar />
        <div className="flex-1 overflow-auto">
          <header className={`${bgSecondary} border-b ${borderColor} px-6 py-4`}>
            <button onClick={() => isAdHocMode ? setCurrentScreen("dashboard") : setCurrentScreen("asset-tools")} className={`flex items-center gap-2 mb-2 ${textSecondary} hover:text-[#00e5ff]`}>
              <ArrowLeft className="h-4 w-4" /> Back
            </button>
            <div className="flex items-center gap-3">
              <VerifixLogo size={32} />
              <h1 className={`text-2xl font-bold ${textPrimary}`}>Reg Test Case Generation {isAdHocMode && "(Ad-hoc)"}</h1>
            </div>
          </header>

          <div className="p-6">
            {/* Step 1: Load Scenarios */}
            <Card className={`${bgCard} p-6 border ${borderColor} mb-6`}>
              <h3 className={`text-lg font-bold mb-4 ${textPrimary}`}>Step 1: Load Scenarios</h3>
              <p className={`mb-4 ${textSecondary}`}>Load scenarios from the Scenario Creation step or upload scenario file.</p>
              <div className="flex gap-4">
                <Button variant="outline" onClick={() => setCurrentScreen("scenario-creation")}>
                  <Activity className="h-4 w-4 mr-2" /> Go to Scenarios
                </Button>
                <label className={`border-2 border-dashed ${borderColor} rounded-lg px-6 py-3 text-center hover:border-[#00e5ff] cursor-pointer flex items-center gap-2 transition-colors`}>
                  <input type="file" className="hidden" accept=".json,.xml,.txt" onChange={(e) => console.log("Scenario file:", e.target.files?.[0]?.name)} />
                  <Upload className={`h-5 w-5 ${textSecondary}`} />
                  <span className={textSecondary}>Upload Scenario File</span>
                </label>
              </div>
            </Card>

            {/* Step 2: Generate Reg Test Suite */}
            <Card className={`${bgCard} p-6 border ${borderColor} mb-6`}>
              <h3 className={`text-lg font-bold mb-4 ${textPrimary}`}>Step 2: Generate Regression Test Suite</h3>
              <p className={`mb-4 ${textSecondary}`}>Convert loaded scenarios into a generic regression test suite.</p>
              <Button onClick={() => { setRegTestSuiteGenerated(true); setShowTestCaseResults(true); }}>
                <Play className="h-4 w-4 mr-2" /> Generate Reg Test Suite
              </Button>
            </Card>

            {/* Step 3: Convert to VeriFIX */}
            {showTestCaseResults && (
              <Card className={`${bgCard} p-6 border ${borderColor} mb-6`}>
                <h3 className={`text-lg font-bold mb-4 ${textPrimary}`}>Step 3: Convert to VeriFIX Test Cases</h3>
                <div className="space-y-2 mb-4">
                  {["TC001: New Order Validation", "TC002: Cancel Request Flow", "TC003: Execution Report Check", "TC004: Reject Handling", "TC005: Order Modify Flow", "TC006: Mass Cancel Test"].map((tc, i) => (
                    <div key={i} className={`flex items-center justify-between p-3 rounded border ${borderColor} ${isDarkMode ? "bg-[#0a1628]/50" : "bg-[#f8fafc]"}`}>
                      <div className="flex items-center gap-3">
                        <input type="checkbox" defaultChecked className="h-4 w-4" />
                        <span className={textPrimary}>{tc}</span>
                      </div>
                      <span className="px-2 py-1 rounded text-xs bg-[#4caf50]/20 text-[#4caf50]">Ready</span>
                    </div>
                  ))}
                </div>
                <div className="flex gap-4">
                  <Button onClick={() => {}}>
                    <VerifixLogo size={16} /> Generate VeriFIX Test Cases
                  </Button>
                  <Button variant="outline">Export Test Suite</Button>
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

  // Certification Case Generation (Conductor)
  if (currentScreen === "certification-gen") {
    return (
      <div className={`min-h-screen ${bgPrimary} flex`}>
        <Sidebar />
        <div className="flex-1 overflow-auto">
          <header className={`${bgSecondary} border-b ${borderColor} px-6 py-4`}>
            <button onClick={() => isAdHocMode ? setCurrentScreen("dashboard") : setCurrentScreen("asset-tools")} className={`flex items-center gap-2 mb-2 ${textSecondary} hover:text-[#00e5ff]`}>
              <ArrowLeft className="h-4 w-4" /> Back
            </button>
            <div className="flex items-center gap-3">
              <ConductorLogo size={32} />
              <h1 className={`text-2xl font-bold ${textPrimary}`}>Certification Case Generation {isAdHocMode && "(Ad-hoc)"}</h1>
            </div>
          </header>

          <div className="p-6">
            {/* Step 1: Load Scenarios */}
            <Card className={`${bgCard} p-6 border ${borderColor} mb-6`}>
              <h3 className={`text-lg font-bold mb-4 ${textPrimary}`}>Step 1: Load Scenarios</h3>
              <p className={`mb-4 ${textSecondary}`}>Load scenarios from the Scenario Creation step or upload scenario file.</p>
              <div className="flex gap-4">
                <Button variant="outline" onClick={() => setCurrentScreen("scenario-creation")}>
                  <Activity className="h-4 w-4 mr-2" /> Go to Scenarios
                </Button>
                <label className={`border-2 border-dashed ${borderColor} rounded-lg px-6 py-3 text-center hover:border-[#00e5ff] cursor-pointer flex items-center gap-2 transition-colors`}>
                  <input type="file" className="hidden" accept=".json,.xml,.txt" onChange={(e) => console.log("Scenario file:", e.target.files?.[0]?.name)} />
                  <Upload className={`h-5 w-5 ${textSecondary}`} />
                  <span className={textSecondary}>Upload Scenario File</span>
                </label>
              </div>
            </Card>

            {/* Step 2: Generate Certification Test Suite */}
            <Card className={`${bgCard} p-6 border ${borderColor} mb-6`}>
              <h3 className={`text-lg font-bold mb-4 ${textPrimary}`}>Step 2: Generate Certification Test Suite</h3>
              <p className={`mb-4 ${textSecondary}`}>Convert loaded scenarios into a certification test suite.</p>
              <Button onClick={() => { setCertSuiteGenerated(true); setShowCertResults(true); }}>
                <Play className="h-4 w-4 mr-2" /> Generate Certification Test Suite
              </Button>
            </Card>

            {/* Step 3: Convert to Conductor */}
            {showCertResults && (
              <Card className={`${bgCard} p-6 border ${borderColor} mb-6`}>
                <h3 className={`text-lg font-bold mb-4 ${textPrimary}`}>Step 3: Convert to Conductor Test Suite</h3>
                <div className="space-y-2 mb-4">
                  {["CERT001: Order Entry Certification", "CERT002: Cancel/Replace Certification", "CERT003: Execution Certification", "CERT004: Error Handling Certification", "CERT005: Market Data Certification", "CERT006: Session Management"].map((tc, i) => (
                    <div key={i} className={`flex items-center justify-between p-3 rounded border ${borderColor} ${isDarkMode ? "bg-[#0a1628]/50" : "bg-[#f8fafc]"}`}>
                      <div className="flex items-center gap-3">
                        <input type="checkbox" defaultChecked className="h-4 w-4" />
                        <span className={textPrimary}>{tc}</span>
                      </div>
                      <span className="px-2 py-1 rounded text-xs bg-[#4caf50]/20 text-[#4caf50]">Ready</span>
                    </div>
                  ))}
                </div>
                <div className="flex gap-4">
                  <Button onClick={() => {}}>
                    <ConductorLogo size={16} /> Generate Conductor Test Suite
                  </Button>
                  <Button variant="outline">Export Test Suite</Button>
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

  // Admin Specs Screen - Two column layout: Admin Specs | My Specs (or Client Specs for admin)
  if (currentScreen === "admin-specs") {
    const specsData = [
      { 
        asset: "Equities", 
        versions: [
          { protocol: "FIX 4.2", adminSpec: { name: "EQ_FIX42_v1.2.xml", uploaded: true }, clientSpec: { name: "client_eq_42.xml", uploaded: true } },
          { protocol: "FIX 4.4", adminSpec: { name: "EQ_FIX44_v2.1.xml", uploaded: true }, clientSpec: { name: null, uploaded: false } },
          { protocol: "FIX 5.0", adminSpec: { name: "EQ_FIX50_v1.0.xml", uploaded: true }, clientSpec: { name: "client_eq_50.xml", uploaded: true } },
        ]
      },
      { 
        asset: "Options", 
        versions: [
          { protocol: "FIX 4.2", adminSpec: { name: "OPT_FIX42_v1.1.xml", uploaded: true }, clientSpec: { name: null, uploaded: false } },
          { protocol: "FIX 4.4", adminSpec: { name: "OPT_FIX44_v2.0.xml", uploaded: true }, clientSpec: { name: "client_opt_44.xml", uploaded: true } },
        ]
      },
      { 
        asset: "Futures", 
        versions: [
          { protocol: "FIX 4.2", adminSpec: { name: "FUT_FIX42_v1.0.xml", uploaded: true }, clientSpec: { name: null, uploaded: false } },
          { protocol: "FIX 4.4", adminSpec: { name: "FUT_FIX44_v1.1.xml", uploaded: true }, clientSpec: { name: null, uploaded: false } },
          { protocol: "FIX 5.0 SP2", adminSpec: { name: "FUT_FIX50SP2_v2.0.xml", uploaded: true }, clientSpec: { name: "client_fut_50sp2.xml", uploaded: true } },
        ]
      },
      { 
        asset: "Fixed Income", 
        versions: [
          { protocol: "FIX 4.4", adminSpec: { name: "FI_FIX44_v1.2.xml", uploaded: true }, clientSpec: { name: "client_fi_44.xml", uploaded: true } },
          { protocol: "FIX 5.0", adminSpec: { name: "FI_FIX50_v1.0.xml", uploaded: true }, clientSpec: { name: null, uploaded: false } },
        ]
      },
      { 
        asset: "FX", 
        versions: [
          { protocol: "FIX 4.4", adminSpec: { name: "FX_FIX44_v1.0.xml", uploaded: true }, clientSpec: { name: null, uploaded: false } },
          { protocol: "FIX 5.0 SP2", adminSpec: { name: "FX_FIX50SP2_v1.1.xml", uploaded: true }, clientSpec: { name: "client_fx_50sp2.xml", uploaded: true } },
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
                  
                  {/* Table Header - 2 columns for admin, 3 for client */}
                  <div className={`grid ${selectedRole === "admin" ? "grid-cols-2" : "grid-cols-3"} gap-4 px-6 py-3 ${isDarkMode ? "bg-[#0a1628]" : "bg-[#f1f5f9]"} border-b ${borderColor}`}>
                    <div className={`font-semibold text-sm ${textPrimary}`}>Protocol</div>
                    <div className={`font-semibold text-sm ${textPrimary}`}>Admin Spec</div>
                    {selectedRole === "client" && (
                      <div className={`font-semibold text-sm ${textPrimary}`}>My Specs</div>
                    )}
                  </div>
                  
                  {/* Table Rows */}
                  <div className="divide-y divide-[#1e4976]/30">
                    {assetClass.versions.map((version) => (
                      <div 
                        key={`${assetClass.asset}-${version.protocol}`}
                        className={`grid ${selectedRole === "admin" ? "grid-cols-2" : "grid-cols-3"} gap-4 px-6 py-4 hover:bg-[#1e4976]/10 transition-colors items-center`}
                      >
                        {/* Protocol Column */}
                        <div className={`font-medium ${textPrimary}`}>
                          {version.protocol}
                        </div>
                        
                        {/* Admin Spec Column */}
                        <div className="flex items-center gap-2">
                          <button 
                            className={`flex items-center gap-2 px-3 py-1.5 rounded border ${borderColor} hover:bg-[#00e5ff]/10 hover:border-[#00e5ff] transition-colors group`}
                            title="Click to download"
                          >
                            <FileText className={`h-4 w-4 ${textSecondary} group-hover:text-[#00e5ff]`} />
                            <span className={`text-sm ${textPrimary} group-hover:text-[#00e5ff]`}>{version.adminSpec.name}</span>
                            <Download className={`h-3 w-3 ${textSecondary} group-hover:text-[#00e5ff]`} />
                          </button>
                          {selectedRole === "admin" && (
                            <label className={`cursor-pointer p-1.5 rounded hover:bg-[#1e4976]/30 ${textSecondary}`} title="Replace">
                              <input type="file" className="hidden" accept=".xml,.txt,.csv" />
                              <Upload className="h-4 w-4" />
                            </label>
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
            <p className={textSecondary}>Configure your B-COMET preferences</p>
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
                      <span className={`font-mono text-sm ${textPrimary}`}>BCOMET-ENT-2024-XXXX-XXXX</span>
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

  return null
}
