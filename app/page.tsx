"use client"

import React, { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Briefcase, AlertTriangle, CheckCircle, Clock, LogIn, LogOut,
  Menu, X, Settings, Home, FileText, CheckSquare, Archive, BookOpen,
  TrendingUp, Users, Zap, AlertCircle, Target, FileCheck, BarChart3,
  ChevronRight, Search, Filter, Download, Plus, TrendingDown, ShieldAlert,
  Calendar, Eye, ThumbsUp, ThumbsDown, MessageSquare, Lock, Package,
  Rocket, Award, TestTube, ArrowRight, GitCompare, Activity, Gauge, Shield,
  Play, Upload, RefreshCw, ChevronDown, Wrench, FileSearch, Database,
  Layers, ClipboardCheck, Send, Mail
} from "lucide-react"

// Screen type definition with all screens
type ScreenType = 
  | "welcome" | "demo-request" | "login" | "role-select" 
  | "dashboard" | "onboarding-cases" | "case-intake"
  | "spec-compare" | "log-analysis" | "scenario-creation"
  | "testing" | "certification" 
  | "approvals" | "evidence-vault" | "rule-library" | "sla-analytics"
  | "atdl-fix-compare" | "atdl-atdl-compare" | "atdl-convert" | "atdl-validate" | "atdl-preview"

