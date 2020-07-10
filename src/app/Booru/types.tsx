export type URL = string;
export interface BooruState {
  links: URL[]
}
export interface SearchRequest {
  tags?: string[];
  exclude?: string[];
  limit?: number;
  random?: boolean;
}