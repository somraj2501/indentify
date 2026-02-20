"use client";
import { CopyIcon, CopyCheckIcon } from "lucide-react";
import { useState } from "react";

interface FormattedOutputProps {
  value?: string;
  onSave?: () => void;
  onCopy?: () => void;
  isSaving?: boolean;
}

export default function FormattedOutput({
  value = "",
  onSave,
  onCopy,
  isSaving = false,
}: FormattedOutputProps) {
  const [copied, setCopied] = useState(false);
  const copyCode = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    onCopy?.();
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
            <h6
              className={`gap-2 font-source-code-pro text-xs text-neutral-50 transition-all duration-300 absolute ${
                copied
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-4 pointer-events-none"
              }`}
            >
              Copied{" "}
              <CopyCheckIcon
                size={16}
                className="inline-block text-green-400"
              />
            </h6>
            <h6
              className={`gap-2 font-source-code-pro text-xs text-neutral-500 transition-all duration-300 ${
                copied
                  ? "opacity-0 scale-75 pointer-events-none"
                  : "opacity-100 scale-100"
              }`}
            >
              Copy to Clipboard{" "}
              <CopyIcon
                size={16}
                className="inline-block text-neutral-500 hover:text-neutral-50 transition-colors"
              />
            </h6>
          </button>
        </span>
      </div>
      <div
        className="w-full flex-1 p-4 bg-neutral-900 border border-neutral-800 rounded-lg 
                   font-source-code-pro text-sm text-neutral-300 
                   overflow-auto whitespace-pre
                   transition-all duration-200
                   min-h-0
                   custom-scrollbar"
      >
        {value || (
          <span className="text-neutral-600">
            Formatted code will appear here...
          </span>
        )}
      </div>
      <button
        onClick={onSave}
        disabled={isSaving}
        className="mt-2 md:mt-4 px-4 py-2 bg-neutral-800 hover:bg-neutral-700 rounded-lg 
                   font-source-code-pro text-sm text-neutral-300 
                   focus:outline-none focus:ring-2 focus:ring-neutral-700 focus:border-transparent
                   transition-all duration-200
                   disabled:opacity-50 disabled:cursor-not-allowed
                   flex items-center justify-center min-h-[40px]"
      >
        {isSaving ? <div className="dot-loader"></div> : "Save"}
      </button>
    </div>
  );
}