export default function Page() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>("welcome")
  const [selectedRole, setSelectedRole] = useState<"client" | "admin" | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [approvalsTab, setApprovalsTab] = useState("pending")
  const [demoEmail, setDemoEmail] = useState("")
  const [expandedSection, setExpandedSection] = useState<string | null>("tools")

  // Theme colors
  const bgPrimary = isDarkMode ? "bg-[#0a1628]" : "bg-[#f8fafc]"
  const bgSecondary = isDarkMode ? "bg-[#0d2137]" : "bg-white"
  const bgCard = isDarkMode ? "bg-[#132f4c]" : "bg-white"
  const textPrimary = isDarkMode ? "text-white" : "text-[#0a1628]"
  const textSecondary = isDarkMode ? "text-[#b0bec5]" : "text-[#64748b]"
  const borderColor = isDarkMode ? "border-[#1e4976]" : "border-[#e2e8f0]"
  const accentCyan = "#00e5ff"

  // Broadridge demo contacts
  const broadridgeContacts = [
    { name: "John Smith", email: "john.smith@broadridge.com", role: "Sales Director" },
    { name: "Sarah Johnson", email: "sarah.johnson@broadridge.com", role: "Solutions Architect" },
    { name: "Michael Chen", email: "michael.chen@broadridge.com", role: "Product Manager" },
  ]

  // Sidebar component
  const Sidebar = () => {
    const navSections = [
      {
        id: "main",
        label: "Main",
        items: [
          { label: "Dashboard", icon: Home, screen: "dashboard" as ScreenType },
          { label: "Onboarding Cases", icon: Briefcase, screen: "onboarding-cases" as ScreenType },
        ]
      },
      {
        id: "tools",
        label: "ATDL Tools",
        items: [
          { label: "FIX to ATDL Compare", icon: GitCompare, screen: "atdl-fix-compare" as ScreenType },
          { label: "ATDL to ATDL Compare", icon: Layers, screen: "atdl-atdl-compare" as ScreenType },
          { label: "FIX to ATDL Convert", icon: RefreshCw, screen: "atdl-convert" as ScreenType },
          { label: "Validate Structure", icon: CheckSquare, screen: "atdl-validate" as ScreenType },
          { label: "Usage Preview", icon: Eye, screen: "atdl-preview" as ScreenType },
        ]
      },
      {
        id: "workflow",
        label: "Workflow",
        items: [
          { label: "Spec Compare", icon: FileSearch, screen: "spec-compare" as ScreenType },
          { label: "Log Analysis", icon: Activity, screen: "log-analysis" as ScreenType },
          { label: "Scenario Creation", icon: FileText, screen: "scenario-creation" as ScreenType },
          { label: "Testing", icon: TestTube, screen: "testing" as ScreenType },
          { label: "Certification", icon: Award, screen: "certification" as ScreenType },
        ]
      },
      {
        id: "governance",
        label: "Governance",
        items: [
          { label: "Approvals", icon: ClipboardCheck, screen: "approvals" as ScreenType },
          { label: "Evidence Vault", icon: Archive, screen: "evidence-vault" as ScreenType },
          { label: "Rule Library", icon: BookOpen, screen: "rule-library" as ScreenType },
          { label: "SLA Analytics", icon: BarChart3, screen: "sla-analytics" as ScreenType },
        ]
      }
    ]

    return (
      <div className={`${sidebarOpen ? "w-64" : "w-16"} ${bgSecondary} border-r ${borderColor} transition-all duration-300 flex flex-col h-screen sticky top-0`}>
        <div className="p-4 flex items-center justify-between border-b border-[#1e4976]">
          {sidebarOpen && <span className="font-bold text-[#00e5ff] text-lg">B-COMET</span>}
          <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(!sidebarOpen)} className="text-white hover:bg-[#1e4976]">
            {sidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>

        <nav className="flex-1 overflow-y-auto py-2">
          {navSections.map((section) => (
            <div key={section.id} className="mb-2">
              {sidebarOpen && (
                <button
                  onClick={() => setExpandedSection(expandedSection === section.id ? null : section.id)}
                  className="w-full flex items-center justify-between px-4 py-2 text-xs font-semibold text-[#64748b] uppercase tracking-wider hover:text-white"
                >
                  {section.label}
                  <ChevronDown className={`h-3 w-3 transition-transform ${expandedSection === section.id ? "rotate-180" : ""}`} />
                </button>
              )}
              
              {(expandedSection === section.id || !sidebarOpen) && (
                <div className="space-y-1 px-2">
                  {section.items.map((item) => (
                    <button
                      key={item.screen}
                      onClick={() => setCurrentScreen(item.screen)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded transition-colors ${
                        currentScreen === item.screen 
                          ? "bg-[#00e5ff]/20 text-[#00e5ff]" 
                          : "text-[#e0e0e0] hover:text-white hover:bg-[#1e4976]"
                      }`}
                      title={!sidebarOpen ? item.label : undefined}
                    >
                      <item.icon className="h-4 w-4 flex-shrink-0" />
                      {sidebarOpen && <span className="text-sm">{item.label}</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="p-4 border-t border-[#1e4976]">
          <div className="flex items-center gap-2 mb-3">
            {sidebarOpen && (
              <span className={`text-xs ${textSecondary}`}>
                {selectedRole === "admin" ? "Administrator" : "Client User"}
              </span>
            )}
          </div>
          <Button 
            onClick={() => { setCurrentScreen("welcome"); setSelectedRole(null); }}
            className="w-full text-[#f44336] hover:bg-[#f44336]/20"
            variant="ghost"
            size="sm"
          >
            <LogOut className="h-4 w-4" />
            {sidebarOpen && <span className="ml-2">Logout</span>}
          </Button>
        </div>
      </div>
    )
  }

  // ========== WELCOME SCREEN ==========
  if (currentScreen === "welcome") {
    return (
      <div className={`min-h-screen ${bgPrimary}`}>
        {/* Navigation */}
        <nav className={`${bgSecondary} border-b ${borderColor} sticky top-0 z-50`}>
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-[#00e5ff]">B-COMET</h1>
            <div className="flex gap-3">
              <Button onClick={() => setCurrentScreen("demo-request")} variant="outline" className="border-[#00e5ff] text-[#00e5ff]">
                Request Demo
              </Button>
              <Button onClick={() => setCurrentScreen("login")} className="bg-[#00e5ff] text-[#0a1628] hover:bg-[#00d0e8]">
                <LogIn className="h-4 w-4 mr-2" /> Login
              </Button>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className={`text-5xl font-bold ${textPrimary} mb-6`}>Enterprise FIX Protocol Testing & Onboarding</h2>
              <p className={`text-xl ${textSecondary} mb-8`}>B-COMET streamlines your FIX trading system integration with automated testing, comprehensive certification, and collaborative onboarding workflows.</p>
              <div className="flex gap-4">
                <Button onClick={() => setCurrentScreen("demo-request")} className="text-lg px-8 py-6 bg-[#00e5ff] text-[#0a1628] hover:bg-[#00d0e8]">
                  Get Started <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </div>
            </div>

            {/* Animated Model */}
            <div className={`relative h-96 rounded-xl ${bgCard} border ${borderColor} overflow-hidden`}>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="absolute w-20 h-20 rounded-full border-2 border-[#00e5ff] animate-ping opacity-20" />
                <div className="absolute w-32 h-32 rounded-full border border-[#00e5ff]/50 animate-[spin_20s_linear_infinite]" />
                <div className="absolute w-48 h-48 rounded-full border border-[#2196f3]/30 animate-[spin_30s_linear_infinite_reverse]" />
                <div className="absolute w-64 h-64 rounded-full border border-[#4caf50]/20 animate-[spin_40s_linear_infinite]" />
                
                <div className="relative z-10 w-16 h-16 rounded-full bg-[#00e5ff]/20 flex items-center justify-center border-2 border-[#00e5ff]">
                  <Rocket className="h-8 w-8 text-[#00e5ff]" />
                </div>

                {/* Orbiting nodes */}
                <div className="absolute w-32 h-32 animate-[spin_10s_linear_infinite]">
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#2196f3] rounded-full" />
                </div>
                <div className="absolute w-48 h-48 animate-[spin_15s_linear_infinite_reverse]">
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#4caf50] rounded-full" />
                </div>
                <div className="absolute w-64 h-64 animate-[spin_25s_linear_infinite]">
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#ff9800] rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Product Capabilities Grid */}
        <section className={`py-20 px-6 ${bgSecondary}`}>
          <div className="max-w-6xl mx-auto">
            <h3 className={`text-4xl font-bold ${textPrimary} text-center mb-4`}>What B-COMET Does</h3>
            <p className={`${textSecondary} text-center mb-12 max-w-2xl mx-auto`}>A complete platform for FIX protocol testing, certification, and client onboarding</p>
            
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: GitCompare, title: "Spec Compare", description: "Compare FIX specs across versions with automated validation and gap analysis." },
                { icon: Activity, title: "Log Analysis", description: "Analyze trading logs against spec requirements and identify compliance issues." },
                { icon: FileText, title: "Scenario Creation", description: "Build and manage test scenarios with configurable parameters and expected outcomes." },
                { icon: TestTube, title: "Automated Testing", description: "Run comprehensive test suites with VeriFIX integration and real-time monitoring." },
                { icon: Award, title: "Certification", description: "Build certification packs with Conductor integration and approval workflows." },
                { icon: Shield, title: "Governance", description: "Maintain evidence vault, rule library, and full audit trails for compliance." },
              ].map((item, idx) => (
                <Card key={idx} className={`${bgCard} border ${borderColor} p-6 hover:border-[#00e5ff] transition-all cursor-pointer group`}>
                  <div className="w-12 h-12 rounded-lg bg-[#00e5ff]/10 flex items-center justify-center mb-4 group-hover:bg-[#00e5ff]/20 transition-colors">
                    <item.icon className="h-6 w-6 text-[#00e5ff]" />
                  </div>
                  <h4 className={`text-lg font-semibold ${textPrimary} mb-2`}>{item.title}</h4>
                  <p className={`${textSecondary} text-sm`}>{item.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className={`${bgSecondary} py-8 px-6 border-t ${borderColor}`}>
          <div className="max-w-6xl mx-auto text-center">
            <p className={`${textSecondary} text-sm`}>2024 B-COMET by Broadridge. Enterprise FIX Protocol Platform.</p>
          </div>
        </footer>
      </div>
    )
  }

  // ========== DEMO REQUEST SCREEN ==========
  if (currentScreen === "demo-request") {
    return (
      <div className={`min-h-screen ${bgPrimary} flex items-center justify-center p-4`}>
        <Card className={`${bgCard} border ${borderColor} p-8 w-full max-w-lg`}>
          <Button variant="ghost" onClick={() => setCurrentScreen("welcome")} className="mb-4 text-[#00e5ff]">
            <ArrowRight className="h-4 w-4 mr-2 rotate-180" /> Back
          </Button>
          
          <h2 className={`text-2xl font-bold ${textPrimary} mb-2`}>Request a Demo</h2>
          <p className={`${textSecondary} mb-6`}>Get in touch with our team to see B-COMET in action.</p>

          <div className="space-y-4 mb-6">
            <div>
              <label className={`block text-sm font-medium ${textPrimary} mb-2`}>Your Email</label>
              <Input 
                type="email"
                placeholder="your@company.com" 
                value={demoEmail}
                onChange={(e) => setDemoEmail(e.target.value)}
                className={`${isDarkMode ? "bg-[#0d2137] border-[#1e4976]" : ""}`}
              />
            </div>
            <div>
              <label className={`block text-sm font-medium ${textPrimary} mb-2`}>Company Name</label>
              <Input placeholder="Your Company" className={`${isDarkMode ? "bg-[#0d2137] border-[#1e4976]" : ""}`} />
            </div>
            <div>
              <label className={`block text-sm font-medium ${textPrimary} mb-2`}>Message (Optional)</label>
              <textarea 
                placeholder="Tell us about your needs..."
                className={`w-full p-3 rounded-md border ${borderColor} ${isDarkMode ? "bg-[#0d2137]" : ""} ${textPrimary} min-h-[100px]`}
              />
            </div>
          </div>

          <Button className="w-full bg-[#00e5ff] text-[#0a1628] hover:bg-[#00d0e8] mb-6">
            <Send className="h-4 w-4 mr-2" /> Submit Request
          </Button>

          <div className={`border-t ${borderColor} pt-6`}>
            <p className={`text-sm font-medium ${textPrimary} mb-3`}>Or contact our team directly:</p>
            <div className="space-y-3">
              {broadridgeContacts.map((contact, idx) => (
                <div key={idx} className={`flex items-center justify-between p-3 rounded-lg ${bgSecondary} border ${borderColor}`}>
                  <div>
                    <p className={`font-medium ${textPrimary}`}>{contact.name}</p>
                    <p className={`text-xs ${textSecondary}`}>{contact.role}</p>
                  </div>
                  <a href={`mailto:${contact.email}`} className="flex items-center gap-2 text-[#00e5ff] hover:underline text-sm">
                    <Mail className="h-4 w-4" /> {contact.email}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    )
  }

  // ========== LOGIN SCREEN ==========
  if (currentScreen === "login") {
    return (
      <div className={`min-h-screen ${bgPrimary} flex items-center justify-center p-4`}>
        <Card className={`${bgCard} border ${borderColor} p-8 w-full max-w-md`}>
          <Button variant="ghost" onClick={() => setCurrentScreen("welcome")} className="mb-4 text-[#00e5ff]">
            <ArrowRight className="h-4 w-4 mr-2 rotate-180" /> Back
          </Button>
          
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[#00e5ff] mb-2">B-COMET</h1>
            <p className={`text-sm ${textSecondary}`}>Enterprise Onboarding Control Center</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className={`block text-sm font-medium ${textPrimary} mb-2`}>Username</label>
              <Input placeholder="Enter username" className={`${isDarkMode ? "bg-[#0d2137] border-[#1e4976]" : ""}`} />
            </div>
            <div>
              <label className={`block text-sm font-medium ${textPrimary} mb-2`}>Password</label>
              <Input type="password" placeholder="Enter password" className={`${isDarkMode ? "bg-[#0d2137] border-[#1e4976]" : ""}`} />
            </div>
            <Button onClick={() => setCurrentScreen("role-select")} className="w-full bg-[#00e5ff] text-[#0a1628] hover:bg-[#00d0e8]">
              <LogIn className="h-4 w-4 mr-2" /> Login
            </Button>
          </div>
        </Card>
      </div>
    )
  }

  // ========== ROLE SELECT SCREEN ==========
  if (currentScreen === "role-select") {
    return (
      <div className={`min-h-screen ${bgPrimary} flex items-center justify-center p-4`}>
        <Card className={`${bgCard} border ${borderColor} p-8 w-full max-w-md`}>
          <h2 className={`text-2xl font-bold ${textPrimary} mb-6 text-center`}>Select Your Role</h2>
          
          <div className="space-y-4">
            <button 
              onClick={() => { setSelectedRole("client"); setCurrentScreen("dashboard"); }}
              className={`w-full h-32 flex flex-col items-center justify-center gap-3 rounded-lg ${bgSecondary} border-2 ${borderColor} hover:border-[#00e5ff] transition-colors`}
            >
              <Users className="h-8 w-8 text-[#00e5ff]" />
              <div className="text-center">
                <p className={`font-semibold ${textPrimary}`}>Client</p>
                <p className={`text-xs ${textSecondary}`}>View your onboarding status and progress</p>
              </div>
            </button>
            
            <button 
              onClick={() => { setSelectedRole("admin"); setCurrentScreen("dashboard"); }}
              className={`w-full h-32 flex flex-col items-center justify-center gap-3 rounded-lg ${bgSecondary} border-2 ${borderColor} hover:border-[#00e5ff] transition-colors`}
            >
              <Settings className="h-8 w-8 text-[#00e5ff]" />
              <div className="text-center">
                <p className={`font-semibold ${textPrimary}`}>Administrator</p>
                <p className={`text-xs ${textSecondary}`}>Manage onboarding cases and workflows</p>
              </div>
            </button>
          </div>
        </Card>
      </div>
    )
  }

  // ========== DASHBOARD SCREEN ==========
  if (currentScreen === "dashboard") {
    const dashboardStats = selectedRole === "admin" ? [
      { label: "Active Cases", value: "24", change: "+3", color: "#2196f3" },
      { label: "At Risk", value: "3", change: "-1", color: "#ff9800" },
      { label: "Blocked", value: "2", change: "0", color: "#f44336" },
      { label: "Completed This Month", value: "8", change: "+2", color: "#4caf50" },
      { label: "Pending Approvals", value: "12", change: "+4", color: "#9c27b0" },
    ] : [
      { label: "My Cases", value: "3", change: "", color: "#2196f3" },
      { label: "In Progress", value: "2", change: "", color: "#ff9800" },
      { label: "Completed", value: "1", change: "", color: "#4caf50" },
      { label: "Pending Actions", value: "4", change: "", color: "#9c27b0" },
    ]

    const priorityQueue = [
      { id: "C001", client: "Goldman Sachs", stage: "Spec Compare", risk: "high", daysLeft: 2 },
      { id: "C002", client: "Morgan Stanley", stage: "Testing", risk: "medium", daysLeft: 5 },
      { id: "C003", client: "JP Morgan", stage: "Certification", risk: "low", daysLeft: 8 },
    ]

    const blockers = [
      { case: "C001", issue: "Missing FIX 4.4 spec document", owner: "Client", severity: "critical" },
      { case: "C002", issue: "UAT environment not available", owner: "IT Ops", severity: "high" },
    ]

    return (
      <div className={`min-h-screen ${bgPrimary} flex`}>
        <Sidebar />
        <div className="flex-1 overflow-auto">
          <div className="p-8 space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
              <div>
                <h2 className={`text-3xl font-bold ${textPrimary}`}>Dashboard</h2>
                <p className={`${textSecondary} text-sm mt-1`}>
                  Welcome back, {selectedRole === "admin" ? "Administrator" : "Client User"}
                </p>
              </div>
              <div className="flex gap-2">
                {selectedRole === "admin" && (
                  <Button onClick={() => setCurrentScreen("case-intake")} className="bg-[#00e5ff] text-[#0a1628]">
                    <Plus className="h-4 w-4 mr-2" /> New Case
                  </Button>
                )}
              </div>
            </div>

            {/* KPI Strip */}
            <div className={`grid ${selectedRole === "admin" ? "grid-cols-5" : "grid-cols-4"} gap-4`}>
              {dashboardStats.map((stat) => (
                <Card key={stat.label} className={`${bgCard} border ${borderColor} p-4`}>
                  <p className={`text-xs ${textSecondary} mb-1`}>{stat.label}</p>
                  <div className="flex items-end justify-between">
                    <p className="text-3xl font-bold" style={{ color: stat.color }}>{stat.value}</p>
                    {stat.change && (
                      <span className={`text-xs ${stat.change.startsWith("+") ? "text-[#4caf50]" : stat.change.startsWith("-") ? "text-[#f44336]" : textSecondary}`}>
                        {stat.change}
                      </span>
                    )}
                  </div>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-6">
              {/* Priority Action Queue */}
              <Card className={`${bgCard} border ${borderColor} p-6`}>
                <h3 className={`text-lg font-semibold ${textPrimary} mb-4`}>Priority Action Queue</h3>
                <div className="space-y-3">
                  {priorityQueue.map((item) => (
                    <div key={item.id} className={`flex items-center justify-between p-3 rounded-lg ${bgSecondary} border ${borderColor}`}>
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${
                          item.risk === "high" ? "bg-[#f44336]" : item.risk === "medium" ? "bg-[#ff9800]" : "bg-[#4caf50]"
                        }`} />
                        <div>
                          <p className={`font-medium ${textPrimary}`}>{item.client}</p>
                          <p className={`text-xs ${textSecondary}`}>{item.id} - {item.stage}</p>
                        </div>
                      </div>
                      <span className={`text-sm ${item.daysLeft <= 3 ? "text-[#f44336]" : textSecondary}`}>
                        {item.daysLeft}d left
                      </span>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Blockers Panel */}
              {selectedRole === "admin" && (
                <Card className={`${bgCard} border ${borderColor} p-6`}>
                  <h3 className={`text-lg font-semibold ${textPrimary} mb-4`}>Active Blockers</h3>
                  <div className="space-y-3">
                    {blockers.map((blocker, idx) => (
                      <div key={idx} className={`p-3 rounded-lg border ${
                        blocker.severity === "critical" ? "border-[#f44336] bg-[#f44336]/10" : "border-[#ff9800] bg-[#ff9800]/10"
                      }`}>
                        <div className="flex items-start justify-between">
                          <div>
                            <p className={`font-medium ${textPrimary}`}>{blocker.issue}</p>
                            <p className={`text-xs ${textSecondary} mt-1`}>Case: {blocker.case} | Owner: {blocker.owner}</p>
                          </div>
                          <span className={`text-xs px-2 py-1 rounded ${
                            blocker.severity === "critical" ? "bg-[#f44336]/20 text-[#f44336]" : "bg-[#ff9800]/20 text-[#ff9800]"
                          }`}>
                            {blocker.severity}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              )}
            </div>

            {/* Recent Cases Table */}
            <Card className={`${bgCard} border ${borderColor} p-6`}>
              <div className="flex justify-between items-center mb-4">
                <h3 className={`text-lg font-semibold ${textPrimary}`}>Recent Cases</h3>
                <Button variant="outline" size="sm" onClick={() => setCurrentScreen("onboarding-cases")}>
                  View All <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className={`border-b ${borderColor}`}>
                      <th className={`text-left py-3 px-2 ${textSecondary} font-semibold`}>Case ID</th>
                      <th className={`text-left py-3 px-2 ${textSecondary} font-semibold`}>Client</th>
                      <th className={`text-left py-3 px-2 ${textSecondary} font-semibold`}>Stage</th>
                      <th className={`text-left py-3 px-2 ${textSecondary} font-semibold`}>Status</th>
                      <th className={`text-left py-3 px-2 ${textSecondary} font-semibold`}>Progress</th>
                      <th className={`text-left py-3 px-2 ${textSecondary} font-semibold`}>SLA</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { id: "C001", client: "Goldman Sachs", stage: "Spec Compare", status: "In Progress", progress: 45, sla: "On Track" },
                      { id: "C002", client: "Morgan Stanley", stage: "Testing", status: "In Progress", progress: 72, sla: "At Risk" },
                      { id: "C003", client: "JP Morgan", stage: "Certification", status: "In Progress", progress: 88, sla: "On Track" },
                      { id: "C004", client: "Bank of America", stage: "Complete", status: "Certified", progress: 100, sla: "Met" },
                    ].map((row) => (
                      <tr key={row.id} className={`border-b ${borderColor} hover:bg-[#1e4976]/30 cursor-pointer`}>
                        <td className={`py-3 px-2 font-mono text-xs ${textPrimary}`}>{row.id}</td>
                        <td className={`py-3 px-2 ${textPrimary}`}>{row.client}</td>
                        <td className={`py-3 px-2 ${textSecondary}`}>{row.stage}</td>
                        <td className="py-3 px-2">
                          <span className={`px-2 py-1 rounded text-xs ${
                            row.status === "Certified" ? "bg-[#4caf50]/20 text-[#4caf50]" : "bg-[#2196f3]/20 text-[#2196f3]"
                          }`}>
                            {row.status}
                          </span>
                        </td>
                        <td className="py-3 px-2">
                          <div className="flex items-center gap-2">
                            <div className="w-20 bg-[#1e4976] rounded-full h-2">
                              <div className="bg-[#00e5ff] h-full rounded-full" style={{ width: `${row.progress}%` }} />
                            </div>
                            <span className={`text-xs ${textSecondary}`}>{row.progress}%</span>
                          </div>
                        </td>
                        <td className="py-3 px-2">
                          <span className={`text-xs ${
                            row.sla === "On Track" || row.sla === "Met" ? "text-[#4caf50]" : "text-[#ff9800]"
                          }`}>
                            {row.sla}
                          </span>
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

  // ========== ONBOARDING CASES SCREEN ==========
  if (currentScreen === "onboarding-cases") {
    const cases = [
      { id: "C001", client: "Goldman Sachs", asset: "Equities", fix: "4.4", stage: "Spec Compare", progress: 45, sla: "On Track", owner: "J. Smith" },
      { id: "C002", client: "Morgan Stanley", asset: "Fixed Income", fix: "5.0", stage: "Testing", progress: 72, sla: "At Risk", owner: "S. Johnson" },
      { id: "C003", client: "JP Morgan", asset: "Options", fix: "4.2", stage: "Certification", progress: 88, sla: "On Track", owner: "M. Chen" },
      { id: "C004", client: "Bank of America", asset: "Equities", fix: "4.4", stage: "Complete", progress: 100, sla: "Met", owner: "J. Smith" },
      { id: "C005", client: "Citigroup", asset: "FX", fix: "5.0", stage: "Log Analysis", progress: 35, sla: "On Track", owner: "A. Williams" },
    ]

    return (
      <div className={`min-h-screen ${bgPrimary} flex`}>
        <Sidebar />
        <div className="flex-1 overflow-auto">
          <div className="p-8 space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className={`text-3xl font-bold ${textPrimary}`}>Onboarding Cases</h2>
                <p className={`${textSecondary} text-sm mt-1`}>Manage all client onboarding cases</p>
              </div>
              {selectedRole === "admin" && (
                <Button onClick={() => setCurrentScreen("case-intake")} className="bg-[#00e5ff] text-[#0a1628]">
                  <Plus className="h-4 w-4 mr-2" /> New Case
                </Button>
              )}
            </div>

            {/* Filters */}
            <div className="flex gap-3">
              <div className="relative flex-1 max-w-md">
                <Search className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 ${textSecondary}`} />
                <Input placeholder="Search cases..." className={`pl-10 ${isDarkMode ? "bg-[#0d2137] border-[#1e4976]" : ""}`} />
              </div>
              <Button variant="outline" className={`border-[#1e4976] ${textSecondary}`}>
                <Filter className="h-4 w-4 mr-2" /> Filters
              </Button>
            </div>

            {/* Cases Table */}
            <Card className={`${bgCard} border ${borderColor}`}>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className={`border-b ${borderColor} bg-[#0d2137]`}>
                      <th className={`text-left py-4 px-4 ${textSecondary} font-semibold`}>Case ID</th>
                      <th className={`text-left py-4 px-4 ${textSecondary} font-semibold`}>Client</th>
                      <th className={`text-left py-4 px-4 ${textSecondary} font-semibold`}>Asset Class</th>
                      <th className={`text-left py-4 px-4 ${textSecondary} font-semibold`}>FIX Ver</th>
                      <th className={`text-left py-4 px-4 ${textSecondary} font-semibold`}>Stage</th>
                      <th className={`text-left py-4 px-4 ${textSecondary} font-semibold`}>Progress</th>
                      <th className={`text-left py-4 px-4 ${textSecondary} font-semibold`}>SLA</th>
                      <th className={`text-left py-4 px-4 ${textSecondary} font-semibold`}>Owner</th>
                      <th className={`text-left py-4 px-4 ${textSecondary} font-semibold`}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cases.map((row) => (
                      <tr key={row.id} className={`border-b ${borderColor} hover:bg-[#1e4976]/30`}>
                        <td className={`py-4 px-4 font-mono text-xs text-[#00e5ff]`}>{row.id}</td>
                        <td className={`py-4 px-4 font-medium ${textPrimary}`}>{row.client}</td>
                        <td className={`py-4 px-4 ${textSecondary}`}>{row.asset}</td>
                        <td className={`py-4 px-4 ${textSecondary}`}>{row.fix}</td>
                        <td className="py-4 px-4">
                          <span className={`px-2 py-1 rounded text-xs ${
                            row.stage === "Complete" ? "bg-[#4caf50]/20 text-[#4caf50]" : "bg-[#2196f3]/20 text-[#2196f3]"
                          }`}>
                            {row.stage}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <div className="w-16 bg-[#1e4976] rounded-full h-2">
                              <div className="bg-[#00e5ff] h-full rounded-full" style={{ width: `${row.progress}%` }} />
                            </div>
                            <span className={`text-xs ${textSecondary}`}>{row.progress}%</span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className={`text-xs font-medium ${
                            row.sla === "On Track" || row.sla === "Met" ? "text-[#4caf50]" : "text-[#ff9800]"
                          }`}>
                            {row.sla}
                          </span>
                        </td>
                        <td className={`py-4 px-4 ${textSecondary}`}>{row.owner}</td>
                        <td className="py-4 px-4">
                          <Button variant="ghost" size="sm" className="text-[#00e5ff]">
                            <Eye className="h-4 w-4" />
                          </Button>
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

  // ========== CASE INTAKE SCREEN ==========
  if (currentScreen === "case-intake") {
    return (
      <div className={`min-h-screen ${bgPrimary} flex`}>
        <Sidebar />
        <div className="flex-1 overflow-auto">
          <div className="p-8 space-y-6">
            <div>
              <h2 className={`text-3xl font-bold ${textPrimary}`}>New Onboarding Case</h2>
              <p className={`${textSecondary} text-sm mt-1`}>Create a new client onboarding case</p>
            </div>

            <Card className={`${bgCard} border ${borderColor} p-6 max-w-2xl`}>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium ${textPrimary} mb-2`}>Client Name</label>
                    <Input placeholder="Select client" className={`${isDarkMode ? "bg-[#0d2137] border-[#1e4976]" : ""}`} />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium ${textPrimary} mb-2`}>Legal Entity</label>
                    <Input placeholder="Legal entity" className={`${isDarkMode ? "bg-[#0d2137] border-[#1e4976]" : ""}`} />
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-medium ${textPrimary} mb-2`}>Asset Classes</label>
                  <div className="flex flex-wrap gap-2">
                    {["Equities", "Fixed Income", "Options", "Futures", "FX", "Commodities"].map((asset) => (
                      <button key={asset} className={`px-3 py-1.5 rounded-full text-sm border ${borderColor} hover:border-[#00e5ff] hover:text-[#00e5ff] ${textSecondary}`}>
                        {asset}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-medium ${textPrimary} mb-2`}>FIX Version</label>
                  <div className="flex gap-2">
                    {["4.2", "4.4", "5.0", "Custom"].map((ver) => (
                      <button key={ver} className={`px-4 py-2 rounded text-sm border ${borderColor} hover:border-[#00e5ff] hover:text-[#00e5ff] ${textSecondary}`}>
                        FIX {ver}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button variant="outline" onClick={() => setCurrentScreen("onboarding-cases")}>Cancel</Button>
                  <Button className="bg-[#00e5ff] text-[#0a1628]">Create Case</Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  // ========== SPEC COMPARE SCREEN ==========
  if (currentScreen === "spec-compare") {
    return (
      <div className={`min-h-screen ${bgPrimary} flex`}>
        <Sidebar />
        <div className="flex-1 overflow-auto">
          <div className="p-8 space-y-6">
            <div>
              <h2 className={`text-3xl font-bold ${textPrimary}`}>Spec Compare</h2>
              <p className={`${textSecondary} text-sm mt-1`}>Compare FIX specifications and identify gaps</p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <Card className={`${bgCard} border ${borderColor} p-6`}>
                <h3 className={`font-semibold ${textPrimary} mb-4`}>Source Specification</h3>
                <div className={`border-2 border-dashed ${borderColor} rounded-lg p-8 text-center`}>
                  <Upload className={`h-8 w-8 mx-auto mb-2 ${textSecondary}`} />
                  <p className={`${textSecondary}`}>Drop FIX spec file or click to browse</p>
                </div>
              </Card>

              <Card className={`${bgCard} border ${borderColor} p-6`}>
                <h3 className={`font-semibold ${textPrimary} mb-4`}>Target Specification</h3>
                <div className={`border-2 border-dashed ${borderColor} rounded-lg p-8 text-center`}>
                  <Upload className={`h-8 w-8 mx-auto mb-2 ${textSecondary}`} />
                  <p className={`${textSecondary}`}>Drop FIX spec file or click to browse</p>
                </div>
              </Card>
            </div>

            <div className="flex justify-center">
              <Button className="bg-[#00e5ff] text-[#0a1628] px-8">
                <GitCompare className="h-4 w-4 mr-2" /> Compare Specifications
              </Button>
            </div>

            <Card className={`${bgCard} border ${borderColor} p-6`}>
              <h3 className={`font-semibold ${textPrimary} mb-4`}>Comparison Results</h3>
              <div className={`text-center py-12 ${textSecondary}`}>
                <FileSearch className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>Upload specifications to see comparison results</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  // ========== LOG ANALYSIS SCREEN ==========
  if (currentScreen === "log-analysis") {
    return (
      <div className={`min-h-screen ${bgPrimary} flex`}>
        <Sidebar />
        <div className="flex-1 overflow-auto">
          <div className="p-8 space-y-6">
            <div>
              <h2 className={`text-3xl font-bold ${textPrimary}`}>Log Analysis</h2>
              <p className={`${textSecondary} text-sm mt-1`}>Analyze trading logs against spec requirements</p>
            </div>

            <Card className={`${bgCard} border ${borderColor} p-6`}>
              <h3 className={`font-semibold ${textPrimary} mb-4`}>Upload Log Files</h3>
              <div className={`border-2 border-dashed ${borderColor} rounded-lg p-8 text-center`}>
                <Upload className={`h-8 w-8 mx-auto mb-2 ${textSecondary}`} />
                <p className={`${textSecondary}`}>Drop FIX log files here or click to browse</p>
              </div>
            </Card>

            <Button className="bg-[#00e5ff] text-[#0a1628]">
              <Play className="h-4 w-4 mr-2" /> Analyze Logs
            </Button>

            <Card className={`${bgCard} border ${borderColor} p-6`}>
              <h3 className={`font-semibold ${textPrimary} mb-4`}>Analysis Results</h3>
              <div className={`text-center py-12 ${textSecondary}`}>
                <Activity className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>Upload log files to see analysis results</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  // ========== SCENARIO CREATION SCREEN ==========
  if (currentScreen === "scenario-creation") {
    return (
      <div className={`min-h-screen ${bgPrimary} flex`}>
        <Sidebar />
        <div className="flex-1 overflow-auto">
          <div className="p-8 space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className={`text-3xl font-bold ${textPrimary}`}>Scenario Creation</h2>
                <p className={`${textSecondary} text-sm mt-1`}>Build and manage test scenarios</p>
              </div>
              <Button className="bg-[#00e5ff] text-[#0a1628]">
                <Plus className="h-4 w-4 mr-2" /> New Scenario
              </Button>
            </div>

            <Card className={`${bgCard} border ${borderColor} p-6`}>
              <h3 className={`font-semibold ${textPrimary} mb-4`}>Saved Scenarios</h3>
              <div className="space-y-3">
                {[
                  { name: "New Order Single - Buy", type: "Order", status: "Active" },
                  { name: "Order Cancel Request", type: "Cancel", status: "Active" },
                  { name: "Execution Report - Fill", type: "Execution", status: "Draft" },
                ].map((scenario, idx) => (
                  <div key={idx} className={`flex items-center justify-between p-4 rounded-lg ${bgSecondary} border ${borderColor}`}>
                    <div>
                      <p className={`font-medium ${textPrimary}`}>{scenario.name}</p>
                      <p className={`text-xs ${textSecondary}`}>{scenario.type}</p>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs ${
                      scenario.status === "Active" ? "bg-[#4caf50]/20 text-[#4caf50]" : "bg-[#ff9800]/20 text-[#ff9800]"
                    }`}>
                      {scenario.status}
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

  // ========== TESTING SCREEN ==========
  if (currentScreen === "testing") {
    return (
      <div className={`min-h-screen ${bgPrimary} flex`}>
        <Sidebar />
        <div className="flex-1 overflow-auto">
          <div className="p-8 space-y-6">
            <div>
              <h2 className={`text-3xl font-bold ${textPrimary}`}>Testing (VeriFIX)</h2>
              <p className={`${textSecondary} text-sm mt-1`}>Execute test suites and monitor results</p>
            </div>

            <div className="grid grid-cols-5 gap-4">
              {[
                { label: "Total Tests", value: "256", color: "#2196f3" },
                { label: "Passed", value: "240", color: "#4caf50" },
                { label: "Failed", value: "8", color: "#f44336" },
                { label: "Skipped", value: "8", color: "#9c27b0" },
                { label: "Coverage", value: "94%", color: "#00e5ff" },
              ].map((kpi) => (
                <Card key={kpi.label} className={`${bgCard} border ${borderColor} p-4 text-center`}>
                  <p className={`text-xs ${textSecondary} mb-1`}>{kpi.label}</p>
                  <p className="text-2xl font-bold" style={{ color: kpi.color }}>{kpi.value}</p>
                </Card>
              ))}
            </div>

            <Card className={`${bgCard} border ${borderColor} p-6`}>
              <div className="flex justify-between items-center mb-4">
                <h3 className={`font-semibold ${textPrimary}`}>Test Execution</h3>
                <Button className="bg-[#00e5ff] text-[#0a1628]">
                  <Play className="h-4 w-4 mr-2" /> Run Tests
                </Button>
              </div>
              <div className="space-y-3">
                {[
                  { name: "Message Type Validation", progress: 100, status: "passed" },
                  { name: "Field Length Checks", progress: 100, status: "passed" },
                  { name: "Required Field Validation", progress: 85, status: "running" },
                ].map((test, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between mb-1">
                      <p className={`text-sm ${textPrimary}`}>{test.name}</p>
                      <span className={`text-xs px-2 py-0.5 rounded ${
                        test.status === "passed" ? "bg-[#4caf50]/20 text-[#4caf50]" : "bg-[#2196f3]/20 text-[#2196f3]"
                      }`}>
                        {test.status}
                      </span>
                    </div>
                    <div className="w-full bg-[#1e4976] rounded-full h-2">
                      <div className={`h-full rounded-full ${test.status === "passed" ? "bg-[#4caf50]" : "bg-[#2196f3]"}`} style={{ width: `${test.progress}%` }} />
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

  // ========== CERTIFICATION SCREEN ==========
  if (currentScreen === "certification") {
    return (
      <div className={`min-h-screen ${bgPrimary} flex`}>
        <Sidebar />
        <div className="flex-1 overflow-auto">
          <div className="p-8 space-y-6">
            <div>
              <h2 className={`text-3xl font-bold ${textPrimary}`}>Certification (Conductor)</h2>
              <p className={`${textSecondary} text-sm mt-1`}>Build certification packs and manage approvals</p>
            </div>

            <div className="grid grid-cols-4 gap-4">
              {[
                { label: "Certified", value: "18", color: "#4caf50" },
                { label: "In Progress", value: "7", color: "#2196f3" },
                { label: "Pending Review", value: "3", color: "#ff9800" },
                { label: "Failed", value: "1", color: "#f44336" },
              ].map((kpi) => (
                <Card key={kpi.label} className={`${bgCard} border ${borderColor} p-4 text-center`}>
                  <p className={`text-xs ${textSecondary} mb-1`}>{kpi.label}</p>
                  <p className="text-2xl font-bold" style={{ color: kpi.color }}>{kpi.value}</p>
                </Card>
              ))}
            </div>

            <Card className={`${bgCard} border ${borderColor} p-6`}>
              <div className="flex justify-between items-center mb-4">
                <h3 className={`font-semibold ${textPrimary}`}>Certification Packs</h3>
                <Button className="bg-[#00e5ff] text-[#0a1628]">
                  <Plus className="h-4 w-4 mr-2" /> New Pack
                </Button>
              </div>
              <div className="space-y-3">
                {[
                  { name: "Goldman Sachs FIX 4.4", status: "certified", completeness: 100 },
                  { name: "Morgan Stanley FIX 5.0", status: "in-review", completeness: 87 },
                  { name: "JP Morgan FIX 4.2", status: "building", completeness: 65 },
                ].map((pack, idx) => (
                  <div key={idx} className={`flex items-center justify-between p-4 rounded-lg ${bgSecondary} border ${borderColor}`}>
                    <div className="flex-1">
                      <p className={`font-medium ${textPrimary}`}>{pack.name}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-24 bg-[#1e4976] rounded-full h-2">
                        <div className="bg-[#00e5ff] h-full rounded-full" style={{ width: `${pack.completeness}%` }} />
                      </div>
                      <span className={`px-2 py-1 rounded text-xs ${
                        pack.status === "certified" ? "bg-[#4caf50]/20 text-[#4caf50]" :
                        pack.status === "in-review" ? "bg-[#ff9800]/20 text-[#ff9800]" :
                        "bg-[#2196f3]/20 text-[#2196f3]"
                      }`}>
                        {pack.status}
                      </span>
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

  // ========== APPROVALS SCREEN ==========
  if (currentScreen === "approvals") {
    const approvals = [
      { id: "A001", case: "C001", type: "Stage Transition", requestor: "J. Smith", date: "2024-01-15", status: "pending" },
      { id: "A002", case: "C002", type: "Waiver Request", requestor: "S. Johnson", date: "2024-01-14", status: "pending" },
      { id: "A003", case: "C003", type: "Certification", requestor: "M. Chen", date: "2024-01-13", status: "approved" },
    ]

    return (
      <div className={`min-h-screen ${bgPrimary} flex`}>
        <Sidebar />
        <div className="flex-1 overflow-auto">
          <div className="p-8 space-y-6">
            <div>
              <h2 className={`text-3xl font-bold ${textPrimary}`}>Approvals</h2>
              <p className={`${textSecondary} text-sm mt-1`}>Manage approval requests and exceptions</p>
            </div>

            <div className="flex gap-2 border-b border-[#1e4976]">
              {["pending", "approved", "rejected", "waivers"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setApprovalsTab(tab)}
                  className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                    approvalsTab === tab 
                      ? "border-[#00e5ff] text-[#00e5ff]" 
                      : "border-transparent text-[#b0bec5] hover:text-white"
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            <Card className={`${bgCard} border ${borderColor}`}>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className={`border-b ${borderColor} bg-[#0d2137]`}>
                      <th className={`text-left py-4 px-4 ${textSecondary} font-semibold`}>ID</th>
                      <th className={`text-left py-4 px-4 ${textSecondary} font-semibold`}>Case</th>
                      <th className={`text-left py-4 px-4 ${textSecondary} font-semibold`}>Type</th>
                      <th className={`text-left py-4 px-4 ${textSecondary} font-semibold`}>Requestor</th>
                      <th className={`text-left py-4 px-4 ${textSecondary} font-semibold`}>Date</th>
                      <th className={`text-left py-4 px-4 ${textSecondary} font-semibold`}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {approvals.filter(a => approvalsTab === "pending" ? a.status === "pending" : a.status === approvalsTab).map((row) => (
                      <tr key={row.id} className={`border-b ${borderColor} hover:bg-[#1e4976]/30`}>
                        <td className={`py-4 px-4 font-mono text-xs text-[#00e5ff]`}>{row.id}</td>
                        <td className={`py-4 px-4 ${textPrimary}`}>{row.case}</td>
                        <td className={`py-4 px-4 ${textSecondary}`}>{row.type}</td>
                        <td className={`py-4 px-4 ${textSecondary}`}>{row.requestor}</td>
                        <td className={`py-4 px-4 ${textSecondary}`}>{row.date}</td>
                        <td className="py-4 px-4">
                          {row.status === "pending" && (
                            <div className="flex gap-2">
                              <Button size="sm" className="bg-[#4caf50] text-white h-7 px-3">
                                <ThumbsUp className="h-3 w-3" />
                              </Button>
                              <Button size="sm" variant="outline" className="border-[#f44336] text-[#f44336] h-7 px-3">
                                <ThumbsDown className="h-3 w-3" />
                              </Button>
                            </div>
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

  // ========== EVIDENCE VAULT SCREEN ==========
  if (currentScreen === "evidence-vault") {
    return (
      <div className={`min-h-screen ${bgPrimary} flex`}>
        <Sidebar />
        <div className="flex-1 overflow-auto">
          <div className="p-8 space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className={`text-3xl font-bold ${textPrimary}`}>Evidence Vault</h2>
                <p className={`${textSecondary} text-sm mt-1`}>Artifact management and certification pack assembly</p>
              </div>
              <Button className="bg-[#00e5ff] text-[#0a1628]">
                <Upload className="h-4 w-4 mr-2" /> Upload Artifact
              </Button>
            </div>

            <div className="grid grid-cols-4 gap-4">
              {[
                { label: "Total Artifacts", value: "156", color: "#2196f3" },
                { label: "Verified", value: "142", color: "#4caf50" },
                { label: "Pending Review", value: "14", color: "#ff9800" },
                { label: "Linked to Decisions", value: "89%", color: "#00e5ff" },
              ].map((kpi) => (
                <Card key={kpi.label} className={`${bgCard} border ${borderColor} p-4 text-center`}>
                  <p className={`text-xs ${textSecondary} mb-1`}>{kpi.label}</p>
                  <p className="text-2xl font-bold" style={{ color: kpi.color }}>{kpi.value}</p>
                </Card>
              ))}
            </div>

            <Card className={`${bgCard} border ${borderColor} p-6`}>
              <h3 className={`font-semibold ${textPrimary} mb-4`}>Recent Artifacts</h3>
              <div className="space-y-3">
                {[
                  { name: "FIX_4.4_Spec_GS.pdf", type: "Specification", case: "C001", date: "2024-01-15" },
                  { name: "Test_Results_MS.xlsx", type: "Test Results", case: "C002", date: "2024-01-14" },
                  { name: "Certification_Pack_JPM.zip", type: "Certification", case: "C003", date: "2024-01-13" },
                ].map((artifact, idx) => (
                  <div key={idx} className={`flex items-center justify-between p-4 rounded-lg ${bgSecondary} border ${borderColor}`}>
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-[#00e5ff]" />
                      <div>
                        <p className={`font-medium ${textPrimary}`}>{artifact.name}</p>
                        <p className={`text-xs ${textSecondary}`}>{artifact.type} - {artifact.case}</p>
                      </div>
                    </div>
                    <span className={`text-xs ${textSecondary}`}>{artifact.date}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  // ========== RULE LIBRARY SCREEN ==========
  if (currentScreen === "rule-library") {
    return (
      <div className={`min-h-screen ${bgPrimary} flex`}>
        <Sidebar />
        <div className="flex-1 overflow-auto">
          <div className="p-8 space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className={`text-3xl font-bold ${textPrimary}`}>Rule Library</h2>
                <p className={`${textSecondary} text-sm mt-1`}>Validation rule management and governance</p>
              </div>
              <Button className="bg-[#00e5ff] text-[#0a1628]">
                <Plus className="h-4 w-4 mr-2" /> Add Rule
              </Button>
            </div>

            <Card className={`${bgCard} border ${borderColor}`}>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className={`border-b ${borderColor} bg-[#0d2137]`}>
                      <th className={`text-left py-4 px-4 ${textSecondary} font-semibold`}>Rule ID</th>
                      <th className={`text-left py-4 px-4 ${textSecondary} font-semibold`}>Name</th>
                      <th className={`text-left py-4 px-4 ${textSecondary} font-semibold`}>Category</th>
                      <th className={`text-left py-4 px-4 ${textSecondary} font-semibold`}>Severity</th>
                      <th className={`text-left py-4 px-4 ${textSecondary} font-semibold`}>Status</th>
                      <th className={`text-left py-4 px-4 ${textSecondary} font-semibold`}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { id: "R001", name: "Required Field Check", category: "Validation", severity: "Critical", status: "Active" },
                      { id: "R002", name: "Field Length Validation", category: "Format", severity: "High", status: "Active" },
                      { id: "R003", name: "Checksum Verification", category: "Integrity", severity: "Critical", status: "Active" },
                      { id: "R004", name: "Timestamp Format", category: "Format", severity: "Medium", status: "Inactive" },
                    ].map((rule) => (
                      <tr key={rule.id} className={`border-b ${borderColor} hover:bg-[#1e4976]/30`}>
                        <td className={`py-4 px-4 font-mono text-xs text-[#00e5ff]`}>{rule.id}</td>
                        <td className={`py-4 px-4 ${textPrimary}`}>{rule.name}</td>
                        <td className={`py-4 px-4 ${textSecondary}`}>{rule.category}</td>
                        <td className="py-4 px-4">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            rule.severity === "Critical" ? "bg-[#f44336]/20 text-[#f44336]" :
                            rule.severity === "High" ? "bg-[#ff9800]/20 text-[#ff9800]" :
                            "bg-[#2196f3]/20 text-[#2196f3]"
                          }`}>
                            {rule.severity}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <span className={`px-2 py-1 rounded text-xs ${
                            rule.status === "Active" ? "bg-[#4caf50]/20 text-[#4caf50]" : "bg-[#64748b]/20 text-[#64748b]"
                          }`}>
                            {rule.status}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <Button variant="ghost" size="sm" className="text-[#00e5ff]">
                            <Eye className="h-4 w-4" />
                          </Button>
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

  // ========== SLA ANALYTICS SCREEN ==========
  if (currentScreen === "sla-analytics") {
    return (
      <div className={`min-h-screen ${bgPrimary} flex`}>
        <Sidebar />
        <div className="flex-1 overflow-auto">
          <div className="p-8 space-y-6">
            <div>
              <h2 className={`text-3xl font-bold ${textPrimary}`}>SLA Analytics</h2>
              <p className={`${textSecondary} text-sm mt-1`}>Leadership visibility into timing and risk</p>
            </div>

            <div className="grid grid-cols-5 gap-4">
              {[
                { label: "Avg Days to Complete", value: "18.4", color: "#2196f3" },
                { label: "SLA Compliance", value: "94%", color: "#4caf50" },
                { label: "At Risk", value: "3", color: "#ff9800" },
                { label: "Breached", value: "1", color: "#f44336" },
                { label: "Forecast Delay", value: "+2.1d", color: "#9c27b0" },
              ].map((kpi) => (
                <Card key={kpi.label} className={`${bgCard} border ${borderColor} p-4 text-center`}>
                  <p className={`text-xs ${textSecondary} mb-1`}>{kpi.label}</p>
                  <p className="text-2xl font-bold" style={{ color: kpi.color }}>{kpi.value}</p>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-6">
              <Card className={`${bgCard} border ${borderColor} p-6`}>
                <h3 className={`font-semibold ${textPrimary} mb-4`}>SLA Breach Risk</h3>
                <div className="space-y-3">
                  {[
                    { case: "C002", stage: "Testing", risk: 92, days: 1 },
                    { case: "C005", stage: "Log Analysis", risk: 68, days: 3 },
                    { case: "C001", stage: "Spec Compare", risk: 45, days: 5 },
                  ].map((item, idx) => (
                    <div key={idx} className={`p-3 rounded-lg border ${borderColor}`}>
                      <div className="flex justify-between mb-2">
                        <div>
                          <p className={`font-medium ${textPrimary}`}>{item.case}</p>
                          <p className={`text-xs ${textSecondary}`}>{item.stage}</p>
                        </div>
                        <span className={`text-sm font-bold ${item.risk > 80 ? "text-[#f44336]" : item.risk > 60 ? "text-[#ff9800]" : "text-[#2196f3]"}`}>
                          {item.risk}% risk
                        </span>
                      </div>
                      <div className="w-full bg-[#1e4976] rounded-full h-2">
                        <div className={`h-full rounded-full ${item.risk > 80 ? "bg-[#f44336]" : item.risk > 60 ? "bg-[#ff9800]" : "bg-[#2196f3]"}`} style={{ width: `${item.risk}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className={`${bgCard} border ${borderColor} p-6`}>
                <h3 className={`font-semibold ${textPrimary} mb-4`}>Stage Bottlenecks</h3>
                <div className="space-y-4">
                  {[
                    { stage: "Spec Compare", avgDays: 3.2, cases: 4 },
                    { stage: "Log Analysis", avgDays: 5.1, cases: 6 },
                    { stage: "Testing", avgDays: 4.8, cases: 5 },
                    { stage: "Certification", avgDays: 2.8, cases: 3 },
                  ].map((item, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between mb-1">
                        <p className={`text-sm ${textPrimary}`}>{item.stage}</p>
                        <p className={`text-xs ${textSecondary}`}>{item.cases} cases - {item.avgDays}d avg</p>
                      </div>
                      <div className="w-full bg-[#1e4976] rounded-full h-2">
                        <div className="bg-[#00e5ff] h-full rounded-full" style={{ width: `${Math.min(100, item.avgDays * 15)}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // ========== ATDL TOOL SCREENS ==========
  const ATDLToolScreen = ({ title, description }: { title: string; description: string }) => (
    <div className={`min-h-screen ${bgPrimary} flex`}>
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <div className="p-8 space-y-6">
          <div>
            <h2 className={`text-3xl font-bold ${textPrimary}`}>{title}</h2>
            <p className={`${textSecondary} text-sm mt-1`}>{description}</p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <Card className={`${bgCard} border ${borderColor} p-6`}>
              <h3 className={`font-semibold ${textPrimary} mb-4`}>Source Input</h3>
              <div className={`border-2 border-dashed ${borderColor} rounded-lg p-8 text-center`}>
                <Upload className={`h-8 w-8 mx-auto mb-2 ${textSecondary}`} />
                <p className={`${textSecondary}`}>Drop file or click to browse</p>
              </div>
            </Card>

            <Card className={`${bgCard} border ${borderColor} p-6`}>
              <h3 className={`font-semibold ${textPrimary} mb-4`}>Target Input</h3>
              <div className={`border-2 border-dashed ${borderColor} rounded-lg p-8 text-center`}>
                <Upload className={`h-8 w-8 mx-auto mb-2 ${textSecondary}`} />
                <p className={`${textSecondary}`}>Drop file or click to browse</p>
              </div>
            </Card>
          </div>

          <div className="flex justify-center">
            <Button className="bg-[#00e5ff] text-[#0a1628] px-8">
              <Play className="h-4 w-4 mr-2" /> Process
            </Button>
          </div>

          <Card className={`${bgCard} border ${borderColor} p-6`}>
            <h3 className={`font-semibold ${textPrimary} mb-4`}>Results</h3>
            <div className={`text-center py-12 ${textSecondary}`}>
              <FileSearch className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>Upload files to see results</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )

  if (currentScreen === "atdl-fix-compare") {
    return <ATDLToolScreen title="FIX to ATDL Compare" description="Compare FIX specification against ATDL definition" />
  }
  if (currentScreen === "atdl-atdl-compare") {
    return <ATDLToolScreen title="ATDL to ATDL Compare" description="Compare two ATDL definitions for differences" />
  }
  if (currentScreen === "atdl-convert") {
    return <ATDLToolScreen title="FIX to ATDL Convert" description="Convert FIX specification to ATDL format" />
  }
  if (currentScreen === "atdl-validate") {
    return <ATDLToolScreen title="Validate Structure" description="Validate ATDL structure and schema compliance" />
  }
  if (currentScreen === "atdl-preview") {
    return <ATDLToolScreen title="Usage Preview" description="Preview ATDL usage and parameter rendering" />
  }

  return null
}
