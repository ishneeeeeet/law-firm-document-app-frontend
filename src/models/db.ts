import Dexie, { Table } from 'dexie';
import { populate } from './populate';
import { Deal } from './deal';

export class DealDB extends Dexie {
    dealItems!: Table<Deal, number>;
    constructor() {
      super('TodoDB');
      this.version(1).stores({
        dealItems: '++id  '
      });
    }
  
    deleteList(todoListId: number) {
      return this.transaction('rw', this.dealItems,  () => {
        this.dealItems.where({ todoListId }).delete();
      });
    }
}

export const db = new DealDB();

// db.on('populate', populate);

export function resetDatabase() {
  return db.transaction('rw', db.dealItems, async () => {
    await Promise.all(db.tables.map(table => table.clear()));
    // await populate();
  });
}
