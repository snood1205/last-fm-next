import { Collection } from "mongodb";
import { Track } from "../interfaces/Track";
import { LastFmConfiguration } from "../interfaces/LastFmConfiguration";
import { fetchPage } from "./fetchPage";

export const fetchAll = async (collection: Collection<Track>, configuration: LastFmConfiguration): Promise<number> => {
  let count = 0;
  try {
    for (let page = 1; (count += await fetchPageWithRetry(collection, page, configuration)) > 0; page++);
  } catch (err) {
    console.error(err);
  } finally {
    return count;
  }
};

const fetchPageWithRetry = async (
  collection: Collection<Track>,
  page: number,
  configuration: LastFmConfiguration,
  retry = 0,
): Promise<number> => {
  if (retry > 5) throw `Cannot fetch page ${page}`;
  try {
    return await fetchPage(collection, page, configuration);
  } catch {
    return fetchPageWithRetry(collection, page, configuration, retry + 1);
  }
};
