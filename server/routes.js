const express = require("express");
const router = express.Router();
const model = require("./gemini");
const Snippet = require("./Snippet");


// POST route to format code
router.post("/format", async (req, res) => {
  try {
    const { code, language, indentType, indentSize } = req.body;

    const languagePrompt = language
      ? `The user claims the language is "${language}". You must verify this claim.
        - If correct, keep it.
        - If incorrect, override it with the true detected language.
        - Always return the true detected language.`
      : `Detect the programming language accurately.`;

    const indentPrompt =
      indentType === "tab"
        ? `Use TABS for indentation.`
        : `Use SPACES for indentation with an indent size of ${indentSize || 2}.`;

    const prompt = `
    You are a deterministic code formatter and language detector.

    TASKS:
    1. Detect the programming language of the provided code.
    2. Verify the user-provided language if present and correct it if wrong.
    3. Format the code using standard, idiomatic formatting conventions of the detected language:
      - ${indentPrompt}
      - Fix spacing
      - Preserve logic exactly
      - Do NOT add, remove, or modify functionality
    4. Do NOT explain anything.
    5. You don't need to CORRECT the code. Only format or indent.

    ${languagePrompt}

    STRICT OUTPUT REQUIREMENTS:
    - Return ONLY valid JSON.
    - NO markdown.
    - NO code fences.
    - NO comments.
    - NO extra text.
    - Output must be parseable with JSON.parse().
    - Escape all special characters properly.

    OUTPUT SCHEMA (exact keys only):
    {
      "language": string,
      "detectedLanguage": string,
      "formatted": string
    }

    RULES:
    - language = final correct language (verified or detected)
    - detectedLanguage = same as language
    - formatted = properly formatted code
    - Preserve all characters except whitespace formatting

    INPUT CODE:
    ${code}
    `;
    const result = await model.generateContent(prompt);
    const text = result.response.text();

    console.log("Gemini response:", text);

    if (!text || text.trim() === '') {
      throw new Error('Empty response from Gemini API');
    }

    // Remove markdown code blocks if present
    let cleanedText = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

    const parsed = JSON.parse(cleanedText);

    if (!parsed.language || !parsed.formatted) {
      throw new Error('Invalid response format from Gemini API');
    }

    // const saved = await Snippet.create({
    //   originalCode: code,
    //   formattedCode: parsed.formatted,
    //   detectedLanguage: parsed.language
    // });

    res.json(parsed);

  } catch (err) {
    console.error("Error details:", err);
    res.status(500).json({ error: err.message });
  }
});

// POST route to save formatted code as snippet
router.post("/saveSnippet", async (req, res) => {
  try {
    const { formattedCode, detectedLanguage } = req.body;
    const saved = await Snippet.create({
      formattedCode: formattedCode,
      detectedLanguage: detectedLanguage
    });
    res.json(saved);
  } catch (err) {
    console.error("Error saving snippet:", err);
    res.status(500).json({ error: err.message });
  }
});

// GET route to retrieve all snippets
router.get("/getAllSnippets", async (req, res) => {
  try {
    const snippets = await Snippet.find().sort({ createdAt: -1 }).limit(50);
    res.json({
      count: snippets.length,
      snippets: snippets
    });
  } catch (err) {
    console.error("Error fetching snippets:", err);
    res.status(500).json({ error: err.message });
  }
});

// route to clear all entries
router.delete("/clearAllSnippets", async (req, res) => {
  try {
    await Snippet.deleteMany({});
    res.json({ message: "All snippets deleted successfully" });
  } catch (err) {
    console.error("Error deleting snippets:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
