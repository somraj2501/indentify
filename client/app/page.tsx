"use client";

import { useState } from "react";
import CodeInput from "./components/CodeInput";
import FormattedOutput from "./components/FormattedOutput";
import { formatCode, saveSnippet } from "./services/formatService";
import Toast from "./components/toast";

export default function Home() {
  const [originalCode, setOriginalCode] = useState("");
  const [formattedCode, setFormattedCode] = useState("");
  const [detectedLanguage, setDetectedLanguage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<{
    message: string;
    type: "error" | "success" | "warning" | "info";
  } | null>(null);

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
      setToast({ message: "Code formatted successfully!", type: "success" });
    } else {
      setToast({
        message: result.error || "Failed to format code",
        type: "error",
      });
    }

    setIsLoading(false);
  };

  const handleSave = async () => {
    setIsSaving(true);
    const result = await saveSnippet(formattedCode);
    setIsSaving(false);

    if (result.success) {
      setToast({ message: "Snippet saved successfully!", type: "success" });
      setFormattedCode("");
      setOriginalCode("");
      setDetectedLanguage("");
    } else {
      setToast({
        message: result.error || "Failed to save snippet",
        type: "error",
      });
    }
  };

  const codeBoxStyles = "w-full flex-1 h-full min-w-0";

  return (
    <div className="flex flex-col flex-1 lg:flex-row justify-center items-stretch gap-4 md:gap-8 w-full h-full min-h-0">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      <div
        className={`${codeBoxStyles} min-h-0 ${formattedCode ? "lg:w-1/2" : "w-full"}`}
      >
        <CodeInput
          value={originalCode}
          detectedLanguage={detectedLanguage}
          onChange={setOriginalCode}
          onFormat={handleFormat}
          isLoading={isLoading}
        />
      </div>
      {formattedCode && (
        <div className={`${codeBoxStyles} min-h-0 lg:w-1/2`}>
          <FormattedOutput
            value={formattedCode}
            onSave={handleSave}
            onCopy={() =>
              setToast({ message: "Copied to clipboard!", type: "info" })
            }
            isSaving={isSaving}
          />
        </div>
      )}
    </div>
  );
}
