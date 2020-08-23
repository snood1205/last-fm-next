import { NextApiRequest, NextApiResponse } from "next";
import { parsePaginationOptions } from "../../../lib/functions/parsePaginationOptions";
import { PaginationQuery } from "../../../lib/interfaces/PaginationQuery";
import { allTracks } from "../../../lib/functions/allTracks";
import { mongoConnection, AsyncCallback, CallbackFactory } from "../../../lib/functions/mongoConnection";
import { Track } from "../../../lib/interfaces/Track";

interface JSON {
  tracks: Track[];
  maximumPage: number;
}

const callbackFactory: CallbackFactory<JSON> = ({ query }): AsyncCallback<JSON> => async (
  _client,
  _db,
  collections,
): Promise<JSON> => {
  const { trackCollection: collection } = collections;
  const paginationQuery = (query as unknown) as PaginationQuery;
  const paginationOptions = parsePaginationOptions({ paginationQuery });
  const tracks = await (query.no_page ? allTracks(collection) : allTracks(collection, paginationOptions)).toArray();
  const maximumPage = Math.floor(
    (await (query.no_page ? paginationOptions.nodesPerPage : collection.countDocuments())) /
      paginationOptions.nodesPerPage,
  );
  return { tracks, maximumPage };
};

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const { tracks, maximumPage } = await mongoConnection<JSON>(callbackFactory(req, res));
  res.status(200).json({ tracks, maximumPage });
};
