"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { 
  ChevronRight, Play, Sun, Moon, CheckCircle, GitCompare, 
  Users, FileText, Activity, Settings, Bell, Search,
  Building2, ArrowLeft, Upload, RefreshCw, Download,
  AlertTriangle, Clock, TrendingUp, Shield, Zap,
  BarChart3, Network, TestTube, MessageSquare, X,
  ChevronLeft, Filter, Plus, Eye, Edit, Trash2,
  Check, XCircle, Info, ArrowRight, LogOut, Lock, Mail, User,
  Home, LayoutDashboard, FolderOpen, Wrench, HelpCircle
} from "lucide-react"

export default function BCometPlatform() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [currentScreen, setCurrentScreen] = useState<"home" | "login" | "register" | "dashboard" | "client-detail" | "spec-compare" | "log-analysis">("home")
  const [selectedRole, setSelectedRole] = useState<string | null>(null)
  const [viewingClient, setViewingClient] = useState<any>(null)
  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")
  const [registerName, setRegisterName] = useState("")
  const [registerEmail, setRegisterEmail] = useState("")
  const [registerPassword, setRegisterPassword] = useState("")
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  
  // Spec Compare state
  const [spec1File, setSpec1File] = useState<string | null>(null)
  const [spec2File, setSpec2File] = useState<string | null>(null)
  const [specCompareResults, setSpecCompareResults] = useState<any>(null)
  
  // Log Analysis state
  const [logFile, setLogFile] = useState<string | null>(null)
  const [logSpecFile, setLogSpecFile] = useState<string | null>(null)
  const [logAnalysisResults, setLogAnalysisResults] = useState<any>(null)

  const [orders, setOrders] = useState([
    { id: 1, type: "BUY", symbol: "AAPL", qty: 975, price: "218.31" },
    { id: 2, type: "BUY", symbol: "META", qty: 963, price: "612.45" },
    { id: 3, type: "BUY", symbol: "NVDA", qty: 159, price: "330.68" },
  ])
  
  const [candleData] = useState([
    { open: 100, close: 105, high: 108, low: 98, color: "#4caf50" },
    { open: 105, close: 102, high: 107, low: 100, color: "#f44336" },
    { open: 102, close: 110, high: 112, low: 101, color: "#4caf50" },
    { open: 110, close: 108, high: 113, low: 106, color: "#f44336" },
    { open: 108, close: 115, high: 117, low: 107, color: "#4caf50" },
  ])

  // Status types
  type StatusType = "not-started" | "in-progress" | "completed" | "error"
  
  const clients = [
    { 
      id: 1, 
      name: "BlackRock", 
      specComparison: "completed" as StatusType,
      logAnalysis: "completed" as StatusType,
      scenarioCreation: "in-progress" as StatusType,
      testCaseGen: "completed" as StatusType,
      certCaseGen: "in-progress" as StatusType,
      configCreation: "completed" as StatusType,
      alerts: 2
    },
    { 
      id: 2, 
      name: "Goldman Sachs", 
      specComparison: "completed" as StatusType,
      logAnalysis: "error" as StatusType,
      scenarioCreation: "not-started" as StatusType,
      testCaseGen: "in-progress" as StatusType,
      certCaseGen: "not-started" as StatusType,
      configCreation: "completed" as StatusType,
      alerts: 5
    },
    { 
      id: 3, 
      name: "JP Morgan", 
      specComparison: "in-progress" as StatusType,
      logAnalysis: "not-started" as StatusType,
      scenarioCreation: "not-started" as StatusType,
      testCaseGen: "not-started" as StatusType,
      certCaseGen: "not-started" as StatusType,
      configCreation: "in-progress" as StatusType,
      alerts: 0
    },
    { 
      id: 4, 
      name: "UBS", 
      specComparison: "completed" as StatusType,
      logAnalysis: "completed" as StatusType,
      scenarioCreation: "completed" as StatusType,
      testCaseGen: "completed" as StatusType,
      certCaseGen: "completed" as StatusType,
      configCreation: "completed" as StatusType,
      alerts: 1
    },
    { 
      id: 5, 
      name: "Morgan Stanley", 
      specComparison: "error" as StatusType,
      logAnalysis: "in-progress" as StatusType,
      scenarioCreation: "not-started" as StatusType,
      testCaseGen: "not-started" as StatusType,
      certCaseGen: "not-started" as StatusType,
      configCreation: "error" as StatusType,
      alerts: 8
    },
  ]

  const roles = [
    { id: "admin", name: "Admin", icon: Shield, description: "Full access to manage clients, certifications, and system settings" },
    { id: "client", name: "Client", icon: Building2, description: "View and manage your organization's FIX specifications" },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setOrders(prev => prev.map(order => ({
        ...order,
        price: (parseFloat(order.price) + (Math.random() - 0.5) * 2).toFixed(2)
      })))
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  const bgPrimary = isDarkMode ? "bg-[#0a1628]" : "bg-[#f8fafc]"
  const bgSecondary = isDarkMode ? "bg-[#0d1f3c]" : "bg-white"
  const textPrimary = isDarkMode ? "text-white" : "text-[#0a1628]"
  const textSecondary = isDarkMode ? "text-[#64b5f6]" : "text-[#64748b]"
  const borderColor = isDarkMode ? "border-[#1e4976]" : "border-[#e2e8f0]"

  const getStatusBadge = (status: StatusType) => {
    switch (status) {
      case "completed":
        return <span className="px-2 py-1 rounded-full text-xs font-medium bg-[#4caf50]/20 text-[#4caf50]">Completed</span>
      case "in-progress":
        return <span className="px-2 py-1 rounded-full text-xs font-medium bg-[#2196f3]/20 text-[#2196f3]">In Progress</span>
      case "error":
        return <span className="px-2 py-1 rounded-full text-xs font-medium bg-[#f44336]/20 text-[#f44336]">Error</span>
      default:
        return <span className="px-2 py-1 rounded-full text-xs font-medium bg-[#9e9e9e]/20 text-[#9e9e9e]">Not Started</span>
    }
  }

  const getStatusIcon = (status: StatusType) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-[#4caf50]" />
      case "in-progress":
        return <Clock className="h-5 w-5 text-[#2196f3]" />
      case "error":
        return <XCircle className="h-5 w-5 text-[#f44336]" />
      default:
        return <div className="h-5 w-5 rounded-full border-2 border-[#9e9e9e]" />
    }
  }

  const CometLogo = () => (
    <svg viewBox="0 0 40 40" className="h-full w-full">
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

  // Sidebar navigation items
  const sidebarItems = [
    { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { id: "clients", icon: Users, label: "Clients" },
    { id: "tools", icon: Wrench, label: "Tools" },
    { id: "settings", icon: Settings, label: "Settings" },
    { id: "help", icon: HelpCircle, label: "Help" },
  ]

  // Sample data for Spec Compare - Updated with side-by-side format
  const runSampleSpecCompare = () => {
    setSpec1File("ClientSpec_FIX44.xml")
    setSpec2File("BTCS_Standard_FIX44.xml")
    setSpecCompareResults({
      messageTypes: {
        client: ["35=K", "35=H"],
        admin: ["35=DF", "35=L"]
      },
      unsupportedTags: {
        client: [
          { msgType: "35=D", tags: ["375", "943"] },
          { msgType: "35=G", tags: ["524", "133"] }
        ],
        admin: [
          { msgType: "35=D", tags: ["111", "6454"] },
          { msgType: "35=8", tags: ["5124", "1331"] }
        ]
      },
      unsupportedTagValues: {
        client: [
          { tag: "123", values: ["4", "7", "9"] },
          { tag: "56", values: ["24", "56", "gh"] }
        ],
        admin: [
          { tag: "123", values: ["12", "55", "78"] },
          { tag: "76", values: ["5", "8", "0"] }
        ]
      },
      datatypeMismatch: [
        { tag: "46", clientType: "String", adminType: "Int" },
        { tag: "98", clientType: "Int", adminType: "Char" }
      ],
      otherDifferences: [
        { description: "Header field ordering differs" },
        { description: "Checksum validation rules vary" }
      ]
    })
  }

  // Sample data for Log Analysis - Shows how logs break FIX specs
  const runSampleLogAnalysis = () => {
    setLogFile("trading_session_20250303.log")
    setLogSpecFile("FIX44_Standard.xml")
    setLogAnalysisResults({
      summary: {
        totalMessages: 1247,
        validMessages: 1198,
        violations: 49
      },
      undefinedMessageTypes: [
        { msgType: "35=ZZ", count: 5, lines: ["156", "234", "567"] },
        { msgType: "35=QQ", count: 3, lines: ["890", "912"] }
      ],
      invalidTags: [
        { msgType: "35=D", tag: "9999", field: "Unknown", count: 12, sample: "Line 156: 9999=InvalidValue" },
        { msgType: "35=8", tag: "8888", field: "Unknown", count: 8, sample: "Line 234: 8888=BadData" }
      ],
      invalidTagValues: [
        { msgType: "35=D", tag: "54", field: "Side", logValue: "X", validValues: ["1", "2", "5", "6"], count: 15 },
        { msgType: "35=8", tag: "150", field: "ExecType", logValue: "Z", validValues: ["0", "1", "2", "4", "5"], count: 6 }
      ],
      missingRequiredTags: [
        { msgType: "35=D", tag: "49", field: "SenderCompID", count: 3 },
        { msgType: "35=D", tag: "56", field: "TargetCompID", count: 2 }
      ],
      datatypeViolations: [
        { msgType: "35=D", tag: "38", field: "OrderQty", expected: "Int", found: "String", sample: "ABC" },
        { msgType: "35=8", tag: "44", field: "Price", expected: "Float", found: "String", sample: "N/A" }
      ]
    })
  }

  // Sidebar Component
  const Sidebar = () => (
    <div className={`fixed left-0 top-0 h-full ${sidebarCollapsed ? "w-16" : "w-56"} ${isDarkMode ? "bg-[#0d1f3c] border-r border-[#1e4976]" : "bg-white border-r border-[#e2e8f0]"} transition-all duration-300 z-50 flex flex-col`}>
      {/* Logo */}
      <div className={`p-4 border-b ${borderColor} flex items-center ${sidebarCollapsed ? "justify-center" : "gap-3"}`}>
        <div className="h-8 w-8 flex-shrink-0"><CometLogo /></div>
        {!sidebarCollapsed && <span className={`text-lg font-bold ${textPrimary}`}>B-COMET</span>}
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 p-2">
        {sidebarItems.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              if (item.id === "dashboard") setCurrentScreen("dashboard")
            }}
            className={`w-full flex items-center ${sidebarCollapsed ? "justify-center" : "gap-3"} px-3 py-3 rounded-lg mb-1 transition-colors ${
              (item.id === "dashboard" && currentScreen === "dashboard") 
                ? isDarkMode ? "bg-[#00e5ff]/20 text-[#00e5ff]" : "bg-[#1976d2]/10 text-[#1976d2]"
                : isDarkMode ? "text-[#64b5f6] hover:bg-[#1e4976]/50" : "text-[#64748b] hover:bg-[#f1f5f9]"
            }`}
          >
            <item.icon className="h-5 w-5 flex-shrink-0" />
            {!sidebarCollapsed && <span className="font-medium">{item.label}</span>}
          </button>
        ))}
      </nav>
      
      {/* Theme Toggle & Collapse */}
      <div className={`p-2 border-t ${borderColor}`}>
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className={`w-full flex items-center ${sidebarCollapsed ? "justify-center" : "gap-3"} px-3 py-3 rounded-lg transition-colors ${isDarkMode ? "text-[#64b5f6] hover:bg-[#1e4976]/50" : "text-[#64748b] hover:bg-[#f1f5f9]"}`}
        >
          {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          {!sidebarCollapsed && <span className="font-medium">{isDarkMode ? "Light Mode" : "Dark Mode"}</span>}
        </button>
        
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className={`w-full flex items-center ${sidebarCollapsed ? "justify-center" : "gap-3"} px-3 py-3 rounded-lg transition-colors ${isDarkMode ? "text-[#64b5f6] hover:bg-[#1e4976]/50" : "text-[#64748b] hover:bg-[#f1f5f9]"}`}
        >
          {sidebarCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
          {!sidebarCollapsed && <span className="font-medium">Collapse</span>}
        </button>
        
        <button
          onClick={() => setCurrentScreen("home")}
          className={`w-full flex items-center ${sidebarCollapsed ? "justify-center" : "gap-3"} px-3 py-3 rounded-lg transition-colors ${isDarkMode ? "text-[#64b5f6] hover:bg-[#1e4976]/50" : "text-[#64748b] hover:bg-[#f1f5f9]"}`}
        >
          <LogOut className="h-5 w-5" />
          {!sidebarCollapsed && <span className="font-medium">Logout</span>}
        </button>
      </div>
    </div>
  )

  // HOME SCREEN
  if (currentScreen === "home") {
    return (
      <div className={`min-h-screen ${bgPrimary}`}>
        <header className={`border-b ${borderColor} px-6 py-4`}>
          <div className="mx-auto flex max-w-7xl items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative h-10 w-10">
                <CometLogo />
              </div>
              <span className={`text-xl font-bold ${textPrimary}`}>B-COMET</span>
            </div>
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`rounded-full p-2 ${isDarkMode ? "bg-[#1e4976] text-[#00e5ff]" : "bg-[#e2e8f0] text-[#0a1628]"}`}
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          </div>
        </header>

        <main className="px-6 py-16">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-12 lg:grid-cols-5 lg:items-center">
              <div className="lg:col-span-3 space-y-8">
                <div className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm ${isDarkMode ? "bg-[#00e5ff]/10" : "bg-[#0a1628]/5"}`}>
                  <span className="flex h-2 w-2 rounded-full bg-[#4caf50] animate-pulse" />
                  <span className={`font-medium ${isDarkMode ? "text-[#00e5ff]" : "text-[#0a1628]"}`}>B-COMET FIX AI Platform</span>
                </div>
                
                <h1 className={`text-4xl lg:text-5xl font-bold leading-tight ${textPrimary}`}>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00e5ff] to-[#0091ea]">B</span>TCS{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00e5ff] to-[#0091ea]">C</span>onfiguration{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00e5ff] to-[#0091ea]">O</span>nboarding
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00e5ff] to-[#0091ea]">M</span>onitoring{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00e5ff] to-[#0091ea]">E</span>valuation{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00e5ff] to-[#0091ea]">T</span>racking
                </h1>
                
                <p className={`text-lg max-w-xl leading-relaxed ${textSecondary}`}>
                  AI-powered FIX protocol management for configuration, monitoring, evaluation, and tracking.
                </p>
                
                <div className="flex flex-wrap gap-4">
                  <Button 
                    onClick={() => { setSelectedRole("admin"); setCurrentScreen("login"); }}
                    className="bg-gradient-to-r from-[#00e5ff] to-[#0091ea] text-[#0a1628] hover:opacity-90 px-6 py-3 text-base font-semibold"
                  >
                    <Shield className="mr-2 h-5 w-5" /> Admin Login
                  </Button>
                  <Button 
                    onClick={() => { setSelectedRole("client"); setCurrentScreen("login"); }}
                    variant="outline"
                    className={`px-6 py-3 text-base ${isDarkMode ? "border-[#1e4976] text-[#00e5ff] hover:bg-[#1e4976]" : "border-[#cbd5e1] text-[#0a1628] hover:bg-[#f1f5f9]"}`}
                  >
                    <Building2 className="mr-2 h-5 w-5" /> Client Login
                  </Button>
                </div>
              </div>

              <div className="lg:col-span-2 relative">
                <div className={`rounded-2xl p-5 backdrop-blur-sm ${isDarkMode ? "bg-[#0d1f3c]/80 border border-[#1e4976]/60" : "bg-white/90 border border-[#e2e8f0]"}`}>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#f44336]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ffc107]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#4caf50]" />
                    <span className={`ml-3 text-xs font-medium ${textSecondary}`}>FIX Message Flow</span>
                  </div>

                  <div className={`mb-4 p-3 rounded-xl ${isDarkMode ? "bg-[#0a1628]/70" : "bg-[#f8fafc]"}`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-xs font-semibold ${textPrimary}`}>Market Data Stream</span>
                      <span className="text-xs text-[#4caf50] font-medium">LIVE</span>
                    </div>
                    <div className="flex items-end gap-1 h-10">
                      {candleData.map((candle, i) => (
                        <div key={i} className="flex-1 flex justify-center">
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: candle.color }} />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className={`mb-4 p-3 rounded-xl ${isDarkMode ? "bg-[#0a1628]/70" : "bg-[#f8fafc]"}`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-xs font-semibold ${textPrimary}`}>Order Flow</span>
                      <span className="text-xs text-[#00e5ff] font-medium">Real-time</span>
                    </div>
                    <div className="space-y-1.5">
                      {orders.slice(0, 3).map((order) => (
                        <div key={order.id} className={`flex items-center justify-between p-2 rounded-lg ${isDarkMode ? "bg-[#0d1f3c]" : "bg-white"}`}>
                          <div className="flex items-center gap-2">
                            <span className={`px-1.5 py-0.5 rounded text-xs font-bold bg-[#4caf50]/20 text-[#4caf50]`}>{order.type}</span>
                            <span className={`font-mono text-xs font-medium ${textPrimary}`}>{order.symbol}</span>
                          </div>
                          <span className={`font-mono text-xs ${isDarkMode ? "text-[#00e5ff]" : "text-[#1976d2]"}`}>${order.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }

  // LOGIN SCREEN
  if (currentScreen === "login") {
    return (
      <div className={`min-h-screen ${bgPrimary} flex items-center justify-center p-6`}>
        <Card className={`w-full max-w-md p-8 ${isDarkMode ? "bg-[#0d1f3c] border-[#1e4976]" : "bg-white border-[#e2e8f0]"}`}>
          <button 
            onClick={() => setCurrentScreen("home")}
            className={`flex items-center gap-2 mb-6 ${textSecondary} hover:opacity-80`}
          >
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </button>
          
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10"><CometLogo /></div>
            <span className={`text-xl font-bold ${textPrimary}`}>B-COMET</span>
          </div>
          
          <h1 className={`text-2xl font-bold mb-2 ${textPrimary}`}>
            {selectedRole === "admin" ? "Admin Login" : "Client Login"}
          </h1>
          <p className={`mb-6 ${textSecondary}`}>Enter your credentials to access the platform.</p>
          
          <div className="space-y-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${textPrimary}`}>Email</label>
              <div className="relative">
                <Mail className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 ${textSecondary}`} />
                <input 
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="Enter your email"
                  className={`w-full pl-10 pr-4 py-3 rounded-lg border ${isDarkMode ? "bg-[#0a1628] border-[#1e4976] text-white placeholder:text-[#64b5f6]/50" : "bg-[#f8fafc] border-[#e2e8f0] placeholder:text-[#94a3b8]"}`}
                />
              </div>
            </div>
            
            <div>
              <label className={`block text-sm font-medium mb-2 ${textPrimary}`}>Password</label>
              <div className="relative">
                <Lock className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 ${textSecondary}`} />
                <input 
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="Enter your password"
                  className={`w-full pl-10 pr-4 py-3 rounded-lg border ${isDarkMode ? "bg-[#0a1628] border-[#1e4976] text-white placeholder:text-[#64b5f6]/50" : "bg-[#f8fafc] border-[#e2e8f0] placeholder:text-[#94a3b8]"}`}
                />
              </div>
            </div>
            
            <Button 
              onClick={() => setCurrentScreen("dashboard")}
              className="w-full bg-gradient-to-r from-[#00e5ff] to-[#0091ea] text-[#0a1628] py-3 font-semibold"
            >
              Sign In <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          
          <div className="mt-6 text-center">
            <p className={textSecondary}>
              {"Don't have an account? "}
              <button onClick={() => setCurrentScreen("register")} className="text-[#00e5ff] hover:underline">
                Register
              </button>
            </p>
          </div>
        </Card>
      </div>
    )
  }

  // REGISTER SCREEN
  if (currentScreen === "register") {
    return (
      <div className={`min-h-screen ${bgPrimary} flex items-center justify-center p-6`}>
        <Card className={`w-full max-w-md p-8 ${isDarkMode ? "bg-[#0d1f3c] border-[#1e4976]" : "bg-white border-[#e2e8f0]"}`}>
          <button 
            onClick={() => setCurrentScreen("login")}
            className={`flex items-center gap-2 mb-6 ${textSecondary} hover:opacity-80`}
          >
            <ArrowLeft className="h-4 w-4" /> Back to Login
          </button>
          
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10"><CometLogo /></div>
            <span className={`text-xl font-bold ${textPrimary}`}>B-COMET</span>
          </div>
          
          <h1 className={`text-2xl font-bold mb-2 ${textPrimary}`}>Create Account</h1>
          <p className={`mb-6 ${textSecondary}`}>Register to access the B-COMET platform.</p>
          
          <div className="space-y-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${textPrimary}`}>Full Name</label>
              <div className="relative">
                <User className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 ${textSecondary}`} />
                <input 
                  type="text"
                  value={registerName}
                  onChange={(e) => setRegisterName(e.target.value)}
                  placeholder="Enter your name"
                  className={`w-full pl-10 pr-4 py-3 rounded-lg border ${isDarkMode ? "bg-[#0a1628] border-[#1e4976] text-white placeholder:text-[#64b5f6]/50" : "bg-[#f8fafc] border-[#e2e8f0] placeholder:text-[#94a3b8]"}`}
                />
              </div>
            </div>
            
            <div>
              <label className={`block text-sm font-medium mb-2 ${textPrimary}`}>Email</label>
              <div className="relative">
                <Mail className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 ${textSecondary}`} />
                <input 
                  type="email"
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                  placeholder="Enter your email"
                  className={`w-full pl-10 pr-4 py-3 rounded-lg border ${isDarkMode ? "bg-[#0a1628] border-[#1e4976] text-white placeholder:text-[#64b5f6]/50" : "bg-[#f8fafc] border-[#e2e8f0] placeholder:text-[#94a3b8]"}`}
                />
              </div>
            </div>
            
            <div>
              <label className={`block text-sm font-medium mb-2 ${textPrimary}`}>Password</label>
              <div className="relative">
                <Lock className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 ${textSecondary}`} />
                <input 
                  type="password"
                  value={registerPassword}
                  onChange={(e) => setRegisterPassword(e.target.value)}
                  placeholder="Create a password"
                  className={`w-full pl-10 pr-4 py-3 rounded-lg border ${isDarkMode ? "bg-[#0a1628] border-[#1e4976] text-white placeholder:text-[#64b5f6]/50" : "bg-[#f8fafc] border-[#e2e8f0] placeholder:text-[#94a3b8]"}`}
                />
              </div>
            </div>
            
            <Button 
              onClick={() => setCurrentScreen("dashboard")}
              className="w-full bg-gradient-to-r from-[#00e5ff] to-[#0091ea] text-[#0a1628] py-3 font-semibold"
            >
              Create Account <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          
          <div className="mt-6 text-center">
            <p className={textSecondary}>
              Already have an account?{" "}
              <button onClick={() => setCurrentScreen("login")} className="text-[#00e5ff] hover:underline">
                Sign In
              </button>
            </p>
          </div>
        </Card>
      </div>
    )
  }

  // SPEC COMPARE SCREEN - Updated with side-by-side view
  if (currentScreen === "spec-compare") {
    return (
      <div className={`min-h-screen ${bgPrimary} flex`}>
        <Sidebar />
        <div className={`flex-1 ${sidebarCollapsed ? "ml-16" : "ml-56"} transition-all duration-300`}>
          <div className="p-6">
            <div className="max-w-7xl mx-auto">
              <button 
                onClick={() => setCurrentScreen("client-detail")}
                className={`flex items-center gap-2 mb-6 ${textSecondary} hover:opacity-80`}
              >
                <ArrowLeft className="h-4 w-4" /> Back to {viewingClient?.name || "Client"}
              </button>
              
              <h1 className={`text-2xl font-bold mb-6 ${textPrimary}`}>FIX Spec Comparison</h1>
              
              {/* Upload Section */}
              <div className="grid gap-6 lg:grid-cols-2 mb-6">
                <Card className={`p-6 ${isDarkMode ? "bg-[#0d1f3c] border-[#1e4976]" : "bg-white border-[#e2e8f0]"}`}>
                  <h3 className={`font-semibold mb-4 ${textPrimary}`}>Client Spec</h3>
                  <div className={`border-2 border-dashed rounded-xl p-8 text-center ${isDarkMode ? "border-[#1e4976]" : "border-[#e2e8f0]"}`}>
                    {spec1File ? (
                      <div className="flex items-center justify-center gap-2">
                        <FileText className="h-6 w-6 text-[#4caf50]" />
                        <span className={textPrimary}>{spec1File}</span>
                      </div>
                    ) : (
                      <>
                        <Upload className={`h-10 w-10 mx-auto mb-3 ${textSecondary}`} />
                        <p className={`mb-2 ${textPrimary}`}>Drop Client FIX Spec here</p>
                        <p className={`text-sm ${textSecondary}`}>or click to browse</p>
                      </>
                    )}
                  </div>
                </Card>
                
                <Card className={`p-6 ${isDarkMode ? "bg-[#0d1f3c] border-[#1e4976]" : "bg-white border-[#e2e8f0]"}`}>
                  <h3 className={`font-semibold mb-4 ${textPrimary}`}>Admin Spec (BTCS Standard)</h3>
                  <div className={`border-2 border-dashed rounded-xl p-8 text-center ${isDarkMode ? "border-[#1e4976]" : "border-[#e2e8f0]"}`}>
                    {spec2File ? (
                      <div className="flex items-center justify-center gap-2">
                        <FileText className="h-6 w-6 text-[#4caf50]" />
                        <span className={textPrimary}>{spec2File}</span>
                      </div>
                    ) : (
                      <>
                        <Upload className={`h-10 w-10 mx-auto mb-3 ${textSecondary}`} />
                        <p className={`mb-2 ${textPrimary}`}>Drop Admin FIX Spec here</p>
                        <p className={`text-sm ${textSecondary}`}>or click to browse</p>
                      </>
                    )}
                  </div>
                </Card>
              </div>
              
              <div className="flex gap-4 mb-6">
                <Button className="bg-gradient-to-r from-[#00e5ff] to-[#0091ea] text-[#0a1628]">
                  <GitCompare className="h-4 w-4 mr-2" /> Compare Specs
                </Button>
                <Button 
                  variant="outline" 
                  onClick={runSampleSpecCompare}
                  className={isDarkMode ? "border-[#1e4976] text-[#00e5ff]" : ""}
                >
                  <Play className="h-4 w-4 mr-2" /> Run Sample
                </Button>
              </div>
              
              {/* Results - Side by Side View */}
              {specCompareResults && (
                <div className="space-y-6">
                  {/* 1. Message Types */}
                  <Card className={`p-6 ${isDarkMode ? "bg-[#0d1f3c] border-[#1e4976]" : "bg-white border-[#e2e8f0]"}`}>
                    <h3 className={`font-semibold mb-4 flex items-center gap-2 ${textPrimary}`}>
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#f44336]/20 text-[#f44336] text-sm font-bold">1</span>
                      Undefined Message Types
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className={`p-4 rounded-lg ${isDarkMode ? "bg-[#0a1628]" : "bg-[#f8fafc]"}`}>
                        <p className={`text-sm font-semibold mb-2 ${isDarkMode ? "text-[#00e5ff]" : "text-[#1976d2]"}`}>Client Spec</p>
                        {specCompareResults.messageTypes.client.map((mt: string, i: number) => (
                          <p key={i} className={`font-mono text-sm ${textPrimary}`}>{mt} undefined</p>
                        ))}
                      </div>
                      <div className={`p-4 rounded-lg ${isDarkMode ? "bg-[#0a1628]" : "bg-[#f8fafc]"}`}>
                        <p className={`text-sm font-semibold mb-2 ${isDarkMode ? "text-[#00e5ff]" : "text-[#1976d2]"}`}>Admin Spec</p>
                        {specCompareResults.messageTypes.admin.map((mt: string, i: number) => (
                          <p key={i} className={`font-mono text-sm ${textPrimary}`}>{mt} undefined</p>
                        ))}
                      </div>
                    </div>
                  </Card>
                  
                  {/* 2. Unsupported Tags */}
                  <Card className={`p-6 ${isDarkMode ? "bg-[#0d1f3c] border-[#1e4976]" : "bg-white border-[#e2e8f0]"}`}>
                    <h3 className={`font-semibold mb-4 flex items-center gap-2 ${textPrimary}`}>
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#ffc107]/20 text-[#ffc107] text-sm font-bold">2</span>
                      Unsupported Tags
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className={`p-4 rounded-lg ${isDarkMode ? "bg-[#0a1628]" : "bg-[#f8fafc]"}`}>
                        <p className={`text-sm font-semibold mb-2 ${isDarkMode ? "text-[#00e5ff]" : "text-[#1976d2]"}`}>Client Spec</p>
                        {specCompareResults.unsupportedTags.client.map((item: any, i: number) => (
                          <p key={i} className={`font-mono text-sm ${textPrimary}`}>{item.msgType}, tags {item.tags.join(", ")}</p>
                        ))}
                      </div>
                      <div className={`p-4 rounded-lg ${isDarkMode ? "bg-[#0a1628]" : "bg-[#f8fafc]"}`}>
                        <p className={`text-sm font-semibold mb-2 ${isDarkMode ? "text-[#00e5ff]" : "text-[#1976d2]"}`}>Admin Spec</p>
                        {specCompareResults.unsupportedTags.admin.map((item: any, i: number) => (
                          <p key={i} className={`font-mono text-sm ${textPrimary}`}>{item.msgType}, tags {item.tags.join(", ")}</p>
                        ))}
                      </div>
                    </div>
                  </Card>
                  
                  {/* 3. Unsupported Tag Values */}
                  <Card className={`p-6 ${isDarkMode ? "bg-[#0d1f3c] border-[#1e4976]" : "bg-white border-[#e2e8f0]"}`}>
                    <h3 className={`font-semibold mb-4 flex items-center gap-2 ${textPrimary}`}>
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#ff9800]/20 text-[#ff9800] text-sm font-bold">3</span>
                      Unsupported Tag Values
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className={`p-4 rounded-lg ${isDarkMode ? "bg-[#0a1628]" : "bg-[#f8fafc]"}`}>
                        <p className={`text-sm font-semibold mb-2 ${isDarkMode ? "text-[#00e5ff]" : "text-[#1976d2]"}`}>Client Spec</p>
                        {specCompareResults.unsupportedTagValues.client.map((item: any, i: number) => (
                          <p key={i} className={`font-mono text-sm ${textPrimary}`}>{item.tag}={item.values.join(",")}</p>
                        ))}
                      </div>
                      <div className={`p-4 rounded-lg ${isDarkMode ? "bg-[#0a1628]" : "bg-[#f8fafc]"}`}>
                        <p className={`text-sm font-semibold mb-2 ${isDarkMode ? "text-[#00e5ff]" : "text-[#1976d2]"}`}>Admin Spec</p>
                        {specCompareResults.unsupportedTagValues.admin.map((item: any, i: number) => (
                          <p key={i} className={`font-mono text-sm ${textPrimary}`}>{item.tag}={item.values.join(",")}</p>
                        ))}
                      </div>
                    </div>
                  </Card>
                  
                  {/* 4. Datatype Mismatch */}
                  <Card className={`p-6 ${isDarkMode ? "bg-[#0d1f3c] border-[#1e4976]" : "bg-white border-[#e2e8f0]"}`}>
                    <h3 className={`font-semibold mb-4 flex items-center gap-2 ${textPrimary}`}>
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#9c27b0]/20 text-[#9c27b0] text-sm font-bold">4</span>
                      Datatype Mismatch
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className={`p-4 rounded-lg ${isDarkMode ? "bg-[#0a1628]" : "bg-[#f8fafc]"}`}>
                        <p className={`text-sm font-semibold mb-2 ${isDarkMode ? "text-[#00e5ff]" : "text-[#1976d2]"}`}>Client Spec</p>
                        {specCompareResults.datatypeMismatch.map((item: any, i: number) => (
                          <p key={i} className={`font-mono text-sm ${textPrimary}`}>Tag {item.tag} is {item.clientType}</p>
                        ))}
                      </div>
                      <div className={`p-4 rounded-lg ${isDarkMode ? "bg-[#0a1628]" : "bg-[#f8fafc]"}`}>
                        <p className={`text-sm font-semibold mb-2 ${isDarkMode ? "text-[#00e5ff]" : "text-[#1976d2]"}`}>Admin Spec</p>
                        {specCompareResults.datatypeMismatch.map((item: any, i: number) => (
                          <p key={i} className={`font-mono text-sm ${textPrimary}`}>Tag {item.tag} is {item.adminType}</p>
                        ))}
                      </div>
                    </div>
                  </Card>
                  
                  {/* 5. Other Differences */}
                  <Card className={`p-6 ${isDarkMode ? "bg-[#0d1f3c] border-[#1e4976]" : "bg-white border-[#e2e8f0]"}`}>
                    <h3 className={`font-semibold mb-4 flex items-center gap-2 ${textPrimary}`}>
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#607d8b]/20 text-[#607d8b] text-sm font-bold">5</span>
                      Other Differences
                    </h3>
                    <div className={`p-4 rounded-lg ${isDarkMode ? "bg-[#0a1628]" : "bg-[#f8fafc]"}`}>
                      {specCompareResults.otherDifferences.map((item: any, i: number) => (
                        <div key={i} className="flex items-start gap-2 mb-2">
                          <Info className={`h-4 w-4 mt-0.5 ${textSecondary}`} />
                          <p className={`text-sm ${textPrimary}`}>{item.description}</p>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // LOG ANALYSIS SCREEN - Updated to show spec violations
  if (currentScreen === "log-analysis") {
    return (
      <div className={`min-h-screen ${bgPrimary} flex`}>
        <Sidebar />
        <div className={`flex-1 ${sidebarCollapsed ? "ml-16" : "ml-56"} transition-all duration-300`}>
          <div className="p-6">
            <div className="max-w-7xl mx-auto">
              <button 
                onClick={() => setCurrentScreen("client-detail")}
                className={`flex items-center gap-2 mb-6 ${textSecondary} hover:opacity-80`}
              >
                <ArrowLeft className="h-4 w-4" /> Back to {viewingClient?.name || "Client"}
              </button>
              
              <h1 className={`text-2xl font-bold mb-2 ${textPrimary}`}>Log Analysis</h1>
              <p className={`mb-6 ${textSecondary}`}>Analyze FIX logs against specifications to find protocol violations</p>
              
              {/* Upload Section */}
              <div className="grid gap-6 lg:grid-cols-2 mb-6">
                <Card className={`p-6 ${isDarkMode ? "bg-[#0d1f3c] border-[#1e4976]" : "bg-white border-[#e2e8f0]"}`}>
                  <h3 className={`font-semibold mb-4 ${textPrimary}`}>FIX Log File</h3>
                  <div className={`border-2 border-dashed rounded-xl p-8 text-center ${isDarkMode ? "border-[#1e4976]" : "border-[#e2e8f0]"}`}>
                    {logFile ? (
                      <div className="flex items-center justify-center gap-2">
                        <FileText className="h-6 w-6 text-[#4caf50]" />
                        <span className={textPrimary}>{logFile}</span>
                      </div>
                    ) : (
                      <>
                        <Upload className={`h-10 w-10 mx-auto mb-3 ${textSecondary}`} />
                        <p className={`mb-2 ${textPrimary}`}>Drop log file here</p>
                        <p className={`text-sm ${textSecondary}`}>.log or .txt format</p>
                      </>
                    )}
                  </div>
                </Card>
                
                <Card className={`p-6 ${isDarkMode ? "bg-[#0d1f3c] border-[#1e4976]" : "bg-white border-[#e2e8f0]"}`}>
                  <h3 className={`font-semibold mb-4 ${textPrimary}`}>FIX Specification</h3>
                  <div className={`border-2 border-dashed rounded-xl p-8 text-center ${isDarkMode ? "border-[#1e4976]" : "border-[#e2e8f0]"}`}>
                    {logSpecFile ? (
                      <div className="flex items-center justify-center gap-2">
                        <FileText className="h-6 w-6 text-[#4caf50]" />
                        <span className={textPrimary}>{logSpecFile}</span>
                      </div>
                    ) : (
                      <>
                        <Upload className={`h-10 w-10 mx-auto mb-3 ${textSecondary}`} />
                        <p className={`mb-2 ${textPrimary}`}>Drop spec file here</p>
                        <p className={`text-sm ${textSecondary}`}>XML format</p>
                      </>
                    )}
                  </div>
                </Card>
              </div>
              
              <div className="flex gap-4 mb-6">
                <Button className="bg-gradient-to-r from-[#00e5ff] to-[#0091ea] text-[#0a1628]">
                  <Activity className="h-4 w-4 mr-2" /> Analyze Log
                </Button>
                <Button 
                  variant="outline" 
                  onClick={runSampleLogAnalysis}
                  className={isDarkMode ? "border-[#1e4976] text-[#00e5ff]" : ""}
                >
                  <Play className="h-4 w-4 mr-2" /> Run Sample
                </Button>
              </div>
              
              {/* Results */}
              {logAnalysisResults && (
                <div className="space-y-6">
                  {/* Summary Stats */}
                  <div className="grid grid-cols-4 gap-4">
                    <Card className={`p-4 ${isDarkMode ? "bg-[#0d1f3c] border-[#1e4976]" : "bg-white border-[#e2e8f0]"}`}>
                      <p className={`text-3xl font-bold ${textPrimary}`}>{logAnalysisResults.summary.totalMessages}</p>
                      <p className={`text-sm ${textSecondary}`}>Total Messages</p>
                    </Card>
                    <Card className={`p-4 ${isDarkMode ? "bg-[#0d1f3c] border-[#1e4976]" : "bg-white border-[#e2e8f0]"}`}>
                      <p className="text-3xl font-bold text-[#4caf50]">{logAnalysisResults.summary.validMessages}</p>
                      <p className={`text-sm ${textSecondary}`}>Valid Messages</p>
                    </Card>
                    <Card className={`p-4 ${isDarkMode ? "bg-[#0d1f3c] border-[#1e4976]" : "bg-white border-[#e2e8f0]"}`}>
                      <p className="text-3xl font-bold text-[#f44336]">{logAnalysisResults.summary.violations}</p>
                      <p className={`text-sm ${textSecondary}`}>Violations</p>
                    </Card>
                    <Card className={`p-4 ${isDarkMode ? "bg-[#0d1f3c] border-[#1e4976]" : "bg-white border-[#e2e8f0]"}`}>
                      <p className="text-3xl font-bold text-[#ffc107]">{((logAnalysisResults.summary.validMessages / logAnalysisResults.summary.totalMessages) * 100).toFixed(1)}%</p>
                      <p className={`text-sm ${textSecondary}`}>Compliance Rate</p>
                    </Card>
                  </div>
                  
                  {/* Undefined Message Types in Log */}
                  <Card className={`p-6 ${isDarkMode ? "bg-[#0d1f3c] border-[#1e4976]" : "bg-white border-[#e2e8f0]"}`}>
                    <h3 className={`font-semibold mb-4 flex items-center gap-2 ${textPrimary}`}>
                      <XCircle className="h-5 w-5 text-[#f44336]" />
                      Undefined Message Types (Not in Spec)
                    </h3>
                    <div className="space-y-2">
                      {logAnalysisResults.undefinedMessageTypes.map((item: any, i: number) => (
                        <div key={i} className={`p-3 rounded-lg flex items-center justify-between ${isDarkMode ? "bg-[#0a1628]" : "bg-[#f8fafc]"}`}>
                          <span className={`font-mono ${textPrimary}`}>{item.msgType}</span>
                          <span className={`text-sm ${textSecondary}`}>{item.count} occurrences (lines: {item.lines.join(", ")})</span>
                        </div>
                      ))}
                    </div>
                  </Card>
                  
                  {/* Invalid Tags */}
                  <Card className={`p-6 ${isDarkMode ? "bg-[#0d1f3c] border-[#1e4976]" : "bg-white border-[#e2e8f0]"}`}>
                    <h3 className={`font-semibold mb-4 flex items-center gap-2 ${textPrimary}`}>
                      <AlertTriangle className="h-5 w-5 text-[#ffc107]" />
                      Invalid Tags (Not Defined in Spec)
                    </h3>
                    <div className="space-y-2">
                      {logAnalysisResults.invalidTags.map((item: any, i: number) => (
                        <div key={i} className={`p-3 rounded-lg ${isDarkMode ? "bg-[#0a1628]" : "bg-[#f8fafc]"}`}>
                          <div className="flex items-center justify-between mb-1">
                            <span className={`font-mono font-medium ${textPrimary}`}>{item.msgType} - Tag {item.tag}</span>
                            <span className={`text-sm ${textSecondary}`}>{item.count} occurrences</span>
                          </div>
                          <p className={`text-sm font-mono ${textSecondary}`}>{item.sample}</p>
                        </div>
                      ))}
                    </div>
                  </Card>
                  
                  {/* Invalid Tag Values */}
                  <Card className={`p-6 ${isDarkMode ? "bg-[#0d1f3c] border-[#1e4976]" : "bg-white border-[#e2e8f0]"}`}>
                    <h3 className={`font-semibold mb-4 flex items-center gap-2 ${textPrimary}`}>
                      <XCircle className="h-5 w-5 text-[#f44336]" />
                      Invalid Tag Values
                    </h3>
                    <div className="space-y-2">
                      {logAnalysisResults.invalidTagValues.map((item: any, i: number) => (
                        <div key={i} className={`p-3 rounded-lg ${isDarkMode ? "bg-[#0a1628]" : "bg-[#f8fafc]"}`}>
                          <div className="flex items-center justify-between mb-1">
                            <span className={`font-mono font-medium ${textPrimary}`}>{item.msgType} - Tag {item.tag} ({item.field})</span>
                            <span className={`text-sm ${textSecondary}`}>{item.count} occurrences</span>
                          </div>
                          <p className={`text-sm ${textSecondary}`}>
                            Log value: <span className="text-[#f44336] font-mono">{item.logValue}</span> | 
                            Valid values: <span className="text-[#4caf50] font-mono">{item.validValues.join(", ")}</span>
                          </p>
                        </div>
                      ))}
                    </div>
                  </Card>
                  
                  {/* Missing Required Tags */}
                  <Card className={`p-6 ${isDarkMode ? "bg-[#0d1f3c] border-[#1e4976]" : "bg-white border-[#e2e8f0]"}`}>
                    <h3 className={`font-semibold mb-4 flex items-center gap-2 ${textPrimary}`}>
                      <AlertTriangle className="h-5 w-5 text-[#ff9800]" />
                      Missing Required Tags
                    </h3>
                    <div className="space-y-2">
                      {logAnalysisResults.missingRequiredTags.map((item: any, i: number) => (
                        <div key={i} className={`p-3 rounded-lg flex items-center justify-between ${isDarkMode ? "bg-[#0a1628]" : "bg-[#f8fafc]"}`}>
                          <span className={`font-mono ${textPrimary}`}>{item.msgType} - Tag {item.tag} ({item.field})</span>
                          <span className={`text-sm ${textSecondary}`}>{item.count} messages missing this tag</span>
                        </div>
                      ))}
                    </div>
                  </Card>
                  
                  {/* Datatype Violations */}
                  <Card className={`p-6 ${isDarkMode ? "bg-[#0d1f3c] border-[#1e4976]" : "bg-white border-[#e2e8f0]"}`}>
                    <h3 className={`font-semibold mb-4 flex items-center gap-2 ${textPrimary}`}>
                      <XCircle className="h-5 w-5 text-[#9c27b0]" />
                      Datatype Violations
                    </h3>
                    <div className="space-y-2">
                      {logAnalysisResults.datatypeViolations.map((item: any, i: number) => (
                        <div key={i} className={`p-3 rounded-lg ${isDarkMode ? "bg-[#0a1628]" : "bg-[#f8fafc]"}`}>
                          <div className="flex items-center justify-between mb-1">
                            <span className={`font-mono font-medium ${textPrimary}`}>{item.msgType} - Tag {item.tag} ({item.field})</span>
                          </div>
                          <p className={`text-sm ${textSecondary}`}>
                            Expected: <span className="text-[#4caf50] font-mono">{item.expected}</span> | 
                            Found: <span className="text-[#f44336] font-mono">{item.found}</span> | 
                            Sample: <span className="font-mono">{item.sample}</span>
                          </p>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // CLIENT DETAIL SCREEN
  if (currentScreen === "client-detail" && viewingClient) {
    return (
      <div className={`min-h-screen ${bgPrimary} flex`}>
        <Sidebar />
        <div className={`flex-1 ${sidebarCollapsed ? "ml-16" : "ml-56"} transition-all duration-300`}>
          <div className="p-6">
            <div className="max-w-6xl mx-auto">
              <button 
                onClick={() => setCurrentScreen("dashboard")}
                className={`flex items-center gap-2 mb-6 ${textSecondary} hover:opacity-80`}
              >
                <ArrowLeft className="h-4 w-4" /> Back to Dashboard
              </button>
              
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className={`h-16 w-16 rounded-xl flex items-center justify-center ${isDarkMode ? "bg-[#1e4976]" : "bg-[#e3f2fd]"}`}>
                    <Building2 className={`h-8 w-8 ${isDarkMode ? "text-[#00e5ff]" : "text-[#1976d2]"}`} />
                  </div>
                  <div>
                    <h1 className={`text-2xl font-bold ${textPrimary}`}>{viewingClient.name}</h1>
                    <p className={textSecondary}>Tool Progress Overview</p>
                  </div>
                </div>
                {viewingClient.alerts > 0 && (
                  <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#f44336]/20">
                    <Bell className="h-5 w-5 text-[#f44336]" />
                    <span className="text-[#f44336] font-semibold">{viewingClient.alerts} Alerts</span>
                  </div>
                )}
              </div>
              
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card 
                  onClick={() => setCurrentScreen("spec-compare")}
                  className={`p-6 cursor-pointer transition-all hover:scale-105 ${isDarkMode ? "bg-[#0d1f3c] border-[#1e4976] hover:border-[#00e5ff]" : "bg-white border-[#e2e8f0] hover:border-[#1976d2]"}`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <GitCompare className={`h-8 w-8 ${isDarkMode ? "text-[#00e5ff]" : "text-[#1976d2]"}`} />
                    {getStatusIcon(viewingClient.specComparison)}
                  </div>
                  <h3 className={`font-semibold mb-2 ${textPrimary}`}>FIX Spec Comparison</h3>
                  {getStatusBadge(viewingClient.specComparison)}
                </Card>
                
                <Card 
                  onClick={() => setCurrentScreen("log-analysis")}
                  className={`p-6 cursor-pointer transition-all hover:scale-105 ${isDarkMode ? "bg-[#0d1f3c] border-[#1e4976] hover:border-[#00e5ff]" : "bg-white border-[#e2e8f0] hover:border-[#1976d2]"}`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <Activity className={`h-8 w-8 ${isDarkMode ? "text-[#00e5ff]" : "text-[#1976d2]"}`} />
                    {getStatusIcon(viewingClient.logAnalysis)}
                  </div>
                  <h3 className={`font-semibold mb-2 ${textPrimary}`}>Log Analysis</h3>
                  {getStatusBadge(viewingClient.logAnalysis)}
                </Card>
                
                <Card className={`p-6 ${isDarkMode ? "bg-[#0d1f3c] border-[#1e4976]" : "bg-white border-[#e2e8f0]"}`}>
                  <div className="flex items-center justify-between mb-4">
                    <Network className={`h-8 w-8 ${isDarkMode ? "text-[#00e5ff]" : "text-[#1976d2]"}`} />
                    {getStatusIcon(viewingClient.scenarioCreation)}
                  </div>
                  <h3 className={`font-semibold mb-2 ${textPrimary}`}>Scenario Creation</h3>
                  {getStatusBadge(viewingClient.scenarioCreation)}
                </Card>
                
                <Card className={`p-6 ${isDarkMode ? "bg-[#0d1f3c] border-[#1e4976]" : "bg-white border-[#e2e8f0]"}`}>
                  <div className="flex items-center justify-between mb-4">
                    <TestTube className={`h-8 w-8 ${isDarkMode ? "text-[#00e5ff]" : "text-[#1976d2]"}`} />
                    {getStatusIcon(viewingClient.testCaseGen)}
                  </div>
                  <h3 className={`font-semibold mb-2 ${textPrimary}`}>Test Case Generation</h3>
                  {getStatusBadge(viewingClient.testCaseGen)}
                </Card>
                
                <Card className={`p-6 ${isDarkMode ? "bg-[#0d1f3c] border-[#1e4976]" : "bg-white border-[#e2e8f0]"}`}>
                  <div className="flex items-center justify-between mb-4">
                    <Shield className={`h-8 w-8 ${isDarkMode ? "text-[#00e5ff]" : "text-[#1976d2]"}`} />
                    {getStatusIcon(viewingClient.certCaseGen)}
                  </div>
                  <h3 className={`font-semibold mb-2 ${textPrimary}`}>Certification Case Gen</h3>
                  {getStatusBadge(viewingClient.certCaseGen)}
                </Card>
                
                <Card className={`p-6 ${isDarkMode ? "bg-[#0d1f3c] border-[#1e4976]" : "bg-white border-[#e2e8f0]"}`}>
                  <div className="flex items-center justify-between mb-4">
                    <Settings className={`h-8 w-8 ${isDarkMode ? "text-[#00e5ff]" : "text-[#1976d2]"}`} />
                    {getStatusIcon(viewingClient.configCreation)}
                  </div>
                  <h3 className={`font-semibold mb-2 ${textPrimary}`}>Configuration Creation</h3>
                  {getStatusBadge(viewingClient.configCreation)}
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // DASHBOARD SCREEN
  return (
    <div className={`min-h-screen ${bgPrimary} flex`}>
      <Sidebar />
      <div className={`flex-1 ${sidebarCollapsed ? "ml-16" : "ml-56"} transition-all duration-300`}>
        <div className="p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className={`text-2xl font-bold ${textPrimary}`}>
                  {selectedRole === "admin" ? "Admin Dashboard" : "Client Dashboard"}
                </h1>
                <p className={textSecondary}>Monitor client progress across all tools</p>
              </div>
              <Button className="bg-gradient-to-r from-[#00e5ff] to-[#0091ea] text-[#0a1628]">
                <Plus className="h-4 w-4 mr-2" /> Add Client
              </Button>
            </div>

            <Card className={`overflow-hidden ${isDarkMode ? "bg-[#0d1f3c] border-[#1e4976]" : "bg-white border-[#e2e8f0]"}`}>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className={isDarkMode ? "bg-[#0a1628]" : "bg-[#f8fafc]"}>
                      <th className={`px-4 py-3 text-left text-sm font-semibold ${textPrimary}`}>Client</th>
                      <th className={`px-4 py-3 text-center text-sm font-semibold ${textPrimary}`}>Spec Compare</th>
                      <th className={`px-4 py-3 text-center text-sm font-semibold ${textPrimary}`}>Log Analysis</th>
                      <th className={`px-4 py-3 text-center text-sm font-semibold ${textPrimary}`}>Scenario</th>
                      <th className={`px-4 py-3 text-center text-sm font-semibold ${textPrimary}`}>Test Cases</th>
                      <th className={`px-4 py-3 text-center text-sm font-semibold ${textPrimary}`}>Cert Cases</th>
                      <th className={`px-4 py-3 text-center text-sm font-semibold ${textPrimary}`}>Config</th>
                      <th className={`px-4 py-3 text-center text-sm font-semibold ${textPrimary}`}>Alerts</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clients.map((client) => (
                      <tr 
                        key={client.id} 
                        onClick={() => { setViewingClient(client); setCurrentScreen("client-detail"); }}
                        className={`cursor-pointer transition-colors ${isDarkMode ? "hover:bg-[#1e4976]/30 border-b border-[#1e4976]" : "hover:bg-[#f1f5f9] border-b border-[#e2e8f0]"}`}
                      >
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-3">
                            <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${isDarkMode ? "bg-[#1e4976]" : "bg-[#e3f2fd]"}`}>
                              <Building2 className={`h-5 w-5 ${isDarkMode ? "text-[#00e5ff]" : "text-[#1976d2]"}`} />
                            </div>
                            <span className={`font-medium ${textPrimary}`}>{client.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-center">{getStatusBadge(client.specComparison)}</td>
                        <td className="px-4 py-4 text-center">{getStatusBadge(client.logAnalysis)}</td>
                        <td className="px-4 py-4 text-center">{getStatusBadge(client.scenarioCreation)}</td>
                        <td className="px-4 py-4 text-center">{getStatusBadge(client.testCaseGen)}</td>
                        <td className="px-4 py-4 text-center">{getStatusBadge(client.certCaseGen)}</td>
                        <td className="px-4 py-4 text-center">{getStatusBadge(client.configCreation)}</td>
                        <td className="px-4 py-4 text-center">
                          {client.alerts > 0 ? (
                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-[#f44336]/20 text-[#f44336] text-sm font-medium">
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
    </div>
  )
}
