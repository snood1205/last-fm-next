import { LastFmTrack } from "./LastFmTrack";

export interface Result {
  data: {
    recenttracks: {
      "@attr": {
        page: string;
        perPage: string;
        user: string;
        total: string;
        totalPages: string;
      };
      track: LastFmTrack[];
    };
  };
}
