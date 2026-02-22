"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import type { Word } from "@/lib/types";
import {
  GRID_COLS_DESKTOP,
  GRID_ROWS_DESKTOP,
} from "@/lib/constants";
import { getColorClass } from "@/lib/utils";

interface GridProps {
  words: Word[];
  onCellClick: () => void;
}

interface CellData {
  sold: boolean;
  word?: string;
  owner?: string;
  colorClass?: string;
}

export default function Grid({ words, onCellClick }: GridProps) {
  const [filter, setFilter] = useState<"all" | "available" | "sold">("all");
  const [search, setSearch] = useState("");
  const [tooltip, setTooltip] = useState<{
    visible: boolean;
    x: number;
    y: number;
    content: string;
    owner?: string;
    sold: boolean;
  }>({ visible: false, x: 0, y: 0, content: "", sold: false });
  const [cols, setCols] = useState(GRID_COLS_DESKTOP);
  const [rows, setRows] = useState(GRID_ROWS_DESKTOP);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function updateDimensions() {
      const w = window.innerWidth;
      if (w <= 480) {
        setCols(20);
        setRows(10);
      } else if (w <= 768) {
        setCols(30);
        setRows(14);
      } else {
        setCols(GRID_COLS_DESKTOP);
        setRows(GRID_ROWS_DESKTOP);
      }
    }
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Build cells from REAL words only — no fake data
  const cells = useMemo(() => {
    const totalCells = cols * rows;
    const newCells: CellData[] = [];

    const occupied = new Map<string, Word>();
    words.forEach((w) => {
      const viewX = w.grid_x % cols;
      const viewY = w.grid_y % rows;
      occupied.set(`${viewX},${viewY}`, w);
    });

    for (let i = 0; i < totalCells; i++) {
      const x = i % cols;
      const y = Math.floor(i / cols);
      const key = `${x},${y}`;

      if (occupied.has(key)) {
        const w = occupied.get(key)!;
        newCells.push({
          sold: true,
          word: w.word,
          owner: w.owner_name || "Anonymous",
          colorClass: getColorClass(w.color),
        });
      } else {
        newCells.push({ sold: false });
      }
    }
    return newCells;
  }, [words, cols, rows]);

  const soldCount = cells.filter((c) => c.sold).length;
  const totalCells = cols * rows;

  const handleMouseEnter = useCallback(
    (e: React.MouseEvent, cell: CellData) => {
      setTooltip({
        visible: true,
        x: e.clientX + 14,
        y: e.clientY - 12,
        content: cell.sold ? `"${cell.word}"` : "",
        owner: cell.sold ? `by ${cell.owner}` : undefined,
        sold: cell.sold,
      });
    },
    []
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (tooltip.visible) {
        setTooltip((t) => ({ ...t, x: e.clientX + 14, y: e.clientY - 12 }));
      }
    },
    [tooltip.visible]
  );

  const handleMouseLeave = useCallback(() => {
    setTooltip((t) => ({ ...t, visible: false }));
  }, []);

  return (
    <section className="sec reveal vis" id="grid">
      <div className="sh wrap">
        <span className="stag">The Grid</span>
        <h2 className="st">
          One Million Cells.
          <br />
          {soldCount > 0 ? "Filling Up." : "Waiting for You."}
        </h2>
        <p className="sd">
          {soldCount > 0
            ? "Click any empty cell to claim it. Hover sold cells to see who owns them."
            : "Every cell is available. Click any cell to be among the first to claim your word."
          }
        </p>
      </div>
      <div className="gw">
        {soldCount > 0 && (
          <div className="gtb">
            <div className="gtb-l">
              <button
                className={`tb${filter === "all" ? " on" : ""}`}
                onClick={() => setFilter("all")}
              >
                All
              </button>
              <button
                className={`tb${filter === "available" ? " on" : ""}`}
                onClick={() => setFilter("available")}
              >
                Available
              </button>
              <button
                className={`tb${filter === "sold" ? " on" : ""}`}
                onClick={() => setFilter("sold")}
              >
                Sold
              </button>
            </div>
            <input
              className="gsrch"
              placeholder="Search a word..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        )}
        <div className="gc">
          <div
            className="gi"
            ref={gridRef}
            style={{
              gridTemplateColumns: `repeat(${cols}, 1fr)`,
              gridTemplateRows: `repeat(${rows}, 1fr)`,
            }}
            onMouseMove={handleMouseMove}
          >
            {cells.map((cell, i) => {
              if (filter === "available" && cell.sold) return null;
              if (filter === "sold" && !cell.sold) return null;
              if (
                search &&
                cell.sold &&
                !cell.word?.toLowerCase().includes(search.toLowerCase())
              )
                return null;

              return (
                <div
                  key={i}
                  className={`cl${cell.sold && cell.colorClass ? ` ${cell.colorClass}` : ""}`}
                  onMouseEnter={(e) => handleMouseEnter(e, cell)}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => {
                    if (!cell.sold) onCellClick();
                  }}
                />
              );
            })}
          </div>
        </div>
        <div className="gib">
          <span className="gin">
            Sold: <b>{soldCount.toLocaleString()}</b>
          </span>
          <span className="gin">
            Available: <b>{(totalCells - soldCount).toLocaleString()}</b>
          </span>
          <span className="gin">
            Viewing: <b>{totalCells.toLocaleString()}</b> of 1,000,000
          </span>
        </div>
      </div>

      <div
        className={`gtt${tooltip.visible ? " on" : ""}`}
        style={{ left: tooltip.x, top: tooltip.y }}
      >
        {tooltip.sold ? (
          <>
            <span className="tw">{tooltip.content}</span>
            <span className="to">{tooltip.owner}</span>
          </>
        ) : (
          <span style={{ color: "var(--mint)" }}>
            &#10010; Available — click to buy
          </span>
        )}
      </div>
    </section>
  );
}
