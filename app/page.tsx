"use client"

import { useState, useEffect } from "react"
import {
  Upload,
  FileText,
  GitCompare,
  Settings,
  Users,
  History,
  Bell,
  ChevronRight,
  X,
  Moon,
  Sun,
  Home,
  FolderOpen,
  MessageSquare,
  TestTube,
  Eye,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Clock,
  Building2,
  Search,
  Filter,
  Trash2,
  FileCheck,
  Play,
  Download,
  HelpCircle,
  Plus,
  Minus,
} from "lucide-react"

type Screen = "home" | "admin-tools" | "client-tools"
type UserType = "admin" | "client" | null
type Tab = "home" | "projects" | "uploads" | "testcase" | "settings"
type ActivePanel = "dashboard" | "spec-compare" | "log-analysis" | "msg-generator" | "test-cases" | "clients" | "history" | "alerts" | "settings" | "help" | "upload" | "download"

interface TagValue {
  tag: string
  value: string
}

interface SidebarItem {
  icon: React.ElementType
  label: string
  id: string
  badge?: number
}

interface HistoryEntry {
  id: string
  action: string
  timestamp: string
  status: "success" | "error" | "warning"
  details: string
}

interface AlertEntry {
  id: string
  type: "error" | "warning" | "info"
  message: string
  timestamp: string
  resolved: boolean
}

interface Client {
  id: string
  name: string
  specs: number
  lastActivity: string
  status: "active" | "inactive"
  progress: {
    specComparison: "done" | "progress" | "pending" | "error"
    logComparison: "done" | "progress" | "pending" | "error"
    testCaseGeneration: "done" | "progress" | "pending" | "error"
    conductorConnectivity: "connected" | "not-connected" | "error"
    verifixConnectivity: "licensed" | "not-licensed" | "pending"
    ulTestCases: "generated" | "pending" | "error"
    ulTestCasesCount?: number
  }
}

interface TestCase {
  id: string
  name: string
  msgType: string
  tags: string[]
  status: "passed" | "failed" | "pending"
}

interface AnalysisResult {
  unsupportedMessages: string[]
  unsupportedTags: { msgType: string; tags: string[] }[]
  unsupportedValues: { msgType: string; tag: string; value: string }[]
}

