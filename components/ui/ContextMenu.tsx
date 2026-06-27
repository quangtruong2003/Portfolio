"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Mail, ExternalLink, Copy, Check } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/Icons";

interface ContextMenuItem {
  icon: React.ReactNode;
  label: string;
  action: () => void;
  shortcut?: string;
}

interface ContextMenuProps {
  x: number;
  y: number;
  onClose: () => void;
}

export default function ContextMenu({ x, y, onClose }: ContextMenuProps) {
  const [copied, setCopied] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    onClose();
  }, [onClose]);

  const menuItems: ContextMenuItem[] = [
    {
      icon: copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />,
      label: copied ? "Copied!" : "Copy URL",
      action: copyToClipboard,
      shortcut: "⌘C",
    },
    {
      icon: <ExternalLink size={14} />,
      label: "Open in new tab",
      action: () => {
        window.open(window.location.href, "_blank");
        onClose();
      },
      shortcut: "⌘⇧N",
    },
    {
      icon: <Mail size={14} />,
      label: "Contact via Email",
      action: () => {
        window.location.href = "mailto:nguyentruongk530042003@gmail.com";
        onClose();
      },
    },
    {
      icon: <GitHubIcon size={14} />,
      label: "View on GitHub",
      action: () => {
        window.open("https://github.com/quangtruong2003", "_blank");
        onClose();
      },
    },
    {
      icon: <LinkedInIcon size={14} />,
      label: "View on LinkedIn",
      action: () => {
        window.open("https://www.linkedin.com/in/quangtruong2003", "_blank");
        onClose();
      },
    },
  ];

  const adjustedX = Math.min(x, window.innerWidth - 220);
  const adjustedY = Math.min(y, window.innerHeight - 250);

  return (
    <div
      ref={menuRef}
      className="fixed z-9999 animate-in fade-in zoom-in-95 duration-150"
      style={{
        left: adjustedX,
        top: adjustedY,
      }}
    >
      <div
        className="
          bg-dark-surface/95 backdrop-blur-xl
          border border-[#3d3d3a]/50
          rounded-[14px] p-1.5
          shadow-2xl shadow-black/50
          min-w-[200px]
        "
      >
        {menuItems.map((item, index) => (
          <button
            key={item.label}
            onClick={item.action}
            className="
              w-full flex items-center gap-3 px-3 py-2.5 rounded-[10px]
              text-left group
              hover:bg-[#3d3d3a]/30
              transition-colors duration-150
            "
          >
            <span className="text-stone-gray group-hover:text-ivory transition-colors">
              {item.icon}
            </span>
            <span className="font-sans text-sm text-warm-silver group-hover:text-ivory flex-1">
              {item.label}
            </span>
            {item.shortcut && (
              <span className="font-sans text-[10px] text-stone-gray/60">
                {item.shortcut}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
