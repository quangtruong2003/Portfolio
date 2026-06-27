"use client";

import { useEffect, useState } from "react";

export default function IntroPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    // Trigger initial animations
    const timer1 = setTimeout(() => setIsVisible(true), 100);
    // Show button after text animations complete
    const timer2 = setTimeout(() => setShowButton(true), 2000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div className="intro-wrapper">
      <div className={`frame intro appear ${isVisible ? "visible" : ""}`}>
        <div className="flex content-wrapper">
          {/* Main tagline */}
          <div className="tagline-container">
            <span className="tagline-line">SOFTWARE ENGINEER</span>
          </div>

          {/* Main heading */}
          <div className="heading-container">
            <h1 className="main-heading">
              <span className="heading-line">NGUYEN QUANG</span>
              <span className="heading-line">TRUONG</span>
            </h1>
          </div>

          {/* Subtitle */}
          <div className="subtitle-container">
            <p className="subtitle">LARAVEL • AI AUTOMATION • N8N</p>
          </div>

          {/* CTA Button */}
          <button
            id="try-me"
            className={`cta-button ${showButton ? "visible" : ""}`}
            onClick={() => {
              window.location.href = "/portfolio";
            }}
            type="button"
          >
            START ANIMATING
          </button>
        </div>
      </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .intro-wrapper {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: #0a0a0b;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .frame.intro {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transform: scale(0.95);
          transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }

        .frame.intro.visible {
          opacity: 1;
          transform: scale(1);
        }

        .content-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2rem;
          text-align: center;
          padding: 2rem;
        }

        .tagline-container {
          overflow: hidden;
        }

        .tagline-line {
          display: block;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          font-size: clamp(0.75rem, 1.5vw, 1rem);
          font-weight: 500;
          letter-spacing: 0.4em;
          color: #c96442;
          text-transform: uppercase;
          opacity: 0;
          transform: translateY(30px);
          animation: slideUp 0.6s cubic-bezier(0.250, 0.460, 0.450, 0.940) 0.3s forwards;
        }

        .heading-container {
          overflow: hidden;
        }

        .main-heading {
          display: flex;
          flex-direction: column;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          font-size: clamp(2.5rem, 8vw, 6rem);
          font-weight: 800;
          line-height: 1;
          color: #ffffff;
          letter-spacing: -0.02em;
        }

        .heading-line {
          display: block;
          opacity: 0;
          transform: translateY(40px);
        }

        .heading-line:first-child {
          animation: slideUp 0.7s cubic-bezier(0.250, 0.460, 0.450, 0.940) 0.5s forwards;
        }

        .heading-line:last-child {
          animation: slideUp 0.7s cubic-bezier(0.250, 0.460, 0.450, 0.940) 0.7s forwards;
          color: #c96442;
        }

        .subtitle-container {
          overflow: hidden;
        }

        .subtitle {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          font-size: clamp(0.875rem, 1.5vw, 1.125rem);
          font-weight: 400;
          letter-spacing: 0.25em;
          color: #666666;
          opacity: 0;
          transform: translateY(20px);
          animation: slideUp 0.6s cubic-bezier(0.250, 0.460, 0.450, 0.940) 1.2s forwards;
        }

        .cta-button {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 180px;
          height: 56px;
          margin-top: 1rem;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          font-size: 0.875rem;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-decoration: none;
          color: #ffffff;
          background: #c96442;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          opacity: 0;
          transform: scale(0.8);
          transition: transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease;
          animation: scaleInCenter 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) 2s forwards;
        }

        .cta-button.visible {
          opacity: 1;
        }

        .cta-button:hover {
          background: #d97757;
          transform: scale(1.05);
          box-shadow: 0 8px 30px rgba(201, 100, 66, 0.4);
        }

        .cta-button:active {
          transform: scale(0.98);
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scaleInCenter {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .content-wrapper {
            gap: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}
