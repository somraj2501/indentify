const express = require("express");
const router = express.Router();
const model = require("./gemini");
const Snippet = require("./Snippet");


// POST route to format code
router.post("/format", async (req, res) => {
  try {
    const { code } = req.body;
    console.log("code", code);
    const prompt = `You are a code formatter. Analyze the following code, detect its programming language, and format it properly.

      Return ONLY a valid JSON object with this exact structure (no markdown, no code blocks, just raw JSON):
      {
        "language": "the detected programming language",
        "formatted": "the formatted code"
      }

      Here is the stringified code, parse it, analyze it and format it properly:
      ${code}`;
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
