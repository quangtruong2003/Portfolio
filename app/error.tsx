"use client";

import Link from "next/link";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const isDev = process.env.NODE_ENV === "development";

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "var(--font-inter, system-ui, sans-serif)",
        backgroundColor: "var(--parchment, #f5f4ed)",
        color: "var(--near-black, #141413)",
      }}
    >
      <div
        style={{
          textAlign: "center",
          maxWidth: "480px",
          padding: "2rem",
        }}
      >
        <div
          style={{
            width: "64px",
            height: "64px",
            borderRadius: "50%",
            backgroundColor: "rgba(201, 100, 66, 0.1)",
            border: "1px solid rgba(201, 100, 66, 0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 1.5rem",
          }}
          aria-hidden="true"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#c96442" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>

        <h1
          style={{
            fontSize: "clamp(1.25rem, 3vw, 1.75rem)",
            fontWeight: 600,
            marginBottom: "0.75rem",
            fontFamily: "var(--font-playfair, Georgia, serif)",
            color: "var(--near-black, #141413)",
          }}
        >
          Something went wrong
        </h1>
        <p
          style={{
            color: "var(--stone-gray, #87867f)",
            marginBottom: "1.5rem",
            lineHeight: 1.6,
            fontSize: "0.9375rem",
          }}
        >
          An unexpected error occurred. If this keeps happening, please refresh the page.
        </p>

        <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
          <button
            onClick={reset}
            style={{
              padding: "0.75rem 1.5rem",
              backgroundColor: "#c96442",
              color: "#faf9f5",
              borderRadius: "12px",
              border: "none",
              cursor: "pointer",
              fontSize: "0.9375rem",
              fontWeight: 500,
              transition: "background-color 0.2s",
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#d97757")}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#c96442")}
          >
            Try again
          </button>
          <Link
            href="/"
            style={{
              padding: "0.75rem 1.5rem",
              backgroundColor: "transparent",
              color: "#4d4c48",
              borderRadius: "12px",
              border: "1px solid #e8e6dc",
              fontSize: "0.9375rem",
              fontWeight: 500,
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
            }}
          >
            Go home
          </Link>
        </div>

        {isDev && error?.message && (
          <details
            style={{
              marginTop: "2rem",
              padding: "1rem",
              backgroundColor: "rgba(181, 51, 51, 0.05)",
              border: "1px solid rgba(181, 51, 51, 0.15)",
              borderRadius: "12px",
              textAlign: "left",
              fontSize: "0.8125rem",
            }}
          >
            <summary
              style={{
                cursor: "pointer",
                fontWeight: 500,
                color: "#b53333",
                marginBottom: "0.5rem",
                fontFamily: "var(--font-jetbrains, monospace)",
              }}
            >
              Error details
            </summary>
            <pre
              style={{
                overflow: "auto",
                color: "#b53333",
                fontFamily: "var(--font-jetbrains, monospace)",
                fontSize: "0.75rem",
                lineHeight: 1.5,
                margin: 0,
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
              }}
            >
              {error.message}
              {error.digest && `\n\nDigest: ${error.digest}`}
            </pre>
          </details>
        )}
      </div>
    </div>
  );
}
