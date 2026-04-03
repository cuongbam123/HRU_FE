// FloatingChatButton.jsx
import React from "react";
import { BsChatDotsFill } from "react-icons/bs";
import "./AIChatBox.css"; // hoặc CSS bạn đang dùng

function FloatingChatButton({ onClick }) {
    return (
        <button className="chatbot-button" onClick={onClick}>
            <BsChatDotsFill size={24} color="white" />
        </button>
    );
}

export default FloatingChatButton;
