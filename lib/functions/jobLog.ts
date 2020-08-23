import { Collection } from "mongodb";
import { Job, Task } from "../interfaces/Job";

export const jobLog = async (
  jobCollection: Collection<Job>,
  task: Task,
  job?: Job,
  ...messages: string[]
): Promise<Job> => {
  if (job == null) {
    const job = { task, logs: messages };
    const { insertedId } = await jobCollection.insertOne(job);
    return { ...job, _id: insertedId };
  }
  const { _id, logs } = job;
  const newLogs = [...logs, ...messages];
  jobCollection.updateOne({ _id }, { $set: { logs: newLogs } }, { upsert: true });
  return { ...job, logs: newLogs };
};
