import { Collection, Cursor } from "mongodb";
import { Track } from "../interfaces/Track";
import { PaginationOptions } from "../interfaces/PaginationOptions";

const paginatedTracks = (collection: Collection<Track>, { nodesPerPage, page }: PaginationOptions): Cursor<Track> =>
  collection
    .find()
    .skip((page - 1) * nodesPerPage)
    .limit(nodesPerPage);

export const allTracks = (collection: Collection<Track>, paginationOptions?: PaginationOptions): Cursor<Track> =>
  (paginationOptions == null ? collection.find() : paginatedTracks(collection, paginationOptions)).sort({
    listenedAt: -1,
  });
