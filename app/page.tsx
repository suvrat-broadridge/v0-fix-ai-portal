"use client"

// B- COMET Platform - FIX Protocol Testing Suite v2
import { useState } from "react"
import { Shield, Building2, Sun, Moon, Users, LayoutDashboard, Settings, HelpCircle, LogOut, ChevronLeft, ChevronRight, FileText, Activity, Zap, CheckCircle, AlertTriangle, AlertCircle, Clock, Upload, Play, ArrowLeft, Bell, GitCompare, FileSearch, TestTube, Award, Cog, X, Plus, ChevronDown, Wrench, Download, Eye, MessageSquare, Send, Copy, Wifi, WifiOff, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function BCometPlatform() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [currentScreen, setCurrentScreen] = useState<"home" | "role-select" | "login" | "dashboard" | "clients" | "client-detail" | "asset-tools" | "spec-compare" | "spec-compare-overview" | "log-analysis" | "scenario-creation" | "test-case-gen" | "certification-gen" | "settings" | "admin-specs" | "client-specs" | "fix-msg-creator" | "atdl-compare" | "fix-atdl-compare" | "fix-to-atdl" | "atdl-validate" | "atdl-ui-repr">("home")
  const [settingsTab, setSettingsTab] = useState<"look-feel" | "general" | "security" | "mail" | "questionnaires" | "license">("general")
  const [selectedRole, setSelectedRole] = useState<"admin" | "client" | null>(null)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [selectedClient, setSelectedClient] = useState<any>(null)
  const [selectedAssetClass, setSelectedAssetClass] = useState<string | null>(null)
  const [selectedFixVersion, setSelectedFixVersion] = useState<string | null>(null)
  const [showSpecResults, setShowSpecResults] = useState(false)
  const [showLogResults, setShowLogResults] = useState(false)
  const [comparisonFlags, setComparisonFlags] = useState<Record<string, { status: "ignore" | "customization" | "flag" | null; note: string }>>({})
  const [logAnalysisFlags, setLogAnalysisFlags] = useState<Record<string, { status: "ignore" | "customization" | "flag" | null; note: string }>>({})
  const [showScenarioResults, setShowScenarioResults] = useState(false)
  const [showTestCaseResults, setShowTestCaseResults] = useState(false)
  const [showCertResults, setShowCertResults] = useState(false)
  const [scenarioFilter, setScenarioFilter] = useState<string>("all")
  const [showAddClientModal, setShowAddClientModal] = useState(false)
  const [newClient, setNewClient] = useState({ name: "", jira: "", accountManager: "", assetClasses: [] as string[] })
  const [isAdHocMode, setIsAdHocMode] = useState(false)
  const [toolsExpanded, setToolsExpanded] = useState(false)
  const [atdlToolsExpanded, setAtdlToolsExpanded] = useState(false)
  const [adminSpecsExpanded, setAdminSpecsExpanded] = useState(false)
  const [clientSpecsExpanded, setClientSpecsExpanded] = useState(false)
  const [regTestSuiteGenerated, setRegTestSuiteGenerated] = useState(false)
  const [certSuiteGenerated, setCertSuiteGenerated] = useState(false)
  const [showContactPanel, setShowContactPanel] = useState(false)
  const [showDemoForm, setShowDemoForm] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
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

  // Simulate a task with loading animation
  const simulateTask = async (callback: () => void, duration: number = 2000) => {
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, duration))
    callback()
    setIsLoading(false)
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
                    <div className="ml-4 space-y-1 border-l border-[#1e4976]/50 pl-2">
                      {[
                        { icon: GitCompare, label: "FIX to ATDL Compare", screen: "fix-atdl-compare" },
                        { icon: GitCompare, label: "ATDL to ATDL Compare", screen: "atdl-compare" },
                        { icon: Zap, label: "FIX to ATDL Convert", screen: "fix-to-atdl" },
                        { icon: CheckCircle, label: "ATDL Validate Structure", screen: "atdl-validate" },
                        { icon: Eye, label: "ATDL Usage", screen: "atdl-ui-repr" },
                      ].map((item) => (
                        <button
                          key={item.label}
                          onClick={() => { setCurrentScreen(item.screen as any); setIsAdHocMode(true); setSelectedClient(null); setSelectedAssetClass(null); }}
                          className={`w-full flex items-center gap-3 px-3 py-1.5 rounded-lg transition-colors text-xs ${textSecondary} hover:bg-[#1e4976]/30`}
                        >
                          <item.icon className="h-3 w-3" />
                          <span>{item.label}</span>
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
  
  {/* Client Specs Navigation - Only for clients */}
  {selectedRole === "client" && (
  <div className={`p-2 border-t ${borderColor}`}>
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
    // For client role, show "My Progress" with their own asset classes
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
                        <Button variant="outline" size="sm" onClick={() => setCurrentScreen("log-analysis")}>
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
                        <Button variant="outline" size="sm" onClick={() => setCurrentScreen("atdl-viewer")}>
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
  onClick={() => { setSelectedAssetClass(asset.name); setSelectedFixVersion(version.version); setCurrentScreen("log-analysis"); setIsAdHocMode(false); }}
  >
  <FileSearch className="h-3 w-3 mr-1" /> Analyze
  </Button>
  <Button 
  variant="outline" 
  size="sm" 
  className="flex-1"
  onClick={() => { setSelectedAssetClass(asset.name); setSelectedFixVersion(version.version); setCurrentScreen("atdl-viewer"); setIsAdHocMode(false); }}
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
              <button onClick={() => { setShowSpecResults(false); setSelectedAdminSpecForResults(null); setCurrentScreen("client-detail"); }} className={`flex items-center gap-2 mb-2 ${textSecondary} hover:text-[#00e5ff]`}>
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
                        <option value="v1.1">client_eq_44_v1.1.xml (Jan 10)</option>
                        <option value="v1.0">client_eq_44_v1.0.xml (Dec 20)</option>
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
                  <Button onClick={() => simulateTask(() => {})} disabled={isLoading} className="bg-[#00e5ff] text-[#0a1628] hover:bg-[#00e5ff]/80">
                    <Play className="h-4 w-4 mr-2" /> {isLoading ? "Comparing..." : "Run Comparison"}
                  </Button>
                </div>
              </Card>

              {/* Comparison Results */}
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
            <button onClick={() => { setShowSpecResults(false); setSelectedAdminSpecForResults(null); setCurrentScreen("dashboard"); }} className={`flex items-center gap-2 mb-2 ${textSecondary} hover:text-[#00e5ff]`}>
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
  <label className={`block text-sm font-medium mb-2 ${textPrimary}`}>{selectedRole === "client" ? "Select My Spec" : "Select Client Spec"}</label>
  {selectedRole === "client" ? (
  <div className={`border-2 ${borderColor} rounded-lg p-4`}>
  <div className="flex items-center gap-3 mb-3">
  <FileText className={`h-8 w-8 ${textSecondary}`} />
  <div>
  <p className={`font-medium ${textPrimary}`}>Select From My Specs</p>
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
  <option value="acme">Acme Trading Corp</option>
  <option value="globex">Globex Partners</option>
  <option value="initech">Initech Capital</option>
  <option value="umbrella">Umbrella Investments</option>
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
  <label className={`text-xs ${textSecondary} mb-1 block`}>Spec Version</label>
  <select className={`w-full p-2 rounded border ${borderColor} ${isDarkMode ? "bg-[#0a1628] text-white" : "bg-white text-[#0a1628]"}`}>
  <option value="">Select spec version...</option>
  <option value="v1.2">client_eq_44_v1.2.xml (Jan 15, 2024)</option>
  <option value="v1.1">client_eq_44_v1.1.xml (Jan 10, 2024)</option>
  <option value="v1.0">client_eq_44_v1.0.xml (Dec 20, 2023)</option>
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
  ) : (
  <div className={`border-2 ${borderColor} rounded-lg p-4`}>
  <div className="flex items-center gap-3 mb-3">
  <FileText className={`h-8 w-8 ${textSecondary}`} />
  <div>
  <p className={`font-medium ${textPrimary}`}>Select From Admin Specs</p>
  <p className={`text-xs ${textSecondary}`}>Choose a specification</p>
  </div>
  </div>
  <div className="space-y-3">
  <div className="grid grid-cols-2 gap-3">
  <div>
  <label className={`text-xs ${textSecondary} mb-1 block`}>Asset Class</label>
  <select 
  className={`w-full p-2 rounded border ${borderColor} ${isDarkMode ? "bg-[#0a1628] text-white" : "bg-white text-[#0a1628]"}`}
  >
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
  <select 
  className={`w-full p-2 rounded border ${borderColor} ${isDarkMode ? "bg-[#0a1628] text-white" : "bg-white text-[#0a1628]"}`}
  >
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
  <select className={`w-full p-2 rounded border ${borderColor} ${isDarkMode ? "bg-[#0a1628] text-white" : "bg-white text-[#0a1628]"}`}>
  <option value="">Select spec version...</option>
  <option value="v2.1">Equities FIX 4.4 v2.1 (Current)</option>
  <option value="v2.0">Equities FIX 4.4 v2.0</option>
  <option value="v1.9">Equities FIX 4.4 v1.9</option>
  <option value="v1.8">Equities FIX 4.4 v1.8</option>
  </select>
  </div>
  </div>
  </div>
  )}
  </div>
  </div>
  <div className="mt-6 flex justify-center gap-4">
  <Button onClick={() => simulateTask(() => setShowSpecResults(true))} disabled={isLoading} className="bg-white text-black hover:bg-gray-100 border border-gray-300"><Play className="h-4 w-4 mr-2" /> {isLoading ? "Processing..." : "Perform Comparison"}</Button>
  </div>
  </Card>

            {showSpecResults && (
              <Card className={`${bgCard} p-6 border ${borderColor}`}>
<h2 className={`text-xl font-bold mb-6 ${textPrimary}`}>Comparison Results</h2>
  
  {specCompareResults.map((section, i) => (
  <div key={section.id} className={`border-t ${borderColor} py-4`}>
  <h4 className={`font-semibold mb-3 ${textPrimary}`}>{i + 1}. {section.title}</h4>
  <div className="grid grid-cols-12 gap-4 mb-2">
  <div className="col-span-5"><h3 className={`font-bold text-[#00e5ff] text-sm`}>{section.title === "Undefined Message Types" || section.title === "Datatype Mismatch" ? "Defined In My Spec" : section.title === "Unsupported Tags" || section.title === "Unsupported Tag Values" ? "Supported In My Spec" : "My Spec"}</h3></div>
  <div className="col-span-5"><h3 className={`font-bold text-[#00e5ff] text-sm`}>{section.title === "Undefined Message Types" || section.title === "Datatype Mismatch" ? "Defined In Admin Spec" : section.title === "Unsupported Tags" || section.title === "Unsupported Tag Values" ? "Supported In Admin Spec" : "Admin Spec"}</h3></div>
  <div className="col-span-2"><h3 className={`font-bold text-[#00e5ff] text-sm`}>Action</h3></div>
  </div>
  <div className="grid grid-cols-12 gap-4">
                      <div className={`col-span-5 p-3 rounded ${isDarkMode ? "bg-[#0a1628]" : "bg-[#f1f5f9]"}`}>
                        <pre className={`text-sm whitespace-pre-wrap ${textSecondary}`}>{section.left}</pre>
                      </div>
                      <div className={`col-span-5 p-3 rounded ${isDarkMode ? "bg-[#0a1628]" : "bg-[#f1f5f9]"}`}>
                        <pre className={`text-sm whitespace-pre-wrap ${textSecondary}`}>{section.right}</pre>
                      </div>
                      <div className="col-span-2 space-y-2">
                        <div className="flex flex-col gap-1">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input 
                              type="checkbox" 
                              checked={comparisonFlags[section.id]?.status === "ignore"}
                              onChange={() => updateFlag(section.id, comparisonFlags[section.id]?.status === "ignore" ? null : "ignore")}
                              className="rounded"
                            />
                            <span className={`text-xs ${textSecondary}`}>Ignore</span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input 
                              type="checkbox" 
                              checked={comparisonFlags[section.id]?.status === "customization"}
                              onChange={() => updateFlag(section.id, comparisonFlags[section.id]?.status === "customization" ? null : "customization")}
                              className="rounded"
                            />
                            <span className={`text-xs ${textSecondary}`}>Customization</span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input 
                              type="checkbox" 
                              checked={comparisonFlags[section.id]?.status === "flag"}
                              onChange={() => updateFlag(section.id, comparisonFlags[section.id]?.status === "flag" ? null : "flag")}
                              className="rounded"
                            />
                            <span className={`text-xs ${textSecondary}`}>Flag</span>
                          </label>
                        </div>
<Input
  placeholder="Add note..."
  value={comparisonFlags[section.id]?.note || ""}
  onChange={(e) => updateNote(section.id, e.target.value)}
  className={`h-7 text-xs ${isDarkMode ? "bg-[#0a1628] border-[#1e4976] text-gray-300" : "text-gray-600"}`}
  />
                      </div>
                    </div>
                  </div>
                ))}

{/* Actions and Navigation */}
  <div className={`mt-6 pt-4 border-t ${borderColor} flex justify-between items-center`}>
  <div className="flex gap-4">
  <Button className="bg-white text-black hover:bg-gray-100 border border-gray-300"><Download className="h-4 w-4 mr-2" /> Download Comparison</Button>
  <Button className={`border border-gray-300 ${allActionsSelected ? "bg-white text-black hover:bg-gray-100" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`} disabled={!allActionsSelected}><Mail className="h-4 w-4 mr-2" /> Email Results</Button>
  </div>
  <Button onClick={() => { setShowSpecResults(false); setSelectedAdminSpecForResults(null); setCurrentScreen("log-analysis"); }}>
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
    const logAnalysisResults = [
      { id: "log-1", title: "Unknown Message Types", left: "35=ZZ found 45 times\n35=XX found 12 times", right: "Only 35=D, 35=8, 35=F allowed" },
      { id: "log-2", title: "Invalid Tags", left: "Tag 9999 in msg 35=D (23 occurrences)\nTag 8888 in msg 35=8 (15 occurrences)", right: "35=D allows: 1-50, 100-150\n35=8 allows: 1-50, 200-250" },
      { id: "log-3", title: "Missing Required Tags", left: "35=D missing tag 11 (5 times)\n35=8 missing tag 17 (8 times)", right: "35=D requires: 11, 21, 55\n35=8 requires: 17, 20, 39" },
    ]
    
    const updateLogFlag = (id: string, status: "ignore" | "customization" | "flag" | null) => {
      setLogAnalysisFlags(prev => ({ ...prev, [id]: { ...prev[id], status, note: prev[id]?.note || "" } }))
    }
    
    const updateLogNote = (id: string, note: string) => {
      setLogAnalysisFlags(prev => ({ ...prev, [id]: { ...prev[id], note, status: prev[id]?.status || null } }))
    }
    
    return (
      <div className={`min-h-screen ${bgPrimary} flex`}>
        <Sidebar />
        <div className="flex-1 overflow-auto">
          <header className={`${bgSecondary} border-b ${borderColor} px-6 py-4`}>
            <button onClick={() => isAdHocMode ? setCurrentScreen("dashboard") : setCurrentScreen("client-detail")} className={`flex items-center gap-2 mb-2 ${textSecondary} hover:text-[#00e5ff]`}>
              <ArrowLeft className="h-4 w-4" /> Back
            </button>
            <h1 className={`text-2xl font-bold ${textPrimary}`}>Log Analysis</h1>
            {!isAdHocMode && selectedClient && (
              <p className={`text-sm ${textSecondary}`}>
                Client: <span className="text-[#00e5ff] font-medium">{selectedClient.name}</span>
                {selectedAssetClass && <> | Asset Class: <span className="text-[#00e5ff] font-medium">{selectedAssetClass}</span></>}
                {selectedFixVersion && <> | FIX Version: <span className="text-[#00e5ff] font-medium">{selectedFixVersion}</span></>}
              </p>
            )}
          </header>

          <div className="p-6">
            <Card className={`${bgCard} p-6 border ${borderColor} mb-6`}>
              <h3 className={`text-lg font-bold mb-4 ${textPrimary}`}>Choose Files</h3>
<div className="grid grid-cols-2 gap-6">
  {/* Log File Upload */}
  <div>
  <label className={`block text-sm font-medium mb-2 ${textPrimary}`}>Upload My Log File</label>
  <label className={`border-2 border-dashed ${borderColor} rounded-lg p-6 text-center hover:border-[#00e5ff] cursor-pointer transition-colors block`}>
  <input type="file" className="hidden" accept=".log,.txt" />
  <Upload className={`h-10 w-10 mx-auto mb-3 ${textSecondary}`} />
  <p className={`font-medium ${textPrimary}`}>Select A File</p>
  <p className={`text-xs mt-1 ${textSecondary}`}>Click to browse</p>
  </label>
  </div>
  
  {/* FIX Spec - Always select from dropdown */}
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
                    <select 
                      defaultValue={selectedAssetClass && selectedFixVersion ? `${selectedAssetClass?.toLowerCase().replace(" ", "-")}-${selectedFixVersion?.split(" ")[1]?.toLowerCase()}` : ""}
                      className={`w-full p-2 rounded border ${borderColor} ${isDarkMode ? "bg-[#0a1628] text-white" : "bg-white text-[#0a1628]"}`}
                    >
                      <option value="">Choose a spec...</option>
                      <option value="equities-4.2">Equities - FIX 4.2 v1.2</option>
                      <option value="equities-4.4">Equities - FIX 4.4 v2.1</option>
                      <option value="options-4.4">Options - FIX 4.4 v2.0</option>
                      <option value="futures-5.0">Futures - FIX 5.0 SP2 v2.0</option>
                      <option value="fixed income-4.4">Fixed Income - FIX 4.4 v1.2</option>
                      <option value="fx-5.0">FX - FIX 5.0 SP2 v1.1</option>
                    </select>
                  </div>
                </div>
              </div>
<div className="mt-6 flex justify-center gap-4">
  <Button onClick={() => simulateTask(() => setShowLogResults(true))} disabled={isLoading} className="bg-white text-black hover:bg-gray-100 border border-gray-300"><Play className="h-4 w-4 mr-2" /> {isLoading ? "Processing..." : "Run Analysis"}</Button>
  <Button className="bg-white text-black hover:bg-gray-100 border border-gray-300"><Download className="h-4 w-4 mr-2" /> Download Analysis</Button>
  </div>
            </Card>

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
              <h3 className={`text-lg font-bold mb-4 ${textPrimary}`}>Upload Sources</h3>
              <div className="grid grid-cols-3 gap-6">
                <label className={`border-2 border-dashed ${borderColor} rounded-lg p-6 text-center hover:border-[#00e5ff] cursor-pointer transition-colors`}>
                  <input type="file" className="hidden" accept=".log,.txt" onChange={(e) => console.log("Log file:", e.target.files?.[0]?.name)} />
                  <FileText className={`h-10 w-10 mx-auto mb-3 ${textSecondary}`} />
                  <p className={`font-medium ${textPrimary}`}>Upload My Log File</p>
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
<Button onClick={() => simulateTask(() => { setRegTestSuiteGenerated(true); setShowTestCaseResults(true); })} disabled={isLoading}>
  <Play className="h-4 w-4 mr-2" /> {isLoading ? "Processing..." : "Generate Reg Test Suite"}
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
<Button onClick={() => simulateTask(() => { setCertSuiteGenerated(true); setShowCertResults(true); })} disabled={isLoading}>
  <Play className="h-4 w-4 mr-2" /> {isLoading ? "Processing..." : "Generate Certification Test Suite"}
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

  // ATDL Validate Structure Screen
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
                      <label className={`block text-sm font-medium mb-2 ${textPrimary}`}>Select From My ATDL Files</label>
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
              <Card className={`${bgCard} border ${borderColor} p-6`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className={`text-lg font-bold ${textPrimary}`}>Validation Results</h3>
                  <div className="flex gap-2">
                    <span className="px-2 py-1 rounded text-xs bg-[#4caf50]/20 text-[#4caf50]">4 Passed</span>
                    <span className="px-2 py-1 rounded text-xs bg-[#ff9800]/20 text-[#ff9800]">1 Warning</span>
                    <span className="px-2 py-1 rounded text-xs bg-[#f44336]/20 text-[#f44336]">1 Error</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  {validationResults.map((result, i) => (
                    <div key={i} className={`flex items-center justify-between p-3 rounded ${isDarkMode ? "bg-[#0a1628]" : "bg-[#f1f5f9]"}`}>
                      <div className="flex items-center gap-3">
                        {result.status === "pass" && <CheckCircle className="h-5 w-5 text-[#4caf50]" />}
                        {result.status === "warning" && <AlertTriangle className="h-5 w-5 text-[#ff9800]" />}
                        {result.status === "error" && <AlertCircle className="h-5 w-5 text-[#f44336]" />}
                        <span className={`font-medium ${textPrimary}`}>{result.rule}</span>
                      </div>
                      <span className={`text-sm ${textSecondary}`}>{result.message}</span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 flex justify-between items-center">
                  <Button variant="outline"><Download className="h-4 w-4 mr-2" /> Export Report</Button>
                  <Button onClick={() => setCurrentScreen("atdl-ui-repr")} className="bg-[#00e5ff] text-[#0a1628] hover:bg-[#00e5ff]/80">
                    <Eye className="h-4 w-4 mr-2" /> Go to ATDL Usage
                  </Button>
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
                      <label className={`block text-sm font-medium mb-2 ${textPrimary}`}>Select From My ATDL Files</label>
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
                <Button onClick={() => simulateTask(() => {})} disabled={isLoading} className="bg-[#00e5ff] text-[#0a1628] hover:bg-[#00e5ff]/80">
                  <Play className="h-4 w-4 mr-2" /> {isLoading ? "Loading..." : "Load Strategy UI"}
                </Button>
              </div>
            </Card>

            {/* ATDL UI Representation */}
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
                    <Input type="time" defaultValue="09:30" className={`${isDarkMode ? "bg-[#1e4976]/30 border-[#1e4976]" : ""}`} />
                  </div>
                  <div>
                    <label className={`block text-xs mb-1 ${textSecondary}`}>End Time</label>
                    <Input type="time" defaultValue="16:00" className={`${isDarkMode ? "bg-[#1e4976]/30 border-[#1e4976]" : ""}`} />
                  </div>
                  <div>
                    <label className={`block text-xs mb-1 ${textSecondary}`}>Participation Rate (%)</label>
                    <Input type="number" defaultValue="15" className={`${isDarkMode ? "bg-[#1e4976]/30 border-[#1e4976]" : ""}`} />
                  </div>
                  <div>
                    <label className={`block text-xs mb-1 ${textSecondary}`}>Min Quantity</label>
                    <Input type="number" defaultValue="100" className={`${isDarkMode ? "bg-[#1e4976]/30 border-[#1e4976]" : ""}`} />
                  </div>
                  <div>
                    <label className={`block text-xs mb-1 ${textSecondary}`}>Max Floor</label>
                    <Input type="number" defaultValue="500" className={`${isDarkMode ? "bg-[#1e4976]/30 border-[#1e4976]" : ""}`} />
                  </div>
                  <div>
                    <label className={`block text-xs mb-1 ${textSecondary}`}>Display Qty</label>
                    <Input type="number" defaultValue="200" className={`${isDarkMode ? "bg-[#1e4976]/30 border-[#1e4976]" : ""}`} />
                  </div>
                </div>
              </div>
            </Card>

            {/* Generated FIX Algo Message */}
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
                <span className={textPrimary}>8=FIX.4.4|9=256|35=D|49=SENDER|56=TARGET|34=1|52=20240115-14:30:00.000| 11=ORDER123|21=1|55=AAPL|54=1|60=20240115-14:30:00.000|38=10000|40=2|44=150.00| 59=0|</span>
                <span className="text-[#00e5ff]">847=VWAP|7940=09:30:00|7941=16:00:00|7942=15|7943=100|7944=500|7945=200|7946=M|</span>
                <span className={textPrimary}>10=128|</span>
              </div>

              <div className="flex items-center justify-between mt-4">
                <div className="flex gap-2">
                  <Button variant="outline" size="sm"><Copy className="h-4 w-4 mr-2" /> Copy Message</Button>
                  <Button variant="outline" size="sm"><Download className="h-4 w-4 mr-2" /> Download</Button>
                </div>
                <Button className="bg-[#00e5ff] text-[#0a1628] hover:bg-[#00e5ff]/80">
                  <Zap className="h-4 w-4 mr-2" /> Validate Against FIX Spec
                </Button>
              </div>
            </Card>

            {/* FIX Spec Validation Results */}
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
                
                {[
                  { id: "atdl-1", title: "Strategy Differences", left: "VWAP, TWAP, POV defined", right: "VWAP, TWAP defined (POV missing)" },
                  { id: "atdl-2", title: "Parameter Mismatches", left: "StartTime: UTCTimestamp", right: "StartTime: LocalMktTime" },
                  { id: "atdl-3", title: "Control Type Differences", left: "MinQty: Spinner (min=100)", right: "MinQty: TextField (no validation)" },
                  { id: "atdl-4", title: "Enum Value Differences", left: "Urgency: Low, Medium, High, Critical", right: "Urgency: 1, 2, 3" },
                ].map((section, i) => (
                  <div key={section.id} className={`border-t ${borderColor} py-4`}>
                    <h4 className={`font-semibold mb-3 ${textPrimary}`}>{i + 1}. {section.title}</h4>
                    <div className="grid grid-cols-12 gap-4 mb-2">
                      <div className="col-span-5"><h3 className={`font-bold text-[#00e5ff] text-sm`}>Buy Side ATDL</h3></div>
                      <div className="col-span-5"><h3 className={`font-bold text-[#00e5ff] text-sm`}>Sell Side ATDL</h3></div>
                      <div className="col-span-2"><h3 className={`font-bold text-[#00e5ff] text-sm`}>Action</h3></div>
                    </div>
                    <div className="grid grid-cols-12 gap-4">
                      <div className={`col-span-5 p-3 rounded ${isDarkMode ? "bg-[#0a1628]" : "bg-[#f1f5f9]"}`}>
                        <p className={`text-sm ${textSecondary} whitespace-pre-line`}>{section.left}</p>
                      </div>
                      <div className={`col-span-5 p-3 rounded ${isDarkMode ? "bg-[#0a1628]" : "bg-[#f1f5f9]"}`}>
                        <p className={`text-sm ${textSecondary} whitespace-pre-line`}>{section.right}</p>
                      </div>
                      <div className="col-span-2 flex flex-col gap-2">
                        <Button size="sm" variant="outline" className="text-xs"><Eye className="h-3 w-3 mr-1" /> Review</Button>
                      </div>
                    </div>
                  </div>
                ))}
                
                <div className={`mt-6 pt-4 border-t ${borderColor} flex justify-between items-center`}>
                  <div className="flex gap-4">
                    <Button className="bg-white text-black hover:bg-gray-100 border border-gray-300"><Download className="h-4 w-4 mr-2" /> Download Report</Button>
                    <Button className="bg-white text-black hover:bg-gray-100 border border-gray-300"><Mail className="h-4 w-4 mr-2" /> Email Results</Button>
                  </div>
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
  <p className={`font-medium ${textPrimary}`}>Select From My Specs</p>
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
                
                {[
                  { id: "fix-atdl-1", title: "Missing Strategies in ATDL", left: "Strategies: VWAP, TWAP, POV, IS, MOC", right: "Strategies: VWAP, TWAP (POV, IS, MOC missing)" },
                  { id: "fix-atdl-2", title: "Parameter Mapping Issues", left: "Tag 847 (TargetStrategy) = VWAP", right: "strategy/@name = 'VWAP' (Correct mapping)" },
                  { id: "fix-atdl-3", title: "Missing Parameters", left: "Tag 7940 (StartTime), Tag 7941 (EndTime)", right: "StartTime parameter defined, EndTime missing" },
                  { id: "fix-atdl-4", title: "Datatype Inconsistencies", left: "Tag 7942 (ParticipationRate): Percentage", right: "ParticipationRate: Decimal (0-1 range)" },
                ].map((section, i) => (
                  <div key={section.id} className={`border-t ${borderColor} py-4`}>
                    <h4 className={`font-semibold mb-3 ${textPrimary}`}>{i + 1}. {section.title}</h4>
                    <div className="grid grid-cols-12 gap-4 mb-2">
                      <div className="col-span-5"><h3 className={`font-bold text-[#00e5ff] text-sm`}>FIX Specification</h3></div>
                      <div className="col-span-5"><h3 className={`font-bold text-[#00e5ff] text-sm`}>ATDL Definition</h3></div>
                      <div className="col-span-2"><h3 className={`font-bold text-[#00e5ff] text-sm`}>Action</h3></div>
                    </div>
                    <div className="grid grid-cols-12 gap-4">
                      <div className={`col-span-5 p-3 rounded ${isDarkMode ? "bg-[#0a1628]" : "bg-[#f1f5f9]"}`}>
                        <p className={`text-sm ${textSecondary} whitespace-pre-line`}>{section.left}</p>
                      </div>
                      <div className={`col-span-5 p-3 rounded ${isDarkMode ? "bg-[#0a1628]" : "bg-[#f1f5f9]"}`}>
                        <p className={`text-sm ${textSecondary} whitespace-pre-line`}>{section.right}</p>
                      </div>
                      <div className="col-span-2 flex flex-col gap-2">
                        <Button size="sm" variant="outline" className="text-xs"><Eye className="h-3 w-3 mr-1" /> Review</Button>
                      </div>
                    </div>
                  </div>
                ))}
                
                <div className={`mt-6 pt-4 border-t ${borderColor} flex justify-between items-center`}>
                  <div className="flex gap-4">
                    <Button className="bg-white text-black hover:bg-gray-100 border border-gray-300"><Download className="h-4 w-4 mr-2" /> Download Report</Button>
                    <Button className="bg-white text-black hover:bg-gray-100 border border-gray-300"><Mail className="h-4 w-4 mr-2" /> Email Results</Button>
                  </div>
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
  <p className={`font-medium ${textPrimary}`}>Select From My Specs</p>
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
                    <div className={`col-span-3 font-semibold text-sm ${textPrimary}`}>My Spec</div>
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
<span className={`text-sm ${textSecondary}`}>Select From My Specs</span>
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
          { protocol: "FIX 4.2", specs: [{ name: "client_eq_42_v1.xml", uploaded: "2024-01-10", status: "active" }] },
          { protocol: "FIX 4.4", specs: [{ name: "client_eq_44_v2.xml", uploaded: "2024-01-12", status: "active" }] },
          { protocol: "FIX 5.0", specs: [] },
        ]
      },
      {
        asset: "Options",
        versions: [
          { protocol: "FIX 4.2", specs: [] },
          { protocol: "FIX 4.4", specs: [{ name: "client_opt_44_v1.xml", uploaded: "2024-01-08", status: "active" }] },
        ]
      },
      {
        asset: "Futures",
        versions: [
          { protocol: "FIX 4.2", specs: [] },
          { protocol: "FIX 4.4", specs: [] },
          { protocol: "FIX 5.0 SP2", specs: [{ name: "client_fut_50sp2_v1.xml", uploaded: "2024-01-15", status: "active" }] },
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
                        <option value="">Choose a spec...</option>
                        <option value="eq-42">Equities - FIX 4.2</option>
                        <option value="eq-44">Equities - FIX 4.4</option>
                        <option value="opt-44">Options - FIX 4.4</option>
                        <option value="fut-50">Futures - FIX 5.0 SP2</option>
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
  
  return null
}
