export type URL = string;
export interface BooruPost {
  _data: any;
  fileUrl: URL;
  id: string; //ex "123"
  tags: string[];
  score: number;
  source: URL;
  rating: string;
  postView: URL
}

export interface BooruState {
  links: URL[]
}