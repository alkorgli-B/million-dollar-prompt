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
    a: "You're buying a permanent word placement on our one-million-cell grid. Your word becomes part of the world's largest collaborative AI prompt, and your clickable link stays attached to it forever. Think of it as owning a piece of internet history.",
  },
  {
    q: "How does payment work?",
    a: "All payments are processed securely through Stripe, the world's most trusted payment platform used by Amazon, Google, and Shopify. We accept Visa, Mastercard, American Express, Apple Pay, and Google Pay. Your card details never touch our servers — everything is encrypted with 256-bit SSL.",
  },
  {
    q: "Where does the money go?",
    a: "Revenue is split transparently: 70% covers project operations, infrastructure, and the founding team. 30% of net profits are donated directly to children's hospitals and pediatric medical charities. We publish monthly transparency reports.",
  },
  {
    q: "Can I get a refund?",
    a: "Due to the permanent and irreversible nature of word placements, all sales are final. Each word is instantly placed on the grid and added to the live AI prompt the moment payment confirms.",
  },
  {
    q: "What happens when all 1,000,000 words are sold?",
    a: "The grid closes permanently and becomes a historic digital artifact. The final prompt — composed of one million human-chosen words — and its AI response will be archived forever. No more words can ever be added.",
  },
  {
    q: "How does the AI work?",
    a: "Every 5 minutes, all purchased words are combined into a single massive prompt and fed to an advanced AI model. The AI generates a unique creative response each cycle. As more words are added, the output evolves — no two generations are ever the same.",
  },
  {
    q: "Can I buy multiple words?",
    a: "Yes. We offer three packages: 1 word ($1), 5 words ($5), and 25 words ($25). Larger packages include benefits like custom word colors and priority grid positioning. You can purchase as many packages as you'd like.",
  },
  {
    q: "Is my word permanent?",
    a: "100% permanent. Once purchased, your word and associated link live on the grid forever. Even after the project concludes, all data is preserved and publicly archived. Your word will continue influencing the AI prompt for as long as the project exists.",
  },
  {
    q: "Who created this project?",
    a: "Million Dollar Prompt was created by a team of developers and AI enthusiasts inspired by the original Million Dollar Homepage (2005). Our goal is to create the world's first million-person collaborative AI experiment while supporting children's healthcare.",
  },
  {
    q: "Is this legitimate?",
    a: "Every transaction is processed through Stripe with full buyer protection. Words appear on the grid instantly. The AI generation is real and verifiable. Charity donations are tracked and published. The project is fully transparent.",
  },
];
