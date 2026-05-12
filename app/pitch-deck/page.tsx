"use client"

import React, { useState } from "react"
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Maximize2,
  Download,
  Home,
  CheckCircle,
  ArrowRight,
  Zap,
  Shield,
  Clock,
  TrendingUp,
  Users,
  FileText,
  Settings,
  Target,
  BarChart3,
  Layers,
  Bot,
  Workflow,
  TestTube,
  Award,
  Globe,
  DollarSign,
  Calendar,
  Building2,
  Briefcase,
  Lightbulb,
  Rocket,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function PitchDeckPage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  const slides = [
    // Slide 1: Title
    {
      id: "title",
      content: (
        <div className="flex flex-col items-center justify-center h-full text-center px-12">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00e5ff]/10 border border-[#00e5ff]/30 mb-6">
              <Zap className="h-4 w-4 text-[#00e5ff]" />
              <span className="text-sm font-medium text-[#00e5ff]">AI-Powered Platform</span>
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            FIX Protocol<br />
            <span className="text-[#00e5ff]">Certification Portal</span>
          </h1>
          <p className="text-xl text-[#8facc4] max-w-2xl mb-10">
            Transforming client onboarding with intelligent automation, 
            reducing certification time by 60% while ensuring compliance excellence.
          </p>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-[#8facc4]">
              <Building2 className="h-5 w-5 text-[#00e5ff]" />
              <span className="font-medium">Broadridge Financial Solutions</span>
            </div>
            <div className="w-px h-6 bg-[#1e4976]" />
            <span className="text-[#8facc4]">Q2 2026</span>
          </div>
        </div>
      ),
    },
    // Slide 2: Problem Statement
    {
      id: "problem",
      content: (
        <div className="h-full px-12 py-8">
          <div className="flex items-center gap-2 mb-2">
            <Target className="h-5 w-5 text-[#f44336]" />
            <span className="text-sm font-semibold text-[#f44336] uppercase tracking-wide">The Challenge</span>
          </div>
          <h2 className="text-4xl font-bold text-white mb-10">The FIX Certification Bottleneck</h2>
          
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-6">
              {[
                { icon: Clock, title: "Time-Intensive Process", desc: "Average 12-16 weeks per client certification with manual review cycles" },
                { icon: FileText, title: "Document Overload", desc: "Hundreds of spec documents, test cases, and compliance artifacts to manage" },
                { icon: Users, title: "Resource Constraints", desc: "Limited certified engineers creating backlog of 40+ pending onboardings" },
                { icon: Shield, title: "Compliance Risk", desc: "Manual processes increase risk of missed requirements and audit failures" },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 p-4 rounded-lg bg-[#1e4976]/20 border border-[#1e4976]/40">
                  <div className="p-2 rounded-lg bg-[#f44336]/10">
                    <item.icon className="h-5 w-5 text-[#f44336]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">{item.title}</h3>
                    <p className="text-sm text-[#8facc4]">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex flex-col justify-center">
              <div className="p-8 rounded-2xl bg-gradient-to-br from-[#f44336]/10 to-[#ff9800]/10 border border-[#f44336]/30">
                <h3 className="text-6xl font-bold text-[#f44336] mb-2">$2.4M</h3>
                <p className="text-lg text-white mb-4">Annual cost of delayed onboardings</p>
                <div className="space-y-3 pt-4 border-t border-[#1e4976]/50">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#8facc4]">Lost trading revenue per client</span>
                    <span className="text-white font-medium">$180K/month</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#8facc4]">Engineer hours per certification</span>
                    <span className="text-white font-medium">320+ hours</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#8facc4]">Rework rate due to errors</span>
                    <span className="text-white font-medium">23%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    // Slide 3: Solution Overview
    {
      id: "solution",
      content: (
        <div className="h-full px-12 py-8">
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb className="h-5 w-5 text-[#4caf50]" />
            <span className="text-sm font-semibold text-[#4caf50] uppercase tracking-wide">Our Solution</span>
          </div>
          <h2 className="text-4xl font-bold text-white mb-8">Intelligent Certification Automation</h2>
          
          <div className="grid grid-cols-3 gap-6 mb-8">
            {[
              { icon: Bot, title: "AI Document Analysis", desc: "Automatically extract requirements from client specs using advanced NLP", color: "#00e5ff" },
              { icon: Workflow, title: "Guided Workflows", desc: "8-phase structured process with smart task routing and status tracking", color: "#9c27b0" },
              { icon: TestTube, title: "Auto Test Generation", desc: "Generate comprehensive test suites based on spec analysis", color: "#4caf50" },
            ].map((item, i) => (
              <div key={i} className="p-6 rounded-xl bg-[#0d2137] border border-[#1e4976]/50 hover:border-[#00e5ff]/50 transition-colors">
                <div className="p-3 rounded-lg bg-[#1e4976]/30 w-fit mb-4">
                  <item.icon className="h-6 w-6" style={{ color: item.color }} />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-[#8facc4]">{item.desc}</p>
              </div>
            ))}
          </div>
          
          <div className="p-6 rounded-xl bg-gradient-to-r from-[#00e5ff]/10 via-[#9c27b0]/10 to-[#4caf50]/10 border border-[#1e4976]/50">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold text-white mb-1">End-to-End Platform</h3>
                <p className="text-[#8facc4]">From intake to production enablement — one unified workflow</p>
              </div>
              <div className="flex items-center gap-3">
                {["Intake", "Design", "Setup", "Cert", "Test", "Analysis", "Decision", "Production"].map((phase, i) => (
                  <React.Fragment key={phase}>
                    <div className="flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${i < 4 ? "bg-[#4caf50] text-white" : "bg-[#1e4976] text-[#8facc4]"}`}>
                        {i + 1}
                      </div>
                      <span className="text-[10px] text-[#8facc4] mt-1">{phase}</span>
                    </div>
                    {i < 7 && <ArrowRight className="h-3 w-3 text-[#1e4976]" />}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      ),
    },
    // Slide 4: Platform Demo - Dashboard
    {
      id: "demo-dashboard",
      content: (
        <div className="h-full px-12 py-8">
          <div className="flex items-center gap-2 mb-2">
            <Layers className="h-5 w-5 text-[#00e5ff]" />
            <span className="text-sm font-semibold text-[#00e5ff] uppercase tracking-wide">Platform Overview</span>
          </div>
          <h2 className="text-4xl font-bold text-white mb-6">Unified Case Management</h2>
          
          <div className="grid grid-cols-4 gap-4 mb-6">
            {[
              { label: "Active Cases", value: "24", trend: "+3", color: "#00e5ff" },
              { label: "In Certification", value: "8", trend: "+2", color: "#ff9800" },
              { label: "Completed (YTD)", value: "47", trend: "+12", color: "#4caf50" },
              { label: "Avg. Cycle Time", value: "5.2 wks", trend: "-2.1", color: "#9c27b0" },
            ].map((stat, i) => (
              <div key={i} className="p-4 rounded-lg bg-[#0d2137] border border-[#1e4976]/50">
                <p className="text-xs text-[#8facc4] mb-1">{stat.label}</p>
                <div className="flex items-end gap-2">
                  <span className="text-2xl font-bold text-white">{stat.value}</span>
                  <span className={`text-xs font-medium ${stat.trend.startsWith("+") ? "text-[#4caf50]" : "text-[#4caf50]"}`}>{stat.trend}</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="rounded-xl border border-[#1e4976]/50 overflow-hidden">
            <div className="bg-[#0d2137] px-4 py-3 border-b border-[#1e4976]/50 flex items-center justify-between">
              <span className="font-semibold text-white">Recent Onboarding Cases</span>
              <span className="text-xs text-[#8facc4]">Showing 5 of 24</span>
            </div>
            <div className="divide-y divide-[#1e4976]/30">
              {[
                { id: "OB-2024-006", client: "Quantum Asset Management", asset: "Commodities", phase: 4, progress: 63 },
                { id: "OB-2024-005", client: "Nexus Trading Group", asset: "Equities", phase: 6, progress: 78 },
                { id: "OB-2024-004", client: "Atlas Capital", asset: "FX", phase: 3, progress: 45 },
                { id: "OB-2024-003", client: "Meridian Investments", asset: "Fixed Income", phase: 7, progress: 92 },
                { id: "OB-2024-002", client: "Summit Partners", asset: "Derivatives", phase: 8, progress: 100 },
              ].map((c, i) => (
                <div key={i} className="px-4 py-3 flex items-center justify-between hover:bg-[#1e4976]/10">
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-mono text-[#8facc4]">{c.id}</span>
                    <span className="font-medium text-white">{c.client}</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-[#1e4976]/50 text-[#8facc4]">{c.asset}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-[#8facc4]">Phase {c.phase}/8</span>
                    <div className="w-24 h-1.5 rounded-full bg-[#1e4976]/50 overflow-hidden">
                      <div className="h-full rounded-full bg-[#00e5ff]" style={{ width: `${c.progress}%` }} />
                    </div>
                    <span className="text-xs font-medium text-[#00e5ff] w-10 text-right">{c.progress}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    // Slide 5: AI Features
    {
      id: "ai-features",
      content: (
        <div className="h-full px-12 py-8">
          <div className="flex items-center gap-2 mb-2">
            <Bot className="h-5 w-5 text-[#9c27b0]" />
            <span className="text-sm font-semibold text-[#9c27b0] uppercase tracking-wide">AI Capabilities</span>
          </div>
          <h2 className="text-4xl font-bold text-white mb-8">Intelligent Automation at Every Step</h2>
          
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="p-5 rounded-xl bg-[#0d2137] border border-[#1e4976]/50">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-[#00e5ff]/10">
                    <FileText className="h-5 w-5 text-[#00e5ff]" />
                  </div>
                  <h3 className="font-semibold text-white">Document Intelligence</h3>
                </div>
                <ul className="space-y-2 text-sm text-[#8facc4]">
                  <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-[#4caf50] mt-0.5 shrink-0" /> Parse FIX spec PDFs and extract message definitions</li>
                  <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-[#4caf50] mt-0.5 shrink-0" /> Identify custom tags and field requirements</li>
                  <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-[#4caf50] mt-0.5 shrink-0" /> Compare against standard protocol versions</li>
                </ul>
              </div>
              
              <div className="p-5 rounded-xl bg-[#0d2137] border border-[#1e4976]/50">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-[#4caf50]/10">
                    <TestTube className="h-5 w-5 text-[#4caf50]" />
                  </div>
                  <h3 className="font-semibold text-white">Test Plan Generation</h3>
                </div>
                <ul className="space-y-2 text-sm text-[#8facc4]">
                  <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-[#4caf50] mt-0.5 shrink-0" /> Auto-generate test cases from spec requirements</li>
                  <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-[#4caf50] mt-0.5 shrink-0" /> Map to standardized certification suites</li>
                  <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-[#4caf50] mt-0.5 shrink-0" /> Prioritize critical path testing</li>
                </ul>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="p-5 rounded-xl bg-[#0d2137] border border-[#1e4976]/50">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-[#ff9800]/10">
                    <BarChart3 className="h-5 w-5 text-[#ff9800]" />
                  </div>
                  <h3 className="font-semibold text-white">Predictive Analytics</h3>
                </div>
                <ul className="space-y-2 text-sm text-[#8facc4]">
                  <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-[#4caf50] mt-0.5 shrink-0" /> Estimate certification timeline based on complexity</li>
                  <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-[#4caf50] mt-0.5 shrink-0" /> Flag high-risk requirements early</li>
                  <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-[#4caf50] mt-0.5 shrink-0" /> Resource allocation recommendations</li>
                </ul>
              </div>
              
              <div className="p-5 rounded-xl bg-[#0d2137] border border-[#1e4976]/50">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-[#9c27b0]/10">
                    <Workflow className="h-5 w-5 text-[#9c27b0]" />
                  </div>
                  <h3 className="font-semibold text-white">Workflow Automation</h3>
                </div>
                <ul className="space-y-2 text-sm text-[#8facc4]">
                  <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-[#4caf50] mt-0.5 shrink-0" /> Auto-route tasks to appropriate teams</li>
                  <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-[#4caf50] mt-0.5 shrink-0" /> Smart notifications and escalations</li>
                  <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-[#4caf50] mt-0.5 shrink-0" /> Compliance checkpoint automation</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    // Slide 6: 8-Phase Workflow
    {
      id: "workflow",
      content: (
        <div className="h-full px-12 py-8">
          <div className="flex items-center gap-2 mb-2">
            <Workflow className="h-5 w-5 text-[#00e5ff]" />
            <span className="text-sm font-semibold text-[#00e5ff] uppercase tracking-wide">Process</span>
          </div>
          <h2 className="text-4xl font-bold text-white mb-8">8-Phase Certification Workflow</h2>
          
          <div className="grid grid-cols-4 gap-4">
            {[
              { num: 1, name: "Intake & Discovery", desc: "Document upload, AI analysis, requirement extraction", icon: FileText, color: "#4caf50" },
              { num: 2, name: "Solution Design", desc: "Architecture planning, spec standardization, gap analysis", icon: Settings, color: "#4caf50" },
              { num: 3, name: "Connectivity Setup", desc: "Network config, session parameters, environment prep", icon: Globe, color: "#4caf50" },
              { num: 4, name: "Certification Planning", desc: "Test plan generation, suite creation, schedule alignment", icon: Calendar, color: "#00e5ff" },
              { num: 5, name: "Test Execution", desc: "Automated test runs, result capture, evidence collection", icon: TestTube, color: "#ff9800" },
              { num: 6, name: "Analysis & Remediation", desc: "Issue triage, fix verification, retest cycles", icon: BarChart3, color: "#ff9800" },
              { num: 7, name: "Certification Decision", desc: "Compliance review, stakeholder sign-off, documentation", icon: Award, color: "#9c27b0" },
              { num: 8, name: "Production Enablement", desc: "Go-live prep, monitoring setup, handoff completion", icon: Rocket, color: "#9c27b0" },
            ].map((phase, i) => (
              <div key={i} className="p-4 rounded-xl bg-[#0d2137] border border-[#1e4976]/50 hover:border-opacity-100 transition-colors" style={{ borderColor: `${phase.color}30` }}>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ backgroundColor: phase.color }}>
                    {phase.num}
                  </div>
                  <phase.icon className="h-4 w-4" style={{ color: phase.color }} />
                </div>
                <h3 className="font-semibold text-white text-sm mb-1">{phase.name}</h3>
                <p className="text-xs text-[#8facc4] leading-relaxed">{phase.desc}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 rounded-xl bg-[#1e4976]/20 border border-[#1e4976]/40 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Zap className="h-5 w-5 text-[#00e5ff]" />
              <span className="text-white font-medium">AI assists at every phase — reducing manual work by up to 70%</span>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#4caf50]" />
                <span className="text-[#8facc4]">Automated</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#00e5ff]" />
                <span className="text-[#8facc4]">AI-Assisted</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#ff9800]" />
                <span className="text-[#8facc4]">Guided</span>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    // Slide 7: Key Metrics / ROI
    {
      id: "roi",
      content: (
        <div className="h-full px-12 py-8">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="h-5 w-5 text-[#4caf50]" />
            <span className="text-sm font-semibold text-[#4caf50] uppercase tracking-wide">Impact</span>
          </div>
          <h2 className="text-4xl font-bold text-white mb-8">Measurable Business Value</h2>
          
          <div className="grid grid-cols-3 gap-6 mb-8">
            {[
              { value: "60%", label: "Faster Certification", sub: "12 weeks → 5 weeks average", color: "#00e5ff" },
              { value: "70%", label: "Less Manual Work", sub: "AI handles document analysis & test gen", color: "#4caf50" },
              { value: "85%", label: "First-Pass Success", sub: "Reduced rework and retest cycles", color: "#9c27b0" },
            ].map((stat, i) => (
              <div key={i} className="p-6 rounded-xl bg-[#0d2137] border border-[#1e4976]/50 text-center">
                <h3 className="text-5xl font-bold mb-2" style={{ color: stat.color }}>{stat.value}</h3>
                <p className="text-lg font-semibold text-white mb-1">{stat.label}</p>
                <p className="text-sm text-[#8facc4]">{stat.sub}</p>
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            <div className="p-6 rounded-xl bg-gradient-to-br from-[#4caf50]/10 to-[#00e5ff]/10 border border-[#4caf50]/30">
              <h3 className="text-lg font-semibold text-white mb-4">Annual Cost Savings</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-[#8facc4]">Reduced engineer hours</span>
                  <span className="text-white font-semibold">$840K</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#8facc4]">Faster time-to-revenue</span>
                  <span className="text-white font-semibold">$1.2M</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#8facc4]">Eliminated rework</span>
                  <span className="text-white font-semibold">$320K</span>
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-[#1e4976]/50">
                  <span className="text-white font-semibold">Total Annual Savings</span>
                  <span className="text-[#4caf50] font-bold text-xl">$2.36M</span>
                </div>
              </div>
            </div>
            
            <div className="p-6 rounded-xl bg-[#0d2137] border border-[#1e4976]/50">
              <h3 className="text-lg font-semibold text-white mb-4">Capacity Increase</h3>
              <div className="flex items-center gap-8">
                <div className="text-center">
                  <p className="text-3xl font-bold text-[#8facc4]">35</p>
                  <p className="text-xs text-[#8facc4]">Before</p>
                  <p className="text-xs text-[#8facc4]">certs/year</p>
                </div>
                <ArrowRight className="h-8 w-8 text-[#00e5ff]" />
                <div className="text-center">
                  <p className="text-3xl font-bold text-[#00e5ff]">85</p>
                  <p className="text-xs text-[#8facc4]">After</p>
                  <p className="text-xs text-[#8facc4]">certs/year</p>
                </div>
              </div>
              <p className="text-sm text-[#8facc4] mt-4">2.4x throughput with same team size</p>
            </div>
          </div>
        </div>
      ),
    },
    // Slide 8: Technology Stack
    {
      id: "tech-stack",
      content: (
        <div className="h-full px-12 py-8">
          <div className="flex items-center gap-2 mb-2">
            <Layers className="h-5 w-5 text-[#9c27b0]" />
            <span className="text-sm font-semibold text-[#9c27b0] uppercase tracking-wide">Technology</span>
          </div>
          <h2 className="text-4xl font-bold text-white mb-8">Enterprise-Grade Architecture</h2>
          
          <div className="grid grid-cols-3 gap-6">
            <div className="p-5 rounded-xl bg-[#0d2137] border border-[#1e4976]/50">
              <h3 className="text-sm font-semibold text-[#00e5ff] mb-4 uppercase tracking-wide">Frontend</h3>
              <div className="space-y-3">
                {["Next.js 16 (App Router)", "React 19 + TypeScript", "Tailwind CSS + shadcn/ui", "Real-time WebSocket updates"].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-[#8facc4]">
                    <CheckCircle className="h-3.5 w-3.5 text-[#4caf50]" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="p-5 rounded-xl bg-[#0d2137] border border-[#1e4976]/50">
              <h3 className="text-sm font-semibold text-[#4caf50] mb-4 uppercase tracking-wide">Backend & AI</h3>
              <div className="space-y-3">
                {["Vercel AI SDK 6", "OpenAI GPT-4 + Claude", "Document parsing (PDF/XML)", "Vector embeddings for search"].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-[#8facc4]">
                    <CheckCircle className="h-3.5 w-3.5 text-[#4caf50]" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="p-5 rounded-xl bg-[#0d2137] border border-[#1e4976]/50">
              <h3 className="text-sm font-semibold text-[#ff9800] mb-4 uppercase tracking-wide">Infrastructure</h3>
              <div className="space-y-3">
                {["Vercel Edge Functions", "Supabase (PostgreSQL + Auth)", "Vercel Blob Storage", "SOC 2 Type II compliant"].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-[#8facc4]">
                    <CheckCircle className="h-3.5 w-3.5 text-[#4caf50]" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="mt-6 p-5 rounded-xl bg-[#1e4976]/20 border border-[#1e4976]/40">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-white mb-1">Security & Compliance</h3>
                <p className="text-sm text-[#8facc4]">Built for financial services regulatory requirements</p>
              </div>
              <div className="flex items-center gap-4">
                {["SOC 2", "ISO 27001", "GDPR", "FIX Protocol Certified"].map((badge, i) => (
                  <div key={i} className="px-3 py-1.5 rounded bg-[#0d2137] border border-[#1e4976]/50 text-xs font-medium text-[#8facc4]">
                    {badge}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ),
    },
    // Slide 9: Competitive Advantage
    {
      id: "competitive",
      content: (
        <div className="h-full px-12 py-8">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="h-5 w-5 text-[#00e5ff]" />
            <span className="text-sm font-semibold text-[#00e5ff] uppercase tracking-wide">Differentiation</span>
          </div>
          <h2 className="text-4xl font-bold text-white mb-8">Why Our Platform Wins</h2>
          
          <div className="overflow-hidden rounded-xl border border-[#1e4976]/50">
            <table className="w-full text-sm">
              <thead className="bg-[#0d2137]">
                <tr>
                  <th className="px-4 py-3 text-left text-[#8facc4] font-semibold">Capability</th>
                  <th className="px-4 py-3 text-center text-[#8facc4] font-semibold">Traditional Process</th>
                  <th className="px-4 py-3 text-center text-[#8facc4] font-semibold">Competitor Tools</th>
                  <th className="px-4 py-3 text-center text-[#00e5ff] font-semibold">Our Platform</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1e4976]/30">
                {[
                  { cap: "Document Analysis", trad: "Manual review", comp: "Basic parsing", ours: "AI-powered extraction" },
                  { cap: "Test Generation", trad: "Manual creation", comp: "Template-based", ours: "Auto-generated from spec" },
                  { cap: "Workflow Management", trad: "Spreadsheets/Email", comp: "Basic tracking", ours: "8-phase guided workflow" },
                  { cap: "Time to Certify", trad: "12-16 weeks", comp: "8-10 weeks", ours: "4-6 weeks" },
                  { cap: "FIX Protocol Expertise", trad: "Varies by engineer", comp: "Generic support", ours: "Deep FIX specialization" },
                  { cap: "Compliance Tracking", trad: "Manual documentation", comp: "Basic audit trail", ours: "Full lineage & evidence" },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-[#1e4976]/10">
                    <td className="px-4 py-3 font-medium text-white">{row.cap}</td>
                    <td className="px-4 py-3 text-center text-[#f44336]">{row.trad}</td>
                    <td className="px-4 py-3 text-center text-[#ff9800]">{row.comp}</td>
                    <td className="px-4 py-3 text-center text-[#4caf50] font-medium">{row.ours}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-6 grid grid-cols-3 gap-4">
            {[
              { icon: Zap, label: "Only AI-native FIX certification platform" },
              { icon: Briefcase, label: "Built by Broadridge domain experts" },
              { icon: Globe, label: "Supports all major FIX versions (4.0-5.0)" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-[#0d2137] border border-[#1e4976]/50">
                <item.icon className="h-5 w-5 text-[#00e5ff]" />
                <span className="text-sm text-white">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    // Slide 10: Implementation Timeline
    {
      id: "timeline",
      content: (
        <div className="h-full px-12 py-8">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="h-5 w-5 text-[#ff9800]" />
            <span className="text-sm font-semibold text-[#ff9800] uppercase tracking-wide">Roadmap</span>
          </div>
          <h2 className="text-4xl font-bold text-white mb-8">Implementation Timeline</h2>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute top-8 left-0 right-0 h-1 bg-[#1e4976]/50 rounded-full" />
            <div className="absolute top-8 left-0 w-1/3 h-1 bg-[#4caf50] rounded-full" />
            
            <div className="grid grid-cols-4 gap-4 relative">
              {[
                { phase: "Phase 1", title: "Core Platform", date: "Q1 2026", status: "complete", items: ["Case management", "8-phase workflow", "Basic document upload"] },
                { phase: "Phase 2", title: "AI Integration", date: "Q2 2026", status: "current", items: ["Document analysis AI", "Test plan generation", "Spec standardization"] },
                { phase: "Phase 3", title: "Advanced Features", date: "Q3 2026", status: "upcoming", items: ["Automated test execution", "Real-time analytics", "Client portal"] },
                { phase: "Phase 4", title: "Scale & Optimize", date: "Q4 2026", status: "upcoming", items: ["Multi-region deploy", "API marketplace", "ML-based predictions"] },
              ].map((item, i) => (
                <div key={i} className="pt-12">
                  <div className={`absolute top-6 w-5 h-5 rounded-full border-4 ${
                    item.status === "complete" ? "bg-[#4caf50] border-[#4caf50]" :
                    item.status === "current" ? "bg-[#00e5ff] border-[#00e5ff] animate-pulse" :
                    "bg-[#0a1628] border-[#1e4976]"
                  }`} style={{ left: `calc(${i * 25}% + ${i * 1}rem + 0.5rem)` }} />
                  <div className={`p-4 rounded-xl border ${
                    item.status === "current" ? "bg-[#00e5ff]/10 border-[#00e5ff]/50" : "bg-[#0d2137] border-[#1e4976]/50"
                  }`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-xs font-semibold ${item.status === "current" ? "text-[#00e5ff]" : "text-[#8facc4]"}`}>{item.phase}</span>
                      <span className="text-xs text-[#8facc4]">{item.date}</span>
                    </div>
                    <h3 className="font-semibold text-white mb-2">{item.title}</h3>
                    <ul className="space-y-1">
                      {item.items.map((li, j) => (
                        <li key={j} className="text-xs text-[#8facc4] flex items-center gap-1.5">
                          <div className={`w-1.5 h-1.5 rounded-full ${item.status === "complete" ? "bg-[#4caf50]" : "bg-[#1e4976]"}`} />
                          {li}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-8 p-4 rounded-xl bg-[#00e5ff]/10 border border-[#00e5ff]/30 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Rocket className="h-5 w-5 text-[#00e5ff]" />
              <span className="text-white font-medium">Currently in Phase 2 — AI Integration</span>
            </div>
            <span className="text-sm text-[#8facc4]">On track for Q3 2026 production release</span>
          </div>
        </div>
      ),
    },
    // Slide 11: Target Market
    {
      id: "market",
      content: (
        <div className="h-full px-12 py-8">
          <div className="flex items-center gap-2 mb-2">
            <Users className="h-5 w-5 text-[#4caf50]" />
            <span className="text-sm font-semibold text-[#4caf50] uppercase tracking-wide">Market</span>
          </div>
          <h2 className="text-4xl font-bold text-white mb-8">Target Customers</h2>
          
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Primary Segments</h3>
              {[
                { icon: Building2, title: "Asset Managers", desc: "Buy-side firms needing FIX connectivity to brokers and exchanges", size: "4,200+ firms globally" },
                { icon: TrendingUp, title: "Hedge Funds", desc: "Algorithmic trading firms requiring low-latency certified connections", size: "8,000+ funds" },
                { icon: Briefcase, title: "Broker-Dealers", desc: "Sell-side institutions onboarding new client connections", size: "2,500+ firms" },
              ].map((seg, i) => (
                <div key={i} className="p-4 rounded-xl bg-[#0d2137] border border-[#1e4976]/50">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-[#4caf50]/10">
                      <seg.icon className="h-5 w-5 text-[#4caf50]" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-white">{seg.title}</h4>
                        <span className="text-xs px-2 py-0.5 rounded bg-[#1e4976]/50 text-[#8facc4]">{seg.size}</span>
                      </div>
                      <p className="text-sm text-[#8facc4]">{seg.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Market Opportunity</h3>
              <div className="p-6 rounded-xl bg-gradient-to-br from-[#4caf50]/10 to-[#00e5ff]/10 border border-[#4caf50]/30">
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div className="text-center">
                    <p className="text-4xl font-bold text-[#00e5ff]">$1.8B</p>
                    <p className="text-sm text-[#8facc4]">TAM (Trading connectivity)</p>
                  </div>
                  <div className="text-center">
                    <p className="text-4xl font-bold text-[#4caf50]">$420M</p>
                    <p className="text-sm text-[#8facc4]">SAM (FIX certification)</p>
                  </div>
                </div>
                <div className="pt-4 border-t border-[#1e4976]/50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-[#8facc4]">Year 1 target</span>
                    <span className="text-white font-semibold">50 enterprise clients</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#8facc4]">Revenue potential</span>
                    <span className="text-[#4caf50] font-semibold">$12M ARR</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 p-4 rounded-xl bg-[#0d2137] border border-[#1e4976]/50">
                <h4 className="font-semibold text-white mb-2">Geographic Focus</h4>
                <div className="flex flex-wrap gap-2">
                  {["North America", "Europe", "Asia Pacific", "LATAM"].map((region, i) => (
                    <span key={i} className="text-xs px-3 py-1.5 rounded-full bg-[#1e4976]/50 text-[#8facc4]">{region}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    // Slide 12: Team
    {
      id: "team",
      content: (
        <div className="h-full px-12 py-8">
          <div className="flex items-center gap-2 mb-2">
            <Users className="h-5 w-5 text-[#9c27b0]" />
            <span className="text-sm font-semibold text-[#9c27b0] uppercase tracking-wide">Team</span>
          </div>
          <h2 className="text-4xl font-bold text-white mb-8">Built by Industry Experts</h2>
          
          <div className="grid grid-cols-4 gap-4 mb-8">
            {[
              { name: "Sarah Chen", role: "Product Lead", exp: "15 yrs @ Broadridge", focus: "FIX Protocol Expert" },
              { name: "Michael Torres", role: "Tech Lead", exp: "12 yrs @ Goldman", focus: "Trading Systems" },
              { name: "Emily Watson", role: "AI/ML Lead", exp: "8 yrs @ Google", focus: "NLP & Document AI" },
              { name: "David Park", role: "Engineering", exp: "10 yrs @ Citadel", focus: "Low-latency Systems" },
            ].map((person, i) => (
              <div key={i} className="p-4 rounded-xl bg-[#0d2137] border border-[#1e4976]/50 text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#1e4976] to-[#0d2137] mx-auto mb-3 flex items-center justify-center">
                  <span className="text-xl font-bold text-[#00e5ff]">{person.name.split(" ").map(n => n[0]).join("")}</span>
                </div>
                <h3 className="font-semibold text-white">{person.name}</h3>
                <p className="text-sm text-[#00e5ff] mb-1">{person.role}</p>
                <p className="text-xs text-[#8facc4]">{person.exp}</p>
                <p className="text-xs text-[#8facc4]">{person.focus}</p>
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-[#1e4976]/20 border border-[#1e4976]/40 text-center">
              <p className="text-3xl font-bold text-[#00e5ff] mb-1">85+</p>
              <p className="text-sm text-[#8facc4]">Combined years in financial technology</p>
            </div>
            <div className="p-4 rounded-xl bg-[#1e4976]/20 border border-[#1e4976]/40 text-center">
              <p className="text-3xl font-bold text-[#4caf50] mb-1">500+</p>
              <p className="text-sm text-[#8facc4]">FIX certifications delivered</p>
            </div>
            <div className="p-4 rounded-xl bg-[#1e4976]/20 border border-[#1e4976]/40 text-center">
              <p className="text-3xl font-bold text-[#ff9800] mb-1">12</p>
              <p className="text-sm text-[#8facc4]">Patents in trading technology</p>
            </div>
          </div>
        </div>
      ),
    },
    // Slide 13: Call to Action
    {
      id: "cta",
      content: (
        <div className="flex flex-col items-center justify-center h-full text-center px-12">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#4caf50]/10 border border-[#4caf50]/30 mb-6">
              <Rocket className="h-4 w-4 text-[#4caf50]" />
              <span className="text-sm font-medium text-[#4caf50]">Ready to Launch</span>
            </div>
          </div>
          <h1 className="text-5xl font-bold text-white mb-6">
            Transform Your<br />
            <span className="text-[#00e5ff]">Certification Process</span>
          </h1>
          <p className="text-xl text-[#8facc4] max-w-2xl mb-10">
            Join the leading financial institutions already using our platform to 
            accelerate client onboarding and reduce operational costs.
          </p>
          
          <div className="flex items-center gap-4 mb-12">
            <div className="px-8 py-4 rounded-xl bg-[#00e5ff] text-[#0a1628] font-semibold text-lg cursor-pointer hover:bg-[#00b8d4] transition-colors">
              Schedule a Demo
            </div>
            <div className="px-8 py-4 rounded-xl border border-[#1e4976] text-white font-semibold text-lg cursor-pointer hover:bg-[#1e4976]/20 transition-colors">
              View Live Platform
            </div>
          </div>
          
          <div className="flex items-center gap-8 text-sm text-[#8facc4]">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-[#4caf50]" />
              <span>Free pilot program</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-[#4caf50]" />
              <span>60-day implementation</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-[#4caf50]" />
              <span>Dedicated support team</span>
            </div>
          </div>
        </div>
      ),
    },
    // Slide 14: Contact
    {
      id: "contact",
      content: (
        <div className="flex flex-col items-center justify-center h-full text-center px-12">
          <Building2 className="h-16 w-16 text-[#00e5ff] mb-6" />
          <h2 className="text-4xl font-bold text-white mb-4">Get in Touch</h2>
          <p className="text-xl text-[#8facc4] mb-10">
            Broadridge Financial Solutions
          </p>
          
          <div className="grid grid-cols-3 gap-8 max-w-3xl">
            <div className="p-6 rounded-xl bg-[#0d2137] border border-[#1e4976]/50">
              <Globe className="h-6 w-6 text-[#00e5ff] mx-auto mb-3" />
              <p className="text-white font-medium">Website</p>
              <p className="text-sm text-[#8facc4]">broadridge.com/fix-portal</p>
            </div>
            <div className="p-6 rounded-xl bg-[#0d2137] border border-[#1e4976]/50">
              <FileText className="h-6 w-6 text-[#4caf50] mx-auto mb-3" />
              <p className="text-white font-medium">Email</p>
              <p className="text-sm text-[#8facc4]">fix-certification@broadridge.com</p>
            </div>
            <div className="p-6 rounded-xl bg-[#0d2137] border border-[#1e4976]/50">
              <Users className="h-6 w-6 text-[#9c27b0] mx-auto mb-3" />
              <p className="text-white font-medium">Sales</p>
              <p className="text-sm text-[#8facc4]">+1 (800) 353-0103</p>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-[#1e4976]/50 w-full max-w-2xl">
            <p className="text-sm text-[#8facc4]">
              © 2026 Broadridge Financial Solutions, Inc. All rights reserved.<br />
              FIX Protocol is a registered trademark of FIX Trading Community.
            </p>
          </div>
        </div>
      ),
    },
  ]

  // Auto-play functionality
  React.useEffect(() => {
    if (!isPlaying) return
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [isPlaying, slides.length])

  const goToSlide = (index: number) => {
    setCurrentSlide(Math.max(0, Math.min(index, slides.length - 1)))
  }

  return (
    <div className="min-h-screen bg-[#0a1628] flex flex-col">
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-[#1e4976]/50 bg-[#0d2137]">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="sm" className="text-[#8facc4] hover:text-white">
              <Home className="h-4 w-4 mr-2" /> Back to Portal
            </Button>
          </Link>
          <div className="w-px h-6 bg-[#1e4976]" />
          <span className="text-white font-semibold">FIX Certification Portal — Pitch Deck</span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsPlaying(!isPlaying)}
            className="text-[#8facc4] hover:text-white"
          >
            {isPlaying ? <Pause className="h-4 w-4 mr-1" /> : <Play className="h-4 w-4 mr-1" />}
            {isPlaying ? "Pause" : "Auto-play"}
          </Button>
          <Button variant="ghost" size="sm" className="text-[#8facc4] hover:text-white">
            <Download className="h-4 w-4 mr-1" /> Export PDF
          </Button>
          <Button variant="ghost" size="sm" className="text-[#8facc4] hover:text-white">
            <Maximize2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Slide content */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-6xl aspect-[16/9] bg-[#0d2137] rounded-2xl border border-[#1e4976]/50 shadow-2xl overflow-hidden">
          {slides[currentSlide].content}
        </div>
      </div>

      {/* Bottom controls */}
      <div className="px-6 py-4 border-t border-[#1e4976]/50 bg-[#0d2137]">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <Button
            variant="outline"
            onClick={() => goToSlide(currentSlide - 1)}
            disabled={currentSlide === 0}
            className="disabled:opacity-50"
          >
            <ChevronLeft className="h-4 w-4 mr-1" /> Previous
          </Button>

          {/* Slide indicators */}
          <div className="flex items-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goToSlide(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  i === currentSlide
                    ? "bg-[#00e5ff] w-8"
                    : "bg-[#1e4976] hover:bg-[#2a5a8a]"
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-[#8facc4]">
              {currentSlide + 1} / {slides.length}
            </span>
            <Button
              variant="outline"
              onClick={() => goToSlide(currentSlide + 1)}
              disabled={currentSlide === slides.length - 1}
              className="disabled:opacity-50"
            >
              Next <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
