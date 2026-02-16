import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";
import { findAvailablePosition, getRandomColor } from "@/lib/utils";

// GET /api/words — Fetch all words
export async function GET() {
  try {
    const supabase = createServerClient();
    const { data: words, error } = await supabase
      .from("words")
      .select("*")
      .eq("payment_status", "demo") // or 'paid' when Stripe is added
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ words: words || [] });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch words", words: [] },
      { status: 500 }
    );
  }
}

// POST /api/words — Create word(s) (demo mode — no payment)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      word,
      owner_name,
      owner_link,
      package: pkg = 1,
    } = body;

    if (!word || typeof word !== "string" || word.trim().length === 0) {
      return NextResponse.json(
        { error: "Word is required" },
        { status: 400 }
      );
    }

    if (word.trim().length > 30) {
      return NextResponse.json(
        { error: "Word must be 30 characters or less" },
        { status: 400 }
      );
    }

    const supabase = createServerClient();

    // Get occupied positions
    const { data: existingWords } = await supabase
      .from("words")
      .select("grid_x, grid_y");

    const occupied = new Set(
      (existingWords || []).map((w) => `${w.grid_x},${w.grid_y}`)
    );

    // Create word entries (for packages > 1, create multiple)
    const wordsToInsert = [];
    const wordCount = Math.min(pkg, 25); // Max 25 words per purchase

    for (let i = 0; i < wordCount; i++) {
      const pos = findAvailablePosition(occupied);
      occupied.add(`${pos.x},${pos.y}`);

      wordsToInsert.push({
        word: i === 0 ? word.trim() : `${word.trim()}`,
        owner_name: owner_name || null,
        owner_link: owner_link || null,
        grid_x: pos.x,
        grid_y: pos.y,
        color: getRandomColor(),
        package: pkg,
        payment_status: "demo", // TODO: Change to 'pending' when Stripe is added
        // TODO: Add stripe_session_id when Stripe is integrated
      });
    }

    const { data: insertedWords, error } = await supabase
      .from("words")
      .insert(wordsToInsert)
      .select();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Update stats — try RPC first, fall back to manual update
    const rpcResult = await supabase.rpc("increment_stats", {
      sold_count: wordCount,
      revenue_amount: wordCount,
    });

    if (rpcResult.error) {
      // RPC doesn't exist yet — update manually
      await supabase
        .from("stats")
        .update({
          total_sold: (existingWords?.length || 0) + wordCount,
          total_revenue: (existingWords?.length || 0) + wordCount,
          last_purchase_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq("id", 1);
    }

    return NextResponse.json({ words: insertedWords });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to create word" },
      { status: 500 }
    );
  }
}
