import React, { useEffect, useRef, useState } from "react";
import { Send, X, Smile, Sparkles } from "lucide-react";

// FIX: Kiểm tra process trước khi truy cập để tránh lỗi ReferenceError trên trình duyệt
const getApiBase = () => {
  try {
    if (typeof process !== "undefined" && process.env && process.env.REACT_APP_API_URL) {
      return process.env.REACT_APP_API_URL;
    }
  } catch (e) {
    // Ignore error
  }
  return "http://localhost:3001";
};

const API_BASE = getApiBase();

// Danh sách emoji đơn giản thay thế cho thư viện nặng
const COMMON_EMOJIS = ["😊", "😂", "🥰", "😍", "👍", "👋", "🎉", "🔥", "💄", "🧴", "💅", "🌸", "✨", "🤔", "😭"];

const getSessionId = () => {
  const key = "ai_chat_session_id";
  try {
    let sid = localStorage.getItem(key);
    if (!sid) {
      sid = `sid_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem(key, sid);
    }
    return sid;
  } catch (e) {
    return `sid_${Date.now()}`;
  }
};

// Component hiển thị thẻ sản phẩm nhỏ trong chat
const ProductCard = ({ product }) => (
  <div 
    className="chat-product-card" 
    onClick={() => window.open(`/product/${product._id}`, '_blank')}
  >
    <div className="chat-product-img-wrapper">
      <img 
        src={product.image || "https://placehold.co/100x100?text=No+Image"} 
        alt={product.name} 
        className="chat-product-img"
        onError={(e) => e.target.src = "https://placehold.co/100x100?text=Error"}
      />
    </div>
    <div className="chat-product-info">
      <div className="chat-product-name" title={product.name}>{product.name}</div>
      <div className="chat-product-price">
        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}
      </div>
    </div>
  </div>
);

const AIChatBox = ({ onClose }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { type: "bot", content: "Xin chào 👋! Mình là trợ lý AI Hru Cosmetics. Mình có thể giúp bạn tìm mỹ phẩm phù hợp hoặc so sánh giá cả. Bạn cần gì nè?" }
  ]);
  const [loading, setLoading] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);

  const chatRef = useRef(null);
  const sessionIdRef = useRef(getSessionId());

  // Auto scroll khi có tin nhắn mới
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleSend = async () => {
    const clean = message.trim();
    if (!clean || loading) return;

    // 1. Hiển thị tin nhắn User
    setMessages((prev) => [...prev, { type: "user", content: clean }]);
    setMessage("");
    setShowEmoji(false);
    setLoading(true);

    try {
      const clientMsgId = `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      // 2. Gọi API
      const res = await fetch(`${API_BASE}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: clean,
          sessionId: sessionIdRef.current,
          clientMsgId,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || data.reply || "Lỗi kết nối server");
      }

      // 3. Hiển thị phản hồi từ Bot
      setMessages((prev) => [
        ...prev, 
        { 
          type: "bot", 
          // FIX: Kiểm tra cả data.message VÀ data.reply để lấy nội dung
          content: data.message || data.reply || "Xin lỗi, hiện tại mình không thể trả lời câu hỏi này.",
          products: data.products || [] 
        }
      ]);

    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [...prev, { type: "bot", content: "❌ Xin lỗi, mình đang gặp chút sự cố. Bạn thử lại sau nhé!" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chatbot-container">
      <style>{`
        .chatbot-container {
          position: fixed;
          bottom: 20px;
          right: 20px;
          width: 380px;
          height: 600px;
          max-height: 80vh;
          background: #ffffff;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.15);
          display: flex;
          flex-direction: column;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          z-index: 9999;
          overflow: hidden;
          border: 1px solid #e0e0e0;
        }

        .chatbot-header {
          background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%);
          padding: 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          color: #fff;
          font-weight: 600;
        }

        .chatbot-header-title {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 1.1rem;
          color: #333;
        }

        .chatbot-close-btn {
          background: none;
          border: none;
          color: #333;
          cursor: pointer;
          padding: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          transition: background 0.2s;
        }

        .chatbot-close-btn:hover {
          background: rgba(255,255,255,0.3);
        }

        .chatbot-body {
          flex: 1;
          padding: 16px;
          overflow-y: auto;
          background: #f8f9fa;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .chatbot-msg-wrapper {
          display: flex;
          flex-direction: column;
          gap: 8px;
          max-width: 85%;
        }

        .chatbot-msg-wrapper.user {
          align-self: flex-end;
          align-items: flex-end;
        }

        .chatbot-msg-wrapper.bot {
          align-self: flex-start;
          align-items: flex-start;
        }

        .chatbot-msg {
          padding: 12px 16px;
          border-radius: 16px;
          font-size: 0.95rem;
          line-height: 1.5;
          word-wrap: break-word;
          position: relative;
        }

        .chatbot-msg.user {
          background: #ff9a9e;
          color: white;
          border-bottom-right-radius: 4px;
        }

        .chatbot-msg.bot {
          background: #ffffff;
          color: #333;
          border: 1px solid #e0e0e0;
          border-bottom-left-radius: 4px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        }

        .chatbot-products-grid {
          display: flex;
          gap: 10px;
          overflow-x: auto;
          padding-bottom: 8px;
          width: 100%;
          scrollbar-width: thin;
        }

        .chatbot-products-grid::-webkit-scrollbar {
          height: 6px;
        }

        .chatbot-products-grid::-webkit-scrollbar-thumb {
          background: #ccc;
          border-radius: 3px;
        }

        .chat-product-card {
          min-width: 140px;
          max-width: 140px;
          background: white;
          border-radius: 8px;
          border: 1px solid #eee;
          overflow: hidden;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .chat-product-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }

        .chat-product-img-wrapper {
          width: 100%;
          height: 100px;
          background: #f5f5f5;
        }

        .chat-product-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .chat-product-info {
          padding: 8px;
        }

        .chat-product-name {
          font-size: 0.8rem;
          font-weight: 600;
          color: #333;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          margin-bottom: 4px;
        }

        .chat-product-price {
          font-size: 0.8rem;
          color: #ff4757;
          font-weight: bold;
        }

        .chatbot-loading-dots span {
          animation: blink 1.4s infinite both;
          font-size: 1.5rem;
          line-height: 1rem;
          margin: 0 2px;
        }
        
        .chatbot-loading-dots span:nth-child(2) { animation-delay: 0.2s; }
        .chatbot-loading-dots span:nth-child(3) { animation-delay: 0.4s; }

        @keyframes blink {
          0% { opacity: 0.2; }
          20% { opacity: 1; }
          100% { opacity: 0.2; }
        }

        .chatbot-footer {
          padding: 12px;
          background: white;
          border-top: 1px solid #eee;
          position: relative;
        }

        .chatbot-input-row {
          display: flex;
          gap: 8px;
          align-items: center;
        }

        .chatbot-input-wrapper {
          flex: 1;
          position: relative;
          display: flex;
          align-items: center;
          background: #f0f2f5;
          border-radius: 20px;
          padding: 0 12px;
          border: 1px solid transparent;
          transition: border-color 0.2s;
        }

        .chatbot-input-wrapper:focus-within {
          border-color: #ff9a9e;
          background: #fff;
        }

        .chatbot-input-wrapper textarea {
          flex: 1;
          border: none;
          background: transparent;
          padding: 12px 0;
          resize: none;
          height: 44px;
          font-family: inherit;
          font-size: 0.95rem;
          outline: none;
        }

        .chatbot-emoji-btn {
          background: none;
          border: none;
          cursor: pointer;
          font-size: 1.2rem;
          color: #666;
          padding: 4px;
          display: flex;
          align-items: center;
          transition: color 0.2s;
        }

        .chatbot-emoji-btn:hover {
          color: #ff9a9e;
        }

        .chatbot-send-btn {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #ff9a9e;
          border: none;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.2s;
        }

        .chatbot-send-btn:hover:not(:disabled) {
          background: #ff758c;
        }

        .chatbot-send-btn:disabled {
          background: #ccc;
          cursor: not-allowed;
        }

        .chatbot-emoji-picker {
          position: absolute;
          bottom: 70px;
          right: 10px;
          background: white;
          border: 1px solid #eee;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          padding: 10px;
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 8px;
          z-index: 1000;
        }

        .emoji-item {
          font-size: 1.5rem;
          cursor: pointer;
          background: none;
          border: none;
          padding: 4px;
          border-radius: 4px;
          transition: background 0.2s;
        }

        .emoji-item:hover {
          background: #f0f0f0;
        }
      `}</style>

      {/* Header */}
      <div className="chatbot-header">
        <div className="chatbot-header-title">
          <Sparkles size={20} className="text-yellow-200" />
          <span>Trợ lý AI</span>
        </div>
        <button className="chatbot-close-btn" onClick={onClose}>
          <X size={20} />
        </button>
      </div>

      {/* Body */}
      <div className="chatbot-body" ref={chatRef}>
        {messages.map((msg, i) => (
          <div key={i} className={`chatbot-msg-wrapper ${msg.type}`}>
            
            {/* Nội dung tin nhắn text */}
            <div className={`chatbot-msg ${msg.type}`}>
              {/* FIX: Thêm (msg.content || "") để tránh lỗi split of undefined */}
              {(msg.content || "").split("\n").map((line, idx) => (
                <React.Fragment key={idx}>
                  {line}<br />
                </React.Fragment>
              ))}
            </div>

            {/* Hiển thị danh sách sản phẩm nếu có (chỉ cho bot) */}
            {msg.type === "bot" && msg.products && msg.products.length > 0 && (
              <div className="chatbot-products-grid">
                {msg.products.map((prod) => (
                  <ProductCard key={prod._id} product={prod} />
                ))}
              </div>
            )}
          </div>
        ))}
        
        {/* Loading Indicator */}
        {loading && (
          <div className="chatbot-msg-wrapper bot">
            <div className="chatbot-msg bot chatbot-loading-dots">
              <span>.</span><span>.</span><span>.</span>
            </div>
          </div>
        )}
      </div>

      {/* Footer / Input */}
      <div className="chatbot-footer">
        <div className="chatbot-input-row">
          <div className="chatbot-input-wrapper">
            <textarea
              placeholder="Nhập tin nhắn..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
            />
            <button 
              className="chatbot-emoji-btn" 
              onClick={() => setShowEmoji(!showEmoji)}
            >
              <Smile size={20} />
            </button>
          </div>

          <button 
            className="chatbot-send-btn" 
            onClick={handleSend} 
            disabled={loading || !message.trim()}
          >
            <Send size={18} />
          </button>
        </div>

        {/* Custom Emoji Picker (No external library) */}
        {showEmoji && (
          <div className="chatbot-emoji-picker">
            {COMMON_EMOJIS.map((emoji) => (
              <button 
                key={emoji} 
                className="emoji-item"
                onClick={() => setMessage(prev => prev + emoji)}
              >
                {emoji}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AIChatBox;