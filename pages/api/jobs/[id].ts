import { NextApiRequest, NextApiResponse } from "next";
import { mongoConnection, CallbackFactory } from "../../../lib/functions/mongoConnection";
import { Job } from "../../../lib/interfaces/Job";

const callbackFactory: CallbackFactory<Job> = ({ query }) => async (_client, _db, collections) => {
  const { jobCollection: collection } = collections;
  const { id: _id } = query;
  const job = await collection.findOne({ _id });
  return job;
};

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const job = await mongoConnection<Job>(callbackFactory(req, res));
  res.status(200).json({ job });
};
