"use client";

import { useState } from "react";

interface CodeInputProps {
    placeholder?: string;
    onChange?: (code: string) => void;
    value?: string;
    onFormat?: () => void;
    isLoading?: boolean;
    error?: string | null;
}

export default function CodeInput({
    placeholder = "Paste your code here...",
    onChange,
    value: controlledValue,
    onFormat,
    isLoading = false,
    error,
}: CodeInputProps) {
    const [internalValue, setInternalValue] = useState("");

    const value = controlledValue !== undefined ? controlledValue : internalValue;

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newValue = e.target.value;
        if (controlledValue === undefined) {
            setInternalValue(newValue);
        }
        onChange?.(newValue);
    };

    return (
        <div className="flex flex-col w-full h-full">
            <div className="flex items-center justify-between mb-2">
                <label className="font-source-code-pro text-sm text-neutral-400">
                    Original
                </label>
                <span className="font-source-code-pro text-xs text-neutral-500">
                    {value.length} characters
                </span>
            </div>
            <textarea
                value={value}
                onChange={handleChange}
                placeholder={placeholder}
                className="w-full h-full p-4 bg-neutral-900 border border-neutral-800 rounded-lg 
                   font-source-code-pro text-sm text-neutral-300 
                   placeholder:text-neutral-600
                   focus:outline-none focus:ring-2 focus:ring-neutral-700 focus:border-transparent
                   resize-none
                   transition-all duration-200"
                spellCheck={false}
            />
            {error && (
                <p className="mt-2 text-sm text-red-400 font-source-code-pro">
                    {error}
                </p>
            )}
            <button
                onClick={onFormat}
                disabled={isLoading}
                className="mt-4 px-4 py-2 bg-neutral-800 hover:bg-neutral-700 rounded-lg 
                   font-source-code-pro text-sm text-neutral-300 
                   focus:outline-none focus:ring-2 focus:ring-neutral-700 focus:border-transparent
                   transition-all duration-200
                   disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isLoading ? "Formatting..." : "Format"}
            </button>
        </div>
    );
}
