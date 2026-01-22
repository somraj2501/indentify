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

  return (
    <main className="flex-1 flex flex-col lg:flex-row justify-center items-center gap-8 py-8 md:py-4 px-8">
      <div className="w-full max-w-4xl h-full">
        <CodeInput
          value={originalCode}
          onChange={setOriginalCode}
          onFormat={handleFormat}
          isLoading={isLoading}
          error={error}
        />
      </div>
      <div className="w-full max-w-4xl h-full">
        <FormattedOutput value={formattedCode} />
      </div>
    </main>
  );
}