'use client'

import React, { useState } from 'react'
import { MessageSquare, X } from 'lucide-react'

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-[#00e5ff] text-[#0a1628] shadow-lg hover:shadow-xl hover:scale-110 transition-all flex items-center justify-center z-40"
        aria-label="Open AI Assistant"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageSquare className="w-6 h-6" />
        )}
      </button>

      {/* Chat Panel */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 w-80 h-96 bg-[#0d1f35] border border-[#1e4976] rounded-lg shadow-2xl flex flex-col z-40">
          {/* Header */}
          <div className="bg-[#00e5ff] text-[#0a1628] p-4 rounded-t-lg flex items-center justify-between">
            <h3 className="font-semibold">AI Assistant</h3>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Chat Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            <div className="bg-[#1e4976] text-[#e0e0e0] p-3 rounded-lg rounded-bl-none">
              <p className="text-sm">Hello! I'm your AI assistant. How can I help you today?</p>
            </div>
          </div>

          {/* Input Area */}
          <div className="border-t border-[#1e4976] p-3 bg-[#0a1628]">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Ask me anything..."
                className="flex-1 bg-[#1e4976] border border-[#1e4976] rounded px-3 py-2 text-sm text-[#e0e0e0] placeholder-[#666] focus:outline-none focus:border-[#00e5ff]"
              />
              <button className="bg-[#00e5ff] text-[#0a1628] rounded px-3 py-2 hover:bg-[#00c9d9] transition-colors">
                <MessageSquare className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
