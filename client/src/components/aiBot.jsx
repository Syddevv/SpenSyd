import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/AIBot.css";

const key = import.meta.env?.VITE_GEMINI_KEY;

const AIBot = ({ expenses = [], incomes = [], currentBalance = 0 }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "Hi! I'm SpenSyd AI 🤖. Ask me about your finances!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // 👇 NEW: Define your ready-to-send questions
  const suggestions = [
    "💰 Balance check",
    "📉 Spending this month",
    "🏆 Highest expense",
    "📊 Income vs Expense",
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  const getFinancialContext = () => {
    // ... (Keep your existing getFinancialContext logic exactly as it was in the previous step)
    // For brevity, I am not repeating the calculation code here, but ensure it remains part of the file.
    // ...
    const safeExpenses = Array.isArray(expenses) ? expenses : [];
    const safeIncomes = Array.isArray(incomes) ? incomes : [];
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const thisMonthExpenses = safeExpenses.filter((e) => {
      const d = new Date(e.date);
      return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
    });

    const thisMonthIncomes = safeIncomes.filter((i) => {
      const d = new Date(i.date);
      return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
    });

    const totalExpenseThisMonth = thisMonthExpenses.reduce(
      (acc, curr) => acc + (curr.amount || 0),
      0
    );
    const totalIncomeThisMonth = thisMonthIncomes.reduce(
      (acc, curr) => acc + (curr.amount || 0),
      0
    );

    const highestExpense = safeExpenses.reduce(
      (max, curr) => (curr.amount > (max?.amount || 0) ? curr : max),
      null
    );

    const categoryTotals = safeExpenses.reduce((acc, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
      return acc;
    }, {});

    const sortedCategories = Object.entries(categoryTotals)
      .sort(([, a], [, b]) => b - a)
      .map(([cat, total]) => `${cat}: ₱${total}`)
      .join(", ");

    const recentExpenses = safeExpenses
      .slice(0, 10)
      .map((e) => `${e.category}: ₱${e.amount}`)
      .join("; ");

    return `
      Current Wallet Balance: ₱${currentBalance.toLocaleString()}
      This Month Income: ₱${totalIncomeThisMonth.toLocaleString()}
      This Month Expense: ₱${totalExpenseThisMonth.toLocaleString()}
      Highest Expense: ${
        highestExpense
          ? `${highestExpense.category} (₱${highestExpense.amount})`
          : "None"
      }
      Spending by Category: ${sortedCategories}
      Recent: ${recentExpenses}
    `;
  };

  // 👇 UPDATED: handleSend now accepts an optional 'text' argument
  const handleSend = async (textOverride = null) => {
    const textToSend = typeof textOverride === "string" ? textOverride : input;

    if (!textToSend.trim()) return;

    const userMessage = { role: "user", text: textToSend };
    setMessages((prev) => [...prev, userMessage]);
    setInput(""); // Clear input field
    setLoading(true);

    try {
      const context = getFinancialContext();
      const apiKey = key;

      if (!apiKey) throw new Error("API Key is missing.");

      const systemPrompt = `You are SpenSyd AI. User Data: ${context}. Be concise. Use ₱ symbol.`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: textToSend }] }], // Use textToSend here
            systemInstruction: { parts: [{ text: systemPrompt }] },
          }),
        }
      );

      if (!response.ok) throw new Error(`API Error: ${response.status}`);

      const data = await response.json();
      const botResponseText =
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "I couldn't understand that.";

      setMessages((prev) => [...prev, { role: "bot", text: botResponseText }]);
    } catch (error) {
      console.error("AI Bot Error:", error);
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "I'm having trouble connecting to the server." },
      ]);
    } finally {
      setLoading(false);
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

              {/* 👇 NEW: Render Suggestions only if specific condition met (e.g., not loading) */}
              {!loading && (
                <div className="suggestions-container">
                  {suggestions.map((question, idx) => (
                    <button
                      key={idx}
                      className="suggestion-chip"
                      onClick={() => handleSend(question)}
                    >
                      {question}
                    </button>
                  ))}
                </div>
              )}

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
                placeholder="Ask me anything..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
              />
              <button
                className="send-button"
                onClick={() => handleSend()}
                disabled={loading}
              >
                ➤
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
        {/* (Keep existing SVG icon) */}
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
