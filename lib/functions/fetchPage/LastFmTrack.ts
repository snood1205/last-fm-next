import { ImageArray } from "./ImageArray";

interface Text {
  "#text": string;
}

interface MBID {
  mbid: string;
}

export interface LastFmTrack extends MBID {
  artist: Text & MBID;
  album: Text & MBID;
  image: ImageArray;
  streamable: string;
  date: Text & { uts: string };
  url: string;
  name: string;
}
