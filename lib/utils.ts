export function formatNumber(n: number): string {
  return n.toLocaleString();
}

export function formatCurrency(n: number): string {
  return "$" + n.toLocaleString();
}

export function timeAgo(date: string | Date): string {
  const now = new Date();
  const past = new Date(date);
  const seconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export function getRandomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function getRandomColor(): string {
  const colors = ["mint", "blue", "purple", "gold", "coral", "cyan"];
  return colors[Math.floor(Math.random() * colors.length)];
}

export function getColorClass(color: string): string {
  const map: Record<string, string> = {
    mint: "cg",
    blue: "cb",
    purple: "cp",
    gold: "co",
    coral: "cr",
    cyan: "cc",
  };
  return map[color] || "cg";
}

export function findAvailablePosition(
  occupied: Set<string>,
  gridSize: number = 1000
): { x: number; y: number } {
  let x: number, y: number;
  do {
    x = Math.floor(Math.random() * gridSize);
    y = Math.floor(Math.random() * gridSize);
  } while (occupied.has(`${x},${y}`));
  return { x, y };
}
