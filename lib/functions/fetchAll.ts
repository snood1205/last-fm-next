import { Collection } from "mongodb";
import { Track } from "../interfaces/Track";
import { LastFmConfiguration } from "../interfaces/LastFmConfiguration";
import { fetchPage } from "./fetchPage";
import { Job } from "../interfaces/Job";
import { jobLog } from "./jobLog";

export const fetchAll = async (
  trackCollection: Collection<Track>,
  jobCollection: Collection<Job>,
  configuration: LastFmConfiguration,
  job: Job,
): Promise<number> => {
  let count = 0;
  try {
    for (
      let page = 1;
      (count += await fetchPageWithRetry(trackCollection, jobCollection, page, configuration, job)) > 0;
      page++
    );
  } catch (err) {
    jobLog(jobCollection, "fetch_all", job, err);
  } finally {
    return count;
  }
};

const fetchPageWithRetry = async (
  trackCollection: Collection<Track>,
  jobCollection: Collection<Job>,
  page: number,
  configuration: LastFmConfiguration,
  job: Job,
  retry = 0,
): Promise<number> => {
  if (retry > 5) throw `Cannot fetch page ${page}`;
  try {
    return await fetchPage(trackCollection, jobCollection, page, configuration, job);
  } catch (e) {
    // console.error(e);
    return fetchPageWithRetry(trackCollection, jobCollection, page, configuration, job, retry + 1);
  }
};
