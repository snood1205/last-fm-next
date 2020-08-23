import { ObjectID } from "mongodb";

export interface Track {
  _id?: ObjectID;
  artist?: string;
  album?: string;
  name: string;
  listenedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  url: string;
  imageUrl?: string;
  hidden: boolean;
}