export default function FixAIPortal() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("home")
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [loginType, setLoginType] = useState<UserType>(null)
  const [loggedInUser, setLoggedInUser] = useState<UserType>(null)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [activeTab, setActiveTab] = useState<Tab>("home")
  const [activeSidebarItem, setActiveSidebarItem] = useState<ActivePanel>("dashboard")

  // Test it out section state
  const [uploadedSpec, setUploadedSpec] = useState<string | null>(null)
  const [selectedMsgType, setSelectedMsgType] = useState<string | null>(null)
  const [showMsgTypeDropdown, setShowMsgTypeDropdown] = useState(false)
  const [showTagEditor, setShowTagEditor] = useState(false)
  const [generatedMessage, setGeneratedMessage] = useState<string | null>(null)
  const [tagValues, setTagValues] = useState<TagValue[]>([
    { tag: "49", value: "SNDR" },
    { tag: "56", value: "RCV" },
    { tag: "34", value: "159" },
    { tag: "52", value: "20251224-19:38:43.158" },
    { tag: "11", value: "Order13" },
    { tag: "1", value: "TestAccount" },
    { tag: "21", value: "3" },
    { tag: "55", value: "IBM" },
    { tag: "54", value: "2" },
    { tag: "38", value: "1000" },
    { tag: "40", value: "2" },
    { tag: "44", value: "90.00" },
    { tag: "15", value: "USD" },
  ])

  // Spec Compare state
  const [spec1File, setSpec1File] = useState<string | null>(null)
  const [spec2File, setSpec2File] = useState<string | null>(null)
  const [specCompareResults, setSpecCompareResults] = useState<{differences: string[], compatible: boolean} | null>(null)
  const [selectedSpecMsgType, setSelectedSpecMsgType] = useState<string | null>(null)

  // Log Analysis state
  const [logFile, setLogFile] = useState<string | null>(null)
  const [logSpecFile, setLogSpecFile] = useState<string | null>(null)
  const [analysisResults, setAnalysisResults] = useState<AnalysisResult | null>(null)
  const [selectedAnalysisMsgType, setSelectedAnalysisMsgType] = useState<string | null>(null)

  // Test Cases state
  const [testCases, setTestCases] = useState<TestCase[]>([
    { id: "TC001", name: "New Order Single - Basic", msgType: "D", tags: ["49", "56", "11", "55"], status: "passed" },
    { id: "TC002", name: "Execution Report - Fill", msgType: "8", tags: ["17", "20", "39", "150"], status: "passed" },
    { id: "TC003", name: "Order Cancel Request", msgType: "F", tags: ["41", "11", "55"], status: "failed" },
    { id: "TC004", name: "Heartbeat Response", msgType: "0", tags: ["112"], status: "pending" },
    { id: "TC005", name: "Logon with Reset", msgType: "A", tags: ["98", "108", "141"], status: "passed" },
  ])
  const [testCaseFilter, setTestCaseFilter] = useState<string>("")
  const [testCaseMsgTypeFilter, setTestCaseMsgTypeFilter] = useState<string>("")

  // History state
  const [history, setHistory] = useState<HistoryEntry[]>([
    { id: "H001", action: "Uploaded FIX Spec", timestamp: "2025-03-02 10:30:15", status: "success", details: "FIX44_Custom.xml uploaded successfully" },
    { id: "H002", action: "Generated Test Cases", timestamp: "2025-03-02 10:25:00", status: "success", details: "15 test cases generated from spec" },
    { id: "H003", action: "Spec Comparison", timestamp: "2025-03-02 10:20:30", status: "warning", details: "3 incompatibilities found" },
    { id: "H004", action: "Log Analysis", timestamp: "2025-03-02 10:15:00", status: "error", details: "Analysis failed: Invalid log format" },
    { id: "H005", action: "FIX Message Generated", timestamp: "2025-03-02 10:10:00", status: "success", details: "NewOrderSingle (35=D) generated" },
  ])

  // Alerts state
  const [alerts, setAlerts] = useState<AlertEntry[]>([
    { id: "A001", type: "error", message: "Log analysis failed for client BlackRock", timestamp: "2025-03-02 10:15:00", resolved: false },
    { id: "A002", type: "warning", message: "Spec compatibility issues detected", timestamp: "2025-03-02 10:20:30", resolved: false },
    { id: "A003", type: "warning", message: "Unsupported tag 9999 in message type D", timestamp: "2025-03-02 09:45:00", resolved: true },
    { id: "A004", type: "error", message: "Connection timeout to validation server", timestamp: "2025-03-02 09:30:00", resolved: true },
    { id: "A005", type: "info", message: "New FIX 5.0 SP2 spec available", timestamp: "2025-03-02 08:00:00", resolved: false },
  ])

  // Clients state
  const [clients, setClients] = useState<Client[]>([
    { id: "C001", name: "BlackRock", specs: 12, lastActivity: "2025-03-02 10:30", status: "active", progress: { specComparison: "done", logComparison: "progress", testCaseGeneration: "done", conductorConnectivity: "connected", verifixConnectivity: "licensed", ulTestCases: "generated", ulTestCasesCount: 45 } },
    { id: "C002", name: "Goldman Sachs", specs: 8, lastActivity: "2025-03-02 09:45", status: "active", progress: { specComparison: "done", logComparison: "done", testCaseGeneration: "progress", conductorConnectivity: "connected", verifixConnectivity: "not-licensed", ulTestCases: "pending" } },
    { id: "C003", name: "JP Morgan", specs: 15, lastActivity: "2025-03-02 10:15", status: "active", progress: { specComparison: "progress", logComparison: "pending", testCaseGeneration: "pending", conductorConnectivity: "not-connected", verifixConnectivity: "pending", ulTestCases: "pending" } },
    { id: "C004", name: "UBS", specs: 6, lastActivity: "2025-03-01 16:30", status: "inactive", progress: { specComparison: "done", logComparison: "done", testCaseGeneration: "done", conductorConnectivity: "connected", verifixConnectivity: "licensed", ulTestCases: "generated", ulTestCasesCount: 32 } },
    { id: "C005", name: "Raymond James", specs: 4, lastActivity: "2025-03-02 08:00", status: "active", progress: { specComparison: "done", logComparison: "error", testCaseGeneration: "pending", conductorConnectivity: "error", verifixConnectivity: "not-licensed", ulTestCases: "error" } },
    { id: "C006", name: "HSBC", specs: 9, lastActivity: "2025-03-02 10:00", status: "active", progress: { specComparison: "done", logComparison: "done", testCaseGeneration: "progress", conductorConnectivity: "connected", verifixConnectivity: "licensed", ulTestCases: "generated", ulTestCasesCount: 28 } },
    { id: "C007", name: "Bank of America", specs: 11, lastActivity: "2025-03-01 14:20", status: "inactive", progress: { specComparison: "error", logComparison: "pending", testCaseGeneration: "pending", conductorConnectivity: "not-connected", verifixConnectivity: "pending", ulTestCases: "pending" } },
  ])
  const [selectedClient, setSelectedClient] = useState<Client | null>(null)
  const [clientSortBy, setClientSortBy] = useState<"name" | "progress" | "status">("name")
  const [clientSortOrder, setClientSortOrder] = useState<"asc" | "desc">("asc")
  const [clientStatusFilter, setClientStatusFilter] = useState<"all" | "active" | "inactive">("all")
  const [showAddClientModal, setShowAddClientModal] = useState(false)
  const [editingClient, setEditingClient] = useState<Client | null>(null)
  const [newClientName, setNewClientName] = useState("")

  const msgTypes = [
    { code: "D", name: "New Order Single" },
    { code: "8", name: "Execution Report" },
    { code: "F", name: "Order Cancel Request" },
    { code: "G", name: "Order Cancel/Replace Request" },
    { code: "0", name: "Heartbeat" },
    { code: "A", name: "Logon" },
    { code: "5", name: "Logout" },
    { code: "V", name: "Market Data Request" },
    { code: "W", name: "Market Data Snapshot" },
    { code: "X", name: "Market Data Incremental" },
  ]

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [isDarkMode])

  const handleLogin = (type: UserType) => {
    setLoginType(type)
    setShowLoginModal(true)
  }

  const submitLogin = () => {
    if (username && password) {
      setLoggedInUser(loginType)
      setShowLoginModal(false)
      if (loginType === "admin") {
        setCurrentScreen("admin-tools")
      } else {
        setCurrentScreen("client-tools")
      }
    }
  }

  const handleFileUpload = (inputId: string) => {
    const input = document.getElementById(inputId) as HTMLInputElement
    input?.click()
  }

  const handleSpecUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setUploadedSpec(file.name)
      addHistoryEntry("Uploaded FIX Spec", "success", `${file.name} uploaded successfully`)
    }
  }

  const handleSpec1Upload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSpec1File(file.name)
      addHistoryEntry("Selected Spec 1", "success", file.name)
    }
  }

  const handleSpec2Upload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSpec2File(file.name)
      addHistoryEntry("Selected Spec 2", "success", file.name)
    }
  }

  const handleLogFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setLogFile(file.name)
      addHistoryEntry("Uploaded Log File", "success", file.name)
    }
  }

  const handleLogSpecUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setLogSpecFile(file.name)
      addHistoryEntry("Selected FIX Spec for Analysis", "success", file.name)
    }
  }

  const selectMsgType = (code: string) => {
    setSelectedMsgType(code)
    setShowMsgTypeDropdown(false)
  }

  const generateFixMessage = () => {
    if (uploadedSpec && selectedMsgType) {
      const tags = tagValues.map((t) => `${t.tag}=${t.value}`).join("|")
      const msg = `8=FIX.4.2|9=159|35=${selectedMsgType}|${tags}|59=0|10=176|`
      setGeneratedMessage(msg)
      addHistoryEntry("FIX Message Generated", "success", `MsgType=${selectedMsgType}`)
    }
  }

  const updateTagValue = (index: number, newValue: string) => {
    const newTags = [...tagValues]
    newTags[index].value = newValue
    setTagValues(newTags)
  }

  const addHistoryEntry = (action: string, status: "success" | "error" | "warning", details: string) => {
    const newEntry: HistoryEntry = {
      id: `H${Date.now()}`,
      action,
      timestamp: new Date().toISOString().replace("T", " ").substring(0, 19),
      status,
      details,
    }
    setHistory((prev) => [newEntry, ...prev])
  }

  const addAlert = (type: "error" | "warning" | "info", message: string) => {
    const newAlert: AlertEntry = {
      id: `A${Date.now()}`,
      type,
      message,
      timestamp: new Date().toISOString().replace("T", " ").substring(0, 19),
      resolved: false,
    }
    setAlerts((prev) => [newAlert, ...prev])
  }

  const performSpecCompare = () => {
    if (spec1File && spec2File) {
      // Simulated comparison results
      const results = {
        compatible: false,
        differences: [
          "Tag 9999 present in Spec 1 but not in Spec 2",
          "MsgType 'AE' has different required fields",
          "Value 'X' for tag 54 not supported in Spec 2",
          "Repeating group 453 has different structure",
        ],
      }
      setSpecCompareResults(results)
      addHistoryEntry("Spec Comparison", results.compatible ? "success" : "warning", `${results.differences.length} differences found`)
      if (!results.compatible) {
        addAlert("warning", "Spec compatibility issues detected")
      }
    }
  }

  const performLogAnalysis = () => {
    if (logFile && logSpecFile) {
      // Simulated analysis results
      const results: AnalysisResult = {
        unsupportedMessages: ["AE - Trade Capture Report", "AJ - Quote Request Reject"],
        unsupportedTags: [
          { msgType: "D", tags: ["9999", "9998"] },
          { msgType: "8", tags: ["10001"] },
          { msgType: "F", tags: ["9997"] },
        ],
        unsupportedValues: [
          { msgType: "D", tag: "54", value: "X" },
          { msgType: "8", tag: "39", value: "Z" },
          { msgType: "D", tag: "40", value: "9" },
        ],
      }
      setAnalysisResults(results)
      addHistoryEntry("Log Analysis Completed", "success", `Found ${results.unsupportedMessages.length} unsupported messages`)
    }
  }

  const generateTestCases = () => {
    const newTestCases: TestCase[] = [
      { id: `TC${Date.now()}`, name: "Generated - Order Flow Test", msgType: "D", tags: ["11", "55", "54", "38"], status: "pending" },
      { id: `TC${Date.now() + 1}`, name: "Generated - Cancel Flow Test", msgType: "F", tags: ["41", "11"], status: "pending" },
    ]
    setTestCases((prev) => [...newTestCases, ...prev])
    addHistoryEntry("Generated Test Cases", "success", `${newTestCases.length} test cases created`)
  }

  // Status message state
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error" | "warning"; message: string } | null>(null)

  // API call helper
  const callServerEndpoint = async (tool: string) => {
    try {
      const response = await fetch(`http://localhost:5000/run-bat?tool=${tool}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      })
      const data = await response.json()
      if (data.success) {
        setStatusMessage({ type: "success", message: `Success: ${data.output}` })
        addHistoryEntry(`Executed: ${tool}`, "success", data.output)
      } else {
        setStatusMessage({ type: "error", message: `Error: ${data.error}` })
        addHistoryEntry(`Failed: ${tool}`, "error", data.error)
        addAlert("error", `${tool} execution failed`)
      }
    } catch {
      setStatusMessage({ type: "warning", message: `Tool "${tool}" triggered (connect server to execute)` })
      addHistoryEntry(`Triggered: ${tool}`, "warning", "Server not connected")
    }
    setTimeout(() => setStatusMessage(null), 4000)
  }

  // Status Toast Component
  const StatusToast = () => {
    if (!statusMessage) return null
    const colors = {
      success: "bg-[#4caf50] text-white",
      error: "bg-[#f44336] text-white",
      warning: "bg-[#ffc107] text-[#0a1628]",
    }
    return (
      <div className={`fixed bottom-4 right-4 z-50 flex items-center gap-3 rounded-xl px-5 py-3 shadow-lg ${colors[statusMessage.type]}`}>
        <span className="text-sm font-medium">{statusMessage.message}</span>
        <button onClick={() => setStatusMessage(null)} className="ml-2 opacity-70 hover:opacity-100">
          <X className="h-4 w-4" />
        </button>
      </div>
    )
  }

  // Modern Button Component
  const Button = ({
    children,
    variant = "primary",
    size = "md",
    className = "",
    disabled = false,
    ...props
  }: {
    children: React.ReactNode
    variant?: "primary" | "secondary" | "outline" | "ghost" | "danger"
    size?: "sm" | "md" | "lg"
    className?: string
    disabled?: boolean
    onClick?: () => void
  }) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-all duration-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
    const sizeStyles = {
      sm: "px-3 py-1.5 text-xs",
      md: "px-4 py-2.5 text-sm",
      lg: "px-6 py-3 text-base",
    }
    const variantStyles = {
      primary: isDarkMode
        ? "bg-[#00e5ff] text-[#0a1628] hover:bg-[#18ffff] shadow-lg shadow-[#00e5ff]/25 focus:ring-[#00e5ff]"
        : "bg-[#0a1628] text-white hover:bg-[#1e3a5f] shadow-lg shadow-[#0a1628]/25 focus:ring-[#0a1628]",
      secondary: isDarkMode
        ? "bg-[#1e4976] text-white hover:bg-[#2a5f8f] shadow-md focus:ring-[#1e4976]"
        : "bg-[#e2e8f0] text-[#0a1628] hover:bg-[#cbd5e1] shadow-md focus:ring-[#e2e8f0]",
      outline: isDarkMode
        ? "border-2 border-[#00e5ff] text-[#00e5ff] hover:bg-[#00e5ff]/10 focus:ring-[#00e5ff]"
        : "border-2 border-[#0a1628] text-[#0a1628] hover:bg-[#0a1628]/5 focus:ring-[#0a1628]",
      ghost: isDarkMode
        ? "text-[#90caf9] hover:bg-[#1e4976]/50 focus:ring-[#1e4976]"
        : "text-[#0a1628] hover:bg-[#e2e8f0] focus:ring-[#e2e8f0]",
      danger: "bg-[#f44336] text-white hover:bg-[#d32f2f] shadow-md focus:ring-[#f44336]",
    }

    return (
      <button className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`} disabled={disabled} {...props}>
        {children}
      </button>
    )
  }

  // Modern Sidebar Component
  const Sidebar = ({ items, title }: { items: SidebarItem[]; title: string }) => (
    <div
      className={`flex h-full w-56 flex-col border-r transition-colors ${
        isDarkMode ? "border-[#1e4976] bg-[#0d1f3c]" : "border-[#e2e8f0] bg-[#f8fafc]"
      }`}
    >
      <div className={`flex items-center gap-3 border-b px-4 py-5 ${isDarkMode ? "border-[#1e4976]" : "border-[#e2e8f0]"}`}>
        <div
          className={`flex h-9 w-9 items-center justify-center rounded-lg ${
            isDarkMode ? "bg-[#00e5ff] text-[#0a1628]" : "bg-[#0a1628] text-white"
          }`}
        >
          <MessageSquare className="h-5 w-5" />
        </div>
        <span className={`text-lg font-semibold ${isDarkMode ? "text-white" : "text-[#0a1628]"}`}>{title}</span>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <div className={`mb-2 px-3 text-xs font-semibold uppercase tracking-wider ${isDarkMode ? "text-[#64b5f6]" : "text-[#64748b]"}`}>
          Navigation
        </div>
        {items.map((item) => {
          const Icon = item.icon
          const isActive = activeSidebarItem === item.id
          return (
            <button
              key={item.id}
              onClick={() => setActiveSidebarItem(item.id as ActivePanel)}
              className={`mb-1 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                isActive
                  ? isDarkMode
                    ? "bg-[#f57c00]/20 text-[#ff9800] border-l-2 border-[#ff9800]"
                    : "bg-[#f57c00]/10 text-[#f57c00] border-l-2 border-[#f57c00]"
                  : isDarkMode
                    ? "text-[#90caf9] hover:bg-[#1e4976]/50 hover:text-white"
                    : "text-[#64748b] hover:bg-[#e2e8f0] hover:text-[#0a1628]"
              }`}
            >
              <Icon className={`h-5 w-5 ${isActive ? (isDarkMode ? "text-[#ff9800]" : "text-[#f57c00]") : ""}`} />
              <span>{item.label}</span>
              {item.badge && (
                <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-[#f57c00] px-1.5 text-xs font-semibold text-white">
                  {item.badge}
                </span>
              )}
            </button>
          )
        })}
      </nav>

      <div className={`border-t px-3 py-4 ${isDarkMode ? "border-[#1e4976]" : "border-[#e2e8f0]"}`}>
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className={`mb-2 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
            isDarkMode
              ? "text-[#90caf9] hover:bg-[#1e4976]/50 hover:text-white"
              : "text-[#64748b] hover:bg-[#e2e8f0] hover:text-[#0a1628]"
          }`}
        >
          {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          <span>{isDarkMode ? "Light Mode" : "Dark Mode"}</span>
        </button>
        <button
          onClick={() => {
            setCurrentScreen("home")
            setLoggedInUser(null)
            setActiveTab("home")
          }}
          className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
            isDarkMode ? "text-[#f44336] hover:bg-[#f44336]/10" : "text-[#ef4444] hover:bg-[#fef2f2]"
          }`}
        >
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  )

  // Theme Toggle Button
  const ThemeToggle = () => (
    <button
      onClick={() => setIsDarkMode(!isDarkMode)}
      className={`fixed right-4 top-4 z-50 rounded-xl p-3 shadow-lg transition-all ${
        isDarkMode ? "bg-[#1e4976] text-[#00e5ff] hover:bg-[#2a5f8f]" : "bg-white text-[#0a1628] hover:bg-[#f1f5f9] shadow-md"
      }`}
      aria-label="Toggle theme"
    >
      {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  )

  // Tab Bar Component
  const TabBar = () => {
    const tabs = [
      { id: "home" as Tab, label: "Home", icon: Home },
      { id: "projects" as Tab, label: "Projects", icon: FolderOpen },
      { id: "uploads" as Tab, label: "Uploads", icon: FileUp },
      { id: "testcase" as Tab, label: "TestCase", icon: TestTube },
      { id: "settings" as Tab, label: "Settings", icon: Settings },
    ]

    return (
      <div className={`flex items-center gap-1 rounded-xl p-1.5 ${isDarkMode ? "bg-[#0d1f3c]" : "bg-[#e2e8f0]"}`}>
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? isDarkMode
                    ? "bg-[#00e5ff] text-[#0a1628] shadow-md"
                    : "bg-white text-[#0a1628] shadow-md"
                  : isDarkMode
                    ? "text-[#90caf9] hover:bg-[#1e4976]/50 hover:text-white"
                    : "text-[#64748b] hover:bg-white/50 hover:text-[#0a1628]"
              }`}
            >
              <Icon className="h-4 w-4" />
              {tab.label}
            </button>
          )
        })}
      </div>
    )
  }

  // Modern Card Component
  const Card = ({
    children,
    className = "",
    hover = false,
  }: {
    children: React.ReactNode
    className?: string
    hover?: boolean
  }) => (
    <div
      className={`rounded-2xl border transition-all ${
        isDarkMode
          ? `border-[#1e4976] bg-[#0d1f3c] ${hover ? "hover:border-[#00e5ff]/50 hover:shadow-lg hover:shadow-[#00e5ff]/10" : ""}`
          : `border-[#e2e8f0] bg-white ${hover ? "hover:border-[#0a1628]/20 hover:shadow-lg" : ""}`
      } ${className}`}
    >
      {children}
    </div>
  )

  // Client helper functions
  const getProgressCount = (client: Client) => {
    let count = 0
    if (client.progress.specComparison === "done") count++
    if (client.progress.logComparison === "done") count++
    if (client.progress.testCaseGeneration === "done") count++
    if (client.progress.conductorConnectivity === "connected") count++
    if (client.progress.verifixConnectivity === "licensed") count++
    if (client.progress.ulTestCases === "generated") count++
    return count
  }

  const getProgressPercent = (client: Client) => {
    return (getProgressCount(client) / 6) * 100
  }

  const sortedClients = [...clients]
    .filter(c => clientStatusFilter === "all" || c.status === clientStatusFilter)
    .sort((a, b) => {
      let comparison = 0
      if (clientSortBy === "name") {
        comparison = a.name.localeCompare(b.name)
      } else if (clientSortBy === "progress") {
        comparison = getProgressCount(b) - getProgressCount(a)
      } else if (clientSortBy === "status") {
        comparison = a.status.localeCompare(b.status)
      }
      return clientSortOrder === "asc" ? comparison : -comparison
    })

  const addClient = () => {
    if (newClientName.trim()) {
      const newClient: Client = {
        id: `C${Date.now()}`,
        name: newClientName.trim(),
        specs: 0,
        lastActivity: new Date().toISOString().replace("T", " ").substring(0, 16),
        status: "active",
        progress: { specComparison: "pending", logComparison: "pending", testCaseGeneration: "pending", conductorConnectivity: "not-connected", verifixConnectivity: "pending", ulTestCases: "pending" }
      }
      setClients(prev => [...prev, newClient])
      setNewClientName("")
      setShowAddClientModal(false)
      addHistoryEntry("Added Client", "success", `Client "${newClientName}" added`)
    }
  }

  const updateClient = (clientId: string, updates: Partial<Client>) => {
    setClients(prev => prev.map(c => c.id === clientId ? { ...c, ...updates } : c))
    addHistoryEntry("Updated Client", "success", `Client updated`)
  }

  const removeClient = (clientId: string) => {
    const client = clients.find(c => c.id === clientId)
    setClients(prev => prev.filter(c => c.id !== clientId))
    addHistoryEntry("Removed Client", "warning", `Client "${client?.name}" removed`)
  }

  const ProgressBadge = ({ status }: { status: "done" | "progress" | "pending" | "error" }) => {
    const styles = {
      done: "bg-[#4caf50]/20 text-[#4caf50]",
      progress: "bg-[#2196f3]/20 text-[#2196f3]",
      pending: "bg-[#9e9e9e]/20 text-[#9e9e9e]",
      error: "bg-[#f44336]/20 text-[#f44336]"
    }
    const labels = { done: "Done", progress: "In Progress", pending: "Not Started", error: "Error" }
    return (
      <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${styles[status]}`}>
        {labels[status]}
      </span>
    )
  }

  const ConnectivityBadge = ({ status }: { status: "connected" | "not-connected" | "error" }) => {
    const styles = {
      connected: "bg-[#4caf50]/20 text-[#4caf50]",
      "not-connected": "bg-[#f57c00]/20 text-[#f57c00]",
      error: "bg-[#f44336]/20 text-[#f44336]"
    }
    const labels = { connected: "Connected", "not-connected": "Not Connected", error: "Error" }
    return (
      <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${styles[status]}`}>
        {labels[status]}
      </span>
    )
  }

  const LicenseBadge = ({ status }: { status: "licensed" | "not-licensed" | "pending" }) => {
    const styles = {
      licensed: "bg-[#4caf50]/20 text-[#4caf50]",
      "not-licensed": "bg-[#f44336]/20 text-[#f44336]",
      pending: "bg-[#9e9e9e]/20 text-[#9e9e9e]"
    }
    const labels = { licensed: "Licensed", "not-licensed": "Not Licensed", pending: "Pending" }
    return (
      <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${styles[status]}`}>
        {labels[status]}
      </span>
    )
  }

  const ULTestCasesBadge = ({ status, count, onClick }: { status: "generated" | "pending" | "error"; count?: number; onClick?: () => void }) => {
    const styles = {
      generated: "bg-[#4caf50]/20 text-[#4caf50] cursor-pointer hover:bg-[#4caf50]/30",
      pending: "bg-[#9e9e9e]/20 text-[#9e9e9e]",
      error: "bg-[#f44336]/20 text-[#f44336]"
    }
    const labels = { generated: `Generated${count ? ` (${count})` : ""}`, pending: "Pending", error: "Error" }
    return (
      <span 
        className={`rounded-full px-2 py-0.5 text-xs font-medium ${styles[status]}`}
        onClick={status === "generated" ? onClick : undefined}
      >
        {labels[status]}
        {status === "generated" && <span className="ml-1 text-[10px] underline">View</span>}
      </span>
    )
  }

  // Clients Panel Component
  const ClientsPanel = () => (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-[#0a1628]"}`}>Clients</h2>
        <Button variant="primary" onClick={() => setShowAddClientModal(true)}>
          <Users className="mr-2 h-4 w-4" />
          Add Client
        </Button>
      </div>

      {/* Filters and Sorting */}
      <Card className="mb-6 p-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className={`flex items-center gap-2 rounded-xl border px-3 py-2 ${isDarkMode ? "border-[#1e4976] bg-[#0a1628]" : "border-[#e2e8f0] bg-white"}`}>
            <Search className={`h-4 w-4 ${isDarkMode ? "text-[#64b5f6]" : "text-[#64748b]"}`} />
            <input
              type="text"
              placeholder="Search clients..."
              className={`bg-transparent text-sm outline-none ${isDarkMode ? "text-white placeholder-[#64748b]" : "text-[#0a1628] placeholder-[#94a3b8]"}`}
            />
          </div>
          <select
            value={clientSortBy}
            onChange={(e) => setClientSortBy(e.target.value as "name" | "progress" | "status")}
            className={`rounded-xl border px-3 py-2 text-sm ${isDarkMode ? "border-[#1e4976] bg-[#0a1628] text-white" : "border-[#e2e8f0] bg-white text-[#0a1628]"}`}
          >
            <option value="name">Sort by Name</option>
            <option value="progress">Sort by Progress</option>
            <option value="status">Sort by Status</option>
          </select>
          <select
            value={clientSortOrder}
            onChange={(e) => setClientSortOrder(e.target.value as "asc" | "desc")}
            className={`rounded-xl border px-3 py-2 text-sm ${isDarkMode ? "border-[#1e4976] bg-[#0a1628] text-white" : "border-[#e2e8f0] bg-white text-[#0a1628]"}`}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
          <select
            value={clientStatusFilter}
            onChange={(e) => setClientStatusFilter(e.target.value as "all" | "active" | "inactive")}
            className={`rounded-xl border px-3 py-2 text-sm ${isDarkMode ? "border-[#1e4976] bg-[#0a1628] text-white" : "border-[#e2e8f0] bg-white text-[#0a1628]"}`}
          >
            <option value="all">All Status</option>
            <option value="active">Active Only</option>
            <option value="inactive">Inactive Only</option>
          </select>
        </div>
      </Card>

      <div className="grid gap-4">
        {sortedClients.map((client) => (
          <Card key={client.id} hover className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${isDarkMode ? "bg-[#1e4976]" : "bg-[#e2e8f0]"}`}>
                  <Building2 className={`h-6 w-6 ${isDarkMode ? "text-[#00e5ff]" : "text-[#0a1628]"}`} />
                </div>
                <div>
                  <h3 className={`font-semibold ${isDarkMode ? "text-white" : "text-[#0a1628]"}`}>{client.name}</h3>
                  <p className={`text-sm ${isDarkMode ? "text-[#90caf9]" : "text-[#64748b]"}`}>
                    {client.specs} specs | Last active: {client.lastActivity}
                  </p>
                  {/* Progress bar */}
                  <div className="mt-2 flex items-center gap-2">
                    <div className={`h-2 w-32 rounded-full ${isDarkMode ? "bg-[#1e4976]" : "bg-[#e2e8f0]"}`}>
                      <div 
                        className="h-full rounded-full bg-[#4caf50] transition-all"
                        style={{ width: `${getProgressPercent(client)}%` }}
                      />
                    </div>
                    <span className={`text-xs ${isDarkMode ? "text-[#64b5f6]" : "text-[#64748b]"}`}>
                      {getProgressCount(client)}/6 tasks
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    client.status === "active"
                      ? "bg-[#4caf50]/20 text-[#4caf50]"
                      : "bg-[#f57c00]/20 text-[#f57c00]"
                  }`}
                >
                  {client.status}
                </span>
                <Button variant="secondary" size="sm" onClick={() => setSelectedClient(client)}>
                  <Eye className="mr-1 h-4 w-4" />
                  View
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setEditingClient(client)}>
                  <Settings className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => removeClient(client.id)}>
                  <Trash2 className="h-4 w-4 text-[#f44336]" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Add Client Modal */}
      {showAddClientModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <Card className="w-full max-w-md p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className={`text-lg font-semibold ${isDarkMode ? "text-white" : "text-[#0a1628]"}`}>Add New Client</h3>
              <button onClick={() => setShowAddClientModal(false)} className={`rounded-lg p-2 ${isDarkMode ? "hover:bg-[#1e4976]" : "hover:bg-[#f1f5f9]"}`}>
                <X className="h-5 w-5" />
              </button>
            </div>
            <input
              type="text"
              placeholder="Client name..."
              value={newClientName}
              onChange={(e) => setNewClientName(e.target.value)}
              className={`mb-4 w-full rounded-xl border px-4 py-3 text-sm ${isDarkMode ? "border-[#1e4976] bg-[#0a1628] text-white" : "border-[#e2e8f0] bg-white text-[#0a1628]"}`}
            />
            <div className="flex gap-3">
              <Button variant="secondary" className="flex-1" onClick={() => setShowAddClientModal(false)}>Cancel</Button>
              <Button variant="primary" className="flex-1" onClick={addClient}>Add Client</Button>
            </div>
          </Card>
        </div>
      )}

      {/* Client Detail Modal */}
      {selectedClient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <Card className="w-full max-w-lg p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className={`text-xl font-semibold ${isDarkMode ? "text-white" : "text-[#0a1628]"}`}>
                {selectedClient.name}
              </h3>
              <button onClick={() => setSelectedClient(null)} className={`rounded-lg p-2 ${isDarkMode ? "hover:bg-[#1e4976]" : "hover:bg-[#f1f5f9]"}`}>
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div className={`rounded-xl p-4 ${isDarkMode ? "bg-[#0a1628]" : "bg-[#f8fafc]"}`}>
                <p className={`text-sm ${isDarkMode ? "text-[#90caf9]" : "text-[#64748b]"}`}>Total Specs</p>
                <p className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-[#0a1628]"}`}>{selectedClient.specs}</p>
              </div>
              
              {/* Progress Details */}
              <div className={`rounded-xl p-4 ${isDarkMode ? "bg-[#0a1628]" : "bg-[#f8fafc]"}`}>
                <p className={`mb-3 text-sm font-medium ${isDarkMode ? "text-white" : "text-[#0a1628]"}`}>Work Progress</p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className={`text-sm ${isDarkMode ? "text-[#90caf9]" : "text-[#64748b]"}`}>FIX Spec Comparison</span>
                    <ProgressBadge status={selectedClient.progress.specComparison} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`text-sm ${isDarkMode ? "text-[#90caf9]" : "text-[#64748b]"}`}>Log Comparison</span>
                    <ProgressBadge status={selectedClient.progress.logComparison} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`text-sm ${isDarkMode ? "text-[#90caf9]" : "text-[#64748b]"}`}>Test Case Generation</span>
                    <ProgressBadge status={selectedClient.progress.testCaseGeneration} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`text-sm ${isDarkMode ? "text-[#90caf9]" : "text-[#64748b]"}`}>Conductor Connectivity</span>
                    <ConnectivityBadge status={selectedClient.progress.conductorConnectivity} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`text-sm ${isDarkMode ? "text-[#90caf9]" : "text-[#64748b]"}`}>Verifix Connectivity</span>
                    <LicenseBadge status={selectedClient.progress.verifixConnectivity} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`text-sm ${isDarkMode ? "text-[#90caf9]" : "text-[#64748b]"}`}>UL Test Cases</span>
                    <ULTestCasesBadge 
                      status={selectedClient.progress.ulTestCases} 
                      count={selectedClient.progress.ulTestCasesCount}
                      onClick={() => { setSelectedClient(null); setShowULTestCasesModal(selectedClient); }}
                    />
                  </div>
                </div>
              </div>

              <div className={`rounded-xl p-4 ${isDarkMode ? "bg-[#0a1628]" : "bg-[#f8fafc]"}`}>
                <p className={`text-sm ${isDarkMode ? "text-[#90caf9]" : "text-[#64748b]"}`}>Last Activity</p>
                <p className={`font-medium ${isDarkMode ? "text-white" : "text-[#0a1628]"}`}>{selectedClient.lastActivity}</p>
              </div>
              <div className="flex gap-3">
                <Button variant="primary" className="flex-1">View Specs</Button>
                <Button variant="secondary" className="flex-1">View History</Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Edit Client Modal */}
      {editingClient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <Card className="w-full max-w-md p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className={`text-lg font-semibold ${isDarkMode ? "text-white" : "text-[#0a1628]"}`}>Edit Client</h3>
              <button onClick={() => setEditingClient(null)} className={`rounded-lg p-2 ${isDarkMode ? "hover:bg-[#1e4976]" : "hover:bg-[#f1f5f9]"}`}>
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className={`mb-1 block text-sm ${isDarkMode ? "text-[#90caf9]" : "text-[#64748b]"}`}>Client Name</label>
                <input
                  type="text"
                  value={editingClient.name}
                  onChange={(e) => setEditingClient({ ...editingClient, name: e.target.value })}
                  className={`w-full rounded-xl border px-4 py-2 text-sm ${isDarkMode ? "border-[#1e4976] bg-[#0a1628] text-white" : "border-[#e2e8f0] bg-white text-[#0a1628]"}`}
                />
              </div>
              <div>
                <label className={`mb-1 block text-sm ${isDarkMode ? "text-[#90caf9]" : "text-[#64748b]"}`}>Status</label>
                <select
                  value={editingClient.status}
                  onChange={(e) => setEditingClient({ ...editingClient, status: e.target.value as "active" | "inactive" })}
                  className={`w-full rounded-xl border px-4 py-2 text-sm ${isDarkMode ? "border-[#1e4976] bg-[#0a1628] text-white" : "border-[#e2e8f0] bg-white text-[#0a1628]"}`}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
            <div className="mt-6 flex gap-3">
              <Button variant="secondary" className="flex-1" onClick={() => setEditingClient(null)}>Cancel</Button>
              <Button variant="primary" className="flex-1" onClick={() => { updateClient(editingClient.id, editingClient); setEditingClient(null); }}>Save Changes</Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  )

  // Recent comparisons for history
  const [recentLogComparisons] = useState([
    { id: 1, logFile: "trading_log_20250301.log", specFile: "FIX44_Custom.xml", date: "2025-03-01 14:30", issues: 12 },
    { id: 2, logFile: "session_20250228.log", specFile: "FIX42_Standard.xml", date: "2025-02-28 09:15", issues: 5 },
    { id: 3, logFile: "orders_20250227.log", specFile: "FIX44_Custom.xml", date: "2025-02-27 16:45", issues: 23 },
  ])

  // Log Analysis Panel Component
  const LogAnalysisPanel = () => (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-[#0a1628]"}`}>Log Analysis</h2>
          <p className={`text-sm ${isDarkMode ? "text-[#64b5f6]" : "text-[#64748b]"}`}>Compare FIX log files against specifications to find discrepancies</p>
        </div>
        {analysisResults && (
          <div className="flex gap-2">
            <Button variant="secondary" size="sm" onClick={() => navigator.clipboard.writeText(JSON.stringify(analysisResults, null, 2))}>
              <FileText className="mr-1 h-4 w-4" />
              Copy Results
            </Button>
            <Button variant="secondary" size="sm">
              <Download className="mr-1 h-4 w-4" />
              Export PDF
            </Button>
          </div>
        )}
      </div>

      {/* Upload Section with Drag & Drop Style */}
      <Card className="mb-6 p-5">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Log File Upload */}
          <div 
            className={`relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-6 transition-all ${
              logFile 
                ? isDarkMode ? "border-[#4caf50] bg-[#4caf50]/10" : "border-[#4caf50] bg-[#4caf50]/5"
                : isDarkMode ? "border-[#1e4976] hover:border-[#00e5ff] hover:bg-[#1e4976]/30" : "border-[#cbd5e1] hover:border-[#1976d2] hover:bg-[#e2e8f0]"
            }`}
          >
            <Upload className={`mb-3 h-10 w-10 ${logFile ? "text-[#4caf50]" : isDarkMode ? "text-[#64b5f6]" : "text-[#64748b]"}`} />
            <p className={`mb-2 text-sm font-medium ${isDarkMode ? "text-white" : "text-[#0a1628]"}`}>
              {logFile || "Drop Log File Here"}
            </p>
            <p className={`mb-3 text-xs ${isDarkMode ? "text-[#64b5f6]" : "text-[#64748b]"}`}>or click to browse</p>
            <Button variant="secondary" size="sm" onClick={() => handleFileUpload("log-upload")}>
              Select File
            </Button>
            <input type="file" id="log-upload" className="hidden" accept=".log,.txt" onChange={handleLogFileUpload} />
          </div>

          {/* Spec File Upload */}
          <div 
            className={`relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-6 transition-all ${
              logSpecFile 
                ? isDarkMode ? "border-[#4caf50] bg-[#4caf50]/10" : "border-[#4caf50] bg-[#4caf50]/5"
                : isDarkMode ? "border-[#1e4976] hover:border-[#00e5ff] hover:bg-[#1e4976]/30" : "border-[#cbd5e1] hover:border-[#1976d2] hover:bg-[#e2e8f0]"
            }`}
          >
            <FileText className={`mb-3 h-10 w-10 ${logSpecFile ? "text-[#4caf50]" : isDarkMode ? "text-[#64b5f6]" : "text-[#64748b]"}`} />
            <p className={`mb-2 text-sm font-medium ${isDarkMode ? "text-white" : "text-[#0a1628]"}`}>
              {logSpecFile || "Drop FIX Spec Here"}
            </p>
            <p className={`mb-3 text-xs ${isDarkMode ? "text-[#64b5f6]" : "text-[#64748b]"}`}>XML or TXT format</p>
            <Button variant="secondary" size="sm" onClick={() => handleFileUpload("log-spec-upload")}>
              Select File
            </Button>
            <input type="file" id="log-spec-upload" className="hidden" accept=".xml,.txt" onChange={handleLogSpecUpload} />
          </div>

          {/* Action Panel */}
          <div className={`flex flex-col items-center justify-center rounded-xl p-6 ${isDarkMode ? "bg-[#1e4976]/30" : "bg-[#f1f5f9]"}`}>
            <Button 
              variant="primary" 
              className="mb-4 w-full" 
              onClick={performLogAnalysis} 
              disabled={!logFile || !logSpecFile}
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Perform Analysis
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              className="w-full"
              onClick={() => {
                setLogFile("sample_trading.log")
                setLogSpecFile("FIX44_Standard.xml")
                performLogAnalysis()
              }}
            >
              <Play className="mr-1 h-4 w-4" />
              Try Sample Data
            </Button>
          </div>
        </div>
      </Card>

      {/* Empty State - Before Analysis */}
      {!analysisResults && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Recent Comparisons */}
          <Card className="p-5">
            <h3 className={`mb-4 flex items-center gap-2 font-semibold ${isDarkMode ? "text-white" : "text-[#0a1628]"}`}>
              <History className="h-5 w-5" />
              Recent Comparisons
            </h3>
            <div className="space-y-3">
              {recentLogComparisons.map((comp) => (
                <div 
                  key={comp.id}
                  className={`flex items-center justify-between rounded-lg p-3 cursor-pointer transition-all ${
                    isDarkMode ? "bg-[#0a1628] hover:bg-[#1e4976]/50" : "bg-[#f8fafc] hover:bg-[#e2e8f0]"
                  }`}
                  onClick={() => {
                    setLogFile(comp.logFile)
                    setLogSpecFile(comp.specFile)
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${isDarkMode ? "bg-[#1e4976]" : "bg-[#e2e8f0]"}`}>
                      <FileText className={`h-4 w-4 ${isDarkMode ? "text-[#00e5ff]" : "text-[#1976d2]"}`} />
                    </div>
                    <div>
                      <p className={`text-sm font-medium ${isDarkMode ? "text-white" : "text-[#0a1628]"}`}>{comp.logFile}</p>
                      <p className={`text-xs ${isDarkMode ? "text-[#64b5f6]" : "text-[#64748b]"}`}>vs {comp.specFile}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`text-xs font-medium ${comp.issues > 10 ? "text-[#f44336]" : "text-[#ffc107]"}`}>
                      {comp.issues} issues
                    </span>
                    <p className={`text-xs ${isDarkMode ? "text-[#64b5f6]" : "text-[#94a3b8]"}`}>{comp.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* How It Works */}
          <Card className="p-5">
            <h3 className={`mb-4 flex items-center gap-2 font-semibold ${isDarkMode ? "text-white" : "text-[#0a1628]"}`}>
              <HelpCircle className="h-5 w-5" />
              How It Works
            </h3>
            <div className="space-y-4">
              {[
                { step: 1, title: "Upload Log File", desc: "Select your FIX trading log (.log or .txt)" },
                { step: 2, title: "Upload FIX Spec", desc: "Add the specification to validate against" },
                { step: 3, title: "Run Analysis", desc: "System compares and identifies discrepancies" },
                { step: 4, title: "Review Results", desc: "See unsupported messages, tags, and values" },
              ].map((item) => (
                <div key={item.step} className="flex items-start gap-3">
                  <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${isDarkMode ? "bg-[#00e5ff] text-[#0a1628]" : "bg-[#0a1628] text-white"}`}>
                    {item.step}
                  </div>
                  <div>
                    <p className={`text-sm font-medium ${isDarkMode ? "text-white" : "text-[#0a1628]"}`}>{item.title}</p>
                    <p className={`text-xs ${isDarkMode ? "text-[#64b5f6]" : "text-[#64748b]"}`}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* Results Section */}
      {analysisResults && (
        <div className="space-y-6">
          {/* Summary Stats */}
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-[#f44336]/20`}>
                  <AlertTriangle className="h-6 w-6 text-[#f44336]" />
                </div>
                <div>
                  <p className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-[#0a1628]"}`}>
                    {analysisResults.unsupportedMessages.length}
                  </p>
                  <p className={`text-xs ${isDarkMode ? "text-[#64b5f6]" : "text-[#64748b]"}`}>Unsupported Messages</p>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-[#ffc107]/20`}>
                  <FileText className="h-6 w-6 text-[#ffc107]" />
                </div>
                <div>
                  <p className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-[#0a1628]"}`}>
                    {analysisResults.unsupportedTags.reduce((acc, t) => acc + t.tags.length, 0)}
                  </p>
                  <p className={`text-xs ${isDarkMode ? "text-[#64b5f6]" : "text-[#64748b]"}`}>Unsupported Tags</p>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-[#f57c00]/20`}>
                  <AlertTriangle className="h-6 w-6 text-[#f57c00]" />
                </div>
                <div>
                  <p className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-[#0a1628]"}`}>
                    {analysisResults.unsupportedValues.length}
                  </p>
                  <p className={`text-xs ${isDarkMode ? "text-[#64b5f6]" : "text-[#64748b]"}`}>Invalid Values</p>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-[#4caf50]/20`}>
                  <CheckCircle className="h-6 w-6 text-[#4caf50]" />
                </div>
                <div>
                  <p className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-[#0a1628]"}`}>
                    {analysisResults.unsupportedTags.length}
                  </p>
                  <p className={`text-xs ${isDarkMode ? "text-[#64b5f6]" : "text-[#64748b]"}`}>Message Types Checked</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Unsupported Messages */}
          <Card className="p-5">
            <div className="mb-4 flex items-center justify-between">
              <h3 className={`flex items-center gap-2 font-semibold ${isDarkMode ? "text-[#f44336]" : "text-[#d32f2f]"}`}>
                <AlertTriangle className="h-5 w-5" />
                Unsupported Messages
              </h3>
              <span className={`rounded-full px-3 py-1 text-xs font-medium ${isDarkMode ? "bg-[#f44336]/20 text-[#f44336]" : "bg-[#fef2f2] text-[#d32f2f]"}`}>
                {analysisResults.unsupportedMessages.length} found
              </span>
            </div>
            <div className="space-y-2">
              {analysisResults.unsupportedMessages.map((msg, i) => (
                <div key={i} className={`flex items-center gap-3 rounded-lg px-4 py-3 ${isDarkMode ? "bg-[#f44336]/10" : "bg-[#fef2f2]"}`}>
                  <div className="flex h-6 w-6 items-center justify-center rounded bg-[#f44336]/20">
                    <X className="h-4 w-4 text-[#f44336]" />
                  </div>
                  <span className={isDarkMode ? "text-[#90caf9]" : "text-[#0a1628]"}>{msg}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Unsupported Tags - Side by Side View */}
          <Card className="p-5">
            <div className="mb-4 flex items-center justify-between">
              <h3 className={`flex items-center gap-2 font-semibold ${isDarkMode ? "text-[#ffc107]" : "text-[#f57c00]"}`}>
                <AlertTriangle className="h-5 w-5" />
                Unsupported Tags by Message Type
              </h3>
              <select
                className={`rounded-xl border px-4 py-2 text-sm ${isDarkMode ? "border-[#1e4976] bg-[#0a1628] text-white" : "border-[#e2e8f0] bg-white text-[#0a1628]"}`}
                value={selectedAnalysisMsgType || ""}
                onChange={(e) => setSelectedAnalysisMsgType(e.target.value)}
              >
                <option value="">All Message Types</option>
                {analysisResults.unsupportedTags.map((item) => (
                  <option key={item.msgType} value={item.msgType}>MsgType {item.msgType}</option>
                ))}
              </select>
            </div>
            <div className="grid gap-4 lg:grid-cols-2">
              {analysisResults.unsupportedTags
                .filter((item) => !selectedAnalysisMsgType || item.msgType === selectedAnalysisMsgType)
                .map((item, i) => (
                  <div key={i} className={`rounded-xl border p-4 ${isDarkMode ? "border-[#1e4976] bg-[#0a1628]" : "border-[#e2e8f0] bg-[#fffbeb]"}`}>
                    <div className="mb-3 flex items-center justify-between">
                      <span className={`rounded-lg px-3 py-1 text-sm font-semibold ${isDarkMode ? "bg-[#00e5ff]/20 text-[#00e5ff]" : "bg-[#1976d2]/10 text-[#1976d2]"}`}>
                        MsgType {item.msgType}
                      </span>
                      <span className={`text-xs ${isDarkMode ? "text-[#ffc107]" : "text-[#f57c00]"}`}>
                        {item.tags.length} tags
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag, j) => (
                        <span key={j} className={`rounded-lg px-2 py-1 text-xs font-medium ${isDarkMode ? "bg-[#ffc107]/20 text-[#ffc107]" : "bg-[#ffc107]/30 text-[#e65100]"}`}>
                          Tag {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          </Card>

          {/* Unsupported Values - Enhanced Table */}
          <Card className="p-5">
            <div className="mb-4 flex items-center justify-between">
              <h3 className={`flex items-center gap-2 font-semibold ${isDarkMode ? "text-[#f57c00]" : "text-[#e65100]"}`}>
                <AlertTriangle className="h-5 w-5" />
                Unsupported Values
              </h3>
              <span className={`rounded-full px-3 py-1 text-xs font-medium ${isDarkMode ? "bg-[#f57c00]/20 text-[#f57c00]" : "bg-[#fff3e0] text-[#e65100]"}`}>
                {analysisResults.unsupportedValues.length} found
              </span>
            </div>
            <div className="overflow-hidden rounded-xl border ${isDarkMode ? 'border-[#1e4976]' : 'border-[#e2e8f0]'}">
              <table className="w-full">
                <thead>
                  <tr className={isDarkMode ? "bg-[#0d1f3c]" : "bg-[#f8fafc]"}>
                    <th className={`px-4 py-3 text-left text-xs font-semibold ${isDarkMode ? "text-[#64b5f6]" : "text-[#64748b]"}`}>MsgType</th>
                    <th className={`px-4 py-3 text-left text-xs font-semibold ${isDarkMode ? "text-[#64b5f6]" : "text-[#64748b]"}`}>Tag</th>
                    <th className={`px-4 py-3 text-left text-xs font-semibold ${isDarkMode ? "text-[#64b5f6]" : "text-[#64748b]"}`}>Invalid Value</th>
                    <th className={`px-4 py-3 text-left text-xs font-semibold ${isDarkMode ? "text-[#64b5f6]" : "text-[#64748b]"}`}>Severity</th>
                  </tr>
                </thead>
                <tbody>
                  {analysisResults.unsupportedValues.map((item, i) => (
                    <tr key={i} className={`border-t ${isDarkMode ? "border-[#1e4976]" : "border-[#e2e8f0]"} ${i % 2 === 0 ? (isDarkMode ? "bg-[#0f2847]" : "bg-white") : (isDarkMode ? "bg-[#0a1628]" : "bg-[#f8fafc]")}`}>
                      <td className={`px-4 py-3 ${isDarkMode ? "text-white" : "text-[#0a1628]"}`}>
                        <span className={`rounded px-2 py-0.5 text-xs font-medium ${isDarkMode ? "bg-[#1e4976]" : "bg-[#e2e8f0]"}`}>{item.msgType}</span>
                      </td>
                      <td className={`px-4 py-3 font-mono text-sm ${isDarkMode ? "text-[#00e5ff]" : "text-[#1976d2]"}`}>{item.tag}</td>
                      <td className={`px-4 py-3 font-mono text-sm ${isDarkMode ? "text-[#f44336]" : "text-[#d32f2f]"}`}>
                        <span className={`rounded px-2 py-0.5 ${isDarkMode ? "bg-[#f44336]/20" : "bg-[#fef2f2]"}`}>{item.value}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="rounded-full bg-[#f44336]/20 px-2 py-0.5 text-xs font-medium text-[#f44336]">High</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}
    </div>
  )

  // Recent spec comparisons for history
  const [recentSpecComparisons] = useState([
    { id: 1, spec1: "FIX44_BuySide.xml", spec2: "FIX44_SellSide.xml", date: "2025-03-01 11:20", differences: 8 },
    { id: 2, spec1: "FIX42_v1.xml", spec2: "FIX42_v2.xml", date: "2025-02-28 14:45", differences: 3 },
    { id: 3, spec1: "Custom_Spec.xml", spec2: "Standard_FIX44.xml", date: "2025-02-27 09:30", differences: 15 },
  ])

  // Spec Compare Panel Component
  const SpecComparePanel = () => (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-[#0a1628]"}`}>Spec Compare</h2>
          <p className={`text-sm ${isDarkMode ? "text-[#64b5f6]" : "text-[#64748b]"}`}>Compare two FIX specifications to identify differences</p>
        </div>
        {specCompareResults && (
          <div className="flex gap-2">
            <Button variant="secondary" size="sm" onClick={() => navigator.clipboard.writeText(JSON.stringify(specCompareResults, null, 2))}>
              <FileText className="mr-1 h-4 w-4" />
              Copy Results
            </Button>
            <Button variant="secondary" size="sm">
              <Download className="mr-1 h-4 w-4" />
              Export Report
            </Button>
          </div>
        )}
      </div>

      {/* Upload Section with Side-by-Side */}
      <Card className="mb-6 p-5">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-7">
          {/* Spec 1 Upload */}
          <div 
            className={`col-span-3 relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-6 transition-all ${
              spec1File 
                ? isDarkMode ? "border-[#4caf50] bg-[#4caf50]/10" : "border-[#4caf50] bg-[#4caf50]/5"
                : isDarkMode ? "border-[#1e4976] hover:border-[#00e5ff] hover:bg-[#1e4976]/30" : "border-[#cbd5e1] hover:border-[#1976d2] hover:bg-[#e2e8f0]"
            }`}
          >
            <div className={`mb-3 rounded-full p-3 ${spec1File ? "bg-[#4caf50]/20" : isDarkMode ? "bg-[#1e4976]" : "bg-[#e2e8f0]"}`}>
              <FileText className={`h-8 w-8 ${spec1File ? "text-[#4caf50]" : isDarkMode ? "text-[#64b5f6]" : "text-[#64748b]"}`} />
            </div>
            <p className={`mb-1 text-sm font-semibold ${isDarkMode ? "text-white" : "text-[#0a1628]"}`}>
              Specification 1
            </p>
            <p className={`mb-3 text-xs ${spec1File ? "text-[#4caf50]" : isDarkMode ? "text-[#64b5f6]" : "text-[#64748b]"}`}>
              {spec1File || "Drop file or click to browse"}
            </p>
            <Button variant="secondary" size="sm" onClick={() => handleFileUpload("spec1-upload")}>
              {spec1File ? "Change File" : "Select File"}
            </Button>
            <input type="file" id="spec1-upload" className="hidden" accept=".xml,.txt" onChange={handleSpec1Upload} />
          </div>

          {/* Compare Arrow */}
          <div className="col-span-1 flex items-center justify-center">
            <div className={`flex flex-col items-center gap-2`}>
              <GitCompare className={`h-8 w-8 ${isDarkMode ? "text-[#00e5ff]" : "text-[#1976d2]"}`} />
              <span className={`text-xs font-medium ${isDarkMode ? "text-[#64b5f6]" : "text-[#64748b]"}`}>VS</span>
            </div>
          </div>

          {/* Spec 2 Upload */}
          <div 
            className={`col-span-3 relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-6 transition-all ${
              spec2File 
                ? isDarkMode ? "border-[#4caf50] bg-[#4caf50]/10" : "border-[#4caf50] bg-[#4caf50]/5"
                : isDarkMode ? "border-[#1e4976] hover:border-[#00e5ff] hover:bg-[#1e4976]/30" : "border-[#cbd5e1] hover:border-[#1976d2] hover:bg-[#e2e8f0]"
            }`}
          >
            <div className={`mb-3 rounded-full p-3 ${spec2File ? "bg-[#4caf50]/20" : isDarkMode ? "bg-[#1e4976]" : "bg-[#e2e8f0]"}`}>
              <FileText className={`h-8 w-8 ${spec2File ? "text-[#4caf50]" : isDarkMode ? "text-[#64b5f6]" : "text-[#64748b]"}`} />
            </div>
            <p className={`mb-1 text-sm font-semibold ${isDarkMode ? "text-white" : "text-[#0a1628]"}`}>
              Specification 2
            </p>
            <p className={`mb-3 text-xs ${spec2File ? "text-[#4caf50]" : isDarkMode ? "text-[#64b5f6]" : "text-[#64748b]"}`}>
              {spec2File || "Drop file or click to browse"}
            </p>
            <Button variant="secondary" size="sm" onClick={() => handleFileUpload("spec2-upload")}>
              {spec2File ? "Change File" : "Select File"}
            </Button>
            <input type="file" id="spec2-upload" className="hidden" accept=".xml,.txt" onChange={handleSpec2Upload} />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex items-center justify-center gap-4">
          <Button 
            variant="primary" 
            onClick={performSpecCompare} 
            disabled={!spec1File || !spec2File}
          >
            <GitCompare className="mr-2 h-4 w-4" />
            Compare Specifications
          </Button>
          <Button 
            variant="ghost" 
            onClick={() => {
              setSpec1File("FIX44_BuySide.xml")
              setSpec2File("FIX44_SellSide.xml")
              performSpecCompare()
            }}
          >
            <Play className="mr-1 h-4 w-4" />
            Try Sample
          </Button>
        </div>
      </Card>

      {/* Empty State */}
      {!specCompareResults && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Recent Comparisons */}
          <Card className="p-5">
            <h3 className={`mb-4 flex items-center gap-2 font-semibold ${isDarkMode ? "text-white" : "text-[#0a1628]"}`}>
              <History className="h-5 w-5" />
              Recent Comparisons
            </h3>
            <div className="space-y-3">
              {recentSpecComparisons.map((comp) => (
                <div 
                  key={comp.id}
                  className={`flex items-center justify-between rounded-lg p-3 cursor-pointer transition-all ${
                    isDarkMode ? "bg-[#0a1628] hover:bg-[#1e4976]/50" : "bg-[#f8fafc] hover:bg-[#e2e8f0]"
                  }`}
                  onClick={() => {
                    setSpec1File(comp.spec1)
                    setSpec2File(comp.spec2)
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${isDarkMode ? "bg-[#1e4976]" : "bg-[#e2e8f0]"}`}>
                      <GitCompare className={`h-4 w-4 ${isDarkMode ? "text-[#00e5ff]" : "text-[#1976d2]"}`} />
                    </div>
                    <div>
                      <p className={`text-sm font-medium ${isDarkMode ? "text-white" : "text-[#0a1628]"}`}>{comp.spec1}</p>
                      <p className={`text-xs ${isDarkMode ? "text-[#64b5f6]" : "text-[#64748b]"}`}>vs {comp.spec2}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`text-xs font-medium ${comp.differences > 10 ? "text-[#f44336]" : comp.differences > 5 ? "text-[#ffc107]" : "text-[#4caf50]"}`}>
                      {comp.differences} diff{comp.differences !== 1 ? "s" : ""}
                    </span>
                    <p className={`text-xs ${isDarkMode ? "text-[#64b5f6]" : "text-[#94a3b8]"}`}>{comp.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* What Gets Compared */}
          <Card className="p-5">
            <h3 className={`mb-4 flex items-center gap-2 font-semibold ${isDarkMode ? "text-white" : "text-[#0a1628]"}`}>
              <HelpCircle className="h-5 w-5" />
              What Gets Compared
            </h3>
            <div className="space-y-3">
              {[
                { icon: MessageSquare, title: "Message Types", desc: "Supported and required message types" },
                { icon: FileText, title: "Fields & Tags", desc: "Required, optional, and custom tags" },
                { icon: Settings, title: "Field Attributes", desc: "Data types, lengths, and enumerations" },
                { icon: GitCompare, title: "Component Blocks", desc: "Header, trailer, and repeating groups" },
              ].map((item, i) => (
                <div key={i} className={`flex items-start gap-3 rounded-lg p-3 ${isDarkMode ? "bg-[#0a1628]" : "bg-[#f8fafc]"}`}>
                  <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${isDarkMode ? "bg-[#1e4976]" : "bg-[#e2e8f0]"}`}>
                    <item.icon className={`h-4 w-4 ${isDarkMode ? "text-[#00e5ff]" : "text-[#1976d2]"}`} />
                  </div>
                  <div>
                    <p className={`text-sm font-medium ${isDarkMode ? "text-white" : "text-[#0a1628]"}`}>{item.title}</p>
                    <p className={`text-xs ${isDarkMode ? "text-[#64b5f6]" : "text-[#64748b]"}`}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* Results Section */}
      {specCompareResults && (
        <div className="space-y-6">
          {/* Summary Stats */}
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <Card className={`p-4 ${specCompareResults.compatible ? "" : "border-l-4 border-l-[#f44336]"}`}>
              <div className="flex items-center gap-3">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${specCompareResults.compatible ? "bg-[#4caf50]/20" : "bg-[#f44336]/20"}`}>
                  {specCompareResults.compatible 
                    ? <CheckCircle className="h-6 w-6 text-[#4caf50]" />
                    : <AlertTriangle className="h-6 w-6 text-[#f44336]" />
                  }
                </div>
                <div>
                  <p className={`text-sm font-bold ${specCompareResults.compatible ? "text-[#4caf50]" : "text-[#f44336]"}`}>
                    {specCompareResults.compatible ? "Compatible" : "Incompatible"}
                  </p>
                  <p className={`text-xs ${isDarkMode ? "text-[#64b5f6]" : "text-[#64748b]"}`}>Overall Status</p>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-[#f44336]/20`}>
                  <Minus className="h-6 w-6 text-[#f44336]" />
                </div>
                <div>
                  <p className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-[#0a1628]"}`}>
                    {Math.floor(specCompareResults.differences.length / 3)}
                  </p>
                  <p className={`text-xs ${isDarkMode ? "text-[#64b5f6]" : "text-[#64748b]"}`}>Removed</p>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-[#4caf50]/20`}>
                  <Plus className="h-6 w-6 text-[#4caf50]" />
                </div>
                <div>
                  <p className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-[#0a1628]"}`}>
                    {Math.floor(specCompareResults.differences.length / 3)}
                  </p>
                  <p className={`text-xs ${isDarkMode ? "text-[#64b5f6]" : "text-[#64748b]"}`}>Added</p>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-[#ffc107]/20`}>
                  <RefreshCw className="h-6 w-6 text-[#ffc107]" />
                </div>
                <div>
                  <p className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-[#0a1628]"}`}>
                    {specCompareResults.differences.length - Math.floor(specCompareResults.differences.length / 3) * 2}
                  </p>
                  <p className={`text-xs ${isDarkMode ? "text-[#64b5f6]" : "text-[#64748b]"}`}>Modified</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Diff View with Filter */}
          <Card className="p-5">
            <div className="mb-4 flex items-center justify-between">
              <h3 className={`flex items-center gap-2 font-semibold ${isDarkMode ? "text-white" : "text-[#0a1628]"}`}>
                <GitCompare className="h-5 w-5" />
                Differences ({specCompareResults.differences.length})
              </h3>
              <div className="flex items-center gap-3">
                <select
                  className={`rounded-xl border px-4 py-2 text-sm ${isDarkMode ? "border-[#1e4976] bg-[#0a1628] text-white" : "border-[#e2e8f0] bg-white text-[#0a1628]"}`}
                  value={selectedSpecMsgType || ""}
                  onChange={(e) => setSelectedSpecMsgType(e.target.value)}
                >
                  <option value="">All Changes</option>
                  <option value="added">Added Only</option>
                  <option value="removed">Removed Only</option>
                  <option value="modified">Modified Only</option>
                </select>
                <select
                  className={`rounded-xl border px-4 py-2 text-sm ${isDarkMode ? "border-[#1e4976] bg-[#0a1628] text-white" : "border-[#e2e8f0] bg-white text-[#0a1628]"}`}
                >
                  <option value="">All Message Types</option>
                  {msgTypes.map((type) => (
                    <option key={type.code} value={type.code}>MsgType {type.code} - {type.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Visual Diff List */}
            <div className="space-y-2">
              {specCompareResults.differences.map((diff, i) => {
                const diffType = i % 3 === 0 ? "removed" : i % 3 === 1 ? "added" : "modified"
                const colors = {
                  removed: { bg: isDarkMode ? "bg-[#f44336]/10" : "bg-[#fef2f2]", border: "border-l-[#f44336]", icon: Minus, iconColor: "text-[#f44336]" },
                  added: { bg: isDarkMode ? "bg-[#4caf50]/10" : "bg-[#f0fdf4]", border: "border-l-[#4caf50]", icon: Plus, iconColor: "text-[#4caf50]" },
                  modified: { bg: isDarkMode ? "bg-[#ffc107]/10" : "bg-[#fffbeb]", border: "border-l-[#ffc107]", icon: RefreshCw, iconColor: "text-[#ffc107]" },
                }
                const style = colors[diffType]
                const Icon = style.icon
                
                return (
                  <div key={i} className={`flex items-start gap-3 rounded-lg border-l-4 px-4 py-3 ${style.bg} ${style.border}`}>
                    <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded ${style.bg}`}>
                      <Icon className={`h-4 w-4 ${style.iconColor}`} />
                    </div>
                    <div className="flex-1">
                      <span className={isDarkMode ? "text-[#90caf9]" : "text-[#0a1628]"}>{diff}</span>
                    </div>
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium capitalize ${
                      diffType === "removed" ? "bg-[#f44336]/20 text-[#f44336]" :
                      diffType === "added" ? "bg-[#4caf50]/20 text-[#4caf50]" :
                      "bg-[#ffc107]/20 text-[#ffc107]"
                    }`}>
                      {diffType}
                    </span>
                  </div>
                )
              })}
            </div>
          </Card>
        </div>
      )}
    </div>
  )

  // Test Cases Panel Component
  const TestCasesPanel = () => {
    const filteredTestCases = testCases.filter((tc) => {
      const matchesSearch = tc.name.toLowerCase().includes(testCaseFilter.toLowerCase()) || tc.id.toLowerCase().includes(testCaseFilter.toLowerCase())
      const matchesMsgType = !testCaseMsgTypeFilter || tc.msgType === testCaseMsgTypeFilter
      return matchesSearch && matchesMsgType
    })

    return (
      <div className="p-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-[#0a1628]"}`}>Test Cases</h2>
          <Button variant="primary" onClick={generateTestCases}>
            <TestTube className="mr-2 h-4 w-4" />
            Generate New Test Cases
          </Button>
        </div>

        {/* Upload Section */}
        <Card className="mb-6 p-5">
          <h3 className={`mb-4 font-semibold ${isDarkMode ? "text-white" : "text-[#0a1628]"}`}>Generate Test Cases From:</h3>
          <div className="flex gap-4">
            <Button variant="secondary" onClick={() => handleFileUpload("tc-spec-upload")}>
              <FileText className="mr-2 h-4 w-4" />
              Upload FIX Spec
            </Button>
            <input type="file" id="tc-spec-upload" className="hidden" accept=".xml,.txt" />
            <Button variant="secondary" onClick={() => handleFileUpload("tc-log-upload")}>
              <Upload className="mr-2 h-4 w-4" />
              Upload Log File
            </Button>
            <input type="file" id="tc-log-upload" className="hidden" accept=".log,.txt" />
          </div>
        </Card>

        {/* Filters */}
        <Card className="mb-6 p-5">
          <div className="flex items-center gap-4">
            <div className={`flex flex-1 items-center gap-2 rounded-xl border px-3 py-2 ${isDarkMode ? "border-[#1e4976] bg-[#0a1628]" : "border-[#e2e8f0] bg-white"}`}>
              <Search className={`h-4 w-4 ${isDarkMode ? "text-[#64b5f6]" : "text-[#64748b]"}`} />
              <input
                type="text"
                placeholder="Search test cases..."
                value={testCaseFilter}
                onChange={(e) => setTestCaseFilter(e.target.value)}
                className={`flex-1 bg-transparent text-sm outline-none ${isDarkMode ? "text-white placeholder-[#64748b]" : "text-[#0a1628] placeholder-[#94a3b8]"}`}
              />
            </div>
            <select
              className={`rounded-xl border px-4 py-2.5 text-sm ${isDarkMode ? "border-[#1e4976] bg-[#0a1628] text-white" : "border-[#e2e8f0] bg-white text-[#0a1628]"}`}
              value={testCaseMsgTypeFilter}
              onChange={(e) => setTestCaseMsgTypeFilter(e.target.value)}
            >
              <option value="">All Message Types</option>
              {msgTypes.map((type) => (
                <option key={type.code} value={type.code}>{type.code} - {type.name}</option>
              ))}
            </select>
            <Button variant="ghost">
              <Filter className="mr-2 h-4 w-4" />
              More Filters
            </Button>
          </div>
        </Card>

        {/* Test Cases List */}
        <div className="space-y-3">
          {filteredTestCases.map((tc) => (
            <Card key={tc.id} hover className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                      tc.status === "passed" ? "bg-[#4caf50]/20" : tc.status === "failed" ? "bg-[#f44336]/20" : "bg-[#ffc107]/20"
                    }`}
                  >
                    {tc.status === "passed" ? (
                      <CheckCircle className="h-5 w-5 text-[#4caf50]" />
                    ) : tc.status === "failed" ? (
                      <X className="h-5 w-5 text-[#f44336]" />
                    ) : (
                      <Clock className="h-5 w-5 text-[#ffc107]" />
                    )}
                  </div>
                  <div>
                    <h4 className={`font-medium ${isDarkMode ? "text-white" : "text-[#0a1628]"}`}>{tc.name}</h4>
                    <p className={`text-sm ${isDarkMode ? "text-[#90caf9]" : "text-[#64748b]"}`}>
                      {tc.id} | MsgType: {tc.msgType} | Tags: {tc.tags.join(", ")}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  // History Panel Component
  const HistoryPanel = () => (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-[#0a1628]"}`}>History</h2>
        <Button variant="outline" size="sm" onClick={() => setHistory([])}>
          Clear History
        </Button>
      </div>

      <div className="space-y-3">
        {history.map((entry) => (
          <Card key={entry.id} className="p-4">
            <div className="flex items-start gap-4">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                  entry.status === "success" ? "bg-[#4caf50]/20" : entry.status === "error" ? "bg-[#f44336]/20" : "bg-[#ffc107]/20"
                }`}
              >
                {entry.status === "success" ? (
                  <CheckCircle className="h-5 w-5 text-[#4caf50]" />
                ) : entry.status === "error" ? (
                  <X className="h-5 w-5 text-[#f44336]" />
                ) : (
                  <AlertTriangle className="h-5 w-5 text-[#ffc107]" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className={`font-medium ${isDarkMode ? "text-white" : "text-[#0a1628]"}`}>{entry.action}</h4>
                  <span className={`text-xs ${isDarkMode ? "text-[#64b5f6]" : "text-[#64748b]"}`}>{entry.timestamp}</span>
                </div>
                <p className={`mt-1 text-sm ${isDarkMode ? "text-[#90caf9]" : "text-[#64748b]"}`}>{entry.details}</p>
              </div>
            </div>
          </Card>
        ))}
        {history.length === 0 && (
          <div className={`py-12 text-center ${isDarkMode ? "text-[#64b5f6]" : "text-[#64748b]"}`}>
            <History className="mx-auto mb-4 h-12 w-12 opacity-50" />
            <p>No history yet</p>
          </div>
        )}
      </div>
    </div>
  )

  // Alerts Panel Component
  const AlertsPanel = () => (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-[#0a1628]"}`}>Alerts</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => setAlerts(alerts.map((a) => ({ ...a, resolved: true })))}>
            Mark All Resolved
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        {alerts.filter((a) => !a.resolved).map((alert) => (
          <Card key={alert.id} className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                    alert.type === "error" ? "bg-[#f44336]/20" : alert.type === "warning" ? "bg-[#ffc107]/20" : "bg-[#2196f3]/20"
                  }`}
                >
                  <AlertTriangle className={`h-5 w-5 ${alert.type === "error" ? "text-[#f44336]" : alert.type === "warning" ? "text-[#ffc107]" : "text-[#2196f3]"}`} />
                </div>
                <div>
                  <p className={`font-medium ${isDarkMode ? "text-white" : "text-[#0a1628]"}`}>{alert.message}</p>
                  <p className={`mt-1 text-xs ${isDarkMode ? "text-[#64b5f6]" : "text-[#64748b]"}`}>{alert.timestamp}</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setAlerts(alerts.map((a) => (a.id === alert.id ? { ...a, resolved: true } : a)))}
              >
                Resolve
              </Button>
            </div>
          </Card>
        ))}
        {alerts.filter((a) => !a.resolved).length === 0 && (
          <div className={`py-12 text-center ${isDarkMode ? "text-[#64b5f6]" : "text-[#64748b]"}`}>
            <Bell className="mx-auto mb-4 h-12 w-12 opacity-50" />
            <p>No active alerts</p>
          </div>
        )}

        {alerts.filter((a) => a.resolved).length > 0 && (
          <>
            <h3 className={`mt-8 mb-4 text-sm font-semibold ${isDarkMode ? "text-[#64b5f6]" : "text-[#64748b]"}`}>Resolved Alerts</h3>
            {alerts.filter((a) => a.resolved).map((alert) => (
              <Card key={alert.id} className="p-4 opacity-60">
                <div className="flex items-start gap-4">
                  <CheckCircle className="h-5 w-5 text-[#4caf50]" />
                  <div>
                    <p className={`font-medium line-through ${isDarkMode ? "text-white" : "text-[#0a1628]"}`}>{alert.message}</p>
                    <p className={`mt-1 text-xs ${isDarkMode ? "text-[#64b5f6]" : "text-[#64748b]"}`}>{alert.timestamp}</p>
                  </div>
                </div>
              </Card>
            ))}
          </>
        )}
      </div>
    </div>
  )

  // Dashboard sorting state
  const [dashboardSortBy, setDashboardSortBy] = useState<"name" | "progress" | "status">("name")
  const [dashboardSortOrder, setDashboardSortOrder] = useState<"asc" | "desc">("asc")
  const [dashboardStatusFilter, setDashboardStatusFilter] = useState<"all" | "active" | "inactive">("all")
  const [showULTestCasesModal, setShowULTestCasesModal] = useState<Client | null>(null)

  // Sort and filter clients for dashboard
  const getDashboardProgressCount = (client: Client) => {
    let count = 0
    if (client.progress.specComparison === "done") count++
    if (client.progress.logComparison === "done") count++
    if (client.progress.testCaseGeneration === "done") count++
    if (client.progress.conductorConnectivity === "connected") count++
    if (client.progress.verifixConnectivity === "licensed") count++
    if (client.progress.ulTestCases === "generated") count++
    return count
  }

  const sortedDashboardClients = [...clients]
    .filter(c => dashboardStatusFilter === "all" || c.status === dashboardStatusFilter)
    .sort((a, b) => {
      let comparison = 0
      if (dashboardSortBy === "name") {
        comparison = a.name.localeCompare(b.name)
      } else if (dashboardSortBy === "progress") {
        comparison = getDashboardProgressCount(b) - getDashboardProgressCount(a)
      } else if (dashboardSortBy === "status") {
        comparison = a.status.localeCompare(b.status)
      }
      return dashboardSortOrder === "asc" ? comparison : -comparison
    })

  // Dashboard Panel (default)
  const DashboardPanel = () => (
    <div className="p-6">
      {/* Client Work Progress Section */}
      <div className="mb-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-[#0a1628]"}`}>Client Work Progress</h2>
          <div className="flex items-center gap-3">
            <select
              value={dashboardSortBy}
              onChange={(e) => setDashboardSortBy(e.target.value as "name" | "progress" | "status")}
              className={`rounded-lg border px-3 py-1.5 text-xs ${isDarkMode ? "border-[#1e4976] bg-[#0a1628] text-white" : "border-[#e2e8f0] bg-white text-[#0a1628]"}`}
            >
              <option value="name">Sort by Name</option>
              <option value="progress">Sort by Progress</option>
              <option value="status">Sort by Status</option>
            </select>
            <select
              value={dashboardSortOrder}
              onChange={(e) => setDashboardSortOrder(e.target.value as "asc" | "desc")}
              className={`rounded-lg border px-3 py-1.5 text-xs ${isDarkMode ? "border-[#1e4976] bg-[#0a1628] text-white" : "border-[#e2e8f0] bg-white text-[#0a1628]"}`}
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
            <select
              value={dashboardStatusFilter}
              onChange={(e) => setDashboardStatusFilter(e.target.value as "all" | "active" | "inactive")}
              className={`rounded-lg border px-3 py-1.5 text-xs ${isDarkMode ? "border-[#1e4976] bg-[#0a1628] text-white" : "border-[#e2e8f0] bg-white text-[#0a1628]"}`}
            >
              <option value="all">All Status</option>
              <option value="active">Active Only</option>
              <option value="inactive">Inactive Only</option>
            </select>
            <Button variant="ghost" size="sm" onClick={() => setActiveSidebarItem("clients")}>
              View All Clients
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {/* Progress Table */}
        <Card className="overflow-hidden">
          <div className={`overflow-x-auto`}>
            <table className="w-full">
              <thead>
                <tr className={`border-b ${isDarkMode ? "border-[#1e4976] bg-[#0d1f3c]" : "border-[#e2e8f0] bg-[#f8fafc]"}`}>
                  <th className={`px-4 py-3 text-left text-xs font-semibold ${isDarkMode ? "text-[#90caf9]" : "text-[#64748b]"}`}>Client</th>
                  <th className={`px-4 py-3 text-left text-xs font-semibold ${isDarkMode ? "text-[#90caf9]" : "text-[#64748b]"}`}>FIX Spec Comparison</th>
                  <th className={`px-4 py-3 text-left text-xs font-semibold ${isDarkMode ? "text-[#90caf9]" : "text-[#64748b]"}`}>Log Comparison</th>
                  <th className={`px-4 py-3 text-left text-xs font-semibold ${isDarkMode ? "text-[#90caf9]" : "text-[#64748b]"}`}>Test Case Generation</th>
                  <th className={`px-4 py-3 text-left text-xs font-semibold ${isDarkMode ? "text-[#90caf9]" : "text-[#64748b]"}`}>Conductor Connectivity</th>
                  <th className={`px-4 py-3 text-left text-xs font-semibold ${isDarkMode ? "text-[#90caf9]" : "text-[#64748b]"}`}>Verifix Connectivity</th>
                  <th className={`px-4 py-3 text-left text-xs font-semibold ${isDarkMode ? "text-[#90caf9]" : "text-[#64748b]"}`}>UL Test Cases</th>
                </tr>
              </thead>
              <tbody>
                {sortedDashboardClients.map((client, idx) => (
                  <tr 
                    key={client.id} 
                    className={`border-b transition-colors ${
                      isDarkMode 
                        ? `border-[#1e4976] ${idx % 2 === 0 ? "bg-[#0f2847]" : "bg-[#0a1628]"} hover:bg-[#1e4976]/50` 
                        : `border-[#e2e8f0] ${idx % 2 === 0 ? "bg-white" : "bg-[#f8fafc]"} hover:bg-[#e2e8f0]/50`
                    }`}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${isDarkMode ? "bg-[#1e4976]" : "bg-[#e2e8f0]"}`}>
                          <Building2 className={`h-4 w-4 ${isDarkMode ? "text-[#00e5ff]" : "text-[#0a1628]"}`} />
                        </div>
                        <div>
                          <p className={`font-medium ${isDarkMode ? "text-white" : "text-[#0a1628]"}`}>{client.name}</p>
                          <span className={`text-xs ${client.status === "active" ? "text-[#4caf50]" : "text-[#f57c00]"}`}>{client.status}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3"><ProgressBadge status={client.progress.specComparison} /></td>
                    <td className="px-4 py-3"><ProgressBadge status={client.progress.logComparison} /></td>
                    <td className="px-4 py-3"><ProgressBadge status={client.progress.testCaseGeneration} /></td>
                    <td className="px-4 py-3"><ConnectivityBadge status={client.progress.conductorConnectivity} /></td>
                    <td className="px-4 py-3"><LicenseBadge status={client.progress.verifixConnectivity} /></td>
                    <td className="px-4 py-3">
                      <ULTestCasesBadge 
                        status={client.progress.ulTestCases} 
                        count={client.progress.ulTestCasesCount}
                        onClick={() => setShowULTestCasesModal(client)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* UL Test Cases Modal */}
      {showULTestCasesModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <Card className="w-full max-w-2xl p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className={`text-lg font-semibold ${isDarkMode ? "text-white" : "text-[#0a1628]"}`}>
                UL Test Cases - {showULTestCasesModal.name}
              </h3>
              <button onClick={() => setShowULTestCasesModal(null)} className={`rounded-lg p-2 ${isDarkMode ? "hover:bg-[#1e4976]" : "hover:bg-[#f1f5f9]"}`}>
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className={`rounded-xl p-4 ${isDarkMode ? "bg-[#0a1628]" : "bg-[#f8fafc]"}`}>
              <p className={`mb-3 text-sm ${isDarkMode ? "text-[#90caf9]" : "text-[#64748b]"}`}>
                Total Test Cases: <span className="font-semibold text-[#4caf50]">{showULTestCasesModal.progress.ulTestCasesCount || 0}</span>
              </p>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {Array.from({ length: Math.min(showULTestCasesModal.progress.ulTestCasesCount || 0, 10) }).map((_, i) => (
                  <div key={i} className={`flex items-center justify-between rounded-lg p-3 ${isDarkMode ? "bg-[#0d1f3c]" : "bg-white border border-[#e2e8f0]"}`}>
                    <div className="flex items-center gap-3">
                      <TestTube className={`h-4 w-4 ${isDarkMode ? "text-[#00e5ff]" : "text-[#1976d2]"}`} />
                      <span className={`text-sm ${isDarkMode ? "text-white" : "text-[#0a1628]"}`}>Test Case #{i + 1} - Message Type {["D", "8", "F", "G", "A"][i % 5]}</span>
                    </div>
                    <span className="rounded-full bg-[#4caf50]/20 px-2 py-0.5 text-xs text-[#4caf50]">Passed</span>
                  </div>
                ))}
              </div>
              {(showULTestCasesModal.progress.ulTestCasesCount || 0) > 10 && (
                <p className={`mt-3 text-center text-xs ${isDarkMode ? "text-[#64b5f6]" : "text-[#64748b]"}`}>
                  Showing 10 of {showULTestCasesModal.progress.ulTestCasesCount} test cases
                </p>
              )}
            </div>
            <div className="mt-4 flex gap-3">
              <Button variant="secondary" className="flex-1" onClick={() => setShowULTestCasesModal(null)}>Close</Button>
              <Button variant="primary" className="flex-1">Export Test Cases</Button>
            </div>
          </Card>
        </div>
      )}

      {/* Tools Grid */}
      <h2 className={`mb-4 text-xl font-bold ${isDarkMode ? "text-white" : "text-[#0a1628]"}`}>Quick Tools</h2>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ToolPanel
          title="FIX Spec Compare"
          icon={GitCompare}
          buttons={[
            { label: "Select Spec 1", action: () => handleFileUpload("spec1"), icon: FileText },
            { label: "Select Spec 2", action: () => handleFileUpload("spec2"), icon: FileText },
            { label: "Check Compatibility", action: () => callServerEndpoint("check-compatibility"), icon: FileCheck },
            { label: "Compare Specs", action: () => { setActiveSidebarItem("spec-compare"); performSpecCompare(); }, primary: true, icon: GitCompare },
          ]}
        />
        <input type="file" id="spec1" className="hidden" accept=".xml,.txt" onChange={handleSpec1Upload} />
        <input type="file" id="spec2" className="hidden" accept=".xml,.txt" onChange={handleSpec2Upload} />

        <ToolPanel
          title="FIX Logs & Spec Compare"
          icon={FileCheck}
          buttons={[
            { label: "Select FIX Spec", action: () => handleFileUpload("fix-spec"), icon: FileText },
            { label: "Select Log File", action: () => handleFileUpload("log-file"), icon: FileText },
            { label: "Check Compatibility", action: () => callServerEndpoint("check-log-compatibility"), icon: FileCheck },
            { label: "Find Differences", action: () => { setActiveSidebarItem("log-analysis"); performLogAnalysis(); }, primary: true, icon: GitCompare },
          ]}
        />
        <input type="file" id="fix-spec" className="hidden" accept=".xml,.txt" onChange={handleLogSpecUpload} />
        <input type="file" id="log-file" className="hidden" accept=".log,.txt" onChange={handleLogFileUpload} />

        <ToolPanel
          title="FIX Message Generator"
          icon={MessageSquare}
          buttons={[
            { label: "Select FIX Spec", action: () => handleFileUpload("gen-spec"), icon: FileText },
            { label: "Change Tag Values", action: () => setShowTagEditor(true), icon: Settings },
            { label: "Select MsgType", action: () => setShowMsgTypeDropdown(true), icon: FileText },
            { label: "Generate FIX Msg", action: () => callServerEndpoint("generate-fix-msg"), primary: true, icon: MessageSquare },
          ]}
        />
        <input type="file" id="gen-spec" className="hidden" accept=".xml,.txt" />

        <ToolPanel
          title="Generate Test Cases"
          icon={TestTube}
          buttons={[
            { label: "Select FIX Spec", action: () => handleFileUpload("test-spec"), icon: FileText },
            { label: "Select Log File", action: () => handleFileUpload("test-log"), icon: FileText },
            { label: "Select Coverage", action: () => alert("Coverage options: Full, Partial, Minimal"), icon: FileCheck },
            { label: "Generate Tests", action: () => { setActiveSidebarItem("test-cases"); generateTestCases(); }, primary: true, icon: TestTube },
          ]}
        />
        <input type="file" id="test-spec" className="hidden" accept=".xml,.txt" />
        <input type="file" id="test-log" className="hidden" accept=".log,.txt" />
      </div>
    </div>
  )

  // Modern Tool Panel Component
  const ToolPanel = ({
    title,
    icon: Icon,
    buttons,
  }: {
    title: string
    icon: React.ElementType
    buttons: { label: string; action: () => void; primary?: boolean; icon?: React.ElementType }[]
  }) => (
    <Card hover className="overflow-hidden">
      <div
        className={`flex items-center gap-3 border-b px-5 py-4 ${
          isDarkMode ? "border-[#1e4976] bg-[#0d1f3c]" : "border-[#e2e8f0] bg-[#f8fafc]"
        }`}
      >
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${
            isDarkMode ? "bg-[#00e5ff]/20 text-[#00e5ff]" : "bg-[#0a1628]/10 text-[#0a1628]"
          }`}
        >
          <Icon className="h-5 w-5" />
        </div>
        <h3 className={`text-lg font-semibold ${isDarkMode ? "text-white" : "text-[#0a1628]"}`}>{title}</h3>
      </div>
      <div className="p-5">
        <div className="grid grid-cols-2 gap-3">
          {buttons.map((btn, index) => {
            const BtnIcon = btn.icon
            return (
              <Button key={index} variant={btn.primary ? "primary" : "secondary"} size="sm" onClick={btn.action} className="justify-start">
                {BtnIcon && <BtnIcon className="mr-2 h-4 w-4" />}
                {btn.label}
              </Button>
            )
          })}
        </div>
      </div>
    </Card>
  )

  // Admin Sidebar Items
  const adminSidebarItems: SidebarItem[] = [
    { icon: LayoutDashboard, label: "Dashboard", id: "dashboard" },
    { icon: GitCompare, label: "Spec Compare", id: "spec-compare" },
    { icon: FileCheck, label: "Log Analysis", id: "log-analysis" },
    { icon: MessageSquare, label: "Message Generator", id: "msg-generator" },
    { icon: TestTube, label: "Test Cases", id: "test-cases" },
    { icon: Users, label: "Clients", id: "clients" },
    { icon: History, label: "History", id: "history" },
    { icon: Bell, label: "Alerts", id: "alerts", badge: alerts.filter((a) => !a.resolved).length },
    { icon: Settings, label: "Settings", id: "settings" },
    { icon: HelpCircle, label: "Help", id: "help" },
  ]

  // Client Sidebar Items
  const clientSidebarItems: SidebarItem[] = [
    { icon: LayoutDashboard, label: "Dashboard", id: "dashboard" },
    { icon: Upload, label: "Upload Specs", id: "upload" },
    { icon: Download, label: "Download Specs", id: "download" },
    { icon: MessageSquare, label: "Generate Message", id: "msg-generator" },
    { icon: History, label: "History", id: "history" },
    { icon: Settings, label: "Settings", id: "settings" },
    { icon: HelpCircle, label: "Help", id: "help" },
  ]

  // Render Active Panel
  const renderActivePanel = () => {
    switch (activeSidebarItem) {
      case "dashboard":
        return <DashboardPanel />
      case "spec-compare":
        return <SpecComparePanel />
      case "log-analysis":
        return <LogAnalysisPanel />
      case "test-cases":
        return <TestCasesPanel />
      case "clients":
        return <ClientsPanel />
      case "history":
        return <HistoryPanel />
      case "alerts":
        return <AlertsPanel />
      default:
        return <DashboardPanel />
    }
  }

  // Home Screen
  const HomeScreen = () => (
    <div className={`min-h-screen p-6 transition-colors ${isDarkMode ? "bg-[#0a1628]" : "bg-[#f8fafc]"}`}>
      <ThemeToggle />

      {/* Header */}
      <div className="mx-auto mb-6 max-w-5xl">
        <div
          className={`rounded-2xl px-8 py-6 text-center shadow-xl ${
            isDarkMode
              ? "bg-gradient-to-r from-[#0d47a1] via-[#00bcd4] to-[#0d47a1] shadow-[#00bcd4]/20"
              : "bg-gradient-to-r from-[#0a1628] via-[#1976d2] to-[#0a1628] shadow-[#0a1628]/20"
          }`}
        >
          <h1 className="text-4xl font-bold tracking-wide text-white drop-shadow-lg">BTCS AI Interface</h1>
          <p className="mt-2 text-sm text-white/80">FIX Protocol Management & Testing Portal</p>
        </div>
      </div>

      {/* Tab Bar */}
      <div className="mx-auto mb-8 flex max-w-5xl justify-center">
        <TabBar />
      </div>

      {/* Login Cards */}
      <div className="mx-auto mb-8 grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2">
        <Card hover className="p-6">
          <Button variant="primary" size="lg" className="mb-6 w-full" onClick={() => handleLogin("admin")}>
            Admin Login
          </Button>
          <ul className="space-y-3">
            {["Compare between FIX Specs", "Compare FIX SPECS vs Log Files", "Create FIX message from Log File", "Create Test Cases from Fix Specs", "Create Test Cases from Log Files"].map(
              (item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <ChevronRight className={`h-4 w-4 ${isDarkMode ? "text-[#00e5ff]" : "text-[#1976d2]"}`} />
                  <span className={isDarkMode ? "text-[#90caf9]" : "text-[#475569]"}>{item}</span>
                </li>
              )
            )}
          </ul>
        </Card>

        <Card hover className="p-6">
          <Button variant="primary" size="lg" className="mb-6 w-full" onClick={() => handleLogin("client")}>
            Client Login
          </Button>
          <ul className="space-y-3">
            {["Upload FIX specs", "Download FIX Spec", "Generate FIX message from Spec"].map((item, i) => (
              <li key={i} className="flex items-center gap-3">
                <ChevronRight className={`h-4 w-4 ${isDarkMode ? "text-[#00e5ff]" : "text-[#1976d2]"}`} />
                <span className={isDarkMode ? "text-[#90caf9]" : "text-[#475569]"}>{item}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Test it Out Section */}
      <Card className="mx-auto max-w-5xl p-6">
        <div
          className={`mb-6 rounded-xl px-6 py-3 text-center ${
            isDarkMode ? "bg-gradient-to-r from-[#0d47a1] to-[#00bcd4]" : "bg-gradient-to-r from-[#0a1628] to-[#1976d2]"
          }`}
        >
          <h2 className="text-xl font-semibold text-white">Test it Out!</h2>
        </div>

        <div className="flex flex-col gap-6 md:flex-row">
          <div className={`flex-1 rounded-xl border p-5 ${isDarkMode ? "border-[#1e4976] bg-[#0a1628]" : "border-[#e2e8f0] bg-[#f8fafc]"}`}>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <Button variant="secondary" className="w-full" onClick={() => handleFileUpload("spec-upload")}>
                  <Upload className="mr-2 h-4 w-4" />
                  Upload FIX Spec
                </Button>
                <input type="file" id="spec-upload" className="hidden" accept=".xml,.txt" onChange={handleSpecUpload} />
                {uploadedSpec && (
                  <span className="mt-2 flex items-center gap-1 text-xs text-[#4caf50]">
                    <span className="inline-block h-2 w-2 rounded-full bg-[#4caf50]"></span>
                    {uploadedSpec}
                  </span>
                )}
              </div>

              <Button variant="secondary" onClick={() => setShowTagEditor(true)}>
                <Settings className="mr-2 h-4 w-4" />
                Change Tag Values
              </Button>

              <div className="relative">
                <Button variant="secondary" className="w-full" onClick={() => setShowMsgTypeDropdown(!showMsgTypeDropdown)}>
                  <FileText className="mr-2 h-4 w-4" />
                  {selectedMsgType ? `MsgType: ${selectedMsgType}` : "Select MsgType"}
                </Button>
                {showMsgTypeDropdown && (
                  <div
                    className={`absolute left-0 top-full z-10 mt-2 w-64 overflow-hidden rounded-xl border shadow-xl ${
                      isDarkMode ? "border-[#1e4976] bg-[#0d1f3c]" : "border-[#e2e8f0] bg-white"
                    }`}
                  >
                    {msgTypes.map((type) => (
                      <button
                        key={type.code}
                        onClick={() => selectMsgType(type.code)}
                        className={`block w-full px-4 py-2.5 text-left text-sm transition-colors ${
                          isDarkMode ? "text-[#90caf9] hover:bg-[#1e4976] hover:text-white" : "text-[#475569] hover:bg-[#f1f5f9] hover:text-[#0a1628]"
                        }`}
                      >
                        {type.code} - {type.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <Button variant="primary" onClick={generateFixMessage}>
                Generate FIX Msg
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className={`rounded-full p-3 ${isDarkMode ? "bg-[#00e5ff]/20 text-[#00e5ff]" : "bg-[#0a1628]/10 text-[#0a1628]"}`}>
              <ChevronRight className="h-6 w-6" />
            </div>
          </div>

          <div className={`flex-1 rounded-xl border p-5 ${isDarkMode ? "border-[#1e4976] bg-[#0a1628]" : "border-[#e2e8f0] bg-[#f8fafc]"}`}>
            <div
              className={`min-h-32 rounded-lg p-4 font-mono text-xs leading-relaxed ${
                isDarkMode ? "bg-[#0d1f3c] text-[#00e5ff]" : "bg-white text-[#0a1628] border border-[#e2e8f0]"
              }`}
            >
              {generatedMessage ||
                "8=FIX.4.2|9=159|35=D|49=SNDR|56=RCV|34=159|52=20251224-19:38:43.158|11=Order13|1=TestAccount|21=3|55=IBM|54=2|60=20251224-19:38:43.158|38=1000|40=2|44=90.00|15=USD|59=0|10=176|"}
            </div>
          </div>
        </div>
      </Card>

      {showTagEditor && <TagEditorModal />}
    </div>
  )

  // Tag Editor Modal Component
  const TagEditorModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <Card className="w-full max-w-md p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className={`text-lg font-semibold ${isDarkMode ? "text-white" : "text-[#0a1628]"}`}>Edit Tag Values</h3>
          <button
            onClick={() => setShowTagEditor(false)}
            className={`rounded-lg p-2 transition-colors ${isDarkMode ? "hover:bg-[#1e4976] text-[#90caf9]" : "hover:bg-[#f1f5f9] text-[#64748b]"}`}
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="max-h-80 space-y-3 overflow-y-auto pr-2">
          {tagValues.map((tag, index) => (
            <div key={index} className="flex items-center gap-3">
              <span className={`w-16 text-sm font-medium ${isDarkMode ? "text-[#00e5ff]" : "text-[#1976d2]"}`}>Tag {tag.tag}</span>
              <input
                type="text"
                value={tag.value}
                onChange={(e) => updateTagValue(index, e.target.value)}
                className={`flex-1 rounded-lg border px-3 py-2 text-sm transition-colors ${
                  isDarkMode
                    ? "border-[#1e4976] bg-[#0a1628] text-white focus:border-[#00e5ff] focus:ring-1 focus:ring-[#00e5ff]"
                    : "border-[#e2e8f0] bg-white text-[#0a1628] focus:border-[#1976d2] focus:ring-1 focus:ring-[#1976d2]"
                }`}
              />
            </div>
          ))}
        </div>
        <Button variant="primary" className="mt-6 w-full" onClick={() => setShowTagEditor(false)}>
          Save Changes
        </Button>
      </Card>
    </div>
  )

  // MsgType Modal Component
  const MsgTypeModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <Card className="w-full max-w-sm p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className={`text-lg font-semibold ${isDarkMode ? "text-white" : "text-[#0a1628]"}`}>Select Message Type</h3>
          <button
            onClick={() => setShowMsgTypeDropdown(false)}
            className={`rounded-lg p-2 transition-colors ${isDarkMode ? "hover:bg-[#1e4976] text-[#90caf9]" : "hover:bg-[#f1f5f9] text-[#64748b]"}`}
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="max-h-60 space-y-1 overflow-y-auto">
          {msgTypes.map((type) => (
            <button
              key={type.code}
              onClick={() => {
                setSelectedMsgType(type.code)
                setShowMsgTypeDropdown(false)
              }}
              className={`block w-full rounded-lg px-4 py-2.5 text-left text-sm transition-colors ${
                isDarkMode ? "text-[#90caf9] hover:bg-[#1e4976] hover:text-white" : "text-[#475569] hover:bg-[#f1f5f9] hover:text-[#0a1628]"
              }`}
            >
              {type.code} - {type.name}
            </button>
          ))}
        </div>
      </Card>
    </div>
  )

  // Admin Tools Screen
  const AdminToolsScreen = () => (
    <div className={`flex min-h-screen transition-colors ${isDarkMode ? "bg-[#0a1628]" : "bg-[#f8fafc]"}`}>
      <Sidebar items={adminSidebarItems} title="FIX Admin" />

      <div className="flex-1 overflow-auto">
        <div
          className={`sticky top-0 z-10 flex items-center justify-between border-b px-6 py-4 ${
            isDarkMode ? "border-[#1e4976] bg-[#0a1628]/95 backdrop-blur" : "border-[#e2e8f0] bg-white/95 backdrop-blur"
          }`}
        >
          <div>
            <h1 className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-[#0a1628]"}`}>Admin Tools</h1>
            <p className={`text-sm ${isDarkMode ? "text-[#90caf9]" : "text-[#64748b]"}`}>FIX Protocol Management Dashboard</p>
          </div>
          <div className="flex items-center gap-3">
            <TabBar />
          </div>
        </div>

        {renderActivePanel()}
      </div>

      {showTagEditor && <TagEditorModal />}
      {showMsgTypeDropdown && <MsgTypeModal />}
    </div>
  )

  // Client Tools Screen
  const ClientToolsScreen = () => (
    <div className={`flex min-h-screen transition-colors ${isDarkMode ? "bg-[#0a1628]" : "bg-[#f8fafc]"}`}>
      <Sidebar items={clientSidebarItems} title="FIX Client" />

      <div className="flex-1 overflow-auto">
        <div
          className={`sticky top-0 z-10 flex items-center justify-between border-b px-6 py-4 ${
            isDarkMode ? "border-[#1e4976] bg-[#0a1628]/95 backdrop-blur" : "border-[#e2e8f0] bg-white/95 backdrop-blur"
          }`}
        >
          <div>
            <h1 className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-[#0a1628]"}`}>Client Tools</h1>
            <p className={`text-sm ${isDarkMode ? "text-[#90caf9]" : "text-[#64748b]"}`}>FIX Specification Management</p>
          </div>
          <div className="flex items-center gap-3">
            <TabBar />
          </div>
        </div>

        {renderActivePanel()}
      </div>

      {showTagEditor && <TagEditorModal />}
      {showMsgTypeDropdown && <MsgTypeModal />}
    </div>
  )

  // Login Modal
  const LoginModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <Card className="w-full max-w-sm p-6">
        <h3 className={`mb-6 text-center text-xl font-semibold ${isDarkMode ? "text-white" : "text-[#0a1628]"}`}>
          Log in as {loginType === "admin" ? "Admin" : "Client"}
        </h3>
        <div className="space-y-4">
          <div>
            <label className={`mb-2 block text-sm font-medium ${isDarkMode ? "text-[#90caf9]" : "text-[#64748b]"}`}>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="AIUser@broadridge.com"
              className={`w-full rounded-xl border px-4 py-3 text-sm transition-colors ${
                isDarkMode
                  ? "border-[#1e4976] bg-[#0a1628] text-white placeholder-[#64748b] focus:border-[#00e5ff] focus:ring-1 focus:ring-[#00e5ff]"
                  : "border-[#e2e8f0] bg-white text-[#0a1628] placeholder-[#94a3b8] focus:border-[#1976d2] focus:ring-1 focus:ring-[#1976d2]"
              }`}
            />
          </div>
          <div>
            <label className={`mb-2 block text-sm font-medium ${isDarkMode ? "text-[#90caf9]" : "text-[#64748b]"}`}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className={`w-full rounded-xl border px-4 py-3 text-sm transition-colors ${
                isDarkMode
                  ? "border-[#1e4976] bg-[#0a1628] text-white placeholder-[#64748b] focus:border-[#00e5ff] focus:ring-1 focus:ring-[#00e5ff]"
                  : "border-[#e2e8f0] bg-white text-[#0a1628] placeholder-[#94a3b8] focus:border-[#1976d2] focus:ring-1 focus:ring-[#1976d2]"
              }`}
            />
          </div>
        </div>
        <div className="mt-6 flex gap-3">
          <Button variant="primary" className="flex-1" onClick={submitLogin}>
            Log In
          </Button>
          <Button variant="outline" className="flex-1" onClick={() => setShowLoginModal(false)}>
            Cancel
          </Button>
        </div>
      </Card>
    </div>
  )

  return (
    <>
      {currentScreen === "home" && <HomeScreen />}
      {currentScreen === "admin-tools" && <AdminToolsScreen />}
      {currentScreen === "client-tools" && <ClientToolsScreen />}
      {showLoginModal && <LoginModal />}
      <StatusToast />
    </>
  )
}
