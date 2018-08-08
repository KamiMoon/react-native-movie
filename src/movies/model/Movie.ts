export default interface Movie {
  year: number;
  title: string;
  info: Info;
}

export interface Info {
  directors?: string[];
  release_date?: string;
  rating?: number;
  genres?: string[];
  image_url?: string;
  plot?: string;
  rank?: number;
  running_time_secs?: number;
  actors?: string[];
}
