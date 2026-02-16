import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";

// GET /api/stats — Fetch live stats
export async function GET() {
  try {
    const supabase = createServerClient();

    const { data: stats, error } = await supabase
      .from("stats")
      .select("*")
      .eq("id", 1)
      .single();

    if (error || !stats) {
      // Return default stats if table doesn't exist yet
      return NextResponse.json({
        stats: {
          id: 1,
          total_sold: 0,
          total_revenue: 0,
          total_generations: 0,
          last_purchase_at: null,
          updated_at: new Date().toISOString(),
        },
      });
    }

    return NextResponse.json({ stats });
  } catch {
    return NextResponse.json({
      stats: {
        id: 1,
        total_sold: 0,
        total_revenue: 0,
        total_generations: 0,
        last_purchase_at: null,
        updated_at: new Date().toISOString(),
      },
    });
  }
}
