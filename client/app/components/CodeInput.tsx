"use client";
import { useState, useEffect } from "react";

interface CodeInputProps {
  placeholder?: string;
  onChange?: (code: string) => void;
  value?: string;
  detectedLanguage?: string;
  onFormat?: (
    language?: string,
    indentType?: string,
    indentSize?: number,
  ) => void;
  isLoading?: boolean;
}

export default function CodeInput({
  placeholder = "Paste your code here...",
  onChange,
  value: controlledValue,
  detectedLanguage,
  onFormat,
  isLoading = false,
}: CodeInputProps) {
  const [internalValue, setInternalValue] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [customLanguage, setCustomLanguage] = useState("");
  const [indentType, setIndentType] = useState("space");
  const [indentSize, setIndentSize] = useState(2);

  const languages = [
    "JavaScript",
    "TypeScript",
    "Python",
    "Java",
    "C++",
    "C#",
    "Go",
    "Rust",
    "PHP",
    "Ruby",
    "Swift",
    "Kotlin",
    "HTML",
    "CSS",
    "SQL",
  ];

  const value = controlledValue !== undefined ? controlledValue : internalValue;

  useEffect(() => {
    if (detectedLanguage) {
      const matchedLang = languages.find(
        (lang) => lang.toLowerCase() === detectedLanguage.toLowerCase(),
      );
      if (matchedLang) {
        setSelectedLanguage(matchedLang);
        setCustomLanguage("");
      } else {
        setSelectedLanguage("Other");
        setCustomLanguage(detectedLanguage);
      }
    }
  }, [detectedLanguage]);

  useEffect(() => {
    const lang =
      selectedLanguage === "Other" ? customLanguage : selectedLanguage;
    if (!lang) return;

    const normalizedLang = lang.toLowerCase();

    // 2-space languages
    const twoSpaceLangs = [
      "javascript",
      "typescript",
      "html",
      "css",
      "sql",
      "ruby",
      "json",
      "yaml",
    ];
    // 4-space languages
    const fourSpaceLangs = [
      "python",
      "java",
      "c++",
      "c",
      "c#",
      "rust",
      "php",
      "swift",
      "kotlin",
    ];
    // Tab languages
    const tabLangs = ["go"];

    if (twoSpaceLangs.includes(normalizedLang)) {
      setIndentType("space");
      setIndentSize(2);
    } else if (fourSpaceLangs.includes(normalizedLang)) {
      setIndentType("space");
      setIndentSize(4);
    } else if (tabLangs.includes(normalizedLang)) {
      setIndentType("tab");
    }
  }, [selectedLanguage, customLanguage]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    if (controlledValue === undefined) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
  };

  return (
    <div className="flex flex-col w-full h-full flex-1 min-h-0">
      <div className="flex items-center justify-between mb-2">
        <span className="flex items-baseline gap-1">
          <label className="font-source-code-pro text-sm text-neutral-400">
            Original
          </label>
          <h6 className="font-source-code-pro text-xs text-neutral-500">
            ({value.length} characters)
          </h6>
        </span>
        {detectedLanguage && (
          <h6 className="font-source-code-pro text-xs text-neutral-500">
            Detected:{" "}
            <span className="text-neutral-50">{detectedLanguage}</span>
          </h6>
        )}
      </div>
      <textarea
        autoFocus
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full flex-1 p-4 bg-neutral-900 border border-neutral-800 rounded-lg 
                   font-source-code-pro text-sm text-neutral-300 
                   placeholder:text-neutral-600
                   focus:outline-none focus:ring-2 focus:ring-neutral-700 focus:border-transparent
                   resize-none
                   transition-all duration-200
                   min-h-0
                   overflow-auto
                   custom-scrollbar"
        spellCheck={false}
        wrap="off"
      />
      <div className="mt-2 md:mt-4 flex flex-col gap-2 md:gap-4">
        <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
          <div className="flex-1">
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="w-full p-2.5 bg-neutral-900 border border-neutral-800 rounded-lg 
                       font-source-code-pro text-sm text-neutral-300 
                       focus:outline-none focus:ring-2 focus:ring-neutral-700
                       transition-all duration-200 cursor-pointer"
            >
              <option value="">Select Language (Optional)</option>
              {languages.map((lang, index) => (
                <option key={index} value={lang}>
                  {lang}
                </option>
              ))}
              <option value="Other">Other...</option>
            </select>
          </div>

          {selectedLanguage === "Other" && (
            <div className="flex-1">
              <input
                type="text"
                value={customLanguage}
                onChange={(e) => setCustomLanguage(e.target.value)}
                placeholder="Enter language name..."
                className="w-full p-2.5 bg-neutral-900 border border-neutral-800 rounded-lg 
                         font-source-code-pro text-sm text-neutral-300 
                         focus:outline-none focus:ring-2 focus:ring-neutral-700
                         transition-all duration-200"
              />
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
          <div className="flex-1 flex gap-2">
            <div className="flex-1">
              <select
                value={indentType}
                onChange={(e) => setIndentType(e.target.value)}
                className="w-full p-2.5 bg-neutral-900 border border-neutral-800 rounded-lg 
                         font-source-code-pro text-sm text-neutral-300 
                         focus:outline-none focus:ring-2 focus:ring-neutral-700
                         transition-all duration-200 cursor-pointer"
              >
                <option value="space">Spaces</option>
                <option value="tab">Tabs</option>
              </select>
            </div>

            {indentType && (
              <div className="w-24">
                <select
                  value={indentSize}
                  onChange={(e) => setIndentSize(Number(e.target.value))}
                  className="w-full p-2.5 bg-neutral-900 border border-neutral-800 rounded-lg 
                           font-source-code-pro text-sm text-neutral-300 
                           focus:outline-none focus:ring-2 focus:ring-neutral-700
                           transition-all duration-200 cursor-pointer text-center"
                >
                  <option value={2}>2</option>
                  <option value={4}>4</option>
                  <option value={8}>8</option>
                </select>
              </div>
            )}
          </div>
          <button
            onClick={() => {
              const finalLanguage =
                selectedLanguage === "Other"
                  ? customLanguage
                  : selectedLanguage;
              onFormat?.(finalLanguage, indentType, indentSize);
            }}
            disabled={isLoading}
            className="flex-1 sm:block w-full sm:w-auto self-end px-8 py-2.5 bg-neutral-100 hover:bg-white text-black font-semibold rounded-lg 
                    font-source-code-pro text-sm transition-all duration-200
                    disabled:opacity-50 disabled:cursor-not-allowed
                    flex items-center justify-center min-w-[120px]"
          >
            {isLoading ? (
              // <div className="h-5 w-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
              <div className="dot-loader"></div>
            ) : (
              "Format Code"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
