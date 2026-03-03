"use client"

import { useState } from "react"
import { Shield, Building2, Sun, Moon, Users, LayoutDashboard, Settings, HelpCircle, LogOut, ChevronLeft, ChevronRight, FileText, Activity, Zap, CheckCircle, AlertTriangle, Clock, Upload, Play, ArrowLeft, Bell, GitCompare, FileSearch, TestTube, Award, Cog, X, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function BCometPlatform() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [currentScreen, setCurrentScreen] = useState<"home" | "login" | "dashboard" | "clients" | "client-detail" | "spec-compare" | "log-analysis" | "scenario-creation">("home")
  const [selectedRole, setSelectedRole] = useState<"admin" | "client" | null>(null)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [selectedClient, setSelectedClient] = useState<any>(null)
  const [showSpecResults, setShowSpecResults] = useState(false)
  const [showLogResults, setShowLogResults] = useState(false)
  const [showScenarioResults, setShowScenarioResults] = useState(false)
  const [scenarioFilter, setScenarioFilter] = useState<string>("all")
  const [showAddClientModal, setShowAddClientModal] = useState(false)
  const [newClient, setNewClient] = useState({ name: "", jira: "", accountManager: "", assetClasses: [] as string[] })

  // Theme colors
  const bgPrimary = isDarkMode ? "bg-[#0a1628]" : "bg-[#f8fafc]"
  const bgSecondary = isDarkMode ? "bg-[#0d2137]" : "bg-white"
  const bgCard = isDarkMode ? "bg-[#132f4c]" : "bg-white"
  const textPrimary = isDarkMode ? "text-white" : "text-[#0a1628]"
  const textSecondary = isDarkMode ? "text-[#b0bec5]" : "text-[#64748b]"
  const borderColor = isDarkMode ? "border-[#1e4976]" : "border-[#e2e8f0]"

  // Sample clients data - now with state
  const [clients, setClients] = useState([
    { id: 1, name: "Goldman Sachs", jira: "GS-001", accountManager: "John Smith", assetClass: "Equities", specCompare: "completed", logAnalysis: "error", scenario: "in-progress", testCase: "completed", certification: "not-started", config: "completed", alerts: 3 },
    { id: 2, name: "Morgan Stanley", jira: "MS-002", accountManager: "Jane Doe", assetClass: "Fixed Income", specCompare: "completed", logAnalysis: "completed", scenario: "completed", testCase: "in-progress", certification: "not-started", config: "completed", alerts: 0 },
    { id: 3, name: "JP Morgan", jira: "JPM-003", accountManager: "Bob Wilson", assetClass: "Derivatives", specCompare: "in-progress", logAnalysis: "not-started", scenario: "not-started", testCase: "not-started", certification: "not-started", config: "in-progress", alerts: 5 },
    { id: 4, name: "Citadel", jira: "CIT-004", accountManager: "Alice Brown", assetClass: "Equities", specCompare: "completed", logAnalysis: "completed", scenario: "completed", testCase: "completed", certification: "in-progress", config: "completed", alerts: 1 },
    { id: 5, name: "Two Sigma", jira: "TS-005", accountManager: "Charlie Davis", assetClass: "Multi-Asset", specCompare: "error", logAnalysis: "in-progress", scenario: "not-started", testCase: "not-started", certification: "not-started", config: "error", alerts: 8 },
  ])

  const assetClasses = ["Equities", "Fixed Income", "Derivatives", "FX", "Commodities", "Multi-Asset"]

  // Features for landing page
  const features = [
    { icon: GitCompare, title: "Spec Comparison", desc: "Compare client FIX specs against standard specifications" },
    { icon: FileSearch, title: "Log Analysis", desc: "Analyze FIX logs to identify protocol violations" },
    { icon: TestTube, title: "Scenario Creation", desc: "Create and manage test scenarios for validation" },
    { icon: Zap, title: "Test Case Generation", desc: "Auto-generate test cases from specifications" },
    { icon: Award, title: "Certification", desc: "Manage certification workflows and approvals" },
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
        assetClass: newClient.assetClasses.join(", "),
        specCompare: "not-started",
        logAnalysis: "not-started",
        scenario: "not-started",
        testCase: "not-started",
        certification: "not-started",
        config: "not-started",
        alerts: 0,
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

  // Comet Logo Component
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
              {assetClasses.map((ac) => (
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

  // Sidebar Component
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
          { icon: Settings, label: "Settings", screen: "dashboard" },
          { icon: HelpCircle, label: "Help", screen: "dashboard" },
        ].map((item) => (
          <button
            key={item.label}
            onClick={() => setCurrentScreen(item.screen as any)}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
              currentScreen === item.screen 
                ? "bg-[#00e5ff]/10 text-[#00e5ff]" 
                : `${textSecondary} hover:bg-[#1e4976]/30`
            }`}
          >
            <item.icon className="h-5 w-5" />
            {!sidebarCollapsed && <span>{item.label}</span>}
          </button>
        ))}
      </nav>

      <div className={`p-2 border-t ${borderColor} space-y-1 mt-2`}>
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

  // Home Screen with Landing Page
  if (currentScreen === "home") {
    return (
      <div className={`min-h-screen ${bgPrimary} transition-colors overflow-hidden`}>
        {/* Animated Background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className={`absolute top-20 left-10 w-72 h-72 ${isDarkMode ? "bg-[#00e5ff]/5" : "bg-[#00e5ff]/10"} rounded-full blur-3xl animate-pulse`} />
          <div className={`absolute bottom-20 right-10 w-96 h-96 ${isDarkMode ? "bg-[#0091ea]/5" : "bg-[#0091ea]/10"} rounded-full blur-3xl animate-pulse`} style={{ animationDelay: "1s" }} />
          <div className={`absolute top-1/2 left-1/2 w-64 h-64 ${isDarkMode ? "bg-[#4caf50]/5" : "bg-[#4caf50]/10"} rounded-full blur-3xl animate-pulse`} style={{ animationDelay: "2s" }} />
        </div>

        {/* Header */}
        <header className={`${bgSecondary}/80 backdrop-blur-md border-b ${borderColor} sticky top-0 z-50`}>
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CometLogo size={40} />
              <span className={`text-xl font-bold ${textPrimary}`}>B-COMET</span>
            </div>
            <div className="flex items-center gap-4">
              <button onClick={() => setIsDarkMode(!isDarkMode)} className={`p-2 rounded-lg ${textSecondary} hover:bg-[#1e4976]/30 transition-colors`}>
                {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
              <Button variant="outline" onClick={() => { setSelectedRole("client"); setCurrentScreen("login"); }}>Login</Button>
              <Button onClick={() => { setSelectedRole("admin"); setCurrentScreen("login"); }}>Get Started</Button>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="relative max-w-7xl mx-auto px-6 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
            {/* Left Content - 3 columns */}
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
                AI-powered FIX protocol management for configuration, monitoring, evaluation, and tracking. Designed for trading firms and financial institutions.
              </p>

              {/* CTA Buttons */}
              <div className="flex gap-4 mb-8">
                <Button size="lg" onClick={() => { setSelectedRole("admin"); setCurrentScreen("login"); }} className="px-8">
                  Get Started
                </Button>
                <Button size="lg" variant="outline" onClick={() => { setSelectedRole("client"); setCurrentScreen("login"); }}>
                  View Demo
                </Button>
              </div>

              {/* Stats */}
              <div className="flex gap-8">
                <div>
                  <div className={`text-3xl font-bold ${textPrimary}`}>500+</div>
                  <div className={`text-sm ${textSecondary}`}>Clients Onboarded</div>
                </div>
                <div>
                  <div className={`text-3xl font-bold ${textPrimary}`}>99.9%</div>
                  <div className={`text-sm ${textSecondary}`}>Uptime</div>
                </div>
                <div>
                  <div className={`text-3xl font-bold ${textPrimary}`}>50M+</div>
                  <div className={`text-sm ${textSecondary}`}>Messages Processed</div>
                </div>
              </div>
            </div>

            {/* Right Panel - Live Activity - 2 columns */}
            <div className="lg:col-span-2">
              <Card className={`${bgCard}/80 backdrop-blur-md p-6 border ${borderColor}`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className={`font-semibold ${textPrimary}`}>Live Platform Activity</h3>
                  <span className="flex h-2 w-2 rounded-full bg-[#4caf50] animate-pulse" />
                </div>
                <div className="space-y-3">
                  {[
                    { action: "Spec Comparison", client: "Goldman Sachs", status: "completed", time: "2m ago" },
                    { action: "Log Analysis", client: "Morgan Stanley", status: "in-progress", time: "5m ago" },
                    { action: "Test Case Gen", client: "JP Morgan", status: "completed", time: "8m ago" },
                    { action: "Certification", client: "Citadel", status: "in-progress", time: "12m ago" },
                    { action: "Config Update", client: "Two Sigma", status: "completed", time: "15m ago" },
                  ].map((item, i) => (
                    <div key={i} className={`flex items-center justify-between p-3 rounded-lg ${isDarkMode ? "bg-[#0a1628]/50" : "bg-[#f1f5f9]"}`}>
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${item.status === "completed" ? "bg-[#4caf50]" : "bg-[#2196f3] animate-pulse"}`} />
                        <div>
                          <div className={`text-sm font-medium ${textPrimary}`}>{item.action}</div>
                          <div className={`text-xs ${textSecondary}`}>{item.client}</div>
                        </div>
                      </div>
                      <span className={`text-xs ${textSecondary}`}>{item.time}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>

          {/* Role Selection Cards */}
          <div className="mt-16">
            <h2 className={`text-2xl font-bold text-center mb-8 ${textPrimary}`}>Choose Your Role</h2>
            <div className="flex justify-center gap-6">
              <Card 
                className={`${bgCard} p-8 cursor-pointer transition-all hover:scale-105 hover:shadow-2xl border-2 ${borderColor} hover:border-[#00e5ff] group`}
                onClick={() => { setSelectedRole("admin"); setCurrentScreen("login"); }}
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#00e5ff]/20 to-[#0091ea]/20 flex items-center justify-center group-hover:from-[#00e5ff]/30 group-hover:to-[#0091ea]/30 transition-colors">
                  <Shield className="h-8 w-8 text-[#00e5ff]" />
                </div>
                <h3 className={`text-xl font-bold mb-2 text-center ${textPrimary}`}>Admin</h3>
                <p className={`text-sm text-center ${textSecondary}`}>Full access to manage clients, certifications, and system settings</p>
              </Card>
              
              <Card 
                className={`${bgCard} p-8 cursor-pointer transition-all hover:scale-105 hover:shadow-2xl border-2 ${borderColor} hover:border-[#00e5ff] group`}
                onClick={() => { setSelectedRole("client"); setCurrentScreen("login"); }}
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#00e5ff]/20 to-[#0091ea]/20 flex items-center justify-center group-hover:from-[#00e5ff]/30 group-hover:to-[#0091ea]/30 transition-colors">
                  <Building2 className="h-8 w-8 text-[#00e5ff]" />
                </div>
                <h3 className={`text-xl font-bold mb-2 text-center ${textPrimary}`}>Client</h3>
                <p className={`text-sm text-center ${textSecondary}`}>View and manage your organization's FIX specifications</p>
              </Card>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className={`${bgSecondary}/80 backdrop-blur-md py-20 relative`}>
          <div className="max-w-7xl mx-auto px-6">
            <h2 className={`text-3xl font-bold text-center mb-4 ${textPrimary}`}>Platform Capabilities</h2>
            <p className={`text-center mb-12 max-w-2xl mx-auto ${textSecondary}`}>
              Comprehensive tools for FIX protocol management, testing, and certification
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, i) => (
                <Card key={i} className={`${bgCard} p-6 border ${borderColor} hover:border-[#00e5ff]/50 transition-all hover:shadow-lg group`}>
                  <div className="w-12 h-12 mb-4 rounded-lg bg-gradient-to-br from-[#00e5ff]/20 to-[#0091ea]/20 flex items-center justify-center group-hover:from-[#00e5ff]/30 group-hover:to-[#0091ea]/30 transition-colors">
                    <feature.icon className="h-6 w-6 text-[#00e5ff]" />
                  </div>
                  <h3 className={`text-lg font-bold mb-2 ${textPrimary}`}>{feature.title}</h3>
                  <p className={`text-sm ${textSecondary}`}>{feature.desc}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className={`${bgSecondary} border-t ${borderColor} py-8`}>
          <div className="max-w-7xl mx-auto px-6 text-center">
            <p className={textSecondary}>2024 B-COMET. BTCS FIX AI Platform.</p>
          </div>
        </footer>
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
          
          <h2 className={`text-2xl font-bold text-center mb-2 ${textPrimary}`}>
            {selectedRole === "admin" ? "Admin Login" : "Client Login"}
          </h2>
          <p className={`text-center mb-6 ${textSecondary}`}>Enter your credentials to continue</p>
          
          <div className="space-y-4">
            <div>
              <label className={`text-sm font-medium ${textPrimary}`}>Email</label>
              <Input 
                type="email" 
                placeholder="Enter your email" 
                className={`mt-1 ${isDarkMode ? "bg-[#0a1628] border-[#1e4976] text-white placeholder:text-[#64748b]" : "bg-white border-[#e2e8f0] text-[#0a1628]"}`}
              />
            </div>
            <div>
              <label className={`text-sm font-medium ${textPrimary}`}>Password</label>
              <Input 
                type="password" 
                placeholder="Enter your password" 
                className={`mt-1 ${isDarkMode ? "bg-[#0a1628] border-[#1e4976] text-white placeholder:text-[#64748b]" : "bg-white border-[#e2e8f0] text-[#0a1628]"}`}
              />
            </div>
            <Button className="w-full" onClick={() => setCurrentScreen("dashboard")}>
              Sign In
            </Button>
          </div>
          
          <div className="mt-6 text-center">
            <p className={textSecondary}>
              {"Don't have an account? "}
              <button className="text-[#00e5ff] hover:underline">Register</button>
            </p>
            <button 
              onClick={() => setCurrentScreen("home")} 
              className={`mt-4 text-sm ${textSecondary} hover:text-[#00e5ff]`}
            >
              Back to Home
            </button>
          </div>
        </Card>
      </div>
    )
  }

  // Dashboard with Sidebar
  if (currentScreen === "dashboard" || currentScreen === "clients") {
    return (
      <div className={`min-h-screen ${bgPrimary} flex`}>
        <Sidebar />
        {showAddClientModal && <AddClientModal />}
        
        <div className="flex-1 overflow-auto">
          {/* Top Bar */}
          <header className={`${bgSecondary} border-b ${borderColor} px-6 py-4 flex items-center justify-between`}>
            <h1 className={`text-xl font-bold ${textPrimary}`}>
              {currentScreen === "dashboard" ? "Dashboard" : "Clients"}
            </h1>
            <div className="flex items-center gap-4">
              <Button onClick={() => setShowAddClientModal(true)}>
                <Plus className="h-4 w-4 mr-2" /> Add Client
              </Button>
              <button className={`p-2 rounded-lg ${textSecondary} hover:bg-[#1e4976]/30 relative`}>
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-[#f44336] rounded-full text-xs text-white flex items-center justify-center">3</span>
              </button>
              <div className={`flex items-center gap-2 ${textPrimary}`}>
                <div className="h-8 w-8 rounded-full bg-[#00e5ff]/20 flex items-center justify-center">
                  <span className="text-[#00e5ff] font-medium">A</span>
                </div>
                <span className="font-medium">{selectedRole === "admin" ? "Admin" : "Client"}</span>
              </div>
            </div>
          </header>

          {/* Client Table */}
          <div className="p-6">
            <Card className={`${bgCard} border ${borderColor} overflow-hidden`}>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className={`${isDarkMode ? "bg-[#1e4976]/30" : "bg-[#f1f5f9]"}`}>
                    <tr>
                      <th className={`px-4 py-3 text-left text-sm font-medium ${textPrimary}`}>Client</th>
                      <th className={`px-4 py-3 text-center text-sm font-medium ${textPrimary}`}>Spec Compare</th>
                      <th className={`px-4 py-3 text-center text-sm font-medium ${textPrimary}`}>Log Analysis</th>
                      <th className={`px-4 py-3 text-center text-sm font-medium ${textPrimary}`}>Scenario</th>
                      <th className={`px-4 py-3 text-center text-sm font-medium ${textPrimary}`}>Test Cases</th>
                      <th className={`px-4 py-3 text-center text-sm font-medium ${textPrimary}`}>Certification</th>
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
                        <td className={`px-4 py-3 font-medium ${textPrimary}`}>{client.name}</td>
                        <td className="px-4 py-3 text-center">{getStatusBadge(client.specCompare)}</td>
                        <td className="px-4 py-3 text-center">{getStatusBadge(client.logAnalysis)}</td>
                        <td className="px-4 py-3 text-center">{getStatusBadge(client.scenario)}</td>
                        <td className="px-4 py-3 text-center">{getStatusBadge(client.testCase)}</td>
                        <td className="px-4 py-3 text-center">{getStatusBadge(client.certification)}</td>
                        <td className="px-4 py-3 text-center">{getStatusBadge(client.config)}</td>
                        <td className="px-4 py-3 text-center">
                          {client.alerts > 0 ? (
                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-[#f44336]/20 text-[#f44336] text-xs font-medium">
                              <Bell className="h-3 w-3" /> {client.alerts}
                            </span>
                          ) : (
                            <span className={`text-sm ${textSecondary}`}>-</span>
                          )}
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

  // Client Detail Screen
  if (currentScreen === "client-detail" && selectedClient) {
    const tools = [
      { key: "specCompare", title: "Spec Comparison", icon: GitCompare, status: selectedClient.specCompare, screen: "spec-compare" },
      { key: "logAnalysis", title: "Log Analysis", icon: FileSearch, status: selectedClient.logAnalysis, screen: "log-analysis" },
      { key: "scenario", title: "Scenario Creation", icon: Activity, status: selectedClient.scenario, screen: "scenario-creation" },
      { key: "testCase", title: "Test Case Generation", icon: TestTube, status: selectedClient.testCase, screen: "client-detail" },
      { key: "certification", title: "Certification", icon: Award, status: selectedClient.certification, screen: "client-detail" },
      { key: "config", title: "Configuration", icon: Cog, status: selectedClient.config, screen: "client-detail" },
    ]

    return (
      <div className={`min-h-screen ${bgPrimary} flex`}>
        <Sidebar />
        
        <div className="flex-1 overflow-auto">
          <header className={`${bgSecondary} border-b ${borderColor} px-6 py-4`}>
            <button 
              onClick={() => setCurrentScreen("dashboard")} 
              className={`flex items-center gap-2 mb-2 ${textSecondary} hover:text-[#00e5ff]`}
            >
              <ArrowLeft className="h-4 w-4" /> Back to Dashboard
            </button>
            <h1 className={`text-2xl font-bold ${textPrimary}`}>{selectedClient.name}</h1>
            <div className={`mt-2 flex gap-4 text-sm ${textSecondary}`}>
              <span>JIRA: {selectedClient.jira}</span>
              <span>Manager: {selectedClient.accountManager}</span>
              <span>Asset Class: {selectedClient.assetClass}</span>
            </div>
          </header>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tools.map((tool) => (
                <Card 
                  key={tool.key}
                  className={`${bgCard} p-6 border ${borderColor} cursor-pointer hover:border-[#00e5ff] transition-colors`}
                  onClick={() => setCurrentScreen(tool.screen as any)}
                >
                  <div className="flex items-center justify-between mb-4">
                    <tool.icon className="h-8 w-8 text-[#00e5ff]" />
                    {getStatusBadge(tool.status)}
                  </div>
                  <h3 className={`text-lg font-bold ${textPrimary}`}>{tool.title}</h3>
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
            <button 
              onClick={() => setCurrentScreen("client-detail")} 
              className={`flex items-center gap-2 mb-2 ${textSecondary} hover:text-[#00e5ff]`}
            >
              <ArrowLeft className="h-4 w-4" /> Back to {selectedClient?.name}
            </button>
            <h1 className={`text-2xl font-bold ${textPrimary}`}>Spec Comparison</h1>
          </header>

          <div className="p-6">
            {/* Upload Section */}
            <Card className={`${bgCard} p-6 border ${borderColor} mb-6`}>
              <div className="grid grid-cols-2 gap-6">
                <div className={`border-2 border-dashed ${borderColor} rounded-lg p-8 text-center`}>
                  <Upload className={`h-12 w-12 mx-auto mb-4 ${textSecondary}`} />
                  <p className={`font-medium ${textPrimary}`}>Client Spec</p>
                  <p className={`text-sm ${textSecondary}`}>Drop file or click to upload</p>
                </div>
                <div className={`border-2 border-dashed ${borderColor} rounded-lg p-8 text-center`}>
                  <Upload className={`h-12 w-12 mx-auto mb-4 ${textSecondary}`} />
                  <p className={`font-medium ${textPrimary}`}>Admin Spec</p>
                  <p className={`text-sm ${textSecondary}`}>Drop file or click to upload</p>
                </div>
              </div>
              <div className="mt-6 flex justify-center gap-4">
                <Button onClick={() => setShowSpecResults(true)}>
                  <Play className="h-4 w-4 mr-2" /> Run Sample Comparison
                </Button>
              </div>
            </Card>

            {/* Results Section */}
            {showSpecResults && (
              <Card className={`${bgCard} p-6 border ${borderColor}`}>
                <h2 className={`text-xl font-bold mb-6 ${textPrimary}`}>Comparison Results</h2>
                
                <div className="grid grid-cols-2 gap-6">
                  <div className={`text-center font-bold pb-2 border-b ${borderColor} ${textPrimary}`}>Client Spec</div>
                  <div className={`text-center font-bold pb-2 border-b ${borderColor} ${textPrimary}`}>Admin Spec</div>
                </div>

                {/* Undefined Message Types */}
                <div className="mt-6">
                  <h3 className={`font-bold mb-3 ${textPrimary}`}>1. Undefined Message Types</h3>
                  <div className="grid grid-cols-2 gap-6">
                    <div className={`p-4 rounded-lg ${isDarkMode ? "bg-[#f44336]/10" : "bg-[#ffebee]"}`}>
                      <p className="text-[#f44336]">35=K and 35=H undefined</p>
                    </div>
                    <div className={`p-4 rounded-lg ${isDarkMode ? "bg-[#f44336]/10" : "bg-[#ffebee]"}`}>
                      <p className="text-[#f44336]">35=DF, 35=L undefined</p>
                    </div>
                  </div>
                </div>

                {/* Unsupported Tags */}
                <div className="mt-6">
                  <h3 className={`font-bold mb-3 ${textPrimary}`}>2. Unsupported Tags</h3>
                  <div className="grid grid-cols-2 gap-6">
                    <div className={`p-4 rounded-lg space-y-2 ${isDarkMode ? "bg-[#ff9800]/10" : "bg-[#fff3e0]"}`}>
                      <p className="text-[#ff9800]">35=D, tags 375, 943</p>
                      <p className="text-[#ff9800]">35=G, tags 524, 133</p>
                    </div>
                    <div className={`p-4 rounded-lg space-y-2 ${isDarkMode ? "bg-[#ff9800]/10" : "bg-[#fff3e0]"}`}>
                      <p className="text-[#ff9800]">35=D, tags 111, 6454</p>
                      <p className="text-[#ff9800]">35=8, tags 5124, 1331</p>
                    </div>
                  </div>
                </div>

                {/* Unsupported Tag Values */}
                <div className="mt-6">
                  <h3 className={`font-bold mb-3 ${textPrimary}`}>3. Unsupported Tag Values</h3>
                  <div className="grid grid-cols-2 gap-6">
                    <div className={`p-4 rounded-lg space-y-2 ${isDarkMode ? "bg-[#2196f3]/10" : "bg-[#e3f2fd]"}`}>
                      <p className="text-[#2196f3]">123=4, 7, 9</p>
                      <p className="text-[#2196f3]">56=24, 56, gh</p>
                    </div>
                    <div className={`p-4 rounded-lg space-y-2 ${isDarkMode ? "bg-[#2196f3]/10" : "bg-[#e3f2fd]"}`}>
                      <p className="text-[#2196f3]">123=12, 55, 78</p>
                      <p className="text-[#2196f3]">76=5, 8, 0</p>
                    </div>
                  </div>
                </div>

                {/* Datatype Mismatch */}
                <div className="mt-6">
                  <h3 className={`font-bold mb-3 ${textPrimary}`}>4. Datatype Mismatch</h3>
                  <div className="grid grid-cols-2 gap-6">
                    <div className={`p-4 rounded-lg ${isDarkMode ? "bg-[#9c27b0]/10" : "bg-[#f3e5f5]"}`}>
                      <p className="text-[#9c27b0]">Tag 46 is String</p>
                    </div>
                    <div className={`p-4 rounded-lg ${isDarkMode ? "bg-[#9c27b0]/10" : "bg-[#f3e5f5]"}`}>
                      <p className="text-[#9c27b0]">Tag 98 is Char</p>
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

  // Log Analysis Screen
  if (currentScreen === "log-analysis") {
    return (
      <div className={`min-h-screen ${bgPrimary} flex`}>
        <Sidebar />
        
        <div className="flex-1 overflow-auto">
          <header className={`${bgSecondary} border-b ${borderColor} px-6 py-4`}>
            <button 
              onClick={() => setCurrentScreen("client-detail")} 
              className={`flex items-center gap-2 mb-2 ${textSecondary} hover:text-[#00e5ff]`}
            >
              <ArrowLeft className="h-4 w-4" /> Back to {selectedClient?.name}
            </button>
            <h1 className={`text-2xl font-bold ${textPrimary}`}>Log Analysis</h1>
            <p className={textSecondary}>Analyze FIX logs against specification to find protocol violations</p>
          </header>

          <div className="p-6">
            {/* Upload Section */}
            <Card className={`${bgCard} p-6 border ${borderColor} mb-6`}>
              <div className="grid grid-cols-2 gap-6">
                <div className={`border-2 border-dashed ${borderColor} rounded-lg p-8 text-center`}>
                  <FileText className={`h-12 w-12 mx-auto mb-4 ${textSecondary}`} />
                  <p className={`font-medium ${textPrimary}`}>FIX Log File</p>
                  <p className={`text-sm ${textSecondary}`}>Drop .log file or click to upload</p>
                </div>
                <div className={`border-2 border-dashed ${borderColor} rounded-lg p-8 text-center`}>
                  <Upload className={`h-12 w-12 mx-auto mb-4 ${textSecondary}`} />
                  <p className={`font-medium ${textPrimary}`}>FIX Specification</p>
                  <p className={`text-sm ${textSecondary}`}>Drop .xml spec file</p>
                </div>
              </div>
              <div className="mt-6 flex justify-center gap-4">
                <Button onClick={() => setShowLogResults(true)}>
                  <Play className="h-4 w-4 mr-2" /> Run Sample Analysis
                </Button>
              </div>
            </Card>

            {/* Results Section */}
            {showLogResults && (
              <Card className={`${bgCard} p-6 border ${borderColor}`}>
                <h2 className={`text-xl font-bold mb-6 ${textPrimary}`}>Log Analysis Results</h2>
                
                <div className="grid grid-cols-2 gap-6">
                  <div className={`text-center font-bold pb-2 border-b ${borderColor} ${textPrimary}`}>Log File Issues</div>
                  <div className={`text-center font-bold pb-2 border-b ${borderColor} ${textPrimary}`}>Spec Requirement</div>
                </div>

                {/* Undefined Message Types in Log */}
                <div className="mt-6">
                  <h3 className={`font-bold mb-3 ${textPrimary}`}>1. Unknown Message Types in Log</h3>
                  <div className="grid grid-cols-2 gap-6">
                    <div className={`p-4 rounded-lg ${isDarkMode ? "bg-[#f44336]/10" : "bg-[#ffebee]"}`}>
                      <p className="text-[#f44336]">Found: 35=XY (line 145)</p>
                      <p className="text-[#f44336]">Found: 35=ZZ (line 892)</p>
                    </div>
                    <div className={`p-4 rounded-lg ${isDarkMode ? "bg-[#4caf50]/10" : "bg-[#e8f5e9]"}`}>
                      <p className="text-[#4caf50]">Not defined in spec</p>
                    </div>
                  </div>
                </div>

                {/* Invalid Tags */}
                <div className="mt-6">
                  <h3 className={`font-bold mb-3 ${textPrimary}`}>2. Invalid Tags for Message Type</h3>
                  <div className="grid grid-cols-2 gap-6">
                    <div className={`p-4 rounded-lg space-y-2 ${isDarkMode ? "bg-[#ff9800]/10" : "bg-[#fff3e0]"}`}>
                      <p className="text-[#ff9800]">35=D: tag 9999 (line 234)</p>
                      <p className="text-[#ff9800]">35=8: tag 8888 (line 567)</p>
                    </div>
                    <div className={`p-4 rounded-lg space-y-2 ${isDarkMode ? "bg-[#4caf50]/10" : "bg-[#e8f5e9]"}`}>
                      <p className="text-[#4caf50]">Tag 9999 not allowed in NewOrderSingle</p>
                      <p className="text-[#4caf50]">Tag 8888 not allowed in ExecutionReport</p>
                    </div>
                  </div>
                </div>

                {/* Invalid Values */}
                <div className="mt-6">
                  <h3 className={`font-bold mb-3 ${textPrimary}`}>3. Invalid Tag Values</h3>
                  <div className="grid grid-cols-2 gap-6">
                    <div className={`p-4 rounded-lg space-y-2 ${isDarkMode ? "bg-[#2196f3]/10" : "bg-[#e3f2fd]"}`}>
                      <p className="text-[#2196f3]">54=X (line 123)</p>
                      <p className="text-[#2196f3]">40=Z (line 456)</p>
                    </div>
                    <div className={`p-4 rounded-lg space-y-2 ${isDarkMode ? "bg-[#4caf50]/10" : "bg-[#e8f5e9]"}`}>
                      <p className="text-[#4caf50]">Side(54): Valid values are 1,2,5,6</p>
                      <p className="text-[#4caf50]">OrdType(40): Valid values are 1,2,3,4</p>
                    </div>
                  </div>
                </div>

                {/* Missing Required Tags */}
                <div className="mt-6">
                  <h3 className={`font-bold mb-3 ${textPrimary}`}>4. Missing Required Tags</h3>
                  <div className="grid grid-cols-2 gap-6">
                    <div className={`p-4 rounded-lg space-y-2 ${isDarkMode ? "bg-[#9c27b0]/10" : "bg-[#f3e5f5]"}`}>
                      <p className="text-[#9c27b0]">35=D missing tag 55 (line 789)</p>
                      <p className="text-[#9c27b0]">35=D missing tag 54 (line 891)</p>
                    </div>
                    <div className={`p-4 rounded-lg space-y-2 ${isDarkMode ? "bg-[#4caf50]/10" : "bg-[#e8f5e9]"}`}>
                      <p className="text-[#4caf50]">Symbol(55) is required</p>
                      <p className="text-[#4caf50]">Side(54) is required</p>
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

  // Scenario Creation Screen
  if (currentScreen === "scenario-creation") {
    const sampleScenarios = [
      { id: 1, name: "New Order Single - Buy", type: "order", source: "log", status: "valid", msgType: "D" },
      { id: 2, name: "New Order Single - Sell", type: "order", source: "log", status: "valid", msgType: "D" },
      { id: 3, name: "Order Cancel Request", type: "cancel", source: "log", status: "valid", msgType: "F" },
      { id: 4, name: "Execution Report - Fill", type: "execution", source: "spec", status: "valid", msgType: "8" },
      { id: 5, name: "Execution Report - Partial", type: "execution", source: "spec", status: "warning", msgType: "8" },
      { id: 6, name: "Order Cancel Reject", type: "cancel", source: "log", status: "error", msgType: "9" },
      { id: 7, name: "Market Data Request", type: "market-data", source: "spec", status: "valid", msgType: "V" },
      { id: 8, name: "Quote Request", type: "quote", source: "both", status: "valid", msgType: "R" },
      { id: 9, name: "Trade Capture Report", type: "trade", source: "log", status: "warning", msgType: "AE" },
      { id: 10, name: "Position Report", type: "position", source: "spec", status: "error", msgType: "AP" },
    ]

    const filteredScenarios = scenarioFilter === "all" 
      ? sampleScenarios 
      : sampleScenarios.filter(s => s.status === scenarioFilter)

    return (
      <div className={`min-h-screen ${bgPrimary} flex`}>
        <Sidebar />
        
        <div className="flex-1 overflow-auto">
          <header className={`${bgSecondary} border-b ${borderColor} px-6 py-4`}>
            <button 
              onClick={() => setCurrentScreen("client-detail")} 
              className={`flex items-center gap-2 mb-2 ${textSecondary} hover:text-[#00e5ff]`}
            >
              <ArrowLeft className="h-4 w-4" /> Back to {selectedClient?.name}
            </button>
            <h1 className={`text-2xl font-bold ${textPrimary}`}>Scenario Creation</h1>
            <p className={textSecondary}>Generate test scenarios from log files or FIX specifications</p>
          </header>

          <div className="p-6">
            {/* Upload Section */}
            <Card className={`${bgCard} p-6 border ${borderColor} mb-6`}>
              <h3 className={`text-lg font-bold mb-4 ${textPrimary}`}>Upload Sources</h3>
              <div className="grid grid-cols-3 gap-6">
                <div className={`border-2 border-dashed ${borderColor} rounded-lg p-6 text-center hover:border-[#00e5ff] transition-colors cursor-pointer`}>
                  <FileText className={`h-10 w-10 mx-auto mb-3 ${textSecondary}`} />
                  <p className={`font-medium ${textPrimary}`}>Log File</p>
                  <p className={`text-sm ${textSecondary}`}>Extract scenarios from logs</p>
                </div>
                <div className={`border-2 border-dashed ${borderColor} rounded-lg p-6 text-center hover:border-[#00e5ff] transition-colors cursor-pointer`}>
                  <Upload className={`h-10 w-10 mx-auto mb-3 ${textSecondary}`} />
                  <p className={`font-medium ${textPrimary}`}>FIX Specification</p>
                  <p className={`text-sm ${textSecondary}`}>Generate from spec</p>
                </div>
                <div className={`border-2 border-dashed ${borderColor} rounded-lg p-6 text-center hover:border-[#00e5ff] transition-colors cursor-pointer`}>
                  <GitCompare className={`h-10 w-10 mx-auto mb-3 ${textSecondary}`} />
                  <p className={`font-medium ${textPrimary}`}>Both</p>
                  <p className={`text-sm ${textSecondary}`}>Combine log + spec</p>
                </div>
              </div>
              <div className="mt-6 flex justify-center">
                <Button onClick={() => setShowScenarioResults(true)}>
                  <Play className="h-4 w-4 mr-2" /> Run Sample Generation
                </Button>
              </div>
            </Card>

            {/* Results Section */}
            {showScenarioResults && (
              <Card className={`${bgCard} p-6 border ${borderColor}`}>
                <div className="flex items-center justify-between mb-6">
                  <h2 className={`text-xl font-bold ${textPrimary}`}>Generated Scenarios</h2>
                  <div className="flex gap-2">
                    {["all", "valid", "warning", "error"].map((filter) => (
                      <button
                        key={filter}
                        onClick={() => setScenarioFilter(filter)}
                        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                          scenarioFilter === filter
                            ? filter === "valid" ? "bg-[#4caf50] text-white"
                              : filter === "warning" ? "bg-[#ff9800] text-white"
                              : filter === "error" ? "bg-[#f44336] text-white"
                              : "bg-[#00e5ff] text-[#0a1628]"
                            : isDarkMode 
                              ? "bg-[#1e4976]/30 text-[#b0bec5] hover:bg-[#1e4976]/50" 
                              : "bg-[#e2e8f0] text-[#64748b] hover:bg-[#cbd5e1]"
                        }`}
                      >
                        {filter === "all" ? "All" : filter.charAt(0).toUpperCase() + filter.slice(1)} 
                        ({filter === "all" ? sampleScenarios.length : sampleScenarios.filter(s => s.status === filter).length})
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  {filteredScenarios.map((scenario) => (
                    <div 
                      key={scenario.id}
                      className={`flex items-center justify-between p-4 rounded-lg border ${borderColor} ${isDarkMode ? "bg-[#0a1628]/50" : "bg-[#f8fafc]"}`}
                    >
                      <div className="flex items-center gap-4">
                        <input 
                          type="checkbox" 
                          defaultChecked={scenario.status === "valid"}
                          className="h-4 w-4 rounded border-[#1e4976]"
                        />
                        <div>
                          <p className={`font-medium ${textPrimary}`}>{scenario.name}</p>
                          <p className={`text-sm ${textSecondary}`}>
                            MsgType: {scenario.msgType} | Source: {scenario.source}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          scenario.status === "valid" ? "bg-[#4caf50]/20 text-[#4caf50]"
                            : scenario.status === "warning" ? "bg-[#ff9800]/20 text-[#ff9800]"
                            : "bg-[#f44336]/20 text-[#f44336]"
                        }`}>
                          {scenario.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex justify-end gap-3">
                  <Button variant="outline">Export Selected</Button>
                  <Button>Save Scenarios</Button>
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
