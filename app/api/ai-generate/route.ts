import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";
import { generateAIResponse } from "@/lib/ai";

// GET /api/ai-generate — Fetch latest AI generation
export async function GET() {
  try {
    const supabase = createServerClient();

    const { data: generation, error } = await supabase
      .from("ai_generations")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    if (error || !generation) {
      return NextResponse.json({ generation: null });
    }

    return NextResponse.json({ generation });
  } catch {
    return NextResponse.json({ generation: null });
  }
}

// POST /api/ai-generate — Trigger new AI generation (Vercel Cron, every 5 min)
export async function POST(req: NextRequest) {
  try {
    // Verify cron secret in production
    const authHeader = req.headers.get("authorization");
    const cronSecret = process.env.CRON_SECRET;
    if (cronSecret && process.env.NODE_ENV === "production") {
      if (authHeader !== `Bearer ${cronSecret}`) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
    }

    const supabase = createServerClient();

    // Fetch all words
    const { data: words, error: wordsError } = await supabase
      .from("words")
      .select("word")
      .order("created_at", { ascending: true });

    if (wordsError) {
      return NextResponse.json({ error: wordsError.message }, { status: 500 });
    }

    if (!words || words.length === 0) {
      return NextResponse.json({ error: "No words in database yet" }, { status: 400 });
    }

    const wordList = words.map((w) => w.word);

    // Get current generation number
    const { data: lastGen } = await supabase
      .from("ai_generations")
      .select("generation_number")
      .order("generation_number", { ascending: false })
      .limit(1)
      .single();

    const nextGenNumber = (lastGen?.generation_number || 0) + 1;

    // Generate AI response (auto-fallback: Groq -> Gemini -> Claude)
    const { response, tokens, model, provider } = await generateAIResponse(wordList);

    // Save to database
    const { data: newGen, error: insertError } = await supabase
      .from("ai_generations")
      .insert({
        generation_number: nextGenNumber,
        prompt_text: wordList.join(" "),
        response_text: response,
        word_count: wordList.length,
        model,
        provider,
        tokens_used: tokens,
      })
      .select()
      .single();

    if (insertError) {
      return NextResponse.json({ error: insertError.message }, { status: 500 });
    }

    // Update stats
    await supabase
      .from("stats")
      .update({
        total_generations: nextGenNumber,
        updated_at: new Date().toISOString(),
      })
      .eq("id", 1);

    return NextResponse.json({ success: true, generation: newGen });
  } catch (err) {
    const message = err instanceof Error ? err.message : "AI generation failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
