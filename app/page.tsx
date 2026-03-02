"use client"

import { useState } from "react"
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
} from "lucide-react"

type Screen = "home" | "admin-tools" | "client-tools"
type UserType = "admin" | "client" | null

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

  // Home Screen
  const HomeScreen = () => (
    <div className="min-h-screen bg-[#0a1628] p-6">
      {/* Header */}
      <div className="mx-auto mb-8 max-w-5xl">
        <div className="rounded-lg bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 px-8 py-4 text-center shadow-lg shadow-blue-500/30">
          <h1 className="text-3xl font-bold tracking-wide text-white drop-shadow-lg">BTCS AI Interface</h1>
        </div>
      </div>

      {/* Login Cards */}
      <div className="mx-auto mb-8 grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2">
        {/* Admin Login Card */}
        <div className="rounded-lg border-2 border-blue-500/50 bg-[#0d1f3c] p-6 shadow-lg shadow-blue-500/20">
          <button
            onClick={() => handleLogin("admin")}
            className="mb-4 w-full rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-3 text-xl font-semibold text-white shadow-lg shadow-blue-500/30 transition hover:from-blue-500 hover:to-blue-400"
          >
            Admin login
          </button>
          <ul className="space-y-2 text-blue-200">
            <li className="flex items-center gap-2">
              <ChevronRight className="h-4 w-4 text-blue-400" />
              Compare between FIX Specs
            </li>
            <li className="flex items-center gap-2">
              <ChevronRight className="h-4 w-4 text-blue-400" />
              Compare FIX SPECS vs Log Files
            </li>
            <li className="flex items-center gap-2">
              <ChevronRight className="h-4 w-4 text-blue-400" />
              Create FIX message from Log File
            </li>
            <li className="flex items-center gap-2">
              <ChevronRight className="h-4 w-4 text-blue-400" />
              Create Test Cases from Fix Specs
            </li>
            <li className="flex items-center gap-2">
              <ChevronRight className="h-4 w-4 text-blue-400" />
              Create Test Cases from Log Files
            </li>
          </ul>
        </div>

        {/* Client Login Card */}
        <div className="rounded-lg border-2 border-blue-500/50 bg-[#0d1f3c] p-6 shadow-lg shadow-blue-500/20">
          <button
            onClick={() => handleLogin("client")}
            className="mb-4 w-full rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-3 text-xl font-semibold text-white shadow-lg shadow-blue-500/30 transition hover:from-blue-500 hover:to-blue-400"
          >
            Client login
          </button>
          <ul className="space-y-2 text-blue-200">
            <li className="flex items-center gap-2">
              <ChevronRight className="h-4 w-4 text-blue-400" />
              Upload FIX specs
            </li>
            <li className="flex items-center gap-2">
              <ChevronRight className="h-4 w-4 text-blue-400" />
              Download FIX Spec
            </li>
            <li className="flex items-center gap-2">
              <ChevronRight className="h-4 w-4 text-blue-400" />
              Generate FIX message from Spec
            </li>
          </ul>
        </div>
      </div>

      {/* Test it Out Section */}
      <div className="mx-auto max-w-5xl rounded-lg border-2 border-blue-500/50 bg-[#0d1f3c] p-6 shadow-lg shadow-blue-500/20">
        <div className="mb-6 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-2 text-center">
          <h2 className="text-xl font-semibold text-white">Test it Out!</h2>
        </div>

        <div className="flex flex-col gap-6 md:flex-row">
          {/* Controls */}
          <div className="flex-1 rounded-lg border border-blue-500/30 bg-[#0a1628] p-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <button
                  onClick={() => handleFileUpload("spec-upload")}
                  className="w-full rounded-lg bg-[#1a3a5c] px-4 py-3 text-sm text-white shadow-md transition hover:bg-[#234b73]"
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
                {uploadedSpec && <span className="mt-1 block text-xs text-green-400">{uploadedSpec}</span>}
              </div>

              <button
                onClick={() => setShowTagEditor(true)}
                className="rounded-lg bg-[#1a3a5c] px-4 py-3 text-sm text-white shadow-md transition hover:bg-[#234b73]"
              >
                Change Tag Values
              </button>

              <div className="relative">
                <button
                  onClick={() => setShowMsgTypeDropdown(!showMsgTypeDropdown)}
                  className="w-full rounded-lg bg-[#1a3a5c] px-4 py-3 text-sm text-white shadow-md transition hover:bg-[#234b73]"
                >
                  {selectedMsgType ? `MsgType: ${selectedMsgType}` : "Select MsgType"}
                </button>
                {showMsgTypeDropdown && (
                  <div className="absolute left-0 top-full z-10 mt-1 w-64 rounded-lg border border-blue-500/30 bg-[#0d1f3c] shadow-xl">
                    {msgTypes.map((type) => (
                      <button
                        key={type.code}
                        onClick={() => selectMsgType(type.code)}
                        className="block w-full px-4 py-2 text-left text-sm text-blue-200 hover:bg-blue-500/20"
                      >
                        {type.code} - {type.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={generateFixMessage}
                className="rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 px-4 py-3 text-sm font-semibold text-white shadow-md transition hover:from-blue-500 hover:to-blue-400"
              >
                Generate FIX Msg
              </button>
            </div>
          </div>

          {/* Arrow */}
          <div className="flex items-center justify-center">
            <div className="text-blue-500">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
              </svg>
            </div>
          </div>

          {/* Output */}
          <div className="flex-1 rounded-lg border border-blue-500/30 bg-[#0a1628] p-4">
            <div className="min-h-32 rounded bg-[#0d1f3c] p-3 font-mono text-xs text-cyan-300">
              {generatedMessage || "8=FIX.4.2|9=159|35=D|49=SNDR|56=RCV|34=159|52=20251224-19:38:43.158|11=Order13|1=TestAccount|21=3|55=IBM|54=2|60=20251224-19:38:43.158|38=1000|40=2|44=90.00|15=USD|59=0|10=176|"}
            </div>
          </div>
        </div>
      </div>

      {/* Tag Editor Modal */}
      {showTagEditor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="w-full max-w-md rounded-lg border-2 border-blue-500/50 bg-[#0d1f3c] p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Edit Tag Values</h3>
              <button onClick={() => setShowTagEditor(false)} className="text-gray-400 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="max-h-80 space-y-2 overflow-y-auto">
              {tagValues.map((tag, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="w-12 text-sm text-blue-300">Tag {tag.tag}</span>
                  <input
                    type="text"
                    value={tag.value}
                    onChange={(e) => updateTagValue(index, e.target.value)}
                    className="flex-1 rounded border border-blue-500/30 bg-[#0a1628] px-3 py-1 text-sm text-white"
                  />
                </div>
              ))}
            </div>
            <button
              onClick={() => setShowTagEditor(false)}
              className="mt-4 w-full rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-500"
            >
              Save Changes
            </button>
          </div>
        </div>
      )}
    </div>
  )

  // Admin Tools Screen
  const AdminToolsScreen = () => (
    <div className="flex min-h-screen bg-[#0a1628]">
      {/* Sidebar */}
      <div className="flex w-14 flex-col items-center gap-4 border-r border-blue-500/30 bg-[#0d1f3c] py-4">
        <button className="rounded p-2 text-blue-400 hover:bg-blue-500/20">
          <FileImage className="h-5 w-5" />
        </button>
        <button className="rounded p-2 text-blue-400 hover:bg-blue-500/20">
          <FileText className="h-5 w-5" />
        </button>
        <button className="rounded p-2 text-blue-400 hover:bg-blue-500/20">
          <RefreshCcw className="h-5 w-5" />
        </button>
        <button className="rounded p-2 text-blue-400 hover:bg-blue-500/20">
          <RotateCcw className="h-5 w-5" />
        </button>
        <button className="rounded p-2 text-blue-400 hover:bg-blue-500/20">
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
        <div className="mb-8 rounded-lg bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 px-8 py-4 text-center shadow-lg shadow-blue-500/30">
          <h1 className="text-3xl font-bold tracking-wide text-white">Admin Tools</h1>
        </div>

        {/* Tool Panels */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* FIX Spec Compare */}
          <ToolPanel
            title="FIX Spec Compare"
            buttons={[
              { label: "Select Spec 1", action: () => handleFileUpload("spec1") },
              { label: "Select Spec 2", action: () => handleFileUpload("spec2") },
              { label: "Check Compatibility", action: () => callServerEndpoint("create-specs") },
              { label: "Compare Specs", action: () => callServerEndpoint("create-specs"), primary: true },
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
              { label: "Check Compatibility", action: () => callServerEndpoint("create-specs") },
              { label: "Find differences", action: () => callServerEndpoint("create-specs"), primary: true },
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
              { label: "Generate FIX Msg", action: () => callServerEndpoint("create-specs"), primary: true },
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
      {showTagEditor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="w-full max-w-md rounded-lg border-2 border-blue-500/50 bg-[#0d1f3c] p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Edit Tag Values</h3>
              <button onClick={() => setShowTagEditor(false)} className="text-gray-400 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="max-h-80 space-y-2 overflow-y-auto">
              {tagValues.map((tag, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="w-12 text-sm text-blue-300">Tag {tag.tag}</span>
                  <input
                    type="text"
                    value={tag.value}
                    onChange={(e) => updateTagValue(index, e.target.value)}
                    className="flex-1 rounded border border-blue-500/30 bg-[#0a1628] px-3 py-1 text-sm text-white"
                  />
                </div>
              ))}
            </div>
            <button
              onClick={() => setShowTagEditor(false)}
              className="mt-4 w-full rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-500"
            >
              Save Changes
            </button>
          </div>
        </div>
      )}

      {/* MsgType Dropdown */}
      {showMsgTypeDropdown && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="w-full max-w-sm rounded-lg border-2 border-blue-500/50 bg-[#0d1f3c] p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Select Message Type</h3>
              <button onClick={() => setShowMsgTypeDropdown(false)} className="text-gray-400 hover:text-white">
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
                  className="block w-full rounded px-4 py-2 text-left text-sm text-blue-200 hover:bg-blue-500/20"
                >
                  {type.code} - {type.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )

  // Client Tools Screen
  const ClientToolsScreen = () => (
    <div className="flex min-h-screen bg-[#0a1628]">
      {/* Sidebar */}
      <div className="flex w-14 flex-col items-center gap-4 border-r border-blue-500/30 bg-[#0d1f3c] py-4">
        <button className="rounded p-2 text-blue-400 hover:bg-blue-500/20">
          <Upload className="h-5 w-5" />
        </button>
        <button className="rounded p-2 text-blue-400 hover:bg-blue-500/20">
          <FileText className="h-5 w-5" />
        </button>
        <div className="mt-auto">
          <button
            onClick={() => {
              setCurrentScreen("home")
              setLoggedInUser(null)
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
        <div className="mb-8 rounded-lg bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 px-8 py-4 text-center shadow-lg shadow-blue-500/30">
          <h1 className="text-3xl font-bold tracking-wide text-white">Client Tools</h1>
        </div>

        {/* Tool Panels */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Upload FIX Specs */}
          <ToolPanel
            title="Upload FIX Specs"
            buttons={[
              { label: "Browse Files", action: () => handleFileUpload("client-upload") },
              { label: "Upload to Server", action: () => callServerEndpoint("create-specs"), primary: true },
            ]}
          />
          <input type="file" id="client-upload" className="hidden" accept=".xml,.txt" />

          {/* Download FIX Spec */}
          <ToolPanel
            title="Download FIX Spec"
            buttons={[
              { label: "Select Version", action: () => alert("Versions: FIX 4.0, 4.2, 4.4, 5.0") },
              { label: "Download", action: () => alert("Downloading spec..."), primary: true },
            ]}
          />

          {/* Generate FIX Message */}
          <ToolPanel
            title="Generate FIX Message"
            buttons={[
              { label: "Select FIX Spec", action: () => handleFileUpload("client-gen-spec") },
              { label: "Select MsgType", action: () => setShowMsgTypeDropdown(true) },
              { label: "Change Tag Values", action: () => setShowTagEditor(true) },
              { label: "Generate Message", action: () => callServerEndpoint("create-specs"), primary: true },
            ]}
          />
          <input type="file" id="client-gen-spec" className="hidden" accept=".xml,.txt" />
        </div>
      </div>

      {/* Tag Editor Modal */}
      {showTagEditor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="w-full max-w-md rounded-lg border-2 border-blue-500/50 bg-[#0d1f3c] p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Edit Tag Values</h3>
              <button onClick={() => setShowTagEditor(false)} className="text-gray-400 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="max-h-80 space-y-2 overflow-y-auto">
              {tagValues.map((tag, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="w-12 text-sm text-blue-300">Tag {tag.tag}</span>
                  <input
                    type="text"
                    value={tag.value}
                    onChange={(e) => updateTagValue(index, e.target.value)}
                    className="flex-1 rounded border border-blue-500/30 bg-[#0a1628] px-3 py-1 text-sm text-white"
                  />
                </div>
              ))}
            </div>
            <button
              onClick={() => setShowTagEditor(false)}
              className="mt-4 w-full rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-500"
            >
              Save Changes
            </button>
          </div>
        </div>
      )}

      {/* MsgType Dropdown */}
      {showMsgTypeDropdown && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="w-full max-w-sm rounded-lg border-2 border-blue-500/50 bg-[#0d1f3c] p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Select Message Type</h3>
              <button onClick={() => setShowMsgTypeDropdown(false)} className="text-gray-400 hover:text-white">
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
                  className="block w-full rounded px-4 py-2 text-left text-sm text-blue-200 hover:bg-blue-500/20"
                >
                  {type.code} - {type.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
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
    <div className="rounded-lg border-2 border-blue-500/50 bg-[#0d1f3c] p-4 shadow-lg shadow-blue-500/20">
      <div className="mb-4 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 px-4 py-2 text-center">
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
                  ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-500 hover:to-blue-400"
                  : "bg-[#1a3a5c] text-white hover:bg-[#234b73]"
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>
        <div className="text-blue-500">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
          </svg>
        </div>
      </div>
    </div>
  )

  // Login Modal
  const LoginModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="w-full max-w-sm rounded-lg border-2 border-blue-500/50 bg-[#f5f5f5] p-6 shadow-2xl">
        <h3 className="mb-6 text-center text-lg font-medium text-gray-700">
          Log in to AI Portal as {loginType}
        </h3>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <label className="w-20 text-sm text-gray-600">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="AIUser@broadridge.com"
              className="flex-1 rounded border border-gray-300 px-3 py-2 text-sm"
            />
          </div>
          <div className="flex items-center gap-3">
            <label className="w-20 text-sm text-gray-600">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              className="flex-1 rounded border border-gray-300 px-3 py-2 text-sm"
            />
          </div>
        </div>
        <div className="mt-6 flex justify-center gap-4">
          <button
            onClick={submitLogin}
            className="rounded-full border-2 border-blue-500 bg-white px-6 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50"
          >
            Log In
          </button>
          <button
            onClick={() => setShowLoginModal(false)}
            className="rounded-full border-2 border-gray-400 bg-white px-6 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50"
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
