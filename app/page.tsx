"use client"

import { useState, useEffect } from "react"
import {
  FileText,
  FolderOpen,
  X,
  Upload,
  ChevronRight,
  Sun,
  Moon,
  Home,
  Settings,
  TestTube,
  FileUp,
  LayoutDashboard,
  GitCompare,
  MessageSquare,
  FileCheck,
  Download,
  Users,
  History,
  Bell,
  HelpCircle,
  LogOut,
} from "lucide-react"

type Screen = "home" | "admin-tools" | "client-tools"
type UserType = "admin" | "client" | null
type Tab = "home" | "projects" | "uploads" | "testcase" | "settings"

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

export default function FixAIPortal() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("home")
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [loginType, setLoginType] = useState<UserType>(null)
  const [loggedInUser, setLoggedInUser] = useState<UserType>(null)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [activeTab, setActiveTab] = useState<Tab>("home")
  const [activeSidebarItem, setActiveSidebarItem] = useState("dashboard")

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
    }
  }

  const updateTagValue = (index: number, newValue: string) => {
    const newTags = [...tagValues]
    newTags[index].value = newValue
    setTagValues(newTags)
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
      } else {
        setStatusMessage({ type: "error", message: `Error: ${data.error}` })
      }
    } catch {
      console.log(`[v0] Tool triggered: ${tool} (server not running)`)
      setStatusMessage({ type: "warning", message: `Tool "${tool}" triggered (connect server to execute)` })
    }
    // Auto-hide status after 4 seconds
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
    ...props
  }: {
    children: React.ReactNode
    variant?: "primary" | "secondary" | "outline" | "ghost"
    size?: "sm" | "md" | "lg"
    className?: string
    onClick?: () => void
  }) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-all duration-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2"
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
    }

    return (
      <button className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`} {...props}>
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
      {/* Logo/Brand */}
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

      {/* Navigation Items */}
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
              onClick={() => setActiveSidebarItem(item.id)}
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
                <span
                  className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-[#f57c00] px-1.5 text-xs font-semibold text-white"
                >
                  {item.badge}
                </span>
              )}
            </button>
          )
        })}
      </nav>

      {/* Theme Toggle & Logout */}
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
            isDarkMode
              ? "text-[#f44336] hover:bg-[#f44336]/10"
              : "text-[#ef4444] hover:bg-[#fef2f2]"
          }`}
        >
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  )

  // Theme Toggle Button (for home screen)
  const ThemeToggle = () => (
    <button
      onClick={() => setIsDarkMode(!isDarkMode)}
      className={`fixed right-4 top-4 z-50 rounded-xl p-3 shadow-lg transition-all ${
        isDarkMode
          ? "bg-[#1e4976] text-[#00e5ff] hover:bg-[#2a5f8f]"
          : "bg-white text-[#0a1628] hover:bg-[#f1f5f9] shadow-md"
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
      <div
        className={`flex items-center gap-1 rounded-xl p-1.5 ${
          isDarkMode ? "bg-[#0d1f3c]" : "bg-[#e2e8f0]"
        }`}
      >
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

  // Home Screen
  const HomeScreen = () => (
    <div
      className={`min-h-screen p-6 transition-colors ${
        isDarkMode ? "bg-[#0a1628]" : "bg-[#f8fafc]"
      }`}
    >
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
          <h1 className="text-4xl font-bold tracking-wide text-white drop-shadow-lg">
            BTCS AI Interface
          </h1>
          <p className="mt-2 text-sm text-white/80">FIX Protocol Management & Testing Portal</p>
        </div>
      </div>

      {/* Tab Bar */}
      <div className="mx-auto mb-8 flex max-w-5xl justify-center">
        <TabBar />
      </div>

      {/* Login Cards */}
      <div className="mx-auto mb-8 grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2">
        {/* Admin Login Card */}
        <Card hover className="p-6">
          <Button
            variant="primary"
            size="lg"
            className="mb-6 w-full"
            onClick={() => handleLogin("admin")}
          >
            Admin Login
          </Button>
          <ul className="space-y-3">
            {[
              "Compare between FIX Specs",
              "Compare FIX SPECS vs Log Files",
              "Create FIX message from Log File",
              "Create Test Cases from Fix Specs",
              "Create Test Cases from Log Files",
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3">
                <ChevronRight
                  className={`h-4 w-4 ${isDarkMode ? "text-[#00e5ff]" : "text-[#1976d2]"}`}
                />
                <span className={isDarkMode ? "text-[#90caf9]" : "text-[#475569]"}>{item}</span>
              </li>
            ))}
          </ul>
        </Card>

        {/* Client Login Card */}
        <Card hover className="p-6">
          <Button
            variant="primary"
            size="lg"
            className="mb-6 w-full"
            onClick={() => handleLogin("client")}
          >
            Client Login
          </Button>
          <ul className="space-y-3">
            {[
              "Upload FIX specs",
              "Download FIX Spec",
              "Generate FIX message from Spec",
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3">
                <ChevronRight
                  className={`h-4 w-4 ${isDarkMode ? "text-[#00e5ff]" : "text-[#1976d2]"}`}
                />
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
            isDarkMode
              ? "bg-gradient-to-r from-[#0d47a1] to-[#00bcd4]"
              : "bg-gradient-to-r from-[#0a1628] to-[#1976d2]"
          }`}
        >
          <h2 className="text-xl font-semibold text-white">Test it Out!</h2>
        </div>

        <div className="flex flex-col gap-6 md:flex-row">
          {/* Controls */}
          <div
            className={`flex-1 rounded-xl border p-5 ${
              isDarkMode ? "border-[#1e4976] bg-[#0a1628]" : "border-[#e2e8f0] bg-[#f8fafc]"
            }`}
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <Button variant="secondary" className="w-full" onClick={() => handleFileUpload("spec-upload")}>
                  <Upload className="mr-2 h-4 w-4" />
                  Upload FIX Spec
                </Button>
                <input
                  type="file"
                  id="spec-upload"
                  className="hidden"
                  accept=".xml,.txt"
                  onChange={handleSpecUpload}
                />
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
                          isDarkMode
                            ? "text-[#90caf9] hover:bg-[#1e4976] hover:text-white"
                            : "text-[#475569] hover:bg-[#f1f5f9] hover:text-[#0a1628]"
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

          {/* Arrow */}
          <div className="flex items-center justify-center">
            <div
              className={`rounded-full p-3 ${
                isDarkMode ? "bg-[#00e5ff]/20 text-[#00e5ff]" : "bg-[#0a1628]/10 text-[#0a1628]"
              }`}
            >
              <ChevronRight className="h-6 w-6" />
            </div>
          </div>

          {/* Output */}
          <div
            className={`flex-1 rounded-xl border p-5 ${
              isDarkMode ? "border-[#1e4976] bg-[#0a1628]" : "border-[#e2e8f0] bg-[#f8fafc]"
            }`}
          >
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

      {/* Tag Editor Modal */}
      {showTagEditor && <TagEditorModal />}
    </div>
  )

  // Tag Editor Modal Component
  const TagEditorModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <Card className="w-full max-w-md p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className={`text-lg font-semibold ${isDarkMode ? "text-white" : "text-[#0a1628]"}`}>
            Edit Tag Values
          </h3>
          <button
            onClick={() => setShowTagEditor(false)}
            className={`rounded-lg p-2 transition-colors ${
              isDarkMode ? "hover:bg-[#1e4976] text-[#90caf9]" : "hover:bg-[#f1f5f9] text-[#64748b]"
            }`}
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="max-h-80 space-y-3 overflow-y-auto pr-2">
          {tagValues.map((tag, index) => (
            <div key={index} className="flex items-center gap-3">
              <span
                className={`w-16 text-sm font-medium ${isDarkMode ? "text-[#00e5ff]" : "text-[#1976d2]"}`}
              >
                Tag {tag.tag}
              </span>
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
          <h3 className={`text-lg font-semibold ${isDarkMode ? "text-white" : "text-[#0a1628]"}`}>
            Select Message Type
          </h3>
          <button
            onClick={() => setShowMsgTypeDropdown(false)}
            className={`rounded-lg p-2 transition-colors ${
              isDarkMode ? "hover:bg-[#1e4976] text-[#90caf9]" : "hover:bg-[#f1f5f9] text-[#64748b]"
            }`}
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
                isDarkMode
                  ? "text-[#90caf9] hover:bg-[#1e4976] hover:text-white"
                  : "text-[#475569] hover:bg-[#f1f5f9] hover:text-[#0a1628]"
              }`}
            >
              {type.code} - {type.name}
            </button>
          ))}
        </div>
      </Card>
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
        <h3 className={`text-lg font-semibold ${isDarkMode ? "text-white" : "text-[#0a1628]"}`}>
          {title}
        </h3>
      </div>
      <div className="p-5">
        <div className="grid grid-cols-2 gap-3">
          {buttons.map((btn, index) => {
            const BtnIcon = btn.icon
            return (
              <Button
                key={index}
                variant={btn.primary ? "primary" : "secondary"}
                size="sm"
                onClick={btn.action}
                className="justify-start"
              >
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
    { icon: Bell, label: "Alerts", id: "alerts", badge: 5 },
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

  // Admin Tools Screen
  const AdminToolsScreen = () => (
    <div className={`flex min-h-screen transition-colors ${isDarkMode ? "bg-[#0a1628]" : "bg-[#f8fafc]"}`}>
      <Sidebar items={adminSidebarItems} title="FIX Admin" />

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Top Bar */}
        <div
          className={`sticky top-0 z-10 flex items-center justify-between border-b px-6 py-4 ${
            isDarkMode ? "border-[#1e4976] bg-[#0a1628]/95 backdrop-blur" : "border-[#e2e8f0] bg-white/95 backdrop-blur"
          }`}
        >
          <div>
            <h1 className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-[#0a1628]"}`}>
              Admin Tools
            </h1>
            <p className={`text-sm ${isDarkMode ? "text-[#90caf9]" : "text-[#64748b]"}`}>
              FIX Protocol Management Dashboard
            </p>
          </div>
          <div className="flex items-center gap-3">
            <TabBar />
          </div>
        </div>

        {/* Tool Panels */}
        <div className="grid grid-cols-1 gap-6 p-6 lg:grid-cols-2">
          <ToolPanel
            title="FIX Spec Compare"
            icon={GitCompare}
            buttons={[
              { label: "Select Spec 1", action: () => handleFileUpload("spec1"), icon: FileText },
              { label: "Select Spec 2", action: () => handleFileUpload("spec2"), icon: FileText },
              { label: "Check Compatibility", action: () => callServerEndpoint("check-compatibility"), icon: FileCheck },
              { label: "Compare Specs", action: () => callServerEndpoint("compare-specs"), primary: true, icon: GitCompare },
            ]}
          />
          <input type="file" id="spec1" className="hidden" accept=".xml,.txt" />
          <input type="file" id="spec2" className="hidden" accept=".xml,.txt" />

          <ToolPanel
            title="FIX Logs & Spec Compare"
            icon={FileCheck}
            buttons={[
              { label: "Select FIX Spec", action: () => handleFileUpload("fix-spec"), icon: FileText },
              { label: "Select Log File", action: () => handleFileUpload("log-file"), icon: FileText },
              { label: "Check Compatibility", action: () => callServerEndpoint("check-log-compatibility"), icon: FileCheck },
              { label: "Find Differences", action: () => callServerEndpoint("find-differences"), primary: true, icon: GitCompare },
            ]}
          />
          <input type="file" id="fix-spec" className="hidden" accept=".xml,.txt" />
          <input type="file" id="log-file" className="hidden" accept=".log,.txt" />

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
              { label: "Generate Tests", action: () => callServerEndpoint("generate-tests"), primary: true, icon: TestTube },
            ]}
          />
          <input type="file" id="test-spec" className="hidden" accept=".xml,.txt" />
          <input type="file" id="test-log" className="hidden" accept=".log,.txt" />
        </div>
      </div>

      {/* Modals */}
      {showTagEditor && <TagEditorModal />}
      {showMsgTypeDropdown && <MsgTypeModal />}
    </div>
  )

  // Client Tools Screen
  const ClientToolsScreen = () => (
    <div className={`flex min-h-screen transition-colors ${isDarkMode ? "bg-[#0a1628]" : "bg-[#f8fafc]"}`}>
      <Sidebar items={clientSidebarItems} title="FIX Client" />

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Top Bar */}
        <div
          className={`sticky top-0 z-10 flex items-center justify-between border-b px-6 py-4 ${
            isDarkMode ? "border-[#1e4976] bg-[#0a1628]/95 backdrop-blur" : "border-[#e2e8f0] bg-white/95 backdrop-blur"
          }`}
        >
          <div>
            <h1 className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-[#0a1628]"}`}>
              Client Tools
            </h1>
            <p className={`text-sm ${isDarkMode ? "text-[#90caf9]" : "text-[#64748b]"}`}>
              FIX Specification Management
            </p>
          </div>
          <div className="flex items-center gap-3">
            <TabBar />
          </div>
        </div>

        {/* Tool Panels */}
        <div className="grid grid-cols-1 gap-6 p-6 lg:grid-cols-2">
          <ToolPanel
            title="Upload FIX Specs"
            icon={Upload}
            buttons={[
              { label: "Browse Files", action: () => handleFileUpload("client-upload"), icon: FolderOpen },
              { label: "Upload to Server", action: () => callServerEndpoint("upload-specs"), primary: true, icon: Upload },
            ]}
          />
          <input type="file" id="client-upload" className="hidden" accept=".xml,.txt" />

          <ToolPanel
            title="Download FIX Spec"
            icon={Download}
            buttons={[
              { label: "Select Version", action: () => alert("Versions: FIX 4.0, 4.2, 4.4, 5.0"), icon: FileText },
              { label: "Download", action: () => callServerEndpoint("download-spec"), primary: true, icon: Download },
            ]}
          />

          <ToolPanel
            title="Generate FIX Message"
            icon={MessageSquare}
            buttons={[
              { label: "Select FIX Spec", action: () => handleFileUpload("client-gen-spec"), icon: FileText },
              { label: "Select MsgType", action: () => setShowMsgTypeDropdown(true), icon: FileText },
              { label: "Change Tag Values", action: () => setShowTagEditor(true), icon: Settings },
              { label: "Generate Message", action: () => callServerEndpoint("generate-message"), primary: true, icon: MessageSquare },
            ]}
          />
          <input type="file" id="client-gen-spec" className="hidden" accept=".xml,.txt" />
        </div>
      </div>

      {/* Modals */}
      {showTagEditor && <TagEditorModal />}
      {showMsgTypeDropdown && <MsgTypeModal />}
    </div>
  )

  // Login Modal
  const LoginModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <Card className="w-full max-w-sm p-6">
        <h3
          className={`mb-6 text-center text-xl font-semibold ${isDarkMode ? "text-white" : "text-[#0a1628]"}`}
        >
          Log in as {loginType === "admin" ? "Admin" : "Client"}
        </h3>
        <div className="space-y-4">
          <div>
            <label className={`mb-2 block text-sm font-medium ${isDarkMode ? "text-[#90caf9]" : "text-[#64748b]"}`}>
              Username
            </label>
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
            <label className={`mb-2 block text-sm font-medium ${isDarkMode ? "text-[#90caf9]" : "text-[#64748b]"}`}>
              Password
            </label>
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
