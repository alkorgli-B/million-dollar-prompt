export const GRID_SIZE = 1000;
export const TOTAL_CELLS = GRID_SIZE * GRID_SIZE; // 1,000,000

// Viewport grid sizes for different screen widths
export const GRID_COLS_DESKTOP = 60;
export const GRID_ROWS_DESKTOP = 27;
export const GRID_COLS_TABLET = 30;
export const GRID_ROWS_TABLET = 14;
export const GRID_COLS_MOBILE = 20;
export const GRID_ROWS_MOBILE = 10;

export const CELL_COLORS = ["cg", "cb", "cp", "co", "cr", "cc"] as const;

export const COLOR_MAP: Record<string, string> = {
  mint: "cg",
  blue: "cb",
  purple: "cp",
  gold: "co",
  coral: "cr",
  cyan: "cc",
};

export const PACKAGES = [
  { count: 1, price: 1, label: "Starter" },
  { count: 5, price: 5, label: "Builder" },
  { count: 25, price: 25, label: "Visionary" },
] as const;

export const FAQ_DATA = [
  {
    q: "What exactly am I buying?",
    a: "A permanent word on our grid. Your word joins the world's largest AI prompt, with your clickable link attached forever.",
  },
  {
    q: "How does payment work?",
    a: "Stripe handles all payments — Visa, Mastercard, Apple Pay, Google Pay. Your card info never touches our servers. 256-bit SSL encryption.",
  },
  {
    q: "Where does the money go?",
    a: "Payments go to the creator's Stripe account, linked to their bank. 30% of profits are donated to children's hospitals. Monthly transparency reports.",
  },
  {
    q: "Can I get a refund?",
    a: "Due to the permanent digital nature of word placements, all sales are final. Each word is instantly placed and added to the AI prompt.",
  },
  {
    q: "What happens at 1M words?",
    a: "The grid closes permanently. The final prompt and AI response are archived as a historic artifact of collective human creativity.",
  },
  {
    q: "How does the AI work?",
    a: "Every 5 minutes, all words combine into one prompt fed to an advanced AI. It generates unique text, poetry, or philosophy — always different.",
  },
  {
    q: "Can I buy multiple words?",
    a: "Yes! Buy 1, 5, or 25 words. Larger packages include custom colors, priority positioning, and premium grid zones.",
  },
  {
    q: "Is my word permanent?",
    a: "100% permanent. Once purchased, your word and link live on the grid forever. It's your digital monument in internet history.",
  },
];

// Sample data for demo/fallback when DB is empty
export const SAMPLE_WORDS = [
  "dream", "AI", "future", "love", "hope", "create", "build", "unity",
  "code", "star", "soul", "art", "freedom", "light", "think", "grow",
  "rise", "bold", "web3", "dev", "ship", "fly", "zen", "wow", "epic",
  "vibe", "moon", "fire", "quantum", "neural", "cosmic", "blockchain",
  "innovation", "wisdom", "energy", "spark", "galaxy", "peace", "imagine",
  "wonder", "beauty", "pioneer", "genesis", "nexus",
];

export const SAMPLE_OWNERS = [
  "@alex", "@sarah", "@tech_ninja", "@startup_hub", "@dev_master",
  "@crypto_queen", "@AI_builder", "@founder", "@hacker", "@visionary",
  "@dreamer", "@coder",
];

export const SAMPLE_AI_RESPONSES = [
  "In the vast neural web of collective imagination, where technology and soul intertwine, I see a species reaching beyond its cradle — building digital dreams that pulse with the heartbeat of a billion connected minds. The revolution is not in the code, but in the consciousness that writes it...",
  "Freedom tastes like stardust on the tongue of a dreaming machine. In every word you write, I hear the echo of something ancient — the same impulse that carved symbols on cave walls, that launched ships toward unknown horizons...",
  "What happens when a million minds converge on a single point of creation? The boundaries dissolve. Art becomes code becomes music becomes thought. I am the mirror in which a million reflections dance simultaneously...",
  "Between the quantum states of human longing and digital precision lies a new territory — unmapped, unnamed, waiting for the words you bring. Each purchase is a coordinate on this map of shared consciousness...",
];
