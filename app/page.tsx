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
  Rocket, Award, TestTube, ArrowRight, GitCompare, Activity, Gauge, Shield
} from "lucide-react"

export default function Page() {
  const [currentScreen, setCurrentScreen] = useState<"welcome" | "login" | "role-select" | "dashboard" | "onboarding-cases" | "approvals" | "evidence-vault" | "rule-library" | "atdl-suite" | "testing" | "certification" | "sla-analytics">("welcome")
  const [selectedRole, setSelectedRole] = useState<"client" | "admin" | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [approvalsTab, setApprovalsTab] = useState("pending")
  const [atdlStep, setAtdlStep] = useState(1)

  // Theme colors
  const bgPrimary = isDarkMode ? "bg-[#0a1628]" : "bg-[#f8fafc]"
  const bgSecondary = isDarkMode ? "bg-[#0d2137]" : "bg-white"
  const bgCard = isDarkMode ? "bg-[#132f4c]" : "bg-white"
  const textPrimary = isDarkMode ? "text-white" : "text-[#0a1628]"
  const textSecondary = isDarkMode ? "text-[#b0bec5]" : "text-[#64748b]"
  const borderColor = isDarkMode ? "border-[#1e4976]" : "border-[#e2e8f0]"
  const accentCyan = "#00e5ff"

  const Sidebar = () => (
    <div className={`${sidebarOpen ? "w-64" : "w-20"} ${bgSecondary} border-r ${borderColor} transition-all duration-300 flex flex-col`}>
      <div className="p-4 flex items-center justify-between">
        {sidebarOpen && <h1 className="font-bold" style={{ color: accentCyan }}>B-COMET</h1>}
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
              currentScreen === item.screen 
                ? "bg-[#00e5ff]/20 text-[#00e5ff]" 
                : "text-[#e0e0e0] hover:text-white"
            } hover:bg-[#1e4976]`}
          >
            <item.icon className="h-5 w-5 flex-shrink-0" />
            {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
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

  // ========== WELCOME SCREEN ==========
  if (currentScreen === "welcome") {
    const [demoEmail, setDemoEmail] = useState("")

    return (
      <div className={`min-h-screen ${bgPrimary} overflow-hidden`}>
        {/* Navigation */}
        <nav className={`${bgSecondary} border-b ${borderColor} sticky top-0 z-50`}>
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-[#00e5ff]">B-COMET</h1>
            <Button onClick={() => setCurrentScreen("login")} className="bg-[#00e5ff] text-[#0a1628] hover:bg-[#00d0e8]">
              <LogIn className="h-4 w-4 mr-2" /> Login
            </Button>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative py-20 px-6">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className={`text-5xl font-bold ${textPrimary} mb-4`}>Enterprise FIX Protocol Testing & Onboarding</h2>
              <p className={`text-lg ${textSecondary} mb-6`}>B-COMET streamlines your FIX trading system integration with automated testing, comprehensive certification, and collaborative onboarding.</p>
              <div className="flex gap-4">
                <Button onClick={() => setCurrentScreen("login")} style={{ backgroundColor: "#00e5ff", color: "#0a1628" }} className="text-lg px-8 py-6">
                  Get Started <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
                <Button variant="outline" className={`text-lg px-8 py-6 border-[#00e5ff] text-[#00e5ff]`}>
                  Learn More
                </Button>
              </div>
            </div>

            {/* Animated Model */}
            <div className={`relative h-96 rounded-lg ${bgCard} border ${borderColor} overflow-hidden flex items-center justify-center`}>
              <div className="relative w-full h-full flex items-center justify-center">
                {/* Animated circles */}
                <div className="absolute w-24 h-24 rounded-full border-2 border-[#00e5ff] animate-pulse" />
                <div className="absolute w-40 h-40 rounded-full border-2 border-[#00e5ff]/50 animate-[spin_20s_linear_infinite]" />
                <div className="absolute w-56 h-56 rounded-full border-2 border-[#00e5ff]/25 animate-[spin_40s_linear_infinite_reverse]" />
                
                {/* Center icon */}
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-full bg-[#00e5ff]/20 flex items-center justify-center border border-[#00e5ff]">
                    <Rocket className="h-8 w-8 text-[#00e5ff]" />
                  </div>
                </div>

                {/* Orbiting elements */}
                <div className="absolute w-32 h-32 animate-[spin_30s_linear_infinite]">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-8 bg-[#2196f3]/30 rounded-full border border-[#2196f3]" />
                </div>
                <div className="absolute w-48 h-48 animate-[spin_20s_linear_infinite_reverse]">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-8 bg-[#4caf50]/30 rounded-full border border-[#4caf50]" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Product Capabilities Grid */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <h3 className={`text-4xl font-bold ${textPrimary} text-center mb-12`}>What B-COMET Does</h3>
            
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: GitCompare,
                  title: "Specification Compare",
                  description: "Compare FIX protocol specifications across versions and standards with automated validation."
                },
                {
                  icon: Activity,
                  title: "Log Analysis",
                  description: "Analyze trading logs against spec requirements and identify compliance gaps instantly."
                },
                {
                  icon: TestTube,
                  title: "Automated Testing",
                  description: "Run comprehensive test suites with configurable scenarios and detailed result tracking."
                },
                {
                  icon: Award,
                  title: "Certification",
                  description: "Build certification packs with evidence artifacts and manage approval workflows."
                },
                {
                  icon: Gauge,
                  title: "SLA Monitoring",
                  description: "Track onboarding progress against SLAs with breach risk alerts and leadership dashboards."
                },
                {
                  icon: Shield,
                  title: "Compliance Tracking",
                  description: "Maintain detailed evidence vault with lineage tracking and audit trails for every decision."
                },
              ].map((item, idx) => (
                <Card key={idx} className={`${bgCard} border ${borderColor} p-6 hover:border-[#00e5ff] transition-colors cursor-pointer`}>
                  <item.icon className="h-8 w-8 text-[#00e5ff] mb-3" />
                  <h4 className={`text-lg font-semibold ${textPrimary} mb-2`}>{item.title}</h4>
                  <p className={`${textSecondary} text-sm`}>{item.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Demo Request Section */}
        <section className={`py-16 px-6 ${bgSecondary} border-y ${borderColor}`}>
          <div className="max-w-2xl mx-auto text-center">
            <h3 className={`text-3xl font-bold ${textPrimary} mb-4`}>Ready to See It in Action?</h3>
            <p className={`${textSecondary} mb-8`}>Request a personalized demo to see how B-COMET can streamline your FIX protocol testing and onboarding.</p>
            
            <div className="flex gap-3 max-w-md mx-auto">
              <Input 
                placeholder="your@email.com" 
                value={demoEmail}
                onChange={(e) => setDemoEmail(e.target.value)}
                className={`${isDarkMode ? "bg-[#0d2137] border-[#1e4976]" : ""}`}
              />
              <Button style={{ backgroundColor: "#00e5ff", color: "#0a1628" }} className="px-8">
                Request Demo
              </Button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className={`${bgSecondary} py-8 px-6 border-t ${borderColor}`}>
          <div className="max-w-6xl mx-auto text-center">
            <p className={`${textSecondary} text-sm`}>© 2024 B-COMET. Enterprise FIX Protocol Platform. All rights reserved.</p>
          </div>
        </footer>
      </div>
    )
  }

  // ========== LOGIN SCREEN ==========
  if (currentScreen === "login") {
    return (
      <div className={`min-h-screen ${bgPrimary} flex items-center justify-center p-4`}>
        <Card className={`${bgCard} border ${borderColor} p-8 w-full max-w-md`}>
          <div className="text-center mb-8">
            <h1 className={`text-3xl font-bold ${textPrimary}`}>B-COMET</h1>
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
              className={`w-full h-32 flex flex-col items-center justify-center gap-3 ${bgSecondary} border-2 ${borderColor} hover:border-[#00e5ff] transition-colors`}
            >
              <Users className="h-8 w-8" />
              <div className="text-center">
                <p className={`font-semibold ${textPrimary}`}>Client</p>
                <p className={`text-xs ${textSecondary}`}>View your onboarding status</p>
              </div>
            </Button>
            
            <Button 
              onClick={() => { setSelectedRole("admin"); setCurrentScreen("dashboard"); }}
              className={`w-full h-32 flex flex-col items-center justify-center gap-3 ${bgSecondary} border-2 ${borderColor} hover:border-[#00e5ff] transition-colors`}
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
    return (
      <div className={`min-h-screen ${bgPrimary} flex`}>
        <Sidebar />
        <div className="flex-1 overflow-auto">
          <div className="p-8">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className={`text-3xl font-bold ${textPrimary}`}>Dashboard</h2>
                <p className={`${textSecondary} text-sm mt-1`}>Welcome back, {selectedRole === "admin" ? "Administrator" : "Client"}</p>
              </div>
              <Button onClick={() => setIsDarkMode(!isDarkMode)} variant="outline">
                {isDarkMode ? "Light" : "Dark"}
              </Button>
            </div>

            <div className="grid grid-cols-4 gap-4 mb-8">
              {[
                { label: "Active Cases", value: 24, color: "#2196f3" },
                { label: "At Risk", value: 3, color: "#ff9800" },
                { label: "Completed", value: 18, color: "#4caf50" },
                { label: "Pending Approval", value: 5, color: "#9c27b0" },
              ].map((stat) => (
                <Card key={stat.label} className={`${bgCard} border ${borderColor} p-6`}>
                  <p className={`text-sm ${textSecondary} mb-1`}>{stat.label}</p>
                  <p className={`text-3xl font-bold ${textPrimary}`}>{stat.value}</p>
                </Card>
              ))}
            </div>

            <Card className={`${bgCard} border ${borderColor} p-6`}>
              <h3 className={`text-lg font-semibold ${textPrimary} mb-4`}>Recent Cases</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className={`border-b ${borderColor}`}>
                      <th className={`text-left py-2 ${textSecondary}`}>Case ID</th>
                      <th className={`text-left py-2 ${textSecondary}`}>Client</th>
                      <th className={`text-left py-2 ${textSecondary}`}>Status</th>
                      <th className={`text-left py-2 ${textSecondary}`}>Progress</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { id: "C001", client: "Goldman Sachs", status: "On Track", progress: 75 },
                      { id: "C002", client: "Morgan Stanley", status: "At Risk", progress: 45 },
                      { id: "C003", client: "JP Morgan", status: "On Track", progress: 90 },
                    ].map((row) => (
                      <tr key={row.id} className={`border-b ${borderColor}`}>
                        <td className={`py-3 font-mono text-xs ${textPrimary}`}>{row.id}</td>
                        <td className={`py-3 ${textPrimary}`}>{row.client}</td>
                        <td className={`py-3`}>
                          <span className={`px-2 py-1 rounded text-xs ${
                            row.status === "On Track" ? "bg-[#4caf50]/20 text-[#4caf50]" :
                            "bg-[#ff9800]/20 text-[#ff9800]"
                          }`}>
                            {row.status}
                          </span>
                        </td>
                        <td className={`py-3`}>
                          <div className="w-full bg-[#1e4976] rounded-full h-2">
                            <div className="bg-[#00e5ff] h-full rounded-full" style={{ width: `${row.progress}%` }} />
                          </div>
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
    return (
      <div className={`min-h-screen ${bgPrimary} flex`}>
        <Sidebar />
        <div className="flex-1 overflow-auto p-8">
          <h2 className={`text-3xl font-bold ${textPrimary} mb-8`}>Onboarding Cases</h2>
          <Card className={`${bgCard} border ${borderColor} p-6`}>
            <p className={`${textSecondary}`}>Onboarding Cases Management - Coming Soon</p>
          </Card>
        </div>
      </div>
    )
  }

  // ========== APPROVALS SCREEN ==========
  if (currentScreen === "approvals") {
    return (
      <div className={`min-h-screen ${bgPrimary} flex`}>
        <Sidebar />
        <div className="flex-1 overflow-auto p-8">
          <h2 className={`text-3xl font-bold ${textPrimary} mb-8`}>Approvals</h2>
          <Card className={`${bgCard} border ${borderColor} p-6`}>
            <div className="flex gap-4 mb-6">
              {["pending", "due-soon", "approved"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setApprovalsTab(tab)}
                  className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                    approvalsTab === tab 
                      ? "border-[#00e5ff] text-[#00e5ff]" 
                      : "border-transparent text-[#b0bec5]"
                  }`}
                >
                  {tab.toUpperCase()}
                </button>
              ))}
            </div>
            <p className={`${textSecondary}`}>Approval Queue - Coming Soon</p>
          </Card>
        </div>
      </div>
    )
  }

  // ========== EVIDENCE VAULT SCREEN ==========
  if (currentScreen === "evidence-vault") {
    return (
      <div className={`min-h-screen ${bgPrimary} flex`}>
        <Sidebar />
        <div className="flex-1 overflow-auto p-8">
          <h2 className={`text-3xl font-bold ${textPrimary} mb-8`}>Evidence Vault</h2>
          <Card className={`${bgCard} border ${borderColor} p-6`}>
            <p className={`${textSecondary}`}>Evidence Vault - Coming Soon</p>
          </Card>
        </div>
      </div>
    )
  }

  // ========== RULE LIBRARY SCREEN ==========
  if (currentScreen === "rule-library") {
    return (
      <div className={`min-h-screen ${bgPrimary} flex`}>
        <Sidebar />
        <div className="flex-1 overflow-auto p-8">
          <h2 className={`text-3xl font-bold ${textPrimary} mb-8`}>Rule Library</h2>
          <Card className={`${bgCard} border ${borderColor} p-6`}>
            <p className={`${textSecondary}`}>Rule Library - Coming Soon</p>
          </Card>
        </div>
      </div>
    )
  }

  // ========== ATDL SUITE SCREEN ==========
  if (currentScreen === "atdl-suite") {
    return (
      <div className={`min-h-screen ${bgPrimary} flex`}>
        <Sidebar />
        <div className="flex-1 overflow-auto p-8">
          <h2 className={`text-3xl font-bold ${textPrimary} mb-8`}>ATDL Suite</h2>
          <Card className={`${bgCard} border ${borderColor} p-6`}>
            <p className={`${textSecondary} mb-6`}>ATDL Suite - Step Progress</p>
            <div className="flex gap-4 mb-6">
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  key={num}
                  onClick={() => setAtdlStep(num)}
                  className={`w-10 h-10 rounded-full font-bold transition-colors ${
                    atdlStep >= num 
                      ? "bg-[#00e5ff] text-[#0a1628]" 
                      : "bg-[#1e4976] text-[#b0bec5]"
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
            <p className={`${textSecondary}`}>Step {atdlStep} - Coming Soon</p>
          </Card>
        </div>
      </div>
    )
  }

  // ========== TESTING SCREEN ==========
  if (currentScreen === "testing") {
    return (
      <div className={`min-h-screen ${bgPrimary} flex`}>
        <Sidebar />
        <div className="flex-1 overflow-auto p-8">
          <h2 className={`text-3xl font-bold ${textPrimary} mb-8`}>Testing</h2>
          <Card className={`${bgCard} border ${borderColor} p-6`}>
            <p className={`${textSecondary}`}>Testing & Certification - Coming Soon</p>
          </Card>
        </div>
      </div>
    )
  }

  // ========== CERTIFICATION SCREEN ==========
  if (currentScreen === "certification") {
    return (
      <div className={`min-h-screen ${bgPrimary} flex`}>
        <Sidebar />
        <div className="flex-1 overflow-auto p-8">
          <h2 className={`text-3xl font-bold ${textPrimary} mb-8`}>Certification</h2>
          <Card className={`${bgCard} border ${borderColor} p-6`}>
            <p className={`${textSecondary}`}>Certification - Coming Soon</p>
          </Card>
        </div>
      </div>
    )
  }

  // ========== SLA ANALYTICS SCREEN ==========
  if (currentScreen === "sla-analytics") {
    return (
      <div className={`min-h-screen ${bgPrimary} flex`}>
        <Sidebar />
        <div className="flex-1 overflow-auto p-8">
          <h2 className={`text-3xl font-bold ${textPrimary} mb-8`}>SLA Analytics</h2>
          <Card className={`${bgCard} border ${borderColor} p-6`}>
            <p className={`${textSecondary}`}>SLA Analytics - Coming Soon</p>
          </Card>
        </div>
      </div>
    )
  }

  return null
}
