"use client"

import React, { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Briefcase, AlertTriangle, CheckCircle, Clock, LogIn, LogOut,
  Menu, X, Settings, Home, FileText, CheckSquare, Archive, BookOpen,
  TrendingUp, Users, Zap
} from "lucide-react"

export default function Page() {
  const [currentScreen, setCurrentScreen] = useState<"login" | "role-select" | "dashboard" | "onboarding-cases" | "approvals" | "evidence-vault" | "rule-library">("login")
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
  const accentCyan = "text-[#00e5ff]"

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
    const dashboardStats = [
      { label: "Active Cases", value: 24, icon: Briefcase, color: "#2196f3" },
      { label: "At Risk", value: 3, icon: AlertTriangle, color: "#ff9800" },
      { label: "Completed", value: 18, icon: CheckCircle, color: "#4caf50" },
      { label: "Pending Approval", value: 5, icon: Clock, color: "#9c27b0" },
    ]

    return (
      <div className={`min-h-screen ${bgPrimary} flex`}>
        {/* Sidebar */}
        <div className={`${sidebarOpen ? "w-64" : "w-20"} ${bgSecondary} border-r ${borderColor} transition-all duration-300 flex flex-col`}>
          <div className="p-4 flex items-center justify-between">
            {sidebarOpen && <h1 className={`font-bold ${accentCyan}`}>B-COMET</h1>}
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
            ].map((item) => (
              <button
                key={item.screen}
                onClick={() => setCurrentScreen(item.screen as typeof currentScreen)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded ${
                  currentScreen === item.screen ? `bg-[#00e5ff]/20 ${accentCyan}` : textSecondary
                } hover:bg-[#1e4976] transition-colors`}
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

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-8">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className={`text-3xl font-bold ${textPrimary}`}>Dashboard</h2>
                <p className={`${textSecondary} text-sm mt-1`}>Welcome back, {selectedRole === "admin" ? "Administrator" : "Client"}</p>
              </div>
              <Button onClick={() => setIsDarkMode(!isDarkMode)} variant="outline">
                {isDarkMode ? "Light" : "Dark"}
              </Button>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-4 gap-4 mb-8">
              {dashboardStats.map((stat) => (
                <Card key={stat.label} className={`${bgCard} border ${borderColor} p-6`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`text-sm ${textSecondary} mb-1`}>{stat.label}</p>
                      <p className={`text-3xl font-bold ${textPrimary}`}>{stat.value}</p>
                    </div>
                    <div className="p-3 rounded-lg" style={{ backgroundColor: `${stat.color}20` }}>
                      <stat.icon className="h-6 w-6" style={{ color: stat.color }} />
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Cases Table */}
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
                      <th className={`text-left py-2 ${textSecondary}`}>Owner</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { id: "C001", client: "Goldman Sachs", status: "On Track", progress: 75 },
                      { id: "C002", client: "Morgan Stanley", status: "At Risk", progress: 45 },
                      { id: "C003", client: "JP Morgan", status: "On Track", progress: 90 },
                      { id: "C004", client: "Bank of America", status: "Completed", progress: 100 },
                      { id: "C005", client: "Citigroup", status: "On Track", progress: 60 },
                    ].map((row) => (
                      <tr key={row.id} className={`border-b ${borderColor} hover:bg-[#1e4976]/50 transition-colors`}>
                        <td className={`py-3 font-mono text-xs ${textPrimary}`}>{row.id}</td>
                        <td className={`py-3 ${textPrimary}`}>{row.client}</td>
                        <td className={`py-3`}>
                          <span className={`px-2 py-1 rounded text-xs ${
                            row.status === "On Track" ? "bg-[#4caf50]/20 text-[#4caf50]" :
                            row.status === "At Risk" ? "bg-[#ff9800]/20 text-[#ff9800]" :
                            "bg-[#2196f3]/20 text-[#2196f3]"
                          }`}>
                            {row.status}
                          </span>
                        </td>
                        <td className={`py-3`}>
                          <div className="w-full bg-[#1e4976] rounded-full h-2 max-w-xs">
                            <div 
                              className="bg-[#00e5ff] h-full rounded-full" 
                              style={{ width: `${row.progress}%` }}
                            />
                          </div>
                        </td>
                        <td className={`py-3 ${textSecondary}`}>Admin</td>
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

  // ========== PLACEHOLDER SCREENS ==========
  const ScreenPlaceholder = ({ title, description }: { title: string; description: string }) => (
    <div className={`min-h-screen ${bgPrimary} flex`}>
      <div className={`w-64 ${bgSecondary} border-r ${borderColor} p-4`}>
        <button 
          onClick={() => setCurrentScreen("dashboard")}
          className={`flex items-center gap-2 px-3 py-2 rounded hover:bg-[#1e4976] ${textSecondary}`}
        >
          <Home className="h-5 w-5" />
          <span>Back to Dashboard</span>
        </button>
      </div>
      <div className="flex-1 flex items-center justify-center p-8">
        <Card className={`${bgCard} border ${borderColor} p-12 text-center max-w-md`}>
          <Zap className={`h-12 w-12 mx-auto mb-4 ${accentCyan}`} />
          <h2 className={`text-2xl font-bold ${textPrimary} mb-2`}>{title}</h2>
          <p className={`${textSecondary}`}>{description}</p>
        </Card>
      </div>
    </div>
  )

  if (currentScreen === "onboarding-cases") {
    return <ScreenPlaceholder title="Onboarding Cases" description="Coming soon" />
  }
  if (currentScreen === "approvals") {
    return <ScreenPlaceholder title="Approvals" description="Coming soon" />
  }
  if (currentScreen === "evidence-vault") {
    return <ScreenPlaceholder title="Evidence Vault" description="Coming soon" />
  }
  if (currentScreen === "rule-library") {
    return <ScreenPlaceholder title="Rule Library" description="Coming soon" />
  }

  return <ScreenPlaceholder title="Unknown Screen" description="Screen not found" />
}
