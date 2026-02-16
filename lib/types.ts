export interface Word {
  id: string;
  word: string;
  owner_name: string | null;
  owner_link: string | null;
  grid_x: number;
  grid_y: number;
  color: string;
  package: number;
  stripe_session_id: string | null;
  payment_status: string;
  created_at: string;
}

export interface AIGeneration {
  id: string;
  generation_number: number;
  prompt_text: string;
  response_text: string;
  word_count: number;
  model: string;
  provider: string;
  tokens_used: number | null;
  created_at: string;
}

export interface Stats {
  id: number;
  total_sold: number;
  total_revenue: number;
  total_generations: number;
  last_purchase_at: string | null;
  updated_at: string;
}

export interface TickerItem {
  owner: string;
  word: string;
  time_ago: string;
}

export interface GridCellData {
  x: number;
  y: number;
  word?: string;
  owner?: string;
  color?: string;
  sold: boolean;
}
