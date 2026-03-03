"use client"
/* BControl FIX AI Platform - BTCS Certification Onboarding Network Testing Routing Operations Lifecycle */
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
  ChevronLeft,
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
  LayoutDashboard,
  FileUp,
  LogOut,
  Send,
  Wifi,
  Copy,
} from "lucide-react"

type Screen = "home" | "admin-tools" | "client-tools" | "client-detail" | "workflow-detail"
type WorkflowType = "spec-comparison" | "log-analysis" | "test-case" | "cert-case" | "config-gen" | "alerts" | null
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
  iconColor?: string
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

interface ClientSpec {
  id: string
  name: string
  assetClass: string
  algoType?: string
  version: string
  lastUpdated: string
  specComparison: "done" | "progress" | "pending" | "error"
  logComparison: "done" | "progress" | "pending" | "error"
  testCaseGeneration: "done" | "progress" | "pending" | "error"
  certificationCaseGeneration: "done" | "progress" | "pending" | "error"
  configurationGeneration: "done" | "progress" | "pending" | "error"
  alerts: "generated" | "pending" | "error"
  alertsCount?: number
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
    certificationCaseGeneration: "done" | "progress" | "pending" | "error"
    configurationGeneration: "done" | "progress" | "pending" | "error"
    alerts: "generated" | "pending" | "error"
    alertsCount?: number
  }
  clientSpecs?: ClientSpec[]
}

interface TestCase {
  id: string
  name: string
  msgType: string
  tags: string[]
  status: "passed" | "failed" | "pending"
}



interface SpecCompareResult {
  compatible: boolean
  msgTypeDiffs: {
    spec1Only: string[]
    spec2Only: string[]
  }
  tagDiffs: {
    spec1Missing: { msgType: string; msgName: string; tags: string[] }[]
    spec2Missing: { msgType: string; msgName: string; tags: string[] }[]
  }
  valueDiffs: { msgType: string; tag: string; tagName: string; spec1Values: string[]; spec2Values: string[] }[]
  otherDiffs: { category: string; description: string; spec1: string; spec2: string }[]
}

interface LogAnalysisResult {
  msgTypeDiffs: {
    logOnly: string[]
    specOnly: string[]
  }
  tagDiffs: {
    logOnly: { msgType: string; msgName: string; tags: string[] }[]
    specOnly: { msgType: string; msgName: string; tags: string[] }[]
  }
  valueDiffs: { msgType: string; tag: string; tagName: string; logValue: string; specValues: string[] }[]
  otherIssues: { category: string; description: string; logValue: string; specExpected: string }[]
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

  // Message Generator state
  const [msgGenSpecFile, setMsgGenSpecFile] = useState<string | null>(null)
  const [msgGenLogFile, setMsgGenLogFile] = useState<string | null>(null)
  const [msgGenStep, setMsgGenStep] = useState<1 | 2 | 3>(1)
  const [msgGenSelectedType, setMsgGenSelectedType] = useState<string | null>(null)
  const [msgGenFields, setMsgGenFields] = useState<{tag: string; name: string; value: string; editable: boolean}[]>([])
  const [msgGenOutput, setMsgGenOutput] = useState<string | null>(null)

  // Quick Sender state
  const [quickSenderHost, setQuickSenderHost] = useState("")
  const [quickSenderPort, setQuickSenderPort] = useState("")
  const [quickSenderCompID, setQuickSenderCompID] = useState("")
  const [quickTargetCompID, setQuickTargetCompID] = useState("")
  const [quickSenderCustomTags, setQuickSenderCustomTags] = useState<{tag: string; value: string}[]>([{tag: "", value: ""}])
  const [quickSenderConnected, setQuickSenderConnected] = useState(false)
  const [quickSenderStatus, setQuickSenderStatus] = useState<"disconnected" | "connecting" | "connected">("disconnected")
  const [quickSenderLogs, setQuickSenderLogs] = useState<{time: string; direction: "out" | "in"; message: string}[]>([])

  // Spec Compare state
  const [spec1File, setSpec1File] = useState<string | null>(null)
  const [spec2File, setSpec2File] = useState<string | null>(null)
  const [specCompareResults, setSpecCompareResults] = useState<SpecCompareResult | null>(null)
  const [selectedSpecMsgType, setSelectedSpecMsgType] = useState<string | null>(null)

  // Log Analysis state
  const [logFile, setLogFile] = useState<string | null>(null)
  const [logSpecFile, setLogSpecFile] = useState<string | null>(null)
  const [analysisResults, setAnalysisResults] = useState<LogAnalysisResult | null>(null)
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

  // Clients state with detailed specs per client
  const [clients, setClients] = useState<Client[]>([
    { id: "C001", name: "BlackRock", specs: 12, lastActivity: "2025-03-02 10:30", status: "active", progress: { specComparison: "done", logComparison: "progress", testCaseGeneration: "done", certificationCaseGeneration: "done", configurationGeneration: "done", alerts: "generated", alertsCount: 45 }, clientSpecs: [
      { id: "S001", name: "Equities DMA", assetClass: "Equities", algoType: "DMA", version: "FIX 4.4", lastUpdated: "2025-03-01", specComparison: "done", logComparison: "done", testCaseGeneration: "done", certificationCaseGeneration: "done", configurationGeneration: "done", alerts: "generated", alertsCount: 12 },
      { id: "S002", name: "Equities VWAP Algo", assetClass: "Equities", algoType: "VWAP", version: "FIX 4.4", lastUpdated: "2025-03-01", specComparison: "done", logComparison: "progress", testCaseGeneration: "done", certificationCaseGeneration: "done", configurationGeneration: "done", alerts: "generated", alertsCount: 8 },
      { id: "S003", name: "Fixed Income", assetClass: "Fixed Income", version: "FIX 5.0 SP2", lastUpdated: "2025-02-28", specComparison: "done", logComparison: "done", testCaseGeneration: "progress", certificationCaseGeneration: "pending", configurationGeneration: "pending", alerts: "pending" },
      { id: "S004", name: "FX Spot", assetClass: "FX", version: "FIX 4.4", lastUpdated: "2025-02-25", specComparison: "done", logComparison: "done", testCaseGeneration: "done", certificationCaseGeneration: "done", configurationGeneration: "done", alerts: "generated", alertsCount: 15 },
    ]},
    { id: "C002", name: "Goldman Sachs", specs: 8, lastActivity: "2025-03-02 09:45", status: "active", progress: { specComparison: "done", logComparison: "done", testCaseGeneration: "progress", certificationCaseGeneration: "progress", configurationGeneration: "pending", alerts: "pending" }, clientSpecs: [
      { id: "S005", name: "Equities TWAP", assetClass: "Equities", algoType: "TWAP", version: "FIX 4.4", lastUpdated: "2025-03-02", specComparison: "done", logComparison: "done", testCaseGeneration: "progress", certificationCaseGeneration: "progress", configurationGeneration: "pending", alerts: "pending" },
      { id: "S006", name: "Options Trading", assetClass: "Options", version: "FIX 5.0", lastUpdated: "2025-03-01", specComparison: "done", logComparison: "done", testCaseGeneration: "done", certificationCaseGeneration: "done", configurationGeneration: "done", alerts: "generated", alertsCount: 6 },
    ]},
    { id: "C003", name: "JP Morgan", specs: 15, lastActivity: "2025-03-02 10:15", status: "active", progress: { specComparison: "progress", logComparison: "pending", testCaseGeneration: "pending", certificationCaseGeneration: "pending", configurationGeneration: "pending", alerts: "pending" }, clientSpecs: [
      { id: "S007", name: "Prime Brokerage", assetClass: "Multi-Asset", version: "FIX 4.4", lastUpdated: "2025-03-02", specComparison: "progress", logComparison: "pending", testCaseGeneration: "pending", certificationCaseGeneration: "pending", configurationGeneration: "pending", alerts: "pending" },
      { id: "S008", name: "Futures Trading", assetClass: "Futures", version: "FIX 5.0 SP2", lastUpdated: "2025-02-28", specComparison: "done", logComparison: "progress", testCaseGeneration: "pending", certificationCaseGeneration: "pending", configurationGeneration: "pending", alerts: "pending" },
    ]},
    { id: "C004", name: "UBS", specs: 6, lastActivity: "2025-03-01 16:30", status: "inactive", progress: { specComparison: "done", logComparison: "done", testCaseGeneration: "done", certificationCaseGeneration: "done", configurationGeneration: "done", alerts: "generated", alertsCount: 32 }, clientSpecs: [
      { id: "S009", name: "Wealth Management", assetClass: "Multi-Asset", version: "FIX 4.2", lastUpdated: "2025-02-20", specComparison: "done", logComparison: "done", testCaseGeneration: "done", certificationCaseGeneration: "done", configurationGeneration: "done", alerts: "generated", alertsCount: 18 },
      { id: "S010", name: "FX Options", assetClass: "FX", algoType: "Options", version: "FIX 4.4", lastUpdated: "2025-02-15", specComparison: "done", logComparison: "done", testCaseGeneration: "done", certificationCaseGeneration: "done", configurationGeneration: "done", alerts: "generated", alertsCount: 14 },
    ]},
    { id: "C005", name: "Raymond James", specs: 4, lastActivity: "2025-03-02 08:00", status: "active", progress: { specComparison: "done", logComparison: "error", testCaseGeneration: "pending", certificationCaseGeneration: "error", configurationGeneration: "error", alerts: "error" }, clientSpecs: [
      { id: "S011", name: "Retail Equities", assetClass: "Equities", version: "FIX 4.2", lastUpdated: "2025-03-01", specComparison: "done", logComparison: "error", testCaseGeneration: "pending", certificationCaseGeneration: "error", configurationGeneration: "error", alerts: "error" },
    ]},
    { id: "C006", name: "HSBC", specs: 9, lastActivity: "2025-03-02 10:00", status: "active", progress: { specComparison: "done", logComparison: "done", testCaseGeneration: "progress", certificationCaseGeneration: "done", configurationGeneration: "progress", alerts: "generated", alertsCount: 28 }, clientSpecs: [
      { id: "S012", name: "FX Spot APAC", assetClass: "FX", version: "FIX 4.4", lastUpdated: "2025-03-01", specComparison: "done", logComparison: "done", testCaseGeneration: "done", certificationCaseGeneration: "done", configurationGeneration: "done", alerts: "generated", alertsCount: 10 },
      { id: "S013", name: "FX Forwards", assetClass: "FX", version: "FIX 4.4", lastUpdated: "2025-02-28", specComparison: "done", logComparison: "done", testCaseGeneration: "progress", certificationCaseGeneration: "done", configurationGeneration: "progress", alerts: "generated", alertsCount: 8 },
      { id: "S014", name: "Commodities", assetClass: "Commodities", version: "FIX 5.0", lastUpdated: "2025-02-25", specComparison: "done", logComparison: "done", testCaseGeneration: "done", certificationCaseGeneration: "done", configurationGeneration: "done", alerts: "generated", alertsCount: 10 },
    ]},
    { id: "C007", name: "Bank of America", specs: 11, lastActivity: "2025-03-01 14:20", status: "inactive", progress: { specComparison: "error", logComparison: "pending", testCaseGeneration: "pending", certificationCaseGeneration: "pending", configurationGeneration: "pending", alerts: "pending" }, clientSpecs: [
      { id: "S015", name: "Equities Flow", assetClass: "Equities", version: "FIX 4.4", lastUpdated: "2025-02-28", specComparison: "error", logComparison: "pending", testCaseGeneration: "pending", certificationCaseGeneration: "pending", configurationGeneration: "pending", alerts: "pending" },
      { id: "S016", name: "Equities Program Trading", assetClass: "Equities", algoType: "Program", version: "FIX 4.4", lastUpdated: "2025-02-25", specComparison: "done", logComparison: "pending", testCaseGeneration: "pending", certificationCaseGeneration: "pending", configurationGeneration: "pending", alerts: "pending" },
      { id: "S017", name: "Fixed Income Corp", assetClass: "Fixed Income", version: "FIX 5.0 SP2", lastUpdated: "2025-02-20", specComparison: "done", logComparison: "done", testCaseGeneration: "progress", certificationCaseGeneration: "pending", configurationGeneration: "pending", alerts: "pending" },
      { id: "S018", name: "FX Prime", assetClass: "FX", version: "FIX 4.4", lastUpdated: "2025-02-15", specComparison: "done", logComparison: "done", testCaseGeneration: "done", certificationCaseGeneration: "done", configurationGeneration: "pending", alerts: "pending" },
      { id: "S019", name: "Rates Trading", assetClass: "Rates", version: "FIX 5.0", lastUpdated: "2025-02-10", specComparison: "progress", logComparison: "pending", testCaseGeneration: "pending", certificationCaseGeneration: "pending", configurationGeneration: "pending", alerts: "pending" },
    ]},
  ])
  const [selectedClient, setSelectedClient] = useState<Client | null>(null)
  const [viewingClient, setViewingClient] = useState<Client | null>(null)
  const [selectedSpec, setSelectedSpec] = useState<ClientSpec | null>(null)
  const [activeWorkflow, setActiveWorkflow] = useState<WorkflowType>(null)
  const [clientSortBy, setClientSortBy] = useState<"name" | "progress" | "status">("name")
  const [clientSortOrder, setClientSortOrder] = useState<"asc" | "desc">("asc")
  const [clientStatusFilter, setClientStatusFilter] = useState<"all" | "active" | "inactive">("all")
  const [showAddClientModal, setShowAddClientModal] = useState(false)
  
