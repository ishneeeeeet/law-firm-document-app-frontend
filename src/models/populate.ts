import { db } from "./db";

export async function populate(data) {
  await db.dealItems.bulkAdd(data);
}
