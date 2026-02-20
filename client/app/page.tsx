"use client";

import { useState } from "react";
import CodeInput from "./components/CodeInput";
import FormattedOutput from "./components/FormattedOutput";
import { formatCode, saveSnippet } from "./services/formatService";

export default function Home() {
  const [originalCode, setOriginalCode] = useState("");
  const [formattedCode, setFormattedCode] = useState("");
  const [detectedLanguage, setDetectedLanguage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFormat = async (
    language?: string,
    indentType?: string,
    indentSize?: number,
  ) => {
    if (!originalCode.trim()) {
      setError("Please enter some code to format");
      return;
    }

    setIsLoading(true);
    setError(null);

    const result = await formatCode(
      originalCode,
      language,
      indentType,
      indentSize,
    );

    if (result.success) {
      setFormattedCode(result.formattedCode);
      setDetectedLanguage(result.detectedLanguage);
    } else {
      setError(result.error || "Failed to format code");
    }

    setIsLoading(false);
  };

  const handleSave = () => {
    saveSnippet(formattedCode);
    setFormattedCode("");
    setOriginalCode("");
  };

  const codeBoxStyles = "w-full flex-1 h-full";

  return (
    <div className="flex flex-col flex-1 lg:flex-row justify-center items-stretch gap-8 w-full h-full min-h-0">
      <div className={`${codeBoxStyles} min-h-0`}>
        <CodeInput
          value={originalCode}
          detectedLanguage={detectedLanguage}
          onChange={setOriginalCode}
          onFormat={handleFormat}
          isLoading={isLoading}
          error={error}
        />
      </div>
      {formattedCode && (
        <div className={`${codeBoxStyles} min-h-0`}>
          <FormattedOutput value={formattedCode} onSave={handleSave} />
        </div>
      )}
    </div>
  );
}
