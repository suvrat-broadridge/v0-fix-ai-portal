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
  Rocket, Award, TestTube
} from "lucide-react"

export default function Page() {
  const [currentScreen, setCurrentScreen] = useState<"login" | "role-select" | "dashboard" | "onboarding-cases" | "approvals" | "evidence-vault" | "rule-library" | "atdl-suite" | "testing" | "certification" | "sla-analytics">("login")
  const [selectedRole, setSelectedRole] = useState<"client" | "admin" | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [isDarkMode, setIsDarkMode] = useState(true)

  // Theme colors
  const bgPrimary = isDarkMode ? "bg-[#0a1628]" : "bg-[#f8fafc]"
  const bgSecondary = isDarkMode ? "bg-[#0d2137]" : "bg-white"
  const bgCard = isDarkMode ? "bg-[#132f4c]" : "bg-white"
  const textPrimary = isDarkMode ? "text-white" : "text-[#0a1628]"
  const textSecondary = isDarkMode ? "text-[#b0bec5]" : "text-[#64748b]"
  const borderColor = isDarkMode ? "border-[#1e4976]" : "border-[#e2e8f0]"
  const accentCyan = "#00e5ff"

  const Sidebar = () => (
    <div className={`${sidebarOpen ? "w-64" : "w-20"} ${bgSecondary} border-r ${borderColor} transition-all duration-300 flex flex-col h-screen sticky top-0`}>
      <div className="p-4 flex items-center justify-between">
        {sidebarOpen && <h1 className={`font-bold text-[${accentCyan}] text-lg`}>B-COMET</h1>}
        <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>
      </div>

      <nav className="flex-1 space-y-2 p-4">
        {[
          { label: "Dashboard", icon: Home, screen: "dashboard" },
          { label: "Onboarding", icon: Briefcase, screen: "onboarding-cases" },
          { label: "Approvals", icon: CheckSquare, screen: "approvals" },
          { label: "Evidence", icon: Archive, screen: "evidence-vault" },
          { label: "Rules", icon: BookOpen, screen: "rule-library" },
          { label: "ATDL Suite", icon: FileText, screen: "atdl-suite" },
          { label: "Testing", icon: TestTube, screen: "testing" },
          { label: "Certification", icon: Award, screen: "certification" },
          { label: "SLA Analytics", icon: BarChart3, screen: "sla-analytics" },
        ].map((item) => (
          <button
            key={item.screen}
            onClick={() => setCurrentScreen(item.screen as any)}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded transition-colors ${
              currentScreen === item.screen ? `bg-[${accentCyan}]/20` : ""
            } hover:bg-[#1e4976]`}
            style={currentScreen === item.screen ? { color: accentCyan } : {}}
          >
            <item.icon className="h-5 w-5 flex-shrink-0" />
            {sidebarOpen && <span className="text-sm">{item.label}</span>}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-[#1e4976]">
        <Button 
          onClick={() => setCurrentScreen("login")}
          className="w-full text-[#f44336] hover:bg-[#f44336]/20"
          variant="ghost"
        >
          <LogOut className="h-4 w-4 mr-2" />
          {sidebarOpen && "Logout"}
        </Button>
      </div>
    </div>
  )

  // ========== LOGIN SCREEN ==========
  if (currentScreen === "login") {
    return (
      <div className={`min-h-screen ${bgPrimary} flex items-center justify-center p-4`}>
        <Card className={`${bgCard} border ${borderColor} p-8 w-full max-w-md`}>
          <div className="text-center mb-8">
            <h1 className={`text-3xl font-bold ${textPrimary} mb-2`}>B-COMET</h1>
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
            <Button onClick={() => setCurrentScreen("role-select")} className="w-full" style={{ backgroundColor: accentCyan, color: "#0a1628" }}>
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
            <Button 
              onClick={() => { setSelectedRole("client"); setCurrentScreen("dashboard"); }}
              className={`w-full h-32 flex flex-col items-center justify-center gap-3 ${bgSecondary} border-2 ${borderColor} hover:border-[${accentCyan}] transition-colors`}
            >
              <Users className="h-8 w-8" />
              <div className="text-center">
                <p className={`font-semibold ${textPrimary}`}>Client</p>
                <p className={`text-xs ${textSecondary}`}>View your onboarding status</p>
              </div>
            </Button>
            
            <Button 
              onClick={() => { setSelectedRole("admin"); setCurrentScreen("dashboard"); }}
              className={`w-full h-32 flex flex-col items-center justify-center gap-3 ${bgSecondary} border-2 ${borderColor} hover:border-[${accentCyan}] transition-colors`}
            >
              <Settings className="h-8 w-8" />
              <div className="text-center">
                <p className={`font-semibold ${textPrimary}`}>Admin</p>
                <p className={`text-xs ${textSecondary}`}>Manage onboarding cases</p>
              </div>
            </Button>
          </div>
        </Card>
      </div>
    )
  }

  // ========== DASHBOARD SCREEN ==========
  if (currentScreen === "dashboard") {
    const kpiCards = [
      { label: "Active Cases", value: 24, icon: Briefcase, color: "#2196f3" },
      { label: "At Risk", value: 3, icon: AlertTriangle, color: "#ff9800" },
      { label: "Approvals Pending", value: 5, icon: CheckSquare, color: "#9c27b0" },
      { label: "Evidence Complete", value: "87%", icon: FileCheck, color: "#4caf50" },
      { label: "Ready for Go-Live", value: 8, icon: Rocket, color: "#00e5ff" },
    ]

    const priorityQueue = [
      { id: "C001", client: "Goldman Sachs", stage: "Spec Compare", risk: "high", daysLeft: 2 },
      { id: "C002", client: "Morgan Stanley", stage: "Log Analysis", risk: "critical", daysLeft: 1 },
      { id: "C003", client: "JP Morgan", stage: "Approval", risk: "medium", daysLeft: 5 },
      { id: "C004", client: "Bank of America", stage: "Certification", risk: "low", daysLeft: 10 },
    ]

    const blockers = [
      { case: "C002", blocker: "Missing FIX specification", severity: "critical" },
      { case: "C001", blocker: "Pending legal review", severity: "high" },
      { case: "C003", blocker: "Awaiting client signature", severity: "high" },
    ]

    const caseHealth = [
      { case: "C001", health: 75, status: "On Track" },
      { case: "C002", health: 45, status: "At Risk" },
      { case: "C003", health: 90, status: "On Track" },
      { case: "C004", health: 100, status: "Completed" },
      { case: "C005", health: 60, status: "On Track" },
    ]

    return (
      <div className={`min-h-screen ${bgPrimary} flex`}>
        <Sidebar />
        <div className="flex-1 overflow-auto">
          <div className="p-8 space-y-8">
            {/* Header */}
            <div className="flex justify-between items-center">
              <div>
                <h2 className={`text-3xl font-bold ${textPrimary}`}>Dashboard</h2>
                <p className={`${textSecondary} text-sm mt-1`}>Operational control tower for urgency, risk, and next actions</p>
              </div>
              <Button onClick={() => setIsDarkMode(!isDarkMode)} variant="outline">
                {isDarkMode ? "Light" : "Dark"}
              </Button>
            </div>

            {/* Control Row */}
            <div className="flex gap-4 items-center flex-wrap">
              <Input placeholder="Search cases..." className={`flex-1 min-w-[200px] ${isDarkMode ? "bg-[#0d2137] border-[#1e4976]" : ""}`} />
              <Button variant="outline" size="sm"><Calendar className="h-4 w-4 mr-2" /> Date Range</Button>
              <Button variant="outline" size="sm"><Filter className="h-4 w-4 mr-2" /> Filters</Button>
              <Button style={{ backgroundColor: accentCyan, color: "#0a1628" }} size="sm"><Plus className="h-4 w-4 mr-2" /> New Case</Button>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-5 gap-4">
              {kpiCards.map((card) => (
                <Card key={card.label} className={`${bgCard} border ${borderColor} p-4 cursor-pointer hover:border-[${accentCyan}] transition-colors`}>
                  <div className="flex items-start justify-between">
                    <div>
                      <p className={`text-xs ${textSecondary} mb-1`}>{card.label}</p>
                      <p className={`text-2xl font-bold ${textPrimary}`}>{card.value}</p>
                    </div>
                    <div className="p-2 rounded" style={{ backgroundColor: `${card.color}20` }}>
                      <card.icon className="h-5 w-5" style={{ color: card.color }} />
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Priority Queue + Blockers */}
            <div className="grid grid-cols-3 gap-4">
              <Card className={`col-span-2 ${bgCard} border ${borderColor} p-6`}>
                <h3 className={`text-lg font-semibold ${textPrimary} mb-4`}>Priority Action Queue</h3>
                <div className="space-y-2">
                  {priorityQueue.map((item) => (
                    <div key={item.id} className={`flex items-center justify-between p-3 rounded border ${borderColor} hover:bg-[#1e4976]/50 cursor-pointer`}>
                      <div>
                        <p className={`font-mono text-sm ${textPrimary}`}>{item.id}</p>
                        <p className={`text-xs ${textSecondary}`}>{item.client} • {item.stage}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`px-2 py-1 rounded text-xs ${
                          item.risk === "critical" ? "bg-[#f44336]/20 text-[#f44336]" :
                          item.risk === "high" ? "bg-[#ff9800]/20 text-[#ff9800]" :
                          "bg-[#2196f3]/20 text-[#2196f3]"
                        }`}>
                          {item.risk}
                        </span>
                        <span className={`text-sm font-semibold ${item.daysLeft <= 2 ? "text-[#f44336]" : textSecondary}`}>
                          {item.daysLeft}d
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className={`${bgCard} border ${borderColor} p-6`}>
                <h3 className={`text-lg font-semibold ${textPrimary} mb-4`}>Blockers</h3>
                <div className="space-y-3">
                  {blockers.map((item, idx) => (
                    <div key={idx} className={`flex gap-2`}>
                      <AlertCircle className={`h-4 w-4 flex-shrink-0 mt-1 ${
                        item.severity === "critical" ? "text-[#f44336]" : "text-[#ff9800]"
                      }`} />
                      <div className="text-xs">
                        <p className={`font-semibold ${textPrimary}`}>{item.case}</p>
                        <p className={textSecondary}>{item.blocker}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Case Health Grid */}
            <Card className={`${bgCard} border ${borderColor} p-6`}>
              <h3 className={`text-lg font-semibold ${textPrimary} mb-4`}>Case Health</h3>
              <div className="grid grid-cols-5 gap-4">
                {caseHealth.map((item) => (
                  <div key={item.case} className={`p-4 rounded border ${borderColor} text-center hover:bg-[#1e4976]/50 cursor-pointer`}>
                    <p className={`font-mono text-sm ${textPrimary} mb-2`}>{item.case}</p>
                    <div className="relative w-16 h-16 mx-auto mb-2">
                      <svg viewBox="0 0 36 36" className="w-full h-full">
                        <circle cx="18" cy="18" r="16" fill="none" stroke={isDarkMode ? "#1e4976" : "#e2e8f0"} strokeWidth="2" />
                        <circle cx="18" cy="18" r="16" fill="none" stroke={accentCyan} strokeWidth="2" strokeDasharray={`${item.health * 100.5 / 100} 100.5`} strokeLinecap="round" transform="rotate(-90 18 18)" />
                        <text x="18" y="20" textAnchor="middle" className={`text-sm font-bold ${textPrimary}`} fill={textPrimary}>{item.health}%</text>
                      </svg>
                    </div>
                    <p className={`text-xs ${item.status === "Completed" ? "text-[#4caf50]" : item.status === "At Risk" ? "text-[#ff9800]" : "text-[#2196f3]"}`}>
                      {item.status}
                    </p>
                  </div>
                ))}
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
      { id: "C001", client: "Goldman Sachs", assetClass: "Equities", fixVersion: "4.4", stage: "Spec Compare", progress: 75, risk: 2, blockers: 1, approvals: 0, slaStatus: "On Track", nextAction: "Review Spec", owner: "John Doe", updated: "2 hrs ago" },
      { id: "C002", client: "Morgan Stanley", assetClass: "Options", fixVersion: "5.0", stage: "Log Analysis", progress: 45, risk: 8, blockers: 2, approvals: 1, slaStatus: "At Risk", nextAction: "Analyze Logs", owner: "Jane Smith", updated: "1 hr ago" },
      { id: "C003", client: "JP Morgan", assetClass: "Futures", fixVersion: "4.2", stage: "Scenario Creation", progress: 90, risk: 1, blockers: 0, approvals: 0, slaStatus: "On Track", nextAction: "Create Tests", owner: "Bob Johnson", updated: "30 mins ago" },
    ]

    return (
      <div className={`min-h-screen ${bgPrimary} flex`}>
        <Sidebar />
        <div className="flex-1 overflow-auto">
          <div className="p-8 space-y-6">
            <div>
              <h2 className={`text-3xl font-bold ${textPrimary}`}>Onboarding Cases</h2>
              <p className={`${textSecondary} text-sm mt-1`}>Portfolio-level case management and progression</p>
            </div>

            <div className="flex gap-4 items-center flex-wrap">
              <Input placeholder="Search cases..." className={`flex-1 min-w-[200px] ${isDarkMode ? "bg-[#0d2137] border-[#1e4976]" : ""}`} />
              <Button variant="outline" size="sm"><Filter className="h-4 w-4 mr-2" /> Filters</Button>
              <Button style={{ backgroundColor: accentCyan, color: "#0a1628" }} size="sm"><Plus className="h-4 w-4 mr-2" /> New Case</Button>
            </div>

            {/* KPI Strip */}
            <div className="grid grid-cols-5 gap-4">
              {[
                { label: "Total Cases", value: "24" },
                { label: "Active", value: "12" },
                { label: "At Risk", value: "3" },
                { label: "Pending Approval", value: "5" },
                { label: "Completed", value: "4" },
              ].map((kpi) => (
                <Card key={kpi.label} className={`${bgCard} border ${borderColor} p-3 text-center`}>
                  <p className={`text-xs ${textSecondary} mb-1`}>{kpi.label}</p>
                  <p className={`text-2xl font-bold ${textPrimary}`}>{kpi.value}</p>
                </Card>
              ))}
            </div>

            {/* Case Table */}
            <Card className={`${bgCard} border ${borderColor} p-6 overflow-x-auto`}>
              <table className="w-full text-sm">
                <thead>
                  <tr className={`border-b ${borderColor}`}>
                    <th className={`text-left py-3 px-2 ${textSecondary} font-semibold`}>Case ID</th>
                    <th className={`text-left py-3 px-2 ${textSecondary} font-semibold`}>Client</th>
                    <th className={`text-left py-3 px-2 ${textSecondary} font-semibold`}>Asset Class</th>
                    <th className={`text-left py-3 px-2 ${textSecondary} font-semibold`}>FIX Version</th>
                    <th className={`text-left py-3 px-2 ${textSecondary} font-semibold`}>Stage</th>
                    <th className={`text-left py-3 px-2 ${textSecondary} font-semibold`}>Progress</th>
                    <th className={`text-left py-3 px-2 ${textSecondary} font-semibold`}>SLA Status</th>
                    <th className={`text-left py-3 px-2 ${textSecondary} font-semibold`}>Owner</th>
                  </tr>
                </thead>
                <tbody>
                  {cases.map((caseItem) => (
                    <tr key={caseItem.id} className={`border-b ${borderColor} hover:bg-[#1e4976]/30 cursor-pointer`}>
                      <td className={`py-3 px-2 font-mono text-xs ${textPrimary}`}>{caseItem.id}</td>
                      <td className={`py-3 px-2 ${textPrimary}`}>{caseItem.client}</td>
                      <td className={`py-3 px-2 ${textSecondary}`}>{caseItem.assetClass}</td>
                      <td className={`py-3 px-2 ${textSecondary}`}>{caseItem.fixVersion}</td>
                      <td className={`py-3 px-2 ${textPrimary}`}>{caseItem.stage}</td>
                      <td className={`py-3 px-2`}>
                        <div className="w-24 bg-[#1e4976] rounded-full h-2">
                          <div className="bg-[#00e5ff] h-full rounded-full" style={{ width: `${caseItem.progress}%` }} />
                        </div>
                      </td>
                      <td className={`py-3 px-2`}>
                        <span className={`px-2 py-1 rounded text-xs ${
                          caseItem.slaStatus === "On Track" ? "bg-[#4caf50]/20 text-[#4caf50]" : "bg-[#ff9800]/20 text-[#ff9800]"
                        }`}>
                          {caseItem.slaStatus}
                        </span>
                      </td>
                      <td className={`py-3 px-2 ${textSecondary}`}>{caseItem.owner}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  // ========== APPROVALS SCREEN ==========
  if (currentScreen === "approvals") {
    const [activeTab, setActiveTab] = useState("pending")

    const approvals = [
      { id: "A001", case: "C001", type: "Spec Review", owner: "Client", daysWaiting: 3, priority: "high" },
      { id: "A002", case: "C002", type: "Legal Review", owner: "Legal", daysWaiting: 7, priority: "critical" },
      { id: "A003", case: "C003", type: "Compliance", owner: "Compliance", daysWaiting: 1, priority: "medium" },
    ]

    return (
      <div className={`min-h-screen ${bgPrimary} flex`}>
        <Sidebar />
        <div className="flex-1 overflow-auto">
          <div className="p-8 space-y-6">
            <div>
              <h2 className={`text-3xl font-bold ${textPrimary}`}>Approvals</h2>
              <p className={`${textSecondary} text-sm mt-1`}>Decision workbench for approvals and waivers</p>
            </div>

            {/* KPI Strip */}
            <div className="grid grid-cols-5 gap-4">
              {[
                { label: "Pending", value: "12", color: "#2196f3" },
                { label: "Due Soon", value: "3", color: "#ff9800" },
                { label: "Overdue", value: "1", color: "#f44336" },
                { label: "Approved", value: "18", color: "#4caf50" },
                { label: "Waivers", value: "2", color: "#9c27b0" },
              ].map((kpi) => (
                <Card key={kpi.label} className={`${bgCard} border ${borderColor} p-3 text-center`}>
                  <p className={`text-xs ${textSecondary} mb-1`}>{kpi.label}</p>
                  <p className={`text-2xl font-bold`} style={{ color: kpi.color }}>{kpi.value}</p>
                </Card>
              ))}
            </div>

            {/* Tabs */}
            <div className="flex gap-2 border-b border-[#1e4976]">
              {["pending", "due-soon", "overdue", "approved"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === tab ? `border-[${accentCyan}]` : borderColor
                  }`}
                  style={activeTab === tab ? { color: accentCyan } : {}}
                >
                  {tab.replace("-", " ").toUpperCase()}
                </button>
              ))}
            </div>

            {/* Approval Queue */}
            <div className="space-y-3">
              {approvals.map((approval) => (
                <Card key={approval.id} className={`${bgCard} border ${borderColor} p-4`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`font-mono text-sm ${textPrimary}`}>{approval.id}</span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          approval.priority === "critical" ? "bg-[#f44336]/20 text-[#f44336]" :
                          approval.priority === "high" ? "bg-[#ff9800]/20 text-[#ff9800]" :
                          "bg-[#2196f3]/20 text-[#2196f3]"
                        }`}>
                          {approval.priority}
                        </span>
                      </div>
                      <p className={`${textPrimary}`}>{approval.type}</p>
                      <p className={`text-xs ${textSecondary}`}>Case: {approval.case} • Waiting {approval.daysWaiting} days</p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" className="bg-[#4caf50] hover:bg-[#45a049]">
                        <ThumbsUp className="h-4 w-4 mr-1" /> Approve
                      </Button>
                      <Button size="sm" variant="outline">
                        <ThumbsDown className="h-4 w-4 mr-1" /> Reject
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

  // ========== EVIDENCE VAULT SCREEN ==========
  if (currentScreen === "evidence-vault") {
    const artifacts = [
      { id: "E001", case: "C001", name: "FIX Specification Doc", type: "Document", uploaded: "2024-01-15", size: "2.4 MB" },
      { id: "E002", case: "C001", name: "Test Results", type: "Test Report", uploaded: "2024-01-14", size: "1.1 MB" },
      { id: "E003", case: "C002", name: "Compliance Checklist", type: "Checklist", uploaded: "2024-01-13", size: "0.3 MB" },
    ]

    return (
      <div className={`min-h-screen ${bgPrimary} flex`}>
        <Sidebar />
        <div className="flex-1 overflow-auto">
          <div className="p-8 space-y-6">
            <div>
              <h2 className={`text-3xl font-bold ${textPrimary}`}>Evidence Vault</h2>
              <p className={`${textSecondary} text-sm mt-1`}>Artifact explorer and certification pack builder</p>
            </div>

            {/* KPI Strip */}
            <div className="grid grid-cols-4 gap-4">
              {[
                { label: "Total Artifacts", value: "247" },
                { label: "Completeness", value: "87%" },
                { label: "Pending Review", value: "12" },
                { label: "Certified", value: "18" },
              ].map((kpi) => (
                <Card key={kpi.label} className={`${bgCard} border ${borderColor} p-3 text-center`}>
                  <p className={`text-xs ${textSecondary} mb-1`}>{kpi.label}</p>
                  <p className={`text-2xl font-bold ${textPrimary}`}>{kpi.value}</p>
                </Card>
              ))}
            </div>

            {/* Artifact Table */}
            <Card className={`${bgCard} border ${borderColor} p-6 overflow-x-auto`}>
              <div className="flex justify-between items-center mb-4">
                <h3 className={`text-lg font-semibold ${textPrimary}`}>Recent Artifacts</h3>
                <Button style={{ backgroundColor: accentCyan, color: "#0a1628" }} size="sm"><Plus className="h-4 w-4 mr-2" /> Upload</Button>
              </div>
              <table className="w-full text-sm">
                <thead>
                  <tr className={`border-b ${borderColor}`}>
                    <th className={`text-left py-3 px-2 ${textSecondary} font-semibold`}>Artifact</th>
                    <th className={`text-left py-3 px-2 ${textSecondary} font-semibold`}>Case</th>
                    <th className={`text-left py-3 px-2 ${textSecondary} font-semibold`}>Type</th>
                    <th className={`text-left py-3 px-2 ${textSecondary} font-semibold`}>Uploaded</th>
                    <th className={`text-left py-3 px-2 ${textSecondary} font-semibold`}>Size</th>
                  </tr>
                </thead>
                <tbody>
                  {artifacts.map((artifact) => (
                    <tr key={artifact.id} className={`border-b ${borderColor} hover:bg-[#1e4976]/30`}>
                      <td className={`py-3 px-2 ${textPrimary}`}>{artifact.name}</td>
                      <td className={`py-3 px-2 font-mono text-xs ${textSecondary}`}>{artifact.case}</td>
                      <td className={`py-3 px-2 ${textSecondary}`}>{artifact.type}</td>
                      <td className={`py-3 px-2 ${textSecondary}`}>{artifact.uploaded}</td>
                      <td className={`py-3 px-2 ${textSecondary}`}>{artifact.size}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  // ========== RULE LIBRARY SCREEN ==========
  if (currentScreen === "rule-library") {
    const rules = [
      { id: "R001", name: "Mandatory Field Validation", category: "Validation", severity: "critical", status: "active", cases: 24 },
      { id: "R002", name: "Message Type Check", category: "Message", severity: "high", status: "active", cases: 18 },
      { id: "R003", name: "Length Field Constraint", category: "Field", severity: "medium", status: "active", cases: 12 },
    ]

    return (
      <div className={`min-h-screen ${bgPrimary} flex`}>
        <Sidebar />
        <div className="flex-1 overflow-auto">
          <div className="p-8 space-y-6">
            <div>
              <h2 className={`text-3xl font-bold ${textPrimary}`}>Rule Library</h2>
              <p className={`${textSecondary} text-sm mt-1`}>Manage validation and compliance rules</p>
            </div>

            {/* KPI Strip */}
            <div className="grid grid-cols-4 gap-4">
              {[
                { label: "Total Rules", value: "156" },
                { label: "Critical", value: "12" },
                { label: "Active", value: "144" },
                { label: "By Category", value: "24" },
              ].map((kpi) => (
                <Card key={kpi.label} className={`${bgCard} border ${borderColor} p-3 text-center`}>
                  <p className={`text-xs ${textSecondary} mb-1`}>{kpi.label}</p>
                  <p className={`text-2xl font-bold ${textPrimary}`}>{kpi.value}</p>
                </Card>
              ))}
            </div>

            {/* Rules Table */}
            <Card className={`${bgCard} border ${borderColor} p-6 overflow-x-auto`}>
              <div className="flex justify-between items-center mb-4">
                <h3 className={`text-lg font-semibold ${textPrimary}`}>Rules</h3>
                <Button style={{ backgroundColor: accentCyan, color: "#0a1628" }} size="sm"><Plus className="h-4 w-4 mr-2" /> New Rule</Button>
              </div>
              <table className="w-full text-sm">
                <thead>
                  <tr className={`border-b ${borderColor}`}>
                    <th className={`text-left py-3 px-2 ${textSecondary} font-semibold`}>Rule ID</th>
                    <th className={`text-left py-3 px-2 ${textSecondary} font-semibold`}>Name</th>
                    <th className={`text-left py-3 px-2 ${textSecondary} font-semibold`}>Category</th>
                    <th className={`text-left py-3 px-2 ${textSecondary} font-semibold`}>Severity</th>
                    <th className={`text-left py-3 px-2 ${textSecondary} font-semibold`}>Status</th>
                    <th className={`text-left py-3 px-2 ${textSecondary} font-semibold`}>In Use</th>
                  </tr>
                </thead>
                <tbody>
                  {rules.map((rule) => (
                    <tr key={rule.id} className={`border-b ${borderColor} hover:bg-[#1e4976]/30`}>
                      <td className={`py-3 px-2 font-mono text-xs ${textSecondary}`}>{rule.id}</td>
                      <td className={`py-3 px-2 ${textPrimary}`}>{rule.name}</td>
                      <td className={`py-3 px-2 ${textSecondary}`}>{rule.category}</td>
                      <td className={`py-3 px-2`}>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          rule.severity === "critical" ? "bg-[#f44336]/20 text-[#f44336]" :
                          rule.severity === "high" ? "bg-[#ff9800]/20 text-[#ff9800]" :
                          "bg-[#2196f3]/20 text-[#2196f3]"
                        }`}>
                          {rule.severity}
                        </span>
                      </td>
                      <td className={`py-3 px-2`}>
                        <span className={`px-2 py-1 rounded text-xs font-medium bg-[#4caf50]/20 text-[#4caf50]`}>
                          {rule.status}
                        </span>
                      </td>
                      <td className={`py-3 px-2 ${textSecondary}`}>{rule.cases} cases</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  // ========== ATDL SUITE SCREEN ==========
  if (currentScreen === "atdl-suite") {
    const [step, setStep] = useState(1)

    return (
      <div className={`min-h-screen ${bgPrimary} flex`}>
        <Sidebar />
        <div className="flex-1 overflow-auto">
          <div className="p-8 space-y-6">
            <div>
              <h2 className={`text-3xl font-bold ${textPrimary}`}>ATDL Suite</h2>
              <p className={`${textSecondary} text-sm mt-1`}>Advanced Trading Definition Language tools</p>
            </div>

            {/* Step Progress */}
            <div className="flex items-center justify-between mb-8">
              {[
                { num: 1, label: "Select Inputs" },
                { num: 2, label: "Validate Structure" },
                { num: 3, label: "Compare/Convert" },
                { num: 4, label: "Usage Preview" },
                { num: 5, label: "Final Review" },
              ].map((item, idx) => (
                <div key={item.num} className="flex items-center flex-1">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    step >= item.num ? `bg-[${accentCyan}] text-[#0a1628]` : `bg-[#1e4976] ${textSecondary}`
                  }`}>
                    {item.num}
                  </div>
                  {idx < 4 && <div className={`flex-1 h-1 mx-2 ${step > item.num ? `bg-[${accentCyan}]` : `bg-[#1e4976]`}`} />}
                </div>
              ))}
            </div>

            {/* Content Area */}
            <Card className={`${bgCard} border ${borderColor} p-6`}>
              <div className="mb-6">
                <p className={`text-lg font-semibold ${textPrimary}`}>Step {step}: Select Inputs</p>
                <p className={`text-sm ${textSecondary}`}>Choose ATDL version and file to process</p>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className={`block text-sm font-medium ${textPrimary} mb-2`}>ATDL Version</label>
                  <select className={`w-full p-2 rounded border ${borderColor} ${isDarkMode ? "bg-[#0d2137]" : ""}`}>
                    <option>ATDL 1.2</option>
                    <option>ATDL 1.1</option>
                  </select>
                </div>
                <div>
                  <label className={`block text-sm font-medium ${textPrimary} mb-2`}>File Upload</label>
                  <div className={`border-2 border-dashed ${borderColor} rounded p-8 text-center`}>
                    <FileText className={`h-8 w-8 mx-auto mb-2 ${textSecondary}`} />
                    <p className={`${textSecondary} text-sm`}>Drag ATDL file here or click to browse</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(Math.max(1, step - 1))}>Previous</Button>
                <Button style={{ backgroundColor: accentCyan, color: "#0a1628" }} onClick={() => setStep(Math.min(5, step + 1))}>
                  {step === 5 ? "Complete" : "Next"}
                </Button>
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
              <h2 className={`text-3xl font-bold ${textPrimary}`}>Testing & Certification</h2>
              <p className={`${textSecondary} text-sm mt-1`}>Execution monitor and results dashboard</p>
            </div>

            {/* KPI Strip */}
            <div className="grid grid-cols-5 gap-4">
              {[
                { label: "Total Tests", value: "256", color: "#2196f3" },
                { label: "Passed", value: "240", color: "#4caf50" },
                { label: "Failed", value: "8", color: "#f44336" },
                { label: "Skipped", value: "8", color: "#9c27b0" },
                { label: "Coverage", value: "94%", color: "#00e5ff" },
              ].map((kpi) => (
                <Card key={kpi.label} className={`${bgCard} border ${borderColor} p-3 text-center`}>
                  <p className={`text-xs ${textSecondary} mb-1`}>{kpi.label}</p>
                  <p className={`text-2xl font-bold`} style={{ color: kpi.color }}>{kpi.value}</p>
                </Card>
              ))}
            </div>

            {/* Test Execution Monitor */}
            <Card className={`${bgCard} border ${borderColor} p-6`}>
              <h3 className={`text-lg font-semibold ${textPrimary} mb-4`}>Execution Monitor</h3>
              <div className="space-y-3">
                {[
                  { name: "Message Type Validation", progress: 100, status: "passed" },
                  { name: "Field Length Checks", progress: 100, status: "passed" },
                  { name: "Required Field Validation", progress: 85, status: "in-progress" },
                ].map((test, idx) => (
                  <div key={idx}>
                    <div className="flex items-center justify-between mb-2">
                      <p className={`text-sm ${textPrimary}`}>{test.name}</p>
                      <span className={`text-xs px-2 py-1 rounded ${
                        test.status === "passed" ? "bg-[#4caf50]/20 text-[#4caf50]" :
                        test.status === "in-progress" ? "bg-[#2196f3]/20 text-[#2196f3]" :
                        "bg-[#f44336]/20 text-[#f44336]"
                      }`}>
                        {test.status}
                      </span>
                    </div>
                    <div className="w-full bg-[#1e4976] rounded-full h-2">
                      <div className={`h-full rounded-full transition-all ${
                        test.status === "passed" ? "bg-[#4caf50]" : "bg-[#2196f3]"
                      }`} style={{ width: `${test.progress}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Results */}
            <Card className={`${bgCard} border ${borderColor} p-6`}>
              <h3 className={`text-lg font-semibold ${textPrimary} mb-4`}>Test Results</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className={`border-b ${borderColor}`}>
                      <th className={`text-left py-3 px-2 ${textSecondary} font-semibold`}>Test Case</th>
                      <th className={`text-left py-3 px-2 ${textSecondary} font-semibold`}>Result</th>
                      <th className={`text-left py-3 px-2 ${textSecondary} font-semibold`}>Duration</th>
                      <th className={`text-left py-3 px-2 ${textSecondary} font-semibold`}>Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { testCase: "TC001", result: "PASS", duration: "0.12s" },
                      { testCase: "TC002", result: "PASS", duration: "0.08s" },
                      { testCase: "TC003", result: "FAIL", duration: "0.15s" },
                    ].map((test) => (
                      <tr key={test.testCase} className={`border-b ${borderColor} hover:bg-[#1e4976]/30`}>
                        <td className={`py-3 px-2 font-mono text-xs ${textPrimary}`}>{test.testCase}</td>
                        <td className={`py-3 px-2`}>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            test.result === "PASS" ? "bg-[#4caf50]/20 text-[#4caf50]" : "bg-[#f44336]/20 text-[#f44336]"
                          }`}>
                            {test.result}
                          </span>
                        </td>
                        <td className={`py-3 px-2 ${textSecondary}`}>{test.duration}</td>
                        <td className={`py-3 px-2`}><Button variant="outline" size="sm">View</Button></td>
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

  // ========== CERTIFICATION SCREEN ==========
  if (currentScreen === "certification") {
    return (
      <div className={`min-h-screen ${bgPrimary} flex`}>
        <Sidebar />
        <div className="flex-1 overflow-auto">
          <div className="p-8 space-y-6">
            <div>
              <h2 className={`text-3xl font-bold ${textPrimary}`}>Certification</h2>
              <p className={`${textSecondary} text-sm mt-1`}>Certification pack builder and approval workflow</p>
            </div>

            {/* Certification Status */}
            <div className="grid grid-cols-4 gap-4">
              {[
                { label: "Certified", value: "18", color: "#4caf50" },
                { label: "In Progress", value: "7", color: "#2196f3" },
                { label: "Needs Review", value: "3", color: "#ff9800" },
                { label: "Failed", value: "1", color: "#f44336" },
              ].map((kpi) => (
                <Card key={kpi.label} className={`${bgCard} border ${borderColor} p-3 text-center`}>
                  <p className={`text-xs ${textSecondary} mb-1`}>{kpi.label}</p>
                  <p className={`text-2xl font-bold`} style={{ color: kpi.color }}>{kpi.value}</p>
                </Card>
              ))}
            </div>

            {/* Certification Packs */}
            <Card className={`${bgCard} border ${borderColor} p-6`}>
              <div className="flex justify-between items-center mb-4">
                <h3 className={`text-lg font-semibold ${textPrimary}`}>Certification Packs</h3>
                <Button style={{ backgroundColor: accentCyan, color: "#0a1628" }} size="sm"><Plus className="h-4 w-4 mr-2" /> New Pack</Button>
              </div>
              <div className="space-y-3">
                {[
                  { case: "C001", pack: "Goldman Sachs FIX 4.4", status: "approved", completeness: 100 },
                  { case: "C002", pack: "Morgan Stanley FIX 5.0", status: "in-review", completeness: 87 },
                  { case: "C003", pack: "JP Morgan FIX 4.2", status: "certified", completeness: 100 },
                ].map((item, idx) => (
                  <div key={idx} className={`flex items-center justify-between p-4 rounded border ${borderColor} hover:bg-[#1e4976]/30`}>
                    <div className="flex-1">
                      <p className={`font-semibold ${textPrimary}`}>{item.pack}</p>
                      <p className={`text-xs ${textSecondary}`}>{item.case}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-24 bg-[#1e4976] rounded-full h-2">
                        <div className="bg-[#00e5ff] h-full rounded-full" style={{ width: `${item.completeness}%` }} />
                      </div>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        item.status === "certified" ? "bg-[#4caf50]/20 text-[#4caf50]" :
                        item.status === "approved" ? "bg-[#00e5ff]/20 text-[#00e5ff]" :
                        "bg-[#ff9800]/20 text-[#ff9800]"
                      }`}>
                        {item.status}
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

            {/* KPI Strip */}
            <div className="grid grid-cols-5 gap-4">
              {[
                { label: "Avg Days to Complete", value: "18.4", color: "#2196f3" },
                { label: "SLA Compliance", value: "94%", color: "#4caf50" },
                { label: "At Risk", value: "3", color: "#ff9800" },
                { label: "Breached", value: "1", color: "#f44336" },
                { label: "Forecast Delay", value: "+2.1d", color: "#9c27b0" },
              ].map((kpi) => (
                <Card key={kpi.label} className={`${bgCard} border ${borderColor} p-3 text-center`}>
                  <p className={`text-xs ${textSecondary} mb-1`}>{kpi.label}</p>
                  <p className={`text-2xl font-bold`} style={{ color: kpi.color }}>{kpi.value}</p>
                </Card>
              ))}
            </div>

            {/* Breach Risk Panel */}
            <Card className={`${bgCard} border ${borderColor} p-6`}>
              <h3 className={`text-lg font-semibold ${textPrimary} mb-4`}>SLA Breach Risk</h3>
              <div className="space-y-3">
                {[
                  { case: "C002", stage: "Log Analysis", riskScore: 92, daysLeft: 1 },
                  { case: "C001", stage: "Spec Compare", riskScore: 68, daysLeft: 2 },
                  { case: "C005", stage: "Approval", riskScore: 45, daysLeft: 5 },
                ].map((item, idx) => (
                  <div key={idx} className={`p-3 rounded border ${borderColor}`}>
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className={`font-semibold ${textPrimary}`}>{item.case}</p>
                        <p className={`text-xs ${textSecondary}`}>{item.stage}</p>
                      </div>
                      <span className={`text-sm font-bold ${
                        item.riskScore > 80 ? "text-[#f44336]" : 
                        item.riskScore > 60 ? "text-[#ff9800]" : 
                        "text-[#2196f3]"
                      }`}>
                        Risk {item.riskScore}%
                      </span>
                    </div>
                    <div className="w-full bg-[#1e4976] rounded-full h-2">
                      <div className={`h-full rounded-full ${
                        item.riskScore > 80 ? "bg-[#f44336]" : 
                        item.riskScore > 60 ? "bg-[#ff9800]" : 
                        "bg-[#2196f3]"
                      }`} style={{ width: `${item.riskScore}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Stage Bottlenecks */}
            <Card className={`${bgCard} border ${borderColor} p-6`}>
              <h3 className={`text-lg font-semibold ${textPrimary} mb-4`}>Stage Bottlenecks</h3>
              <div className="space-y-4">
                {[
                  { stage: "Spec Compare", avgDays: 3.2, count: 4 },
                  { stage: "Log Analysis", avgDays: 5.1, count: 6 },
                  { stage: "Certification", avgDays: 2.8, count: 3 },
                ].map((item, idx) => (
                  <div key={idx}>
                    <div className="flex items-center justify-between mb-2">
                      <p className={`${textPrimary} font-semibold`}>{item.stage}</p>
                      <p className={`text-sm ${textSecondary}`}>{item.count} cases • {item.avgDays}d avg</p>
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
    )
  }

  return null
}
