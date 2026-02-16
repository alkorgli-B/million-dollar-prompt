"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import type { Stats } from "@/lib/types";

const DEFAULT_STATS: Stats = {
  id: 1,
  total_sold: 0,
  total_revenue: 0,
  total_generations: 0,
  last_purchase_at: null,
  updated_at: new Date().toISOString(),
};

export function useStats() {
  const [stats, setStats] = useState<Stats>(DEFAULT_STATS);
  const [loading, setLoading] = useState(true);

  const fetchStats = useCallback(async () => {
    try {
      const res = await fetch("/api/stats");
      if (res.ok) {
        const data = await res.json();
        setStats(data.stats || DEFAULT_STATS);
      }
    } catch {
      // Silently fail, keep existing data
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();

    // Auto-refresh every 15 seconds
    const interval = setInterval(fetchStats, 15000);

    // Subscribe to realtime changes on stats table
    const channel = supabase
      .channel("stats-realtime")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "stats" },
        (payload) => {
          setStats(payload.new as Stats);
        }
      )
      .subscribe();

    return () => {
      clearInterval(interval);
      supabase.removeChannel(channel);
    };
  }, [fetchStats]);

  return { stats, loading, refetch: fetchStats };
}
