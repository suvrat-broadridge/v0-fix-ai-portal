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
  Check, XCircle, Info, ArrowRight, LogOut, Lock, Mail, User
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

  // Sample data for Spec Compare
  const runSampleSpecCompare = () => {
    setSpec1File("ClientSpec_FIX44.xml")
    setSpec2File("BTCS_Standard_FIX44.xml")
    setSpecCompareResults({
      compatible: false,
      differences: [
        { type: "missing_tag", location: "NewOrderSingle", detail: "Tag 528 (OrderCapacity) missing in Client Spec" },
        { type: "value_mismatch", location: "ExecutionReport", detail: "Tag 150 (ExecType) has different allowed values" },
        { type: "missing_msg", location: "Root", detail: "Message type AE (TradeCaptureReport) not in Client Spec" },
      ],
      summary: { matched: 45, different: 3, missing: 2 }
    })
  }

  // Sample data for Log Analysis
  const runSampleLogAnalysis = () => {
    setLogFile("trading_session_20250303.log")
    setLogSpecFile("FIX44_Standard.xml")
    setLogAnalysisResults({
      totalMessages: 1247,
      validMessages: 1198,
      invalidMessages: 49,
      issues: [
        { severity: "error", message: "Invalid tag 9999 in NewOrderSingle at line 156" },
        { severity: "warning", message: "Missing required tag 49 (SenderCompID) at line 234" },
        { severity: "error", message: "Value 'X' not valid for tag 54 (Side) at line 567" },
      ],
      summary: { errors: 12, warnings: 37 }
    })
  }

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

  // SPEC COMPARE SCREEN
  if (currentScreen === "spec-compare") {
    return (
      <div className={`min-h-screen ${bgPrimary} p-6`}>
        <div className="max-w-6xl mx-auto">
          <button 
            onClick={() => setCurrentScreen("client-detail")}
            className={`flex items-center gap-2 mb-6 ${textSecondary} hover:opacity-80`}
          >
            <ArrowLeft className="h-4 w-4" /> Back to {viewingClient?.name || "Client"}
          </button>
          
          <h1 className={`text-2xl font-bold mb-6 ${textPrimary}`}>FIX Spec Comparison</h1>
          
          <div className="grid gap-6 lg:grid-cols-2 mb-6">
            <Card className={`p-6 ${isDarkMode ? "bg-[#0d1f3c] border-[#1e4976]" : "bg-white border-[#e2e8f0]"}`}>
              <h3 className={`font-semibold mb-4 ${textPrimary}`}>Specification 1</h3>
              <div className={`border-2 border-dashed rounded-xl p-8 text-center ${isDarkMode ? "border-[#1e4976]" : "border-[#e2e8f0]"}`}>
                {spec1File ? (
                  <div className="flex items-center justify-center gap-2">
                    <FileText className="h-6 w-6 text-[#4caf50]" />
                    <span className={textPrimary}>{spec1File}</span>
                  </div>
                ) : (
                  <>
                    <Upload className={`h-10 w-10 mx-auto mb-3 ${textSecondary}`} />
                    <p className={`mb-2 ${textPrimary}`}>Drop FIX Spec file here</p>
                    <p className={`text-sm ${textSecondary}`}>or click to browse</p>
                  </>
                )}
              </div>
            </Card>
            
            <Card className={`p-6 ${isDarkMode ? "bg-[#0d1f3c] border-[#1e4976]" : "bg-white border-[#e2e8f0]"}`}>
              <h3 className={`font-semibold mb-4 ${textPrimary}`}>Specification 2</h3>
              <div className={`border-2 border-dashed rounded-xl p-8 text-center ${isDarkMode ? "border-[#1e4976]" : "border-[#e2e8f0]"}`}>
                {spec2File ? (
                  <div className="flex items-center justify-center gap-2">
                    <FileText className="h-6 w-6 text-[#4caf50]" />
                    <span className={textPrimary}>{spec2File}</span>
                  </div>
                ) : (
                  <>
                    <Upload className={`h-10 w-10 mx-auto mb-3 ${textSecondary}`} />
                    <p className={`mb-2 ${textPrimary}`}>Drop FIX Spec file here</p>
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
          
          {specCompareResults && (
            <Card className={`p-6 ${isDarkMode ? "bg-[#0d1f3c] border-[#1e4976]" : "bg-white border-[#e2e8f0]"}`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className={`font-semibold ${textPrimary}`}>Comparison Results</h3>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${specCompareResults.compatible ? "bg-[#4caf50]/20 text-[#4caf50]" : "bg-[#f44336]/20 text-[#f44336]"}`}>
                  {specCompareResults.compatible ? "Compatible" : "Differences Found"}
                </span>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className={`p-4 rounded-lg ${isDarkMode ? "bg-[#0a1628]" : "bg-[#f8fafc]"}`}>
                  <p className={`text-2xl font-bold text-[#4caf50]`}>{specCompareResults.summary.matched}</p>
                  <p className={`text-sm ${textSecondary}`}>Matched</p>
                </div>
                <div className={`p-4 rounded-lg ${isDarkMode ? "bg-[#0a1628]" : "bg-[#f8fafc]"}`}>
                  <p className={`text-2xl font-bold text-[#ffc107]`}>{specCompareResults.summary.different}</p>
                  <p className={`text-sm ${textSecondary}`}>Different</p>
                </div>
                <div className={`p-4 rounded-lg ${isDarkMode ? "bg-[#0a1628]" : "bg-[#f8fafc]"}`}>
                  <p className={`text-2xl font-bold text-[#f44336]`}>{specCompareResults.summary.missing}</p>
                  <p className={`text-sm ${textSecondary}`}>Missing</p>
                </div>
              </div>
              
              <div className="space-y-3">
                {specCompareResults.differences.map((diff: any, i: number) => (
                  <div key={i} className={`p-3 rounded-lg flex items-start gap-3 ${isDarkMode ? "bg-[#0a1628]" : "bg-[#f8fafc]"}`}>
                    <AlertTriangle className="h-5 w-5 text-[#ffc107] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className={`font-medium ${textPrimary}`}>{diff.location}</p>
                      <p className={`text-sm ${textSecondary}`}>{diff.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      </div>
    )
  }

  // LOG ANALYSIS SCREEN
  if (currentScreen === "log-analysis") {
    return (
      <div className={`min-h-screen ${bgPrimary} p-6`}>
        <div className="max-w-6xl mx-auto">
          <button 
            onClick={() => setCurrentScreen("client-detail")}
            className={`flex items-center gap-2 mb-6 ${textSecondary} hover:opacity-80`}
          >
            <ArrowLeft className="h-4 w-4" /> Back to {viewingClient?.name || "Client"}
          </button>
          
          <h1 className={`text-2xl font-bold mb-6 ${textPrimary}`}>Log Analysis</h1>
          
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
          
          {logAnalysisResults && (
            <Card className={`p-6 ${isDarkMode ? "bg-[#0d1f3c] border-[#1e4976]" : "bg-white border-[#e2e8f0]"}`}>
              <h3 className={`font-semibold mb-4 ${textPrimary}`}>Analysis Results</h3>
              
              <div className="grid grid-cols-4 gap-4 mb-6">
                <div className={`p-4 rounded-lg ${isDarkMode ? "bg-[#0a1628]" : "bg-[#f8fafc]"}`}>
                  <p className={`text-2xl font-bold ${textPrimary}`}>{logAnalysisResults.totalMessages}</p>
                  <p className={`text-sm ${textSecondary}`}>Total Messages</p>
                </div>
                <div className={`p-4 rounded-lg ${isDarkMode ? "bg-[#0a1628]" : "bg-[#f8fafc]"}`}>
                  <p className={`text-2xl font-bold text-[#4caf50]`}>{logAnalysisResults.validMessages}</p>
                  <p className={`text-sm ${textSecondary}`}>Valid</p>
                </div>
                <div className={`p-4 rounded-lg ${isDarkMode ? "bg-[#0a1628]" : "bg-[#f8fafc]"}`}>
                  <p className={`text-2xl font-bold text-[#f44336]`}>{logAnalysisResults.summary.errors}</p>
                  <p className={`text-sm ${textSecondary}`}>Errors</p>
                </div>
                <div className={`p-4 rounded-lg ${isDarkMode ? "bg-[#0a1628]" : "bg-[#f8fafc]"}`}>
                  <p className={`text-2xl font-bold text-[#ffc107]`}>{logAnalysisResults.summary.warnings}</p>
                  <p className={`text-sm ${textSecondary}`}>Warnings</p>
                </div>
              </div>
              
              <div className="space-y-3">
                {logAnalysisResults.issues.map((issue: any, i: number) => (
                  <div key={i} className={`p-3 rounded-lg flex items-start gap-3 ${isDarkMode ? "bg-[#0a1628]" : "bg-[#f8fafc]"}`}>
                    {issue.severity === "error" ? (
                      <XCircle className="h-5 w-5 text-[#f44336] flex-shrink-0 mt-0.5" />
                    ) : (
                      <AlertTriangle className="h-5 w-5 text-[#ffc107] flex-shrink-0 mt-0.5" />
                    )}
                    <p className={`text-sm ${textPrimary}`}>{issue.message}</p>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      </div>
    )
  }

  // CLIENT DETAIL SCREEN
  if (currentScreen === "client-detail" && viewingClient) {
    return (
      <div className={`min-h-screen ${bgPrimary} p-6`}>
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
    )
  }

  // DASHBOARD SCREEN
  return (
    <div className={`min-h-screen ${bgPrimary}`}>
      <header className={`border-b ${borderColor} px-6 py-4`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8"><CometLogo /></div>
            <span className={`text-xl font-bold ${textPrimary}`}>B-COMET</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`rounded-full p-2 ${isDarkMode ? "bg-[#1e4976] text-[#00e5ff]" : "bg-[#e2e8f0] text-[#0a1628]"}`}
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <Button 
              variant="outline" 
              onClick={() => setCurrentScreen("home")}
              className={isDarkMode ? "border-[#1e4976] text-[#00e5ff]" : ""}
            >
              <LogOut className="h-4 w-4 mr-2" /> Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="p-6">
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
      </main>
    </div>
  )
}
