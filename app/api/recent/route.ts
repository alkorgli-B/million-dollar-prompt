import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";
import { timeAgo } from "@/lib/utils";

// GET /api/recent — Fetch recent purchases for ticker
export async function GET() {
  try {
    const supabase = createServerClient();

    const { data: recentWords, error } = await supabase
      .from("words")
      .select("word, owner_name, created_at")
      .order("created_at", { ascending: false })
      .limit(20);

    if (error || !recentWords?.length) {
      return NextResponse.json({ items: [] });
    }

    const items = recentWords.map((w) => ({
      owner: w.owner_name || "Anonymous",
      word: w.word,
      time_ago: timeAgo(w.created_at),
    }));

    return NextResponse.json({ items });
  } catch {
    return NextResponse.json({ items: [] });
  }
}