  // Column filter states for dashboard
  const [selectedClientsFilter, setSelectedClientsFilter] = useState<string[]>([])
  const [specComparisonFilter, setSpecComparisonFilter] = useState<string[]>([])
  const [logComparisonFilter, setLogComparisonFilter] = useState<string[]>([])
  const [testCaseFilter2, setTestCaseFilter2] = useState<string[]>([])
  const [certCaseFilter, setCertCaseFilter] = useState<string[]>([])
  const [configFilter, setConfigFilter] = useState<string[]>([])
  const [alertsFilter, setAlertsFilter] = useState<string[]>([])
  const [activeColumnFilter, setActiveColumnFilter] = useState<string | null>(null)
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
      // Simulated comprehensive comparison results
      const results: SpecCompareResult = {
        compatible: false,
        msgTypeDiffs: {
          spec1Only: ["G4 - Custom Mass Quote", "G5 - Custom Quote Cancel", "AE - Trade Capture Report"],
          spec2Only: ["A3 - Custom Logon Ext", "A9 - Custom Session Status", "BE - User Request"],
        },
        tagDiffs: {
          spec1Missing: [
            { msgType: "D", msgName: "New Order Single", tags: ["345", "457", "9656", "847"] },
            { msgType: "G", msgName: "Order Cancel/Replace", tags: ["46", "67", "242", "9001"] },
            { msgType: "8", msgName: "Execution Report", tags: ["1057", "1058", "9003"] },
          ],
          spec2Missing: [
            { msgType: "D", msgName: "New Order Single", tags: ["89", "532", "843", "9999"] },
            { msgType: "G", msgName: "Order Cancel/Replace", tags: ["89", "532", "138", "843", "9998"] },
            { msgType: "F", msgName: "Order Cancel Request", tags: ["9997", "847"] },
          ],
        },
        valueDiffs: [
          { msgType: "D", tag: "54", tagName: "Side", spec1Values: ["1", "2", "5", "6"], spec2Values: ["1", "2", "3", "4", "5", "6"] },
          { msgType: "D", tag: "40", tagName: "OrdType", spec1Values: ["1", "2", "3", "4"], spec2Values: ["1", "2", "P", "K"] },
          { msgType: "8", tag: "39", tagName: "OrdStatus", spec1Values: ["0", "1", "2", "4", "8"], spec2Values: ["0", "1", "2", "4", "8", "C", "E"] },
          { msgType: "8", tag: "150", tagName: "ExecType", spec1Values: ["0", "F", "4", "5"], spec2Values: ["0", "F", "4", "5", "H", "I"] },
        ],
        otherDiffs: [
          { category: "Data Type", description: "Tag 44 (Price)", spec1: "Price (decimal)", spec2: "Float" },
          { category: "Required/Optional", description: "Tag 11 (ClOrdID) in MsgType D", spec1: "Required", spec2: "Optional" },
          { category: "Required/Optional", description: "Tag 60 (TransactTime) in MsgType 8", spec1: "Optional", spec2: "Required" },
          { category: "Conditional", description: "Tag 99 (StopPx) in MsgType D", spec1: "Required when OrdType=3,4", spec2: "Required when OrdType=3" },
          { category: "Group Structure", description: "Repeating Group 453 (NoPartyIDs)", spec1: "Max 4 parties", spec2: "Max 10 parties" },
          { category: "Field Length", description: "Tag 11 (ClOrdID)", spec1: "Max 20 chars", spec2: "Max 32 chars" },
        ],
      }
      setSpecCompareResults(results)
      const totalDiffs = results.msgTypeDiffs.spec1Only.length + results.msgTypeDiffs.spec2Only.length + 
                         results.tagDiffs.spec1Missing.length + results.tagDiffs.spec2Missing.length +
                         results.valueDiffs.length + results.otherDiffs.length
      addHistoryEntry("Spec Comparison", results.compatible ? "success" : "warning", `${totalDiffs} differences found`)
      if (!results.compatible) {
        addAlert("warning", "Spec compatibility issues detected")
      }
    }
  }

  const performLogAnalysis = () => {
    if (logFile && logSpecFile) {
      // Simulated comprehensive analysis results
      const results: LogAnalysisResult = {
        msgTypeDiffs: {
          logOnly: ["AE - Trade Capture Report", "AJ - Quote Request Reject", "BG - Trading Session Status"],
          specOnly: ["V - Market Data Request", "W - Market Data Snapshot", "X - Market Data Incremental"],
        },
        tagDiffs: {
          logOnly: [
            { msgType: "D", msgName: "New Order Single", tags: ["9999", "9998", "5001", "5002"] },
            { msgType: "8", msgName: "Execution Report", tags: ["10001", "10002"] },
            { msgType: "F", msgName: "Order Cancel Request", tags: ["9997"] },
          ],
          specOnly: [
            { msgType: "D", msgName: "New Order Single", tags: ["528", "529", "582"] },
            { msgType: "8", msgName: "Execution Report", tags: ["1057", "1058", "1059"] },
            { msgType: "G", msgName: "Order Cancel/Replace", tags: ["586", "587"] },
          ],
        },
        valueDiffs: [
          { msgType: "D", tag: "54", tagName: "Side", logValue: "X", specValues: ["1", "2", "5", "6"] },
          { msgType: "8", tag: "39", tagName: "OrdStatus", logValue: "Z", specValues: ["0", "1", "2", "4", "8"] },
          { msgType: "D", tag: "40", tagName: "OrdType", logValue: "9", specValues: ["1", "2", "3", "4"] },
          { msgType: "8", tag: "150", tagName: "ExecType", logValue: "Q", specValues: ["0", "F", "4", "5"] },
        ],
        otherIssues: [
          { category: "Data Type", description: "Tag 44 (Price) in MsgType D", logValue: "INVALID", specExpected: "Decimal" },
          { category: "Field Length", description: "Tag 11 (ClOrdID) in MsgType D", logValue: "35 chars", specExpected: "Max 20 chars" },
          { category: "Missing Required", description: "Tag 60 (TransactTime) in MsgType D", logValue: "Not Present", specExpected: "Required" },
          { category: "Format", description: "Tag 52 (SendingTime)", logValue: "2025-03-02", specExpected: "YYYYMMDD-HH:MM:SS.sss" },
        ],
      }
      setAnalysisResults(results)
      const totalIssues = results.msgTypeDiffs.logOnly.length + results.tagDiffs.logOnly.length + results.valueDiffs.length + results.otherIssues.length
      addHistoryEntry("Log Analysis Completed", "success", `Found ${totalIssues} discrepancies`)
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

  // Message Generator functions
  const handleMsgGenSpecUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setMsgGenSpecFile(file.name)
      setMsgGenLogFile(null) // Clear log if spec is selected
      addHistoryEntry("Uploaded FIX Spec for Message Gen", "success", file.name)
    }
  }

  const handleMsgGenLogUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setMsgGenLogFile(file.name)
      setMsgGenSpecFile(null) // Clear spec if log is selected
      addHistoryEntry("Uploaded Log File for Message Gen", "success", file.name)
    }
  }

  const selectMsgGenType = (msgType: string) => {
    setMsgGenSelectedType(msgType)
    // Initialize fields based on message type
    const fieldsByType: Record<string, {tag: string; name: string; value: string; editable: boolean}[]> = {
      "D": [ // New Order Single
        { tag: "8", name: "BeginString", value: "FIX.4.4", editable: false },
        { tag: "35", name: "MsgType", value: "D", editable: false },
        { tag: "49", name: "SenderCompID", value: "SENDER", editable: true },
        { tag: "56", name: "TargetCompID", value: "TARGET", editable: true },
        { tag: "11", name: "ClOrdID", value: "ORD001", editable: true },
        { tag: "55", name: "Symbol", value: "IBM", editable: true },
        { tag: "54", name: "Side", value: "1", editable: true },
        { tag: "38", name: "OrderQty", value: "100", editable: true },
        { tag: "40", name: "OrdType", value: "2", editable: true },
        { tag: "44", name: "Price", value: "150.00", editable: true },
        { tag: "59", name: "TimeInForce", value: "0", editable: true },
        { tag: "60", name: "TransactTime", value: new Date().toISOString().replace(/[-:]/g, "").slice(0, 17), editable: true },
      ],
      "8": [ // Execution Report
        { tag: "8", name: "BeginString", value: "FIX.4.4", editable: false },
        { tag: "35", name: "MsgType", value: "8", editable: false },
        { tag: "49", name: "SenderCompID", value: "EXCHANGE", editable: true },
        { tag: "56", name: "TargetCompID", value: "CLIENT", editable: true },
        { tag: "17", name: "ExecID", value: "EXEC001", editable: true },
        { tag: "37", name: "OrderID", value: "ORD001", editable: true },
        { tag: "11", name: "ClOrdID", value: "CLORD001", editable: true },
        { tag: "55", name: "Symbol", value: "IBM", editable: true },
        { tag: "54", name: "Side", value: "1", editable: true },
        { tag: "39", name: "OrdStatus", value: "2", editable: true },
        { tag: "150", name: "ExecType", value: "F", editable: true },
        { tag: "32", name: "LastQty", value: "100", editable: true },
        { tag: "31", name: "LastPx", value: "150.00", editable: true },
      ],
      "F": [ // Order Cancel Request
        { tag: "8", name: "BeginString", value: "FIX.4.4", editable: false },
        { tag: "35", name: "MsgType", value: "F", editable: false },
        { tag: "49", name: "SenderCompID", value: "SENDER", editable: true },
        { tag: "56", name: "TargetCompID", value: "TARGET", editable: true },
        { tag: "11", name: "ClOrdID", value: "CANCEL001", editable: true },
        { tag: "41", name: "OrigClOrdID", value: "ORD001", editable: true },
        { tag: "55", name: "Symbol", value: "IBM", editable: true },
        { tag: "54", name: "Side", value: "1", editable: true },
        { tag: "60", name: "TransactTime", value: new Date().toISOString().replace(/[-:]/g, "").slice(0, 17), editable: true },
      ],
      "G": [ // Order Cancel/Replace Request
        { tag: "8", name: "BeginString", value: "FIX.4.4", editable: false },
        { tag: "35", name: "MsgType", value: "G", editable: false },
        { tag: "49", name: "SenderCompID", value: "SENDER", editable: true },
        { tag: "56", name: "TargetCompID", value: "TARGET", editable: true },
        { tag: "11", name: "ClOrdID", value: "REPLACE001", editable: true },
        { tag: "41", name: "OrigClOrdID", value: "ORD001", editable: true },
        { tag: "55", name: "Symbol", value: "IBM", editable: true },
        { tag: "54", name: "Side", value: "1", editable: true },
        { tag: "38", name: "OrderQty", value: "200", editable: true },
        { tag: "40", name: "OrdType", value: "2", editable: true },
        { tag: "44", name: "Price", value: "155.00", editable: true },
      ],
      "A": [ // Logon
        { tag: "8", name: "BeginString", value: "FIX.4.4", editable: false },
        { tag: "35", name: "MsgType", value: "A", editable: false },
        { tag: "49", name: "SenderCompID", value: "SENDER", editable: true },
        { tag: "56", name: "TargetCompID", value: "TARGET", editable: true },
        { tag: "98", name: "EncryptMethod", value: "0", editable: true },
        { tag: "108", name: "HeartBtInt", value: "30", editable: true },
        { tag: "141", name: "ResetSeqNumFlag", value: "Y", editable: true },
      ],
      "0": [ // Heartbeat
        { tag: "8", name: "BeginString", value: "FIX.4.4", editable: false },
        { tag: "35", name: "MsgType", value: "0", editable: false },
        { tag: "49", name: "SenderCompID", value: "SENDER", editable: true },
        { tag: "56", name: "TargetCompID", value: "TARGET", editable: true },
        { tag: "112", name: "TestReqID", value: "TEST001", editable: true },
      ],
    }
    setMsgGenFields(fieldsByType[msgType] || fieldsByType["D"])
    setMsgGenStep(3)
  }

  const updateMsgGenField = (index: number, newValue: string) => {
    const newFields = [...msgGenFields]
    newFields[index].value = newValue
    setMsgGenFields(newFields)
  }

  const generateFinalMessage = () => {
    const tags = msgGenFields.map((f) => `${f.tag}=${f.value}`).join("|")
    const bodyLength = tags.length
    const msg = `8=${msgGenFields[0]?.value || "FIX.4.4"}|9=${bodyLength}|${tags}|10=000|`
    setMsgGenOutput(msg)
    addHistoryEntry("FIX Message Generated", "success", `MsgType=${msgGenSelectedType}`)
  }

  const resetMsgGenerator = () => {
    setMsgGenSpecFile(null)
    setMsgGenLogFile(null)
    setMsgGenStep(1)
    setMsgGenSelectedType(null)
    setMsgGenFields([])
    setMsgGenOutput(null)
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
              <Icon className={`h-5 w-5 ${isActive ? (isDarkMode ? "text-[#ff9800]" : "text-[#f57c00]") : item.iconColor || ""}`} />
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

// TabBar component for navigation
  const TabBar = () => {
    const tabs = [
      { id: "home" as Tab, label: "Home", icon: Home, iconColor: isDarkMode ? "text-[#ffc107]" : "text-[#f57c00]" },
      { id: "projects" as Tab, label: "Projects", icon: FolderOpen, iconColor: isDarkMode ? "text-[#00e5ff]" : "text-[#0097a7]" },
      { id: "uploads" as Tab, label: "Uploads", icon: FileUp, iconColor: isDarkMode ? "text-[#4caf50]" : "text-[#388e3c]" },
      { id: "testcase" as Tab, label: "TestCase", icon: TestTube, iconColor: isDarkMode ? "text-[#ce93d8]" : "text-[#7b1fa2]" },
      { id: "settings" as Tab, label: "Settings", icon: Settings, iconColor: isDarkMode ? "text-[#90a4ae]" : "text-[#546e7a]" },
    ]

    const handleTabClick = (tabId: Tab) => {
      setActiveTab(tabId)
      if (tabId === "home") {
        setActiveSidebarItem("dashboard")
      }
    }
    
    return (
      <div className={`flex items-center gap-1 rounded-xl p-1.5 ${isDarkMode ? "bg-[#0d1f3c]" : "bg-[#e2e8f0]"}`}>
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
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
              <Icon className={`h-4 w-4 ${activeTab === tab.id ? "" : tab.iconColor}`} />
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
    if (client.progress.certificationCaseGeneration === "done") count++
    if (client.progress.configurationGeneration === "done") count++
    if (client.progress.alerts === "generated") count++
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
        progress: { specComparison: "pending", logComparison: "pending", testCaseGeneration: "pending", certificationCaseGeneration: "pending", configurationGeneration: "pending", alerts: "pending" }
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
  done: isDarkMode ? "bg-[#4caf50]/20 text-[#4caf50]" : "bg-[#e8f5e9] text-[#2e7d32]",
  progress: isDarkMode ? "bg-[#2196f3]/20 text-[#2196f3]" : "bg-[#e3f2fd] text-[#1565c0]",
  pending: isDarkMode ? "bg-[#9e9e9e]/20 text-[#9e9e9e]" : "bg-[#f5f5f5] text-[#616161]",
  error: isDarkMode ? "bg-[#f44336]/20 text-[#f44336]" : "bg-[#ffebee] text-[#c62828]"
  }
  const labels = { done: "Done", progress: "In Progress", pending: "Not Started", error: "Error" }
  return (
  <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${styles[status]}`}>
  {labels[status]}
      </span>
    )
  }

const ConnectivityBadge = ({ status }: { status: "connected" | "not-connected" | "error" }) => {
  const styles = {
  connected: isDarkMode ? "bg-[#4caf50]/20 text-[#4caf50]" : "bg-[#e8f5e9] text-[#2e7d32]",
  "not-connected": isDarkMode ? "bg-[#f57c00]/20 text-[#f57c00]" : "bg-[#fff3e0] text-[#e65100]",
  error: isDarkMode ? "bg-[#f44336]/20 text-[#f44336]" : "bg-[#ffebee] text-[#c62828]"
  }
  const labels = { connected: "Connected", "not-connected": "Not Connected", error: "Error" }
  return (
  <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${styles[status]}`}>
  {labels[status]}
  </span>
    )
  }

  const LicenseBadge = ({ status }: { status: "licensed" | "not-licensed" | "pending" }) => {
    const styles = {
      licensed: isDarkMode ? "bg-[#4caf50]/20 text-[#4caf50]" : "bg-[#e8f5e9] text-[#2e7d32]",
      "not-licensed": isDarkMode ? "bg-[#f44336]/20 text-[#f44336]" : "bg-[#ffebee] text-[#c62828]",
      pending: isDarkMode ? "bg-[#9e9e9e]/20 text-[#9e9e9e]" : "bg-[#f5f5f5] text-[#616161]"
    }
    const labels = { licensed: "Licensed", "not-licensed": "Not Licensed", pending: "Pending" }
    return (
      <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${styles[status]}`}>
        {labels[status]}
      </span>
    )
  }

  const ULTestCasesBadge = ({ status, count, onClick }: { status: "generated" | "pending" | "error"; count?: number; onClick?: () => void }) => {
    const styles = {
      generated: isDarkMode ? "bg-[#4caf50]/20 text-[#4caf50] cursor-pointer hover:bg-[#4caf50]/30" : "bg-[#e8f5e9] text-[#2e7d32] cursor-pointer hover:bg-[#c8e6c9]",
      pending: isDarkMode ? "bg-[#9e9e9e]/20 text-[#9e9e9e]" : "bg-[#f5f5f5] text-[#616161]",
      error: isDarkMode ? "bg-[#f44336]/20 text-[#f44336]" : "bg-[#ffebee] text-[#c62828]"
    }
    const labels = { generated: `Generated${count ? ` (${count})` : ""}`, pending: "Pending", error: "Error" }
    return (
      <span 
        className={`rounded-full px-2 py-0.5 text-xs font-semibold ${styles[status]}`}
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
                <Button variant="secondary" size="sm" onClick={() => { setViewingClient(client); setCurrentScreen("client-detail"); }}>
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
<span className={`text-sm ${isDarkMode ? "text-[#90caf9]" : "text-[#64748b]"}`}>Certification Case Generation</span>
  <ProgressBadge status={selectedClient.progress.certificationCaseGeneration} />
  </div>
  <div className="flex items-center justify-between">
  <span className={`text-sm ${isDarkMode ? "text-[#90caf9]" : "text-[#64748b]"}`}>Configuration Generation</span>
  <ProgressBadge status={selectedClient.progress.configurationGeneration} />
                  </div>
                  <div className="flex items-center justify-between">
<span className={`text-sm ${isDarkMode ? "text-[#90caf9]" : "text-[#64748b]"}`}>Alerts</span>
  <ULTestCasesBadge
  status={selectedClient.progress.alerts}
  count={selectedClient.progress.alertsCount}
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
  const LogAnalysisPanel = () => {
    // Auto-load client data when coming from client detail page
    const isLogClientContext = selectedSpec && viewingClient && activeWorkflow === "log-analysis"
    
    // Simulate pre-loaded analysis results for client context
    const clientLogResults = isLogClientContext ? {
      msgTypeDiffs: {
        logOnly: selectedSpec.logComparison === "error" ? [
          { code: "AE", name: "Trade Capture Report" },
          { code: "AJ", name: "Quote Request Reject" },
          { code: "BG", name: "Trading Session Status" },
        ] : [],
        specOnly: selectedSpec.logComparison === "error" ? [
          { code: "V", name: "Market Data Request" },
          { code: "W", name: "Market Data Snapshot" },
          { code: "X", name: "Market Data Incremental" },
        ] : [],
      },
      tagDiffs: {
        logOnly: selectedSpec.logComparison === "error" ? [
          { msgType: "D", msgName: "New Order Single", tags: ["9999", "9998", "5001", "5002"] },
          { msgType: "8", msgName: "Execution Report", tags: ["10001", "10002"] },
          { msgType: "F", msgName: "Order Cancel Request", tags: ["9997"] },
        ] : [],
        specOnly: selectedSpec.logComparison === "error" ? [
          { msgType: "D", msgName: "New Order Single", tags: ["528", "529", "582"] },
          { msgType: "8", msgName: "Execution Report", tags: ["1057", "1058", "1059"] },
          { msgType: "G", msgName: "Order Cancel/Replace", tags: ["586", "587"] },
        ] : [],
      },
      valueDiffs: selectedSpec.logComparison === "error" ? [
        { msgType: "D", tag: 54, field: "Side", logValue: "X", specValues: ["1", "2", "5", "6"] }
      ] : [],
      otherIssues: selectedSpec.logComparison === "error" ? [
        { type: "sequence", desc: "Sequence gap detected: 145-148" },
        { type: "timestamp", desc: "Invalid timestamp format in message 201" },
      ] : [],
    } : null
    
    const logDisplayResults = isLogClientContext ? clientLogResults : analysisResults
    const logFileName = isLogClientContext ? `${viewingClient.name}_${selectedSpec.name}_trading.log` : logFile
    const specFileName = isLogClientContext ? `${viewingClient.name}_${selectedSpec.name}.xml` : logSpecFile
    
    return (
    <div className="p-6">
      {/* Client Context Banner */}
      {isLogClientContext && (
        <div className={`mb-4 flex items-center justify-between rounded-lg p-3 ${isDarkMode ? "bg-[#1e4976]/50" : "bg-[#e3f2fd]"}`}>
          <div className="flex items-center gap-2">
            <ChevronLeft className={`h-4 w-4 ${isDarkMode ? "text-[#90caf9]" : "text-[#1976d2]"}`} />
            <button 
              onClick={() => { setSelectedSpec(null); setActiveWorkflow(null); setCurrentScreen("client-detail"); }}
              className={`text-sm font-medium hover:underline ${isDarkMode ? "text-[#90caf9]" : "text-[#1976d2]"}`}
            >
              Back to {viewingClient.name}
            </button>
          </div>
          <span className={`text-sm ${isDarkMode ? "text-[#b0bec5]" : "text-[#64748b]"}`}>
            Analyzing: {selectedSpec.name} ({selectedSpec.version})
          </span>
        </div>
      )}
      
      <div className="mb-6 flex items-center justify-between">
        <div />
        {logDisplayResults && (
          <div className="flex gap-2">
            <Button variant="secondary" size="sm" onClick={() => navigator.clipboard.writeText(JSON.stringify(logDisplayResults, null, 2))}>
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
              (isLogClientContext || logFile)
                ? isDarkMode ? "border-[#4caf50] bg-[#4caf50]/10" : "border-[#4caf50] bg-[#4caf50]/5"
                : isDarkMode ? "border-[#1e4976] hover:border-[#00e5ff] hover:bg-[#1e4976]/30" : "border-[#cbd5e1] hover:border-[#1976d2] hover:bg-[#e2e8f0]"
            }`}
          >
            <Upload className={`mb-3 h-10 w-10 ${(isLogClientContext || logFile) ? "text-[#4caf50]" : isDarkMode ? "text-[#64b5f6]" : "text-[#64748b]"}`} />
            <p className={`mb-2 text-sm font-medium ${isDarkMode ? "text-white" : "text-[#0a1628]"}`}>
              {logFileName || "Drop Log File Here"}
            </p>
            <p className={`mb-3 text-xs ${isDarkMode ? "text-[#64b5f6]" : "text-[#64748b]"}`}>{isLogClientContext ? "Client log file" : "or click to browse"}</p>
            {!isLogClientContext && (
              <>
                <Button variant="secondary" size="sm" onClick={() => handleFileUpload("log-upload")}>
                  Select File
                </Button>
                <input type="file" id="log-upload" className="hidden" accept=".log,.txt" onChange={handleLogFileUpload} />
              </>
            )}
          </div>

          {/* Spec File Upload */}
          <div 
            className={`relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-6 transition-all ${
              (isLogClientContext || logSpecFile)
                ? isDarkMode ? "border-[#4caf50] bg-[#4caf50]/10" : "border-[#4caf50] bg-[#4caf50]/5"
                : isDarkMode ? "border-[#1e4976] hover:border-[#00e5ff] hover:bg-[#1e4976]/30" : "border-[#cbd5e1] hover:border-[#1976d2] hover:bg-[#e2e8f0]"
            }`}
          >
            <FileText className={`mb-3 h-10 w-10 ${(isLogClientContext || logSpecFile) ? "text-[#4caf50]" : isDarkMode ? "text-[#64b5f6]" : "text-[#64748b]"}`} />
            <p className={`mb-2 text-sm font-medium ${isDarkMode ? "text-white" : "text-[#0a1628]"}`}>
              {specFileName || "Drop FIX Spec Here"}
            </p>
            <p className={`mb-3 text-xs ${isDarkMode ? "text-[#64b5f6]" : "text-[#64748b]"}`}>{isLogClientContext ? "Client FIX spec" : "XML or TXT format"}</p>
            {!isLogClientContext && (
              <>
                <Button variant="secondary" size="sm" onClick={() => handleFileUpload("log-spec-upload")}>
                  Select File
                </Button>
                <input type="file" id="log-spec-upload" className="hidden" accept=".xml,.txt" onChange={handleLogSpecUpload} />
              </>
            )}
          </div>

          {/* Action Panel - only show when not in client context */}
          {!isLogClientContext ? (
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
          ) : (
            <div className={`flex flex-col items-center justify-center rounded-xl p-6 ${isDarkMode ? "bg-[#1e4976]/30" : "bg-[#f1f5f9]"}`}>
              <CheckCircle className={`mb-2 h-10 w-10 ${selectedSpec.logComparison === "done" ? "text-[#4caf50]" : "text-[#f57c00]"}`} />
              <p className={`text-sm font-medium ${isDarkMode ? "text-white" : "text-[#0a1628]"}`}>
                {selectedSpec.logComparison === "done" ? "Analysis Complete" : selectedSpec.logComparison === "error" ? "Issues Found" : "Pending Analysis"}
              </p>
              <p className={`text-xs ${isDarkMode ? "text-[#64b5f6]" : "text-[#64748b]"}`}>
                {selectedSpec.logComparison === "done" ? "No discrepancies" : selectedSpec.logComparison === "error" ? "Review differences below" : "Run analysis"}
              </p>
            </div>
          )}
        </div>
      </Card>

      {/* Empty State - Before Analysis - only when not in client context */}
      {!isLogClientContext && !analysisResults && (
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
      {logDisplayResults && (
        <div className="space-y-6">
          {/* Summary Stats */}
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-[#f57c00]/20`}>
                  <MessageSquare className="h-6 w-6 text-[#f57c00]" />
                </div>
                <div>
                  <p className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-[#0a1628]"}`}>
                    {logDisplayResults.msgTypeDiffs.logOnly.length + logDisplayResults.msgTypeDiffs.specOnly.length}
                  </p>
                  <p className={`text-xs ${isDarkMode ? "text-[#64b5f6]" : "text-[#64748b]"}`}>MsgType Diffs</p>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-[#00e5ff]/20`}>
                  <FileText className="h-6 w-6 text-[#00e5ff]" />
                </div>
                <div>
                  <p className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-[#0a1628]"}`}>
                    {logDisplayResults.tagDiffs.logOnly.length + logDisplayResults.tagDiffs.specOnly.length}
                  </p>
                  <p className={`text-xs ${isDarkMode ? "text-[#64b5f6]" : "text-[#64748b]"}`}>Tag Diffs</p>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-[#ffc107]/20`}>
                  <AlertTriangle className="h-6 w-6 text-[#ffc107]" />
                </div>
                <div>
                  <p className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-[#0a1628]"}`}>
                    {logDisplayResults.valueDiffs.length}
                  </p>
                  <p className={`text-xs ${isDarkMode ? "text-[#64b5f6]" : "text-[#64748b]"}`}>Value Diffs</p>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-[#f44336]/20`}>
                  <Settings className="h-6 w-6 text-[#f44336]" />
                </div>
                <div>
                  <p className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-[#0a1628]"}`}>
                    {logDisplayResults.otherIssues.length}
                  </p>
                  <p className={`text-xs ${isDarkMode ? "text-[#64b5f6]" : "text-[#64748b]"}`}>Other Issues</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Module 1: Message Type Differences */}
          <Card className="p-5">
            <h3 className={`mb-4 flex items-center gap-2 font-semibold ${isDarkMode ? "text-[#f57c00]" : "text-[#e65100]"}`}>
              <MessageSquare className="h-5 w-5" />
              1. Message Type Differences
            </h3>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              {/* In Log, NOT in Spec */}
              <div className={`rounded-xl border p-4 ${isDarkMode ? "border-[#1e4976] bg-[#0a1628]" : "border-[#e2e8f0] bg-[#fef2f2]"}`}>
                <div className="mb-3 flex items-center justify-between">
                  <span className={`text-sm font-semibold ${isDarkMode ? "text-[#f44336]" : "text-[#d32f2f]"}`}>
                    In Log, NOT in Spec
                  </span>
                  <span className="rounded-full bg-[#f44336]/20 px-2 py-0.5 text-xs font-medium text-[#f44336]">
                    {logDisplayResults.msgTypeDiffs.logOnly.length}
                  </span>
                </div>
                <div className="space-y-2">
                  {logDisplayResults.msgTypeDiffs.logOnly.map((msg, i) => (
                    <div key={i} className={`flex items-center gap-2 rounded-lg px-3 py-2 ${isDarkMode ? "bg-[#f44336]/10" : "bg-white"}`}>
                      <Minus className="h-4 w-4 text-[#f44336]" />
                      <span className={`text-sm ${isDarkMode ? "text-white" : "text-[#0a1628]"}`}>{msg}</span>
                    </div>
                  ))}
                </div>
              </div>
              {/* In Spec, NOT in Log */}
              <div className={`rounded-xl border p-4 ${isDarkMode ? "border-[#1e4976] bg-[#0a1628]" : "border-[#e2e8f0] bg-[#f0fdf4]"}`}>
                <div className="mb-3 flex items-center justify-between">
                  <span className={`text-sm font-semibold ${isDarkMode ? "text-[#4caf50]" : "text-[#388e3c]"}`}>
                    In Spec, NOT in Log
                  </span>
                  <span className="rounded-full bg-[#4caf50]/20 px-2 py-0.5 text-xs font-medium text-[#4caf50]">
                    {logDisplayResults.msgTypeDiffs.specOnly.length}
                  </span>
                </div>
                <div className="space-y-2">
                  {logDisplayResults.msgTypeDiffs.specOnly.map((msg, i) => (
                    <div key={i} className={`flex items-center gap-2 rounded-lg px-3 py-2 ${isDarkMode ? "bg-[#4caf50]/10" : "bg-white"}`}>
                      <Plus className="h-4 w-4 text-[#4caf50]" />
                      <span className={`text-sm ${isDarkMode ? "text-white" : "text-[#0a1628]"}`}>{msg}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* Module 2: Tag Differences */}
          <Card className="p-5">
            <h3 className={`mb-4 flex items-center gap-2 font-semibold ${isDarkMode ? "text-[#00e5ff]" : "text-[#0097a7]"}`}>
              <FileText className="h-5 w-5" />
              2. Tag Differences
            </h3>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              {/* Tags in Log, NOT in Spec */}
              <div className={`rounded-xl border p-4 ${isDarkMode ? "border-[#1e4976] bg-[#0a1628]" : "border-[#e2e8f0] bg-[#fef2f2]"}`}>
                <div className="mb-3">
                  <span className={`text-sm font-semibold ${isDarkMode ? "text-[#f44336]" : "text-[#d32f2f]"}`}>
                    Tags in Log, NOT in Spec
                  </span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className={`border-b ${isDarkMode ? "border-[#1e4976]" : "border-[#e2e8f0]"}`}>
                        <th className={`px-3 py-2 text-left text-xs font-semibold ${isDarkMode ? "text-[#64b5f6]" : "text-[#64748b]"}`}>Message Type</th>
                        <th className={`px-3 py-2 text-left text-xs font-semibold ${isDarkMode ? "text-[#64b5f6]" : "text-[#64748b]"}`}>Unknown Tags</th>
                      </tr>
                    </thead>
                    <tbody>
                      {logDisplayResults.tagDiffs.logOnly.map((item, i) => (
                        <tr key={i} className={`border-b ${isDarkMode ? "border-[#1e4976]" : "border-[#e2e8f0]"}`}>
                          <td className={`px-3 py-2 ${isDarkMode ? "text-white" : "text-[#0a1628]"}`}>
                            <span className={`rounded px-2 py-0.5 text-xs font-medium ${isDarkMode ? "bg-[#1e4976]" : "bg-[#e2e8f0]"}`}>
                              {item.msgType}
                            </span>
                            <span className={`ml-2 text-xs ${isDarkMode ? "text-[#90caf9]" : "text-[#64748b]"}`}>{item.msgName}</span>
                          </td>
                          <td className="px-3 py-2">
                            <div className="flex flex-wrap gap-1">
                              {item.tags.map((tag, j) => (
                                <span key={j} className="rounded bg-[#f44336]/20 px-2 py-0.5 text-xs font-mono text-[#f44336]">{tag}</span>
                              ))}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              {/* Tags in Spec, NOT in Log */}
              <div className={`rounded-xl border p-4 ${isDarkMode ? "border-[#1e4976] bg-[#0a1628]" : "border-[#e2e8f0] bg-[#f0fdf4]"}`}>
                <div className="mb-3">
                  <span className={`text-sm font-semibold ${isDarkMode ? "text-[#4caf50]" : "text-[#388e3c]"}`}>
                    Tags in Spec, NOT in Log (Unused)
                  </span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className={`border-b ${isDarkMode ? "border-[#1e4976]" : "border-[#e2e8f0]"}`}>
                        <th className={`px-3 py-2 text-left text-xs font-semibold ${isDarkMode ? "text-[#64b5f6]" : "text-[#64748b]"}`}>Message Type</th>
                        <th className={`px-3 py-2 text-left text-xs font-semibold ${isDarkMode ? "text-[#64b5f6]" : "text-[#64748b]"}`}>Unused Tags</th>
                      </tr>
                    </thead>
                    <tbody>
                      {logDisplayResults.tagDiffs.specOnly.map((item, i) => (
                        <tr key={i} className={`border-b ${isDarkMode ? "border-[#1e4976]" : "border-[#e2e8f0]"}`}>
                          <td className={`px-3 py-2 ${isDarkMode ? "text-white" : "text-[#0a1628]"}`}>
                            <span className={`rounded px-2 py-0.5 text-xs font-medium ${isDarkMode ? "bg-[#1e4976]" : "bg-[#e2e8f0]"}`}>
                              {item.msgType}
                            </span>
                            <span className={`ml-2 text-xs ${isDarkMode ? "text-[#90caf9]" : "text-[#64748b]"}`}>{item.msgName}</span>
                          </td>
                          <td className="px-3 py-2">
                            <div className="flex flex-wrap gap-1">
                              {item.tags.map((tag, j) => (
                                <span key={j} className="rounded bg-[#4caf50]/20 px-2 py-0.5 text-xs font-mono text-[#4caf50]">{tag}</span>
                              ))}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </Card>

          {/* Module 3: Invalid Values */}
          <Card className="p-5">
            <h3 className={`mb-4 flex items-center gap-2 font-semibold ${isDarkMode ? "text-[#ffc107]" : "text-[#f57c00]"}`}>
              <AlertTriangle className="h-5 w-5" />
              3. Invalid Values (Log vs Spec)
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className={isDarkMode ? "bg-[#0d1f3c]" : "bg-[#f8fafc]"}>
                    <th className={`px-4 py-3 text-left text-xs font-semibold ${isDarkMode ? "text-[#64b5f6]" : "text-[#64748b]"}`}>MsgType</th>
                    <th className={`px-4 py-3 text-left text-xs font-semibold ${isDarkMode ? "text-[#64b5f6]" : "text-[#64748b]"}`}>Tag</th>
                    <th className={`px-4 py-3 text-left text-xs font-semibold ${isDarkMode ? "text-[#64b5f6]" : "text-[#64748b]"}`}>Field Name</th>
                    <th className={`px-4 py-3 text-left text-xs font-semibold ${isDarkMode ? "text-[#64b5f6]" : "text-[#64748b]"}`}>Log Value</th>
                    <th className={`px-4 py-3 text-left text-xs font-semibold ${isDarkMode ? "text-[#64b5f6]" : "text-[#64748b]"}`}>Spec Allowed Values</th>
                  </tr>
                </thead>
                <tbody>
                  {logDisplayResults.valueDiffs.map((item, i) => (
                    <tr key={i} className={`border-t ${isDarkMode ? "border-[#1e4976]" : "border-[#e2e8f0]"} ${i % 2 === 0 ? (isDarkMode ? "bg-[#0f2847]" : "bg-white") : (isDarkMode ? "bg-[#0a1628]" : "bg-[#f8fafc]")}`}>
                      <td className={`px-4 py-3 ${isDarkMode ? "text-white" : "text-[#0a1628]"}`}>
                        <span className={`rounded px-2 py-0.5 text-xs font-medium ${isDarkMode ? "bg-[#1e4976]" : "bg-[#e2e8f0]"}`}>{item.msgType}</span>
                      </td>
                      <td className={`px-4 py-3 font-mono text-sm ${isDarkMode ? "text-[#00e5ff]" : "text-[#1976d2]"}`}>{item.tag}</td>
                      <td className={`px-4 py-3 text-sm ${isDarkMode ? "text-white" : "text-[#0a1628]"}`}>{item.tagName}</td>
                      <td className={`px-4 py-3 font-mono text-sm`}>
                        <span className="rounded bg-[#f44336]/20 px-2 py-0.5 text-[#f44336]">{item.logValue}</span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-1">
                          {item.specValues.map((v, j) => (
                            <span key={j} className={`rounded px-2 py-0.5 text-xs font-mono ${isDarkMode ? "bg-[#4caf50]/20 text-[#4caf50]" : "bg-[#e8f5e9] text-[#2e7d32]"}`}>{v}</span>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className={`mt-3 text-xs ${isDarkMode ? "text-[#64b5f6]" : "text-[#64748b]"}`}>
              Red = Value found in log | Green = Allowed values per spec
            </p>
          </Card>

          {/* Module 4: Other Issues */}
          <Card className="p-5">
            <h3 className={`mb-4 flex items-center gap-2 font-semibold ${isDarkMode ? "text-[#ce93d8]" : "text-[#7b1fa2]"}`}>
              <Settings className="h-5 w-5" />
              4. Other Issues (Data Type, Format, Required Fields)
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className={isDarkMode ? "bg-[#0d1f3c]" : "bg-[#f8fafc]"}>
                    <th className={`px-4 py-3 text-left text-xs font-semibold ${isDarkMode ? "text-[#64b5f6]" : "text-[#64748b]"}`}>Category</th>
                    <th className={`px-4 py-3 text-left text-xs font-semibold ${isDarkMode ? "text-[#64b5f6]" : "text-[#64748b]"}`}>Description</th>
                    <th className={`px-4 py-3 text-left text-xs font-semibold ${isDarkMode ? "text-[#64b5f6]" : "text-[#64748b]"}`}>Log Value</th>
                    <th className={`px-4 py-3 text-left text-xs font-semibold ${isDarkMode ? "text-[#64b5f6]" : "text-[#64748b]"}`}>Spec Expected</th>
                  </tr>
                </thead>
                <tbody>
                  {logDisplayResults.otherIssues.map((item, i) => (
                    <tr key={i} className={`border-t ${isDarkMode ? "border-[#1e4976]" : "border-[#e2e8f0]"} ${i % 2 === 0 ? (isDarkMode ? "bg-[#0f2847]" : "bg-white") : (isDarkMode ? "bg-[#0a1628]" : "bg-[#f8fafc]")}`}>
                      <td className="px-4 py-3">
                        <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                          item.category === "Data Type" ? "bg-[#9c27b0]/20 text-[#9c27b0]" :
                          item.category === "Field Length" ? "bg-[#ff5722]/20 text-[#ff5722]" :
                          item.category === "Missing Required" ? "bg-[#f44336]/20 text-[#f44336]" :
                          "bg-[#00bcd4]/20 text-[#00bcd4]"
                        }`}>{item.category}</span>
                      </td>
                      <td className={`px-4 py-3 text-sm ${isDarkMode ? "text-white" : "text-[#0a1628]"}`}>{item.description}</td>
                      <td className={`px-4 py-3 text-sm`}>
                        <span className={`rounded px-2 py-0.5 ${isDarkMode ? "bg-[#f44336]/10 text-[#f44336]" : "bg-[#ffebee] text-[#c62828]"}`}>{item.logValue}</span>
                      </td>
                      <td className={`px-4 py-3 text-sm`}>
                        <span className={`rounded px-2 py-0.5 ${isDarkMode ? "bg-[#4caf50]/10 text-[#4caf50]" : "bg-[#e8f5e9] text-[#2e7d32]"}`}>{item.specExpected}</span>
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
}

  // Recent spec comparisons for history
  const [recentSpecComparisons] = useState([
    { id: 1, spec1: "FIX44_BuySide.xml", spec2: "FIX44_SellSide.xml", date: "2025-03-01 11:20", differences: 8 },
    { id: 2, spec1: "FIX42_v1.xml", spec2: "FIX42_v2.xml", date: "2025-02-28 14:45", differences: 3 },
    { id: 3, spec1: "Custom_Spec.xml", spec2: "Standard_FIX44.xml", date: "2025-02-27 09:30", differences: 15 },
  ])

  // Spec Compare Panel Component
  const SpecComparePanel = () => {
    // Auto-load client specs when coming from client detail page
    const isClientContext = selectedSpec && viewingClient
    
    // Simulate pre-loaded comparison results for client context
    const clientSpecCompareResults = isClientContext ? {
      compatible: selectedSpec.specComparison === "done",
      msgTypeDiffs: {
        spec1Only: selectedSpec.specComparison === "error" ? [
          { code: "AE", name: "Trade Capture Report" },
          { code: "AJ", name: "Quote Request Reject" },
        ] : [],
        spec2Only: selectedSpec.specComparison === "error" ? [
          { code: "V", name: "Market Data Request" },
        ] : [],
      },
      tagDiffs: {
        spec1Missing: selectedSpec.specComparison === "error" ? [
          { msgType: "D", tags: ["9999", "9998"] },
        ] : [],
        spec2Missing: [],
      },
      valueDiffs: selectedSpec.specComparison === "error" ? [
        { msgType: "D", tag: 54, field: "Side", logValue: "X", specValues: ["1", "2", "5", "6"] }
      ] : [],
      otherDiffs: [],
    } : null
    
    const displayResults = isClientContext ? clientSpecCompareResults : specCompareResults
    const spec1Name = isClientContext ? `${viewingClient.name}_${selectedSpec.name}.xml` : spec1File
    const spec2Name = isClientContext ? "BTCS_Standard_FIX44.xml" : spec2File
    
    return (
    <div className="p-6">
      {/* Client Context Banner */}
      {isClientContext && (
        <div className={`mb-4 flex items-center justify-between rounded-lg p-3 ${isDarkMode ? "bg-[#1e4976]/50" : "bg-[#e3f2fd]"}`}>
          <div className="flex items-center gap-2">
            <ChevronLeft className={`h-4 w-4 ${isDarkMode ? "text-[#90caf9]" : "text-[#1976d2]"}`} />
            <button 
              onClick={() => { setSelectedSpec(null); setCurrentScreen("client-detail"); }}
              className={`text-sm font-medium hover:underline ${isDarkMode ? "text-[#90caf9]" : "text-[#1976d2]"}`}
            >
              Back to {viewingClient.name}
            </button>
          </div>
          <span className={`text-sm ${isDarkMode ? "text-[#b0bec5]" : "text-[#64748b]"}`}>
            Comparing: {selectedSpec.name} ({selectedSpec.version})
          </span>
        </div>
      )}
      
      <div className="mb-6 flex items-center justify-between">
        <div />
        {displayResults && (
          <div className="flex gap-2">
            <Button variant="secondary" size="sm" onClick={() => navigator.clipboard.writeText(JSON.stringify(displayResults, null, 2))}>
              <FileText className="mr-1 h-4 w-4" />
              Copy Results
            </Button>
            <Button variant="secondary" size="sm">
              <Download className="mr-1 h-4 w-4" />
              Export Report
            </Button>
          </div>
        )}

      {/* Upload Section with Side-by-Side */}
      <Card className="mb-6 p-5">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-7">
          {/* Spec 1 Upload - Client Spec */}
          <div 
            className={`col-span-3 relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-6 transition-all ${
              (isClientContext || spec1File)
                ? isDarkMode ? "border-[#4caf50] bg-[#4caf50]/10" : "border-[#4caf50] bg-[#4caf50]/5"
                : isDarkMode ? "border-[#1e4976] hover:border-[#00e5ff] hover:bg-[#1e4976]/30" : "border-[#cbd5e1] hover:border-[#1976d2] hover:bg-[#e2e8f0]"
            }`}
          >
            <div className={`mb-3 rounded-full p-3 ${(isClientContext || spec1File) ? "bg-[#4caf50]/20" : isDarkMode ? "bg-[#1e4976]" : "bg-[#e2e8f0]"}`}>
              <Upload className={`h-8 w-8 ${(isClientContext || spec1File) ? "text-[#4caf50]" : isDarkMode ? "text-[#64b5f6]" : "text-[#64748b]"}`} />
            </div>
            <p className={`mb-1 text-sm font-semibold ${isDarkMode ? "text-white" : "text-[#0a1628]"}`}>
              {isClientContext ? "Client Spec" : "Specification 1"}
            </p>
            <p className={`mb-3 text-xs text-center ${(isClientContext || spec1File) ? "text-[#4caf50]" : isDarkMode ? "text-[#64b5f6]" : "text-[#64748b]"}`}>
              {spec1Name || "Drop file or click to browse"}
            </p>
            {!isClientContext && (
              <>
                <Button variant="secondary" size="sm" onClick={() => handleFileUpload("spec1-upload")}>
                  {spec1File ? "Change File" : "Select File"}
                </Button>
                <input type="file" id="spec1-upload" className="hidden" accept=".xml,.txt" onChange={handleSpec1Upload} />
              </>
            )}
          </div>

          {/* Compare Arrow */}
          <div className="col-span-1 flex items-center justify-center">
            <div className={`flex flex-col items-center gap-2`}>
              <GitCompare className={`h-8 w-8 ${isDarkMode ? "text-[#00e5ff]" : "text-[#1976d2]"}`} />
              <span className={`text-xs font-medium ${isDarkMode ? "text-[#64b5f6]" : "text-[#64748b]"}`}>VS</span>
            </div>
          </div>

          {/* Spec 2 Upload - BTCS Standard */}
          <div 
            className={`col-span-3 relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-6 transition-all ${
              (isClientContext || spec2File)
                ? isDarkMode ? "border-[#4caf50] bg-[#4caf50]/10" : "border-[#4caf50] bg-[#4caf50]/5"
                : isDarkMode ? "border-[#1e4976] hover:border-[#00e5ff] hover:bg-[#1e4976]/30" : "border-[#cbd5e1] hover:border-[#1976d2] hover:bg-[#e2e8f0]"
            }`}
          >
            <div className={`mb-3 rounded-full p-3 ${(isClientContext || spec2File) ? "bg-[#4caf50]/20" : isDarkMode ? "bg-[#1e4976]" : "bg-[#e2e8f0]"}`}>
              <FileText className={`h-8 w-8 ${(isClientContext || spec2File) ? "text-[#4caf50]" : isDarkMode ? "text-[#64b5f6]" : "text-[#64748b]"}`} />
            </div>
            <p className={`mb-1 text-sm font-semibold ${isDarkMode ? "text-white" : "text-[#0a1628]"}`}>
              {isClientContext ? "BTCS Standard" : "Specification 2"}
            </p>
            <p className={`mb-3 text-xs text-center ${(isClientContext || spec2File) ? "text-[#4caf50]" : isDarkMode ? "text-[#64b5f6]" : "text-[#64748b]"}`}>
              {spec2Name || "Drop file or click to browse"}
            </p>
            {!isClientContext && (
              <>
                <Button variant="secondary" size="sm" onClick={() => handleFileUpload("spec2-upload")}>
                  {spec2File ? "Change File" : "Select File"}
                </Button>
                <input type="file" id="spec2-upload" className="hidden" accept=".xml,.txt" onChange={handleSpec2Upload} />
              </>
            )}
          </div>
        </div>

        {/* Action Buttons - only show when not in client context */}
        {!isClientContext && (
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
        )}
      </Card>

      {/* Empty State - only show when not in client context and no results */}
      {!isClientContext && !specCompareResults && (
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
      {displayResults && (
        <div className="space-y-6">
          {/* Summary Stats */}
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <Card className={`p-4 ${displayResults.compatible ? "" : "border-l-4 border-l-[#f44336]"}`}>
              <div className="flex items-center gap-3">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${displayResults.compatible ? "bg-[#4caf50]/20" : "bg-[#f44336]/20"}`}>
                  {displayResults.compatible 
                    ? <CheckCircle className="h-6 w-6 text-[#4caf50]" />
                    : <AlertTriangle className="h-6 w-6 text-[#f44336]" />
                  }
                </div>
                <div>
                  <p className={`text-sm font-bold ${displayResults.compatible ? "text-[#4caf50]" : "text-[#f44336]"}`}>
                    {displayResults.compatible ? "Compatible" : "Incompatible"}
                  </p>
                  <p className={`text-xs ${isDarkMode ? "text-[#64b5f6]" : "text-[#64748b]"}`}>Overall Status</p>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-[#f57c00]/20`}>
                  <MessageSquare className="h-6 w-6 text-[#f57c00]" />
                </div>
                <div>
                  <p className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-[#0a1628]"}`}>
                    {displayResults.msgTypeDiffs.spec1Only.length + displayResults.msgTypeDiffs.spec2Only.length}
                  </p>
                  <p className={`text-xs ${isDarkMode ? "text-[#64b5f6]" : "text-[#64748b]"}`}>MsgType Diffs</p>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-[#00e5ff]/20`}>
                  <FileText className="h-6 w-6 text-[#00e5ff]" />
                </div>
                <div>
                  <p className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-[#0a1628]"}`}>
                    {displayResults.tagDiffs.spec1Missing.length + displayResults.tagDiffs.spec2Missing.length}
                  </p>
                  <p className={`text-xs ${isDarkMode ? "text-[#64b5f6]" : "text-[#64748b]"}`}>Tag Diffs</p>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-[#ffc107]/20`}>
                  <Settings className="h-6 w-6 text-[#ffc107]" />
                </div>
                <div>
                  <p className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-[#0a1628]"}`}>
                    {displayResults.valueDiffs.length + displayResults.otherDiffs.length}
                  </p>
                  <p className={`text-xs ${isDarkMode ? "text-[#64b5f6]" : "text-[#64748b]"}`}>Other Diffs</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Module 1: Message Type Differences */}
          <Card className="p-5">
            <h3 className={`mb-4 flex items-center gap-2 font-semibold ${isDarkMode ? "text-[#f57c00]" : "text-[#e65100]"}`}>
              <MessageSquare className="h-5 w-5" />
              1. Message Type Differences
            </h3>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              {/* Spec 1 Only */}
              <div className={`rounded-xl border p-4 ${isDarkMode ? "border-[#1e4976] bg-[#0a1628]" : "border-[#e2e8f0] bg-[#fef2f2]"}`}>
                <div className="mb-3 flex items-center justify-between">
                  <span className={`text-sm font-semibold ${isDarkMode ? "text-[#f44336]" : "text-[#d32f2f]"}`}>
                    {isClientContext ? "In Client Spec, NOT in BTCS" : "In Spec 1, NOT in Spec 2"}
                  </span>
                  <span className="rounded-full bg-[#f44336]/20 px-2 py-0.5 text-xs font-medium text-[#f44336]">
                    {displayResults.msgTypeDiffs.spec1Only.length}
                  </span>
                </div>
                <div className="space-y-2">
                  {displayResults.msgTypeDiffs.spec1Only.map((msg: any, i: number) => (
                    <div key={i} className={`flex items-center gap-2 rounded-lg px-3 py-2 ${isDarkMode ? "bg-[#f44336]/10" : "bg-white"}`}>
                      <Minus className="h-4 w-4 text-[#f44336]" />
                      <span className={`text-sm ${isDarkMode ? "text-white" : "text-[#0a1628]"}`}>{typeof msg === 'string' ? msg : `${msg.code} - ${msg.name}`}</span>
                    </div>
                  ))}
                </div>
              </div>
              {/* Spec 2 Only */}
              <div className={`rounded-xl border p-4 ${isDarkMode ? "border-[#1e4976] bg-[#0a1628]" : "border-[#e2e8f0] bg-[#f0fdf4]"}`}>
                <div className="mb-3 flex items-center justify-between">
                  <span className={`text-sm font-semibold ${isDarkMode ? "text-[#4caf50]" : "text-[#388e3c]"}`}>
                    In Spec 2, NOT in Spec 1
                  </span>
                  <span className="rounded-full bg-[#4caf50]/20 px-2 py-0.5 text-xs font-medium text-[#4caf50]">
                    {displayResults.msgTypeDiffs.spec2Only.length}
                  </span>
                </div>
                <div className="space-y-2">
                  {displayResults.msgTypeDiffs.spec2Only.map((msg, i) => (
                    <div key={i} className={`flex items-center gap-2 rounded-lg px-3 py-2 ${isDarkMode ? "bg-[#4caf50]/10" : "bg-white"}`}>
                      <Plus className="h-4 w-4 text-[#4caf50]" />
                      <span className={`text-sm ${isDarkMode ? "text-white" : "text-[#0a1628]"}`}>{msg}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* Module 2: Message Tag Differences */}
          <Card className="p-5">
            <h3 className={`mb-4 flex items-center gap-2 font-semibold ${isDarkMode ? "text-[#00e5ff]" : "text-[#0097a7]"}`}>
              <FileText className="h-5 w-5" />
              2. Message Tag Differences
            </h3>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              {/* Tags in Spec 1 missing from Spec 2 */}
              <div className={`rounded-xl border p-4 ${isDarkMode ? "border-[#1e4976] bg-[#0a1628]" : "border-[#e2e8f0] bg-[#fef2f2]"}`}>
                <div className="mb-3">
                  <span className={`text-sm font-semibold ${isDarkMode ? "text-[#f44336]" : "text-[#d32f2f]"}`}>
                    Tags in Spec 1, missing from Spec 2
                  </span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className={`border-b ${isDarkMode ? "border-[#1e4976]" : "border-[#e2e8f0]"}`}>
                        <th className={`px-3 py-2 text-left text-xs font-semibold ${isDarkMode ? "text-[#64b5f6]" : "text-[#64748b]"}`}>Message Type</th>
                        <th className={`px-3 py-2 text-left text-xs font-semibold ${isDarkMode ? "text-[#64b5f6]" : "text-[#64748b]"}`}>Missing Tags</th>
                      </tr>
                    </thead>
                    <tbody>
                      {displayResults.tagDiffs.spec2Missing.map((item, i) => (
                        <tr key={i} className={`border-b ${isDarkMode ? "border-[#1e4976]" : "border-[#e2e8f0]"}`}>
                          <td className={`px-3 py-2 ${isDarkMode ? "text-white" : "text-[#0a1628]"}`}>
                            <span className={`rounded px-2 py-0.5 text-xs font-medium ${isDarkMode ? "bg-[#1e4976]" : "bg-[#e2e8f0]"}`}>
                              {item.msgType}
                            </span>
                            <span className={`ml-2 text-xs ${isDarkMode ? "text-[#90caf9]" : "text-[#64748b]"}`}>{item.msgName}</span>
                          </td>
                          <td className="px-3 py-2">
                            <div className="flex flex-wrap gap-1">
                              {item.tags.map((tag, j) => (
                                <span key={j} className="rounded bg-[#f44336]/20 px-2 py-0.5 text-xs font-mono text-[#f44336]">{tag}</span>
                              ))}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              {/* Tags in Spec 2 missing from Spec 1 */}
              <div className={`rounded-xl border p-4 ${isDarkMode ? "border-[#1e4976] bg-[#0a1628]" : "border-[#e2e8f0] bg-[#f0fdf4]"}`}>
                <div className="mb-3">
                  <span className={`text-sm font-semibold ${isDarkMode ? "text-[#4caf50]" : "text-[#388e3c]"}`}>
                    Tags in Spec 2, missing from Spec 1
                  </span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className={`border-b ${isDarkMode ? "border-[#1e4976]" : "border-[#e2e8f0]"}`}>
                        <th className={`px-3 py-2 text-left text-xs font-semibold ${isDarkMode ? "text-[#64b5f6]" : "text-[#64748b]"}`}>Message Type</th>
                        <th className={`px-3 py-2 text-left text-xs font-semibold ${isDarkMode ? "text-[#64b5f6]" : "text-[#64748b]"}`}>Missing Tags</th>
                      </tr>
                    </thead>
                    <tbody>
                      {displayResults.tagDiffs.spec1Missing.map((item, i) => (
                        <tr key={i} className={`border-b ${isDarkMode ? "border-[#1e4976]" : "border-[#e2e8f0]"}`}>
                          <td className={`px-3 py-2 ${isDarkMode ? "text-white" : "text-[#0a1628]"}`}>
                            <span className={`rounded px-2 py-0.5 text-xs font-medium ${isDarkMode ? "bg-[#1e4976]" : "bg-[#e2e8f0]"}`}>
                              {item.msgType}
                            </span>
                            <span className={`ml-2 text-xs ${isDarkMode ? "text-[#90caf9]" : "text-[#64748b]"}`}>{item.msgName}</span>
                          </td>
                          <td className="px-3 py-2">
                            <div className="flex flex-wrap gap-1">
                              {item.tags.map((tag, j) => (
                                <span key={j} className="rounded bg-[#4caf50]/20 px-2 py-0.5 text-xs font-mono text-[#4caf50]">{tag}</span>
                              ))}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </Card>

          {/* Module 3: Supported Values Differences */}
          <Card className="p-5">
            <h3 className={`mb-4 flex items-center gap-2 font-semibold ${isDarkMode ? "text-[#ffc107]" : "text-[#f57c00]"}`}>
              <RefreshCw className="h-5 w-5" />
              3. Supported Values Differences
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className={isDarkMode ? "bg-[#0d1f3c]" : "bg-[#f8fafc]"}>
                    <th className={`px-4 py-3 text-left text-xs font-semibold ${isDarkMode ? "text-[#64b5f6]" : "text-[#64748b]"}`}>MsgType</th>
                    <th className={`px-4 py-3 text-left text-xs font-semibold ${isDarkMode ? "text-[#64b5f6]" : "text-[#64748b]"}`}>Tag</th>
                    <th className={`px-4 py-3 text-left text-xs font-semibold ${isDarkMode ? "text-[#64b5f6]" : "text-[#64748b]"}`}>Field Name</th>
                    <th className={`px-4 py-3 text-left text-xs font-semibold ${isDarkMode ? "text-[#64b5f6]" : "text-[#64748b]"}`}>Spec 1 Values</th>
                    <th className={`px-4 py-3 text-left text-xs font-semibold ${isDarkMode ? "text-[#64b5f6]" : "text-[#64748b]"}`}>Spec 2 Values</th>
                  </tr>
                </thead>
                <tbody>
                  {displayResults.valueDiffs.map((item, i) => (
                    <tr key={i} className={`border-t ${isDarkMode ? "border-[#1e4976]" : "border-[#e2e8f0]"} ${i % 2 === 0 ? (isDarkMode ? "bg-[#0f2847]" : "bg-white") : (isDarkMode ? "bg-[#0a1628]" : "bg-[#f8fafc]")}`}>
                      <td className={`px-4 py-3 ${isDarkMode ? "text-white" : "text-[#0a1628]"}`}>
                        <span className={`rounded px-2 py-0.5 text-xs font-medium ${isDarkMode ? "bg-[#1e4976]" : "bg-[#e2e8f0]"}`}>{item.msgType}</span>
                      </td>
                      <td className={`px-4 py-3 font-mono text-sm ${isDarkMode ? "text-[#00e5ff]" : "text-[#1976d2]"}`}>{item.tag}</td>
                      <td className={`px-4 py-3 text-sm ${isDarkMode ? "text-white" : "text-[#0a1628]"}`}>{item.tagName}</td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-1">
                          {item.spec1Values.map((v, j) => (
                            <span key={j} className={`rounded px-2 py-0.5 text-xs font-mono ${
                              item.spec2Values.includes(v) 
                                ? isDarkMode ? "bg-[#1e4976] text-[#90caf9]" : "bg-[#e2e8f0] text-[#64748b]"
                                : "bg-[#f44336]/20 text-[#f44336]"
                            }`}>{v}</span>
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-1">
                          {item.spec2Values.map((v, j) => (
                            <span key={j} className={`rounded px-2 py-0.5 text-xs font-mono ${
                              item.spec1Values.includes(v) 
                                ? isDarkMode ? "bg-[#1e4976] text-[#90caf9]" : "bg-[#e2e8f0] text-[#64748b]"
                                : "bg-[#4caf50]/20 text-[#4caf50]"
                            }`}>{v}</span>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className={`mt-3 text-xs ${isDarkMode ? "text-[#64b5f6]" : "text-[#64748b]"}`}>
              Red = Only in Spec 1 | Green = Only in Spec 2 | Gray = Common to both
            </p>
          </Card>

          {/* Module 4: Other Differences */}
          <Card className="p-5">
            <h3 className={`mb-4 flex items-center gap-2 font-semibold ${isDarkMode ? "text-[#ce93d8]" : "text-[#7b1fa2]"}`}>
              <Settings className="h-5 w-5" />
              4. Other Differences (Data Type, Required/Optional, Conditional, Structure)
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className={isDarkMode ? "bg-[#0d1f3c]" : "bg-[#f8fafc]"}>
                    <th className={`px-4 py-3 text-left text-xs font-semibold ${isDarkMode ? "text-[#64b5f6]" : "text-[#64748b]"}`}>Category</th>
                    <th className={`px-4 py-3 text-left text-xs font-semibold ${isDarkMode ? "text-[#64b5f6]" : "text-[#64748b]"}`}>Description</th>
                    <th className={`px-4 py-3 text-left text-xs font-semibold ${isDarkMode ? "text-[#64b5f6]" : "text-[#64748b]"}`}>Spec 1</th>
                    <th className={`px-4 py-3 text-left text-xs font-semibold ${isDarkMode ? "text-[#64b5f6]" : "text-[#64748b]"}`}>Spec 2</th>
                  </tr>
                </thead>
                <tbody>
                  {displayResults.otherDiffs.map((item, i) => (
                    <tr key={i} className={`border-t ${isDarkMode ? "border-[#1e4976]" : "border-[#e2e8f0]"} ${i % 2 === 0 ? (isDarkMode ? "bg-[#0f2847]" : "bg-white") : (isDarkMode ? "bg-[#0a1628]" : "bg-[#f8fafc]")}`}>
                      <td className="px-4 py-3">
                        <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                          item.category === "Data Type" ? "bg-[#9c27b0]/20 text-[#9c27b0]" :
                          item.category === "Required/Optional" ? "bg-[#ff5722]/20 text-[#ff5722]" :
                          item.category === "Conditional" ? "bg-[#00bcd4]/20 text-[#00bcd4]" :
                          item.category === "Group Structure" ? "bg-[#4caf50]/20 text-[#4caf50]" :
                          "bg-[#ffc107]/20 text-[#ffc107]"
                        }`}>{item.category}</span>
                      </td>
                      <td className={`px-4 py-3 text-sm ${isDarkMode ? "text-white" : "text-[#0a1628]"}`}>{item.description}</td>
                      <td className={`px-4 py-3 text-sm ${isDarkMode ? "text-[#f44336]" : "text-[#d32f2f]"}`}>
                        <span className={`rounded px-2 py-0.5 ${isDarkMode ? "bg-[#f44336]/10" : "bg-[#fef2f2]"}`}>{item.spec1}</span>
                      </td>
                      <td className={`px-4 py-3 text-sm ${isDarkMode ? "text-[#4caf50]" : "text-[#388e3c]"}`}>
                        <span className={`rounded px-2 py-0.5 ${isDarkMode ? "bg-[#4caf50]/10" : "bg-[#f0fdf4]"}`}>{item.spec2}</span>
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
}

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
    if (client.progress.certificationCaseGeneration === "done") count++
    if (client.progress.configurationGeneration === "done") count++
    if (client.progress.alerts === "generated") count++
    return count
  }

  const sortedDashboardClients = [...clients]
    .filter(c => {
      // Client name filter
      if (selectedClientsFilter.length > 0 && !selectedClientsFilter.includes(c.id)) return false
      // Status column filters
      if (specComparisonFilter.length > 0 && !specComparisonFilter.includes(c.progress.specComparison)) return false
      if (logComparisonFilter.length > 0 && !logComparisonFilter.includes(c.progress.logComparison)) return false
      if (testCaseFilter2.length > 0 && !testCaseFilter2.includes(c.progress.testCaseGeneration)) return false
      if (certCaseFilter.length > 0 && !certCaseFilter.includes(c.progress.certificationCaseGeneration)) return false
      if (configFilter.length > 0 && !configFilter.includes(c.progress.configurationGeneration)) return false
      if (alertsFilter.length > 0 && !alertsFilter.includes(c.progress.alerts)) return false
      return true
    })
    .sort((a, b) => a.name.localeCompare(b.name))

  // Column Filter Dropdown Component
  const ColumnFilterDropdown = ({ 
    column, 
    options, 
    selectedValues, 
    onToggle,
    isClient = false 
  }: { 
    column: string
    options: {value: string; label: string}[]
    selectedValues: string[]
    onToggle: (value: string) => void
    isClient?: boolean
  }) => {
    const isOpen = activeColumnFilter === column
    return (
      <div className="relative">
        <button
          onClick={(e) => { e.stopPropagation(); setActiveColumnFilter(isOpen ? null : column); }}
          className={`flex items-center gap-1 px-3 py-2 text-left text-xs font-semibold transition-colors rounded ${
            selectedValues.length > 0 
              ? isDarkMode ? "bg-[#1976d2]/30 text-[#00e5ff]" : "bg-[#1976d2]/20 text-[#1976d2]"
              : isDarkMode ? "text-[#90caf9] hover:bg-[#1e4976]" : "text-[#64748b] hover:bg-[#e2e8f0]"
          }`}
        >
          {column}
          {selectedValues.length > 0 && (
            <span className={`ml-1 px-1.5 py-0.5 text-[10px] rounded-full ${isDarkMode ? "bg-[#00e5ff] text-[#0a1628]" : "bg-[#1976d2] text-white"}`}>
              {selectedValues.length}
            </span>
          )}
          <Filter className="ml-1 h-3 w-3" />
        </button>
        {isOpen && (
          <div 
            className={`absolute top-full left-0 z-50 mt-1 min-w-[200px] rounded-lg border shadow-xl ${
              isDarkMode ? "bg-[#0d1f3c] border-[#1e4976]" : "bg-white border-[#e2e8f0]"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`p-2 border-b ${isDarkMode ? "border-[#1e4976]" : "border-[#e2e8f0]"}`}>
              <button
                onClick={() => options.forEach(o => { if (selectedValues.includes(o.value)) onToggle(o.value) })}
                className={`text-xs ${isDarkMode ? "text-[#90caf9] hover:text-white" : "text-[#64748b] hover:text-[#0a1628]"}`}
              >
                Clear All
              </button>
            </div>
            <div className="max-h-[250px] overflow-y-auto p-2">
              {options.map(option => (
                <label 
                  key={option.value}
                  className={`flex items-center gap-2 px-2 py-1.5 rounded cursor-pointer ${
                    isDarkMode ? "hover:bg-[#1e4976]" : "hover:bg-[#f1f5f9]"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedValues.includes(option.value)}
                    onChange={() => onToggle(option.value)}
                    className="rounded border-gray-300"
                  />
                  <span className={`text-sm ${isDarkMode ? "text-white" : "text-[#0a1628]"}`}>
                    {option.label}
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }

  const statusOptions = [
    { value: "done", label: "Done" },
    { value: "progress", label: "In Progress" },
    { value: "pending", label: "Pending" },
    { value: "error", label: "Error" },
  ]
  
  const alertStatusOptions = [
    { value: "generated", label: "Generated" },
    { value: "pending", label: "Pending" },
    { value: "error", label: "Error" },
  ]

  const clientOptions = clients.map(c => ({ value: c.id, label: c.name }))

  const toggleFilter = (setter: React.Dispatch<React.SetStateAction<string[]>>, value: string) => {
    setter(prev => prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value])
  }

  // Dashboard Panel (default)
  const DashboardPanel = () => (
    <div className="p-6" onClick={() => setActiveColumnFilter(null)}>
      {/* Client Work Progress Section */}
      <div className="mb-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-[#0a1628]"}`}>Client Work Progress</h2>
          <div className="flex items-center gap-3">
            {(selectedClientsFilter.length > 0 || specComparisonFilter.length > 0 || logComparisonFilter.length > 0 || testCaseFilter2.length > 0 || certCaseFilter.length > 0 || configFilter.length > 0 || alertsFilter.length > 0) && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => {
                  setSelectedClientsFilter([])
                  setSpecComparisonFilter([])
                  setLogComparisonFilter([])
                  setTestCaseFilter2([])
                  setCertCaseFilter([])
                  setConfigFilter([])
                  setAlertsFilter([])
                }}
              >
                <X className="mr-1 h-3 w-3" />
                Clear All Filters
              </Button>
            )}
            <Button variant="ghost" size="sm" onClick={() => setActiveSidebarItem("clients")}>
              View All Clients
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {/* Progress Table */}
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className={`border-b ${isDarkMode ? "border-[#1e4976] bg-[#0d1f3c]" : "border-[#e2e8f0] bg-[#f8fafc]"}`}>
                  <th className="px-2 py-2">
                    <ColumnFilterDropdown 
                      column="Client" 
                      options={clientOptions} 
                      selectedValues={selectedClientsFilter}
                      onToggle={(v) => toggleFilter(setSelectedClientsFilter, v)}
                      isClient
                    />
                  </th>
                  <th className="px-2 py-2">
                    <ColumnFilterDropdown 
                      column="FIX Spec Comparison" 
                      options={statusOptions} 
                      selectedValues={specComparisonFilter}
                      onToggle={(v) => toggleFilter(setSpecComparisonFilter, v)}
                    />
                  </th>
                  <th className="px-2 py-2">
                    <ColumnFilterDropdown 
                      column="Log Comparison" 
                      options={statusOptions} 
                      selectedValues={logComparisonFilter}
                      onToggle={(v) => toggleFilter(setLogComparisonFilter, v)}
                    />
                  </th>
                  <th className="px-2 py-2">
                    <ColumnFilterDropdown 
                      column="Test Case Generation" 
                      options={statusOptions} 
                      selectedValues={testCaseFilter2}
                      onToggle={(v) => toggleFilter(setTestCaseFilter2, v)}
                    />
                  </th>
                  <th className="px-2 py-2">
                    <ColumnFilterDropdown 
                      column="Certification Case Gen" 
                      options={statusOptions} 
                      selectedValues={certCaseFilter}
                      onToggle={(v) => toggleFilter(setCertCaseFilter, v)}
                    />
                  </th>
                  <th className="px-2 py-2">
                    <ColumnFilterDropdown 
                      column="Configuration Gen" 
                      options={statusOptions} 
                      selectedValues={configFilter}
                      onToggle={(v) => toggleFilter(setConfigFilter, v)}
                    />
                  </th>
                  <th className="px-2 py-2">
                    <ColumnFilterDropdown 
                      column="Alerts" 
                      options={alertStatusOptions} 
                      selectedValues={alertsFilter}
                      onToggle={(v) => toggleFilter(setAlertsFilter, v)}
                    />
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedDashboardClients.map((client, idx) => (
                  <tr 
                    key={client.id} 
                    onClick={() => { setViewingClient(client); setCurrentScreen("client-detail"); }}
                    className={`border-b transition-colors cursor-pointer ${
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
                    <td className="px-4 py-3"><ProgressBadge status={client.progress.certificationCaseGeneration} /></td>
                    <td className="px-4 py-3"><ProgressBadge status={client.progress.configurationGeneration} /></td>
                    <td className="px-4 py-3">
                      <ULTestCasesBadge 
                        status={client.progress.alerts} 
                        count={client.progress.alertsCount}
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
                Total Alerts: <span className="font-semibold text-[#4caf50]">{showULTestCasesModal.progress.alertsCount || 0}</span>
              </p>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {Array.from({ length: Math.min(showULTestCasesModal.progress.alertsCount || 0, 10) }).map((_, i) => (
                  <div key={i} className={`flex items-center justify-between rounded-lg p-3 ${isDarkMode ? "bg-[#0d1f3c]" : "bg-white border border-[#e2e8f0]"}`}>
                    <div className="flex items-center gap-3">
                      <TestTube className={`h-4 w-4 ${isDarkMode ? "text-[#00e5ff]" : "text-[#1976d2]"}`} />
                      <span className={`text-sm ${isDarkMode ? "text-white" : "text-[#0a1628]"}`}>Test Case #{i + 1} - Message Type {["D", "8", "F", "G", "A"][i % 5]}</span>
                    </div>
                    <span className="rounded-full bg-[#4caf50]/20 px-2 py-0.5 text-xs text-[#4caf50]">Passed</span>
                  </div>
                ))}
              </div>
              {(showULTestCasesModal.progress.alertsCount || 0) > 10 && (
                <p className={`mt-3 text-center text-xs ${isDarkMode ? "text-[#64b5f6]" : "text-[#64748b]"}`}>
                  Showing 10 of {showULTestCasesModal.progress.alertsCount} alerts
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

  // Quick Sender helper functions
  const addCustomTag = () => {
    setQuickSenderCustomTags([...quickSenderCustomTags, {tag: "", value: ""}])
  }
  
  const removeCustomTag = (index: number) => {
    setQuickSenderCustomTags(quickSenderCustomTags.filter((_, i) => i !== index))
  }
  
  const updateCustomTag = (index: number, field: "tag" | "value", newValue: string) => {
    const updated = [...quickSenderCustomTags]
    updated[index][field] = newValue
    setQuickSenderCustomTags(updated)
  }
  
  const connectQuickSender = () => {
    if (quickSenderHost && quickSenderPort) {
      setQuickSenderStatus("connecting")
      // Simulate connection
      setTimeout(() => {
        setQuickSenderStatus("connected")
        setQuickSenderConnected(true)
        setQuickSenderLogs([
          ...quickSenderLogs,
          { time: new Date().toLocaleTimeString(), direction: "out", message: `Connecting to ${quickSenderHost}:${quickSenderPort}...` },
          { time: new Date().toLocaleTimeString(), direction: "in", message: "Connection established" }
        ])
        addHistoryEntry("Quick Sender Connected", "success", `Connected to ${quickSenderHost}:${quickSenderPort}`)
      }, 1500)
    }
  }
  
  const disconnectQuickSender = () => {
    setQuickSenderStatus("disconnected")
    setQuickSenderConnected(false)
    setQuickSenderLogs([
      ...quickSenderLogs,
      { time: new Date().toLocaleTimeString(), direction: "out", message: "Disconnecting..." },
      { time: new Date().toLocaleTimeString(), direction: "in", message: "Connection closed" }
    ])
  }
  
  const sendQuickMessage = () => {
    if (msgGenOutput && quickSenderConnected) {
      const timestamp = new Date().toLocaleTimeString()
      setQuickSenderLogs([
        ...quickSenderLogs,
        { time: timestamp, direction: "out", message: msgGenOutput }
      ])
      // Simulate response
      setTimeout(() => {
        setQuickSenderLogs(prev => [
          ...prev,
          { time: new Date().toLocaleTimeString(), direction: "in", message: "8=FIX.4.4|9=65|35=0|49=TARGET|56=SENDER|34=2|52=20250302-10:30:00|112=TEST|10=173|" }
        ])
      }, 500)
      addHistoryEntry("FIX Message Sent", "success", `Message sent to ${quickSenderHost}:${quickSenderPort}`)
    }
  }

  // Message Generator Panel
  const MessageGeneratorPanel = () => (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-[#0a1628]"}`}>FIX Message Generator</h2>
          <p className={`text-sm ${isDarkMode ? "text-[#64b5f6]" : "text-[#64748b]"}`}>Build FIX messages from spec or log files and send via TCP/IP</p>
        </div>
        {msgGenStep > 1 && (
          <Button variant="ghost" size="sm" onClick={resetMsgGenerator}>
            <RefreshCw className="mr-1 h-4 w-4" />
            Start Over
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Side - Message Builder */}
        <div className="lg:col-span-2">
          {/* Progress Steps */}
          <div className="mb-6 flex items-center justify-center gap-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center gap-2">
                <div className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold transition-all ${
                  msgGenStep >= step 
                    ? isDarkMode ? "bg-[#00e5ff] text-[#0a1628]" : "bg-[#0a1628] text-white"
                    : isDarkMode ? "bg-[#1e4976] text-[#64b5f6]" : "bg-[#e2e8f0] text-[#64748b]"
                }`}>
                  {step}
                </div>
                <span className={`text-sm font-medium ${
                  msgGenStep >= step 
                    ? isDarkMode ? "text-white" : "text-[#0a1628]"
                    : isDarkMode ? "text-[#64b5f6]" : "text-[#64748b]"
                }`}>
                  {step === 1 ? "Upload File" : step === 2 ? "Select Message" : "Edit Fields"}
                </span>
                {step < 3 && <ChevronRight className={`h-4 w-4 ${isDarkMode ? "text-[#1e4976]" : "text-[#cbd5e1]"}`} />}
              </div>
            ))}
          </div>

          {/* Step 1: Upload File */}
          {msgGenStep === 1 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {/* Upload FIX Spec */}
                <Card 
                  className={`cursor-pointer p-6 transition-all hover:shadow-lg ${
                    msgGenSpecFile 
                      ? isDarkMode ? "border-[#4caf50] bg-[#4caf50]/10" : "border-[#4caf50] bg-[#4caf50]/5"
                      : ""
                  }`}
                  onClick={() => handleFileUpload("msg-gen-spec")}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className={`mb-4 flex h-16 w-16 items-center justify-center rounded-2xl ${
                      msgGenSpecFile 
                        ? "bg-[#4caf50]/20"
                        : isDarkMode ? "bg-[#1e4976]" : "bg-[#e2e8f0]"
                    }`}>
                      <FileText className={`h-8 w-8 ${
                        msgGenSpecFile ? "text-[#4caf50]" : isDarkMode ? "text-[#00e5ff]" : "text-[#0a1628]"
                      }`} />
                    </div>
                    <h3 className={`mb-2 text-lg font-semibold ${isDarkMode ? "text-white" : "text-[#0a1628]"}`}>
                      Upload FIX Specification
                    </h3>
                    <p className={`mb-4 text-sm ${isDarkMode ? "text-[#64b5f6]" : "text-[#64748b]"}`}>
                      {msgGenSpecFile || "XML or TXT format"}
                    </p>
                    <Button variant={msgGenSpecFile ? "primary" : "secondary"} size="sm">
                      {msgGenSpecFile ? "Change File" : "Select Spec File"}
                    </Button>
                  </div>
                  <input type="file" id="msg-gen-spec" className="hidden" accept=".xml,.txt" onChange={handleMsgGenSpecUpload} />
                </Card>

                {/* Upload Log File */}
                <Card 
                  className={`cursor-pointer p-6 transition-all hover:shadow-lg ${
                    msgGenLogFile 
                      ? isDarkMode ? "border-[#4caf50] bg-[#4caf50]/10" : "border-[#4caf50] bg-[#4caf50]/5"
                      : ""
                  }`}
                  onClick={() => handleFileUpload("msg-gen-log")}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className={`mb-4 flex h-16 w-16 items-center justify-center rounded-2xl ${
                      msgGenLogFile 
                        ? "bg-[#4caf50]/20"
                        : isDarkMode ? "bg-[#1e4976]" : "bg-[#e2e8f0]"
                    }`}>
                      <Upload className={`h-8 w-8 ${
                        msgGenLogFile ? "text-[#4caf50]" : isDarkMode ? "text-[#00e5ff]" : "text-[#0a1628]"
                      }`} />
                    </div>
                    <h3 className={`mb-2 text-lg font-semibold ${isDarkMode ? "text-white" : "text-[#0a1628]"}`}>
                      Upload Log File
                    </h3>
                    <p className={`mb-4 text-sm ${isDarkMode ? "text-[#64b5f6]" : "text-[#64748b]"}`}>
                      {msgGenLogFile || "LOG or TXT format"}
                    </p>
                    <Button variant={msgGenLogFile ? "primary" : "secondary"} size="sm">
                      {msgGenLogFile ? "Change File" : "Select Log File"}
                    </Button>
                  </div>
                  <input type="file" id="msg-gen-log" className="hidden" accept=".log,.txt" onChange={handleMsgGenLogUpload} />
                </Card>
              </div>

              {/* Continue Button for Step 1 */}
              <div className="flex justify-center gap-4">
                {(msgGenSpecFile || msgGenLogFile) && (
                  <Button variant="primary" onClick={() => setMsgGenStep(2)}>
                    Continue to Message Selection
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                )}
                <Button 
                  variant="ghost" 
                  onClick={() => {
                    setMsgGenSpecFile("FIX44_Sample.xml")
                    setMsgGenStep(2)
                  }}
                >
                  <Play className="mr-1 h-4 w-4" />
                  Try Sample
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Select Message Type */}
          {msgGenStep === 2 && (
            <Card className="p-6">
              <h3 className={`mb-4 text-lg font-semibold ${isDarkMode ? "text-white" : "text-[#0a1628]"}`}>
                Select Message Type
              </h3>
              <p className={`mb-6 text-sm ${isDarkMode ? "text-[#64b5f6]" : "text-[#64748b]"}`}>
                Choose the FIX message type you want to generate
              </p>
              <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
                {msgTypes.map((type) => (
                  <button
                    key={type.code}
                    onClick={() => selectMsgGenType(type.code)}
                    className={`flex flex-col items-center rounded-xl border-2 p-4 transition-all ${
                      msgGenSelectedType === type.code
                        ? isDarkMode 
                          ? "border-[#00e5ff] bg-[#00e5ff]/10" 
                          : "border-[#0a1628] bg-[#0a1628]/5"
                        : isDarkMode 
                          ? "border-[#1e4976] hover:border-[#00e5ff]/50 hover:bg-[#1e4976]/50" 
                          : "border-[#e2e8f0] hover:border-[#0a1628]/30 hover:bg-[#f1f5f9]"
                    }`}
                  >
                    <span className={`mb-1 text-2xl font-bold ${isDarkMode ? "text-[#00e5ff]" : "text-[#0a1628]"}`}>
                      {type.code}
                    </span>
                    <span className={`text-center text-xs ${isDarkMode ? "text-[#90caf9]" : "text-[#64748b]"}`}>
                      {type.name}
                    </span>
                  </button>
                ))}
              </div>
            </Card>
          )}

          {/* Step 3: Edit Fields */}
          {msgGenStep === 3 && (
            <div className="space-y-6">
              {/* Field Editor */}
              <Card className="p-6">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <h3 className={`text-lg font-semibold ${isDarkMode ? "text-white" : "text-[#0a1628]"}`}>
                      Edit Message Fields
                    </h3>
                    <p className={`text-sm ${isDarkMode ? "text-[#64b5f6]" : "text-[#64748b]"}`}>
                      Customize the field values for your {msgTypes.find(t => t.code === msgGenSelectedType)?.name} message
                    </p>
                  </div>
                  <span className={`rounded-lg px-3 py-1 text-sm font-semibold ${isDarkMode ? "bg-[#00e5ff]/20 text-[#00e5ff]" : "bg-[#0a1628]/10 text-[#0a1628]"}`}>
                    MsgType: {msgGenSelectedType}
                  </span>
                </div>

                <div className={`overflow-hidden rounded-xl border ${isDarkMode ? "border-[#1e4976]" : "border-[#e2e8f0]"}`}>
                  <table className="w-full">
                    <thead>
                      <tr className={isDarkMode ? "bg-[#0d1f3c]" : "bg-[#f8fafc]"}>
                        <th className={`px-4 py-3 text-left text-xs font-semibold ${isDarkMode ? "text-[#64b5f6]" : "text-[#64748b]"}`}>Tag</th>
                        <th className={`px-4 py-3 text-left text-xs font-semibold ${isDarkMode ? "text-[#64b5f6]" : "text-[#64748b]"}`}>Field Name</th>
                        <th className={`px-4 py-3 text-left text-xs font-semibold ${isDarkMode ? "text-[#64b5f6]" : "text-[#64748b]"}`}>Value</th>
                        <th className={`px-4 py-3 text-left text-xs font-semibold ${isDarkMode ? "text-[#64b5f6]" : "text-[#64748b]"}`}>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {msgGenFields.map((field, i) => (
                        <tr key={i} className={`border-t ${isDarkMode ? "border-[#1e4976]" : "border-[#e2e8f0]"} ${i % 2 === 0 ? (isDarkMode ? "bg-[#0f2847]" : "bg-white") : (isDarkMode ? "bg-[#0a1628]" : "bg-[#f8fafc]")}`}>
                          <td className={`px-4 py-3 font-mono text-sm ${isDarkMode ? "text-[#00e5ff]" : "text-[#1976d2]"}`}>
                            {field.tag}
                          </td>
                          <td className={`px-4 py-3 text-sm ${isDarkMode ? "text-white" : "text-[#0a1628]"}`}>
                            {field.name}
                          </td>
                          <td className="px-4 py-3">
                            {field.editable ? (
                              <input
                                type="text"
                                value={field.value}
                                onChange={(e) => updateMsgGenField(i, e.target.value)}
                                className={`w-full rounded-lg border px-3 py-1.5 text-sm ${
                                  isDarkMode 
                                    ? "border-[#1e4976] bg-[#0a1628] text-white focus:border-[#00e5ff]" 
                                    : "border-[#e2e8f0] bg-white text-[#0a1628] focus:border-[#0a1628]"
                                }`}
                              />
                            ) : (
                              <span className={`font-mono text-sm ${isDarkMode ? "text-[#90caf9]" : "text-[#64748b]"}`}>
                                {field.value}
                              </span>
                            )}
                          </td>
                          <td className="px-4 py-3">
                            <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                              field.editable 
                                ? "bg-[#4caf50]/20 text-[#4caf50]" 
                            : isDarkMode ? "bg-[#1e4976] text-[#64b5f6]" : "bg-[#e2e8f0] text-[#64748b]"
                        }`}>
                          {field.editable ? "Editable" : "Fixed"}
                        </span>
                      </td>
                    </tr>
                  ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-6 flex justify-end gap-3">
                  <Button variant="secondary" onClick={() => setMsgGenStep(2)}>
                    Back to Message Type
                  </Button>
                  <Button variant="primary" onClick={generateFinalMessage}>
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Generate FIX Message
                  </Button>
                </div>
              </Card>

          {/* Generated Output */}
          {msgGenOutput && (
            <Card className="p-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className={`text-lg font-semibold ${isDarkMode ? "text-white" : "text-[#0a1628]"}`}>
                  Generated FIX Message
                </h3>
                <div className="flex gap-2">
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    onClick={() => navigator.clipboard.writeText(msgGenOutput.replace(/\|/g, String.fromCharCode(1)))}
                  >
                    <Copy className="mr-1 h-4 w-4" />
                    Copy (SOH)
                  </Button>
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    onClick={() => navigator.clipboard.writeText(msgGenOutput)}
                  >
                    <Copy className="mr-1 h-4 w-4" />
                    Copy (Pipe)
                  </Button>
                  {quickSenderConnected && (
                    <Button 
                      variant="primary" 
                      size="sm" 
                      onClick={sendQuickMessage}
                    >
                      <Send className="mr-1 h-4 w-4" />
                      Send Now
                    </Button>
                  )}
                </div>
              </div>
              <div className={`rounded-xl p-4 font-mono text-sm break-all ${isDarkMode ? "bg-[#0a1628]" : "bg-[#f8fafc]"}`}>
                <span className={isDarkMode ? "text-[#4caf50]" : "text-[#388e3c]"}>{msgGenOutput}</span>
              </div>
              <p className={`mt-3 text-xs ${isDarkMode ? "text-[#64b5f6]" : "text-[#64748b]"}`}>
                Tip: Use "Copy (SOH)" for actual FIX protocol delimiter or "Copy (Pipe)" for readable format
              </p>
            </Card>
          )}
          </div>
          )}
        </div>

        {/* Right Side - Quick Sender Tool */}
        <div className="space-y-4">
          {/* Quick Sender Connection */}
          <Card className="p-5">
            <div className="mb-4 flex items-center justify-between">
              <h3 className={`flex items-center gap-2 font-semibold ${isDarkMode ? "text-white" : "text-[#0a1628]"}`}>
                <Wifi className={`h-5 w-5 ${quickSenderConnected ? "text-[#4caf50]" : isDarkMode ? "text-[#00e5ff]" : "text-[#1976d2]"}`} />
                Quick Sender
              </h3>
              <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                quickSenderStatus === "connected" ? "bg-[#4caf50]/20 text-[#4caf50]" :
                quickSenderStatus === "connecting" ? "bg-[#ffc107]/20 text-[#ffc107]" :
                isDarkMode ? "bg-[#f44336]/20 text-[#f44336]" : "bg-[#ffebee] text-[#c62828]"
              }`}>
                {quickSenderStatus === "connected" ? "Connected" : quickSenderStatus === "connecting" ? "Connecting..." : "Disconnected"}
              </span>
            </div>

            <div className="space-y-3">
              {/* Host & Port */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className={`mb-1 block text-xs font-medium ${isDarkMode ? "text-[#64b5f6]" : "text-[#64748b]"}`}>Host</label>
                  <input
                    type="text"
                    value={quickSenderHost}
                    onChange={(e) => setQuickSenderHost(e.target.value)}
                    placeholder="192.168.1.100"
                    disabled={quickSenderConnected}
                    className={`w-full rounded-lg border px-3 py-2 text-sm ${
                      isDarkMode 
                        ? "border-[#1e4976] bg-[#0a1628] text-white placeholder-[#64748b]" 
                        : "border-[#e2e8f0] bg-white text-[#0a1628] placeholder-[#94a3b8]"
                    } ${quickSenderConnected ? "opacity-50" : ""}`}
                  />
                </div>
                <div>
                  <label className={`mb-1 block text-xs font-medium ${isDarkMode ? "text-[#64b5f6]" : "text-[#64748b]"}`}>Port</label>
                  <input
                    type="text"
                    value={quickSenderPort}
                    onChange={(e) => setQuickSenderPort(e.target.value)}
                    placeholder="9878"
                    disabled={quickSenderConnected}
                    className={`w-full rounded-lg border px-3 py-2 text-sm ${
                      isDarkMode 
                        ? "border-[#1e4976] bg-[#0a1628] text-white placeholder-[#64748b]" 
                        : "border-[#e2e8f0] bg-white text-[#0a1628] placeholder-[#94a3b8]"
                    } ${quickSenderConnected ? "opacity-50" : ""}`}
                  />
                </div>
              </div>

              {/* SenderCompID (49) & TargetCompID (56) */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className={`mb-1 block text-xs font-medium ${isDarkMode ? "text-[#64b5f6]" : "text-[#64748b]"}`}>SenderCompID (49)</label>
                  <input
                    type="text"
                    value={quickSenderCompID}
                    onChange={(e) => setQuickSenderCompID(e.target.value)}
                    placeholder="SENDER"
                    disabled={quickSenderConnected}
                    className={`w-full rounded-lg border px-3 py-2 text-sm ${
                      isDarkMode 
                        ? "border-[#1e4976] bg-[#0a1628] text-white placeholder-[#64748b]" 
                        : "border-[#e2e8f0] bg-white text-[#0a1628] placeholder-[#94a3b8]"
                    } ${quickSenderConnected ? "opacity-50" : ""}`}
                  />
                </div>
                <div>
                  <label className={`mb-1 block text-xs font-medium ${isDarkMode ? "text-[#64b5f6]" : "text-[#64748b]"}`}>TargetCompID (56)</label>
                  <input
                    type="text"
                    value={quickTargetCompID}
                    onChange={(e) => setQuickTargetCompID(e.target.value)}
                    placeholder="TARGET"
                    disabled={quickSenderConnected}
                    className={`w-full rounded-lg border px-3 py-2 text-sm ${
                      isDarkMode 
                        ? "border-[#1e4976] bg-[#0a1628] text-white placeholder-[#64748b]" 
                        : "border-[#e2e8f0] bg-white text-[#0a1628] placeholder-[#94a3b8]"
                    } ${quickSenderConnected ? "opacity-50" : ""}`}
                  />
                </div>
              </div>

              {/* Connect/Disconnect Button */}
              <div className="pt-2">
                {!quickSenderConnected ? (
                  <Button 
                    variant="primary" 
                    className="w-full"
                    onClick={connectQuickSender}
                    disabled={!quickSenderHost || !quickSenderPort || quickSenderStatus === "connecting"}
                  >
                    <Wifi className="mr-2 h-4 w-4" />
                    {quickSenderStatus === "connecting" ? "Connecting..." : "Connect"}
                  </Button>
                ) : (
                  <Button 
                    variant="secondary" 
                    className="w-full"
                    onClick={disconnectQuickSender}
                  >
                    <X className="mr-2 h-4 w-4" />
                    Disconnect
                  </Button>
                )}
              </div>
            </div>
          </Card>

          {/* Custom Tags */}
          <Card className="p-5">
            <div className="mb-3 flex items-center justify-between">
              <h4 className={`text-sm font-semibold ${isDarkMode ? "text-white" : "text-[#0a1628]"}`}>Custom Tags</h4>
              <button 
                onClick={addCustomTag}
                className={`rounded-lg p-1 transition-colors ${isDarkMode ? "hover:bg-[#1e4976]" : "hover:bg-[#e2e8f0]"}`}
              >
                <Plus className={`h-4 w-4 ${isDarkMode ? "text-[#00e5ff]" : "text-[#1976d2]"}`} />
              </button>
            </div>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {quickSenderCustomTags.map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={item.tag}
                    onChange={(e) => updateCustomTag(i, "tag", e.target.value)}
                    placeholder="Tag"
                    className={`w-16 rounded-lg border px-2 py-1.5 text-xs font-mono ${
                      isDarkMode 
                        ? "border-[#1e4976] bg-[#0a1628] text-[#00e5ff] placeholder-[#64748b]" 
                        : "border-[#e2e8f0] bg-white text-[#1976d2] placeholder-[#94a3b8]"
                    }`}
                  />
                  <span className={isDarkMode ? "text-[#64b5f6]" : "text-[#94a3b8]"}>=</span>
                  <input
                    type="text"
                    value={item.value}
                    onChange={(e) => updateCustomTag(i, "value", e.target.value)}
                    placeholder="Value"
                    className={`flex-1 rounded-lg border px-2 py-1.5 text-xs ${
                      isDarkMode 
                        ? "border-[#1e4976] bg-[#0a1628] text-white placeholder-[#64748b]" 
                        : "border-[#e2e8f0] bg-white text-[#0a1628] placeholder-[#94a3b8]"
                    }`}
                  />
                  <button 
                    onClick={() => removeCustomTag(i)}
                    className={`rounded p-1 transition-colors ${isDarkMode ? "hover:bg-[#f44336]/20" : "hover:bg-[#ffebee]"}`}
                  >
                    <X className="h-3 w-3 text-[#f44336]" />
                  </button>
                </div>
              ))}
            </div>
          </Card>

          {/* Send Log */}
          {quickSenderLogs.length > 0 && (
            <Card className="p-5">
              <h4 className={`mb-3 text-sm font-semibold ${isDarkMode ? "text-white" : "text-[#0a1628]"}`}>Activity Log</h4>
              <div className={`max-h-48 overflow-y-auto rounded-lg p-3 ${isDarkMode ? "bg-[#0a1628]" : "bg-[#f8fafc]"}`}>
                {quickSenderLogs.map((log, i) => (
                  <div key={i} className={`mb-2 flex items-start gap-2 text-xs`}>
                    <span className={`shrink-0 ${isDarkMode ? "text-[#64b5f6]" : "text-[#94a3b8]"}`}>{log.time}</span>
                    <span className={`shrink-0 font-semibold ${log.direction === "out" ? "text-[#4caf50]" : "text-[#00e5ff]"}`}>
                      {log.direction === "out" ? "OUT" : "IN"}
                    </span>
                    <span className={`font-mono break-all ${isDarkMode ? "text-white" : "text-[#0a1628]"}`}>{log.message}</span>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  )

  // Admin Sidebar Items - with accent colors from Broadridge palette
  const adminSidebarItems: SidebarItem[] = [
  { icon: LayoutDashboard, label: "FIX Dashboard", id: "dashboard", iconColor: isDarkMode ? "text-[#ffc107]" : "text-[#f57c00]" },
  { icon: GitCompare, label: "Spec Compare", id: "spec-compare", iconColor: isDarkMode ? "text-[#00e5ff]" : "text-[#1976d2]" },
  { icon: FileCheck, label: "Log Analysis", id: "log-analysis", iconColor: isDarkMode ? "text-[#4caf50]" : "text-[#388e3c]" },
  { icon: MessageSquare, label: "Message Generator", id: "msg-generator", iconColor: isDarkMode ? "text-[#00e5ff]" : "text-[#1976d2]" },
  { icon: TestTube, label: "Test Cases", id: "test-cases", iconColor: isDarkMode ? "text-[#ce93d8]" : "text-[#7b1fa2]" },
  { icon: Users, label: "Clients", id: "clients", iconColor: isDarkMode ? "text-[#64b5f6]" : "text-[#1565c0]" },
  { icon: History, label: "History", id: "history", iconColor: isDarkMode ? "text-[#90caf9]" : "text-[#64748b]" },
  { icon: Bell, label: "Alerts", id: "alerts", badge: alerts.filter((a) => !a.resolved).length, iconColor: isDarkMode ? "text-[#ffb74d]" : "text-[#f57c00]" },
  { icon: Settings, label: "Settings", id: "settings", iconColor: isDarkMode ? "text-[#90a4ae]" : "text-[#607d8b]" },
  { icon: HelpCircle, label: "Help", id: "help", iconColor: isDarkMode ? "text-[#81d4fa]" : "text-[#0288d1]" },
  ]

  // Client Sidebar Items - with accent colors
  const clientSidebarItems: SidebarItem[] = [
  { icon: LayoutDashboard, label: "FIX Dashboard", id: "dashboard", iconColor: isDarkMode ? "text-[#ffc107]" : "text-[#f57c00]" },
  { icon: Upload, label: "Upload Specs", id: "upload", iconColor: isDarkMode ? "text-[#4caf50]" : "text-[#388e3c]" },
  { icon: Download, label: "Download Specs", id: "download", iconColor: isDarkMode ? "text-[#00e5ff]" : "text-[#1976d2]" },
  { icon: MessageSquare, label: "Generate Message", id: "msg-generator", iconColor: isDarkMode ? "text-[#00e5ff]" : "text-[#1976d2]" },
  { icon: History, label: "History", id: "history", iconColor: isDarkMode ? "text-[#90caf9]" : "text-[#64748b]" },
  { icon: Settings, label: "Settings", id: "settings", iconColor: isDarkMode ? "text-[#90a4ae]" : "text-[#607d8b]" },
  { icon: HelpCircle, label: "Help", id: "help", iconColor: isDarkMode ? "text-[#81d4fa]" : "text-[#0288d1]" },
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
      case "msg-generator":
        return <MessageGeneratorPanel />
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

  // Login flow state
  const [showRoleSelection, setShowRoleSelection] = useState(false)

  // Animated candlestick data
  const [candleData, setCandleData] = useState([
    { open: 45, close: 52, high: 55, low: 43, color: "#4caf50" },
    { open: 52, close: 48, high: 54, low: 46, color: "#f44336" },
    { open: 48, close: 56, high: 58, low: 47, color: "#4caf50" },
    { open: 56, close: 54, high: 59, low: 52, color: "#f44336" },
    { open: 54, close: 62, high: 65, low: 53, color: "#4caf50" },
    { open: 62, close: 58, high: 64, low: 56, color: "#f44336" },
    { open: 58, close: 67, high: 70, low: 57, color: "#4caf50" },
    { open: 67, close: 64, high: 69, low: 62, color: "#f44336" },
  ])

  // Animate candlestick data
  useEffect(() => {
    const interval = setInterval(() => {
      setCandleData(prev => {
        const newData = [...prev]
        const lastCandle = newData[newData.length - 1]
        const change = (Math.random() - 0.5) * 8
        const newClose = Math.max(30, Math.min(80, lastCandle.close + change))
        const newOpen = lastCandle.close
        const newHigh = Math.max(newOpen, newClose) + Math.random() * 3
        const newLow = Math.min(newOpen, newClose) - Math.random() * 3
        newData.shift()
        newData.push({
          open: newOpen,
          close: newClose,
          high: newHigh,
          low: newLow,
          color: newClose > newOpen ? "#4caf50" : "#f44336"
        })
        return newData
      })
    }, 1500)
    return () => clearInterval(interval)
  }, [])

  // Order flow animation
  const [orders, setOrders] = useState([
    { id: 1, type: "BUY", symbol: "AAPL", qty: 500, price: 182.45, status: "filled" },
    { id: 2, type: "SELL", symbol: "GOOGL", qty: 200, price: 141.23, status: "pending" },
    { id: 3, type: "BUY", symbol: "MSFT", qty: 350, price: 378.91, status: "filled" },
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      const symbols = ["AAPL", "GOOGL", "MSFT", "AMZN", "NVDA", "META", "TSLA"]
      const types = ["BUY", "SELL"]
      const statuses = ["filled", "pending", "partial"]
      setOrders(prev => {
        const newOrders = [...prev]
        newOrders.shift()
        newOrders.push({
          id: Date.now(),
          type: types[Math.floor(Math.random() * types.length)],
          symbol: symbols[Math.floor(Math.random() * symbols.length)],
          qty: Math.floor(Math.random() * 900) + 100,
          price: (Math.random() * 300 + 100).toFixed(2),
          status: statuses[Math.floor(Math.random() * statuses.length)]
        })
        return newOrders
      })
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  // BControl Logo Component - Styled like the reference image with swoosh B
  const BControlLogo = ({ size = "md", showText = true }: { size?: "sm" | "md" | "lg", showText?: boolean }) => {
    const sizes = {
      sm: { outer: "h-10", bSize: "text-2xl", controlSize: "text-lg" },
      md: { outer: "h-14", bSize: "text-4xl", controlSize: "text-2xl" },
      lg: { outer: "h-20", bSize: "text-6xl", controlSize: "text-4xl" },
    }
    const s = sizes[size]
    
    return (
      <div className={`flex items-center gap-1 ${s.outer}`}>
        {/* B with swoosh */}
        <div className="relative">
          <span className={`font-black ${s.bSize} bg-gradient-to-r from-[#00e5ff] to-[#0091ea] bg-clip-text text-transparent`}>B</span>
          {/* Swoosh arrow */}
          <svg className="absolute -right-1 top-1/2 -translate-y-1/2 w-4 h-4" viewBox="0 0 24 24" fill="none">
            <path d="M5 12h14M13 6l6 6-6 6" stroke="url(#swoosh)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            <defs>
              <linearGradient id="swoosh" x1="5" y1="12" x2="19" y2="12">
                <stop stopColor="#00e5ff"/>
                <stop offset="1" stopColor="#0091ea"/>
              </linearGradient>
            </defs>
          </svg>
        </div>
        {showText && (
          <span className={`font-bold ${s.controlSize} ${isDarkMode ? "text-white" : "text-[#0a1628]"}`}>CONTROL</span>
        )}
      </div>
    )
  }
  
  // Acronym display component
  const AcronymDisplay = ({ compact = false }: { compact?: boolean }) => {
    const items = [
      { letter: "B", word: "TCS", desc: "BTCS" },
      { letter: "C", word: "ertification", desc: "Certification" },
      { letter: "O", word: "nboarding", desc: "Onboarding" },
      { letter: "N", word: "etwork", desc: "Network Monitoring" },
      { letter: "T", word: "esting", desc: "Testing" },
      { letter: "R", word: "outing", desc: "Routing Config" },
      { letter: "O", word: "perations", desc: "Operations" },
      { letter: "L", word: "ifecycle", desc: "Lifecycle Mgmt" },
    ]
    
    if (compact) {
      return (
        <div className={`flex flex-wrap justify-center gap-x-2 gap-y-1 text-xs font-medium ${isDarkMode ? "text-[#64b5f6]" : "text-[#64748b]"}`}>
          {items.map((item, i) => (
            <span key={i}>
              <span className="text-[#00e5ff] font-bold">{item.letter}</span>
              <span>{item.word}</span>
              {i < items.length - 1 && <span className="mx-1">·</span>}
            </span>
          ))}
        </div>
      )
    }
    
    return (
      <div className="grid grid-cols-4 gap-3">
        {items.map((item, i) => (
          <div key={i} className={`text-center p-2 rounded-lg ${isDarkMode ? "bg-[#0a1628]/50" : "bg-[#f8fafc]"}`}>
            <span className="text-2xl font-black text-[#00e5ff]">{item.letter}</span>
            <p className={`text-xs mt-1 ${isDarkMode ? "text-[#90caf9]" : "text-[#64748b]"}`}>{item.desc}</p>
          </div>
        ))}
      </div>
    )
  }

  // Home Screen
  const HomeScreen = () => (
    <div className={`min-h-screen transition-colors ${
      isDarkMode 
        ? "bg-gradient-to-br from-[#0a1628] via-[#0d1f3c] to-[#0a1628]" 
        : "bg-gradient-to-br from-white via-[#f0f9ff] to-[#e0f2fe]"
    }`}>
      <ThemeToggle />
      
      {/* Navigation Bar */}
      <nav className={`fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-8 py-4 backdrop-blur-md border-b ${
        isDarkMode 
          ? "bg-[#0a1628]/90 border-[#1e4976]" 
          : "bg-white/80 border-[#e2e8f0]"
      }`}>
        <div className="flex items-center gap-2">
          <BControlLogo size="sm" showText={false} />
          <span className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-[#0a1628]"}`}>CONTROL</span>
          <span className={`text-xs font-medium px-2 py-0.5 rounded ${isDarkMode ? "bg-[#00e5ff]/20 text-[#00e5ff]" : "bg-[#0a1628]/10 text-[#0a1628]"}`}>FIX AI</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className={`text-sm font-medium transition-colors ${isDarkMode ? "text-[#90caf9] hover:text-white" : "text-[#64748b] hover:text-[#0a1628]"}`}>Features</a>
          <a href="#how-it-works" className={`text-sm font-medium transition-colors ${isDarkMode ? "text-[#90caf9] hover:text-white" : "text-[#64748b] hover:text-[#0a1628]"}`}>How it Works</a>
          <a href="#contact" className={`text-sm font-medium transition-colors ${isDarkMode ? "text-[#90caf9] hover:text-white" : "text-[#64748b] hover:text-[#0a1628]"}`}>Contact</a>
        </div>
        <Button variant="primary" onClick={() => setShowRoleSelection(true)}>
          Login
        </Button>
      </nav>
      
      {/* Hero Section */}
      <div className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className={`absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl animate-pulse ${isDarkMode ? "bg-[#00bcd4]/20" : "bg-[#00bcd4]/10"}`} />
          <div className={`absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl animate-pulse ${isDarkMode ? "bg-[#1976d2]/20" : "bg-[#1976d2]/10"}`} style={{ animationDelay: "1s" }} />
          <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full ${isDarkMode ? "bg-gradient-to-br from-[#00e5ff]/10 to-transparent" : "bg-gradient-to-br from-[#00e5ff]/5 to-transparent"}`} />
        </div>
        
        <div className="relative mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text Content */}
            <div className="space-y-8">
              <div className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm ${isDarkMode ? "bg-[#00e5ff]/10" : "bg-[#0a1628]/5"}`}>
                <span className="flex h-2 w-2 rounded-full bg-[#4caf50] animate-pulse" />
                <span className={`font-medium ${isDarkMode ? "text-[#00e5ff]" : "text-[#0a1628]"}`}>BControl FIX AI Platform</span>
              </div>
              
              <h1 className={`text-4xl lg:text-5xl font-bold leading-tight ${isDarkMode ? "text-white" : "text-[#0a1628]"}`}>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00e5ff] to-[#0091ea]">B</span>TCS
                <span className="mx-2 text-transparent bg-clip-text bg-gradient-to-r from-[#00e5ff] to-[#0091ea]">C</span>ertification
                <span className="mx-2 text-transparent bg-clip-text bg-gradient-to-r from-[#00e5ff] to-[#0091ea]">O</span>nboarding
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00e5ff] to-[#0091ea]">N</span>etwork
                <span className="mx-2 text-transparent bg-clip-text bg-gradient-to-r from-[#00e5ff] to-[#0091ea]">T</span>esting
                <span className="mx-2 text-transparent bg-clip-text bg-gradient-to-r from-[#00e5ff] to-[#0091ea]">R</span>outing
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00e5ff] to-[#0091ea]">O</span>perations
                <span className="mx-2 text-transparent bg-clip-text bg-gradient-to-r from-[#00e5ff] to-[#0091ea]">L</span>ifecycle
              </h1>
              
              <p className={`text-lg max-w-lg leading-relaxed text-pretty ${isDarkMode ? "text-[#90caf9]" : "text-[#64748b]"}`}>
                AI-powered FIX protocol management for certification, testing, and operations. Designed for trading firms and financial institutions.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  variant="primary" 
                  size="lg" 
                  className="text-base px-8 py-4 rounded-xl shadow-lg shadow-[#0a1628]/20 hover:shadow-xl transition-shadow"
                  onClick={() => setShowRoleSelection(true)}
                >
                  Get Started
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
                <Button variant="outline" size="lg" className="text-base px-8 py-4 rounded-xl">
                  <Play className="mr-2 h-5 w-5" />
                  Watch Demo
                </Button>
              </div>
              
              {/* Trust Badges */}
              <div className={`pt-8 border-t ${isDarkMode ? "border-[#1e4976]" : "border-[#e2e8f0]"}`}>
                <p className={`text-xs mb-4 uppercase tracking-wider font-medium ${isDarkMode ? "text-[#64b5f6]" : "text-[#94a3b8]"}`}>Trusted by leading institutions</p>
                <div className="flex flex-wrap gap-8 items-center opacity-60">
                  <span className={`text-lg font-bold ${isDarkMode ? "text-white" : "text-[#0a1628]"}`}>BlackRock</span>
                  <span className={`text-lg font-bold ${isDarkMode ? "text-white" : "text-[#0a1628]"}`}>Goldman Sachs</span>
                  <span className={`text-lg font-bold ${isDarkMode ? "text-white" : "text-[#0a1628]"}`}>JP Morgan</span>
                  <span className={`text-lg font-bold ${isDarkMode ? "text-white" : "text-[#0a1628]"}`}>UBS</span>
                </div>
              </div>
            </div>
            
            {/* Right: Animated Trading Visualization */}
            <div className="relative lg:ml-8 xl:ml-12">
              <div className={`relative rounded-3xl shadow-2xl p-6 overflow-hidden backdrop-blur-xl ${
                isDarkMode 
                  ? "bg-[#0d1f3c]/80 border border-[#1e4976]/50" 
                  : "bg-white/80 border border-[#e2e8f0]"
              }`}>
                {/* Window Header */}
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-3 h-3 rounded-full bg-[#f44336]" />
                  <div className="w-3 h-3 rounded-full bg-[#ffc107]" />
                  <div className="w-3 h-3 rounded-full bg-[#4caf50]" />
                  <span className={`ml-4 text-sm font-medium ${isDarkMode ? "text-[#64b5f6]" : "text-[#64748b]"}`}>FIX Message Flow</span>
                </div>
                
                {/* Candlestick Chart Animation */}
                <div className={`mb-6 p-4 rounded-xl ${isDarkMode ? "bg-[#0a1628]" : "bg-[#f8fafc]"}`}>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-sm font-semibold ${isDarkMode ? "text-white" : "text-[#0a1628]"}`}>Market Data Stream</span>
                    <span className="text-xs text-[#4caf50] font-medium">LIVE</span>
                  </div>
                  <div className="flex items-end gap-2 h-24">
                    {candleData.map((candle, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center transition-all duration-500">
                        <div 
                          className={`w-0.5 ${isDarkMode ? "bg-[#64b5f6]" : "bg-[#94a3b8]"}`}
                          style={{ height: `${(candle.high - candle.low) * 1.5}px` }}
                        />
                        <div 
                          className="w-3 rounded-sm transition-all duration-500"
                          style={{ 
                            height: `${Math.abs(candle.close - candle.open) * 2 + 4}px`,
                            backgroundColor: candle.color,
                            marginTop: `-${(candle.high - Math.max(candle.open, candle.close)) * 1.5}px`
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Order Flow Animation */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-sm font-semibold ${isDarkMode ? "text-white" : "text-[#0a1628]"}`}>Order Flow</span>
                    <span className="text-xs text-[#1976d2] font-medium">Real-time</span>
                  </div>
                  {orders.map((order, i) => (
                    <div 
                      key={order.id} 
                      className={`flex items-center justify-between p-3 rounded-lg transition-all duration-300 ${
                        i === orders.length - 1 
                          ? isDarkMode ? "bg-[#1e4976] scale-[1.02]" : "bg-[#e3f2fd] scale-[1.02]"
                          : isDarkMode ? "bg-[#0a1628]" : "bg-[#f8fafc]"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                          order.type === "BUY" ? "bg-[#4caf50]/20 text-[#4caf50]" : "bg-[#f44336]/20 text-[#f44336]"
                        }`}>
                          {order.type}
                        </span>
                        <span className={`font-mono text-sm font-medium ${isDarkMode ? "text-white" : "text-[#0a1628]"}`}>{order.symbol}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className={`text-sm ${isDarkMode ? "text-[#90caf9]" : "text-[#64748b]"}`}>{order.qty}</span>
                        <span className={`font-mono text-sm font-medium ${isDarkMode ? "text-[#00e5ff]" : "text-[#0a1628]"}`}>${order.price}</span>
                        <span className={`w-2 h-2 rounded-full ${
                          order.status === "filled" ? "bg-[#4caf50]" : 
                          order.status === "pending" ? "bg-[#ffc107] animate-pulse" : "bg-[#2196f3]"
                        }`} />
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* FIX Message Preview */}
                <div className={`mt-4 p-3 rounded-lg overflow-hidden ${isDarkMode ? "bg-[#0a1628] border border-[#1e4976]" : "bg-[#0a1628]"}`}>
                  <div className="font-mono text-xs text-[#4caf50] whitespace-nowrap animate-pulse">
                    8=FIX.4.4|9=148|35=D|49=SENDER|56=TARGET|34=2|52=20250302...
                  </div>
                </div>
              </div>
              
              {/* Floating Stats */}
              <div className={`absolute -left-4 top-1/4 rounded-xl shadow-lg p-4 animate-bounce ${
                isDarkMode ? "bg-[#0d1f3c] border border-[#1e4976]" : "bg-white border border-[#e2e8f0]"
              }`} style={{ animationDuration: "3s" }}>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-[#4caf50]" />
                  <div>
                    <p className={`text-xs ${isDarkMode ? "text-[#90caf9]" : "text-[#64748b]"}`}>Tests Passed</p>
                    <p className={`text-lg font-bold ${isDarkMode ? "text-white" : "text-[#0a1628]"}`}>2,847</p>
                  </div>
                </div>
              </div>
              
              <div className={`absolute -right-4 bottom-1/4 rounded-xl shadow-lg p-4 animate-bounce ${
                isDarkMode ? "bg-[#0d1f3c] border border-[#1e4976]" : "bg-white border border-[#e2e8f0]"
              }`} style={{ animationDuration: "3.5s", animationDelay: "0.5s" }}>
                <div className="flex items-center gap-2">
                  <GitCompare className="h-5 w-5 text-[#1976d2]" />
                  <div>
                    <p className={`text-xs ${isDarkMode ? "text-[#90caf9]" : "text-[#64748b]"}`}>Specs Compared</p>
                    <p className={`text-lg font-bold ${isDarkMode ? "text-white" : "text-[#0a1628]"}`}>156</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Features Section */}
      <div id="features" className={`py-20 px-6 ${isDarkMode ? "bg-[#0d1f3c]" : "bg-white"}`}>
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className={`text-3xl font-bold mb-4 ${isDarkMode ? "text-white" : "text-[#0a1628]"}`}>Powerful Features for FIX Protocol Testing</h2>
            <p className={`max-w-2xl mx-auto ${isDarkMode ? "text-[#90caf9]" : "text-[#64748b]"}`}>Everything you need to validate, compare, and test FIX specifications with confidence.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: GitCompare, title: "FIX Spec Comparison", desc: "Compare FIX specifications side-by-side with intelligent diff analysis", color: "#1976d2" },
              { icon: FileCheck, title: "FIX Log Analysis", desc: "Analyze FIX logs against specifications to identify discrepancies", color: "#4caf50" },
              { icon: TestTube, title: "Test Generation", desc: "Auto-generate comprehensive test cases from your FIX specs", color: "#9c27b0" },
              { icon: MessageSquare, title: "FIX Message Builder", desc: "Create and validate FIX messages with our intuitive builder", color: "#f57c00" },
              { icon: AlertTriangle, title: "Alerts & Monitoring", desc: "Real-time alerts for certification issues and failures", color: "#f44336" },
              { icon: Users, title: "Client Management", desc: "Manage multiple clients and track their certification progress", color: "#00bcd4" },
            ].map((feature, i) => (
              <div key={i} className={`group p-6 rounded-2xl border transition-all duration-300 ${
                isDarkMode 
                  ? "bg-[#0a1628] border-[#1e4976] hover:border-[#00e5ff]/50 hover:shadow-xl hover:shadow-[#00e5ff]/10" 
                  : "bg-white border-[#e2e8f0] hover:border-[#1976d2]/30 hover:shadow-xl"
              }`}>
                <div className="inline-flex p-3 rounded-xl mb-4" style={{ backgroundColor: `${feature.color}20` }}>
                  <feature.icon className="h-6 w-6" style={{ color: feature.color }} />
                </div>
                <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? "text-white" : "text-[#0a1628]"}`}>{feature.title}</h3>
                <p className={`text-sm ${isDarkMode ? "text-[#90caf9]" : "text-[#64748b]"}`}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Role Selection Modal */}
      {showRoleSelection && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className={`rounded-3xl shadow-2xl p-8 w-full max-w-md mx-4 ${
            isDarkMode ? "bg-[#0d1f3c] border border-[#1e4976]" : "bg-white"
          }`}>
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <BControlLogo size="lg" />
              </div>
              <div className="mb-4">
                <AcronymDisplay compact />
              </div>
              <h2 className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-[#0a1628]"}`}>Choose Your Portal</h2>
              <p className={`mt-2 ${isDarkMode ? "text-[#90caf9]" : "text-[#64748b]"}`}>Select your role to continue</p>
            </div>
            
            <div className="space-y-4">
              <button
                onClick={() => { setShowRoleSelection(false); handleLogin("admin"); }}
                className={`w-full p-5 rounded-2xl border-2 transition-all group text-left ${
                  isDarkMode 
                    ? "border-[#1e4976] hover:border-[#1976d2] hover:bg-[#1976d2]/10" 
                    : "border-[#e2e8f0] hover:border-[#1976d2] hover:bg-[#e3f2fd]"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl transition-colors ${
                    isDarkMode ? "bg-[#1976d2]/20 group-hover:bg-[#1976d2]/30" : "bg-[#1976d2]/10 group-hover:bg-[#1976d2]/20"
                  }`}>
                    <Settings className="h-6 w-6 text-[#1976d2]" />
                  </div>
                  <div>
                    <h3 className={`font-semibold ${isDarkMode ? "text-white" : "text-[#0a1628]"}`}>Admin Portal</h3>
                    <p className={`text-sm ${isDarkMode ? "text-[#90caf9]" : "text-[#64748b]"}`}>Manage specs, run comparisons, generate tests</p>
                  </div>
                  <ChevronRight className={`h-5 w-5 ml-auto group-hover:translate-x-1 transition-all ${isDarkMode ? "text-[#64b5f6] group-hover:text-[#1976d2]" : "text-[#94a3b8] group-hover:text-[#1976d2]"}`} />
                </div>
              </button>
              
              <button
                onClick={() => { setShowRoleSelection(false); handleLogin("client"); }}
                className={`w-full p-5 rounded-2xl border-2 transition-all group text-left ${
                  isDarkMode 
                    ? "border-[#1e4976] hover:border-[#4caf50] hover:bg-[#4caf50]/10" 
                    : "border-[#e2e8f0] hover:border-[#4caf50] hover:bg-[#e8f5e9]"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl transition-colors ${
                    isDarkMode ? "bg-[#4caf50]/20 group-hover:bg-[#4caf50]/30" : "bg-[#4caf50]/10 group-hover:bg-[#4caf50]/20"
                  }`}>
                    <Building2 className="h-6 w-6 text-[#4caf50]" />
                  </div>
                  <div>
                    <h3 className={`font-semibold ${isDarkMode ? "text-white" : "text-[#0a1628]"}`}>Client Portal</h3>
                    <p className={`text-sm ${isDarkMode ? "text-[#90caf9]" : "text-[#64748b]"}`}>Upload specs, download files, generate messages</p>
                  </div>
                  <ChevronRight className={`h-5 w-5 ml-auto group-hover:translate-x-1 transition-all ${isDarkMode ? "text-[#64b5f6] group-hover:text-[#4caf50]" : "text-[#94a3b8] group-hover:text-[#4caf50]"}`} />
                </div>
              </button>
            </div>
            
            <button
              onClick={() => setShowRoleSelection(false)}
              className={`mt-6 w-full py-3 text-sm transition-colors ${isDarkMode ? "text-[#90caf9] hover:text-white" : "text-[#64748b] hover:text-[#0a1628]"}`}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
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
      <Sidebar items={adminSidebarItems} title="BControl Admin" />

      <div className="flex-1 overflow-auto">
        <div
          className={`sticky top-0 z-10 flex items-center justify-between border-b px-6 py-4 ${
            isDarkMode ? "border-[#1e4976] bg-[#0a1628]/95 backdrop-blur" : "border-[#e2e8f0] bg-white/95 backdrop-blur"
          }`}
        >
          <div className="flex items-center gap-3">
            <BControlLogo size="sm" showText={false} />
            <div>
              <h1 className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-[#0a1628]"}`}>
                <span className={isDarkMode ? "text-[#00e5ff]" : "text-[#1976d2]"}>B</span>TCS{" "}
                <span className={isDarkMode ? "text-[#00e5ff]" : "text-[#1976d2]"}>C</span>ertification{" "}
                <span className={isDarkMode ? "text-[#00e5ff]" : "text-[#1976d2]"}>O</span>nboarding{" "}
                <span className={isDarkMode ? "text-[#00e5ff]" : "text-[#1976d2]"}>N</span>etwork{" "}
                <span className={isDarkMode ? "text-[#00e5ff]" : "text-[#1976d2]"}>T</span>esting{" "}
                <span className={isDarkMode ? "text-[#00e5ff]" : "text-[#1976d2]"}>R</span>outing{" "}
                <span className={isDarkMode ? "text-[#00e5ff]" : "text-[#1976d2]"}>O</span>perations{" "}
                <span className={isDarkMode ? "text-[#00e5ff]" : "text-[#1976d2]"}>L</span>ifecycle
              </h1>
              <p className={`text-xs ${isDarkMode ? "text-[#90caf9]" : "text-[#64748b]"}`}>
                {selectedSpec && viewingClient ? `${viewingClient.name} > ${selectedSpec.name}` : 
                 activeSidebarItem === "dashboard" ? "Client Work Progress Overview" :
                 activeSidebarItem === "spec-compare" ? "Compare FIX Specifications" :
                 activeSidebarItem === "log-analysis" ? "Analyze FIX Log Files" :
                 activeSidebarItem === "msg-generator" ? "Generate FIX Messages" :
                 activeSidebarItem === "test-cases" ? "Generate Test Cases" :
                 activeSidebarItem === "clients" ? "Manage Clients" :
                 activeSidebarItem === "history" ? "Activity History" :
                 activeSidebarItem === "alerts" ? "System Alerts" :
                 activeSidebarItem === "settings" ? "Application Settings" :
                 "Admin Portal"}
              </p>
            </div>
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
      <Sidebar items={clientSidebarItems} title="BControl Client" />

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

  // Clickable Status Button Component
  const StatusButton = ({ 
    status, 
    spec, 
    workflowType 
  }: { 
    status: "done" | "progress" | "pending" | "error"
    spec: ClientSpec
    workflowType: WorkflowType
  }) => {
    const styles = {
      done: isDarkMode 
        ? "bg-[#4caf50]/30 text-[#81c784] hover:bg-[#4caf50]/50 border-[#4caf50]/50" 
        : "bg-[#e8f5e9] text-[#2e7d32] hover:bg-[#c8e6c9] border-[#4caf50]/30",
      progress: isDarkMode 
        ? "bg-[#2196f3]/30 text-[#90caf9] hover:bg-[#2196f3]/50 border-[#2196f3]/50" 
        : "bg-[#e3f2fd] text-[#1565c0] hover:bg-[#bbdefb] border-[#2196f3]/30",
      pending: isDarkMode 
        ? "bg-[#455a64]/30 text-[#b0bec5] hover:bg-[#455a64]/50 border-[#607d8b]/50" 
        : "bg-[#eceff1] text-[#546e7a] hover:bg-[#cfd8dc] border-[#607d8b]/30",
      error: isDarkMode 
        ? "bg-[#f44336]/30 text-[#ef9a9a] hover:bg-[#f44336]/50 border-[#f44336]/50" 
        : "bg-[#ffebee] text-[#c62828] hover:bg-[#ffcdd2] border-[#f44336]/30"
    }
    const labels = { done: "Done", progress: "In Progress", pending: "Not Started", error: "Error" }
    
    const handleClick = () => {
      setSelectedSpec(spec)
      setActiveWorkflow(workflowType)
      
      // Navigate to existing pages for spec-compare and log-analysis
      if (workflowType === "spec-comparison") {
        setCurrentScreen("admin-tools")
        setActiveSidebarItem("spec-compare")
      } else if (workflowType === "log-analysis") {
        setCurrentScreen("admin-tools")
        setActiveSidebarItem("log-analysis")
      } else {
        // Use new workflow-detail screen for test-case, cert-case, config-gen
        setCurrentScreen("workflow-detail")
      }
    }
    
    return (
      <button
        onClick={handleClick}
        className={`rounded-lg px-3 py-1.5 text-xs font-semibold border transition-all cursor-pointer ${styles[status]}`}
      >
        {labels[status]}
      </button>
    )
  }

  // Clickable Alerts Button Component
  const AlertsButton = ({ 
    status, 
    count, 
    spec 
  }: { 
    status: "generated" | "pending" | "error"
    count?: number
    spec: ClientSpec
  }) => {
    const styles = {
      generated: isDarkMode 
        ? "bg-[#e91e63]/30 text-[#f48fb1] hover:bg-[#e91e63]/50 border-[#e91e63]/50" 
        : "bg-[#fce4ec] text-[#c2185b] hover:bg-[#f8bbd9] border-[#e91e63]/30",
      pending: isDarkMode 
        ? "bg-[#455a64]/30 text-[#b0bec5] hover:bg-[#455a64]/50 border-[#607d8b]/50" 
        : "bg-[#eceff1] text-[#546e7a] hover:bg-[#cfd8dc] border-[#607d8b]/30",
      error: isDarkMode 
        ? "bg-[#f44336]/30 text-[#ef9a9a] hover:bg-[#f44336]/50 border-[#f44336]/50" 
        : "bg-[#ffebee] text-[#c62828] hover:bg-[#ffcdd2] border-[#f44336]/30"
    }
    
    return (
      <button
        onClick={() => { 
          setSelectedSpec(spec)
          setActiveWorkflow("alerts")
          setCurrentScreen("admin-tools")
          setActiveSidebarItem("alerts")
        }}
        className={`rounded-lg px-3 py-1.5 text-xs font-semibold border transition-all cursor-pointer ${styles[status]}`}
      >
        {status === "generated" ? `${count || 0} Alerts` : status === "pending" ? "Pending" : "Error"}
      </button>
    )
  }

  // Client Detail Screen - shows all specs for a specific client
  const ClientDetailScreen = () => {
    if (!viewingClient) return null
    
    return (
      <div className={`min-h-screen p-6 transition-colors ${isDarkMode ? "bg-[#050d1a]" : "bg-[#f8fafc]"}`}>
        <ThemeToggle />
        
        {/* Header */}
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 flex items-center gap-4">
            <Button variant="outline" onClick={() => { setViewingClient(null); setCurrentScreen("admin-tools"); }}>
              <ChevronLeft className="mr-1 h-4 w-4" />
              Back to Dashboard
            </Button>
            <div className="flex items-center gap-3">
              <BControlLogo size="sm" showText={false} />
              <div>
                <h1 className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-[#0a1628]"}`}>{viewingClient.name}</h1>
                <p className={`text-sm ${isDarkMode ? "text-[#b0bec5]" : "text-[#64748b]"}`}>
                  {viewingClient.clientSpecs?.length || 0} Workflows · Last Activity: {viewingClient.lastActivity}
                </p>
              </div>
            </div>
            <span className={`ml-auto px-3 py-1 rounded-full text-sm font-medium ${
              viewingClient.status === "active"
                ? isDarkMode ? "bg-[#4caf50]/30 text-[#81c784]" : "bg-[#4caf50]/20 text-[#2e7d32]"
                : isDarkMode ? "bg-[#f57c00]/30 text-[#ffb74d]" : "bg-[#f57c00]/20 text-[#e65100]"
            }`}>
              {viewingClient.status}
            </span>
          </div>
          
          {/* Stats Row */}
          <div className="mb-6 grid grid-cols-6 gap-4">
            {[
              { label: "Spec Comparison", count: viewingClient.clientSpecs?.filter(s => s.specComparison === "done").length || 0, total: viewingClient.clientSpecs?.length || 0, color: "#1976d2" },
              { label: "Log Analysis", count: viewingClient.clientSpecs?.filter(s => s.logComparison === "done").length || 0, total: viewingClient.clientSpecs?.length || 0, color: "#4caf50" },
              { label: "Test Cases", count: viewingClient.clientSpecs?.filter(s => s.testCaseGeneration === "done").length || 0, total: viewingClient.clientSpecs?.length || 0, color: "#9c27b0" },
              { label: "Cert Cases", count: viewingClient.clientSpecs?.filter(s => s.certificationCaseGeneration === "done").length || 0, total: viewingClient.clientSpecs?.length || 0, color: "#f57c00" },
              { label: "Config Gen", count: viewingClient.clientSpecs?.filter(s => s.configurationGeneration === "done").length || 0, total: viewingClient.clientSpecs?.length || 0, color: "#00bcd4" },
              { label: "Alerts", count: viewingClient.clientSpecs?.filter(s => s.alerts === "generated").length || 0, total: viewingClient.clientSpecs?.length || 0, color: "#e91e63" },
            ].map((stat, i) => (
              <Card key={i} className={`p-4 text-center ${isDarkMode ? "bg-[#0d1f3c] border-[#1e4976]" : ""}`}>
                <p className={`text-xs font-medium mb-1 ${isDarkMode ? "text-[#b0bec5]" : "text-[#64748b]"}`}>{stat.label}</p>
                <p className="text-2xl font-bold" style={{ color: stat.color }}>{stat.count}<span className={`text-sm ${isDarkMode ? "text-[#78909c]" : "text-[#94a3b8]"}`}>/{stat.total}</span></p>
              </Card>
            ))}
          </div>
          
          {/* Specs Table */}
          <Card className={`overflow-hidden ${isDarkMode ? "bg-[#0d1f3c] border-[#1e4976]" : ""}`}>
            <div className={`px-6 py-4 border-b ${isDarkMode ? "border-[#1e4976]" : "border-[#e2e8f0]"}`}>
              <h2 className={`text-lg font-semibold ${isDarkMode ? "text-white" : "text-[#0a1628]"}`}>Workflow</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className={isDarkMode ? "bg-[#0a1628]" : "bg-[#f8fafc]"}>
                    <th className={`px-4 py-3 text-left text-xs font-semibold ${isDarkMode ? "text-[#b0bec5]" : "text-[#64748b]"}`}>Spec Name</th>
                    <th className={`px-4 py-3 text-left text-xs font-semibold whitespace-nowrap ${isDarkMode ? "text-[#b0bec5]" : "text-[#64748b]"}`}>Asset Class</th>
                    <th className={`px-4 py-3 text-left text-xs font-semibold ${isDarkMode ? "text-[#b0bec5]" : "text-[#64748b]"}`}>Algo Type</th>
                    <th className={`px-4 py-3 text-left text-xs font-semibold ${isDarkMode ? "text-[#b0bec5]" : "text-[#64748b]"}`}>Version</th>
                    <th className={`px-4 py-3 text-left text-xs font-semibold whitespace-nowrap ${isDarkMode ? "text-[#b0bec5]" : "text-[#64748b]"}`}>Spec Comparison</th>
                    <th className={`px-4 py-3 text-left text-xs font-semibold whitespace-nowrap ${isDarkMode ? "text-[#b0bec5]" : "text-[#64748b]"}`}>Log Analysis</th>
                    <th className={`px-4 py-3 text-left text-xs font-semibold whitespace-nowrap ${isDarkMode ? "text-[#b0bec5]" : "text-[#64748b]"}`}>Test Case Gen</th>
                    <th className={`px-4 py-3 text-left text-xs font-semibold whitespace-nowrap ${isDarkMode ? "text-[#b0bec5]" : "text-[#64748b]"}`}>Cert Case Gen</th>
                    <th className={`px-4 py-3 text-left text-xs font-semibold whitespace-nowrap ${isDarkMode ? "text-[#b0bec5]" : "text-[#64748b]"}`}>Config Gen</th>
                    <th className={`px-4 py-3 text-left text-xs font-semibold ${isDarkMode ? "text-[#b0bec5]" : "text-[#64748b]"}`}>Alerts</th>
                  </tr>
                </thead>
                <tbody>
                  {viewingClient.clientSpecs?.map((spec, i) => (
                    <tr key={spec.id} className={`border-t ${isDarkMode ? "border-[#1e4976] hover:bg-[#162a4a]" : "border-[#e2e8f0] hover:bg-[#f8fafc]"}`}>
                      <td className={`px-4 py-3 font-medium ${isDarkMode ? "text-white" : "text-[#0a1628]"}`}>{spec.name}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${isDarkMode ? "bg-[#1e4976] text-[#b0bec5]" : "bg-[#e2e8f0] text-[#64748b]"}`}>
                          {spec.assetClass}
                        </span>
                      </td>
                      <td className={`px-4 py-3 ${isDarkMode ? "text-[#b0bec5]" : "text-[#64748b]"}`}>{spec.algoType || "-"}</td>
                      <td className={`px-4 py-3 font-mono text-sm ${isDarkMode ? "text-[#00e5ff]" : "text-[#1976d2]"}`}>{spec.version}</td>
                      <td className="px-4 py-3"><StatusButton status={spec.specComparison} spec={spec} workflowType="spec-comparison" /></td>
                      <td className="px-4 py-3"><StatusButton status={spec.logComparison} spec={spec} workflowType="log-analysis" /></td>
                      <td className="px-4 py-3"><StatusButton status={spec.testCaseGeneration} spec={spec} workflowType="test-case" /></td>
                      <td className="px-4 py-3"><StatusButton status={spec.certificationCaseGeneration} spec={spec} workflowType="cert-case" /></td>
                      <td className="px-4 py-3"><StatusButton status={spec.configurationGeneration} spec={spec} workflowType="config-gen" /></td>
                      <td className="px-4 py-3"><AlertsButton status={spec.alerts} count={spec.alertsCount} spec={spec} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
    )
  }
  
  // Workflow Detail Screen - Test Case Gen, Cert Case Gen, Config Gen only
  const WorkflowDetailScreen = () => {
    if (!selectedSpec || !activeWorkflow || !viewingClient) return null
    
    // Only handle test-case, cert-case, config-gen here
    // spec-comparison and log-analysis use existing pages
    // alerts uses the alerts sidebar item
    
    const workflowTitles: Record<string, string> = {
      "test-case": "Test Case Generation",
      "cert-case": "Certification Case Generation",
      "config-gen": "Configuration Generation",
    }
    
    const workflowColors: Record<string, string> = {
      "test-case": "#9c27b0",
      "cert-case": "#f57c00",
      "config-gen": "#00bcd4",
    }
    
    const getStatusForWorkflow = () => {
      switch(activeWorkflow) {
        case "test-case": return selectedSpec.testCaseGeneration
        case "cert-case": return selectedSpec.certificationCaseGeneration
        case "config-gen": return selectedSpec.configurationGeneration
        default: return "pending"
      }
    }
    
    const status = getStatusForWorkflow()
    const color = workflowColors[activeWorkflow] || "#1976d2"
    const title = workflowTitles[activeWorkflow] || "Workflow"
    
    // Sample data for each workflow type
    const testCases = [
      { id: "TC001", name: "NewOrderSingle - Valid Order", category: "Order Entry", priority: "High", status: status === "done" ? "Passed" : status === "error" ? "Failed" : "Pending" },
      { id: "TC002", name: "NewOrderSingle - Missing Required Field", category: "Validation", priority: "High", status: status === "done" ? "Passed" : "Pending" },
      { id: "TC003", name: "ExecutionReport - Full Fill", category: "Execution", priority: "Medium", status: status === "done" ? "Passed" : "Pending" },
      { id: "TC004", name: "ExecutionReport - Partial Fill", category: "Execution", priority: "Medium", status: status === "done" ? "Passed" : "Pending" },
      { id: "TC005", name: "OrderCancelRequest - Valid Cancel", category: "Order Management", priority: "High", status: status === "done" ? "Passed" : status === "error" ? "Failed" : "Pending" },
      { id: "TC006", name: "OrderCancelReject - Unknown Order", category: "Error Handling", priority: "Low", status: status === "done" ? "Passed" : "Pending" },
    ]
    
    const certCases = [
      { id: "CC001", name: "Session Logon/Logoff", requirement: "CERT-001", status: status === "done" ? "Certified" : status === "error" ? "Failed" : "Pending" },
      { id: "CC002", name: "Heartbeat Handling", requirement: "CERT-002", status: status === "done" ? "Certified" : "Pending" },
      { id: "CC003", name: "Sequence Number Reset", requirement: "CERT-003", status: status === "done" ? "Certified" : status === "error" ? "Failed" : "Pending" },
      { id: "CC004", name: "Resend Request Handling", requirement: "CERT-004", status: status === "done" ? "Certified" : "Pending" },
      { id: "CC005", name: "Gap Fill Processing", requirement: "CERT-005", status: status === "done" ? "Certified" : "Pending" },
    ]
    
    const configSections = [
      { section: "Session Settings", items: ["SenderCompID: " + viewingClient.name.toUpperCase().replace(/\s/g, ""), "TargetCompID: BTCS", "HeartBtInt: 30", "ResetOnLogon: Y"] },
      { section: "Connection", items: ["SocketConnectHost: fix.btcs.com", "SocketConnectPort: 9823", "ReconnectInterval: 5", "MaxReconnectAttempts: 10"] },
      { section: "Message Validation", items: ["ValidateFieldsOutOfOrder: Y", "ValidateFieldsHaveValues: Y", "ValidateUserDefinedFields: N"] },
      { section: "Logging", items: ["FileLogPath: ./logs", "FileStorePath: ./store", "RefreshOnLogon: Y"] },
    ]
    
    return (
      <div className={`min-h-screen p-6 transition-colors ${isDarkMode ? "bg-[#050d1a]" : "bg-[#f8fafc]"}`}>
        <ThemeToggle />
        
        <div className="mx-auto max-w-7xl">
          {/* Breadcrumb Header */}
          <div className="mb-6 flex items-center gap-2 text-sm">
            <button 
              onClick={() => { setSelectedSpec(null); setActiveWorkflow(null); setCurrentScreen("admin-tools"); }}
              className={`hover:underline ${isDarkMode ? "text-[#90caf9]" : "text-[#1976d2]"}`}
            >
              Dashboard
            </button>
            <ChevronRight className={`h-4 w-4 ${isDarkMode ? "text-[#607d8b]" : "text-[#94a3b8]"}`} />
            <button 
              onClick={() => { setSelectedSpec(null); setActiveWorkflow(null); setCurrentScreen("client-detail"); }}
              className={`hover:underline ${isDarkMode ? "text-[#90caf9]" : "text-[#1976d2]"}`}
            >
              {viewingClient.name}
            </button>
            <ChevronRight className={`h-4 w-4 ${isDarkMode ? "text-[#607d8b]" : "text-[#94a3b8]"}`} />
            <span className={isDarkMode ? "text-white" : "text-[#0a1628]"}>{selectedSpec.name}</span>
            <ChevronRight className={`h-4 w-4 ${isDarkMode ? "text-[#607d8b]" : "text-[#94a3b8]"}`} />
            <span className={isDarkMode ? "text-[#b0bec5]" : "text-[#64748b]"}>{title}</span>
          </div>
          
          {/* Header */}
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="outline" onClick={() => { setSelectedSpec(null); setActiveWorkflow(null); setCurrentScreen("client-detail"); }}>
                <ChevronLeft className="mr-1 h-4 w-4" />
                Back
              </Button>
              <div>
                <h1 className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-[#0a1628]"}`}>{title}</h1>
                <p className={`text-sm ${isDarkMode ? "text-[#b0bec5]" : "text-[#64748b]"}`}>
                  {selectedSpec.name} · {selectedSpec.assetClass} · {selectedSpec.version}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className={`px-4 py-2 rounded-lg font-semibold ${
                status === "done"
                  ? isDarkMode ? "bg-[#4caf50]/30 text-[#81c784]" : "bg-[#e8f5e9] text-[#2e7d32]"
                  : status === "progress" 
                  ? isDarkMode ? "bg-[#2196f3]/30 text-[#90caf9]" : "bg-[#e3f2fd] text-[#1565c0]"
                  : status === "error"
                  ? isDarkMode ? "bg-[#f44336]/30 text-[#ef9a9a]" : "bg-[#ffebee] text-[#c62828]"
                  : isDarkMode ? "bg-[#455a64]/30 text-[#b0bec5]" : "bg-[#eceff1] text-[#546e7a]"
              }`}>
                {status === "done" ? "Completed" : status === "progress" ? "In Progress" : status === "error" ? "Error" : "Not Started"}
              </div>
              <Button variant="primary" style={{ backgroundColor: color }}>
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
          
          {/* Test Case Generation Content */}
          {activeWorkflow === "test-case" && (
            <div className="space-y-6">
              {/* Stats */}
              <div className="grid grid-cols-4 gap-4">
                <Card className={`p-4 ${isDarkMode ? "bg-[#0d1f3c] border-[#1e4976]" : ""}`}>
                  <p className={`text-sm ${isDarkMode ? "text-[#b0bec5]" : "text-[#64748b]"}`}>Total Test Cases</p>
                  <p className="text-3xl font-bold" style={{ color }}>{testCases.length}</p>
                </Card>
                <Card className={`p-4 ${isDarkMode ? "bg-[#0d1f3c] border-[#1e4976]" : ""}`}>
                  <p className={`text-sm ${isDarkMode ? "text-[#b0bec5]" : "text-[#64748b]"}`}>Passed</p>
                  <p className="text-3xl font-bold text-[#4caf50]">{testCases.filter(t => t.status === "Passed").length}</p>
                </Card>
                <Card className={`p-4 ${isDarkMode ? "bg-[#0d1f3c] border-[#1e4976]" : ""}`}>
                  <p className={`text-sm ${isDarkMode ? "text-[#b0bec5]" : "text-[#64748b]"}`}>Failed</p>
                  <p className="text-3xl font-bold text-[#f44336]">{testCases.filter(t => t.status === "Failed").length}</p>
                </Card>
                <Card className={`p-4 ${isDarkMode ? "bg-[#0d1f3c] border-[#1e4976]" : ""}`}>
                  <p className={`text-sm ${isDarkMode ? "text-[#b0bec5]" : "text-[#64748b]"}`}>Pending</p>
                  <p className="text-3xl font-bold text-[#f57c00]">{testCases.filter(t => t.status === "Pending").length}</p>
                </Card>
              </div>
              
              {/* Test Cases Table */}
              <Card className={`overflow-hidden ${isDarkMode ? "bg-[#0d1f3c] border-[#1e4976]" : ""}`}>
                <div className={`px-6 py-4 border-b flex items-center justify-between ${isDarkMode ? "border-[#1e4976]" : "border-[#e2e8f0]"}`}>
                  <h2 className={`text-lg font-semibold ${isDarkMode ? "text-white" : "text-[#0a1628]"}`}>Generated Test Cases</h2>
                  <Button variant="outline" size="sm">
                    <Play className="mr-1 h-4 w-4" />
                    Run All Tests
                  </Button>
                </div>
                <table className="w-full">
                  <thead>
                    <tr className={isDarkMode ? "bg-[#0a1628]" : "bg-[#f8fafc]"}>
                      <th className={`px-4 py-3 text-left text-xs font-semibold ${isDarkMode ? "text-[#b0bec5]" : "text-[#64748b]"}`}>ID</th>
                      <th className={`px-4 py-3 text-left text-xs font-semibold ${isDarkMode ? "text-[#b0bec5]" : "text-[#64748b]"}`}>Test Case Name</th>
                      <th className={`px-4 py-3 text-left text-xs font-semibold ${isDarkMode ? "text-[#b0bec5]" : "text-[#64748b]"}`}>Category</th>
                      <th className={`px-4 py-3 text-left text-xs font-semibold ${isDarkMode ? "text-[#b0bec5]" : "text-[#64748b]"}`}>Priority</th>
                      <th className={`px-4 py-3 text-left text-xs font-semibold ${isDarkMode ? "text-[#b0bec5]" : "text-[#64748b]"}`}>Status</th>
                      <th className={`px-4 py-3 text-left text-xs font-semibold ${isDarkMode ? "text-[#b0bec5]" : "text-[#64748b]"}`}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {testCases.map((tc) => (
                      <tr key={tc.id} className={`border-t ${isDarkMode ? "border-[#1e4976] hover:bg-[#162a4a]" : "border-[#e2e8f0] hover:bg-[#f8fafc]"}`}>
                        <td className={`px-4 py-3 font-mono text-sm ${isDarkMode ? "text-[#00e5ff]" : "text-[#1976d2]"}`}>{tc.id}</td>
                        <td className={`px-4 py-3 font-medium ${isDarkMode ? "text-white" : "text-[#0a1628]"}`}>{tc.name}</td>
                        <td className="px-4 py-3"><span className={`px-2 py-1 rounded text-xs ${isDarkMode ? "bg-[#1e4976] text-[#b0bec5]" : "bg-[#e2e8f0] text-[#64748b]"}`}>{tc.category}</span></td>
                        <td className={`px-4 py-3 ${tc.priority === "High" ? "text-[#f44336]" : tc.priority === "Medium" ? "text-[#f57c00]" : isDarkMode ? "text-[#b0bec5]" : "text-[#64748b]"}`}>{tc.priority}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded text-xs font-semibold ${
                            tc.status === "Passed" ? "bg-[#4caf50]/20 text-[#4caf50]" :
                            tc.status === "Failed" ? "bg-[#f44336]/20 text-[#f44336]" :
                            isDarkMode ? "bg-[#455a64]/30 text-[#b0bec5]" : "bg-[#eceff1] text-[#546e7a]"
                          }`}>{tc.status}</span>
                        </td>
                        <td className="px-4 py-3">
                          <Button variant="ghost" size="sm"><Play className="h-4 w-4" /></Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Card>
            </div>
          )}
          
          {/* Certification Case Generation Content */}
          {activeWorkflow === "cert-case" && (
            <div className="space-y-6">
              {/* Stats */}
              <div className="grid grid-cols-4 gap-4">
                <Card className={`p-4 ${isDarkMode ? "bg-[#0d1f3c] border-[#1e4976]" : ""}`}>
                  <p className={`text-sm ${isDarkMode ? "text-[#b0bec5]" : "text-[#64748b]"}`}>Total Requirements</p>
                  <p className="text-3xl font-bold" style={{ color }}>{certCases.length}</p>
                </Card>
                <Card className={`p-4 ${isDarkMode ? "bg-[#0d1f3c] border-[#1e4976]" : ""}`}>
                  <p className={`text-sm ${isDarkMode ? "text-[#b0bec5]" : "text-[#64748b]"}`}>Certified</p>
                  <p className="text-3xl font-bold text-[#4caf50]">{certCases.filter(c => c.status === "Certified").length}</p>
                </Card>
                <Card className={`p-4 ${isDarkMode ? "bg-[#0d1f3c] border-[#1e4976]" : ""}`}>
                  <p className={`text-sm ${isDarkMode ? "text-[#b0bec5]" : "text-[#64748b]"}`}>Failed</p>
                  <p className="text-3xl font-bold text-[#f44336]">{certCases.filter(c => c.status === "Failed").length}</p>
                </Card>
                <Card className={`p-4 ${isDarkMode ? "bg-[#0d1f3c] border-[#1e4976]" : ""}`}>
                  <p className={`text-sm ${isDarkMode ? "text-[#b0bec5]" : "text-[#64748b]"}`}>Pending</p>
                  <p className="text-3xl font-bold text-[#f57c00]">{certCases.filter(c => c.status === "Pending").length}</p>
                </Card>
              </div>
              
              {/* Certification Cases */}
              <Card className={`overflow-hidden ${isDarkMode ? "bg-[#0d1f3c] border-[#1e4976]" : ""}`}>
                <div className={`px-6 py-4 border-b flex items-center justify-between ${isDarkMode ? "border-[#1e4976]" : "border-[#e2e8f0]"}`}>
                  <h2 className={`text-lg font-semibold ${isDarkMode ? "text-white" : "text-[#0a1628]"}`}>Certification Requirements</h2>
                  <Button variant="outline" size="sm">
                    <Play className="mr-1 h-4 w-4" />
                    Run Certification
                  </Button>
                </div>
                <table className="w-full">
                  <thead>
                    <tr className={isDarkMode ? "bg-[#0a1628]" : "bg-[#f8fafc]"}>
                      <th className={`px-4 py-3 text-left text-xs font-semibold ${isDarkMode ? "text-[#b0bec5]" : "text-[#64748b]"}`}>ID</th>
                      <th className={`px-4 py-3 text-left text-xs font-semibold ${isDarkMode ? "text-[#b0bec5]" : "text-[#64748b]"}`}>Requirement Name</th>
                      <th className={`px-4 py-3 text-left text-xs font-semibold ${isDarkMode ? "text-[#b0bec5]" : "text-[#64748b]"}`}>Requirement ID</th>
                      <th className={`px-4 py-3 text-left text-xs font-semibold ${isDarkMode ? "text-[#b0bec5]" : "text-[#64748b]"}`}>Status</th>
                      <th className={`px-4 py-3 text-left text-xs font-semibold ${isDarkMode ? "text-[#b0bec5]" : "text-[#64748b]"}`}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {certCases.map((cc) => (
                      <tr key={cc.id} className={`border-t ${isDarkMode ? "border-[#1e4976] hover:bg-[#162a4a]" : "border-[#e2e8f0] hover:bg-[#f8fafc]"}`}>
                        <td className={`px-4 py-3 font-mono text-sm ${isDarkMode ? "text-[#00e5ff]" : "text-[#1976d2]"}`}>{cc.id}</td>
                        <td className={`px-4 py-3 font-medium ${isDarkMode ? "text-white" : "text-[#0a1628]"}`}>{cc.name}</td>
                        <td className="px-4 py-3"><span className={`px-2 py-1 rounded text-xs font-mono ${isDarkMode ? "bg-[#1e4976] text-[#f57c00]" : "bg-[#fff3e0] text-[#e65100]"}`}>{cc.requirement}</span></td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded text-xs font-semibold ${
                            cc.status === "Certified" ? "bg-[#4caf50]/20 text-[#4caf50]" :
                            cc.status === "Failed" ? "bg-[#f44336]/20 text-[#f44336]" :
                            isDarkMode ? "bg-[#455a64]/30 text-[#b0bec5]" : "bg-[#eceff1] text-[#546e7a]"
                          }`}>{cc.status}</span>
                        </td>
                        <td className="px-4 py-3">
                          <Button variant="ghost" size="sm"><Eye className="h-4 w-4" /></Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Card>
            </div>
          )}
          
          {/* Configuration Generation Content */}
          {activeWorkflow === "config-gen" && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                {configSections.map((section, i) => (
                  <Card key={i} className={`${isDarkMode ? "bg-[#0d1f3c] border-[#1e4976]" : ""}`}>
                    <div className={`px-4 py-3 border-b ${isDarkMode ? "border-[#1e4976]" : "border-[#e2e8f0]"}`}>
                      <h3 className={`font-semibold ${isDarkMode ? "text-white" : "text-[#0a1628]"}`}>{section.section}</h3>
                    </div>
                    <div className="p-4">
                      <div className={`rounded-lg p-4 font-mono text-sm ${isDarkMode ? "bg-[#0a1628] text-[#b0bec5]" : "bg-[#f8fafc] text-[#64748b]"}`}>
                        {section.items.map((item, j) => (
                          <div key={j} className="py-1">
                            <span style={{ color }}>{item.split(":")[0]}</span>
                            <span>=</span>
                            <span className={isDarkMode ? "text-[#81c784]" : "text-[#2e7d32]"}>{item.split(":")[1]}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
              
              {/* Generated Config File */}
              <Card className={`${isDarkMode ? "bg-[#0d1f3c] border-[#1e4976]" : ""}`}>
                <div className={`px-6 py-4 border-b flex items-center justify-between ${isDarkMode ? "border-[#1e4976]" : "border-[#e2e8f0]"}`}>
                  <h2 className={`text-lg font-semibold ${isDarkMode ? "text-white" : "text-[#0a1628]"}`}>Generated Configuration File</h2>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Copy className="mr-1 h-4 w-4" />
                      Copy
                    </Button>
                    <Button variant="primary" size="sm" style={{ backgroundColor: color }}>
                      <Download className="mr-1 h-4 w-4" />
                      Download .cfg
                    </Button>
                  </div>
                </div>
                <div className={`p-4 font-mono text-xs ${isDarkMode ? "bg-[#050d1a] text-[#b0bec5]" : "bg-[#f8fafc] text-[#64748b]"}`}>
                  <pre className="whitespace-pre-wrap">
{`[DEFAULT]
ConnectionType=initiator
ReconnectInterval=5
FileStorePath=./store
FileLogPath=./logs
StartTime=00:00:00
EndTime=00:00:00
UseDataDictionary=Y
DataDictionary=FIX44.xml

[SESSION]
BeginString=FIX.4.4
SenderCompID=${viewingClient.name.toUpperCase().replace(/\s/g, "")}
TargetCompID=BTCS
SocketConnectHost=fix.btcs.com
SocketConnectPort=9823
HeartBtInt=30
ResetOnLogon=Y
ValidateFieldsOutOfOrder=Y
ValidateFieldsHaveValues=Y`}
                  </pre>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <>
      {currentScreen === "home" && <HomeScreen />}
      {currentScreen === "admin-tools" && <AdminToolsScreen />}
      {currentScreen === "client-tools" && <ClientToolsScreen />}
      {currentScreen === "client-detail" && <ClientDetailScreen />}
      {currentScreen === "workflow-detail" && <WorkflowDetailScreen />}
      {showLoginModal && <LoginModal />}
      <StatusToast />
    </>
  )
}
