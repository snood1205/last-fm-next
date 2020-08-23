import { MongoClient, Db, Collection } from "mongodb";
import { Track } from "../interfaces/Track";
import { NextApiRequest, NextApiResponse } from "next";

export interface Collections {
  [key: string]: Collection;
}

interface ClientWithCollections {
  client: MongoClient;
  db: Db;
  collections: Collections;
}

const initializeCollections = (db: Db) => ({
  trackCollection: db.collection<Track>("tracks"),
});

const initializeClient = async (): Promise<ClientWithCollections> => {
  const mongoUri = process.env.MONGODB_URI ?? "mongodb://127.0.0.1:27017/";
  const client = await MongoClient.connect(mongoUri, {
    useUnifiedTopology: true,
  });
  const db = client.db("playing-around-with-last-fm");
  const collections = initializeCollections(db);
  return { client, db, collections };
};

export type CallbackFactory<T = void> = (req: NextApiRequest, res: NextApiResponse) => AsyncCallback<T>;
export type Callback<T = void> = (client: MongoClient, db: Db, collections: Collections) => T;
export type AsyncCallback<T = void> = Callback<Promise<T>>;
type CallbackUnion<T> = Callback<T> | AsyncCallback<T>;

export const mongoConnection = async <T = void>(callback: CallbackUnion<T>): Promise<T> => {
  const { client, db, collections } = await initializeClient();
  const callbackResults = callback(client, db, collections);
  return Promise.resolve(callbackResults) === callbackResults ? await callbackResults : callbackResults;
};
