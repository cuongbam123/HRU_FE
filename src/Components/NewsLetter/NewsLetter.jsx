import React from "react";
import "./NewsLetter.css";

const NewsLetter = () => {
  return (
    <div className="newsletter">
      <div className="newsletter-content">
        <h1>Get the Beautiful Deals in Your Inbox</h1>
        <p>
          Subscribe to our newsletter for updates on new gadgets, exclusive
          offers, and more!
        </p>
        <div>
          <input type="email" placeholder="Your Email Address" />
          <button>Subscribe</button>
        </div>
      </div>
    </div>
  );
};

export default NewsLetter;
