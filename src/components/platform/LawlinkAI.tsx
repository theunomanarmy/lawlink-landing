"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Sparkles } from "lucide-react";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
};

const initialMessages: Message[] = [
  {
    id: "1",
    role: "assistant",
    content: "Hello! I'm Lawlink AI, your legal assistant. I can help you with:\n\n• Summarizing legal documents\n• Researching legal topics\n• Answering legal questions\n• Providing case law insights\n• Drafting assistance\n\nHow can I help you today?",
    timestamp: new Date(),
  },
];

const mockResponses = [
  "Based on the information provided, here's a comprehensive analysis...",
  "I can help you understand the key legal principles involved. Let me break this down...",
  "According to recent case law and legal precedents, the following considerations apply...",
  "Here's a summary of the relevant legal framework and how it applies to your situation...",
  "I've researched this topic and found several important points to consider...",
];

export default function LawlinkAI() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: `msg-${Date.now() + 1}`,
        role: "assistant",
        content:
          mockResponses[Math.floor(Math.random() * mockResponses.length)] +
          "\n\n" +
          "This is a mock response. In a production environment, this would connect to an AI service to provide real legal assistance, document summarization, research capabilities, and more.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl h-[calc(100vh-8rem)] flex flex-col">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-accent-soft">
            <Bot size={24} className="text-accent" />
          </div>
          <div>
            <h1 className="text-3xl font-semibold">Lawlink AI</h1>
            <p className="text-muted">Your AI-powered legal assistant</p>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto mb-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-4 ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {message.role === "assistant" && (
              <div className="w-8 h-8 rounded-full bg-accent-soft flex items-center justify-center flex-shrink-0">
                <Bot size={18} className="text-accent" />
              </div>
            )}
            <div
              className={`max-w-[80%] rounded-2xl p-4 ${
                message.role === "user"
                  ? "bg-accent text-white"
                  : "bg-surface border border-border/70"
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                {message.role === "user" ? (
                  <User size={16} />
                ) : (
                  <Sparkles size={16} className="text-accent" />
                )}
                <span className="text-xs opacity-70">
                  {message.role === "user" ? "You" : "Lawlink AI"}
                </span>
                <span className="text-xs opacity-50">
                  {formatTime(message.timestamp)}
                </span>
              </div>
              <p
                className={`whitespace-pre-wrap ${
                  message.role === "user" ? "text-white" : "text-foreground"
                }`}
              >
                {message.content}
              </p>
            </div>
            {message.role === "user" && (
              <div className="w-8 h-8 rounded-full bg-accent-soft flex items-center justify-center flex-shrink-0">
                <User size={18} className="text-accent" />
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-4 justify-start">
            <div className="w-8 h-8 rounded-full bg-accent-soft flex items-center justify-center">
              <Bot size={18} className="text-accent" />
            </div>
            <div className="bg-surface border border-border/70 rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles size={16} className="text-accent" />
                <span className="text-xs text-muted">Lawlink AI</span>
              </div>
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form onSubmit={handleSend} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me anything about legal topics, request document summaries, or get research help..."
          className="flex-1 rounded-lg border border-border bg-background px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className="rounded-lg bg-accent px-6 py-3 text-white font-semibold shadow-soft transition hover:bg-[#8b5a3c] disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          <Send size={18} />
          <span className="hidden sm:inline">Send</span>
        </button>
      </form>

      {/* Quick Actions */}
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          onClick={() => setInput("Summarize this legal document...")}
          className="px-3 py-1 rounded-lg border border-border bg-surface text-sm text-muted hover:text-foreground transition"
        >
          Summarize
        </button>
        <button
          onClick={() => setInput("Research case law on...")}
          className="px-3 py-1 rounded-lg border border-border bg-surface text-sm text-muted hover:text-foreground transition"
        >
          Research
        </button>
        <button
          onClick={() => setInput("Explain the legal implications of...")}
          className="px-3 py-1 rounded-lg border border-border bg-surface text-sm text-muted hover:text-foreground transition"
        >
          Explain
        </button>
        <button
          onClick={() => setInput("Help me draft...")}
          className="px-3 py-1 rounded-lg border border-border bg-surface text-sm text-muted hover:text-foreground transition"
        >
          Draft
        </button>
      </div>
    </div>
  );
}

