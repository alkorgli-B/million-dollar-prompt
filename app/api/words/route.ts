import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";
import { findAvailablePosition, getRandomColor } from "@/lib/utils";

// GET /api/words — Fetch all visible words
export async function GET() {
  try {
    const supabase = createServerClient();
    const { data: words, error } = await supabase
      .from("words")
      .select("*")
      .in("payment_status", ["demo", "paid"])
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ words: words || [] });
  } catch {
    return NextResponse.json({ error: "Failed to fetch words", words: [] }, { status: 500 });
  }
}

// POST /api/words — Create word(s)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { word, owner_name, owner_link, package: pkg = 1 } = body;

    if (!word || typeof word !== "string" || word.trim().length === 0) {
      return NextResponse.json({ error: "Word is required" }, { status: 400 });
    }

    if (word.trim().length > 30) {
      return NextResponse.json({ error: "Word must be 30 characters or less" }, { status: 400 });
    }

    const wordCount = Math.min(Math.max(pkg, 1), 25);

    const supabase = createServerClient();

    // Get occupied positions
    const { data: existingWords } = await supabase
      .from("words")
      .select("grid_x, grid_y");

    const occupied = new Set(
      (existingWords || []).map((w) => `${w.grid_x},${w.grid_y}`)
    );

    // Create word entries
    const wordsToInsert = [];

    for (let i = 0; i < wordCount; i++) {
      const pos = findAvailablePosition(occupied);
      occupied.add(`${pos.x},${pos.y}`);

      wordsToInsert.push({
        word: word.trim(),
        owner_name: owner_name || null,
        owner_link: owner_link || null,
        grid_x: pos.x,
        grid_y: pos.y,
        color: getRandomColor(),
        package: pkg,
        payment_status: "demo",
      });
    }

    const { data: insertedWords, error } = await supabase
      .from("words")
      .insert(wordsToInsert)
      .select();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Update stats
    const rpcResult = await supabase.rpc("increment_stats", {
      sold_count: wordCount,
      revenue_amount: wordCount,
    });

    if (rpcResult.error) {
      // Fallback: manual stats update
      const totalSold = (existingWords?.length || 0) + wordCount;
      await supabase
        .from("stats")
        .update({
          total_sold: totalSold,
          total_revenue: totalSold,
          last_purchase_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq("id", 1);
    }

    return NextResponse.json({ words: insertedWords });
  } catch {
    return NextResponse.json({ error: "Failed to create word" }, { status: 500 });
  }
}
