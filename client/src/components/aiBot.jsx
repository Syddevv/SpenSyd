import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/AIBot.css";

const key = import.meta.env?.VITE_GEMINI_KEY;
const AIBot = ({ expenses = [], incomes = [], currentBalance = 0 }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "Hi! I'm SpenSyd AI 🤖. I've analyzed your finances. Ask me anything about your spending habits, income, or balance!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  const getFinancialContext = () => {
    // Safety check: ensure arrays exist before processing
    const safeExpenses = Array.isArray(expenses) ? expenses : [];
    const safeIncomes = Array.isArray(incomes) ? incomes : [];

    const recentExpenses = safeExpenses
      .slice(0, 15)
      .map(
        (e) =>
          `${e.category}: ${e.amount} (${new Date(
            e.date
          ).toLocaleDateString()})`
      )
      .join("; ");

    const recentIncomes = safeIncomes
      .slice(0, 15)
      .map(
        (i) =>
          `${i.category}: ${i.amount} (${new Date(
            i.date
          ).toLocaleDateString()})`
      )
      .join("; ");

    const categoryTotals = safeExpenses.reduce((acc, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
      return acc;
    }, {});

    const categorySummary = Object.entries(categoryTotals)
      .map(([cat, total]) => `${cat}: ${total}`)
      .join(", ");

    return `
      Current Wallet Balance: ${currentBalance}.
      Total Income Count: ${safeIncomes.length}.
      Total Expense Count: ${safeExpenses.length}.
      Expense Breakdown by Category: ${categorySummary}.
      Recent Expenses List: ${recentExpenses}.
      Recent Incomes List: ${recentIncomes}.
    `;
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      // 1. Prepare Context (Now inside try block to catch data errors)
      console.log("Preparing financial context...");
      const context = getFinancialContext();

      // 2. Get API Key
      const apiKey = key;

      if (!apiKey) {
        throw new Error(
          "API Key is missing. Please check your .env file and VITE_GEMINI_KEY."
        );
      }

      const systemPrompt = `You are SpenSyd AI, a helpful financial assistant. 
      You have access to the user's data: ${context}. 
      Answer concisely based on this data. If the answer isn't in the data, say so.`;

      console.log("Sending request to Gemini...");

      // 3. Call API
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: input }] }],
            systemInstruction: { parts: [{ text: systemPrompt }] },
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("API Error Details:", errorData);
        throw new Error(
          `Server Error: ${response.status} - ${
            errorData.error?.message || response.statusText
          }`
        );
      }

      const data = await response.json();
      const botResponseText =
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "I couldn't understand that.";

      setMessages((prev) => [...prev, { role: "bot", text: botResponseText }]);
    } catch (error) {
      console.error("AI Bot Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: `Error: ${error.message}. Check console (F12) for details.`,
        },
      ]);
    } finally {
      setLoading(false); // This ensures "Thinking..." always stops
    }
  };

  return (
    <div className="ai-bot-container">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="ai-chat-window"
            initial={{ opacity: 0, scale: 0.8, y: 20, x: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20, x: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <div className="chat-header">
              <h3>🤖 SpenSyd Assistant</h3>
              <button className="close-chat" onClick={() => setIsOpen(false)}>
                ×
              </button>
            </div>

            <div className="chat-messages">
              {messages.map((msg, idx) => (
                <div key={idx} className={`message ${msg.role}`}>
                  {msg.text}
                </div>
              ))}
              {loading && (
                <div className="message bot">
                  <span className="typing-indicator">Thinking...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="chat-input-area">
              <input
                type="text"
                className="chat-input"
                placeholder="Ask about your finances..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
              />
              <button
                className="send-button"
                onClick={handleSend}
                disabled={loading}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        className="ai-bot-button"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="11" width="18" height="10" rx="2"></rect>
          <circle cx="12" cy="5" r="2"></circle>
          <path d="M12 7v4"></path>
          <line x1="8" y1="16" x2="8" y2="16"></line>
          <line x1="16" y1="16" x2="16" y2="16"></line>
        </svg>
      </motion.button>
    </div>
  );
};

export default AIBot;
