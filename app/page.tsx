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
  Check, XCircle, Info, ArrowRight, LogOut
} from "lucide-react"

export default function BControlPlatform() {
  // Theme
  const [isDarkMode, setIsDarkMode] = useState(true)
  
  // Navigation
  const [currentScreen, setCurrentScreen] = useState<"home" | "role-selection" | "dashboard" | "clients" | "client-detail">("home")
  const [selectedRole, setSelectedRole] = useState<string | null>(null)
  const [activePanel, setActivePanel] = useState<string>("overview")
  
  // Client Management
  const [viewingClient, setViewingClient] = useState<any>(null)
  const [clientSearchQuery, setClientSearchQuery] = useState("")
  
  // FIX Message Flow Animation
  const [orders, setOrders] = useState([
    { id: 1, type: "BUY", symbol: "AAPL", qty: 975, price: "218.31" },
    { id: 2, type: "BUY", symbol: "META", qty: 963, price: "612.45" },
    { id: 3, type: "BUY", symbol: "NVDA", qty: 159, price: "330.68" },
  ])
  
  const [candleData, setCandleData] = useState([
    { open: 100, close: 105, high: 108, low: 98, color: "#4caf50" },
    { open: 105, close: 102, high: 107, low: 100, color: "#f44336" },
    { open: 102, close: 110, high: 112, low: 101, color: "#4caf50" },
    { open: 110, close: 108, high: 113, low: 106, color: "#f44336" },
    { open: 108, close: 115, high: 117, low: 107, color: "#4caf50" },
    { open: 115, close: 112, high: 118, low: 110, color: "#f44336" },
    { open: 112, close: 120, high: 122, low: 111, color: "#4caf50" },
    { open: 120, close: 118, high: 123, low: 116, color: "#f44336" },
    { open: 118, close: 125, high: 127, low: 117, color: "#4caf50" },
    { open: 125, close: 122, high: 128, low: 120, color: "#f44336" },
  ])

  // Sample clients data
  const clients = [
    { id: 1, name: "BlackRock", status: "active", specs: 12, lastActivity: "2 hours ago", health: 98 },
    { id: 2, name: "Goldman Sachs", status: "active", specs: 8, lastActivity: "5 hours ago", health: 95 },
    { id: 3, name: "JP Morgan", status: "pending", specs: 15, lastActivity: "1 day ago", health: 87 },
    { id: 4, name: "UBS", status: "active", specs: 6, lastActivity: "3 hours ago", health: 92 },
    { id: 5, name: "Morgan Stanley", status: "active", specs: 10, lastActivity: "1 hour ago", health: 96 },
  ]

  // Roles
  const roles = [
    { id: "admin", name: "Admin", icon: Shield, description: "Full access to manage clients, certifications, and system settings" },
    { id: "client", name: "Client", icon: Building2, description: "View and manage your organization's FIX specifications" },
  ]

  // Animate orders
  useEffect(() => {
    const interval = setInterval(() => {
      setOrders(prev => prev.map(order => ({
        ...order,
        price: (parseFloat(order.price) + (Math.random() - 0.5) * 2).toFixed(2)
      })))
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  // Theme classes
  const bgPrimary = isDarkMode ? "bg-[#0a1628]" : "bg-[#f8fafc]"
  const bgSecondary = isDarkMode ? "bg-[#0d1f3c]" : "bg-white"
  const textPrimary = isDarkMode ? "text-white" : "text-[#0a1628]"
  const textSecondary = isDarkMode ? "text-[#64b5f6]" : "text-[#64748b]"
  const borderColor = isDarkMode ? "border-[#1e4976]" : "border-[#e2e8f0]"

  // Home Screen
  const HomeScreen = () => (
    <div className={`min-h-screen ${bgPrimary}`}>
      {/* Header */}
      <header className={`border-b ${borderColor} px-6 py-4`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[#00e5ff] to-[#0091ea]" />
            <span className={`text-xl font-bold ${textPrimary}`}>BControl</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`rounded-full p-2 ${isDarkMode ? "bg-[#1e4976] text-[#00e5ff]" : "bg-[#e2e8f0] text-[#0a1628]"}`}
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-5 lg:items-center">
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
              
              <p className={`text-lg max-w-xl leading-relaxed ${textSecondary}`}>
                AI-powered FIX protocol management for certification, testing, and operations. Designed for trading firms and financial institutions.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Button 
                  onClick={() => setCurrentScreen("role-selection")}
                  className="bg-gradient-to-r from-[#00e5ff] to-[#0091ea] text-[#0a1628] hover:opacity-90 px-6 py-3 text-base font-semibold"
                >
                  Get Started <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  variant="outline"
                  className={`px-6 py-3 text-base ${isDarkMode ? "border-[#1e4976] text-[#00e5ff] hover:bg-[#1e4976]" : "border-[#cbd5e1] text-[#0a1628] hover:bg-[#f1f5f9]"}`}
                >
                  <Play className="mr-2 h-5 w-5" /> Watch Demo
                </Button>
              </div>

              <div className="pt-8">
                <p className={`text-xs font-medium tracking-wider mb-4 ${textSecondary}`}>TRUSTED BY LEADING INSTITUTIONS</p>
                <div className={`flex flex-wrap gap-8 ${textSecondary}`}>
                  <span className="font-semibold">BlackRock</span>
                  <span className="font-semibold">Goldman Sachs</span>
                  <span className="font-semibold">JP Morgan</span>
                  <span className="font-semibold">UBS</span>
                </div>
              </div>
            </div>

            {/* Right Panel - 2 columns - FIX Message Flow */}
            <div className="lg:col-span-2 relative">
              <div className={`rounded-2xl p-5 backdrop-blur-sm ${isDarkMode ? "bg-[#0d1f3c]/90 border border-[#1e4976]/60" : "bg-white/90 border border-[#e2e8f0]"}`}>
                {/* Window Controls */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#f44336]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ffc107]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#4caf50]" />
                  <span className={`ml-3 text-xs font-medium ${textSecondary}`}>FIX Message Flow</span>
                </div>

                {/* Market Data Stream */}
                <div className={`mb-4 p-3 rounded-xl ${isDarkMode ? "bg-[#0a1628]/70" : "bg-[#f8fafc]"}`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-xs font-semibold ${textPrimary}`}>Market Data Stream</span>
                    <span className="text-xs text-[#4caf50] font-medium">LIVE</span>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className={`flex items-center gap-2 p-2 rounded-lg ${isDarkMode ? "bg-[#0d1f3c]" : "bg-white"}`}>
                      <CheckCircle className="h-4 w-4 text-[#4caf50]" />
                      <div>
                        <p className={`text-xs ${textSecondary}`}>Tests Passed</p>
                        <p className={`text-lg font-bold ${textPrimary}`}>2,847</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-end gap-1 h-10">
                    {candleData.slice(0, 10).map((candle, i) => (
                      <div key={i} className="flex-1 flex justify-center">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: candle.color }} />
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
                    {orders.slice(0, 3).map((order) => (
                      <div key={order.id} className={`flex items-center justify-between p-2 rounded-lg ${isDarkMode ? "bg-[#0d1f3c]" : "bg-white"}`}>
                        <div className="flex items-center gap-2">
                          <span className={`px-1.5 py-0.5 rounded text-xs font-bold ${order.type === "BUY" ? "bg-[#4caf50]/20 text-[#4caf50]" : "bg-[#f44336]/20 text-[#f44336]"}`}>{order.type}</span>
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
      </main>
    </div>
  )

  // Role Selection Screen
  const RoleSelectionScreen = () => (
    <div className={`min-h-screen ${bgPrimary} flex items-center justify-center p-6`}>
      <div className="w-full max-w-4xl">
        <button 
          onClick={() => setCurrentScreen("home")}
          className={`flex items-center gap-2 mb-8 ${textSecondary} hover:${textPrimary}`}
        >
          <ArrowLeft className="h-4 w-4" /> Back to Home
        </button>
        
        <h1 className={`text-3xl font-bold mb-2 ${textPrimary}`}>Select Your Role</h1>
        <p className={`mb-8 ${textSecondary}`}>Choose your role to access the appropriate dashboard and tools.</p>
        
        <div className="grid gap-4 md:grid-cols-3">
          {roles.map((role) => (
            <Card 
              key={role.id}
              onClick={() => { setSelectedRole(role.id); setCurrentScreen("dashboard"); }}
              className={`p-6 cursor-pointer transition-all hover:scale-105 ${isDarkMode ? "bg-[#0d1f3c] border-[#1e4976] hover:border-[#00e5ff]" : "bg-white border-[#e2e8f0] hover:border-[#1976d2]"}`}
            >
              <role.icon className={`h-10 w-10 mb-4 ${isDarkMode ? "text-[#00e5ff]" : "text-[#1976d2]"}`} />
              <h3 className={`text-lg font-semibold mb-2 ${textPrimary}`}>{role.name}</h3>
              <p className={`text-sm ${textSecondary}`}>{role.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )

  // Dashboard Screen
  const DashboardScreen = () => (
    <div className={`min-h-screen ${bgPrimary} flex`}>
      {/* Sidebar */}
      <aside className={`w-64 ${bgSecondary} border-r ${borderColor} p-4 flex flex-col`}>
        <div className="flex items-center gap-2 mb-8">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[#00e5ff] to-[#0091ea]" />
          <span className={`text-xl font-bold ${textPrimary}`}>BControl</span>
        </div>
        
        <nav className="flex-1 space-y-1">
          {[
            { id: "overview", icon: BarChart3, label: "Overview" },
            { id: "clients", icon: Users, label: "Clients" },
            { id: "log-analysis", icon: FileText, label: "Log Analysis" },
            { id: "spec-compare", icon: GitCompare, label: "Spec Compare" },
            { id: "test-cases", icon: TestTube, label: "Test Cases" },
            { id: "alerts", icon: Bell, label: "Alerts" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => item.id === "clients" ? setCurrentScreen("clients") : setActivePanel(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                activePanel === item.id 
                  ? isDarkMode ? "bg-[#1e4976] text-[#00e5ff]" : "bg-[#e3f2fd] text-[#1976d2]"
                  : `${textSecondary} hover:${isDarkMode ? "bg-[#1e4976]/50" : "bg-[#f1f5f9]"}`
              }`}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="pt-4 border-t border-[#1e4976]">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm ${textSecondary}`}
          >
            {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            {isDarkMode ? "Light Mode" : "Dark Mode"}
          </button>
          <button
            onClick={() => { setCurrentScreen("home"); setSelectedRole(null); }}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm ${textSecondary}`}
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className={`text-2xl font-bold ${textPrimary}`}>Dashboard</h1>
              <p className={`${textSecondary}`}>Welcome back, {selectedRole === "cert-manager" ? "Certification Manager" : selectedRole === "ops-manager" ? "Operations Manager" : "Developer"}</p>
            </div>
            <div className="flex items-center gap-3">
              <div className={`relative`}>
                <Search className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 ${textSecondary}`} />
                <input 
                  type="text"
                  placeholder="Search..."
                  className={`pl-10 pr-4 py-2 rounded-lg border ${isDarkMode ? "bg-[#0d1f3c] border-[#1e4976] text-white" : "bg-white border-[#e2e8f0]"}`}
                />
              </div>
              <button className={`p-2 rounded-lg ${isDarkMode ? "bg-[#1e4976]" : "bg-[#e2e8f0]"}`}>
                <Bell className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid gap-4 md:grid-cols-4 mb-8">
            {[
              { label: "Active Clients", value: "24", change: "+3", icon: Users, color: "text-[#4caf50]" },
              { label: "Tests Passed", value: "2,847", change: "+156", icon: CheckCircle, color: "text-[#4caf50]" },
              { label: "Specs Compared", value: "156", change: "+12", icon: GitCompare, color: "text-[#00e5ff]" },
              { label: "Active Alerts", value: "7", change: "-2", icon: AlertTriangle, color: "text-[#f57c00]" },
            ].map((stat, i) => (
              <Card key={i} className={`p-4 ${isDarkMode ? "bg-[#0d1f3c] border-[#1e4976]" : "bg-white border-[#e2e8f0]"}`}>
                <div className="flex items-start justify-between">
                  <div>
                    <p className={`text-sm ${textSecondary}`}>{stat.label}</p>
                    <p className={`text-2xl font-bold ${textPrimary}`}>{stat.value}</p>
                    <p className={`text-xs ${stat.color}`}>{stat.change} this week</p>
                  </div>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </Card>
            ))}
          </div>

          {/* Quick Actions */}
          <Card className={`p-6 mb-8 ${isDarkMode ? "bg-[#0d1f3c] border-[#1e4976]" : "bg-white border-[#e2e8f0]"}`}>
            <h2 className={`text-lg font-semibold mb-4 ${textPrimary}`}>Quick Actions</h2>
            <div className="grid gap-3 md:grid-cols-4">
              {[
                { label: "Upload Log File", icon: Upload, action: () => setActivePanel("log-analysis") },
                { label: "Compare Specs", icon: GitCompare, action: () => setActivePanel("spec-compare") },
                { label: "Run Test Suite", icon: TestTube, action: () => setActivePanel("test-cases") },
                { label: "View Clients", icon: Users, action: () => setCurrentScreen("clients") },
              ].map((action, i) => (
                <Button 
                  key={i}
                  variant="outline"
                  onClick={action.action}
                  className={`justify-start ${isDarkMode ? "border-[#1e4976] text-[#64b5f6] hover:bg-[#1e4976]" : "border-[#e2e8f0]"}`}
                >
                  <action.icon className="mr-2 h-4 w-4" />
                  {action.label}
                </Button>
              ))}
            </div>
          </Card>

          {/* Recent Activity */}
          <Card className={`p-6 ${isDarkMode ? "bg-[#0d1f3c] border-[#1e4976]" : "bg-white border-[#e2e8f0]"}`}>
            <h2 className={`text-lg font-semibold mb-4 ${textPrimary}`}>Recent Activity</h2>
            <div className="space-y-3">
              {[
                { action: "Log analysis completed", client: "BlackRock", time: "2 minutes ago", status: "success" },
                { action: "Spec comparison failed", client: "Goldman Sachs", time: "15 minutes ago", status: "error" },
                { action: "New client onboarded", client: "Morgan Stanley", time: "1 hour ago", status: "success" },
                { action: "Test suite passed", client: "JP Morgan", time: "3 hours ago", status: "success" },
              ].map((activity, i) => (
                <div key={i} className={`flex items-center justify-between p-3 rounded-lg ${isDarkMode ? "bg-[#0a1628]" : "bg-[#f8fafc]"}`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${activity.status === "success" ? "bg-[#4caf50]" : "bg-[#f44336]"}`} />
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
      </main>
    </div>
  )

  // Clients List Screen
  const ClientsScreen = () => (
    <div className={`min-h-screen ${bgPrimary} flex`}>
      {/* Sidebar - same as dashboard */}
      <aside className={`w-64 ${bgSecondary} border-r ${borderColor} p-4 flex flex-col`}>
        <div className="flex items-center gap-2 mb-8">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[#00e5ff] to-[#0091ea]" />
          <span className={`text-xl font-bold ${textPrimary}`}>BControl</span>
        </div>
        
        <nav className="flex-1 space-y-1">
          {[
            { id: "overview", icon: BarChart3, label: "Overview" },
            { id: "clients", icon: Users, label: "Clients" },
            { id: "log-analysis", icon: FileText, label: "Log Analysis" },
            { id: "spec-compare", icon: GitCompare, label: "Spec Compare" },
            { id: "test-cases", icon: TestTube, label: "Test Cases" },
            { id: "alerts", icon: Bell, label: "Alerts" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => item.id === "clients" ? null : (item.id === "overview" ? setCurrentScreen("dashboard") : setActivePanel(item.id))}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                item.id === "clients"
                  ? isDarkMode ? "bg-[#1e4976] text-[#00e5ff]" : "bg-[#e3f2fd] text-[#1976d2]"
                  : `${textSecondary} hover:${isDarkMode ? "bg-[#1e4976]/50" : "bg-[#f1f5f9]"}`
              }`}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <button onClick={() => setCurrentScreen("dashboard")} className={`${textSecondary}`}>
                <ArrowLeft className="h-5 w-5" />
              </button>
              <div>
                <h1 className={`text-2xl font-bold ${textPrimary}`}>Clients</h1>
                <p className={textSecondary}>Manage your client relationships</p>
              </div>
            </div>
            <Button className="bg-gradient-to-r from-[#00e5ff] to-[#0091ea] text-[#0a1628]">
              <Plus className="mr-2 h-4 w-4" /> Add Client
            </Button>
          </div>

          {/* Search */}
          <div className={`relative mb-6`}>
            <Search className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 ${textSecondary}`} />
            <input 
              type="text"
              placeholder="Search clients..."
              value={clientSearchQuery}
              onChange={(e) => setClientSearchQuery(e.target.value)}
              className={`w-full pl-10 pr-4 py-3 rounded-lg border ${isDarkMode ? "bg-[#0d1f3c] border-[#1e4976] text-white" : "bg-white border-[#e2e8f0]"}`}
            />
          </div>

          {/* Clients Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {clients.filter(c => c.name.toLowerCase().includes(clientSearchQuery.toLowerCase())).map((client) => (
              <Card 
                key={client.id}
                onClick={() => { setViewingClient(client); setCurrentScreen("client-detail"); }}
                className={`p-5 cursor-pointer transition-all hover:scale-[1.02] ${isDarkMode ? "bg-[#0d1f3c] border-[#1e4976] hover:border-[#00e5ff]" : "bg-white border-[#e2e8f0] hover:border-[#1976d2]"}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${isDarkMode ? "bg-[#1e4976]" : "bg-[#e3f2fd]"}`}>
                      <Building2 className={`h-5 w-5 ${isDarkMode ? "text-[#00e5ff]" : "text-[#1976d2]"}`} />
                    </div>
                    <div>
                      <h3 className={`font-semibold ${textPrimary}`}>{client.name}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${client.status === "active" ? "bg-[#4caf50]/20 text-[#4caf50]" : "bg-[#f57c00]/20 text-[#f57c00]"}`}>
                        {client.status}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <p className={`text-lg font-bold ${textPrimary}`}>{client.specs}</p>
                    <p className={`text-xs ${textSecondary}`}>Specs</p>
                  </div>
                  <div>
                    <p className={`text-lg font-bold ${textPrimary}`}>{client.health}%</p>
                    <p className={`text-xs ${textSecondary}`}>Health</p>
                  </div>
                  <div>
                    <p className={`text-xs ${textSecondary}`}>{client.lastActivity}</p>
                    <p className={`text-xs ${textSecondary}`}>Last active</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  )

  // Client Detail Screen
  const ClientDetailScreen = () => (
    <div className={`min-h-screen ${bgPrimary} flex`}>
      {/* Sidebar */}
      <aside className={`w-64 ${bgSecondary} border-r ${borderColor} p-4 flex flex-col`}>
        <div className="flex items-center gap-2 mb-8">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[#00e5ff] to-[#0091ea]" />
          <span className={`text-xl font-bold ${textPrimary}`}>BControl</span>
        </div>
        
        <nav className="flex-1 space-y-1">
          {[
            { id: "overview", icon: BarChart3, label: "Overview" },
            { id: "clients", icon: Users, label: "Clients" },
            { id: "log-analysis", icon: FileText, label: "Log Analysis" },
            { id: "spec-compare", icon: GitCompare, label: "Spec Compare" },
            { id: "test-cases", icon: TestTube, label: "Test Cases" },
            { id: "alerts", icon: Bell, label: "Alerts" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => item.id === "clients" ? setCurrentScreen("clients") : (item.id === "overview" ? setCurrentScreen("dashboard") : setActivePanel(item.id))}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                item.id === "clients"
                  ? isDarkMode ? "bg-[#1e4976] text-[#00e5ff]" : "bg-[#e3f2fd] text-[#1976d2]"
                  : `${textSecondary} hover:${isDarkMode ? "bg-[#1e4976]/50" : "bg-[#f1f5f9]"}`
              }`}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <button onClick={() => setCurrentScreen("clients")} className={`${textSecondary}`}>
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div className="flex items-center gap-3">
              <div className={`h-12 w-12 rounded-lg flex items-center justify-center ${isDarkMode ? "bg-[#1e4976]" : "bg-[#e3f2fd]"}`}>
                <Building2 className={`h-6 w-6 ${isDarkMode ? "text-[#00e5ff]" : "text-[#1976d2]"}`} />
              </div>
              <div>
                <h1 className={`text-2xl font-bold ${textPrimary}`}>{viewingClient?.name}</h1>
                <span className={`text-xs px-2 py-0.5 rounded-full ${viewingClient?.status === "active" ? "bg-[#4caf50]/20 text-[#4caf50]" : "bg-[#f57c00]/20 text-[#f57c00]"}`}>
                  {viewingClient?.status}
                </span>
              </div>
            </div>
          </div>

          {/* Client Stats */}
          <div className="grid gap-4 md:grid-cols-4 mb-8">
            {[
              { label: "FIX Specs", value: viewingClient?.specs || 0, icon: FileText },
              { label: "Health Score", value: `${viewingClient?.health || 0}%`, icon: Activity },
              { label: "Tests Passed", value: "847", icon: CheckCircle },
              { label: "Active Alerts", value: "2", icon: AlertTriangle },
            ].map((stat, i) => (
              <Card key={i} className={`p-4 ${isDarkMode ? "bg-[#0d1f3c] border-[#1e4976]" : "bg-white border-[#e2e8f0]"}`}>
                <div className="flex items-center gap-3">
                  <stat.icon className={`h-8 w-8 ${isDarkMode ? "text-[#00e5ff]" : "text-[#1976d2]"}`} />
                  <div>
                    <p className={`text-2xl font-bold ${textPrimary}`}>{stat.value}</p>
                    <p className={`text-sm ${textSecondary}`}>{stat.label}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Actions */}
          <Card className={`p-6 ${isDarkMode ? "bg-[#0d1f3c] border-[#1e4976]" : "bg-white border-[#e2e8f0]"}`}>
            <h2 className={`text-lg font-semibold mb-4 ${textPrimary}`}>Quick Actions</h2>
            <div className="grid gap-3 md:grid-cols-4">
              <Button variant="outline" className={`justify-start ${isDarkMode ? "border-[#1e4976] text-[#64b5f6]" : ""}`}>
                <Upload className="mr-2 h-4 w-4" /> Upload Log
              </Button>
              <Button variant="outline" className={`justify-start ${isDarkMode ? "border-[#1e4976] text-[#64b5f6]" : ""}`}>
                <GitCompare className="mr-2 h-4 w-4" /> Compare Specs
              </Button>
              <Button variant="outline" className={`justify-start ${isDarkMode ? "border-[#1e4976] text-[#64b5f6]" : ""}`}>
                <TestTube className="mr-2 h-4 w-4" /> Run Tests
              </Button>
              <Button variant="outline" className={`justify-start ${isDarkMode ? "border-[#1e4976] text-[#64b5f6]" : ""}`}>
                <Settings className="mr-2 h-4 w-4" /> Settings
              </Button>
            </div>
          </Card>
        </div>
      </main>
    </div>
  )

  // Render current screen
  return (
    <>
      {currentScreen === "home" && <HomeScreen />}
      {currentScreen === "role-selection" && <RoleSelectionScreen />}
      {currentScreen === "dashboard" && <DashboardScreen />}
      {currentScreen === "clients" && <ClientsScreen />}
      {currentScreen === "client-detail" && <ClientDetailScreen />}
    </>
  )
}
