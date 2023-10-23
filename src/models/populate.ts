import { db } from "./db";

export async function populate(data: any) {
  await db.dealItems.bulkAdd(data);
}
