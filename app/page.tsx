"use client"

import { useState } from "react"
import { Shield, Building2, Sun, Moon, Users, LayoutDashboard, Settings, HelpCircle, LogOut, ChevronLeft, ChevronRight, FileText, Activity, Zap, CheckCircle, AlertTriangle, Clock, Upload, Play, ArrowLeft, Bell, GitCompare, FileSearch, TestTube, Award, Cog, X, Plus, ChevronDown, Wrench, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function BCometPlatform() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [currentScreen, setCurrentScreen] = useState<"home" | "login" | "dashboard" | "clients" | "client-detail" | "asset-tools" | "spec-compare" | "log-analysis" | "scenario-creation" | "test-case-gen" | "certification-gen">("home")
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

  // Logo Components
  const CometLogo = ({ size = 40 }: { size?: number }) => (
    <svg viewBox="0 0 40 40" style={{ width: size, height: size }}>
      <defs>
        <linearGradient id="cometTail" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00e5ff" stopOpacity="0" />
          <stop offset="50%" stopColor="#00e5ff" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#00e5ff" stopOpacity="1" />
        </linearGradient>
        <linearGradient id="cometHead" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00e5ff" />
          <stop offset="100%" stopColor="#0091ea" />
        </linearGradient>
      </defs>
      <path d="M2 20 Q12 18, 22 20" stroke="url(#cometTail)" strokeWidth="2" fill="none" opacity="0.6" />
      <path d="M5 24 Q14 22, 24 22" stroke="url(#cometTail)" strokeWidth="1.5" fill="none" opacity="0.4" />
      <path d="M4 16 Q13 15, 22 17" stroke="url(#cometTail)" strokeWidth="1.5" fill="none" opacity="0.4" />
      <circle cx="28" cy="20" r="8" fill="url(#cometHead)" />
      <circle cx="26" cy="18" r="2" fill="white" opacity="0.6" />
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

  // Add Client Modal
  const AddClientModal = () => (
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
              onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
            />
          </div>
          <div>
            <label className={`text-sm font-medium ${textPrimary}`}>JIRA ID</label>
            <Input 
              placeholder="e.g., CLIENT-001" 
              className={`mt-1 ${isDarkMode ? "bg-[#0a1628] border-[#1e4976] text-white placeholder:text-[#64748b]" : "bg-white border-[#e2e8f0] text-[#0a1628]"}`}
              value={newClient.jira}
              onChange={(e) => setNewClient({ ...newClient, jira: e.target.value })}
            />
          </div>
          <div>
            <label className={`text-sm font-medium ${textPrimary}`}>Sales/Account Manager</label>
            <Input 
              placeholder="Enter manager name" 
              className={`mt-1 ${isDarkMode ? "bg-[#0a1628] border-[#1e4976] text-white placeholder:text-[#64748b]" : "bg-white border-[#e2e8f0] text-[#0a1628]"}`}
              value={newClient.accountManager}
              onChange={(e) => setNewClient({ ...newClient, accountManager: e.target.value })}
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
  )

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
          { icon: LayoutDashboard, label: "Dashboard", screen: "dashboard" },
          { icon: Users, label: "Clients", screen: "clients" },
        ].map((item) => (
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
              { icon: GitCompare, label: "Spec Compare", screen: "spec-compare" },
              { icon: FileSearch, label: "Log Analysis", screen: "log-analysis" },
              { icon: Activity, label: "Scenario Creation", screen: "scenario-creation" },
            ].map((item) => (
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
            
            {/* VeriFIX */}
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
            
            {/* Conductor */}
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
          </div>
        )}
      </div>

      <div className={`p-2 border-t ${borderColor} space-y-1 mt-auto`}>
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
            <div className="flex items-center gap-3">
              <CometLogo size={40} />
              <span className={`text-xl font-bold ${textPrimary}`}>B-COMET</span>
            </div>
            <div className="flex items-center gap-4">
              <button onClick={() => setIsDarkMode(!isDarkMode)} className={`p-2 rounded-lg ${textSecondary} hover:bg-[#1e4976]/30`}>
                {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
              <Button variant="outline" onClick={() => { setSelectedRole("client"); setCurrentScreen("login"); }}>Login</Button>
              <Button onClick={() => { setSelectedRole("admin"); setCurrentScreen("login"); }}>Get Started</Button>
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
                <Button size="lg" onClick={() => { setSelectedRole("admin"); setCurrentScreen("login"); }}>Get Started</Button>
                <Button size="lg" variant="outline" onClick={() => { setSelectedRole("client"); setCurrentScreen("login"); }}>View Demo</Button>
              </div>

              <div className="flex gap-8">
                <div><div className={`text-3xl font-bold ${textPrimary}`}>500+</div><div className={`text-sm ${textSecondary}`}>Clients</div></div>
                <div><div className={`text-3xl font-bold ${textPrimary}`}>99.9%</div><div className={`text-sm ${textSecondary}`}>Uptime</div></div>
                <div><div className={`text-3xl font-bold ${textPrimary}`}>50M+</div><div className={`text-sm ${textSecondary}`}>Messages</div></div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <Card className={`${bgCard}/80 backdrop-blur-md p-6 border ${borderColor}`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className={`font-semibold ${textPrimary}`}>Live Activity</h3>
                  <span className="flex h-2 w-2 rounded-full bg-[#4caf50] animate-pulse" />
                </div>
                <div className="space-y-3">
                  {[
                    { action: "Spec Comparison", client: "Goldman Sachs", status: "completed" },
                    { action: "Log Analysis", client: "Morgan Stanley", status: "in-progress" },
                    { action: "VeriFIX Export", client: "JP Morgan", status: "completed" },
                    { action: "Conductor Cert", client: "Citadel", status: "in-progress" },
                  ].map((item, i) => (
                    <div key={i} className={`flex items-center justify-between p-3 rounded-lg ${isDarkMode ? "bg-[#0a1628]/50" : "bg-[#f1f5f9]"}`}>
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${item.status === "completed" ? "bg-[#4caf50]" : "bg-[#2196f3] animate-pulse"}`} />
                        <div>
                          <div className={`text-sm font-medium ${textPrimary}`}>{item.action}</div>
                          <div className={`text-xs ${textSecondary}`}>{item.client}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>

          <div className="mt-16">
            <h2 className={`text-2xl font-bold text-center mb-8 ${textPrimary}`}>Choose Your Role</h2>
            <div className="flex justify-center gap-6">
              <Card className={`${bgCard} p-8 cursor-pointer hover:scale-105 hover:shadow-2xl border-2 ${borderColor} hover:border-[#00e5ff]`} onClick={() => { setSelectedRole("admin"); setCurrentScreen("login"); }}>
                <Shield className="h-12 w-12 mx-auto mb-4 text-[#00e5ff]" />
                <h3 className={`text-xl font-bold text-center ${textPrimary}`}>Admin</h3>
                <p className={`text-sm text-center ${textSecondary}`}>Full access to manage clients</p>
              </Card>
              <Card className={`${bgCard} p-8 cursor-pointer hover:scale-105 hover:shadow-2xl border-2 ${borderColor} hover:border-[#00e5ff]`} onClick={() => { setSelectedRole("client"); setCurrentScreen("login"); }}>
                <Building2 className="h-12 w-12 mx-auto mb-4 text-[#00e5ff]" />
                <h3 className={`text-xl font-bold text-center ${textPrimary}`}>Client</h3>
                <p className={`text-sm text-center ${textSecondary}`}>View your specifications</p>
              </Card>
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
    return (
      <div className={`min-h-screen ${bgPrimary} flex`}>
        <Sidebar />
        {showAddClientModal && <AddClientModal />}
        
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
                <label className={`border-2 border-dashed ${borderColor} rounded-lg p-6 text-center hover:border-[#00e5ff] cursor-pointer transition-colors`}>
                  <input type="file" className="hidden" accept=".xml,.txt,.csv" onChange={(e) => console.log("Admin spec:", e.target.files?.[0]?.name)} />
                  <Upload className={`h-10 w-10 mx-auto mb-3 ${textSecondary}`} />
                  <p className={`font-medium ${textPrimary}`}>Admin Spec</p>
                  <p className={`text-xs mt-1 ${textSecondary}`}>Click to browse</p>
                </label>
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
                <label className={`border-2 border-dashed ${borderColor} rounded-lg p-6 text-center hover:border-[#00e5ff] cursor-pointer transition-colors`}>
                  <input type="file" className="hidden" accept=".xml,.txt,.csv" onChange={(e) => console.log("FIX spec:", e.target.files?.[0]?.name)} />
                  <Upload className={`h-10 w-10 mx-auto mb-3 ${textSecondary}`} />
                  <p className={`font-medium ${textPrimary}`}>FIX Specification</p>
                  <p className={`text-xs mt-1 ${textSecondary}`}>Click to browse</p>
                </label>
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
              </Card>
            )}
          </div>
        </div>
      </div>
    )
  }

  // Reg Test Case Generation (VeriFIX)
  if (currentScreen === "test-case-gen") {
    const [regTestSuiteGenerated, setRegTestSuiteGenerated] = useState(false)
    
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
    const [certSuiteGenerated, setCertSuiteGenerated] = useState(false)
    
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

  return null
}
