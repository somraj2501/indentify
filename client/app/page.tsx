"use client";

import { useState } from "react";
import CodeInput from "./components/CodeInput";
import FormattedOutput from "./components/FormattedOutput";
import { formatCode } from "./services/formatService";

export default function Home() {
  const [originalCode, setOriginalCode] = useState("");
  const [formattedCode, setFormattedCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFormat = async () => {
    if (!originalCode.trim()) {
      setError("Please enter some code to format");
      return;
    }

    setIsLoading(true);
    setError(null);

    const result = await formatCode(originalCode);

    if (result.success) {
      setFormattedCode(result.formattedCode);
    } else {
      setError(result.error || "Failed to format code");
    }

    setIsLoading(false);
  };

  const handleSave = () => {
    setOriginalCode(formattedCode);
    setFormattedCode("");
  };

  const codeBoxStyles = "w-full h-full md:max-w-[80%]";

  return (
    <main className="flex flex-col flex-1 lg:flex-row justify-center items-center gap-8">
      <div className={codeBoxStyles}>
        <CodeInput
          value={originalCode}
          onChange={setOriginalCode}
          onFormat={handleFormat}
          isLoading={isLoading}
          error={error}
        />
      </div>
      {formattedCode && (
        <div className={codeBoxStyles}>
          <FormattedOutput value={formattedCode} onSave={handleSave} />
        </div>
      )}
    </main>
  );
}