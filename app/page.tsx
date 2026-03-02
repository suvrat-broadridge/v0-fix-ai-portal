"use client"

import { useState, useEffect } from "react"
import {
  FileImage,
  FileText,
  RefreshCcw,
  RotateCcw,
  FolderOpen,
  Star,
  X,
  Upload,
  ChevronRight,
  Sun,
  Moon,
  Home,
  Settings,
  TestTube,
  FileUp,
} from "lucide-react"

type Screen = "home" | "admin-tools" | "client-tools"
type UserType = "admin" | "client" | null
type Tab = "home" | "projects" | "uploads" | "testcase" | "settings"

interface TagValue {
  tag: string
  value: string
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

  // API call helper
  const callServerEndpoint = async (tool: string) => {
    try {
      const response = await fetch(`http://localhost:5000/run-bat?tool=${tool}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      })
      const data = await response.json()
      if (data.success) {
        alert(`Success: ${data.output}`)
      } else {
        alert(`Error: ${data.error}`)
      }
    } catch {
      console.log(`[v0] Tool triggered: ${tool} (server not running)`)
    }
  }

  // Theme Toggle Button
  const ThemeToggle = () => (
    <button
      onClick={() => setIsDarkMode(!isDarkMode)}
      className={`fixed right-4 top-4 z-50 rounded-full p-3 shadow-lg transition-all ${
        isDarkMode
          ? "bg-[var(--secondary)] text-[var(--intelligent-cyan)] hover:bg-[var(--muted)]"
          : "bg-[var(--deep-blue)] text-[var(--clear-blue)] hover:bg-[var(--broadridge-blue)]"
      }`}
      aria-label="Toggle theme"
    >
      {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  )

  // Tab Bar Component
  const TabBar = ({ showLogout = false }: { showLogout?: boolean }) => {
    const tabs = [
      { id: "home" as Tab, label: "Home", icon: Home },
      { id: "projects" as Tab, label: "Projects", icon: FolderOpen },
      { id: "uploads" as Tab, label: "Uploads", icon: FileUp },
      { id: "testcase" as Tab, label: "TestCase", icon: TestTube },
      { id: "settings" as Tab, label: "Settings", icon: Settings },
    ]

    return (
      <div
        className={`flex items-center gap-1 rounded-t-lg border-b px-2 ${
          isDarkMode
            ? "border-[var(--border)] bg-[var(--card)]"
            : "border-[var(--border)] bg-[var(--secondary)]"
        }`}
      >
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 rounded-t-lg px-4 py-2 text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? isDarkMode
                    ? "bg-[var(--vibrant-blue)] text-white"
                    : "bg-[var(--true-blue)] text-white"
                  : isDarkMode
                    ? "text-[var(--muted-foreground)] hover:bg-[var(--secondary)] hover:text-white"
                    : "text-[var(--foreground)] hover:bg-[var(--card)]"
              }`}
            >
              <Icon className="h-4 w-4" />
              {tab.label}
            </button>
          )
        })}
        {showLogout && (
          <button
            onClick={() => {
              setCurrentScreen("home")
              setLoggedInUser(null)
              setActiveTab("home")
            }}
            className={`ml-auto flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium ${
              isDarkMode
                ? "text-red-400 hover:bg-red-500/20"
                : "text-red-600 hover:bg-red-100"
            }`}
          >
            <X className="h-4 w-4" />
            Logout
          </button>
        )}
      </div>
    )
  }

  // Home Screen
  const HomeScreen = () => (
    <div
      className={`min-h-screen p-6 transition-colors ${
        isDarkMode ? "bg-[var(--background)]" : "bg-[var(--background)]"
      }`}
    >
      <ThemeToggle />

      {/* Header */}
      <div className="mx-auto mb-4 max-w-5xl">
        <div
          className={`rounded-lg px-8 py-4 text-center shadow-lg ${
            isDarkMode
              ? "bg-gradient-to-r from-[var(--true-blue)] via-[var(--intelligent-cyan)] to-[var(--true-blue)] shadow-[var(--intelligent-cyan)]/30"
              : "bg-gradient-to-r from-[var(--true-blue)] via-[var(--vibrant-blue)] to-[var(--true-blue)] shadow-[var(--true-blue)]/30"
          }`}
        >
          <h1 className="text-3xl font-bold tracking-wide text-white drop-shadow-lg">
            BTCS AI Interface
          </h1>
        </div>
      </div>

      {/* Tab Bar */}
      <div className="mx-auto max-w-5xl">
        <TabBar />
      </div>

      {/* Login Cards */}
      <div className="mx-auto mb-8 grid max-w-5xl grid-cols-1 gap-8 pt-6 md:grid-cols-2">
        {/* Admin Login Card */}
        <div
          className={`rounded-lg border-2 p-6 shadow-lg transition-colors ${
            isDarkMode
              ? "border-[var(--border)] bg-[var(--card)] shadow-[var(--vibrant-blue)]/20"
              : "border-[var(--border)] bg-[var(--card)]"
          }`}
        >
          <button
            onClick={() => handleLogin("admin")}
            className={`mb-4 w-full rounded-lg px-6 py-3 text-xl font-semibold text-white shadow-lg transition ${
              isDarkMode
                ? "bg-gradient-to-r from-[var(--true-blue)] to-[var(--vibrant-blue)] shadow-[var(--vibrant-blue)]/30 hover:from-[var(--vibrant-blue)] hover:to-[var(--fresh-blue)]"
                : "bg-gradient-to-r from-[var(--true-blue)] to-[var(--vibrant-blue)] hover:from-[var(--vibrant-blue)] hover:to-[var(--fresh-blue)]"
            }`}
          >
            Admin login
          </button>
          <ul
            className={`space-y-2 ${isDarkMode ? "text-[var(--clear-blue)]" : "text-[var(--deep-blue)]"}`}
          >
            <li className="flex items-center gap-2">
              <ChevronRight
                className={`h-4 w-4 ${isDarkMode ? "text-[var(--intelligent-cyan)]" : "text-[var(--true-blue)]"}`}
              />
              Compare between FIX Specs
            </li>
            <li className="flex items-center gap-2">
              <ChevronRight
                className={`h-4 w-4 ${isDarkMode ? "text-[var(--intelligent-cyan)]" : "text-[var(--true-blue)]"}`}
              />
              Compare FIX SPECS vs Log Files
            </li>
            <li className="flex items-center gap-2">
              <ChevronRight
                className={`h-4 w-4 ${isDarkMode ? "text-[var(--intelligent-cyan)]" : "text-[var(--true-blue)]"}`}
              />
              Create FIX message from Log File
            </li>
            <li className="flex items-center gap-2">
              <ChevronRight
                className={`h-4 w-4 ${isDarkMode ? "text-[var(--intelligent-cyan)]" : "text-[var(--true-blue)]"}`}
              />
              Create Test Cases from Fix Specs
            </li>
            <li className="flex items-center gap-2">
              <ChevronRight
                className={`h-4 w-4 ${isDarkMode ? "text-[var(--intelligent-cyan)]" : "text-[var(--true-blue)]"}`}
              />
              Create Test Cases from Log Files
            </li>
          </ul>
        </div>

        {/* Client Login Card */}
        <div
          className={`rounded-lg border-2 p-6 shadow-lg transition-colors ${
            isDarkMode
              ? "border-[var(--border)] bg-[var(--card)] shadow-[var(--vibrant-blue)]/20"
              : "border-[var(--border)] bg-[var(--card)]"
          }`}
        >
          <button
            onClick={() => handleLogin("client")}
            className={`mb-4 w-full rounded-lg px-6 py-3 text-xl font-semibold text-white shadow-lg transition ${
              isDarkMode
                ? "bg-gradient-to-r from-[var(--true-blue)] to-[var(--vibrant-blue)] shadow-[var(--vibrant-blue)]/30 hover:from-[var(--vibrant-blue)] hover:to-[var(--fresh-blue)]"
                : "bg-gradient-to-r from-[var(--true-blue)] to-[var(--vibrant-blue)] hover:from-[var(--vibrant-blue)] hover:to-[var(--fresh-blue)]"
            }`}
          >
            Client login
          </button>
          <ul
            className={`space-y-2 ${isDarkMode ? "text-[var(--clear-blue)]" : "text-[var(--deep-blue)]"}`}
          >
            <li className="flex items-center gap-2">
              <ChevronRight
                className={`h-4 w-4 ${isDarkMode ? "text-[var(--intelligent-cyan)]" : "text-[var(--true-blue)]"}`}
              />
              Upload FIX specs
            </li>
            <li className="flex items-center gap-2">
              <ChevronRight
                className={`h-4 w-4 ${isDarkMode ? "text-[var(--intelligent-cyan)]" : "text-[var(--true-blue)]"}`}
              />
              Download FIX Spec
            </li>
            <li className="flex items-center gap-2">
              <ChevronRight
                className={`h-4 w-4 ${isDarkMode ? "text-[var(--intelligent-cyan)]" : "text-[var(--true-blue)]"}`}
              />
              Generate FIX message from Spec
            </li>
          </ul>
        </div>
      </div>

      {/* Test it Out Section */}
      <div
        className={`mx-auto max-w-5xl rounded-lg border-2 p-6 shadow-lg transition-colors ${
          isDarkMode
            ? "border-[var(--border)] bg-[var(--card)] shadow-[var(--vibrant-blue)]/20"
            : "border-[var(--border)] bg-[var(--card)]"
        }`}
      >
        <div
          className={`mb-6 rounded-lg px-6 py-2 text-center ${
            isDarkMode
              ? "bg-gradient-to-r from-[var(--true-blue)] to-[var(--vibrant-blue)]"
              : "bg-gradient-to-r from-[var(--true-blue)] to-[var(--vibrant-blue)]"
          }`}
        >
          <h2 className="text-xl font-semibold text-white">Test it Out!</h2>
        </div>

        <div className="flex flex-col gap-6 md:flex-row">
          {/* Controls */}
          <div
            className={`flex-1 rounded-lg border p-4 ${
              isDarkMode
                ? "border-[var(--border)] bg-[var(--background)]"
                : "border-[var(--border)] bg-white"
            }`}
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <button
                  onClick={() => handleFileUpload("spec-upload")}
                  className={`w-full rounded-lg px-4 py-3 text-sm shadow-md transition ${
                    isDarkMode
                      ? "bg-[var(--secondary)] text-white hover:bg-[var(--muted)]"
                      : "bg-[var(--secondary)] text-[var(--foreground)] hover:bg-[var(--open-blue)] hover:text-white"
                  }`}
                >
                  Upload FIX Spec
                </button>
                <input
                  type="file"
                  id="spec-upload"
                  className="hidden"
                  accept=".xml,.txt"
                  onChange={handleSpecUpload}
                />
                {uploadedSpec && (
                  <span className="mt-1 block text-xs text-[var(--success)]">
                    {uploadedSpec}
                  </span>
                )}
              </div>

              <button
                onClick={() => setShowTagEditor(true)}
                className={`rounded-lg px-4 py-3 text-sm shadow-md transition ${
                  isDarkMode
                    ? "bg-[var(--secondary)] text-white hover:bg-[var(--muted)]"
                    : "bg-[var(--secondary)] text-[var(--foreground)] hover:bg-[var(--open-blue)] hover:text-white"
                }`}
              >
                Change Tag Values
              </button>

              <div className="relative">
                <button
                  onClick={() => setShowMsgTypeDropdown(!showMsgTypeDropdown)}
                  className={`w-full rounded-lg px-4 py-3 text-sm shadow-md transition ${
                    isDarkMode
                      ? "bg-[var(--secondary)] text-white hover:bg-[var(--muted)]"
                      : "bg-[var(--secondary)] text-[var(--foreground)] hover:bg-[var(--open-blue)] hover:text-white"
                  }`}
                >
                  {selectedMsgType ? `MsgType: ${selectedMsgType}` : "Select MsgType"}
                </button>
                {showMsgTypeDropdown && (
                  <div
                    className={`absolute left-0 top-full z-10 mt-1 w-64 rounded-lg border shadow-xl ${
                      isDarkMode
                        ? "border-[var(--border)] bg-[var(--card)]"
                        : "border-[var(--border)] bg-white"
                    }`}
                  >
                    {msgTypes.map((type) => (
                      <button
                        key={type.code}
                        onClick={() => selectMsgType(type.code)}
                        className={`block w-full px-4 py-2 text-left text-sm ${
                          isDarkMode
                            ? "text-[var(--clear-blue)] hover:bg-[var(--secondary)]"
                            : "text-[var(--foreground)] hover:bg-[var(--secondary)]"
                        }`}
                      >
                        {type.code} - {type.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={generateFixMessage}
                className={`rounded-lg px-4 py-3 text-sm font-semibold shadow-md transition ${
                  isDarkMode
                    ? "bg-gradient-to-r from-[var(--true-blue)] to-[var(--vibrant-blue)] text-white hover:from-[var(--vibrant-blue)] hover:to-[var(--fresh-blue)]"
                    : "bg-gradient-to-r from-[var(--true-blue)] to-[var(--vibrant-blue)] text-white hover:from-[var(--vibrant-blue)] hover:to-[var(--fresh-blue)]"
                }`}
              >
                Generate FIX Msg
              </button>
            </div>
          </div>

          {/* Arrow */}
          <div className="flex items-center justify-center">
            <div className={isDarkMode ? "text-[var(--vibrant-blue)]" : "text-[var(--true-blue)]"}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
              </svg>
            </div>
          </div>

          {/* Output */}
          <div
            className={`flex-1 rounded-lg border p-4 ${
              isDarkMode
                ? "border-[var(--border)] bg-[var(--background)]"
                : "border-[var(--border)] bg-white"
            }`}
          >
            <div
              className={`min-h-32 rounded p-3 font-mono text-xs ${
                isDarkMode
                  ? "bg-[var(--card)] text-[var(--intelligent-cyan)]"
                  : "bg-[var(--secondary)] text-[var(--deep-blue)]"
              }`}
            >
              {generatedMessage ||
                "8=FIX.4.2|9=159|35=D|49=SNDR|56=RCV|34=159|52=20251224-19:38:43.158|11=Order13|1=TestAccount|21=3|55=IBM|54=2|60=20251224-19:38:43.158|38=1000|40=2|44=90.00|15=USD|59=0|10=176|"}
            </div>
          </div>
        </div>
      </div>

      {/* Tag Editor Modal */}
      {showTagEditor && <TagEditorModal />}
    </div>
  )

  // Tag Editor Modal Component
  const TagEditorModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div
        className={`w-full max-w-md rounded-lg border-2 p-6 ${
          isDarkMode
            ? "border-[var(--border)] bg-[var(--card)]"
            : "border-[var(--border)] bg-white"
        }`}
      >
        <div className="mb-4 flex items-center justify-between">
          <h3
            className={`text-lg font-semibold ${isDarkMode ? "text-white" : "text-[var(--foreground)]"}`}
          >
            Edit Tag Values
          </h3>
          <button
            onClick={() => setShowTagEditor(false)}
            className={isDarkMode ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-black"}
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="max-h-80 space-y-2 overflow-y-auto">
          {tagValues.map((tag, index) => (
            <div key={index} className="flex items-center gap-2">
              <span
                className={`w-12 text-sm ${isDarkMode ? "text-[var(--clear-blue)]" : "text-[var(--true-blue)]"}`}
              >
                Tag {tag.tag}
              </span>
              <input
                type="text"
                value={tag.value}
                onChange={(e) => updateTagValue(index, e.target.value)}
                className={`flex-1 rounded border px-3 py-1 text-sm ${
                  isDarkMode
                    ? "border-[var(--border)] bg-[var(--background)] text-white"
                    : "border-[var(--border)] bg-white text-[var(--foreground)]"
                }`}
              />
            </div>
          ))}
        </div>
        <button
          onClick={() => setShowTagEditor(false)}
          className={`mt-4 w-full rounded-lg px-4 py-2 text-white ${
            isDarkMode
              ? "bg-[var(--true-blue)] hover:bg-[var(--vibrant-blue)]"
              : "bg-[var(--true-blue)] hover:bg-[var(--vibrant-blue)]"
          }`}
        >
          Save Changes
        </button>
      </div>
    </div>
  )

  // MsgType Modal Component
  const MsgTypeModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div
        className={`w-full max-w-sm rounded-lg border-2 p-6 ${
          isDarkMode
            ? "border-[var(--border)] bg-[var(--card)]"
            : "border-[var(--border)] bg-white"
        }`}
      >
        <div className="mb-4 flex items-center justify-between">
          <h3
            className={`text-lg font-semibold ${isDarkMode ? "text-white" : "text-[var(--foreground)]"}`}
          >
            Select Message Type
          </h3>
          <button
            onClick={() => setShowMsgTypeDropdown(false)}
            className={isDarkMode ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-black"}
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
              className={`block w-full rounded px-4 py-2 text-left text-sm ${
                isDarkMode
                  ? "text-[var(--clear-blue)] hover:bg-[var(--secondary)]"
                  : "text-[var(--foreground)] hover:bg-[var(--secondary)]"
              }`}
            >
              {type.code} - {type.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  )

  // Tool Panel Component
  const ToolPanel = ({
    title,
    buttons,
  }: {
    title: string
    buttons: { label: string; action: () => void; primary?: boolean }[]
  }) => (
    <div
      className={`rounded-lg border-2 p-4 shadow-lg transition-colors ${
        isDarkMode
          ? "border-[var(--border)] bg-[var(--card)] shadow-[var(--vibrant-blue)]/20"
          : "border-[var(--border)] bg-[var(--card)]"
      }`}
    >
      <div
        className={`mb-4 rounded-lg px-4 py-2 text-center ${
          isDarkMode
            ? "bg-gradient-to-r from-[var(--true-blue)] to-[var(--vibrant-blue)]"
            : "bg-gradient-to-r from-[var(--true-blue)] to-[var(--vibrant-blue)]"
        }`}
      >
        <h3 className="text-lg font-semibold italic text-white">{title}</h3>
      </div>
      <div className="flex items-center gap-4">
        <div className="grid flex-1 grid-cols-2 gap-3">
          {buttons.map((btn, index) => (
            <button
              key={index}
              onClick={btn.action}
              className={`rounded-lg px-3 py-2 text-sm font-medium shadow-md transition ${
                btn.primary
                  ? "bg-gradient-to-r from-[var(--true-blue)] to-[var(--vibrant-blue)] text-white hover:from-[var(--vibrant-blue)] hover:to-[var(--fresh-blue)]"
                  : isDarkMode
                    ? "bg-[var(--secondary)] text-white hover:bg-[var(--muted)]"
                    : "bg-[var(--secondary)] text-[var(--foreground)] hover:bg-[var(--open-blue)] hover:text-white"
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>
        <div className={isDarkMode ? "text-[var(--vibrant-blue)]" : "text-[var(--true-blue)]"}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
          </svg>
        </div>
      </div>
    </div>
  )

  // Admin Tools Screen
  const AdminToolsScreen = () => (
    <div
      className={`flex min-h-screen transition-colors ${
        isDarkMode ? "bg-[var(--background)]" : "bg-[var(--background)]"
      }`}
    >
      <ThemeToggle />

      {/* Sidebar */}
      <div
        className={`flex w-14 flex-col items-center gap-4 border-r py-4 ${
          isDarkMode
            ? "border-[var(--border)] bg-[var(--card)]"
            : "border-[var(--border)] bg-[var(--sidebar)]"
        }`}
      >
        <button
          className={`rounded p-2 ${
            isDarkMode
              ? "text-[var(--intelligent-cyan)] hover:bg-[var(--secondary)]"
              : "text-[var(--true-blue)] hover:bg-[var(--secondary)]"
          }`}
        >
          <FileImage className="h-5 w-5" />
        </button>
        <button
          className={`rounded p-2 ${
            isDarkMode
              ? "text-[var(--intelligent-cyan)] hover:bg-[var(--secondary)]"
              : "text-[var(--true-blue)] hover:bg-[var(--secondary)]"
          }`}
        >
          <FileText className="h-5 w-5" />
        </button>
        <button
          className={`rounded p-2 ${
            isDarkMode
              ? "text-[var(--intelligent-cyan)] hover:bg-[var(--secondary)]"
              : "text-[var(--true-blue)] hover:bg-[var(--secondary)]"
          }`}
        >
          <RefreshCcw className="h-5 w-5" />
        </button>
        <button
          className={`rounded p-2 ${
            isDarkMode
              ? "text-[var(--intelligent-cyan)] hover:bg-[var(--secondary)]"
              : "text-[var(--true-blue)] hover:bg-[var(--secondary)]"
          }`}
        >
          <RotateCcw className="h-5 w-5" />
        </button>
        <button
          className={`rounded p-2 ${
            isDarkMode
              ? "text-[var(--intelligent-cyan)] hover:bg-[var(--secondary)]"
              : "text-[var(--true-blue)] hover:bg-[var(--secondary)]"
          }`}
        >
          <FolderOpen className="h-5 w-5" />
        </button>
        <button className="rounded p-2 text-yellow-400 hover:bg-yellow-500/20">
          <Star className="h-5 w-5" />
        </button>
        <div className="mt-auto">
          <button
            onClick={() => {
              setCurrentScreen("home")
              setLoggedInUser(null)
              setActiveTab("home")
            }}
            className="rounded p-2 text-red-400 hover:bg-red-500/20"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Header */}
        <div
          className={`mb-4 rounded-lg px-8 py-4 text-center shadow-lg ${
            isDarkMode
              ? "bg-gradient-to-r from-[var(--true-blue)] via-[var(--intelligent-cyan)] to-[var(--true-blue)] shadow-[var(--intelligent-cyan)]/30"
              : "bg-gradient-to-r from-[var(--true-blue)] via-[var(--vibrant-blue)] to-[var(--true-blue)] shadow-[var(--true-blue)]/30"
          }`}
        >
          <h1 className="text-3xl font-bold tracking-wide text-white">Admin Tools</h1>
        </div>

        {/* Tab Bar */}
        <TabBar showLogout />

        {/* Tool Panels */}
        <div className="grid grid-cols-1 gap-6 pt-6 lg:grid-cols-2">
          {/* FIX Spec Compare */}
          <ToolPanel
            title="FIX Spec Compare"
            buttons={[
              { label: "Select Spec 1", action: () => handleFileUpload("spec1") },
              { label: "Select Spec 2", action: () => handleFileUpload("spec2") },
              { label: "Check Compatibility", action: () => callServerEndpoint("check-compatibility") },
              { label: "Compare Specs", action: () => callServerEndpoint("compare-specs"), primary: true },
            ]}
          />
          <input type="file" id="spec1" className="hidden" accept=".xml,.txt" />
          <input type="file" id="spec2" className="hidden" accept=".xml,.txt" />

          {/* FIX Logs & Spec Compare */}
          <ToolPanel
            title="FIX Logs & Spec Compare"
            buttons={[
              { label: "Select FIX Spec", action: () => handleFileUpload("fix-spec") },
              { label: "Select Log File", action: () => handleFileUpload("log-file") },
              { label: "Check Compatibility", action: () => callServerEndpoint("check-log-compatibility") },
              { label: "Find differences", action: () => callServerEndpoint("find-differences"), primary: true },
            ]}
          />
          <input type="file" id="fix-spec" className="hidden" accept=".xml,.txt" />
          <input type="file" id="log-file" className="hidden" accept=".log,.txt" />

          {/* FIX Msg Generator */}
          <ToolPanel
            title="FIX Msg Generator"
            buttons={[
              { label: "Select FIX Spec", action: () => handleFileUpload("gen-spec") },
              { label: "Change Tag Values", action: () => setShowTagEditor(true) },
              { label: "Select MsgType", action: () => setShowMsgTypeDropdown(true) },
              { label: "Generate FIX Msg", action: () => callServerEndpoint("generate-fix-msg"), primary: true },
            ]}
          />
          <input type="file" id="gen-spec" className="hidden" accept=".xml,.txt" />

          {/* Generate Test Cases */}
          <ToolPanel
            title="Generate Test Cases"
            buttons={[
              { label: "Select FIX Spec", action: () => handleFileUpload("test-spec") },
              { label: "Select Log File", action: () => handleFileUpload("test-log") },
              { label: "Select Coverage", action: () => alert("Coverage options: Full, Partial, Minimal") },
              { label: "Find differences", action: () => callServerEndpoint("generate-tests"), primary: true },
            ]}
          />
          <input type="file" id="test-spec" className="hidden" accept=".xml,.txt" />
          <input type="file" id="test-log" className="hidden" accept=".log,.txt" />
        </div>
      </div>

      {/* Tag Editor Modal */}
      {showTagEditor && <TagEditorModal />}

      {/* MsgType Modal */}
      {showMsgTypeDropdown && <MsgTypeModal />}
    </div>
  )

  // Client Tools Screen
  const ClientToolsScreen = () => (
    <div
      className={`flex min-h-screen transition-colors ${
        isDarkMode ? "bg-[var(--background)]" : "bg-[var(--background)]"
      }`}
    >
      <ThemeToggle />

      {/* Sidebar */}
      <div
        className={`flex w-14 flex-col items-center gap-4 border-r py-4 ${
          isDarkMode
            ? "border-[var(--border)] bg-[var(--card)]"
            : "border-[var(--border)] bg-[var(--sidebar)]"
        }`}
      >
        <button
          className={`rounded p-2 ${
            isDarkMode
              ? "text-[var(--intelligent-cyan)] hover:bg-[var(--secondary)]"
              : "text-[var(--true-blue)] hover:bg-[var(--secondary)]"
          }`}
        >
          <Upload className="h-5 w-5" />
        </button>
        <button
          className={`rounded p-2 ${
            isDarkMode
              ? "text-[var(--intelligent-cyan)] hover:bg-[var(--secondary)]"
              : "text-[var(--true-blue)] hover:bg-[var(--secondary)]"
          }`}
        >
          <FileText className="h-5 w-5" />
        </button>
        <div className="mt-auto">
          <button
            onClick={() => {
              setCurrentScreen("home")
              setLoggedInUser(null)
              setActiveTab("home")
            }}
            className="rounded p-2 text-red-400 hover:bg-red-500/20"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Header */}
        <div
          className={`mb-4 rounded-lg px-8 py-4 text-center shadow-lg ${
            isDarkMode
              ? "bg-gradient-to-r from-[var(--true-blue)] via-[var(--intelligent-cyan)] to-[var(--true-blue)] shadow-[var(--intelligent-cyan)]/30"
              : "bg-gradient-to-r from-[var(--true-blue)] via-[var(--vibrant-blue)] to-[var(--true-blue)] shadow-[var(--true-blue)]/30"
          }`}
        >
          <h1 className="text-3xl font-bold tracking-wide text-white">Client Tools</h1>
        </div>

        {/* Tab Bar */}
        <TabBar showLogout />

        {/* Tool Panels */}
        <div className="grid grid-cols-1 gap-6 pt-6 lg:grid-cols-2">
          {/* Upload FIX Specs */}
          <ToolPanel
            title="Upload FIX Specs"
            buttons={[
              { label: "Browse Files", action: () => handleFileUpload("client-upload") },
              { label: "Upload to Server", action: () => callServerEndpoint("upload-specs"), primary: true },
            ]}
          />
          <input type="file" id="client-upload" className="hidden" accept=".xml,.txt" />

          {/* Download FIX Spec */}
          <ToolPanel
            title="Download FIX Spec"
            buttons={[
              { label: "Select Version", action: () => alert("Versions: FIX 4.0, 4.2, 4.4, 5.0") },
              { label: "Download", action: () => callServerEndpoint("download-spec"), primary: true },
            ]}
          />

          {/* Generate FIX Message */}
          <ToolPanel
            title="Generate FIX Message"
            buttons={[
              { label: "Select FIX Spec", action: () => handleFileUpload("client-gen-spec") },
              { label: "Select MsgType", action: () => setShowMsgTypeDropdown(true) },
              { label: "Change Tag Values", action: () => setShowTagEditor(true) },
              { label: "Generate Message", action: () => callServerEndpoint("generate-message"), primary: true },
            ]}
          />
          <input type="file" id="client-gen-spec" className="hidden" accept=".xml,.txt" />
        </div>
      </div>

      {/* Tag Editor Modal */}
      {showTagEditor && <TagEditorModal />}

      {/* MsgType Modal */}
      {showMsgTypeDropdown && <MsgTypeModal />}
    </div>
  )

  // Login Modal
  const LoginModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div
        className={`w-full max-w-sm rounded-lg border-2 p-6 shadow-2xl ${
          isDarkMode
            ? "border-[var(--border)] bg-[var(--card)]"
            : "border-[var(--border)] bg-white"
        }`}
      >
        <h3
          className={`mb-6 text-center text-lg font-medium ${
            isDarkMode ? "text-white" : "text-[var(--foreground)]"
          }`}
        >
          Log in to AI Portal as {loginType}
        </h3>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <label
              className={`w-20 text-sm ${isDarkMode ? "text-[var(--muted-foreground)]" : "text-gray-600"}`}
            >
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="AIUser@broadridge.com"
              className={`flex-1 rounded border px-3 py-2 text-sm ${
                isDarkMode
                  ? "border-[var(--border)] bg-[var(--background)] text-white placeholder-gray-500"
                  : "border-gray-300 bg-white text-[var(--foreground)]"
              }`}
            />
          </div>
          <div className="flex items-center gap-3">
            <label
              className={`w-20 text-sm ${isDarkMode ? "text-[var(--muted-foreground)]" : "text-gray-600"}`}
            >
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              className={`flex-1 rounded border px-3 py-2 text-sm ${
                isDarkMode
                  ? "border-[var(--border)] bg-[var(--background)] text-white placeholder-gray-500"
                  : "border-gray-300 bg-white text-[var(--foreground)]"
              }`}
            />
          </div>
        </div>
        <div className="mt-6 flex justify-center gap-4">
          <button
            onClick={submitLogin}
            className={`rounded-full border-2 px-6 py-2 text-sm font-medium transition ${
              isDarkMode
                ? "border-[var(--intelligent-cyan)] bg-transparent text-[var(--intelligent-cyan)] hover:bg-[var(--intelligent-cyan)] hover:text-[var(--deep-blue)]"
                : "border-[var(--true-blue)] bg-white text-[var(--true-blue)] hover:bg-[var(--true-blue)] hover:text-white"
            }`}
          >
            Log In
          </button>
          <button
            onClick={() => setShowLoginModal(false)}
            className={`rounded-full border-2 px-6 py-2 text-sm font-medium transition ${
              isDarkMode
                ? "border-gray-500 bg-transparent text-gray-400 hover:bg-gray-700"
                : "border-gray-400 bg-white text-gray-600 hover:bg-gray-100"
            }`}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <>
      {currentScreen === "home" && <HomeScreen />}
      {currentScreen === "admin-tools" && <AdminToolsScreen />}
      {currentScreen === "client-tools" && <ClientToolsScreen />}
      {showLoginModal && <LoginModal />}
    </>
  )
}
