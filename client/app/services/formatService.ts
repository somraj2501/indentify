const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export interface FormatRequest {
  code: string;
  language?: string;
  indentType?: string;
  indentSize?: number;
}

export interface FormatResponse {
  formattedCode: string;
  detectedLanguage: string;
  success: boolean;
  error?: string;
}

export async function formatCode(
  code: string,
  language?: string,
  indentType?: string,
  indentSize?: number
): Promise<FormatResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/format`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code: code,
        language: language,
        indentType: indentType,
        indentSize: indentSize,
      }),
    });
    debugger;
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return {
      formattedCode: data.formattedCode || data.formatted || code,
      detectedLanguage: data.detectedLanguage,
      success: true,
    };
  } catch (error) {
    console.error("Error formatting code:", error);
    return {
      formattedCode: "",
      detectedLanguage: "",
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}

export async function saveSnippet(code: string): Promise<FormatResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/saveSnippet`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code: code,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return {
      formattedCode: data.formattedCode || data.formatted || code,
      detectedLanguage: data.detectedLanguage,
      success: true,
    };
  } catch (error) {
    console.error("Error formatting code:", error);
    return {
      formattedCode: "",
      detectedLanguage: "",
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}
