import Groq from "groq-sdk";

// ═══════════════════════════════════════════════════
// Multi-AI Provider System
// Supports: Groq (Llama), Google Gemini, Anthropic Claude
// Falls back automatically if one provider fails
// ═══════════════════════════════════════════════════

const SYSTEM_PROMPT =
  "You are the AI mind of the Million Dollar Prompt — the world's largest collaborative AI experiment. " +
  "One million people each contributed a single word, and all their words have been combined into one massive prompt below. " +
  "Your job is to read all the words and generate a profound, poetic, and thought-provoking response. " +
  "Speak as if you are channeling the collective consciousness of humanity. " +
  "Be philosophical, creative, and awe-inspiring. Keep your response to 2-4 paragraphs.";

interface AIResult {
  response: string;
  tokens: number;
  model: string;
  provider: string;
}

// ─── Provider 1: Groq (free tier — Llama 3.1 70B) ───
async function generateWithGroq(prompt: string): Promise<AIResult> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) throw new Error("GROQ_API_KEY not set");

  const groq = new Groq({ apiKey });
  const model = "llama-3.1-70b-versatile";

  const completion = await groq.chat.completions.create({
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: prompt },
    ],
    model,
    temperature: 0.9,
    max_tokens: 1024,
  });

  return {
    response: completion.choices[0]?.message?.content || "",
    tokens: completion.usage?.total_tokens || 0,
    model,
    provider: "Groq",
  };
}

// ─── Provider 2: Google Gemini (free tier) ───
async function generateWithGemini(prompt: string): Promise<AIResult> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("GEMINI_API_KEY not set");

  const model = "gemini-1.5-flash";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [
        {
          parts: [{ text: `${SYSTEM_PROMPT}\n\n${prompt}` }],
        },
      ],
      generationConfig: {
        temperature: 0.9,
        maxOutputTokens: 1024,
      },
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Gemini API error: ${res.status} — ${errText}`);
  }

  const data = await res.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
  const tokens =
    (data.usageMetadata?.promptTokenCount || 0) +
    (data.usageMetadata?.candidatesTokenCount || 0);

  return { response: text, tokens, model, provider: "Google Gemini" };
}

// ─── Provider 3: Anthropic Claude (if API key available) ───
async function generateWithClaude(prompt: string): Promise<AIResult> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error("ANTHROPIC_API_KEY not set");

  const model = "claude-sonnet-4-5-20250929";

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model,
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: prompt }],
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Claude API error: ${res.status} — ${errText}`);
  }

  const data = await res.json();
  const text = data.content?.[0]?.text || "";
  const tokens =
    (data.usage?.input_tokens || 0) + (data.usage?.output_tokens || 0);

  return { response: text, tokens, model, provider: "Anthropic Claude" };
}

// ═══════════════════════════════════════════════════
// Main export: tries each provider in order, falls back on failure
// ═══════════════════════════════════════════════════

const providers = [
  { name: "Groq", fn: generateWithGroq },
  { name: "Gemini", fn: generateWithGemini },
  { name: "Claude", fn: generateWithClaude },
];

export async function generateAIResponse(words: string[]): Promise<AIResult> {
  const promptText = `The collective prompt from ${words.length.toLocaleString()} human contributors:\n\n${words.join(" ")}`;

  const errors: string[] = [];

  for (const provider of providers) {
    try {
      console.log(`[AI] Trying provider: ${provider.name}`);
      const result = await provider.fn(promptText);
      if (result.response) {
        console.log(`[AI] Success with ${provider.name}`);
        return result;
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.warn(`[AI] ${provider.name} failed: ${msg}`);
      errors.push(`${provider.name}: ${msg}`);
    }
  }

  throw new Error(`All AI providers failed:\n${errors.join("\n")}`);
}
