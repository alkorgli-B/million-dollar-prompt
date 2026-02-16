"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import type { Word } from "@/lib/types";

export function useWords() {
  const [words, setWords] = useState<Word[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchWords = useCallback(async () => {
    try {
      const res = await fetch("/api/words");
      if (res.ok) {
        const data = await res.json();
        setWords(data.words || []);
      }
    } catch {
      // Silently fail, keep existing data
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWords();

    // Subscribe to realtime changes on words table
    const channel = supabase
      .channel("words-realtime")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "words" },
        (payload) => {
          const newWord = payload.new as Word;
          setWords((prev) => [...prev, newWord]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchWords]);

  return { words, loading, refetch: fetchWords };
}
