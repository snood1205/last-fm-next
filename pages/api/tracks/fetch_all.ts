import { NextApiResponse, NextApiRequest } from "next";
import { fetchAll } from "../../../lib/functions/fetchAll";
import { mongoConnection } from "../../../lib/functions/mongoConnection";
import { Configuration } from "../../../lib/constants/Configuration";

export default async (_req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const tracksInsereted = await mongoConnection((_client, _db, collections) => {
    const { trackCollection: collection } = collections;
    fetchAll(collection, Configuration);
  });
  res.send({ message: `Inserted ${tracksInsereted} tracks` });
};
