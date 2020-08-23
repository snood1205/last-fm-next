import { NextApiResponse, NextApiRequest } from "next";
import { fetchAll } from "../../lib/functions/fetchAll";
import { mongoConnection } from "../../lib/functions/mongoConnection";
import { Configuration } from "../../lib/constants/Configuration";
import { Job } from "../../lib/interfaces/Job";
import { jobLog } from "../../lib/functions/jobLog";

export default async (_req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const insertedId = await mongoConnection(async (_client, _db, collections) => {
    const { jobCollection, trackCollection } = collections;
    const job: Job = { task: "fetch_all", logs: [] };
    const { insertedId } = await jobCollection.insertOne(job);
    fetchAll(trackCollection, jobCollection, Configuration, job).then((tracksInserted) => {
      jobLog(jobCollection, job.task, job, `Inserted ${tracksInserted} tracks`);
    });
    return insertedId;
  });
  res.status(200).json({
    message: `Job with id ${insertedId} is running now to import tracks.`,
    link: `/jobs/${insertedId}/log`,
  });
};
