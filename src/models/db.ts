import Dexie, { Table } from 'dexie';
import { populate } from './populate';
import { Deal } from './deal';

export class DealDB extends Dexie {
    dealItems!: Table<Deal, number>;
    constructor() {
      super('DealDB');
      this.version(1).stores({
        dealItems: '++id,jobId  '
      });
    }
  
    deleteList(todoListId: number) {
      return this.transaction('rw', this.dealItems,  () => {
        this.dealItems.where({ todoListId }).delete();
      });
    }
}

export const db = new DealDB();
// db.dealItems.createIndex('my-second-new-index');
// db.on('populate', populate);

export function resetDatabase() {
  return db.transaction('rw', db.dealItems, async () => {
    await Promise.all(db.tables.map(table => table.clear()));
    // await populate();
  });
}

export function updateDb(jobId, data) {
  db.transaction("rw", db.dealItems, async () => {
    console.log(jobId, data)
    // Mark bigfoots:
    await db.dealItems
      .where("jobId").equals(jobId)
      .modify({"fileData": data, 'status':'completed'});

    // Log all bigfoots.
    // Since in transaction, and prev operation is a write-operation, the
    // below operation will be stalled until above operation completes, 
    // ensuring we get the result after the modification.

      // await db.dealItems.where('jobId').equals(jobId).each(deal => {
      //     console.log("Foun: " + deal);
      // });

  }).catch (function (e) {
      console.error(e);
  });
}
