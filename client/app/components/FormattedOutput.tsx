"use client";
import { CopyIcon, CopyCheckIcon } from "lucide-react";
import { useState } from "react";

interface FormattedOutputProps {
  value?: string;
  onSave?: () => void;
}

export default function FormattedOutput({
  value = "",
  onSave,
}: FormattedOutputProps) {
  const [copied, setCopied] = useState(false);
  const copyCode = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };
  return (
    <div className="flex flex-col w-full h-full flex-1 min-h-0">
      <div className="flex items-center justify-between mb-2">
        <span className="flex items-baseline gap-1">
          <label className="font-source-code-pro text-sm text-neutral-400">
            Formatted
          </label>
          <h6 className="font-source-code-pro text-xs text-neutral-500">
            ({value.length} characters)
          </h6>
        </span>
        <span className="flex gap-2">
          <button
            onClick={copyCode}
            className="relative flex items-center justify-end min-w-[80px]"
          >
            <span
              className={`flex items-center gap-1.5 text-xs font-source-code-pro text-neutral-50 transition-all duration-300 absolute ${
                copied
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-4 pointer-events-none"
              }`}
            >
              <h6 className="font-source-code-pro text-xs text-neutral-500">
                Copied
              </h6>{" "}
              <CopyCheckIcon size={16} className="text-green-400" />
            </span>
            <span
              className={`transition-all duration-300 ${
                copied
                  ? "opacity-0 scale-75 pointer-events-none"
                  : "opacity-100 scale-100"
              }`}
            >
              <h6 className="font-source-code-pro text-xs text-neutral-500">
                Copy to Clipboard
              </h6>{" "}
              <CopyIcon
                size={16}
                className="text-neutral-500 hover:text-neutral-50 transition-colors"
              />
            </span>
          </button>
        </span>
      </div>
      <div
        className="w-full flex-1 p-4 bg-neutral-900 border border-neutral-800 rounded-lg 
                   font-source-code-pro text-sm text-neutral-300 
                   overflow-auto whitespace-pre
                   transition-all duration-200
                   min-h-0"
      >
        {value || (
          <span className="text-neutral-600">
            Formatted code will appear here...
          </span>
        )}
      </div>
      <button
        onClick={onSave}
        // disabled={isLoading}
        className="mt-4 px-4 py-2 bg-neutral-800 hover:bg-neutral-700 rounded-lg 
                   font-source-code-pro text-sm text-neutral-300 
                   focus:outline-none focus:ring-2 focus:ring-neutral-700 focus:border-transparent
                   transition-all duration-200
                   disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Save
      </button>
    </div>
  );
}
