import { ObjectID } from "mongodb";

export type Task = "fetch_page" | "fetch_all";

export interface Job {
  _id?: ObjectID;
  task: Task;
  logs: string[];
}
