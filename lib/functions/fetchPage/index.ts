import { Collection } from "mongodb";
import { Track } from "../../interfaces/Track";
import axios from "axios";
import { ImageArray } from "./ImageArray";
import { LastFmTrack } from "./LastFmTrack";
import { strictEqual } from "assert";
import { Result } from "./Result";
import { LastFmConfiguration } from "../../interfaces/LastFmConfiguration";
import { Job } from "../../interfaces/Job";
import { jobLog } from "../jobLog";

const transformUts = (uts: string): Date => new Date(parseInt(uts) * 1000);

const transformImage = (image: ImageArray) => image[3]["#text"];

const transform = ({
  artist: { "#text": artist },
  album: { "#text": album },
  image,
  date: { uts },
  url,
  name,
}: LastFmTrack): Track => {
  const now = new Date();
  return {
    artist,
    album,
    name,
    listenedAt: transformUts(uts),
    createdAt: now,
    updatedAt: now,
    url,
    imageUrl: transformImage(image),
    hidden: false,
  };
};

const constructUrl = (page: number, { apiKey, username }: LastFmConfiguration): string =>
  `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${username}\
  &api_key=${apiKey}&format=json&page=${page}`;

export const fetchPage = async (
  trackCollection: Collection<Track>,
  jobCollection: Collection<Job>,
  page: number,
  configuration: LastFmConfiguration,
  job?: Job,
): Promise<number> => {
  const task = job == null ? "fetch_page" : "fetch_all";
  jobLog(jobCollection, task, job, `Fetching page ${page}`);
  const {
    data: {
      recenttracks: { track: tracks },
    },
  }: Result = await axios.get(constructUrl(page, configuration));

  const transformedTracks = tracks.map(transform);

  trackCollection.insertMany(transformedTracks, (err, result) => {
    strictEqual(err, null);
    strictEqual(transformedTracks.length, result.result.n);
    strictEqual(transformedTracks.length, result.ops.length);
    jobLog(jobCollection, task, job, `Inserted ${result.ops.length} into the Tracks collection`);
  });

  return transformedTracks.length;
};
