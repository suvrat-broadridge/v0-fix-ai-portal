"use client"

import { useState, useEffect } from "react"
import { 
  ChevronRight, ChevronLeft, Play, Upload, FileText, Download, RefreshCw,
  CheckCircle, XCircle, AlertTriangle, Search, Filter, Moon, Sun,
  BarChart3, GitCompare, TestTube, Bell, Settings, LogOut, Menu, X,
  Building2, Users, Clock, TrendingUp, Activity, Zap, Shield, Target,
  FileCode, MessageSquare, Layers, Database, Terminal, Eye, Copy,
  Plus, Trash2, Edit, Save, ArrowRight, ArrowLeft, Info, HelpCircle,
  ChevronDown, ChevronUp, MoreHorizontal, ExternalLink, Bookmark,
  Calendar, Tag, Hash, Link, Globe, Server, Cpu, Network, Radio
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

// Types
type Screen = "home" | "dashboard" | "client-list" | "client-detail" | "workflow"
type Role = "certification-manager" | "ops-manager" | "developer" | null
type Workflow = "log-analysis" | "spec-compare" | "test-cases" | "alerts" | null

interface Client {
  id: string
  name: string
  status: "active" | "pending" | "inactive"
  specs: number
  lastActivity: string
  health: number
}

interface Order {
  id: number
  type: "BUY" | "SELL"
  symbol: string
  qty: number
  price: string
}

interface CandleData {
  open: number
  high: number
  low: number
  close: number
  color: string
}

export default function BControlPlatform() {
  // Core State
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [currentScreen, setCurrentScreen] = useState<Screen>("home")
  const [selectedRole, setSelectedRole] = useState<Role>(null)
  const [activeWorkflow, setActiveWorkflow] = useState<Workflow>(null)
  const [showRoleSelection, setShowRoleSelection] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [viewingClient, setViewingClient] = useState<Client | null>(null)

  // Animation State
  const [orders, setOrders] = useState<Order[]>([
    { id: 1, type: "BUY", symbol: "AAPL", qty: 975, price: "218.31" },
    { id: 2, type: "BUY", symbol: "META", qty: 963, price: "612.45" },
    { id: 3, type: "BUY", symbol: "NVDA", qty: 159, price: "330.68" },
  ])

  const [candleData, setCandleData] = useState<CandleData[]>([
    { open: 50, high: 55, low: 48, close: 53, color: "#4caf50" },
    { open: 53, high: 58, low: 51, close: 52, color: "#f44336" },
    { open: 52, high: 56, low: 49, close: 55, color: "#4caf50" },
    { open: 55, high: 60, low: 54, close: 58, color: "#4caf50" },
    { open: 58, high: 62, low: 56, close: 57, color: "#f44336" },
    { open: 57, high: 61, low: 55, close: 60, color: "#4caf50" },
    { open: 60, high: 65, low: 58, close: 63, color: "#4caf50" },
    { open: 63, high: 67, low: 61, close: 62, color: "#f44336" },
  ])

  // Workflow State
  const [logFile, setLogFile] = useState<string>("")
  const [logSpecFile, setLogSpecFile] = useState<string>("")
  const [spec1File, setSpec1File] = useState<string>("")
  const [spec2File, setSpec2File] = useState<string>("")
  const [analysisResults, setAnalysisResults] = useState<any>(null)
  const [specCompareResults, setSpecCompareResults] = useState<any>(null)

  // Client Data
  const [clients] = useState<Client[]>([
    { id: "1", name: "Goldman Sachs", status: "active", specs: 12, lastActivity: "2 hours ago", health: 98 },
    { id: "2", name: "JP Morgan", status: "active", specs: 8, lastActivity: "5 hours ago", health: 95 },
    { id: "3", name: "Morgan Stanley", status: "pending", specs: 5, lastActivity: "1 day ago", health: 87 },
    { id: "4", name: "BlackRock", status: "active", specs: 15, lastActivity: "30 min ago", health: 99 },
    { id: "5", name: "Citadel", status: "inactive", specs: 3, lastActivity: "1 week ago", health: 72 },
  ])

  // Animation Effect
  useEffect(() => {
    if (currentScreen !== "home") return
    
    const interval = setInterval(() => {
      setOrders(prev => prev.map(order => ({
        ...order,
        price: (parseFloat(order.price) + (Math.random() - 0.5) * 2).toFixed(2),
        qty: Math.floor(order.qty + (Math.random() - 0.5) * 50)
      })))
      
      setCandleData(prev => prev.map(candle => {
        const change = (Math.random() - 0.5) * 5
        const newClose = candle.close + change
        return {
          ...candle,
          close: newClose,
          high: Math.max(candle.high, newClose),
          low: Math.min(candle.low, newClose),
          color: newClose >= candle.open ? "#4caf50" : "#f44336"
        }
      }))
    }, 2000)
    
    return () => clearInterval(interval)
  }, [currentScreen])

  // Handlers
  const handleRoleSelect = (role: Role) => {
    setSelectedRole(role)
    setShowRoleSelection(false)
    setCurrentScreen("dashboard")
  }

  const handleLogout = () => {
    setSelectedRole(null)
    setCurrentScreen("home")
    setActiveWorkflow(null)
    setViewingClient(null)
  }

  const performLogAnalysis = () => {
    setAnalysisResults({
      totalMessages: 15847,
      errors: 23,
      warnings: 156,
      passed: 15668,
      msgTypeDiffs: {
        logOnly: [{ code: "AE", name: "Trade Capture Report" }],
        specOnly: [{ code: "V", name: "Market Data Request" }],
      }
    })
  }

  const performSpecCompare = () => {
    setSpecCompareResults({
      compatible: false,
      totalDiffs: 12,
      msgTypeDiffs: { spec1Only: [], spec2Only: [] },
      tagDiffs: { spec1Missing: [], spec2Missing: [] }
    })
  }

  // Theme Classes
  const bgMain = isDarkMode ? "bg-[#0a1628]" : "bg-[#f8fafc]"
  const bgCard = isDarkMode ? "bg-[#0d1f3c]" : "bg-white"
  const textPrimary = isDarkMode ? "text-white" : "text-[#0a1628]"
  const textSecondary = isDarkMode ? "text-[#64b5f6]" : "text-[#64748b]"
  const borderColor = isDarkMode ? "border-[#1e4976]" : "border-[#e2e8f0]"

  // ==================== HOME SCREEN ====================
  const HomeScreen = () => (
    <div className={`min-h-screen ${bgMain}`}>
      {/* Header */}
      <header className={`border-b ${borderColor} px-6 py-4`}>
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00e5ff] to-[#0091ea] flex items-center justify-center">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <span className={`text-xl font-bold ${textPrimary}`}>BControl</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 rounded-lg ${isDarkMode ? "bg-[#1e4976] text-[#64b5f6]" : "bg-[#e2e8f0] text-[#64748b]"}`}
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <Button onClick={() => setShowRoleSelection(true)}>
              Sign In
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-12 items-center">
            {/* Left Content - 3 columns */}
            <div className="lg:col-span-3 space-y-8">
              <div className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm ${isDarkMode ? "bg-[#00e5ff]/10" : "bg-[#0a1628]/5"}`}>
                <span className="flex h-2 w-2 rounded-full bg-[#4caf50] animate-pulse" />
                <span className={`font-medium ${isDarkMode ? "text-[#00e5ff]" : "text-[#0a1628]"}`}>BControl FIX AI Platform</span>
              </div>
              
              <h1 className={`text-4xl lg:text-5xl font-bold leading-tight ${textPrimary}`}>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00e5ff] to-[#0091ea]">B</span>TCS{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00e5ff] to-[#0091ea]">C</span>ertification{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00e5ff] to-[#0091ea]">O</span>nboarding
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00e5ff] to-[#0091ea]">N</span>etwork{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00e5ff] to-[#0091ea]">T</span>esting{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00e5ff] to-[#0091ea]">R</span>outing
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00e5ff] to-[#0091ea]">O</span>perations{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00e5ff] to-[#0091ea]">L</span>ifecycle
              </h1>
              
              <p className={`text-lg max-w-lg leading-relaxed ${textSecondary}`}>
                AI-powered FIX protocol management for certification, testing, and operations. Designed for trading firms and financial institutions.
              </p>
              
              <div className="flex gap-4">
                <Button size="lg" onClick={() => setShowRoleSelection(true)}>
                  Get Started <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
                <Button variant="outline" size="lg">
                  <Play className="mr-2 h-5 w-5" /> Watch Demo
                </Button>
              </div>

              <div className="pt-6">
                <p className={`text-xs font-medium tracking-wider mb-4 ${textSecondary}`}>TRUSTED BY LEADING INSTITUTIONS</p>
                <div className={`flex gap-8 ${textSecondary}`}>
                  <span className="font-semibold">BlackRock</span>
                  <span className="font-semibold">Goldman Sachs</span>
                  <span className="font-semibold">JP Morgan</span>
                  <span className="font-semibold">UBS</span>
                </div>
              </div>
            </div>
            
            {/* Right Content - FIX Message Flow - 2 columns */}
            <div className="lg:col-span-2 relative">
              <div className={`relative rounded-3xl shadow-2xl p-5 overflow-hidden backdrop-blur-sm ${isDarkMode ? "bg-[#0d1f3c]/90 border border-[#1e4976]/60" : "bg-white/95 border border-[#e2e8f0]"}`}>
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#f44336]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ffc107]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#4caf50]" />
                  <span className={`ml-3 text-xs font-medium ${textSecondary}`}>FIX Message Flow</span>
                </div>

                {/* Market Data Stream */}
                <div className={`mb-5 p-3 rounded-xl ${isDarkMode ? "bg-[#0a1628]/70" : "bg-[#f8fafc]"}`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-xs font-semibold ${textPrimary}`}>Market Data Stream</span>
                    <span className="text-xs text-[#4caf50] font-medium">LIVE</span>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`flex items-center gap-2 p-2 rounded-lg ${isDarkMode ? "bg-[#0d1f3c]" : "bg-white"}`}>
                      <CheckCircle className="h-4 w-4 text-[#4caf50]" />
                      <div>
                        <p className={`text-xs ${textSecondary}`}>Tests Passed</p>
                        <p className={`text-lg font-bold ${textPrimary}`}>2,847</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-end gap-1 h-12">
                    {candleData.map((candle, i) => (
                      <div key={i} className="flex-1 flex justify-center">
                        <div className="w-2 h-2 rounded-full transition-all duration-500" style={{ backgroundColor: candle.color }} />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order Flow */}
                <div className={`mb-4 p-3 rounded-xl ${isDarkMode ? "bg-[#0a1628]/70" : "bg-[#f8fafc]"}`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-xs font-semibold ${textPrimary}`}>Order Flow</span>
                    <span className="text-xs text-[#00e5ff] font-medium">Real-time</span>
                  </div>
                  <div className="space-y-1.5">
                    {orders.map((order) => (
                      <div key={order.id} className={`flex items-center justify-between p-2 rounded-lg ${isDarkMode ? "bg-[#0d1f3c]" : "bg-white"}`}>
                        <div className="flex items-center gap-2">
                          <span className={`px-1.5 py-0.5 rounded text-xs font-bold ${order.type === "BUY" ? "bg-[#4caf50]/20 text-[#4caf50]" : "bg-[#f44336]/20 text-[#f44336]"}`}>
                            {order.type}
                          </span>
                          <span className={`font-mono text-xs font-medium ${textPrimary}`}>{order.symbol}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`font-mono text-xs ${textSecondary}`}>{order.qty}</span>
                          <span className={`font-mono text-xs ${isDarkMode ? "text-[#00e5ff]" : "text-[#1976d2]"}`}>${order.price}</span>
                          <span className="w-1.5 h-1.5 rounded-full bg-[#4caf50]" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* FIX Message */}
                <div className={`p-2 rounded-lg font-mono text-xs ${isDarkMode ? "bg-[#0a1628]/70 text-[#64b5f6]" : "bg-[#f8fafc] text-[#64748b]"}`}>
                  8=FIX.4.4|9=148|35=D|49=SENDER|56=TARGET|34=2|52=20250302...
                </div>
              </div>

              {/* Floating Stat Card */}
              <div className={`absolute -right-4 top-1/2 p-3 rounded-xl shadow-lg ${isDarkMode ? "bg-[#0d1f3c]/90 border border-[#1e4976]/60" : "bg-white/95 border border-[#e2e8f0]"}`}>
                <div className="flex items-center gap-2">
                  <GitCompare className="h-4 w-4 text-[#00e5ff]" />
                  <div>
                    <p className={`text-xs ${textSecondary}`}>Specs Compared</p>
                    <p className={`text-lg font-bold ${textPrimary}`}>156</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Role Selection Modal */}
      {showRoleSelection && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className={`${bgCard} rounded-2xl p-8 max-w-2xl w-full border ${borderColor}`}>
            <div className="flex items-center justify-between mb-6">
              <h2 className={`text-2xl font-bold ${textPrimary}`}>Select Your Role</h2>
              <button onClick={() => setShowRoleSelection(false)} className={`p-2 rounded-lg ${isDarkMode ? "hover:bg-[#1e4976]" : "hover:bg-[#e2e8f0]"}`}>
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { id: "certification-manager", title: "Certification Manager", desc: "Manage client certifications and onboarding", icon: Shield },
                { id: "ops-manager", title: "Ops Manager", desc: "Monitor operations and system health", icon: Activity },
                { id: "developer", title: "Developer", desc: "Access APIs and technical tools", icon: Terminal },
              ].map((role) => (
                <button
                  key={role.id}
                  onClick={() => handleRoleSelect(role.id as Role)}
                  className={`p-6 rounded-xl border text-left transition-all ${isDarkMode ? "border-[#1e4976] hover:border-[#00e5ff] hover:bg-[#1e4976]/30" : "border-[#e2e8f0] hover:border-[#1976d2] hover:bg-[#e3f2fd]"}`}
                >
                  <role.icon className={`h-8 w-8 mb-4 ${isDarkMode ? "text-[#00e5ff]" : "text-[#1976d2]"}`} />
                  <h3 className={`font-semibold mb-2 ${textPrimary}`}>{role.title}</h3>
                  <p className={`text-sm ${textSecondary}`}>{role.desc}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )

  // ==================== DASHBOARD ====================
  const Dashboard = () => (
    <div className={`flex min-h-screen ${bgMain}`}>
      {/* Sidebar */}
      <aside className={`${sidebarCollapsed ? "w-16" : "w-64"} ${bgCard} border-r ${borderColor} flex flex-col transition-all duration-300`}>
        <div className="p-4 flex items-center justify-between">
          {!sidebarCollapsed && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00e5ff] to-[#0091ea] flex items-center justify-center">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <span className={`font-bold ${textPrimary}`}>BControl</span>
            </div>
          )}
          <button onClick={() => setSidebarCollapsed(!sidebarCollapsed)} className={`p-2 rounded-lg ${isDarkMode ? "hover:bg-[#1e4976]" : "hover:bg-[#e2e8f0]"}`}>
            {sidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </button>
        </div>

        <nav className="flex-1 p-2 space-y-1">
          {[
            { id: "dashboard", icon: BarChart3, label: "Dashboard" },
            { id: "client-list", icon: Building2, label: "Clients" },
            { id: "log-analysis", icon: FileText, label: "Log Analysis", workflow: true },
            { id: "spec-compare", icon: GitCompare, label: "Spec Compare", workflow: true },
            { id: "test-cases", icon: TestTube, label: "Test Cases", workflow: true },
            { id: "alerts", icon: Bell, label: "Alerts", workflow: true },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => {
                if (item.workflow) {
                  setActiveWorkflow(item.id as Workflow)
                  setCurrentScreen("workflow")
                } else {
                  setCurrentScreen(item.id as Screen)
                  setActiveWorkflow(null)
                }
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                (currentScreen === item.id || activeWorkflow === item.id)
                  ? isDarkMode ? "bg-[#1e4976] text-[#00e5ff]" : "bg-[#e3f2fd] text-[#1976d2]"
                  : isDarkMode ? "text-[#64b5f6] hover:bg-[#1e4976]/50" : "text-[#64748b] hover:bg-[#e2e8f0]"
              }`}
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              {!sidebarCollapsed && <span className="text-sm font-medium">{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className={`p-2 border-t ${borderColor}`}>
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg ${isDarkMode ? "text-[#64b5f6] hover:bg-[#1e4976]/50" : "text-[#64748b] hover:bg-[#e2e8f0]"}`}
          >
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            {!sidebarCollapsed && <span className="text-sm font-medium">{isDarkMode ? "Light Mode" : "Dark Mode"}</span>}
          </button>
          <button
            onClick={handleLogout}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg ${isDarkMode ? "text-[#64b5f6] hover:bg-[#1e4976]/50" : "text-[#64748b] hover:bg-[#e2e8f0]"}`}
          >
            <LogOut className="h-5 w-5" />
            {!sidebarCollapsed && <span className="text-sm font-medium">Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {currentScreen === "dashboard" && <DashboardContent />}
        {currentScreen === "client-list" && <ClientList />}
        {currentScreen === "client-detail" && viewingClient && <ClientDetail />}
        {currentScreen === "workflow" && activeWorkflow === "log-analysis" && <LogAnalysisPanel />}
        {currentScreen === "workflow" && activeWorkflow === "spec-compare" && <SpecComparePanel />}
        {currentScreen === "workflow" && activeWorkflow === "test-cases" && <TestCasesPanel />}
        {currentScreen === "workflow" && activeWorkflow === "alerts" && <AlertsPanel />}
      </main>
    </div>
  )

  // ==================== DASHBOARD CONTENT ====================
  const DashboardContent = () => (
    <div className="p-6">
      <div className="mb-6">
        <h1 className={`text-2xl font-bold ${textPrimary}`}>Dashboard</h1>
        <p className={`text-sm ${textSecondary}`}>Welcome back, {selectedRole?.replace("-", " ")}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Active Clients", value: "24", change: "+3", icon: Building2, color: "#4caf50" },
          { label: "Specs Managed", value: "156", change: "+12", icon: FileCode, color: "#00e5ff" },
          { label: "Tests Passed", value: "2,847", change: "+234", icon: CheckCircle, color: "#4caf50" },
          { label: "Active Alerts", value: "7", change: "-2", icon: Bell, color: "#f57c00" },
        ].map((stat, i) => (
          <Card key={i} className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className={`text-sm ${textSecondary}`}>{stat.label}</p>
                <p className={`text-2xl font-bold ${textPrimary}`}>{stat.value}</p>
                <p className={`text-xs ${stat.change.startsWith("+") ? "text-[#4caf50]" : "text-[#f44336]"}`}>{stat.change} this week</p>
              </div>
              <div className="p-2 rounded-lg" style={{ backgroundColor: `${stat.color}20` }}>
                <stat.icon className="h-5 w-5" style={{ color: stat.color }} />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card className="p-4 mb-6">
        <h2 className={`text-lg font-semibold mb-4 ${textPrimary}`}>Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: "Log Analysis", icon: FileText, workflow: "log-analysis" as Workflow },
            { label: "Spec Compare", icon: GitCompare, workflow: "spec-compare" as Workflow },
            { label: "Test Cases", icon: TestTube, workflow: "test-cases" as Workflow },
            { label: "View Alerts", icon: Bell, workflow: "alerts" as Workflow },
          ].map((action, i) => (
            <button
              key={i}
              onClick={() => { setActiveWorkflow(action.workflow); setCurrentScreen("workflow"); }}
              className={`flex items-center gap-3 p-4 rounded-xl border transition-all ${isDarkMode ? "border-[#1e4976] hover:border-[#00e5ff] hover:bg-[#1e4976]/30" : "border-[#e2e8f0] hover:border-[#1976d2] hover:bg-[#e3f2fd]"}`}
            >
              <action.icon className={`h-5 w-5 ${isDarkMode ? "text-[#00e5ff]" : "text-[#1976d2]"}`} />
              <span className={`font-medium ${textPrimary}`}>{action.label}</span>
            </button>
          ))}
        </div>
      </Card>

      {/* Recent Activity */}
      <Card className="p-4">
        <h2 className={`text-lg font-semibold mb-4 ${textPrimary}`}>Recent Activity</h2>
        <div className="space-y-3">
          {[
            { action: "Spec comparison completed", client: "Goldman Sachs", time: "2 min ago", status: "success" },
            { action: "New certification request", client: "Morgan Stanley", time: "15 min ago", status: "pending" },
            { action: "Log analysis failed", client: "Citadel", time: "1 hour ago", status: "error" },
            { action: "Test suite passed", client: "JP Morgan", time: "2 hours ago", status: "success" },
          ].map((activity, i) => (
            <div key={i} className={`flex items-center justify-between p-3 rounded-lg ${isDarkMode ? "bg-[#0a1628]" : "bg-[#f8fafc]"}`}>
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${activity.status === "success" ? "bg-[#4caf50]" : activity.status === "error" ? "bg-[#f44336]" : "bg-[#f57c00]"}`} />
                <div>
                  <p className={`text-sm font-medium ${textPrimary}`}>{activity.action}</p>
                  <p className={`text-xs ${textSecondary}`}>{activity.client}</p>
                </div>
              </div>
              <span className={`text-xs ${textSecondary}`}>{activity.time}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )

  // ==================== CLIENT LIST ====================
  const ClientList = () => (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className={`text-2xl font-bold ${textPrimary}`}>Clients</h1>
          <p className={`text-sm ${textSecondary}`}>Manage your client connections</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Client
        </Button>
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={isDarkMode ? "bg-[#0a1628]" : "bg-[#f8fafc]"}>
              <tr>
                <th className={`text-left p-4 text-sm font-medium ${textSecondary}`}>Client</th>
                <th className={`text-left p-4 text-sm font-medium ${textSecondary}`}>Status</th>
                <th className={`text-left p-4 text-sm font-medium ${textSecondary}`}>Specs</th>
                <th className={`text-left p-4 text-sm font-medium ${textSecondary}`}>Health</th>
                <th className={`text-left p-4 text-sm font-medium ${textSecondary}`}>Last Activity</th>
                <th className={`text-left p-4 text-sm font-medium ${textSecondary}`}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => (
                <tr key={client.id} className={`border-t ${borderColor}`}>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isDarkMode ? "bg-[#1e4976]" : "bg-[#e3f2fd]"}`}>
                        <Building2 className={`h-5 w-5 ${isDarkMode ? "text-[#00e5ff]" : "text-[#1976d2]"}`} />
                      </div>
                      <span className={`font-medium ${textPrimary}`}>{client.name}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      client.status === "active" ? "bg-[#4caf50]/20 text-[#4caf50]" :
                      client.status === "pending" ? "bg-[#f57c00]/20 text-[#f57c00]" :
                      "bg-[#f44336]/20 text-[#f44336]"
                    }`}>
                      {client.status}
                    </span>
                  </td>
                  <td className={`p-4 ${textPrimary}`}>{client.specs}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-16 h-2 rounded-full ${isDarkMode ? "bg-[#1e4976]" : "bg-[#e2e8f0]"}`}>
                        <div 
                          className="h-full rounded-full" 
                          style={{ 
                            width: `${client.health}%`,
                            backgroundColor: client.health > 90 ? "#4caf50" : client.health > 70 ? "#f57c00" : "#f44336"
                          }}
                        />
                      </div>
                      <span className={`text-sm ${textSecondary}`}>{client.health}%</span>
                    </div>
                  </td>
                  <td className={`p-4 text-sm ${textSecondary}`}>{client.lastActivity}</td>
                  <td className="p-4">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => { setViewingClient(client); setCurrentScreen("client-detail"); }}
                    >
                      View <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )

  // ==================== CLIENT DETAIL ====================
  const ClientDetail = () => (
    <div className="p-6">
      <button 
        onClick={() => { setViewingClient(null); setCurrentScreen("client-list"); }}
        className={`flex items-center gap-2 mb-6 ${textSecondary} hover:${textPrimary}`}
      >
        <ChevronLeft className="h-4 w-4" /> Back to Clients
      </button>

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className={`w-16 h-16 rounded-xl flex items-center justify-center ${isDarkMode ? "bg-[#1e4976]" : "bg-[#e3f2fd]"}`}>
            <Building2 className={`h-8 w-8 ${isDarkMode ? "text-[#00e5ff]" : "text-[#1976d2]"}`} />
          </div>
          <div>
            <h1 className={`text-2xl font-bold ${textPrimary}`}>{viewingClient?.name}</h1>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              viewingClient?.status === "active" ? "bg-[#4caf50]/20 text-[#4caf50]" :
              viewingClient?.status === "pending" ? "bg-[#f57c00]/20 text-[#f57c00]" :
              "bg-[#f44336]/20 text-[#f44336]"
            }`}>
              {viewingClient?.status}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="p-4">
          <p className={`text-sm ${textSecondary}`}>Total Specs</p>
          <p className={`text-2xl font-bold ${textPrimary}`}>{viewingClient?.specs}</p>
        </Card>
        <Card className="p-4">
          <p className={`text-sm ${textSecondary}`}>Health Score</p>
          <p className={`text-2xl font-bold ${textPrimary}`}>{viewingClient?.health}%</p>
        </Card>
        <Card className="p-4">
          <p className={`text-sm ${textSecondary}`}>Last Activity</p>
          <p className={`text-2xl font-bold ${textPrimary}`}>{viewingClient?.lastActivity}</p>
        </Card>
      </div>
    </div>
  )

  // ==================== LOG ANALYSIS PANEL ====================
  const LogAnalysisPanel = () => (
    <div className="p-6">
      <div className="mb-6">
        <h1 className={`text-2xl font-bold ${textPrimary}`}>Log Analysis</h1>
        <p className={`text-sm ${textSecondary}`}>Compare FIX log files against specifications</p>
      </div>

      <Card className="mb-6 p-5">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className={`flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-6 transition-all ${
            logFile 
              ? isDarkMode ? "border-[#4caf50] bg-[#4caf50]/10" : "border-[#4caf50] bg-[#4caf50]/5"
              : isDarkMode ? "border-[#1e4976] hover:border-[#00e5ff]" : "border-[#cbd5e1] hover:border-[#1976d2]"
          }`}>
            <Upload className={`mb-3 h-10 w-10 ${logFile ? "text-[#4caf50]" : textSecondary}`} />
            <p className={`mb-2 text-sm font-medium ${textPrimary}`}>{logFile || "Drop Log File Here"}</p>
            <Button variant="secondary" size="sm" onClick={() => setLogFile("sample_trading.log")}>Select File</Button>
          </div>

          <div className={`flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-6 transition-all ${
            logSpecFile 
              ? isDarkMode ? "border-[#4caf50] bg-[#4caf50]/10" : "border-[#4caf50] bg-[#4caf50]/5"
              : isDarkMode ? "border-[#1e4976] hover:border-[#00e5ff]" : "border-[#cbd5e1] hover:border-[#1976d2]"
          }`}>
            <FileText className={`mb-3 h-10 w-10 ${logSpecFile ? "text-[#4caf50]" : textSecondary}`} />
            <p className={`mb-2 text-sm font-medium ${textPrimary}`}>{logSpecFile || "Drop FIX Spec Here"}</p>
            <Button variant="secondary" size="sm" onClick={() => setLogSpecFile("FIX44_Standard.xml")}>Select File</Button>
          </div>

          <div className={`flex flex-col items-center justify-center rounded-xl p-6 ${isDarkMode ? "bg-[#1e4976]/30" : "bg-[#f1f5f9]"}`}>
            <Button className="mb-4 w-full" onClick={performLogAnalysis} disabled={!logFile || !logSpecFile}>
              <RefreshCw className="mr-2 h-4 w-4" /> Perform Analysis
            </Button>
            <Button variant="ghost" size="sm" onClick={() => { setLogFile("sample_trading.log"); setLogSpecFile("FIX44_Standard.xml"); }}>
              <Play className="mr-1 h-4 w-4" /> Try Sample Data
            </Button>
          </div>
        </div>
      </Card>

      {analysisResults && (
        <Card className="p-5">
          <h2 className={`text-lg font-semibold mb-4 ${textPrimary}`}>Analysis Results</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className={`p-4 rounded-lg ${isDarkMode ? "bg-[#0a1628]" : "bg-[#f8fafc]"}`}>
              <p className={`text-sm ${textSecondary}`}>Total Messages</p>
              <p className={`text-2xl font-bold ${textPrimary}`}>{analysisResults.totalMessages.toLocaleString()}</p>
            </div>
            <div className={`p-4 rounded-lg ${isDarkMode ? "bg-[#0a1628]" : "bg-[#f8fafc]"}`}>
              <p className={`text-sm ${textSecondary}`}>Passed</p>
              <p className="text-2xl font-bold text-[#4caf50]">{analysisResults.passed.toLocaleString()}</p>
            </div>
            <div className={`p-4 rounded-lg ${isDarkMode ? "bg-[#0a1628]" : "bg-[#f8fafc]"}`}>
              <p className={`text-sm ${textSecondary}`}>Warnings</p>
              <p className="text-2xl font-bold text-[#f57c00]">{analysisResults.warnings}</p>
            </div>
            <div className={`p-4 rounded-lg ${isDarkMode ? "bg-[#0a1628]" : "bg-[#f8fafc]"}`}>
              <p className={`text-sm ${textSecondary}`}>Errors</p>
              <p className="text-2xl font-bold text-[#f44336]">{analysisResults.errors}</p>
            </div>
          </div>
        </Card>
      )}
    </div>
  )

  // ==================== SPEC COMPARE PANEL ====================
  const SpecComparePanel = () => (
    <div className="p-6">
      <div className="mb-6">
        <h1 className={`text-2xl font-bold ${textPrimary}`}>Spec Compare</h1>
        <p className={`text-sm ${textSecondary}`}>Compare two FIX specifications</p>
      </div>

      <Card className="mb-6 p-5">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className={`flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-6 transition-all ${
            spec1File 
              ? isDarkMode ? "border-[#4caf50] bg-[#4caf50]/10" : "border-[#4caf50] bg-[#4caf50]/5"
              : isDarkMode ? "border-[#1e4976] hover:border-[#00e5ff]" : "border-[#cbd5e1] hover:border-[#1976d2]"
          }`}>
            <FileCode className={`mb-3 h-10 w-10 ${spec1File ? "text-[#4caf50]" : textSecondary}`} />
            <p className={`mb-2 text-sm font-medium ${textPrimary}`}>{spec1File || "Specification 1"}</p>
            <Button variant="secondary" size="sm" onClick={() => setSpec1File("Client_FIX44.xml")}>Select File</Button>
          </div>

          <div className={`flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-6 transition-all ${
            spec2File 
              ? isDarkMode ? "border-[#4caf50] bg-[#4caf50]/10" : "border-[#4caf50] bg-[#4caf50]/5"
              : isDarkMode ? "border-[#1e4976] hover:border-[#00e5ff]" : "border-[#cbd5e1] hover:border-[#1976d2]"
          }`}>
            <FileCode className={`mb-3 h-10 w-10 ${spec2File ? "text-[#4caf50]" : textSecondary}`} />
            <p className={`mb-2 text-sm font-medium ${textPrimary}`}>{spec2File || "Specification 2"}</p>
            <Button variant="secondary" size="sm" onClick={() => setSpec2File("BTCS_Standard.xml")}>Select File</Button>
          </div>

          <div className={`flex flex-col items-center justify-center rounded-xl p-6 ${isDarkMode ? "bg-[#1e4976]/30" : "bg-[#f1f5f9]"}`}>
            <Button className="mb-4 w-full" onClick={performSpecCompare} disabled={!spec1File || !spec2File}>
              <GitCompare className="mr-2 h-4 w-4" /> Compare Specs
            </Button>
            <Button variant="ghost" size="sm" onClick={() => { setSpec1File("Client_FIX44.xml"); setSpec2File("BTCS_Standard.xml"); }}>
              <Play className="mr-1 h-4 w-4" /> Try Sample Data
            </Button>
          </div>
        </div>
      </Card>

      {specCompareResults && (
        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className={`text-lg font-semibold ${textPrimary}`}>Comparison Results</h2>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${specCompareResults.compatible ? "bg-[#4caf50]/20 text-[#4caf50]" : "bg-[#f44336]/20 text-[#f44336]"}`}>
              {specCompareResults.compatible ? "Compatible" : `${specCompareResults.totalDiffs} Differences`}
            </span>
          </div>
        </Card>
      )}
    </div>
  )

  // ==================== TEST CASES PANEL ====================
  const TestCasesPanel = () => (
    <div className="p-6">
      <div className="mb-6">
        <h1 className={`text-2xl font-bold ${textPrimary}`}>Test Cases</h1>
        <p className={`text-sm ${textSecondary}`}>Manage and run FIX protocol test cases</p>
      </div>

      <Card className="p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 ${textSecondary}`} />
              <Input placeholder="Search test cases..." className="pl-10 w-64" />
            </div>
            <Button variant="secondary" size="sm">
              <Filter className="mr-2 h-4 w-4" /> Filter
            </Button>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> New Test Case
          </Button>
        </div>

        <div className="space-y-3">
          {[
            { id: "TC-001", name: "New Order Single - Market", status: "passed", duration: "1.2s" },
            { id: "TC-002", name: "Order Cancel Request", status: "passed", duration: "0.8s" },
            { id: "TC-003", name: "Execution Report - Fill", status: "failed", duration: "2.1s" },
            { id: "TC-004", name: "Order Status Request", status: "pending", duration: "-" },
          ].map((test) => (
            <div key={test.id} className={`flex items-center justify-between p-4 rounded-lg ${isDarkMode ? "bg-[#0a1628]" : "bg-[#f8fafc]"}`}>
              <div className="flex items-center gap-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  test.status === "passed" ? "bg-[#4caf50]/20" :
                  test.status === "failed" ? "bg-[#f44336]/20" : "bg-[#f57c00]/20"
                }`}>
                  {test.status === "passed" ? <CheckCircle className="h-4 w-4 text-[#4caf50]" /> :
                   test.status === "failed" ? <XCircle className="h-4 w-4 text-[#f44336]" /> :
                   <Clock className="h-4 w-4 text-[#f57c00]" />}
                </div>
                <div>
                  <p className={`font-medium ${textPrimary}`}>{test.name}</p>
                  <p className={`text-xs ${textSecondary}`}>{test.id}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className={`text-sm ${textSecondary}`}>{test.duration}</span>
                <Button variant="ghost" size="sm">
                  <Play className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )

  // ==================== ALERTS PANEL ====================
  const AlertsPanel = () => (
    <div className="p-6">
      <div className="mb-6">
        <h1 className={`text-2xl font-bold ${textPrimary}`}>Alerts</h1>
        <p className={`text-sm ${textSecondary}`}>Monitor system alerts and notifications</p>
      </div>

      <Card className="p-5">
        <div className="space-y-3">
          {[
            { severity: "error", title: "Connection Lost", desc: "Lost connection to Goldman Sachs FIX gateway", time: "5 min ago" },
            { severity: "warning", title: "High Latency Detected", desc: "Message latency exceeding threshold on JP Morgan connection", time: "15 min ago" },
            { severity: "info", title: "Spec Update Available", desc: "New FIX 4.4 specification version released", time: "1 hour ago" },
            { severity: "success", title: "Certification Complete", desc: "Morgan Stanley certification process completed successfully", time: "2 hours ago" },
          ].map((alert, i) => (
            <div key={i} className={`flex items-start gap-4 p-4 rounded-lg ${isDarkMode ? "bg-[#0a1628]" : "bg-[#f8fafc]"}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                alert.severity === "error" ? "bg-[#f44336]/20" :
                alert.severity === "warning" ? "bg-[#f57c00]/20" :
                alert.severity === "info" ? "bg-[#2196f3]/20" : "bg-[#4caf50]/20"
              }`}>
                {alert.severity === "error" ? <XCircle className="h-4 w-4 text-[#f44336]" /> :
                 alert.severity === "warning" ? <AlertTriangle className="h-4 w-4 text-[#f57c00]" /> :
                 alert.severity === "info" ? <Info className="h-4 w-4 text-[#2196f3]" /> :
                 <CheckCircle className="h-4 w-4 text-[#4caf50]" />}
              </div>
              <div className="flex-1">
                <p className={`font-medium ${textPrimary}`}>{alert.title}</p>
                <p className={`text-sm ${textSecondary}`}>{alert.desc}</p>
              </div>
              <span className={`text-xs ${textSecondary}`}>{alert.time}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )

  // ==================== MAIN RENDER ====================
  return currentScreen === "home" ? <HomeScreen /> : <Dashboard />
}
